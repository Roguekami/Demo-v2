// ===========================================================
// Alimo EduCloud Portal — Sidebar Component
// ===========================================================
import { icons } from '../icons.js';

const navConfig = {
  admin: [
    { label: 'Dashboard',          icon: 'dashboard',     route: '#/admin/dashboard' },
    { label: 'Students',           icon: 'users',         route: '#/admin/students' },
    { label: 'Teachers',           icon: 'graduationCap', route: '#/admin/teachers' },
    { label: 'Classes & Subjects', icon: 'bookOpen',      route: '#/admin/classes' },
    { label: 'Fee Management',     icon: 'creditCard',    route: '#/admin/fees' },
    { label: 'Announcements',      icon: 'megaphone',     route: '#/admin/announcements' },
  ],
  teacher: [
    { label: 'Dashboard',      icon: 'dashboard',     route: '#/teacher/dashboard' },
    { label: 'Attendance',     icon: 'clipboardCheck', route: '#/teacher/attendance' },
    { label: 'Exam Creation',  icon: 'fileText',      route: '#/teacher/exams' },
    { label: 'Results Entry',  icon: 'barChart',      route: '#/teacher/results' },
    { label: 'Resources',      icon: 'upload',        route: '#/teacher/resources' },
  ],
  student: [
    { label: 'Dashboard',      icon: 'dashboard',     route: '#/student/dashboard' },
    { label: 'Attendance',     icon: 'clipboardCheck', route: '#/student/attendance' },
    { label: 'Fees & Payment', icon: 'creditCard',    route: '#/student/fees' },
    { label: 'CBT Exam',       icon: 'fileText',      route: '#/student/exams' },
    { label: 'Results',        icon: 'barChart',      route: '#/student/results' },
    { label: 'Resources',      icon: 'folder',        route: '#/student/resources' },
  ],
};

const pageTitles = {};
Object.values(navConfig).forEach(items => {
  items.forEach(item => { pageTitles[item.route] = item.label; });
});
export { pageTitles };

export function renderSidebar(role, currentRoute) {
  const items = navConfig[role] || [];
  const sectionLabel = role === 'admin' ? 'Administration' : role === 'teacher' ? 'Teaching' : 'My Portal';

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <h1>Alimo <span>EduCloud</span></h1>
      </div>
      <nav class="sidebar-nav">
        <div class="sidebar-section-label">${sectionLabel}</div>
        ${items.map(item => `
          <a href="${item.route}" class="sidebar-link${item.route === currentRoute ? ' active' : ''}" data-route="${item.route}">
            ${icons[item.icon] || ''}
            <span>${item.label}</span>
          </a>
        `).join('')}
      </nav>
      <div class="sidebar-footer" id="sidebar-footer"></div>
    </aside>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
  `;
}

export function initSidebar() {
  const overlay = document.getElementById('sidebar-overlay');
  const sidebar = document.getElementById('sidebar');
  if (overlay && sidebar) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }
}
