// Toast Notification Component
window.Toast = (function() {
  function getContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none';
      document.body.appendChild(container);
    }
    return container;
  }

  function show(title, message = '', type = 'info', duration = 3500) {
    const container = getContainer();
    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xl transition-all duration-300 transform translate-y-3 opacity-0';

    let iconSvg = '';
    let badgeClass = '';

    if (type === 'success') {
      badgeClass = 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      iconSvg = `<svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
    } else if (type === 'warning') {
      badgeClass = 'bg-amber-50 text-amber-600 border border-amber-200';
      iconSvg = `<svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;
    } else if (type === 'error') {
      badgeClass = 'bg-rose-50 text-rose-600 border border-rose-200';
      iconSvg = `<svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;
    } else {
      badgeClass = 'bg-orange-50 text-[#E8752F] border border-orange-200';
      iconSvg = `<svg class="w-5 h-5 text-[#E8752F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
    }

    toast.innerHTML = `
      <div class="p-1 rounded-lg ${badgeClass} shrink-0 mt-0.5">
        ${iconSvg}
      </div>
      <div class="flex-1 text-sm">
        <h4 class="font-semibold text-slate-800 leading-tight">${title}</h4>
        ${message ? `<p class="text-xs text-slate-500 mt-1 leading-relaxed">${message}</p>` : ''}
      </div>
      <button class="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors -mr-1 -mt-1" onclick="this.closest('div').remove()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
    });

    // Auto dismiss
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-x-4');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  return {
    success: (title, msg, dur) => show(title, msg, 'success', dur),
    warning: (title, msg, dur) => show(title, msg, 'warning', dur),
    error: (title, msg, dur) => show(title, msg, 'error', dur),
    info: (title, msg, dur) => show(title, msg, 'info', dur)
  };
})();
