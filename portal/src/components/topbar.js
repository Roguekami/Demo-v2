// ===========================================================
// Alimo EduCloud Portal — Topbar Component
// ===========================================================
import { icons } from '../icons.js';
import { announcements, formatDate } from '../data/mock.js';

export function renderTopbar(user, pageTitle) {
  const recent = announcements.slice(0, 3);
  return `
    <header class="topbar">
      <div class="topbar-left">
        <button class="menu-btn" id="menu-btn" aria-label="Open menu">${icons.menu}</button>
        <h2 class="topbar-title">${pageTitle}</h2>
      </div>
      <div class="topbar-right">
        <div class="notif-wrap">
          <button class="topbar-icon-btn" id="notif-btn" title="Notifications" aria-label="Notifications">
            ${icons.bell}
            ${recent.length ? '<span class="notif-dot"></span>' : ''}
          </button>
          <div class="notif-menu" id="notif-menu">
            <div class="notif-menu-header">Notifications</div>
            ${recent.map(a => `
              <div class="notif-item">
                <div class="notif-item-title">${a.title}</div>
                <div class="notif-item-date">${formatDate(a.date)}</div>
              </div>
            `).join('') || '<div class="notif-item text-muted">You\'re all caught up.</div>'}
          </div>
        </div>
      </div>
    </header>
  `;
}

export function initTopbar() {
  const menuBtn = document.getElementById('menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebar-overlay');
      if (sidebar) sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('open');
    });
  }

  const notifBtn = document.getElementById('notif-btn');
  const notifMenu = document.getElementById('notif-menu');
  if (notifBtn && notifMenu) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifMenu.classList.toggle('open');
      notifBtn.querySelector('.notif-dot')?.remove();
    });
    document.addEventListener('click', (e) => {
      if (!notifMenu.contains(e.target)) notifMenu.classList.remove('open');
    });
  }
}
