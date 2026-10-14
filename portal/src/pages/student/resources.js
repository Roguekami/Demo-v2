import { icons } from '../../icons.js';
import { resources, formatDate, escapeHtml, getStudent } from '../../data/mock.js';
import { toast } from '../../components/modal.js';
import { getUser } from '../../router.js';
import { fileIcon } from '../teacher/resources.js';

export function render() {
  const student = getStudent(getUser().studentId);
  const available = resources.filter(r => r.class === student.class);

  const grouped = {};
  available.forEach(r => { (grouped[r.subject] ??= []).push(r); });

  return `
    <div class="page-header">
      <h2>Learning Resources</h2>
      <span class="text-sm text-secondary">Shared with ${student.class}</span>
    </div>

    ${Object.entries(grouped).map(([subject, list]) => `
      <div class="mb-6">
        <div class="section-heading">${escapeHtml(subject)}</div>
        <div class="card p-0">
          ${list.map(r => `
            <div class="file-item">
              <div class="file-icon">${fileIcon(r.type)}</div>
              <div class="file-info">
                <div class="file-name">${escapeHtml(r.title)}</div>
                <div class="file-meta">${r.type} &middot; ${escapeHtml(r.teacher ?? '')} &middot; ${formatDate(r.uploadDate)}</div>
              </div>
              <button class="btn btn-sm btn-secondary download-btn" data-title="${escapeHtml(r.title)}">${icons.download} Open</button>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('') || `
      <div class="card empty-state">
        ${icons.folder}
        <p>No resources shared yet for your class.</p>
      </div>
    `}
  `;
}

export function init() {
  document.querySelectorAll('.download-btn').forEach(btn => btn.addEventListener('click', () => {
    toast(`Downloading “${btn.dataset.title}”…`, 'info');
  }));
}
