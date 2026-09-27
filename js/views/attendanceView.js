// Attendance Management & Marking View
window.AttendanceView = (function() {
  let selectedClass = "Class X";
  let selectedSection = "A";
  let selectedDate = "2026-09-10";
  let activeTab = "marking"; // 'marking' | 'analytics'

  // Local state for attendance records of current session
  let attendanceList = [
    { rollNo: "01", id: "STU-2026-001", name: "Aarav Sharma", status: "P", remark: "On time" },
    { rollNo: "02", id: "STU-2026-002", name: "Diya Patel", status: "P", remark: "On time" },
    { rollNo: "03", id: "STU-2026-003", name: "Vihaan Verma", status: "A", remark: "Informed sick leave" },
    { rollNo: "04", id: "STU-2026-004", name: "Ananya Gupta", status: "P", remark: "On time" },
    { rollNo: "05", id: "STU-2026-005", name: "Rohan Mehra", status: "L", remark: "Bus delay 10m" },
    { rollNo: "06", id: "STU-2026-006", name: "Ishaan Joshi", status: "P", remark: "On time" },
    { rollNo: "07", id: "STU-2026-007", name: "Priya Nair", status: "P", remark: "On time" },
    { rollNo: "08", id: "STU-2026-008", name: "Kabir Singh", status: "P", remark: "On time" },
    { rollNo: "09", id: "STU-2026-009", name: "Riya Sengupta", status: "HD", remark: "Doctor checkup 12pm" },
    { rollNo: "10", id: "STU-2026-010", name: "Aryan Roy", status: "P", remark: "On time" },
    { rollNo: "11", id: "STU-2026-011", name: "Saanvi Das", status: "LV", remark: "Family event approved" },
    { rollNo: "12", id: "STU-2026-012", name: "Advait Rao", status: "P", remark: "On time" }
  ];

  function render(tab) {
    if (tab) activeTab = tab;

    const presentCount = attendanceList.filter(s => s.status === 'P').length;
    const absentCount = attendanceList.filter(s => s.status === 'A').length;
    const lateCount = attendanceList.filter(s => s.status === 'L').length;
    const halfDayCount = attendanceList.filter(s => s.status === 'HD').length;
    const leaveCount = attendanceList.filter(s => s.status === 'LV').length;
    const totalCount = attendanceList.length;
    const pct = ((presentCount / totalCount) * 100).toFixed(1);

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header & Tabs -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-bold text-slate-900">Attendance Center</h1>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-[#E8752F] border border-orange-200">
                10 September 2026
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Take daily student roll call, dispatch absent alerts to guardians, and track CBSE retention.</p>
          </div>

          <!-- Tab Switches -->
          <div class="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button 
              onclick="AttendanceView.switchTab('marking')"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'marking' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}"
            >
              Roll Call Sheet
            </button>
            <button 
              onclick="AttendanceView.switchTab('analytics')"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'analytics' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}"
            >
              Attendance Analytics
            </button>
          </div>
        </div>

        ${activeTab === 'marking' ? renderMarkingSheet(totalCount, presentCount, absentCount, lateCount, halfDayCount, leaveCount, pct) : renderAnalytics()}

      </div>
    `;
  }

  function renderMarkingSheet(total, present, absent, late, halfDay, leave, pct) {
    return `
      <!-- Class Selector & Quick Actions -->
      <div class="bg-white p-4 rounded-xl border border-slate-200/80 card-shadow space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          
          <div class="flex flex-wrap items-center gap-3">
            <!-- Class Dropdown -->
            <div>
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Class</label>
              <select 
                class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white"
                onchange="AttendanceView.onClassChange(this.value)"
              >
                ${window.ERP_DATA.classesList.map(c => `
                  <option value="${c}" ${c === selectedClass ? 'selected' : ''}>${c}</option>
                `).join('')}
              </select>
            </div>

            <!-- Section Dropdown -->
            <div>
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Section</label>
              <select 
                class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white"
                onchange="AttendanceView.onSectionChange(this.value)"
              >
                <option value="A" ${selectedSection === 'A' ? 'selected' : ''}>Section A</option>
                <option value="B" ${selectedSection === 'B' ? 'selected' : ''}>Section B</option>
                <option value="C" ${selectedSection === 'C' ? 'selected' : ''}>Section C</option>
              </select>
            </div>

            <!-- Date Picker -->
            <div>
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Date</label>
              <input 
                type="date" 
                value="${selectedDate}"
                class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white"
              >
            </div>
          </div>

          <!-- Mark All Present & Save Buttons -->
          <div class="flex items-center gap-2 pt-2 sm:pt-0">
            <button 
              onclick="AttendanceView.markAllPresent()"
              class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <i data-lucide="check-check" class="w-4 h-4 text-emerald-600"></i>
              <span>Mark All Present</span>
            </button>
            <button 
              onclick="AttendanceView.saveAttendance()"
              class="px-4 py-2 bg-[#E8752F] hover:bg-[#D46320] text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <i data-lucide="save" class="w-4 h-4"></i>
              <span>Save & Send SMS Alerts</span>
            </button>
          </div>

        </div>

        <!-- Metric Stat Strip -->
        <div class="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-3 border-t border-slate-100 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
            <span class="text-slate-400 text-[10px] block">Total Roster</span>
            <span class="font-bold text-slate-800 text-base">${total}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
            <span class="text-emerald-700 text-[10px] font-semibold block">Present</span>
            <span class="font-bold text-emerald-700 text-base">${present}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-center">
            <span class="text-rose-700 text-[10px] font-semibold block">Absent</span>
            <span class="font-bold text-rose-700 text-base">${absent}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-center">
            <span class="text-amber-700 text-[10px] font-semibold block">Late</span>
            <span class="font-bold text-amber-700 text-base">${late}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-center">
            <span class="text-blue-700 text-[10px] font-semibold block">Half Day</span>
            <span class="font-bold text-blue-700 text-base">${halfDay}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-purple-50 border border-purple-200 text-center">
            <span class="text-purple-700 text-[10px] font-semibold block">Today %</span>
            <span class="font-bold text-purple-700 text-base">${pct}%</span>
          </div>
        </div>
      </div>

      <!-- Student Attendance Roll Call Table -->
      <div class="bg-white rounded-xl border border-slate-200/80 card-shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Roll</th>
                <th class="py-3 px-3">Student Name</th>
                <th class="py-3 px-3">ID</th>
                <th class="py-3 px-3 text-center">Attendance Status</th>
                <th class="py-3 px-4">Remark / Absence Reason</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs">
              ${attendanceList.map((item, idx) => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3 px-4 font-mono font-bold text-slate-600">${item.rollNo}</td>
                  <td class="py-3 px-3">
                    <span class="font-bold text-slate-800 hover:text-[#E8752F] cursor-pointer" onclick="App.viewStudentProfile('${item.id}')">
                      ${item.name}
                    </span>
                  </td>
                  <td class="py-3 px-3 font-mono text-[11px] text-slate-500">${item.id}</td>
                  <td class="py-3 px-3">
                    <div class="flex items-center justify-center gap-1.5">
                      ${[
                        { code: 'P', label: 'Present', activeBg: 'bg-emerald-600 text-white shadow-xs' },
                        { code: 'A', label: 'Absent', activeBg: 'bg-rose-600 text-white shadow-xs' },
                        { code: 'L', label: 'Late', activeBg: 'bg-amber-500 text-white shadow-xs' },
                        { code: 'HD', label: 'Half Day', activeBg: 'bg-blue-600 text-white shadow-xs' },
                        { code: 'LV', label: 'Leave', activeBg: 'bg-purple-600 text-white shadow-xs' }
                      ].map(st => `
                        <button
                          type="button"
                          onclick="AttendanceView.setStatus(${idx}, '${st.code}')"
                          class="w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                            item.status === st.code
                              ? st.activeBg
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200/80'
                          }"
                          title="${st.label}"
                        >
                          ${st.code}
                        </button>
                      `).join('')}
                    </div>
                  </td>
                  <td class="py-3 px-4">
                    <input 
                      type="text" 
                      value="${item.remark}" 
                      placeholder="Add note..." 
                      onchange="AttendanceView.setRemark(${idx}, this.value)"
                      class="w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 placeholder-slate-300 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#E8752F]"
                    >
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderAnalytics() {
    const data = window.ERP_DATA.todayAttendance;
    return `
      <div class="space-y-5">
        
        <!-- Overall Trend & Low Attendance Alert -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          <div class="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
            <h3 class="font-bold text-slate-800 text-sm mb-1">Class-wise Today's Attendance Distribution</h3>
            <p class="text-xs text-slate-400 mb-4">Overall School Average: 94.6% (1,402 Present out of 1,482)</p>
            
            <div class="space-y-3">
              ${data.classWise.map(c => `
                <div>
                  <div class="flex items-center justify-between text-xs mb-1">
                    <span class="font-semibold text-slate-700">${c.class}</span>
                    <span class="font-bold ${c.pct >= 95 ? 'text-emerald-600' : 'text-amber-600'}">${c.pct}% (${c.present} Present / ${c.absent} Absent)</span>
                  </div>
                  <div class="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div class="h-full rounded-full ${c.pct >= 95 ? 'bg-emerald-500' : 'bg-amber-500'}" style="width: ${c.pct}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- CBSE <75% Low Attendance Action Panel -->
          <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 pb-3 border-b border-slate-100">
                <span class="p-1 rounded bg-rose-50 text-rose-600">
                  <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                </span>
                <div>
                  <h4 class="font-bold text-slate-800 text-sm">CBSE Retention Risk (&lt;75%)</h4>
                  <p class="text-[11px] text-slate-400">Requires formal warning notice</p>
                </div>
              </div>

              <div class="divide-y divide-slate-100 mt-2 text-xs">
                <div class="py-2.5">
                  <div class="flex justify-between font-semibold text-slate-800">
                    <span>Vihaan Verma</span>
                    <span class="text-rose-600 font-bold">73.5%</span>
                  </div>
                  <div class="text-[11px] text-slate-400">Class X-A • 14 Days Absent</div>
                </div>
                <div class="py-2.5">
                  <div class="flex justify-between font-semibold text-slate-800">
                    <span>Dev Malhotra</span>
                    <span class="text-rose-600 font-bold">71.8%</span>
                  </div>
                  <div class="text-[11px] text-slate-400">Class IX-B • Medical leave pending</div>
                </div>
                <div class="py-2.5">
                  <div class="flex justify-between font-semibold text-slate-800">
                    <span>Tanmay Bansal</span>
                    <span class="text-rose-600 font-bold">74.2%</span>
                  </div>
                  <div class="text-[11px] text-slate-400">Class XI-A • Regular unexcused late</div>
                </div>
              </div>
            </div>

            <button 
              onclick="Toast.success('Warning Notices Issued', 'Automated formal CBSE attendance warnings sent to 3 parents via registered WhatsApp and SMS')"
              class="w-full mt-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Dispatch CBSE Warning Notices
            </button>
          </div>

        </div>

      </div>
    `;
  }

  function setStatus(index, status) {
    attendanceList[index].status = status;
    refresh();
  }

  function setRemark(index, remark) {
    attendanceList[index].remark = remark;
  }

  function markAllPresent() {
    attendanceList.forEach(item => item.status = 'P');
    Toast.success('All Marked Present', 'Updated 12 students in Class X-A to Present status');
    refresh();
  }

  function saveAttendance() {
    const absentees = attendanceList.filter(s => s.status === 'A');
    Toast.success(
      'Attendance Saved Successfully', 
      `Recorded attendance for ${selectedClass}-${selectedSection}. Dispatched absentee SMS to ${absentees.length} parents.`
    );
  }

  function switchTab(tab) {
    activeTab = tab;
    refresh();
  }

  function onClassChange(val) {
    selectedClass = val;
    refresh();
  }

  function onSectionChange(val) {
    selectedSection = val;
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
    setStatus,
    setRemark,
    markAllPresent,
    saveAttendance,
    switchTab,
    onClassChange,
    onSectionChange
  };
})();
