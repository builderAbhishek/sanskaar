// Mobile-First Parent Portal View
window.ParentPortalView = (function() {
  function render() {
    const s = window.ERP_DATA.students[0]; // Aarav Sharma
    const school = window.ERP_DATA.schoolProfile;

    return `
      <div class="max-w-2xl mx-auto space-y-4 animate-fade-in pb-12">
        
        <!-- Parent Banner & Switch Back to Admin -->
        <div class="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-orange-400 font-bold">
              <i data-lucide="smartphone" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="text-[11px] text-orange-300 font-semibold uppercase tracking-wider">Parent Portal Mode</div>
              <div class="text-sm font-bold">Welcome, Mr. Rajesh Sharma</div>
            </div>
          </div>
          <button 
            onclick="App.switchViewMode('admin')"
            class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
            <span>Return to Admin</span>
          </button>
        </div>

        <!-- Child Profile Hero Card -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 card-shadow">
          <div class="flex items-center gap-4">
            <div class="relative shrink-0">
              <img src="${s.photo}" alt="${s.name}" class="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 shadow-sm">
              <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-bold text-slate-900 truncate">${s.name}</h2>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  ${s.house} House
                </span>
              </div>
              <div class="text-xs text-slate-500 mt-0.5">
                ${s.class} - Section ${s.section} • Roll No: ${s.rollNo}
              </div>
              <div class="text-[11px] font-mono text-slate-400 mt-1">
                Adm: ${s.admissionNo} • CBSE: CBSE-X-26-44109
              </div>
            </div>
          </div>

          <!-- Quick Metrics Bar -->
          <div class="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
            <div class="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <div class="text-[10px] text-slate-400 font-medium">Attendance</div>
              <div class="text-base font-bold text-emerald-700">${s.attendancePct}%</div>
              <div class="text-[9px] text-emerald-600 font-medium">118/122 Days</div>
            </div>
            <div class="p-2.5 rounded-xl bg-orange-50/60 border border-orange-100">
              <div class="text-[10px] text-slate-400 font-medium">Term 1 Rank</div>
              <div class="text-base font-bold text-[#E8752F]">Rank #1</div>
              <div class="text-[9px] text-[#E8752F] font-medium">93.3% Score</div>
            </div>
            <div class="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100">
              <div class="text-[10px] text-slate-400 font-medium">Quarter 2 Fee</div>
              <div class="text-base font-bold text-emerald-600">PAID</div>
              <div class="text-[9px] text-slate-400 font-medium">Receipt #4412</div>
            </div>
          </div>
        </div>

        <!-- Live GPS Bus Status Widget -->
        <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <i data-lucide="bus" class="w-5 h-5"></i>
            </div>
            <div class="min-w-0">
              <div class="text-xs font-bold text-slate-900 truncate">Bus Route #04 (Sector 100 Express)</div>
              <div class="text-[11px] text-slate-600 truncate">Driver: Mr. Dharmendra • GPS Active</div>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-emerald-700 border border-emerald-200 shadow-2xs shrink-0">
            On Schedule
          </span>
        </div>

        <!-- Homework & Due Today -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 card-shadow space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2">
              <i data-lucide="book-open" class="w-4 h-4 text-[#E8752F]"></i>
              <span>Active Homework & Assignments</span>
            </h3>
            <span class="text-xs text-[#E8752F] font-semibold">1 Pending</span>
          </div>

          <div class="space-y-2">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-xs">
              <div>
                <div class="font-bold text-slate-800">Quadratic Equations & AP Series</div>
                <div class="text-[11px] text-slate-500 mt-0.5">Mathematics • Due in 2 days (12 Sep)</div>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                To Submit
              </span>
            </div>

            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-xs">
              <div>
                <div class="font-bold text-slate-800">Verification of Ohm's Law Record</div>
                <div class="text-[11px] text-slate-500 mt-0.5">Physics • Submitted on time</div>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Submitted
              </span>
            </div>
          </div>
        </div>

        <!-- Academic Results & Report Card -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 card-shadow space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2">
              <i data-lucide="award" class="w-4 h-4 text-indigo-600"></i>
              <span>Term 1 Examination Results</span>
            </h3>
            <button 
              onclick="App.openReportCard('STU-2026-001')" 
              class="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
            >
              <span>View Report Card</span>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div class="text-slate-400 text-[10px]">Mathematics</div>
              <div class="font-bold text-slate-900 text-sm">97 / 100 <span class="text-emerald-600 text-[11px]">(A1)</span></div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div class="text-slate-400 text-[10px]">Science</div>
              <div class="font-bold text-slate-900 text-sm">95 / 100 <span class="text-emerald-600 text-[11px]">(A1)</span></div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div class="text-slate-400 text-[10px]">Artificial Intelligence</div>
              <div class="font-bold text-slate-900 text-sm">98 / 100 <span class="text-emerald-600 text-[11px]">(A1)</span></div>
            </div>
          </div>
        </div>

        <!-- Teacher Contact & Communications -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 card-shadow space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2">
              <i data-lucide="message-square" class="w-4 h-4 text-blue-600"></i>
              <span>Class Teacher Direct Contact</span>
            </h3>
          </div>

          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" alt="Mrs. Sunita Rao" class="w-12 h-12 rounded-xl object-cover border border-slate-200">
              <div class="min-w-0">
                <div class="font-bold text-slate-900 text-sm">Mrs. Sunita Rao</div>
                <div class="text-xs text-slate-500">Class Teacher (X-A) & HOD Math</div>
              </div>
            </div>

            <button 
              onclick="Toast.success('Message Dispatched', 'Your note has been sent to Mrs. Sunita Rao')"
              class="px-4 py-2 bg-[#E8752F] text-white rounded-xl text-xs font-semibold hover:bg-[#D46320] transition-colors shadow-2xs"
            >
              Send Message
            </button>
          </div>
        </div>

      </div>
    `;
  }

  return {
    render
  };
})();
