import { icons } from '../../icons.js';
import { students, classes, feeSettings, payments, formatCurrency, formatDate, escapeHtml, nextId } from '../../data/mock.js';
import { openModal, field, toast } from '../../components/modal.js';
import { rerender } from '../../router.js';

export function render() {
  const classOptions = classes.map(c => `<option value="${c.name}">${c.name}</option>`).join('');

  const studentRows = students.map(s => {
    const badgeClass = s.feeStatus === 'paid' ? 'badge-success' : 'badge-danger';
    return `
      <tr class="student-row clickable-row" data-id="${s.id}" data-name="${escapeHtml(s.name.toLowerCase())} ${s.admissionNo.toLowerCase()}" data-class="${s.class}">
        <td class="td-name cell-title">${escapeHtml(s.name)}</td>
        <td data-label="Class">${s.class}</td>
        <td data-label="Admission No">${s.admissionNo}</td>
        <td data-label="Guardian">${escapeHtml(s.guardian)}</td>
        <td data-label="Phone">${escapeHtml(s.guardianPhone)}</td>
        <td data-label="Fee Status"><span class="badge ${badgeClass}">${s.feeStatus === 'paid' ? 'Paid' : 'Overdue'}</span></td>
      </tr>
    `;
  }).join('');

  return `
    <div class="page-header">
      <h2>Student Registry</h2>
      <button class="btn btn-primary" id="btn-enroll-student">
        ${icons.plus} Enroll Student
      </button>
    </div>

    <div class="table-card">
      <div class="table-header">
        <div class="table-header-left">
          <input type="text" id="search-student" class="search-input" placeholder="Search by name or admission no...">
          <select id="filter-class" class="form-select filter-select">
            <option value="all">All Classes</option>
            ${classOptions}
          </select>
        </div>
        <div class="text-sm text-secondary" id="student-count">${students.length} students</div>
      </div>
      <table class="responsive-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Admission No</th>
            <th>Guardian</th>
            <th>Phone</th>
            <th>Fee Status</th>
          </tr>
        </thead>
        <tbody id="student-tbody">
          ${studentRows}
          <tr id="no-students" class="hidden responsive-empty"><td colspan="6" class="text-center text-muted">No students match your search.</td></tr>
        </tbody>
      </table>
    </div>
  `;
}

export function openEnrollModal() {
  const classOptions = classes.map(c => `<option value="${c.name}">${c.name}</option>`).join('');

  openModal({
    title: 'Enroll Student',
    submitLabel: 'Enroll',
    content: `
      <div class="form-group">
        <label class="form-label" for="enroll-name">Student Name</label>
        <input type="text" class="form-input" id="enroll-name" placeholder="e.g. Ifeoma Okeke" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="enroll-dob">Date of Birth</label>
          <input type="date" class="form-input" id="enroll-dob" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="enroll-class">Class</label>
          <select class="form-select" id="enroll-class" required>
            ${classOptions}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="enroll-guardian">Guardian Name</label>
        <input type="text" class="form-input" id="enroll-guardian" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="enroll-phone">Guardian Phone</label>
        <input type="tel" class="form-input" id="enroll-phone" placeholder="0803 000 0000" required>
      </div>
    `,
    onSubmit: () => {
      const className = field('enroll-class');
      const cls = classes.find(c => c.name === className);
      const fee = feeSettings.find(f => f.classId === cls?.id)?.amount ?? 0;
      const id = nextId(students);
      const admissionNo = `LA/2024/${String(400 + id).padStart(4, '0')}`;

      students.unshift({
        id,
        name: field('enroll-name'),
        class: className,
        admissionNo,
        guardian: field('enroll-guardian'),
        guardianPhone: field('enroll-phone'),
        feeStatus: 'overdue',
        dob: field('enroll-dob'),
        amountDue: fee,
        amountPaid: 0,
      });
      if (cls) cls.studentCount++;

      toast(`${escapeHtml(field('enroll-name'))} enrolled in ${className} (${admissionNo})`);
      rerender();
    },
  });
}

