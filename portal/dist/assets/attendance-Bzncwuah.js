import{r as i,A as p,w as d,c as g,e as m,j as r}from"./index-CEYCdedo.js";import{t as v}from"./modal-Bs8ai2sk.js";const b={present:"active",late:"active-warning",absent:"active-danger"},l=new Set;function h(){return["SS1","SS2"]}function $(){const t=h(),e=t.includes(d.attendanceClass)?d.attendanceClass:t[0];d.attendanceClass=e;const n=new Date().toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short",year:"numeric"}),a=g.filter(s=>s.class===e),c=a.map((s,u)=>`
    <tr data-student-id="${s.id}">
      <td class="text-muted cell-hide-mobile">${u+1}</td>
      <td class="td-name cell-title">${m(s.name)}</td>
      <td class="cell-status">
        <div class="toggle-group">
          ${["present","late","absent"].map(o=>`
            <button class="toggle-option ${o==="present"?"active":""}" data-status="${o}">${o[0].toUpperCase()+o.slice(1)}</button>
          `).join("")}
        </div>
      </td>
    </tr>
  `).join("");return`
    <div class="page-header">
      <h2>Mark Attendance</h2>
      ${l.has(e)?`<span class="badge badge-success">${r.check} Saved for today</span>`:""}
    </div>

    <div class="filter-bar">
      <select class="filter-select" id="attendance-class">
        ${t.map(s=>`<option ${s===e?"selected":""}>${s}</option>`).join("")}
      </select>
      <div class="text-sm text-secondary">${n}</div>
      <div class="text-xs text-muted">Everyone starts as Present — just tap the exceptions.</div>
    </div>

    <div class="table-card">
      <table class="responsive-table">
        <thead>
          <tr>
            <th style="width:50px">#</th>
            <th>Student Name</th>
            <th style="width:260px">Status</th>
          </tr>
        </thead>
        <tbody>
          ${c||'<tr class="responsive-empty"><td colspan="3" class="text-center text-muted">No students in this class.</td></tr>'}
        </tbody>
      </table>
      <div class="flex items-center justify-between p-4 border-t" style="flex-wrap:wrap;gap:12px">
        <div class="text-sm text-secondary">
          <span id="present-count" class="font-semibold text-success">${a.length}</span> Present &middot;
          <span id="late-count" class="font-semibold">0</span> Late &middot;
          <span id="absent-count" class="font-semibold text-danger">0</span> Absent
        </div>
        <button class="btn btn-primary" id="btn-save-attendance" ${a.length?"":"disabled"}>${r.save} Save Attendance</button>
      </div>
    </div>
  `}function y(){const t=e=>document.querySelectorAll(`.toggle-option.${e}`).length;document.getElementById("present-count").textContent=t("active"),document.getElementById("late-count").textContent=t("active-warning"),document.getElementById("absent-count").textContent=t("active-danger")}function S(){document.querySelectorAll(".toggle-group").forEach(t=>{t.addEventListener("click",e=>{const n=e.target.closest(".toggle-option");n&&(t.querySelectorAll(".toggle-option").forEach(a=>a.classList.remove("active","active-warning","active-danger")),n.classList.add(b[n.dataset.status]),y())})}),document.getElementById("attendance-class").addEventListener("change",t=>{d.attendanceClass=t.target.value,i()}),document.getElementById("btn-save-attendance").addEventListener("click",()=>{let t=0;document.querySelectorAll("tr[data-student-id]").forEach(e=>{var c;const n=(c=e.querySelector(".toggle-option.active, .toggle-option.active-warning, .toggle-option.active-danger"))==null?void 0:c.dataset.status,a=p.find(s=>s.studentId===Number(e.dataset.studentId));n==="absent"&&t++,a&&!l.has(d.attendanceClass)&&(a.totalDays++,n==="absent"?a.daysAbsent++:a.daysPresent++)}),l.add(d.attendanceClass),v(`${d.attendanceClass} attendance saved${t?` — ${t} absent`:" — full attendance"}`),i()})}export{S as init,$ as render};
