// ===========================================================
// Alimo EduCloud Portal — Login Page
// ===========================================================
import { navigate, setUser } from '../router.js';
import { demoAccounts, escapeHtml } from '../data/mock.js';
import { openModal, field, toast } from '../components/modal.js';
import { siteUrl } from '../site.js';

export function render() {
  return `
    <div class="login-layout">
      <div class="login-card">
        <div class="login-logo">Alimo <span>EduCloud</span></div>
        <p class="login-subtitle">Sign in to the Lincoln Academy portal</p>

        <form id="login-form">
          <div class="form-group">
            <label class="form-label" for="login-email">Email address</label>
            <input class="form-input" type="email" id="login-email" placeholder="Enter your email" autocomplete="email" />
          </div>
          <div class="form-group">
            <label class="form-label" for="login-password">Password</label>
            <input class="form-input" type="password" id="login-password" placeholder="Enter your password" autocomplete="current-password" />
          </div>
          <div class="form-error hidden" id="login-error">No account found for that email. Try one of the demo accounts below.</div>
          <a href="#" class="login-forgot" id="forgot-link">Forgot password?</a>
          <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;padding:12px;">
            Sign in
          </button>
        </form>

        <div class="demo-accounts">
          <div class="demo-accounts-label">Quick demo access</div>
          <button class="demo-btn" data-role="admin">
            <div class="demo-btn-avatar" style="background:#2563eb;">AJ</div>
            <div class="demo-btn-info">
              <div class="demo-btn-name">Adewale Johnson</div>
              <div class="demo-btn-role">Administrator</div>
            </div>
          </button>
          <button class="demo-btn" data-role="teacher">
            <div class="demo-btn-avatar" style="background:#059669;">NO</div>
            <div class="demo-btn-info">
              <div class="demo-btn-name">Mrs. Ngozi Okafor</div>
              <div class="demo-btn-role">Teacher — Mathematics</div>
            </div>
          </button>
          <button class="demo-btn" data-role="student">
            <div class="demo-btn-avatar" style="background:#d97706;">CE</div>
            <div class="demo-btn-info">
              <div class="demo-btn-name">Chidera Eze</div>
              <div class="demo-btn-role">Student — SS2</div>
            </div>
          </button>
        </div>

        <a class="login-back" href="${siteUrl}">&larr; Back to Alimo EduCloud</a>
      </div>
    </div>
  `;
}

export function init() {
  // Demo account quick-access buttons
  document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.role;
      setUser(demoAccounts[role]);
      navigate(`#/${role}/dashboard`);
    });
  });

  // Form submit (also uses demo accounts for the demo)
  document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email')?.value?.trim().toLowerCase();
    const match = Object.values(demoAccounts).find(a => a.email === email);
    if (match) {
      setUser(match);
      navigate(`#/${match.role}/dashboard`);
    } else {
      document.getElementById('login-error').classList.remove('hidden');
      document.getElementById('login-email').classList.add('is-invalid');
    }
  });

  document.getElementById('forgot-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal({
      title: 'Reset your password',
      submitLabel: 'Send reset link',
      content: `
        <p class="text-sm text-secondary mb-4">Enter the email on your account and we'll send you a link to reset your password.</p>
        <div class="form-group">
          <label class="form-label" for="reset-email">Email address</label>
          <input class="form-input" type="email" id="reset-email" value="${escapeHtml(document.getElementById('login-email').value)}" required />
        </div>
      `,
      onSubmit: () => toast(`Reset link sent to ${escapeHtml(field('reset-email'))}`),
    });
  });
}
