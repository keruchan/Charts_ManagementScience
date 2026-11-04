// Lightweight, manual carousel. Visuals are local HTML/SVG, with no image downloads.
const conceptSvg = (label, content) =>
  `<svg viewBox="0 0 560 300" role="img" aria-label="${label}">${content}</svg>`;
const conceptText = (x, y, text, extra = '') =>
  `<text x="${x}" y="${y}" ${extra}>${text}</text>`;
const conceptBars = (
  values,
  labels,
  max,
  x = 65,
  y = 60,
  width = 430,
  height = 170,
) => {
  const gap = width / values.length;
  return (
    `<path d="M${x} ${y}V${y + height}H${x + width}" class="concept-axis"/>` +
    values
      .map((v, i) => {
        const barHeight = (v / max) * height;
        return `<rect x="${x + i * gap + gap * 0.23}" y="${y + height - barHeight}" width="${gap * 0.54}" height="${barHeight}" rx="4" fill="${i % 2 ? '#18a487' : '#4567d6'}"/>${conceptText(x + (i + 0.5) * gap, y + height + 25, labels[i], 'text-anchor="middle"')}${conceptText(x + (i + 0.5) * gap, y + height - barHeight - 10, v, 'text-anchor="middle" class="concept-value"')}`;
      })
      .join('')
  );
};
const conceptLine = (values, x, y, width, height, max = 100, extra = '') =>
  `<polyline points="${values.map((v, i) => `${x + (i * width) / (values.length - 1)},${y + height - (v / max) * height}`).join(' ')}" fill="none" stroke="#4567d6" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" ${extra}/>`;

