// Student 360 Degree Comprehensive Profile View
window.StudentProfileView = (function() {
  let currentStudentId = "STU-2026-001";
  let activeTab = "overview";

  function render(studentId) {
    if (studentId) currentStudentId = studentId;
    const s = window.ERP_DATA.students.find(x => x.id === currentStudentId) || window.ERP_DATA.students[0];
    const report = window.ERP_DATA.reportCardAarav;

    return `
      <div class="space-y-5 animate-fade-in">
        
        <!-- Back Navigation & Actions -->
        <div class="flex items-center justify-between">
          <button 
            onclick="App.navigate('students')"
            class="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
            <span>Back to Student Directory</span>
          </button>
          
          <div class="flex items-center gap-2">
            <button 
              onclick="App.openReportCard('${s.id}')"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <i data-lucide="award" class="w-3.5 h-3.5 text-indigo-600"></i>
              <span>CBSE Report Card</span>
            </button>
            <button 
              onclick="App.openIdCard('${s.id}')"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <i data-lucide="contact-2" class="w-3.5 h-3.5 text-[#E8752F]"></i>
              <span>View ID Card</span>
            </button>
            <button 
              onclick="ModalManager.open('modal-collect-fee')"
              class="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E8752F] text-white rounded-lg text-xs font-semibold hover:bg-[#D46320] shadow-2xs"
            >
              <i data-lucide="indian-rupee" class="w-3.5 h-3.5"></i>
              <span>Collect Fee</span>
            </button>
          </div>
        </div>

        <!-- Student Header Card -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200/80 card-shadow">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="flex items-start sm:items-center gap-4">
              <div class="relative shrink-0">
                <img src="${s.photo}" alt="${s.name}" class="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-sm">
                <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" title="Active Student"></span>
              </div>
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <h1 class="text-xl md:text-2xl font-bold text-slate-900">${s.name}</h1>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">ACTIVE</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">${s.house} House</span>
                </div>
                <div class="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mt-1">
                  <span class="font-semibold text-slate-700">${s.class} - Section ${s.section}</span>
                  <span>•</span>
                  <span>Roll No: <strong class="text-slate-700">${s.rollNo}</strong></span>
                  <span>•</span>
                  <span>Student ID: <span class="font-mono text-slate-700">${s.id}</span></span>
                  <span>•</span>
                  <span>Adm No: <span class="font-mono text-slate-700">${s.admissionNo}</span></span>
                </div>
                <div class="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                  <span class="flex items-center gap-1"><i data-lucide="phone" class="w-3.5 h-3.5"></i> ${s.parentPhone}</span>
                  <span class="flex items-center gap-1"><i data-lucide="mail" class="w-3.5 h-3.5"></i> ${s.email}</span>
                </div>
              </div>
            </div>

            <!-- Quick Stats in Header -->
            <div class="flex items-center gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 shrink-0">
              <div class="text-center px-3 py-1">
                <div class="text-[11px] font-medium text-slate-400">Attendance</div>
                <div class="text-xl font-bold text-emerald-600">${s.attendancePct}%</div>
                <div class="text-[10px] text-slate-400">118/122 Days</div>
              </div>
              <div class="h-8 w-px bg-slate-100"></div>
              <div class="text-center px-3 py-1">
                <div class="text-[11px] font-medium text-slate-400">CGPA / Rank</div>
                <div class="text-xl font-bold text-[#E8752F]">${s.cgpa}</div>
                <div class="text-[10px] text-emerald-600 font-semibold">Rank #1</div>
              </div>
              <div class="h-8 w-px bg-slate-100"></div>
              <div class="text-center px-3 py-1">
                <div class="text-[11px] font-medium text-slate-400">Fee Status</div>
                <div class="text-sm font-bold ${s.feeStatus === 'Paid' ? 'text-emerald-600' : 'text-rose-600'}">${s.feeStatus}</div>
                <div class="text-[10px] text-slate-400">₹${s.feeDue.toLocaleString('en-IN')} Due</div>
              </div>
            </div>
          </div>

          <!-- Profile Navigation Tabs -->
          <div class="flex items-center gap-2 border-t border-slate-100 mt-6 pt-2 overflow-x-auto select-none">
            ${[
              { id: 'overview', label: 'Overview', icon: 'user' },
              { id: 'attendance', label: 'Attendance', icon: 'calendar-check' },
              { id: 'fees', label: 'Fees Ledger', icon: 'indian-rupee' },
              { id: 'results', label: 'Exams & Results', icon: 'award' },
              { id: 'parent', label: 'Parent Details', icon: 'users' },
              { id: 'documents', label: 'Documents & Certificates', icon: 'file-text' }
            ].map(tab => `
              <button 
                onclick="StudentProfileView.switchTab('${tab.id}')"
                class="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id 
                    ? 'bg-orange-50 text-[#E8752F] border border-orange-200/80 shadow-2xs' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }"
              >
                <i data-lucide="${tab.icon}" class="w-3.5 h-3.5"></i>
                <span>${tab.label}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Dynamic Tab Content -->
        <div id="profile-tab-content">
          ${renderTabContent(s, report)}
        </div>

      </div>
    `;
  }

  function renderTabContent(s, report) {
    if (activeTab === 'overview') {
      return `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Personal Information -->
          <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow space-y-4">
            <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
              <i data-lucide="user" class="w-4 h-4 text-[#E8752F]"></i>
              <span>Personal Information</span>
            </h3>
            <div class="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span class="text-slate-400 block">Date of Birth</span>
                <span class="font-semibold text-slate-800 mt-0.5 block">${s.dob} (Age 16)</span>
              </div>
              <div>
                <span class="text-slate-400 block">Blood Group</span>
                <span class="font-semibold text-slate-800 mt-0.5 block">${s.bloodGroup}</span>
              </div>
              <div>
                <span class="text-slate-400 block">Gender</span>
                <span class="font-semibold text-slate-800 mt-0.5 block">${s.gender}</span>
              </div>
              <div>
                <span class="text-slate-400 block">Nationality / Religion</span>
                <span class="font-semibold text-slate-800 mt-0.5 block">Indian / Hindu</span>
              </div>
              <div class="col-span-2">
                <span class="text-slate-400 block">Residential Address</span>
                <span class="font-semibold text-slate-800 mt-0.5 block">${s.address}</span>
              </div>
            </div>
          </div>

          <!-- Academic & Transport Details -->
          <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow space-y-4">
            <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
              <i data-lucide="bus" class="w-4 h-4 text-[#E8752F]"></i>
              <span>Academic & Logistics</span>
            </h3>
            <div class="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span class="text-slate-400 block">Class & Section</span>
                <span class="font-semibold text-slate-800 mt-0.5 block">${s.class} (${s.section})</span>
              </div>
              <div>
                <span class="text-slate-400 block">Class Teacher</span>
                <span class="font-semibold text-slate-800 mt-0.5 block">Mrs. Sunita Rao (PGT Math)</span>
              </div>
              <div>
                <span class="text-slate-400 block">Admission Year</span>
                <span class="font-semibold text-slate-800 mt-0.5 block">${s.admissionYear}</span>
              </div>
              <div>
                <span class="text-slate-400 block">Board Reg / CBSE No</span>
                <span class="font-semibold text-slate-800 mt-0.5 block font-mono">CBSE-X-26-44109</span>
              </div>
              <div class="col-span-2">
                <span class="text-slate-400 block">Transport Facility</span>
                <span class="font-semibold text-slate-800 mt-0.5 block flex items-center gap-1.5">
                  <i data-lucide="bus" class="w-3.5 h-3.5 text-[#E8752F]"></i>
                  ${s.transportRoute}
                </span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (activeTab === 'attendance') {
      return `
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 class="font-bold text-slate-800 text-sm">Attendance Ledger (2026-27)</h3>
              <p class="text-xs text-slate-400">Total School Days: 122 • Days Present: 118</p>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              96.7% - Exemplary
            </span>
          </div>

          <!-- Monthly breakdown cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div class="text-[11px] text-slate-400">April 2026</div>
              <div class="text-base font-bold text-emerald-600">22 / 22</div>
              <div class="text-[10px] text-slate-400 font-semibold">100%</div>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div class="text-[11px] text-slate-400">May 2026</div>
              <div class="text-base font-bold text-emerald-600">18 / 19</div>
              <div class="text-[10px] text-slate-400 font-semibold">94.7%</div>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div class="text-[11px] text-slate-400">July 2026</div>
              <div class="text-base font-bold text-emerald-600">24 / 24</div>
              <div class="text-[10px] text-slate-400 font-semibold">100%</div>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div class="text-[11px] text-slate-400">August 2026</div>
              <div class="text-base font-bold text-emerald-600">23 / 24</div>
              <div class="text-[10px] text-slate-400 font-semibold">95.8%</div>
            </div>
          </div>
        </div>
      `;
    } else if (activeTab === 'fees') {
      const records = window.ERP_DATA.feeRecords.filter(r => r.studentId === s.id);
      return `
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 class="font-bold text-slate-800 text-sm">Fee Transactions & Invoices</h3>
              <p class="text-xs text-slate-400">Student Fee Account: ${s.id}</p>
            </div>
            <button 
              onclick="ModalManager.open('modal-collect-fee')"
              class="px-3.5 py-1.5 bg-[#E8752F] text-white rounded-lg text-xs font-semibold hover:bg-[#D46320]"
            >
              + Collect Payment
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-[11px]">
                  <th class="p-3">Invoice No</th>
                  <th class="p-3">Period</th>
                  <th class="p-3">Total Amount</th>
                  <th class="p-3">Paid Amount</th>
                  <th class="p-3">Status</th>
                  <th class="p-3">Payment Mode</th>
                  <th class="p-3 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${records.map(r => `
                  <tr>
                    <td class="p-3 font-mono font-semibold text-slate-700">${r.invoiceNo}</td>
                    <td class="p-3">${r.quarter}</td>
                    <td class="p-3 font-semibold text-slate-800">₹${r.netPayable.toLocaleString('en-IN')}</td>
                    <td class="p-3 font-semibold text-emerald-600">₹${r.paidAmount.toLocaleString('en-IN')}</td>
                    <td class="p-3">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${r.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700'}">
                        ${r.status}
                      </span>
                    </td>
                    <td class="p-3 text-slate-500">${r.paymentMode || '-'}</td>
                    <td class="p-3 text-right">
                      ${r.receiptNo ? `
                        <button onclick="App.openFeeReceipt('${r.invoiceNo}')" class="text-xs font-semibold text-[#E8752F] hover:underline">
                          Print ${r.receiptNo}
                        </button>
                      ` : '-'}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (activeTab === 'results') {
      return `
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 class="font-bold text-slate-800 text-sm">Scholastic Performance (Term 1 Half-Yearly)</h3>
              <p class="text-xs text-slate-400">CBSE Affiliation Norms • Maximum Marks 100 per Subject</p>
            </div>
            <button 
              onclick="App.openReportCard('${s.id}')"
              class="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <i data-lucide="printer" class="w-3.5 h-3.5"></i>
              <span>Print Official CBSE Report Card</span>
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-[11px]">
                  <th class="p-3">Subject</th>
                  <th class="p-3 text-center">Theory (80)</th>
                  <th class="p-3 text-center">Internal (20)</th>
                  <th class="p-3 text-center">Total (100)</th>
                  <th class="p-3 text-center">Grade</th>
                  <th class="p-3 text-center">Grade Point</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${report.scholasticMarks.map(m => `
                  <tr>
                    <td class="p-3 font-semibold text-slate-800">${m.subject}</td>
                    <td class="p-3 text-center">${m.term1Theory}</td>
                    <td class="p-3 text-center">${m.term1Internal}</td>
                    <td class="p-3 text-center font-bold text-slate-900">${m.total}</td>
                    <td class="p-3 text-center">
                      <span class="px-2 py-0.5 rounded font-bold text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200">${m.grade}</span>
                    </td>
                    <td class="p-3 text-center font-semibold text-slate-700">${m.gp}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (activeTab === 'parent') {
      return `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow space-y-4">
            <h3 class="font-bold text-slate-900 text-sm">Father's Profile</h3>
            <div class="space-y-2 text-xs">
              <div><span class="text-slate-400">Name:</span> <span class="font-semibold text-slate-800">${s.fatherName}</span></div>
              <div><span class="text-slate-400">Mobile Phone:</span> <span class="font-semibold text-slate-800">${s.parentPhone}</span></div>
              <div><span class="text-slate-400">Occupation:</span> <span class="font-semibold text-slate-800">Sr. Software Architect (TCS)</span></div>
              <div><span class="text-slate-400">Email:</span> <span class="font-semibold text-slate-800">rajesh.sharma@gmail.com</span></div>
            </div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow space-y-4">
            <h3 class="font-bold text-slate-900 text-sm">Mother's Profile</h3>
            <div class="space-y-2 text-xs">
              <div><span class="text-slate-400">Name:</span> <span class="font-semibold text-slate-800">${s.motherName}</span></div>
              <div><span class="text-slate-400">Mobile Phone:</span> <span class="font-semibold text-slate-800">+91 98112 34568</span></div>
              <div><span class="text-slate-400">Occupation:</span> <span class="font-semibold text-slate-800">Pediatrician (Fortis Hospital)</span></div>
              <div><span class="text-slate-400">Email:</span> <span class="font-semibold text-slate-800">anjali.sharma@fortishealthcare.com</span></div>
            </div>
          </div>
        </div>
      `;
    } else if (activeTab === 'documents') {
      return `
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 class="font-bold text-slate-800 text-sm">Uploaded Certificates & Legal Documents</h3>
              <p class="text-xs text-slate-400">Official CBSE & School Records</p>
            </div>
            <button onclick="Toast.info('Upload Dialog', 'Select Aadhaar or Transfer Certificate file')" class="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800">
              + Upload Document
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <i data-lucide="file-check-2" class="w-5 h-5 text-emerald-600"></i>
                <div>
                  <div class="font-bold text-slate-800">Aadhaar Card Copy</div>
                  <div class="text-[10px] text-slate-400">Verified • PDF (1.2 MB)</div>
                </div>
              </div>
              <button onclick="Toast.success('Opening Document', 'Aadhaar copy opened')" class="text-slate-400 hover:text-slate-700"><i data-lucide="eye" class="w-4 h-4"></i></button>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <i data-lucide="award" class="w-5 h-5 text-indigo-600"></i>
                <div>
                  <div class="font-bold text-slate-800">Transfer Certificate</div>
                  <div class="text-[10px] text-slate-400">Previous School • Verified</div>
                </div>
              </div>
              <button onclick="App.openCertificate('TC', '${s.id}')" class="text-slate-400 hover:text-slate-700"><i data-lucide="eye" class="w-4 h-4"></i></button>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <i data-lucide="heart" class="w-5 h-5 text-rose-600"></i>
                <div>
                  <div class="font-bold text-slate-800">Medical Fitness Certificate</div>
                  <div class="text-[10px] text-slate-400">Blood B+ • Fitness Ok</div>
                </div>
              </div>
              <button onclick="Toast.success('Opening Document', 'Medical certificate opened')" class="text-slate-400 hover:text-slate-700"><i data-lucide="eye" class="w-4 h-4"></i></button>
            </div>
          </div>
        </div>
      `;
    }
  }

  function switchTab(tabId) {
    activeTab = tabId;
    const container = document.getElementById('main-content-viewport');
    if (container) {
      container.innerHTML = render(currentStudentId);
      if (window.lucide) window.lucide.createIcons();
    }
  }

  return {
    render,
    switchTab
  };
})();
