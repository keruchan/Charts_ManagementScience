// Full discussions remain available behind each slide?s Read more control.
const conceptDiscussions = [
  {
    title: 'Data types shape the visual structure',
    details:
      '<p>Categorical data identifies groups, such as branches or product types. Ordinal data has an order, such as low, medium, and high, but the gaps between levels are not necessarily equal. Numerical data measures quantities, while temporal data locates observations in time. These differences determine which comparisons make sense.</p><p>Branch names can be compared with separate bars. Monthly revenue has a meaningful sequence that a line can preserve. Connecting unrelated product names with a line can suggest continuity that does not exist in the underlying data.</p>',
  },
  {
    title: 'Visual encoding: position, length, size, and color',
    details:
      '<p>An encoding links a data value to a visible property. Bars encode quantities through length; scatter plots use horizontal and vertical position; heatmaps use color intensity. A legend explains the link between marks and their meaning.</p><p>Positions on a shared scale make close differences easier to compare than similar angles or areas. In a bubble chart, a value represented by area must scale the area of the circle: doubling its radius quadruples its area and would exaggerate a value that only doubled.</p>',
  },
  {
    title: 'Counts, rates, and the denominator',
    details:
      '<p>Counts describe volume; rates describe volume relative to an opportunity or population. A branch with 30 complaints from 3,000 orders has a 1% complaint rate. Another with 12 complaints from 400 orders has a 3% rate. The first has more complaints, while the second has a higher proportion of affected orders.</p><p>The denominator changes the question being answered. Total revenue, revenue per order, and revenue per employee describe different aspects of performance. A useful comparison identifies the base population and uses a consistent reporting period.</p>',
  },
  {
    title: 'Aggregation can reveal or conceal a pattern',
    details:
      "<p>Aggregation combines observations into summaries, such as daily orders into monthly totals. It reduces detail and can make broad patterns clearer, but a monthly average may conceal a brief stockout or a few extremely busy days. Weekly totals can also differ simply because reporting periods contain different numbers of trading days.</p><p>Overall results can change when the mix of groups changes. A company may report a higher overall conversion rate because more customers came from an already successful channel, even when each channel's own conversion rate fell. Group-level comparisons help explain the combined result.</p>",
  },
  {
    title: 'Typical values and the spread around them',
    details:
      '<p>An average summarizes a distribution but does not show how varied its observations are. Delivery times of 10, 10, 10, 10, and 10 minutes have the same mean as 2, 4, 10, 14, and 20 minutes. Both average 10 minutes, but the second service is less consistent.</p><p>Histograms reveal concentration, skewness, gaps, and multiple peaks. Box plots summarize the median and quartiles; the meaning of their whiskers depends on the convention used. An extreme observation may be a recording error or a valid rare event, so its meaning depends on the source and context.</p>',
  },
  {
    title: 'Absolute change and relative change',
    details:
      '<p>A rise from ₱10,000 to ₱15,000 is an absolute increase of ₱5,000 and a relative increase of 50%. A rise from ₱100,000 to ₱105,000 adds the same amount but represents only 5% growth. Both views matter: one describes added value, while the other describes change relative to the starting size.</p><p>A conversion rate rising from 20% to 25% increases by 5 percentage points, or 25% relative to its original rate. Percentage change is undefined when the starting value is zero; the absolute difference still has meaning.</p>',
  },
  {
    title: 'Scales influence perceived differences',
    details:
      '<p>A linear scale assigns equal visual distances to equal numerical differences. A logarithmic scale assigns equal distances to equal ratios: 10 to 100 and 100 to 1,000 occupy the same distance. Log scales can reveal proportional change across a wide range, but an ordinary logarithmic scale cannot display zero or negative values.</p><p>Shared scales make panels directly comparable. Independently scaled charts can make a small branch and a large branch appear equally busy. Two vertical axes can also make unrelated series appear to move together, depending on the chosen limits.</p>',
  },
  {
    title: 'Time patterns have different explanations',
    details:
      '<p>A trend is a broader direction over time. Seasonality is a pattern associated with recurring calendar periods, such as weekends or holiday months. A one-time promotion can produce a spike without creating either a lasting trend or recurring seasonality.</p><p>Month-to-month comparisons describe recent movement, while comparisons with the same month of a previous year can help account for seasonal timing. Unequal month lengths, changes in opening hours, and partial reporting periods can still affect the result. An observed pattern alone does not explain its cause.</p>',
  },
  {
    title: 'Uncertainty belongs in the interpretation',
    details:
      '<p>Observed values, sample estimates, and forecasts carry different kinds of uncertainty. A forecast line is an estimate of future outcomes, not a record of what has already happened. Shaded bands or error bars may represent confidence intervals, prediction intervals, standard deviations, or other quantities; their labels determine what they mean.</p><p>A sample of 8 satisfied customers out of 10 and a sample of 800 out of 1,000 both produce 80%, but they contain different amounts of information. Sample size, sampling method, and who was excluded affect how broadly the result can be interpreted.</p>',
  },
  {
    title: 'Exploration and explanation serve different purposes',
    details:
      '<p>Exploratory visualization supports investigation: filtering, comparing groups, and looking for unexpected patterns. Explanatory visualization communicates a specific finding, supported by a clear comparison and enough context to understand it. The same dataset can support both purposes.</p><p>A title such as “Monthly sales” identifies the subject. A title such as “Sales recovered after April” states an interpretation that must be supported by the plotted values. An annotation can identify a promotion or closure without claiming that the event alone caused the observed change.</p>',
  },
  {
    title: 'Accessible visuals communicate through multiple cues',
    details:
      '<p>Color can identify categories, represent low-to-high intensity, or distinguish values above and below a meaningful midpoint. Those roles differ: a sequential scale represents increasing magnitude, while a diverging scale emphasizes departures from a reference such as zero or a target.</p><p>Labels, marker shapes, line styles, and readable contrast help people interpret a chart when colors are difficult to distinguish. A text interpretation and a data table provide another way to access the result and inspect exact values that the graphic only approximates visually.</p>',
  },
  {
    title: 'Context and provenance support trust',
    details:
      '<p>Provenance describes where data came from and how it was prepared. Reporting dates, units, inclusion rules, and definitions explain what a chart represents. For example, “sales” may refer to orders placed, completed payments, or revenue after refunds; those measures can produce different totals.</p><p>A selected time window or omitted category can change the apparent story. Transparent scope makes those choices visible. Synthetic data demonstrates how a pattern could look, while observed data supplies evidence about a particular situation. Neither a polished chart nor a precise label resolves weaknesses in the source data.</p>',
  },
];
