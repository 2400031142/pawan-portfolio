/**
 * Client-Side JavaScript Application - Narala Pawan Portfolio
 * Grounded, human-crafted interactive behaviors and dynamic UI handlers.
 */

const GOOGLE_APPS_SCRIPT_URL = '';
const LOCAL_STORAGE_KEY = 'portfolioContactResponses';
const THEME_STORAGE_KEY = 'themePreference';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  renderContent();
  initDeveloperTerminal();
  initSkillSearch();
  initProjectFiltersAndModal();
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
 * 2. Mobile Navigation & Scroll Offset
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
  renderSkills(PORTFOLIO_DATA.skills);

  // Render Projects
  renderProjects(PORTFOLIO_DATA.projects);
}

function renderSkills(skillsArray) {
  const skillsContainer = document.getElementById('skillsContainer');
  if (!skillsContainer || !skillsArray) return;

  skillsContainer.innerHTML = skillsArray
    .map(skill => `
      <div className="skill-card">
        <div className="skill-header">
          <span className="skill-icon">${skill.icon}</span>
          <h3 className="skill-category">${escapeHTML(skill.category)}</h3>
        </div>
        <div className="skill-tags">
          ${skill.items.map(i => `
            <div className="skill-pill-item" data-skill-name="${escapeHTML(i.name.toLowerCase())}">
              <span>${escapeHTML(i.name)}</span>
              <span className="pill-level">${escapeHTML(i.level)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
}

function renderProjects(projectsArray) {
  const projectsContainer = document.getElementById('projectsContainer');
  if (!projectsContainer || !projectsArray) return;

  projectsContainer.innerHTML = projectsArray
    .map(proj => `
      <div className="project-card" data-project-id="${proj.id}" data-category="${proj.category}">
        <div className="project-top">
          <span className="project-icon">${proj.icon}</span>
          <span className="project-badge" style="background-color: ${proj.badgeColor}">${escapeHTML(proj.categoryLabel)}</span>
        </div>
        <h3 className="project-title">${escapeHTML(proj.title)}</h3>
        <p className="project-desc">${escapeHTML(proj.shortDesc)}</p>
        <div className="project-tags-row">
          ${proj.techStack.slice(0, 3).map(t => `<span className="project-mini-tag">${escapeHTML(t)}</span>`).join('')}
        </div>
        <div className="project-footer">
          <span>Click to View Full Specs</span>
          <span>🔍</span>
        </div>
      </div>
    `).join('');

  // Add Click Listener to open modal
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project-id');
      openProjectModal(projId);
    });
  });
}

/* -------------------------------------------------------------
 * 4. Interactive Developer Terminal Widget
 * ------------------------------------------------------------- */
function initDeveloperTerminal() {
  const terminalBody = document.getElementById('terminalBody');
  if (!terminalBody) return;

  // Print initial terminal intro
  const introLines = PORTFOLIO_DATA?.profile?.terminalIntro || [
    'Welcome to Narala Pawan\'s Terminal'
  ];

  terminalBody.innerHTML = introLines.map(l => `<div className="terminal-line system">${escapeHTML(l)}</div>`).join('');
  appendPromptLine();

  // Add Event Listeners for Quick Command Chips
  document.querySelectorAll('.chip-cmd').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });
}

function appendPromptLine() {
  const terminalBody = document.getElementById('terminalBody');
  const promptRow = document.createElement('div');
  promptRow.className = 'terminal-prompt-row';
  promptRow.innerHTML = `
    <span className="prompt-symbol">$</span>
    <input type="text" className="terminal-input" placeholder="Type help, skills, projects, contact..." />
  `;
  terminalBody.appendChild(promptRow);

  const input = promptRow.querySelector('.terminal-input');
  input.focus();

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.disabled = true;
      executeCommand(cmd);
    }
  });
}

