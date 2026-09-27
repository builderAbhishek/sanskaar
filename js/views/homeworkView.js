// Homework Management & Study Materials View
window.HomeworkView = (function() {
  let activeTab = "homework"; // 'homework' | 'study-materials'

  function render(tab) {
    if (tab) activeTab = tab;
    const homework = window.ERP_DATA.homeworkList || [];
    const materials = window.ERP_DATA.studyMaterials || [];

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-bold text-slate-900">Homework & Study Resources</h1>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Class X-A Portal
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Assign daily homework, track submissions, evaluate students, and distribute digital curriculum.</p>
          </div>

          <div class="flex items-center gap-2">
            <div class="flex items-center p-1 bg-slate-100 rounded-xl">
              <button 
                onclick="HomeworkView.switchTab('homework')"
                class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'homework' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}"
              >
                Homework Tracker
              </button>
              <button 
                onclick="HomeworkView.switchTab('study-materials')"
                class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'study-materials' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}"
              >
                Study Materials (${materials.length})
              </button>
            </div>

            <button 
              onclick="Toast.info('New Homework', 'Opening assignment creator modal')"
              class="flex items-center gap-1.5 px-3.5 py-2 bg-[#E8752F] text-white rounded-xl text-xs font-semibold hover:bg-[#D46320] shadow-2xs"
            >
              <i data-lucide="plus" class="w-4 h-4"></i>
              <span>Assign Homework</span>
            </button>
          </div>
        </div>

        ${activeTab === 'homework' ? renderHomework(homework) : renderMaterials(materials)}

      </div>
    `;
  }

  function renderHomework(list) {
    return `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${list.map(h => {
          const submissionPct = Math.round((h.submitted / h.totalStudents) * 100);
          return `
            <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow flex flex-col justify-between hover:border-orange-200 transition-all">
              <div>
                <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                    ${h.subject}
                  </span>
                  <span class="text-xs text-slate-400 font-medium">Due: <strong class="text-slate-700">${h.dueDate}</strong></span>
                </div>

                <h3 class="font-bold text-slate-900 text-sm mt-3 leading-snug">${h.title}</h3>
                <p class="text-xs text-slate-500 mt-1.5 leading-relaxed">${h.description}</p>

                <div class="mt-4 pt-3 border-t border-slate-100 text-xs">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-slate-500 font-medium">Submissions</span>
                    <span class="font-bold text-slate-800">${h.submitted} of ${h.totalStudents} (${submissionPct}%)</span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div class="h-full rounded-full ${submissionPct >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}" style="width: ${submissionPct}%"></div>
                  </div>
                </div>
              </div>

              <div class="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span class="text-[11px] text-slate-400">Assigned by: <strong>${h.teacher}</strong></span>
                <button 
                  onclick="Toast.info('Submissions', 'Showing 38 student submitted answers for grading')"
                  class="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-colors"
                >
                  Evaluate Submissions
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderMaterials(materials) {
    return `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${materials.map(m => `
          <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow flex items-center justify-between gap-4">
            <div class="flex items-start gap-3.5 min-w-0">
              <div class="w-12 h-12 rounded-xl bg-orange-50 text-[#E8752F] flex items-center justify-center font-bold shrink-0">
                <i data-lucide="file-text" class="w-6 h-6"></i>
              </div>
              <div class="min-w-0">
                <h4 class="font-bold text-slate-900 text-sm truncate">${m.title}</h4>
                <div class="text-xs text-[#E8752F] font-semibold mt-0.5">${m.subject} • ${m.class}</div>
                <div class="text-[11px] text-slate-400 mt-1">${m.format} • ${m.downloads} Downloads • Uploaded ${m.date}</div>
              </div>
            </div>

            <button 
              onclick="Toast.success('Download Initiated', 'Downloading ${m.title}')"
              class="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors shrink-0"
              title="Download Material"
            >
              <i data-lucide="download" class="w-4 h-4"></i>
            </button>
          </div>
        `).join('')}
      </div>
    `;
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
    switchTab
  };
})();
