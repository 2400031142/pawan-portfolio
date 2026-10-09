# Narala Pawan — Personal Portfolio Website

A static personal portfolio web application created as part of Narala Pawan's college web development portfolio assignment series.

## 🎯 Project Overview
This project serves as a professional showcase for **Narala Pawan**, Freelance Web Developer and Full Stack Developer based in Rajahmundry, Andhra Pradesh, India.

It features:
- A responsive, glassmorphic navigation header with theme switching.
- Hero, About, Technical Skills, Featured Academic Projects, and Resume sections.
- Dual contact form persistence: **Browser LocalStorage** and **Google Sheets API** via Google Apps Script.
- Admin Login interface & Response Management Dashboard.
- Complete Light/Dark theme engine adhering to `prefers-reduced-motion` compliance.

---

## 🛠️ Technologies Used
- **HTML5** (Semantic structure)
- **CSS3** (Custom HSL color tokens, Flexbox, CSS Grid, Glassmorphic navbar)
- **Vanilla JavaScript (ES6+)**
- **Browser LocalStorage** (`portfolioContactResponses`)
- **Google Apps Script & Google Sheets** (Backend database endpoint)
- **GitHub Pages & GitHub Actions** (Static hosting & CI/CD)

---

## 📁 File & Directory Structure
```text
pawan-portfolio/
├── index.html                  # Main static HTML document
├── css/
│   └── styles.css              # Custom styling & Light/Dark theme engine
├── js/
│   ├── data.js                 # Centralized profile, skills, & project data
│   └── app.js                  # Navigation, theme toggle, form handlers, admin portal
├── google-apps-script/
│   ├── Code.gs                 # Server-side Apps Script backend code
│   └── README.md               # 10-step Google Sheets setup guide
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment pipeline
└── README.md
```

---

## 🔑 Key Implementations

### 1. Dual Contact Storage (LocalStorage + Google Sheets)
Submissions are stored in Chrome `localStorage` under key `portfolioContactResponses` as JSON arrays containing ID, Name, Email, Subject, Message, and Timestamp. Optionally, submissions post to Google Apps Script (`Code.gs`) to write records into Google Sheets.

### 2. Admin Show/Hide Login & Dashboard
Demonstration login interface implemented via CSS classes and JavaScript state toggling. Authorized login switches view to the response dashboard, displaying contact submissions.

### 3. Light/Dark Theme Engine
The site supports light and dark themes using `data-theme` attribute toggles, persisting the preference in `localStorage` (`themePreference`).

---

## 🚀 Deployment to GitHub Pages

1. Commit and push repository contents to GitHub.
2. In GitHub repository settings, set **Pages** source to **GitHub Actions**.
3. Live URL: `https://<username>.github.io/pawan-portfolio/`
