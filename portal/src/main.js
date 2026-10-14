// ===========================================================
// Alimo EduCloud Portal — Main Entry
// ===========================================================
import './style.css';
import { navigate, getUser, setUser, clearUser } from './router.js';
import { renderSidebar, initSidebar, pageTitles } from './components/sidebar.js';
import { renderTopbar, initTopbar } from './components/topbar.js';
import { icons } from './icons.js';
import { siteUrl, backArrowIcon } from './site.js';

const app = document.getElementById('app');

// --- Page loaders (lazy) -----------------------------------
const pageLoaders = {
  '#/login':               () => import('./pages/login.js'),
  '#/admin/dashboard':     () => import('./pages/admin/dashboard.js'),
  '#/admin/students':      () => import('./pages/admin/students.js'),
  '#/admin/teachers':      () => import('./pages/admin/teachers.js'),
  '#/admin/classes':       () => import('./pages/admin/classes.js'),
  '#/admin/fees':          () => import('./pages/admin/fees.js'),
  '#/admin/announcements': () => import('./pages/admin/announcements.js'),
  '#/teacher/dashboard':   () => import('./pages/teacher/dashboard.js'),
  '#/teacher/attendance':  () => import('./pages/teacher/attendance.js'),
  '#/teacher/exams':       () => import('./pages/teacher/exams.js'),
  '#/teacher/results':     () => import('./pages/teacher/results.js'),
  '#/teacher/resources':   () => import('./pages/teacher/resources.js'),
  '#/student/dashboard':   () => import('./pages/student/dashboard.js'),
  '#/student/attendance':  () => import('./pages/student/attendance.js'),
  '#/student/fees':        () => import('./pages/student/fees.js'),
  '#/student/exams':       () => import('./pages/student/exams.js'),
  '#/student/results':     () => import('./pages/student/results.js'),
  '#/student/resources':   () => import('./pages/student/resources.js'),
};

// --- Route handler -----------------------------------------
async function handleRoute() {
  const route = window.location.hash || '#/login';
  const user = getUser();

  // Auth guards
  if (!user && route !== '#/login') { navigate('#/login'); return; }
  if (user && route === '#/login') { navigate(`#/${user.role}/dashboard`); return; }

  // Prevent cross-role access
  if (user && !route.startsWith(`#/${user.role}/`) && route !== '#/login') {
    navigate(`#/${user.role}/dashboard`);
    return;
  }

  const loader = pageLoaders[route];
  if (!loader) { navigate(user ? `#/${user.role}/dashboard` : '#/login'); return; }

  const mod = await loader();
  if ((window.location.hash || '#/login') !== route) return; // navigated away while loading
  window.scrollTo(0, 0);

  // Login and the CBT exam render without app chrome
  if (route === '#/login' || route === '#/student/exams') {
    app.innerHTML = mod.render();
    if (mod.init) mod.init();
    return;
  }

  // App layout
  const pageTitle = pageTitles[route] || 'Dashboard';

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar(user.role, route)}
      <main class="main-content">
        ${renderTopbar(user, pageTitle)}
        <div class="page-content" id="page-content">
          ${mod.render()}
        </div>
      </main>
    </div>
  `;

  // Sidebar footer — user info + logout
  const footer = document.getElementById('sidebar-footer');
  if (footer) {
    footer.innerHTML = `
      <div class="sidebar-user">
        <div class="sidebar-avatar">${user.initials}</div>
        <div class="sidebar-user-info">
          <div class="sidebar-user-name">${user.name}</div>
          <div class="sidebar-user-role">${user.role}</div>
        </div>
      </div>
      <button class="sidebar-logout" id="logout-btn">
        ${icons.logOut}
        <span>Log out</span>
      </button>
      <a class="sidebar-back" href="${siteUrl}">
        ${backArrowIcon}
        <span>Back to Alimo EduCloud</span>
      </a>
    `;
    document.getElementById('logout-btn')?.addEventListener('click', () => {
      clearUser();
      navigate('#/login');
    });
  }

  initSidebar();
  initTopbar();
  if (mod.init) mod.init();
}

// --- Boot --------------------------------------------------
window.addEventListener('hashchange', handleRoute);
handleRoute();
