# 🛍️ OpenSource Retail Model Template

A modern, fully-featured e-commerce storefront built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. Designed as an open-source starting point for building beautiful retail web applications.

---

## ✨ Features

- 🏠 **Home Page** — Hero section with featured categories and promotional banners
- 🛒 **Shop Page** — Product grid with filtering by category, price range, and ratings
- 📦 **Product Detail Page** — Image gallery, color/size selectors, and add-to-cart
- 🛍️ **Cart Page** — Full order summary with quantity controls and checkout flow
- 🔔 **Toast Notifications** — Real-time feedback via `react-hot-toast`
- 📱 **Fully Responsive** — Mobile-first layout that works on all screen sizes
- 🎨 **Dark-accented Theme** — Curated color palette with smooth hover animations

---

## 🗂️ Product Categories

| Category | Icon |
|---|---|
| Electronics | 💻 |
| Clothing | 👕 |
| Home | 🏠 |
| Sports | 🏃 |
| Beauty | ✨ |
| Bike Spare Parts | 🚲 |

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev) | UI library |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Vite](https://vite.dev) | Build tool & dev server |
| [Tailwind CSS v3](https://tailwindcss.com) | Utility-first styling |
| [React Router v7](https://reactrouter.com) | Client-side routing |
| [Zustand](https://zustand-demo.pmnd.rs) | Lightweight global state (cart) |
| [Lucide React](https://lucide.dev) | Icon library |
| [react-hot-toast](https://react-hot-toast.com) | Toast notifications |

---

## 📁 Project Structure

```
src/
├── assets/           # Static images and SVGs
├── components/
│   ├── cart/         # CartItem, OrderSummary
│   ├── layout/       # Navbar, Footer, Layout wrapper
│   ├── product/      # ProductCard, ProductFilters
│   └── ui/           # Badge, StarRating (reusable primitives)
├── context/
│   └── CartStore.ts  # Zustand cart store
├── data/
│   └── mockData.ts   # Static product & category data
├── pages/
│   ├── HomePage.tsx
│   ├── ShopPage.tsx
│   ├── ProductDetailPage.tsx
│   └── CartPage.tsx
├── types/
│   └── index.ts      # Shared TypeScript interfaces
├── App.tsx           # Router configuration
├── main.tsx          # App entry point
└── index.css         # Global styles & Tailwind directives
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/GoldenEagle3k1/OpenSource-Retail-Model-Template.git

# 2. Navigate into the project
cd OpenSource-Retail-Model-Template

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a pull request or issue.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
