// /src/js/ui/nav.js
// Navegação e scroll suave

export function initNav() {
  // Smooth scroll para links internos
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Atualiza URL sem reload
      history.pushState(null, '', `#${targetId}`);
    }
  });

  // Highlight nav item ativo baseado no scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"], .main-nav a[href*="#"]');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            
            navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              const isActive = href === `#${id}` || href.endsWith(`#${id}`);
              link.classList.toggle('is-active', isActive);
            });
          }
        });
      },
      { 
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0 
      }
    );

    sections.forEach((section) => observer.observe(section));
  }
}

// Scroll to hash on page load
export function scrollToHash() {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      // Pequeno delay pra garantir que a página carregou
      setTimeout(() => {
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }
}
