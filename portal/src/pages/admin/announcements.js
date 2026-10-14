import { icons } from '../../icons.js';
import { announcements, events, formatDate, escapeHtml, nextId, todayISO } from '../../data/mock.js';
import { openModal, field, toast } from '../../components/modal.js';
import { rerender } from '../../router.js';

export function render() {
  const announcementCards = announcements.map(a => `
    <div class="announcement-card">
      <div class="flex justify-between items-center">
        <div class="announcement-date">${formatDate(a.date)}</div>
        <button class="btn btn-sm btn-ghost text-danger delete-announcement" data-id="${a.id}" title="Delete">${icons.trash}</button>
      </div>
      <div class="announcement-title">${escapeHtml(a.title)}</div>
      <div class="announcement-body">${escapeHtml(a.body)}</div>
    </div>
  `).join('');

  return `
    <div class="page-header">
      <h2>Announcements & Events</h2>
      <button class="btn btn-primary" id="btn-new-announcement">
        ${icons.plus} New Announcement
      </button>
    </div>

    <p class="text-sm text-secondary mb-4">Posts here appear on every teacher's and student's dashboard.</p>

    <div class="card">
      ${announcementCards || '<div class="empty-state"><p>No announcements yet.</p></div>'}
    </div>
  `;
}

export function openAnnouncementModal() {
  openModal({
    title: 'New Announcement',
    submitLabel: 'Post',
    content: `
      <div class="form-group">
        <label class="form-label" for="ann-title">Title</label>
        <input type="text" class="form-input" id="ann-title" placeholder="e.g. Open Day this Saturday" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="ann-date">Date</label>
        <input type="date" class="form-input" id="ann-date" value="${todayISO()}" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="ann-body">Message</label>
        <textarea class="form-textarea" id="ann-body" rows="4" required></textarea>
      </div>
      <label class="flex items-center gap-2 text-sm">
        <input type="checkbox" id="ann-event"> Also add to Upcoming Events
      </label>
    `,
    onSubmit: () => {
      const date = field('ann-date');
      const title = field('ann-title');
      announcements.unshift({ id: nextId(announcements), title, date, body: field('ann-body') });

      if (document.getElementById('ann-event').checked) {
        const d = new Date(date);
        events.push({
          id: nextId(events), title, date,
          day: String(d.getDate()),
          month: d.toLocaleDateString('en-GB', { month: 'short' }),
          description: field('ann-body').slice(0, 60),
        });
        events.sort((a, b) => a.date.localeCompare(b.date));
      }

      toast('Announcement posted to all teachers and students');
      rerender();
    },
  });
}

export function init() {
  document.getElementById('btn-new-announcement').addEventListener('click', openAnnouncementModal);

  document.querySelectorAll('.delete-announcement').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = announcements.findIndex(a => a.id === Number(btn.dataset.id));
      if (idx > -1) announcements.splice(idx, 1);
      toast('Announcement deleted', 'info');
      rerender();
    });
  });
}
