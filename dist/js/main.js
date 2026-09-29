/**
 * Acceso Digital Premium - Lógica Interactiva Principal
 * Arquitectura de Conversión, Filtrado PSR, Embudo Progresivo y Modales Legales
 */

// Utilidad universal para registrar eventos con Google Analytics 4 y @vercel/analytics
function logEvent(name, data) {
  try {
    if (typeof window !== 'undefined' && typeof window.logEvent === 'function') {
      window.logEvent(name, data);
    } else {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', name, data || {});
      }
      if (typeof window !== 'undefined' && typeof window.va === 'function') {
        window.va('event', { name, data });
      }
      console.log(`[Analytics Track] ${name}:`, data || {});
    }
  } catch (err) {
    console.warn('[Analytics Error]', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Inicializaciones
  initHeroReveal();
  initNavigation();
  initProjectsGallery();
  initPsrModal();
  initFunnelForm();
  initWhatsAppWidget();
  initLegalModals();
});

/* ==========================================================================
   0. HERO REVEAL - ORQUESTACIÓN DE ENTRADA Y PERSISTENCIA POR SESIÓN
   ========================================================================== */
function initHeroReveal() {
  const isAnimated = sessionStorage.getItem('adp_hero_animated');
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Si ya se reprodujo en esta sesión o el usuario prefiere movimiento reducido, desactivar inmediatamente
  if (isAnimated || prefersReduced) {
    document.documentElement.classList.remove('hero-reveal-active');
    return;
  }

  // Registrar en sessionStorage para evitar repetir la animación en la misma sesión de navegación
  sessionStorage.setItem('adp_hero_animated', 'true');

  // Limpiar la clase de orquestación al finalizar la secuencia (1.2s)
  // para liberar capas de composición en GPU y permitir estados nativos de hover/scroll
  setTimeout(() => {
    document.documentElement.classList.remove('hero-reveal-active');
  }, 1200);
}

/* ==========================================================================
   1. NAVEGACIÓN Y CABECERA FLOTANTE
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navDrawer = document.querySelector('.nav-mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileLinks = document.querySelectorAll('.nav-mobile-links a');

  // Efecto de scroll en cabecera
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Toggle menú móvil
  function toggleMobileMenu() {
    menuToggle.classList.toggle('open');
    navDrawer.classList.toggle('open');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navDrawer.classList.contains('open') ? 'hidden' : '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', toggleMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navDrawer.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  // Registro de analíticas: Clics en CTAs principales del Hero
  const heroCtas = document.querySelectorAll('.hero-actions a, .hero-actions .btn');
  heroCtas.forEach(cta => {
    cta.addEventListener('click', () => {
      logEvent('click_cta_hero');
    });
  });
}

/* ==========================================================================
   2. GALERÍA DE PROYECTOS Y FILTROS INTERACTIVOS
   ========================================================================== */
function initProjectsGallery() {
  const gridContainer = document.querySelector('#projectsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!gridContainer) return;

  const existingCards = gridContainer.querySelectorAll('.project-card');

  // Filtrado instantáneo por CSS display sin recargar ni destruir el DOM
  function filterProjects(category = 'all') {
    existingCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Filtrado al hacer clic en chips de categoría
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      filterProjects(category);
    });
  });

  // Asignar eventos a los botones de Caso PSR y vistas previas
  attachPsrModalTriggers();
}

/* ==========================================================================
   3. MODAL DE CASOS DE ESTUDIO (FRAMEWORK PSR)
   ========================================================================== */
