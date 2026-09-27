// School Automation Engine & Schedulers View
window.AutomationView = (function() {
  let rules = window.ERP_DATA.automationRules || [];

  function render() {
    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-bold text-slate-900">Automation Engine & Schedulers</h1>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                Daemon Active • 5 Schedulers Running
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Automate daily roll call SMS, WhatsApp fee payment links, birthday greetings, and monthly payrolls.</p>
          </div>

          <button 
            onclick="Toast.success('Trigger Executed', 'Initiated manual sync across all active automation rules')"
            class="flex items-center gap-1.5 px-4 py-2 bg-[#E8752F] text-white rounded-xl text-xs font-semibold hover:bg-[#D46320] shadow-2xs transition-colors"
          >
            <i data-lucide="play" class="w-4 h-4"></i>
            <span>Run All Active Schedulers</span>
          </button>
        </div>

        <!-- Automation Rules Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${rules.map((r, idx) => `
            <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow flex flex-col justify-between space-y-4 hover:border-orange-200 transition-all">
              <div>
                <div class="flex items-start justify-between gap-3">
                  <div class="flex items-center gap-2.5">
                    <div class="w-9 h-9 rounded-xl ${r.active ? 'bg-orange-50 text-[#E8752F]' : 'bg-slate-100 text-slate-400'} flex items-center justify-center font-bold shrink-0">
                      <i data-lucide="cpu" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <h3 class="font-bold text-slate-900 text-sm leading-tight">${r.name}</h3>
                      <span class="text-[10px] font-semibold text-slate-400 font-mono">${r.id}</span>
                    </div>
                  </div>

                  <!-- Toggle Switch -->
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      ${r.active ? 'checked' : ''} 
                      onchange="AutomationView.toggleRule(${idx})"
                      class="sr-only peer"
                    >
                    <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#E8752F]"></div>
                  </label>
                </div>

                <p class="text-xs text-slate-500 mt-3 leading-relaxed">${r.description}</p>

                <div class="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span class="text-slate-400 block text-[10px] uppercase font-bold">Schedule Trigger</span>
                    <span class="font-semibold text-slate-800 text-[11px]">${r.trigger}</span>
                  </div>
                  <div>
                    <span class="text-slate-400 block text-[10px] uppercase font-bold">Dispatch Channel</span>
                    <span class="font-semibold text-slate-800 text-[11px]">${r.channel}</span>
                  </div>
                  <div class="col-span-2 pt-1">
                    <span class="text-slate-400 block text-[10px] uppercase font-bold">Last Execution</span>
                    <span class="font-semibold text-emerald-700 text-[11px]">${r.lastRun}</span>
                  </div>
                </div>
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span class="text-[10px] font-bold text-slate-400">Reliability: <strong class="text-emerald-600">${r.successRate}</strong></span>
                <button 
                  onclick="AutomationView.runManual(${idx})"
                  class="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <i data-lucide="play" class="w-3.5 h-3.5 text-[#E8752F]"></i>
                  <span>Test Run Now</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  function toggleRule(idx) {
    rules[idx].active = !rules[idx].active;
    Toast.info(rules[idx].name, `Automation status set to ${rules[idx].active ? 'Active' : 'Disabled'}`);
    refresh();
  }

  function runManual(idx) {
    Toast.success('Trigger Completed', `Executed rule ${rules[idx].name}. All target recipients notified.`);
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
    toggleRule,
    runManual
  };
})();
