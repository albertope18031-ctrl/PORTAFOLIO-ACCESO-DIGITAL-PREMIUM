/**
 * Acceso Digital Premium - Dataset de Proyectos y Casos de Estudio (PSR)
 * Framework Problem-Solution-Results
 */

const PROJECTS_DATA = [
  {
    id: "tm-solution",
    title: "TM Solution México",
    category: "corporativo",
    categoryLabel: "Corporativo & B2B Industrial",
    subtitle: "Portal Industrial Corporativo & Sistema de Suministros y Cotización por Volumen",
    metricHighlight: "+240%",
    metricLabel: "Incremento en cotizaciones B2B calificadas",
    logo: "assets/clients/tm-solution.webp",
    liveUrl: "https://www.tmsolutionmx.com.mx/",
    techStack: ["HTML5 / CSS3 Semántico", "Vanilla JS", "Arquitectura B2B", "SEO Industrial", "Vercel Edge"],
    secondaryMetrics: [
      { value: "-35%", label: "Ciclo de prospección comercial" },
      { value: "99.8%", label: "Disponibilidad de plataforma" },
      { value: "< 0.7s", label: "Carga perimetral de catálogo" }
    ],
    summary: "Desarrollo de un ecosistema digital corporativo para una firma líder en suministros industriales, refacciones críticas y equipos de protección personal (EPP), orientado a directores de compras y plantas manufactureras.",
    psr: {
      problem: "TM Solution enfrentaba una marcada asimetría entre su amplia capacidad logística y su anterior presencia digital. A pesar de contar con un inventario robusto para minería e industria nacional, los gerentes de compras sufrían fricción técnica para encontrar fichas de productos y requerían múltiples intercambios de correos para una sola cotización, lo que alargaba los ciclos de cierre a más de 20 días y reducía la conversión en licitaciones privadas.",
      solution: "Se concibió un portal de ingeniería corporativa B2B con arquitectura de navegación de alta densidad y claridad semántica. Se integró un catálogo técnico estructurado por familias industriales, un cotizador por volumen con validación de datos fiscales y requerimientos técnicos en un solo paso, e infraestructura optimizada para despliegues instantáneos desde cualquier dispositivo móvil o terminal de planta.",
      results: {
        financial: "Incremento del +240% en cotizaciones calificadas de grandes plantas industriales durante los primeros 90 días.",
        operational: "Reducción del 35% en los tiempos de respuesta del equipo comercial y simplificación drástica en la recopilación de especificaciones técnicas.",
        ux: "Calificación de 99/100 en Core Web Vitals, estabilidad visual absoluta (CLS = 0) y navegación libre de demoras cognitivas."
      }
    }
  },
  {
    id: "aura-beauty",
    title: "Aura Beauty Spa",
    category: "salud",
    categoryLabel: "Estética de Lujo & Bienestar",
    subtitle: "Plataforma de Alta Conversión con Comparador Dinámico y Cotizador Inteligente",
    metricHighlight: "+145%",
    metricLabel: "Aumento en reserva de citas de alto valor",
    logo: "assets/clients/aura-beauty.webp",
    liveUrl: "https://aura-beauty-dusky-phi.vercel.app/",
    techStack: ["UI/UX Prémium", "Cormorant & Jakarta Typography", "Comparador Antes/Después", "Cotizador Multi-Paso", "Vercel"],
    secondaryMetrics: [
      { value: "-70%", label: "Consultas manuales en recepción" },
      { value: "3m 42s", label: "Permanencia promedio en sitio" },
      { value: "98/100", label: "Core Web Vitals Score" }
    ],
    summary: "Creación de un portal de lujo digital para salón de estética y spa prémium, integrando comparadores interactivos de transformaciones y cotizador automatizado.",
    psr: {
      problem: "Aura Beauty experimentaba una fuga recurrente de prospectos de alto poder adquisitivo debido a una recepción saturada que no alcanzaba a responder mensajes sobre precios de tratamientos complejos (balayage, diseño capilar y faciales avanzados). La falta de un portafolio interactivo generaba desconfianza en procedimientos de ticket elevado.",
      solution: "Se diseñó una experiencia inmersiva de estética editorial moderna. Se integró un comparador táctil interactivo 'Antes/Después' con precarga de imágenes de alta fidelidad, un cotizador guiado por categorías de servicio y un canal de reserva directa conectado a WhatsApp con datos precargados para asegurar un flujo sin fricción.",
      results: {
        financial: "+145% en captación de citas para servicios de alto ticket en los primeros dos meses de lanzamiento.",
        operational: "-70% de tiempo del personal recepcionista dedicado a aclarar presupuestos, agilizando el flujo de atención en sucursal.",
        ux: "Incremento a 3m 42s de tiempo promedio en página y tasa de rebote reducida en un 42% gracias a la interactividad visual."
      }
    }
  },
  {
    id: "climapro",
    title: "ClimaPro Hermosillo",
    category: "servicios",
    categoryLabel: "Servicios Técnicos & HVAC",
    subtitle: "Landing Page de Alta Conversión Local & Asistencia Técnica Inmediata",
    metricHighlight: "+210%",
    metricLabel: "Incremento en leads técnicos calificados",
    logo: "assets/clients/clima-pro.webp",
    liveUrl: "https://climapro-chi.vercel.app/",
    techStack: ["Mobile-First Architecture", "WhatsApp Click-to-Chat API", "Local SEO Estratégico", "CSS Grid/Flexbox"],
    secondaryMetrics: [
      { value: "< 45s", label: "Tiempo promedio a primer contacto" },
      { value: "$400 MXN", label: "Tarifa base sin costos ocultos" },
      { value: "100%", label: "Optimización móvil 4G/5G" }
    ],
    summary: "Estrategia digital de respuesta ultrarrápida para reparación y mantenimiento de sistemas de aire acondicionado residencial e industrial en mercados de temperaturas extremas.",
    psr: {
      problem: "En climas con temperaturas superiores a los 45°C, la necesidad de climatización es crítica y de resolución urgente. Sin embargo, las opciones en internet solían ser lentas, con presupuestos ambiguos o formularios tediosos, provocando que los clientes abandonaran los sitios para contratar servicios informales de baja garantía.",
      solution: "Se implementó una landing page de arquitectura 'Mobile-First' y carga perimetral instantánea. Se introdujo una política de transparencia radical destacando la tarifa base de revisión ($400 MXN) y las 4 fallas más comunes con botones directos hacia WhatsApp Business, automatizando el saludo con la falla ya diagnosticada por el propio cliente.",
      results: {
        financial: "Incremento del +210% en solicitudes de servicio durante la temporada alta de verano.",
        operational: "El equipo técnico recibe la ubicación, modelo del equipo y diagnóstico preliminar antes de salir a la visita, optimizando rutas de cuadrilla.",
        ux: "Tiempos de interacción menores a 45 segundos para agendar la cita y carga completa del sitio en menos de 0.8s en redes móviles."
      }
    }
  },
  {
    id: "loco-rooster",
    title: "Loco Rooster",
    category: "gastronomia",
    categoryLabel: "Gastronomía & Fast Casual",
    subtitle: "Plataforma de Menú Digital Disruptivo & Canal Propio de Pedidos Sin Comisiones",
    metricHighlight: "+180%",
    metricLabel: "Aumento en pedidos por canal propio",
    logo: "assets/clients/loco-rooster.webp",
    liveUrl: "https://comida-web-gray.vercel.app/",
    techStack: ["UI Urbana & Microinteracciones", "Diseño Dark Sensorial", "Menú Modular Interactivo", "Vercel"],
    secondaryMetrics: [
      { value: "0%", label: "Comisiones a intermediarios en web" },
      { value: "+28%", label: "Ticket promedio por combos guiados" },
      { value: "65%", label: "Tasa de retención de clientes" }
    ],
    summary: "Plataforma web con estética urbana de alto impacto visual y selector interactivo para alitas, boneless y combos legendarios.",
    psr: {
      problem: "Loco Rooster dependía de aplicaciones agregadoras de delivery que consumían hasta el 30% del margen operativo por cada pedido. Además, las plataformas genéricas no reflejaban la personalidad transgresora de la marca y generaban errores constantes en la captura de niveles de salsa y extras.",
      solution: "Se creó una plataforma web con personalidad disruptiva, estética oscura con acentos vibrantes, tipografía enérgica y catálogo dinámico. Se integró una lógica visual interactiva para la configuración de alitas, boneless, salsas y combos familiares, despachando el pedido completo directamente al canal operativo del restaurante.",
      results: {
        financial: "Ahorro total de comisiones y +180% en órdenes canalizadas por vía digital propia.",
        operational: "Erradicación de errores en comandas de cocina al recibir la orden formateada con salsas y extras seleccionados con precisión.",
        ux: "Experiencia visual envolvente que aumentó el ticket promedio en un 28% gracias a combos visualmente irresistibles."
      }
    }
  },
  {
    id: "nova-smile",
    title: "NovaSmile Dental",
    category: "salud",
    categoryLabel: "Salud & Especialidades Odontológicas",
    subtitle: "Portal Clínico & Sistema de Cualificación de Pacientes y Agendamiento",
    metricHighlight: "+85%",
    metricLabel: "Incremento en citas de valoración estética",
    logo: "assets/clients/nova-smile.webp",
    liveUrl: "https://novasmile-sigma.vercel.app/",
    techStack: ["Diseño Clínico Prémium", "Filtro de Especialidad", "Validación Médica", "Microinteracciones"],
    secondaryMetrics: [
      { value: "-50%", label: "Tasa de inasistencias (no-shows)" },
      { value: "100%", label: "Cumplimiento normativo y de salud" },
      { value: "99/100", label: "Accesibilidad médica WCAG" }
    ],
    summary: "Diseño y despliegue del portal institucional de una clínica odontológica moderna, enfocado en generar máxima credibilidad para procedimientos de ortodoncia invisible y estética dental.",
    psr: {
      problem: "Los tratamientos dentales especializados demandan un altísimo nivel de certidumbre médica. Los pacientes potenciales postergaban su decisión por desconfianza en presupuestos no claros o por la falta de información verificable sobre la experiencia y tecnología del cuerpo médico.",
      solution: "Diseño de un portal clínico prémium basado en colores turquesa y azul cielo que transmiten serenidad y esterilidad quirúrgica. Se estructuró un desglose transparente de especialidades con credenciales del cuadro médico, explicaciones paso a paso de procedimientos y un sistema de pre-registro guiado para valoración.",
      results: {
        financial: "Crecimiento del +85% en pacientes calificados para tratamientos de estética dental integral.",
        operational: "Descenso del 50% en cancelaciones no anunciadas gracias a la confirmación estructurada previa.",
        ux: "99/100 en accesibilidad y confort de navegación, consolidando una percepción de prestigio médico irreprochable."
      }
    }
  },
  {
    id: "ahumados-carbon",
    title: "Ahumados & Carbón Smokehouse",
    category: "gastronomia",
    categoryLabel: "Gastronomía Artesanal & BBQ",
    subtitle: "Menú Digital Interactivo de Alto Apetito & Experiencia Smokehouse QR",
    metricHighlight: "+35%",
    metricLabel: "Aumento en ticket promedio de consumo",
    logo: "assets/clients/ahumados-carbon.webp",
    liveUrl: "https://ahumados-carbon-smokehouse.vercel.app/",
    techStack: ["Dark Gastronomy UI", "Optimización QR In-Venue", "Microanimaciones CSS", "Mobile-First"],
    secondaryMetrics: [
      { value: "$0", label: "Costos en reimpresión de cartas físicas" },
      { value: "-40%", label: "Tiempo de orden en horas pico" },
      { value: "< 1s", label: "Carga inmediata por código QR" }
    ],
    summary: "Digitalización integral de la carta gastronómica para restaurante especializado en ahumados estilo Texas, con visualización apetitosa y actualización dinámica.",
    psr: {
      problem: "El restaurante experimentaba costos elevados en reimpresión continua de cartas físicas debido a fluctuaciones en el costo de cortes importados. En horas pico de fin de semana, el personal de sala se saturaba resolviendo preguntas sobre guarniciones y cócteles, demorando la rotación de mesas.",
      solution: "Se desarrolló una carta digital inmersiva accesible al instante mediante código QR en cada mesa. El diseño adopta una atmósfera rústica y sofisticada (tonos humo, carbón y oro fuego) con fotografías de alta resolución en compresión WebP, badges de disponibilidad en tiempo real y sugerencias de maridaje.",
      results: {
        financial: "+35% de incremento en el consumo promedio por mesa gracias a la visibilidad atractiva de postres y coctelería artesanal.",
        operational: "Eliminación absoluta de costos en impresión y ahorro del 40% en tiempos de atención de personal de servicio.",
        ux: "Carga instantánea en menos de 1 segundo incluso en zonas del local con señal móvil intermitente."
      }
    }
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PROJECTS_DATA };
}
