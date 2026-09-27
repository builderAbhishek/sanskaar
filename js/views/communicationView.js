// Notices, Circulars & Automated SMS/WhatsApp Alerts View
window.CommunicationView = (function() {
  let activeAudience = "All";

  function render() {
    const allNotices = window.ERP_DATA.notices || [];
    const filtered = allNotices.filter(n => activeAudience === 'All' || n.audience.includes(activeAudience));

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-bold text-slate-900">Communication & Notice Board</h1>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
                SMS & WhatsApp Gateway Active
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Broadcast administrative circulars, fee reminder alerts, and attendance notifications.</p>
          </div>

          <div class="flex items-center gap-2">
            <button 
              onclick="ModalManager.open('modal-create-notice')"
              class="flex items-center gap-1.5 px-4 py-2 bg-[#E8752F] text-white rounded-xl text-xs font-semibold hover:bg-[#D46320] shadow-2xs transition-colors"
            >
              <i data-lucide="plus" class="w-4 h-4"></i>
              <span>Publish New Circular</span>
            </button>
          </div>
        </div>

        <!-- Audience Filter Pills -->
        <div class="flex items-center gap-2">
          ${['All', 'Parents', 'Teachers', 'Students'].map(aud => `
            <button 
              onclick="CommunicationView.setAudience('${aud}')"
              class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeAudience === aud ? 'bg-[#E8752F] text-white shadow-2xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}"
            >
              ${aud === 'All' ? 'All Broadcasts' : aud + ' Only'}
            </button>
          `).join('')}
        </div>

        <!-- Notices Cards Grid -->
        <div class="space-y-4">
          ${filtered.map(n => `
            <div class="bg-white p-5 rounded-2xl border border-slate-200/80 card-shadow flex flex-col md:flex-row md:items-start justify-between gap-4 hover:border-orange-200 transition-all">
              <div class="space-y-2 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold ${n.status === 'Urgent' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}">
                    ${n.status}
                  </span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                    ${n.category}
                  </span>
                  <span class="text-xs text-slate-400 font-medium">Audience: <strong>${n.audience}</strong></span>
                  <span class="text-xs text-slate-400 font-mono">• ${n.id}</span>
                </div>

                <h3 class="text-base font-bold text-slate-900">${n.title}</h3>
                <p class="text-xs text-slate-600 leading-relaxed">${n.content}</p>

                <div class="flex items-center gap-4 text-[11px] text-slate-400 pt-2">
                  <span>Author: <strong>${n.author}</strong></span>
                  <span>Published: <strong>${n.publishedDate}</strong></span>
                  <span>Views: <strong>${n.views.toLocaleString('en-IN')} reads</strong></span>
                </div>
              </div>

              <div class="flex items-center md:flex-col gap-2 shrink-0 pt-2 md:pt-0">
                <button 
                  onclick="Toast.success('Notice Dispatched', 'Broadcast alert pushed to parent WhatsApp & portal')"
                  class="px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <i data-lucide="send" class="w-3.5 h-3.5"></i>
                  <span>Broadcast SMS</span>
                </button>
                <button 
                  onclick="Toast.info('Circular PDF', 'Opening print preview of circular ${n.id}')"
                  class="px-3.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <i data-lucide="printer" class="w-3.5 h-3.5"></i>
                  <span>Print Circular</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  function setAudience(aud) {
    activeAudience = aud;
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
    setAudience
  };
})();
