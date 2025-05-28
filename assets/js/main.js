// main.js - Gestion de l'interface du site de documentation JavaFX

document.addEventListener('DOMContentLoaded', () => {
  // Éléments DOM
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;

  // Gestion du menu mobile
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      
      // Change l'icône du menu
      const isOpen = navMenu.classList.contains('show');
      menuToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
    });

    // Ferme le menu quand on clique sur un lien
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('show');
          menuToggle.innerHTML = '&#9776;';
        }
      });
    });
  }

  // Gestion du thème clair/sombre
  if (themeToggle) {
    // Vérifie s'il y a une préférence stockée
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark');
      themeToggle.innerHTML = '☀️';
    } else {
      themeToggle.innerHTML = '🌙';
    }

    // Bascule entre thème clair et sombre
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      
      // Change l'icône du thème
      const isDark = body.classList.contains('dark');
      themeToggle.innerHTML = isDark ? '☀️' : '🌙';
      
      // Enregistre la préférence
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Démo HBox/VBox pour la page containers.html
  const orientationToggle = document.getElementById('toggle-orientation');
  const flexContainer = document.querySelector('.flex-demo');
  
  if (orientationToggle && flexContainer) {
    orientationToggle.addEventListener('click', () => {
      // Bascule entre flex-row (HBox) et flex-column (VBox)
      flexContainer.classList.toggle('flex-column');
      
      // Met à jour le texte du bouton
      const isColumn = flexContainer.classList.contains('flex-column');
      orientationToggle.textContent = isColumn ? 'Afficher comme HBox' : 'Afficher comme VBox';
    });
  }
});

// Mise en évidence des onglets actifs
function setActiveTab() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

// Appelé après le chargement du DOM
document.addEventListener('DOMContentLoaded', setActiveTab); 