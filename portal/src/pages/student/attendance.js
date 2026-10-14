import { getAttendanceForStudent } from '../../data/mock.js';
import { getUser } from '../../router.js';

export function render() {
  const att = getAttendanceForStudent(getUser().studentId) ?? { daysPresent: 0, daysAbsent: 0, totalDays: 0 };
  const rate = att.totalDays ? Math.round((att.daysPresent / att.totalDays) * 100) : 0;

  return `
    <div class="page-header">
      <h2>Attendance Summary</h2>
    </div>

    <div class="card mb-6">
      <div class="mb-6">
        <h3 class="font-semibold">2024/2025 &mdash; Term 2</h3>
        <p class="text-sm text-muted">${att.totalDays} school days so far</p>
      </div>

      <div class="grid grid-cols-4 gap-4 mb-6">
        <div>
          <p class="text-sm text-muted">Days Present</p>
          <p class="text-2xl font-bold text-success">${att.daysPresent}</p>
        </div>
        <div>
          <p class="text-sm text-muted">Days Absent</p>
          <p class="text-2xl font-bold ${att.daysAbsent ? 'text-danger' : ''}">${att.daysAbsent}</p>
        </div>
        <div>
          <p class="text-sm text-muted">Total Days</p>
          <p class="text-2xl font-bold">${att.totalDays}</p>
        </div>
        <div>
          <p class="text-sm text-muted">Attendance Rate</p>
          <p class="text-2xl font-bold">${rate}%</p>
        </div>
      </div>

      <div class="progress-bar">
        <div class="progress-fill ${rate >= 75 ? 'green' : 'amber'}" style="width:${rate}%"></div>
      </div>
      <p class="text-xs text-muted mt-2">${rate >= 90 ? 'Excellent attendance — keep it up!' : rate >= 75 ? 'Good attendance.' : 'Attendance is below the school target of 75%.'}</p>
    </div>
  `;
}

export function init() {}
