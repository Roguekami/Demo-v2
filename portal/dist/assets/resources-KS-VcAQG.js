import{j as i,r as c,J as d,e as o,h as u,z as p,v as m,o as f}from"./index-DNKaiGY_.js";import{t as n}from"./modal-Dzxcghj1.js";const v=["SS1","SS2"],h=["Mathematics","Further Mathematics"],a={class:"SS2",subject:"Mathematics"};function g(s){const e=s.split(".").pop().toLowerCase();return e==="pdf"?"PDF":["png","jpg","jpeg","gif","webp"].includes(e)?"Image":"Document"}function b(s){return s==="Image"?i.image:s==="PDF"?i.fileText:i.file}function E(){const s=d.filter(t=>t.class===a.class&&t.subject===a.subject),e=s.map(t=>`
    <div class="file-item">
      <div class="file-icon">${b(t.type)}</div>
      <div class="file-info">
        <div class="file-name">${o(t.title)}</div>
        <div class="file-meta">${t.type} &middot; Shared ${u(t.uploadDate)}</div>
      </div>
      <button class="btn btn-sm btn-ghost text-danger delete-res" data-id="${t.id}" title="Delete">${i.trash}</button>
    </div>
  `).join("");return`
    <div class="page-header">
      <h2>Resources</h2>
    </div>

    <div class="filter-bar">
      <select class="filter-select" id="rs-class">
        ${v.map(t=>`<option ${t===a.class?"selected":""}>${t}</option>`).join("")}
      </select>
      <select class="filter-select" id="rs-subject">
        ${h.map(t=>`<option ${t===a.subject?"selected":""}>${t}</option>`).join("")}
      </select>
    </div>

    <label class="upload-area mb-6 block" id="upload-area">
      <input type="file" id="file-input" class="hidden" multiple accept=".pdf,.doc,.docx,.ppt,.pptx,image/*">
      ${i.upload}
      <p class="font-medium">Drag & drop files here, or click to browse</p>
      <span>PDF, images, or documents — shared with ${a.class} ${a.subject} students</span>
    </label>

    <div class="card p-0">
      <div class="p-5 border-b"><h3 class="section-heading m-0">Shared with ${a.class} &middot; ${a.subject} (${s.length})</h3></div>
      ${e||'<div class="empty-state"><p>Nothing shared yet for this class and subject.</p></div>'}
    </div>
  `}function l(s){s.length&&([...s].forEach(e=>{var t;d.unshift({id:f(d),title:e.name.replace(/\.[^.]+$/,""),subject:a.subject,class:a.class,type:g(e.name),uploadDate:m(),teacher:(t=p())==null?void 0:t.name})}),n(`${s.length} file${s.length===1?"":"s"} shared with ${a.class} ${a.subject}`),c())}function S(){document.getElementById("rs-class").addEventListener("change",e=>{a.class=e.target.value,c()}),document.getElementById("rs-subject").addEventListener("change",e=>{a.subject=e.target.value,c()});const s=document.getElementById("upload-area");document.getElementById("file-input").addEventListener("change",e=>l(e.target.files)),s.addEventListener("dragover",e=>{e.preventDefault(),s.classList.add("dragover")}),s.addEventListener("dragleave",()=>s.classList.remove("dragover")),s.addEventListener("drop",e=>{e.preventDefault(),s.classList.remove("dragover"),l(e.dataTransfer.files)}),document.querySelectorAll(".delete-res").forEach(e=>e.addEventListener("click",()=>{const t=d.findIndex(r=>r.id===Number(e.dataset.id));t>-1&&d.splice(t,1),n("Resource removed","info"),c()}))}export{b as fileIcon,S as init,E as render};
