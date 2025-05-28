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
        navMenu.classList.remove('show');
        menuToggle.innerHTML = '&#9776;';
      });
    });
  }

  // Gestion du thème clair/sombre
  if (themeToggle) {
    // Vérifier les préférences enregistrées
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark');
      themeToggle.textContent = '☀️';
    } else {
      themeToggle.textContent = '🌙';
    }

    // Basculer le thème
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      
      if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
      } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
      }
    });
  }

  // Navigation active
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || 
        (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Démo HBox/VBox pour la page containers.html
  const containerDemo = document.getElementById('container-demo');
  if (containerDemo) {
    const demoSelect = document.getElementById('container-type');
    const demoItems = document.querySelectorAll('.demo-item');
    const containerDisplay = document.getElementById('container-display');
    
    // Fonction pour mettre à jour la démo
    const updateContainerDemo = (containerType) => {
      // Réinitialiser les styles
      containerDisplay.className = 'container-display';
      
      // Masquer toutes les descriptions
      document.querySelectorAll('.container-desc').forEach(desc => {
        desc.classList.remove('active');
      });
      
      // Afficher la description correspondante
      const descElement = document.getElementById(containerType + '-description');
      if (descElement) {
        descElement.classList.add('active');
      }
      
      // Appliquer le style correspondant au conteneur
      switch (containerType) {
        case 'hbox':
          containerDisplay.classList.add('demo-hbox');
          break;
        case 'vbox':
          containerDisplay.classList.add('demo-vbox');
          break;
        case 'flowpane':
          containerDisplay.classList.add('demo-flowpane');
          break;
        case 'gridpane':
          containerDisplay.classList.add('demo-gridpane');
          break;
        case 'tilepane':
          containerDisplay.classList.add('demo-tilepane');
          break;
        case 'borderpane':
          containerDisplay.classList.add('demo-borderpane');
          // Positionnement des éléments dans le BorderPane
          demoItems.forEach((item, index) => {
            item.className = 'demo-item';
            if (index === 0) item.classList.add('demo-top');
            if (index === 1) item.classList.add('demo-left');
            if (index === 2) item.classList.add('demo-center');
            if (index === 3) item.classList.add('demo-right');
            if (index === 4) item.classList.add('demo-bottom');
          });
          return; // On sort car on a déjà configuré les éléments
        case 'stackpane':
          containerDisplay.classList.add('demo-stackpane');
          break;
        default:
          containerDisplay.classList.add('demo-hbox');
      }
      
      // Réinitialiser les styles des éléments pour les autres conteneurs
      demoItems.forEach(item => {
        item.className = 'demo-item';
      });
    };
    
    // Initialiser avec le conteneur par défaut
    updateContainerDemo(demoSelect.value);
    
    // Mettre à jour lors du changement
    demoSelect.addEventListener('change', () => {
      updateContainerDemo(demoSelect.value);
    });
  }

  // Chargement de Prism.js pour la coloration syntaxique
  loadPrism();
  
  // Gestion du sommaire flottant
  initFloatingToc();
});

// Gestion du sommaire flottant
function initFloatingToc() {
  const tocToggle = document.querySelector('.toc-toggle');
  const floatingToc = document.querySelector('.floating-toc');
  
  if (tocToggle && floatingToc) {
    // Gestion du clic sur le bouton du sommaire
    tocToggle.addEventListener('click', () => {
      floatingToc.classList.toggle('toc-expanded');
      
      if (floatingToc.classList.contains('toc-expanded')) {
        floatingToc.style.right = '0';
        tocToggle.textContent = '×';
      } else {
        floatingToc.style.right = '-250px';
        tocToggle.textContent = '≡';
      }
    });
    
    // Navigation fluide lors du clic sur les liens du sommaire
    const tocLinks = document.querySelectorAll('.toc-list a');
    tocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Scroll fluide vers la cible
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // Fermer le sommaire sur mobile
          if (window.innerWidth <= 768) {
            floatingToc.classList.remove('toc-expanded');
            floatingToc.style.right = '-250px';
            tocToggle.textContent = '≡';
          }
          
          // Mettre en évidence la section active
          tocLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    });
    
    // Mettre à jour le sommaire en fonction du défilement
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      
      // Trouver la section active
      const sections = document.querySelectorAll('section[id]');
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = '#' + section.getAttribute('id');
        }
      });
      
      // Mettre à jour le lien actif dans le sommaire
      if (currentSection) {
        tocLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

// Fonction pour charger dynamiquement Prism.js et le CSS associé
function loadPrism() {
  // Vérifier si Prism est déjà chargé
  if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
    return;
  }

  // Charger le CSS de Prism
  const prismCSS = document.createElement('link');
  prismCSS.rel = 'stylesheet';
  prismCSS.href = 'https://cdn.jsdelivr.net/npm/prismjs@1.24.1/themes/prism-tomorrow.min.css';
  document.head.appendChild(prismCSS);

  // Charger le script principal de Prism
  const prismScript = document.createElement('script');
  prismScript.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.24.1/prism.min.js';
  document.body.appendChild(prismScript);

  // Attendre que Prism soit chargé puis ajouter les plugins et langages
  prismScript.onload = () => {
    // Langages à charger
    const languages = ['java', 'xml', 'css', 'bash'];
    let loadedCount = 0;
    
    // Charger chaque langage
    languages.forEach(lang => {
      const script = document.createElement('script');
      script.src = `https://cdn.jsdelivr.net/npm/prismjs@1.24.1/components/prism-${lang}.min.js`;
      
      // Forcer le rafraîchissement de la coloration syntaxique après le chargement de tous les langages
      script.onload = () => {
        loadedCount++;
        if (loadedCount === languages.length && typeof Prism !== 'undefined') {
          setTimeout(() => {
            Prism.highlightAll();
          }, 100); // Petit délai pour s'assurer que les scripts sont bien chargés
        }
      };
      
      document.body.appendChild(script);
    });
    
    // Au cas où, forcer l'exécution de la coloration syntaxique après un délai
    setTimeout(() => {
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    }, 500);
  };
}

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