function executeCommand(cmd) {
  const terminalBody = document.getElementById('terminalBody');
  if (!cmd) return;

  // Log user command
  const userLine = document.createElement('div');
  userLine.className = 'terminal-line';
  userLine.innerHTML = `<span className="prompt-symbol">$</span> ${escapeHTML(cmd)}`;
  terminalBody.appendChild(userLine);

  let outputText = '';

  switch (cmd) {
    case 'help':
      outputText = 'Available Commands:\n• bio       - Print developer summary\n• skills    - List technical skills\n• projects  - List featured projects\n• contact   - View contact information\n• clear     - Clear terminal screen';
      break;
    case 'bio':
      outputText = `Name: ${PORTFOLIO_DATA.profile.name}\nTitle: ${PORTFOLIO_DATA.profile.title}\nLocation: ${PORTFOLIO_DATA.profile.location}\nFocus: Custom web development for Rajahmundry businesses & IoT full-stack applications.`;
      break;
    case 'skills':
      outputText = 'Frontend: HTML5, CSS3, JS (ES6+), React\nBackend: Java, Spring Boot, REST APIs\nDatabases: SQL, MySQL, PostgreSQL\nTools: Git, GitHub, Figma, VS Code';
      break;
    case 'projects':
      outputText = '1. RFID Door Lock Using NFC Card (Hardware/IoT)\n2. Pothole Detection System (Python/Road-Safety)\n3. Counterfeit Detection Using Blockchain (Solidity/Web3)\n4. Helmet with Power-Lensed Visor (Engineering Concept)';
      break;
    case 'contact':
      outputText = 'Location: Rajahmundry, AP, India\nForm: Scroll down to Contact section to send a direct message.';
      break;
    case 'clear':
      terminalBody.innerHTML = '';
      appendPromptLine();
      return;
    default:
      outputText = `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`;
  }

  const outLine = document.createElement('div');
  outLine.className = 'terminal-line output';
  outLine.textContent = outputText;
  terminalBody.appendChild(outLine);

  appendPromptLine();
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

/* -------------------------------------------------------------
 * 5. Interactive Skill Search Filter
 * ------------------------------------------------------------- */
function initSkillSearch() {
  const searchInput = document.getElementById('skillSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    const skillPills = document.querySelectorAll('.skill-pill-item');

    skillPills.forEach(pill => {
      const skillName = pill.getAttribute('data-skill-name');
      if (query && skillName.includes(query)) {
        pill.classList.add('highlight');
      } else {
        pill.classList.remove('highlight');
      }
    });
  });
}

/* -------------------------------------------------------------
 * 6. Interactive Project Category Filters & Details Modal
 * ------------------------------------------------------------- */
function initProjectFiltersAndModal() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Controls
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }
}

