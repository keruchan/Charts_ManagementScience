// One row represents one completed order. Fixed seed keeps scenarios reproducible.
const branches = ['North', 'Central', 'South'];
const products = ['Beverages', 'Snacks', 'Meals', 'Desserts'];
const channels = ['Walk-in', 'Online', 'Partner'];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
function createTransactions(scenario) {
  if (scenario === 'empty') return [];
  let seed = 2026;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const rows = [];
  for (let month = 0; month < 12; month++) {
    for (const [b, branch] of branches.entries())
      for (const [p, product] of products.entries())
        for (const channel of channels) {
          // Complete reporting coverage: omitted orders mean observed zero activity, not missing records.
          if (
            scenario === 'sparse' &&
            (month % 3 !== 0 ||
              branch !== 'North' ||
              product !== 'Meals' ||
              channel !== 'Online')
          )
            continue;
          const factor =
            scenario === 'decline'
              ? 1.8 - month * 0.1
              : scenario === 'seasonal'
                ? [0.7, 0.7, 0.9, 1, 1.1, 1.5, 1.8, 1.5, 1, 0.8, 1.3, 1.9][
                    month
                  ]
                : scenario === 'flat'
                  ? 1
                  : 0.8 + month * 0.09;
          const orderCount =
            scenario === 'flat' ? 3 : 1 + Math.floor(random() * 5);
          for (let order = 0; order < orderCount; order++) {
            const revenue = Math.round(
              (1100 +
                p * 440 +
                b * 310 +
                (scenario === 'flat' ? 500 : random() * 1150)) *
                factor,
            );
            const cost = Math.round(
              revenue *
                (scenario === 'loss'
                  ? 1.05 + random() * 0.3
                  : scenario === 'flat'
                    ? 0.65
                    : 0.53 + random() * 0.23),
            );
            rows.push({
              id: rows.length + 1,
              month,
              quarter: 'Q' + (Math.floor(month / 3) + 1),
              branch,
              product,
              channel,
              revenue,
              cost,
            });
          }
        }
  }
  return rows;
}
let transactions = createTransactions('growth');
for (const [id, list] of [
  ['filterBranch', branches],
  ['filterProduct', products],
  ['filterChannel', channels],
])
  list.forEach((value) => $('#' + id).add(new Option(value, value)));
function compactPeso(value) {
  return value >= 1e6
    ? '₱' + (value / 1e6).toFixed(2) + 'M'
    : value >= 1000
      ? '₱' + (value / 1000).toFixed(1) + 'k'
      : money(value);
}
function dashSmallLine(svg, labels, values) {
  clear(svg);
  const max = Math.max(1, ...values) * 1.12,
    x = 65,
    y = 20,
    w = 520,
    h = 165;
  axes(svg, x, y, w, h, max);
  const points = values.map((value, i) => [
    x + (labels.length === 1 ? w / 2 : (i * w) / (labels.length - 1)),
    y + h - (value / max) * h,
  ]);
  node(svg, 'polyline', {
    points: points.map((p) => p.join(',')).join(' '),
    stroke: colors[0],
    'stroke-width': 3,
    fill: 'none',
  });
  points.forEach(([px, py], i) => {
    node(svg, 'circle', { cx: px, cy: py, r: 3, fill: colors[0] });
    txt(svg, px, 208, labels[i], { 'text-anchor': 'middle', 'font-size': 10 });
  });
  txt(svg, 65, 13, 'Revenue (₱)', { 'font-size': 10 });
}
function dashSmallBars(svg, labels, values) {
  clear(svg);
  const max = Math.max(1, ...values) * 1.13;
  labels.forEach((label, i) => {
    const y = 20 + i * 51;
    txt(svg, 8, y + 11, label, { 'font-size': 12 });
    rect(svg, 100, y - 5, 225, 22, '#edf1f9', 4);
    rect(svg, 100, y - 5, (225 * values[i]) / max, 22, colors[i], 4);
    txt(svg, 330, y + 11, compactPeso(values[i]), { 'font-size': 10 });
  });
}
function renderDashboard() {
  const filters = {
    branch: $('#filterBranch').value,
    product: $('#filterProduct').value,
    quarter: $('#filterQuarter').value,
    channel: $('#filterChannel').value,
  };
  const rows = transactions.filter((row) =>
    Object.entries(filters).every(
      ([key, value]) => value === 'All' || row[key] === value,
    ),
  );
  const revenue = total(rows.map((row) => row.revenue)),
    cost = total(rows.map((row) => row.cost)),
    count = rows.length;
  $('#kpiRevenue').textContent = compactPeso(revenue);
  $('#kpiOrders').textContent = fmt(count);
  $('#kpiAov').textContent = count ? money(revenue / count) : '—';
  $('#kpiMargin').textContent = revenue
    ? (((revenue - cost) / revenue) * 100).toFixed(1) + '%'
    : '—';
  const monthIndexes = months
    .map((_, i) => i)
    .filter(
      (i) =>
        filters.quarter === 'All' ||
        'Q' + (Math.floor(i / 3) + 1) === filters.quarter,
    );
  dashSmallLine(
    $('#dashLine'),
    monthIndexes.map((i) => months[i]),
    monthIndexes.map((i) =>
      total(rows.filter((row) => row.month === i).map((row) => row.revenue)),
    ),
  );
  dashSmallBars(
    $('#dashBars'),
    products,
    products.map((product) =>
      total(
        rows.filter((row) => row.product === product).map((row) => row.revenue),
      ),
    ),
  );
  if (!count)
    for (const id of ['dashLine', 'dashBars']) {
      clear($('#' + id));
      txt($('#' + id), 150, 100, 'No transactions in this selection', {
        'font-size': 14,
      });
    }
  $('#dashboardInsight').textContent = !count
    ? 'No matching transactions. Revenue and order count are zero; average order value and margin are undefined, shown as —.'
    : `Gross profit: ${money(revenue - cost)}. ${revenue < cost ? 'Recorded cost exceeds sales revenue. Higher sales alone do not establish profitability.' : 'Gross profit excludes overhead, tax, and other unrecorded expenses.'} Zero months represent no orders in this complete synthetic dataset; months outside the selected quarter are excluded.`;
  $('#filterSummary').textContent =
    `${$('#dashboardScenario').selectedOptions[0].text} · ${fmt(count)} synthetic orders · ${Object.entries(
      filters,
    )
      .map(([key, value]) => `${key}: ${value}`)
      .join(' · ')}. Revenue and cost are summed before calculating margin.`;
}
function resetFilters() {
  for (const id of [
    'filterBranch',
    'filterProduct',
    'filterQuarter',
    'filterChannel',
  ])
    $('#' + id).value = 'All';
  renderDashboard();
}
for (const id of [
  'filterBranch',
  'filterProduct',
  'filterQuarter',
  'filterChannel',
])
  $('#' + id).addEventListener('change', renderDashboard);
$('#dashboardScenario').addEventListener('change', () => {
  transactions = createTransactions($('#dashboardScenario').value);
  renderDashboard();
});
$('#filtersReset').addEventListener('click', resetFilters);
renderDashboard();
