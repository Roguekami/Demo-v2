import { icons } from '../../icons.js';
import { students, teachers, announcements, events, formatCurrency, formatDate, escapeHtml, getTotalCollected, getTotalOutstanding } from '../../data/mock.js';
import { navigate } from '../../router.js';
import { openEnrollModal } from './students.js';
import { openAnnouncementModal } from './announcements.js';

export function render() {
  const totalStudents = students.length;
  const activeTeachers = teachers.filter(t => t.status === 'active').length;
  const collectedRaw = getTotalCollected();
  const outstandingRaw = getTotalOutstanding();
  const collectionRate = Math.round((collectedRaw / (collectedRaw + outstandingRaw || 1)) * 100);
  const owing = students.filter(s => s.amountDue > s.amountPaid).length;

  const recentAnnouncements = announcements.slice(0, 2).map(a => `
    <div class="announcement-card">
      <div class="announcement-date">${formatDate(a.date)}</div>
      <div class="announcement-title">${escapeHtml(a.title)}</div>
      <div class="announcement-body">${escapeHtml(a.body)}</div>
    </div>
  `).join('');

  const upcomingEvents = events.map(e => `
    <div class="event-item">
      <div class="event-date-badge">
        <span class="day">${e.day}</span>
        <span class="month">${e.month}</span>
      </div>
      <div>
        <div class="event-title">${escapeHtml(e.title)}</div>
        <div class="event-desc">${escapeHtml(e.description || '')}</div>
      </div>
    </div>
  `).join('');

  return `
    <div class="page-header">
      <h2>Dashboard</h2>
      <div class="quick-actions m-0">
        <button class="btn btn-primary" id="btn-enroll">
          ${icons.plus} Enroll Student
        </button>
        <button class="btn btn-secondary" id="btn-announce">
          ${icons.megaphone} Post Announcement
        </button>
      </div>
    </div>

    <div class="card-grid">
      <div class="stat-card">
        <div class="stat-card-content">
          <div class="stat-card-label">Total Students</div>
          <div class="stat-card-value">${totalStudents}</div>
          <div class="stat-card-sub">Currently enrolled</div>
        </div>
        <div class="stat-icon blue">${icons.users}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-content">
          <div class="stat-card-label">Teachers</div>
          <div class="stat-card-value">${activeTeachers}</div>
          <div class="stat-card-sub">Active staff</div>
        </div>
        <div class="stat-icon green">${icons.graduationCap}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-content">
          <div class="stat-card-label">Fees Collected</div>
          <div class="stat-card-value">${formatCurrency(collectedRaw)}</div>
          <div class="progress-bar mt-2"><div class="progress-fill green" style="width:${collectionRate}%"></div></div>
          <div class="stat-card-sub">${collectionRate}% of this term's fees</div>
        </div>
        <div class="stat-icon blue">${icons.creditCard}</div>
      </div>
      <div class="stat-card clickable-row" id="card-outstanding">
        <div class="stat-card-content">
          <div class="stat-card-label">Fees Outstanding</div>
          <div class="stat-card-value">${formatCurrency(outstandingRaw)}</div>
          <div class="stat-card-sub">${owing} student${owing === 1 ? '' : 's'} owing &rarr;</div>
        </div>
        <div class="stat-icon amber">${icons.creditCard}</div>
      </div>
    </div>

    <div class="grid-2">
      <div>
        <div class="section-heading">Recent Announcements</div>
        <div class="card">
          ${recentAnnouncements || '<p class="text-sm text-muted">No announcements yet.</p>'}
        </div>
      </div>
      <div>
        <div class="section-heading">Upcoming Events</div>
        <div class="card">
          ${upcomingEvents || '<p class="text-sm text-muted">No upcoming events.</p>'}
        </div>
      </div>
    </div>
  `;
}

export function init() {
  document.getElementById('btn-enroll').addEventListener('click', openEnrollModal);
  document.getElementById('btn-announce').addEventListener('click', openAnnouncementModal);
  document.getElementById('card-outstanding').addEventListener('click', () => navigate('#/admin/fees'));
}
