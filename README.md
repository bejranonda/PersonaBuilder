# 🤖 Persona Builder

> สร้าง AI Persona (`skill.md`) สำหรับ Vibe-Coding ด้วยกรอบการวิเคราะห์เชิงลึก 6 มิติ

**🌐 Live:** [persona.autobahnn.bot](https://persona.autobahnn.bot)

---

## ✨ Features

- **Multi-language Support** — รองรับภาษาไทย (TH), English (EN), และ Deutsch (DE)
- **6-Dimension Personality Analysis** — โลกทัศน์, มุมมอง, ตัวตน, รสนิยม, การเชิญชวน, ขอบเขต
- **Clone Mode** — จำลอง AI Persona จากตัวผู้ใช้งานเอง
- **Agent Mode** — ออกแบบ AI Agent เฉพาะทางจากศูนย์
- **Cloudflare Workers AI** — ขับเคลื่อนด้วย Llama 3 (Free-tier) ผ่าน Cloudflare แทน Gemini
- **Before vs After Showcase** — ทดสอบการเปลี่ยนผ่านข้อความก่อนและหลังด้วย Persona ที่สร้างเสร็จ
- **Download & Copy** — ส่งออกเป็นไฟล์ `.md` พร้อมใช้งานทันที

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Localization | Custom Dictionary-based i18n |
| AI | Cloudflare Workers AI (@cf/meta/llama-3-8b-instruct) |
| Hosting | Cloudflare Pages |
| API Proxy | Cloudflare Functions |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Or with Cloudflare Functions proxy (requires wrangler)
# Update .dev.vars with your CF API Token and Account ID first!
npm run pages:dev
```

## ☁️ Deployment (Cloudflare Pages)

### 1. Connect Repository

Link this repo to Cloudflare Pages with:
- **Build command:** `npm run build`
- **Output directory:** `dist`

### 2. Set Environment Variables

In Cloudflare Pages dashboard → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `CLOUDFLARE_API_TOKEN` | Your Cloudflare API token |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |

### 3. Custom Domain

Configure `persona.autobahnn.bot` in Cloudflare Pages → Custom Domains.

## 📐 Architecture

```
├── index.html              # Vite HTML entry
├── src/
│   ├── main.jsx            # React entry
│   ├── index.css           # Tailwind + animations
│   ├── App.jsx             # Main application (UI + i18n logic)
│   ├── data/
│   │   └── questionFlow.js # 6-dimension question trees (multi-lang)
│   └── lib/
│       ├── api.js          # Cloudflare AI proxy client
│       └── i18n.js         # Localization dictionary
├── functions/
│   └── api/
│       └── generate.js     # Cloudflare Function proxying Workers AI
└── knowledge/              # Documentation and guidelines
```

## 📄 License

MIT
