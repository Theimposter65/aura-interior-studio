# AURA Studio & Atelier 🏛️

> **Where spatial poetry meets tactile permanence.**
> An editorial luxury web platform for selling interior design concepts, turnkey spatial planning services, and bespoke wall murals with real-time interactive room visualization.

---

## ✨ Key Features

- **🏛️ Curated Design Archive**: Three distinct revenue streams — *Wall Designs & Murals*, *Interior Spatial Plans*, and *Material Concept Packages*.
- **🎨 Interactive Room & Wall Visualizer**:
  - Test archival artworks and mineral murals across 4 realistic architectural environments (Living Room, Bedroom, Dining Atelier, Executive Studio).
  - Real-time wall paint tinting with 6 mineral pigments (Alabaster, Limewash Greige, Nordic Sage, Terracotta, Charcoal, Oat).
  - Dynamic frame profile previews (White Oak, Matte Noir, Champagne Brass, Gallery Float Acrylic).
  - Daylight vs. Twilight ambient lighting modes.
  - Proportional visual scaling slider (75% to 125%).
- **📐 Interior Planning Services & Style Philosophy Quiz**:
  - 3 tiered advisory packages: *Essential Room Concept*, *Comprehensive 3D Spatial Planning*, and *Full Architectural Styling*.
  - 4-step interactive questionnaire dynamically recommending the optimal service tier based on room scope, aesthetic style, visualization needs, and budget.
  - Consultation booking modal with calendar date picker and input validation.
- **🛍️ Slide-Over Shopping Bag & Checkout**:
  - Dynamic subtotal, promotional discount verification (`ATELIER10`, `ARCHITECT15`, `SUMMERLUXE`), complimentary shipping threshold ($500+), and estimated tax.
  - LocalStorage persistence (`aura_cart_v1`) preserving cart state across sessions.
  - Instant simulated checkout with bespoke order confirmation receipts.
- **📱 100% Responsive & Accessible**: Seamless mobile navigation drawer, fluid typography, and touch-friendly controls.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with bespoke editorial design tokens
- **Typography**: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) & [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/) (8 test suites, 27 passing tests)
- **CI/CD & Hosting**: GitHub Pages via GitHub Actions

---

## 🚀 Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/Theimposter65/aura-interior-studio.git
cd aura-interior-studio/web

# Install dependencies
npm install

# Start local development server
npm run dev

# Run automated test suite
npm test

# Build for production
npm run build
```

---

## 🧪 Testing & Quality Gates

Run the test suite with Vitest:

```bash
cd web
npm test
```

All 8 test suites cover:
- Data model integrity & category classification
- Shopping cart math, promo codes, and storage persistence
- Product filtering, reactive keyword search, and sorting
- Visualizer state, scaling bounds, and wall paint blending
- 4-step style quiz scoring algorithm and consultation form validation

---

## 📄 License

MIT © AURA Studio & Atelier Inc.
