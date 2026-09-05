# 🚀 Jose Carl Angeles - Developer Portfolio

Welcome to the source code of my personal portfolio. I built this because I needed a place to showcase my projects, and as a full-stack engineer who loves backend architecture, I obviously had to over-engineer the contact form with Redis rate-limiting and a custom email pipeline.

**Built with:**
- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** (Because writing vanilla CSS is a choice I'm not willing to make)
- **Motion** (For those buttery smooth animations and the interactive draggable schema)
- **MDX** (For project case studies and blog posts, so I don't have to write HTML)
- **Resend & Upstash Redis** (To make sure I actually get emails, but not *too many* emails from bots)

---

## 🥷 Want to steal this for your own portfolio?

Go for it! I built it to be highly modular and easy to read. If you like the layout, the interactive draggable tech graph, or the dark-mode glassmorphism vibes, here's how to spin it up for yourself:

### 1. Clone & Install
```bash
git clone https://github.com/JcAngeles1024/portfolio.git my-portfolio
cd my-portfolio
npm install
```

### 2. Configure Environment Variables
Copy the example environment file to get started:
```bash
cp .env.example .env
```
You'll need a couple of free accounts if you want the contact form to actually work:
- **[Resend](https://resend.com):** For sending the emails to your inbox.
- **[Upstash](https://console.upstash.com):** For the Redis database to rate-limit the contact form (so bots don't eat your Resend quota).

*(If you don't want the contact form at all, just delete `src/app/contact/actions.ts` and remove the `<ContactCTA />` section from `src/app/page.tsx` and live your life in peace.)*

### 3. Rip Out My Face and Name
You probably don't want to apply for jobs pretending to be "Jose Carl Angeles." 
- Replace the avatar image in `public/avatar.jpg`
- Replace the resume PDF in `public/resume.pdf`
- Update the site metadata and title in `src/app/layout.tsx`
- Swap out the social links in `src/components/layout/footer.tsx` and `src/components/sections/contact-cta.tsx`
- Write your own case studies in `src/content/projects/` (they use Markdown/MDX!). You can change the colors, tags, and metrics right in the frontmatter.

### 4. Run it
```bash
npm run dev
```
Now open [http://localhost:3000](http://localhost:3000) and marvel at your new site.

---

## License

Do whatever you want with the code. Use it, fork it, break it. If it helps you land a job, that's awesome! If it breaks your computer, I take no responsibility (but it shouldn't). Happy coding!
