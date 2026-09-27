// Interactive Weekly Timetable Grid View
window.TimetableView = (function() {
  let timetableMode = "class"; // 'class' | 'teacher'
  let selectedClass = "Class X-A";
  let selectedTeacher = "Mrs. Sunita Rao";

  const colorTagMap = {
    math: "bg-blue-50/80 border-blue-200 text-blue-900",
    science: "bg-orange-50/80 border-orange-200 text-orange-950",
    lang: "bg-purple-50/80 border-purple-200 text-purple-900",
    social: "bg-amber-50/80 border-amber-200 text-amber-950",
    tech: "bg-indigo-50/80 border-indigo-200 text-indigo-900",
    sports: "bg-emerald-50/80 border-emerald-200 text-emerald-900",
    library: "bg-teal-50/80 border-teal-200 text-teal-900",
    arts: "bg-rose-50/80 border-rose-200 text-rose-900",
    club: "bg-slate-100 border-slate-200 text-slate-800",
    break: "bg-slate-50 border-dashed border-slate-200 text-slate-400"
  };

  function render() {
    const data = window.ERP_DATA.timetableClassX;
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header & Toolbar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow no-print">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-bold text-slate-900">Academic Timetable Matrix</h1>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                8 Periods / Day
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Master schedule for instructional periods, lab practicals, assemblies, and club activities.</p>
          </div>

          <div class="flex items-center gap-2">
            <button 
              onclick="window.print()"
              class="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold shadow-2xs transition-colors"
            >
              <i data-lucide="printer" class="w-4 h-4"></i>
              <span>Print Timetable</span>
            </button>
            <button 
              onclick="Toast.info('Edit Mode Active', 'Click any subject cell to swap or edit timetable allocation')"
              class="flex items-center gap-2 px-4 py-2 bg-[#E8752F] hover:bg-[#D46320] text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
            >
              <i data-lucide="calendar" class="w-4 h-4"></i>
              <span>Edit Allocation</span>
            </button>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="bg-white p-4 rounded-xl border border-slate-200/80 card-shadow no-print flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-3">
            
            <!-- View Mode Switch -->
            <div class="flex items-center p-1 bg-slate-100 rounded-lg">
              <button 
                onclick="TimetableView.setMode('class')"
                class="px-3 py-1 text-xs font-semibold rounded-md transition-all ${timetableMode === 'class' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}"
              >
                Class Schedule
              </button>
              <button 
                onclick="TimetableView.setMode('teacher')"
                class="px-3 py-1 text-xs font-semibold rounded-md transition-all ${timetableMode === 'teacher' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}"
              >
                Teacher Schedule
              </button>
            </div>

            <!-- Class or Teacher Selector -->
            ${timetableMode === 'class' ? `
              <div>
                <select 
                  class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white"
                  onchange="TimetableView.setClass(this.value)"
                >
                  <option value="Class X-A" selected>Class X - Section A (Room 304)</option>
                  <option value="Class X-B">Class X - Section B (Room 305)</option>
                  <option value="Class IX-A">Class IX - Section A (Room 201)</option>
                  <option value="Class XII-A">Class XII - Science (Room 401)</option>
                </select>
              </div>
            ` : `
              <div>
                <select 
                  class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white"
                  onchange="TimetableView.setTeacher(this.value)"
                >
                  ${window.ERP_DATA.teachers.map(t => `
                    <option value="${t.name}">${t.name} (${t.department})</option>
                  `).join('')}
                </select>
              </div>
            `}

            <div class="text-xs text-slate-400 pl-2 hidden md:block">
              Class Teacher: <strong class="text-slate-700 font-semibold">Mrs. Sunita Rao</strong> • Room 304
            </div>

          </div>

          <!-- Color Legend -->
          <div class="flex items-center gap-2 text-[10px] text-slate-500 overflow-x-auto">
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-blue-500"></span> Math</span>
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-orange-500"></span> Science</span>
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-indigo-500"></span> AI/IT</span>
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-purple-500"></span> English</span>
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-emerald-500"></span> Sports</span>
          </div>
        </div>

        <!-- Weekly Timetable Grid Table -->
        <div id="printable-document" class="bg-white rounded-2xl border border-slate-200/80 card-shadow overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr class="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-600">
                  <th class="p-3 w-28 text-center border-r border-slate-200">Day / Period</th>
                  <th class="p-2.5 text-center border-r border-slate-200">
                    <div>P1</div>
                    <div class="text-[10px] font-normal text-slate-400">08:00 - 08:45</div>
                  </th>
                  <th class="p-2.5 text-center border-r border-slate-200">
                    <div>P2</div>
                    <div class="text-[10px] font-normal text-slate-400">08:45 - 09:30</div>
                  </th>
                  <th class="p-2 text-center bg-amber-50/50 border-r border-slate-200 w-16">
                    <div class="text-[9px] font-bold text-amber-700 uppercase rotate-0">Assembly</div>
                    <div class="text-[8px] text-amber-600">09:30</div>
                  </th>
                  <th class="p-2.5 text-center border-r border-slate-200">
                    <div>P3</div>
                    <div class="text-[10px] font-normal text-slate-400">09:50 - 10:35</div>
                  </th>
                  <th class="p-2.5 text-center border-r border-slate-200">
                    <div>P4</div>
                    <div class="text-[10px] font-normal text-slate-400">10:35 - 11:20</div>
                  </th>
                  <th class="p-2 text-center bg-emerald-50/50 border-r border-slate-200 w-16">
                    <div class="text-[9px] font-bold text-emerald-700 uppercase">Recess</div>
                    <div class="text-[8px] text-emerald-600">11:20</div>
                  </th>
                  <th class="p-2.5 text-center border-r border-slate-200">
                    <div>P5</div>
                    <div class="text-[10px] font-normal text-slate-400">11:55 - 12:40</div>
                  </th>
                  <th class="p-2.5 text-center border-r border-slate-200">
                    <div>P6</div>
                    <div class="text-[10px] font-normal text-slate-400">12:40 - 01:25</div>
                  </th>
                  <th class="p-2.5 text-center">
                    <div>P7</div>
                    <div class="text-[10px] font-normal text-slate-400">01:25 - 02:10</div>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-xs">
                ${days.map(day => {
                  const schedule = data.schedule[day] || [];
                  return `
                    <tr class="hover:bg-slate-50/40 transition-colors">
                      <td class="p-3 font-bold text-slate-800 text-center bg-slate-50/60 border-r border-slate-200">
                        ${day}
                      </td>

                      <!-- Period 1 -->
                      <td class="p-1.5 border-r border-slate-200">
                        ${renderSlot(schedule[0])}
                      </td>

                      <!-- Period 2 -->
                      <td class="p-1.5 border-r border-slate-200">
                        ${renderSlot(schedule[1])}
                      </td>

                      <!-- Assembly Break Column -->
                      <td class="p-1 text-center bg-amber-50/30 border-r border-slate-200 text-[10px] text-amber-800/80 font-medium">
                        Prayer
                      </td>

                      <!-- Period 3 -->
                      <td class="p-1.5 border-r border-slate-200">
                        ${renderSlot(schedule[2])}
                      </td>

                      <!-- Period 4 -->
                      <td class="p-1.5 border-r border-slate-200">
                        ${renderSlot(schedule[3])}
                      </td>

                      <!-- Recess Lunch Column -->
                      <td class="p-1 text-center bg-emerald-50/30 border-r border-slate-200 text-[10px] text-emerald-800/80 font-medium">
                        Lunch
                      </td>

                      <!-- Period 5 -->
                      <td class="p-1.5 border-r border-slate-200">
                        ${renderSlot(schedule[4])}
                      </td>

                      <!-- Period 6 -->
                      <td class="p-1.5 border-r border-slate-200">
                        ${renderSlot(schedule[5])}
                      </td>

                      <!-- Period 7 -->
                      <td class="p-1.5">
                        ${renderSlot(schedule[6])}
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

  function renderSlot(slot) {
    if (!slot || slot.subject === '-') {
      return `
        <div class="h-16 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-300 text-[10px]">
          Free Slot
        </div>
      `;
    }

    const tagClass = colorTagMap[slot.tag] || 'bg-slate-50 border-slate-200 text-slate-800';

    return `
      <div 
        onclick="Toast.info('Period Slot', '${slot.subject} with ${slot.teacher} in ${slot.room}')"
        class="h-16 p-2 rounded-xl border ${tagClass} cursor-pointer hover:shadow-xs hover:scale-[1.02] transition-all flex flex-col justify-between"
      >
        <div class="font-bold text-xs truncate leading-tight">${slot.subject}</div>
        <div class="text-[10px] opacity-85 truncate">${slot.teacher}</div>
        <div class="flex items-center justify-between text-[9px] opacity-75 font-mono pt-0.5">
          <span>${slot.room}</span>
          <i data-lucide="edit-3" class="w-2.5 h-2.5 opacity-40"></i>
        </div>
      </div>
    `;
  }

  function setMode(mode) {
    timetableMode = mode;
    refresh();
  }

  function setClass(cls) {
    selectedClass = cls;
    refresh();
  }

  function setTeacher(t) {
    selectedTeacher = t;
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
    setMode,
    setClass,
    setTeacher
  };
})();
