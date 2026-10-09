/**
 * Client-Side JavaScript Application - Narala Pawan Portfolio
 * Advanced, human-crafted interactive features & dynamic UI components.
 */

const GOOGLE_APPS_SCRIPT_URL = '';
const LOCAL_STORAGE_KEY = 'portfolioContactResponses';
const THEME_STORAGE_KEY = 'themePreference';

let soundEnabled = true;

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSoundFX();
  initHeroCanvas();
  initHeroTyping();
  initNavigation();
  renderContent();
  initDeveloperTerminal();
  initSkillSearch();
  initProjectFiltersAndModal();
  initProjectEstimator();
  initContactForm();
  initAdminPortal();
  document.getElementById('yearSpan').textContent = new Date().getFullYear();
});

/* -------------------------------------------------------------
 * 1. Web Audio API Sound FX Synthesizer
 * ------------------------------------------------------------- */
function initSoundFX() {
  const soundBtn = document.getElementById('soundToggleBtn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundBtn.textContent = soundEnabled ? '🔊' : '🔇';
    soundBtn.classList.toggle('active', soundEnabled);
    if (soundEnabled) playAudioTone(600, 0.05);
  });
}

function playAudioTone(freq = 440, duration = 0.08) {
  if (!soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Silent catch if Web Audio disabled by browser autoplay policies
  }
}

/* -------------------------------------------------------------
 * 2. Interactive Canvas Particle Background
 * ------------------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = canvas.parentElement.offsetHeight || 600;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight || 600;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 25), 45);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* -------------------------------------------------------------
 * 3. Hero Typing Animation
 * ------------------------------------------------------------- */