function conceptVisual(index) {
  switch (index) {
    case 0:
      return `<div class="concept-comparison"><div class="concept-visual-box"><span class="concept-visual-label">TABLE · exact values</span><table class="concept-source-table"><caption>Monthly sales · ₱ thousands</caption><thead><tr><th scope="col">Month</th><th scope="col">Sales</th></tr></thead><tbody>${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => `<tr><th scope="row">${month}</th><td>${[40, 48, 45, 59, 65, 72][i]}</td></tr>`).join('')}</tbody></table></div><div class="concept-visual-box"><span class="concept-visual-label">GRAPH · the pattern</span>${conceptSvg('The same sales rise from 40 to 72 thousand pesos, with a dip in March.', `${[0, 40, 80].map((v) => `<path d="M45 ${230 - (v / 80) * 165}H525" class="concept-grid"/>${conceptText(35, 235 - (v / 80) * 165, v, 'text-anchor="end"')}`).join('')}${conceptLine([40, 48, 45, 59, 65, 72], 45, 65, 480, 165, 80)}${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => conceptText(45 + i * 96, 259, m, 'text-anchor="middle"')).join('')}${conceptText(45, 35, 'Sales · ₱ thousands')}`)}<p class="concept-visual-caption">Growth, a dip, then recovery—visible together.</p></div></div>`;
    case 1:
      return `<div class="concept-type-grid"><div><span class="concept-visual-label">CATEGORIES</span><strong>North · South</strong><span>Separate groups → bars</span></div><div><span class="concept-visual-label">ORDERED LEVELS</span><strong>Low → Medium → High</strong><span>Keep the meaningful order</span></div><div><span class="concept-visual-label">NUMBERS</span><strong>12 · 28 · 46</strong><span>Amounts → position or length</span></div><div><span class="concept-visual-label">TIME</span><strong>Jan → Feb → Mar</strong><span>Sequence → a line</span></div></div>`;
    case 2:
      return conceptSvg(
        'Bars encode 20 and 40 through length. Circles encode the same values through area; the 40 circle has twice the area, not twice the radius.',
        `${conceptText(40, 35, 'LENGTH')}${conceptText(325, 35, 'AREA')}<rect x="40" y="90" width="85" height="35" rx="5" fill="#4567d6"/><rect x="40" y="170" width="170" height="35" rx="5" fill="#18a487"/>${conceptText(138, 114, '20')}${conceptText(223, 194, '40')}<circle cx="360" cy="115" r="30" fill="#4567d6"/><circle cx="470" cy="115" r="42.43" fill="#18a487"/>${conceptText(360, 120, '20', 'text-anchor="middle" fill="white"')}${conceptText(470, 120, '40', 'text-anchor="middle" fill="white"')}${conceptText(325, 210, '2× value = 2× area')}${conceptText(325, 238, 'Radius grows by √2')}`,
      );
    case 3:
      return `<div class="concept-comparison"><div class="concept-visual-box"><span class="concept-visual-label">COMPLAINT COUNT</span>${conceptSvg('North has 30 complaints; South has 12.', conceptBars([30, 12], ['North', 'South'], 35))}</div><div class="concept-visual-box"><span class="concept-visual-label">COMPLAINT RATE · %</span>${conceptSvg('North: 30 complaints in 3000 orders, 1 percent. South: 12 in 400 orders, 3 percent.', conceptBars([1, 3], ['North', 'South'], 3.5))}</div></div><p class="concept-visual-caption">North: 30 / 3,000 orders · South: 12 / 400 orders</p>`;
    case 4:
      return conceptSvg(
        'Two weeks each total 70 orders. Week A has 10 orders daily. Week B has zero orders on Wednesday and Thursday and a Saturday peak of 30.',
        `${conceptText(40, 30, 'SAME WEEKLY TOTAL: 70 ORDERS')}${conceptText(40, 65, 'Week A · consistent')}${conceptLine([10, 10, 10, 10, 10, 10, 10], 55, 80, 450, 65, 30)}${conceptText(40, 170, 'Week B · closures and a peak')}${conceptLine([10, 10, 0, 0, 10, 30, 10], 55, 185, 450, 65, 30)}${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((v, i) => conceptText(55 + i * 75, 280, v, 'text-anchor="middle"')).join('')}`,
      );
    case 5:
      return conceptSvg(
        'Both delivery samples average 10 minutes. One sample has five observations at 10; the other has 2, 4, 10, 14 and 20 minutes.',
        `${conceptText(35, 35, 'SAME MEAN · DIFFERENT CONSISTENCY')}${conceptText(35, 85, 'A')}${conceptText(35, 185, 'B')}<path d="M65 110H515M65 210H515" class="concept-axis"/>${[0, 1, 2, 3, 4].map((i) => `<circle cx="290" cy="${100 - i * 13}" r="6" fill="#4567d6"/>`).join('')}${[2, 4, 10, 14, 20].map((v) => `<circle cx="${65 + v * 22.5}" cy="195" r="7" fill="#18a487"/>`).join('')}${[0, 5, 10, 15, 20].map((v) => conceptText(65 + v * 22.5, 245, v, 'text-anchor="middle"')).join('')}${conceptText(290, 280, 'Delivery time · minutes', 'text-anchor="middle"')}`,
      );
    case 6:
      return `<div class="concept-type-grid concept-number-cards"><div><span class="concept-visual-label">SMALLER START</span><strong>₱10k → ₱15k</strong><span class="concept-number">+50%</span><span>₱5,000 added</span></div><div><span class="concept-visual-label">LARGER START</span><strong>₱100k → ₱105k</strong><span class="concept-number">+5%</span><span>₱5,000 added</span></div></div><p class="concept-visual-caption">A rate moving from 20% to 25% gains 5 percentage points, or 25% relative growth.</p>`;
    case 7:
      return conceptSvg(
        'On a linear scale 10 and 100 are close compared to 1000. On a logarithmic scale 10, 100, and 1000 are equally spaced because each step multiplies by ten.',
        `${conceptText(40, 40, 'LINEAR · equal distances = equal differences')}<path d="M55 110H505" class="concept-axis"/>${[10, 100, 1000].map((v, i) => `<circle cx="${55 + (v / 1000) * 450}" cy="110" r="6" fill="#4567d6"/>${conceptText(55 + (v / 1000) * 450, i === 0 ? 90 : 140, v, 'text-anchor="middle"')}`).join('')}${conceptText(40, 195, 'LOGARITHMIC · equal distances = equal ratios')}<path d="M55 240H505" class="concept-axis"/>${[10, 100, 1000].map((v, i) => `<circle cx="${55 + i * 225}" cy="240" r="6" fill="#18a487"/>${conceptText(55 + i * 225, 270, v, 'text-anchor="middle"')}`).join('')}`,
      );
    case 8:
      return conceptSvg(
        'Recurring peaks differ from a single spike. One line peaks repeatedly; the dashed line spikes once.',
        `${conceptText(40, 32, 'REPEATING PATTERN OR ONE-TIME EVENT?')}<path d="M45 70V240H520" class="concept-axis"/>${conceptLine([20, 40, 75, 40, 20, 40, 75, 40, 20, 40, 75, 40], 45, 70, 475, 170)}${conceptLine([15, 15, 15, 15, 15, 90, 15, 15, 15, 15, 15, 15], 45, 70, 475, 170, 100, 'stroke-dasharray="8 6" style="stroke:#18a487"')}${conceptText(45, 275, 'Solid: recurring peaks · Dashed: a single spike')}`,
      );
    case 9:
      return conceptSvg(
        'Illustrative forecast: observations end at the vertical boundary; the forecast is dashed and its prediction range widens.',
        `${conceptText(40, 30, 'OBSERVED')}${conceptText(330, 30, 'FORECAST')}<path d="M45 235H520" class="concept-axis"/><path d="M290 50V245" stroke="#aab6cd" stroke-dasharray="5 5"/><path d="M290 145L365 105L440 65L515 40L515 185L440 175L365 165Z" fill="#dce5ff"/>${conceptLine([20, 35, 30, 50], 45, 65, 245, 170)}${conceptLine([50, 59, 69, 78], 290, 65, 225, 170, 100, 'stroke-dasharray="7 7"')}${conceptText(320, 265, 'Illustrative prediction range')}`,
      );
    case 10:
      return `<div class="concept-comparison"><div class="concept-visual-box"><span class="concept-visual-label">EXPLORE · What stands out?</span>${conceptSvg('Explore product values A 40, B 75, C 55.', conceptBars([40, 75, 55], ['A', 'B', 'C'], 90))}</div><div class="concept-visual-box"><span class="concept-visual-label">EXPLAIN · B leads with 75</span>${conceptSvg('The same values with product B emphasized.', `<path d="M65 60V230H495" class="concept-axis"/>${[40, 75, 55].map((v, i) => `<rect x="${100 + i * 140}" y="${230 - (v / 90) * 170}" width="65" height="${(v / 90) * 170}" rx="4" fill="${i === 1 ? '#4567d6' : '#dce3f1'}"/>${conceptText(132 + i * 140, 260, ['A', 'B', 'C'][i], 'text-anchor="middle"')}${conceptText(132 + i * 140, 220 - (v / 90) * 170, v, 'text-anchor="middle"')}`).join('')}`)}</div></div>`;
    case 11:
      return conceptSvg(
        'Two directly labeled lines use both color and style: North is solid blue with circles; South is dashed green with squares.',
        `<path d="M40 245H520" class="concept-axis"/>${conceptLine([30, 45, 40, 65, 80], 45, 45, 380, 200)}${conceptLine([15, 25, 35, 40, 50], 45, 45, 380, 200, 100, 'stroke-dasharray="8 6" style="stroke:#18a487"')}${[30, 45, 40, 65, 80].map((v, i) => `<circle cx="${45 + i * 95}" cy="${245 - v * 2}" r="5" fill="#4567d6"/>`).join('')}${[15, 25, 35, 40, 50].map((v, i) => `<rect x="${40 + i * 95}" y="${240 - v * 2}" width="10" height="10" fill="#18a487"/>`).join('')}${conceptText(440, 90, 'North')}${conceptText(440, 150, 'South')}${conceptText(45, 280, 'Color + line style + shape + direct labels')}`,
      );
    case 12:
      return `<div class="concept-context"><span class="concept-visual-label">WHAT DOES “SALES” INCLUDE?</span><div class="concept-equation"><div><span>Gross sales</span><strong>₱120k</strong></div><span aria-hidden="true">−</span><div><span>Refunds</span><strong>₱20k</strong></div><span aria-hidden="true">=</span><div><span>Net sales</span><strong>₱100k</strong></div></div><div class="concept-context-tags"><span>Period: January</span><span>Scope: all branches</span><span>Source: synthetic orders</span></div><p class="concept-visual-caption">A number gains meaning when its definition and source are visible.</p></div>`;
  }
}