function openProfile(student) {
  const balance = student.amountDue - student.amountPaid;
  const history = payments.filter(p => p.studentId === student.id);

  openModal({
    title: escapeHtml(student.name),
    footer: `
      <button class="btn btn-secondary" data-modal-close>Close</button>
      <button class="btn btn-primary" data-modal-submit>${icons.edit} Edit details</button>
    `,
    content: `
      <dl class="profile-grid mb-6">
        <div><dt>Admission No</dt><dd>${student.admissionNo}</dd></div>
        <div><dt>Class</dt><dd>${student.class}</dd></div>
        <div><dt>Date of Birth</dt><dd>${student.dob ? formatDate(student.dob) : '—'}</dd></div>
        <div><dt>Fee Balance</dt><dd class="${balance > 0 ? 'text-danger' : 'text-success'}">${balance > 0 ? formatCurrency(balance) : 'Fully paid'}</dd></div>
        <div><dt>Guardian</dt><dd>${escapeHtml(student.guardian)}</dd></div>
        <div><dt>Guardian Phone</dt><dd>${escapeHtml(student.guardianPhone)}</dd></div>
      </dl>
      <div class="section-heading text-sm">Payment history</div>
      ${history.length ? history.map(p => `
        <div class="flex justify-between text-sm mb-2">
          <span class="text-secondary">${formatDate(p.date)} &middot; ${p.method}</span>
          <span class="font-medium">${formatCurrency(p.amount)}</span>
        </div>
      `).join('') : '<p class="text-sm text-muted">No payments recorded yet.</p>'}
    `,
    onSubmit: () => {
      setTimeout(() => openEditModal(student), 0);
    },
  });
}

function openEditModal(student) {
  const classOptions = classes.map(c => `<option value="${c.name}" ${c.name === student.class ? 'selected' : ''}>${c.name}</option>`).join('');
  openModal({
    title: `Edit — ${escapeHtml(student.name)}`,
    content: `
      <div class="form-group">
        <label class="form-label" for="edit-name">Student Name</label>
        <input type="text" class="form-input" id="edit-name" value="${escapeHtml(student.name)}" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="edit-class">Class</label>
        <select class="form-select" id="edit-class">${classOptions}</select>
      </div>
      <div class="form-group">
        <label class="form-label" for="edit-guardian">Guardian Name</label>
        <input type="text" class="form-input" id="edit-guardian" value="${escapeHtml(student.guardian)}" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="edit-phone">Guardian Phone</label>
        <input type="tel" class="form-input" id="edit-phone" value="${escapeHtml(student.guardianPhone)}" required>
      </div>
    `,
    onSubmit: () => {
      student.name = field('edit-name');
      student.class = field('edit-class');
      student.guardian = field('edit-guardian');
      student.guardianPhone = field('edit-phone');
      toast('Student details updated');
      rerender();
    },
  });
}

export function init() {
  const searchInput = document.getElementById('search-student');
  const classSelect = document.getElementById('filter-class');
  const rows = document.querySelectorAll('.student-row');

  function filterTable() {
    const searchVal = searchInput.value.toLowerCase().trim();
    const classVal = classSelect.value;
    let visible = 0;

    rows.forEach(row => {
      const matchName = row.dataset.name.includes(searchVal);
      const matchClass = classVal === 'all' || row.dataset.class === classVal;
      const show = matchName && matchClass;
      row.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    document.getElementById('no-students').classList.toggle('hidden', visible > 0);
    document.getElementById('student-count').textContent = `${visible} student${visible === 1 ? '' : 's'}`;
  }

  searchInput.addEventListener('input', filterTable);
  classSelect.addEventListener('change', filterTable);

  document.getElementById('student-tbody').addEventListener('click', (e) => {
    const row = e.target.closest('.student-row');
    if (!row) return;
    const student = students.find(s => s.id === Number(row.dataset.id));
    if (student) openProfile(student);
  });

  document.getElementById('btn-enroll-student').addEventListener('click', openEnrollModal);
}
