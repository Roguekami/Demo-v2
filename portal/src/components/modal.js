// ===========================================================
// Alimo EduCloud Portal — Modal Component
// ===========================================================
import { icons } from '../icons.js';

let modalRoot = null;
let closeTimer = null;

function ensureRoot() {
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);
  }
}

/**
 * Open a modal dialog.
 * @param {{ title: string, content: string, footer?: string, submitLabel?: string, onSubmit?: (body: HTMLElement) => boolean|void }} opts
 * onSubmit runs when the primary button is clicked; return false to keep the modal open.
 */
export function openModal({ title, content, footer, submitLabel = 'Save', onSubmit }) {
  ensureRoot();
  clearTimeout(closeTimer);

  const defaultFooter = footer ?? `
    <button class="btn btn-secondary" data-modal-close>Cancel</button>
    <button class="btn btn-primary" data-modal-submit>${submitLabel}</button>
  `;

  modalRoot.innerHTML = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal" role="dialog" aria-modal="true">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close" data-modal-close aria-label="Close">${icons.x}</button>
        </div>
        <div class="modal-body">${content}</div>
        <div class="modal-footer">${defaultFooter}</div>
      </div>
    </div>
  `;

  const overlay = modalRoot.querySelector('.modal-overlay');
  requestAnimationFrame(() => overlay.classList.add('open'));

  // Close handlers
  modalRoot.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', handleEsc);

  if (onSubmit) onModalSubmit(onSubmit);

  modalRoot.querySelector('.modal-body input, .modal-body select, .modal-body textarea')?.focus();
  return modalRoot.querySelector('.modal-body');
}

export function closeModal() {
  if (!modalRoot) return;
  const overlay = modalRoot.querySelector('.modal-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    closeTimer = setTimeout(() => { modalRoot.innerHTML = ''; }, 200);
  }
  document.removeEventListener('keydown', handleEsc);
}

function handleEsc(e) {
  if (e.key === 'Escape') closeModal();
}

/**
 * Bind a callback to the modal's submit button.
 * Fields marked `required` are validated first; return false from the callback to keep it open.
 */
export function onModalSubmit(callback) {
  if (!modalRoot) return;
  const btn = modalRoot.querySelector('[data-modal-submit]');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const body = modalRoot.querySelector('.modal-body');
    const invalid = [...body.querySelectorAll('[required]')].filter(el => !String(el.value).trim());
    body.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    if (invalid.length) {
      invalid.forEach(el => el.classList.add('is-invalid'));
      invalid[0].focus();
      return;
    }
    if (callback(body) !== false) closeModal();
  });
}

/** Read a field value from the open modal by id. */
export function field(id) {
  return document.getElementById(id)?.value?.trim() ?? '';
}

// --- Toasts -------------------------------------------------
let toastRoot = null;

/**
 * Show a short confirmation message.
 * @param {string} message
 * @param {'success'|'info'|'warning'|'danger'} [type]
 */
export function toast(message, type = 'success') {
  if (!toastRoot) {
    toastRoot = document.createElement('div');
    toastRoot.className = 'toast-root';
    document.body.appendChild(toastRoot);
  }
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = `${type === 'success' ? icons.check : icons.alertCircle}<span>${message}</span>`;
  toastRoot.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 250);
  }, 3000);
}
