// Sidebar Navigation Component
window.Sidebar = (function() {
  let isCollapsed = false;
  let isMobileOpen = false;

  const navGroups = [
    {
      title: "OVERVIEW",
      items: [
        { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" }
      ]
    },
    {
      title: "ACADEMICS",
      items: [
        { id: "students", label: "Students", icon: "graduation-cap", badge: "105+" },
        { id: "classes", label: "Classes & Sections", icon: "layers" },
        { id: "timetable", label: "Timetable", icon: "clock" },
        { id: "homework", label: "Homework & Study", icon: "book-open" }
      ]
    },
    {
      title: "FINANCE",
      items: [
        { id: "fees", label: "Fees & Collection", icon: "credit-card", badge: "₹38.4L", badgeColor: "emerald" },
        { id: "accounting", label: "Accounting & Cash", icon: "pie-chart" }
      ]
    },
    {
      title: "ATTENDANCE",
      items: [
        { id: "attendance", label: "Attendance Marking", icon: "calendar-check", badge: "94.6%", badgeColor: "orange" },
        { id: "attendance-analytics", label: "Attendance Analytics", icon: "activity" }
      ]
    },
    {
      title: "EXAMINATION",
      items: [
        { id: "examination", label: "Exams & Marks Entry", icon: "file-spreadsheet" },
        { id: "report-cards", label: "Report Cards", icon: "award", badge: "CBSE" }
      ]
    },
    {
      title: "PEOPLE",
      items: [
        { id: "teachers", label: "Teachers & Staff", icon: "briefcase" }
      ]
    },
    {
      title: "DOCUMENTS",
      items: [
        { id: "id-cards", label: "ID Cards Studio", icon: "contact-2" },
        { id: "certificates", label: "Certificates (TC/Char)", icon: "file-check" }
      ]
    },
    {
      title: "COMMUNICATION",
      items: [
        { id: "communication", label: "Notices & SMS", icon: "bell", badge: "4 New", badgeColor: "rose" }
      ]
    },
    {
      title: "SMART / AI",
      items: [
        { id: "ai-smart", label: "AI Insights & Papers", icon: "sparkles", badge: "AI Gen", badgeColor: "orange" },
        { id: "automation", label: "Automation Engine", icon: "cpu" }
      ]
    },
    {
      title: "ADMINISTRATION",
      items: [
        { id: "reports", label: "Reports & Analytics", icon: "bar-chart-3" },
        { id: "admin", label: "Settings & Matrix", icon: "settings" }
      ]
    }
  ];

  function render(activeNavId = 'dashboard') {
    const sidebarEl = document.getElementById('app-sidebar');
    if (!sidebarEl) return;

    sidebarEl.innerHTML = `
      <!-- Sidebar Header -->
      <div class="h-16 px-4 flex items-center justify-between border-b border-slate-200/80 shrink-0 bg-white">
        <div class="flex items-center gap-3 overflow-hidden cursor-pointer" onclick="App.navigate('dashboard')">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#E8752F] to-[#F97316] flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0">
            <span class="tracking-tight">S</span>
          </div>
          <div class="sidebar-text leading-tight truncate">
            <div class="font-bold text-slate-800 text-sm tracking-tight">Sanskaar ERP</div>
            <div class="text-[11px] font-medium text-slate-400 truncate">CBSE Affiliated • Est. 2008</div>
          </div>
        </div>
        
        <!-- Toggle button on desktop -->
        <button 
          id="sidebar-collapse-btn"
          class="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          onclick="Sidebar.toggleCollapse()"
          title="Collapse sidebar"
        >
          <i data-lucide="${isCollapsed ? 'chevrons-right' : 'chevrons-left'}" class="w-4 h-4"></i>
        </button>

        <!-- Close button on mobile -->
        <button 
          class="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          onclick="Sidebar.closeMobile()"
        >
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <!-- Quick Session Badge -->
      <div class="px-4 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between sidebar-text text-xs">
        <span class="text-slate-500 font-medium flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Academic Session
        </span>
        <span class="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">2026 - 2027</span>
      </div>

      <!-- Navigation Menu Groups -->
      <div class="flex-1 overflow-y-auto px-3 py-4 space-y-5 select-none">
        ${navGroups.map(group => `
          <div>
            <div class="px-3 mb-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase sidebar-text">
              ${group.title}
            </div>
            <div class="space-y-0.5">
              ${group.items.map(item => {
                const isActive = item.id === activeNavId;
                let badgeMarkup = '';
                if (item.badge) {
                  let badgeColors = 'bg-slate-100 text-slate-600';
                  if (item.badgeColor === 'emerald') badgeColors = 'bg-emerald-50 text-emerald-600 border border-emerald-200';
                  if (item.badgeColor === 'orange') badgeColors = 'bg-orange-50 text-[#E8752F] border border-orange-200 font-semibold';
                  if (item.badgeColor === 'rose') badgeColors = 'bg-rose-50 text-rose-600 border border-rose-200';
                  badgeMarkup = `<span class="sidebar-text text-[10px] font-medium px-1.5 py-0.5 rounded-full ${badgeColors} ml-auto">${item.badge}</span>`;
                }

                return `
                  <div class="relative group">
                    <button
                      onclick="App.navigate('${item.id}')"
                      class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-orange-50 text-[#E8752F] font-semibold shadow-xs border border-orange-200/60'
                          : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                      }"
                    >
                      <i data-lucide="${item.icon}" class="w-4 h-4 shrink-0 ${isActive ? 'text-[#E8752F]' : 'text-slate-400 group-hover:text-slate-600'}"></i>
                      <span class="sidebar-text truncate text-left flex-1">${item.label}</span>
                      ${badgeMarkup}
                    </button>

                    <!-- Collapsed Tooltip -->
                    <div class="sidebar-tooltip absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-md shadow-lg whitespace-nowrap z-50 pointer-events-none hidden">
                      ${item.label}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Sidebar Footer: System Status & Portal Switcher -->
      <div class="p-3 border-t border-slate-200/80 bg-slate-50/50 sidebar-text">
        <div class="p-2.5 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50/40 border border-orange-100 flex items-center justify-between">
          <div class="flex items-center gap-2 min-w-0">
            <div class="w-7 h-7 rounded-lg bg-orange-100 text-[#E8752F] flex items-center justify-center shrink-0">
              <i data-lucide="smartphone" class="w-4 h-4"></i>
            </div>
            <div class="truncate">
              <div class="text-xs font-semibold text-slate-800 leading-tight">Parent Portal</div>
              <div class="text-[10px] text-slate-500 truncate">Simulate Mobile View</div>
            </div>
          </div>
          <button 
            onclick="App.switchViewMode('parent')"
            class="px-2 py-1 text-xs font-semibold bg-[#E8752F] text-white rounded-md hover:bg-[#D46320] transition-colors shadow-2xs shrink-0"
          >
            Launch
          </button>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function toggleCollapse() {
    isCollapsed = !isCollapsed;
    const sidebarEl = document.getElementById('app-sidebar');
    const mainWrapper = document.getElementById('main-wrapper');

    if (sidebarEl) {
      if (isCollapsed) {
        sidebarEl.classList.add('w-20', 'sidebar-collapsed');
        sidebarEl.classList.remove('w-64', 'xl:w-72');
        document.querySelectorAll('.sidebar-text').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.sidebar-tooltip').forEach(el => el.classList.remove('hidden'));
      } else {
        sidebarEl.classList.remove('w-20', 'sidebar-collapsed');
        sidebarEl.classList.add('w-64', 'xl:w-72');
        document.querySelectorAll('.sidebar-text').forEach(el => el.classList.remove('hidden'));
        document.querySelectorAll('.sidebar-tooltip').forEach(el => el.classList.add('hidden'));
      }
    }
  }

  function toggleMobile() {
    isMobileOpen = !isMobileOpen;
    const sidebarEl = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('mobile-backdrop');

    if (sidebarEl && backdrop) {
      if (isMobileOpen) {
        sidebarEl.classList.remove('-translate-x-full');
        backdrop.classList.remove('hidden');
      } else {
        sidebarEl.classList.add('-translate-x-full');
        backdrop.classList.add('hidden');
      }
    }
  }

  function closeMobile() {
    isMobileOpen = false;
    const sidebarEl = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('mobile-backdrop');
    if (sidebarEl) sidebarEl.classList.add('-translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
  }

  return {
    render,
    toggleCollapse,
    toggleMobile,
    closeMobile
  };
})();
