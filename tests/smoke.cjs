const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(pathToFileURL(path.resolve('index.html')).href);
    await page.waitForSelector('#chartMenu button');
    const results = await page.evaluate(() => {
      const check = (condition, message) => {
        if (!condition) throw new Error(message);
      };
      const checkSvg = () =>
        check(
          !/NaN|Infinity/.test(document.querySelector('main').innerHTML),
          'Invalid SVG geometry',
        );
      let outcomes = 0,
        generated = 0,
        filterSelections = 0;
      configs.forEach((config, i) => {
        selectChart(i);
        outcomeSets[config.key].forEach(([name, values], j) => {
          $('#chartDataset').value = String(j);
          $('#chartDataset').dispatchEvent(new Event('change'));
          check(
            $('#chartAnswer').textContent ===
              describeOutcome({ ...config, values }).answer,
            `${config.key}/${name}: stale answer`,
          );
          check($('#chartData table').rows.length > 1, 'Missing source table');
          checkSvg();
          outcomes++;
        });
        for (let trial = 0; trial < 10; trial++) {
          $('#chartShuffle').click();
          check(
            $('#chartAnswer').textContent ===
              describeOutcome({ ...config, values: generatedValues }).answer,
            'Generated answer mismatch',
          );
          if (config.key === 'funnel')
            check(
              generatedValues.every((v, j, a) => !j || v <= a[j - 1]),
              'Invalid growing cohort',
            );
          if (config.key === 'radar')
            check(
              generatedValues.every((v) => v >= 1 && v <= 5),
              'Radar out of range',
            );
          checkSvg();
          generated++;
        }
        $('#revealBtn').click();
        check($('#chartAnswer').classList.contains('show'), 'Reveal failed');
        check(
          $('#revealBtn').getAttribute('aria-expanded') === 'true',
          'Reveal accessibility state',
        );
      });
      for (const scenario of [...$('#dashboardScenario').options].map(
        (o) => o.value,
      )) {
        $('#dashboardScenario').value = scenario;
        $('#dashboardScenario').dispatchEvent(new Event('change'));
        for (const branch of ['All', ...branches])
          for (const product of ['All', ...products])
            for (const quarter of ['All', 'Q1', 'Q2', 'Q3', 'Q4'])
              for (const channel of ['All', ...channels]) {
                for (const [id, value] of Object.entries({
                  filterBranch: branch,
                  filterProduct: product,
                  filterQuarter: quarter,
                  filterChannel: channel,
                }))
                  $('#' + id).value = value;
                renderDashboard();
                const rows = transactions.filter(
                  (r) =>
                    (branch === 'All' || r.branch === branch) &&
                    (product === 'All' || r.product === product) &&
                    (quarter === 'All' || r.quarter === quarter) &&
                    (channel === 'All' || r.channel === channel),
                );
                const revenue = total(rows.map((r) => r.revenue)),
                  cost = total(rows.map((r) => r.cost));
                check(
                  $('#kpiOrders').textContent === fmt(rows.length),
                  'Order count mismatch',
                );
                check(
                  $('#kpiRevenue').textContent === compactPeso(revenue),
                  'Revenue mismatch',
                );
                check(
                  $('#kpiAov').textContent ===
                    (rows.length ? money(revenue / rows.length) : '—'),
                  'AOV mismatch',
                );
                check(
                  $('#kpiMargin').textContent ===
                    (revenue
                      ? (((revenue - cost) / revenue) * 100).toFixed(1) + '%'
                      : '—'),
                  'Margin mismatch',
                );
                if (scenario === 'loss' && rows.length)
                  check(cost > revenue, 'Loss scenario should lose money');
                if (rows.length)
                  check(
                    $('#dashLine').querySelectorAll('circle').length ===
                      (quarter === 'All' ? 12 : 3),
                    'Out-of-period months were plotted',
                  );
                checkSvg();
                filterSelections++;
              }
      }
      questions.forEach((q, i) => {
        document
          .querySelectorAll('.quiz-card')
          [i].querySelectorAll('button')
          [q.correct].click();
      });
      check(
        $('#score').textContent.includes('6 correct / 6 answered'),
        'Quiz scoring failed',
      );
      $('#twistBtn').click();
      check(
        $('#twistAnswer').classList.contains('show'),
        'Bonus reveal failed',
      );
      $('#resetBtn').click();
      check(
        chartIndex === 0 &&
          !generatedValues &&
          $('#dashboardScenario').value === 'growth' &&
          $('#filterQuarter').value === 'All' &&
          Object.keys(quizAnswers).length === 0,
        'Global reset failed',
      );
      return { outcomes, generated, filterSelections };
    });
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `Page overflow at ${width}px`,
      );
    }
    assert.deepEqual(errors, [], 'Browser runtime errors');
    await page.screenshot({
      path: 'test-results/dashboard-desktop.png',
      fullPage: true,
    });
    await page.goto(
      pathToFileURL(path.resolve('management_science_charts_dashboard.html'))
        .href,
    );
    await page.waitForURL('**/index.html');
    console.log(
      `Passed: ${results.outcomes} curated outcomes, ${results.generated} generated datasets, ${results.filterSelections} dashboard filter selections, quiz/reset, 3 viewport widths, legacy entry point. No browser runtime errors.`,
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
