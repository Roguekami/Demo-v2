import { icons } from '../../icons.js';
import { teachers, classes, subjects, escapeHtml, nextId } from '../../data/mock.js';
import { openModal, field, toast } from '../../components/modal.js';
import { rerender } from '../../router.js';

export function render() {
  const teacherRows = teachers.map(t => {
    const active = t.status === 'active';
    return `
      <tr class="teacher-row" data-name="${escapeHtml(t.name.toLowerCase())}" data-status="${t.status}" ${active ? '' : 'style="opacity:.6"'}>
        <td class="td-name cell-title">${escapeHtml(t.name)}</td>
        <td class="text-muted" data-label="Email">${escapeHtml(t.email)}</td>
        <td data-label="Phone">${escapeHtml(t.phone)}</td>
        <td data-label="Subjects">${escapeHtml((t.subjects || []).join(', '))}</td>
        <td data-label="Classes">${escapeHtml((t.classes || []).join(', '))}</td>
        <td data-label="Status"><span class="badge ${active ? 'badge-success' : 'badge-neutral'}">${active ? 'Active' : 'Inactive'}</span></td>
        <td class="cell-action">
          <button class="btn btn-sm ${active ? 'btn-ghost' : 'btn-secondary'} toggle-status" data-id="${t.id}">
            ${active ? 'Deactivate' : 'Reactivate'}
          </button>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="page-header">
      <h2>Teacher Management</h2>
      <button class="btn btn-primary" id="btn-add-teacher">
        ${icons.plus} Add Teacher
      </button>
    </div>

    <div class="table-card">
      <div class="table-header">
        <div class="table-header-left">
          <input type="text" id="search-teacher" class="search-input" placeholder="Search by name...">
          <select id="filter-status" class="form-select filter-select">
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div class="text-xs text-muted">Inactive teachers are kept so historical records stay intact.</div>
      </div>
      <table class="responsive-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subjects</th>
            <th>Classes</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="teacher-tbody">
          ${teacherRows}
        </tbody>
      </table>
    </div>
  `;
}

function checkboxList(name, items) {
  return `<div class="grid grid-cols-2 gap-2">${items.map(item => `
    <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="${name}" value="${item}"> ${item}</label>
  `).join('')}</div>`;
}

export function init() {
  const searchInput = document.getElementById('search-teacher');
  const statusSelect = document.getElementById('filter-status');
  const rows = document.querySelectorAll('.teacher-row');

  function filterTable() {
    const searchVal = searchInput.value.toLowerCase();
    const statusVal = statusSelect.value;
    rows.forEach(row => {
      const show = row.dataset.name.includes(searchVal) && (statusVal === 'all' || row.dataset.status === statusVal);
      row.style.display = show ? '' : 'none';
    });
  }
  searchInput.addEventListener('input', filterTable);
  statusSelect.addEventListener('change', filterTable);

  document.querySelectorAll('.toggle-status').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = teachers.find(t => t.id === Number(btn.dataset.id));
      if (!t) return;
      t.status = t.status === 'active' ? 'inactive' : 'active';
      toast(`${escapeHtml(t.name)} ${t.status === 'active' ? 'reactivated' : 'deactivated'}`, t.status === 'active' ? 'success' : 'info');
      rerender();
    });
  });

  document.getElementById('btn-add-teacher').addEventListener('click', () => {
    openModal({
      title: 'Add Teacher',
      submitLabel: 'Add teacher',
      content: `
        <div class="form-group">
          <label class="form-label" for="t-name">Name</label>
          <input type="text" class="form-input" id="t-name" placeholder="e.g. Mrs. Kemi Lawal" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="t-email">Email</label>
            <input type="email" class="form-input" id="t-email" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="t-phone">Phone</label>
            <input type="tel" class="form-input" id="t-phone" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Subjects</label>
          ${checkboxList('t-subjects', subjects.map(s => s.name))}
        </div>
        <div class="form-group">
          <label class="form-label">Classes</label>
          ${checkboxList('t-classes', classes.map(c => c.name))}
        </div>
      `,
      onSubmit: () => {
        const checked = name => [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(i => i.value);
        teachers.unshift({
          id: nextId(teachers),
          name: field('t-name'),
          email: field('t-email'),
          phone: field('t-phone'),
          subjects: checked('t-subjects'),
          classes: checked('t-classes'),
          status: 'active',
        });
        toast(`${escapeHtml(field('t-name'))} added — login details sent by email`);
        rerender();
      },
    });
  });
}
