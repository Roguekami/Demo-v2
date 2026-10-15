import{c,l as u,e as d,j as v,p as x,h as b,k as f,r as h,m as S,o as E}from"./index-CEYCdedo.js";import{o as m,f as n,t as g}from"./modal-Bs8ai2sk.js";function L(){const t=u.map(e=>`<option value="${e.name}">${e.name}</option>`).join(""),a=c.map(e=>{const s=e.feeStatus==="paid"?"badge-success":"badge-danger";return`
      <tr class="student-row clickable-row" data-id="${e.id}" data-name="${d(e.name.toLowerCase())} ${e.admissionNo.toLowerCase()}" data-class="${e.class}">
        <td class="td-name cell-title">${d(e.name)}</td>
        <td data-label="Class">${e.class}</td>
        <td data-label="Admission No">${e.admissionNo}</td>
        <td data-label="Guardian">${d(e.guardian)}</td>
        <td data-label="Phone">${d(e.guardianPhone)}</td>
        <td data-label="Fee Status"><span class="badge ${s}">${e.feeStatus==="paid"?"Paid":"Overdue"}</span></td>
      </tr>
    `}).join("");return`
    <div class="page-header">
      <h2>Student Registry</h2>
      <button class="btn btn-primary" id="btn-enroll-student">
        ${v.plus} Enroll Student
      </button>
    </div>

    <div class="table-card">
      <div class="table-header">
        <div class="table-header-left">
          <input type="text" id="search-student" class="search-input" placeholder="Search by name or admission no...">
          <select id="filter-class" class="form-select filter-select">
            <option value="all">All Classes</option>
            ${t}
          </select>
        </div>
        <div class="text-sm text-secondary" id="student-count">${c.length} students</div>
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
          ${a}
          <tr id="no-students" class="hidden responsive-empty"><td colspan="6" class="text-center text-muted">No students match your search.</td></tr>
        </tbody>
      </table>
    </div>
  `}function N(){const t=u.map(a=>`<option value="${a.name}">${a.name}</option>`).join("");m({title:"Enroll Student",submitLabel:"Enroll",content:`
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
            ${t}
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
    `,onSubmit:()=>{var l;const a=n("enroll-class"),e=u.find(o=>o.name===a),s=((l=S.find(o=>o.classId===(e==null?void 0:e.id)))==null?void 0:l.amount)??0,r=E(c),i=`LA/2024/${String(400+r).padStart(4,"0")}`;c.unshift({id:r,name:n("enroll-name"),class:a,admissionNo:i,guardian:n("enroll-guardian"),guardianPhone:n("enroll-phone"),feeStatus:"overdue",dob:n("enroll-dob"),amountDue:s,amountPaid:0}),e&&e.studentCount++,g(`${d(n("enroll-name"))} enrolled in ${a} (${i})`),h()}})}function C(t){const a=t.amountDue-t.amountPaid,e=x.filter(s=>s.studentId===t.id);m({title:d(t.name),footer:`
      <button class="btn btn-secondary" data-modal-close>Close</button>
      <button class="btn btn-primary" data-modal-submit>${v.edit} Edit details</button>
    `,content:`
      <dl class="profile-grid mb-6">
        <div><dt>Admission No</dt><dd>${t.admissionNo}</dd></div>
        <div><dt>Class</dt><dd>${t.class}</dd></div>
        <div><dt>Date of Birth</dt><dd>${t.dob?b(t.dob):"—"}</dd></div>
        <div><dt>Fee Balance</dt><dd class="${a>0?"text-danger":"text-success"}">${a>0?f(a):"Fully paid"}</dd></div>
        <div><dt>Guardian</dt><dd>${d(t.guardian)}</dd></div>
        <div><dt>Guardian Phone</dt><dd>${d(t.guardianPhone)}</dd></div>
      </dl>
      <div class="section-heading text-sm">Payment history</div>
      ${e.length?e.map(s=>`
        <div class="flex justify-between text-sm mb-2">
          <span class="text-secondary">${b(s.date)} &middot; ${s.method}</span>
          <span class="font-medium">${f(s.amount)}</span>
        </div>
      `).join(""):'<p class="text-sm text-muted">No payments recorded yet.</p>'}
    `,onSubmit:()=>{setTimeout(()=>P(t),0)}})}function P(t){const a=u.map(e=>`<option value="${e.name}" ${e.name===t.class?"selected":""}>${e.name}</option>`).join("");m({title:`Edit — ${d(t.name)}`,content:`
      <div class="form-group">
        <label class="form-label" for="edit-name">Student Name</label>
        <input type="text" class="form-input" id="edit-name" value="${d(t.name)}" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="edit-class">Class</label>
        <select class="form-select" id="edit-class">${a}</select>
      </div>
      <div class="form-group">
        <label class="form-label" for="edit-guardian">Guardian Name</label>
        <input type="text" class="form-input" id="edit-guardian" value="${d(t.guardian)}" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="edit-phone">Guardian Phone</label>
        <input type="tel" class="form-input" id="edit-phone" value="${d(t.guardianPhone)}" required>
      </div>
    `,onSubmit:()=>{t.name=n("edit-name"),t.class=n("edit-class"),t.guardian=n("edit-guardian"),t.guardianPhone=n("edit-phone"),g("Student details updated"),h()}})}function q(){const t=document.getElementById("search-student"),a=document.getElementById("filter-class"),e=document.querySelectorAll(".student-row");function s(){const r=t.value.toLowerCase().trim(),i=a.value;let l=0;e.forEach(o=>{const $=o.dataset.name.includes(r),y=i==="all"||o.dataset.class===i,p=$&&y;o.style.display=p?"":"none",p&&l++}),document.getElementById("no-students").classList.toggle("hidden",l>0),document.getElementById("student-count").textContent=`${l} student${l===1?"":"s"}`}t.addEventListener("input",s),a.addEventListener("change",s),document.getElementById("student-tbody").addEventListener("click",r=>{const i=r.target.closest(".student-row");if(!i)return;const l=c.find(o=>o.id===Number(i.dataset.id));l&&C(l)}),document.getElementById("btn-enroll-student").addEventListener("click",N)}export{q as init,N as openEnrollModal,L as render};
