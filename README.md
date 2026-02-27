# Bheemesha K M — Portfolio

A clean, responsive, production-ready portfolio website built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **next-themes**.

---

## ✨ Features

- **Dark / Light mode** toggle (system-aware by default)
- **Smooth scroll** with subtle reveal animations (Framer Motion)
- **Fully responsive** mobile-first design
- **Accessible**: semantic HTML, ARIA labels, visible focus states
- **All Projects page** with search + tech-tag filter chips
- **Contact form** with client-side validation and mailto fallback
- **Floating "Back to top" button**
- **SEO**: OpenGraph, Twitter cards, robots.txt, sitemap.xml
- **Single data file** — edit `src/data/profile.ts` to update everything

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open http://localhost:3000
```

### Production build

```bash
npm run build
npm start
```

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (SEO metadata, ThemeProvider)
│   ├── page.tsx            # Home page (all sections)
│   ├── globals.css         # Global styles + CSS variables
│   └── projects/
│       └── page.tsx        # All Projects page with search & filters
├── components/
│   ├── BackToTop.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx
│   ├── SectionWrapper.tsx
│   ├── SkillChips.tsx
│   ├── ThemeProvider.tsx
│   ├── ThemeToggle.tsx
│   └── Timeline.tsx
├── data/
│   └── profile.ts          # ✏️ Single source of truth for all content
└── lib/
    └── utils.ts             # cn() utility (clsx + tailwind-merge)
public/
├── resume.pdf               # Place your resume PDF here
├── robots.txt
└── sitemap.xml
```

---

## ✏️ How to Edit Content

All portfolio content lives in **one file**:

```
src/data/profile.ts
```

Open it and edit any section: personal info, about, skills, experience, projects, education, certifications, extras, or SEO metadata. The entire site updates automatically.

---

## 📄 Adding Your Resume

1. Place your resume file as `resume.pdf` inside the `public/` folder.
2. The "Download Resume" button in the navbar and hero will link to `/resume.pdf`.

---

## 🌐 Deploy to Vercel

1. Push your project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the repository.
4. Vercel auto-detects Next.js — click **Deploy**.
5. Your site will be live at `your-project.vercel.app`.

To use a custom domain, add it in **Vercel → Settings → Domains**.

---

## 🛠 Tech Stack

| Tool            | Purpose                        |
| --------------- | ------------------------------ |
| Next.js 15      | React framework (App Router)   |
| TypeScript      | Type safety                    |
| Tailwind CSS 4  | Utility-first styling          |
| next-themes     | Dark/light mode                |
| Framer Motion   | Animations                     |
| lucide-react    | Icons                          |
| clsx + twMerge  | Conditional class names        |

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
