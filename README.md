# 💳 KIKQrcards

**KIKQrcards** is a smart digital card platform that lets users create and share personalized digital business cards using QR codes. Designed for professionals, freelancers, creators, and students, it offers a clean, contactless, and customizable way to network and share information.

Built with **Next.js**, **Tailwind CSS**, and **Firebase**, this platform is mobile-friendly, fast, and easy to use.

---

## ✨ Features

- 🔐 **User Authentication** with Google or email/password
- 🧑‍💼 **Create/Edit Smart Cards** with name, role, bio, and links
- 🎨 **Card Customization** with color themes and templates
- 📱 **Mobile-Optimized Public Cards** with unique URLs
- 📤 **QR Code Generation** for easy sharing
- 🌐 **Responsive Design** for all devices
- ⚙️ **Admin Dashboard** (future scope)
- 📊 **Card Analytics** (Pro feature - coming soon)

---

## 🧱 Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Frontend    | Next.js, React, Tailwind CSS  |
| State Mgmt  | React hooks |
| Styling     | Tailwind CSS, Framer Motion   |
| Auth        | Firebase Authentication       |
| Database    | Firebase Firestore            |
| File Upload | Firebase Storage              |
| QR Codes    | react-qr-code                 |
| Hostings    | netlify                       |
| Versioning  | Git + GitHub                  |

---




```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
