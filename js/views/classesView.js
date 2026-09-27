// Classes & Sections Academic View
window.ClassesView = (function() {
  function render() {
    const classes = [
      { name: "Class XII", stream: "Senior Secondary (Science & Commerce)", sections: ["A", "B"], enrolled: 96, room: "401-402", teacher: "Dr. Arvind Sharma", attendance: "96.0%" },
      { name: "Class XI", stream: "Senior Secondary (Science & Commerce)", sections: ["A", "B"], enrolled: 108, room: "403-404", teacher: "Mr. Rajesh Verma", attendance: "93.9%" },
      { name: "Class X", stream: "Secondary Board", sections: ["A", "B", "C"], enrolled: 132, room: "301-303", teacher: "Mrs. Sunita Rao", attendance: "96.3%" },
      { name: "Class IX", stream: "Secondary", sections: ["A", "B", "C"], enrolled: 128, room: "304-306", teacher: "Mrs. Priya Nambiar", attendance: "94.1%" },
      { name: "Class VIII", stream: "Middle Wing", sections: ["A", "B", "C"], enrolled: 135, room: "201-203", teacher: "Mrs. Ananya Sen", attendance: "97.1%" },
      { name: "Class VII", stream: "Middle Wing", sections: ["A", "B", "C"], enrolled: 129, room: "204-206", teacher: "Dr. Hemant Joshi", attendance: "95.5%" },
      { name: "Class VI", stream: "Middle Wing", sections: ["A", "B", "C"], enrolled: 134, room: "101-103", teacher: "Mr. Vikram Singh", attendance: "96.4%" },
      { name: "Primary Wing (I - V)", stream: "Foundation & Preparatory", sections: ["A", "B", "C"], enrolled: 566, room: "Junior Block", teacher: "Ms. Shalini Saxena (Headmistress)", attendance: "97.2%" },
      { name: "Pre-Primary (Nursery, KG)", stream: "Early Childhood Care", sections: ["A", "B"], enrolled: 54, room: "Activity Haven", teacher: "Mrs. Ritu Kapoor", attendance: "95.0%" }
    ];

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-bold text-slate-900">Classes, Sections & Wings</h1>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                14 Academic Grades
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Manage class rosters, section allocations, class teacher in-charges, and physical room assignments.</p>
          </div>

          <button 
            onclick="Toast.info('Create Class', 'Opening section creator dialog')"
            class="flex items-center gap-1.5 px-4 py-2 bg-[#E8752F] text-white rounded-xl text-xs font-semibold hover:bg-[#D46320] shadow-2xs transition-colors"
          >
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Add Class / Section</span>
          </button>
        </div>

        <!-- Class Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${classes.map(c => `
            <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow flex flex-col justify-between hover:border-orange-200 transition-all">
              <div>
                <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 class="font-bold text-slate-900 text-base">${c.name}</h3>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ${c.attendance} Attendance
                  </span>
                </div>

                <div class="text-xs text-slate-400 mt-1">${c.stream}</div>

                <div class="mt-4 space-y-2 text-xs">
                  <div class="flex justify-between text-slate-600">
                    <span>Active Sections:</span>
                    <div class="flex gap-1">
                      ${c.sections.map(s => `<span class="w-5 h-5 rounded bg-slate-100 font-bold text-slate-800 flex items-center justify-center text-[10px]">${s}</span>`).join('')}
                    </div>
                  </div>

                  <div class="flex justify-between text-slate-600">
                    <span>Total Strength:</span>
                    <span class="font-bold text-slate-900">${c.enrolled} Students</span>
                  </div>

                  <div class="flex justify-between text-slate-600">
                    <span>In-Charge / Class Teacher:</span>
                    <span class="font-semibold text-slate-800 truncate max-w-[160px] text-right">${c.teacher}</span>
                  </div>

                  <div class="flex justify-between text-slate-600">
                    <span>Rooms:</span>
                    <span class="font-mono text-slate-700 font-semibold">${c.room}</span>
                  </div>
                </div>
              </div>

              <div class="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                <button 
                  onclick="App.navigate('students')"
                  class="w-full py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs transition-colors"
                >
                  View Students
                </button>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  return {
    render
  };
})();
