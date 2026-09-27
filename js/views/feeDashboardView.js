// Fees Management & Fee Collection Dashboard View
window.FeeDashboardView = (function() {
  let activeStatusFilter = 'All';
  let activeClassFilter = 'All';
  let searchQuery = '';

  function render() {
    const allRecords = window.ERP_DATA.feeRecords || [];
    const filtered = allRecords.filter(r => {
      const matchStatus = activeStatusFilter === 'All' || r.status === activeStatusFilter;
      const matchClass = activeClassFilter === 'All' || r.class.startsWith(activeClassFilter);
      const matchSearch = !searchQuery || 
        r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.studentId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchClass && matchSearch;
    });

    const totalBilled = "₹1,42,50,000";
    const totalCollected = "₹1,18,20,000";
    const pendingDue = "₹18,65,000";
    const overdueAmount = "₹5,65,000";
    const todayCollection = "₹1,85,000";

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-bold text-slate-900">Fee Management & Collection</h1>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Quarter 2 Active
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Collect school tuition, transport, lab fees, issue receipts, and track defaulters.</p>
          </div>

          <div class="flex items-center gap-2.5">
            <button 
              onclick="FeeDashboardView.sendBulkWhatsApp()"
              class="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-2xs"
            >
              <i data-lucide="message-circle" class="w-4 h-4"></i>
              <span>WhatsApp Fee Defaulters</span>
            </button>
            <button 
              onclick="ModalManager.open('modal-collect-fee')"
              class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#E8752F] hover:bg-[#D46320] text-white transition-colors shadow-2xs"
            >
              <i data-lucide="plus" class="w-4 h-4"></i>
              <span>Collect Payment</span>
            </button>
          </div>
        </div>

        <!-- KPI Metric Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 md:gap-4">
          
          <div class="p-4 bg-white rounded-xl border border-slate-200/80 card-shadow">
            <div class="text-xs text-slate-500 font-medium">Total Billed</div>
            <div class="text-xl font-bold text-slate-900 mt-1">${totalBilled}</div>
            <div class="text-[11px] text-slate-400 mt-0.5">Annual Projected</div>
          </div>

          <div class="p-4 bg-white rounded-xl border border-slate-200/80 card-shadow">
            <div class="text-xs text-slate-500 font-medium">Total Collected</div>
            <div class="text-xl font-bold text-emerald-600 mt-1">${totalCollected}</div>
            <div class="text-[11px] text-emerald-600 font-medium mt-0.5">82.9% Collected</div>
          </div>

          <div class="p-4 bg-white rounded-xl border border-slate-200/80 card-shadow">
            <div class="text-xs text-slate-500 font-medium">Pending Dues</div>
            <div class="text-xl font-bold text-amber-600 mt-1">${pendingDue}</div>
            <div class="text-[11px] text-slate-400 mt-0.5">Due before 15 Sep</div>
          </div>

          <div class="p-4 bg-white rounded-xl border border-slate-200/80 card-shadow">
            <div class="text-xs text-slate-500 font-medium">Overdue Fine</div>
            <div class="text-xl font-bold text-rose-600 mt-1">${overdueAmount}</div>
            <div class="text-[11px] text-rose-500 font-medium mt-0.5">34 Accounts</div>
          </div>

          <div class="p-4 bg-white rounded-xl border border-slate-200/80 card-shadow col-span-2 sm:col-span-1">
            <div class="text-xs text-slate-500 font-medium">Today's Inflow</div>
            <div class="text-xl font-bold text-[#E8752F] mt-1">${todayCollection}</div>
            <div class="text-[11px] text-slate-400 mt-0.5">UPI, Cash & Bank</div>
          </div>

        </div>

        <!-- Filter Controls -->
        <div class="bg-white p-4 rounded-xl border border-slate-200/80 card-shadow flex flex-col md:flex-row items-center justify-between gap-3">
          
          <!-- Search input -->
          <div class="relative w-full md:w-80">
            <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              placeholder="Search student, invoice # or ID..."
              value="${searchQuery}"
              oninput="FeeDashboardView.onSearch(this.value)"
              class="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#E8752F]"
            >
          </div>

          <!-- Status pills -->
          <div class="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
            ${['All', 'Paid', 'Partial', 'Overdue', 'Pending'].map(st => `
              <button 
                onclick="FeeDashboardView.filterStatus('${st}')"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeStatusFilter === st 
                    ? 'bg-[#E8752F] text-white shadow-2xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }"
              >
                ${st}
              </button>
            `).join('')}
          </div>

        </div>

        <!-- Transactions Table -->
        <div class="bg-white rounded-xl border border-slate-200/80 card-shadow overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th class="py-3 px-4">Invoice #</th>
                  <th class="py-3 px-3">Student</th>
                  <th class="py-3 px-3">Class</th>
                  <th class="py-3 px-3">Fee Period</th>
                  <th class="py-3 px-3">Net Payable</th>
                  <th class="py-3 px-3">Paid Amount</th>
                  <th class="py-3 px-3">Balance</th>
                  <th class="py-3 px-3">Status</th>
                  <th class="py-3 px-3">Payment Mode</th>
                  <th class="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-xs">
                ${filtered.length === 0 ? `
                  <tr>
                    <td colspan="10" class="py-10 text-center text-slate-400">
                      No fee records match this query.
                    </td>
                  </tr>
                ` : filtered.map(r => {
                  const balance = r.netPayable - r.paidAmount;
                  const statusBadge = r.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                      r.status === 'Partial' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                      r.status === 'Overdue' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                      'bg-slate-100 text-slate-600 border-slate-200';
                  return `
                    <tr class="hover:bg-slate-50/70 transition-colors">
                      <td class="py-3 px-4 font-mono font-bold text-slate-700">${r.invoiceNo}</td>
                      <td class="py-3 px-3">
                        <div class="font-bold text-slate-800 hover:text-[#E8752F] cursor-pointer" onclick="App.viewStudentProfile('${r.studentId}')">
                          ${r.studentName}
                        </div>
                        <div class="text-[10px] text-slate-400 font-mono">${r.studentId}</div>
                      </td>
                      <td class="py-3 px-3 font-semibold text-slate-700">${r.class}</td>
                      <td class="py-3 px-3 text-slate-500">${r.quarter}</td>
                      <td class="py-3 px-3 font-bold text-slate-800">₹${r.netPayable.toLocaleString('en-IN')}</td>
                      <td class="py-3 px-3 font-bold text-emerald-600">₹${r.paidAmount.toLocaleString('en-IN')}</td>
                      <td class="py-3 px-3 font-bold ${balance > 0 ? 'text-rose-600' : 'text-slate-400'}">
                        ₹${balance.toLocaleString('en-IN')}
                      </td>
                      <td class="py-3 px-3">
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge}">
                          ${r.status}
                        </span>
                      </td>
                      <td class="py-3 px-3 text-slate-500 text-[11px]">${r.paymentMode || '-'}</td>
                      <td class="py-3 px-4 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                          ${r.status !== 'Paid' ? `
                            <button 
                              onclick="FeeDashboardView.openPayModal('${r.invoiceNo}')"
                              class="px-2.5 py-1 bg-[#E8752F] text-white rounded-md text-[11px] font-semibold hover:bg-[#D46320]"
                            >
                              Collect
                            </button>
                          ` : ''}
                          ${r.receiptNo ? `
                            <button 
                              onclick="App.openFeeReceipt('${r.invoiceNo}')"
                              class="p-1.5 text-slate-500 hover:text-[#E8752F] hover:bg-orange-50 rounded-lg transition-colors"
                              title="Print Official Receipt"
                            >
                              <i data-lucide="printer" class="w-4 h-4"></i>
                            </button>
                          ` : ''}
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }

  function filterStatus(status) {
    activeStatusFilter = status;
    refresh();
  }

  function onSearch(val) {
    searchQuery = val;
    refresh();
  }

  function refresh() {
    const container = document.getElementById('main-content-viewport');
    if (container) {
      container.innerHTML = render();
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function sendBulkWhatsApp() {
    Toast.success('WhatsApp Reminders Sent', 'Automated fee reminder link dispatched to 34 guardians.');
  }

  function openPayModal(invNo) {
    ModalManager.open('modal-collect-fee');
  }

  return {
    render,
    filterStatus,
    onSearch,
    sendBulkWhatsApp,
    openPayModal
  };
})();
