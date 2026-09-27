// Reports & Analytics Center View
window.ReportsView = (function() {
  let selectedReport = "fee"; // 'fee' | 'attendance' | 'exam' | 'demographics'
  let dateRange = "Quarter 2 (Jul - Sep 2026)";

  function render() {
    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
          <div>
            <h1 class="text-xl font-bold text-slate-900">Reports & Operational Intelligence</h1>
            <p class="text-xs text-slate-500 mt-0.5">Generate statutory CBSE audits, financial realization reports, and demographic breakdowns.</p>
          </div>

          <div class="flex items-center gap-2">
            <button 
              onclick="Toast.success('Export Complete', 'Exported ' + ReportsView.getReportName() + ' to CSV format')"
              class="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold shadow-2xs transition-colors"
            >
              <i data-lucide="file-spreadsheet" class="w-4 h-4 text-emerald-600"></i>
              <span>Export CSV</span>
            </button>
            <button 
              onclick="window.print()"
              class="flex items-center gap-2 px-4 py-2 bg-[#E8752F] text-white rounded-xl text-xs font-semibold hover:bg-[#D46320] shadow-2xs transition-colors"
            >
              <i data-lucide="printer" class="w-4 h-4"></i>
              <span>Print Report</span>
            </button>
          </div>
        </div>

        <!-- Report Selector Toolbar -->
        <div class="bg-white p-4 rounded-xl border border-slate-200/80 card-shadow no-print flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-3">
            <div>
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Select Report Category</label>
              <select 
                class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white"
                onchange="ReportsView.setReport(this.value)"
              >
                <option value="fee" ${selectedReport === 'fee' ? 'selected' : ''}>Fee Realization & Overdue Defaulters</option>
                <option value="attendance" ${selectedReport === 'attendance' ? 'selected' : ''}>Attendance & CBSE Retention Audit</option>
                <option value="exam" ${selectedReport === 'exam' ? 'selected' : ''}>Board Assessment & Term Exam Distribution</option>
                <option value="demographics" ${selectedReport === 'demographics' ? 'selected' : ''}>Student Demographics & Transport Fleet Utilization</option>
              </select>
            </div>

            <div>
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Time Horizon</label>
              <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white">
                <option>Quarter 2 (Jul - Sep 2026)</option>
                <option>Quarter 1 (Apr - Jun 2026)</option>
                <option>Full Academic Year 2026-27</option>
              </select>
            </div>
          </div>

          <div class="text-xs text-slate-400">
            Audit Standard: <strong class="text-slate-700">CBSE / State Govt Norms</strong>
          </div>
        </div>

        <!-- Report Content -->
        <div id="printable-document" class="bg-white p-6 rounded-2xl border border-slate-200/80 card-shadow space-y-4">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 class="text-base font-bold text-slate-900">${getReportName()}</h2>
              <p class="text-xs text-slate-400">Sanskaar International School • Session 2026-27</p>
            </div>
            <span class="text-xs font-mono font-bold text-slate-500">10 Sep 2026</span>
          </div>

          ${selectedReport === 'fee' ? renderFeeReport() :
            selectedReport === 'attendance' ? renderAttendanceReport() :
            selectedReport === 'exam' ? renderExamReport() :
            renderDemographicReport()}
        </div>

      </div>
    `;
  }

  function renderFeeReport() {
    return `
      <div class="space-y-4">
        <div class="grid grid-cols-3 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span class="text-slate-400">Total Billed:</span>
            <div class="text-lg font-bold text-slate-900">₹1,42,50,000</div>
          </div>
          <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span class="text-emerald-700 font-semibold">Total Realized:</span>
            <div class="text-lg font-bold text-emerald-700">₹1,18,20,000 (82.9%)</div>
          </div>
          <div class="p-3 rounded-xl bg-rose-50 border border-rose-200">
            <span class="text-rose-700 font-semibold">Total Outstanding:</span>
            <div class="text-lg font-bold text-rose-700">₹24,30,000</div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-[11px]">
                <th class="p-2.5">Class Cohort</th>
                <th class="p-2.5">Enrolled</th>
                <th class="p-2.5">Projected Billed (₹)</th>
                <th class="p-2.5">Collected (₹)</th>
                <th class="p-2.5">Pending (₹)</th>
                <th class="p-2.5 text-right">Recovery %</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr><td class="p-2.5 font-bold">Class XII (Sci & Comm)</td><td class="p-2.5">100</td><td class="p-2.5">₹31,50,000</td><td class="p-2.5 font-bold text-emerald-600">₹28,50,000</td><td class="p-2.5 text-rose-600">₹3,00,000</td><td class="p-2.5 text-right font-bold">90.4%</td></tr>
              <tr><td class="p-2.5 font-bold">Class XI (Sci & Comm)</td><td class="p-2.5">115</td><td class="p-2.5">₹34,50,000</td><td class="p-2.5 font-bold text-emerald-600">₹29,20,000</td><td class="p-2.5 text-rose-600">₹5,30,000</td><td class="p-2.5 text-right font-bold">84.6%</td></tr>
              <tr><td class="p-2.5 font-bold">Class X (All Sections)</td><td class="p-2.5">137</td><td class="p-2.5">₹35,62,000</td><td class="p-2.5 font-bold text-emerald-600">₹30,20,000</td><td class="p-2.5 text-rose-600">₹5,42,000</td><td class="p-2.5 text-right font-bold">84.8%</td></tr>
              <tr><td class="p-2.5 font-bold">Class IX (All Sections)</td><td class="p-2.5">136</td><td class="p-2.5">₹32,64,000</td><td class="p-2.5 font-bold text-emerald-600">₹26,10,000</td><td class="p-2.5 text-rose-600">₹6,54,000</td><td class="p-2.5 text-right font-bold">79.9%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderAttendanceReport() {
    return `
      <div class="space-y-4 text-xs">
        <p class="text-slate-600 leading-relaxed">
          Comprehensive compliance audit for CBSE affiliation guideline <strong>Rule 13.2 (Minimum 75% Attendance Attendance Mandate)</strong>.
        </p>
        <div class="p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div class="font-bold text-amber-900 text-sm">Actionable Finding: 14 Students Currently Below 75% Threshold</div>
          <p class="text-amber-800 text-xs mt-1">Formal notification letters issued to guardians. Remedial attendance sessions scheduled on Saturdays.</p>
        </div>
      </div>
    `;
  }

  function renderExamReport() {
    return `
      <div class="space-y-4 text-xs">
        <p class="text-slate-600 leading-relaxed">
          Term 1 Examination Grade Point Distribution across all 1,482 candidates.
        </p>
        <div class="grid grid-cols-4 gap-3 text-center">
          <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200"><span class="block text-emerald-800 font-bold text-xl">38.4%</span><span class="text-[10px] text-emerald-600 font-bold">Grade A1 (91-100)</span></div>
          <div class="p-3 bg-blue-50 rounded-xl border border-blue-200"><span class="block text-blue-800 font-bold text-xl">34.2%</span><span class="text-[10px] text-blue-600 font-bold">Grade A2 (81-90)</span></div>
          <div class="p-3 bg-amber-50 rounded-xl border border-amber-200"><span class="block text-amber-800 font-bold text-xl">21.8%</span><span class="text-[10px] text-amber-600 font-bold">Grade B1-B2</span></div>
          <div class="p-3 bg-slate-100 rounded-xl border border-slate-200"><span class="block text-slate-800 font-bold text-xl">5.6%</span><span class="text-[10px] text-slate-500 font-bold">Grade C & below</span></div>
        </div>
      </div>
    `;
  }

  function renderDemographicReport() {
    return `
      <div class="space-y-4 text-xs">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200"><span class="text-slate-400">Total Enrolled:</span><div class="font-bold text-slate-900 text-lg">1,482</div></div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200"><span class="text-slate-400">Gender Ratio:</span><div class="font-bold text-slate-900 text-lg">52% M : 48% F</div></div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200"><span class="text-slate-400">School Bus Commuters:</span><div class="font-bold text-slate-900 text-lg">1,120 (75.5%)</div></div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200"><span class="text-slate-400">Active Bus Fleet:</span><div class="font-bold text-slate-900 text-lg">14 GPS Buses</div></div>
        </div>
      </div>
    `;
  }

  function getReportName() {
    if (selectedReport === 'fee') return "Quarterly Fee Realization & Defaulter Audit";
    if (selectedReport === 'attendance') return "CBSE Attendance Retention & Risk Analysis";
    if (selectedReport === 'exam') return "Scholastic Assessment & Board Performance Audit";
    return "Institutional Demographic & Transport Utilization Report";
  }

  function setReport(val) {
    selectedReport = val;
    refresh();
  }

  function refresh() {
    const container = document.getElementById('main-content-viewport');
    if (container) {
      container.innerHTML = render();
      if (window.lucide) window.lucide.createIcons();
    }
  }

  return {
    render,
    getReportName,
    setReport
  };
})();
