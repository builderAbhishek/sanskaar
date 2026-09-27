// Executive Dashboard View
window.DashboardView = (function() {
  function render() {
    const data = window.ERP_DATA;
    const students = data.students || [];
    const fees = data.feeRecords || [];

    const totalStudents = 1482;
    const totalTeachers = 78;
    const todayPresent = 1402;
    const attendancePct = 94.6;
    const totalCollected = "₹38,40,000";
    const pendingFees = "₹8,62,500";

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header & Date Banner -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div>
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-[#E8752F] border border-orange-200">
                <span class="w-1.5 h-1.5 rounded-full bg-[#E8752F] animate-pulse"></span>
                Term 2 Active
              </span>
              <span class="text-xs text-slate-400">|</span>
              <span class="text-xs text-slate-500 font-medium">CBSE Affiliation #2130894</span>
            </div>
            <h1 class="text-xl md:text-2xl font-bold text-slate-900 mt-1">Good morning, Dr. Arvind</h1>
            <p class="text-xs md:text-sm text-slate-500 mt-0.5">Here is the executive operational snapshot for Sanskaar International School today.</p>
          </div>
          <div class="flex items-center gap-2.5">
            <button 
              onclick="ModalManager.open('modal-collect-fee')"
              class="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <i data-lucide="indian-rupee" class="w-4 h-4 text-[#E8752F]"></i>
              <span>Collect Fee</span>
            </button>
            <button 
              onclick="ModalManager.open('modal-add-student')"
              class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#E8752F] hover:bg-[#D46320] text-white transition-colors shadow-2xs"
            >
              <i data-lucide="user-plus" class="w-4 h-4"></i>
              <span>New Admission</span>
            </button>
          </div>
        </div>

        <!-- KPI Cards Grid (6 cards) -->
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 md:gap-4">
          
          <!-- Card 1: Total Students -->
          <div class="p-4 bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all card-shadow">
            <div class="flex items-center justify-between text-slate-400">
              <span class="text-xs font-medium text-slate-500">Total Students</span>
              <div class="p-1.5 rounded-lg bg-orange-50 text-[#E8752F]">
                <i data-lucide="graduation-cap" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl font-bold text-slate-900">${totalStudents.toLocaleString('en-IN')}</span>
            </div>
            <div class="mt-1 flex items-center text-[11px] text-emerald-600 font-medium">
              <i data-lucide="trending-up" class="w-3.5 h-3.5 mr-0.5"></i>
              <span>+4.8% vs last yr</span>
            </div>
          </div>

          <!-- Card 2: Total Teachers -->
          <div class="p-4 bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all card-shadow">
            <div class="flex items-center justify-between text-slate-400">
              <span class="text-xs font-medium text-slate-500">Total Faculty</span>
              <div class="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                <i data-lucide="users" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl font-bold text-slate-900">${totalTeachers}</span>
            </div>
            <div class="mt-1 flex items-center text-[11px] text-slate-500 font-medium">
              <span>1:19 Student-Teacher</span>
            </div>
          </div>

          <!-- Card 3: Today's Attendance -->
          <div class="p-4 bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all card-shadow">
            <div class="flex items-center justify-between text-slate-400">
              <span class="text-xs font-medium text-slate-500">Today's Attendance</span>
              <div class="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                <i data-lucide="calendar-check" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl font-bold text-slate-900">${attendancePct}%</span>
            </div>
            <div class="mt-1 flex items-center text-[11px] text-emerald-600 font-medium">
              <span>${todayPresent} present today</span>
            </div>
          </div>

          <!-- Card 4: Fee Collection -->
          <div class="p-4 bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all card-shadow">
            <div class="flex items-center justify-between text-slate-400">
              <span class="text-xs font-medium text-slate-500">Q2 Collection</span>
              <div class="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                <i data-lucide="wallet" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-xl font-bold text-slate-900">${totalCollected}</span>
            </div>
            <div class="mt-1 flex items-center text-[11px] text-emerald-600 font-medium">
              <span>81.6% realized</span>
            </div>
          </div>

          <!-- Card 5: Pending Fees -->
          <div class="p-4 bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all card-shadow">
            <div class="flex items-center justify-between text-slate-400">
              <span class="text-xs font-medium text-slate-500">Pending Fees</span>
              <div class="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                <i data-lucide="alert-circle" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-xl font-bold text-rose-600">${pendingFees}</span>
            </div>
            <div class="mt-1 flex items-center text-[11px] text-rose-500 font-medium">
              <span>34 fee defaulters</span>
            </div>
          </div>

          <!-- Card 6: Upcoming Exams -->
          <div class="p-4 bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all card-shadow">
            <div class="flex items-center justify-between text-slate-400">
              <span class="text-xs font-medium text-slate-500">CBSE Mid-Term</span>
              <div class="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                <i data-lucide="award" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl font-bold text-slate-900">12 Days</span>
            </div>
            <div class="mt-1 flex items-center text-[11px] text-indigo-600 font-medium">
              <span>Starts 22 Sep 2026</span>
            </div>
          </div>

        </div>

        <!-- Main Dashboard Charts & Highlights Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          <!-- Fee Collection Trend Chart (2 Columns) -->
          <div class="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 class="font-bold text-slate-800 text-sm">Fee Realization & Monthly Collections</h3>
                <p class="text-xs text-slate-400">Financial Year 2026-27 (Collected vs Overdue Target)</p>
              </div>
              <div class="flex items-center gap-3 text-xs">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#E8752F]"></span>
                  <span class="text-slate-600 font-medium">Collected (₹ Lakhs)</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                  <span class="text-slate-400">Target</span>
                </div>
              </div>
            </div>
            <div class="mt-4 h-64 relative">
              <canvas id="feesChart"></canvas>
            </div>
          </div>

          <!-- Attendance Distribution Donut + Daily Highlights -->
          <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow flex flex-col justify-between">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 class="font-bold text-slate-800 text-sm">Today's Attendance</h3>
                <p class="text-xs text-slate-400">Class 1 to 12 Breakdown</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                94.6% Avg
              </span>
            </div>

            <div class="my-3 h-44 relative flex items-center justify-center">
              <canvas id="attendanceDonutChart"></canvas>
            </div>

            <div class="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
              <div class="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                <div class="text-[11px] text-slate-500 font-medium">Present</div>
                <div class="text-base font-bold text-emerald-700">1,402</div>
              </div>
              <div class="p-2 rounded-lg bg-rose-50/60 border border-rose-100">
                <div class="text-[11px] text-slate-500 font-medium">Absent</div>
                <div class="text-base font-bold text-rose-600">56</div>
              </div>
              <div class="p-2 rounded-lg bg-amber-50/60 border border-amber-100">
                <div class="text-[11px] text-slate-500 font-medium">Late / Half</div>
                <div class="text-base font-bold text-amber-600">24</div>
              </div>
            </div>
          </div>

        </div>

        <!-- Operational Feeds Row: Pending Fees, Recent Admissions, Upcoming Exams -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          <!-- Overdue Fees Action Box -->
          <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <span class="p-1 rounded-md bg-rose-50 text-rose-600">
                  <i data-lucide="bell-ring" class="w-4 h-4"></i>
                </span>
                <h3 class="font-bold text-slate-800 text-sm">Fee Due Reminders</h3>
              </div>
              <button onclick="App.navigate('fees')" class="text-xs font-semibold text-[#E8752F] hover:underline">View All</button>
            </div>

            <div class="mt-3 divide-y divide-slate-100 max-h-72 overflow-y-auto">
              ${fees.slice(1, 5).map(f => `
                <div class="py-3 flex items-center justify-between gap-3">
                  <div class="min-w-0">
                    <div class="text-xs font-bold text-slate-800 truncate">${f.studentName}</div>
                    <div class="text-[11px] text-slate-400">${f.class} • Due: ₹${(f.netPayable - f.paidAmount).toLocaleString('en-IN')}</div>
                  </div>
                  <button 
                    onclick="Toast.success('Reminder Dispatched', 'WhatsApp fee alert sent to guardian of ${f.studentName}')"
                    class="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 flex items-center gap-1 shrink-0 transition-colors"
                  >
                    <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                    <span>WhatsApp</span>
                  </button>
                </div>
              `).join('')}
            </div>

            <div class="pt-3 border-t border-slate-100 mt-2">
              <button 
                onclick="Toast.success('Bulk Reminders Sent', 'Automated reminders sent to all 34 fee defaulters')"
                class="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <i data-lucide="send" class="w-3.5 h-3.5"></i>
                <span>Send WhatsApp to All Overdue (34)</span>
              </button>
            </div>
          </div>

          <!-- Recent Admissions -->
          <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <span class="p-1 rounded-md bg-blue-50 text-blue-600">
                  <i data-lucide="user-check" class="w-4 h-4"></i>
                </span>
                <h3 class="font-bold text-slate-800 text-sm">Recent Admissions</h3>
              </div>
              <button onclick="App.navigate('students')" class="text-xs font-semibold text-[#E8752F] hover:underline">Directory</button>
            </div>

            <div class="mt-3 divide-y divide-slate-100 max-h-72 overflow-y-auto">
              ${students.slice(0, 4).map(s => `
                <div class="py-2.5 flex items-center justify-between gap-3">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <img src="${s.photo}" alt="${s.name}" class="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200">
                    <div class="min-w-0">
                      <div class="text-xs font-bold text-slate-800 truncate">${s.name}</div>
                      <div class="text-[11px] text-slate-400">${s.class}-${s.section} • Roll ${s.rollNo}</div>
                    </div>
                  </div>
                  <button 
                    onclick="App.viewStudentProfile('${s.id}')"
                    class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="View Profile"
                  >
                    <i data-lucide="chevron-right" class="w-4 h-4"></i>
                  </button>
                </div>
              `).join('')}
            </div>

            <div class="pt-3 border-t border-slate-100 mt-2">
              <button 
                onclick="ModalManager.open('modal-add-student')"
                class="w-full py-2 bg-orange-50 hover:bg-orange-100 text-[#E8752F] border border-orange-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                <span>Register New Admission</span>
              </button>
            </div>
          </div>

          <!-- Upcoming Exams & AI Insights Preview -->
          <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                <div class="flex items-center gap-2">
                  <span class="p-1 rounded-md bg-purple-50 text-purple-600">
                    <i data-lucide="sparkles" class="w-4 h-4"></i>
                  </span>
                  <h3 class="font-bold text-slate-800 text-sm">Smart AI Copilot</h3>
                </div>
                <button onclick="App.navigate('ai-smart')" class="text-xs font-semibold text-[#E8752F] hover:underline">Explore</button>
              </div>

              <div class="mt-3 space-y-2.5">
                <div class="p-3 rounded-xl bg-orange-50/50 border border-orange-100">
                  <div class="flex items-center gap-1.5 text-xs font-bold text-[#E8752F]">
                    <i data-lucide="alert-circle" class="w-3.5 h-3.5"></i>
                    <span>Math Board Exam Alert</span>
                  </div>
                  <p class="text-[11px] text-slate-600 mt-1 leading-relaxed">Class X-C quadratic equation scores 14% below target. Remedial clinics recommended.</p>
                </div>

                <div class="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <i data-lucide="award" class="w-3.5 h-3.5"></i>
                    <span>Science Olympiad Talents</span>
                  </div>
                  <p class="text-[11px] text-slate-600 mt-1 leading-relaxed">18 students flagged for exceptional aptitude (>96% in Physics & AI).</p>
                </div>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 mt-4">
              <button 
                onclick="App.navigate('ai-smart')"
                class="w-full py-2 bg-gradient-to-r from-[#E8752F] to-[#EA580C] hover:opacity-95 text-white rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <i data-lucide="file-question" class="w-3.5 h-3.5"></i>
                <span>Open AI Question Paper Studio</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  function initCharts() {
    // Fee Realization Chart
    const feeCanvas = document.getElementById('feesChart');
    if (feeCanvas && window.Chart) {
      new Chart(feeCanvas, {
        type: 'bar',
        data: {
          labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep (Est)'],
          datasets: [
            {
              label: 'Fee Collected (₹ Lakhs)',
              data: [42.5, 38.2, 35.0, 48.4, 38.4, 28.0],
              backgroundColor: '#E8752F',
              borderRadius: 6
            },
            {
              label: 'Target (₹ Lakhs)',
              data: [45.0, 40.0, 38.0, 50.0, 40.0, 35.0],
              backgroundColor: '#E2E8F0',
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: '#F1F5F9' }, ticks: { callback: v => '₹' + v + 'L' } }
          }
        }
      });
    }

    // Attendance Donut Chart
    const attCanvas = document.getElementById('attendanceDonutChart');
    if (attCanvas && window.Chart) {
      new Chart(attCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Present', 'Absent', 'Late / Leave'],
          datasets: [{
            data: [1402, 56, 24],
            backgroundColor: ['#10B981', '#EF4444', '#F59E0B'],
            borderWidth: 2,
            borderColor: '#FFFFFF'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '72%',
          plugins: {
            legend: { display: false }
          }
        }
      });
    }
  }

  return {
    render,
    initCharts
  };
})();
