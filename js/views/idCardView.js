// Physical Digital ID Card Studio
window.IdCardView = (function() {
  let cardRole = 'student'; // 'student' | 'teacher' | 'staff'
  let selectedId = 'STU-2026-001';
  let cardOrientation = 'vertical'; // 'vertical' | 'horizontal'

  function render(presetStudentId) {
    if (presetStudentId) selectedId = presetStudentId;

    let person = null;
    if (cardRole === 'student') {
      person = window.ERP_DATA.students.find(s => s.id === selectedId) || window.ERP_DATA.students[0];
    } else if (cardRole === 'teacher') {
      person = window.ERP_DATA.teachers[0];
    } else {
      person = window.ERP_DATA.staff[0];
    }

    const school = window.ERP_DATA.schoolProfile;

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header Controls -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow no-print">
          <div>
            <h1 class="text-xl font-bold text-slate-900">Digital ID Card Studio</h1>
            <p class="text-xs text-slate-500 mt-0.5">Generate, customize, and print high-resolution smart NFC/QR physical ID cards.</p>
          </div>

          <div class="flex items-center gap-2">
            <button 
              onclick="window.print()"
              class="flex items-center gap-2 px-4 py-2 bg-[#E8752F] hover:bg-[#D46320] text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
            >
              <i data-lucide="printer" class="w-4 h-4"></i>
              <span>Print Official ID Card</span>
            </button>
            <button 
              onclick="Toast.success('Card Exported', 'Downloaded high-resolution ID Card graphics')"
              class="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              <i data-lucide="download" class="w-4 h-4"></i>
              <span>Download PNG</span>
            </button>
          </div>
        </div>

        <!-- Customizer Toolbar -->
        <div class="bg-white p-4 rounded-xl border border-slate-200/80 card-shadow no-print">
          <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
            
            <!-- Role Selector -->
            <div>
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">ID Card Type</label>
              <select 
                class="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white"
                onchange="IdCardView.setRole(this.value)"
              >
                <option value="student" ${cardRole === 'student' ? 'selected' : ''}>Student ID Card</option>
                <option value="teacher" ${cardRole === 'teacher' ? 'selected' : ''}>Teacher & Faculty ID</option>
                <option value="staff" ${cardRole === 'staff' ? 'selected' : ''}>Non-Teaching Staff ID</option>
              </select>
            </div>

            <!-- Student Picker -->
            ${cardRole === 'student' ? `
              <div>
                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Select Student</label>
                <select 
                  class="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white"
                  onchange="IdCardView.setPerson(this.value)"
                >
                  ${window.ERP_DATA.students.slice(0, 15).map(s => `
                    <option value="${s.id}" ${s.id === person.id ? 'selected' : ''}>${s.name} (${s.class}-${s.section})</option>
                  `).join('')}
                </select>
              </div>
            ` : ''}

            <!-- Orientation -->
            <div>
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Card Layout</label>
              <div class="flex items-center gap-1.5">
                <button 
                  onclick="IdCardView.setOrientation('vertical')"
                  class="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${cardOrientation === 'vertical' ? 'bg-orange-50 text-[#E8752F] border border-orange-200' : 'bg-slate-100 text-slate-600'}"
                >
                  Vertical
                </button>
                <button 
                  onclick="IdCardView.setOrientation('horizontal')"
                  class="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${cardOrientation === 'horizontal' ? 'bg-orange-50 text-[#E8752F] border border-orange-200' : 'bg-slate-100 text-slate-600'}"
                >
                  Horizontal
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- Physical Card Rendering Canvas -->
        <div id="printable-document" class="flex flex-col lg:flex-row items-center justify-center gap-8 py-8 px-4 bg-slate-100/70 rounded-2xl border border-slate-200">
          
          <!-- Front of ID Card -->
          <div class="w-[320px] bg-white rounded-2xl border border-slate-300 shadow-2xl overflow-hidden flex flex-col justify-between text-slate-800 relative select-none">
            
            <!-- Top Lanyard Hole Slot -->
            <div class="pt-3 pb-1 bg-white text-center">
              <div class="id-card-lanyard-hole"></div>
            </div>

            <!-- Header Gradient Banner -->
            <div class="bg-gradient-to-r from-[#E8752F] via-[#EA580C] to-[#C2410C] p-4 text-white text-center relative">
              <div class="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-xs mx-auto flex items-center justify-center font-black text-white text-base shadow-xs mb-1">
                S
              </div>
              <h2 class="font-black text-xs uppercase tracking-wider">${school.name}</h2>
              <p class="text-[9px] text-orange-100 font-medium">Session: 2026 - 2027 • CBSE #2130894</p>
            </div>

            <!-- Role Badge -->
            <div class="text-center -mt-2.5">
              <span class="px-3 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-slate-900 text-white shadow-xs">
                ${cardRole === 'student' ? 'STUDENT' : cardRole === 'teacher' ? 'FACULTY' : 'STAFF'}
              </span>
            </div>

            <!-- Photo & Basic Info -->
            <div class="p-5 text-center flex-1 flex flex-col items-center justify-center">
              <div class="relative mb-3">
                <img 
                  src="${person.photo || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'}" 
                  alt="${person.name}" 
                  class="w-24 h-24 rounded-2xl object-cover border-2 border-slate-200 shadow-md"
                >
                <!-- Hologram Authenticity Tag -->
                <div class="hologram-seal absolute -bottom-1 -right-1 w-6 h-6 rounded-full border border-white/60 shadow-xs" title="Official Holographic Security Seal"></div>
              </div>

              <h3 class="font-black text-base text-slate-900 leading-tight">${person.name}</h3>
              <div class="text-xs font-bold text-[#E8752F] mt-0.5 font-mono">
                ${person.id}
              </div>

              ${cardRole === 'student' ? `
                <div class="text-xs font-semibold text-slate-600 mt-1">
                  ${person.class} - Section ${person.section} • Roll ${person.rollNo}
                </div>
              ` : `
                <div class="text-xs font-semibold text-slate-600 mt-1">
                  ${person.designation} • ${person.department}
                </div>
              `}

              <!-- Key Particulars Grid -->
              <div class="w-full mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-left text-[11px]">
                <div>
                  <span class="text-slate-400 block text-[9px] uppercase font-bold">Blood Group</span>
                  <span class="font-bold text-slate-800">${person.bloodGroup || 'B+'}</span>
                </div>
                <div>
                  <span class="text-slate-400 block text-[9px] uppercase font-bold">House</span>
                  <span class="font-bold text-slate-800">${person.house || 'Tagore'}</span>
                </div>
                <div class="col-span-2">
                  <span class="text-slate-400 block text-[9px] uppercase font-bold">Emergency Contact</span>
                  <span class="font-bold text-slate-800">${person.parentPhone || person.phone}</span>
                </div>
              </div>
            </div>

            <!-- Footer Bar with QR Code -->
            <div class="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <!-- Mock QR Code SVG -->
              <div class="w-12 h-12 bg-white p-1 rounded-md border border-slate-200 flex items-center justify-center shrink-0">
                <svg class="w-full h-full text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v2h-4v-2zm-4 0h2v4h-2v-4zm4 4h4v2h-4v-2zm-2 2h2v2h-2v-2zm-2-4h2v2h-2v-2zm-6-2h2v2h-2v-2zm2 2h2v4h-2v-4z"/>
                </svg>
              </div>
              <div class="text-right">
                <div class="text-[9px] text-slate-400">Authorized Signature</div>
                <div class="text-[11px] font-bold text-slate-800 italic mt-1 font-serif">Dr. Arvind Sharma</div>
                <div class="text-[8px] text-slate-400">Principal</div>
              </div>
            </div>

          </div>

          <!-- Back of ID Card -->
          <div class="w-[320px] bg-white rounded-2xl border border-slate-300 shadow-2xl overflow-hidden flex flex-col justify-between text-slate-800 select-none">
            
            <div class="pt-3 pb-1 bg-white text-center">
              <div class="id-card-lanyard-hole"></div>
            </div>

            <div class="p-5 space-y-4 text-xs flex-1 flex flex-col justify-between">
              <div>
                <div class="text-center pb-2 border-b border-slate-100">
                  <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Instructions & Guidelines</span>
                </div>

                <ul class="list-disc pl-4 space-y-1.5 text-slate-600 text-[11px] mt-3">
                  <li>This card is property of <strong>Sanskaar International School</strong>.</li>
                  <li>Mandatory to wear within campus premises and on school transport buses.</li>
                  <li>Loss of card must be immediately reported to Administration. Replacement fee: ₹150.</li>
                  <li>Valid for academic session 2026-2027 only.</li>
                </ul>
              </div>

              <!-- Campus Address & Helpline -->
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-600 space-y-1">
                <div class="font-bold text-slate-800">If Found, Please Return To:</div>
                <div>${school.address}</div>
                <div class="font-bold text-[#E8752F] pt-1">Helpline: ${school.phone}</div>
              </div>

              <!-- Barcode Simulation -->
              <div class="text-center pt-2 border-t border-slate-100">
                <div class="inline-block tracking-widest font-mono text-xl text-slate-900">
                  ||| | |||| | |||||| | ||
                </div>
                <div class="text-[9px] font-mono text-slate-400 mt-0.5">${person.id}</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    `;
  }

  function setRole(role) {
    cardRole = role;
    refresh();
  }

  function setPerson(id) {
    selectedId = id;
    refresh();
  }

  function setOrientation(ori) {
    cardOrientation = ori;
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
    setRole,
    setPerson,
    setOrientation
  };
})();
