# Frontend Folder Structure Convention

Struktur folder `src/` yang disepakati untuk project ini (frontend POS system). Ikuti struktur ini setiap kali membuat file/komponen baru — jangan taruh file di luar kategori yang sesuai.

```
frontend/
├── node_modules/
├── public/
├── src/
│   ├── api/            # Backend connection - semua API calls & integrations (axios instance, endpoint functions)
│   ├── assets/         # Static files - gambar, font, resource statis lainnya
│   ├── components/
│   │   ├── layout/     # Komponen layout (Header, Sidebar, Footer, MainLayout, dsb)
│   │   ├── ui/         # Reusable UI components generik (Button, Input, Modal, Card, Badge, dsb)
│   │   └── <feature>/  # Komponen spesifik per halaman/fitur, mis. dashboard/, transactions/, inventory/
│   ├── context/        # Global state management pakai React Context
│   ├── data/           # Static content - data lokal, konstanta, config
│   ├── hooks/          # Custom reusable React hooks
│   ├── pages/          # Application pages - komponen per route
│   ├── redux/          # Advanced state management - store, slices, actions, reducers
│   ├── services/       # Frontend logic - business logic & service functions
│   └── utils/          # Utility/helper functions
├── App.jsx / App.tsx
├── eslint.config.js / .oxlintrc.json
├── index.html
├── package-lock.json
├── package.json
├── .gitignore
└── README.md
```

## Catatan implementasi

- Package yang disetujui untuk dipasang saat dibutuhkan sesuai struktur ini:
  - **Axios** → untuk folder `api/`
  - **React Router DOM** → untuk folder `pages/` (routing per halaman)
  - **Redux Toolkit + React-Redux** → untuk folder `redux/`
- Project saat ini masih scaffold default Vite + React 19 + TypeScript + Tailwind v4 (belum ada folder-folder di atas). Folder-folder ini dibuat **on-demand** — sesuai arahan user, jangan generate semua folder sekaligus di muka. Buat folder/file begitu ada kebutuhan nyata (misalnya saat mulai membuat tampilan/fitur tertentu), lalu ikuti kategori di atas.
- `context/` (React Context) dan `redux/` (Redux Toolkit) sama-sama disediakan — gunakan `context/` untuk state yang sederhana/lokal-ish, `redux/` untuk state global yang lebih kompleks/lintas fitur.
