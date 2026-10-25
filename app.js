// ==========================================================================
// DEPRO TECH - SISTEMAS AUTOMATIZADOS DE ATENCIÓN AL CLIENTE
// Catálogo Interactivo & Simulador en Vivo
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Elementos de la Tarjeta Izquierda
  const projectTag = document.getElementById('project-tag');
  const projectSystemName = document.getElementById('project-system-name');
  const projectClientName = document.getElementById('project-client-name');
  const projectIcon = document.getElementById('project-icon');
  const projectSummary = document.getElementById('project-summary');
  const projectPoints = document.getElementById('project-points');
  const btnQuoteSystem = document.getElementById('btn-quote-system');
  const projectTabs = document.querySelectorAll('#project-tabs button');

  // Elementos del Teléfono (Simulador WhatsApp)
  const phoneAvatar = document.getElementById('phone-avatar');
  const phoneBotName = document.getElementById('phone-bot-name');
  const phoneBotStatus = document.getElementById('phone-bot-status');
  const btnPhoneReset = document.getElementById('btn-phone-reset');
  const phoneAlertBar = document.getElementById('phone-alert-bar');
  const phoneAlertTitle = document.getElementById('phone-alert-title');
  const phoneAlertDesc = document.getElementById('phone-alert-desc');
  const phoneAlertIcon = document.getElementById('phone-alert-icon');
  const phoneChatScreen = document.getElementById('phone-chat-screen');
  const phoneChipsContainer = document.getElementById('phone-chips-container');
  const phoneChatForm = document.getElementById('phone-chat-form');
  const phoneChatInput = document.getElementById('phone-chat-input');

  let activeProject = 'techo-ideal';

  // ==========================================================================
  // DATOS DE LOS SISTEMAS AUTOMATIZADOS (LENGUAJE SENCILLO PARA CLIENTES)
  // ==========================================================================
  const SYSTEMS = {
    'techo-ideal': {
      systemName: 'Sistema Automatizado para Inmobiliarias',
      clientName: 'Caso real: Tu Techo Ideal C.A. (Caracas)',
      icon: '🏢',
      tag: '✓ Sistema Activo en Producción',
      summary: 'Atiende a clientes que buscan comprar o alquilar. Busca en la lista de propiedades disponibles en tiempo real, entrega precios y fotos, y avisa de inmediato al vendedor cuando un cliente quiere agendar una visita.',
      points: [
        { strong: 'Responde en 3 segundos:', text: 'Atiende prospectos que llegan de Instagram o WhatsApp al instante.' },
        { strong: 'No inventa nada:', text: 'Solo ofrece inmuebles registrados en la lista real de la empresa.' },
        { strong: 'Aviso directo al vendedor:', text: 'Cuando el cliente quiere agendar visita, le llega un WhatsApp al asesor.' }
      ],
      waMessage: 'Hola Depro Tech, vi el sistema automatizado de Tu Techo Ideal y me gustaría uno similar para mi inmobiliaria.',
      phone: {
        botName: 'Asistente Inmobiliario',
        botStatus: 'En línea • Tu Techo Ideal',
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
        process: (raw) => {
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
                title: '¡Alerta al Asesor Enviada!',
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
      systemName: 'Sistema Automatizado para Empresas y Servicios',
      clientName: 'Caso: Nexus B2B (Calificación de Clientes & CRM)',
      icon: '💼',
      tag: '✓ Calificación & CRM',
      summary: 'Entrevista al cliente en WhatsApp sobre su presupuesto, tamaño de equipo y urgencia. Califica si es un cliente listo para comprar y lo anota en tu CRM para que tus vendedores lo llamen de inmediato.',
      points: [
        { strong: 'Filtra curiosos:', text: 'Tus vendedores solo dedican tiempo a clientes con presupuesto real.' },
        { strong: 'Se anota en tu CRM:', text: 'Crea el prospecto y le asigna una tarea a tu asesor en 2 segundos.' },
        { strong: '+60% más cierres:', text: 'Elimina las demoras en responder a los clientes con compra urgente.' }
      ],
      waMessage: 'Hola Depro Tech, me interesa un sistema para calificar prospectos y conectarlo con mi CRM.',
      phone: {
        botName: 'Calificador de Clientes',
        botStatus: 'En línea • Nexus CRM Pipeline',
        avatar: '💼',
        greeting: `
          <p>Hola, bienvenido a Nexus Solutions 💼</p>
          <p>Soy el asistente comercial. Ayudamos a empresas a automatizar sus ventas con IA. Para darte la propuesta ideal, ¿cuántas personas forman tu equipo comercial actualmente?</p>
        `,
        chips: [
          { label: '👥 Equipo de 8 personas', msg: 'Somos un equipo de 8 personas' },
          { label: '💰 Presupuesto de $2,000', msg: 'Contamos con un presupuesto de $2,000' },
          { label: '⚡ Es urgente implementar ya', msg: 'Es urgente, queremos implementar esta semana' },
          { label: '💬 Solo estoy mirando', msg: 'Solo estoy curioseando jaja' }
        ],
        process: (raw) => {
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
      systemName: 'Sistema Automatizado para Tiendas y Comida',
      clientName: 'Caso: FastGourmet (Pedidos & Delivery)',
      icon: '🛍️',
      tag: '✓ Pedidos & Delivery',
      summary: 'Permite a tus clientes consultar el menú o catálogo, armar pedidos con ingredientes o tallas, calcular el delivery por zona y recibir la orden lista para pagar en menos de 2 minutos.',
      points: [
        { strong: 'Pedidos en 2 minutos:', text: 'Sin llamadas ni clientes esperando en horas pico.' },
        { strong: 'Calcula el envío exacto:', text: 'Suma el precio del delivery automáticamente según la zona.' },
        { strong: 'Ofrece adicionales:', text: 'Sugiere bebidas, postres o salsas aumentando el ticket de venta.' }
      ],
      waMessage: 'Hola Depro Tech, me gustaría un sistema de pedidos por WhatsApp para mi negocio de comida o tienda.',
      phone: {
        botName: 'Pedidos y Menú',
        botStatus: 'En línea • FastGourmet',
        avatar: '🛍️',
        greeting: `
          <p>¡Hola! Bienvenido a FastGourmet Express 🛍️🍕</p>
          <p>Soy tu asistente de pedidos automáticos. ¿Deseas ver las promociones de hoy o armar tu pedido para delivery?</p>
        `,
        chips: [
          { label: '🍕 Combo Familiar + Bebida', msg: 'Quiero el Combo Familiar con bebida' },
          { label: '🌱 ¿Opciones vegetarianas?', msg: '¿Tienen opciones vegetarianas?' },
          { label: '🛵 ¿Costo a Las Mercedes?', msg: '¿Cuánto cuesta el delivery a Las Mercedes?' },
          { label: '💬 jaja qué rápido', msg: 'jaja qué rápido responde' }
        ],
        process: (raw) => {
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
      systemName: 'Sistema Automatizado para Soporte y Dudas',
      clientName: 'Caso: Sentinel (Mesa de Ayuda 24/7)',
      icon: '🎧',
      tag: '✓ Soporte y Ayuda',
      summary: 'Responde dudas frecuentes sobre contraseñas, pagos y horarios basándose en tus manuales. Si un cliente está frustrado o necesita ayuda humana, le pasa el caso a tu equipo inmediatamente.',
      points: [
        { strong: 'Resuelve el 80% de dudas:', text: 'Preguntas repetitivas respondidas al segundo sin cargar a tu personal.' },
        { strong: 'Cero respuestas erradas:', text: 'Solo responde lo que está certificado en tus políticas de atención.' },
        { strong: 'Pase a humano inteligente:', text: 'Detecta cuando el caso requiere atención especial de un supervisor.' }
      ],
      waMessage: 'Hola Depro Tech, quiero un sistema automatizado para soporte y atención al cliente en mi empresa.',
      phone: {
        botName: 'Soporte y Ayuda',
        botStatus: 'En línea • Sentinel 24/7',
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
        process: (raw) => {
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
  // HELPERS
  // ==========================================================================
  function getCurrentTime() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function scrollChat() {
    phoneChatScreen.scrollTop = phoneChatScreen.scrollHeight;
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.innerText = string;
    return div.innerHTML;
  }

  function appendUserMsg(text) {
    const el = document.createElement('div');
    el.className = 'chat-msg user';
    el.innerHTML = `
      <div class="msg-bubble">
        <p>${escapeHtml(text)}</p>
        <span class="msg-time">${getCurrentTime()}</span>
      </div>
    `;
    phoneChatScreen.appendChild(el);
    scrollChat();
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'chat-msg bot typing-msg';
    el.id = 'typing-indicator';
    el.innerHTML = `
      <div class="msg-bubble">
        <div class="typing-dots">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    phoneChatScreen.appendChild(el);
    scrollChat();
  }

  function hideTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  }

  function appendBotMsg(html, delay = 850, alertData = null) {
    showTyping();

    setTimeout(() => {
      hideTyping();
      const el = document.createElement('div');
      el.className = 'chat-msg bot';
      el.innerHTML = `
        <div class="msg-bubble">
          ${html}
          <span class="msg-time">${getCurrentTime()}</span>
        </div>
      `;
      phoneChatScreen.appendChild(el);
      scrollChat();

      if (alertData) {
        phoneAlertTitle.textContent = alertData.title;
        phoneAlertDesc.textContent = alertData.desc;
        phoneAlertIcon.className = `bi ${alertData.icon || 'bi-bell-fill'} fs-6`;
        phoneAlertBar.classList.remove('d-none');
      } else {
        phoneAlertBar.classList.add('d-none');
      }
    }, delay);
  }

  // ==========================================================================
  // CAMBIAR DE SISTEMA (ACTUALIZA TODO EN LA MISMA PANTALLA)
  // ==========================================================================
  function loadSystem(key) {
    const item = SYSTEMS[key];
    if (!item) return;

    activeProject = key;

    // Actualizar Tarjeta Izquierda
    projectTag.textContent = item.tag;
    projectSystemName.textContent = item.systemName;
    projectClientName.textContent = item.clientName;
    projectIcon.textContent = item.icon;
    projectSummary.textContent = item.summary;

    projectPoints.innerHTML = '';
    item.points.forEach(pt => {
      const li = document.createElement('li');
      li.className = 'd-flex align-items-start gap-2 small text-secondary';
      li.innerHTML = `
        <i class="bi bi-check-circle-fill text-success fs-6 mt-0"></i>
        <span><strong>${pt.strong}</strong> ${pt.text}</span>
      `;
      projectPoints.appendChild(li);
    });

    btnQuoteSystem.href = `https://wa.me/584143115105?text=${encodeURIComponent(item.waMessage)}`;

    // Actualizar Teléfono
    phoneAvatar.textContent = item.phone.avatar;
    phoneBotName.textContent = item.phone.botName;
    phoneBotStatus.textContent = item.phone.botStatus;

    phoneChatScreen.innerHTML = `
      <div class="chat-msg bot">
        <div class="msg-bubble">
          ${item.phone.greeting}
          <span class="msg-time">${getCurrentTime()}</span>
        </div>
      </div>
    `;

    phoneAlertBar.classList.add('d-none');

    // Cargar Chips de preguntas rápidas
    phoneChipsContainer.innerHTML = '';
    item.phone.chips.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip-btn';
      btn.textContent = c.label;
      btn.addEventListener('click', () => {
        appendUserMsg(c.msg);
        processUserMsg(c.msg);
      });
      phoneChipsContainer.appendChild(btn);
    });

    phoneChatInput.value = '';

    // Actualizar Pestañas Activas
    projectTabs.forEach(tab => {
      if (tab.getAttribute('data-project') === key) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }

  function processUserMsg(text) {
    const item = SYSTEMS[activeProject];
    if (!item || !item.phone.process) return;

    const res = item.phone.process(text);
    appendBotMsg(res.html, res.delay || 850, res.alert);
  }

  // ==========================================================================
  // EVENTOS
  // ==========================================================================
  projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-project');
      if (key) loadSystem(key);
    });
  });

  btnPhoneReset.addEventListener('click', () => {
    loadSystem(activeProject);
  });

  phoneChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = phoneChatInput.value.trim();
    if (!text) return;

    appendUserMsg(text);
    phoneChatInput.value = '';
    processUserMsg(text);
  });

  // Inicializar en Tu Techo Ideal
  loadSystem('techo-ideal');
});
