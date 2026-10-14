import{F as p,z as m,I as v,G as b,j as h,e as d}from"./index-DNKaiGY_.js";const i="2024/2025 — Term 1";function o(t){return t>=70?"A":t>=60?"B":t>=50?"C":t>=40?"D":"F"}function x(){const t=p(m().studentId),s=v(t.id).filter(e=>e.term===i),a=b(t.id),n=s.reduce((e,c)=>e+c.score,0),l=s.length?n/s.length:0,r=o(Math.round(l));return`
    <div class="page-header no-print">
      <h2>Results</h2>
      <div class="flex gap-3">
        <select class="filter-select">
          <option>${i}</option>
        </select>
        <button class="btn btn-secondary" onclick="window.print()">${h.printer} Print</button>
      </div>
    </div>

    <div class="report-card">
      <div class="report-header">
        <h3>Lincoln Academy</h3>
        <p>Student Report Card &mdash; ${i}</p>
      </div>

      <div class="report-meta">
        <div><p class="text-xs text-muted mb-1">Name</p><p class="font-semibold">${d(t.name)}</p></div>
        <div><p class="text-xs text-muted mb-1">Admission No</p><p class="font-semibold">${t.admissionNo}</p></div>
        <div><p class="text-xs text-muted mb-1">Class</p><p class="font-semibold">${t.class}</p></div>
        <div><p class="text-xs text-muted mb-1">Subjects taken</p><p class="font-semibold">${s.length}</p></div>
        <div><p class="text-xs text-muted mb-1">Average</p><p class="font-semibold">${l.toFixed(1)}%</p></div>
        <div><p class="text-xs text-muted mb-1">Attendance</p><p class="font-semibold">${a?`${a.daysPresent}/${a.totalDays} days`:"—"}</p></div>
      </div>

      <table class="responsive-table report-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Score (/100)</th>
            <th>Grade</th>
            <th>Teacher's Remark</th>
          </tr>
        </thead>
        <tbody>
          ${s.map(e=>`
            <tr>
              <td class="td-name cell-title">${d(e.subject)}</td>
              <td data-label="Score">
                <div class="flex items-center gap-3">
                  <span class="font-semibold" style="min-width:24px">${e.score}</span>
                  <div class="progress-bar" style="width:100px"><div class="progress-fill" style="width:${e.score}%"></div></div>
                </div>
              </td>
              <td data-label="Grade"><span class="grade-pill grade-${o(e.score)}">${o(e.score)}</span></td>
              <td class="text-secondary" data-label="Remark">${d(e.remark)}</td>
            </tr>
          `).join("")||'<tr class="responsive-empty"><td colspan="4" class="text-center text-muted">No results published for this term yet.</td></tr>'}
        </tbody>
        ${s.length?`
          <tfoot>
            <tr class="report-total">
              <td class="font-semibold cell-title">Overall</td>
              <td class="font-semibold" data-label="Average">${l.toFixed(1)}</td>
              <td data-label="Grade"><span class="grade-pill grade-${r}">${r}</span></td>
              <td></td>
            </tr>
          </tfoot>
        `:""}
      </table>

      <div class="report-section border-t grid-2">
        <div>
          <h4 class="font-semibold text-sm mb-2">Class Teacher's Comment</h4>
          <p class="text-secondary italic text-sm">"${d(t.name.split(" ")[0])} has shown great improvement this term. Keep up the good work!"</p>
        </div>
        <div>
          <h4 class="font-semibold text-sm mb-2">Grading Key</h4>
          <p class="text-xs text-secondary">A: 70–100 &middot; B: 60–69 &middot; C: 50–59 &middot; D: 40–49 &middot; F: 0–39</p>
        </div>
      </div>
    </div>
  `}function f(){}export{f as init,x as render};
