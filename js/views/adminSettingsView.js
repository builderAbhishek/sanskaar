// School Administration, Settings & Security Permission Matrix View
window.AdminSettingsView = (function() {
  let activeTab = "profile"; // 'profile' | 'houses' | 'calendar' | 'permissions' | 'backup'

  // Permission Matrix State
  let permissions = [
    { module: "Student Records & Admissions", admin: true, principal: true, teacher: true, accountant: false, parent: false },
    { module: "Fee Collection & Invoices", admin: true, principal: true, teacher: false, accountant: true, parent: false },
    { module: "Attendance Marking & Logs", admin: true, principal: true, teacher: true, accountant: false, parent: false },
    { module: "Marks Entry & Report Cards", admin: true, principal: true, teacher: true, accountant: false, parent: false },
    { module: "Faculty Payroll & Accounting", admin: true, principal: true, teacher: false, accountant: true, parent: false },
    { module: "School Circulars & SMS Dispatch", admin: true, principal: true, teacher: true, accountant: false, parent: false },
    { module: "AI Question Paper Studio", admin: true, principal: true, teacher: true, accountant: false, parent: false },
    { module: "System Database Backup & Restore", admin: true, principal: false, teacher: false, accountant: false, parent: false }
  ];

  function render(tab) {
    if (tab) activeTab = tab;
    const school = window.ERP_DATA.schoolProfile;
    const houses = window.ERP_DATA.housePoints;

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-bold text-slate-900">Administration & Governance</h1>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-[#E8752F] border border-orange-200">
                Super Admin Access
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Configure institutional profiles, academic sessions, houses, holidays, and role permission matrices.</p>
          </div>

          <button 
            onclick="Toast.success('Settings Saved', 'Institutional configuration updated')"
            class="flex items-center gap-1.5 px-4 py-2 bg-[#E8752F] text-white rounded-xl text-xs font-semibold hover:bg-[#D46320] shadow-2xs transition-colors"
          >
            <i data-lucide="save" class="w-4 h-4"></i>
            <span>Save Changes</span>
          </button>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1">
          ${[
            { id: 'profile', label: 'School Profile', icon: 'building' },
            { id: 'houses', label: 'Houses & Leaderboard', icon: 'shield' },
            { id: 'calendar', label: 'Holidays & Calendar', icon: 'calendar' },
            { id: 'permissions', label: 'Role & Permission Matrix', icon: 'lock' },
            { id: 'backup', label: 'Data Security & Backup', icon: 'database' }
          ].map(t => `
            <button 
              onclick="AdminSettingsView.switchTab('${t.id}')"
              class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === t.id 
                  ? 'bg-orange-50 text-[#E8752F] border border-orange-200 shadow-2xs' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }"
            >
              <i data-lucide="${t.icon}" class="w-3.5 h-3.5"></i>
              <span>${t.label}</span>
            </button>
          `).join('')}
        </div>

        ${activeTab === 'profile' ? renderProfile(school) :
          activeTab === 'houses' ? renderHouses(houses) :
          activeTab === 'calendar' ? renderCalendar() :
          activeTab === 'permissions' ? renderPermissions() :
          renderBackup()}

      </div>
    `;
  }

  function renderProfile(school) {
    return `
      <div class="bg-white p-6 rounded-2xl border border-slate-200/80 card-shadow space-y-6">
        <h3 class="font-bold text-slate-900 text-base pb-3 border-b border-slate-100">Institutional Identity</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div>
            <label class="font-bold text-slate-700 block mb-1">Institution Legal Name</label>
            <input type="text" value="${school.name}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">Motto / Tagline</label>
            <input type="text" value="${school.tagline}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">CBSE Affiliation Number</label>
            <input type="text" value="CBSE/AFF/2130894" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 font-mono">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">School Code</label>
            <input type="text" value="${school.schoolCode}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 font-mono">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">Principal / Head of Institution</label>
            <input type="text" value="${school.principal}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">Official Helpline Email</label>
            <input type="text" value="${school.email}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800">
          </div>
          <div class="col-span-1 md:col-span-2">
            <label class="font-bold text-slate-700 block mb-1">Campus Physical Address</label>
            <input type="text" value="${school.address}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800">
          </div>
        </div>
      </div>
    `;
  }

  function renderHouses(houses) {
    return `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        ${houses.map(h => `
          <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow flex items-center justify-between">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-lg shadow-sm" style="background-color: ${h.color}">
                <i data-lucide="shield" class="w-6 h-6"></i>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm">${h.house}</h4>
                <div class="text-xs text-slate-500 font-medium">Captain: <strong>${h.captain}</strong></div>
                <div class="text-[11px] text-slate-400 mt-0.5">${h.badge}</div>
              </div>
            </div>

            <div class="text-right">
              <div class="text-xl font-black text-slate-900">${h.points.toLocaleString('en-IN')}</div>
              <span class="text-[10px] font-bold text-emerald-600">Points</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderCalendar() {
    const holidays = [
      { date: "02 Oct 2026", occasion: "Mahatma Gandhi Jayanti", type: "Gazetted National Holiday" },
      { date: "20-22 Oct 2026", occasion: "Dussehra / Vijayadashami Break", type: "Autumn Break (3 Days)" },
      { date: "08-12 Nov 2026", occasion: "Deepawali & Goverdhan Puja Vacation", type: "Festival Holiday" },
      { date: "25 Dec 2026", occasion: "Christmas Day", type: "Gazetted Holiday" },
      { date: "01-10 Jan 2027", occasion: "Winter Vacation (Pre-Primary to Class VIII)", type: "Seasonal Break" },
      { date: "26 Jan 2027", occasion: "Republic Day (Campus Flag Hoisting)", type: "National Festival" }
    ];

    return `
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow space-y-4">
        <h3 class="font-bold text-slate-900 text-base pb-3 border-b border-slate-100">Official CBSE School Calendar & Gazetted Holidays</h3>
        
        <div class="divide-y divide-slate-100 text-xs">
          ${holidays.map(h => `
            <div class="py-3 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-orange-50 text-[#E8752F] flex flex-col items-center justify-center font-bold text-[10px] shrink-0">
                  <i data-lucide="calendar" class="w-4 h-4"></i>
                </div>
                <div>
                  <div class="font-bold text-slate-800 text-sm">${h.occasion}</div>
                  <div class="text-slate-400 text-[11px]">${h.type}</div>
                </div>
              </div>
              <span class="font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">${h.date}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderPermissions() {
    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 card-shadow overflow-hidden">
        <div class="p-5 border-b border-slate-100">
          <h3 class="font-bold text-slate-900 text-sm">Role-Based Access Control (RBAC) Matrix</h3>
          <p class="text-xs text-slate-400 mt-0.5">Granular privileges across administrative, pedagogical, and guardian tiers.</p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-[11px]">
                <th class="p-3.5">Module / Feature Area</th>
                <th class="p-3.5 text-center">Super Admin</th>
                <th class="p-3.5 text-center">Principal</th>
                <th class="p-3.5 text-center">Teacher</th>
                <th class="p-3.5 text-center">Accountant</th>
                <th class="p-3.5 text-center">Parent Portal</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${permissions.map((p, idx) => `
                <tr class="hover:bg-slate-50/50">
                  <td class="p-3.5 font-bold text-slate-800">${p.module}</td>
                  <td class="p-3.5 text-center">
                    <input type="checkbox" ${p.admin ? 'checked' : ''} onchange="AdminSettingsView.togglePerm(${idx}, 'admin')" class="w-4 h-4 accent-[#E8752F]">
                  </td>
                  <td class="p-3.5 text-center">
                    <input type="checkbox" ${p.principal ? 'checked' : ''} onchange="AdminSettingsView.togglePerm(${idx}, 'principal')" class="w-4 h-4 accent-[#E8752F]">
                  </td>
                  <td class="p-3.5 text-center">
                    <input type="checkbox" ${p.teacher ? 'checked' : ''} onchange="AdminSettingsView.togglePerm(${idx}, 'teacher')" class="w-4 h-4 accent-[#E8752F]">
                  </td>
                  <td class="p-3.5 text-center">
                    <input type="checkbox" ${p.accountant ? 'checked' : ''} onchange="AdminSettingsView.togglePerm(${idx}, 'accountant')" class="w-4 h-4 accent-[#E8752F]">
                  </td>
                  <td class="p-3.5 text-center">
                    <input type="checkbox" ${p.parent ? 'checked' : ''} onchange="AdminSettingsView.togglePerm(${idx}, 'parent')" class="w-4 h-4 accent-[#E8752F]">
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderBackup() {
    return `
      <div class="bg-white p-6 rounded-2xl border border-slate-200/80 card-shadow space-y-5">
        <div>
          <h3 class="font-bold text-slate-900 text-sm">Disaster Recovery & Encrypted Snapshots</h3>
          <p class="text-xs text-slate-400 mt-0.5">Automated AES-256 encrypted backups stored across geo-redundant Indian cloud data centers.</p>
        </div>

        <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
          <div>
            <div class="font-bold text-emerald-800">Last Automated Backup: Today, 03:00 AM</div>
            <div class="text-emerald-600 mt-0.5">Size: 412 MB • Integrity Check: 100% Passed • Verified</div>
          </div>
          <button 
            onclick="Toast.success('Snapshot Generated', 'Manual snapshot generated in 2.4s')"
            class="px-3.5 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700"
          >
            Create Snapshot Now
          </button>
        </div>
      </div>
    `;
  }

  function togglePerm(idx, role) {
    permissions[idx][role] = !permissions[idx][role];
    Toast.info('Permission Updated', `${permissions[idx].module} access changed for ${role}`);
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
    togglePerm
  };
})();
