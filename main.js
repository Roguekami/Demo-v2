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

    // Simulate submission (replace with real endpoint)
    const label = submitBtn.querySelector('.btn-label');
    const loading = submitBtn.querySelector('.btn-loading');
    submitBtn.disabled = true;
    label.hidden = true;
    loading.hidden = false;

    await new Promise(res => setTimeout(res, 1200));

    // Success state
    label.hidden = false;
    loading.hidden = true;
    submitBtn.disabled = false;
    form.reset();

    // Clear aria-invalid states
    Object.keys(rules).forEach(name => {
      const el = form.elements[name];
      if (el) el.removeAttribute('aria-invalid');
    });

    showStatus(
      'success',
      'Thank you. Your demo request has been received. An Alimo team member will be in touch within one business day.'
    );
  });
}
