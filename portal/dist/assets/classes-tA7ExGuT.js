import{u as m,t as j,q as b,e as u,l as o,j as h,o as g,r as I}from"./index-CEYCdedo.js";import{t as p,o as $,f as r}from"./modal-Bs8ai2sk.js";var y;let n=(y=o[0])==null?void 0:y.id;function L(){var i;o.some(s=>s.id===n)||(n=(i=o[0])==null?void 0:i.id);const d=o.map(s=>`
    <div class="panel-item ${s.id===n?"active":""}" data-class-id="${s.id}">
      <div>${u(s.name)}</div>
      <div class="panel-item-count">${s.studentCount} students</div>
    </div>
  `).join("");return`
    <div class="page-header">
      <h2>Classes & Subjects</h2>
    </div>

    <div class="two-panel">
      <div class="panel">
        <div class="panel-header">
          <h3>Classes</h3>
          <button class="btn btn-sm btn-primary" id="btn-add-class">${h.plus} Add Class</button>
        </div>
        <div class="panel-body" id="class-list">
          ${d}
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">
          <h3 id="subject-heading">Subjects</h3>
          <button class="btn btn-sm btn-primary" id="btn-add-subject">${h.plus} Add Subject</button>
        </div>
        <div class="panel-body" id="subject-list"></div>
      </div>
    </div>
  `}function S(d){const i=m.filter(t=>t.classId===d),s=j.filter(t=>t.status==="active");return i.length===0?'<div class="empty-state"><p>No subjects assigned to this class yet.</p></div>':i.map(t=>{const c=b.find(a=>a.id===t.subjectId),l=!t.teacherId||!s.some(a=>a.id===t.teacherId);return`
      <div class="panel-item" style="cursor:default">
        <div>
          <div class="font-medium">${u(c?c.name:"Unknown Subject")}</div>
          ${l?'<div class="text-xs text-danger">No active teacher assigned</div>':""}
        </div>
        <select class="form-select form-select-sm assign-teacher" data-subject-id="${t.subjectId}">
          <option value="">Assign teacher…</option>
          ${s.map(a=>`<option value="${a.id}" ${a.id===t.teacherId?"selected":""}>${u(a.name)}</option>`).join("")}
        </select>
      </div>
    `}).join("")}function v(){const d=o.find(i=>i.id===n);document.getElementById("subject-heading").textContent=d?`Subjects — ${d.name}`:"Subjects",document.getElementById("subject-list").innerHTML=S(n)}function C(){const d=document.getElementById("class-list"),i=document.getElementById("subject-list");v(),d.addEventListener("click",s=>{const t=s.target.closest(".panel-item");t&&(d.querySelectorAll(".panel-item").forEach(c=>c.classList.remove("active")),t.classList.add("active"),n=Number(t.dataset.classId),v())}),i.addEventListener("change",s=>{const t=s.target.closest(".assign-teacher");if(!t)return;const c=m.find(e=>e.classId===n&&e.subjectId===Number(t.dataset.subjectId));if(!c)return;c.teacherId=t.value?Number(t.value):null;const l=j.find(e=>e.id===c.teacherId),a=b.find(e=>e.id===c.subjectId);p(l?`${u(l.name)} now teaches ${a.name}`:`${a.name} unassigned`,l?"success":"info"),v()}),document.getElementById("btn-add-class").addEventListener("click",()=>{$({title:"Add Class",submitLabel:"Add class",content:`
        <div class="form-group">
          <label class="form-label" for="class-name">Class name</label>
          <input type="text" class="form-input" id="class-name" placeholder="e.g. JSS1B" required>
        </div>
      `,onSubmit:()=>{const s=g(o);o.push({id:s,name:r("class-name"),level:"junior",studentCount:0}),n=s,p(`Class ${u(r("class-name"))} added`),I()}})}),document.getElementById("btn-add-subject").addEventListener("click",()=>{const s=o.find(e=>e.id===n),t=m.filter(e=>e.classId===n).map(e=>e.subjectId),c=b.filter(e=>!t.includes(e.id));$({title:`Add Subject to ${u((s==null?void 0:s.name)??"")}`,submitLabel:"Add subject",content:`
        <div class="form-group">
          <label class="form-label" for="subject-pick">Subject</label>
          <select class="form-select" id="subject-pick">
            ${c.map(e=>`<option value="${e.id}">${e.name}</option>`).join("")}
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
            ${j.filter(e=>e.status==="active").map(e=>`<option value="${e.id}">${u(e.name)}</option>`).join("")}
          </select>
        </div>
      `,onSubmit:()=>{let e=r("subject-pick");if(e==="new"){const f=r("subject-new");if(!f)return document.getElementById("subject-new").classList.add("is-invalid"),!1;e=g(b),b.push({id:e,name:f})}m.push({classId:n,subjectId:Number(e),teacherId:r("subject-teacher")?Number(r("subject-teacher")):null}),p("Subject added"),I()}});const l=document.getElementById("subject-pick"),a=()=>document.getElementById("new-subject-group").classList.toggle("hidden",l.value!=="new");l.addEventListener("change",a),a()})}export{C as init,L as render};
