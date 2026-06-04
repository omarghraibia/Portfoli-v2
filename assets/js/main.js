document.addEventListener('DOMContentLoaded', () => {
  
  // menu mobile
  const hamburger = document.getElementById('hamburger-menu');
  const menu = document.querySelector('.nav-links');

  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('toggle');
      menu.classList.toggle('active');
    });

    // fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(lien => {
      lien.addEventListener('click', () => {
        hamburger.classList.remove('toggle');
        menu.classList.remove('active');
      });
    });
  }

  // donnees des projets
  const dataProjets = {
    "allo-kine": {
      "title": "Allo Kiné",
      "description": "Solution web pour un cabinet de kinésithérapie (projet réel).",
      "objectifs": "Moderniser l'activité, gérer les patients et les plannings.",
      "groupe": "Projet réalisé en autonomie.",
      "role": "Modélisation BDD SQL, développement Front-End et création du logo.",
      "competences": "SQL, HTML/CSS, JavaScript, UI Design.",
      "technologies": ["HTML5", "CSS3", "JavaScript", "SQL"],
      "gallery": [
        "assets/allokine/Accueil.png", "assets/allokine/avis.png",
        "assets/allokine/connexion.png", "assets/allokine/contact.png"
      ],
      "codeLink": "https://github.com/omarghraibia/allokine",
      "liveLink": "https://allokine.vercel.app/"
    },
    "inetum": {
      "title": "Inetum",
      "description": "Site web institutionnel éco-responsable pour vulgariser l'ESN Inetum.",
      "objectifs": "Créer une interface accessible et respectueuse du Green IT.",
      "groupe": "Travail en équipe de 3 personnes.",
      "role": "Responsable Git, conception des maquettes et intégration de 85% des pages.",
      "competences": "Gestion de projet, Git, Eco-conception web.",
      "technologies": ["HTML5", "CSS3", "Git", "Green IT"],
      "gallery": [
        "assets/inetum/accueil.webp", "assets/inetum/candidater.webp",
        "assets/inetum/contact.webp"
      ],
      "codeLink": "https://github.com/D-Inetum/SAE-1.05-06",
      "liveLink": "https://sae-1-05-06.vercel.app"
    },
    "morpion": {
      "title": "Morpion XO",
      "description": "Mini-jeu de Morpion interactif dans le navigateur.",
      "objectifs": "Implémenter une logique algorithmique complexe (Minimax).",
      "groupe": "Projet réalisé en autonomie.",
      "role": "Développement de toute la logique JavaScript et de l'interface.",
      "competences": "Algorithmique, manipulation du DOM.",
      "technologies": ["HTML5", "CSS3", "JavaScript"],
      "gallery": [
        "assets/morpion/acceuil 1v1.png", "assets/morpion/fin partie 1V1.png",
        "assets/morpion/fin vs robot.png"
      ],
      "codeLink": "https://github.com/omarghraibia/MORPION-XO-Omar-Ghraibia",
      "liveLink": "https://morpion-xo-omar-ghraibia.vercel.app"
    }
  };

  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalBody = document.getElementById('modal-body');

  // gerer le clic sur les cartes
  document.querySelectorAll('.project-card').forEach(carte => {
    carte.addEventListener('click', () => {
      const id = carte.getAttribute('data-project');
      const projet = dataProjets[id];

      if (projet) {
        let currentImg = 0;
        let images = projet.gallery;

        modalTitle.textContent = projet.title;

        modalBody.innerHTML = `
          <div class="modal-carousel">
            <button type="button" id="btn-prev" class="carousel-btn">&lt;</button>
            <img id="carousel-display" src="${images[0]}" class="carousel-img" alt="apercu du projet">
            <button type="button" id="btn-next" class="carousel-btn">&gt;</button>
          </div>
          
          <div class="modal-ppp">
            <p><strong>Description :</strong> ${projet.description}</p>
            <p><strong>Objectifs :</strong> ${projet.objectifs}</p>
            <p><strong>Organisation :</strong> ${projet.groupe}</p>
            <p><strong>Mon rôle :</strong> ${projet.role}</p>
            <p><strong>Savoir-faire acquis :</strong> ${projet.competences}</p>
          </div>

          <div id="modal-badges" class="modal-badges-flex"></div>

          <div class="modal-actions-row">
            <a href="${projet.codeLink}" target="_blank" class="btn btn-code">Code source</a>
            <a href="${projet.liveLink}" target="_blank" class="btn btn-demo">Voir le site</a>
          </div>
        `;

        // ajouter les tags
        const badgesDiv = document.getElementById('modal-badges');
        projet.technologies.forEach(tech => {
          let span = document.createElement('span');
          span.className = 'tag tech-badge';
          span.textContent = tech;
          badgesDiv.appendChild(span);
        });

        // clic sur le bouton precedent
        document.getElementById('btn-prev').addEventListener('click', () => {
          if (currentImg === 0) {
            currentImg = images.length - 1; // retourne a la derniere photo
          } else {
            currentImg--; // recule d'une photo
          }
          document.getElementById('carousel-display').src = images[currentImg];
        });

        // clic sur le bouton suivant
        document.getElementById('btn-next').addEventListener('click', () => {
          if (currentImg === images.length - 1) {
            currentImg = 0; // retourne a la premiere photo
          } else {
            currentImg++; // avance d'une photo
          }
          document.getElementById('carousel-display').src = images[currentImg];
        });

        // afficher la modale
        modal.classList.add('active');
      }
    });
  });

  // fermer la modale
  document.getElementById('modal-close').addEventListener('click', () => {
    modal.classList.remove('active');
  });
  // COLORER LE MENU SELON LE DEFILEMENT 
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = ''; 
    sections.forEach(section => {
      const sectionTop = section.offsetTop;

      if (scrollY >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    // On parcourt tous les liens du menu
    navLinks.forEach(link => {
      link.classList.remove('active'); 

      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // ANIMATION DES SECTIONS AU DEFILEMENT
  const fadeSections = document.querySelectorAll('.fade-in-section');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Si la section entre dans l'écran
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeSections.forEach(section => {
    observer.observe(section);
  });

  // envoi du formulaire sans recharger la page
  const formulaire = document.querySelector('.contact-form');
  const popup = document.getElementById('popup-message');

  if (formulaire) {
    formulaire.addEventListener('submit', (e) => {
      e.preventDefault(); // bloque lenvoi classique du html

      const donnees = new FormData(formulaire);

      fetch(formulaire.action, {
        method: 'POST',
        body: donnees
      }).then((reponse) => {
        if (reponse.ok) {
          formulaire.reset(); // vide les champs du formulaire
          popup.style.display = 'block'; // affiche le message
          
          setTimeout(() => {
            popup.style.display = 'none'; // cache le message apres 3s
          }, 3000);
        }
      });
    });
  }
});