import { icons } from '../../icons.js';
import { resources, formatDate, escapeHtml, nextId, todayISO } from '../../data/mock.js';
import { toast } from '../../components/modal.js';
import { rerender, getUser } from '../../router.js';

const CLASSES = ['SS1', 'SS2'];
const SUBJECTS = ['Mathematics', 'Further Mathematics'];
const view = { class: 'SS2', subject: 'Mathematics' };

function fileType(name) {
  const ext = name.split('.').pop().toLowerCase();
  if (ext === 'pdf') return 'PDF';
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'Image';
  return 'Document';
}

export function fileIcon(type) {
  return type === 'Image' ? icons.image : type === 'PDF' ? icons.fileText : icons.file;
}

export function render() {
  const list = resources.filter(r => r.class === view.class && r.subject === view.subject);

  const filesHtml = list.map(r => `
    <div class="file-item">
      <div class="file-icon">${fileIcon(r.type)}</div>
      <div class="file-info">
        <div class="file-name">${escapeHtml(r.title)}</div>
        <div class="file-meta">${r.type} &middot; Shared ${formatDate(r.uploadDate)}</div>
      </div>
      <button class="btn btn-sm btn-ghost text-danger delete-res" data-id="${r.id}" title="Delete">${icons.trash}</button>
    </div>
  `).join('');

  return `
    <div class="page-header">
      <h2>Resources</h2>
    </div>

    <div class="filter-bar">
      <select class="filter-select" id="rs-class">
        ${CLASSES.map(c => `<option ${c === view.class ? 'selected' : ''}>${c}</option>`).join('')}
      </select>
      <select class="filter-select" id="rs-subject">
        ${SUBJECTS.map(s => `<option ${s === view.subject ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
    </div>

    <label class="upload-area mb-6 block" id="upload-area">
      <input type="file" id="file-input" class="hidden" multiple accept=".pdf,.doc,.docx,.ppt,.pptx,image/*">
      ${icons.upload}
      <p class="font-medium">Drag & drop files here, or click to browse</p>
      <span>PDF, images, or documents — shared with ${view.class} ${view.subject} students</span>
    </label>

    <div class="card p-0">
      <div class="p-5 border-b"><h3 class="section-heading m-0">Shared with ${view.class} &middot; ${view.subject} (${list.length})</h3></div>
      ${filesHtml || '<div class="empty-state"><p>Nothing shared yet for this class and subject.</p></div>'}
    </div>
  `;
}

function addFiles(files) {
  if (!files.length) return;
  [...files].forEach(f => {
    resources.unshift({
      id: nextId(resources),
      title: f.name.replace(/\.[^.]+$/, ''),
      subject: view.subject,
      class: view.class,
      type: fileType(f.name),
      uploadDate: todayISO(),
      teacher: getUser()?.name,
    });
  });
  toast(`${files.length} file${files.length === 1 ? '' : 's'} shared with ${view.class} ${view.subject}`);
  rerender();
}

export function init() {
  document.getElementById('rs-class').addEventListener('change', e => { view.class = e.target.value; rerender(); });
  document.getElementById('rs-subject').addEventListener('change', e => { view.subject = e.target.value; rerender(); });

  const area = document.getElementById('upload-area');
  document.getElementById('file-input').addEventListener('change', e => addFiles(e.target.files));
  area.addEventListener('dragover', e => { e.preventDefault(); area.classList.add('dragover'); });
  area.addEventListener('dragleave', () => area.classList.remove('dragover'));
  area.addEventListener('drop', e => {
    e.preventDefault();
    area.classList.remove('dragover');
    addFiles(e.dataTransfer.files);
  });

  document.querySelectorAll('.delete-res').forEach(btn => btn.addEventListener('click', () => {
    const idx = resources.findIndex(r => r.id === Number(btn.dataset.id));
    if (idx > -1) resources.splice(idx, 1);
    toast('Resource removed', 'info');
    rerender();
  }));
}
