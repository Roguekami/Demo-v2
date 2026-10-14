import { icons } from '../../icons.js';
import { examQuestions, examSettings, cbtScores, escapeHtml } from '../../data/mock.js';
import { openModal, toast } from '../../components/modal.js';
import { navigate, getUser } from '../../router.js';

const LETTERS = ['A', 'B', 'C', 'D'];

let state;
let timerId = null;

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

// Leaving the exam page stops the countdown
window.addEventListener('hashchange', () => {
  if (window.location.hash !== '#/student/exams') stopTimer();
});

export function render() {
  if (!examQuestions.length) {
    return `
      <div class="cbt-layout">
        <div class="cbt-result card">
          <h2 class="text-xl font-semibold mb-2">No exam available</h2>
          <p class="text-secondary mb-6">Your teacher hasn't published an exam yet.</p>
          <a href="#/student/dashboard" class="btn btn-primary">Back to dashboard</a>
        </div>
      </div>
    `;
  }

  return `
    <div class="cbt-layout">
      <div class="cbt-header">
        <div class="cbt-title">${escapeHtml(examSettings.subject)} &mdash; ${examSettings.class} CBT</div>
        <div class="cbt-progress"><span id="answered-count">0</span> of ${examQuestions.length} answered</div>
        <div class="flex items-center gap-4">
          <div class="cbt-timer calm flex items-center gap-2" id="timer">${icons.clock} <span id="timer-text">--:--</span></div>
          <button class="btn btn-sm btn-ghost" id="btn-exit">Exit</button>
        </div>
      </div>
      <div class="cbt-progress-track"><div class="cbt-progress-fill" id="progress-fill" style="width:0%"></div></div>

      <div class="cbt-main">
        <div class="cbt-body">
          <div class="cbt-question-num" id="q-title"></div>
          <div class="cbt-question" id="q-text"></div>
          <div id="q-options"></div>
        </div>

        <div class="cbt-footer">
          <div class="cbt-footer-group">
            <button class="btn btn-secondary" id="btn-flag">${icons.flag} <span>Flag for review</span></button>
            <button class="btn btn-secondary" id="btn-review">${icons.eye} Review all</button>
          </div>
          <div class="cbt-footer-group">
            <button class="btn btn-secondary" id="btn-prev">${icons.chevronLeft} Previous</button>
            <button class="btn btn-primary" id="btn-next"></button>
          </div>
        </div>
      </div>

      <div class="cbt-review-backdrop" id="review-backdrop"></div>
      <aside class="cbt-review-panel" id="review-panel">
        <div class="cbt-review-header">
          Review questions
          <button class="modal-close" id="btn-close-review" aria-label="Close">${icons.x}</button>
        </div>
        <div class="cbt-review-grid" id="review-grid"></div>
        <div class="cbt-review-legend">
          <span class="lg-answered">Answered</span>
          <span class="lg-flagged">Flagged</span>
          <span>Not answered</span>
        </div>
        <div class="p-5 border-t" style="margin-top:auto">
          <button class="btn btn-primary w-full justify-center" id="btn-submit-panel">Submit exam</button>
        </div>
      </aside>
    </div>
  `;
}

function answeredCount() {
  return state.answers.filter(a => a !== undefined).length;
}

function renderQuestion() {
  const i = state.current;
  const q = examQuestions[i];
  const last = i === examQuestions.length - 1;

  document.getElementById('q-title').textContent = `Question ${i + 1} of ${examQuestions.length}`;
  document.getElementById('q-text').textContent = q.question;
  document.getElementById('q-options').innerHTML = q.options.map((opt, idx) => `
    <div class="cbt-option ${state.answers[i] === idx ? 'selected' : ''}" data-index="${idx}" role="button" tabindex="0">
      <span class="cbt-option-letter">${LETTERS[idx]}</span>
      <span>${escapeHtml(opt)}</span>
    </div>
  `).join('');

  document.getElementById('btn-prev').disabled = i === 0;
  document.getElementById('btn-next').innerHTML = last ? `${icons.check} Finish` : `Next ${icons.chevronRight}`;

  const flagged = state.flagged.has(i);
  const flagBtn = document.getElementById('btn-flag');
  flagBtn.classList.toggle('flag-active', flagged);
  flagBtn.querySelector('span').textContent = flagged ? 'Flagged' : 'Flag for review';

  renderProgress();
}

function renderProgress() {
  const n = answeredCount();
  document.getElementById('answered-count').textContent = n;
  document.getElementById('progress-fill').style.width = `${(n / examQuestions.length) * 100}%`;
  document.getElementById('review-grid').innerHTML = examQuestions.map((_, i) => {
    const cls = [
      state.answers[i] !== undefined ? 'answered' : '',
      state.flagged.has(i) ? 'flagged' : '',
      state.current === i ? 'current' : '',
    ].join(' ');
    return `<div class="cbt-review-dot ${cls}" data-index="${i}">${i + 1}</div>`;
  }).join('');
}

