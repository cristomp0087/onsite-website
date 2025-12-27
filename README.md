# OnSite Club v2.0

> Premium jobsite culture, essential tools, and a club for people who actually build.

## 🏗️ Project Structure

```
onsite-club/
├── index.html              # Home page
├── clubroom.html           # Club hub with folds
├── member/
│   └── index.html          # Member area (placeholder)
├── src/
│   ├── assets/
│   │   └── images/         # All images
│   ├── components/
│   │   ├── header.html     # Site header/nav
│   │   ├── footer.html     # Site footer
│   │   └── blades-popup.html # Loyalty points popup
│   ├── sections/
│   │   ├── hero.html       # Hero section
│   │   ├── shop-preview.html # Shop categories
│   │   ├── tools.html      # Digital tools
│   │   ├── social-hubs.html # Social links
│   │   └── contact.html    # Contact/join form
│   ├── styles/
│   │   ├── tokens.css      # Design tokens (colors, fonts)
│   │   ├── base.css        # Reset + defaults
│   │   ├── layout.css      # Grid, container, utilities
│   │   ├── components.css  # Header, footer, buttons
│   │   ├── sections.css    # All section styles
│   │   └── clubroom.css    # Clubroom-specific
│   └── js/
│       ├── main.js         # Entry point
│       ├── services/
│       │   ├── includes.js # HTML include system
│       │   └── shopify.js  # Shopify API integration
│       └── ui/
│           ├── nav.js      # Navigation & scroll
│           ├── blades.js   # Loyalty popup
│           └── folds.js    # Expandable sections
└── README.md
```

## 🎨 Brand Guide

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| OnSite Amber | `#F7B324` | Primary accent, CTAs |
| OnSite Black | `#1A1A1A` | Text, backgrounds |
| OnSite White | `#FFFFFF` | Text on dark |
| Graphite | `#3D3D3D` | Secondary text |

### Typography
- **Font:** Montserrat
- **Weights:** 400 (normal), 500 (medium), 700 (bold), 800 (black)

## 🔧 How It Works

### Include System
Components are loaded via `data-include` attribute:
```html
<div data-include="./src/components/header.html"></div>
```

### Folds System (Clubroom)
Expandable sections triggered by buttons:
```html
<button data-fold-trigger="fold-drops">See Drops</button>
<div class="fold" id="fold-drops">...</div>
```

### Shopify Integration
Connected to `onsite-9957.myshopify.com` via Storefront API.

## 🚀 Deployment

### GitHub Pages
1. Push to `main` branch
2. Enable Pages in repo settings
3. Set source to `/ (root)`

### Vercel
1. Connect repo
2. Framework: None (static)
3. Build: None required

### Important
All paths use `./` (relative), so deployment should work anywhere.

## 📋 TODO

### Phase 2: Clubroom Enhancement
- [ ] Complete pathway content
- [ ] Add more fold sections
- [ ] Implement fold animations

### Phase 3: Authentication
- [ ] Shopify Customer Login
- [ ] Member profile page
- [ ] Protected routes

### Phase 4: Blades System
- [ ] Connect to Shopify metafields
- [ ] Earn rules (purchases)
- [ ] Redeem flow

## 🛠️ Development

### Local Development
Use any static server:
```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve

# VS Code Live Server extension
```

### File Editing
- CSS is modular: edit the relevant file in `/src/styles/`
- Sections are separate: edit in `/src/sections/`
- Components are reusable: edit in `/src/components/`

## 📝 Notes

- No build step required (vanilla HTML/CSS/JS)
- ES Modules used (`type="module"`)
- Mobile-first responsive design
- WCAG accessibility basics included

---

Built with 🏗️ by OnSite Club
