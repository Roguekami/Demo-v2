import { icons } from '../../icons.js';
import { students, payments, classes, feeSettings, formatCurrency, formatDate, escapeHtml, nextId, todayISO, getTotalCollected, getTotalOutstanding } from '../../data/mock.js';
import { openModal, field, toast } from '../../components/modal.js';
import { rerender } from '../../router.js';

const CURRENT_TERM = '2024/2025 — Term 2';
let classFilter = 'all';
let sortByBalance = false;

function lastPaymentFor(studentId) {
  return payments
    .filter(p => p.studentId === studentId)
    .sort((a, b) => b.date.localeCompare(a.date))[0];
}

export function render() {
  const collected = getTotalCollected();
  const outstanding = getTotalOutstanding();
  const rate = Math.round((collected / (collected + outstanding || 1)) * 100);
  const classOptions = classes.map(c => `<option value="${c.name}" ${classFilter === c.name ? 'selected' : ''}>${c.name}</option>`).join('');

  let ledger = students.filter(s => classFilter === 'all' || s.class === classFilter);
  if (sortByBalance) ledger = [...ledger].sort((a, b) => (b.amountDue - b.amountPaid) - (a.amountDue - a.amountPaid));

  const studentLedger = ledger.map(s => {
    const balance = s.amountDue - s.amountPaid;
    const last = lastPaymentFor(s.id);
    return `
      <tr>
        <td class="td-name cell-title">${escapeHtml(s.name)}</td>
        <td data-label="Class">${s.class}</td>
        <td data-label="Amount Due">${formatCurrency(s.amountDue)}</td>
        <td data-label="Amount Paid">${formatCurrency(s.amountPaid)}</td>
        <td class="font-semibold ${balance > 0 ? 'text-danger' : 'text-success'}" data-label="Balance">${formatCurrency(balance)}</td>
        <td data-label="Last Payment">${last ? formatDate(last.date) : '—'}</td>
        <td class="cell-action">
          ${balance > 0
            ? `<button class="btn btn-sm btn-primary record-payment-btn" data-id="${s.id}">Record Payment</button>`
            : '<span class="badge badge-success">Cleared</span>'}
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="page-header">
      <h2>Fee Management</h2>
      <button class="btn btn-secondary" id="btn-set-fee">${icons.edit} Set Term Fee</button>
    </div>

    <div class="summary-bar">
      <div class="stat-card">
        <div class="stat-card-content">
          <div class="stat-card-label">Total Collected &middot; ${CURRENT_TERM}</div>
          <div class="stat-card-value">${formatCurrency(collected)}</div>
          <div class="progress-bar mt-2"><div class="progress-fill green" style="width:${rate}%"></div></div>
          <div class="stat-card-sub">${rate}% collected</div>
        </div>
        <div class="stat-icon green">${icons.creditCard}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-content">
          <div class="stat-card-label">Total Outstanding</div>
          <div class="stat-card-value">${formatCurrency(outstanding)}</div>
          <div class="stat-card-sub">${students.filter(s => s.amountDue > s.amountPaid).length} students with a balance</div>
        </div>
        <div class="stat-icon amber">${icons.creditCard}</div>
      </div>
    </div>

    <div class="table-card">
      <div class="table-header">
        <div class="table-header-left">
          <select id="fee-class-filter" class="form-select filter-select">
            <option value="all">All Classes</option>
            ${classOptions}
          </select>
          <button class="btn btn-sm ${sortByBalance ? 'btn-primary' : 'btn-secondary'}" id="btn-sort">
            ${icons.barChart} ${sortByBalance ? 'Sorted by balance' : 'Sort by balance'}
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
          ${studentLedger || '<tr class="responsive-empty"><td colspan="7" class="text-center text-muted">No students in this class.</td></tr>'}
        </tbody>
      </table>
    </div>
  `;
}

export function init() {
  document.getElementById('fee-class-filter').addEventListener('change', (e) => {
    classFilter = e.target.value;
    rerender();
  });

  document.getElementById('btn-sort').addEventListener('click', () => {
    sortByBalance = !sortByBalance;
    rerender();
  });

  document.querySelectorAll('.record-payment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const student = students.find(s => s.id === Number(btn.dataset.id));
      if (!student) return;
      const balance = student.amountDue - student.amountPaid;

      openModal({
        title: `Record Payment — ${escapeHtml(student.name)}`,
        submitLabel: 'Record payment',
        content: `
          <p class="text-sm text-secondary mb-4">Outstanding balance: <strong class="text-danger">${formatCurrency(balance)}</strong></p>
          <div class="form-group">
            <label class="form-label" for="pay-amount">Amount (₦)</label>
            <input type="number" class="form-input" id="pay-amount" min="1" max="${balance}" value="${balance}" required>
            <div class="form-hint">Part payments are fine — the balance carries over.</div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pay-date">Date</label>
              <input type="date" class="form-input" id="pay-date" value="${todayISO()}" required>
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
        `,
        onSubmit: () => {
          const amount = Number(field('pay-amount'));
          if (!(amount > 0) || amount > balance) {
            document.getElementById('pay-amount').classList.add('is-invalid');
            return false;
          }
          payments.push({ id: nextId(payments), studentId: student.id, amount, date: field('pay-date'), method: field('pay-method') });
          student.amountPaid += amount;
          student.feeStatus = student.amountPaid >= student.amountDue ? 'paid' : 'overdue';

          const remaining = student.amountDue - student.amountPaid;
          toast(remaining > 0
            ? `${formatCurrency(amount)} recorded — ${formatCurrency(remaining)} still owed`
            : `${formatCurrency(amount)} recorded — ${escapeHtml(student.name)} is fully paid`);
          rerender();
        },
      });
    });
  });

  document.getElementById('btn-set-fee').addEventListener('click', () => {
    const current = (id) => feeSettings.find(f => f.classId === id)?.amount ?? '';
    openModal({
      title: 'Set Term Fee',
      content: `
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="fee-class">Class</label>
            <select class="form-select" id="fee-class">
              ${classes.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="fee-term">Term</label>
            <select class="form-select" id="fee-term">
              <option>${CURRENT_TERM}</option>
              <option>2024/2025 — Term 3</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="fee-amount">Amount (₦)</label>
          <input type="number" class="form-input" id="fee-amount" min="0" value="${current(classes[0]?.id)}" required>
        </div>
      `,
      onSubmit: () => {
        const classId = Number(field('fee-class'));
        const amount = Number(field('fee-amount'));
        const term = field('fee-term');
        const cls = classes.find(c => c.id === classId);
        const setting = feeSettings.find(f => f.classId === classId);
        if (setting) { setting.amount = amount; setting.term = term; } else feeSettings.push({ classId, term, amount });

        if (term === CURRENT_TERM) {
          students.filter(s => s.class === cls.name).forEach(s => {
            s.amountDue = amount;
            s.feeStatus = s.amountPaid >= s.amountDue ? 'paid' : 'overdue';
          });
        }
        toast(`${cls.name} fee set to ${formatCurrency(amount)} for ${term}`);
        rerender();
      },
    });
    const sel = document.getElementById('fee-class');
    sel.addEventListener('change', () => { document.getElementById('fee-amount').value = current(Number(sel.value)); });
  });
}
