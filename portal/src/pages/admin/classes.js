import { icons } from '../../icons.js';
import { classes, subjects, teachers, classSubjects, escapeHtml, nextId } from '../../data/mock.js';
import { openModal, field, toast } from '../../components/modal.js';
import { rerender } from '../../router.js';

let selectedClassId = classes[0]?.id;

export function render() {
  if (!classes.some(c => c.id === selectedClassId)) selectedClassId = classes[0]?.id;

  const classList = classes.map(c => `
    <div class="panel-item ${c.id === selectedClassId ? 'active' : ''}" data-class-id="${c.id}">
      <div>${escapeHtml(c.name)}</div>
      <div class="panel-item-count">${c.studentCount} students</div>
    </div>
  `).join('');

  return `
    <div class="page-header">
      <h2>Classes & Subjects</h2>
    </div>

    <div class="two-panel">
      <div class="panel">
        <div class="panel-header">
          <h3>Classes</h3>
          <button class="btn btn-sm btn-primary" id="btn-add-class">${icons.plus} Add Class</button>
        </div>
        <div class="panel-body" id="class-list">
          ${classList}
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">
          <h3 id="subject-heading">Subjects</h3>
          <button class="btn btn-sm btn-primary" id="btn-add-subject">${icons.plus} Add Subject</button>
        </div>
        <div class="panel-body" id="subject-list"></div>
      </div>
    </div>
  `;
}

function renderSubjectsForClass(classId) {
  const classSubs = classSubjects.filter(cs => cs.classId === classId);
  const activeTeachers = teachers.filter(t => t.status === 'active');

  if (classSubs.length === 0) {
    return `<div class="empty-state"><p>No subjects assigned to this class yet.</p></div>`;
  }

  return classSubs.map(cs => {
    const subject = subjects.find(s => s.id === cs.subjectId);
    const unassigned = !cs.teacherId || !activeTeachers.some(t => t.id === cs.teacherId);
    return `
      <div class="panel-item" style="cursor:default">
        <div>
          <div class="font-medium">${escapeHtml(subject ? subject.name : 'Unknown Subject')}</div>
          ${unassigned ? '<div class="text-xs text-danger">No active teacher assigned</div>' : ''}
        </div>
        <select class="form-select form-select-sm assign-teacher" data-subject-id="${cs.subjectId}">
          <option value="">Assign teacher…</option>
          ${activeTeachers.map(t => `<option value="${t.id}" ${t.id === cs.teacherId ? 'selected' : ''}>${escapeHtml(t.name)}</option>`).join('')}
        </select>
      </div>
    `;
  }).join('');
}

function showSubjects() {
  const cls = classes.find(c => c.id === selectedClassId);
  document.getElementById('subject-heading').textContent = cls ? `Subjects — ${cls.name}` : 'Subjects';
  document.getElementById('subject-list').innerHTML = renderSubjectsForClass(selectedClassId);
}

export function init() {
  const classList = document.getElementById('class-list');
  const subjectList = document.getElementById('subject-list');
  showSubjects();

  classList.addEventListener('click', (e) => {
    const item = e.target.closest('.panel-item');
    if (!item) return;
    classList.querySelectorAll('.panel-item').forEach(el => el.classList.remove('active'));
    item.classList.add('active');
    selectedClassId = Number(item.dataset.classId);
    showSubjects();
  });

  subjectList.addEventListener('change', (e) => {
    const select = e.target.closest('.assign-teacher');
    if (!select) return;
    const cs = classSubjects.find(x => x.classId === selectedClassId && x.subjectId === Number(select.dataset.subjectId));
    if (!cs) return;
    cs.teacherId = select.value ? Number(select.value) : null;
    const teacher = teachers.find(t => t.id === cs.teacherId);
    const subject = subjects.find(s => s.id === cs.subjectId);
    toast(teacher ? `${escapeHtml(teacher.name)} now teaches ${subject.name}` : `${subject.name} unassigned`, teacher ? 'success' : 'info');
    showSubjects();
  });

  document.getElementById('btn-add-class').addEventListener('click', () => {
    openModal({
      title: 'Add Class',
      submitLabel: 'Add class',
      content: `
        <div class="form-group">
          <label class="form-label" for="class-name">Class name</label>
          <input type="text" class="form-input" id="class-name" placeholder="e.g. JSS1B" required>
        </div>
      `,
      onSubmit: () => {
        const id = nextId(classes);
        classes.push({ id, name: field('class-name'), level: 'junior', studentCount: 0 });
        selectedClassId = id;
        toast(`Class ${escapeHtml(field('class-name'))} added`);
        rerender();
      },
    });
  });

  document.getElementById('btn-add-subject').addEventListener('click', () => {
    const cls = classes.find(c => c.id === selectedClassId);
    const taken = classSubjects.filter(cs => cs.classId === selectedClassId).map(cs => cs.subjectId);
    const available = subjects.filter(s => !taken.includes(s.id));

    openModal({
      title: `Add Subject to ${escapeHtml(cls?.name ?? '')}`,
      submitLabel: 'Add subject',
      content: `
        <div class="form-group">
          <label class="form-label" for="subject-pick">Subject</label>
          <select class="form-select" id="subject-pick">
            ${available.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
            <option value="new">+ New subject…</option>
          </select>
        </div>
        <div class="form-group hidden" id="new-subject-group">
          <label class="form-label" for="subject-new">New subject name</label>
          <input type="text" class="form-input" id="subject-new" placeholder="e.g. French">
        </div>
        <div class="form-group">
          <label class="form-label" for="subject-teacher">Teacher</label>
          <select class="form-select" id="subject-teacher">
            <option value="">Assign later</option>
            ${teachers.filter(t => t.status === 'active').map(t => `<option value="${t.id}">${escapeHtml(t.name)}</option>`).join('')}
          </select>
        </div>
      `,
      onSubmit: () => {
        let subjectId = field('subject-pick');
        if (subjectId === 'new') {
          const name = field('subject-new');
          if (!name) { document.getElementById('subject-new').classList.add('is-invalid'); return false; }
          subjectId = nextId(subjects);
          subjects.push({ id: subjectId, name });
        }
        classSubjects.push({ classId: selectedClassId, subjectId: Number(subjectId), teacherId: field('subject-teacher') ? Number(field('subject-teacher')) : null });
        toast('Subject added');
        rerender();
      },
    });

    const pick = document.getElementById('subject-pick');
    const toggleNew = () => document.getElementById('new-subject-group').classList.toggle('hidden', pick.value !== 'new');
    pick.addEventListener('change', toggleNew);
    toggleNew();
  });
}