function initPsrModal() {
  const modal = document.querySelector('#psrModal');
  const closeBtn = document.querySelector('#closePsrModal');

  if (!modal) return;

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

function attachPsrModalTriggers() {
  const modal = document.querySelector('#psrModal');
  const contentContainer = document.querySelector('#psrModalContent');

  if (!modal || !contentContainer) return;

  function openProjectModal(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return;

    const techBadges = project.techStack
      .map(tech => `<span class="tech-tag">${tech}</span>`)
      .join('');

    contentContainer.innerHTML = `
      <div class="psr-modal-header">
        <span class="psr-badge">${project.categoryLabel}</span>
        <h2 class="psr-modal-title">${project.title}</h2>
        <p class="psr-modal-subtitle">${project.subtitle}</p>
      </div>

      <!-- PROBLEMA -->
      <div class="psr-section-block">
        <div class="psr-section-heading">
          <span class="psr-icon-tag tag-problem">P</span>
          Diagnóstico Inicial & Ineficiencias Comerciales
        </div>
        <p class="psr-text">${project.psr.problem}</p>
      </div>

      <!-- SOLUCIÓN -->
      <div class="psr-section-block">
        <div class="psr-section-heading">
          <span class="psr-icon-tag tag-solution">S</span>
          Arquitectura Técnica & Estrategia de Conversión Desplegada
        </div>
        <p class="psr-text">${project.psr.solution}</p>
        <div class="project-tech-tags" style="margin-top: 1rem;">
          ${techBadges}
        </div>
      </div>

      <!-- RESULTADOS -->
      <div class="psr-section-block">
        <div class="psr-section-heading">
          <span class="psr-icon-tag tag-results">R</span>
          Rendimiento Cuantificable & Retorno de Inversión
        </div>
        <div class="psr-results-grid">
          <div class="psr-result-box">
            <h5>Impacto Comercial / Financiero</h5>
            <p>${project.psr.results.financial}</p>
          </div>
          <div class="psr-result-box">
            <h5>Eficiencia Operativa</h5>
            <p>${project.psr.results.operational}</p>
          </div>
          <div class="psr-result-box">
            <h5>Rendimiento UX / Core Web Vitals</h5>
            <p>${project.psr.results.ux}</p>
          </div>
        </div>
      </div>

      <div class="psr-modal-footer">
        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-gold btn-sm">
          Explorar Proyecto en Producción ↗
        </a>
        <button class="btn btn-cyan-outline btn-sm" onclick="document.querySelector('#psrModal').classList.remove('open'); document.body.style.overflow = ''; document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });">
          Solicitar Auditoría Similar
        </button>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  document.querySelectorAll('.project-card').forEach(card => {
    const btn = card.querySelector('.btn-case-psr');
    const media = card.querySelector('.project-media-wrap');
    const projectId = btn ? btn.getAttribute('data-project-id') : null;

    if (btn && projectId) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openProjectModal(projectId);
      });
    }

    if (media && projectId) {
      media.style.cursor = 'pointer';
      media.setAttribute('title', 'Tocar para ver Caso PSR');
      media.addEventListener('click', () => {
        openProjectModal(projectId);
      });
    }
  });
}

/* ==========================================================================
   4. EMBUDO DE CONVERSIÓN PROGRESIVA (3 ETAPAS)
   ========================================================================== */
function initFunnelForm() {
  const form = document.querySelector('#qualificationForm');
  if (!form) return;

  const step1 = document.querySelector('#step1');
  const step2 = document.querySelector('#step2');
  const step3 = document.querySelector('#step3');
  const successBox = document.querySelector('#formSuccessBox');

  const indicator1 = document.querySelector('#stepIndicator1');
  const indicator2 = document.querySelector('#stepIndicator2');
  const indicator3 = document.querySelector('#stepIndicator3');

  const btnNext1 = document.querySelector('#btnNext1');
  const btnNext2 = document.querySelector('#btnNext2');
  const btnBack2 = document.querySelector('#btnBack2');
  const btnBack3 = document.querySelector('#btnBack3');

  // Paso 1 -> Paso 2
  btnNext1.addEventListener('click', () => {
    const name = document.querySelector('#leadName').value.trim();
    const email = document.querySelector('#leadEmail').value.trim();
    const company = document.querySelector('#leadCompany').value.trim();

    if (!name || !email || !company) {
      alert('Por favor complete los campos obligatorios para continuar.');
      return;
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor introduzca una dirección de correo válida.');
      return;
    }

    // Registro de analíticas: Paso 1 completado
    logEvent('form_paso_1');

    step1.classList.remove('active');
    step2.classList.add('active');

    indicator1.classList.add('completed');
    indicator1.classList.remove('active');
    indicator2.classList.add('active');
  });

  // Paso 2 -> Paso 1
  btnBack2.addEventListener('click', () => {
    step2.classList.remove('active');
    step1.classList.add('active');

    indicator2.classList.remove('active');
    indicator1.classList.remove('completed');
    indicator1.classList.add('active');
  });

  // Paso 2 -> Paso 3
  btnNext2.addEventListener('click', () => {
    const projectType = document.querySelector('#leadProjectType').value;

    if (!projectType) {
      alert('Por favor seleccione una opción en el tipo de solución requerida (puede elegir la opción de asesoría si no está seguro).');
      return;
    }

    // Obtener presupuesto o tiempo estimado seleccionado para analíticas
    const budgetInput = document.querySelector('#leadBudget');
    const timelineSelect = document.querySelector('#leadTimeline');
    const selectedBudget = budgetInput ? budgetInput.value : (timelineSelect ? timelineSelect.value : 'No especificado');

    // Registro de analíticas: Paso 2 completado con presupuesto/alcance
    logEvent('form_paso_2', { presupuesto: selectedBudget });

    step2.classList.remove('active');
    step3.classList.add('active');

    indicator2.classList.add('completed');
    indicator2.classList.remove('active');
    indicator3.classList.add('active');
  });

  // Paso 3 -> Paso 2
  btnBack3.addEventListener('click', () => {
    step3.classList.remove('active');
    step2.classList.add('active');

    indicator3.classList.remove('active');
    indicator2.classList.remove('completed');
    indicator2.classList.add('active');
  });

  // Envío Final - Automatización hacia WhatsApp (6624175122)
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#leadName').value.trim();
    const email = document.querySelector('#leadEmail').value.trim();
    const company = document.querySelector('#leadCompany').value.trim();
    const url = document.querySelector('#leadUrl').value.trim();

    const projectTypeSelect = document.querySelector('#leadProjectType');
    const projectTypeText = projectTypeSelect && projectTypeSelect.selectedIndex >= 0
      ? projectTypeSelect.options[projectTypeSelect.selectedIndex].text
      : 'No especificado';

    const timelineSelect = document.querySelector('#leadTimeline');
    const timelineText = timelineSelect && timelineSelect.selectedIndex >= 0
      ? timelineSelect.options[timelineSelect.selectedIndex].text
      : 'No especificado';

    const challenge = document.querySelector('#leadChallenge').value.trim();
    if (!challenge) {
      alert('Por favor descríbanos brevemente el reto o barrera de su proyecto.');
      return;
    }

    // Registro de analíticas: Lead generado con tipo de servicio
    const selectedService = projectTypeText;
    logEvent('lead_generado', { servicio: selectedService });

    // Construcción del mensaje estructurado para WhatsApp
    const waText = 
      `*🚀 NUEVA SOLICITUD DE DIAGNÓSTICO WEB*%0A` +
      `*Acceso Digital Premium*%0A%0A` +
      `👤 *Nombre:* ${encodeURIComponent(name)}%0A` +
      `📧 *Correo Corporativo:* ${encodeURIComponent(email)}%0A` +
      `🏢 *Empresa / Negocio:* ${encodeURIComponent(company)}%0A` +
      `🌐 *Sitio Web Actual:* ${encodeURIComponent(url || 'Ninguno / Proyecto desde cero')}%0A` +
      `🎯 *Tipo de Solución:* ${encodeURIComponent(projectTypeText)}%0A` +
      `⏱️ *Tiempo Estimado:* ${encodeURIComponent(timelineText)}%0A` +
      `📝 *Reto o Necesidad a Resolver:*%0A${encodeURIComponent(challenge)}`;

    const whatsappUrl = `https://wa.me/526624175122?text=${waText}`;

    // Disparar automáticamente apertura a WhatsApp
    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Bloqueo de ventana emergente:', err);
    }

    // Ocultar etapas y mostrar confirmación inmediata
    step3.classList.remove('active');
    document.querySelector('.form-step-indicators').style.display = 'none';
    successBox.style.display = 'block';

    const clientName = document.querySelector('#leadName').value.trim();
    document.querySelector('#successClientName').textContent = clientName;

    const successWaBtn = document.querySelector('#formSuccessWaBtn');
    if (successWaBtn) {
      successWaBtn.href = whatsappUrl;
      successWaBtn.addEventListener('click', () => {
        logEvent('click_whatsapp');
      });
    }

    // Scroll suave al contenedor de éxito
    document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ==========================================================================
   5. WIDGET FLOTANTE DE WHATSAPP BUSINESS
   ========================================================================== */
function initWhatsAppWidget() {
  const trigger = document.querySelector('#waTrigger');
  const popover = document.querySelector('#waPopover');
  const closePopover = document.querySelector('#waClose');
  const floatingLabel = document.querySelector('#waFloatingLabel');
  const sendBtn = document.querySelector('.btn-whatsapp-send');

  if (!trigger || !popover) return;

  function togglePopover(e) {
    if (e) e.stopPropagation();
    const willOpen = !popover.classList.contains('open');
    popover.classList.toggle('open');
    if (willOpen) {
      logEvent('whatsapp_abrir_popup');
    }
  }

  trigger.addEventListener('click', togglePopover);

  if (floatingLabel) {
    floatingLabel.addEventListener('click', togglePopover);
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      logEvent('click_whatsapp');
    });
  }

  if (closePopover) {
    closePopover.addEventListener('click', (e) => {
      e.stopPropagation();
      popover.classList.remove('open');
    });
  }

  document.addEventListener('click', (e) => {
    if (!popover.contains(e.target) && !trigger.contains(e.target) && (!floatingLabel || !floatingLabel.contains(e.target))) {
      popover.classList.remove('open');
    }
  });
}

