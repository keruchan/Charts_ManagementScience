// UI state is separate from chart definitions and outcome generation.
let chartIndex = 0;
let generatedValues = null;

function showData(c) {
  let headers, rows;
  if (c.key === 'scatter') {
    headers = ['Marketing spend (₱k)', 'Sales index'];
    rows = c.values;
  } else if (c.key === 'heatmap') {
    headers = ['Day', ...c.labels];
    rows = c.values.map((row, i) => [weekdays[i], ...row]);
  } else if (c.key === 'stacked') {
    headers = ['Quarter', ...channelNames, 'Total'];
    rows = c.labels.map((label, i) => [
      label,
      ...c.values.map((row) => row[i]),
      total(c.values.map((row) => row[i])),
    ]);
  } else if (c.key === 'radar') {
    headers = ['Competency', 'Team A', 'Team B'];
    rows = c.labels.map((label, i) => [label, c.values[i], c.other[i]]);
  } else if (c.key === 'bullet') {
    headers = ['Branch', 'Actual (units)', 'Target (units)'];
    rows = c.labels.map((label, i) => [label, c.values[i], c.targets[i]]);
  } else {
    headers = [
      c.key === 'histogram' ? 'Score interval' : 'Category / period',
      c.key === 'pie'
        ? 'Allocation weight'
        : c.key === 'line'
          ? 'Revenue (₱k)'
          : c.key === 'area'
            ? 'Users (thousands)'
            : 'Count',
    ];
    rows = (c.key === 'histogram' ? scoreBins : c.labels).map((label, i) => [
      label,
      c.values[i],
    ]);
  }
  const table = document.createElement('table');
  table.className = 'mini-table';
  const caption = table.createCaption();
  caption.textContent = `${c.name}: current synthetic data`;
  const head = table.createTHead().insertRow();
  headers.forEach((label) => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = label;
    head.append(th);
  });
  const body = table.createTBody();
  rows.forEach((row) => {
    const tr = body.insertRow();
    row.forEach((value) => {
      tr.insertCell().textContent = value;
    });
  });
  $('#chartData').replaceChildren(table);
}

function renderChart() {
  const base = configs[chartIndex];
  const outcome = outcomeSets[base.key][Number($('#chartDataset').value) || 0];
  const c = { ...base, values: generatedValues || outcome[1] };
  const discussion = describeOutcome(c);
  for (const [id, value] of Object.entries({
    chartTitle: c.name,
    chartPurpose: c.purpose,
    chartDefinition: c.definition,
    chartUse: c.use,
    chartCaution: c.caution,
    chartScenario: discussion.scenario,
    chartQuestion: discussion.question,
    chartAnswer: discussion.answer,
  }))
    $('#' + id).textContent = value;
  $('#chartAnswer').classList.remove('show');
  $('#revealBtn').textContent = 'Reveal answer';
  $('#revealBtn').setAttribute('aria-expanded', 'false');
  $('#datasetNote').textContent = generatedValues
    ? 'Generated synthetic dataset · Interpretations use the exact values shown. Generated values respect the chart’s data constraints.'
    : `Curated synthetic dataset · ${outcome[0]}. Use “Generate another dataset” to explore additional variation.`;
  $('#chartSvg').setAttribute(
    'aria-label',
    `${c.name}. ${discussion.scenario} Values are available in the current data table.`,
  );
  c.draw($('#chartSvg'), c);
  $('#chartLegend').replaceChildren();
  const legends =
    c.key === 'radar'
      ? ['Team A', 'Team B']
      : c.key === 'stacked'
        ? channelNames
        : [];
  legends.forEach((label, i) => {
    const span = document.createElement('span'),
      swatch = document.createElement('b');
    swatch.style.background = colors[i];
    span.append(swatch, document.createTextNode(label));
    $('#chartLegend').append(span);
  });
  if (c.key === 'line' || c.key === 'area')
    $('#chartLegend').textContent =
      c.key === 'line'
        ? 'Revenue · ₱ thousands'
        : 'Monthly active users · thousands';
  if (c.key === 'bullet')
    $('#chartLegend').textContent =
      'Actual sales (bar) · Target (black marker) · Units';
  showData(c);
  [...$('#chartMenu').children].forEach((button, i) => {
    button.classList.toggle('active', i === chartIndex);
    button.setAttribute('aria-pressed', String(i === chartIndex));
  });
}

function selectChart(index) {
  chartIndex = index;
  generatedValues = null;
  $('#chartDataset').replaceChildren(
    ...outcomeSets[configs[index].key].map(
      ([label], i) => new Option(label, String(i)),
    ),
  );
  renderChart();
}
configs.forEach((c, i) => {
  const button = document.createElement('button');
  button.innerHTML = `<span class="number">${String(i + 1).padStart(2, '0')}</span> ${c.name}`;
  button.addEventListener('click', () => selectChart(i));
  $('#chartMenu').append(button);
});
$('#chartDataset').addEventListener('change', () => {
  generatedValues = null;
  renderChart();
});
$('#chartShuffle').addEventListener('click', () => {
  generatedValues = generateValues(configs[chartIndex]);
  renderChart();
});
$('#revealBtn').setAttribute('aria-controls', 'chartAnswer');
$('#revealBtn').addEventListener('click', () => {
  const open = $('#chartAnswer').classList.toggle('show');
  $('#revealBtn').textContent = open ? 'Hide answer' : 'Reveal answer';
  $('#revealBtn').setAttribute('aria-expanded', String(open));
});
selectChart(0);