function openProjectModal(projectId) {
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  if (!modal || !modalBody || typeof PORTFOLIO_DATA === 'undefined') return;

  const proj = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!proj) return;

  modalBody.innerHTML = `
    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
      <span style="font-size: 2.5rem;">${proj.icon}</span>
      <div>
        <span style="font-size: 0.8rem; font-weight: 700; color: #ffffff; background-color: ${proj.badgeColor}; padding: 0.2rem 0.6rem; border-radius: 9999px;">
          ${escapeHTML(proj.categoryLabel)}
        </span>
        <h2 style="font-size: 1.6rem; margin-top: 0.3rem;">${escapeHTML(proj.title)}</h2>
      </div>
    </div>

    <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.7; margin-bottom: 1.5rem;">
      ${escapeHTML(proj.fullDesc)}
    </p>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-size: 1.05rem; margin-bottom: 0.6rem;">Key System Features:</h4>
      <ul style="padding-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
        ${proj.features.map(f => `<li>${escapeHTML(f)}</li>`).join('')}
      </ul>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-size: 1.05rem; margin-bottom: 0.6rem;">Hardware / Runtime Specifications:</h4>
      <p style="background: var(--bg-surface-elevated); border: 1px solid var(--border-color); padding: 0.8rem 1rem; border-radius: var(--radius-sm); font-size: 0.9rem; color: var(--text-main);">
        ⚙️ ${escapeHTML(proj.hardwareSpecs)}
      </p>
    </div>

    <div>
      <h4 style="font-size: 1.05rem; margin-bottom: 0.6rem;">Technologies Used:</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        ${proj.techStack.map(t => `<span style="background: var(--primary-light); color: var(--primary-color); border: 1px solid var(--primary-color); padding: 0.3rem 0.75rem; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">${escapeHTML(t)}</span>`).join('')}
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) modal.classList.remove('open');
}

/* -------------------------------------------------------------
 * 7. Contact Form Handler & Subject Select Pills
 * ------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('contactAlert');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const btnText = document.getElementById('submitBtnText');
  const btnSpinner = document.getElementById('submitSpinner');
  const subjectInput = document.getElementById('contactSubject');

  // Quick Subject Pills Selection
  document.querySelectorAll('.pill-opt').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pill-opt').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      subjectInput.value = pill.getAttribute('data-subject');
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert(alertBox);

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = subjectInput.value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !subject || !message) {
      showAlert(alertBox, 'Please fill out all required form fields.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showAlert(alertBox, 'Please enter a valid email address.', 'error');
      return;
    }

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
      saveToLocalStorage(responseData);

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
          console.warn('Google Apps Script POST failed, saved to LocalStorage backup:', err);
        }
      }

      form.reset();
      document.querySelectorAll('.pill-opt').forEach(p => p.classList.remove('active'));

      const successMsg = googleSheetsSuccess 
        ? 'Message sent successfully! Stored in Google Sheets database and local backup.' 
        : 'Message saved successfully! (Saved to local browser database; Google Sheets integration setup available in documentation).';
      
      showAlert(alertBox, successMsg, 'success');
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

function saveToLocalStorage(responseObj) {
  let existing = getFromLocalStorage();
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
 * 8. Admin Portal & CSV Export Functionality
 * ------------------------------------------------------------- */
function initAdminPortal() {
  const loginForm = document.getElementById('adminLoginForm');
  const loginView = document.getElementById('adminLoginView');
  const dashboardView = document.getElementById('adminDashboardView');
  const adminAlert = document.getElementById('adminAlert');
  const logoutBtn = document.getElementById('logoutAdminBtn');
  const refreshBtn = document.getElementById('refreshResponsesBtn');
  const searchInput = document.getElementById('adminSearchInput');
  const exportCsvBtn = document.getElementById('exportCsvBtn');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAlert(adminAlert);

    const user = document.getElementById('adminUser').value.trim();
    const pass = document.getElementById('adminPass').value.trim();

    if (user === 'admin' && pass === 'pawan123') {
      loginView.classList.add('hidden');
      dashboardView.classList.remove('hidden');
      loadAdminResponses();
    } else {
      showAlert(adminAlert, 'Invalid administrator credentials. Try username: admin, password: pawan123', 'error');
    }
  });

  logoutBtn.addEventListener('click', () => {
    dashboardView.classList.add('hidden');
    loginView.classList.remove('hidden');
    loginForm.reset();
  });

  refreshBtn.addEventListener('click', () => {
    loadAdminResponses();
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      loadAdminResponses(e.target.value.trim().toLowerCase());
    });
  }

  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', exportResponsesToCSV);
  }
}

function loadAdminResponses(filterQuery = '') {
  const container = document.getElementById('responsesContainer');
  const countSpan = document.getElementById('responseCountText');
  if (!container) return;

  let responses = getFromLocalStorage();

  if (filterQuery) {
    responses = responses.filter(r => 
      (r.name && r.name.toLowerCase().includes(filterQuery)) ||
      (r.email && r.email.toLowerCase().includes(filterQuery)) ||
      (r.subject && r.subject.toLowerCase().includes(filterQuery)) ||
      (r.message && r.message.toLowerCase().includes(filterQuery))
    );
  }

  countSpan.textContent = `Total Responses: ${responses.length}`;

  if (responses.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-muted); background: var(--bg-surface-elevated); border-radius: var(--radius-md);">
        📭 No form responses found.
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

function exportResponsesToCSV() {
  const responses = getFromLocalStorage();
  if (responses.length === 0) {
    alert('No contact responses available to export.');
    return;
  }

  const headers = ['ID', 'Name', 'Email', 'Subject', 'Message', 'Timestamp'];
  const csvRows = [headers.join(',')];

  responses.forEach(r => {
    const row = [
      `"${(r.id || '').replace(/"/g, '""')}"`,
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${(r.email || '').replace(/"/g, '""')}"`,
      `"${(r.subject || '').replace(/"/g, '""')}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      `"${(r.timestamp || '').replace(/"/g, '""')}"`
    ];
    csvRows.push(row.join(','));
  });

  const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'));
  const link = document.createElement('a');
  link.setAttribute('href', csvContent);
  link.setAttribute('download', `contact_responses_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
