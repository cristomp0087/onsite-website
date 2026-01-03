# OnSite Club — Website

> Premium jobsite culture, essential tools, and a club for people who actually build.

## 🏗️ Arquitetura

Este é o **site principal** do OnSite Club. Faz parte de um ecossistema maior:

```
┌─────────────────────────────────────────────────────────────────┐
│  onsite.ca (Este repo - Site + E-commerce link)                 │
│  - Landing page                                                 │
│  - Clubroom (explicação do ecossistema)                         │
│  - Shop preview → Shopify                                       │
│  - Contact form                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  app.onsiteclub.ca (Hub Central)                                    │
│  - Login único (SSO) via Supabase                               │
│  - Dashboard com cards dos apps                                 │
│  - Gerenciamento de conta, subscription, perfil                 │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   Timekeeper            Calculator              Shop
   (Mobile App)          (Web/Mobile)          (Shopify)
```

## 📁 Estrutura

```
onsite-club/
├── index.html              # Home page
├── clubroom.html           # Explicação do ecossistema (com folds)
├── src/
│   ├── assets/images/      # Imagens
│   ├── components/
│   │   ├── header.html     # Nav: Home, Shop, Clubroom, Member Area
│   │   ├── footer.html     
│   │   └── blades-popup.html
│   ├── sections/
│   │   ├── hero.html       
│   │   ├── shop-preview.html
│   │   ├── social-hubs.html
│   │   └── contact.html    # Fale conosco simples
│   ├── styles/
│   │   ├── tokens.css      # Design tokens
│   │   ├── base.css        # Reset
│   │   ├── layout.css      
│   │   ├── components.css  
│   │   ├── sections.css    
│   │   └── clubroom.css    
│   └── js/
│       ├── main.js         
│       ├── services/
│       │   ├── includes.js 
│       │   └── shopify.js  # Apenas carrinho
│       └── ui/
│           ├── nav.js      
│           ├── blades.js   
│           └── folds.js    
└── README.md
```

## 🔗 Links Importantes

| Destino | URL |
|---------|-----|
| Shop (Shopify) | https://onsite-9957.myshopify.com |
| Member Area (Hub) | https://app.onsiteclub.ca |
| Contact Email | contact@shabba.ca |

## 🎨 Brand

- **Amarelo:** #F7B324
- **Preto:** #1A1A1A
- **Grafite:** #3D3D3D
- **Font:** Montserrat

## 🚀 Deploy

Site estático. Deploy em GitHub Pages ou Vercel.

```bash
# Local dev
npx serve

# ou Python
python -m http.server 8000
```

## 📝 Notas

- **Auth**: Não tem login no site. Member Area redireciona pro Hub.
- **Shop**: Abre Shopify direto (sem fricção).
- **Blades**: Sistema de pontos gerenciado pelo Hub.
- **Folds**: Sistema de "dobras" no Clubroom que expandem conteúdo.

---

Built with 🏗️ for OnSite Club
