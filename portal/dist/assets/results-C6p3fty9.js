import{r as p,D as b,c as h,E as f,e as v,j as S}from"./index-DNKaiGY_.js";import{t as m}from"./modal-Dzxcghj1.js";const o="2024/2025 — Term 1",$=["SS1","SS2"],j=["Mathematics","Further Mathematics"],s={class:"SS2",subject:"Mathematics"};function g(){const t=h.filter(e=>e.class===s.class),d=f[s.subject]||{};let n=0;const c=t.map((e,i)=>{const a=b.find(u=>u.studentId===e.id&&u.subject===s.subject&&u.term===o),r=d[e.id],l=(a==null?void 0:a.score)??r??"";return!a&&r!==void 0&&n++,`
      <tr data-student-id="${e.id}">
        <td class="text-muted cell-hide-mobile">${i+1}</td>
        <td class="td-name cell-title">${v(e.name)}</td>
        <td data-label="CBT Score">${r!==void 0?`<span class="badge badge-info">${r}%</span>`:'<span class="text-muted">—</span>'}</td>
        <td data-label="Final Score"><input type="number" class="score-input" min="0" max="100" value="${l}" placeholder="—" /></td>
        <td data-label="Remark"><input type="text" class="remark-input" value="${v((a==null?void 0:a.remark)??"")}" placeholder="e.g. Excellent" /></td>
      </tr>
    `}).join("");return`
    <div class="page-header">
      <h2>Results Entry</h2>
      <span class="text-sm text-secondary">${o}</span>
    </div>

    <div class="filter-bar">
      <select class="filter-select" id="res-class">
        ${$.map(e=>`<option ${e===s.class?"selected":""}>${e}</option>`).join("")}
      </select>
      <select class="filter-select" id="res-subject">
        ${j.map(e=>`<option ${e===s.subject?"selected":""}>${e}</option>`).join("")}
      </select>
      ${n?`<span class="text-xs text-muted">${n} score${n===1?"":"s"} pre-filled from the CBT exam</span>`:""}
    </div>

    <div class="table-card">
      <table class="responsive-table">
        <thead>
          <tr>
            <th style="width:50px">#</th>
            <th>Student Name</th>
            <th>CBT Score</th>
            <th>Final Score (/100)</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          ${c||'<tr class="responsive-empty"><td colspan="5" class="text-center text-muted">No students in this class.</td></tr>'}
        </tbody>
      </table>
      <div class="flex items-center justify-between p-4 border-t" style="flex-wrap:wrap;gap:12px">
        <div class="text-xs text-muted">Parents get an SMS when results are saved.</div>
        <button class="btn btn-primary" id="btn-save-results" ${t.length?"":"disabled"}>${S.save} Save Results</button>
      </div>
    </div>
  `}function E(){document.getElementById("res-class").addEventListener("change",t=>{s.class=t.target.value,p()}),document.getElementById("res-subject").addEventListener("change",t=>{s.subject=t.target.value,p()}),document.getElementById("btn-save-results").addEventListener("click",()=>{let t=0,d=!1;if(document.querySelectorAll("tr[data-student-id]").forEach(n=>{const c=n.querySelector(".score-input");if(c.classList.remove("is-invalid"),c.value==="")return;const e=Number(c.value);if(e<0||e>100){c.classList.add("is-invalid"),d=!0;return}const i=Number(n.dataset.studentId),a=n.querySelector(".remark-input").value.trim(),r=b.find(l=>l.studentId===i&&l.subject===s.subject&&l.term===o);r?Object.assign(r,{score:e,remark:a}):b.push({studentId:i,subject:s.subject,score:e,remark:a,term:o}),t++}),d){m("Scores must be between 0 and 100","danger");return}if(!t){m("Enter at least one score to save","warning");return}m(`${t} ${s.class} ${s.subject} result${t===1?"":"s"} saved — SMS sent to ${t} parent${t===1?"":"s"}`)})}export{E as init,g as render};
