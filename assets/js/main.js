document.addEventListener('DOMContentLoaded', () => {
  // donnees des projets
  const dataProjets = {
    "allo-kine": {
      "title": "Allo Kiné",
      "description": "Développement d'une solution digitale sur mesure pour un cabinet de kinésithérapie. Ce projet m'a permis de gérer la création d'un outil métier concret : modélisation de la base de données SQL pour les plannings, intégration des interfaces dynamiques en JavaScript et création de l'identité visuelle.",
      "technologies": ["HTML5", "CSS3", "JavaScript", "SQL"],
      "gallery": [
        "assets/allokine/Accueil.png",
        "assets/allokine/avis.png",
        "assets/allokine/connexion.png",
        "assets/allokine/contact.png",
        "assets/allokine/Galerie.png",
        "assets/allokine/Tarifs.png"
      ],
      "codeLink": "https://github.com/omarghraibia/allokine",
      "liveLink": "https://allokine.vercel.app/"
    },
    "inetum": {
      "title": "Inetum",
      "description": "Projet collaboratif (3 personnes) visant à concevoir un site web institutionnel éco-responsable pour vulgariser les activités de l'ESN Inetum. En tant que responsable Git, j'ai coordonné l'équipe, conçu les maquettes et intégré 85% des pages web en appliquant les principes du Green IT.",
      "technologies": ["HTML5", "CSS3", "JavaScript", "Git"],
      "gallery": [
        "assets/inetum/accueil.webp",
        "assets/inetum/candidater.webp",
        "assets/inetum/contact.webp",
        "assets/inetum/environnement.webp"
      ],
      "codeLink": "https://github.com/D-Inetum/SAE-1.05-06",
      "liveLink": "https://inetum-apoa0127m-omar-s-projects-5cbfe118.vercel.app"
    },
    "morpion": {
      "title": "Morpion XO",
      "description": "Mini-jeu de Morpion jouable dans le navigateur. Mode deux joueurs et mode contre l'ordinateur avec trois niveaux de difficulté (algorithme Minimax). Interface développée entièrement en vanilla JavaScript sans bibliothèque externe.",
      "technologies": ["HTML5", "CSS3", "JavaScript"],
      "gallery": [
        "assets/morpion/acceuil 1v1.png",
        "assets/morpion/fin partie 1V1.png",
        "assets/morpion/fin vs robot.png",
        "assets/morpion/vs robot.png"
      ],
      "codeLink": "https://github.com/omarghraibia/MORPION-XO-Omar-Ghraibia",
      "liveLink": "https://morpion-xo-omar-ghraibia.vercel.app"
    }
  };

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalTitle = document.getElementById('modal-project-title');

  // ouverture de la modale et creation du html
  document.querySelectorAll('.project-card').forEach(carte => {
    carte.addEventListener('click', () => {
      const id = carte.getAttribute('data-project');
      const projet = dataProjets[id];

      if (projet) {
        modalTitle.textContent = projet.title;
        modalBody.innerHTML = ''; // on vide le contenu precedent

        // 1. galerie images avec boutons
        const galleryWrapper = document.createElement('div');
        galleryWrapper.className = 'gallery-wrapper';
        
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'modal-gallery-track';
        
        projet.gallery.forEach(imgSrc => {
          const figure = document.createElement('figure');
          figure.style.flex = "0 0 100%";
          const img = document.createElement('img');
          img.src = imgSrc;
          img.alt = "Capture " + projet.title;
          img.style.width = "100%";
          img.style.borderRadius = "8px";
          figure.appendChild(img);
          galleryContainer.appendChild(figure);
        });
        
        // bouton gauche
        const btnLeft = document.createElement('button');
        btnLeft.className = 'gallery-btn gallery-btn-left';
        btnLeft.textContent = '❮';
        btnLeft.addEventListener('click', () => {
          galleryContainer.scrollBy({ left: -400, behavior: 'smooth' });
        });
        
        // bouton droite
        const btnRight = document.createElement('button');
        btnRight.className = 'gallery-btn gallery-btn-right';
        btnRight.textContent = '❯';
        btnRight.addEventListener('click', () => {
          galleryContainer.scrollBy({ left: 400, behavior: 'smooth' });
        });
        
        galleryWrapper.appendChild(btnLeft);
        galleryWrapper.appendChild(galleryContainer);
        galleryWrapper.appendChild(btnRight);
        modalBody.appendChild(galleryWrapper);

        // 2. tags
        const badgesDiv = document.createElement('div');
        badgesDiv.className = 'modal-badges-flex';
        projet.technologies.forEach(tech => {
          const span = document.createElement('span');
          span.className = 'tag tech-badge';
          span.textContent = tech;
          badgesDiv.appendChild(span);
        });
        modalBody.appendChild(badgesDiv);

        // 3. description
        const textDesc = document.createElement('p');
        textDesc.className = 'modal-desc-full';
        textDesc.textContent = projet.description;
        modalBody.appendChild(textDesc);

        // 4. liens github et live
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'modal-actions-row';
        actionsDiv.innerHTML = `
          <a href="${projet.codeLink}" class="btn btn-code" target="_blank">Code source</a>
          <a href="${projet.liveLink}" class="btn btn-demo" target="_blank">Voir le site</a>
        `;
        modalBody.appendChild(actionsDiv);

        modal.classList.add('active');
        // empêcher scroll du body
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // fermeture modale
  document.getElementById('modal-close').addEventListener('click', () => {
    modal.classList.remove('active');
    // réactiver le scroll du body
    document.body.style.overflow = '';
  });

  // fermer la modale en cliquant sur le fond
  document.getElementById('modal-overlay').addEventListener('click', () => {
    modal.classList.remove('active');
    // réactiver le scroll du body
    document.body.style.overflow = '';
  });
});