// Official CBSE-Format Student Report Card View / Printable Document
window.ReportCardView = (function() {
  function render(studentId = 'STU-2026-001') {
    const s = window.ERP_DATA.students.find(x => x.id === studentId) || window.ERP_DATA.students[0];
    const data = window.ERP_DATA.reportCardAarav;
    const school = window.ERP_DATA.schoolProfile;

    return `
      <div class="max-w-4xl mx-auto space-y-5 animate-fade-in">
        
        <!-- Controls Bar (No Print) -->
        <div class="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 card-shadow no-print">
          <div class="flex items-center gap-2">
            <button onclick="App.navigate('examination')" class="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100">
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
            </button>
            <div>
              <h2 class="font-bold text-slate-800 text-sm">Official CBSE Performance Marksheet Preview</h2>
              <p class="text-xs text-slate-400">Student: ${s.name} (${s.class}-${s.section}) • Roll No: ${s.rollNo}</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button 
              onclick="window.print()"
              class="flex items-center gap-2 px-4 py-2 bg-[#E8752F] hover:bg-[#D46320] text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
            >
              <i data-lucide="printer" class="w-4 h-4"></i>
              <span>Print Official Marksheet</span>
            </button>
            <button 
              onclick="Toast.success('PDF Export', 'Downloaded CBSE Report Card for ${s.name} in PDF format')"
              class="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              <i data-lucide="download" class="w-4 h-4"></i>
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        <!-- Printable Document Wrapper -->
        <div id="printable-document" class="bg-white p-8 md:p-12 rounded-2xl border-2 border-slate-300 shadow-xl text-slate-800 relative overflow-hidden">
          
          <!-- Official School Emblem & Header -->
          <div class="text-center pb-6 border-b-2 border-slate-800">
            <div class="flex items-center justify-center gap-4 mb-2">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#E8752F] to-[#EA580C] text-white flex items-center justify-center font-black text-3xl shadow-sm border border-orange-300">
                S
              </div>
              <div class="text-left">
                <h1 class="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">${school.name}</h1>
                <p class="text-xs font-bold text-[#E8752F] uppercase tracking-wider">${school.tagline}</p>
                <p class="text-xs text-slate-600 mt-0.5 font-medium">${school.affiliation} | School Code: ${school.schoolCode}</p>
                <p class="text-[11px] text-slate-500">${school.address}</p>
              </div>
            </div>
            
            <div class="mt-4 pt-2 border-t border-slate-200 inline-block px-6">
              <span class="text-sm md:text-base font-black tracking-widest text-slate-900 uppercase">
                ACADEMIC PERFORMANCE ASSESSMENT & REPORT CARD
              </span>
              <div class="text-xs font-bold text-slate-600 mt-0.5">ACADEMIC SESSION: ${school.currentSession}</div>
            </div>
          </div>

          <!-- Student Particulars Grid -->
          <div class="my-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-4">
              <div>
                <span class="text-slate-400 block text-[10px] uppercase font-bold">Student Name</span>
                <span class="font-bold text-slate-900 text-sm">${s.name}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[10px] uppercase font-bold">Class & Section</span>
                <span class="font-bold text-slate-900 text-sm">${s.class} - ${s.section}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[10px] uppercase font-bold">Roll Number</span>
                <span class="font-bold text-slate-900 font-mono text-sm">${s.rollNo}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[10px] uppercase font-bold">Admission Number</span>
                <span class="font-bold text-slate-900 font-mono">${s.admissionNo}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[10px] uppercase font-bold">Father's Name</span>
                <span class="font-semibold text-slate-800">${s.fatherName}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[10px] uppercase font-bold">Mother's Name</span>
                <span class="font-semibold text-slate-800">${s.motherName}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[10px] uppercase font-bold">Date of Birth</span>
                <span class="font-semibold text-slate-800">${s.dob}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[10px] uppercase font-bold">House / Blood Group</span>
                <span class="font-semibold text-slate-800">${s.house} House (${s.bloodGroup})</span>
              </div>
            </div>
          </div>

          <!-- Part 1: Scholastic Performance -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Part 1: Scholastic Performance (Grading Scale: A1 to E)
              </h3>
            </div>
            <div class="overflow-x-auto border border-slate-300 rounded-lg">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                    <th class="p-2.5 border-r border-slate-300 w-16">Code</th>
                    <th class="p-2.5 border-r border-slate-300">Subject Name</th>
                    <th class="p-2.5 border-r border-slate-300 text-center w-24">Theory (80)</th>
                    <th class="p-2.5 border-r border-slate-300 text-center w-24">Internal (20)</th>
                    <th class="p-2.5 border-r border-slate-300 text-center w-24">Total (100)</th>
                    <th class="p-2.5 border-r border-slate-300 text-center w-20">Grade</th>
                    <th class="p-2.5 text-center w-24">Grade Point</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  ${data.scholasticMarks.map(m => `
                    <tr>
                      <td class="p-2.5 border-r border-slate-200 font-mono text-slate-500">${m.code}</td>
                      <td class="p-2.5 border-r border-slate-200 font-bold text-slate-800">${m.subject}</td>
                      <td class="p-2.5 border-r border-slate-200 text-center">${m.term1Theory}</td>
                      <td class="p-2.5 border-r border-slate-200 text-center">${m.term1Internal}</td>
                      <td class="p-2.5 border-r border-slate-200 text-center font-bold text-slate-900">${m.total}</td>
                      <td class="p-2.5 border-r border-slate-200 text-center font-bold text-[#E8752F]">${m.grade}</td>
                      <td class="p-2.5 text-center font-semibold text-slate-700">${m.gp}</td>
                    </tr>
                  `).join('')}
                  <tr class="bg-slate-50 font-bold border-t-2 border-slate-300">
                    <td colspan="2" class="p-2.5 border-r border-slate-300 text-right uppercase">Aggregate Marks & Percentage:</td>
                    <td colspan="3" class="p-2.5 border-r border-slate-300 text-center font-black text-sm text-slate-900">${data.aggregateMarks} (${data.percentage})</td>
                    <td class="p-2.5 border-r border-slate-300 text-center text-[#E8752F] font-black">A1</td>
                    <td class="p-2.5 text-center font-black text-slate-900">${data.cgpa} CGPA</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Part 2: Co-Scholastic & Attendance -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- Co-Scholastic -->
            <div class="border border-slate-300 rounded-lg overflow-hidden">
              <div class="bg-slate-100 p-2 font-bold text-xs uppercase border-b border-slate-300 text-slate-700">
                Part 2: Co-Scholastic Activities (Grading: A, B, C)
              </div>
              <table class="w-full text-xs">
                <tbody class="divide-y divide-slate-200">
                  ${data.coScholastic.map(c => `
                    <tr>
                      <td class="p-2 text-slate-700 font-medium">${c.area}</td>
                      <td class="p-2 text-right font-bold text-emerald-700 w-12">${c.grade}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- Attendance & Remarks -->
            <div class="border border-slate-300 rounded-lg p-3.5 space-y-2.5 text-xs bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span class="font-bold text-slate-700">Attendance Term Record:</span>
                  <span class="font-bold text-emerald-700">${data.student.attendanceTerm}</span>
                </div>
                <div class="mt-2">
                  <span class="font-bold text-slate-700 block text-[11px] uppercase">Class Teacher Remarks:</span>
                  <p class="text-xs text-slate-600 italic mt-1 leading-relaxed">"${data.remarks}"</p>
                </div>
              </div>
              <div class="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-800">
                <span>Result: PROMOTED WITH HONORS</span>
                <span class="text-emerald-700">Rank: ${data.classRank}</span>
              </div>
            </div>
          </div>

          <!-- Signatures Section -->
          <div class="pt-12 mt-8 border-t border-slate-300 grid grid-cols-3 gap-4 text-center text-xs">
            <div>
              <div class="font-bold text-slate-800">${data.classTeacher}</div>
              <div class="text-[11px] text-slate-400 mt-1 border-t border-dashed border-slate-300 pt-1">Class Teacher</div>
            </div>
            <div>
              <div class="font-bold text-slate-800">Exam Controller</div>
              <div class="text-[11px] text-slate-400 mt-1 border-t border-dashed border-slate-300 pt-1">Checked & Verified By</div>
            </div>
            <div class="relative">
              <!-- Stamp simulation -->
              <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-2 border-orange-500/40 text-orange-600/40 flex items-center justify-center rotate-12 pointer-events-none text-[8px] font-black uppercase text-center p-1">
                Sanskaar Int'l School Seal
              </div>
              <div class="font-bold text-slate-900">${school.principal}</div>
              <div class="text-[11px] text-slate-400 mt-1 border-t border-dashed border-slate-300 pt-1">Principal & Seal</div>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  return {
    render
  };
})();
