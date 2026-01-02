// /src/js/services/shopify.js
// Shopify Storefront API - Cart only (auth handled by Hub)

// ─────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────
const CONFIG = {
  domain: 'onsite-9957.myshopify.com',
  apiVersion: '2024-01',
  storefrontToken: '3c5543878a0ff78bead301345372a5c7'
};

const ENDPOINT = `https://${CONFIG.domain}/api/${CONFIG.apiVersion}/graphql.json`;

// ─────────────────────────────────────────
// BASE FETCH
// ─────────────────────────────────────────
async function shopifyFetch(query, variables = {}) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Shopify-Storefront-Access-Token': CONFIG.storefrontToken
    },
    body: JSON.stringify({ query, variables })
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok || json.errors) {
    const message = json?.errors?.[0]?.message || `Shopify error (${response.status})`;
    throw new Error(message);
  }

  return json.data;
}

// ─────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────
const PRODUCT_FIELDS = `
  id
  title
  handle
  description
  featuredImage { url altText }
  priceRange { 
    minVariantPrice { 
      amount 
      currencyCode 
    } 
  }
  variants(first: 1) { 
    edges { 
      node { id } 
    } 
  }
`;

export async function fetchProducts(limit = 24) {
  const query = `
    query ($first: Int!) {
      products(first: $first, sortKey: UPDATED_AT, reverse: true) {
        edges { 
          node { ${PRODUCT_FIELDS} } 
        }
      }
    }
  `;
  
  const data = await shopifyFetch(query, { first: limit });
  return (data?.products?.edges || []).map(e => e.node);
}

export async function fetchCollection(handle, limit = 24) {
  const query = `
    query ($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        title
        products(first: $first) {
          edges { 
            node { ${PRODUCT_FIELDS} } 
          }
        }
      }
    }
  `;
  
  const data = await shopifyFetch(query, { handle, first: limit });
  const edges = data?.collection?.products?.edges || [];
  
  return {
    title: data?.collection?.title,
    products: edges.map(e => e.node)
  };
}

// ─────────────────────────────────────────
// CART
// ─────────────────────────────────────────
export async function createCart(lines = []) {
  const query = `
    mutation ($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { 
          id 
          checkoutUrl 
        }
        userErrors { message }
      }
    }
  `;
  
  const data = await shopifyFetch(query, { lines });
  const error = data?.cartCreate?.userErrors?.[0]?.message;
  
  if (error) throw new Error(error);
  
  return data.cartCreate.cart;
}

export async function addToCart(cartId, lines) {
  const query = `
    mutation ($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { 
          id 
          checkoutUrl 
          totalQuantity 
        }
        userErrors { message }
      }
    }
  `;
  
  const data = await shopifyFetch(query, { cartId, lines });
  const error = data?.cartLinesAdd?.userErrors?.[0]?.message;
  
  if (error) throw new Error(error);
  
  return data.cartLinesAdd.cart;
}

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────
export function getShopUrl() {
  return `https://${CONFIG.domain}`;
}
