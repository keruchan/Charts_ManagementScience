// Curated outcomes are deliberate counterexamples, not forecasts or real records.
const outcomeSets = {
  line: [
    ['Growth with a setback', [40, 48, 45, 59, 65, 72]],
    ['Steady decline', [75, 66, 59, 50, 42, 31]],
    ['No change', [50, 50, 50, 50, 50, 50]],
    ['Recovery', [70, 48, 25, 36, 52, 70]],
    ['One unusual spike', [40, 42, 41, 95, 43, 42]],
    ['Zero starting value', [0, 0, 12, 25, 35, 45]],
    ['No activity', [0, 0, 0, 0, 0, 0]],
  ],
  column: [
    ['Clear leader', [92, 61, 77, 40]],
    ['Tied leaders', [80, 80, 45, 20]],
    ['Equal demand', [50, 50, 50, 50]],
    ['One inactive product', [0, 35, 70, 20]],
    ['Concentrated demand', [180, 8, 5, 3]],
    ['No sales', [0, 0, 0, 0]],
  ],
  bar: [
    ['Uneven complaint counts', [14, 31, 9, 22]],
    ['Tied highest counts', [30, 30, 10, 20]],
    ['Equal counts', [12, 12, 12, 12]],
    ['One branch without complaints', [0, 18, 9, 6]],
    ['No complaints recorded', [0, 0, 0, 0]],
  ],
  pie: [
    ['Mixed allocation', [45, 25, 20, 10]],
    ['Equal allocation', [25, 25, 25, 25]],
    ['Dominant category', [90, 5, 3, 2]],
    ['Zero allocation', [60, 0, 25, 15]],
    ['Only one category', [0, 100, 0, 0]],
    ['No allocation', [0, 0, 0, 0]],
  ],
  scatter: [
    [
      'Positive association',
      [
        [10, 20],
        [20, 28],
        [30, 35],
        [40, 44],
        [50, 47],
        [60, 60],
        [70, 68],
        [80, 76],
        [90, 90],
      ],
    ],
    [
      'Negative association',
      [
        [10, 95],
        [20, 81],
        [30, 74],
        [40, 66],
        [50, 50],
        [60, 46],
        [70, 34],
        [80, 25],
        [90, 17],
      ],
    ],
    [
      'No linear association',
      [
        [10, 50],
        [20, 80],
        [30, 25],
        [40, 65],
        [50, 35],
        [60, 65],
        [70, 25],
        [80, 80],
        [90, 50],
      ],
    ],
    [
      'Curved relationship',
      [
        [10, 90],
        [20, 55],
        [30, 30],
        [40, 15],
        [50, 10],
        [60, 15],
        [70, 30],
        [80, 55],
        [90, 90],
      ],
    ],
    [
      'Influential outlier',
      [
        [10, 20],
        [20, 24],
        [30, 28],
        [40, 32],
        [50, 36],
        [60, 40],
        [70, 44],
        [80, 48],
        [90, 5],
      ],
    ],
    [
      'Constant spending',
      [
        [50, 20],
        [50, 35],
        [50, 60],
        [50, 80],
      ],
    ],
  ],
  funnel: [
    ['Typical attrition', [500, 260, 120, 60, 45]],
    ['Strong retention', [500, 480, 450, 420, 400]],
    ['Screening bottleneck', [500, 60, 55, 50, 45]],
    ['No stage losses', [100, 100, 100, 100, 100]],
    ['No final conversions', [500, 260, 120, 60, 0]],
    ['No applicants', [0, 0, 0, 0, 0]],
  ],
  radar: [
    ['Different strengths', [5, 3, 4, 3, 4]],
    ['Balanced team', [4, 4, 4, 4, 4]],
    ['Quality specialist', [2, 5, 2, 3, 2]],
    ['Identical profiles', [3, 5, 4, 4, 3]],
    ['Consistently low scores', [1, 1, 1, 1, 1]],
    ['Consistently high scores', [5, 5, 5, 5, 5]],
  ],
  heatmap: [
    [
      'Late-week peak',
      [
        [15, 32, 55, 62, 38],
        [18, 39, 61, 70, 44],
        [12, 29, 52, 64, 49],
        [21, 44, 69, 78, 56],
        [35, 57, 82, 94, 76],
      ],
    ],
    ['Uniform activity', Array.from({ length: 5 }, () => [40, 40, 40, 40, 40])],
    ['Morning peak', Array.from({ length: 5 }, () => [95, 70, 40, 20, 10])],
    [
      'Isolated hotspot',
      [
        [10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10],
        [10, 10, 99, 10, 10],
        [10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10],
      ],
    ],
    ['No visits', Array.from({ length: 5 }, () => [0, 0, 0, 0, 0])],
  ],
  histogram: [
    ['Mostly high scores', [2, 6, 11, 23, 18]],
    ['Mostly low scores', [28, 16, 8, 5, 3]],
    ['Centered distribution', [3, 12, 30, 12, 3]],
    ['Two peaks', [23, 5, 2, 5, 23]],
    ['Uniform distribution', [12, 12, 12, 12, 12]],
    ['No observations', [0, 0, 0, 0, 0]],
  ],
  stacked: [
    [
      'Increasing totals',
      [
        [25, 34, 31, 47],
        [16, 20, 30, 28],
        [8, 12, 16, 20],
      ],
    ],
    [
      'Declining totals',
      [
        [47, 31, 20, 10],
        [28, 25, 16, 8],
        [20, 16, 8, 4],
      ],
    ],
    [
      'Same totals, changing mix',
      [
        [60, 40, 20, 10],
        [30, 40, 50, 50],
        [10, 20, 30, 40],
      ],
    ],
    [
      'One absent channel',
      [
        [25, 30, 35, 40],
        [0, 0, 0, 0],
        [15, 20, 25, 30],
      ],
    ],
    [
      'No orders',
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
  ],
  bullet: [
    ['Mixed results', [92, 93, 67]],
    ['All above target', [120, 100, 105]],
    ['Exactly on target', [100, 85, 90]],
    ['All below target', [70, 65, 60]],
    ['No sales', [0, 0, 0]],
  ],
};
outcomeSets.area = outcomeSets.line;
const scoreBins = ['0–<20', '20–<40', '40–<60', '60–<80', '80–100'];
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const channelNames = ['Online', 'Walk-in', 'Partner'];
const total = (values) => values.reduce((sum, value) => sum + value, 0);
const percent = (part, whole) =>
  whole
    ? `${((part / whole) * 100).toFixed(1)}%`
    : 'undefined (zero denominator)';

function generateValues(config) {
  const integer = (max) => Math.floor(Math.random() * (max + 1));
  if (config.key === 'scatter')
    return Array.from({ length: 10 }, (_, i) => [i * 10 + 5, integer(100)]);
  if (config.key === 'heatmap')
    return Array.from({ length: 5 }, () =>
      Array.from({ length: 5 }, () => integer(100)),
    );
  if (config.key === 'stacked')
    return Array.from({ length: 3 }, () =>
      Array.from({ length: 4 }, () => integer(60)),
    );
  if (config.key === 'funnel') {
    let count = integer(600);
    return config.labels.map((_, i) => {
      if (i) count = Math.floor(count * Math.random());
      return count;
    });
  }
  if (config.key === 'radar') return config.labels.map(() => 1 + integer(4));
  return config.values.map(() => integer(config.key === 'bullet' ? 140 : 100));
}

function describeOutcome(c) {
  const v = c.values;
  const leaders = (labels, values) =>
    labels.filter((_, i) => values[i] === Math.max(...values)).join(', ');
  switch (c.key) {
    case 'line':
    case 'area': {
      const first = v[0],
        last = v.at(-1),
        change = last - first;
      const falls = v.slice(1).filter((value, i) => value < v[i]).length;
      return {
        scenario:
          c.key === 'line'
            ? 'Monthly store revenue, in thousands of pesos, from January to June.'
            : 'Monthly active users, in thousands, from January to June. Each month is a separate count, not a running total.',
        question: 'What changed over the period, and was the path consistent?',
        answer: `The series moves from ${first} to ${last}: ${change > 0 ? '+' : ''}${change} thousand (${first ? percent(change, first) : 'percentage change undefined because the starting value is zero'}). There are ${falls} month-to-month declines. ${new Set(v).size === 1 ? 'All observations are equal.' : 'The endpoint change alone does not describe every fluctuation.'} These six observations do not establish a forecast.`,
      };
    }
    case 'column':
    case 'bar': {
      const complaints = c.key === 'bar';
      return {
        scenario: complaints
          ? 'Reported complaints by branch. Order volumes are not supplied.'
          : 'Units sold by product during the same reporting period.',
        question: complaints
          ? 'Which branches share the highest complaint count?'
          : 'Which products share the highest sales count?',
        answer: `Highest count: ${leaders(c.labels, v)} (${Math.max(...v)} each). Total: ${total(v)}. ${complaints ? 'Counts alone cannot establish the worst service: compare complaints per order and complaint severity.' : 'Sales are not the same as profit or reorder need; stock on hand and supplier lead times also matter.'}`,
      };
    }
    case 'pie':
      return {
        scenario:
          'A ₱100,000 budget is allocated in proportion to the displayed weights. Zero weights receive no allocation.',
        question: 'What is Marketing’s share and budget allocation?',
        answer: total(v)
          ? `Marketing: ${percent(v[1], total(v))}, or ${money((100000 * v[1]) / total(v))}. The chart normalizes weights by their total (${total(v)}); weights need not already be percentages. Displayed percentages may differ slightly from 100% due to rounding.`
          : 'All weights are zero. There is no defined composition or Marketing share; a zero total cannot be normalized.',
      };
    case 'scatter': {
      const xs = v.map((p) => p[0]),
        ys = v.map((p) => p[1]);
      const mx = total(xs) / v.length,
        my = total(ys) / v.length;
      const variance =
        total(xs.map((x) => (x - mx) ** 2)) *
        total(ys.map((y) => (y - my) ** 2));
      const r = variance
        ? total(v.map(([x, y]) => (x - mx) * (y - my))) / Math.sqrt(variance)
        : null;
      return {
        scenario: `${v.length} campaign pairs: marketing spending (₱ thousands) and a sales index. These are different measures.`,
        question: 'What does the linear association indicate?',
        answer: `Pearson r: ${r === null ? 'undefined because at least one variable is constant' : r.toFixed(3)}. ${r === null ? 'A constant variable prevents estimating linear correlation.' : Math.abs(r) < 0.2 ? 'There is little linear association; a curved relationship may still exist.' : `The sample has a ${r > 0 ? 'positive' : 'negative'} linear association.`} Inspect the dot pattern for curves and influential outliers. Association does not prove causation.`,
      };
    }
    case 'funnel':
      return {
        scenario:
          'One recruitment cohort progresses through Applied, Screened, Interviewed, Offered, and Hired. Counts cannot increase between stages.',
        question:
          'What proportion reached the final stage, and where were applicants lost?',
        answer: `Overall hire conversion: ${percent(v.at(-1), v[0])}. ${c.labels
          .slice(1)
          .map(
            (label, i) =>
              `${c.labels[i]} → ${label}: ${v[i] - v[i + 1]} lost; ${percent(v[i + 1], v[i])} retained`,
          )
          .join(
            '; ',
          )}. Counts identify where attrition occurs, but not its cause.`,
      };
    case 'radar':
      return {
        scenario:
          'Team A and Team B use the same 1–5 competency scale; higher is better. Team B is a fixed comparison profile.',
        question:
          'How do the teams compare on quality and across all competencies?',
        answer: `Quality: Team A ${v[1]}, Team B ${c.other[1]}. Team A scores higher on ${v.filter((value, i) => value > c.other[i]).length} of ${v.length} competencies and ties on ${v.filter((value, i) => value === c.other[i]).length}. Project priorities determine how those scores should be weighted; polygon area is not a decision score.`,
      };
    case 'heatmap': {
      const flat = v.flat(),
        max = Math.max(...flat);
      const locations = v.flatMap((row, j) =>
        row.flatMap((value, i) =>
          value === max ? [`${weekdays[j]} ${c.labels[i]}`] : [],
        ),
      );
      return {
        scenario:
          'Observed store visits by weekday and time slot. All cells use the same fixed 0–100 color scale.',
        question: 'Where is activity concentrated?',
        answer: `${total(flat) === 0 ? 'No visits are recorded.' : new Set(flat).size === 1 ? `All 25 slots have ${max} visits; there is no unique hotspot.` : `Peak: ${max} visits at ${locations.join(', ')}.`} Total across cells: ${total(flat)} visits. A single week does not establish recurring seasonality.`,
      };
    }
    case 'histogram':
      return {
        scenario:
          'Score frequencies in five equal-width intervals: 0≤score<20, 20≤score<40, 40≤score<60, 60≤score<80, and 80≤score≤100.',
        question:
          'Which score intervals are most frequent, and what cannot be inferred?',
        answer: total(v)
          ? `Modal interval(s): ${leaders(scoreBins, v)} (${Math.max(...v)} observations each). Sample size: ${total(v)}. Grouped counts do not reveal exact scores, the exact mean, or the exact median. Bin boundaries affect the apparent shape.`
          : 'There are no observations. A mode, mean, or distribution shape cannot be inferred from an empty sample.',
      };
    case 'stacked': {
      const sums = c.labels.map((_, i) => total(v.map((row) => row[i])));
      return {
        scenario:
          'Quarterly orders split into mutually exclusive Online, Walk-in, and Partner channels.',
        question:
          'Which quarters have the highest total, and how does the mix vary?',
        answer: `Highest total: ${leaders(c.labels, sums)} (${Math.max(...sums)} orders each). ${c.labels.map((label, i) => `${label}: ${sums[i]} orders; online share ${percent(v[0][i], sums[i])}`).join('; ')}. Equal totals can conceal a changing channel mix.`,
      };
    }
    case 'bullet':
      return {
        scenario:
          'Branch sales in units compared with fixed targets. Higher is better. Bars use one shared scale.',
        question: 'Which branches exceeded, met, or missed their targets?',
        answer: c.labels
          .map(
            (label, i) =>
              `${label}: ${v[i]} / ${c.targets[i]} (${percent(v[i], c.targets[i])}); ${v[i] > c.targets[i] ? `exceeded by ${v[i] - c.targets[i]}` : v[i] === c.targets[i] ? 'met target exactly' : `missed by ${c.targets[i] - v[i]}`} units.`,
          )
          .join(' '),
      };
  }
}
