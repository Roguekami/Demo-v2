import { icons } from '../../icons.js';
import { announcements, examSettings, formatDate, formatCurrency, escapeHtml, greeting, getStudent, getAttendanceForStudent } from '../../data/mock.js';
import { getUser, navigate } from '../../router.js';

export function render() {
  const user = getUser();
  const student = getStudent(user.studentId);
  const att = getAttendanceForStudent(user.studentId) ?? { daysPresent: 0, totalDays: 0 };
  const rate = att.totalDays ? Math.round((att.daysPresent / att.totalDays) * 100) : 0;
  const balance = student.amountDue - student.amountPaid;
  const latest = announcements[0];
  const firstName = student.name.split(' ')[0];

  return `
    <div class="greeting-card flex items-center gap-4">
      <div class="sidebar-avatar" style="width:56px;height:56px;font-size:1.125rem">${user.initials}</div>
      <div>
        <h2>${greeting()}, ${escapeHtml(firstName)}</h2>
        <p>${student.class} &middot; ${student.admissionNo}</p>
      </div>
    </div>

    ${examSettings.published && examSettings.class === student.class ? `
      <div class="card mb-6 flex items-center justify-between gap-4" style="flex-wrap:wrap;border-left:4px solid var(--primary)">
        <div>
          <div class="font-semibold">${examSettings.subject} CBT exam is open</div>
          <div class="text-sm text-secondary">${examSettings.duration} minutes &middot; one attempt</div>
        </div>
        <button class="btn btn-primary" id="btn-start-exam">Start exam ${icons.chevronRight}</button>
      </div>
    ` : ''}

    <div class="card-grid">
      <a href="#/student/attendance" class="stat-card">
        <div class="stat-card-content">
          <div class="stat-card-label">Attendance</div>
          <div class="stat-card-value">${att.daysPresent}/${att.totalDays} days</div>
          <div class="progress-bar mt-2"><div class="progress-fill ${rate >= 75 ? 'green' : 'amber'}" style="width:${rate}%"></div></div>
          <div class="stat-card-sub">${rate}% present this term</div>
        </div>
        <div class="stat-icon blue">${icons.clipboardCheck}</div>
      </a>

      <a href="#/student/fees" class="stat-card">
        <div class="stat-card-content">
          <div class="stat-card-label">Fee Balance</div>
          ${balance > 0 ? `
            <div class="stat-card-value text-danger">${formatCurrency(balance)}</div>
            <div class="stat-card-sub">Outstanding this term</div>
          ` : `
            <div class="stat-card-value">Fully paid</div>
            <div class="stat-card-sub">Nothing owed this term</div>
          `}
        </div>
        <div class="stat-icon ${balance > 0 ? 'red' : 'green'}">${icons.creditCard}</div>
      </a>

      <a href="#/student/results" class="stat-card">
        <div class="stat-card-content">
          <div class="stat-card-label">Latest Report Card</div>
          <div class="stat-card-value">Term 1</div>
          <div class="stat-card-sub">View and print &rarr;</div>
        </div>
        <div class="stat-icon blue">${icons.trendingUp}</div>
      </a>
    </div>

    <div class="section-heading">Latest Announcement</div>
    ${latest ? `
      <div class="announcement-card">
        <div class="announcement-date">${formatDate(latest.date)}</div>
        <div class="announcement-title">${escapeHtml(latest.title)}</div>
        <div class="announcement-body">${escapeHtml(latest.body)}</div>
      </div>
    ` : '<div class="card empty-state"><p>No new announcements.</p></div>'}
  `;
}

export function init() {
  document.getElementById('btn-start-exam')?.addEventListener('click', () => navigate('#/student/exams'));
}
