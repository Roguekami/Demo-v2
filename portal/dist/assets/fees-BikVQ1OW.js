import{r as u,c as p,k as i,v as C,e as $,l as f,g as D,b as I,h as S,j as b,m as y,p as h,o as T}from"./index-DNKaiGY_.js";import{o as P,f as c,t as E}from"./modal-Dzxcghj1.js";const g="2024/2025 — Term 2";let v="all",m=!1;function B(n){return h.filter(e=>e.studentId===n).sort((e,d)=>d.date.localeCompare(e.date))[0]}function A(){const n=D(),e=I(),d=Math.round(n/(n+e||1)*100),a=f.map(t=>`<option value="${t.name}" ${v===t.name?"selected":""}>${t.name}</option>`).join("");let s=p.filter(t=>v==="all"||t.class===v);m&&(s=[...s].sort((t,o)=>o.amountDue-o.amountPaid-(t.amountDue-t.amountPaid)));const r=s.map(t=>{const o=t.amountDue-t.amountPaid,l=B(t.id);return`
      <tr>
        <td class="td-name cell-title">${$(t.name)}</td>
        <td data-label="Class">${t.class}</td>
        <td data-label="Amount Due">${i(t.amountDue)}</td>
        <td data-label="Amount Paid">${i(t.amountPaid)}</td>
        <td class="font-semibold ${o>0?"text-danger":"text-success"}" data-label="Balance">${i(o)}</td>
        <td data-label="Last Payment">${l?S(l.date):"—"}</td>
        <td class="cell-action">
          ${o>0?`<button class="btn btn-sm btn-primary record-payment-btn" data-id="${t.id}">Record Payment</button>`:'<span class="badge badge-success">Cleared</span>'}
        </td>
      </tr>
    `}).join("");return`
    <div class="page-header">
      <h2>Fee Management</h2>
      <button class="btn btn-secondary" id="btn-set-fee">${b.edit} Set Term Fee</button>
    </div>

    <div class="summary-bar">
      <div class="stat-card">
        <div class="stat-card-content">
          <div class="stat-card-label">Total Collected &middot; ${g}</div>
          <div class="stat-card-value">${i(n)}</div>
          <div class="progress-bar mt-2"><div class="progress-fill green" style="width:${d}%"></div></div>
          <div class="stat-card-sub">${d}% collected</div>
        </div>
        <div class="stat-icon green">${b.creditCard}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-content">
          <div class="stat-card-label">Total Outstanding</div>
          <div class="stat-card-value">${i(e)}</div>
          <div class="stat-card-sub">${p.filter(t=>t.amountDue>t.amountPaid).length} students with a balance</div>
        </div>
        <div class="stat-icon amber">${b.creditCard}</div>
      </div>
    </div>

    <div class="table-card">
      <div class="table-header">
        <div class="table-header-left">
          <select id="fee-class-filter" class="form-select filter-select">
            <option value="all">All Classes</option>
            ${a}
          </select>
          <button class="btn btn-sm ${m?"btn-primary":"btn-secondary"}" id="btn-sort">
            ${b.barChart} ${m?"Sorted by balance":"Sort by balance"}
          </button>
        </div>
      </div>
      <table class="responsive-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Amount Due</th>
            <th>Amount Paid</th>
            <th>Balance</th>
            <th>Last Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${r||'<tr class="responsive-empty"><td colspan="7" class="text-center text-muted">No students in this class.</td></tr>'}
        </tbody>
      </table>
    </div>
  `}function N(){document.getElementById("fee-class-filter").addEventListener("change",n=>{v=n.target.value,u()}),document.getElementById("btn-sort").addEventListener("click",()=>{m=!m,u()}),document.querySelectorAll(".record-payment-btn").forEach(n=>{n.addEventListener("click",()=>{const e=p.find(a=>a.id===Number(n.dataset.id));if(!e)return;const d=e.amountDue-e.amountPaid;P({title:`Record Payment — ${$(e.name)}`,submitLabel:"Record payment",content:`
          <p class="text-sm text-secondary mb-4">Outstanding balance: <strong class="text-danger">${i(d)}</strong></p>
          <div class="form-group">
            <label class="form-label" for="pay-amount">Amount (₦)</label>
            <input type="number" class="form-input" id="pay-amount" min="1" max="${d}" value="${d}" required>
            <div class="form-hint">Part payments are fine — the balance carries over.</div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pay-date">Date</label>
              <input type="date" class="form-input" id="pay-date" value="${C()}" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="pay-method">Method</label>
              <select class="form-select" id="pay-method">
                <option>Bank Transfer</option>
                <option>Cash</option>
                <option>POS</option>
              </select>
            </div>
          </div>
        `,onSubmit:()=>{const a=Number(c("pay-amount"));if(!(a>0)||a>d)return document.getElementById("pay-amount").classList.add("is-invalid"),!1;h.push({id:T(h),studentId:e.id,amount:a,date:c("pay-date"),method:c("pay-method")}),e.amountPaid+=a,e.feeStatus=e.amountPaid>=e.amountDue?"paid":"overdue";const s=e.amountDue-e.amountPaid;E(s>0?`${i(a)} recorded — ${i(s)} still owed`:`${i(a)} recorded — ${$(e.name)} is fully paid`),u()}})})}),document.getElementById("btn-set-fee").addEventListener("click",()=>{var d;const n=a=>{var s;return((s=y.find(r=>r.classId===a))==null?void 0:s.amount)??""};P({title:"Set Term Fee",content:`
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="fee-class">Class</label>
            <select class="form-select" id="fee-class">
              ${f.map(a=>`<option value="${a.id}">${a.name}</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="fee-term">Term</label>
            <select class="form-select" id="fee-term">
              <option>${g}</option>
              <option>2024/2025 — Term 3</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="fee-amount">Amount (₦)</label>
          <input type="number" class="form-input" id="fee-amount" min="0" value="${n((d=f[0])==null?void 0:d.id)}" required>
        </div>
      `,onSubmit:()=>{const a=Number(c("fee-class")),s=Number(c("fee-amount")),r=c("fee-term"),t=f.find(l=>l.id===a),o=y.find(l=>l.classId===a);o?(o.amount=s,o.term=r):y.push({classId:a,term:r,amount:s}),r===g&&p.filter(l=>l.class===t.name).forEach(l=>{l.amountDue=s,l.feeStatus=l.amountPaid>=l.amountDue?"paid":"overdue"}),E(`${t.name} fee set to ${i(s)} for ${r}`),u()}});const e=document.getElementById("fee-class");e.addEventListener("change",()=>{document.getElementById("fee-amount").value=n(Number(e.value))})})}export{N as init,A as render};
