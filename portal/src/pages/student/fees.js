import { icons } from '../../icons.js';
import { formatCurrency, formatDate, getPaymentsForStudent, getStudent } from '../../data/mock.js';
import { getUser } from '../../router.js';

export function render() {
  const student = getStudent(getUser().studentId);
  const payments = [...getPaymentsForStudent(student.id)].sort((a, b) => b.date.localeCompare(a.date));
  const { amountDue, amountPaid } = student;
  const balance = amountDue - amountPaid;

  return `
    <div class="page-header">
      <h2>Fees & Payment</h2>
      <span class="text-sm text-secondary">2024/2025 &mdash; Term 2</span>
    </div>

    <div class="card mb-6">
      <div class="flex justify-between items-center mb-3">
        <span class="text-secondary">Term fee</span>
        <span class="font-medium">${formatCurrency(amountDue)}</span>
      </div>
      <div class="flex justify-between items-center mb-3">
        <span class="text-secondary">Amount paid</span>
        <span class="font-medium">&minus; ${formatCurrency(amountPaid)}</span>
      </div>
      <div class="flex justify-between items-center pt-4 border-t">
        <span class="font-semibold">Balance</span>
        ${balance > 0
          ? `<span class="text-2xl font-bold text-danger">${formatCurrency(balance)}</span>`
          : `<span class="badge badge-success">${icons.check} Fully paid</span>`}
      </div>
      ${balance > 0 ? `<p class="text-xs text-muted mt-4">Pay at the school's accounts office or by bank transfer. Payments appear here once the school records them.</p>` : ''}
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
          ${payments.map(p => `
            <tr>
              <td class="cell-title">${formatDate(p.date)}</td>
              <td class="font-medium" data-label="Amount">${formatCurrency(p.amount)}</td>
              <td data-label="Method">${p.method}</td>
            </tr>
          `).join('') || '<tr class="responsive-empty"><td colspan="3" class="text-center text-muted">No payments recorded yet.</td></tr>'}
        </tbody>
      </table>
    </div>
  `;
}

export function init() {}
