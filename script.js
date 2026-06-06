/* ============================================================
   CABELLOS MÁGICOS — JavaScript
   ============================================================ */

/* ---- Navbar: scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ---- Hamburger menu ---- */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Add mobile CTA inside nav menu when open
const mobileCta = document.createElement('a');
mobileCta.href = "https://wa.me/573217829508?text=Hola!%20Quiero%20hacer%20un%20pedido%20%F0%9F%8C%B8";
mobileCta.target = "_blank";
mobileCta.className = "btn-whatsapp-nav-mobile";
mobileCta.textContent = "¡Comprar ahora!";
navMenu.appendChild(mobileCta);

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---- Scroll-reveal (Intersection Observer) ---- */
const revealEls = document.querySelectorAll('.fade-in, .fade-in-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children in grids
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach((el, i) => {
  const parent = el.parentElement;
  // Stagger siblings in the same grid/container
  const siblings = parent ? [...parent.querySelectorAll('.fade-in, .fade-in-right')] : [];
  const idx = siblings.indexOf(el);
  el.dataset.delay = idx * 80;
  revealObserver.observe(el);
});

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.fontWeight = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--pink)';
          link.style.fontWeight = '700';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ---- Smooth scroll polyfill for older Safari ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- Animated counter for stats ---- */
function animateCounter(el, target, duration = 1800) {
  const start = 0;
  const step = target / (duration / 16);
  let current = start;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('es-CO') + (el.dataset.suffix || '');
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const num = entry.target;
      const rawText = num.textContent;
      const numericVal = parseInt(rawText.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(numericVal) && numericVal > 0) {
        num.dataset.suffix = rawText.replace(/[0-9,\.]/g, '').trim();
        animateCounter(num, numericVal);
      }
      statsObserver.unobserve(num);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => statsObserver.observe(el));

/* ---- WhatsApp float visibility on scroll ---- */
const waFloat = document.getElementById('whatsapp-float');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    waFloat.style.opacity = '1';
    waFloat.style.transform = 'scale(1)';
  } else {
    waFloat.style.opacity = '0.8';
    waFloat.style.transform = 'scale(0.9)';
  }
}, { passive: true });

/* ---- Catálogo Completo: Filtro por Categorías ---- */
const tabBtns = document.querySelectorAll('.tab-btn');
const catItems = document.querySelectorAll('.cat-item');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Quitar active a todos
    tabBtns.forEach(b => b.classList.remove('active'));
    // Poner active al clickeado
    btn.classList.add('active');

    const filter = btn.getAttribute('data-cat');

    // Filtrar items
    catItems.forEach(item => {
      if (filter === 'todos' || item.getAttribute('data-cat') === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/* ---- Lightbox Unificado (Catálogo y Galería) ---- */
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxDesc = document.getElementById('lightbox-desc');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxWaBtn = document.getElementById('lightbox-wa-btn');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

// Textos descriptivos por categoría (para no tener que agregar descriptiones a las 82 imágenes una por una)
const categoryDesc = {
  'capilares': '✨ Limpieza, nutrición profunda y protección para tu cabello. Dile adiós al frizz y hola a la sedosidad.',
  'mascaras': '💧 Tratamiento intensivo de reparación celular que resucita hasta el cabello más maltratado.',
  'kits': '🎁 La rutina perfecta. Consigue resultados mágicos usando la línea completa diseñada especialmente para ti.',
  'faciales': '🌸 Ritual perfecto para consentir tu piel: hidratación, suavidad y una luminosidad inigualable.',
  'varios': '💎 Uno de los favoritos de nuestra comunidad. Ideal para complementar tu rutina diaria de belleza.',
  'default': '✨ Descubre la magia de este producto. ¡Escríbenos y nuestras asesoras te contarán cómo usarlo!'
};

// Combinamos las imágenes de galería y catálogo para el lightbox
const allImages = [...document.querySelectorAll('.galeria-item img'), ...document.querySelectorAll('.cat-item img')];
let currentImgIndex = 0;

function openLightbox(index) {
  currentImgIndex = index;
  const imgElement = allImages[currentImgIndex];
  lightboxImg.src = imgElement.src;
  
  // Si es un producto del catálogo, configuramos el botón de WhatsApp y la descripción
  const esCatalogo = imgElement.closest('.cat-item');
  if (esCatalogo) {
    lightboxWaBtn.style.display = 'inline-flex';
    lightboxDesc.style.display = 'block';
    
    // Tratamos de buscar la descripción específica usando data-desc, o usamos el fallback de su categoría
    const customDesc = esCatalogo.getAttribute('data-desc');
    const cat = esCatalogo.getAttribute('data-cat');
    
    lightboxDesc.textContent = customDesc ? customDesc : (categoryDesc[cat] || categoryDesc['default']);
    
    // Mensaje genérico, idealmente podríamos tener nombres dinámicos
    lightboxWaBtn.href = `https://wa.me/573001234567?text=Hola!%20Me%20interesa%20este%20producto:%20${encodeURIComponent(imgElement.src)}%20%F0%9F%8C%B8`;
  } else {
    lightboxWaBtn.style.display = 'none'; // ocultar en la galería simple
    lightboxDesc.style.display = 'none';
  }

  lightboxOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function showNextImg() {
  currentImgIndex = (currentImgIndex + 1) % allImages.length;
  openLightbox(currentImgIndex);
}

function showPrevImg() {
  currentImgIndex = (currentImgIndex - 1 + allImages.length) % allImages.length;
  openLightbox(currentImgIndex);
}

// Asignar eventos de click a cada imagen
allImages.forEach((img, index) => {
  // el contenedor principal es diferente (galeria-item o cat-item)
  const container = img.closest('.galeria-item, .cat-item');
  container.addEventListener('click', () => {
    openLightbox(index);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', (e) => {
  if (e.target === lightboxOverlay) closeLightbox();
});
lightboxNext.addEventListener('click', showNextImg);
lightboxPrev.addEventListener('click', showPrevImg);

// Navegación con teclado
document.addEventListener('keydown', (e) => {
  if (!lightboxOverlay.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNextImg();
  if (e.key === 'ArrowLeft') showPrevImg();
});

console.log('%c✨ Cabellos Mágicos', 'color:#FF6B9D;font-size:1.4rem;font-weight:bold;');
console.log('%cBienvenida a la magia 🌸', 'color:#C2185B;font-size:1rem;');
