// Teachers & Staff Management View
window.TeachersView = (function() {
  let activeTab = "teachers"; // 'teachers' | 'staff'
  let selectedTeacherId = "TCH-002"; // Mrs. Sunita Rao

  function render(tab) {
    if (tab) activeTab = tab;
    const teachers = window.ERP_DATA.teachers || [];
    const staff = window.ERP_DATA.staff || [];

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-bold text-slate-900">Faculty & Staff Management</h1>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                ${teachers.length + staff.length} Total Staff
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Faculty directories, class assignments, biometric attendance, leaves, and salary structures.</p>
          </div>

          <!-- Tab Selector & Add Staff -->
          <div class="flex items-center gap-2">
            <div class="flex items-center p-1 bg-slate-100 rounded-xl">
              <button 
                onclick="TeachersView.switchTab('teachers')"
                class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'teachers' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}"
              >
                Teaching Faculty (${teachers.length})
              </button>
              <button 
                onclick="TeachersView.switchTab('staff')"
                class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'staff' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}"
              >
                Support Staff (${staff.length})
              </button>
            </div>

            <button 
              onclick="Toast.info('Add Staff', 'Open faculty recruitment form')"
              class="flex items-center gap-1.5 px-3.5 py-2 bg-[#E8752F] text-white rounded-xl text-xs font-semibold hover:bg-[#D46320] shadow-2xs"
            >
              <i data-lucide="user-plus" class="w-4 h-4"></i>
              <span>Add Staff</span>
            </button>
          </div>
        </div>

        ${activeTab === 'teachers' ? renderTeachersList(teachers) : renderStaffList(staff)}

      </div>
    `;
  }

  function renderTeachersList(teachers) {
    return `
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        ${teachers.map(t => `
          <div class="bg-white rounded-2xl border border-slate-200/80 p-5 card-shadow flex flex-col justify-between hover:border-orange-200 transition-all group">
            <div>
              <div class="flex items-start gap-3.5">
                <img src="${t.photo}" alt="${t.name}" class="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0">
                <div class="min-w-0">
                  <div class="font-bold text-slate-900 text-sm truncate group-hover:text-[#E8752F] transition-colors">${t.name}</div>
                  <div class="text-[11px] text-[#E8752F] font-semibold">${t.designation}</div>
                  <div class="text-[10px] text-slate-400 truncate">${t.department} • Exp: ${t.experience}</div>
                </div>
              </div>

              <!-- Badges & Subjects -->
              <div class="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div>
                  <span class="text-slate-400 block text-[10px] uppercase font-bold">Subjects Handled</span>
                  <div class="flex flex-wrap gap-1 mt-1">
                    ${t.subjects.map(sub => `
                      <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700">
                        ${sub}
                      </span>
                    `).join('')}
                  </div>
                </div>

                <div>
                  <span class="text-slate-400 block text-[10px] uppercase font-bold">Classes Assigned</span>
                  <div class="text-slate-700 font-semibold text-[11px] mt-0.5">
                    ${t.assignedClasses.join(', ')}
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span class="text-slate-400 block text-[9px] uppercase font-bold">Attendance</span>
                    <span class="font-bold text-emerald-600">${t.attendance}</span>
                  </div>
                  <div>
                    <span class="text-slate-400 block text-[9px] uppercase font-bold">Net Salary</span>
                    <span class="font-bold text-slate-900">₹${t.salary.toLocaleString('en-IN')}/mo</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Action Button -->
            <div class="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button 
                onclick="TeachersView.openTeacherDetails('${t.id}')"
                class="flex-1 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors text-center"
              >
                View Full Profile
              </button>
              <button 
                onclick="Toast.success('Salary Slip Dispatched', 'Generated digital salary slip for ${t.name}')"
                class="p-1.5 rounded-lg text-slate-400 hover:text-[#E8752F] hover:bg-orange-50 transition-colors"
                title="Generate Pay Slip"
              >
                <i data-lucide="file-text" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderStaffList(staff) {
    return `
      <div class="bg-white rounded-xl border border-slate-200/80 card-shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Staff ID</th>
                <th class="py-3 px-3">Full Name</th>
                <th class="py-3 px-3">Designation</th>
                <th class="py-3 px-3">Department</th>
                <th class="py-3 px-3">Contact</th>
                <th class="py-3 px-3">Attendance</th>
                <th class="py-3 px-3">Monthly Pay</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs">
              ${staff.map(st => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3 px-4 font-mono font-bold text-slate-600">${st.id}</td>
                  <td class="py-3 px-3 font-bold text-slate-900">${st.name}</td>
                  <td class="py-3 px-3 font-semibold text-slate-700">${st.designation}</td>
                  <td class="py-3 px-3 text-slate-500">${st.department}</td>
                  <td class="py-3 px-3 font-mono text-[11px] text-slate-600">${st.phone}</td>
                  <td class="py-3 px-3 font-bold text-emerald-600">${st.attendance}</td>
                  <td class="py-3 px-3 font-bold text-slate-900">₹${st.salary.toLocaleString('en-IN')}</td>
                  <td class="py-3 px-4 text-right">
                    <button 
                      onclick="Toast.success('Salary Slip Generated', 'Dispatched salary voucher for ${st.name}')"
                      class="px-2.5 py-1 text-xs font-semibold text-[#E8752F] hover:bg-orange-50 rounded-md transition-colors"
                    >
                      Pay Slip
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function openTeacherDetails(teacherId) {
    const t = window.ERP_DATA.teachers.find(x => x.id === teacherId) || window.ERP_DATA.teachers[0];
    Toast.info(t.name, `${t.designation} • ${t.qualification} • Joining: ${t.joiningDate}`);
  }

  function switchTab(tab) {
    activeTab = tab;
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
    switchTab,
    openTeacherDetails
  };
})();