function renderTimer() {
  const m = Math.floor(state.remaining / 60);
  const s = state.remaining % 60;
  document.getElementById('timer-text').textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  const timer = document.getElementById('timer');
  timer.classList.toggle('calm', state.remaining > 300);
  timer.classList.toggle('urgent', state.remaining <= 60);
}

function setReviewOpen(open) {
  document.getElementById('review-panel').classList.toggle('open', open);
  document.getElementById('review-backdrop').classList.toggle('open', open);
}

function confirmSubmit() {
  setReviewOpen(false);
  const unanswered = examQuestions.length - answeredCount();
  openModal({
    title: 'Submit exam?',
    submitLabel: 'Submit exam',
    content: `
      <p class="text-sm text-secondary mb-4">You can't change your answers after submitting.</p>
      <div class="flex justify-between text-sm mb-2"><span>Answered</span><span class="font-semibold">${answeredCount()} / ${examQuestions.length}</span></div>
      ${unanswered ? `<div class="flex justify-between text-sm mb-2 text-danger"><span>Unanswered</span><span class="font-semibold">${unanswered}</span></div>` : ''}
      ${state.flagged.size ? `<div class="flex justify-between text-sm text-secondary"><span>Flagged for review</span><span class="font-semibold">${state.flagged.size}</span></div>` : ''}
    `,
    onSubmit: () => finish(),
  });
}

function finish(timedOut = false) {
  stopTimer();
  const correct = examQuestions.filter((q, i) => state.answers[i] === q.correct).length;
  const pct = Math.round((correct / examQuestions.length) * 100);

  const studentId = getUser()?.studentId;
  if (studentId) (cbtScores[examSettings.subject] ??= {})[studentId] = pct;

  document.querySelector('.cbt-layout').innerHTML = `
    <div class="cbt-result card">
      <div class="stat-icon green" style="margin:0 auto 16px;width:56px;height:56px">${icons.check}</div>
      <h2 class="text-xl font-semibold mb-2">${timedOut ? "Time's up — exam submitted" : 'Exam submitted'}</h2>
      <p class="text-secondary mb-6">${escapeHtml(examSettings.subject)} &mdash; ${examSettings.class}</p>
      <div class="cbt-result-score">${pct}%</div>
      <p class="text-sm text-secondary mb-6">${correct} of ${examQuestions.length} correct</p>
      <p class="text-xs text-muted mb-6">Your score has been sent to your teacher and will appear on your report card once results are published.</p>
      <a href="#/student/dashboard" class="btn btn-primary">Back to dashboard</a>
    </div>
  `;
  if (timedOut) toast("Time's up — your answers were submitted automatically", 'warning');
}

export function init() {
  if (!examQuestions.length) return;

  state = { current: 0, answers: [], flagged: new Set(), remaining: examSettings.duration * 60 };
  renderQuestion();
  renderTimer();

  stopTimer();
  timerId = setInterval(() => {
    state.remaining--;
    if (state.remaining <= 0) { state.remaining = 0; renderTimer(); finish(true); return; }
    renderTimer();
  }, 1000);

  const choose = (el) => {
    state.answers[state.current] = Number(el.dataset.index);
    document.querySelectorAll('.cbt-option').forEach(o => o.classList.toggle('selected', o === el));
    renderProgress();
  };
  const options = document.getElementById('q-options');
  options.addEventListener('click', e => { const o = e.target.closest('.cbt-option'); if (o) choose(o); });
  options.addEventListener('keydown', e => {
    const o = e.target.closest('.cbt-option');
    if (o && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); choose(o); }
  });

  document.getElementById('btn-next').addEventListener('click', () => {
    if (state.current < examQuestions.length - 1) { state.current++; renderQuestion(); }
    else confirmSubmit();
  });
  document.getElementById('btn-prev').addEventListener('click', () => {
    if (state.current > 0) { state.current--; renderQuestion(); }
  });
  document.getElementById('btn-flag').addEventListener('click', () => {
    state.flagged.has(state.current) ? state.flagged.delete(state.current) : state.flagged.add(state.current);
    renderQuestion();
  });

  document.getElementById('btn-exit').addEventListener('click', () => {
    openModal({
      title: 'Leave exam?',
      content: '<p class="text-sm text-secondary">Your answers will not be saved.</p>',
      submitLabel: 'Leave exam',
      onSubmit: () => navigate('#/student/dashboard'),
    });
  });

  document.getElementById('btn-review').addEventListener('click', () => setReviewOpen(true));
  document.getElementById('btn-close-review').addEventListener('click', () => setReviewOpen(false));
  document.getElementById('review-backdrop').addEventListener('click', () => setReviewOpen(false));
  document.getElementById('btn-submit-panel').addEventListener('click', confirmSubmit);
  document.getElementById('review-grid').addEventListener('click', e => {
    const dot = e.target.closest('.cbt-review-dot');
    if (!dot) return;
    state.current = Number(dot.dataset.index);
    renderQuestion();
    setReviewOpen(false);
  });
}
