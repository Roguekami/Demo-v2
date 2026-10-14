import { icons } from '../../icons.js';
import { examQuestions, examSettings, escapeHtml, nextId } from '../../data/mock.js';
import { openModal, field, toast } from '../../components/modal.js';
import { rerender } from '../../router.js';

const LETTERS = ['A', 'B', 'C', 'D'];

export function render() {
  const hasQuestions = examQuestions.length > 0;
  const s = examSettings;
  const opt = (values, current) => values.map(v => `<option ${v === current ? 'selected' : ''}>${v}</option>`).join('');

  const questionsHtml = examQuestions.map((q, i) => `
    <div class="question-card">
      <div class="question-card-header">
        <div class="question-number">Question ${i + 1}</div>
        <div class="flex gap-2">
          <button class="btn btn-sm btn-ghost edit-q" data-id="${q.id}" title="Edit">${icons.edit}</button>
          <button class="btn btn-sm btn-ghost text-danger delete-q" data-id="${q.id}" title="Delete">${icons.trash}</button>
        </div>
      </div>
      <div class="question-text">${escapeHtml(q.question)}</div>
      <div class="question-options">
        ${q.options.map((o, idx) => `
          <div class="question-opt ${idx === q.correct ? 'correct' : ''}">
            <span class="font-semibold mr-2">${LETTERS[idx]}.</span>${escapeHtml(o)}
            ${idx === q.correct ? ' ✓' : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  return `
    <div class="page-header">
      <h2>Exam Creation</h2>
      <div class="flex items-center gap-3">
        <span class="badge ${s.published ? 'badge-success' : 'badge-warning'}">${s.published ? 'Published' : 'Draft'}</span>
        <button class="btn btn-primary" id="btn-publish" ${hasQuestions ? '' : 'disabled'} title="${hasQuestions ? '' : 'Add at least one question to publish'}">
          ${s.published ? 'Update Exam' : 'Publish Exam'}
        </button>
      </div>
    </div>

    <div class="card mb-6">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="ex-subject">Subject</label>
          <select class="form-select" id="ex-subject">${opt(['Mathematics', 'Further Mathematics'], s.subject)}</select>
        </div>
        <div class="form-group">
          <label class="form-label" for="ex-class">Class</label>
          <select class="form-select" id="ex-class">${opt(['SS1', 'SS2'], s.class)}</select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="ex-open">Opens</label>
          <input type="datetime-local" class="form-input" id="ex-open" value="${s.opens}">
        </div>
        <div class="form-group">
          <label class="form-label" for="ex-close">Closes</label>
          <input type="datetime-local" class="form-input" id="ex-close" value="${s.closes}">
        </div>
      </div>
      <div class="form-group m-0" style="max-width:240px">
        <label class="form-label" for="ex-duration">Duration (minutes)</label>
        <input type="number" class="form-input" id="ex-duration" min="1" value="${s.duration}">
      </div>
    </div>

    <div class="flex justify-between items-center mb-4">
      <div class="section-heading m-0">Question Bank (${examQuestions.length} question${examQuestions.length === 1 ? '' : 's'})</div>
      <button class="btn btn-secondary" id="btn-add-q">${icons.plus} Add Question</button>
    </div>

    ${questionsHtml || `<div class="card empty-state"><p>No questions yet. Add your first question to enable publishing.</p></div>`}
  `;
}

function openQuestionModal(existing) {
  const q = existing ?? { question: '', options: ['', '', '', ''], correct: 0 };
  openModal({
    title: existing ? 'Edit Question' : 'Add Question',
    submitLabel: existing ? 'Save changes' : 'Add question',
    content: `
      <div class="form-group">
        <label class="form-label" for="q-text">Question</label>
        <textarea class="form-textarea" id="q-text" rows="3" required>${escapeHtml(q.question)}</textarea>
      </div>
      ${LETTERS.map((L, i) => `
        <div class="form-group flex items-center gap-3">
          <label class="flex items-center gap-2 text-sm font-medium" title="Mark as correct answer">
            <input type="radio" name="q-correct" value="${i}" ${i === q.correct ? 'checked' : ''}> ${L}
          </label>
          <input type="text" class="form-input" id="q-opt-${i}" value="${escapeHtml(q.options[i])}" placeholder="Option ${L}" required>
        </div>
      `).join('')}
      <div class="form-hint">Select the radio button next to the correct answer.</div>
    `,
    onSubmit: () => {
      const data = {
        question: field('q-text'),
        options: LETTERS.map((_, i) => field(`q-opt-${i}`)),
        correct: Number(document.querySelector('input[name="q-correct"]:checked')?.value ?? 0),
      };
      if (existing) Object.assign(existing, data);
      else examQuestions.push({ id: nextId(examQuestions), subject: examSettings.subject, ...data });
      toast(existing ? 'Question updated' : 'Question added');
      rerender();
    },
  });
}

export function init() {
  const s = examSettings;
  const bind = (id, key, cast = v => v) =>
    document.getElementById(id).addEventListener('change', e => { s[key] = cast(e.target.value); });
  bind('ex-subject', 'subject');
  bind('ex-class', 'class');
  bind('ex-open', 'opens');
  bind('ex-close', 'closes');
  bind('ex-duration', 'duration', v => Math.max(1, Number(v) || 1));

  document.getElementById('btn-add-q').addEventListener('click', () => openQuestionModal());

  document.querySelectorAll('.edit-q').forEach(btn => btn.addEventListener('click', () => {
    openQuestionModal(examQuestions.find(q => q.id === Number(btn.dataset.id)));
  }));

  document.querySelectorAll('.delete-q').forEach(btn => btn.addEventListener('click', () => {
    const idx = examQuestions.findIndex(q => q.id === Number(btn.dataset.id));
    if (idx > -1) examQuestions.splice(idx, 1);
    toast('Question deleted', 'info');
    rerender();
  }));

  document.getElementById('btn-publish').addEventListener('click', () => {
    const wasPublished = s.published;
    s.published = true;
    toast(wasPublished
      ? 'Exam updated'
      : `${s.subject} exam published to ${s.class} — ${examQuestions.length} questions, ${s.duration} min`);
    rerender();
  });
}
