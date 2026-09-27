// Reusable Modal Manager Component
window.ModalManager = (function() {
  function open(modalId, onOpenCallback) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    requestAnimationFrame(() => {
      const backdrop = modal.querySelector('.modal-backdrop');
      const dialog = modal.querySelector('.modal-dialog');
      if (backdrop) backdrop.classList.remove('opacity-0');
      if (dialog) {
        dialog.classList.remove('scale-95', 'opacity-0');
        dialog.classList.add('scale-100', 'opacity-100');
      }
    });

    if (typeof onOpenCallback === 'function') {
      onOpenCallback(modal);
    }
  }

  function close(modalId) {
    const modal = typeof modalId === 'string' ? document.getElementById(modalId) : modalId;
    if (!modal) return;

    const backdrop = modal.querySelector('.modal-backdrop');
    const dialog = modal.querySelector('.modal-dialog');

    if (backdrop) backdrop.classList.add('opacity-0');
    if (dialog) {
      dialog.classList.add('scale-95', 'opacity-0');
      dialog.classList.remove('scale-100', 'opacity-100');
    }

    setTimeout(() => {
      modal.classList.add('hidden');
      // Check if any other modal is open
      const remainingOpen = document.querySelectorAll('.modal-container:not(.hidden)');
      if (remainingOpen.length === 0) {
        document.body.classList.remove('overflow-hidden');
      }
    }, 200);
  }

  // Global ESC key to close topmost modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('.modal-container:not(.hidden)');
      if (openModals.length > 0) {
        close(openModals[openModals.length - 1]);
      }
    }
  });

  return {
    open,
    close
  };
})();
