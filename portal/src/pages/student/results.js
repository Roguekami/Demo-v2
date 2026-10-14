import { icons } from '../../icons.js';
import { getResultsForStudent, getStudent, getAttendanceForStudent, escapeHtml } from '../../data/mock.js';
import { getUser } from '../../router.js';

const TERM = '2024/2025 — Term 1';

function getGrade(score) {
  if (score >= 70) return 'A';
  if (score >= 60) return 'B';
  if (score >= 50) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

export function render() {
  const student = getStudent(getUser().studentId);
  const results = getResultsForStudent(student.id).filter(r => r.term === TERM);
  const att = getAttendanceForStudent(student.id);
  const total = results.reduce((sum, r) => sum + r.score, 0);
  const avg = results.length ? total / results.length : 0;
  const overallGrade = getGrade(Math.round(avg));

  return `
    <div class="page-header no-print">
      <h2>Results</h2>
      <div class="flex gap-3">
        <select class="filter-select">
          <option>${TERM}</option>
        </select>
        <button class="btn btn-secondary" onclick="window.print()">${icons.printer} Print</button>
      </div>
    </div>

    <div class="report-card">
      <div class="report-header">
        <h3>Lincoln Academy</h3>
        <p>Student Report Card &mdash; ${TERM}</p>
      </div>

      <div class="report-meta">
        <div><p class="text-xs text-muted mb-1">Name</p><p class="font-semibold">${escapeHtml(student.name)}</p></div>
        <div><p class="text-xs text-muted mb-1">Admission No</p><p class="font-semibold">${student.admissionNo}</p></div>
        <div><p class="text-xs text-muted mb-1">Class</p><p class="font-semibold">${student.class}</p></div>
        <div><p class="text-xs text-muted mb-1">Subjects taken</p><p class="font-semibold">${results.length}</p></div>
        <div><p class="text-xs text-muted mb-1">Average</p><p class="font-semibold">${avg.toFixed(1)}%</p></div>
        <div><p class="text-xs text-muted mb-1">Attendance</p><p class="font-semibold">${att ? `${att.daysPresent}/${att.totalDays} days` : '—'}</p></div>
      </div>

      <table class="responsive-table report-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Score (/100)</th>
            <th>Grade</th>
            <th>Teacher's Remark</th>
          </tr>
        </thead>
        <tbody>
          ${results.map(r => `
            <tr>
              <td class="td-name cell-title">${escapeHtml(r.subject)}</td>
              <td data-label="Score">
                <div class="flex items-center gap-3">
                  <span class="font-semibold" style="min-width:24px">${r.score}</span>
                  <div class="progress-bar" style="width:100px"><div class="progress-fill" style="width:${r.score}%"></div></div>
                </div>
              </td>
              <td data-label="Grade"><span class="grade-pill grade-${getGrade(r.score)}">${getGrade(r.score)}</span></td>
              <td class="text-secondary" data-label="Remark">${escapeHtml(r.remark)}</td>
            </tr>
          `).join('') || '<tr class="responsive-empty"><td colspan="4" class="text-center text-muted">No results published for this term yet.</td></tr>'}
        </tbody>
        ${results.length ? `
          <tfoot>
            <tr class="report-total">
              <td class="font-semibold cell-title">Overall</td>
              <td class="font-semibold" data-label="Average">${avg.toFixed(1)}</td>
              <td data-label="Grade"><span class="grade-pill grade-${overallGrade}">${overallGrade}</span></td>
              <td></td>
            </tr>
          </tfoot>
        ` : ''}
      </table>

      <div class="report-section border-t grid-2">
        <div>
          <h4 class="font-semibold text-sm mb-2">Class Teacher's Comment</h4>
          <p class="text-secondary italic text-sm">"${escapeHtml(student.name.split(' ')[0])} has shown great improvement this term. Keep up the good work!"</p>
        </div>
        <div>
          <h4 class="font-semibold text-sm mb-2">Grading Key</h4>
          <p class="text-xs text-secondary">A: 70–100 &middot; B: 60–69 &middot; C: 50–59 &middot; D: 40–49 &middot; F: 0–39</p>
        </div>
      </div>
    </div>
  `;
}

export function init() {}
