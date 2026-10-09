/**
 * Client-Side JavaScript Application - Narala Pawan Portfolio
 */

// Configuration constant for Google Apps Script Web App URL
// (User can replace this with their deployed Apps Script web app URL)
const GOOGLE_APPS_SCRIPT_URL = '';

const LOCAL_STORAGE_KEY = 'portfolioContactResponses';
const THEME_STORAGE_KEY = 'themePreference';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  renderContent();
  initContactForm();
  initAdminPortal();
  document.getElementById('yearSpan').textContent = new Date().getFullYear();
});

/* -------------------------------------------------------------
 * 1. Theme Management (Light/Dark Mode)
 * ------------------------------------------------------------- */
function initTheme() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlTag = document.documentElement;

  // Check stored preference or system preference
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  themeBtn.addEventListener('click', () => {
    currentTheme = htmlTag.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
  });

  function applyTheme(theme) {
    htmlTag.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/* -------------------------------------------------------------
 * 2. Mobile Navigation & Smooth Scroll Active Link Tracking
 * ------------------------------------------------------------- */
function initNavigation() {
  const mobileBtn = document.getElementById('mobileToggleBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

/* -------------------------------------------------------------
 * 3. Render Data from PORTFOLIO_DATA (data.js)
 * ------------------------------------------------------------- */
function renderContent() {
  if (typeof PORTFOLIO_DATA === 'undefined') return;

  // Render Interests
  const interestsContainer = document.getElementById('interestsContainer');
  if (interestsContainer && PORTFOLIO_DATA.profile.interests) {
    interestsContainer.innerHTML = PORTFOLIO_DATA.profile.interests
      .map(item => `
        <div className="interest-item">
          <span>⚡</span>
          <span>${escapeHTML(item)}</span>
        </div>
      `).join('');
  }

  // Render Skills
  const skillsContainer = document.getElementById('skillsContainer');
  if (skillsContainer && PORTFOLIO_DATA.skills) {
    skillsContainer.innerHTML = PORTFOLIO_DATA.skills
      .map(skill => `
        <div className="skill-card">
          <div className="skill-header">
            <span className="skill-icon">${skill.icon}</span>
            <h3 className="skill-category">${escapeHTML(skill.category)}</h3>
          </div>
          <div className="skill-tags">
            ${skill.items.map(i => `<span className="skill-tag">${escapeHTML(i)}</span>`).join('')}
          </div>
        </div>
      `).join('');
  }

  // Render Projects
  const projectsContainer = document.getElementById('projectsContainer');
  if (projectsContainer && PORTFOLIO_DATA.projects) {
    projectsContainer.innerHTML = PORTFOLIO_DATA.projects
      .map(proj => `
        <div className="project-card">
          <div className="project-top">
            <span className="project-icon">${proj.icon}</span>
            <span className="project-badge" style="background-color: ${proj.badgeColor}">${escapeHTML(proj.category)}</span>
          </div>
          <h3 className="project-title">${escapeHTML(proj.title)}</h3>
          <p className="project-desc">${escapeHTML(proj.description)}</p>
          <div className="project-footer">
            <span>Academic Project</span>
            <span>Details Available</span>
          </div>
        </div>
      `).join('');
  }
}

/* -------------------------------------------------------------
 * 4. Contact Form Handler (LocalStorage + Apps Script)
 * ------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('contactAlert');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const btnText = document.getElementById('submitBtnText');
  const btnSpinner = document.getElementById('submitSpinner');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert(alertBox);

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
      showAlert(alertBox, 'Please fill out all required form fields.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showAlert(alertBox, 'Please enter a valid email address.', 'error');
      return;
    }

    // Disable button to prevent double submission
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnSpinner.style.display = 'inline-block';

    const responseData = {
      id: 'resp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: name,
      email: email,
      subject: subject,
      message: message,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    try {
      // 1. Save to Chrome LocalStorage (Requirement Section E)
      saveToLocalStorage(responseData);

      // 2. Post to Google Apps Script Web App if URL configured
      let googleSheetsSuccess = false;
      if (GOOGLE_APPS_SCRIPT_URL && GOOGLE_APPS_SCRIPT_URL.startsWith('http')) {
        try {
          await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(responseData)
          });
          googleSheetsSuccess = true;
        } catch (err) {
          console.warn('Google Apps Script POST failed, response stored in LocalStorage fallback:', err);
        }
      }

      form.reset();
      const successMsg = googleSheetsSuccess 
        ? 'Message sent successfully! Stored in Google Sheets database and local backup.' 
        : 'Message saved successfully! (Saved to local browser database; Google Sheets integration guide in documentation).';
      
      showAlert(alertBox, successMsg, 'success');

      // Refresh admin list if visible
      loadAdminResponses();

    } catch (error) {
      showAlert(alertBox, 'An error occurred while saving message: ' + error.message, 'error');
    } finally {
      submitBtn.disabled = false;
      btnText.style.display = 'inline-block';
      btnSpinner.style.display = 'none';
    }
  });
}

// LocalStorage Helper Functions
function saveToLocalStorage(responseObj) {
  let existing = [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    existing = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(existing)) existing = [];
  } catch (e) {
    existing = [];
  }
  existing.unshift(responseObj);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
}

function getFromLocalStorage() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

/* -------------------------------------------------------------
 * 5. Admin Portal & Response Dashboard (Show/Hide Scenario)
 * ------------------------------------------------------------- */
function initAdminPortal() {
  const loginForm = document.getElementById('adminLoginForm');
  const loginView = document.getElementById('adminLoginView');
  const dashboardView = document.getElementById('adminDashboardView');
  const adminAlert = document.getElementById('adminAlert');
  const logoutBtn = document.getElementById('logoutAdminBtn');
  const refreshBtn = document.getElementById('refreshResponsesBtn');

  // Login Form Submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAlert(adminAlert);

    const user = document.getElementById('adminUser').value.trim();
    const pass = document.getElementById('adminPass').value.trim();

    // Demonstration login credential check
    if (user === 'admin' && pass === 'pawan123') {
      loginView.classList.add('hidden');
      dashboardView.classList.remove('hidden');
      loadAdminResponses();
    } else {
      showAlert(adminAlert, 'Invalid administrator credentials. Try username: admin, password: pawan123', 'error');
    }
  });

  // Logout Action
  logoutBtn.addEventListener('click', () => {
    dashboardView.classList.add('hidden');
    loginView.classList.remove('hidden');
    loginForm.reset();
  });

  // Refresh Action
  refreshBtn.addEventListener('click', () => {
    loadAdminResponses();
  });
}

function loadAdminResponses() {
  const container = document.getElementById('responsesContainer');
  const countSpan = document.getElementById('responseCountText');
  if (!container) return;

  const responses = getFromLocalStorage();
  countSpan.textContent = `Total Responses: ${responses.length}`;

  if (responses.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-muted); background: var(--bg-surface-elevated); border-radius: var(--radius-md);">
        📭 No form responses submitted yet.
      </div>
    `;
    return;
  }

  container.innerHTML = responses.map(resp => `
    <div className="response-card">
      <div className="response-header">
        <span>🕒 ${escapeHTML(resp.timestamp || 'N/A')}</span>
        <span>ID: ${escapeHTML(resp.id || 'N/A')}</span>
      </div>
      <div className="response-sender">👤 ${escapeHTML(resp.name)} (${escapeHTML(resp.email)})</div>
      <div className="response-subject">📌 Subject: ${escapeHTML(resp.subject)}</div>
      <div className="response-body">${escapeHTML(resp.message)}</div>
    </div>
  `).join('');
}

/* Helper Functions */
function showAlert(element, text, type) {
  element.textContent = text;
  element.className = `alert-message alert-${type} show`;
}

function hideAlert(element) {
  element.className = 'alert-message';
  element.textContent = '';
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
