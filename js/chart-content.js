const configs = [
  {
    key: 'line',
    name: 'Line chart',
    purpose: 'Trends over time',
    definition:
      'A line chart connects observations in chronological or other meaningful order to reveal direction, turning points, and fluctuations.',
    use: 'Monthly revenue, stock levels, demand, customer growth, or attendance over weeks.',
    caution:
      'Great for seeing change; use an ordered time axis and label the intervals. Not ideal for unrelated nominal categories.',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [40, 48, 45, 59, 65, 72],
    other: [44, 43, 48, 46, 53, 50],
    draw: (s, c) => drawLine(s, c.labels, c.values),
  },
  {
    key: 'column',
    name: 'Column chart',
    purpose: 'Compare categories vertically',
    definition:
      'A column chart uses vertical bars whose heights represent quantities for discrete categories.',
    use: 'Compare product sales, quarterly outcomes, or departmental expenses; especially effective with a small number of categories.',
    caution:
      'Use a zero baseline for quantities and keep category labels readable.',
    labels: ['Coffee', 'Tea', 'Juice', 'Snacks'],
    values: [92, 61, 77, 40],
    other: [50, 83, 70, 58],
    draw: (s, c) => drawBars(s, c.labels, c.values),
  },
  {
    key: 'bar',
    name: 'Horizontal bar chart',
    purpose: 'Compare or rank categories',
    definition:
      'A bar chart uses horizontal lengths to compare values across groups.',
    use: 'Rank branches, schools, suppliers, or products; especially useful for long category names.',
    caution:
      'Sort by value when ranking and use consistent units and a zero baseline.',
    labels: ['North Branch', 'Central Branch', 'South Branch', 'East Branch'],
    values: [14, 31, 9, 22],
    other: [25, 18, 16, 11],
    draw: (s, c) => drawBars(s, c.labels, c.values, true),
  },
  {
    key: 'pie',
    name: 'Pie / doughnut chart',
    purpose: 'Parts of one whole',
    definition:
      'A pie chart divides a circle into proportional slices; a doughnut chart uses the same concept with an empty center.',
    use: 'Show how a single budget, customer base, or market share divides across a few categories.',
    caution:
      'Use only mutually exclusive categories that sum to 100%; too many or near-equal slices are hard to compare.',
    labels: ['Operations', 'Marketing', 'Training', 'Other'],
    values: [45, 25, 20, 10],
    other: [35, 30, 20, 15],
    draw: (s, c) => donut(s, c.labels, c.values, c.key === 'doughnut'),
  },
  {
    key: 'scatter',
    name: 'Scatter plot',
    purpose: 'Relationships and outliers',
    definition:
      'A scatter plot represents pairs of numerical measurements as dots positioned on an x and y axis.',
    use: 'Examine advertising versus sales, study hours versus exam scores, or price versus demand.',
    caution:
      'A correlation suggests an association, not proof that one variable causes the other.',
    labels: [],
    values: [
      [10, 22],
      [20, 30],
      [30, 34],
      [40, 43],
      [50, 49],
      [60, 56],
      [70, 70],
      [80, 72],
      [90, 91],
      [95, 80],
    ],
    other: [
      [10, 70],
      [20, 48],
      [30, 59],
      [40, 36],
      [50, 70],
      [60, 42],
      [70, 28],
      [80, 50],
      [90, 24],
    ],
    draw: (s, c) => scatter(s, c.values),
  },
  {
    key: 'funnel',
    name: 'Funnel chart',
    purpose: 'Stage-by-stage conversion',
    definition:
      'A funnel visualizes how a population shrinks or changes as it moves through ordered stages of a process.',
    use: 'Recruitment, sales pipeline, enrollment, lead conversion, and application processing.',
    caution:
      'Stages must represent a coherent progression. Show counts and conversion rates; a funnel does not by itself explain why people leave.',
    labels: ['Applied', 'Screened', 'Interviewed', 'Offered', 'Hired'],
    values: [500, 260, 120, 60, 45],
    other: [500, 390, 280, 150, 100],
    draw: (s, c) => funnel(s, c.labels, c.values),
  },
  {
    key: 'radar',
    name: 'Radar / spider chart',
    purpose: 'Compare multidimensional profiles',
    definition:
      'A radar chart places multiple indicators around radiating axes; connected points form a profile or shape.',
    use: 'Compare departments, job candidates, or teams across the same competency or performance indicators.',
    caution:
      'Normalize indicators to a shared meaningful scale; shapes can exaggerate small differences. Grouped bars may be easier to read.',
    labels: ['Speed', 'Quality', 'Teamwork', 'Service', 'Innovation'],
    values: [5, 3, 4, 3, 4],
    other: [3, 5, 4, 4, 3],
    draw: (s, c) => radar(s, c.labels, c.values, c.other),
  },
  {
    key: 'heatmap',
    name: 'Heatmap',
    purpose: 'Intensity across two dimensions',
    definition:
      'A heatmap encodes values with color intensity within a grid, making clusters and hotspots visible.',
    use: 'Analyze store traffic by day and hour, attendance by date, or service demand across locations.',
    caution:
      'Always include a clear color scale; choose colors people can distinguish and never rely on color alone.',
    labels: ['9 AM', '11 AM', '1 PM', '3 PM', '5 PM'],
    values: [
      [15, 32, 55, 62, 38],
      [18, 39, 61, 70, 44],
      [12, 29, 52, 64, 49],
      [21, 44, 69, 78, 56],
      [35, 57, 82, 94, 76],
    ],
    other: [
      [28, 54, 30, 48, 65],
      [17, 43, 71, 59, 38],
      [31, 62, 83, 55, 22],
      [45, 60, 80, 68, 53],
      [32, 56, 65, 72, 58],
    ],
    draw: (s, c) => heatmap(s, c.labels, c.values),
  },
  {
    key: 'histogram',
    name: 'Histogram',
    purpose: 'Distribution of numeric values',
    definition:
      'A histogram groups continuous or numerical values into adjacent intervals (bins) and shows how often observations fall in each bin.',
    use: 'Test scores, order values, delivery times, ages, and production defects.',
    caution:
      'Bins affect the apparent shape; bars generally touch because the intervals are continuous.',
    labels: [],
    values: [2, 6, 11, 23, 18],
    other: [1, 3, 7, 18, 31],
    draw: (s, c) => histogram(s, c.values),
  },
  {
    key: 'area',
    name: 'Area chart',
    purpose: 'Trend with magnitude',
    definition:
      'An area chart is a line chart with space beneath the line filled to emphasize the size of a value over time.',
    use: 'Revenue volume, website traffic, inventory levels, or workload over an ordered time period.',
    caution:
      'Multiple overlapping filled series may hide data. An ordinary area chart does not mean “cumulative” unless the data have been calculated cumulatively.',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [5, 7, 10, 9, 13, 18],
    other: [7, 9, 8, 12, 11, 14],
    draw: (s, c) => drawLine(s, c.labels, c.values, { area: true }),
  },
  {
    key: 'stacked',
    name: 'Stacked column chart',
    purpose: 'Totals and composition',
    definition:
      'A stacked column chart divides each column into segments so the viewer can inspect total quantities and category contributions.',
    use: 'Compare quarterly revenue split by product, department costs split by category, or order mix by channel.',
    caution:
      'Stacked segments not touching the baseline are difficult to compare exactly. Use grouped bars or 100%-stacked columns when more appropriate.',
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    values: [
      [25, 34, 31, 47],
      [16, 20, 30, 28],
      [8, 12, 16, 20],
    ],
    other: [
      [35, 29, 33, 38],
      [21, 27, 28, 25],
      [10, 13, 11, 14],
    ],
    draw: (s, c) => stacked(s, c.labels, c.values),
  },
  {
    key: 'bullet',
    name: 'Bullet / target chart',
    purpose: 'Actual vs target',
    definition:
      'A bullet chart uses a bar and a reference marker to show progress toward a target in a compact space.',
    use: 'Monitor branch quotas, response-time targets, operating goals, or production objectives.',
    caution:
      'Display actual and target with the same units and clearly state whether higher or lower is better.',
    labels: ['North', 'Central', 'South'],
    values: [92, 93, 67],
    other: [110, 75, 95],
    targets: [100, 85, 90],
    draw: (s, c) => bullet(s, c.labels, c.values, c.targets),
  },
];
