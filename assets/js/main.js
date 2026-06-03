document.addEventListener('DOMContentLoaded', () => {
    // 1. Liste des projets =
    const dataProjets = {
        "allo-kine": {
            title: "Allo Kiné",
            description: "Application web pour la gestion d'un cabinet de kinésithérapie.",
            technologies: ["HTML5", "CSS3", "JavaScript", "SQL"],
            gallery: ["assets/allokine/Accueil.png", "assets/allokine/accueil.png"],
            codeLink: "https://github.com/omarghraibia/allokine",
            liveLink: "https://allokine.vercel.app/"
        },
        "inetum": {
            title: "Inetum",
            description: "Projet collaboratif éco-conçu pour l'ESN Inetum.",
            technologies: ["HTML5", "CSS3", "Git"],
            gallery: ["assets/inetum/accueil.webp", "assets/inetum/accueil.webp"],
            codeLink: "https://github.com/D-Inetum/SAE-1.05-06",
            liveLink: "https://inetum-apoa0127m-omar-s-projects-5cbfe118.vercel.app"
        },
        "morpion": {
            title: "Morpion XO",
            description: "Jeu de Morpion interactif contre l'ordinateur.",
            technologies: ["HTML5", "CSS3", "JavaScript"],
            gallery: ["assets/morpion/acceuil 1v1.png", "assets/morpion/accueil 1v1.png"],
            codeLink: "https://github.com/omarghraibia/MORPION-XO-Omar-Ghraibia",
            liveLink: "https://morpion-xo-omar-ghraibia.vercel.app"
        }
    };

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-project-title');

    // 2. Gestion du clic sur les cartes
    document.querySelectorAll('.project-card').forEach(carte => {
        carte.addEventListener('click', () => {
            const id = carte.getAttribute('data-project');
            const projet = dataProjets[id];
            
            if (projet) {
                modalTitle.textContent = projet.title;
                modalBody.innerHTML = `<p>${projet.description}</p>`;
                modal.classList.add('active');
            }
        });
    });

    // 3. Fermeture
    document.getElementById('modal-close').addEventListener('click', () => {
        modal.classList.remove('active');
    });
});