function initHeroTyping() {
  const typingElement = document.getElementById('heroTypingText');
  if (!typingElement) return;

  const phrases = [
    'Freelance Web Developer',
    'Full Stack Developer',
    'React & Java Specialist',
    'Building for Rajahmundry Businesses'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 1800; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* -------------------------------------------------------------
 * 4. Theme & Navigation
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
    playAudioTone(700, 0.06);
    currentTheme = htmlTag.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
  });

  function applyTheme(theme) {
    htmlTag.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

function initNavigation() {
  const mobileBtn = document.getElementById('mobileToggleBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      playAudioTone(500, 0.05);
      navMenu.classList.remove('active');
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

/* -------------------------------------------------------------
 * 5. Render Data & Interactive Project Simulators
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

  renderSkills(PORTFOLIO_DATA.skills);
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
    .map(proj => {
      let simHtml = '';
      if (proj.id === 'rfid-door-lock') {
        simHtml = `
          <div className="card-simulator-box">
            <button className="sim-btn btn-secondary" onclick="event.stopPropagation(); simulateRFIDScan('${proj.id}')">
              <span>💳 Scan NFC Test Card</span>
            </button>
            <div id="sim-status-${proj.id}" className="sim-status" style="color: var(--text-muted);">
              Lock Status: 🔒 Secured (Standby)
            </div>
          </div>
        `;
      } else if (proj.id === 'pothole-detection') {
        simHtml = `
          <div className="card-simulator-box">
            <button className="sim-btn btn-secondary" onclick="event.stopPropagation(); simulatePotholeScan('${proj.id}')">
              <span>🎥 Toggle Dashcam AI Feed</span>
            </button>
            <div id="sim-status-${proj.id}" className="sim-status" style="color: var(--text-muted);">
              Vision Feed: 🟢 Clear Road (No Anomalies)
            </div>
          </div>
        `;
      } else if (proj.id === 'counterfeit-detection') {
        simHtml = `
          <div className="card-simulator-box">
            <button className="sim-btn btn-secondary" onclick="event.stopPropagation(); simulateBlockchainVerify('${proj.id}')">
              <span>🔍 Verify Serial #NX-8921</span>
            </button>
            <div id="sim-status-${proj.id}" className="sim-status" style="color: var(--text-muted);">
              Ledger Status: ⚪ Awaiting Scan
            </div>
          </div>
        `;
      } else if (proj.id === 'helmet-power-lensed') {
        simHtml = `
          <div className="card-simulator-box">
            <button className="sim-btn btn-secondary" onclick="event.stopPropagation(); simulateVisorToggle('${proj.id}')">
              <span>🕶️ Switch Visor Optic Mode</span>
            </button>
            <div id="sim-status-${proj.id}" className="sim-status" style="color: var(--text-muted);">
              Visor Mode: ☀️ Day UV Shield
            </div>
          </div>
        `;
      }

      return `
        <div className="project-card" data-project-id="${proj.id}" data-category="${proj.category}">
          <div className="project-top">
            <span className="project-icon">${proj.icon}</span>
            <span className="project-badge" style="background-color: ${proj.badgeColor}">${escapeHTML(proj.categoryLabel)}</span>
          </div>
          <h3 className="project-title">${escapeHTML(proj.title)}</h3>
          <p className="project-desc">${escapeHTML(proj.shortDesc)}</p>
          
          ${simHtml}

          <div className="project-tags-row">
            ${proj.techStack.slice(0, 3).map(t => `<span className="project-mini-tag">${escapeHTML(t)}</span>`).join('')}
          </div>
          <div className="project-footer" onclick="openProjectModal('${proj.id}')">
            <span>View Technical Architecture & Specs</span>
            <span>➔</span>
          </div>
        </div>
      `;
    }).join('');
}

/* Simulator Actions */
window.simulateRFIDScan = function(projId) {
  playAudioTone(880, 0.12);
  const statusEl = document.getElementById(`sim-status-${projId}`);
  if (!statusEl) return;
  statusEl.innerHTML = '⚡ Scanning NFC UID [4B:8A:1C:99]...';
  statusEl.style.color = '#38bdf8';

  setTimeout(() => {
    playAudioTone(1200, 0.15);
    statusEl.innerHTML = '🔓 Lock Status: <strong>UNLOCKED [Access Granted]</strong>';
    statusEl.style.color = '#10b981';
  }, 700);
};

window.simulatePotholeScan = function(projId) {
  playAudioTone(600, 0.1);
  const statusEl = document.getElementById(`sim-status-${projId}`);
  if (!statusEl) return;
  statusEl.innerHTML = '🔍 Processing Canny Contours...';
  statusEl.style.color = '#38bdf8';

  setTimeout(() => {
    playAudioTone(750, 0.1);
    statusEl.innerHTML = '⚠️ Vision Feed: <strong>Pothole Detected (Lat: 16.98, Lon: 81.78)</strong>';
    statusEl.style.color = '#f59e0b';
  }, 600);
};

window.simulateBlockchainVerify = function(projId) {
  playAudioTone(700, 0.1);
  const statusEl = document.getElementById(`sim-status-${projId}`);
  if (!statusEl) return;
  statusEl.innerHTML = '🔗 Querying Smart Contract Hash...';
  statusEl.style.color = '#38bdf8';

  setTimeout(() => {
    playAudioTone(950, 0.12);
    statusEl.innerHTML = '✅ Ledger: <strong>Authentic Product Verified On-Chain</strong>';
    statusEl.style.color = '#10b981';
  }, 650);
};

window.simulateVisorToggle = function(projId) {
  playAudioTone(650, 0.08);
  const statusEl = document.getElementById(`sim-status-${projId}`);
  if (!statusEl) return;
  const isNight = statusEl.innerHTML.includes('Night');
  if (isNight) {
    statusEl.innerHTML = 'Visor Mode: ☀️ Day UV Shield';
    statusEl.style.color = 'var(--text-muted)';
  } else {
    statusEl.innerHTML = 'Visor Mode: 🌙 Night High-Contrast Optic';
    statusEl.style.color = '#a7f3d0';
  }
};

/* -------------------------------------------------------------
 * 6. Interactive Developer Terminal
 * ------------------------------------------------------------- */
function initDeveloperTerminal() {
  const terminalBody = document.getElementById('terminalBody');
  if (!terminalBody) return;

  const introLines = PORTFOLIO_DATA?.profile?.terminalIntro || [
    'Welcome to Narala Pawan\'s Terminal'
  ];

  terminalBody.innerHTML = introLines.map(l => `<div className="terminal-line system">${escapeHTML(l)}</div>`).join('');
  appendPromptLine();

  document.querySelectorAll('.chip-cmd').forEach(chip => {
    chip.addEventListener('click', () => {
      playAudioTone(650, 0.05);
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

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      playAudioTone(700, 0.05);
      const cmd = input.value.trim().toLowerCase();
      input.disabled = true;
      executeCommand(cmd);
    }
  });
}

function executeCommand(cmd) {
  const terminalBody = document.getElementById('terminalBody');
  if (!cmd) return;

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
 * 7. Interactive Skill Search & Project Filters
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
      playAudioTone(600, 0.05);
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
  playAudioTone(700, 0.08);
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
};

function closeProjectModal() {
  playAudioTone(450, 0.05);
  const modal = document.getElementById('projectModal');
  if (modal) modal.classList.remove('open');
}

/* -------------------------------------------------------------
 * 8. Interactive Project Estimator Widget
 * ------------------------------------------------------------- */
function initProjectEstimator() {
  const options = document.querySelectorAll('.est-option');
  const amountSpan = document.getElementById('estAmount');
  const timeSpan = document.getElementById('estTime');
  const preFillBtn = document.getElementById('estPreFillBtn');
  if (!options.length || !amountSpan || !timeSpan) return;

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      playAudioTone(650, 0.05);
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
    timeSpan.textContent = `Estimated Delivery: ${totalDays > 0 ? totalDays : 0} Days`;

    if (preFillBtn) {
      preFillBtn.onclick = () => {
        playAudioTone(700, 0.08);
        const subjectInput = document.getElementById('contactSubject');
        const messageInput = document.getElementById('contactMessage');
        const contactSection = document.getElementById('contact');

        if (subjectInput) subjectInput.value = 'Freelance Project Quote Request';
        if (messageInput) {
          messageInput.value = `Hi Pawan,\n\nI would like to request a quote for the following requirements:\n- ${selectedNames.join('\n- ')}\n\nEstimated Investment: ₹${totalPrice.toLocaleString('en-IN')} INR\nEstimated Delivery: ${totalDays} Days\n\nPlease let me know your availability.`;
        }
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
      };
    }
  }

  recalculateEstimate();
}

/* -------------------------------------------------------------
 * 9. Contact Form & Admin Portal
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
      playAudioTone(600, 0.05);
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
      playAudioTone(350, 0.1);
      showAlert(alertBox, 'Please fill out all required form fields.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      playAudioTone(350, 0.1);
      showAlert(alertBox, 'Please enter a valid email address.', 'error');
      return;
    }

    playAudioTone(850, 0.1);
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
      playAudioTone(900, 0.1);
      loginView.classList.add('hidden');
      dashboardView.classList.remove('hidden');
      loadAdminResponses();
    } else {
      playAudioTone(350, 0.1);
      showAlert(adminAlert, 'Invalid administrator credentials. Try username: admin, password: pawan123', 'error');
    }
  });

  logoutBtn.addEventListener('click', () => {
    playAudioTone(500, 0.05);
    dashboardView.classList.add('hidden');
    loginView.classList.remove('hidden');
    loginForm.reset();
  });

  refreshBtn.addEventListener('click', () => {
    playAudioTone(600, 0.05);
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
  playAudioTone(800, 0.1);
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

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
