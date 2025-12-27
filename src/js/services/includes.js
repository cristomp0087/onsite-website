// /src/js/services/includes.js
// Sistema de includes HTML - carrega componentes via data-include

export async function loadIncludes(root = document) {
  const MAX_PASSES = 10; // Evita loop infinito
  
  for (let pass = 0; pass < MAX_PASSES; pass++) {
    const nodes = root.querySelectorAll('[data-include]');
    
    if (!nodes.length) break;

    // Processa sequencialmente pra evitar race conditions
    for (const el of nodes) {
      const url = el.getAttribute('data-include');
      if (!url) continue;

      try {
        const response = await fetch(url, { cache: 'no-store' });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const html = (await response.text()).trim();

        // Verifica se elemento ainda existe no DOM
        if (!el.isConnected) continue;

        // Cria template e substitui
        const template = document.createElement('template');
        template.innerHTML = html;
        el.replaceWith(template.content);
        
      } catch (error) {
        console.error(`[includes] Failed to load: ${url}`, error);
        
        if (el.isConnected) {
          el.outerHTML = `<!-- include failed: ${url} -->`;
        }
      }
    }
  }
}
