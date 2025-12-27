// /src/js/ui/folds.js
// Sistema de "dobras" - seções que expandem inline

export function initFolds() {
  // Botões que abrem folds
  const triggers = document.querySelectorAll('[data-fold-trigger]');
  
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-fold-trigger');
      const fold = document.getElementById(targetId);
      
      if (fold) {
        toggleFold(fold, trigger);
      }
    });
  });

  // Botões de fechar dentro das folds
  const closeButtons = document.querySelectorAll('[data-fold-close]');
  
  closeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const fold = btn.closest('.fold');
      if (fold) {
        closeFold(fold);
      }
    });
  });
}

function toggleFold(fold, trigger) {
  const isOpen = fold.classList.contains('is-open');
  
  if (isOpen) {
    closeFold(fold);
    trigger?.setAttribute('aria-expanded', 'false');
  } else {
    // Fecha outras folds abertas (opcional - accordion behavior)
    // document.querySelectorAll('.fold.is-open').forEach(closeFold);
    
    openFold(fold);
    trigger?.setAttribute('aria-expanded', 'true');
  }
}

function openFold(fold) {
  fold.classList.add('is-open');
  
  // Scroll suave até a fold
  setTimeout(() => {
    fold.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'nearest' 
    });
  }, 100);

  // Dispara evento custom
  fold.dispatchEvent(new CustomEvent('fold:open'));
}

function closeFold(fold) {
  fold.classList.remove('is-open');
  
  // Encontra e reseta o trigger
  const triggerId = fold.id;
  const trigger = document.querySelector(`[data-fold-trigger="${triggerId}"]`);
  trigger?.setAttribute('aria-expanded', 'false');

  // Dispara evento custom
  fold.dispatchEvent(new CustomEvent('fold:close'));
}

// Fecha fold com Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openFolds = document.querySelectorAll('.fold.is-open');
    openFolds.forEach(closeFold);
  }
});

// Export pra uso externo
export { openFold, closeFold, toggleFold };
