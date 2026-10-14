import{F as c,z as l,J as r,j as o,e as d,h as v}from"./index-DNKaiGY_.js";import{t as m}from"./modal-Dzxcghj1.js";import{fileIcon as f}from"./resources-KS-VcAQG.js";function h(){const s=c(l().studentId),n=r.filter(t=>t.class===s.class),a={};return n.forEach(t=>{var i;(a[i=t.subject]??(a[i]=[])).push(t)}),`
    <div class="page-header">
      <h2>Learning Resources</h2>
      <span class="text-sm text-secondary">Shared with ${s.class}</span>
    </div>

    ${Object.entries(a).map(([t,i])=>`
      <div class="mb-6">
        <div class="section-heading">${d(t)}</div>
        <div class="card p-0">
          ${i.map(e=>`
            <div class="file-item">
              <div class="file-icon">${f(e.type)}</div>
              <div class="file-info">
                <div class="file-name">${d(e.title)}</div>
                <div class="file-meta">${e.type} &middot; ${d(e.teacher??"")} &middot; ${v(e.uploadDate)}</div>
              </div>
              <button class="btn btn-sm btn-secondary download-btn" data-title="${d(e.title)}">${o.download} Open</button>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("")||`
      <div class="card empty-state">
        ${o.folder}
        <p>No resources shared yet for your class.</p>
      </div>
    `}
  `}function b(){document.querySelectorAll(".download-btn").forEach(s=>s.addEventListener("click",()=>{m(`Downloading “${s.dataset.title}”…`,"info")}))}export{b as init,h as render};
