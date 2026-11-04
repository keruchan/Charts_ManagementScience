# DATAWISE · Management Science

Open `index.html` directly in a browser. No server, build step, runtime libraries, or internet connection is required. The original HTML filename forwards to this entry point.

## Editing

| File                     | Purpose                                                                           |
| ------------------------ | --------------------------------------------------------------------------------- |
| `index.html`             | Page sections, navigation, dashboard controls, spreadsheet discussion             |
| `css/styles.css`         | Theme, components, responsive layouts, accessibility preferences                  |
| `js/charts.js`           | SVG drawing and shared number formatting                                          |
| `js/chart-content.js`    | Chart definitions, uses, cautions, labels, comparison profiles                    |
| `js/scenarios.js`        | Named outcome datasets, constrained random generation, calculated interpretations |
| `js/explorer.js`         | Chart selection, scenario controls, answer reveals, current data table            |
| `js/dashboard.js`        | Synthetic orders, dashboard scenarios, filters, KPI calculations                  |
| `js/quiz.js`             | Questions, scoring, bonus reveal, global reset                                    |
| `js/concept-content.js`  | Original extended discussions, preserved in each slide’s “Read more”              |
| `js/concept-carousel.js` | Concise slide content, HTML/SVG visuals, navigation, keyboard and swipe controls  |

Scripts load in this order using `defer`. Plain scripts support opening the page through `file://`. Keep shared names unique across files. Styling belongs in the stylesheet; existing decorative inline styles have also been moved there.

The full-width discussion carousel starts with a table-versus-graph comparison and includes all twelve discussion topics. Slides move with the arrow buttons, topic dots, left/right keys, Home/End, or horizontal swipes. There is no automatic advance. Motion follows the browser’s reduced-motion preference, and offscreen slides are hidden from keyboard and screen-reader navigation. Extended text remains in expandable “Read more” sections.

## Sample data

The explorer includes deliberately contrasting outcomes: growth, decline, recovery, flat series, spikes, zeros, ties, concentrated shares, positive/negative/no linear association, curves, outliers, funnel attrition, competency tradeoffs, hotspots, distribution shapes, composition changes, and results above/at/below targets. A generated dataset replaces the selected curated example until another scenario is chosen. All interpretations and source tables update together.

These are representative possibilities, not an exhaustive set or forecasts. Count and allocation examples use nonnegative values; radar scores remain within 1–5; funnel cohorts never grow between stages. Pie weights are normalized, including a defined empty state for zero totals. Histogram intervals do not overlap and all have width 20; the final interval includes 100. Scatter plots distinguish linear correlation from curved patterns and handle constant variables.

The dashboard provides growth, decline, seasonal, stable, loss, sparse, and empty scenarios. Seeded generation is reproducible; each row is one order. Costs can exceed revenue in the loss scenario. Margin is `(sum(revenue) - sum(cost)) / sum(revenue)`, not an average of row margins. Empty results show zero sales and orders, with undefined AOV/margin shown as a dash. All months have complete synthetic reporting coverage; a zero month means no orders. A quarter selection excludes other months rather than plotting them as zeros. Missing real-world records must not be interpreted as zero activity.

## Development checks

Install Node.js development dependencies with `npm install`, then install the test browser with `npx playwright install chromium`.

- `npm run format`: apply consistent HTML, CSS, and JavaScript formatting.
- `npm run format:check`: verify formatting.
- `npm test`: exercise every curated chart outcome, generated datasets, dashboard filters, empty/loss cases, quiz, reset, and narrow layouts in Chromium.

Development dependencies are only needed for maintenance and checks.
