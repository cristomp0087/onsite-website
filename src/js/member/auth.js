// /src/js/member/auth.js
// Login and Registration with Shopify Customer API

import { customerCreate, customerLogin } from '../services/shopify.js';
import { addBlades } from '../ui/blades.js';

// ─────────────────────────────────────────
// DOM Elements
// ─────────────────────────────────────────
const loginCard = document.getElementById('loginCard');
const registerCard = document.getElementById('registerCard');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginError = document.getElementById('loginError');
const registerError = document.getElementById('registerError');

// ─────────────────────────────────────────
// Toggle between Login/Register
// ─────────────────────────────────────────
document.querySelectorAll('[data-show]').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-show');
    
    // Hide all cards
    loginCard?.removeAttribute('hidden');
    registerCard?.setAttribute('hidden', '');
    
    // Show target card
    if (targetId === 'registerCard') {
      loginCard?.setAttribute('hidden', '');
      registerCard?.removeAttribute('hidden');
    }
  });
});

// Check URL hash for register
if (window.location.hash === '#register') {
  loginCard?.setAttribute('hidden', '');
  registerCard?.removeAttribute('hidden');
}

// ─────────────────────────────────────────
// Login Form
// ─────────────────────────────────────────
loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const submitBtn = document.getElementById('loginSubmit');
  
  // Loading state
  setLoading(submitBtn, true);
  hideError(loginError);
  
  try {
    const token = await customerLogin(email, password);
    
    if (token?.accessToken) {
      // Save token
      localStorage.setItem('onsite_customer_token', token.accessToken);
      localStorage.setItem('onsite_customer_expires', token.expiresAt);
      
      // Redirect to dashboard
      window.location.href = './index.html';
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    showError(loginError, error.message || 'Invalid email or password');
  } finally {
    setLoading(submitBtn, false);
  }
});

// ─────────────────────────────────────────
// Register Form
// ─────────────────────────────────────────
registerForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const firstName = document.getElementById('registerFirstName').value;
  const lastName = document.getElementById('registerLastName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const submitBtn = document.getElementById('registerSubmit');
  
  // Loading state
  setLoading(submitBtn, true);
  hideError(registerError);
  
  try {
    // Create customer
    const customer = await customerCreate({
      firstName,
      lastName,
      email,
      password
    });
    
    if (customer) {
      // Auto login after registration
      const token = await customerLogin(email, password);
      
      if (token?.accessToken) {
        localStorage.setItem('onsite_customer_token', token.accessToken);
        localStorage.setItem('onsite_customer_expires', token.expiresAt);
        
        // Award welcome Blades
        addBlades(2, 'Welcome bonus - account created');
        
        // Redirect to dashboard
        window.location.href = './index.html';
      }
    }
  } catch (error) {
    console.error('Register error:', error);
    showError(registerError, error.message || 'Could not create account. Try again.');
  } finally {
    setLoading(submitBtn, false);
  }
});

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────
function setLoading(btn, isLoading) {
  if (!btn) return;
  
  const text = btn.querySelector('.btn-text');
  const loading = btn.querySelector('.btn-loading');
  
  if (isLoading) {
    btn.disabled = true;
    text?.setAttribute('hidden', '');
    loading?.removeAttribute('hidden');
  } else {
    btn.disabled = false;
    text?.removeAttribute('hidden');
    loading?.setAttribute('hidden', '');
  }
}

function showError(el, message) {
  if (!el) return;
  const textEl = el.querySelector('.auth-error-text');
  if (textEl) textEl.textContent = message;
  el.removeAttribute('hidden');
}

function hideError(el) {
  el?.setAttribute('hidden', '');
}
