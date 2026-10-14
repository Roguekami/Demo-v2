import { icons } from '../../icons.js';
import { students, attendanceRecords, uiState, escapeHtml } from '../../data/mock.js';
import { toast } from '../../components/modal.js';
import { rerender } from '../../router.js';

const STATUS_CLASS = { present: 'active', late: 'active-warning', absent: 'active-danger' };
const savedToday = new Set();

function teacherClasses() {
  return ['SS1', 'SS2'];
}

export function render() {
  const classes = teacherClasses();
  const selected = classes.includes(uiState.attendanceClass) ? uiState.attendanceClass : classes[0];
  uiState.attendanceClass = selected;

  const today = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const roster = students.filter(s => s.class === selected);

  const rowsHtml = roster.map((student, index) => `
    <tr data-student-id="${student.id}">
      <td class="text-muted cell-hide-mobile">${index + 1}</td>
      <td class="td-name cell-title">${escapeHtml(student.name)}</td>
      <td class="cell-status">
        <div class="toggle-group">
          ${['present', 'late', 'absent'].map(s => `
            <button class="toggle-option ${s === 'present' ? 'active' : ''}" data-status="${s}">${s[0].toUpperCase() + s.slice(1)}</button>
          `).join('')}
        </div>
      </td>
    </tr>
  `).join('');

  return `
    <div class="page-header">
      <h2>Mark Attendance</h2>
      ${savedToday.has(selected) ? `<span class="badge badge-success">${icons.check} Saved for today</span>` : ''}
    </div>

    <div class="filter-bar">
      <select class="filter-select" id="attendance-class">
        ${classes.map(c => `<option ${c === selected ? 'selected' : ''}>${c}</option>`).join('')}
      </select>
      <div class="text-sm text-secondary">${today}</div>
      <div class="text-xs text-muted">Everyone starts as Present — just tap the exceptions.</div>
    </div>

    <div class="table-card">
      <table class="responsive-table">
        <thead>
          <tr>
            <th style="width:50px">#</th>
            <th>Student Name</th>
            <th style="width:260px">Status</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml || '<tr class="responsive-empty"><td colspan="3" class="text-center text-muted">No students in this class.</td></tr>'}
        </tbody>
      </table>
      <div class="flex items-center justify-between p-4 border-t" style="flex-wrap:wrap;gap:12px">
        <div class="text-sm text-secondary">
          <span id="present-count" class="font-semibold text-success">${roster.length}</span> Present &middot;
          <span id="late-count" class="font-semibold">0</span> Late &middot;
          <span id="absent-count" class="font-semibold text-danger">0</span> Absent
        </div>
        <button class="btn btn-primary" id="btn-save-attendance" ${roster.length ? '' : 'disabled'}>${icons.save} Save Attendance</button>
      </div>
    </div>
  `;
}

function updateCounts() {
  const count = cls => document.querySelectorAll(`.toggle-option.${cls}`).length;
  document.getElementById('present-count').textContent = count('active');
  document.getElementById('late-count').textContent = count('active-warning');
  document.getElementById('absent-count').textContent = count('active-danger');
}

export function init() {
  document.querySelectorAll('.toggle-group').forEach(group => {
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('.toggle-option');
      if (!btn) return;
      group.querySelectorAll('.toggle-option').forEach(b => b.classList.remove('active', 'active-warning', 'active-danger'));
      btn.classList.add(STATUS_CLASS[btn.dataset.status]);
      updateCounts();
    });
  });

  document.getElementById('attendance-class').addEventListener('change', (e) => {
    uiState.attendanceClass = e.target.value;
    rerender();
  });

  document.getElementById('btn-save-attendance').addEventListener('click', () => {
    let absent = 0;
    document.querySelectorAll('tr[data-student-id]').forEach(row => {
      const status = row.querySelector('.toggle-option.active, .toggle-option.active-warning, .toggle-option.active-danger')?.dataset.status;
      const record = attendanceRecords.find(r => r.studentId === Number(row.dataset.studentId));
      if (status === 'absent') absent++;
      if (record && !savedToday.has(uiState.attendanceClass)) {
        record.totalDays++;
        if (status === 'absent') record.daysAbsent++; else record.daysPresent++;
      }
    });
    savedToday.add(uiState.attendanceClass);
    toast(`${uiState.attendanceClass} attendance saved${absent ? ` — ${absent} absent` : ' — full attendance'}`);
    rerender();
  });
}
