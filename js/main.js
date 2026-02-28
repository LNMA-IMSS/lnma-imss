/* ============================================================
   LNMA-IMSS — Main JavaScript Engine
   Auto-discovery carousel | i18n | Scroll Animations
   ============================================================ */

(function () {
  'use strict';

  // ----------------------------------------------------------
  // State
  // ----------------------------------------------------------
  let currentLang = localStorage.getItem('lnma-lang') || 'es';
  let siteConfig, carouselData, equipmentData, contentData, policiesData;
  let carouselIndex = 0;
  let carouselTimer = null;
  let loadedSlides = []; // filled by auto-discovery

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const t = (obj) => (obj && typeof obj === 'object') ? (obj[currentLang] || obj['es'] || '') : (obj || '');

  // ----------------------------------------------------------
  // Init
  // ----------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    try {
      siteConfig    = SITE_CONFIG;
      carouselData  = CAROUSEL_DATA;
      equipmentData = EQUIPMENT_DATA;
      contentData   = CONTENT_DATA;
      policiesData  = POLICIES_DATA;

      document.title = t(siteConfig.site.title);
      renderHeader();
      renderNav();
      renderAbout();
      renderEquipment();
      renderPolicies();
      renderContact();
      renderFooter();
      initScrollReveal();
      initSmoothScroll();
      updateLangUI();

      // Auto-discover carousel images, then render
      discoverCarouselSlides().then(() => {
        renderCarousel();
      });
    } catch (err) {
      console.error('LNMA Init Error:', err);
    }
  });

  // ----------------------------------------------------------
  // Language
  // ----------------------------------------------------------
  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('lnma-lang', lang);
    document.documentElement.lang = lang;
    document.title = t(siteConfig.site.title);
    renderNav();
    renderAbout();
    renderEquipment();
    renderPolicies();
    renderContact();
    renderFooter();
    updateLangUI();
    initScrollReveal();

    // Re-render carousel captions only (slides already loaded)
    if (loadedSlides.length) updateCarouselCaption(carouselIndex);

    const overlay = $('.modal-overlay');
    if (overlay) overlay.classList.remove('open');
  }

  function updateLangUI() {
    $$('.lang-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
  }

  window.setLang = setLang;

  // ----------------------------------------------------------
  // Header
  // ----------------------------------------------------------
  function renderHeader() {
    const hdr = $('#site-header');
    const cfg = siteConfig.header;
    hdr.innerHTML = `
      <div class="header-inner">
        <div class="header-left">
          <a href="${cfg.leftLink}" target="_blank" rel="noopener" aria-label="${cfg.leftAlt}">
            <img src="${cfg.leftImage}" alt="${cfg.leftAlt}">
          </a>
        </div>
        <div class="header-right">
          <img src="${cfg.rightImage}" alt="${cfg.rightAlt}">
        </div>
      </div>
    `;
  }

  // ----------------------------------------------------------
  // Navigation — push-down mobile menu (not overlay)
  // ----------------------------------------------------------
  function renderNav() {
    const nav = $('#site-nav');
    const items = siteConfig.nav;
    nav.innerHTML = `
      <div class="nav-inner">
        <button class="nav-burger" aria-label="Menu" onclick="toggleMobileMenu()">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links" id="nav-links">
          ${items.map(item => `
            <li><a href="#${item.id}" data-section="${item.id}">${t(item)}</a></li>
          `).join('')}
        </ul>
        <div class="lang-toggle">
          <button data-lang="es" onclick="setLang('es')">ES</button>
          <button data-lang="en" onclick="setLang('en')">EN</button>
        </div>
      </div>
    `;
    initActiveNav();
  }

  window.toggleMobileMenu = function () {
    const burger = $('.nav-burger');
    const links = $('#nav-links');
    burger.classList.toggle('open');
    links.classList.toggle('open');
  };

  function initActiveNav() {
    const sections = $$('.section[id]');
    const navLinks = $$('.nav-links a');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(link => {
              link.classList.toggle('active', link.dataset.section === entry.target.id);
            });
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach(s => observer.observe(s));
  }

  function initSmoothScroll() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      e.preventDefault();
      const target = $(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        const burger = $('.nav-burger');
        const links = $('#nav-links');
        if (burger) burger.classList.remove('open');
        if (links) links.classList.remove('open');
      }
    });
  }

  // ----------------------------------------------------------
  // Carousel — AUTO-DISCOVERY
  //
  // Naming convention:
  //   assets/images/carousel/slide-01.jpg  (or .png .gif .mp4 .webm)
  //   assets/images/carousel/slide-02.png
  //   ... up to slide-10
  //
  // The engine probes each filename. Only slides with loadable
  // images are shown. Caption data is pulled from carousel.js
  // by matching the slide ID (slide-01 → id:"slide-01").
  //
  // Accepted formats: .jpg .png .gif .mp4 .webm
  // Max 10 slides.
  // ----------------------------------------------------------

  const CAROUSEL_DIR = 'assets/images/carousel/';
  const EXTENSIONS = ['jpg', 'png', 'gif', 'mp4', 'webm'];
  const MAX_SLIDES = 10;

  const VIDEO_EXTS = /\.(mp4|webm|ogg)$/i;
  const GIF_EXTS   = /\.(gif|apng)$/i;
  const DEFAULT_GIF_INTERVAL = 12000;

  function getSlideType(src) {
    if (VIDEO_EXTS.test(src)) return 'video';
    if (GIF_EXTS.test(src))   return 'gif';
    return 'image';
  }

  /** Probe if a file exists by trying to load it */
  function probeFile(url) {
    return new Promise((resolve) => {
      const type = getSlideType(url);
      if (type === 'video') {
        const v = document.createElement('video');
        v.preload = 'metadata';
        v.onloadedmetadata = () => resolve(url);
        v.onerror = () => resolve(null);
        v.src = url;
      } else {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve(null);
        img.src = url;
      }
    });
  }

  /** Try all extensions for a slot (e.g. slide-01) and return first hit */
  async function probeSlot(num) {
    const nn = String(num).padStart(2, '0');
    for (const ext of EXTENSIONS) {
      const url = `${CAROUSEL_DIR}slide-${nn}.${ext}`;
      const result = await probeFile(url);
      if (result) return { id: `slide-${nn}`, image: result };
    }
    return null;
  }

  /** Discover all available slides */
  async function discoverCarouselSlides() {
    loadedSlides = [];

    // Also check if carousel.js has explicit entries with non-placeholder images
    const explicitSlides = (carouselData.slides || []).filter(s => {
      return s.image && !s.image.includes('placeholder');
    });

    if (explicitSlides.length > 0) {
      // Use carousel.js entries directly (CMS-managed mode)
      loadedSlides = explicitSlides;
      return;
    }

    // Auto-discover mode: probe slide-01 through slide-10
    const probes = [];
    for (let i = 1; i <= MAX_SLIDES; i++) {
      probes.push(probeSlot(i));
    }
    const results = await Promise.all(probes);

    results.forEach(result => {
      if (result) loadedSlides.push(result);
    });

    // Merge caption data from carousel.js by matching IDs
    loadedSlides.forEach(slide => {
      const dataEntry = (carouselData.slides || []).find(s => s.id === slide.id);
      if (dataEntry) {
        slide.captionLeft  = dataEntry.captionLeft;
        slide.captionRight = dataEntry.captionRight;
        slide.description  = dataEntry.description;
        slide.title        = dataEntry.title;
        slide.thumbnail    = dataEntry.thumbnail;
        slide.poster       = dataEntry.poster;
        slide.loops        = dataEntry.loops;
        slide.duration     = dataEntry.duration;
      }
    });
  }

  function renderCarousel() {
    const section = $('#carousel-section');

    if (loadedSlides.length === 0) {
      section.innerHTML = '<div class="carousel-viewport carousel-empty"></div>';
      return;
    }

    const slidesHTML = loadedSlides.map((slide, i) => {
      const type = getSlideType(slide.image);
      // Calculate this slide's display duration for the pan animation
      const defaultMs = type === 'gif' ? DEFAULT_GIF_INTERVAL : (carouselData.autoplayInterval || 5000);
      const slideMs = (slide.duration) || defaultMs;
      let media;
      if (type === 'video') {
        media = `<video class="carousel-media" data-slide-index="${i}" src="${slide.image}" ${slide.poster ? `poster="${slide.poster}"` : ''} muted loop playsinline preload="metadata"></video>`;
      } else {
        media = `<img class="carousel-media" src="${slide.image}" alt="">`;
      }
      return `<div class="carousel-slide ${i === 0 ? 'active' : ''}" data-index="${i}" data-type="${type}" style="--slide-duration: ${slideMs}ms">${media}</div>`;
    }).join('');

    const dotsHTML = loadedSlides.map((_, i) =>
      `<button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Slide ${i + 1}"></button>`
    ).join('');

    section.innerHTML = `
      <div class="carousel-viewport" id="carousel-viewport">
        ${slidesHTML}
        <div class="carousel-caption-overlay" id="carousel-captions"></div>
        <div class="carousel-dots-bar">
          <div class="carousel-dots" id="carousel-dots">${dotsHTML}</div>
        </div>
      </div>
    `;

    carouselIndex = 0;
    updateCarouselCaption(0);
    startSlideTimer(0);

    $$('.carousel-dot').forEach(dot => {
      dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index)));
    });

    $$('video.carousel-media').forEach(video => {
      let playCount = 0;
      video.addEventListener('timeupdate', () => {
        if (video.currentTime < 0.3 && playCount > 0) {
          const slideData = loadedSlides[parseInt(video.dataset.slideIndex)];
          const maxLoops = (slideData && slideData.loops) || 1;
          if (playCount >= maxLoops) { playCount = 0; goToSlide(carouselIndex + 1); }
        }
        if (video.currentTime > 0.5) playCount = Math.max(playCount, 1);
      });
    });

    activateSlideMedia(0);
  }

  function activateSlideMedia(index) {
    const slideEl = $$(`.carousel-slide[data-index="${index}"]`)[0];
    if (!slideEl) return;
    const video = $('video', slideEl);
    if (video) { video.currentTime = 0; video.play().catch(() => {}); }
  }

  function deactivateSlideMedia(index) {
    const slideEl = $$(`.carousel-slide[data-index="${index}"]`)[0];
    if (!slideEl) return;
    const video = $('video', slideEl);
    if (video) { video.pause(); video.currentTime = 0; }
  }

  function goToSlide(index) {
    const slides = $$('.carousel-slide');
    const dots = $$('.carousel-dot');
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    const prevIndex = carouselIndex;
    if (prevIndex === index) return;

    slides.forEach((s, i) => {
      s.classList.remove('active', 'fade-out');
      if (i === prevIndex) s.classList.add('fade-out');
    });
    dots.forEach(d => d.classList.remove('active'));

    // Force reflow so the pan animation restarts cleanly
    void slides[index].offsetWidth;

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    carouselIndex = index;

    setTimeout(() => { slides[prevIndex].classList.remove('fade-out'); }, 1300);

    deactivateSlideMedia(prevIndex);
    activateSlideMedia(index);
    updateCarouselCaption(index);

    clearTimeout(carouselTimer);
    carouselTimer = null;
    startSlideTimer(index);
  }

  function updateCarouselCaption(index) {
    const slide = loadedSlides[index];
    const overlay = $('#carousel-captions');
    if (!slide || !overlay) return;

    const captionLeft = t(slide.captionLeft) || t(slide.description) || '';
    const captionRight = t(slide.captionRight) || '';

    overlay.innerHTML = `
      <div class="carousel-caption-row">
        <div class="carousel-caption-thumb"></div>
        <div class="carousel-caption-cols">
          <p>${captionLeft}</p>
          <p>${captionRight}</p>
        </div>
      </div>
    `;
  }

  function startSlideTimer(index) {
    const slide = loadedSlides[index];
    if (!slide) return;
    const type = getSlideType(slide.image);
    if (type === 'video') return;

    const defaultMs = type === 'gif'
      ? DEFAULT_GIF_INTERVAL
      : (carouselData.autoplayInterval || 5000);
    const ms = (slide.duration) || defaultMs;

    carouselTimer = setTimeout(() => {
      goToSlide(carouselIndex + 1);
    }, ms);
  }

  window.carouselNext = () => goToSlide(carouselIndex + 1);
  window.carouselPrev = () => goToSlide(carouselIndex - 1);

  // ----------------------------------------------------------
  // About / Nosotros
  // ----------------------------------------------------------
  function renderAbout() {
    const section = $('#nosotros');
    const d = contentData;

    const introText = t(d.intro);
    const introSentences = introText.split(/(?<=\.)\s+/);
    const mid = Math.ceil(introSentences.length / 2);
    const introLeft = introSentences.slice(0, mid).join(' ');
    const introRight = introSentences.slice(mid).join(' ');

    const staffHTML = d.staff.map(person => {
      const linksHTML = person.links.map(l =>
        `<a href="${l.url || '#'}" target="${l.url && l.url !== '#' ? '_blank' : '_self'}" rel="noopener">${l.label}</a>`
      ).join('');

      return `
        <div class="staff-member reveal">
          <div class="staff-member-top">
            <div class="staff-photo">
              <img src="${person.photo}" alt="${person.name}" onerror="this.style.display='none'">
            </div>
            <div class="staff-name-links">
              <h4>${person.name}</h4>
              <div class="staff-links">${linksHTML}</div>
            </div>
          </div>
          <div class="staff-bio">
            <p>${t(person.bio)}</p>
            <p>${t(person.interests)}</p>
          </div>
        </div>
      `;
    }).join('');

    section.innerHTML = `
      <div class="container">
        <h2 class="section-title reveal">${t(d.sectionTitle)}</h2>
        <div class="about-two-col reveal">
          <p>${introLeft}</p>
          <p>${introRight}</p>
        </div>
        <div class="mv-grid reveal">
          <div>
            <h3>${t(d.mission.title)}</h3>
            <p>${t(d.mission.text)}</p>
          </div>
          <div>
            <h3>${t(d.vision.title)}</h3>
            <p>${t(d.vision.text)}</p>
          </div>
        </div>
        <h3 class="staff-section-title reveal">${t(d.staffTitle)}</h3>
        <div class="staff-grid">
          ${staffHTML}
        </div>
      </div>
    `;
  }

  // ----------------------------------------------------------
  // Equipment
  // ----------------------------------------------------------
  function renderEquipment() {
    const section = $('#equipo');
    const d = equipmentData;
    const catOrder = ['microscopy', 'histology', 'other'];
    const allItems = catOrder.flatMap(cat => d.items.filter(i => i.category === cat));

    const itemsHTML = allItems.map(item => `
      <div class="equipment-item reveal" onclick="openEquipmentModal('${item.id}')">
        <div class="equipment-item-image">
          <img src="${item.image}" alt="${t(item.name)}" onerror="this.style.display='none'">
        </div>
        <div class="equipment-item-name">${t(item.name)}</div>
      </div>
    `).join('');

    section.innerHTML = `
      <div class="container">
        <div class="equipment-grid">
          ${itemsHTML}
        </div>
      </div>
      <div class="modal-overlay" id="equipment-modal" onclick="closeEquipmentModal(event)"></div>
    `;
  }

  window.openEquipmentModal = function (id) {
    const item = equipmentData.items.find(i => i.id === id);
    if (!item) return;
    const overlay = $('#equipment-modal');

    // Popup shows the equipment photo (popupImage), grid shows sample images (image)
    const modalImg = item.popupImage || item.image;

    const specs = t(item.specs);
    const specsHTML = Array.isArray(specs) && specs.length > 0
      ? `<div class="modal-specs"><h4>${currentLang === 'es' ? 'Especificaciones' : 'Specifications'}</h4><ul>${specs.map(s => `<li>${s}</li>`).join('')}</ul></div>`
      : '';

    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <img src="${modalImg}" alt="${t(item.name)}" onerror="this.style.display='none'">
          <button class="modal-close" onclick="closeEquipmentModal()" aria-label="Close">✕</button>
        </div>
        <div class="modal-body">
          <h3>${t(item.name)}</h3>
          <p class="description">${t(item.fullDescription) || t(item.shortDescription)}</p>
          ${specsHTML}
        </div>
      </div>
    `;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeEquipmentModal = function (event) {
    if (event && event.target !== event.currentTarget) return;
    const overlay = $('#equipment-modal');
    if (overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeEquipmentModal();
  });

  // ----------------------------------------------------------
  // Policies / Políticas de reconocimiento
  // ----------------------------------------------------------
  function renderPolicies() {
    const section = $('#politicas');
    const d = policiesData;

    const downloadLabel = currentLang === 'es' ? 'Descargar documento' : 'Download document';

    section.innerHTML = `
      <div class="container">
        <h2 class="section-title reveal">${t(d.sectionTitle)}</h2>

        <div class="policies-intro reveal">
          <p>${t(d.intro)}</p>
        </div>

        <div class="policies-document reveal">
          <h3>${t(d.guidelinesCaption)}</h3>
          <div class="pdf-embed-wrapper">
            <iframe
              src="${d.guidelinesDocument}"
              class="pdf-embed"
              title="${t(d.guidelinesCaption)}"
              loading="lazy">
            </iframe>
          </div>
          <a href="${d.guidelinesDocument}" target="_blank" rel="noopener" class="pdf-download-link">${downloadLabel} (PDF)</a>
        </div>

        <div class="policies-notices reveal">
          <p>${t(d.collaboration)}</p>
          <p>${t(d.futureCharges)}</p>
        </div>

        <div class="policies-registry reveal">
          <p>${t(d.registry)}</p>
        </div>
      </div>
    `;
  }

  // ----------------------------------------------------------
  // Contact — full-width map, coordinate-only (no info card)
  // ----------------------------------------------------------
  function renderContact() {
    const section = $('#contacto');
    const c = siteConfig.contact;
    const labTitle = currentLang === 'es'
      ? 'Laboratorio Nacional de Microscopía Avanzada-IMSS'
      : 'National Laboratory of Advanced Microscopy-IMSS';

    section.innerHTML = `
      <div class="contact-map-wrapper">
        <iframe
          class="contact-map"
          src="${c.mapEmbed}"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="LNMA-IMSS">
        </iframe>
      </div>
      <div class="container">
        <div class="contact-lab-title reveal">${labTitle}</div>
        <div class="contact-two-col reveal">
          <div><p>${t(c.address)}</p></div>
          <div><p>${t(c.hours)}<br>Tel: ${c.phone}<br>email: <a href="mailto:${c.email}">${c.email}</a></p></div>
        </div>
      </div>
    `;
  }

  // ----------------------------------------------------------
  // Footer
  // ----------------------------------------------------------
  function renderFooter() {
    const footer = $('#site-footer');
    const cfg = siteConfig.footer;

    const logosHTML = cfg.logos.map(logo => {
      const isInternal = logo.link.startsWith('#');
      const target = isInternal ? '' : ' target="_blank" rel="noopener"';
      return `<a href="${logo.link}"${target} aria-label="${logo.alt}"><img src="${logo.image}" alt="${logo.alt}"></a>`;
    }).join('');

    footer.innerHTML = `
      <div class="footer-inner">
        <div class="footer-logos">${logosHTML}</div>
        <div class="footer-left"><img src="${cfg.leftImage}" alt="${cfg.leftAlt}"></div>
      </div>
    `;
  }

  // ----------------------------------------------------------
  // Scroll Reveal
  // ----------------------------------------------------------
  function initScrollReveal() {
    const revealElements = $$('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    revealElements.forEach(el => { el.classList.remove('revealed'); observer.observe(el); });
  }

})();
