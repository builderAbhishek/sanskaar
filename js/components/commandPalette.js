// Command Palette Component (Ctrl+K / Cmd+K)
window.CommandPalette = (function() {
  let activeIndex = 0;
  let filteredItems = [];

  const commands = [
    // Views
    { type: 'Page', title: 'Dashboard', icon: 'layout-dashboard', action: () => window.App.navigate('dashboard') },
    { type: 'Page', title: 'Student Directory', icon: 'users', action: () => window.App.navigate('students') },
    { type: 'Page', title: 'Fee Management & Collection', icon: 'credit-card', action: () => window.App.navigate('fees') },
    { type: 'Page', title: 'Student Attendance Marking', icon: 'calendar-check', action: () => window.App.navigate('attendance') },
    { type: 'Page', title: 'Examinations & Report Cards', icon: 'award', action: () => window.App.navigate('examination') },
    { type: 'Page', title: 'Interactive Weekly Timetable', icon: 'clock', action: () => window.App.navigate('timetable') },
    { type: 'Page', title: 'Digital ID Card Studio', icon: 'contact-2', action: () => window.App.navigate('id-cards') },
    { type: 'Page', title: 'Official Certificate Generator (TC/Character)', icon: 'file-check-2', action: () => window.App.navigate('certificates') },
    { type: 'Page', title: 'Faculty & Staff Directory', icon: 'briefcase', action: () => window.App.navigate('teachers') },
    { type: 'Page', title: 'Homework & Study Materials', icon: 'book-open', action: () => window.App.navigate('homework') },
    { type: 'Page', title: 'School Notices & Circulars', icon: 'bell', action: () => window.App.navigate('communication') },
    { type: 'Page', title: 'Accounting & Cash Flow Ledger', icon: 'pie-chart', action: () => window.App.navigate('accounting') },
    { type: 'Page', title: 'School Administration & Session Settings', icon: 'building-2', action: () => window.App.navigate('admin') },
    { type: 'Page', title: 'Analytics & Compliance Reports', icon: 'bar-chart-3', action: () => window.App.navigate('reports') },
    { type: 'Page', title: 'AI Question Paper & Insights Generator', icon: 'sparkles', action: () => window.App.navigate('ai-smart') },
    { type: 'Page', title: 'School Automation Rules & SMS Schedulers', icon: 'cpu', action: () => window.App.navigate('automation') },
    { type: 'Page', title: 'Parent Portal View', icon: 'smartphone', action: () => window.App.switchViewMode('parent') },

    // Actions
    { type: 'Action', title: 'Add New Student Admission', icon: 'user-plus', action: () => window.ModalManager.open('modal-add-student') },
    { type: 'Action', title: 'Collect Fee Payment (Cash/UPI/NEFT)', icon: 'indian-rupee', action: () => window.ModalManager.open('modal-collect-fee') },
    { type: 'Action', title: 'Mark Class Attendance', icon: 'check-circle-2', action: () => window.App.navigate('attendance') },
    { type: 'Action', title: 'Create School Notice / Circular', icon: 'message-square', action: () => window.ModalManager.open('modal-create-notice') },
    { type: 'Action', title: 'Generate AI Question Paper', icon: 'file-text', action: () => { window.App.navigate('ai-smart'); } },
    { type: 'Action', title: 'Print Aarav Sharma (X-A) CBSE Report Card', icon: 'printer', action: () => window.App.openReportCard('STU-2026-001') }
  ];

  function init() {
    // Keyboard shortcut listener
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        open();
      }
    });

    const searchInput = document.getElementById('palette-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => filter(e.target.value));
      searchInput.addEventListener('keydown', handleKeyNav);
    }
  }

  function open() {
    const modal = document.getElementById('command-palette-modal');
    if (!modal) return;
    window.ModalManager.open('command-palette-modal');
    const input = document.getElementById('palette-search-input');
    if (input) {
      input.value = '';
      input.focus();
    }
    filter('');
  }

  function close() {
    window.ModalManager.close('command-palette-modal');
  }

  function filter(query) {
    const q = query.trim().toLowerCase();
    activeIndex = 0;

    let items = [...commands];

    // Add search hits from mock students if query is present
    if (q.length >= 2 && window.ERP_DATA && window.ERP_DATA.students) {
      const studentHits = window.ERP_DATA.students
        .filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.class.toLowerCase().includes(q))
        .slice(0, 4)
        .map(s => ({
          type: 'Student',
          title: `${s.name} (${s.class}-${s.section}) • Roll ${s.rollNo}`,
          subtitle: `ID: ${s.id} • Fee: ${s.feeStatus} • Att: ${s.attendancePct}%`,
          icon: 'user',
          action: () => {
            window.App.viewStudentProfile(s.id);
          }
        }));
      items = [...studentHits, ...items];
    }

    if (q) {
      filteredItems = items.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.type.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q))
      );
    } else {
      filteredItems = items.slice(0, 8);
    }

    renderList();
  }

  function renderList() {
    const listContainer = document.getElementById('palette-results-list');
    if (!listContainer) return;

    if (filteredItems.length === 0) {
      listContainer.innerHTML = `
        <div class="py-12 text-center text-slate-400">
          <svg class="w-10 h-10 mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <p class="text-sm font-medium">No results found</p>
          <p class="text-xs text-slate-400 mt-0.5">Try searching for "Student", "Fee", "Attendance", or "AI"</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = filteredItems.map((item, idx) => {
      const isSelected = idx === activeIndex;
      const typeBg = item.type === 'Action' ? 'bg-orange-50 text-[#E8752F] border-orange-200' :
                     item.type === 'Student' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' :
                     'bg-slate-100 text-slate-600 border-slate-200';
      return `
        <div 
          class="flex items-center justify-between px-3.5 py-2.5 rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-orange-50/80 text-[#E8752F]' : 'hover:bg-slate-50 text-slate-700'}"
          onclick="CommandPalette.select(${idx})"
          onmouseenter="CommandPalette.setActive(${idx})"
        >
          <div class="flex items-center gap-3 min-w-0">
            <span class="w-7 h-7 rounded-md flex items-center justify-center shrink-0 border text-xs font-semibold ${typeBg}">
              ${item.type === 'Student' ? 'STU' : item.type === 'Action' ? 'ACT' : 'NAV'}
            </span>
            <div class="min-w-0">
              <div class="text-sm font-medium truncate ${isSelected ? 'text-[#E8752F]' : 'text-slate-800'}">${item.title}</div>
              ${item.subtitle ? `<div class="text-xs text-slate-400 truncate">${item.subtitle}</div>` : ''}
            </div>
          </div>
          <div class="text-xs text-slate-400 shrink-0 flex items-center gap-1.5 ml-2">
            <span>${item.type}</span>
            <svg class="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>
      `;
    }).join('');
  }

  function handleKeyNav(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % filteredItems.length;
      renderList();
      scrollActiveIntoView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
      renderList();
      scrollActiveIntoView();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[activeIndex]) {
        select(activeIndex);
      }
    }
  }

  function scrollActiveIntoView() {
    const list = document.getElementById('palette-results-list');
    if (!list) return;
    const items = list.children;
    if (items[activeIndex]) {
      items[activeIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  function setActive(idx) {
    activeIndex = idx;
    const list = document.getElementById('palette-results-list');
    if (!list) return;
    Array.from(list.children).forEach((child, i) => {
      if (i === idx) {
        child.classList.add('bg-orange-50/80', 'text-[#E8752F]');
        child.classList.remove('hover:bg-slate-50', 'text-slate-700');
      } else {
        child.classList.remove('bg-orange-50/80', 'text-[#E8752F]');
        child.classList.add('hover:bg-slate-50', 'text-slate-700');
      }
    });
  }

  function select(idx) {
    if (filteredItems[idx]) {
      close();
      setTimeout(() => {
        filteredItems[idx].action();
      }, 100);
    }
  }

  return {
    init,
    open,
    close,
    setActive,
    select
  };
})();
