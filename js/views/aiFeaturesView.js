// AI / Smart Features - Question Paper Studio & Performance Copilot View
window.AiFeaturesView = (function() {
  let activeTab = "question-paper"; // 'question-paper' | 'performance' | 'worksheet' | 'copilot'
  let isGenerating = false;
  let showAnswerKey = false;
  let selectedClass = "Class X";
  let selectedSubject = "Science (Physics, Chemistry, Biology)";
  let examDuration = "3 Hours";
  let maxMarks = 80;
  let difficulty = "Moderate (Standard CBSE)";

  function render(tab) {
    if (tab) activeTab = tab;

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Premium AI SaaS Header Banner -->
        <div class="relative bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 text-white p-6 rounded-3xl border border-orange-500/20 shadow-xl overflow-hidden">
          <div class="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl pointer-events-none"></div>
          
          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-1">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-300 border border-orange-400/30">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-orange-400 animate-spin-slow"></i>
                <span>Sanskaar Smart Intelligence Copilot</span>
              </div>
              <h1 class="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
                AI Pedagogical & Assessment Engine
              </h1>
              <p class="text-xs text-slate-300 max-w-xl leading-relaxed">
                Generate authentic CBSE blueprint question papers, diagnose student learning gaps, and forecast board percentiles with intelligent analytics.
              </p>
            </div>

            <!-- Tab Switcher inside Hero -->
            <div class="flex items-center p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 self-start md:self-auto overflow-x-auto">
              ${[
                { id: 'question-paper', label: 'Question Paper Gen', icon: 'file-text' },
                { id: 'performance', label: 'Performance Diagnostic', icon: 'trending-up' },
                { id: 'worksheet', label: 'Worksheet Studio', icon: 'layers' },
                { id: 'copilot', label: 'Pedagogy Copilot', icon: 'bot' }
              ].map(t => `
                <button 
                  onclick="AiFeaturesView.switchTab('${t.id}')"
                  class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === t.id 
                      ? 'bg-[#E8752F] text-white shadow-md' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }"
                >
                  <i data-lucide="${t.icon}" class="w-3.5 h-3.5"></i>
                  <span>${t.label}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Dynamic Smart Feature Body -->
        ${activeTab === 'question-paper' ? renderQuestionPaperStudio() :
          activeTab === 'performance' ? renderPerformanceDiagnostic() :
          activeTab === 'worksheet' ? renderWorksheetStudio() :
          renderCopilot()}

      </div>
    `;
  }

  function renderQuestionPaperStudio() {
    return `
      <div class="space-y-6">
        
        <!-- Generator Controls Form -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div>
              <h3 class="font-bold text-slate-900 text-sm">CBSE Blueprint Question Paper Parameters</h3>
              <p class="text-xs text-slate-400">Strict compliance with CBSE Circular No. Acad-45/2026</p>
            </div>
            <span class="text-xs font-bold text-[#E8752F] bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
              Bloom's Taxonomy Balanced
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
            <div>
              <label class="font-bold text-slate-700 block mb-1">Target Class</label>
              <select class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:bg-white">
                <option>Class X (Secondary Board)</option>
                <option>Class XII (Senior Secondary)</option>
                <option>Class IX</option>
                <option>Class XI</option>
              </select>
            </div>

            <div>
              <label class="font-bold text-slate-700 block mb-1">Subject</label>
              <select class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:bg-white">
                <option>086 - Science (Phy, Chem, Bio)</option>
                <option>041 - Mathematics (Standard)</option>
                <option>184 - English Language & Literature</option>
                <option>087 - Social Science</option>
              </select>
            </div>

            <div>
              <label class="font-bold text-slate-700 block mb-1">Total Marks & Duration</label>
              <select class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:bg-white">
                <option>80 Marks (3 Hours - Full Board)</option>
                <option>50 Marks (2 Hours - Periodic)</option>
                <option>25 Marks (1 Hour - Unit Test)</option>
              </select>
            </div>

            <div>
              <label class="font-bold text-slate-700 block mb-1">Difficulty Curve</label>
              <select class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:bg-white">
                <option>Moderate (Standard CBSE 2026)</option>
                <option>Rigorous (Higher HOTS & Olympiad)</option>
                <option>Foundational (Remedial Practice)</option>
              </select>
            </div>

            <div class="flex items-end">
              <button 
                onclick="AiFeaturesView.generatePaper()"
                class="w-full py-2.5 bg-gradient-to-r from-[#E8752F] to-[#EA580C] hover:opacity-95 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 ${isGenerating ? 'opacity-70 pointer-events-none' : ''}"
              >
                ${isGenerating ? `
                  <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                  <span>Synthesizing Paper...</span>
                ` : `
                  <i data-lucide="sparkles" class="w-4 h-4"></i>
                  <span>Generate with AI</span>
                `}
              </button>
            </div>
          </div>
        </div>

        <!-- Generated Exam Paper Container -->
        <div class="bg-white rounded-2xl border border-slate-200/80 card-shadow overflow-hidden">
          
          <!-- Toolbar -->
          <div class="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 no-print">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-slate-700">Preview Mode:</span>
              <button 
                onclick="AiFeaturesView.toggleAnswerKey(false)"
                class="px-3 py-1 rounded-lg text-xs font-semibold ${!showAnswerKey ? 'bg-white text-slate-900 border border-slate-200 shadow-2xs' : 'text-slate-500 hover:text-slate-900'}"
              >
                Question Paper
              </button>
              <button 
                onclick="AiFeaturesView.toggleAnswerKey(true)"
                class="px-3 py-1 rounded-lg text-xs font-semibold ${showAnswerKey ? 'bg-white text-[#E8752F] border border-orange-200 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-900'}"
              >
                Answer Key & Marking Scheme
              </button>
            </div>

            <div class="flex items-center gap-2">
              <button onclick="window.print()" class="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs">
                <i data-lucide="printer" class="w-3.5 h-3.5"></i>
                <span>Print Paper</span>
              </button>
              <button onclick="Toast.success('Export Complete', 'Exported Question Paper in Microsoft Word & PDF format')" class="px-3.5 py-1.5 bg-[#E8752F] text-white rounded-lg text-xs font-semibold hover:bg-[#D46320] flex items-center gap-1.5 shadow-2xs">
                <i data-lucide="download" class="w-3.5 h-3.5"></i>
                <span>Export Word / PDF</span>
              </button>
            </div>
          </div>

          <!-- Printable Examination Paper Content -->
          <div id="printable-document" class="p-8 md:p-12 text-slate-900 font-serif leading-relaxed text-sm">
            
            <!-- School & Exam Header -->
            <div class="text-center pb-6 border-b-2 border-slate-900">
              <div class="text-xs font-bold font-sans uppercase tracking-widest text-slate-500">
                SANSKAAR INTERNATIONAL SCHOOL, GREATER NOIDA
              </div>
              <h2 class="text-xl md:text-2xl font-bold tracking-tight uppercase mt-1">
                PERIODIC ASSESSMENT 2 / PRE-BOARD EXAMINATION 2026-27
              </h2>
              <div class="text-base font-bold mt-0.5">
                CLASS X • SCIENCE (THEORY) - CODE 086
              </div>
              <div class="flex justify-between items-center text-xs font-sans font-bold text-slate-700 mt-4 px-2">
                <span>Time Allowed: 3 Hours</span>
                <span>Maximum Marks: 80</span>
              </div>
            </div>

            <!-- General Instructions -->
            <div class="my-6 p-4 bg-slate-50 rounded-xl border border-slate-200 font-sans text-xs space-y-1 text-slate-700">
              <div class="font-bold text-slate-900 uppercase">General Instructions:</div>
              <ol class="list-decimal pl-4 space-y-0.5">
                <li>This question paper consists of 39 questions in 5 sections.</li>
                <li>All questions are compulsory. However, internal choices are provided in some questions.</li>
                <li><strong>Section A</strong> consists of 20 Objective Type Questions carrying 1 mark each (including Assertion-Reason).</li>
                <li><strong>Section B</strong> consists of 6 Short Answer Questions carrying 2 marks each. (Answers in 30 to 50 words).</li>
                <li><strong>Section C</strong> consists of 7 Short Answer Questions carrying 3 marks each. (Answers in 50 to 80 words).</li>
                <li><strong>Section D</strong> consists of 3 Long Answer Questions carrying 5 marks each.</li>
                <li><strong>Section E</strong> consists of 3 Source-based / Case-based assessments carrying 4 marks each with sub-parts.</li>
              </ol>
            </div>

            ${!showAnswerKey ? renderPaperQuestions() : renderAnswerKeyScheme()}

          </div>

        </div>

      </div>
    `;
  }

  function renderPaperQuestions() {
    return `
      <!-- Section A -->
      <div class="space-y-4">
        <div class="font-sans font-black text-xs uppercase tracking-wider py-1 px-2.5 bg-slate-100 inline-block rounded">
          SECTION A (20 Marks) - Objective Type Questions (1 Mark Each)
        </div>

        <div class="space-y-3.5 pl-2">
          <div>
            <div class="font-bold">Q1. An aqueous solution of a salt turns red litmus blue. The salt is most likely formed by the neutralization of:</div>
            <div class="grid grid-cols-2 gap-2 text-xs font-sans mt-1.5 pl-4 text-slate-700">
              <div>(A) Strong acid and strong base</div>
              <div>(B) Weak acid and strong base</div>
              <div>(C) Strong acid and weak base</div>
              <div>(D) Weak acid and weak base</div>
            </div>
          </div>

          <div>
            <div class="font-bold">Q2. Which of the following statements is accurate regarding the reflex arc in human neurology?</div>
            <div class="grid grid-cols-2 gap-2 text-xs font-sans mt-1.5 pl-4 text-slate-700">
              <div>(A) Sensory neuron conveys impulses from spinal cord to muscle</div>
              <div>(B) Motor neuron conveys impulses from receptor to spinal cord</div>
              <div>(C) Information is processed in the spinal cord before reaching the brain</div>
              <div>(D) Relay neurons are located exclusively in peripheral nerve fibers</div>
            </div>
          </div>

          <div>
            <div class="font-bold">Q3. A ray of light passes from glass into air. If the refractive index of glass with respect to air is 1.5, what is the speed of light in glass? (c = 3 &times; 10<sup>8</sup> m/s)</div>
            <div class="grid grid-cols-2 gap-2 text-xs font-sans mt-1.5 pl-4 text-slate-700">
              <div>(A) 2.0 &times; 10<sup>8</sup> m/s</div>
              <div>(B) 2.25 &times; 10<sup>8</sup> m/s</div>
              <div>(C) 1.5 &times; 10<sup>8</sup> m/s</div>
              <div>(D) 3.0 &times; 10<sup>8</sup> m/s</div>
            </div>
          </div>

          <!-- Assertion Reason -->
          <div class="p-3 bg-slate-50/80 rounded-lg border border-slate-200 text-xs font-sans space-y-1">
            <div class="font-bold text-slate-900 font-serif">Q4. (Assertion-Reason Question)</div>
            <p><strong>Assertion (A):</strong> When white light passes through a glass prism, violet light undergoes maximum deviation.</p>
            <p><strong>Reason (R):</strong> The refractive index of glass is greater for violet light than for red light as violet light travels slowest in glass.</p>
            <div class="pt-1 text-[11px] text-slate-600">
              (A) Both (A) and (R) are true and (R) is correct explanation of (A) | (B) Both true but (R) is not explanation | (C) (A) is true, (R) is false | (D) (A) is false, (R) is true.
            </div>
          </div>
        </div>
      </div>

      <!-- Section B -->
      <div class="space-y-4 pt-6 border-t border-slate-200 mt-6">
        <div class="font-sans font-black text-xs uppercase tracking-wider py-1 px-2.5 bg-slate-100 inline-block rounded">
          SECTION B (12 Marks) - Short Answer Questions (2 Marks Each)
        </div>

        <div class="space-y-3.5 pl-2">
          <div>
            <div class="font-bold">Q5. Why is respiration considered an exothermic reaction? Write the balanced chemical equation representing cellular respiration.</div>
          </div>
          <div>
            <div class="font-bold">Q6. State Ohm's Law. Draw a labeled circuit diagram to verify Ohm's law experimentally in the laboratory.</div>
          </div>
          <div>
            <div class="font-bold">Q7. What is the role of bile juice in the digestion of fats in human intestine? Why is bile juice alkaline?</div>
          </div>
        </div>
      </div>

      <!-- Section C -->
      <div class="space-y-4 pt-6 border-t border-slate-200 mt-6">
        <div class="font-sans font-black text-xs uppercase tracking-wider py-1 px-2.5 bg-slate-100 inline-block rounded">
          SECTION C (21 Marks) - Conceptual Short Answer Questions (3 Marks Each)
        </div>

        <div class="space-y-3.5 pl-2">
          <div>
            <div class="font-bold">Q8. (a) What are amphoteric oxides? Give two examples with balanced chemical equations showing their reactions with both an acid and a base.</div>
          </div>
          <div>
            <div class="font-bold">Q9. An object 4 cm in size is placed at 25 cm in front of a concave mirror of focal length 15 cm. At what distance from the mirror should a screen be placed in order to obtain a sharp image? Find the nature and size of the image.</div>
          </div>
        </div>
      </div>

      <!-- Section D -->
      <div class="space-y-4 pt-6 border-t border-slate-200 mt-6">
        <div class="font-sans font-black text-xs uppercase tracking-wider py-1 px-2.5 bg-slate-100 inline-block rounded">
          SECTION D (15 Marks) - Long Answer Questions (5 Marks Each)
        </div>

        <div class="space-y-3.5 pl-2">
          <div>
            <div class="font-bold">Q10. (a) Draw a neat labeled diagram of the human female reproductive system and state the function of: (i) Ovary (ii) Fallopian Tube (iii) Uterus.</div>
            <div class="text-xs text-slate-500 font-sans italic mt-0.5 pl-4">OR (Internal Choice)</div>
            <div class="font-bold text-slate-800 pl-4 mt-0.5">(b) Explain Mendel's monohybrid cross with pea plants taking height (Tall vs Short) as character. State the phenotypic and genotypic ratios obtained in F2 generation.</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderAnswerKeyScheme() {
    return `
      <div class="space-y-4 text-xs font-sans">
        <div class="font-black text-xs uppercase tracking-wider py-1 px-2.5 bg-orange-100 text-[#E8752F] inline-block rounded">
          CONFIDENTIAL MARKING SCHEME & STEPWISE SCORING RUBRIC (CBSE EVALUATOR COPY)
        </div>

        <div class="space-y-3 pl-2 text-slate-700">
          <div class="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span class="font-bold text-slate-900">Q1. Option (B): Weak acid and strong base</span>
            <div class="text-[11px] text-slate-500 mt-0.5">Explanation: The salt of a weak acid and strong base hydrolyzes in water to yield excess OH<sup>-</sup> ions, making solution basic (turns red litmus blue). [1 Mark]</div>
          </div>

          <div class="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span class="font-bold text-slate-900">Q2. Option (C): Information is processed in the spinal cord before reaching the brain</span>
            <div class="text-[11px] text-slate-500 mt-0.5">Explanation: Reflex arcs operate via spinal cord relay neurons for rapid protective response. [1 Mark]</div>
          </div>

          <div class="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span class="font-bold text-slate-900">Q3. Option (A): 2.0 &times; 10<sup>8</sup> m/s</span>
            <div class="text-[11px] text-slate-500 mt-0.5">Formula: v = c / &mu; = (3 &times; 10<sup>8</sup>) / 1.5 = 2.0 &times; 10<sup>8</sup> m/s. [1/2 mark for formula + 1/2 mark for result]</div>
          </div>

          <div class="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span class="font-bold text-slate-900">Q4. Option (A): Both (A) and (R) are true, and (R) is correct explanation.</span>
            <div class="text-[11px] text-slate-500 mt-0.5">Refractive index is inversely proportional to speed and wavelength. Violet bends most. [1 Mark]</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderPerformanceDiagnostic() {
    const ai = window.ERP_DATA.aiInsights;
    return `
      <div class="space-y-5">
        <!-- Diagnostic Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="p-4 bg-white rounded-xl border border-slate-200 card-shadow">
            <div class="text-xs text-slate-400 font-medium">Academic Health Index</div>
            <div class="text-2xl font-bold text-slate-900 mt-1">${ai.schoolHealthScore} / 100</div>
            <div class="text-[11px] text-emerald-600 font-bold mt-0.5">Top 5% in District</div>
          </div>
          <div class="p-4 bg-white rounded-xl border border-slate-200 card-shadow">
            <div class="text-xs text-slate-400 font-medium">Forecasted Board Pass Rate</div>
            <div class="text-2xl font-bold text-emerald-600 mt-1">${ai.predictedBoardPassRate}%</div>
            <div class="text-[11px] text-slate-400 mt-0.5">Based on 3 Mock Exams</div>
          </div>
          <div class="p-4 bg-white rounded-xl border border-slate-200 card-shadow">
            <div class="text-xs text-slate-400 font-medium">At-Risk Students Identified</div>
            <div class="text-2xl font-bold text-rose-600 mt-1">${ai.atRiskStudentsCount} Students</div>
            <div class="text-[11px] text-rose-500 font-medium mt-0.5">Attendance or Math deficit</div>
          </div>
          <div class="p-4 bg-white rounded-xl border border-slate-200 card-shadow">
            <div class="text-xs text-slate-400 font-medium">Remedial Plans Generated</div>
            <div class="text-2xl font-bold text-[#E8752F] mt-1">${ai.remedialRecommendedCount} Personalized</div>
            <div class="text-[11px] text-slate-400 mt-0.5">Saturday Doubt Clinics</div>
          </div>
        </div>

        <!-- Diagnostic Insights Feed -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${ai.keyFindings.map(f => {
            const badgeClass = f.level === 'danger' ? 'bg-rose-50 border-rose-200 text-rose-800' :
                               f.level === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                               'bg-emerald-50 border-emerald-200 text-emerald-800';
            return `
              <div class="p-5 rounded-2xl border ${badgeClass} space-y-2">
                <div class="font-bold text-sm flex items-center gap-1.5">
                  <i data-lucide="sparkles" class="w-4 h-4"></i>
                  <span>${f.title}</span>
                </div>
                <p class="text-xs leading-relaxed opacity-90">${f.description}</p>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function renderWorksheetStudio() {
    return `
      <div class="bg-white p-6 rounded-2xl border border-slate-200 card-shadow space-y-4">
        <h3 class="font-bold text-slate-900 text-base">AI Practice Worksheet Generator</h3>
        <p class="text-xs text-slate-500">Create printable topic-wise practice sheets with mindmaps, fill-in-the-blanks, and numericals.</p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label class="font-bold text-slate-700 block mb-1">Subject & Topic</label>
            <input type="text" value="Physics: Light Reflection & Refraction" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">Target Class</label>
            <select class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium">
              <option>Class X</option>
              <option>Class IX</option>
            </select>
          </div>
          <div class="flex items-end">
            <button onclick="Toast.success('Worksheet Ready', 'Generated 4-page practice worksheet with diagram problems')" class="w-full py-2 bg-[#E8752F] text-white rounded-xl font-bold text-xs hover:bg-[#D46320]">
              Generate Practice Worksheet
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderCopilot() {
    return `
      <div class="bg-white p-6 rounded-2xl border border-slate-200 card-shadow space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-orange-100 text-[#E8752F] flex items-center justify-center font-bold">
            <i data-lucide="bot" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 text-sm">Pedagogical AI Copilot</h3>
            <p class="text-xs text-slate-400">Ask questions regarding CBSE syllabus adjustments, lesson plan drafting, and remedial strategies.</p>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
          <div class="flex gap-2.5">
            <div class="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0">AI</div>
            <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs leading-relaxed text-slate-700">
              Hello Dr. Arvind! I have analyzed the Term 1 performance data. Would you like me to draft a 3-week remedial schedule for Class X-C Mathematics before the Pre-Board exams?
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <input type="text" placeholder="Ask AI assistant for lesson blueprints, circular drafts..." class="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#E8752F]">
          <button onclick="Toast.info('Copilot Reply', 'Analyzing student learning patterns across Class X...')" class="px-4 py-2.5 bg-[#E8752F] text-white rounded-xl text-xs font-bold hover:bg-[#D46320]">
            Send Prompt
          </button>
        </div>
      </div>
    `;
  }

  function generatePaper() {
    isGenerating = true;
    refresh();
    setTimeout(() => {
      isGenerating = false;
      Toast.success('Question Paper Generated', 'Synthesized 39 questions adhering to CBSE Class X Blueprint with answer key.');
      refresh();
    }, 1200);
  }

  function toggleAnswerKey(state) {
    showAnswerKey = state;
    refresh();
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
    generatePaper,
    toggleAnswerKey,
    switchTab
  };
})();
