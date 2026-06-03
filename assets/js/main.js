document.addEventListener('DOMContentLoaded', () => {

  // Base de donnees des mes projets
  const dataProjets = {
    "allo-kine": {
      "title": "Allo Kiné",
      "description": "Développement d'une solution digitale sur mesure pour un cabinet de kinésithérapie (projet pour le cabinet de mon père).",
      "objectifs": "Moderniser l'activité et faciliter la gestion des patients et des plannings.",
      "travailGroupe": "Projet réalisé en autonomie complète (1 personne).",
      "travailIndividuel": "Modélisation de la base de données, développement Front-End et Back-End, création de l'identité visuelle (logo).",
      "competences": "Modélisation SQL, intégration dynamique, conception UX/UI.",
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
      "description": "Projet collaboratif visant à concevoir un site web institutionnel éco-responsable pour vulgariser les activités de l'ESN Inetum auprès des collégiens.",
      "objectifs": "Créer une interface accessible et respectueuse des principes du Green IT.",
      "travailGroupe": "Équipe de 3 personnes. Répartition des tâches de design et de développement.",
      "travailIndividuel": "Rôle de responsable Git (coordination et fusion), direction artistique (maquettes) et intégration de 85% des pages web.",
      "competences": "Gestion de projet, versioning, éco-conception web.",
      "technologies": ["HTML5", "CSS3", "Git", "UI/UX Design", "Green IT"],
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
      "description": "Mini-jeu de Morpion (Tic-Tac-Toe) jouable dans le navigateur avec un mode deux joueurs et un mode contre l'ordinateur.",
      "objectifs": "Mettre en pratique la logique algorithmique complexe en JavaScript vanilla.",
      "travailGroupe": "Projet réalisé en autonomie (1 personne).",
      "travailIndividuel": "Développement de la logique de jeu, de l'interface et implémentation de l'algorithme Minimax pour l'intelligence artificielle.",
      "competences": "Algorithmique avancée, manipulation du DOM, logique de jeu.",
      "technologies": ["HTML5", "CSS3", "JavaScript", "Minimax"],
      "gallery": [
        "assets/morpion/acceuil 1v1.png",
        "assets/morpion/fin partie 1V1.png",
        "assets/morpion/VS ROBOT.png"
      ],
      "codeLink": "https://github.com/omarghraibia/MORPION-XO-Omar-Ghraibia",
      "liveLink": "https://morpion-xo-omar-ghraibia.vercel.app"
    }
  };

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalTitle = document.getElementById('modal-project-title');

  
  document.querySelectorAll('.project-card').forEach(carte => {
    carte.addEventListener('click', () => {
      const id = carte.getAttribute('data-project');
      const projet = dataProjets[id];

      if (projet) {
        modalTitle.textContent = projet.title;
        modalBody.innerHTML = '';

        // CARROUSEL D'IMAGES AVEC FLECHES 
        const carousel = document.createElement('div');
        carousel.className = 'modal-carousel';
        
        const imgDisplay = document.createElement('img');
        let currentImgIndex = 0;
        imgDisplay.src = projet.gallery[currentImgIndex];
        imgDisplay.className = 'carousel-img';
        
        const btnPrev = document.createElement('button');
        btnPrev.textContent = "◄";
        btnPrev.className = 'carousel-btn prev';
        btnPrev.onclick = () => {
          currentImgIndex = (currentImgIndex - 1 + projet.gallery.length) % projet.gallery.length;
          imgDisplay.src = projet.gallery[currentImgIndex];
        };

        const btnNext = document.createElement('button');
        btnNext.textContent = "►";
        btnNext.className = 'carousel-btn next';
        btnNext.onclick = () => {
          currentImgIndex = (currentImgIndex + 1) % projet.gallery.length;
          imgDisplay.src = projet.gallery[currentImgIndex];
        };

        carousel.appendChild(btnPrev);
        carousel.appendChild(imgDisplay);
        carousel.appendChild(btnNext);
        modalBody.appendChild(carousel);

        // STRUCTURE PPP 
        const pppDiv = document.createElement('div');
        pppDiv.className = 'modal-ppp-content';
        pppDiv.innerHTML = `
          <p><strong>Description :</strong> ${projet.description}</p>
          <p><strong>Objectifs :</strong> ${projet.objectifs}</p>
          <p><strong>Organisation :</strong> ${projet.travailGroupe}</p>
          <p><strong>Mon rôle :</strong> ${projet.travailIndividuel}</p>
          <p><strong>Compétences acquises :</strong> ${projet.competences}</p>
        `;
        modalBody.appendChild(pppDiv);

        // BADGES TECHNOS
        const badgesDiv = document.createElement('div');
        badgesDiv.className = 'modal-badges-flex';
        projet.technologies.forEach(tech => {
          const span = document.createElement('span');
          span.className = 'tag tech-badge';
          span.textContent = tech;
          badgesDiv.appendChild(span);
        });
        modalBody.appendChild(badgesDiv);

        // BOUTONS LIENS 
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'modal-actions-row';
        actionsDiv.innerHTML = `
          <a href="${projet.codeLink}" class="btn btn-code" target="_blank">Code source</a>
          <a href="${projet.liveLink}" class="btn btn-demo" target="_blank">Voir le site</a>
        `;
        modalBody.appendChild(actionsDiv);

        modal.classList.add('active');
      }
    });
  });

  // 3. Fermeture de la modale
  document.getElementById('modal-close').addEventListener('click', () => {
    modal.classList.remove('active');
  });
});