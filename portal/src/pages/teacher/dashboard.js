import { icons } from '../../icons.js';
import { schedule, announcements, uiState, formatDate, escapeHtml, greeting } from '../../data/mock.js';
import { navigate, getUser } from '../../router.js';

const pending = [
  { color: 'var(--danger)',  text: 'SS2 Mathematics results not yet submitted', route: '#/teacher/results' },
  { color: 'var(--warning)', text: 'SS1 Further Mathematics results pending',   route: '#/teacher/results' },
  { color: 'var(--info)',    text: 'Upload resources for SS2 Mathematics',      route: '#/teacher/resources' },
];

export function render() {
  const user = getUser();
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const latest = announcements[0];

  const scheduleHtml = schedule.map(item => `
    <div class="schedule-item">
      <div class="schedule-time">${item.time}</div>
      <div class="schedule-info">
        <div class="schedule-subject">${item.subject}</div>
        <div class="schedule-class">${item.class} &middot; Period ${item.period}</div>
      </div>
      <button class="btn btn-sm btn-primary mark-attendance-btn" data-class="${item.class}">${icons.clipboardCheck} Mark attendance</button>
    </div>
  `).join('');

  return `
    <div class="greeting-card">
      <h2>${greeting()}, ${escapeHtml(user.name)}</h2>
      <p>${today} &middot; ${schedule.length} periods today</p>
    </div>

    <div class="grid-2">
      <div class="card p-0">
        <div class="p-5 border-b"><h3 class="section-heading m-0">Today's Schedule</h3></div>
        ${scheduleHtml}
      </div>

      <div>
        <div class="card mb-6">
          <h3 class="section-heading">Pending Actions</h3>
          ${pending.map(p => `
            <a href="${p.route}" class="flex items-center gap-3 mb-4 text-sm">
              <span style="width:10px;height:10px;border-radius:50%;background:${p.color};flex-shrink:0"></span>
              <span class="flex-1">${p.text}</span>
              <span class="text-muted">${icons.chevronRight}</span>
            </a>
          `).join('')}
        </div>
        ${latest ? `
          <div class="section-heading">Latest Announcement</div>
          <div class="announcement-card">
            <div class="announcement-date">${formatDate(latest.date)}</div>
            <div class="announcement-title">${escapeHtml(latest.title)}</div>
            <div class="announcement-body">${escapeHtml(latest.body)}</div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

export function init() {
  document.querySelectorAll('.mark-attendance-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      uiState.attendanceClass = btn.dataset.class;
      navigate('#/teacher/attendance');
    });
  });
}
