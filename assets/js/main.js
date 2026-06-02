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
    description: "Jeu de Morpion interactif contre l'ordinateur.",
    technologies: ["JavaScript"],
    gallery: ["assets/morpion/acceuil 1v1.png"],
    codeLink: "https://github.com/omarghraibia/MORPION-XO-Omar-Ghraibia",
    liveLink: "https://morpion-xo-omar-ghraibia.vercel.app"
    }
  };

  // 3. Gestion de la modale 
  const projectModal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCloseBtn = document.getElementById('modal-close');

  function ouvrirModale(id) {
    const projet = dataProjets[id];
    if (!projet) return;

    modalTitle.textContent = projet.title;
    modalBody.innerHTML = '';

    // 1.la galerie d'images avec scroll
    const galleryContainer = document.createElement('div');
    galleryContainer.className = 'modal-gallery-track';
    
    projet.gallery.forEach(imgSrc => {
      const figure = document.createElement('figure');
      figure.style.flex = "0 0 100%";
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = "Capture du projet";
      img.style.width = "100%";
      img.style.borderRadius = "8px";
      figure.appendChild(img);
      galleryContainer.appendChild(figure);
    });
    modalBody.appendChild(galleryContainer);

    // 2. Badges
    const badgesDiv = document.createElement('div');
    badgesDiv.className = 'modal-badges-flex';
    projet.technologies.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'tag tech-badge';
      span.textContent = tech;
      badgesDiv.appendChild(span);
    });
    modalBody.appendChild(badgesDiv);

    // 3. Description
    const textDesc = document.createElement('p');
    textDesc.className = 'modal-desc-full';
    textDesc.textContent = projet.description;
    modalBody.appendChild(textDesc);

    // 4. Boutons
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'modal-actions-row';
    actionsDiv.innerHTML = `
      <a href="${projet.codeLink}" class="btn btn-code" target="_blank">Code source</a>
      <a href="${projet.liveLink}" class="btn btn-demo" target="_blank">Voir le site</a>
    `;
    modalBody.appendChild(actionsDiv);

    projectModal.classList.add('active');
  }

  // ecouteurs sur les cartes
  const cartes = document.querySelectorAll('.project-card');
  cartes.forEach(carte => {
    carte.addEventListener('click', (e) => {
      const id = carte.getAttribute('data-project');
      if (id) {
        ouvrirModale(id);
      }
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