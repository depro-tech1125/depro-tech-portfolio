// ==========================================================================
// DEPRO TECH IA SOLUTIONS - LIGHT CORPORATE CATALOG & SIMULATOR ENGINE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Left Card
  const projectTitle = document.getElementById('project-title');
  const projectSubtitle = document.getElementById('project-subtitle');
  const projectMainIcon = document.getElementById('project-main-icon');
  const projectDescription = document.getElementById('project-description');
  const projectBenefitsList = document.getElementById('project-benefits-list');
  const metric1Val = document.getElementById('metric-1-val');
  const metric1Lbl = document.getElementById('metric-1-lbl');
  const metric2Val = document.getElementById('metric-2-val');
  const metric2Lbl = document.getElementById('metric-2-lbl');
  const metric3Val = document.getElementById('metric-3-val');
  const metric3Lbl = document.getElementById('metric-3-lbl');
  const btnProjectWa = document.getElementById('btn-project-wa');
  const btnFocusSim = document.getElementById('btn-focus-sim');
  const catalogTabs = document.querySelectorAll('#catalog-tabs button');

  // DOM Elements - Simulator
  const chatBody = document.getElementById('chat-body');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const btnResetChat = document.getElementById('btn-reset-chat');
  const simAvatar = document.getElementById('sim-avatar');
  const simBotTitle = document.getElementById('sim-bot-title');
  const simBotStatus = document.getElementById('sim-bot-status');
  const chipsContainer = document.getElementById('chips-container');
  const simAlertBanner = document.getElementById('sim-alert-banner');
  const simAlertTitle = document.getElementById('sim-alert-title');
  const simAlertDesc = document.getElementById('sim-alert-desc');
  const simAlertIcon = document.getElementById('sim-alert-icon');

  // DOM Elements - Modal
  const modalProjectIcon = document.getElementById('modal-project-icon');
  const modalProjectCategory = document.getElementById('modal-project-category');
  const modalProjectTitle = document.getElementById('modal-project-title');
  const modalProjectChallenge = document.getElementById('modal-project-challenge');
  const modalProjectSolution = document.getElementById('modal-project-solution');
  const modalProjectResults = document.getElementById('modal-project-results');

  let activeProjectKey = 'techo-ideal';

  // ==========================================================================
  // PROJECTS & SIMULATOR DATA (CLEAR BUSINESS LANGUAGE - NO TECH JARGON)
  // ==========================================================================
  const PROJECTS_DATA = {
    'techo-ideal': {
      category: 'Inmobiliaria & Proptech',
      title: 'Tu Techo Ideal C.A.',
      subtitle: 'Venta y Alquiler de Inmuebles en Caracas',
      icon: '🏢',
      description: 'Atiende a clientes que buscan comprar o alquilar. Consulta la lista de propiedades en tiempo real, brinda precios y características verificadas, y alerta a los asesores de inmediato cuando un cliente desea visitar una propiedad.',
      benefits: [
        { strong: 'Cero invento de datos:', text: 'Si preguntan por un inmueble no disponible, no inventa datos; avisa a los asesores.' },
        { strong: 'Actualización en segundos:', text: 'Sincronizado a tu inventario sin configuraciones complejas.' },
        { strong: 'Alerta inmediata a WhatsApp:', text: 'Tus vendedores reciben la ficha del cliente en caliente con número directo.' }
      ],
      metrics: [
        { val: '< 3 seg', lbl: 'Respuesta' },
        { val: '100%', lbl: 'Datos Reales' },
        { val: '24/7', lbl: 'Atención' }
      ],
      waMessage: 'Hola Depro Tech, vi el sistema de Tu Techo Ideal y me gustaría implementar un bot inmobiliario para mi negocio.',
      modal: {
        challenge: 'Responder de inmediato decenas de prospectos diarios fuera de horario sin inventar propiedades ni perder clientes potenciales.',
        solution: 'Agente en WhatsApp conectado a la lista de propiedades reales. Informa precios, fotos y agenda visitas con Bárbara y Robert automáticamente.',
        results: [
          'Respuestas en menos de 3 segundos día y noche',
          '0% datos o propiedades inventadas',
          'Avisos prioritarios directos al WhatsApp del asesor'
        ]
      },
      bot: {
        title: 'Agente Inmobiliario',
        status: 'En línea • Tu Techo Ideal',
        avatar: '🏢',
        greeting: `
          <p>Hola, bienvenido a Tu techo ideal 👋</p>
          <p>Soy el asistente virtual de Bárbara Bravo y Robert Jiménez. ¿En qué podemos ayudarte hoy? ¿Buscas comprar, alquilar o información de algún inmueble?</p>
        `,
        chips: [
          { label: '🏠 Apto en La Boyera', msg: 'Busco apartamento en venta en La Boyera' },
          { label: '🏢 Casa Alta Florida', msg: 'Casa comercial para alquiler en Alta Florida' },
          { label: '🍸 Anuncio del bar en El Hatillo', msg: 'Estoy interesado en el bar de El Hatillo' },
          { label: '💬 jaja muy caro', msg: 'si es una locura jaja' }
        ],
        respond: (raw) => {
          const q = raw.toLowerCase().trim();

          // Bar / no disponible (Blindaje sin inventar)
          if (q.includes('bar') || q.includes('discoteca') || q.includes('restaurante')) {
            return {
              html: `
                <p><strong>Ok, déjame consultar con un asesor para atenderte inmediatamente.</strong></p>
                <p class="extra-small text-primary mb-0 mt-1">
                  <em>[Seguridad]: El sistema no inventa inmuebles no catalogados. Envía alerta al WhatsApp de los asesores para atención personal.</em>
                </p>
              `,
              alert: {
                title: '¡Alerta Prioritaria Enviada!',
                desc: 'WhatsApp de aviso enviado a Robert (+58 414 311 5105) para responder este caso.',
                icon: 'bi-bell-fill'
              },
              delay: 800
            };
          }

          // Apartamento La Boyera
          if (q.includes('boyera') || q.includes('apto') || q.includes('apartamento')) {
            return {
              html: `
                <p>Hola, bienvenido a Tu techo ideal ✨</p>
                <p>Tenemos disponible en nuestro inventario:</p>
                <p><strong>Apartamento en La Boyera (El Hatillo)</strong><br>
                • <strong>Operación:</strong> Venta<br>
                • <strong>Precio:</strong> US$ 160.000<br>
                • <strong>Detalles:</strong> 125,90 m², 4 hab, 3 baños, 1 puesto, piso 14 con hermosa vista panorámica.</p>
                <p>¿Te gustaría coordinar una visita presencial con Bárbara o Robert para conocerlo?</p>
              `,
              alert: null,
              delay: 950
            };
          }

          // Casa Alta Florida
          if (q.includes('florida') || q.includes('casa')) {
            return {
              html: `
                <p>Hola, bienvenido a Tu techo ideal ✨</p>
                <p>Tenemos esta excelente opción:</p>
                <p><strong>Casa Comercial en Alta Florida</strong><br>
                • <strong>Operación:</strong> Alquiler (US$ 5.500) o Venta (US$ 600.000)<br>
                • <strong>Detalles:</strong> 850 m² de terreno, múltiples oficinas, estacionamiento para 10+ vehículos.</p>
                <p>¿Qué día te resulta cómodo para coordinar una visita?</p>
              `,
              alert: null,
              delay: 950
            };
          }

          // Casual / anti-gasto
          if (q.includes('locura') || q.includes('jaja') || q.includes('caro') || q.includes('broma')) {
            return {
              html: `
                <div class="p-2 rounded-3 bg-success-subtle text-success-emphasis border border-success-subtle small">
                  <strong>🛡️ Ahorro Automático de Saldo</strong>
                  <p class="mb-0 extra-small">El mensaje es charla casual. El sistema responde con amabilidad protegiendo tu presupuesto.</p>
                </div>
              `,
              alert: null,
              delay: 600
            };
          }

          return {
            html: `
              <p>Hola, con gusto te orientamos. Contamos con propiedades en <strong>El Hatillo, Alta Florida, Macaracuay, Los Naranjos y Las Mercedes</strong>.</p>
              <p>¿Buscas una opción para <strong>comprar</strong> o para <strong>alquilar</strong>?</p>
            `,
            alert: null,
            delay: 900
          };
        }
      }
    },

    'nexus-b2b': {
      category: 'Ventas B2B & CRM Kommo',
      title: 'Nexus B2B Solutions',
      subtitle: 'Calificador Automático de Prospectos y CRM',
      icon: '💼',
      description: 'Entrevista al cliente en WhatsApp sobre su presupuesto, tamaño de equipo y urgencia. Califica si es un cliente listo para comprar y lo anota en tu CRM para que tus vendedores lo llamen de inmediato.',
      benefits: [
        { strong: 'Filtro de prospectos:', text: 'Tus vendedores solo dedican tiempo a clientes con presupuesto real.' },
        { strong: 'Conexión a Kommo CRM:', text: 'Crea el negocio y asigna tareas al asesor correspondiente en 2 segundos.' },
        { strong: '+60% más cierres:', text: 'Elimina las demoras en contactar a los leads más calificados.' }
      ],
      metrics: [
        { val: '+60%', lbl: 'Cierres' },
        { val: '2 seg', lbl: 'Anotado en CRM' },
        { val: '100%', lbl: 'Calificados' }
      ],
      waMessage: 'Hola Depro Tech, me interesa el sistema de calificación B2B y conexión con CRM para mi empresa.',
      modal: {
        challenge: 'Vendedores saturados atendiendo curiosos sin presupuesto, descuidando a los prospectos calificados con compra inmediata.',
        solution: 'Cuestionario inteligente en WhatsApp que califica el interés y crea el negocio directamente en el CRM de la empresa.',
        results: [
          'Aumento del 60% en velocidad de respuesta comercial',
          'Asignación automática y ordenada entre ejecutivos',
          'Cero prospectos calientes desatendidos'
        ]
      },
      bot: {
        title: 'Calificador B2B',
        status: 'En línea • Nexus CRM Pipeline',
        avatar: '💼',
        greeting: `
          <p>Hola, bienvenido a Nexus Solutions 💼</p>
          <p>Soy el asistente comercial. Ayudamos a empresas a automatizar sus ventas con IA. Para darte la propuesta ideal, ¿cuántas personas forman tu equipo comercial actualmente?</p>
        `,
        chips: [
          { label: '👥 Equipo de 8 personas', msg: 'Somos un equipo de 8 personas' },
          { label: '💰 Presupuesto de $2,000', msg: 'Contamos con un presupuesto de $2,000' },
          { label: '⚡ Necesitamos empezar ya', msg: 'Es urgente, queremos implementar esta semana' },
          { label: '💬 Solo estoy mirando', msg: 'Solo estoy curioseando jaja' }
        ],
        respond: (raw) => {
          const q = raw.toLowerCase().trim();

          if (q.includes('8') || q.includes('equipo') || q.includes('personas')) {
            return {
              html: `
                <p>Excelente. Con un equipo de más de 5 personas, la <strong>asignación automática de prospectos</strong> evita que los leads queden sin responder.</p>
                <p>¿Qué canal les genera más consultas actualmente: WhatsApp, Instagram o llamadas?</p>
              `,
              alert: null,
              delay: 900
            };
          }

          if (q.includes('presupuesto') || q.includes('2000') || q.includes('$')) {
            return {
              html: `
                <p>Perfecto. Con ese presupuesto pueden acceder al <strong>Plan Completo de Automatización</strong> con bot en WhatsApp, conexión a CRM y alertas al equipo.</p>
                <p>¿Tienen ya un CRM como Kommo o desean que lo configuremos desde cero?</p>
              `,
              alert: null,
              delay: 900
            };
          }

          if (q.includes('urgente') || q.includes('ya') || q.includes('semana')) {
            return {
              html: `
                <p>Entendido. Por la alta prioridad, <strong>he calificado tu caso como Prospecto Caliente</strong>.</p>
                <p>Acabo de generar la ficha en el CRM y notifiqué al consultor comercial para contactarte hoy mismo.</p>
              `,
              alert: {
                title: '¡Prospecto Prioritario Anotado!',
                desc: 'Lead calificado con alta urgencia. Asignado a ejecutivo comercial en Kommo CRM.',
                icon: 'bi-check-circle-fill'
              },
              delay: 850
            };
          }

          if (q.includes('curioseando') || q.includes('mirando') || q.includes('jaja')) {
            return {
              html: `
                <div class="p-2 rounded-3 bg-light border small text-secondary">
                  <strong>Segmentación Automática:</strong>
                  <p class="mb-0 extra-small">Prospecto clasificado como informativo. Se le entrega material sin llamadas comerciales invasivas.</p>
                </div>
              `,
              alert: null,
              delay: 600
            };
          }

          return {
            html: `
              <p>Con gusto te orientamos. Cuéntanos cuál es el principal cuello de botella de ventas en tu empresa actualmente.</p>
            `,
            alert: null,
            delay: 850
          };
        }
      }
    },

    'fastcommerce': {
      category: 'Tiendas & Delivery',
      title: 'FastCommerce Express',
      subtitle: 'Toma de Pedidos y Catálogo por WhatsApp',
      icon: '🛍️',
      description: 'Permite a tus clientes consultar el menú o catálogo, armar pedidos con ingredientes o tallas, calcular el delivery por zona y recibir la orden lista para pagar en menos de 2 minutos.',
      benefits: [
        { strong: 'Pedidos en 2 minutos:', text: 'Sin llamadas ni esperas en caja en horas pico.' },
        { strong: 'Cálculo de delivery exacto:', text: 'Suma el precio del envío automáticamente según la dirección.' },
        { strong: 'Venta sugerida:', text: 'Ofrece bebidas, postres o complementos aumentando el ticket promedio.' }
      ],
      metrics: [
        { val: '2 min', lbl: 'Toma de Pedido' },
        { val: '-70%', lbl: 'Carga en Caja' },
        { val: '100%', lbl: 'Cálculo Exacto' }
      ],
      waMessage: 'Hola Depro Tech, me gustó el sistema de pedidos FastCommerce para mi negocio de comida/tienda.',
      modal: {
        challenge: 'Líneas de WhatsApp colapsadas en horas pico, clientes que abandonan por tardanza y errores al calcular cuentas manualmente.',
        solution: 'Asistente de pedidos que toma la orden, suma adicionales, calcula el envío y entrega los datos de pago al instante.',
        results: [
          'Reducción del 70% del tiempo de atención por pedido',
          'Cero errores en cuentas o ingredientes',
          'Envío de orden directamente a pantalla de despacho'
        ]
      },
      bot: {
        title: 'Pedidos Express',
        status: 'En línea • FastGourmet',
        avatar: '🛍️',
        greeting: `
          <p>¡Hola! Bienvenido a FastGourmet Express 🛍️🍕</p>
          <p>Soy tu asistente de pedidos automáticos. ¿Deseas ver las promociones de hoy o armar tu pedido para delivery?</p>
        `,
        chips: [
          { label: '🍕 Combo Familiar + Bebida', msg: 'Quiero el Combo Familiar con bebida' },
          { label: '🌱 ¿Tienen opciones vegetarianas?', msg: '¿Tienen opciones vegetarianas?' },
          { label: '🛵 ¿Costo a Las Mercedes?', msg: '¿Cuánto cuesta el delivery a Las Mercedes?' },
          { label: '💬 jaja qué rápido', msg: 'jaja qué rápido responde' }
        ],
        respond: (raw) => {
          const q = raw.toLowerCase().trim();

          if (q.includes('combo') || q.includes('familiar') || q.includes('pizza')) {
            return {
              html: `
                <p>¡Excelente elección! 🍕</p>
                <p><strong>Combo Familiar Express ($18.00):</strong><br>
                • 1 Pizza Familiar (8 porciones) con 2 ingredientes.<br>
                • 1 Refresco 1.5L frío.<br>
                • Salsas de la casa incluidas.</p>
                <p>¿Qué ingredientes prefieres: Jamón, Pepperoni, Champiñones o Maíz?</p>
              `,
              alert: null,
              delay: 900
            };
          }

          if (q.includes('vegetariana') || q.includes('veggie') || q.includes('carne')) {
            return {
              html: `
                <p>¡Sí, claro! 🌱</p>
                <p>Nuestra <strong>Pizza Primavera Veggie ($14.00)</strong> viene con mozzarella vegetal, champiñones, pimientos y rúcula fresca. 100% sin carnes.</p>
                <p>¿Deseas agregarla a tu pedido?</p>
              `,
              alert: null,
              delay: 900
            };
          }

          if (q.includes('delivery') || q.includes('mercedes') || q.includes('costo')) {
            return {
              html: `
                <p>El delivery a <strong>Las Mercedes</strong> cuesta <strong>$2.50</strong> (llega en 25 a 35 min) 🛵.</p>
                <p><strong>Resumen de tu cuenta:</strong><br>
                • Combo Familiar: $18.00<br>
                • Delivery: $2.50<br>
                • <strong>Total a pagar: $20.50</strong></p>
                <p>¿Prefieres pagar con Pago Móvil, Zelle o Efectivo?</p>
              `,
              alert: {
                title: '¡Orden #4920 Lista para Despacho!',
                desc: 'Pedido armado con total y zona calculada. Listo para confirmación de pago.',
                icon: 'bi-bag-check-fill'
              },
              delay: 850
            };
          }

          if (q.includes('rapido') || q.includes('rápido') || q.includes('jaja')) {
            return {
              html: `
                <p>¡Gracias! La meta es que no pases hambre esperando un menú. 😉 ¿Te gustaría que agreguemos algún postre a tu orden?</p>
              `,
              alert: null,
              delay: 600
            };
          }

          return {
            html: `
              <p>Con gusto te tomamos la orden. Indícanos qué te gustaría pedir hoy o dinos tu dirección para cotizarte el delivery.</p>
            `,
            alert: null,
            delay: 850
          };
        }
      }
    },

    'sentinel': {
      category: 'Soporte 24/7 & Asistencia',
      title: 'Sentinel 24/7 Support',
      subtitle: 'Mesa de Ayuda y Preguntas Frecuentes',
      icon: '🎧',
      description: 'Responde dudas frecuentes sobre contraseñas, pagos y horarios basándose en tus manuales. Si un cliente está frustrado o necesita ayuda humana, le pasa el caso a tu equipo inmediatamente.',
      benefits: [
        { strong: 'Resuelve el 80% de dudas:', text: 'Preguntas repetitivas respondidas al segundo sin cargar a tu personal.' },
        { strong: 'Cero respuestas erradas:', text: 'Solo responde lo que está certificado en tus políticas de atención.' },
        { strong: 'Pase a humano inteligente:', text: 'Detecta cuando el caso requiere atención especial de un supervisor.' }
      ],
      metrics: [
        { val: '80%', lbl: 'Dudas Resueltas' },
        { val: '< 5 min', lbl: 'Pase a Humano' },
        { val: '24/7', lbl: 'Disponibilidad' }
      ],
      waMessage: 'Hola Depro Tech, quiero automatizar el soporte al cliente de mi empresa con Sentinel 24/7.',
      modal: {
        challenge: 'Equipos de soporte desbordados respondiendo lo mismo cientos de veces al día y clientes molestos por lentitud.',
        solution: 'Bot de asistencia de primer nivel con pase a supervisor humano cuando detecta molestia o situaciones complejas.',
        results: [
          '80% de las consultas resueltas sin intervención humana',
          'Tiempo de espera reducido de horas a segundos',
          'Historial ordenado para cuando interviene un asesor'
        ]
      },
      bot: {
        title: 'Soporte y Ayuda',
        status: 'En línea • Asistencia Sentinel',
        avatar: '🎧',
        greeting: `
          <p>Hola, estás en el canal de Soporte y Asistencia 🎧</p>
          <p>¿En qué podemos ayudarte hoy? Indícanos tu consulta técnica o duda sobre tu cuenta.</p>
        `,
        chips: [
          { label: '🔑 Olvidé mi contraseña', msg: 'Olvidé mi contraseña de acceso' },
          { label: '💳 Mi pago falló', msg: 'El cobro de mi mensualidad falló hoy' },
          { label: '😡 Llevo 3 días esperando', msg: 'Llevo 3 días esperando y nadie responde' },
          { label: '💬 Hola buenos días', msg: 'Hola buenos días' }
        ],
        respond: (raw) => {
          const q = raw.toLowerCase().trim();

          if (q.includes('contraseña') || q.includes('clave') || q.includes('acceso')) {
            return {
              html: `
                <p><strong>Para restablecer tu contraseña:</strong></p>
                <p>1. Ve a la pantalla de ingreso y toca <em>"¿Olvidaste tu contraseña?"</em>.<br>
                2. Coloca tu correo registrado.<br>
                3. Recibirás un enlace seguro con validez de 15 minutos.</p>
                <p>Si no lo ves en tu bandeja, revisa la carpeta de Spam. ¿Pudiste recibirlo?</p>
              `,
              alert: null,
              delay: 900
            };
          }

          if (q.includes('pago') || q.includes('falló') || q.includes('tarjeta') || q.includes('cobro')) {
            return {
              html: `
                <p>Entendido. Si el cobro de tu tarjeta falló:</p>
                <p>• Tu cuenta tiene un <strong>plazo de gracia de 72 horas</strong> sin suspender tu servicio.<br>
                • Puedes actualizar tu método de pago ingresando en <em>Configuración > Facturación</em>.</p>
                <p>¿Deseas que reintentemos el cobro de inmediato?</p>
              `,
              alert: null,
              delay: 950
            };
          }

          if (q.includes('esperando') || q.includes('días') || q.includes('dias') || q.includes('nadie responde') || q.includes('estafa')) {
            return {
              html: `
                <p>Lamento mucho la demora ocasionada. <strong>He activado atención prioritaria en este momento</strong>.</p>
                <p>He abierto el <strong>Ticket Urgente #ST-892</strong> y silencié el bot. Un supervisor de soporte tomará esta conversación en menos de 5 minutos.</p>
              `,
              alert: {
                title: '¡Pase a Humano Activado!',
                desc: 'Caso escalado con alta prioridad. Notificación enviada al supervisor de turno.',
                icon: 'bi-exclamation-triangle-fill'
              },
              delay: 800
            };
          }

          if (q.includes('hola') || q.includes('buenos')) {
            return {
              html: `
                <p>¡Hola! Muy buenos días. Es un gusto saludarte. ¿En qué duda sobre la plataforma podemos ayudarte hoy?</p>
              `,
              alert: null,
              delay: 600
            };
          }

          return {
            html: `
              <p>Entendido. He registrado tu consulta. ¿Deseas que te pongamos en contacto con un asesor de soporte?</p>
            `,
            alert: null,
            delay: 850
          };
        }
      }
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

  function appendBotMessage(htmlContent, delayMs = 900, alertData = null) {
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

      if (alertData) {
        simAlertTitle.textContent = alertData.title;
        simAlertDesc.textContent = alertData.desc;
        simAlertIcon.className = `bi ${alertData.icon || 'bi-bell-fill'} fs-6`;
        simAlertBanner.classList.remove('d-none');
      } else {
        simAlertBanner.classList.add('d-none');
      }
    }, delayMs);
  }

  // ==========================================================================
  // SWITCH ACTIVE PROJECT (CHANGES EVERYTHING IN THE SAME SCREEN)
  // ==========================================================================
  function selectProject(key, shouldScroll = false) {
    const data = PROJECTS_DATA[key];
    if (!data) return;

    activeProjectKey = key;

    // 1. Update Left Card Info
    projectTitle.textContent = data.title;
    projectSubtitle.textContent = data.subtitle;
    projectMainIcon.textContent = data.icon;
    projectDescription.textContent = data.description;

    // Benefits list
    projectBenefitsList.innerHTML = '';
    data.benefits.forEach(b => {
      const li = document.createElement('li');
      li.className = 'd-flex align-items-start gap-2 small text-secondary';
      li.innerHTML = `
        <i class="bi bi-check-circle-fill text-success fs-6 mt-0"></i>
        <span><strong>${b.strong}</strong> ${b.text}</span>
      `;
      projectBenefitsList.appendChild(li);
    });

    // Metrics
    metric1Val.textContent = data.metrics[0].val;
    metric1Lbl.textContent = data.metrics[0].lbl;
    metric2Val.textContent = data.metrics[1].val;
    metric2Lbl.textContent = data.metrics[1].lbl;
    metric3Val.textContent = data.metrics[2].val;
    metric3Lbl.textContent = data.metrics[2].lbl;

    // WhatsApp link prefilled
    btnProjectWa.href = `https://wa.me/584143115105?text=${encodeURIComponent(data.waMessage)}`;

    // Update Modal Data
    modalProjectIcon.textContent = data.icon;
    modalProjectCategory.textContent = data.category;
    modalProjectTitle.textContent = data.title;
    modalProjectChallenge.textContent = data.modal.challenge;
    modalProjectSolution.textContent = data.modal.solution;
    modalProjectResults.innerHTML = '';
    data.modal.results.forEach(res => {
      const rLi = document.createElement('li');
      rLi.innerHTML = `✓ ${res}`;
      modalProjectResults.appendChild(rLi);
    });

    // 2. Update Phone Simulator Header & Bot
    const bot = data.bot;
    simBotTitle.textContent = bot.title;
    simBotStatus.textContent = bot.status;
    simAvatar.textContent = bot.avatar;

    // Reset Chat Messages
    chatBody.innerHTML = `
      <div class="chat-msg bot">
        <div class="msg-bubble">
          ${bot.greeting}
          <span class="msg-time">${getCurrentTime()}</span>
        </div>
      </div>
    `;

    // Hide Alert Banner
    simAlertBanner.classList.add('d-none');

    // Update Preset Chips
    chipsContainer.innerHTML = '';
    bot.chips.forEach(chip => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip-btn';
      btn.textContent = chip.label;
      btn.addEventListener('click', () => {
        appendUserMessage(chip.msg);
        handleUserMessage(chip.msg);
      });
      chipsContainer.appendChild(btn);
    });

    // Clear text input
    chatInput.value = '';

    // Update Tab active classes
    catalogTabs.forEach(tab => {
      if (tab.getAttribute('data-project') === key) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Optional scroll to simulator (for mobile view)
    if (shouldScroll) {
      const simEl = document.getElementById('simulador');
      if (simEl) {
        simEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  function handleUserMessage(text) {
    const project = PROJECTS_DATA[activeProjectKey];
    if (!project || !project.bot.respond) return;

    const result = project.bot.respond(text);
    appendBotMessage(result.html, result.delay || 900, result.alert);
  }

  // ==========================================================================
  // EVENT LISTENERS
  // ==========================================================================
  catalogTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-project');
      if (key) selectProject(key, false);
    });
  });

  btnFocusSim.addEventListener('click', () => {
    const simEl = document.getElementById('simulador');
    if (simEl) {
      simEl.scrollIntoView({ behavior: 'smooth' });
      chatInput.focus();
    }
  });

  btnResetChat.addEventListener('click', () => {
    selectProject(activeProjectKey, false);
  });

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    appendUserMessage(text);
    chatInput.value = '';
    handleUserMessage(text);
  });

  // Initialize with Tu Techo Ideal
  selectProject('techo-ideal', false);
});
