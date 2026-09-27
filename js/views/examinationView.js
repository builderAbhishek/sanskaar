// Examination Management, Marks Entry & Results View
window.ExaminationView = (function() {
  let activeTab = "marks-entry"; // 'schedule' | 'marks-entry' | 'results'
  let selectedExam = "EXAM-2026-01";
  let selectedClass = "Class X";
  let selectedSubject = "Mathematics";

  // Mock marks sheet for Class X-A
  let marksSheet = [
    { id: "STU-2026-001", roll: "01", name: "Aarav Sharma", theory: 77, internal: 20, total: 97, grade: "A1" },
    { id: "STU-2026-002", roll: "02", name: "Diya Patel", theory: 72, internal: 19, total: 91, grade: "A1" },
    { id: "STU-2026-003", roll: "03", name: "Vihaan Verma", theory: 54, internal: 16, total: 70, grade: "B2" },
    { id: "STU-2026-004", roll: "04", name: "Ananya Gupta", theory: 68, internal: 18, total: 86, grade: "A2" },
    { id: "STU-2026-005", roll: "05", name: "Rohan Mehra", theory: 61, internal: 17, total: 78, grade: "B1" },
    { id: "STU-2026-006", roll: "06", name: "Ishaan Joshi", theory: 45, internal: 15, total: 60, grade: "C1" },
    { id: "STU-2026-007", roll: "07", name: "Priya Nair", theory: 74, internal: 19, total: 93, grade: "A1" },
    { id: "STU-2026-008", roll: "08", name: "Kabir Singh", theory: 66, internal: 18, total: 84, grade: "A2" }
  ];

  function render(tab) {
    if (tab) activeTab = tab;

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header & Nav Tabs -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-bold text-slate-900">Examinations & Assessments</h1>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                CBSE Pattern 2026-27
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Manage exam schedules, enter theory/internal marks, and publish official CBSE report cards.</p>
          </div>

          <div class="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button 
              onclick="ExaminationView.switchTab('schedule')"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'schedule' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}"
            >
              Exam Schedule
            </button>
            <button 
              onclick="ExaminationView.switchTab('marks-entry')"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'marks-entry' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}"
            >
              Marks Entry
            </button>
            <button 
              onclick="ExaminationView.switchTab('results')"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'results' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}"
            >
              Rankings & Results
            </button>
          </div>
        </div>

        ${activeTab === 'marks-entry' ? renderMarksEntry() : activeTab === 'schedule' ? renderSchedule() : renderResults()}

      </div>
    `;
  }

  function renderMarksEntry() {
    return `
      <!-- Subject & Class Selectors -->
      <div class="bg-white p-4 rounded-xl border border-slate-200/80 card-shadow space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-3">
            <div>
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Assessment</label>
              <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800">
                <option>Periodic Test 2 (Mid-Term) - Max 80 Th + 20 Int</option>
                <option>Term 1 Half-Yearly (Completed)</option>
                <option>Pre-Board Examination 1</option>
              </select>
            </div>

            <div>
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Class</label>
              <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800">
                <option>Class X - Section A</option>
                <option>Class X - Section B</option>
                <option>Class IX - Section A</option>
              </select>
            </div>

            <div>
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Subject</label>
              <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800">
                <option>041 - Mathematics (Standard)</option>
                <option>086 - Science (Phy/Chem/Bio)</option>
                <option>184 - English Language & Lit</option>
                <option>087 - Social Science</option>
                <option>417 - Artificial Intelligence</option>
              </select>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button 
              onclick="Toast.info('Auto Calculated', 'Computed aggregate grades based on CBSE A1-E grading scale')"
              class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Recompute Grades
            </button>
            <button 
              onclick="ExaminationView.saveMarks()"
              class="px-4 py-2 bg-[#E8752F] hover:bg-[#D46320] text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <i data-lucide="save" class="w-4 h-4"></i>
              <span>Save & Publish Marks</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Marks Entry Table -->
      <div class="bg-white rounded-xl border border-slate-200/80 card-shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Roll</th>
                <th class="py-3 px-3">Student Name</th>
                <th class="py-3 px-3">Student ID</th>
                <th class="py-3 px-3 text-center">Theory (Max 80)</th>
                <th class="py-3 px-3 text-center">Internal / Lab (Max 20)</th>
                <th class="py-3 px-3 text-center">Total (Max 100)</th>
                <th class="py-3 px-3 text-center">CBSE Grade</th>
                <th class="py-3 px-4 text-right">Report Card</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs">
              ${marksSheet.map((s, idx) => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3 px-4 font-mono font-bold text-slate-600">${s.roll}</td>
                  <td class="py-3 px-3 font-bold text-slate-800">${s.name}</td>
                  <td class="py-3 px-3 font-mono text-[11px] text-slate-500">${s.id}</td>
                  <td class="py-3 px-3 text-center">
                    <input 
                      type="number" 
                      min="0" 
                      max="80" 
                      value="${s.theory}" 
                      onchange="ExaminationView.updateTheory(${idx}, this.value)"
                      class="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-center font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#E8752F]"
                    >
                  </td>
                  <td class="py-3 px-3 text-center">
                    <input 
                      type="number" 
                      min="0" 
                      max="20" 
                      value="${s.internal}" 
                      onchange="ExaminationView.updateInternal(${idx}, this.value)"
                      class="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-center font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#E8752F]"
                    >
                  </td>
                  <td class="py-3 px-3 text-center font-bold text-sm text-slate-900">${s.total}</td>
                  <td class="py-3 px-3 text-center">
                    <span class="px-2 py-0.5 rounded font-bold text-[11px] ${s.total >= 90 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : s.total >= 75 ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-700'}">
                      ${s.grade}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right">
                    <button 
                      onclick="App.openReportCard('${s.id}')"
                      class="px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                    >
                      View Report Card
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

  function renderSchedule() {
    const list = window.ERP_DATA.exams;
    return `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        ${list.map(exam => `
          <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                <span class="text-xs font-mono text-slate-400 font-bold">${exam.id}</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${exam.status.includes('Completed') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-orange-50 text-[#E8752F] border border-orange-200'}">
                  ${exam.status}
                </span>
              </div>
              <h3 class="font-bold text-slate-900 text-sm mt-3 leading-snug">${exam.title}</h3>
              <div class="mt-3 space-y-2 text-xs text-slate-500">
                <div class="flex items-center gap-2">
                  <i data-lucide="calendar" class="w-4 h-4 text-slate-400"></i>
                  <span>${exam.startDate} to ${exam.endDate}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i data-lucide="users" class="w-4 h-4 text-slate-400"></i>
                  <span>${exam.classes}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i data-lucide="book-open" class="w-4 h-4 text-slate-400"></i>
                  <span>${exam.totalSubjects} Subjects • ${exam.maxMarks} Max Marks</span>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100 mt-4 flex items-center gap-2">
              <button onclick="Toast.info('Date Sheet Download', 'Downloading official CBSE date sheet PDF')" class="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors">
                Download Date Sheet
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderResults() {
    return `
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 class="font-bold text-slate-800 text-sm">Class X-A Board Pre-Trial Leaderboard</h3>
            <p class="text-xs text-slate-400">Class Pass Percentage: 100% • Class Average: 84.8%</p>
          </div>
          <button onclick="App.openReportCard('STU-2026-001')" class="px-3.5 py-1.5 bg-[#E8752F] text-white rounded-lg text-xs font-semibold hover:bg-[#D46320]">
            Print Class Topper Marksheet
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="p-4 rounded-xl bg-amber-50/60 border border-amber-200 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-amber-400 text-white flex items-center justify-center font-bold text-lg">1</div>
            <div>
              <div class="font-bold text-slate-900 text-sm">Aarav Sharma</div>
              <div class="text-xs text-amber-800 font-semibold">93.3% • 9.8 CGPA (Rank #1)</div>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-slate-100/80 border border-slate-200 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-slate-400 text-white flex items-center justify-center font-bold text-lg">2</div>
            <div>
              <div class="font-bold text-slate-900 text-sm">Diya Patel</div>
              <div class="text-xs text-slate-700 font-semibold">91.2% • 9.4 CGPA (Rank #2)</div>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-orange-50/60 border border-orange-200 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#E8752F] text-white flex items-center justify-center font-bold text-lg">3</div>
            <div>
              <div class="font-bold text-slate-900 text-sm">Priya Nair</div>
              <div class="text-xs text-[#E8752F] font-semibold">89.5% • 9.2 CGPA (Rank #3)</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function updateTheory(idx, val) {
    const num = Math.min(80, Math.max(0, parseInt(val) || 0));
    marksSheet[idx].theory = num;
    marksSheet[idx].total = num + marksSheet[idx].internal;
    marksSheet[idx].grade = computeGrade(marksSheet[idx].total);
    refresh();
  }

  function updateInternal(idx, val) {
    const num = Math.min(20, Math.max(0, parseInt(val) || 0));
    marksSheet[idx].internal = num;
    marksSheet[idx].total = marksSheet[idx].theory + num;
    marksSheet[idx].grade = computeGrade(marksSheet[idx].total);
    refresh();
  }

  function computeGrade(total) {
    if (total >= 91) return "A1";
    if (total >= 81) return "A2";
    if (total >= 71) return "B1";
    if (total >= 61) return "B2";
    if (total >= 51) return "C1";
    if (total >= 41) return "C2";
    if (total >= 33) return "D";
    return "E";
  }

  function saveMarks() {
    Toast.success('Marks Saved & Published', 'Mathematics marks recorded for Class X-A. Results published on Parent Portal.');
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
    updateTheory,
    updateInternal,
    saveMarks,
    switchTab
  };
})();