const conceptSlides = [
  [
    'Why visualization matters',
    'Tables give precision. Graphs reveal patterns.',
    'A table answers “What was March’s sales?” A graph makes growth, dips, and unusual changes easier to see. Use both when people need the pattern and the exact numbers.',
    'Same data. Different strengths.',
  ],
  [
    'Data types',
    'Match the visual to the kind of data.',
    'Groups, ordered levels, measurements, and dates carry different meaning. The chart should preserve those differences.',
    'A sequence needs a meaningful order.',
  ],
  [
    'Visual encoding',
    'Every mark stands for a value.',
    'Position, length, area, and color turn numbers into visible differences. Clear labels and a shared scale make those differences easier to compare.',
    'Twice the value should not look four times bigger.',
  ],
  [
    'Counts & rates',
    'More complaints. A lower complaint rate.',
    'Counts show workload. Rates show the share affected. Changing the denominator can change which branch needs attention.',
    'Ask: “Out of how many?”',
  ],
  [
    'Aggregation',
    'A total can hide the story underneath.',
    'Two weeks can have identical totals but very different daily patterns. Summary views reveal the big picture; detailed views reveal interruptions and peaks.',
    'Zoom in before explaining a change.',
  ],
  [
    'Distribution',
    'The average is only part of the story.',
    'Both services average 10 minutes. Only one delivers consistently. The spread, extreme values, and shape of a distribution explain what an average leaves out.',
    'Same average ≠ same experience.',
  ],
  [
    'Change',
    'The starting point changes the percentage.',
    'Absolute change shows how much was added. Relative change shows growth compared with the starting amount. Percentage points describe the difference between two percentages.',
    'Show the size of the change and its base.',
  ],
  [
    'Scales',
    'The axis is part of the message.',
    'Linear scales compare numerical differences. Log scales compare ratios. Consistent scales matter when comparing panels, and ordinary log scales exclude zero and negative values.',
    'Read the scale before reading the shape.',
  ],
  [
    'Time patterns',
    'A spike is not automatically a trend.',
    'A repeating calendar pattern suggests seasonality. A single surge may be an unusual event. The reporting period and comparable dates affect what the pattern means.',
    'Recurrence needs repeated observations.',
  ],
  [
    'Uncertainty',
    'A forecast is an estimate, not a fact.',
    'Separate observed data from projected values. A labeled range communicates uncertainty; sample size and sampling method affect how confidently results can be generalized.',
    'The band needs a definition.',
  ],
  [
    'Explore & explain',
    'Investigate first. Then communicate a finding.',
    'Exploration keeps possibilities open. Explanation focuses attention on a supported result. A clear title and a relevant highlight can turn a chart into a message.',
    'Emphasis should follow the evidence.',
  ],
  [
    'Accessibility',
    'Make meaning visible in more than color.',
    'Direct labels, line styles, and marker shapes help more people follow a chart. Readable contrast, text descriptions, and data tables provide additional ways to understand it.',
    'More than one cue. One clear meaning.',
  ],
  [
    'Context & trust',
    'Define the number before drawing conclusions.',
    'A chart needs a source, period, units, and inclusion rules. Gross sales and net sales answer different questions. Synthetic examples illustrate possibilities; observed records describe a particular situation.',
    'A precise number still needs context.',
  ],
];