/* ==========================================================================
   6. MARCO JURÍDICO Y MODALES LEGALES
   ========================================================================== */
function initLegalModals() {
  const legalModal = document.querySelector('#legalModal');
  const modalTitle = document.querySelector('#legalModalTitle');
  const modalBody = document.querySelector('#legalModalBody');
  const closeBtn = document.querySelector('#closeLegalModal');

  const triggers = document.querySelectorAll('[data-legal-modal]');

  if (!legalModal || !modalTitle || !modalBody) return;

  const legalTexts = {
    privacy: {
      title: "Política de Privacidad y Tratamiento de Datos",
      content: `
        <div class="legal-modal-content">
          <p><strong>Última actualización: Septiembre 2026</strong></p>
          <p>En cumplimiento con las normativas internacionales y regionales de protección de datos personales en posesión de particulares, <strong>Acceso Digital Premium</strong> establece los lineamientos aplicables al tratamiento y resguardo de la información recabada a través de este portal profesional.</p>
          
          <h3>1. Información Recopilada</h3>
          <p>Recabamos exclusivamente datos de contacto empresarial (nombre, cargo, correo corporativo, denominación societaria y URL de plataformas digitales vigentes) mediante nuestros formularios de cualificación técnica y canales de mensajería cifrada.</p>

          <h3>2. Finalidad del Tratamiento</h3>
          <p>La información recopilada se destina de forma estricta a:</p>
          <ul>
            <li>La elaboración y entrega del diagnóstico preliminar de arquitectura web solicitado.</li>
            <li>La coordinación de sesiones estratégicas y presentación de propuestas comerciales personalizadas.</li>
            <li>El cumplimiento de obligaciones precontractuales y contractuales de desarrollo de software.</li>
          </ul>

          <h3>3. Confidencialidad y No Transferencia</h3>
          <p>Acceso Digital Premium no comercializa, transfiere ni cede bajo ningún concepto bases de datos corporativas a terceras empresas con fines comerciales o publicitarios. Los datos permanecen almacenados en infraestructuras seguras bajo estándares de cifrado TLS/SSL.</p>

          <h3>4. Ejercicio de Derechos ARCO</h3>
          <p>El titular de los datos podrá solicitar en cualquier momento el acceso, rectificación, cancelación u oposición de sus registros enviando una notificación formal a nuestro canal oficial de operaciones.</p>
        </div>
      `
    },
    terms: {
      title: "Términos y Condiciones de Uso del Sitio Web",
      content: `
        <div class="legal-modal-content">
          <p><strong>Última actualización: Septiembre 2026</strong></p>
          <p>El acceso y navegación en el presente portafolio profesional de <strong>Acceso Digital Premium</strong> implica la aceptación irrestricta de las siguientes condiciones de uso:</p>

          <h3>1. Propiedad Intelectual del Código y Contenidos</h3>
          <p>Todos los textos, arquitecturas de software, soluciones de diseño UI/UX, animaciones, componentes gráficos y marcas propias de Acceso Digital Premium se encuentran debidamente protegidos por las leyes de propiedad intelectual vigentes. Queda expresamente prohibida su copia, modificación o distribución no autorizada.</p>

          <h3>2. Prohibición de Extracción Automatizada (Anti-Scraping)</h3>
          <p>Se prohíbe terminantemente el uso de robots, arañas web (spiders), scripts automatizados o técnicas de web scraping orientadas a la recolección masiva de contenidos, código o datos de este portal.</p>

          <h3>3. Alcance de las Métricas y Estimaciones de Rendimiento</h3>
          <p>Las métricas porcentuales, estimaciones de retorno de inversión (ROI) y tiempos de carga expuestos en la sección de casos de estudio reflejan desempeños medidos sobre proyectos específicos bajo condiciones de mercado particulares. No constituyen promesas ni garantías financieras vinculantes para contrataciones futuras sin previa auditoría técnica.</p>
        </div>
      `
    },
    disclaimer: {
      title: "Exención de Responsabilidad sobre Marcas Terceras (Portfolio Rights)",
      content: `
        <div class="legal-modal-content">
          <p><strong>Declaración Legal Obligatoria de Derechos de Portafolio</strong></p>
          <p>De conformidad con las mejores prácticas corporativas y las pautas establecidas en el documento rector de arquitectura web de nuestra firma:</p>

          <h3>1. Titularidad de Marcas y Signos Distintivos</h3>
          <p>Todos los nombres comerciales, logotipos, marcas registradas, isotipos y denominaciones empresariales exhibidos en la sección de casos de estudio —incluyendo a título enunciativo mas no limitativo: <em>TM Solution México, Aura Beauty, ClimaPro Hermosillo, Loco Rooster, NovaSmile Clínica Odontológica y Ahumados & Carbón Smokehouse</em>— son propiedad exclusiva de sus respectivos titulares registrales.</p>

          <h3>2. Finalidad Estrictamente Demostrativa</h3>
          <p>La presencia de dichos identificadores en este portal responde exclusivamente al ejercicio de derechos legítimos de exhibición de portafolio profesional (<em>portfolio rights</em>) con propósitos de demostración técnica, evidenciando las capacidades de arquitectura de software, ingeniería de conversión y desarrollo web ejecutadas por el equipo de Acceso Digital Premium para tales organizaciones.</p>

          <h3>3. Inexistencia de Asociación Ilícita</h3>
          <p>La exhibición de estos proyectos no implica una relación societaria permanente ni patrocinio recíproco distinto al alcance contractual de desarrollo de software oportunamente convenido con cada cliente.</p>
        </div>
      `
    }
  };

  function openLegalModal(type) {
    const data = legalTexts[type];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.content;
    legalModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLegalModal() {
    legalModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-legal-modal');
      openLegalModal(type);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLegalModal);
  }

  legalModal.addEventListener('click', (e) => {
    if (e.target === legalModal) {
      closeLegalModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && legalModal.classList.contains('open')) {
      closeLegalModal();
    }
  });
}
