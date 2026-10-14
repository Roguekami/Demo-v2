import { icons } from '../../icons.js';
import { students, results, cbtScores, escapeHtml } from '../../data/mock.js';
import { toast } from '../../components/modal.js';
import { rerender } from '../../router.js';

const TERM = '2024/2025 — Term 1';
const CLASSES = ['SS1', 'SS2'];
const SUBJECTS = ['Mathematics', 'Further Mathematics'];
const view = { class: 'SS2', subject: 'Mathematics' };

export function render() {
  const roster = students.filter(s => s.class === view.class);
  const cbt = cbtScores[view.subject] || {};
  let fromCbt = 0;

  const rowsHtml = roster.map((student, i) => {
    const existing = results.find(r => r.studentId === student.id && r.subject === view.subject && r.term === TERM);
    const cbtScore = cbt[student.id];
    const value = existing?.score ?? cbtScore ?? '';
    if (!existing && cbtScore !== undefined) fromCbt++;

    return `
      <tr data-student-id="${student.id}">
        <td class="text-muted cell-hide-mobile">${i + 1}</td>
        <td class="td-name cell-title">${escapeHtml(student.name)}</td>
        <td data-label="CBT Score">${cbtScore !== undefined ? `<span class="badge badge-info">${cbtScore}%</span>` : '<span class="text-muted">—</span>'}</td>
        <td data-label="Final Score"><input type="number" class="score-input" min="0" max="100" value="${value}" placeholder="—" /></td>
        <td data-label="Remark"><input type="text" class="remark-input" value="${escapeHtml(existing?.remark ?? '')}" placeholder="e.g. Excellent" /></td>
      </tr>
    `;
  }).join('');

  return `
    <div class="page-header">
      <h2>Results Entry</h2>
      <span class="text-sm text-secondary">${TERM}</span>
    </div>

    <div class="filter-bar">
      <select class="filter-select" id="res-class">
        ${CLASSES.map(c => `<option ${c === view.class ? 'selected' : ''}>${c}</option>`).join('')}
      </select>
      <select class="filter-select" id="res-subject">
        ${SUBJECTS.map(s => `<option ${s === view.subject ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
      ${fromCbt ? `<span class="text-xs text-muted">${fromCbt} score${fromCbt === 1 ? '' : 's'} pre-filled from the CBT exam</span>` : ''}
    </div>

    <div class="table-card">
      <table class="responsive-table">
        <thead>
          <tr>
            <th style="width:50px">#</th>
            <th>Student Name</th>
            <th>CBT Score</th>
            <th>Final Score (/100)</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml || '<tr class="responsive-empty"><td colspan="5" class="text-center text-muted">No students in this class.</td></tr>'}
        </tbody>
      </table>
      <div class="flex items-center justify-between p-4 border-t" style="flex-wrap:wrap;gap:12px">
        <div class="text-xs text-muted">Parents get an SMS when results are saved.</div>
        <button class="btn btn-primary" id="btn-save-results" ${roster.length ? '' : 'disabled'}>${icons.save} Save Results</button>
      </div>
    </div>
  `;
}

export function init() {
  document.getElementById('res-class').addEventListener('change', e => { view.class = e.target.value; rerender(); });
  document.getElementById('res-subject').addEventListener('change', e => { view.subject = e.target.value; rerender(); });

  document.getElementById('btn-save-results').addEventListener('click', () => {
    let saved = 0;
    let invalid = false;

    document.querySelectorAll('tr[data-student-id]').forEach(row => {
      const input = row.querySelector('.score-input');
      input.classList.remove('is-invalid');
      if (input.value === '') return;
      const score = Number(input.value);
      if (score < 0 || score > 100) { input.classList.add('is-invalid'); invalid = true; return; }

      const studentId = Number(row.dataset.studentId);
      const remark = row.querySelector('.remark-input').value.trim();
      const existing = results.find(r => r.studentId === studentId && r.subject === view.subject && r.term === TERM);
      if (existing) Object.assign(existing, { score, remark });
      else results.push({ studentId, subject: view.subject, score, remark, term: TERM });
      saved++;
    });

    if (invalid) { toast('Scores must be between 0 and 100', 'danger'); return; }
    if (!saved) { toast('Enter at least one score to save', 'warning'); return; }

    toast(`${saved} ${view.class} ${view.subject} result${saved === 1 ? '' : 's'} saved — SMS sent to ${saved} parent${saved === 1 ? '' : 's'}`);
  });
}