const conceptTrack = document.querySelector('#conceptTrack');
const conceptDots = document.querySelector('#conceptDots');
const conceptWindow = document.querySelector('.concept-window');
let conceptIndex = 0;
conceptSlides.forEach(([topic, title, summary, takeaway], index) => {
  const slide = document.createElement('article');
  slide.className = 'concept-slide';
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-roledescription', 'slide');
  slide.setAttribute(
    'aria-label',
    `${index + 1} of ${conceptSlides.length}: ${topic}`,
  );
  slide.innerHTML = `<div class="concept-copy"><span class="concept-topic">${String(index + 1).padStart(2, '0')} / ${topic}</span><h3>${title}</h3><p>${summary}</p><div class="concept-takeaway">${takeaway}</div>${index ? `<details class="concept-more"><summary>Read more</summary>${conceptDiscussions[index - 1].details}</details>` : '<p class="concept-footnote">Example: March = ₱45k. January to June = +80%.</p>'}</div><div class="concept-art">${conceptVisual(index)}</div>`;
  conceptTrack.append(slide);
  const dot = document.createElement('button');
  dot.className = 'concept-dot';
  dot.setAttribute('aria-label', `Go to slide ${index + 1}: ${topic}`);
  dot.setAttribute('aria-controls', 'conceptTrack');
  dot.title = topic;
  dot.addEventListener('click', () => showConcept(index));
  conceptDots.append(dot);
});

