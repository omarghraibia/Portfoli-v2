class TypingEffect {
  constructor(elementId, text, speed = 50) {
    this.element = document.getElementById(elementId);
    this.text = text;
    this.speed = speed;
    this.currentIndex = 0;
    this.isTyping = false;
  }

  start() {
    if (this.isTyping || !this.element) return;
    this.isTyping = true;
    this.type();
  }

  type() {
    if (this.currentIndex < this.text.length) {
      const char = this.text[this.currentIndex];

      if (char === '<') {
        const closingIndex = this.text.indexOf('>', this.currentIndex);
        const tag = this.text.substring(this.currentIndex, closingIndex + 1);
        this.element.innerHTML += tag;
        this.currentIndex = closingIndex + 1;
      } else if (char === '\n') {
        this.element.innerHTML += '<br>';
        this.currentIndex++;
      } else {
        this.element.innerHTML += char;
        this.currentIndex++;
      }

      setTimeout(() => this.type(), this.speed);
    } else {
      this.isTyping = false;
    }
  }

  reset() {
    if (!this.element) return;
    this.currentIndex = 0;
    this.element.innerHTML = '';
    this.isTyping = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        siteHeader.classList.add('header-hidden');
      } else {
        siteHeader.classList.remove('header-hidden');
      }
      lastScrollY = currentScrollY;
    });
  }

  const hamburger = document.getElementById('hamburger-menu');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('toggle');
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const codeEditor = document.getElementById('code-editor');

  if (codeEditor) {
    const originalContent = codeEditor.innerHTML;
    codeEditor.innerHTML = '';
    const typer = new TypingEffect('code-editor', originalContent, 30);
    setTimeout(() => typer.start(), 500);
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });

      document.querySelectorAll('.nav-links a').forEach(link => {
        link.removeAttribute('aria-current');
      });
      anchor.setAttribute('aria-current', 'page');
    });
  });

  const successModal = document.getElementById('success-modal');
  const successClose = document.getElementById('success-close');
  const successOverlay = document.getElementById('success-overlay');
  const projectModal = document.getElementById('project-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');

  let activeModal = null;
  let lastFocusedElement = null;

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    activeModal = null;
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  const closeSuccessModal = () => closeModal(successModal);

  successClose?.addEventListener('click', closeSuccessModal);
  successOverlay?.addEventListener('click', closeSuccessModal);

  // TODO: Extraire la logique du terminal dans une classe séparée plus tard
  const projectData = {
    'allo-kine': {
      title: 'Allo Kiné',
      period: '2024',
      dates: 'Janvier 2024 - Février 2024',
      team: '2 personnes',
      duration: '30 jours',
      description: 'Solution digitale sur mesure conçue pour moderniser l\'image d\'un cabinet médical et automatiser la prise de rendez-vous.<br><br><strong>Mes Réalisations Clés :</strong><br>• <strong>Back-end :</strong> Modélisation et exploitation d\'une base de données SQL pour structurer les plannings.<br>• <strong>Front-end :</strong> Programmation d\'interfaces dynamiques en JavaScript et design responsive.<br>• <strong>Design & UX :</strong> Création de l\'identité visuelle (logo) avec un focus sur un parcours utilisateur fluide.<br><br><em>Ce projet démontre ma capacité à intervenir sur l\'intégralité d\'un cycle de développement et à livrer un produit technique répondant à un besoin métier réel.</em>',
      details: ['Interface responsive', 'Parcours patient simplifié', 'Structure prête pour une prise de rendez-vous'],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'SQL'],
      gallery: ['Accueil cabinet', 'Parcours rendez-vous', 'Structure front-end'],
      codeLink: 'https://github.com/omarghraibia/allokine',
      liveLink: 'https://allokine.vercel.app/'
    },
    'debian-deploy': {
      title: 'Déploiement Debian',
      period: '2024',
      dates: 'Mars 2024 - Avril 2024',
      team: '3 personnes',
      duration: '45 jours',
      description: 'Projet système centré sur le déploiement et le durcissement d’un serveur Debian. Le travail couvre la configuration d’une stack web, les services réseau et les premières règles de sécurisation.',
      details: ['Installation serveur Debian', 'Configuration Apache et PostgreSQL', 'Sécurisation et documentation technique'],
      technologies: ['Linux', 'Apache', 'PostgreSQL'],
      gallery: ['Terminal Debian', 'Services web', 'Documentation serveur'],
      codeLink: 'https://github.com',
      liveLink: '#'
    },
    'inetum': {
      title: 'Inetum',
      period: '2026',
      dates: '2026',
      team: '3 personnes',
      duration: '3 mois',
      description: 'Conception d’un site web institutionnel éco-responsable visant à vulgariser les activités de l’ESN Inetum à destination de la Génération Alpha. Ce projet universitaire démontre ma capacité à analyser un besoin client spécifique, à collaborer en équipe, et à appliquer les principes du Green IT dans le cycle de développement d’une application web.',
      details: ['Analyse & Vulgarisation', 'Design & Éco-conception', 'Développement Front-end'],
      technologies: ['UI/UX Design', 'Sobriété numérique', 'Front-End', 'Prototypage'],
      gallery: ['Page d’accueil', 'Sections services', 'Prototype responsive'],
      codeLink: 'https://github.com/D-Inetum/SAE-1.05-06',
      liveLink: '#'
    },
    'tourmentin': {
      title: 'Le Tourmentin',
      period: '2024',
      dates: 'Avril 2024 - Juin 2024',
      team: '4 personnes',
      duration: '60 jours',
      description: 'Projet de modélisation d’un système d’information avec analyse du besoin, schémas UML et conception SQL. Le but était de transformer un contexte métier en modèle de données exploitable.',
      details: ['Analyse fonctionnelle', 'Schémas UML', 'Modèle relationnel SQL'],
      technologies: ['SQL', 'UML', 'Modélisation'],
      gallery: ['Diagramme UML', 'Modèle SQL', 'Analyse métier'],
      codeLink: '#',
      liveLink: '#'
    },
    portfolio: {
      title: 'This Portfolio',
      period: '2026',
      dates: 'Mai 2026',
      team: '1 personne',
      duration: '20 jours',
      description: 'Portfolio personnel conçu comme une vitrine technique : interface dark premium, sections projet lisibles, modals détaillées, animations CSS et structure responsive.',
      details: ['Dark mode premium', 'Glassmorphism', 'Interactions JavaScript'],
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      gallery: ['Hero animé', 'Cartes projets', 'Modals détaillées'],
      codeLink: '#',
      liveLink: '#'
    }
  };

  const openModal = (modal) => {
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    activeModal = modal;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    
    setTimeout(() => {
      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length) {
        focusable[0].focus();
      }
    }, 10);
  };

  const closeProjectModal = () => closeModal(projectModal);

  const bindGalleryControls = () => {
    const gallery = modalBody?.querySelector('.modal-gallery-track');
    const previousButton = modalBody?.querySelector('[data-gallery="previous"]');
    const nextButton = modalBody?.querySelector('[data-gallery="next"]');
    if (!gallery || !previousButton || !nextButton) return;

    previousButton.addEventListener('click', () => {
      gallery.scrollBy({ left: -gallery.clientWidth, behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
      gallery.scrollBy({ left: gallery.clientWidth, behavior: 'smooth' });
    });
  };

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', event => {
      if (event.target.closest('a')) return;

      const project = projectData[card.getAttribute('data-project')];
      if (!project || !modalBody || !projectModal) return;

      modalBody.innerHTML = `
        <div class="modal-media-full">
          <div class="modal-gallery-track" aria-label="Galerie du projet ${project.title}">
            ${project.gallery.map((item, index) => `
              <figure class="modal-gallery-slide">
                <div class="modal-gallery-image">${String(index + 1).padStart(2, '0')}</div>
                <figcaption>${item}</figcaption>
              </figure>
            `).join('')}
          </div>
          <div class="modal-gallery-controls">
            <button type="button" class="btn-icon" data-gallery="previous" aria-label="Image précédente">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button type="button" class="btn-icon" data-gallery="next" aria-label="Image suivante">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
        
        <div class="modal-badges-flex">
          ${project.technologies.map(tech => `<span class="tag tech-badge">${tech}</span>`).join('')}
        </div>
        
        <p class="modal-desc-full">${project.description}</p>
        
        <div class="modal-actions-row">
          <a href="${project.codeLink}" class="btn btn-code">Code</a>
          <a href="${project.liveLink}" class="btn btn-demo">Live demo</a>
        </div>
      `;

      const titleEl = document.getElementById('modal-project-title');
      if (titleEl) titleEl.textContent = project.title;

      openModal(projectModal);
      bindGalleryControls();
    });
  });

  modalClose?.addEventListener('click', closeProjectModal);
  modalOverlay?.addEventListener('click', closeProjectModal);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (activeModal) closeModal(activeModal);
      return;
    }
    
    if (event.key === 'Tab' && activeModal) {
      const focusable = activeModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      
      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];
      
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  });

  const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.removeAttribute('aria-current');
      if (link.getAttribute('href') === `#${current}`) {
        link.setAttribute('aria-current', 'page');
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
  });

  // Fix: Empêche le bug de transition sur les boutons
  (function wrapFirstTwoHeroCTAs() {
    const nodeList = document.querySelectorAll('.hero-cta-group .btn, .hero-cta-group a');
    if (!nodeList || nodeList.length === 0) return;

    const ctas = Array.from(nodeList).slice(0, 2); 
    ctas.forEach(btn => {
      if (!btn.querySelector('.btn-inner')) {
        const span = document.createElement('span');
        span.className = 'btn-inner';
        span.innerHTML = btn.innerHTML;
        btn.innerHTML = '';
        btn.appendChild(span);
      }
    });
  })();

  const messageInput = document.getElementById('message');
  const charCount = document.getElementById('char-count');
  
  if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
      const currentLength = messageInput.value.length;
      charCount.textContent = currentLength;
    });
  }

  document.querySelectorAll('.protected-contact').forEach(contactLink => {
    const buildLink = () => {
      const user = contactLink.getAttribute('data-user');
      const domain = contactLink.getAttribute('data-domain');
      const phone = contactLink.getAttribute('data-phone');
      
      if (user && domain && contactLink.getAttribute('href') === '#') {
        contactLink.setAttribute('href', `mailto:${user}@${domain}`);
      } else if (phone && contactLink.getAttribute('href') === '#') {
        contactLink.setAttribute('href', `tel:${phone}`);
      }
    };

    contactLink.addEventListener('mouseenter', buildLink);
    contactLink.addEventListener('touchstart', buildLink, {passive: true});
    contactLink.addEventListener('focus', buildLink);
  });

  const terminalOverlay = document.getElementById('terminal-overlay');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalBody = document.getElementById('terminal-body');
  const terminalClose = document.getElementById('terminal-close');

  if (terminalOverlay && terminalInput) {
    const openTerminal = () => {
      terminalOverlay.classList.remove('hidden');
      setTimeout(() => {
        terminalOverlay.classList.add('active');
        terminalInput.focus();
      }, 10);
    };

    const closeTerminal = () => {
      terminalOverlay.classList.remove('active');
      setTimeout(() => terminalOverlay.classList.add('hidden'), 300);
    };

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey && e.altKey && e.key.toLowerCase() === 't') || e.key === '~' || e.key === '²') {
        e.preventDefault();
        terminalOverlay.classList.contains('active') ? closeTerminal() : openTerminal();
      }
    });

    terminalClose.addEventListener('click', closeTerminal);
    terminalOverlay.addEventListener('click', (e) => { if (e.target === terminalOverlay) closeTerminal(); });
    // TODO: Ajouter un système de logs pour les commandes du terminal
    terminalBody.addEventListener('click', () => terminalInput.focus()); // Maintient le focus dans l'input

    const terminalCommands = {
      help: () => `Commandes disponibles :<br>- <strong>whoami</strong> : En savoir plus sur moi<br>- <strong>skills</strong> : Mes compétences techniques<br>- <strong>projects</strong> : Afficher mes projets récents<br>- <strong>clear</strong> : Effacer l'écran<br>- <strong>exit</strong> : Fermer le terminal<br>- <strong>sudo</strong> : (Accès administrateur)`,
      whoami: () => `<strong>Omar Ghraybia</strong><br>Développeur d'Applications & Étudiant en BUT Informatique.`,
      skills: () => `[+] Java, JavaScript, HTML/CSS<br>[+] SQL, PostgreSQL<br>[+] Linux, Debian, Administration Système`,
      projects: () => `1. Allo Kiné<br>2. Déploiement Debian<br>3. Le Tourmentin<br>Fermez le terminal pour voir les détails !`,
      sudo: () => `<span class="error">omar is not in the sudoers file. This incident will be reported.</span>`,
      clear: () => { terminalOutput.innerHTML = ''; return ''; },
      exit: () => { closeTerminal(); return 'Fermeture...'; }
    };

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        if (cmd) {
          terminalOutput.innerHTML += `<p><span class="prompt">omar@portfolio:~$</span> ${cmd}</p>`;
          
          if (terminalCommands[cmd]) {
            const response = typeof terminalCommands[cmd] === 'function' ? terminalCommands[cmd]() : terminalCommands[cmd];
            if (response) terminalOutput.innerHTML += `<p>${response}</p>`;
          } else {
            terminalOutput.innerHTML += `<p class="error">bash: ${cmd}: command not found. Tapez 'help' pour les commandes disponibles.</p>`;
          }
        }
        terminalInput.value = '';
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TypingEffect;
}
