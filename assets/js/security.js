// Bloquer le clic droit
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// Bloquer les raccourcis clavier d'inspection
document.addEventListener('keydown', function(e) {
  // Bloquer F12
  if (e.key === 'F12') {
    e.preventDefault();
  }

  // Bloquer Ctrl+Shift+I (Outils de développement)
  if (e.ctrlKey && e.shiftKey && e.key === 'I') {
    e.preventDefault();
  }

  // Bloquer Ctrl+Shift+J (Console)
  if (e.ctrlKey && e.shiftKey && e.key === 'J') {
    e.preventDefault();
  }

  // Bloquer Ctrl+U (Afficher le code source)
  if (e.ctrlKey && e.key === 'u') {
    e.preventDefault();
  }
});
