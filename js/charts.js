'use strict';
const NS = 'http://www.w3.org/2000/svg',
  colors = [
    '#4567d6',
    '#18a487',
    '#ed9a43',
    '#e46a80',
    '#8d72d5',
    '#4a9bc3',
    '#a3b55b',
  ];
const $ = (s) => document.querySelector(s);
const svgEl = (tag, attrs = {}, parent) => {
  const e = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  (parent || document.createDocumentFragment()).appendChild(e);
  return e;
};
function node(parent, tag, attrs = {}, text) {
  const e = svgEl(tag, attrs, parent);
  if (text !== undefined) e.textContent = text;
  return e;
}
function rect(p, x, y, w, h, fill, rx = 0, other = {}) {
  return node(p, 'rect', {
    x,
    y,
    width: Math.max(0, w),
    height: Math.max(0, h),
    fill,
    rx,
    ...other,
  });
}
function line(p, x1, y1, x2, y2, stroke = '#e5eaf2', width = 1) {
  return node(p, 'line', { x1, y1, x2, y2, stroke, 'stroke-width': width });
}
function txt(p, x, y, value, opts = {}) {
  return node(
    p,
    'text',
    {
      x,
      y,
      fill: '#63738e',
      'font-size': 12,
      'font-family': 'system-ui, sans-serif',
      ...opts,
    },
    String(value),
  );
}
const short = (n) =>
  n >= 1e6
    ? (n / 1e6).toFixed(1) + 'M'
    : n >= 1000
      ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'k'
      : String(Math.round(n));
const fmt = (n) =>
  new Intl.NumberFormat('en-PH', { maximumFractionDigits: 0 }).format(n);
