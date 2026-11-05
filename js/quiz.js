const questions = [
  {
    q: 'A café manager asks: “Are our daily sales increasing across the last 30 days?”',
    options: ['Pie chart', 'Line chart', 'Radar chart'],
    correct: 1,
    why: 'A line chart preserves time order and clearly shows whether daily sales trend upward or downward.',
  },
  {
    q: 'You want to rank 12 suppliers by delivery delays, with long supplier names.',
    options: ['Horizontal bar chart', 'Doughnut chart', 'Funnel chart'],
    correct: 0,
    why: 'Horizontal bars make ranking and reading long category names easier.',
  },
  {
    q: 'HR needs to see how 1,000 applicants become 80 hires across screening stages.',
    options: ['Scatter plot', 'Histogram', 'Funnel chart'],
    correct: 2,
    why: 'A funnel makes each recruitment stage and the conversion between stages visible.',
  },
  {
    q: 'A researcher wants to study whether hours of training relate to productivity scores.',
    options: ['Scatter plot', 'Pie chart', 'Stacked column'],
    correct: 0,
    why: 'Scatter plots show paired numerical measurements and their possible association.',
  },
  {
    q: 'A call center wants to spot which weekday and hour repeatedly has the highest call volume.',
    options: ['Radar chart', 'Heatmap', 'Pie chart'],
    correct: 1,
    why: 'A heatmap highlights hotspots across the day-by-hour grid.',
  },
  {
    q: 'A manager asks: “How far is each branch from its monthly sales target?”',
    options: ['Bullet / target chart', 'Histogram', 'Pie chart'],
    correct: 0,
    why: 'A target chart compares actual results with a goal for each branch.',
  },
];
let quizAnswers = {};
function renderQuiz() {
  let area = $('#quizArea');
  area.replaceChildren();
  questions.forEach((q, i) => {
    let wrap = document.createElement('div');
    wrap.className = 'quiz-card';
    let h = document.createElement('h4');
    h.textContent = `${i + 1}. ${q.q}`;
    wrap.appendChild(h);
    let group = document.createElement('div');
    group.className = 'choices';
    q.options.forEach((opt, k) => {
      let b = document.createElement('button');
      b.className = 'choice';
      b.textContent = String.fromCharCode(65 + k) + '. ' + opt;
      if (quizAnswers[i] !== undefined) {
        b.disabled = true;
        if (k === q.correct) b.classList.add('correct');
        else if (k === quizAnswers[i]) b.classList.add('wrong');
      }
      b.addEventListener('click', () => {
        quizAnswers[i] = k;
        renderQuiz();
      });
      group.appendChild(b);
    });
    wrap.appendChild(group);
    if (quizAnswers[i] !== undefined) {
      let p = document.createElement('div');
      p.className = 'quiz-explain show';
      p.textContent =
        (quizAnswers[i] === q.correct
          ? '✓ Correct! '
          : '↳ Better choice highlighted. ') + q.why;
      wrap.appendChild(p);
    }
    area.appendChild(wrap);
  });
  let answered = Object.keys(quizAnswers).length,
    correct = Object.entries(quizAnswers).filter(
      ([i, a]) => questions[Number(i)].correct === a,
    ).length;
  $('#score').textContent =
    `Score: ${correct} correct / ${answered} answered` +
    (answered === questions.length
      ? ' · ' +
        (correct === 6
          ? 'Excellent chart judgment!'
          : 'Review the reasons and try again.')
      : '');
}
$('#quizReset').addEventListener('click', () => {
  quizAnswers = {};
  renderQuiz();
});
$('#twistBtn').setAttribute('aria-controls', 'twistAnswer');
$('#twistBtn').setAttribute('aria-expanded', 'false');
$('#twistBtn').addEventListener('click', () => {
  const open = $('#twistAnswer').classList.toggle('show');
  $('#twistBtn').setAttribute('aria-expanded', String(open));
  $('#twistBtn').textContent = open ? 'Hide answer' : 'Expose the trick';
});
renderQuiz();
// Global reset restores the initial scenario, chart, filters, and quiz.
$('#resetBtn').addEventListener('click', () => {
  $('#dashboardScenario').value = 'growth';
  transactions = createTransactions('growth');
  resetFilters();
  selectChart(0);
  quizAnswers = {};
  renderQuiz();
  $('#twistAnswer').classList.remove('show');
  $('#twistBtn').setAttribute('aria-expanded', 'false');
  $('#twistBtn').textContent = 'Expose the trick';
});
