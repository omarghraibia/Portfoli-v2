document.addEventListener('DOMContentLoaded', () => {

  // 1. Menu et header au scroll
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    });
  }

  const hamburger = document.getElementById('hamburger-menu');
  const navLinksContainer = document.querySelector('.nav-links');
  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      hamburger.classList.toggle('toggle');
    });
  }

  // 2. Base de donnees des projets
  const dataProjets = {
    "allo-kine": {
      title: "Allo Kiné",
      description: "Application web pour la gestion d'un cabinet de kinésithérapie. Modélisation de la base de données SQL et intégration des interfaces.",
      technologies: ["HTML5", "CSS3", "JavaScript", "SQL"],
      codeLink: "https://github.com/omarghraibia/allokine",
      liveLink: "https://allokine.vercel.app/"
    },
    "inetum": {
      title: "Inetum",
      description: "Création d'un site éco-conçu pour vulgariser les métiers du numérique. Gestion de l'intégration et coordination sur Git.",
      technologies: ["HTML5", "CSS3", "Git", "Green IT"],
      codeLink: "https://github.com/D-Inetum/SAE-1.05-06",
      liveLink: "https://inetum-apoa0127m-omar-s-projects-5cbfe118.vercel.app"
    },
    "morpion": {
      title: "Morpion XO",
      description: "Jeu de Morpion interactif contre l'ordinateur. Développé entièrement en JavaScript pur sans bibliothèque externe.",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      codeLink: "https://github.com/omarghraibia/MORPION-XO-Omar-Ghraibia",
      liveLink: "https://morpion-xo-omar-ghraibia.vercel.app"
    }
  };

  // 3. Gestion de la modale (popup)
  const projectModal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCloseBtn = document.getElementById('modal-close');

  function ouvrirModale(id) {
    const projet = dataProjets[id];
    if (!projet) return;

    modalTitle.textContent = projet.title;
    modalBody.innerHTML = '';

    // generation des badges
    const badgesDiv = document.createElement('div');
    badgesDiv.className = 'modal-badges-flex';
    projet.technologies.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'tag tech-badge';
      span.textContent = tech;
      badgesDiv.appendChild(span);
    });
    modalBody.appendChild(badgesDiv);

    // generation de la description
    const textDesc = document.createElement('p');
    textDesc.className = 'modal-desc-full';
    textDesc.textContent = projet.description;
    modalBody.appendChild(textDesc);

    // generation des boutons
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'modal-actions-row';

    const btnCode = document.createElement('a');
    btnCode.href = projet.codeLink;
    btnCode.className = 'btn btn-code';
    btnCode.textContent = 'Code source';
    btnCode.target = '_blank';

    const btnDemo = document.createElement('a');
    btnDemo.href = projet.liveLink;
    btnDemo.className = 'btn btn-demo';
    btnDemo.textContent = 'Voir le site';
    btnDemo.target = '_blank';

    actionsDiv.appendChild(btnCode);
    actionsDiv.appendChild(btnDemo);
    modalBody.appendChild(actionsDiv);

    projectModal.classList.add('active');
  }

  // ecouteurs sur les cartes
  const cartes = document.querySelectorAll('.project-card');
  cartes.forEach(carte => {
    carte.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'a') return;
      ouvrirModale(carte.getAttribute('data-project'));
    });
  });

  // fermer la modale
  function fermerModale() {
    if (projectModal) {
      projectModal.classList.remove('active');
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', fermerModale);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fermerModale();
  });

  // 4. Animations scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  });

  document.querySelectorAll('.fade-in-section').forEach(sec => {
    observer.observe(sec);
  });
});