// /src/js/ui/blades.js
// Sistema de Blades (pontos de fidelidade)

export function initBladesPopup() {
  const popup = document.querySelector('[data-blades-popup]');
  if (!popup) return;

  const pill = popup.querySelector('.blades-pop__pill');
  const panel = popup.querySelector('.blades-pop__panel');
  
  let closeTimer = null;

  const open = () => {
    clearTimeout(closeTimer);
    popup.classList.add('is-open');
    pill?.setAttribute('aria-expanded', 'true');
  };

  const close = () => {
    popup.classList.remove('is-open');
    pill?.setAttribute('aria-expanded', 'false');
  };

  const delayedClose = () => {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(close, 200);
  };

  // Hover
  popup.addEventListener('mouseenter', open);
  popup.addEventListener('mouseleave', delayedClose);

  // Focus
  popup.addEventListener('focusin', open);
  popup.addEventListener('focusout', delayedClose);

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Click no pill toggle
  pill?.addEventListener('click', () => {
    if (popup.classList.contains('is-open')) {
      close();
    } else {
      open();
    }
  });
}

// ─────────────────────────────────────────
// BLADES STORAGE (local por enquanto)
// Depois migra pra Shopify metafields
// ─────────────────────────────────────────
const STORAGE_KEY = 'onsite_blades';

export function getBlades() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { balance: 0, history: [] };
  } catch {
    return { balance: 0, history: [] };
  }
}

export function addBlades(amount, reason = '') {
  const data = getBlades();
  data.balance += amount;
  data.history.push({
    type: 'earn',
    amount,
    reason,
    date: new Date().toISOString()
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export function redeemBlades(amount, reason = '') {
  const data = getBlades();
  
  if (data.balance < amount) {
    throw new Error('Insufficient blades');
  }
  
  data.balance -= amount;
  data.history.push({
    type: 'redeem',
    amount,
    reason,
    date: new Date().toISOString()
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}
