# JayaSuriyan M | Python Full Stack Developer Portfolio

A modern, high-performance developer portfolio built with React, Vite, TailwindCSS, Framer Motion, and a Flask REST API backend with SMTP email delivery.

![Portfolio Preview](/public/og-image.jpg)

---

## 🌟 Live Demo & Repository
- **Live Website:** [https://jayasuriyan-portfolio.onrender.com](https://jayasuriyan-portfolio.onrender.com) *(Replace with your live Render URL)*
- **GitHub Repository:** [https://github.com/jsuriyan89-pixel/jayasuriyan](https://github.com/jsuriyan89-pixel/jayasuriyan)

---

## 🚀 Features
- **Modern Developer UI:** Dark cyberpunk/amber terminal-inspired aesthetic with glassmorphism and smooth micro-animations.
- **Interactive Terminal:** Built-in interactive terminal simulator with custom commands (`help`, `about`, `skills`, `projects`, `theme`, `clear`, etc.).
- **Live Contact Form with Real SMTP:** Fully working contact form connected via Flask REST API (`POST /api/contact`) sending messages directly to Gmail with STARTTLS.
- **Dynamic Theme Customizer:** On-the-fly accent color selection and dark/light modes.
- **Responsive Design:** Optimized for mobile phones, tablets, laptops, and ultra-wide desktops.
- **SEO & Social Sharing Ready:** Complete Open Graph, Twitter Cards, canonical tags, `robots.txt`, and XML sitemap.
- **Single-Server Full-Stack Deployment:** Flask serves both the compiled SPA frontend and REST API from a single entry point.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** TailwindCSS + Vanilla CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Effects:** Canvas Confetti

### Backend
- **Framework:** Python 3 + Flask 3
- **WSGI Server:** Gunicorn (Production) / Flask dev server (Local)
- **Email Delivery:** Python `smtplib` + `email.message` (Gmail STARTTLS on port 587)
- **CORS Support:** `flask-cors`
- **Environment Management:** `python-dotenv`

---

## 📁 Project Structure

```
suriyan/
├── app.py                     # Main Flask application & API routes
├── wsgi.py                    # Production WSGI entry point for Gunicorn
├── build.sh                   # Render / Linux CI/CD build script
├── render.yaml                # Render Infrastructure-as-Code configuration
├── requirements.txt           # Python backend dependencies
├── package.json               # Node.js frontend dependencies & scripts
├── vite.config.js             # Vite configuration with proxy
├── tailwind.config.js         # Tailwind styling design tokens
├── index.html                 # HTML entry point with SEO metadata
├── .env.example               # Environment variables template
├── .gitignore                 # Excluded directories & secrets
├── public/                    # Static public assets
│   ├── favicon.svg            # Custom SVG favicon
│   ├── og-image.jpg           # Open Graph social preview image
│   ├── robots.txt             # Search engine crawling rules
│   └── sitemap.xml            # Search engine sitemap
├── src/                       # React frontend source code
│   ├── components/            # UI components (Hero, About, Contact, Terminal, etc.)
│   ├── data/                  # Portfolio data & content
│   ├── hooks/                 # React custom hooks (theme, etc.)
│   ├── App.jsx                # Main React App component
│   └── main.jsx               # React DOM rendering
└── tests/                     # Backend automated tests
    └── test_contact_api.py    # Unit tests for Contact API & SMTP
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and fill in your details:

```bash
cp .env.example .env
```

| Variable | Description | Example |
| :--- | :--- | :--- |
| `MAIL_SERVER` | SMTP host | `smtp.gmail.com` |
| `MAIL_PORT` | SMTP port | `587` |
| `MAIL_USERNAME` | Your Gmail address | `jayasuriyan343@gmail.com` |
| `MAIL_PASSWORD` | 16-character Gmail App Password | `abcdefghijklmnop` |
| `MAIL_RECEIVER` | Destination email address | `jayasuriyan343@gmail.com` |

> [!IMPORTANT]
> **Gmail App Password:** Google requires a 16-character App Password (not your personal Gmail password). Generate it at: [Google Account Security](https://myaccount.google.com/security) → **2-Step Verification** → **App passwords**.

---

## 💻 Local Development

### 1. Install Dependencies
```bash
# Frontend dependencies
npm install

# Backend dependencies
pip install -r requirements.txt
```

### 2. Run in Development Mode
```bash
# Terminal 1: Start Flask Backend (Port 5000)
python app.py

# Terminal 2: Start Vite Dev Server (Port 5173)
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Run Production Build Locally (Single Server)
```bash
# Build frontend
npm run build

# Run unified Flask server
python app.py
```
Open [http://localhost:5000/](http://localhost:5000/) in your browser.

---

## 🧪 Testing

Run backend unit tests:
```bash
python -m unittest tests/test_contact_api.py
```

Run frontend linter:
```bash
npm run lint
```

---

## ☁️ Deployment on Render

### Method 1: Using `render.yaml` (Blueprint)
1. Push your repository to GitHub.
2. In [Render Dashboard](https://dashboard.render.com/), click **New** → **Blueprint**.
3. Connect your GitHub repository (`jsuriyan89-pixel/jayasuriyan`).
4. Render will detect `render.yaml` automatically.
5. In the environment variables section, set your `MAIL_USERNAME`, `MAIL_PASSWORD`, and `MAIL_RECEIVER`.
6. Click **Apply**.

### Method 2: Manual Web Service Setup
1. In Render, click **New +** → **Web Service**.
2. Connect your GitHub repository.
3. Configure the following:
   - **Environment:** `Python`
   - **Build Command:** `./build.sh` (or `npm install && npm run build && pip install -r requirements.txt`)
   - **Start Command:** `gunicorn app:app`
   - **Plan:** Free
4. Add Environment Variables:
   - `MAIL_SERVER` = `smtp.gmail.com`
   - `MAIL_PORT` = `587`
   - `MAIL_USERNAME` = `your-email@gmail.com`
   - `MAIL_PASSWORD` = `your-16-char-gmail-app-password`
   - `MAIL_RECEIVER` = `your-email@gmail.com`
5. Click **Deploy Web Service**.

---

## 🌐 Custom Domain Setup
To connect a custom domain (e.g., `www.jayasuriyan.dev`):
1. In your Render Web Service dashboard, go to **Settings** → **Custom Domains**.
2. Click **Add Custom Domain** and enter your domain name.
3. Configure the CNAME and ALIAS DNS records with your DNS provider as instructed by Render.
4. Render automatically provisions a free Let's Encrypt SSL certificate for HTTPS.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