const money = (n) => '₱' + fmt(Math.round(n));
function clear(svg) {
  svg.replaceChildren();
}
function axes(s, x, y, w, h, max, ticks = 4) {
  for (let i = 0; i <= ticks; i++) {
    let yy = y + h - (i * h) / ticks;
    line(s, x, yy, x + w, yy);
    txt(s, x - 9, yy + 4, short((max * i) / ticks), {
      'text-anchor': 'end',
      'font-size': 11,
    });
  }
}
function drawLine(s, labels, values, opt = {}) {
  clear(s);
  let x = 64,
    y = 18,
    w = 630,
    h = 204,
    max = Math.max(10, ...values) * 1.13;
  axes(s, x, y, w, h, max);
  let pts = values.map((v, i) => [
    x + (i * w) / Math.max(1, values.length - 1),
    y + h - (v / max) * h,
  ]);
  if (opt.area) {
    let d =
      'M ' +
      x +
      ',' +
      (y + h) +
      ' L ' +
      pts.map((p) => p.join(',')).join(' L ') +
      ' L ' +
      (x + w) +
      ',' +
      (y + h) +
      ' Z';
    node(s, 'path', { d, fill: '#4567d622' });
  }
  node(s, 'polyline', {
    points: pts.map((p) => p.join(',')).join(' '),
    fill: 'none',
    stroke: colors[0],
    'stroke-width': 3.6,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  });
  pts.forEach(([px, py], i) => {
    node(s, 'circle', { cx: px, cy: py, r: 4.5, fill: colors[0] });
    txt(s, px, 244, labels[i], { 'text-anchor': 'middle', 'font-size': 11 });
  });
}
function drawBars(s, labels, values, horizontal = false) {
  clear(s);
  let max = Math.max(...values, 1) * 1.14;
  if (horizontal) {
    let x = 155,
      y = 20,
      w = 525,
      gap = 35;
    values.forEach((v, i) => {
      let yy = y + i * gap;
      txt(s, x - 11, yy + 19, labels[i], {
        'text-anchor': 'end',
        'font-size': 12,
      });
      rect(s, x, yy, w, 22, '#edf1f9', 5);
      rect(s, x, yy, (w * v) / max, 22, colors[i % colors.length], 5);
      txt(s, x + (w * v) / max + 7, yy + 16, short(v), { 'font-size': 11 });
    });
    return;
  }
  let x = 62,
    y = 20,
    w = 622,
    h = 200;
  axes(s, x, y, w, h, max);
  let gap = w / values.length;
  values.forEach((v, i) => {
    let bh = (v / max) * h;
    rect(
      s,
      x + gap * i + gap * 0.18,
      y + h - bh,
      gap * 0.64,
      bh,
      colors[i % colors.length],
      5,
    );
    txt(s, x + gap * (i + 0.5), 244, labels[i], {
      'text-anchor': 'middle',
      'font-size': 12,
    });
    txt(s, x + gap * (i + 0.5), y + h - bh - 7, short(v), {
      'text-anchor': 'middle',
      'font-size': 11,
    });
  });
}
function donut(s, labels, values, doughnut = false) {
  clear(s);
  let sum = values.reduce((a, b) => a + b, 0);
  if (!sum) {
    txt(s, 360, 130, 'No allocation: total weight is zero', {
      'text-anchor': 'middle',
      'font-size': 16,
    });
    return;
  }
  let cum = 0,
    cx = 355,
    cy = 129,
    R = 105,
    r = doughnut ? 54 : 0;
  values.forEach((v, i) => {
    if (v === 0) return;
    if (v === sum) {
      node(s, 'circle', { cx, cy, r: R, fill: colors[i % colors.length] });
      txt(s, cx, cy - 65, '100%', {
        'text-anchor': 'middle',
        fill: '#fff',
        'font-weight': 800,
      });
      return;
    }
    let start = (cum / sum) * 2 * Math.PI - Math.PI / 2;
    cum += v;
    let end = (cum / sum) * 2 * Math.PI - Math.PI / 2;
    const polar = (a, R) => [cx + Math.cos(a) * R, cy + Math.sin(a) * R];
    let a = polar(start, R),
      b = polar(end, R),
      d = `M ${cx} ${cy} L ${a[0]} ${a[1]} A ${R} ${R} 0 ${end - start > Math.PI ? 1 : 0} 1 ${b[0]} ${b[1]} Z`;
    node(s, 'path', {
      d,
      fill: colors[i % colors.length],
      stroke: '#fff',
      'stroke-width': 3,
    });
    let m = (start + end) / 2,
      pt = polar(m, 75);
    if (v / sum > 0.07)
      txt(s, pt[0], pt[1], Math.round((v / sum) * 100) + '%', {
        'text-anchor': 'middle',
        fill: '#fff',
        'font-size': 13,
        'font-weight': 800,
      });
  });
  if (doughnut) node(s, 'circle', { cx, cy, r, fill: '#fcfdff' });
  labels.forEach((lab, i) => {
    rect(s, 20, 25 + i * 28, 12, 12, colors[i % colors.length], 3);
    txt(
      s,
      41,
      36 + i * 28,
      lab + ' · ' + Math.round((values[i] / sum) * 100) + '%',
    );
  });
}
function scatter(s, vals) {
  clear(s);
  let x = 65,
    y = 20,
    w = 615,
    h = 200;
  axes(s, x, y, w, h, 110);
  for (let i = 0; i < 6; i++) {
    let xx = x + (i * w) / 5;
    txt(s, xx, 244, String(i * 20), {
      'text-anchor': 'middle',
      'font-size': 12,
    });
  }
  txt(s, 378, 261, 'Marketing spend (thousand ₱)', {
    'text-anchor': 'middle',
    'font-size': 11,
  });
  vals.forEach(([a, b], i) =>
    node(s, 'circle', {
      cx: x + (a / 100) * w,
      cy: y + h - (b / 110) * h,
      r: 5,
      fill: colors[i % colors.length],
      opacity: 0.85,
    }),
  );
  txt(s, 73, 13, 'Sales index', { 'font-size': 11 });
}
function funnel(s, labels, values) {
  clear(s);
  const max = Math.max(1, ...values),
    cx = 285;
  values.forEach((value, i) => {
    const width = (400 * value) / max,
      next = (400 * (values[i + 1] ?? value)) / max,
      y = 12 + i * 48;
    node(s, 'polygon', {
      points: `${cx - width / 2},${y} ${cx + width / 2},${y} ${cx + next / 2},${y + 40} ${cx - next / 2},${y + 40}`,
      fill: colors[i],
      stroke: '#fff',
      'stroke-width': 2,
    });
    txt(s, 505, y + 24, `${labels[i]} · ${fmt(value)}`, {
      'font-size': 12,
      'font-weight': 700,
    });
  });
}
function radar(s, labels, a, b) {
  clear(s);
  let cx = 365,
    cy = 133,
    R = 102,
    n = labels.length;
  for (let lvl = 1; lvl <= 5; lvl++) {
    let pts = labels
      .map((_, i) => {
        let ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
        return [
          cx + (Math.cos(ang) * R * lvl) / 5,
          cy + (Math.sin(ang) * R * lvl) / 5,
        ].join(',');
      })
      .join(' ');
    node(s, 'polygon', { points: pts, fill: 'none', stroke: '#dee5f1' });
  }
  labels.forEach((l, i) => {
    let ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    line(s, cx, cy, cx + Math.cos(ang) * R, cy + Math.sin(ang) * R);
    txt(
      s,
      cx + Math.cos(ang) * (R + 23),
      cy + Math.sin(ang) * (R + 19) + 4,
      l,
      { 'text-anchor': 'middle', 'font-size': 12 },
    );
  });
  [a, b].forEach((v, k) => {
    let pts = v
      .map((num, i) => {
        let ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
        return [
          cx + (Math.cos(ang) * R * num) / 5,
          cy + (Math.sin(ang) * R * num) / 5,
        ].join(',');
      })
      .join(' ');
    node(s, 'polygon', {
      points: pts,
      fill: k ? '#18a48733' : '#4567d633',
      stroke: colors[k],
      'stroke-width': 3,
    });
  });
}
function heatmap(s, labels, values) {
  clear(s);
  let x = 120,
    y = 36,
    cw = 89,
    ch = 35;
  let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  labels.forEach((t, i) =>
    txt(s, x + i * cw + cw / 2, 23, t, { 'text-anchor': 'middle' }),
  );
  days.forEach((day, j) => {
    txt(s, x - 12, y + j * ch + 23, day, { 'text-anchor': 'end' });
    labels.forEach((_, i) => {
      let v = values[j][i];
      rect(
        s,
        x + i * cw,
        y + j * ch,
        cw - 5,
        ch - 5,
        `rgba(31,132,177,${0.12 + (v / 100) * 0.85})`,
        5,
      );
      txt(s, x + i * cw + (cw - 5) / 2, y + j * ch + 21, v, {
        'text-anchor': 'middle',
        fill: v > 48 ? '#fff' : '#38516e',
        'font-size': 12,
        'font-weight': 700,
      });
    });
  });
  txt(s, 120, 249, 'Visits · fixed scale: 0 (light) to 100 (dark)', {
    'font-size': 12,
  });
}
function histogram(s, counts) {
  clear(s);
  const x = 65,
    y = 20,
    w = 620,
    h = 200,
    max = Math.max(1, ...counts) * 1.15;
  axes(s, x, y, w, h, max);
  counts.forEach((value, i) => {
    const width = w / counts.length,
      bh = (value / max) * h;
    rect(s, x + i * width, y + h - bh, width, bh, colors[0], 0, {
      stroke: '#fff',
      'stroke-width': 1,
    });
    txt(s, x + (i + 0.5) * width, y + h - bh - 5, value, {
      'text-anchor': 'middle',
      'font-size': 11,
    });
    txt(
      s,
      x + (i + 0.5) * width,
      241,
      ['0–<20', '20–<40', '40–<60', '60–<80', '80–100'][i],
      { 'text-anchor': 'middle', 'font-size': 11 },
    );
  });
  txt(s, 375, 262, 'Score interval · frequency (observations)', {
    'text-anchor': 'middle',
    'font-size': 11,
  });
}
function stacked(s, labels, groups) {
  clear(s);
  let x = 65,
    y = 20,
    w = 620,
    h = 200;
  let totals = labels.map((_, i) =>
      groups.reduce((acc, row) => acc + row[i], 0),
    ),
    max = Math.max(1, ...totals) * 1.12;
  axes(s, x, y, w, h, max);
  let gap = w / labels.length;
  labels.forEach((name, i) => {
    let base = y + h;
    groups.forEach((g, k) => {
      let bh = (g[i] / max) * h;
      rect(s, x + i * gap + gap * 0.2, base - bh, gap * 0.6, bh, colors[k], 0);
      base -= bh;
    });
    txt(s, x + (i + 0.5) * gap, 244, name, { 'text-anchor': 'middle' });
  });
}
function bullet(s, labels, actual, target) {
  clear(s);
  const max = Math.max(1, ...actual, ...target) * 1.2;
  labels.forEach((name, i) => {
    let yy = 34 + i * 63;
    txt(s, 44, yy, name, { 'font-size': 13, 'font-weight': 750 });
    rect(s, 180, yy - 16, 425, 27, '#e9edf6', 5);
    rect(s, 180, yy - 16, (425 * actual[i]) / max, 27, colors[i], 5);
    let xx = 180 + (425 * target[i]) / max;
    line(s, xx, yy - 21, xx, yy + 16, '#18243a', 3);
    txt(s, 615, yy, `${actual[i]} / ${target[i]}`, { 'font-size': 11 });
  });
  txt(s, 180, 255, 'Colored bar = actual   |   Black marker = target', {
    'font-size': 12,
  });
}
