/* ============================================================
   main.js — Alimo EduCloud marketing site
   Covers: nav toggle, form validation, copyright year
   ============================================================ */

'use strict';

// ── Copyright year ──────────────────────────────────────────
const yearEl = document.getElementById('copyright-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Mobile nav toggle ───────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on any nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });
}

// ── Demo form validation ────────────────────────────────────
const form       = document.getElementById('demo-form');
const statusBox  = document.getElementById('form-status');
const submitBtn  = document.getElementById('submit-btn');

const rules = {
  'first-name':       { required: true, label: 'First name' },
  'last-name':        { required: true, label: 'Last name' },
  'email':            { required: true, type: 'email', label: 'Work email' },
  'school-name':      { required: true, label: 'School name' },
  'school-type':      { required: true, label: 'School type' },
  'privacy-consent':  { required: true, type: 'checkbox', label: 'Privacy consent' },
};

function getError(name, el) {
  const rule = rules[name];
  if (!rule) return '';

  if (rule.type === 'checkbox') {
    return el.checked ? '' : 'Please confirm you have read the Privacy Policy.';
  }
  if (rule.required && !el.value.trim()) {
    return `${rule.label} is required.`;
  }
  if (rule.type === 'email') {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(el.value.trim())) return 'Please enter a valid email address.';
  }
  return '';
}

function validateField(name) {
  const el    = form.elements[name];
  const errEl = document.getElementById(`${name}-error`);
  if (!el || !errEl) return true;

  const msg = getError(name, el);
  errEl.textContent = msg;
  el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  if (msg) el.setAttribute('aria-describedby', `${name}-error`);
  return !msg;
}

// Validate on blur
Object.keys(rules).forEach(name => {
  const el = form && form.elements[name];
  if (!el) return;
  el.addEventListener('blur', () => validateField(name));
  if (el.type === 'checkbox') {
    el.addEventListener('change', () => validateField(name));
  }
});

function showStatus(type, message) {
  statusBox.setAttribute('data-type', type);
  statusBox.textContent = message;
  statusBox.removeAttribute('aria-hidden');
  statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearStatus() {
  statusBox.removeAttribute('data-type');
  statusBox.textContent = '';
  statusBox.style.display = '';
  statusBox.setAttribute('aria-hidden', 'true');
}

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    clearStatus();

    // Validate all fields
    let firstInvalid = null;
    let allValid = true;
    Object.keys(rules).forEach(name => {
      const valid = validateField(name);
      if (!valid && !firstInvalid) {
        firstInvalid = form.elements[name];
      }
      allValid = allValid && valid;
    });

    if (!allValid) {
      if (firstInvalid) firstInvalid.focus();
      showStatus('error', 'Please complete the required fields before submitting.');
      return;
    }

    // Submit via AJAX to Formspree
    const originalBtnText = submitBtn ? submitBtn.textContent : 'Send request';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    try {
      const response = await fetch(form.action || 'https://formspree.io/f/myeklwbo', {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        showStatus('success', 'Thank you! Your demo request has been received. We will be in touch within one business day.');
      } else {
        const data = await response.json().catch(() => ({}));
        if (data && data.errors && data.errors.length > 0) {
          const errorMsg = data.errors.map(err => err.message).join(', ');
          showStatus('error', `Submission error: ${errorMsg}`);
        } else {
          showStatus('error', 'Something went wrong while sending your request. Please try again or contact us directly.');
        }
      }
    } catch (err) {
      showStatus('error', 'Network error. Please check your internet connection and try again.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });
}

// ── Animated Stat Bars & Percentage Counter ─────────────────
function initStatAnimations() {
  const statBars = document.querySelectorAll('.stat-bar-track');
  if (!statBars.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const cardsToAnimate = [];
  statBars.forEach(track => {
    const card = track.closest('.stat-card');
    if (!card) return;
    const fillEl = track.querySelector('.stat-bar-fill');
    const valueEl = card.querySelector('.stat-value');
    if (!fillEl || !valueEl) return;

    const targetWidth = fillEl.style.width || '88%';
    const match = valueEl.textContent.match(/(\d+)/);
    const targetVal = match ? parseInt(match[1], 10) : 88;
    const unitEl = valueEl.querySelector('.stat-unit');
    const unitHtml = unitEl ? unitEl.outerHTML : '<span class="stat-unit">%</span>';

    if (!prefersReducedMotion) {
      fillEl.style.width = '0%';
      valueEl.innerHTML = '0' + unitHtml;
    }

    cardsToAnimate.push({ card, fillEl, valueEl, targetWidth, targetVal, unitHtml });
  });

  const runAnimation = (item) => {
    if (prefersReducedMotion) {
      item.fillEl.style.width = item.targetWidth;
      item.valueEl.innerHTML = item.targetVal + item.unitHtml;
      return;
    }

    // Animate progress bar fill smoothly
    item.fillEl.style.transition = 'width 1.3s cubic-bezier(0.16, 1, 0.3, 1)';
    requestAnimationFrame(() => {
      item.fillEl.style.width = item.targetWidth;
    });

    // Animate number count-up
    const duration = 1300;
    const startTime = performance.now();

    function updateCount(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(ease * item.targetVal);

      item.valueEl.innerHTML = current + item.unitHtml;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        item.valueEl.innerHTML = item.targetVal + item.unitHtml;
      }
    }

    requestAnimationFrame(updateCount);
  };

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const matched = cardsToAnimate.find(c => c.card === entry.target);
          if (matched) {
            runAnimation(matched);
            obs.unobserve(entry.target);
          }
        }
      });
    }, { threshold: 0.2 });

    cardsToAnimate.forEach(c => observer.observe(c.card));
  } else {
    cardsToAnimate.forEach(c => runAnimation(c));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStatAnimations);
} else {
  initStatAnimations();
}
