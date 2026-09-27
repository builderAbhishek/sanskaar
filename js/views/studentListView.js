// Student Management - Directory View
window.StudentListView = (function() {
  let filterClass = 'All';
  let filterSection = 'All';
  let filterFee = 'All';
  let searchQuery = '';
  let currentPage = 1;
  const pageSize = 10;

  function render() {
    const students = getFilteredStudents();
    const totalCount = students.length;
    const totalPages = Math.ceil(totalCount / pageSize) || 1;
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedStudents = students.slice(startIndex, startIndex + pageSize);

    return `
      <div class="space-y-5 animate-fade-in">
        
        <!-- Header & Action Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-bold text-slate-900">Student Directory</h1>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-[#E8752F] border border-orange-200">
                ${window.ERP_DATA.students.length} Enrolled
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Manage admissions, student profiles, fee accounts, and academic records.</p>
          </div>

          <div class="flex items-center gap-2.5">
            <button 
              onclick="StudentListView.exportData()"
              class="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <i data-lucide="download" class="w-4 h-4 text-slate-500"></i>
              <span>Export CSV</span>
            </button>
            <button 
              onclick="ModalManager.open('modal-add-student')"
              class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#E8752F] hover:bg-[#D46320] text-white transition-colors shadow-2xs"
            >
              <i data-lucide="user-plus" class="w-4 h-4"></i>
              <span>New Admission</span>
            </button>
          </div>
        </div>

        <!-- Filter Controls -->
        <div class="bg-white p-4 rounded-xl border border-slate-200/80 card-shadow">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            
            <!-- Search by Name or ID -->
            <div class="md:col-span-2 relative">
              <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
              <input 
                type="text" 
                placeholder="Search by student name, ID, roll no..." 
                value="${searchQuery}"
                oninput="StudentListView.onSearch(this.value)"
                class="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#E8752F]"
              >
            </div>

            <!-- Class Filter -->
            <div>
              <select 
                onchange="StudentListView.onClassFilter(this.value)"
                class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#E8752F]"
              >
                <option value="All" ${filterClass === 'All' ? 'selected' : ''}>All Classes (Nursery - XII)</option>
                ${window.ERP_DATA.classesList.map(c => `
                  <option value="${c}" ${filterClass === c ? 'selected' : ''}>${c}</option>
                `).join('')}
              </select>
            </div>

            <!-- Section Filter -->
            <div>
              <select 
                onchange="StudentListView.onSectionFilter(this.value)"
                class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#E8752F]"
              >
                <option value="All" ${filterSection === 'All' ? 'selected' : ''}>All Sections (A, B, C)</option>
                <option value="A" ${filterSection === 'A' ? 'selected' : ''}>Section A</option>
                <option value="B" ${filterSection === 'B' ? 'selected' : ''}>Section B</option>
                <option value="C" ${filterSection === 'C' ? 'selected' : ''}>Section C</option>
              </select>
            </div>

            <!-- Fee Status Filter -->
            <div>
              <select 
                onchange="StudentListView.onFeeFilter(this.value)"
                class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#E8752F]"
              >
                <option value="All" ${filterFee === 'All' ? 'selected' : ''}>All Fee Statuses</option>
                <option value="Paid" ${filterFee === 'Paid' ? 'selected' : ''}>Paid in Full</option>
                <option value="Partial" ${filterFee === 'Partial' ? 'selected' : ''}>Partially Paid</option>
                <option value="Overdue" ${filterFee === 'Overdue' ? 'selected' : ''}>Fee Overdue</option>
              </select>
            </div>

          </div>
        </div>

        <!-- Student Data Table -->
        <div class="bg-white rounded-xl border border-slate-200/80 card-shadow overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th class="py-3 px-4">Student</th>
                  <th class="py-3 px-3">Student ID</th>
                  <th class="py-3 px-3">Class & Sec</th>
                  <th class="py-3 px-3">Guardian / Phone</th>
                  <th class="py-3 px-3 text-center">Attendance</th>
                  <th class="py-3 px-3">Fee Status</th>
                  <th class="py-3 px-3">House</th>
                  <th class="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-xs">
                ${paginatedStudents.length === 0 ? `
                  <tr>
                    <td colspan="8" class="py-12 text-center text-slate-400">
                      <i data-lucide="users" class="w-10 h-10 mx-auto mb-2 opacity-30"></i>
                      <div class="font-medium text-slate-600">No students match current filter</div>
                      <div class="text-[11px] text-slate-400 mt-0.5">Try resetting search or filters</div>
                    </td>
                  </tr>
                ` : paginatedStudents.map(s => {
                  const feeBadge = s.feeStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                   s.feeStatus === 'Partial' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                   'bg-rose-50 text-rose-700 border-rose-200';
                  
                  const attColor = s.attendancePct >= 90 ? 'text-emerald-600' :
                                   s.attendancePct >= 75 ? 'text-amber-600' : 'text-rose-600 font-bold';

                  const houseColor = s.house === 'Tagore' ? 'bg-amber-100 text-amber-800' :
                                     s.house === 'Ashoka' ? 'bg-blue-100 text-blue-800' :
                                     s.house === 'Shivaji' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800';

                  return `
                    <tr class="hover:bg-slate-50/70 transition-colors">
                      <td class="py-3 px-4">
                        <div class="flex items-center gap-3">
                          <img src="${s.photo}" alt="${s.name}" class="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0">
                          <div>
                            <div class="font-bold text-slate-800 hover:text-[#E8752F] cursor-pointer" onclick="App.viewStudentProfile('${s.id}')">${s.name}</div>
                            <div class="text-[10px] text-slate-400">Roll: ${s.rollNo} • ${s.gender}</div>
                          </div>
                        </div>
                      </td>
                      <td class="py-3 px-3 font-mono text-[11px] font-semibold text-slate-600">${s.id}</td>
                      <td class="py-3 px-3">
                        <span class="font-semibold text-slate-800">${s.class}</span>
                        <span class="text-slate-400 font-normal">(${s.section})</span>
                      </td>
                      <td class="py-3 px-3">
                        <div class="text-slate-800 font-medium">${s.fatherName}</div>
                        <div class="text-[11px] text-slate-400">${s.parentPhone}</div>
                      </td>
                      <td class="py-3 px-3 text-center">
                        <span class="font-bold ${attColor}">${s.attendancePct}%</span>
                        ${s.attendancePct < 75 ? '<span class="block text-[9px] text-rose-500 font-semibold uppercase">CBSE Alert</span>' : ''}
                      </td>
                      <td class="py-3 px-3">
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${feeBadge}">
                          ${s.feeStatus}
                        </span>
                        ${s.feeDue > 0 ? `<div class="text-[10px] text-slate-400 mt-0.5">₹${s.feeDue.toLocaleString('en-IN')} due</div>` : ''}
                      </td>
                      <td class="py-3 px-3">
                        <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${houseColor}">
                          ${s.house}
                        </span>
                      </td>
                      <td class="py-3 px-4 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                          <button 
                            onclick="App.viewStudentProfile('${s.id}')"
                            class="p-1.5 text-slate-500 hover:text-[#E8752F] hover:bg-orange-50 rounded-lg transition-colors"
                            title="View 360 Profile"
                          >
                            <i data-lucide="eye" class="w-4 h-4"></i>
                          </button>
                          <button 
                            onclick="StudentListView.openQuickPay('${s.id}')"
                            class="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Collect Fee"
                          >
                            <i data-lucide="indian-rupee" class="w-4 h-4"></i>
                          </button>
                          <button 
                            onclick="App.openReportCard('${s.id}')"
                            class="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Print Report Card"
                          >
                            <i data-lucide="award" class="w-4 h-4"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          <!-- Pagination Bar -->
          <div class="px-4 py-3 bg-slate-50/80 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
            <div>
              Showing <span class="font-bold text-slate-700">${totalCount === 0 ? 0 : startIndex + 1}</span> to 
              <span class="font-bold text-slate-700">${Math.min(startIndex + pageSize, totalCount)}</span> of 
              <span class="font-bold text-slate-700">${totalCount}</span> students
            </div>
            <div class="flex items-center gap-1.5">
              <button 
                onclick="StudentListView.changePage(${currentPage - 1})"
                ${currentPage === 1 ? 'disabled class="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-300 cursor-not-allowed"' : 'class="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"'}
              >
                Previous
              </button>
              <span class="px-2 font-semibold text-slate-700">Page ${currentPage} of ${totalPages}</span>
              <button 
                onclick="StudentListView.changePage(${currentPage + 1})"
                ${currentPage >= totalPages ? 'disabled class="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-300 cursor-not-allowed"' : 'class="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"'}
              >
                Next
              </button>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  function getFilteredStudents() {
    const list = window.ERP_DATA.students || [];
    return list.filter(s => {
      const matchClass = filterClass === 'All' || s.class === filterClass;
      const matchSection = filterSection === 'All' || s.section === filterSection;
      const matchFee = filterFee === 'All' || s.feeStatus === filterFee;
      const matchSearch = !searchQuery || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNo.includes(searchQuery) ||
        s.parentPhone.includes(searchQuery);
      return matchClass && matchSection && matchFee && matchSearch;
    });
  }

  function onSearch(val) {
    searchQuery = val;
    currentPage = 1;
    refresh();
  }

  function onClassFilter(val) {
    filterClass = val;
    currentPage = 1;
    refresh();
  }

  function onSectionFilter(val) {
    filterSection = val;
    currentPage = 1;
    refresh();
  }

  function onFeeFilter(val) {
    filterFee = val;
    currentPage = 1;
    refresh();
  }

  function changePage(p) {
    currentPage = p;
    refresh();
  }

  function refresh() {
    const container = document.getElementById('main-content-viewport');
    if (container) {
      container.innerHTML = render();
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function exportData() {
    Toast.success('Export Started', 'Generating student directory CSV with CBSE identifiers...');
  }

  function openQuickPay(studentId) {
    const student = window.ERP_DATA.students.find(s => s.id === studentId);
    if (student) {
      ModalManager.open('modal-collect-fee');
      // Set student name in input if exists
      const nameInput = document.getElementById('fee-student-select');
      if (nameInput) nameInput.value = student.id;
    }
  }

  return {
    render,
    onSearch,
    onClassFilter,
    onSectionFilter,
    onFeeFilter,
    changePage,
    exportData,
    openQuickPay
  };
})();
