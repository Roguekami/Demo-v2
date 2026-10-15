import{t as n,e as l,r,q as h,l as p,j as v,o as f}from"./index-CEYCdedo.js";import{t as u,o as g,f as d}from"./modal-Bs8ai2sk.js";function j(){const i=n.map(e=>{const s=e.status==="active";return`
      <tr class="teacher-row" data-name="${l(e.name.toLowerCase())}" data-status="${e.status}" ${s?"":'style="opacity:.6"'}>
        <td class="td-name cell-title">${l(e.name)}</td>
        <td class="text-muted" data-label="Email">${l(e.email)}</td>
        <td data-label="Phone">${l(e.phone)}</td>
        <td data-label="Subjects">${l((e.subjects||[]).join(", "))}</td>
        <td data-label="Classes">${l((e.classes||[]).join(", "))}</td>
        <td data-label="Status"><span class="badge ${s?"badge-success":"badge-neutral"}">${s?"Active":"Inactive"}</span></td>
        <td class="cell-action">
          <button class="btn btn-sm ${s?"btn-ghost":"btn-secondary"} toggle-status" data-id="${e.id}">
            ${s?"Deactivate":"Reactivate"}
          </button>
        </td>
      </tr>
    `}).join("");return`
    <div class="page-header">
      <h2>Teacher Management</h2>
      <button class="btn btn-primary" id="btn-add-teacher">
        ${v.plus} Add Teacher
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
          ${i}
        </tbody>
      </table>
    </div>
  `}function m(i,e){return`<div class="grid grid-cols-2 gap-2">${e.map(s=>`
    <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="${i}" value="${s}"> ${s}</label>
  `).join("")}</div>`}function x(){const i=document.getElementById("search-teacher"),e=document.getElementById("filter-status"),s=document.querySelectorAll(".teacher-row");function o(){const t=i.value.toLowerCase(),a=e.value;s.forEach(c=>{const b=c.dataset.name.includes(t)&&(a==="all"||c.dataset.status===a);c.style.display=b?"":"none"})}i.addEventListener("input",o),e.addEventListener("change",o),document.querySelectorAll(".toggle-status").forEach(t=>{t.addEventListener("click",()=>{const a=n.find(c=>c.id===Number(t.dataset.id));a&&(a.status=a.status==="active"?"inactive":"active",u(`${l(a.name)} ${a.status==="active"?"reactivated":"deactivated"}`,a.status==="active"?"success":"info"),r())})}),document.getElementById("btn-add-teacher").addEventListener("click",()=>{g({title:"Add Teacher",submitLabel:"Add teacher",content:`
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
          ${m("t-subjects",h.map(t=>t.name))}
        </div>
        <div class="form-group">
          <label class="form-label">Classes</label>
          ${m("t-classes",p.map(t=>t.name))}
        </div>
      `,onSubmit:()=>{const t=a=>[...document.querySelectorAll(`input[name="${a}"]:checked`)].map(c=>c.value);n.unshift({id:f(n),name:d("t-name"),email:d("t-email"),phone:d("t-phone"),subjects:t("t-subjects"),classes:t("t-classes"),status:"active"}),u(`${l(d("t-name"))} added — login details sent by email`),r()}})})}export{x as init,j as render};
