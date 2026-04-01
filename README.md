# 🤖 Persona Builder

> สร้าง AI Persona (`skill.md`) สำหรับ Vibe-Coding ด้วยกรอบการวิเคราะห์เชิงลึก 6 มิติ

**🌐 Live:** [persona.autobahn.bot](https://persona.autobahn.bot)

---

## ✨ Features

- **6-Dimension Personality Analysis** — โลกทัศน์, มุมมอง, ตัวตน, รสนิยม, การเชิญชวน, ขอบเขต
- **Clone Mode** — จำลอง AI Persona จากตัวผู้ใช้งานเอง
- **Agent Mode** — ออกแบบ AI Agent เฉพาะทางจากศูนย์
- **Writing Reference Analysis** — วิเคราะห์สไตล์จากตัวอย่างข้อความจริง
- **Gemini AI Generation** — สังเคราะห์ `skill.md` ด้วย Gemini 2.5 Flash
- **Download & Copy** — ส่งออกเป็นไฟล์ `.md` พร้อมใช้งานทันที

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| AI | Google Gemini API |
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

# Start dev server (client-side API key)
echo "VITE_GEMINI_API_KEY=your-key-here" > .env.local
npm run dev

# Or with Cloudflare Functions (requires wrangler login)
echo "GEMINI_API_KEY=your-key-here" > .dev.vars
npm run pages:dev
```

### Build

```bash
npm run build
```

## ☁️ Deployment (Cloudflare Pages)

### 1. Connect Repository

Link this repo to Cloudflare Pages with:
- **Build command:** `npm run build`
- **Output directory:** `dist`

### 2. Set Environment Variable

In Cloudflare Pages dashboard → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `GEMINI_API_KEY` | Your Google AI API key |

### 3. Custom Domain

Configure `persona.autobahn.bot` in Cloudflare Pages → Custom Domains.

## 📐 Architecture

```
├── index.html              # Vite HTML entry
├── src/
│   ├── main.jsx            # React entry
│   ├── index.css           # Tailwind + animations
│   ├── App.jsx             # Main application
│   ├── data/
│   │   └── questionFlow.js # 6-dimension question trees
│   └── lib/
│       └── api.js          # Gemini API client
├── functions/
│   └── api/
│       └── generate.js     # Cloudflare Function (API proxy)
└── research/               # Internal references (gitignored)
```

## 📄 License

MIT
