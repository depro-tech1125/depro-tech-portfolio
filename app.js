// ==========================================================================
// DEPRO TECH IA SOLUTIONS - MULTI-PROJECT SIMULATOR & REPERTOIRE ENGINE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const chatBody = document.getElementById('chat-body');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const btnReset = document.getElementById('btn-reset-chat');
  const alertBanner = document.getElementById('sim-alert-banner');
  const alertTitle = document.getElementById('sim-alert-title');
  const alertDesc = document.getElementById('sim-alert-desc');
  const alertIcon = document.getElementById('sim-alert-icon');
  const chipsContainer = document.getElementById('chips-container');
  const simAvatar = document.getElementById('sim-avatar');
  const simAvatarIcon = document.getElementById('sim-avatar-icon');
  const simBotTitle = document.getElementById('sim-bot-title');
  const simBotStatus = document.getElementById('sim-bot-status');
  const botSelectorBtns = document.querySelectorAll('.bot-pill-btn');
  const phoneMockup = document.querySelector('.phone-mockup');

  // Filter Elements
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Modal Elements
  const modalOverlay = document.getElementById('project-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const modalIcon = document.getElementById('modal-icon');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalChallenge = document.getElementById('modal-challenge');
  const modalSolution = document.getElementById('modal-solution');
  const modalFlow = document.getElementById('modal-flow');
  const modalTech = document.getElementById('modal-tech');
  const btnModalTestAction = document.getElementById('btn-modal-test-action');

  let currentBotKey = 'techo-ideal';
  let activeModalProjectKey = 'techo-ideal';

  // ==========================================================================
  // BOT PROFILES & SIMULATION RESPONSES
  // ==========================================================================
  const BOTS = {
    'techo-ideal': {
      title: 'Agente Inmobiliario IA',
      status: 'Tu Techo Ideal • Depro Tech Engine',
      icon: '🏢',
      avatarGradient: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
      initialMsg: `
        <p>Hola, bienvenido a Tu techo ideal 👋</p>
        <p>Soy el asistente virtual de Bárbara Bravo y Robert Jiménez. ¿En qué podemos ayudarte hoy? ¿Buscas comprar, alquilar o información de algún inmueble?</p>
      `,
      chips: [
        { label: '🏠 Apartamento en La Boyera', msg: 'Busco apartamento en venta en La Boyera' },
        { label: '🍸 Anuncio del bar en El Hatillo', msg: 'Estoy interesado en el anuncio del bar en El Hatillo' },
        { label: '🏢 Casa Comercial Alta Florida', msg: 'Casa comercial para alquiler en Alta Florida' },
        { label: '💬 Charla casual / broma', msg: 'si es una locura jaja' }
      ],
      alert: {
        icon: '🚨',
        title: '¡Alerta Multicanal Disparada!',
        desc: 'WhatsApp enviado a Robert (+58 414 311 5105) + Tarea urgente creada en Kommo.'
      },
      process: (raw) => {
        const q = raw.toLowerCase().trim();

        // 1. Bar / inmueble no registrado (Zero Hallucination Guard)
        if (q.includes('bar') || q.includes('discoteca') || q.includes('tasca') || q.includes('panaderia') || q.includes('restaurante')) {
          return {
            html: `
              <p><strong>Ok, déjame consultar con un asesor para atenderte inmediatamente.</strong></p>
              <p style="font-size: 0.78rem; color: #a5b4fc; margin-top: 6px;">
                ⚡ <em>[Sistema Blindado]: El bot no inventó propiedades ni pidió disculpas absurdas. Despachó alerta prioritaria y activó silencio de 24h para atención humana de Robert o Bárbara.</em>
              </p>
            `,
            alert: true,
            delay: 900
          };
        }

        // 2. Apartamento en La Boyera
        if (q.includes('boyera') || (q.includes('apartamento') && q.includes('hatillo')) || q.includes('apto')) {
          return {
            html: `
              <p>Hola, bienvenido a Tu techo ideal ✨</p>
              <p>Tenemos disponible en nuestro inventario verificado:</p>
              <p><strong>Apartamento en La Boyera (El Hatillo)</strong><br>
              • <strong>Operación:</strong> Venta<br>
              • <strong>Precio:</strong> US$ 160.000,00<br>
              • <strong>Características:</strong> Penthouse a remodelar de 125,90 m², 4 habitaciones, 3 baños, 1 puesto, piso 14 con hermosa vista panorámica a la montaña.</p>
              <p>¿Te gustaría coordinar una visita presencial con Bárbara Bravo o Robert Jiménez para conocerlo?</p>
            `,
            alert: false,
            delay: 1100
          };
        }

        // 3. Casa comercial en Alta Florida
        if (q.includes('florida') || q.includes('alta florida') || q.includes('comercial')) {
          return {
            html: `
              <p>Hola, bienvenido a Tu techo ideal ✨</p>
              <p>Tenemos disponible esta excelente propiedad corporativa:</p>
              <p><strong>Casa Comercial en Alta Florida (Libertador)</strong><br>
              • <strong>Operación:</strong> Alquiler (US$ 5.500) o Venta (US$ 600.000)<br>
              • <strong>Características:</strong> 850 m² de terreno, múltiples oficinas, estacionamiento para 10+ vehículos, ideal para sede corporativa o embajada.</p>
              <p>¿Qué día te resulta cómodo para coordinar una visita presencial?</p>
            `,
            alert: false,
            delay: 1100
          };
        }

        // 4. Filtro determinístico anti-gasto
        if (q.includes('locura') || q.includes('jaja') || q.includes('jeje') || q.includes('broma') || q.includes('muy caro') || q.includes('yo te aviso')) {
          return {
            html: `
              <div style="background: rgba(16, 185, 129, 0.12); border-left: 3px solid #10b981; padding: 8px 12px; border-radius: 6px;">
                <strong style="color: #34d399; font-size: 0.8rem;">🛡️ FILTRO ANTI-GASTO DETERMINÍSTICO ACTIVADO</strong>
                <p style="font-size: 0.82rem; color: #cbd5e1; margin-top: 4px;">
                  El mensaje fue detectado como charla casual o informal. El bot guarda <strong>silencio inteligente</strong> para proteger el presupuesto de tokens del cliente ($0.00 gastados en IA).
                </p>
              </div>
            `,
            alert: false,
            delay: 600
          };
        }

        // 5. Default Claude response
        return {
          html: `
            <p>Hola, bienvenido a Tu techo ideal ✨</p>
            <p>Con gusto te asesoramos. Tenemos propiedades activas en <strong>El Hatillo, Alta Florida, Macaracuay, Los Naranjos y Las Mercedes</strong>.</p>
            <p>¿Buscas una propiedad para <strong>comprar</strong> o para <strong>alquilar</strong>?</p>
          `,
          alert: false,
          delay: 1000
        };
      }
    },

    'nexus-b2b': {
      title: 'Nexus Lead Scorer IA',
      status: 'Kommo CRM API v4 • Pipeline B2B',
      icon: '💼',
      avatarGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
      initialMsg: `
        <p>Hola, bienvenido a Nexus Solutions 💼</p>
        <p>Soy el Agente de Calificación Comercial y automatización CRM. Para brindarte la mejor asesoría, ¿cuántos ejecutivos o asesores forman tu equipo comercial actualmente?</p>
      `,
      chips: [
        { label: '👥 Equipo de 8 asesores', msg: 'Somos un equipo comercial de 8 asesores' },
        { label: '💰 Presupuesto $2,000 / mes', msg: 'Nuestro presupuesto disponible es de $2,000 para automatizar el CRM' },
        { label: '⚡ Requerimos implementación urgente', msg: 'Necesitamos implementar el sistema urgente esta misma semana' },
        { label: '💬 Solo estoy curioseando jaja', msg: 'solo estoy curioseando jaja a ver que tal' }
      ],
      alert: {
        icon: '🎯',
        title: '¡Lead B2B Caliente Registrado en Kommo CRM!',
        desc: 'Lead calificado con 95/100 pts. Trato creado en "Prospectos Calientes" + Tarea asignada a asesor de guardia.'
      },
      process: (raw) => {
        const q = raw.toLowerCase().trim();

        // 1. Tamaño de equipo
        if (q.includes('8') || q.includes('equipo') || q.includes('asesores') || q.includes('vendedores')) {
          return {
            html: `
              <p>Excelente. Con un equipo de más de 5 asesores, implementar <strong>asignación inteligente Round-Robin en Kommo CRM</strong> reduce un 60% las demoras de respuesta.</p>
              <p>¿Cuál es el canal principal donde reciben prospectos hoy? (WhatsApp, Instagram o pauta en Meta Ads)?</p>
            `,
            alert: false,
            delay: 1000
          };
        }

        // 2. Presupuesto
        if (q.includes('presupuesto') || q.includes('2000') || q.includes('2,000') || q.includes('$') || q.includes('dolar')) {
          return {
            html: `
              <p>Perfecto. Ese rango es óptimo para desplegar un <strong>Ecosistema Completo Depro Tech</strong>:</p>
              <p>• Agente conversacional con Claude Sonnet 4.5<br>
              • Webhooks de integración bidireccional con Kommo CRM<br>
              • Filtros determinísticos anti-gasto y dashboard en tiempo real.</p>
              <p>¿Tienen ya cuenta activa en Kommo o desean que configuremos las licencias y embudos desde cero?</p>
            `,
            alert: false,
            delay: 1100
          };
        }

        // 3. Urgente / Alta prioridad
        if (q.includes('urgente') || q.includes('semana') || q.includes('inmediato') || q.includes('hoy')) {
          return {
            html: `
              <p>Entendido. Por el alto nivel de urgencia, <strong>he calificado tu solicitud con Score Prioritario (95/100)</strong>.</p>
              <p>Acabo de crear el Trato en Kommo en la etapa <em>"Cotización Prioritaria"</em> y notifiqué al director de ingeniería para coordinar una llamada técnica hoy mismo.</p>
            `,
            alert: true,
            delay: 900
          };
        }

        // 4. Casual
        if (q.includes('curioseando') || q.includes('jaja') || q.includes('nada') || q.includes('locura')) {
          return {
            html: `
              <div style="background: rgba(139, 92, 246, 0.12); border-left: 3px solid #8b5cf6; padding: 8px 12px; border-radius: 6px;">
                <strong style="color: #c084fc; font-size: 0.8rem;">📊 LEAD SCORING DETERMINÍSTICO</strong>
                <p style="font-size: 0.82rem; color: #cbd5e1; margin-top: 4px;">
                  El prospecto fue clasificado con Score Informativo (Baja prioridad). No se generan llamadas salientes agresivas ni se desperdician recursos comerciales.
                </p>
              </div>
            `,
            alert: false,
            delay: 600
          };
        }

        return {
          html: `
            <p>Con gusto te orientamos. Cuéntanos: ¿cuál es el mayor desafío comercial que enfrenta tu empresa actualmente?</p>
          `,
          alert: false,
          delay: 900
        };
      }
    },

    'fastcommerce': {
      title: 'FastCommerce Express',
      status: 'Catálogo & Pedidos • WhatsApp Checkout',
      icon: '🛍️',
      avatarGradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      initialMsg: `
        <p>¡Hola! Bienvenido a FastGourmet Express 🛍️🍕</p>
        <p>Soy tu asistente de pedidos automáticos. ¿Deseas consultar nuestro menú de hoy o armar un pedido para delivery/retiro?</p>
      `,
      chips: [
        { label: '🍕 Combo Pizza Familiar + Bebida', msg: 'Quiero pedir el Combo Pizza Familiar con bebida' },
        { label: '🥤 ¿Tienen opciones vegetarianas?', msg: '¿Tienen pizzas vegetarianas o sin gluten?' },
        { label: '🛵 ¿Costo de delivery a Las Mercedes?', msg: '¿Cuánto cuesta el delivery hasta Las Mercedes?' },
        { label: '💬 jaja qué rápido responde', msg: 'jaja qué rápido responde este bot' }
      ],
      alert: {
        icon: '🛵',
        title: '¡Orden #4920 Generada en Tiempo Real!',
        desc: 'Pedido estructurado enviado a pantalla de cocina y link de pago enviado al cliente.'
      },
      process: (raw) => {
        const q = raw.toLowerCase().trim();

        // 1. Combo Pizza
        if (q.includes('combo') || q.includes('pizza') || q.includes('familiar') || q.includes('hambre')) {
          return {
            html: `
              <p>¡Excelente elección! 🍕</p>
              <p><strong>Combo Familiar Express ($18.00):</strong><br>
              • 1 Pizza Familiar (8 porciones) con 2 ingredientes a elección.<br>
              • 1 Refresco 1.5L (Coca-Cola, Chinotto o Nestea).<br>
              • Salsas artesanales de la casa incluidas.</p>
              <p>¿Qué ingredientes prefieres: Pepperoni, Jamón, Champiñones, Maíz o Tocineta?</p>
            `,
            alert: false,
            delay: 1000
          };
        }

        // 2. Vegetarianas
        if (q.includes('vegetariana') || q.includes('gluten') || q.includes('veggie')) {
          return {
            html: `
              <p>¡Sí, por supuesto! 🌱</p>
              <p>Contamos con nuestra <strong>Pizza Primavera Veggie ($14.00)</strong>:</p>
              <p>Masa delgada, pomodoro artesanal, mozzarella vegetal, pimientos asados, champiñones frescos y toque de rúcula al salir del horno. 100% libre de carnes.</p>
              <p>¿Te gustaría incluirla en tu orden?</p>
            `,
            alert: false,
            delay: 1000
          };
        }

        // 3. Delivery y pago
        if (q.includes('delivery') || q.includes('mercedes') || q.includes('costo') || q.includes('envio') || q.includes('envío')) {
          return {
            html: `
              <p>El delivery a <strong>Las Mercedes</strong> tiene una tarifa plana de <strong>$2.50</strong> (tiempo estimado: 25 a 35 min) 🛵.</p>
              <p><strong>Resumen de tu pedido:</strong><br>
              • Combo Familiar Express: $18.00<br>
              • Costo de Delivery: $2.50<br>
              • <strong>Total a pagar: $20.50</strong></p>
              <p>¿Deseas pagar con Pago Móvil, Zelle o Tarjeta Internacional?</p>
            `,
            alert: true,
            delay: 950
          };
        }

        // 4. Casual
        if (q.includes('rapido') || q.includes('rápido') || q.includes('jaja') || q.includes('gracias')) {
          return {
            html: `
              <p>¡Gracias! Estamos programados para que jamás pases hambre esperando un menú. 😉 ¿Te gustaría que agreguemos algún postre o bebida adicional?</p>
            `,
            alert: false,
            delay: 700
          };
        }

        return {
          html: `
            <p>Con gusto te tomamos el pedido. Indícanos qué se te antoja hoy o dinos tu dirección para calcular el delivery exacto.</p>
          `,
          alert: false,
          delay: 900
        };
      }
    },

    'sentinel': {
      title: 'Sentinel 24/7 Support',
      status: 'Mesa de Ayuda • RAG & Base de Conocimiento',
      icon: '🎧',
      avatarGradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
      initialMsg: `
        <p>Hola, estás en el canal de Soporte y Asistencia de Sentinel Enterprise 🎧</p>
        <p>Por favor indícame tu correo de usuario o el número de incidencia para orientarte de inmediato.</p>
      `,
      chips: [
        { label: '🔑 Olvidé mi contraseña de acceso', msg: 'No puedo ingresar a mi cuenta, olvidé mi contraseña' },
        { label: '💳 El cobro de mi suscripción falló', msg: 'El cobro de mi suscripción falló hoy con mi tarjeta' },
        { label: '😡 Llevo 3 días esperando y nadie responde', msg: 'Llevo 3 días esperando y nadie responde, esto es inaceptable' },
        { label: '💬 Hola buenos días', msg: 'Hola muy buenos días' }
      ],
      alert: {
        icon: '🚨',
        title: '¡Ticket Urgente #ST-892 Escala a Supervisor!',
        desc: 'Sentimiento negativo detectado. Bot pausado y notificación push enviada a supervisor humano.'
      },
      process: (raw) => {
        const q = raw.toLowerCase().trim();

        // 1. Password reset
        if (q.includes('contraseña') || q.includes('clave') || q.includes('acceso') || q.includes('password') || q.includes('entrar')) {
          return {
            html: `
              <p><strong>Guía para Restablecer tu Acceso:</strong></p>
              <p>1. Ingresa a tu panel en el botón <em>"¿Olvidaste tu contraseña?"</em>.<br>
              2. Introduce el correo con el que te diste de alta.<br>
              3. Te llegará un token de un solo uso con validez de 15 minutos.</p>
              <p>Si no lo ves en tu bandeja principal, revisa la carpeta de <em>Promociones</em> o <em>Spam</em>. ¿Pudiste recibir el enlace?</p>
            `,
            alert: false,
            delay: 1000
          };
        }

        // 2. Cobro / facturación
        if (q.includes('cobro') || q.includes('suscripcion') || q.includes('suscripción') || q.includes('tarjeta') || q.includes('pago')) {
          return {
            html: `
              <p>Comprendo. Si el cobro de tu suscripción fue rechazado por el banco emisor:</p>
              <p>• La plataforma cuenta con un período de gracia de <strong>72 horas</strong> sin interrumpir tus servicios.<br>
              • Puedes actualizar o cambiar el método de pago desde <em>Ajustes > Facturación</em>.</p>
              <p>¿Deseas que generemos un reintento manual en este instante?</p>
            `,
            alert: false,
            delay: 1050
          };
        }

        // 3. Frustración / Insatisfacción (Handoff prioritario)
        if (q.includes('inaceptable') || q.includes('dias') || q.includes('días') || q.includes('esperando') || q.includes('rabia') || q.includes('estafa') || q.includes('nadie responde')) {
          return {
            html: `
              <p>Lamento mucho los inconvenientes causados. <strong>He activado de inmediato el protocolo de escalamiento prioritario</strong>.</p>
              <p>⚡ <em>[Handoff Humano]:</em> Se ha generado el <strong>Ticket Urgente #ST-892</strong> y el bot se ha silenciado. Un supervisor de operaciones tomará control directo de esta conversación en menos de 5 minutos.</p>
            `,
            alert: true,
            delay: 850
          };
        }

        // 4. Saludo
        if (q.includes('hola') || q.includes('buenos dias') || q.includes('buenos días')) {
          return {
            html: `
              <p>¡Hola! Muy buenos días. Es un gusto atenderte. ¿En qué problema técnico o requerimiento sobre la plataforma podemos ayudarte hoy?</p>
            `,
            alert: false,
            delay: 800
          };
        }

        return {
          html: `
            <p>Entendido. He registrado tu consulta en nuestro sistema de soporte. ¿Deseas que verifiquemos el estatus con un analista técnico?</p>
          `,
          alert: false,
          delay: 900
        };
      }
    }
  };

  // ==========================================================================
  // PROJECT TECHNICAL SHEETS DATA (MODAL)
  // ==========================================================================
  const PROJECT_SHEETS = {
    'techo-ideal': {
      title: 'Tu Techo Ideal C.A.',
      category: 'Inmobiliaria & Proptech de Lujo',
      icon: '🏢',
      challenge: 'Tu Techo Ideal recibía decenas de leads diarios por Instagram y WhatsApp a través de Wasi y redes sociales. El reto primordial era responder en menos de 3 segundos, evitar el abandono fuera de horario de oficina y blindar al sistema para que jamás inventara propiedades inexistentes o precios erróneos.',
      solution: 'Diseñamos un microservicio Node.js en Render conectado bidireccionalmente con WhatsApp Cloud API, Instagram Direct y Google Sheets. El bot clasifica la intención con Claude Sonnet 4.5, responde únicamente con base en el inventario real y notifica inmediatamente al WhatsApp de Robert Jiménez y Bárbara Bravo ante oportunidades en caliente.',
      flow: [
        { num: '01', title: 'Recepción Multicanal', desc: 'Webhook recibe mensajes de WhatsApp e Instagram en menos de 200ms.' },
        { num: '02', title: 'Filtro Determinístico & Mutex', desc: 'Debouncing de mensajes rápidos y bloqueo de gasto innecesario en charla casual.' },
        { num: '03', title: 'Cerebro Claude Sonnet 4.5', desc: 'Validación estricta contra hoja de inventario sin inventar datos no listados.' },
        { num: '04', title: 'Kommo CRM & WhatsApp Push', desc: 'Creación del lead y despacho de alerta prioritaria con link directo a los brokers.' }
      ],
      tech: ['Claude Sonnet 4.5', 'Kommo CRM API v4', 'Google Sheets API', 'WhatsApp Cloud API', 'Node.js & Express', 'Render Cloud'],
      botKey: 'techo-ideal'
    },

    'nexus-b2b': {
      title: 'Nexus B2B Solutions',
      category: 'Automatización Comercial & Lead Scoring',
      icon: '💼',
      challenge: 'Empresas de servicios B2B pierden hasta el 40% de sus prospectos calificados por demorar horas en contactarlos y no saber priorizar cuáles leads cuentan con presupuesto y decisión inmediata frente a curiosos.',
      solution: 'Implementamos un flujo interactivo que cualifica al prospecto en tiempo real según 3 variables críticas (volumen de equipo, presupuesto asignado y urgencia). Los leads de alta puntuación son creados automáticamente en Kommo CRM con tarea urgente, mientras que los informativos reciben seguimiento automatizado sin consumir tiempo de los asesores.',
      flow: [
        { num: '01', title: 'Captura de Prospecto', desc: 'Ingreso desde landing page o chat corporativo con detección de canal.' },
        { num: '02', title: 'Entrevista Inteligente', desc: 'Preguntas estratégicas sobre equipo, urgencia y presupuesto.' },
        { num: '03', title: 'Algoritmo de Lead Scoring', desc: 'Cálculo de puntaje de 1 a 100 y clasificación en Frío / Templado / Caliente.' },
        { num: '04', title: 'Asignación Round-Robin en Kommo', desc: 'Creación de negocio y notificación push al asesor de ventas asignado.' }
      ],
      tech: ['Kommo CRM API v4', 'OpenAI GPT-4o', 'Lead Scoring Engine', 'Webhooks REST', 'Node.js Microservices', 'Make.com'],
      botKey: 'nexus-b2b'
    },

    'fastcommerce': {
      title: 'FastCommerce AI Express',
      category: 'Retail & Delivery por WhatsApp',
      icon: '🛍️',
      challenge: 'Restaurantes y comercios minoristas colapsan sus líneas de WhatsApp en horas pico con pedidos manuales, cálculos errados de vuelto, demoras en cotizar el delivery y pérdida de ventas por fricción.',
      solution: 'Desarrollamos un agente conversacional para toma de pedidos express. Consulta el catálogo en tiempo real, sugiere agregados estratégicos (upselling), calcula recargos por zona de despacho de forma automática y emite la orden formateada con datos de pago móvil o pasarela internacional.',
      flow: [
        { num: '01', title: 'Consulta de Menú / Catálogo', desc: 'Presentación de combos activos y disponibilidad de ingredientes en stock.' },
        { num: '02', title: 'Personalización de Pedido', desc: 'Selección de ingredientes, bebidas y sugerencias cruzadas automáticas.' },
        { num: '03', title: 'Cálculo de Zona & Delivery', desc: 'Suma de subtotales, empaque y tarifa de envío según sector geográfico.' },
        { num: '04', title: 'Ticket de Despacho & Pago', desc: 'Generación de ticket estructurado para cocina y coordenadas bancarias.' }
      ],
      tech: ['WhatsApp Cloud API', 'PostgreSQL / Google Sheets', 'Claude AI Engine', 'Checkout Webhooks', 'Node.js', 'Express'],
      botKey: 'fastcommerce'
    },

    'sentinel': {
      title: 'Sentinel 24/7 Support',
      category: 'Soporte Corporativo & Helpdesk',
      icon: '🎧',
      challenge: 'Mesas de ayuda saturadas con preguntas repetitivas sobre claves, facturación y manuales, impidiendo que el equipo humano atienda incidencias críticas y provocando frustración en clientes importantes.',
      solution: 'Creamos un agente de soporte de Nivel 1 respaldado por arquitectura RAG (Retrieval-Augmented Generation). El sistema responde únicamente con base en manuales y políticas certificadas, e incorpora un analizador de sentimiento para transferir inmediatamente a supervisores humanos con historial completo si detecta molestia.',
      flow: [
        { num: '01', title: 'Identificación de Cuenta', desc: 'Validación de usuario o número de ticket en base de datos de clientes.' },
        { num: '02', title: 'RAG en Base de Conocimiento', desc: 'Búsqueda semántica en manuales oficiales con cero invento de soluciones.' },
        { num: '03', title: 'Análisis de Sentimiento IA', desc: 'Detección en tiempo real de frustración, urgencia o insatisfacción.' },
        { num: '04', title: 'Handoff Silencioso o Ticket Urgente', desc: 'Cierre del caso o escalamiento a supervisor con alerta push prioritaria.' }
      ],
      tech: ['RAG Vectorial', 'Claude 3.5 Sonnet', 'Sentimiento IA', 'Zendesk / Kommo Integration', 'Node.js', 'Express'],
      botKey: 'sentinel'
    }
  };

  // ==========================================================================
  // HELPER FUNCTIONS
  // ==========================================================================
  function getCurrentTime() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.innerText = string;
    return div.innerHTML;
  }

  function appendUserMessage(text) {
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-msg user';
    msgEl.innerHTML = `
      <div class="msg-bubble">
        <p>${escapeHtml(text)}</p>
        <span class="msg-time">${getCurrentTime()}</span>
      </div>
    `;
    chatBody.appendChild(msgEl);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const typingEl = document.createElement('div');
    typingEl.className = 'chat-msg bot typing-msg';
    typingEl.id = 'typing-indicator';
    typingEl.innerHTML = `
      <div class="msg-bubble">
        <div class="typing-dots">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    chatBody.appendChild(typingEl);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const typingEl = document.getElementById('typing-indicator');
    if (typingEl) typingEl.remove();
  }

  function appendBotMessage(htmlContent, delayMs = 1000, isAlert = false) {
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const msgEl = document.createElement('div');
      msgEl.className = 'chat-msg bot';
      msgEl.innerHTML = `
        <div class="msg-bubble">
          ${htmlContent}
          <span class="msg-time">${getCurrentTime()}</span>
        </div>
      `;
      chatBody.appendChild(msgEl);
      scrollToBottom();

      const bot = BOTS[currentBotKey];
      if (isAlert && bot.alert) {
        alertIcon.textContent = bot.alert.icon || '🚨';
        alertTitle.textContent = bot.alert.title;
        alertDesc.textContent = bot.alert.desc;
        alertBanner.classList.add('show');
      } else {
        alertBanner.classList.remove('show');
      }
    }, delayMs);
  }

  // ==========================================================================
  // SWITCH BOT IN SIMULATOR
  // ==========================================================================
  function switchBot(botKey, smoothScroll = false) {
    if (!BOTS[botKey]) return;
    currentBotKey = botKey;
    const bot = BOTS[botKey];

    // Update Simulator Header
    simBotTitle.textContent = bot.title;
    simBotStatus.textContent = bot.status;
    simAvatarIcon.textContent = bot.icon;
    simAvatar.style.background = bot.avatarGradient;

    // Reset Chat Messages
    chatBody.innerHTML = `
      <div class="chat-msg bot">
        <div class="msg-bubble">
          ${bot.initialMsg}
          <span class="msg-time">${getCurrentTime()}</span>
        </div>
      </div>
    `;

    // Hide Alert Banner
    alertBanner.classList.remove('show');

    // Update Preset Chips
    chipsContainer.innerHTML = '';
    bot.chips.forEach(chip => {
      const btn = document.createElement('button');
      btn.className = 'chip';
      btn.textContent = chip.label;
      btn.setAttribute('data-msg', chip.msg);
      btn.addEventListener('click', () => {
        appendUserMessage(chip.msg);
        processIncomingUserMessage(chip.msg);
      });
      chipsContainer.appendChild(btn);
    });

    // Update Bot Selector Pills active state
    botSelectorBtns.forEach(btn => {
      if (btn.getAttribute('data-bot') === botKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Clear input
    chatInput.value = '';

    // Scroll to simulator if requested
    if (smoothScroll) {
      const simSection = document.getElementById('simulador');
      if (simSection) {
        simSection.scrollIntoView({ behavior: 'smooth' });
      }
      phoneMockup.classList.remove('highlight-pulse');
      void phoneMockup.offsetWidth; // Trigger reflow
      phoneMockup.classList.add('highlight-pulse');
    }
  }

  function processIncomingUserMessage(text) {
    const bot = BOTS[currentBotKey];
    if (!bot || !bot.process) return;

    const result = bot.process(text);
    appendBotMessage(result.html, result.delay || 1000, !!result.alert);
  }

  // ==========================================================================
  // EVENT LISTENERS: CHAT FORM & CONTROLS
  // ==========================================================================
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    appendUserMessage(text);
    chatInput.value = '';
    processIncomingUserMessage(text);
  });

  btnReset.addEventListener('click', () => {
    switchBot(currentBotKey, false);
  });

  botSelectorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const botKey = btn.getAttribute('data-bot');
      if (botKey) switchBot(botKey, false);
    });
  });

  // Buttons on Project Cards ("Probar Simulador")
  document.querySelectorAll('.btn-load-bot').forEach(btn => {
    btn.addEventListener('click', () => {
      const botKey = btn.getAttribute('data-bot');
      if (botKey) {
        switchBot(botKey, true);
      }
    });
  });

  // ==========================================================================
  // REPERTOIRE CATEGORY FILTERS
  // ==========================================================================
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category === 'all') {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================================================
  // MODAL LOGIC (FICHA TÉCNICA)
  // ==========================================================================
  function openProjectModal(projectKey) {
    const data = PROJECT_SHEETS[projectKey];
    if (!data) return;

    activeModalProjectKey = projectKey;
    modalIcon.textContent = data.icon;
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalChallenge.textContent = data.challenge;
    modalSolution.textContent = data.solution;

    // Render flow
    modalFlow.innerHTML = '';
    data.flow.forEach(step => {
      const stepEl = document.createElement('div');
      stepEl.className = 'modal-flow-step';
      stepEl.innerHTML = `
        <div class="flow-step-num">${step.num}</div>
        <div class="flow-step-text">
          <strong>${step.title}</strong>
          <span>${step.desc}</span>
        </div>
      `;
      modalFlow.appendChild(stepEl);
    });

    // Render tech
    modalTech.innerHTML = '';
    data.tech.forEach(t => {
      const pill = document.createElement('span');
      pill.textContent = t;
      modalTech.appendChild(pill);
    });

    // Show modal
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open modal buttons
  document.querySelectorAll('.btn-open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      if (projectKey) openProjectModal(projectKey);
    });
  });

  btnCloseModal.addEventListener('click', closeProjectModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeProjectModal();
    }
  });

  btnModalTestAction.addEventListener('click', () => {
    const data = PROJECT_SHEETS[activeModalProjectKey];
    closeProjectModal();
    if (data && data.botKey) {
      switchBot(data.botKey, true);
    }
  });

  // ==========================================================================
  // INITIALIZE FIRST BOT (Tu Techo Ideal)
  // ==========================================================================
  switchBot('techo-ideal', false);
});
