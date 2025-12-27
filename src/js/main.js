// /src/js/main.js
// OnSite Club - Main entry point

import { loadIncludes } from './services/includes.js';
import { initNav, scrollToHash } from './ui/nav.js';
import { initBladesPopup } from './ui/blades.js';
import { initFolds } from './ui/folds.js';

// ─────────────────────────────────────────
// INIT
// ─────────────────────────────────────────
async function init() {
  try {
    // 1. Carrega includes primeiro (header, footer, sections)
    await loadIncludes();
    
    // 2. Inicializa navegação
    initNav();
    
    // 3. Inicializa popup de Blades
    initBladesPopup();
    
    // 4. Inicializa sistema de folds (clubroom)
    initFolds();
    
    // 5. Scroll to hash se existir
    scrollToHash();
    
    // 6. Marca página como carregada
    document.body.classList.add('is-loaded');
    
    console.log('🏗️ OnSite Club initialized');
    
  } catch (error) {
    console.error('❌ Init error:', error);
  }
}

// ─────────────────────────────────────────
// START
// ─────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
