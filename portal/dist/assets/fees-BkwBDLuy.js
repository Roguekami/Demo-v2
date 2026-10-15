import{F as r,z as l,H as i,j as m,k as e,h as p}from"./index-CEYCdedo.js";function h(){const a=r(l().studentId),c=[...i(a.id)].sort((t,o)=>o.date.localeCompare(t.date)),{amountDue:n,amountPaid:d}=a,s=n-d;return`
    <div class="page-header">
      <h2>Fees & Payment</h2>
      <span class="text-sm text-secondary">2024/2025 &mdash; Term 2</span>
    </div>

    <div class="card mb-6">
      <div class="flex justify-between items-center mb-3">
        <span class="text-secondary">Term fee</span>
        <span class="font-medium">${e(n)}</span>
      </div>
      <div class="flex justify-between items-center mb-3">
        <span class="text-secondary">Amount paid</span>
        <span class="font-medium">&minus; ${e(d)}</span>
      </div>
      <div class="flex justify-between items-center pt-4 border-t">
        <span class="font-semibold">Balance</span>
        ${s>0?`<span class="text-2xl font-bold text-danger">${e(s)}</span>`:`<span class="badge badge-success">${m.check} Fully paid</span>`}
      </div>
      ${s>0?`<p class="text-xs text-muted mt-4">Pay at the school's accounts office or by bank transfer. Payments appear here once the school records them.</p>`:""}
    </div>

    <div class="section-heading">Payment History</div>
    <div class="table-card">
      <table class="responsive-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Method</th>
          </tr>
        </thead>
        <tbody>
          ${c.map(t=>`
            <tr>
              <td class="cell-title">${p(t.date)}</td>
              <td class="font-medium" data-label="Amount">${e(t.amount)}</td>
              <td data-label="Method">${t.method}</td>
            </tr>
          `).join("")||'<tr class="responsive-empty"><td colspan="3" class="text-center text-muted">No payments recorded yet.</td></tr>'}
        </tbody>
      </table>
    </div>
  `}function b(){}export{b as init,h as render};