function sizeConceptWindow() {
  conceptWindow.style.height = `${conceptTrack.children[conceptIndex].getBoundingClientRect().height}px`;
}
function showConcept(index) {
  conceptIndex = (index + conceptSlides.length) % conceptSlides.length;
  conceptTrack.style.transform = `translateX(-${conceptIndex * 100}%)`;
  [...conceptTrack.children].forEach((slide, i) => {
    if (i !== conceptIndex && slide.contains(document.activeElement)) {
      document
        .querySelector('.concept-carousel')
        .focus({ preventScroll: true });
    }
    slide.inert = i !== conceptIndex;
    slide.setAttribute('aria-hidden', String(i !== conceptIndex));
    if (i !== conceptIndex)
      slide.querySelectorAll('details').forEach((details) => {
        details.open = false;
      });
  });
  [...conceptDots.children].forEach((dot, i) =>
    dot.setAttribute('aria-current', String(i === conceptIndex)),
  );
  document.querySelector('#conceptCount').textContent =
    `${String(conceptIndex + 1).padStart(2, '0')} / ${conceptSlides.length}`;
  sizeConceptWindow();
}
document
  .querySelector('#conceptPrevious')
  .addEventListener('click', () => showConcept(conceptIndex - 1));
document
  .querySelector('#conceptNext')
  .addEventListener('click', () => showConcept(conceptIndex + 1));
document
  .querySelector('#visualization-concepts')
  .addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    showConcept(
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? conceptSlides.length - 1
          : conceptIndex + (event.key === 'ArrowRight' ? 1 : -1),
    );
  });
let conceptTouchStart = null;
conceptWindow.addEventListener(
  'touchstart',
  (event) => {
    if (event.touches.length === 1 && !event.target.closest('details'))
      conceptTouchStart = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
  },
  { passive: true },
);
conceptWindow.addEventListener(
  'touchend',
  (event) => {
    if (!conceptTouchStart) return;
    const dx = event.changedTouches[0].clientX - conceptTouchStart.x,
      dy = event.changedTouches[0].clientY - conceptTouchStart.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5)
      showConcept(conceptIndex + (dx < 0 ? 1 : -1));
    conceptTouchStart = null;
  },
  { passive: true },
);
conceptWindow.addEventListener('touchcancel', () => {
  conceptTouchStart = null;
});
const conceptObserver = new ResizeObserver(sizeConceptWindow);
[...conceptTrack.children].forEach((slide) => conceptObserver.observe(slide));
showConcept(0);
document
  .querySelector('#resetBtn')
  .addEventListener('click', () => showConcept(0));
