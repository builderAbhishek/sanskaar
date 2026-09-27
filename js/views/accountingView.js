// Accounting, Cash Book & Expense Management View
window.AccountingView = (function() {
  function render() {
    const acc = window.ERP_DATA.accounting;

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-bold text-slate-900">Institutional Accounting & Cash Book</h1>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                FY 2026-27 (Audited)
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Track institutional income, operational expenses, faculty payroll disbursements, and bank balances.</p>
          </div>

          <div class="flex items-center gap-2">
            <button 
              onclick="Toast.success('Voucher Created', 'New payment debit voucher logged in cash book')"
              class="flex items-center gap-1.5 px-4 py-2 bg-[#E8752F] hover:bg-[#D46320] text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
            >
              <i data-lucide="plus" class="w-4 h-4"></i>
              <span>Log Expense Voucher</span>
            </button>
          </div>
        </div>

        <!-- Bank & Financial Balances Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="p-4 bg-white rounded-xl border border-slate-200/80 card-shadow">
            <div class="text-xs text-slate-500 font-medium">Net Institutional Reserves</div>
            <div class="text-2xl font-bold text-slate-900 mt-1">₹${(acc.overview.netReserve / 100000).toFixed(2)}L</div>
            <div class="text-[11px] text-emerald-600 font-medium mt-0.5">+18.4% Operating Surplus</div>
          </div>

          <div class="p-4 bg-white rounded-xl border border-slate-200/80 card-shadow">
            <div class="text-xs text-slate-500 font-medium">SBI Main Operational A/C</div>
            <div class="text-2xl font-bold text-slate-900 mt-1">₹${(acc.overview.cashInBankSBI / 100000).toFixed(2)}L</div>
            <div class="text-[11px] text-slate-400 mt-0.5">A/C #99281726301</div>
          </div>

          <div class="p-4 bg-white rounded-xl border border-slate-200/80 card-shadow">
            <div class="text-xs text-slate-500 font-medium">HDFC Fee Collection A/C</div>
            <div class="text-2xl font-bold text-slate-900 mt-1">₹${(acc.overview.cashInBankHDFC / 100000).toFixed(2)}L</div>
            <div class="text-[11px] text-slate-400 mt-0.5">Automated Gateway Linked</div>
          </div>

          <div class="p-4 bg-white rounded-xl border border-slate-200/80 card-shadow">
            <div class="text-xs text-slate-500 font-medium">Petty Cash In Hand</div>
            <div class="text-2xl font-bold text-[#E8752F] mt-1">₹${(acc.overview.pettyCashCounter / 1000).toFixed(1)}K</div>
            <div class="text-[11px] text-slate-400 mt-0.5">Accounts Counter Vault</div>
          </div>
        </div>

        <!-- Expense Category Breakdown & Transaction Ledger -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          <!-- Expense Breakdown -->
          <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 class="font-bold text-slate-800 text-sm">Operating Expense Categories</h3>
              <span class="text-xs text-slate-400">YTD ₹3.61 Cr</span>
            </div>

            <div class="space-y-3">
              ${acc.expenseCategories.map(cat => `
                <div>
                  <div class="flex items-center justify-between text-xs mb-1">
                    <span class="font-semibold text-slate-700">${cat.category}</span>
                    <span class="font-bold text-slate-900">₹${(cat.amount / 100000).toFixed(1)}L (${cat.pct}%)</span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div class="h-full rounded-full bg-[#E8752F]" style="width: ${cat.pct}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Recent Journal & Payment Vouchers Ledger (2 Cols) -->
          <div class="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 class="font-bold text-slate-800 text-sm">Daily Cash Book & Voucher Ledger</h3>
                <p class="text-xs text-slate-400">Double-entry verified transactions</p>
              </div>
              <button onclick="Toast.info('Audit Report', 'Exporting audited cash book ledger in Excel')" class="text-xs font-semibold text-[#E8752F] hover:underline">
                Export Ledger
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                    <th class="p-2.5">Date</th>
                    <th class="p-2.5">Voucher #</th>
                    <th class="p-2.5">Particulars / Description</th>
                    <th class="p-2.5">Type</th>
                    <th class="p-2.5 text-right">Amount (₹)</th>
                    <th class="p-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${acc.recentTransactions.map(t => `
                    <tr class="hover:bg-slate-50/60">
                      <td class="p-2.5 text-slate-500 whitespace-nowrap">${t.date}</td>
                      <td class="p-2.5 font-mono font-bold text-slate-700">${t.voucher}</td>
                      <td class="p-2.5">
                        <div class="font-bold text-slate-800">${t.category}</div>
                        <div class="text-[10px] text-slate-400">${t.mode} • Ref: ${t.id}</div>
                      </td>
                      <td class="p-2.5">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold ${t.type === 'Income' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}">
                          ${t.type}
                        </span>
                      </td>
                      <td class="p-2.5 text-right font-bold ${t.type === 'Income' ? 'text-emerald-600' : 'text-slate-900'}">
                        ${t.type === 'Income' ? '+' : '-'} ₹${t.amount.toLocaleString('en-IN')}
                      </td>
                      <td class="p-2.5 text-right">
                        <span class="text-[10px] font-semibold text-emerald-600">● ${t.status}</span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  return {
    render
  };
})();
