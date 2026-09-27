// Official Certificates & Document Generator View
window.CertificatesView = (function() {
  let certType = 'TC'; // 'TC' | 'CHARACTER' | 'BONAFIDE' | 'SPORTS'
  let selectedStudentId = 'STU-2026-001';
  let conductRating = 'Exemplary';
  let reasonForLeaving = 'Parents Relocating to Bengaluru (Employment Transfer)';

  function render() {
    const s = window.ERP_DATA.students.find(x => x.id === selectedStudentId) || window.ERP_DATA.students[0];
    const school = window.ERP_DATA.schoolProfile;

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header & Action Controls -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow no-print">
          <div>
            <h1 class="text-xl font-bold text-slate-900">Certificate Generation & Documents</h1>
            <p class="text-xs text-slate-500 mt-0.5">Issue verified CBSE Transfer Certificates, Character Certificates, and Bonafide Letters.</p>
          </div>

          <div class="flex items-center gap-2">
            <button 
              onclick="window.print()"
              class="flex items-center gap-2 px-4 py-2 bg-[#E8752F] hover:bg-[#D46320] text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
            >
              <i data-lucide="printer" class="w-4 h-4"></i>
              <span>Print Official Document</span>
            </button>
            <button 
              onclick="Toast.success('Certificate Exported', 'Downloaded signed legal document in PDF')"
              class="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              <i data-lucide="download" class="w-4 h-4"></i>
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        <!-- Generator Parameters Toolbar -->
        <div class="bg-white p-4 rounded-xl border border-slate-200/80 card-shadow no-print">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            
            <!-- Document Type -->
            <div>
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Certificate Type</label>
              <select 
                class="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white"
                onchange="CertificatesView.setCertType(this.value)"
              >
                <option value="TC" ${certType === 'TC' ? 'selected' : ''}>Transfer Certificate (TC)</option>
                <option value="CHARACTER" ${certType === 'CHARACTER' ? 'selected' : ''}>Character & Conduct Certificate</option>
                <option value="BONAFIDE" ${certType === 'BONAFIDE' ? 'selected' : ''}>Bonafide / Study Certificate</option>
                <option value="SPORTS" ${certType === 'SPORTS' ? 'selected' : ''}>Sports & Merit Certificate</option>
              </select>
            </div>

            <!-- Student Picker -->
            <div>
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Select Student</label>
              <select 
                class="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white"
                onchange="CertificatesView.setStudent(this.value)"
              >
                ${window.ERP_DATA.students.slice(0, 15).map(x => `
                  <option value="${x.id}" ${x.id === selectedStudentId ? 'selected' : ''}>${x.name} (${x.class}-${x.section})</option>
                `).join('')}
              </select>
            </div>

            <!-- Conduct Rating -->
            <div>
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">General Conduct</label>
              <select 
                class="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white"
                onchange="CertificatesView.setConduct(this.value)"
              >
                <option value="Exemplary" ${conductRating === 'Exemplary' ? 'selected' : ''}>Exemplary</option>
                <option value="Very Good" ${conductRating === 'Very Good' ? 'selected' : ''}>Very Good</option>
                <option value="Good" ${conductRating === 'Good' ? 'selected' : ''}>Good</option>
              </select>
            </div>

            <!-- Reason for leaving (if TC) -->
            <div>
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Reason for Leaving</label>
              <input 
                type="text" 
                value="${reasonForLeaving}"
                onchange="CertificatesView.setReason(this.value)"
                class="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white"
              >
            </div>

          </div>
        </div>

        <!-- Official Legal Certificate Canvas -->
        <div class="py-4">
          <div id="printable-document" class="certificate-border max-w-4xl mx-auto p-10 md:p-14 bg-amber-50/10 text-slate-900 shadow-2xl relative">
            
            <!-- Watermark Crest -->
            <div class="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <span class="text-[280px] font-black">S</span>
            </div>

            <!-- Certificate Header -->
            <div class="text-center pb-6 border-b border-amber-800/30">
              <div class="w-14 h-14 rounded-2xl bg-[#E8752F] text-white flex items-center justify-center font-black text-2xl mx-auto mb-2 shadow-sm">
                S
              </div>
              <h1 class="text-2xl md:text-3xl font-black text-slate-900 tracking-wider uppercase font-serif">${school.name}</h1>
              <p class="text-xs font-bold text-[#E8752F] tracking-widest uppercase mt-0.5">${school.affiliation} • School Code: ${school.schoolCode}</p>
              <p class="text-[11px] text-slate-600 mt-1">${school.address} | Phone: ${school.phone}</p>

              <!-- Document Title Badge -->
              <div class="mt-6">
                <span class="inline-block px-8 py-1.5 border-y-2 border-amber-900 text-base md:text-lg font-black tracking-widest text-slate-900 uppercase font-serif">
                  ${certType === 'TC' ? 'TRANSFER CERTIFICATE' : certType === 'CHARACTER' ? 'CHARACTER & CONDUCT CERTIFICATE' : certType === 'BONAFIDE' ? 'BONAFIDE STUDY CERTIFICATE' : 'CERTIFICATE OF MERIT'}
                </span>
              </div>

              <!-- Serial & Affiliation -->
              <div class="flex justify-between items-center text-xs font-mono font-bold text-slate-600 mt-4 px-2">
                <span>Ref No: SIS/DOC/2026/0412</span>
                <span>CBSE Reg No: CBSE-X-26-44109</span>
                <span>Date of Issue: 10 Sep 2026</span>
              </div>
            </div>

            <!-- Certificate Body Content -->
            <div class="py-8 text-sm md:text-base leading-relaxed text-slate-800 space-y-5 font-serif">
              ${certType === 'TC' ? `
                <p>
                  This is to certify that <strong>Master ${s.name}</strong>, Son of <strong>${s.fatherName}</strong> and 
                  <strong>${s.motherName}</strong>, bearing Admission Number <strong>${s.admissionNo}</strong>, was admitted to this institution 
                  in the academic session <strong>${s.admissionYear}</strong> and has been studying in <strong>${s.class} (Section ${s.section})</strong>.
                </p>
                <div class="grid grid-cols-2 gap-y-2 text-sm pt-2">
                  <div>1. Date of Birth (in figures): <strong>${s.dob}</strong></div>
                  <div>2. Date of Birth (in words): <strong>Twelfth August Two Thousand Ten</strong></div>
                  <div>3. Nationality & State: <strong>Indian (Uttar Pradesh)</strong></div>
                  <div>4. Total School Days till date: <strong>122 Days</strong></div>
                  <div>5. Total Days Present: <strong>118 Days (${s.attendancePct}%)</strong></div>
                  <div>6. Whether qualified for promotion: <strong>Yes, Qualified</strong></div>
                  <div>7. Month up to which school dues paid: <strong>Quarter 2 (Paid in Full)</strong></div>
                  <div>8. Reason for leaving institution: <strong>${reasonForLeaving}</strong></div>
                  <div>9. General Conduct during tenure: <strong>${conductRating}</strong></div>
                </div>
                <p class="pt-3">
                  He leaves the school with our highest appreciation of his diligence, integrity, and intellectual curiosity. We wish him radiant success in his future scholastic endeavors.
                </p>
              ` : `
                <p>
                  This is to solemnly certify that <strong>${s.name}</strong>, Son of <strong>${s.fatherName}</strong>, is a bonafide student of 
                  <strong>${school.name}</strong>, currently enrolled in <strong>${s.class} (Section ${s.section})</strong> under Roll Number <strong>${s.rollNo}</strong>.
                </p>
                <p>
                  During his academic tenure at our institution, his conduct, deportment, and character have been consistently 
                  <strong>${conductRating}</strong>. He has taken active participation in academic, co-curricular, and <strong>${s.house} House</strong> activities.
                </p>
                <p>
                  To the best of our administrative and pedagogical knowledge, he bears exemplary moral character and a constructive civic disposition.
                </p>
              `}
            </div>

            <!-- Embossed Gold Seal & Authorized Signatures -->
            <div class="pt-12 mt-6 border-t border-amber-800/30 flex items-center justify-between text-xs">
              <div class="text-center w-40">
                <div class="font-bold text-slate-900 font-serif">Mrs. Sunita Rao</div>
                <div class="text-[11px] text-slate-500 border-t border-dashed border-slate-400 pt-1 mt-1">Class Teacher</div>
              </div>

              <!-- Center Official Gold Seal simulation -->
              <div class="w-20 h-20 rounded-full border-4 border-amber-600 bg-amber-500/10 text-amber-700 flex flex-col items-center justify-center font-black text-[9px] uppercase tracking-tighter text-center shadow-inner rotate-6">
                <span>Official</span>
                <span class="text-xs">SEAL</span>
                <span>Sanskaar</span>
              </div>

              <div class="text-center w-48">
                <div class="font-bold text-slate-900 font-serif">${school.principal}</div>
                <div class="text-[11px] text-slate-500 border-t border-dashed border-slate-400 pt-1 mt-1">Principal & Head of School</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    `;
  }

  function setCertType(type) {
    certType = type;
    refresh();
  }

  function setStudent(id) {
    selectedStudentId = id;
    refresh();
  }

  function setConduct(val) {
    conductRating = val;
    refresh();
  }

  function setReason(val) {
    reasonForLeaving = val;
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
    setCertType,
    setStudent,
    setConduct,
    setReason
  };
})();
