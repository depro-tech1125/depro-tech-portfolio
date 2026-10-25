const DEMO={
  name:'Asistente Comercial',
  status:'En línea · Demo',
  greeting:'Hola 👋<br><br>Soy una demostración de un asistente digital. Puedo orientar consultas generales y marcar una solicitud para atención humana.<br><br><b>¿Qué te gustaría consultar?</b>',
  chips:[
    ['💬 Quiero información','Quiero información sobre un servicio'],
    ['📋 Quiero cotizar','Quiero cotizar un proyecto'],
    ['📅 Quiero agendar','Quiero agendar una llamada'],
    ['👤 Hablar con una persona','Quiero hablar con una persona']
  ],
  process(text){
    const q=text.toLowerCase();
    if(q.includes('cotiz')||q.includes('precio')||q.includes('presupuesto')) return {html:'Claro. Para preparar una propuesta podemos conocer <b>qué necesitas, qué proceso quieres mejorar y cuál es el objetivo del proyecto</b>.<br><br>Si quieres, puedo marcar tu solicitud para atención personalizada.',alert:null};
    if(q.includes('agendar')||q.includes('llamada')||q.includes('reunion')) return {html:'Perfecto. La solicitud puede pasar a <b>atención humana</b> para coordinar fecha y hora según disponibilidad.',alert:{title:'Solicitud marcada',desc:'Una persona puede continuar el seguimiento.'}};
    if(q.includes('persona')||q.includes('asesor')||q.includes('humano')||q.includes('contact')) return {html:'Entendido. Voy a marcar esta conversación para <b>seguimiento de una persona</b>.',alert:{title:'Atención humana',desc:'La solicitud quedó preparada para seguimiento.'}};
    if(q.includes('servicio')||q.includes('informacion')||q.includes('información')||q.includes('sistema')||q.includes('web')) return {html:'Podemos desarrollar <b>webs, catálogos, sistemas de gestión, automatizaciones e integraciones</b> según la necesidad del negocio.<br><br>¿Quieres cotizar un proyecto o hablar con una persona?',alert:null};
    return {html:'Puedo orientarte sobre <b>desarrollo web, sistemas a medida, automatización e integraciones</b>.<br><br>También puedo marcar la conversación para atención humana.',alert:null};
  }
};

const $=s=>document.querySelector(s);
const chat=$('#chat'),chips=$('#chips'),form=$('#chat-form'),input=$('#chat-input'),alertBox=$('#alert-box');
function addMsg(html,type){const el=document.createElement('div');el.className='msg '+type;el.innerHTML=html+'<small>'+new Date().toLocaleTimeString('es-VE',{hour:'2-digit',minute:'2-digit'})+'</small>';chat.appendChild(el);chat.scrollTop=chat.scrollHeight}
function typing(){const el=document.createElement('div');el.className='typing';el.id='typing';el.innerHTML='<span></span><span></span><span></span>';chat.appendChild(el);chat.scrollTop=chat.scrollHeight;return el}
function showAlert(a){if(!a){alertBox.classList.add('hidden');return}$('#alert-title').textContent=a.title;$('#alert-desc').textContent=a.desc;alertBox.classList.remove('hidden')}
function escapeHtml(s){return s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}
function respond(text){if(!text.trim())return;addMsg(escapeHtml(text),'user');input.value='';const t=typing();setTimeout(()=>{t.remove();const r=DEMO.process(text);addMsg(r.html,'bot');showAlert(r.alert)},550+Math.min(text.length*10,400))}
function reset(){chat.innerHTML='';showAlert(null);addMsg(DEMO.greeting,'bot')}
DEMO.chips.forEach(([label,msg])=>{const b=document.createElement('button');b.type='button';b.className='chip';b.textContent=label;b.onclick=()=>respond(msg);chips.appendChild(b)});
form.addEventListener('submit',e=>{e.preventDefault();respond(input.value)});$('#reset-chat').addEventListener('click',reset);reset();
