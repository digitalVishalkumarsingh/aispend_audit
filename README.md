# StackSave — AI Spend Audit Tool

**Cut your AI bill in half.**  
Paste in your AI subscriptions, get a brutal breakdown of what you're wasting, and a shareable report in 30 seconds.

## What It Does

Most startups and teams are paying for 6–10 AI tools with overlapping features, unused seats, and wrong plans. 

**StackSave** audits your entire AI stack in under a minute and tells you exactly where the money is leaking.

**You enter:**
- Which AI tools you use
- Current plan & pricing
- Number of seats
- Team size & usage intensity

**You get:**
- Per-tool savings breakdown
- Total monthly & yearly savings estimate
- Specific, actionable recommendations
- AI-generated plain-English executive summary
- Beautiful, shareable report URL (send to your manager or team)

## Live Demo
🔗 [https://aispendaudit-tau.vercel.app/]("\https://aispendaudit-tau.vercel.app/)

> Open in incognito — no login required. Full flow works end-to-end.




## Features

- **Smart Audit Engine** with real pricing rules for major AI tools (ChatGPT, Claude, Cursor, GitHub Copilot, Perplexity, Gemini, etc.)
- **Per-tool savings calculation** based on usage patterns vs plan cost
- **AI-generated summary** via Gemini API with robust rule-based fallback
- **Unique shareable result URL** (no login needed)
- **Email capture** with confirmation via Resend
- **Persistent audit storage** in MongoDB
- **Mobile-responsive** modern dark UI

## Tech Stack

| Layer              | Technology                          |
|--------------------|-------------------------------------|
| Framework          | Next.js 15 (App Router) + React 19 |
| Language           | TypeScript                          |
| Styling            | Tailwind CSS                        |
| Database           | MongoDB (via Mongoose)              |
| AI Summary         | Google Gemini API + Rule-based fallback |
| Email              | Resend                              |
| Deployment         | Vercel                              |

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas (or local MongoDB)
- Google Gemini API key
- Resend API key

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/digitalVishalkumarsingh/aispend_audit
cd ai-spend-audit-tool

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Run the dev server
npm run dev