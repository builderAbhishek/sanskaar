// Top Navbar Component
window.Navbar = (function() {
  function render(breadcrumbTitle = 'Dashboard', breadcrumbParent = 'Overview') {
    const navbarEl = document.getElementById('app-navbar');
    if (!navbarEl) return;

    navbarEl.innerHTML = `
      <div class="h-16 px-4 md:px-6 flex items-center justify-between gap-4 border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-30">
        
        <!-- Left Section: Mobile Menu + Breadcrumbs -->
        <div class="flex items-center gap-3 min-w-0">
          <button 
            onclick="Sidebar.toggleMobile()" 
            class="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Toggle Menu"
          >
            <i data-lucide="menu" class="w-5 h-5"></i>
          </button>

          <div class="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>${breadcrumbParent}</span>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-300"></i>
            <span class="text-slate-800 font-semibold text-sm truncate">${breadcrumbTitle}</span>
          </div>
          <div class="sm:hidden text-slate-800 font-semibold text-base truncate">
            ${breadcrumbTitle}
          </div>
        </div>

        <!-- Center: Command Palette Trigger Search Box -->
        <div class="flex-1 max-w-md hidden md:block">
          <button 
            onclick="CommandPalette.open()" 
            class="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200/90 text-slate-400 text-xs transition-all group"
          >
            <div class="flex items-center gap-2">
              <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors"></i>
              <span class="text-slate-500 font-medium">Search students, fees, classes, or jump to...</span>
            </div>
            <kbd class="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-semibold text-slate-500 shadow-2xs">Ctrl K</kbd>
          </button>
        </div>

        <!-- Right Section: Session Picker, Quick Add, Notifications, User Profile -->
        <div class="flex items-center gap-2 md:gap-3 shrink-0">
          
          <!-- Mobile search icon -->
          <button 
            onclick="CommandPalette.open()"
            class="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            title="Search"
          >
            <i data-lucide="search" class="w-5 h-5"></i>
          </button>

          <!-- Academic Session Selector -->
          <div class="relative hidden xl:block">
            <select 
              id="academic-session-select"
              class="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 text-xs font-semibold text-slate-700 cursor-pointer hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#E8752F]"
              onchange="Toast.info('Session Switched', 'Viewing records for academic year ' + this.value)"
            >
              <option value="2026-2027" selected>Session 2026-27 (Active)</option>
              <option value="2025-2026">Session 2025-26 (Archived)</option>
              <option value="2024-2025">Session 2024-25 (Archived)</option>
            </select>
            <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"></i>
          </div>

          <!-- Quick Add Dropdown Button -->
          <div class="relative" id="quick-add-container">
            <button 
              onclick="Navbar.toggleQuickAdd()"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-[#E8752F] hover:bg-[#D46320] text-white rounded-lg text-xs font-semibold transition-colors shadow-2xs"
            >
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              <span class="hidden sm:inline">Quick Add</span>
              <i data-lucide="chevron-down" class="w-3 h-3 ml-0.5 opacity-80"></i>
            </button>

            <!-- Quick Add Dropdown Menu -->
            <div id="quick-add-menu" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-slide-down">
              <div class="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fast Actions</div>
              <button onclick="Navbar.quickAction('add-student')" class="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-orange-50 hover:text-[#E8752F] flex items-center gap-2.5 transition-colors">
                <i data-lucide="user-plus" class="w-4 h-4 text-slate-400"></i>
                <span>New Student Admission</span>
              </button>
              <button onclick="Navbar.quickAction('collect-fee')" class="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-orange-50 hover:text-[#E8752F] flex items-center gap-2.5 transition-colors">
                <i data-lucide="indian-rupee" class="w-4 h-4 text-slate-400"></i>
                <span>Collect Fee Payment</span>
              </button>
              <button onclick="Navbar.quickAction('mark-attendance')" class="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-orange-50 hover:text-[#E8752F] flex items-center gap-2.5 transition-colors">
                <i data-lucide="calendar-check" class="w-4 h-4 text-slate-400"></i>
                <span>Mark Attendance</span>
              </button>
              <button onclick="Navbar.quickAction('create-notice')" class="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-orange-50 hover:text-[#E8752F] flex items-center gap-2.5 transition-colors">
                <i data-lucide="bell" class="w-4 h-4 text-slate-400"></i>
                <span>Publish Circular / Notice</span>
              </button>
              <div class="border-t border-slate-100 my-1"></div>
              <button onclick="Navbar.quickAction('ai-paper')" class="w-full px-3 py-2 text-left text-xs text-[#E8752F] font-semibold hover:bg-orange-50 flex items-center gap-2.5 transition-colors">
                <i data-lucide="sparkles" class="w-4 h-4 text-[#E8752F]"></i>
                <span>Generate AI Question Paper</span>
              </button>
            </div>
          </div>

          <!-- Notification Bell -->
          <div class="relative" id="notifications-container">
            <button 
              onclick="Navbar.toggleNotifications()"
              class="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <i data-lucide="bell" class="w-5 h-5"></i>
              <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E8752F] ring-2 ring-white"></span>
            </button>

            <!-- Notifications Drawer Panel -->
            <div id="notifications-menu" class="hidden absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-slide-down">
              <div class="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h4 class="font-bold text-slate-800 text-sm">Notifications</h4>
                  <p class="text-[11px] text-slate-400">3 unread operational updates</p>
                </div>
                <button onclick="Toast.info('All Marked Read', 'All notifications cleared')" class="text-xs text-[#E8752F] font-semibold hover:underline">Mark all read</button>
              </div>
              <div class="max-h-72 overflow-y-auto divide-y divide-slate-100">
                <div class="p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                  <div class="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <div class="text-xs font-semibold text-slate-800">5 Students Below 75% Attendance</div>
                    <p class="text-[11px] text-slate-500 mt-0.5">Class X-A attendance risk alert triggered for CBSE compliance.</p>
                    <span class="text-[10px] text-slate-400 mt-1 block">15 mins ago</span>
                  </div>
                </div>
                <div class="p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                  <div class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <i data-lucide="check-circle" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <div class="text-xs font-semibold text-slate-800">Quarter 2 Fee Cleared</div>
                    <p class="text-[11px] text-slate-500 mt-0.5">Aarav Sharma paid ₹25,000 via UPI (Google Pay).</p>
                    <span class="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                  </div>
                </div>
                <div class="p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                  <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <i data-lucide="file-text" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <div class="text-xs font-semibold text-slate-800">Pre-Board Schedule Approved</div>
                    <p class="text-[11px] text-slate-500 mt-0.5">Examination Controller finalized Date Sheet for Class X & XII.</p>
                    <span class="text-[10px] text-slate-400 mt-1 block">3 hours ago</span>
                  </div>
                </div>
              </div>
              <div class="pt-2 px-4 border-t border-slate-100 text-center">
                <button onclick="App.navigate('communication')" class="text-xs font-semibold text-[#E8752F] hover:underline">View Notice Board</button>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div class="h-6 w-px bg-slate-200 hidden sm:block"></div>

          <!-- User Profile Dropdown -->
          <div class="relative" id="user-profile-container">
            <button 
              onclick="Navbar.toggleUserProfile()"
              class="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
                alt="Principal" 
                class="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200"
              />
              <div class="hidden md:block text-left">
                <div class="text-xs font-bold text-slate-800 leading-tight">Dr. Arvind Sharma</div>
                <div class="text-[10px] font-medium text-slate-400">Principal & Super Admin</div>
              </div>
              <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 hidden md:block"></i>
            </button>

            <!-- Profile Dropdown -->
            <div id="user-profile-menu" class="hidden absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-slide-down">
              <div class="px-4 py-2 border-b border-slate-100">
                <div class="font-bold text-sm text-slate-800">Dr. Arvind Sharma</div>
                <div class="text-xs text-slate-400">principal@sanskaarschool.edu.in</div>
                <span class="inline-block mt-1.5 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold">Super Admin Access</span>
              </div>
              
              <div class="py-1">
                <button onclick="App.navigate('admin')" class="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5">
                  <i data-lucide="settings" class="w-4 h-4 text-slate-400"></i>
                  <span>School Administration & Security</span>
                </button>
                <button onclick="App.switchViewMode('parent')" class="w-full px-4 py-2 text-left text-xs text-[#E8752F] font-semibold hover:bg-orange-50 flex items-center gap-2.5">
                  <i data-lucide="smartphone" class="w-4 h-4 text-[#E8752F]"></i>
                  <span>Switch to Parent Portal View</span>
                </button>
              </div>

              <div class="border-t border-slate-100 pt-1">
                <button onclick="Toast.info('Session Active', 'You are logged in as Principal & Super Admin')" class="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5">
                  <i data-lucide="log-out" class="w-4 h-4 text-rose-500"></i>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
      const qAdd = document.getElementById('quick-add-container');
      const notif = document.getElementById('notifications-container');
      const userProf = document.getElementById('user-profile-container');

      if (qAdd && !qAdd.contains(e.target)) {
        document.getElementById('quick-add-menu')?.classList.add('hidden');
      }
      if (notif && !notif.contains(e.target)) {
        document.getElementById('notifications-menu')?.classList.add('hidden');
      }
      if (userProf && !userProf.contains(e.target)) {
        document.getElementById('user-profile-menu')?.classList.add('hidden');
      }
    });
  }

  function toggleQuickAdd() {
    const menu = document.getElementById('quick-add-menu');
    if (menu) menu.classList.toggle('hidden');
  }

  function toggleNotifications() {
    const menu = document.getElementById('notifications-menu');
    if (menu) menu.classList.toggle('hidden');
  }

  function toggleUserProfile() {
    const menu = document.getElementById('user-profile-menu');
    if (menu) menu.classList.toggle('hidden');
  }

  function quickAction(type) {
    document.getElementById('quick-add-menu')?.classList.add('hidden');
    if (type === 'add-student') {
      window.ModalManager.open('modal-add-student');
    } else if (type === 'collect-fee') {
      window.ModalManager.open('modal-collect-fee');
    } else if (type === 'mark-attendance') {
      window.App.navigate('attendance');
    } else if (type === 'create-notice') {
      window.ModalManager.open('modal-create-notice');
    } else if (type === 'ai-paper') {
      window.App.navigate('ai-smart');
    }
  }

  return {
    render,
    toggleQuickAdd,
    toggleNotifications,
    toggleUserProfile,
    quickAction
  };
})();
