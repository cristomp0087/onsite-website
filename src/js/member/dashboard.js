// /src/js/member/dashboard.js
// Member Dashboard - fetches customer data and displays it

import { getCustomer } from '../services/shopify.js';
import { getBlades } from '../ui/blades.js';

// ─────────────────────────────────────────
// DOM Elements
// ─────────────────────────────────────────
const loadingEl = document.getElementById('memberLoading');
const dashboardEl = document.getElementById('memberDashboard');
const guestEl = document.getElementById('memberGuest');

const memberNameEl = document.getElementById('memberName');
const bladesBalanceEl = document.getElementById('bladesBalance');
const totalOrdersEl = document.getElementById('totalOrders');
const memberSinceEl = document.getElementById('memberSince');
const memberLevelEl = document.getElementById('memberLevel');
const bladesHistoryEl = document.getElementById('bladesHistory');
const ordersListEl = document.getElementById('ordersList');
const logoutBtn = document.getElementById('logoutBtn');

// ─────────────────────────────────────────
// Init
// ─────────────────────────────────────────
async function init() {
  const token = localStorage.getItem('onsite_customer_token');
  const expires = localStorage.getItem('onsite_customer_expires');
  
  // Check if token exists and is not expired
  if (!token || (expires && new Date(expires) < new Date())) {
    showGuestState();
    return;
  }
  
  try {
    // Fetch customer data from Shopify
    const customer = await getCustomer(token);
    
    if (customer) {
      showDashboard(customer);
    } else {
      // Token invalid, clear and show guest
      clearAuth();
      showGuestState();
    }
  } catch (error) {
    console.error('Dashboard error:', error);
    // On error, show guest state
    clearAuth();
    showGuestState();
  }
}

// ─────────────────────────────────────────
// Show Dashboard
// ─────────────────────────────────────────
function showDashboard(customer) {
  // Hide loading, show dashboard
  loadingEl?.setAttribute('hidden', '');
  guestEl?.setAttribute('hidden', '');
  dashboardEl?.removeAttribute('hidden');
  
  // Populate customer data
  if (memberNameEl) {
    memberNameEl.textContent = customer.firstName || 'Builder';
  }
  
  // Orders
  const orders = customer.orders?.edges || [];
  if (totalOrdersEl) {
    totalOrdersEl.textContent = orders.length;
  }
  
  // Member since (from first order or just show current year)
  if (memberSinceEl) {
    if (orders.length > 0) {
      const firstOrder = orders[orders.length - 1]?.node;
      const date = new Date(firstOrder?.processedAt);
      memberSinceEl.textContent = date.toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });
    } else {
      memberSinceEl.textContent = new Date().getFullYear();
    }
  }
  
  // Blades (from localStorage for now)
  const bladesData = getBlades();
  if (bladesBalanceEl) {
    bladesBalanceEl.textContent = bladesData.balance;
  }
  
  // Calculate level based on blades
  if (memberLevelEl) {
    memberLevelEl.textContent = calculateLevel(bladesData.balance);
  }
  
  // Render Blades history
  renderBladesHistory(bladesData.history);
  
  // Render Orders
  renderOrders(orders);
}

// ─────────────────────────────────────────
// Show Guest State
// ─────────────────────────────────────────
function showGuestState() {
  loadingEl?.setAttribute('hidden', '');
  dashboardEl?.setAttribute('hidden', '');
  guestEl?.removeAttribute('hidden');
}

// ─────────────────────────────────────────
// Logout
// ─────────────────────────────────────────
logoutBtn?.addEventListener('click', () => {
  clearAuth();
  window.location.href = './login.html';
});

function clearAuth() {
  localStorage.removeItem('onsite_customer_token');
  localStorage.removeItem('onsite_customer_expires');
}

// ─────────────────────────────────────────
// Render Functions
// ─────────────────────────────────────────
function renderBladesHistory(history) {
  if (!bladesHistoryEl || !history || history.length === 0) return;
  
  const html = history
    .slice()
    .reverse()
    .slice(0, 10) // Last 10
    .map(item => `
      <div class="transaction-item">
        <div class="transaction-info">
          <span class="transaction-reason">${item.reason || (item.type === 'earn' ? 'Earned' : 'Redeemed')}</span>
          <span class="transaction-date">${formatDate(item.date)}</span>
        </div>
        <span class="transaction-amount ${item.type}">
          ${item.type === 'earn' ? '+' : '-'}${item.amount} Blades
        </span>
      </div>
    `)
    .join('');
  
  bladesHistoryEl.innerHTML = html;
}

function renderOrders(orders) {
  if (!ordersListEl || !orders || orders.length === 0) return;
  
  const html = orders
    .slice(0, 5) // Last 5 orders
    .map(({ node: order }) => `
      <div class="order-item">
        <div class="order-info">
          <span class="order-number">Order #${order.orderNumber}</span>
          <span class="order-date">${formatDate(order.processedAt)}</span>
        </div>
        <span class="order-total">$${parseFloat(order.totalPrice.amount).toFixed(2)}</span>
      </div>
    `)
    .join('');
  
  ordersListEl.innerHTML = html;
}

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────
function calculateLevel(blades) {
  if (blades >= 100) return 'Legend';
  if (blades >= 50) return 'Lead';
  if (blades >= 20) return 'Crew';
  if (blades >= 5) return 'Apprentice';
  return 'Rookie';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// ─────────────────────────────────────────
// Start
// ─────────────────────────────────────────
init();
