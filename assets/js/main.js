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

  successClose?.addEventListener('click', () => closeModal(successModal));
  successOverlay?.addEventListener('click', () => closeModal(successModal));

  const projectData = {
    'allo-kine': {
      title: 'Allo Kiné',
      period: '2026',
      dates: 'Février 2026 - Avril 2026',
      team: '1 personne',
      duration: '60 jours',
      description: 'Développement d\'une solution digitale sur mesure pour le cabinet de kinésithérapie de mon père. Ce projet personnel m\'a permis de gérer l\'intégralité de la création d\'un outil métier concret pour moderniser son activité et faciliter la gestion de ses patients.<br><br><strong>Mes réalisations :</strong><br>• Modélisation de la base de données SQL pour les plannings.<br>• Intégration des interfaces dynamiques en JavaScript.<br>• Création de l\'identité visuelle (logo) et optimisation du parcours utilisateur (UX).',
      details: ['Interface responsive', 'Parcours patient simplifié', 'Structure prête pour une prise de rendez-vous'],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'SQL'],
      gallery: [
        { src: 'assets/allokine/Accueil.png' },
        { src: 'assets/allokine/avis.png' },
        { src: 'assets/allokine/connexion.png' },
        { src: 'assets/allokine/contact.png' },
        { src: 'assets/allokine/Galerie.png' },
        { src: 'assets/allokine/Tarifs.png' }
      ],
      codeLink: 'https://github.com/omarghraibia/allokine',
      liveLink: 'https://allokine.vercel.app/'
    },
    'inetum': {
      title: 'Inetum',
      period: '2025-2026',
      dates: 'Octobre 2025 - Janvier 2026',
      team: '3 personnes',
      duration: '3 mois',
      description: 'Projet collaboratif visant à concevoir un site web institutionnel éco-responsable pour vulgariser les activités de l\'ESN Inetum auprès de collégiens (3ème).<br><br><strong>Mon rôle et mes réalisations :</strong><br>• <strong>Gestion de projet & Git :</strong> Coordination de l\'équipe et rôle de responsable Git pour la fusion des travaux.<br>• <strong>Direction artistique :</strong> Conception des maquettes et définition du style pour garantir la cohérence visuelle.<br>• <strong>Développement Front-End :</strong> Intégration d\'environ 85 % des pages web en appliquant les bonnes pratiques du Green IT.<br><br>Ce projet m\'a permis de mettre en pratique mes compétences techniques (HTML/CSS) tout en développant la coordination d\'équipe et la gestion de versions.',
      details: ['Gestion de projet', 'Éco-conception', 'Développement Web'],
      technologies: ['HTML5', 'CSS3', 'Git', 'UI/UX Design', 'Green IT'],
      gallery: [
        { src: 'assets/inetum/accueil.webp' },
        { src: 'assets/inetum/candidater.webp' },
        { src: 'assets/inetum/contact.webp' },
        { src: 'assets/inetum/environnement.webp' },
      ],
      codeLink: 'https://github.com/D-Inetum/SAE-1.05-06',
      liveLink: 'https://inetum-apoa0127m-omar-s-projects-5cbfe118.vercel.app'
    },
    {
  'morpion': {
    'title': 'Morpion XO',
    'period': '2026',
    'dates': 'avril 2026',
    'team': '1 personne',
    'duration': '1 semaine',
    'description': 'Mini-jeu de Morpion (Tic-Tac-Toe) jouable dans le navigateur. Mode deux joueurs et mode contre le robot avec trois niveaux de difficulté. Interface Flat Dark avec choix de thèmes et personnalisation des noms de joueurs. Développé en vanilla JavaScript sans bibliothèque externe.',
    'details': ['Jeu de société', 'Intelligence artificielle simple', 'Design responsive'],
    'technologies': ['HTML5', 'CSS3', 'JavaScript', 'Minimax'],
    'gallery': [
      { 'src': 'assets/morpion/acceuil 1v1.png' },
      { 'src': 'assets/morpion/fin partie 1V1.png' },
      { 'src': 'assets/morpion/fin vs robot.png' },
      { 'src': 'assets/morpion/VS ROBOT.png' }
    ],
    'codeLink': 'https://github.com/omarghraibia/MORPION-XO-Omar-Ghraibia',
    'liveLink': 'https://morpion-xo-omar-ghraibia.vercel.app'
  },
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
            ${project.gallery.map((item, index) => {
        if (typeof item === 'object') {
          return `
                  <figure class="modal-gallery-slide">
                    <div class="modal-gallery-image" style="padding:0; overflow:hidden;">
                      <img src="${item.src}" alt="Image du projet" loading="lazy" style="width:100%; height:100%; object-fit:cover; display:block;" />
                    </div>
                  </figure>
                `;
        } else {
          return `
                  <figure class="modal-gallery-slide">
                    <div class="modal-gallery-image">${String(index + 1).padStart(2, '0')}</div>
                  </figure>
                `;
        }
      }).join('')}
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

  modalClose?.addEventListener('click', () => closeModal(projectModal));
  modalOverlay?.addEventListener('click', () => closeModal(projectModal));

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

  const observerOptions = { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0 };
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

  const messageInput = document.getElementById('message');
  const charCount = document.getElementById('char-count');

  if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
      charCount.textContent = messageInput.value.length;
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
    contactLink.addEventListener('touchstart', buildLink, { passive: true });
    contactLink.addEventListener('focus', buildLink);
  });
});