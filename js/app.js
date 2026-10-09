/**
 * Editorial Client Application Script - Narala Pawan Portfolio
 * Clean, maintainable JavaScript handling themes, navigation, filtering, modal views, contact, and admin dashboard.
 */

const GOOGLE_APPS_SCRIPT_URL = '';
const LOCAL_STORAGE_KEY = 'portfolioContactResponses';
const THEME_STORAGE_KEY = 'themePreference';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  renderContent();
  initSkillSearch();
  initProjectFiltersAndModal();
  initProjectEstimator();
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
 * 2. Mobile Navigation & Active Link Tracking
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
          <span>•</span>
          <span>${escapeHTML(item)}</span>
        </div>
      `).join('');
  }

  // Render Skills
  renderSkills(PORTFOLIO_DATA.skills);

  // Render Projects
  renderProjects(PORTFOLIO_DATA.projects);

  // Render Qualifications
  renderQualifications(PORTFOLIO_DATA.qualifications);
}

function renderSkills(skillsArray) {
  const skillsContainer = document.getElementById('skillsContainer');
  if (!skillsContainer || !skillsArray) return;

  skillsContainer.innerHTML = skillsArray
    .map(skill => `
      <div className="skill-card">
        <h3 className="skill-category">${escapeHTML(skill.category)}</h3>
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
          <span className="project-badge">${escapeHTML(proj.categoryLabel)}</span>
          <span className="project-status">${escapeHTML(proj.status)}</span>
        </div>
        <h3 className="project-title">${escapeHTML(proj.title)}</h3>
        <p className="project-desc">${escapeHTML(proj.shortDesc)}</p>
        <div className="project-tags-row">
          ${proj.techStack.map(t => `<span className="project-mini-tag">${escapeHTML(t)}</span>`).join('')}
        </div>
        <div className="project-footer" onclick="openProjectModal('${proj.id}')">
          <span>View Project Details</span>
          <span>➔</span>
        </div>
      </div>
    `).join('');

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project-id');
      openProjectModal(projId);
    });
  });
}

function renderQualifications(qualArray) {
  const container = document.getElementById('qualificationsContainer');
  if (!container || !qualArray) return;

  container.innerHTML = qualArray.map(q => `
    <div className="qual-card">
      <div className="qual-icon">🎓</div>
      <div>
        <h4 style="font-size: 1rem; margin-bottom: 0.2rem;">${escapeHTML(q.title)}</h4>
        <div style="font-size: 0.85rem; color: var(--text-muted);">${escapeHTML(q.issuer)} • <span style="color: var(--primary-color); font-weight: 600;">${escapeHTML(q.status)}</span></div>
      </div>
    </div>
  `).join('');
}

/* -------------------------------------------------------------
 * 4. Interactive Skill Search & Project Filters
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

function initProjectFiltersAndModal() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');
      const projectCards = document.querySelectorAll('.project-card');

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

  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }
}

window.openProjectModal = function(projectId) {
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  if (!modal || !modalBody || typeof PORTFOLIO_DATA === 'undefined') return;

  const proj = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!proj) return;

  modalBody.innerHTML = `
    <div style="margin-bottom: 1.25rem;">
      <span className="project-badge" style="margin-bottom: 0.5rem; display: inline-block;">
        ${escapeHTML(proj.categoryLabel)}
      </span>
      <h2 style="font-size: 1.5rem;">${escapeHTML(proj.title)}</h2>
    </div>

    <div style="margin-bottom: 1.25rem;">
      <h4 style="font-size: 0.95rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.3rem;">Problem Addressed:</h4>
      <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6;">${escapeHTML(proj.problem)}</p>
    </div>

    <div style="margin-bottom: 1.25rem;">
      <h4 style="font-size: 0.95rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.3rem;">Solution &amp; Implementation:</h4>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${escapeHTML(proj.solution)}</p>
    </div>

    <div style="margin-bottom: 1.25rem;">
      <h4 style="font-size: 0.95rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.3rem;">My Specific Contribution:</h4>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${escapeHTML(proj.contribution)}</p>
    </div>

    <div>
      <h4 style="font-size: 0.95rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">Technologies Used:</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
        ${proj.techStack.map(t => `<span style="background: var(--bg-surface-elevated); border: 1px solid var(--border-color); padding: 0.3rem 0.65rem; border-radius: 4px; font-size: 0.85rem; color: var(--text-main);">${escapeHTML(t)}</span>`).join('')}
      </div>
    </div>
  `;

  modal.classList.add('open');
};

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) modal.classList.remove('open');
}

/* -------------------------------------------------------------
 * 5. Freelance Project Estimator Widget
 * ------------------------------------------------------------- */
function initProjectEstimator() {
  const options = document.querySelectorAll('.est-option');
  const amountSpan = document.getElementById('estAmount');
  const timeSpan = document.getElementById('estTime');
  const preFillBtn = document.getElementById('estPreFillBtn');
  if (!options.length || !amountSpan || !timeSpan) return;

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      opt.classList.toggle('selected');
      const checkSpan = opt.querySelector('.est-check');
      if (checkSpan) checkSpan.textContent = opt.classList.contains('selected') ? '✓' : '○';
      recalculateEstimate();
    });
  });

  function recalculateEstimate() {
    let totalPrice = 0;
    let totalDays = 0;
    const selectedNames = [];

    document.querySelectorAll('.est-option.selected').forEach(opt => {
      totalPrice += parseInt(opt.getAttribute('data-price') || 0);
      totalDays += parseInt(opt.getAttribute('data-days') || 0);
      selectedNames.push(opt.getAttribute('data-name'));
    });

    amountSpan.textContent = `₹${totalPrice.toLocaleString('en-IN')} INR`;
    timeSpan.textContent = `${totalDays > 0 ? totalDays : 0} Days`;

    if (preFillBtn) {
      preFillBtn.onclick = () => {
        const subjectInput = document.getElementById('contactSubject');
        const messageInput = document.getElementById('contactMessage');
        const contactSection = document.getElementById('contact');

        if (subjectInput) subjectInput.value = 'Freelance Website Inquiry';
        if (messageInput) {
          messageInput.value = `Hi Pawan,\n\nI would like to request an initial quote for:\n- ${selectedNames.join('\n- ')}\n\nEstimated Budget: ₹${totalPrice.toLocaleString('en-IN')} INR\nEstimated Timeframe: ${totalDays} Days\n\nPlease let me know your availability.`;
        }
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
      };
    }
  }

  recalculateEstimate();
}

/* -------------------------------------------------------------
 * 6. Contact Form Handler (LocalStorage + Apps Script)
 * ------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('contactAlert');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const btnText = document.getElementById('submitBtnText');
  const btnSpinner = document.getElementById('submitSpinner');
  const subjectInput = document.getElementById('contactSubject');

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
 * 7. Admin Access Portal & Response Dashboard
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

  countSpan.textContent = `Total Messages: ${responses.length}`;

  if (responses.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-muted); background: var(--bg-surface-elevated); border-radius: var(--radius-md);">
        📭 No form messages found.
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
    alert('No contact messages available to export.');
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
  link.setAttribute('download', `contact_messages_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

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
