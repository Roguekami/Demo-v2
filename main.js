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
  form.addEventListener('submit', e => {
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

    // There is no submit endpoint yet, so the form validates and then says
    // so rather than claiming a request was sent. To make it live: POST the
    // FormData here, show the pending state while the request is in flight,
    // and switch the status below to 'success' on a 2xx response.
    //
    //   submitBtn.disabled = true;
    //   const res = await fetch('/api/demo-request', { method: 'POST', body: new FormData(form) });
    //   submitBtn.disabled = false;
    //   if (!res.ok) return showStatus('error', 'Something went wrong. Please try again.');
    //   form.reset();
    //   showStatus('success', 'Thank you. Your demo request has been received.');

    // The entries stay in the fields, since nothing has been sent anywhere.
    showStatus(
      'notice',
      'Your details are complete. This site is not yet connected to an inbox, so nothing has been sent. Draft for review: add the form endpoint before launch.'
    );
  });
}
