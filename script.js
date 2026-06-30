/* Bloom CRM 3.0 reparado - código limpio */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const KEY="bloom_crm_3_state"; const SUPABASE_URL="https://wmvalzkkoivfwhhwhplw.supabase.co"; const SUPABASE_KEY="sb_publishable_fH2h9fGmXxTT5b9LMCfeQg_80RawgWH"; const CLOUD_ID="bloom-crm-3-main";
const icons={home:'<svg viewBox="0 0 24 24"><path d="M4 10.6 12 4l8 6.6V20h-6v-5h-4v5H4Z"/></svg>',building:'<svg viewBox="0 0 24 24"><path d="M5 21V5h14v16M8 9h2M14 9h2M8 13h2M14 13h2M3 21h18"/></svg>',student:'<svg viewBox="0 0 24 24"><path d="M12 4 3 8.5 12 13l9-4.5Z"/><path d="M6 11v5c2 2 10 2 12 0v-5"/></svg>',file:'<svg viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',folder:'<svg viewBox="0 0 24 24"><path d="M3 7h7l2 2h9v10H3Z"/></svg>',archive:'<svg viewBox="0 0 24 24"><path d="M3 7h18v4H3Z"/><path d="M5 11h14l-2 8H7Z"/></svg>',phone:'<svg viewBox="0 0 24 24"><path d="M6 4l4 4-2 2c1.5 3 3.5 5 6.5 6.5l2-2 4 4-2 3C10 20 4 14 3 6Z"/></svg>',mail:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 8 8 5 8-5"/></svg>',calendar:'<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>',chart:'<svg viewBox="0 0 24 24"><path d="M4 20h16M7 17V9M12 17V5M17 17v-6"/></svg>',settings:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M4 12h2M18 12h2M12 4v2M12 18v2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4"/></svg>',search:'<svg viewBox="0 0 24 24"><path d="m21 21-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"/></svg>',users:'<svg viewBox="0 0 24 24"><circle cx="9" cy="9" r="3"/><path d="M3 20c1-4 11-4 12 0"/><circle cx="17" cy="10" r="2"/><path d="M15 16c2 0 4 1 5 4"/></svg>'};
function uid(){return Date.now()+Math.floor(Math.random()*9999)} function today(){return new Date().toISOString().slice(0,10)} function datePlus(n){const d=new Date();d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)} function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))} function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),1800)} function fileToData(file){return new Promise(res=>{if(!file)return res(null);const r=new FileReader();r.onload=()=>res({name:file.name,type:file.type,size:file.size,data:r.result});r.readAsDataURL(file)})}
const seed={empresas:[{id:uid(),nombre:"Deloitte",sector:"Consultoría",isla:"Gran Canaria",ciudad:"Las Palmas",estado:"nueva",prioridad:"alta",contacto:"Laura Pérez",telefono:"928000001",email:"rrhh@deloitte.es",notas:"Potencial para administración y finanzas"},{id:uid()+1,nombre:"AON",sector:"Seguros",isla:"Gran Canaria",ciudad:"Las Palmas",estado:"contactada",prioridad:"alta",contacto:"Marta Sosa",telefono:"928000002",email:"canarias@aon.es",notas:"Enviar convenio"},{id:uid()+2,nombre:"EY",sector:"Consultoría",isla:"Gran Canaria",ciudad:"Las Palmas",estado:"interesada",prioridad:"media",contacto:"Javier Martín",telefono:"928000003",email:"talent@ey.es",notas:"Interesados"},{id:uid()+3,nombre:"Domingo Alonso",sector:"Automoción",isla:"Gran Canaria",ciudad:"Las Palmas",estado:"convenio",prioridad:"alta",contacto:"Beatriz Vega",telefono:"928000005",email:"personas@domingoalonso.com",notas:"Convenio enviado"},{id:uid()+4,nombre:"Clínica Dental",sector:"Salud",isla:"Gran Canaria",ciudad:"Las Palmas",estado:"activa",prioridad:"baja",contacto:"Sara González",telefono:"928000006",email:"info@clinicadental.es",notas:"Prácticas activas"}],alumnos:[{id:uid()+10,nombre:"María López",telefono:"600000001",email:"maria@email.com",direccion:"Las Palmas",nss:"123456789012",estado:"sin asignar",empresa:"",inicio:"",fin:"",tutor:"",notas:"",foto:null,curriculum:null},{id:uid()+11,nombre:"Juan Pérez",telefono:"600000002",email:"juan@email.com",direccion:"Telde",nss:"223456789012",estado:"prácticas",empresa:"Clínica Dental",inicio:today(),fin:datePlus(60),tutor:"Sara González",notas:"Buen progreso",foto:null,curriculum:null}],convenios:[{id:uid()+20,empresa:"AON",centro:"Centro educativo",inicio:today(),fin:datePlus(90),tutorEmpresa:"Marta Sosa",tutorCentro:"María García",estado:"pendiente",anexos:[]},{id:uid()+21,empresa:"Domingo Alonso",centro:"Centro educativo",inicio:today(),fin:datePlus(100),tutorEmpresa:"Beatriz Vega",tutorCentro:"María García",estado:"enviado",anexos:[]}],documentos:[],carpetas:[{id:"all",nombre:"Todas"},{id:"sin",nombre:"Sin carpeta"},{id:"curso",nombre:"Curso 2025/26"},{id:"conv",nombre:"Convenios"}],seguimientos:[{id:uid()+40,fecha:today(),empresa:"Deloitte",tipo:"llamada",resultado:"Pendiente respuesta",proxima:"Llamar a Deloitte",fechaProxima:today(),responsable:""},{id:uid()+41,fecha:today(),empresa:"AON",tipo:"email",resultado:"Convenio enviado",proxima:"Revisar firma",fechaProxima:datePlus(2),responsable:""}],emails:[{id:uid()+50,nombre:"Primer contacto",asunto:"Colaboración para prácticas",cuerpo:"Buenos días,\n\nNos gustaría valorar una posible colaboración para prácticas.\n\nUn saludo."}],actividad:[]};
let state=JSON.parse(localStorage.getItem(KEY)||"null")||seed; let current="dashboard"; let activeFolder="all"; let selectedDate=today(); let draggedCompany=null; let cloudTimer=null;
function save(){localStorage.setItem(KEY,JSON.stringify(state));setSync("Guardando...","saving");clearTimeout(cloudTimer);cloudTimer=setTimeout(()=>saveCloud(true),1000);setTimeout(()=>setSync("Sincronizado","ok"),400)} function log(t){state.actividad.unshift({id:uid(),txt:t,fecha:new Date().toISOString()});state.actividad=state.actividad.slice(0,50)} function setSync(t,c="ok"){const el=$("#syncStatus");if(el){el.className="sync "+c;el.innerHTML=`<i></i> ${t}`}}
function show(v){current=v;$$(".view").forEach(x=>x.classList.toggle("active",x.id===v));$$("#nav button").forEach(b=>b.classList.toggle("active",b.dataset.view===v));render();if(innerWidth<820)$("#sidebar").classList.remove("open")} function pageHead(p,h,s){return `<div class="page-head"><div><p>${p}</p><h2>${h}</h2><span>${s}</span></div><button class="date-pill">${new Date().toLocaleDateString("es-ES",{day:"numeric",month:"long",year:"numeric"})}</button></div>`}
function render(){updateIcons();updatePlant();renderDashboard();renderEmpresas();renderAlumnos();renderConvenios();renderExpedientes();renderDocumentos();renderSeguimiento();renderEmails();renderAgenda();renderReportes();renderAjustes();renderNotifications();setupPipeline()}
function updateIcons(){$$("[data-i]").forEach(s=>s.innerHTML=icons[s.dataset.i]||"")} function updatePlant(){const un=state.alumnos.filter(a=>!a.empresa).length, pen=state.convenios.filter(c=>c.estado!=="firmado"&&c.estado!=="completo").length;$("#plantTitle").textContent=un?`${un} alumno${un>1?"s":""} esperan una oportunidad.`:pen?`${pen} convenio${pen>1?"s":""} puede${pen>1?"n":""} florecer.`:"Que hoy florezcan nuevas oportunidades.";$("#plantMessage").textContent=un?"Una buena asignación puede cambiarlo todo.":pen?"Revisar lo pendiente también es avanzar.":"Cada pequeño paso también cuenta."}
function dashboardData(){return{sinContacto:state.empresas.filter(e=>!state.seguimientos.some(s=>s.empresa===e.nombre)).length,convenios:state.convenios.filter(c=>c.estado!=="firmado").length,alumnos:state.alumnos.filter(a=>!a.empresa).length,practicas:state.alumnos.filter(a=>a.estado==="prácticas").length,llamadas:state.seguimientos.filter(s=>s.tipo==="llamada").length,reuniones:state.seguimientos.filter(s=>s.tipo==="reunión").length,recordatorios:state.seguimientos.filter(s=>s.fechaProxima>=today()).length}} function kpi(l,v,view,color,icon){return `<article class="kpi card" onclick="show('${view}')"><div class="kpi-icon ${color}">${icons[icon]}</div><strong>${v}</strong><span>${l}</span></article>`}
function renderDashboard(){const d=dashboardData();$("#dashboard").innerHTML=pageHead("Dashboard","Dashboard",greeting())+`<section class="kpi-grid">${kpi("Empresas sin contactar",d.sinContacto,"empresas","pink","users")}${kpi("Convenios pendientes",d.convenios,"convenios","orange","file")}${kpi("Alumnos sin empresa",d.alumnos,"alumnos","blue","student")}${kpi("Prácticas activas",d.practicas,"expedientes","green","calendar")}${kpi("Llamadas registradas",d.llamadas,"seguimiento","purple","phone")}${kpi("Reuniones",d.reuniones,"agenda","blue","calendar")}${kpi("Recordatorios activos",d.recordatorios,"agenda","pink","calendar")}</section><section class="dashboard-grid"><div><section class="card pipeline"><div class="section-head"><div><p>Pipeline de empresas</p><h3>Arrastra empresas entre estados</h3></div><button onclick="show('empresas')">Ver empresas</button></div><div class="mini-pipeline">${renderMiniPipeline()}</div></section><div class="lower-grid"><section class="card"><div class="section-head"><div><p>Actividad reciente</p><h3>Últimos movimientos</h3></div></div><div class="list">${state.actividad.slice(0,5).map(a=>`<article class="item"><div><b>${esc(a.txt)}</b><p>${new Date(a.fecha).toLocaleString("es-ES")}</p></div></article>`).join("")||"<p>Sin actividad reciente.</p>"}</div></section><section class="card"><div class="section-head"><div><p>Documentos pendientes</p><h3>Revisión documental</h3></div><button onclick="show('documentos')">Ver todos</button></div><div class="list">${state.documentos.filter(x=>x.estado!=="firmado").slice(0,5).map(docItem).join("")||"<p>Sin documentos pendientes.</p>"}</div></section></div></div><aside class="right-stack"><section class="card calendar-card"><div class="section-head"><div><p>Calendario</p><h3>Este mes</h3></div><button onclick="show('agenda')">Completo</button></div>${miniCalendar()}</section><section class="card actions-card"><div class="section-head"><div><p>Próximas acciones</p><h3>Hoy y próximos días</h3></div></div><div class="list">${state.seguimientos.filter(s=>s.fechaProxima>=today()).slice(0,5).map(actionItem).join("")||"<p>No hay pendientes.</p>"}</div></section></aside></section>`}
function greeting(){const h=new Date().getHours();return `${h<14?"Buenos días":h<21?"Buenas tardes":"Buenas noches"} 🌸 | Aquí tienes tu resumen de hoy`}
function renderMiniPipeline(){const estados=[["nueva","Nueva"],["contactada","Contactada"],["interesada","Interesada"],["convenio","Convenio"],["activa","Activa"]];return estados.map(([st,label],idx)=>{const companies=state.empresas.filter(e=>e.estado===st);return `<div class="pipe-col drop-zone" data-status="${st}"><h4>${label}<span>${companies.length}</span></h4><div class="drop-msg">Suelta aquí</div>${companies.map(e=>`<div class="company-card" draggable="true" data-company="${e.id}"><b>${esc(e.nombre)}</b><small>${esc(e.sector)} · ${esc(e.contacto)}</small><em>${esc(e.prioridad||"media")}</em><div class="pipeline-actions">${idx>0?`<button onclick="event.stopPropagation();moveCompany(${e.id},'${estados[idx-1][0]}')">←</button>`:""}${idx<estados.length-1?`<button onclick="event.stopPropagation();moveCompany(${e.id},'${estados[idx+1][0]}')">→</button>`:""}</div></div>`).join("")||`<p class="empty-pipeline">Sin empresas</p>`}</div>`}).join("")}
function setupPipeline(){$$(".company-card[draggable]").forEach(card=>{card.ondragstart=e=>{draggedCompany=Number(card.dataset.company);e.dataTransfer.setData("text/plain",String(draggedCompany));card.classList.add("dragging-card");document.body.classList.add("dragging")};card.ondragend=()=>{card.classList.remove("dragging-card");document.body.classList.remove("dragging");$$(".drop-zone").forEach(z=>z.classList.remove("drag-over"));draggedCompany=null}});$$(".drop-zone").forEach(zone=>{zone.ondragover=e=>{e.preventDefault();zone.classList.add("drag-over")};zone.ondragleave=e=>{if(!zone.contains(e.relatedTarget))zone.classList.remove("drag-over")};zone.ondrop=e=>{e.preventDefault();const cid=Number(e.dataTransfer.getData("text/plain")||draggedCompany);moveCompany(cid,zone.dataset.status);zone.classList.remove("drag-over")}})}
function moveCompany(cid,status){const e=state.empresas.find(x=>Number(x.id)===Number(cid));if(!e||e.estado===status)return;const old=e.estado;e.estado=status;log(`Empresa actualizada: ${e.nombre} pasó de ${old} a ${status}`);save();render();toast(`${e.nombre} movida a ${status} 🌸`)}
function dayEvents(date){const ev=[];state.seguimientos.forEach(s=>{if(s.fecha===date||s.fechaProxima===date)ev.push({kind:"Seguimiento",title:s.proxima||s.resultado||s.tipo,sub:`${s.empresa} · ${s.tipo}`,view:"seguimiento",color:"pink"})});state.convenios.forEach(c=>{if(c.inicio===date||c.fin===date)ev.push({kind:c.inicio===date?"Inicio convenio":"Fin convenio",title:c.empresa,sub:`${c.estado}`,view:"convenios",color:"orange"})});state.alumnos.forEach(a=>{if(a.inicio===date||a.fin===date)ev.push({kind:a.inicio===date?"Inicio prácticas":"Fin prácticas",title:a.nombre,sub:a.empresa||"Sin empresa",view:"expedientes",color:"blue"})});state.documentos.forEach(d=>{if(d.fecha===date)ev.push({kind:"Documento",title:d.nombre,sub:`${d.tipo} · ${d.estado}`,view:"documentos",color:"green"})});return ev}
function miniCalendar(sel=selectedDate){const base=new Date((sel||today())+"T12:00:00"),y=base.getFullYear(),m=base.getMonth(),first=(new Date(y,m,1).getDay()+6)%7,last=new Date(y,m+1,0).getDate(),prefix=`${y}-${String(m+1).padStart(2,"0")}`;let cells="";for(let i=0;i<first;i++)cells+=`<span class="day empty"></span>`;for(let d=1;d<=last;d++){const date=`${prefix}-${String(d).padStart(2,"0")}`,count=dayEvents(date).length;cells+=`<button class="day ${count?"has":""} ${date===sel?"selected":""}" onclick="openDay('${date}')"><span>${d}</span>${count?`<b>${count}</b>`:""}</button>`}return `<div class="calendar-weekdays"><span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span></div><div class="calendar-grid">${cells}</div>`}
function openDay(date){selectedDate=date;show("agenda");setTimeout(()=>$(".day-detail")?.scrollIntoView({behavior:"smooth"}),30)} function actionItem(s){return `<article class="item"><div><b>${esc(s.proxima||s.resultado)}</b><p>${esc(s.empresa)} · ${esc(s.tipo)}</p></div><span>${esc(s.fechaProxima)}</span></article>`} function docItem(d){return `<article class="item"><div><b>${esc(d.nombre)}</b><p>${esc(d.tipo)} · ${esc(d.empresa||d.alumno||"General")}</p></div><span>${esc(d.estado)}</span></article>`}
function renderEmpresas(){const q=$("#empresaSearch")?.value?.toLowerCase()||"";$("#empresas").innerHTML=pageHead("Empresas","Empresas","CRM de empresas colaboradoras")+`<section class="card table-card"><div class="toolbar"><input id="empresaSearch" placeholder="Buscar empresa..." oninput="renderEmpresas()" value="${esc(q)}"><button class="primary" onclick="openEmpresa()">Añadir empresa</button></div><table><thead><tr><th>Empresa</th><th>Sector</th><th>Contacto</th><th>Estado</th><th>Prioridad</th><th></th></tr></thead><tbody>${state.empresas.filter(e=>!q||JSON.stringify(e).toLowerCase().includes(q)).map(e=>`<tr><td><b>${esc(e.nombre)}</b><br><small>${esc(e.ciudad)} · ${esc(e.isla)}</small></td><td>${esc(e.sector)}</td><td>${esc(e.contacto)}<br><small>${esc(e.telefono)} · ${esc(e.email)}</small></td><td><span class="badge">${esc(e.estado)}</span></td><td>${esc(e.prioridad)}</td><td class="row-actions"><button onclick="openEmpresa(${e.id})">Editar</button><button onclick="delEmpresa(${e.id})">Eliminar</button></td></tr>`).join("")}</tbody></table></section>`}
function openEmpresa(eid=null){const e=state.empresas.find(x=>x.id===eid)||{nombre:"",sector:"",isla:"Gran Canaria",ciudad:"Las Palmas",estado:"nueva",prioridad:"media",contacto:"",telefono:"",email:"",notas:""};modal("Empresa",`<form id="empresaForm" class="form-grid"><input name="nombre" value="${esc(e.nombre)}" placeholder="Nombre" required><input name="sector" value="${esc(e.sector)}" placeholder="Sector"><input name="ciudad" value="${esc(e.ciudad)}" placeholder="Ciudad"><input name="isla" value="${esc(e.isla)}" placeholder="Isla"><input name="contacto" value="${esc(e.contacto)}" placeholder="Contacto"><input name="telefono" value="${esc(e.telefono)}" placeholder="Teléfono"><input name="email" value="${esc(e.email)}" placeholder="Email"><select name="estado">${["nueva","contactada","interesada","convenio","activa","descartada"].map(x=>`<option ${e.estado===x?"selected":""}>${x}</option>`).join("")}</select><select name="prioridad">${["alta","media","baja"].map(x=>`<option ${e.prioridad===x?"selected":""}>${x}</option>`).join("")}</select><textarea name="notas" placeholder="Notas">${esc(e.notas)}</textarea></form>`,()=>{Object.assign(e,Object.fromEntries(new FormData($("#empresaForm")).entries()));if(!eid){e.id=uid();state.empresas.unshift(e)}log(`Empresa guardada: ${e.nombre}`);save();closeModal();render()})} function delEmpresa(id){if(confirm("¿Eliminar empresa?")){state.empresas=state.empresas.filter(e=>e.id!==id);save();render()}}
function renderAlumnos(){$("#alumnos").innerHTML=pageHead("Alumnos","Alumnos","Ficha completa del alumnado")+`<section class="card table-card"><div class="toolbar"><button class="primary" onclick="openAlumno()">Añadir alumno</button></div><table><thead><tr><th>Alumno</th><th>Contacto</th><th>Empresa</th><th>Estado</th><th>Archivos</th><th></th></tr></thead><tbody>${state.alumnos.map(a=>`<tr class="student-row" onclick="openStudentProfile(${a.id})"><td><div class="student-cell"><div class="student-avatar">${a.foto?.data?`<img src="${a.foto.data}">`:`<span>${esc((a.nombre||"A")[0])}</span>`}</div><div><b>${esc(a.nombre)}</b><br><small>NSS: ${esc(a.nss||"")}</small></div></div></td><td>${esc(a.telefono)}<br><small>${esc(a.email)}</small></td><td>${esc(a.empresa||"Sin empresa")}</td><td><span class="badge">${esc(a.estado)}</span></td><td onclick="event.stopPropagation()"><div class="student-files">${a.foto?.data?`<button onclick="previewAnyFile(state.alumnos.find(x=>x.id===${a.id}).foto,'Foto')">Foto</button>`:`<span>Sin foto</span>`}${a.curriculum?.data?`<button onclick="previewAnyFile(state.alumnos.find(x=>x.id===${a.id}).curriculum,'CV')">CV</button>`:`<span>Sin CV</span>`}</div></td><td class="row-actions" onclick="event.stopPropagation()"><button onclick="openAlumno(${a.id})">Editar</button><button onclick="delAlumno(${a.id})">Eliminar</button></td></tr>`).join("")}</tbody></table></section>`}
function openStudentProfile(aid){const a=state.alumnos.find(x=>x.id===aid);if(!a)return;const empresa=state.empresas.find(e=>e.nombre===a.empresa),conv=state.convenios.find(c=>c.empresa===a.empresa),docs=state.documentos.filter(d=>d.alumno===a.nombre||d.empresa===a.empresa),follows=state.seguimientos.filter(s=>s.empresa===a.empresa);modal("Ficha del alumno",`<section class="student-profile"><aside class="student-profile-side"><div class="student-profile-photo">${a.foto?.data?`<img src="${a.foto.data}">`:`<span>${esc((a.nombre||"A")[0])}</span>`}</div><h2>${esc(a.nombre)}</h2><p>${esc(a.estado)}</p><button class="primary" onclick="openAlumno(${a.id})">Editar ficha</button></aside><main class="student-profile-main"><section class="student-profile-grid">${[["Teléfono",a.telefono],["Correo",a.email],["Dirección",a.direccion],["NSS",a.nss],["Empresa",a.empresa||"Sin empresa"],["Tutor",a.tutor||empresa?.contacto||""],["Inicio",a.inicio||conv?.inicio||""],["Fin",a.fin||conv?.fin||""]].map(([b,v])=>`<article><b>${b}</b><span>${esc(v||"Sin dato")}</span></article>`).join("")}</section><section class="student-profile-section"><div class="section-head"><div><p>Currículum</p><h3>Vista previa</h3></div></div>${filePreviewHTML(a.curriculum,a.id)}</section><section class="student-profile-section"><div class="section-head"><div><p>Documentos</p><h3>Relacionados</h3></div></div><div class="list">${docs.map(d=>`<article class="item"><div><b>${esc(d.nombre)}</b><p>${esc(d.tipo)} · ${esc(d.estado)}</p></div><button onclick="previewAnyFile(state.documentos.find(x=>x.id===${d.id}).file,'${esc(d.nombre)}')">Ver</button></article>`).join("")||"<p>No hay documentos asociados.</p>"}</div></section><section class="student-profile-section"><div class="section-head"><div><p>Seguimiento</p><h3>Actividad</h3></div></div><div class="list">${follows.map(s=>`<article class="item"><div><b>${esc(s.tipo)} · ${esc(s.empresa)}</b><p>${esc(s.fecha)} · ${esc(s.resultado||"")}</p></div></article>`).join("")||"<p>Sin seguimientos asociados.</p>"}</div></section><section class="student-profile-section"><div class="section-head"><div><p>Observaciones</p><h3>Notas</h3></div></div><p>${esc(a.notas||"Sin observaciones.")}</p></section></main></section>`,()=>closeModal())}
function filePreviewHTML(file,aid="x"){if(!file?.data)return `<div class="student-cv-empty">No hay archivo adjunto.</div>`;const n=file.name||"archivo",t=file.type||"",pdf=t.includes("pdf")||n.toLowerCase().endsWith(".pdf"),img=t.includes("image")||/\.(png|jpg|jpeg|webp)$/i.test(n),docx=n.toLowerCase().endsWith(".docx");if(pdf)return `<div class="student-cv-preview"><iframe src="${file.data}"></iframe></div><div class="student-cv-actions"><a href="${file.data}" target="_blank">Abrir</a><a href="${file.data}" download="${esc(n)}">Descargar</a></div>`;if(img)return `<div class="student-cv-image"><img src="${file.data}"></div><div class="student-cv-actions"><a href="${file.data}" target="_blank">Abrir</a><a href="${file.data}" download="${esc(n)}">Descargar</a></div>`;if(docx){const pid="word-"+aid+"-"+Math.floor(Math.random()*999);setTimeout(()=>renderWord(file.data,pid),80);return `<div id="${pid}" class="word-preview"><div class="word-preview-loading">Preparando vista previa Word...</div></div><div class="student-cv-actions"><a href="${file.data}" download="${esc(n)}">Descargar Word</a></div>`}return `<div class="student-cv-empty"><b>${esc(n)}</b><span>No tiene vista previa integrada. Puedes descargarlo.</span></div><div class="student-cv-actions"><a href="${file.data}" download="${esc(n)}">Descargar</a></div>`}
async function renderWord(data,id){const target=$("#"+id);if(!target)return;if(!window.mammoth){target.innerHTML="<p>Necesitas conexión para ver DOCX. Descarga disponible.</p>";return}try{const ab=await (await fetch(data)).arrayBuffer();const r=await mammoth.convertToHtml({arrayBuffer:ab});target.innerHTML=`<article class="word-document">${r.value||"<p>Sin contenido visible.</p>"}</article>`}catch(e){target.innerHTML="<p>No se pudo previsualizar el Word. Descárgalo o conviértelo a PDF.</p>"}}
function previewAnyFile(file,title="Documento"){modal("Previsualizar documento",`<section><h2>${esc(title)}</h2>${filePreviewHTML(file,"modal")}<div class="student-cv-actions">${file?.data?`<a href="${file.data}" download="${esc(file.name||title)}">Descargar</a>`:""}</div></section>`,()=>closeModal())}
function openAlumno(aid=null){const a=state.alumnos.find(x=>x.id===aid)||{nombre:"",telefono:"",email:"",direccion:"",nss:"",estado:"sin asignar",empresa:"",inicio:"",fin:"",tutor:"",notas:"",foto:null,curriculum:null};modal("Alumno",`<form id="alumnoForm" class="form-grid"><div class="student-photo-preview">${a.foto?.data?`<img src="${a.foto.data}">`:"Foto"}</div><input name="nombre" value="${esc(a.nombre)}" placeholder="Nombre" required><input name="telefono" value="${esc(a.telefono)}" placeholder="Teléfono"><input name="email" value="${esc(a.email)}" placeholder="Correo"><input name="direccion" value="${esc(a.direccion)}" placeholder="Dirección"><input name="nss" value="${esc(a.nss)}" placeholder="Nº Seguridad Social"><label class="student-files">Foto<input id="alumnoFoto" type="file" accept="image/*"></label><label class="student-files">Currículum<input id="alumnoCV" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"></label><select name="empresa"><option value="">Sin empresa</option>${state.empresas.map(e=>`<option ${a.empresa===e.nombre?"selected":""}>${esc(e.nombre)}</option>`).join("")}</select><select name="estado">${["sin asignar","propuesta","entrevista","prácticas","finalizado"].map(x=>`<option ${a.estado===x?"selected":""}>${x}</option>`).join("")}</select><input name="inicio" type="date" value="${esc(a.inicio)}"><input name="fin" type="date" value="${esc(a.fin)}"><input name="tutor" value="${esc(a.tutor)}" placeholder="Tutor"><textarea name="notas">${esc(a.notas)}</textarea></form>`,async()=>{Object.assign(a,Object.fromEntries(new FormData($("#alumnoForm")).entries()));const foto=$("#alumnoFoto").files[0],cv=$("#alumnoCV").files[0];if(foto)a.foto=await fileToData(foto);if(cv)a.curriculum=await fileToData(cv);if(!aid){a.id=uid();state.alumnos.unshift(a)}log(`Alumno guardado: ${a.nombre}`);save();closeModal();render()})} function delAlumno(id){if(confirm("¿Eliminar alumno?")){state.alumnos=state.alumnos.filter(a=>a.id!==id);save();render()}}
function renderConvenios(){$("#convenios").innerHTML=pageHead("Convenios","Convenios","Borradores, firmas y anexos")+`<section class="grid-2"><div class="card table-card"><div class="toolbar"><button class="primary" onclick="openConvenio()">Nuevo convenio</button><button class="soft-btn" onclick="show('documentos')">Archivo documental</button></div><table><thead><tr><th>Empresa</th><th>Fechas</th><th>Estado</th><th>Anexos</th><th></th></tr></thead><tbody>${state.convenios.map(c=>`<tr><td><b>${esc(c.empresa)}</b><br><small>${esc(c.centro)}</small></td><td>${esc(c.inicio)} → ${esc(c.fin)}</td><td><span class="badge">${esc(c.estado)}</span></td><td>${(c.anexos||[]).length}</td><td class="row-actions"><button onclick="openConvenio(${c.id})">Editar</button><button onclick="attachDoc(${c.id})">Anexar</button><button onclick="delConvenio(${c.id})">Eliminar</button></td></tr>`).join("")}</tbody></table></div><div class="card table-card"><div class="section-head"><div><p>Estado documental</p><h3>Checklist</h3></div></div><div class="list">${state.convenios.map(c=>`<article class="item"><div><b>${esc(c.empresa)}</b><p>${(c.anexos||[]).length>=3?"Completo":(c.anexos||[]).length?"Incompleto":"Pendiente"}</p></div><span>${esc(c.estado)}</span></article>`).join("")}</div></div></section>`}
function openConvenio(cid=null){const c=state.convenios.find(x=>x.id===cid)||{empresa:"",centro:"Centro educativo",inicio:today(),fin:datePlus(90),tutorEmpresa:"",tutorCentro:"",estado:"pendiente",anexos:[]};modal("Convenio",`<form id="convForm" class="form-grid"><select name="empresa">${state.empresas.map(e=>`<option ${c.empresa===e.nombre?"selected":""}>${esc(e.nombre)}</option>`).join("")}</select><input name="centro" value="${esc(c.centro)}"><input name="inicio" type="date" value="${esc(c.inicio)}"><input name="fin" type="date" value="${esc(c.fin)}"><input name="tutorEmpresa" value="${esc(c.tutorEmpresa)}" placeholder="Tutor empresa"><input name="tutorCentro" value="${esc(c.tutorCentro)}" placeholder="Tutor centro"><select name="estado">${["pendiente","incompleto","completo","vencido","firmado","enviado"].map(x=>`<option ${c.estado===x?"selected":""}>${x}</option>`).join("")}</select></form>`,()=>{Object.assign(c,Object.fromEntries(new FormData($("#convForm")).entries()));if(!cid){c.id=uid();c.anexos=[];state.convenios.unshift(c)}log(`Convenio guardado: ${c.empresa}`);save();closeModal();render()})} function attachDoc(cid){const c=state.convenios.find(x=>x.id===cid);modal("Anexar documento",`<select id="docToAttach">${state.documentos.map(d=>`<option value="${d.id}">${esc(d.nombre)} · ${esc(d.tipo)}</option>`).join("")}</select><p>Si no aparece el documento, súbelo primero en Documentos.</p>`,()=>{const did=Number($("#docToAttach").value);c.anexos=c.anexos||[];if(did&&!c.anexos.includes(did))c.anexos.push(did);save();closeModal();render()})} function delConvenio(id){if(confirm("¿Eliminar convenio?")){state.convenios=state.convenios.filter(c=>c.id!==id);save();render()}}
function renderExpedientes(){const rows=state.alumnos.map(a=>{const e=state.empresas.find(x=>x.nombre===a.empresa),c=state.convenios.find(x=>x.empresa===a.empresa),docs=state.documentos.filter(d=>d.alumno===a.nombre||d.empresa===a.empresa);return `<article class="card table-card"><div class="section-head"><div><p>Expediente</p><h3>${esc(a.nombre)}</h3></div><span class="badge">${esc(a.estado)}</span></div><div class="grid-2"><div><b>Empresa</b><p>${esc(a.empresa||"Sin empresa")}</p><b>Contacto</b><p>${esc(e?.contacto||"")}</p><b>Fechas</b><p>${esc(a.inicio||"")} → ${esc(a.fin||"")}</p></div><div><b>Convenio</b><p>${esc(c?.estado||"Sin convenio")}</p><b>Documentos</b><p>${docs.length} asociados</p><b>Próxima acción</b><p>${esc(state.seguimientos.find(s=>s.empresa===a.empresa)?.proxima||"Sin acción")}</p></div></div><button class="primary" onclick="openStudentProfile(${a.id})">Ver ficha</button></article>`}).join("");$("#expedientes").innerHTML=pageHead("Expedientes","Expedientes","Vista completa por alumno")+`<section class="grid-2">${rows}</section>`}
function renderDocumentos(){const q=$("#docSearch")?.value?.toLowerCase()||"",t=$("#docTypeFilter")?.value||"Todos";const docs=state.documentos.filter(d=>(activeFolder==="all"||(!d.carpeta&&activeFolder==="sin")||d.carpeta===activeFolder)&&(!q||JSON.stringify(d).toLowerCase().includes(q))&&(t==="Todos"||d.tipo===t));$("#documentos").innerHTML=pageHead("Documentos","Documentos","Archivo con carpetas y previsualización")+`<section class="doc-layout"><aside class="card table-card folders"><div class="section-head"><div><p>Carpetas</p><h3>Archivo</h3></div></div><form class="form-grid" onsubmit="addFolder(event)"><input id="folderName" placeholder="Nueva carpeta" required><button class="primary">Crear</button></form><div class="folder-list">${state.carpetas.map(f=>`<div class="folder ${activeFolder===f.id?"active":""}" onclick="activeFolder='${f.id}';renderDocumentos()">
  <span>📁 ${esc(f.nombre)}</span>
  <div class="folder-actions" onclick="event.stopPropagation()">
    <b>${state.documentos.filter(d=>f.id==="all"||(!d.carpeta&&f.id==="sin")||d.carpeta===f.id).length}</b>
    ${!["all","sin"].includes(String(f.id)) ? `<button title="Modificar carpeta" onclick="editFolder('${f.id}')">✎</button><button title="Eliminar carpeta" onclick="deleteFolder('${f.id}')">×</button>` : ""}
  </div>
</div>`).join("")}</div></aside><main><section class="card table-card"><div class="section-head"><div><p>Subir</p><h3>Nuevo documento</h3></div></div><form class="form-grid" onsubmit="addDoc(event)"><input id="docNombre" placeholder="Nombre visible"><select id="docCarpeta">${state.carpetas.filter(f=>!["all","sin"].includes(f.id)).map(f=>`<option value="${f.id}">${esc(f.nombre)}</option>`).join("")}</select><select id="docTipo"><option>convenio firmado</option><option>DNI/NIF</option><option>seguro</option><option>acuerdo formativo</option><option>evaluación</option><option>anexo de prácticas</option><option>cv</option><option>otro</option></select><select id="docEmpresa"><option value="">Sin empresa</option>${state.empresas.map(e=>`<option>${esc(e.nombre)}</option>`).join("")}</select><select id="docAlumno"><option value="">Sin alumno</option>${state.alumnos.map(a=>`<option>${esc(a.nombre)}</option>`).join("")}</select><select id="docEstado"><option>pendiente</option><option>para enviar</option><option>enviado</option><option>firmado</option><option>caducado</option></select><input id="docFecha" type="date" value="${today()}"><input id="docUser" placeholder="Subido por"><label>Archivo<input id="docFile" type="file" required></label><textarea id="docNotas" placeholder="Notas"></textarea><button class="primary">Guardar documento</button></form></section><section class="card table-card" style="margin-top:18px"><div class="toolbar"><input id="docSearch" placeholder="Buscar..." oninput="renderDocumentos()" value="${esc(q)}"><select id="docTypeFilter" onchange="renderDocumentos()"><option>Todos</option><option>convenio firmado</option><option>DNI/NIF</option><option>seguro</option><option>cv</option></select></div><div class="doc-grid">${docs.map(docCard).join("")||"<p>No hay documentos.</p>"}</div></section></main></section>`;const sel=$("#docTypeFilter");if(sel)sel.value=t}
function addFolder(ev){ev.preventDefault();state.carpetas.push({id:String(uid()),nombre:$("#folderName").value});log(`Carpeta creada: ${$("#folderName").value}`);save();render()} 
function editFolder(folderId){
  const folder = state.carpetas.find(f => String(f.id) === String(folderId));
  if(!folder) return;

  modal("Modificar carpeta", `
    <form id="folderEditForm" class="form-grid">
      <input id="editFolderName" value="${esc(folder.nombre)}" placeholder="Nombre de la carpeta" required>
      <p style="grid-column:1/-1;color:var(--muted);margin:0">Los documentos dentro de esta carpeta se mantienen.</p>
    </form>
  `, () => {
    const name = $("#editFolderName").value.trim();
    if(!name) return toast("El nombre no puede estar vacío");
    folder.nombre = name;
    log(`Carpeta modificada: ${name}`);
    save();
    closeModal();
    render();
    toast("Carpeta modificada 🌸");
  });
}

function deleteFolder(folderId){
  const folder = state.carpetas.find(f => String(f.id) === String(folderId));
  if(!folder || ["all","sin"].includes(String(folder.id))) return;

  const docsInside = state.documentos.filter(d => String(d.carpeta) === String(folderId)).length;
  const message = docsInside
    ? `La carpeta contiene ${docsInside} documento(s). Si la eliminas, los documentos pasarán a "Sin carpeta". ¿Continuar?`
    : "¿Eliminar esta carpeta?";

  if(!confirm(message)) return;

  state.documentos.forEach(d => {
    if(String(d.carpeta) === String(folderId)) d.carpeta = "";
  });

  state.carpetas = state.carpetas.filter(f => String(f.id) !== String(folderId));
  if(String(activeFolder) === String(folderId)) activeFolder = "all";

  log(`Carpeta eliminada: ${folder.nombre}`);
  save();
  render();
  toast("Carpeta eliminada 🌸");
}
 async function addDoc(ev){ev.preventDefault();const file=await fileToData($("#docFile").files[0]);state.documentos.unshift({id:uid(),nombre:$("#docNombre").value||file.name,tipo:$("#docTipo").value,empresa:$("#docEmpresa").value,alumno:$("#docAlumno").value,estado:$("#docEstado").value,fecha:$("#docFecha").value,subidoPor:$("#docUser").value,notas:$("#docNotas").value,carpeta:$("#docCarpeta").value,file});log(`Documento subido: ${file.name}`);save();render();toast("Documento guardado 🌸")} function docCard(d){return `<article class="card doc-card"><h3>${esc(d.nombre)}</h3><p>${esc(d.tipo)} · ${esc(d.estado)}</p><p>${esc(d.empresa||d.alumno||"General")} · ${esc(d.fecha)}</p><p>${esc(d.notas||"")}</p><div class="doc-actions"><button onclick="previewAnyFile(state.documentos.find(x=>x.id===${d.id}).file,'${esc(d.nombre)}')">Previsualizar</button><a href="${d.file?.data}" download="${esc(d.file?.name||d.nombre)}">Descargar</a><button onclick="replaceDoc(${d.id})">Reemplazar</button><button onclick="delDoc(${d.id})">Eliminar</button></div></article>`} function replaceDoc(id){const inp=document.createElement("input");inp.type="file";inp.onchange=async()=>{const d=state.documentos.find(x=>x.id===id);d.file=await fileToData(inp.files[0]);d.nombre=d.file.name;save();render()};inp.click()} function delDoc(id){if(confirm("¿Eliminar documento?")){state.documentos=state.documentos.filter(d=>d.id!==id);save();render()}}
function renderSeguimiento(){$("#seguimiento").innerHTML=pageHead("Seguimiento","Seguimiento","Llamadas, emails, visitas y reuniones")+`<section class="grid-2"><div class="card table-card"><form class="form-grid" onsubmit="addSeguimiento(event)"><input id="segFecha" type="date" value="${today()}"><select id="segEmpresa">${state.empresas.map(e=>`<option>${esc(e.nombre)}</option>`).join("")}</select><select id="segTipo"><option>llamada</option><option>email</option><option>visita</option><option>reunión</option><option>LinkedIn</option></select><input id="segResultado" placeholder="Resultado"><input id="segProxima" placeholder="Próxima acción"><input id="segFechaProx" type="date" value="${datePlus(7)}"><input id="segResponsable" placeholder="Responsable"><button class="primary">Registrar</button></form></div><div class="card table-card"><div class="list">${state.seguimientos.map(s=>`<article class="item"><div><b>${esc(s.tipo)} · ${esc(s.empresa)}</b><p>${esc(s.resultado)} · Próxima: ${esc(s.proxima)}</p></div><span>${esc(s.fecha)}</span></article>`).join("")}</div></div></section>`} function addSeguimiento(ev){ev.preventDefault();state.seguimientos.unshift({id:uid(),fecha:$("#segFecha").value,empresa:$("#segEmpresa").value,tipo:$("#segTipo").value,resultado:$("#segResultado").value,proxima:$("#segProxima").value,fechaProxima:$("#segFechaProx").value,responsable:$("#segResponsable").value});log(`Seguimiento registrado: ${$("#segEmpresa").value}`);save();render()}
function renderEmails(){$("#emails").innerHTML=pageHead("Emails","Emails","Plantillas reutilizables")+`<section class="grid-2"><div class="card table-card"><form class="form-grid" onsubmit="addEmail(event)"><input id="emailNombre" placeholder="Nombre plantilla" required><input id="emailAsunto" placeholder="Asunto"><textarea id="emailCuerpo" placeholder="Cuerpo"></textarea><button class="primary">Guardar plantilla</button></form></div><div class="card table-card"><div class="list">${state.emails.map(t=>`<article class="item"><div><b>${esc(t.nombre)}</b><p>${esc(t.asunto)}</p></div><div class="row-actions"><button onclick="copyEmail(${t.id})">Copiar</button><button onclick="delEmail(${t.id})">Eliminar</button></div></article>`).join("")}</div></div></section>`} function addEmail(ev){ev.preventDefault();state.emails.unshift({id:uid(),nombre:$("#emailNombre").value,asunto:$("#emailAsunto").value,cuerpo:$("#emailCuerpo").value});save();render()} function copyEmail(id){const t=state.emails.find(x=>x.id===id);navigator.clipboard.writeText(`Asunto: ${t.asunto}\n\n${t.cuerpo}`);toast("Email copiado")} function delEmail(id){state.emails=state.emails.filter(e=>e.id!==id);save();render()}
function renderAgenda(){const ev=dayEvents(selectedDate);const formatted=new Date(selectedDate+"T12:00:00").toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long",year:"numeric"});$("#agenda").innerHTML=pageHead("Agenda","Próximas acciones","Calendario mensual con detalle diario")+`<section class="grid-2"><div class="card table-card"><div class="section-head"><div><p>Calendario</p><h3>Selecciona un día</h3></div><button class="soft-btn" onclick="selectedDate=today();renderAgenda()">Hoy</button></div>${miniCalendar(selectedDate)}</div><div class="card table-card day-detail"><div class="section-head"><div><p>Día seleccionado</p><h3>${esc(formatted)}</h3></div><button class="soft-btn" onclick="quickEvent('${selectedDate}')">Añadir pendiente</button></div><div class="day-summary"><article><b>${ev.length}</b><span>Pendientes</span></article><article><b>${ev.filter(e=>e.kind==='Seguimiento').length}</b><span>Seguimientos</span></article><article><b>${ev.filter(e=>e.kind.includes('convenio')).length}</b><span>Convenios</span></article></div><div class="list">${ev.length?ev.map(e=>`<article class="item" onclick="show('${e.view}')"><div><b>${esc(e.title)}</b><p>${esc(e.kind)} · ${esc(e.sub)}</p></div><span>Ir</span></article>`).join(""):`<article class="empty-day"><b>No hay tareas ni pendientes este día.</b><p>Puedes crear un seguimiento, llamada, reunión o tarea para este día.</p><button class="primary" onclick="quickEvent('${selectedDate}')">Crear pendiente</button></article>`}</div></div></section>`}
function quickEvent(date){modal("Añadir pendiente",`<form id="quickForm" class="form-grid"><input id="qFecha" type="date" value="${esc(date)}"><select id="qEmpresa">${state.empresas.map(e=>`<option>${esc(e.nombre)}</option>`).join("")}</select><select id="qTipo"><option>llamada</option><option>email</option><option>visita</option><option>reunión</option><option>tarea</option></select><input id="qResultado" placeholder="Nota"><input id="qProxima" placeholder="Tarea / próxima acción" required><input id="qResponsable" placeholder="Responsable"></form>`,()=>{state.seguimientos.unshift({id:uid(),fecha:$("#qFecha").value,empresa:$("#qEmpresa").value,tipo:$("#qTipo").value,resultado:$("#qResultado").value,proxima:$("#qProxima").value,fechaProxima:$("#qFecha").value,responsable:$("#qResponsable").value});selectedDate=$("#qFecha").value;log(`Pendiente añadido: ${$("#qProxima").value}`);save();closeModal();render()})}
function renderReportes(){const group=(arr,fn)=>arr.reduce((a,x)=>{const k=fn(x)||"Sin dato";a[k]=(a[k]||0)+1;return a},{});$("#reportes").innerHTML=pageHead("Reportes","Reportes","Estadísticas y exportación")+`<section class="kpi-grid">${kpi("Empresas",state.empresas.length,"empresas","pink","building")}${kpi("Alumnos",state.alumnos.length,"alumnos","blue","student")}${kpi("Convenios",state.convenios.length,"convenios","orange","file")}${kpi("Documentos",state.documentos.length,"documentos","green","archive")}</section><section class="report-grid"><div class="card table-card"><h3>Empresas por sector</h3>${bars(group(state.empresas,e=>e.sector))}</div><div class="card table-card"><h3>Estados CRM</h3>${bars(group(state.empresas,e=>e.estado))}</div><div class="card table-card"><h3>Convenios</h3>${bars(group(state.convenios,c=>c.estado))}</div><div class="card table-card"><h3>Alumnos</h3>${bars(group(state.alumnos,a=>a.estado))}</div><div class="card table-card"><button class="primary" onclick="exportCSV()">Exportar CSV</button><button class="soft-btn" onclick="window.print()">Exportar PDF</button></div></section>`} function bars(obj){const max=Math.max(1,...Object.values(obj));return Object.entries(obj).map(([k,v])=>`<div class="bar-row"><span>${esc(k)}</span><div class="bar"><i style="width:${v/max*100}%"></i></div><b>${v}</b></div>`).join("")||"<p>Sin datos.</p>"} function exportCSV(){const rows=[["tipo","nombre","estado"],...state.empresas.map(e=>["empresa",e.nombre,e.estado]),...state.alumnos.map(a=>["alumno",a.nombre,a.estado]),...state.convenios.map(c=>["convenio",c.empresa,c.estado])];const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([rows.map(r=>r.join(",")).join("\n")],{type:"text/csv"}));a.download="bloom-crm-reportes.csv";a.click()}
function renderAjustes(){$("#ajustes").innerHTML=pageHead("Ajustes","Ajustes","Supabase, backup y restauración")+`<section class="grid-2"><div class="card table-card"><h3>Supabase</h3><p>Usa la tabla <b>bloom_crm_backups</b>.</p><button class="primary" onclick="saveCloud()">Guardar nube</button><button class="soft-btn" onclick="loadCloud()">Cargar nube</button><button class="soft-btn" onclick="downloadSQL()">Descargar SQL</button></div><div class="card table-card"><h3>Backup local</h3><button class="primary" onclick="downloadBackup()">Descargar JSON</button><label class="soft-btn">Restaurar JSON<input type="file" onchange="restoreBackup(event)" hidden></label></div></section>`}
function modal(title,body,onSave){const m=$("#modal");m.innerHTML=`<div class="modal-body"><h2>${title}</h2>${body}<div class="modal-actions"><button class="soft-btn" onclick="closeModal()">Cerrar</button><button class="primary" id="modalSave">Guardar</button></div></div>`;m.showModal();$("#modalSave").onclick=onSave} function closeModal(){$("#modal").close()} function globalSearch(){const q=$("#globalSearch").value.toLowerCase(),box=$("#searchResults");if(!q){box.classList.add("hidden");return}const results=[...state.empresas.map(x=>({t:"Empresa",n:x.nombre,v:"empresas"})),...state.alumnos.map(x=>({t:"Alumno",n:x.nombre,v:"alumnos"})),...state.documentos.map(x=>({t:"Documento",n:x.nombre,v:"documentos"})),...state.convenios.map(x=>({t:"Convenio",n:x.empresa,v:"convenios"}))].filter(r=>r.n.toLowerCase().includes(q));box.classList.remove("hidden");box.innerHTML=results.slice(0,8).map(r=>`<article class="item" onclick="show('${r.v}');$('#globalSearch').value='';globalSearch()"><div><b>${esc(r.n)}</b><p>${r.t}</p></div></article>`).join("")||"<p>Sin resultados.</p>"}
function buildNotifications(){const list=[];state.empresas.filter(e=>!state.seguimientos.some(s=>s.empresa===e.nombre)).forEach(e=>list.push({t:"Empresa",h:`${e.nombre} sin seguimiento`,p:"No tiene interacción registrada.",v:"empresas"}));state.convenios.filter(c=>c.estado!=="firmado"&&c.estado!=="completo").forEach(c=>list.push({t:"Convenio",h:`Convenio pendiente · ${c.empresa}`,p:`Estado: ${c.estado}`,v:"convenios"}));state.alumnos.filter(a=>!a.empresa).forEach(a=>list.push({t:"Alumno",h:`${a.nombre} sin empresa`,p:"Pendiente de asignación.",v:"alumnos"}));state.seguimientos.filter(s=>s.fechaProxima&&s.fechaProxima<=datePlus(2)).forEach(s=>list.push({t:"Seguimiento",h:s.proxima||`Revisar ${s.empresa}`,p:`${s.empresa} · ${s.fechaProxima}`,v:"seguimiento"}));return list} function renderNotifications(){const n=buildNotifications();$("#alertCount").textContent=n.length;$("#drawerList").innerHTML=n.length?n.map(x=>`<article class="notification" onclick="show('${x.v}');closeDrawer()"><b>${esc(x.h)}</b><p>${esc(x.t)} · ${esc(x.p)}</p></article>`).join(""):`<article class="notification"><b>Todo tranquilo</b><p>No hay revisiones urgentes.</p></article>`} function openDrawer(){renderNotifications();$("#drawer").classList.add("open");$("#overlay").classList.add("open")} function closeDrawer(){$("#drawer").classList.remove("open");$("#overlay").classList.remove("open")}
async function saveCloud(silent=false){try{setSync("Guardando...","saving");const res=await fetch(`${SUPABASE_URL}/rest/v1/bloom_crm_backups`,{method:"POST",headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify({id:CLOUD_ID,data:state,updated_at:new Date().toISOString()})});if(!res.ok)throw new Error(await res.text());setSync("Sincronizado","ok");if(!silent)toast("Guardado en nube 🌸")}catch(e){console.error(e);setSync("Error nube","error");if(!silent)alert("Error Supabase: "+e.message)}} async function loadCloud(){try{const res=await fetch(`${SUPABASE_URL}/rest/v1/bloom_crm_backups?id=eq.${CLOUD_ID}&select=data`,{headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`}});if(!res.ok)throw new Error(await res.text());const rows=await res.json();if(rows[0]?.data){state=rows[0].data;localStorage.setItem(KEY,JSON.stringify(state));render();toast("Nube cargada 🌸")}else toast("No hay copia en nube")}catch(e){alert("Error Supabase: "+e.message)}} function downloadSQL(){const sql=`create table if not exists bloom_crm_backups (id text primary key,data jsonb not null,updated_at timestamptz default now());\nalter table bloom_crm_backups enable row level security;\ncreate policy "public read bloom crm backup" on bloom_crm_backups for select to anon using (true);\ncreate policy "public insert bloom crm backup" on bloom_crm_backups for insert to anon with check (true);\ncreate policy "public update bloom crm backup" on bloom_crm_backups for update to anon using (true) with check (true);`;const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([sql],{type:"text/sql"}));a.download="bloom-crm-supabase.sql";a.click()} function downloadBackup(){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:"application/json"}));a.download="bloom-crm-backup.json";a.click()} function restoreBackup(ev){const f=ev.target.files[0];const r=new FileReader();r.onload=()=>{state=JSON.parse(r.result);save();render()};r.readAsText(f)}
function init(){$$("[data-view]").forEach(b=>b.onclick=()=>show(b.dataset.view));$("#globalSearch").addEventListener("input",globalSearch);$("#menuBtn").onclick=()=>$("#sidebar").classList.add("open");$("#notificationsBtn").onclick=openDrawer;$("#closeDrawer").onclick=closeDrawer;$("#overlay").onclick=closeDrawer;$("#quickBtn").onclick=()=>quickEvent(today());render();setTimeout(()=>{if(state.actividad.length===0)loadCloud().catch(()=>{})},600)} init();


/* =========================================================
   Bloom CRM 3.2 — Dashboard totalmente navegable
========================================================= */
const dashboardFilters = {
  empresas: "all",
  alumnos: "all",
  convenios: "all",
  seguimiento: "all",
  expedientes: "all"
};

function dashboardGo(view, filter="all", extra=null){
  if(dashboardFilters[view] !== undefined) dashboardFilters[view] = filter;
  if(view === "agenda" && extra?.date) selectedDate = extra.date;
  show(view);
  toast("Vista filtrada desde Dashboard 🌸");
}

function firstReminderDate(){
  const reminders = state.seguimientos
    .filter(s => s.fechaProxima && s.fechaProxima >= today())
    .sort((a,b) => a.fechaProxima.localeCompare(b.fechaProxima));
  return reminders[0]?.fechaProxima || today();
}

function filteredEmpresasForView(){
  if(dashboardFilters.empresas === "sinSeguimiento"){
    return state.empresas.filter(e => !state.seguimientos.some(s => s.empresa === e.nombre));
  }
  return state.empresas;
}

function filteredAlumnosForView(){
  if(dashboardFilters.alumnos === "sinEmpresa"){
    return state.alumnos.filter(a => !a.empresa || a.estado === "sin asignar");
  }
  return state.alumnos;
}

function filteredConveniosForView(){
  if(dashboardFilters.convenios === "pendientes"){
    return state.convenios.filter(c => c.estado !== "firmado" && c.estado !== "completo");
  }
  return state.convenios;
}

function filteredSeguimientosForView(){
  if(dashboardFilters.seguimiento === "llamadas"){
    return state.seguimientos.filter(s => s.tipo === "llamada");
  }
  if(dashboardFilters.seguimiento === "reuniones"){
    return state.seguimientos.filter(s => s.tipo === "reunión");
  }
  return state.seguimientos;
}

function filteredExpedientesForView(){
  if(dashboardFilters.expedientes === "practicasActivas"){
    return state.alumnos.filter(a => a.estado === "prácticas");
  }
  return state.alumnos;
}

function clearDashboardFilter(view){
  if(dashboardFilters[view] !== undefined){
    dashboardFilters[view] = "all";
    render();
  }
}

function filterPill(view, label){
  return dashboardFilters[view] !== "all"
    ? `<button class="filter-pill" onclick="clearDashboardFilter('${view}')">${label} ×</button>`
    : "";
}

/* Empresa 360 ligera: abre ficha completa de empresa desde Pipeline */
function openEmpresa360ByName(name){
  const empresa = state.empresas.find(e => e.nombre === name);
  if(!empresa) return;
  openEmpresa360(empresa.id);
}

function openEmpresa360(eid){
  const e = state.empresas.find(x=>x.id===eid);
  if(!e) return;
  const follows = state.seguimientos.filter(s => s.empresa === e.nombre);
  const convs = state.convenios.filter(c => c.empresa === e.nombre);
  const alumnos = state.alumnos.filter(a => a.empresa === e.nombre);
  const docs = state.documentos.filter(d => d.empresa === e.nombre);

  modal("Empresa 360", `
    <section class="empresa360-profile">
      <aside class="empresa360-side">
        <div class="empresa360-logo">${esc((e.nombre || "E").slice(0,1))}</div>
        <h2>${esc(e.nombre)}</h2>
        <p>${esc(e.sector || "Sin sector")}</p>
        <span class="badge">${esc(e.estado || "nueva")}</span>
        <button class="primary" onclick="openEmpresa(${e.id})">Editar empresa</button>
      </aside>

      <main class="empresa360-main">
        <section class="empresa360-grid">
          <article><b>Contacto</b><span>${esc(e.contacto || "Sin contacto")}</span></article>
          <article><b>Teléfono</b><span>${esc(e.telefono || "Sin teléfono")}</span></article>
          <article><b>Email</b><span>${esc(e.email || "Sin email")}</span></article>
          <article><b>Ciudad</b><span>${esc(e.ciudad || "")} · ${esc(e.isla || "")}</span></article>
          <article><b>Prioridad</b><span>${esc(e.prioridad || "media")}</span></article>
          <article><b>Estado CRM</b><span>${esc(e.estado || "")}</span></article>
        </section>

        <section class="empresa360-section">
          <div class="section-head"><div><p>Seguimiento</p><h3>Interacciones</h3></div></div>
          <div class="list">${follows.map(s=>`<article class="item"><div><b>${esc(s.tipo)} · ${esc(s.fecha)}</b><p>${esc(s.resultado || "")} · Próxima: ${esc(s.proxima || "")}</p></div></article>`).join("") || "<p>Sin seguimiento.</p>"}</div>
        </section>

        <section class="empresa360-section">
          <div class="section-head"><div><p>Convenios</p><h3>Documentación</h3></div></div>
          <div class="list">${convs.map(c=>`<article class="item"><div><b>${esc(c.empresa)}</b><p>${esc(c.inicio)} → ${esc(c.fin)} · ${esc(c.estado)}</p></div></article>`).join("") || "<p>Sin convenios.</p>"}</div>
        </section>

        <section class="empresa360-section">
          <div class="section-head"><div><p>Alumnos</p><h3>Asignados</h3></div></div>
          <div class="list">${alumnos.map(a=>`<article class="item" onclick="openStudentProfile(${a.id})"><div><b>${esc(a.nombre)}</b><p>${esc(a.estado)}</p></div><span>Ver</span></article>`).join("") || "<p>Sin alumnos asignados.</p>"}</div>
        </section>

        <section class="empresa360-section">
          <div class="section-head"><div><p>Documentos</p><h3>Archivos relacionados</h3></div></div>
          <div class="list">${docs.map(d=>`<article class="item" onclick="previewAnyFile(state.documentos.find(x=>x.id===${d.id}).file,'${esc(d.nombre)}')"><div><b>${esc(d.nombre)}</b><p>${esc(d.tipo)} · ${esc(d.estado)}</p></div><span>Ver</span></article>`).join("") || "<p>Sin documentos relacionados.</p>"}</div>
        </section>

        <section class="empresa360-section">
          <div class="section-head"><div><p>Notas</p><h3>Observaciones</h3></div></div>
          <p>${esc(e.notas || "Sin notas.")}</p>
        </section>
      </main>
    </section>
  `, ()=>closeModal());
}

/* Sobrescrituras de render para filtros y navegación */
const renderDashboardBase32 = renderDashboard;
renderDashboard = function(){
  const d = dashboardData();
  $("#dashboard").innerHTML = pageHead("Dashboard","Dashboard",greeting()) + `
  <section class="kpi-grid">
    ${dashboardKpi("Empresas sin contactar", d.sinContacto, "empresas", "pink", "users", "sinSeguimiento")}
    ${dashboardKpi("Convenios pendientes", d.convenios, "convenios", "orange", "file", "pendientes")}
    ${dashboardKpi("Alumnos sin empresa", d.alumnos, "alumnos", "blue", "student", "sinEmpresa")}
    ${dashboardKpi("Prácticas activas", d.practicas, "expedientes", "green", "calendar", "practicasActivas")}
    ${dashboardKpi("Llamadas registradas", d.llamadas, "seguimiento", "purple", "phone", "llamadas")}
    ${dashboardKpi("Reuniones", d.reuniones, "seguimiento", "blue", "calendar", "reuniones")}
    <article class="kpi card" onclick="dashboardGo('agenda','all',{date:firstReminderDate()})"><div class="kpi-icon pink">${icons.calendar}</div><strong>${d.recordatorios}</strong><span>Recordatorios activos</span></article>
  </section>

  <section class="dashboard-grid">
    <div>
      <section class="card pipeline">
        <div class="section-head"><div><p>Pipeline de empresas</p><h3>Arrastra empresas entre estados</h3></div><button onclick="show('empresas')">Ver empresas</button></div>
        <div class="mini-pipeline">${renderMiniPipeline()}</div>
      </section>

      <div class="lower-grid">
        <section class="card">
          <div class="section-head"><div><p>Actividad reciente</p><h3>Últimos movimientos</h3></div></div>
          <div class="list">${state.actividad.slice(0,5).map(a=>`<article class="item dashboard-clickable" onclick="openActivityTarget('${esc(String(a.txt)).replaceAll("'","\\'")}')"><div><b>${esc(a.txt)}</b><p>${new Date(a.fecha).toLocaleString("es-ES")}</p></div><span>Ir</span></article>`).join("")||"<p>Sin actividad reciente.</p>"}</div>
        </section>

        <section class="card">
          <div class="section-head"><div><p>Documentos pendientes</p><h3>Revisión documental</h3></div><button onclick="show('documentos')">Ver todos</button></div>
          <div class="list">${state.documentos.filter(x=>x.estado!=="firmado").slice(0,5).map(d=>`<article class="item dashboard-clickable" onclick="previewAnyFile(state.documentos.find(x=>x.id===${d.id}).file,'${esc(d.nombre)}')"><div><b>${esc(d.nombre)}</b><p>${esc(d.tipo)} · ${esc(d.empresa||d.alumno||"General")}</p></div><span>Ver</span></article>`).join("")||"<p>Sin documentos pendientes.</p>"}</div>
        </section>
      </div>
    </div>

    <aside class="right-stack">
      <section class="card calendar-card">
        <div class="section-head"><div><p>Calendario</p><h3>Este mes</h3></div><button onclick="show('agenda')">Completo</button></div>
        ${miniCalendar()}
      </section>
      <section class="card actions-card">
        <div class="section-head"><div><p>Próximas acciones</p><h3>Hoy y próximos días</h3></div></div>
        <div class="list">${state.seguimientos.filter(s=>s.fechaProxima>=today()).slice(0,5).map(s=>`<article class="item dashboard-clickable" onclick="selectedDate='${esc(s.fechaProxima)}';show('agenda')"><div><b>${esc(s.proxima||s.resultado)}</b><p>${esc(s.empresa)} · ${esc(s.tipo)}</p></div><span>${esc(s.fechaProxima)}</span></article>`).join("")||"<p>No hay pendientes.</p>"}</div>
      </section>
    </aside>
  </section>`;
};

function dashboardKpi(label, value, view, color, icon, filter){
  return `<article class="kpi card" onclick="dashboardGo('${view}','${filter}')"><div class="kpi-icon ${color}">${icons[icon]}</div><strong>${value}</strong><span>${label}</span></article>`;
}

const renderMiniPipelineBase32 = renderMiniPipeline;
renderMiniPipeline = function(){
  const estados=[["nueva","Nueva"],["contactada","Contactada"],["interesada","Interesada"],["convenio","Convenio"],["activa","Activa"]];
  return estados.map(([st,label],idx)=>{
    const companies=state.empresas.filter(e=>e.estado===st);
    return `<div class="pipe-col drop-zone" data-status="${st}">
      <h4>${label}<span>${companies.length}</span></h4>
      <div class="drop-msg">Suelta aquí</div>
      ${companies.map(e=>`<div class="company-card" draggable="true" data-company="${e.id}" onclick="event.stopPropagation();openEmpresa360(${e.id})">
        <b>${esc(e.nombre)}</b><small>${esc(e.sector)} · ${esc(e.contacto)}</small><em>${esc(e.prioridad||"media")}</em>
        <div class="pipeline-actions" onclick="event.stopPropagation()">${idx>0?`<button onclick="moveCompany(${e.id},'${estados[idx-1][0]}')">←</button>`:""}${idx<estados.length-1?`<button onclick="moveCompany(${e.id},'${estados[idx+1][0]}')">→</button>`:""}</div>
      </div>`).join("")||`<p class="empty-pipeline">Sin empresas</p>`}
    </div>`;
  }).join("");
};

const renderEmpresasBase32 = renderEmpresas;
renderEmpresas = function(){
  const q=$("#empresaSearch")?.value?.toLowerCase()||"";
  const list = filteredEmpresasForView().filter(e=>!q||JSON.stringify(e).toLowerCase().includes(q));
  const title = dashboardFilters.empresas === "sinSeguimiento" ? "Empresas sin seguimiento" : "CRM de empresas colaboradoras";
  $("#empresas").innerHTML=pageHead("Empresas","Empresas",title)+`<section class="card table-card">
    <div class="toolbar">${filterPill("empresas","Filtro Dashboard")}<input id="empresaSearch" placeholder="Buscar empresa..." oninput="renderEmpresas()" value="${esc(q)}"><button class="primary" onclick="openEmpresa()">Añadir empresa</button></div>
    <table><thead><tr><th>Empresa</th><th>Sector</th><th>Contacto</th><th>Estado</th><th>Prioridad</th><th></th></tr></thead><tbody>
    ${list.map(e=>`<tr class="dashboard-clickable" onclick="openEmpresa360(${e.id})"><td><b>${esc(e.nombre)}</b><br><small>${esc(e.ciudad)} · ${esc(e.isla)}</small></td><td>${esc(e.sector)}</td><td>${esc(e.contacto)}<br><small>${esc(e.telefono)} · ${esc(e.email)}</small></td><td><span class="badge">${esc(e.estado)}</span></td><td>${esc(e.prioridad)}</td><td class="row-actions" onclick="event.stopPropagation()"><button onclick="openEmpresa(${e.id})">Editar</button><button onclick="delEmpresa(${e.id})">Eliminar</button></td></tr>`).join("")||`<tr><td colspan="6">No hay resultados.</td></tr>`}
    </tbody></table></section>`;
};

const renderAlumnosBase32 = renderAlumnos;
renderAlumnos = function(){
  const list = filteredAlumnosForView();
  $("#alumnos").innerHTML=pageHead("Alumnos","Alumnos",dashboardFilters.alumnos==="sinEmpresa"?"Alumnos sin empresa asignada":"Ficha completa del alumnado")+`<section class="card table-card"><div class="toolbar">${filterPill("alumnos","Filtro Dashboard")}<button class="primary" onclick="openAlumno()">Añadir alumno</button></div><table><thead><tr><th>Alumno</th><th>Contacto</th><th>Empresa</th><th>Estado</th><th>Archivos</th><th></th></tr></thead><tbody>${list.map(a=>`<tr class="student-row" onclick="openStudentProfile(${a.id})"><td><div class="student-cell"><div class="student-avatar">${a.foto?.data?`<img src="${a.foto.data}">`:`<span>${esc((a.nombre||"A")[0])}</span>`}</div><div><b>${esc(a.nombre)}</b><br><small>NSS: ${esc(a.nss||"")}</small></div></div></td><td>${esc(a.telefono)}<br><small>${esc(a.email)}</small></td><td>${esc(a.empresa||"Sin empresa")}</td><td><span class="badge">${esc(a.estado)}</span></td><td onclick="event.stopPropagation()"><div class="student-files">${a.foto?.data?`<button onclick="previewAnyFile(state.alumnos.find(x=>x.id===${a.id}).foto,'Foto')">Foto</button>`:`<span>Sin foto</span>`}${a.curriculum?.data?`<button onclick="previewAnyFile(state.alumnos.find(x=>x.id===${a.id}).curriculum,'CV')">CV</button>`:`<span>Sin CV</span>`}</div></td><td class="row-actions" onclick="event.stopPropagation()"><button onclick="openAlumno(${a.id})">Editar</button><button onclick="delAlumno(${a.id})">Eliminar</button></td></tr>`).join("")||`<tr><td colspan="6">No hay resultados.</td></tr>`}</tbody></table></section>`;
};

const renderConveniosBase32 = renderConvenios;
renderConvenios = function(){
  const list = filteredConveniosForView();
  $("#convenios").innerHTML=pageHead("Convenios","Convenios",dashboardFilters.convenios==="pendientes"?"Convenios pendientes de completar":"Borradores, firmas y anexos")+`<section class="grid-2"><div class="card table-card"><div class="toolbar">${filterPill("convenios","Filtro Dashboard")}<button class="primary" onclick="openConvenio()">Nuevo convenio</button><button class="soft-btn" onclick="show('documentos')">Archivo documental</button></div><table><thead><tr><th>Empresa</th><th>Fechas</th><th>Estado</th><th>Anexos</th><th></th></tr></thead><tbody>${list.map(c=>`<tr><td><b>${esc(c.empresa)}</b><br><small>${esc(c.centro)}</small></td><td>${esc(c.inicio)} → ${esc(c.fin)}</td><td><span class="badge">${esc(c.estado)}</span></td><td>${(c.anexos||[]).length}</td><td class="row-actions"><button onclick="openConvenio(${c.id})">Editar</button><button onclick="attachDoc(${c.id})">Anexar</button><button onclick="delConvenio(${c.id})">Eliminar</button></td></tr>`).join("")||`<tr><td colspan="5">No hay resultados.</td></tr>`}</tbody></table></div><div class="card table-card"><div class="section-head"><div><p>Estado documental</p><h3>Checklist</h3></div></div><div class="list">${list.map(c=>`<article class="item"><div><b>${esc(c.empresa)}</b><p>${(c.anexos||[]).length>=3?"Completo":(c.anexos||[]).length?"Incompleto":"Pendiente"}</p></div><span>${esc(c.estado)}</span></article>`).join("")||"<p>No hay convenios.</p>"}</div></div></section>`;
};

const renderSeguimientoBase32 = renderSeguimiento;
renderSeguimiento = function(){
  const list = filteredSeguimientosForView();
  $("#seguimiento").innerHTML=pageHead("Seguimiento","Seguimiento",dashboardFilters.seguimiento==="llamadas"?"Llamadas registradas":dashboardFilters.seguimiento==="reuniones"?"Reuniones registradas":"Llamadas, emails, visitas y reuniones")+`<section class="grid-2"><div class="card table-card"><div class="toolbar">${filterPill("seguimiento","Filtro Dashboard")}</div><form class="form-grid" onsubmit="addSeguimiento(event)"><input id="segFecha" type="date" value="${today()}"><select id="segEmpresa">${state.empresas.map(e=>`<option>${esc(e.nombre)}</option>`).join("")}</select><select id="segTipo"><option>llamada</option><option>email</option><option>visita</option><option>reunión</option><option>LinkedIn</option></select><input id="segResultado" placeholder="Resultado"><input id="segProxima" placeholder="Próxima acción"><input id="segFechaProx" type="date" value="${datePlus(7)}"><input id="segResponsable" placeholder="Responsable"><button class="primary">Registrar</button></form></div><div class="card table-card"><div class="list">${list.map(s=>`<article class="item"><div><b>${esc(s.tipo)} · ${esc(s.empresa)}</b><p>${esc(s.resultado)} · Próxima: ${esc(s.proxima)}</p></div><span>${esc(s.fecha)}</span></article>`).join("")||"<p>No hay seguimientos con este filtro.</p>"}</div></div></section>`;
};

const renderExpedientesBase32 = renderExpedientes;
renderExpedientes = function(){
  const list = filteredExpedientesForView();
  const rows=list.map(a=>{const e=state.empresas.find(x=>x.nombre===a.empresa),c=state.convenios.find(x=>x.empresa===a.empresa),docs=state.documentos.filter(d=>d.alumno===a.nombre||d.empresa===a.empresa);return `<article class="card table-card"><div class="section-head"><div><p>Expediente</p><h3>${esc(a.nombre)}</h3></div><span class="badge">${esc(a.estado)}</span></div><div class="grid-2"><div><b>Empresa</b><p>${esc(a.empresa||"Sin empresa")}</p><b>Contacto</b><p>${esc(e?.contacto||"")}</p><b>Fechas</b><p>${esc(a.inicio||"")} → ${esc(a.fin||"")}</p></div><div><b>Convenio</b><p>${esc(c?.estado||"Sin convenio")}</p><b>Documentos</b><p>${docs.length} asociados</p><b>Próxima acción</b><p>${esc(state.seguimientos.find(s=>s.empresa===a.empresa)?.proxima||"Sin acción")}</p></div></div><button class="primary" onclick="openStudentProfile(${a.id})">Ver ficha</button></article>`}).join("");
  $("#expedientes").innerHTML=pageHead("Expedientes","Expedientes",dashboardFilters.expedientes==="practicasActivas"?"Prácticas activas":"Vista completa por alumno")+`${filterPill("expedientes","Filtro Dashboard")}<section class="grid-2">${rows||"<p>No hay expedientes con este filtro.</p>"}</section>`;
};

function openActivityTarget(text){
  const lower = String(text).toLowerCase();
  const empresa = state.empresas.find(e => lower.includes(String(e.nombre).toLowerCase()));
  if(empresa){ openEmpresa360(empresa.id); return; }
  const alumno = state.alumnos.find(a => lower.includes(String(a.nombre).toLowerCase()));
  if(alumno){ openStudentProfile(alumno.id); return; }
  if(lower.includes("documento")){ show("documentos"); return; }
  if(lower.includes("convenio")){ show("convenios"); return; }
  if(lower.includes("seguimiento") || lower.includes("pendiente")){ show("seguimiento"); return; }
  show("dashboard");
}



/* =========================================================
   Bloom CRM 3.3 — Importar empresas desde Excel / CSV
========================================================= */
let pendingEmpresaImportRows = [];

function normalizeImportKey(key){
  return String(key || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function rowValue(row, keys){
  const normalized = {};
  Object.entries(row || {}).forEach(([k,v]) => normalized[normalizeImportKey(k)] = v);
  for(const key of keys){
    const value = normalized[normalizeImportKey(key)];
    if(value !== undefined && value !== null && String(value).trim() !== "") return String(value).trim();
  }
  return "";
}

function mapEmpresaImportRow(row){
  const nombre = rowValue(row, ["nombre_empresa","empresa","nombre","company","name"]);
  return {
    id: uid(),
    nombre,
    sector: rowValue(row, ["sector","actividad","industria"]),
    subsector: rowValue(row, ["subsector","sub_sector","subactividad"]),
    ciudad: rowValue(row, ["ciudad","municipio","localidad"]) || "Las Palmas",
    isla: rowValue(row, ["isla"]) || "Gran Canaria",
    web: rowValue(row, ["web","website","pagina_web","url"]),
    fuente: rowValue(row, ["fuente","origen"]),
    acepta_practicas: rowValue(row, ["acepta_practicas","acepta prácticas","acepta","practicas"]),
    tipo_practicas: rowValue(row, ["tipo_practicas","tipo prácticas","tipo"]),
    ciclos_recomendados: rowValue(row, ["ciclos_recomendados","ciclos","ciclo"]),
    contacto: rowValue(row, ["contacto_nombre","contacto","persona_contacto","nombre_contacto"]),
    email: rowValue(row, ["contacto_email","email","correo","correo_electronico","mail"]),
    telefono: rowValue(row, ["contacto_telefono","telefono","teléfono","phone","movil","móvil"]),
    estado: rowValue(row, ["estado_crm","estado","status"]) || "nueva",
    prioridad: rowValue(row, ["prioridad","priority"]) || "media",
    notas: rowValue(row, ["notas","observaciones","comentarios"])
  };
}

function openEmpresaImport(){
  modal("Importar empresas desde Excel", `
    <section class="import-panel">
      <p>Sube un archivo <b>.xlsx</b>, <b>.xls</b> o <b>.csv</b>. Bloom leerá las columnas y las convertirá en empresas.</p>
      <div class="import-actions">
        <label class="import-file-label">Seleccionar archivo
          <input id="empresaImportFile" type="file" accept=".xlsx,.xls,.csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">
        </label>
        <button type="button" class="soft-btn" onclick="downloadEmpresaTemplate()">Descargar plantilla</button>
      </div>

      <div class="import-help">
        <b>Columnas recomendadas</b>
        <span>nombre_empresa, sector, subsector, ciudad, isla, web, fuente, acepta_practicas, tipo_practicas, ciclos_recomendados, contacto_nombre, contacto_email, contacto_telefono, estado_crm, prioridad, notas</span>
      </div>

      <label class="import-option">
        <input id="empresaImportUpdateExisting" type="checkbox" checked>
        Actualizar empresas existentes si el nombre coincide
      </label>

      <div id="empresaImportPreview" class="import-preview">
        <p>Selecciona un archivo para ver la vista previa.</p>
      </div>
    </section>
  `, () => confirmEmpresaImport());

  const input = $("#empresaImportFile");
  if(input) input.addEventListener("change", handleEmpresaImportFile);
}

async function handleEmpresaImportFile(event){
  const file = event.target.files?.[0];
  if(!file) return;

  const ext = file.name.toLowerCase().split(".").pop();
  try{
    let rows = [];
    if(ext === "csv"){
      const text = await file.text();
      rows = parseCSVRows(text);
    }else{
      if(!window.XLSX){
        $("#empresaImportPreview").innerHTML = `<div class="import-error">No se pudo cargar el lector Excel. Revisa la conexión o usa CSV.</div>`;
        return;
      }
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: "array" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    }

    pendingEmpresaImportRows = rows.map(mapEmpresaImportRow).filter(r => r.nombre);
    renderEmpresaImportPreview(pendingEmpresaImportRows, rows.length);
  }catch(error){
    console.error(error);
    $("#empresaImportPreview").innerHTML = `<div class="import-error">No se pudo leer el archivo. Comprueba que el formato sea correcto.</div>`;
  }
}

function parseCSVRows(text){
  const lines = String(text || "").replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
  if(!lines.length) return [];
  const parseLine = (line) => {
    const out = [];
    let current = "", quoted = false;
    for(let i=0;i<line.length;i++){
      const ch = line[i];
      if(ch === '"' && line[i+1] === '"'){ current += '"'; i++; continue; }
      if(ch === '"'){ quoted = !quoted; continue; }
      if(ch === "," && !quoted){ out.push(current); current = ""; continue; }
      out.push ? null : null;
      current += ch;
    }
    out.push(current);
    return out.map(v => v.trim());
  };
  const headers = parseLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseLine(line);
    const obj = {};
    headers.forEach((h,i)=>obj[h]=values[i] || "");
    return obj;
  });
}

function renderEmpresaImportPreview(rows, rawCount){
  const preview = $("#empresaImportPreview");
  if(!preview) return;

  const duplicates = rows.filter(r => state.empresas.some(e => String(e.nombre).toLowerCase() === String(r.nombre).toLowerCase())).length;
  preview.innerHTML = `
    <div class="import-summary">
      <article><b>${rawCount}</b><span>Filas leídas</span></article>
      <article><b>${rows.length}</b><span>Empresas válidas</span></article>
      <article><b>${duplicates}</b><span>Coincidencias existentes</span></article>
    </div>
    <div class="import-table-wrap">
      <table>
        <thead><tr><th>Empresa</th><th>Sector</th><th>Contacto</th><th>Email</th><th>Teléfono</th><th>Estado</th></tr></thead>
        <tbody>
          ${rows.slice(0,10).map(r=>`
            <tr>
              <td><b>${esc(r.nombre)}</b><br><small>${esc(r.ciudad)} · ${esc(r.isla)}</small></td>
              <td>${esc(r.sector)}</td>
              <td>${esc(r.contacto)}</td>
              <td>${esc(r.email)}</td>
              <td>${esc(r.telefono)}</td>
              <td><span class="badge">${esc(r.estado)}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
    ${rows.length > 10 ? `<p class="import-note">Mostrando 10 de ${rows.length} empresas.</p>` : ""}
  `;
}

function confirmEmpresaImport(){
  if(!pendingEmpresaImportRows.length){
    toast("No hay empresas válidas para importar");
    return;
  }

  const updateExisting = $("#empresaImportUpdateExisting")?.checked;
  let created = 0;
  let updated = 0;

  pendingEmpresaImportRows.forEach(row => {
    const existing = state.empresas.find(e => String(e.nombre).toLowerCase() === String(row.nombre).toLowerCase());
    if(existing && updateExisting){
      Object.assign(existing, {
        sector: row.sector || existing.sector,
        subsector: row.subsector || existing.subsector,
        ciudad: row.ciudad || existing.ciudad,
        isla: row.isla || existing.isla,
        web: row.web || existing.web,
        fuente: row.fuente || existing.fuente,
        acepta_practicas: row.acepta_practicas || existing.acepta_practicas,
        tipo_practicas: row.tipo_practicas || existing.tipo_practicas,
        ciclos_recomendados: row.ciclos_recomendados || existing.ciclos_recomendados,
        contacto: row.contacto || existing.contacto,
        email: row.email || existing.email,
        telefono: row.telefono || existing.telefono,
        estado: row.estado || existing.estado,
        prioridad: row.prioridad || existing.prioridad,
        notas: row.notas || existing.notas
      });
      updated++;
    }else if(!existing){
      state.empresas.unshift(row);
      created++;
    }
  });

  log(`Importación Excel: ${created} empresas añadidas, ${updated} actualizadas`);
  pendingEmpresaImportRows = [];
  save();
  closeModal();
  dashboardFilters.empresas = "all";
  show("empresas");
  toast(`${created} añadidas · ${updated} actualizadas 🌸`);
}

function downloadEmpresaTemplate(){
  const headers = [
    "nombre_empresa","sector","subsector","ciudad","isla","web","fuente","acepta_practicas",
    "tipo_practicas","ciclos_recomendados","contacto_nombre","contacto_email",
    "contacto_telefono","estado_crm","prioridad","notas"
  ];
  const example = [
    "Empresa Ejemplo","Administración","Gestoría","Las Palmas de Gran Canaria","Gran Canaria",
    "https://empresa-ejemplo.es","Contacto propio","por confirmar","FP","Administración y Finanzas",
    "Persona de RRHH","rrhh@empresa-ejemplo.es","928000000","nueva","media","Notas internas"
  ];

  if(window.XLSX){
    const ws = XLSX.utils.aoa_to_sheet([headers, example]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Empresas");
    XLSX.writeFile(wb, "plantilla_empresas_bloom_crm.xlsx");
  }else{
    const csv = [headers, example].map(row => row.map(v => `"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], {type:"text/csv;charset=utf-8"}));
    a.download = "plantilla_empresas_bloom_crm.csv";
    a.click();
  }
}

/* Añade botones de importación a Empresas manteniendo todos los filtros de Dashboard */
const renderEmpresasImportBase33 = renderEmpresas;
renderEmpresas = function(){
  renderEmpresasImportBase33();
  const toolbar = document.querySelector("#empresas .toolbar");
  if(toolbar && !document.querySelector("#importEmpresasBtn")){
    const importBtn = document.createElement("button");
    importBtn.id = "importEmpresasBtn";
    importBtn.className = "soft-btn";
    importBtn.type = "button";
    importBtn.textContent = "Importar Excel/CSV";
    importBtn.onclick = openEmpresaImport;

    const templateBtn = document.createElement("button");
    templateBtn.id = "templateEmpresasBtn";
    templateBtn.className = "soft-btn";
    templateBtn.type = "button";
    templateBtn.textContent = "Plantilla Excel";
    templateBtn.onclick = downloadEmpresaTemplate;

    toolbar.appendChild(importBtn);
    toolbar.appendChild(templateBtn);
  }
};



/* =========================================================
   Bloom CRM 3.4 — Supabase Storage para documentos
   Evita guardar archivos base64 gigantes en el JSON principal.
========================================================= */
const STORAGE_BUCKET = "bloom-crm-documents";

function safeFileName(name){
  return String(name || "archivo")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120) || "archivo";
}

function storagePublicUrl(path){
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;
}

function storageObjectUrl(path){
  return `${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${path}`;
}

async function uploadFileToStorage(file, folder="general"){
  if(!file) return null;

  const path = `${folder}/${new Date().getFullYear()}/${Date.now()}-${safeFileName(file.name)}`;

  try{
    setSync("Subiendo archivo...", "saving");
    const res = await fetch(storageObjectUrl(path), {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": file.type || "application/octet-stream",
        "x-upsert": "true"
      },
      body: file
    });

    if(!res.ok){
      const text = await res.text();
      throw new Error(text || `Storage HTTP ${res.status}`);
    }

    setSync("Archivo subido", "ok");
    return {
      name: file.name,
      type: file.type || "",
      size: file.size || 0,
      path,
      url: storagePublicUrl(path),
      storage: true
    };
  }catch(error){
    console.error("uploadFileToStorage", error);
    alert(
      "No se pudo subir el archivo a Supabase Storage.\n\n" +
      "Revisa que exista el bucket público 'bloom-crm-documents' y sus policies.\n\n" +
      "Detalle: " + (error.message || error)
    );
    setSync("Error Storage", "error");
    return null;
  }
}

function stripHeavyFiles(value){
  if(Array.isArray(value)) return value.map(stripHeavyFiles);
  if(value && typeof value === "object"){
    const out = {};
    for(const [k,v] of Object.entries(value)){
      if(k === "data" && typeof v === "string" && v.startsWith("data:")) continue;
      out[k] = stripHeavyFiles(v);
    }
    return out;
  }
  return value;
}

saveCloud = async function(silent=false){
  try{
    setSync("Guardando...", "saving");
    const lightState = stripHeavyFiles(state);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/bloom_crm_backups`, {
      method:"POST",
      headers:{
        apikey:SUPABASE_KEY,
        Authorization:`Bearer ${SUPABASE_KEY}`,
        "Content-Type":"application/json",
        Prefer:"resolution=merge-duplicates,return=minimal"
      },
      body:JSON.stringify({ id:CLOUD_ID, data:lightState, updated_at:new Date().toISOString() })
    });
    if(!res.ok) throw new Error(await res.text());
    setSync("Sincronizado", "ok");
    if(!silent) toast("Guardado ligero en nube 🌸");
  }catch(e){
    console.error(e);
    setSync("Error nube", "error");
    if(!silent) alert("Error Supabase:\n\n" + e.message);
  }
};

const filePreviewHTMLBase34 = filePreviewHTML;
filePreviewHTML = function(file, aid="x"){
  if(file?.url){
    const name = file.name || "archivo";
    const type = file.type || "";
    const pdf = type.includes("pdf") || name.toLowerCase().endsWith(".pdf");
    const img = type.includes("image") || /\.(png|jpg|jpeg|webp)$/i.test(name);
    const docx = name.toLowerCase().endsWith(".docx");
    if(pdf) return `<div class="student-cv-preview"><iframe src="${file.url}"></iframe></div><div class="student-cv-actions"><a href="${file.url}" target="_blank">Abrir</a><a href="${file.url}" download="${esc(name)}">Descargar</a></div>`;
    if(img) return `<div class="student-cv-image"><img src="${file.url}"></div><div class="student-cv-actions"><a href="${file.url}" target="_blank">Abrir</a><a href="${file.url}" download="${esc(name)}">Descargar</a></div>`;
    if(docx) return `<div class="student-cv-empty"><b>${esc(name)}</b><span>Word guardado en Supabase Storage. Descárgalo o súbelo en PDF para vista previa directa.</span></div><div class="student-cv-actions"><a href="${file.url}" target="_blank">Abrir/descargar Word</a></div>`;
    return `<div class="student-cv-empty"><b>${esc(name)}</b><span>Archivo guardado en Storage.</span></div><div class="student-cv-actions"><a href="${file.url}" target="_blank">Abrir/descargar</a></div>`;
  }
  return filePreviewHTMLBase34(file, aid);
};

previewAnyFile = function(file, title="Documento"){
  modal("Previsualizar documento", `<section><h2>${esc(title)}</h2>${filePreviewHTML(file,"modal")}</section>`, ()=>closeModal());
};

openAlumno = function(aid=null){
  const a=state.alumnos.find(x=>x.id===aid)||{nombre:"",telefono:"",email:"",direccion:"",nss:"",estado:"sin asignar",empresa:"",inicio:"",fin:"",tutor:"",notas:"",foto:null,curriculum:null};
  modal("Alumno",`<form id="alumnoForm" class="form-grid"><div class="student-photo-preview">${a.foto?.url?`<img src="${a.foto.url}">`:a.foto?.data?`<img src="${a.foto.data}">`:"Foto"}</div><input name="nombre" value="${esc(a.nombre)}" placeholder="Nombre" required><input name="telefono" value="${esc(a.telefono)}" placeholder="Teléfono"><input name="email" value="${esc(a.email)}" placeholder="Correo"><input name="direccion" value="${esc(a.direccion)}" placeholder="Dirección"><input name="nss" value="${esc(a.nss)}" placeholder="Nº Seguridad Social"><label class="student-files">Foto<input id="alumnoFoto" type="file" accept="image/*"></label><label class="student-files">Currículum<input id="alumnoCV" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"></label><select name="empresa"><option value="">Sin empresa</option>${state.empresas.map(e=>`<option ${a.empresa===e.nombre?"selected":""}>${esc(e.nombre)}</option>`).join("")}</select><select name="estado">${["sin asignar","propuesta","entrevista","prácticas","finalizado"].map(x=>`<option ${a.estado===x?"selected":""}>${x}</option>`).join("")}</select><input name="inicio" type="date" value="${esc(a.inicio)}"><input name="fin" type="date" value="${esc(a.fin)}"><input name="tutor" value="${esc(a.tutor)}" placeholder="Tutor"><textarea name="notas">${esc(a.notas)}</textarea></form>`,async()=>{
    Object.assign(a,Object.fromEntries(new FormData($("#alumnoForm")).entries()));
    const foto=$("#alumnoFoto").files[0], cv=$("#alumnoCV").files[0];
    if(foto){ const uploaded = await uploadFileToStorage(foto, `alumnos/${safeFileName(a.nombre || "alumno")}/foto`); if(uploaded) a.foto = uploaded; }
    if(cv){ const uploaded = await uploadFileToStorage(cv, `alumnos/${safeFileName(a.nombre || "alumno")}/cv`); if(uploaded) a.curriculum = uploaded; }
    if(!aid){a.id=uid();state.alumnos.unshift(a)}
    log(`Alumno guardado: ${a.nombre}`); save(); closeModal(); render();
  });
};

addDoc = async function(ev){
  ev.preventDefault();
  const rawFile = $("#docFile").files[0];
  if(!rawFile) return toast("Selecciona un archivo");
  const empresa = $("#docEmpresa").value;
  const alumno = $("#docAlumno").value;
  const folder = empresa ? `empresas/${safeFileName(empresa)}` : alumno ? `alumnos/${safeFileName(alumno)}/documentos` : "documentos";
  const uploaded = await uploadFileToStorage(rawFile, folder);
  if(!uploaded) return;
  state.documentos.unshift({
    id:uid(), nombre:$("#docNombre").value || rawFile.name, tipo:$("#docTipo").value,
    empresa, alumno, estado:$("#docEstado").value, fecha:$("#docFecha").value,
    subidoPor:$("#docUser").value, notas:$("#docNotas").value,
    carpeta:$("#docCarpeta").value, file:uploaded
  });
  log(`Documento subido: ${rawFile.name}`); save(); render(); toast("Documento guardado en Storage 🌸");
};

replaceDoc = function(id){
  const inp=document.createElement("input"); inp.type="file";
  inp.onchange=async()=>{
    const d=state.documentos.find(x=>x.id===id); if(!d || !inp.files[0]) return;
    const folder = d.empresa ? `empresas/${safeFileName(d.empresa)}` : d.alumno ? `alumnos/${safeFileName(d.alumno)}/documentos` : "documentos";
    const uploaded = await uploadFileToStorage(inp.files[0], folder);
    if(uploaded){ d.file = uploaded; d.nombre = uploaded.name; d.fecha = today(); log(`Documento reemplazado: ${uploaded.name}`); save(); render(); toast("Documento reemplazado 🌸"); }
  };
  inp.click();
};

function cleanLegacyBase64Files(){
  let cleaned = 0;
  const cleanFile = (f) => { if(f && f.data && !f.url){ delete f.data; cleaned++; } };
  state.alumnos.forEach(a => { cleanFile(a.foto); cleanFile(a.curriculum); });
  state.documentos.forEach(d => cleanFile(d.file));
  save(); render();
  alert(`Limpieza completada. Archivos base64 antiguos eliminados del backup: ${cleaned}.\n\nLos documentos antiguos sin URL deberán subirse de nuevo a Storage si quieres previsualizarlos.`);
}

const renderAjustesStorageBase34 = renderAjustes;
renderAjustes = function(){
  renderAjustesStorageBase34();
  const ajustes = $("#ajustes .grid-2");
  if(ajustes && !$("#storageSettingsCard")){
    ajustes.insertAdjacentHTML("beforeend", `<div id="storageSettingsCard" class="card table-card"><h3>Documentos en Supabase Storage</h3><p>Bucket esperado: <b>${STORAGE_BUCKET}</b></p><p>Los nuevos PDF, Word, fotos y documentos se subirán a Storage. El backup principal guardará solo metadatos ligeros para evitar errores de timeout.</p><button class="primary" onclick="downloadStorageSQL()">Descargar SQL Storage</button><button class="soft-btn" onclick="cleanLegacyBase64Files()">Limpiar base64 antiguo</button></div>`);
  }
};

function downloadStorageSQL(){
  const sql = `-- 1) Crea primero un bucket PUBLIC llamado bloom-crm-documents en Supabase > Storage.
-- 2) Después ejecuta estas policies en SQL Editor.

insert into storage.buckets (id, name, public)
values ('bloom-crm-documents', 'bloom-crm-documents', true)
on conflict (id) do update set public = true;

create policy "Bloom CRM public read documents"
on storage.objects
for select
to anon
using (bucket_id = 'bloom-crm-documents');

create policy "Bloom CRM public upload documents"
on storage.objects
for insert
to anon
with check (bucket_id = 'bloom-crm-documents');

create policy "Bloom CRM public update documents"
on storage.objects
for update
to anon
using (bucket_id = 'bloom-crm-documents')
with check (bucket_id = 'bloom-crm-documents');

create policy "Bloom CRM public delete documents"
on storage.objects
for delete
to anon
using (bucket_id = 'bloom-crm-documents');`;
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([sql],{type:"text/sql;charset=utf-8"}));
  a.download="bloom-crm-storage-policies.sql";
  a.click();
}



/* =========================================================
   Bloom CRM 3.5 — privacidad real por usuario
   - Supabase Auth
   - Bucket privado
   - Signed URLs temporales para ver documentos
   - Backup JSON por usuario autenticado
========================================================= */

let bloomSupabase = null;
let bloomUser = null;
let signedUrlCache = new Map();

function initPrivateSupabaseClient(){
  if(window.supabase && !bloomSupabase){
    bloomSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }
}

async function refreshBloomUser(){
  initPrivateSupabaseClient();
  if(!bloomSupabase) return null;
  const { data } = await bloomSupabase.auth.getUser();
  bloomUser = data?.user || null;
  renderAuthStatus();
  return bloomUser;
}

function requirePrivateUser(){
  if(!bloomUser){
    alert("Para proteger tus datos, inicia sesión en Ajustes antes de guardar o adjuntar documentos.");
    show("ajustes");
    return false;
  }
  return true;
}

function privateCloudId(){
  return bloomUser ? `user-${bloomUser.id}` : CLOUD_ID;
}

function privateStoragePath(path){
  if(!bloomUser) return path;
  return `${bloomUser.id}/${path}`;
}

async function signPrivateFile(path, expires=300){
  if(!path) return "";
  if(!bloomSupabase || !bloomUser) return "";

  const cached = signedUrlCache.get(path);
  if(cached && cached.expiresAt > Date.now() + 30000) return cached.url;

  const { data, error } = await bloomSupabase
    .storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(path, expires);

  if(error){
    console.error("createSignedUrl", error);
    return "";
  }

  signedUrlCache.set(path, {
    url: data.signedUrl,
    expiresAt: Date.now() + expires * 1000
  });

  return data.signedUrl;
}

async function loginBloomEmail(){
  initPrivateSupabaseClient();
  const email = $("#authEmail")?.value?.trim();
  const password = $("#authPassword")?.value || "";

  if(!email) return toast("Introduce tu email");

  try{
    let result;
    if(password){
      result = await bloomSupabase.auth.signInWithPassword({ email, password });
      if(result.error && String(result.error.message || "").toLowerCase().includes("invalid")){
        result = await bloomSupabase.auth.signUp({ email, password });
      }
    }else{
      result = await bloomSupabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.href.split("#")[0] }
      });
    }

    if(result.error) throw result.error;
    await refreshBloomUser();
    renderAjustes();
    toast(password ? "Sesión iniciada 🌸" : "Revisa tu correo para entrar 🌸");
  }catch(error){
    alert("No se pudo iniciar sesión:\n\n" + (error.message || error));
  }
}

async function logoutBloom(){
  if(!bloomSupabase) return;
  await bloomSupabase.auth.signOut();
  bloomUser = null;
  renderAjustes();
  toast("Sesión cerrada");
}

function renderAuthStatus(){
  const box = $("#authStatus");
  if(!box) return;
  box.innerHTML = bloomUser
    ? `<div class="auth-ok"><b>Sesión privada activa</b><span>${esc(bloomUser.email || bloomUser.id)}</span></div>`
    : `<div class="auth-warn"><b>Sin sesión privada</b><span>Inicia sesión para guardar datos y documentos de forma privada.</span></div>`;
}

/* Reemplaza saveCloud: solo guarda copia del usuario autenticado */
saveCloud = async function(silent=false){
  if(!requirePrivateUser()) return;

  try{
    setSync("Guardando privado...", "saving");
    const lightState = stripHeavyFiles ? stripHeavyFiles(state) : state;

    const res = await fetch(`${SUPABASE_URL}/rest/v1/bloom_crm_backups`, {
      method:"POST",
      headers:{
        apikey:SUPABASE_KEY,
        Authorization:`Bearer ${(await bloomSupabase.auth.getSession()).data.session.access_token}`,
        "Content-Type":"application/json",
        Prefer:"resolution=merge-duplicates,return=minimal"
      },
      body:JSON.stringify({
        id: privateCloudId(),
        data: lightState,
        updated_at:new Date().toISOString()
      })
    });

    if(!res.ok) throw new Error(await res.text());
    setSync("Privado sincronizado", "ok");
    if(!silent) toast("Datos privados guardados 🌸");
  }catch(error){
    console.error(error);
    setSync("Error privado", "error");
    if(!silent) alert("Error guardando privado:\n\n" + (error.message || error));
  }
};

/* Reemplaza loadCloud: carga solo copia del usuario autenticado */
loadCloud = async function(){
  if(!requirePrivateUser()) return;

  try{
    setSync("Cargando privado...", "saving");
    const session = (await bloomSupabase.auth.getSession()).data.session;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/bloom_crm_backups?id=eq.${privateCloudId()}&select=data`, {
      headers:{
        apikey:SUPABASE_KEY,
        Authorization:`Bearer ${session.access_token}`
      }
    });

    if(!res.ok) throw new Error(await res.text());
    const rows = await res.json();

    if(rows[0]?.data){
      state = rows[0].data;
      localStorage.setItem(KEY, JSON.stringify(state));
      render();
      setSync("Privado sincronizado", "ok");
      toast("Datos privados cargados 🌸");
    }else{
      toast("No hay copia privada todavía");
    }
  }catch(error){
    console.error(error);
    setSync("Error privado", "error");
    alert("Error cargando privado:\n\n" + (error.message || error));
  }
};

/* Reemplaza Storage: bucket privado, rutas por usuario */
uploadFileToStorage = async function(file, folder="general"){
  if(!file) return null;
  if(!requirePrivateUser()) return null;

  const relativePath = `${folder}/${new Date().getFullYear()}/${Date.now()}-${safeFileName(file.name)}`;
  const path = privateStoragePath(relativePath);

  try{
    setSync("Subiendo privado...", "saving");
    const { data, error } = await bloomSupabase
      .storage
      .from(STORAGE_BUCKET)
      .upload(path, file, {
        upsert: true,
        contentType: file.type || "application/octet-stream"
      });

    if(error) throw error;

    setSync("Archivo privado subido", "ok");
    return {
      name:file.name,
      type:file.type || "",
      size:file.size || 0,
      path:data.path,
      storage:true,
      private:true
    };
  }catch(error){
    console.error("uploadFileToStorage private", error);
    alert(
      "No se pudo subir el archivo al Storage privado.\n\n" +
      "Revisa que exista el bucket privado 'bloom-crm-documents' y sus policies para usuarios autenticados.\n\n" +
      "Detalle: " + (error.message || error)
    );
    setSync("Error Storage", "error");
    return null;
  }
};

/* Vista previa privada con URL firmada temporal */
filePreviewHTML = function(file, aid="x"){
  if(!file?.data && !file?.path && !file?.url){
    return `<div class="student-cv-empty">No hay archivo adjunto.</div>`;
  }

  if(file?.path && file?.private){
    const previewId = `private-preview-${String(aid).replace(/[^a-zA-Z0-9_-]/g,"")}-${Math.floor(Math.random()*99999)}`;
    setTimeout(() => renderPrivatePreview(file, previewId), 80);
    return `<div id="${previewId}" class="student-cv-empty"><b>Preparando vista privada...</b><span>Generando enlace temporal seguro.</span></div>`;
  }

  if(file?.url){
    const name=file.name||"archivo", type=file.type||"";
    const pdf=type.includes("pdf")||name.toLowerCase().endsWith(".pdf");
    const img=type.includes("image")||/\.(png|jpg|jpeg|webp)$/i.test(name);
    if(pdf) return `<div class="student-cv-preview"><iframe src="${file.url}"></iframe></div><div class="student-cv-actions"><a href="${file.url}" target="_blank">Abrir</a><a href="${file.url}" download="${esc(name)}">Descargar</a></div>`;
    if(img) return `<div class="student-cv-image"><img src="${file.url}"></div><div class="student-cv-actions"><a href="${file.url}" target="_blank">Abrir</a><a href="${file.url}" download="${esc(name)}">Descargar</a></div>`;
    return `<div class="student-cv-empty"><b>${esc(name)}</b><span>Archivo guardado.</span></div><div class="student-cv-actions"><a href="${file.url}" target="_blank">Abrir/descargar</a></div>`;
  }

  /* Base64 antiguo */
  return filePreviewHTMLBase34 ? filePreviewHTMLBase34(file, aid) : `<div class="student-cv-empty">Archivo heredado.</div>`;
};

async function renderPrivatePreview(file, targetId){
  const target = document.getElementById(targetId);
  if(!target) return;

  const signed = await signPrivateFile(file.path);
  const name = file.name || "archivo";
  const type = file.type || "";
  const pdf = type.includes("pdf") || name.toLowerCase().endsWith(".pdf");
  const img = type.includes("image") || /\.(png|jpg|jpeg|webp)$/i.test(name);
  const docx = name.toLowerCase().endsWith(".docx");

  if(!signed){
    target.innerHTML = `<b>No se pudo generar vista privada.</b><span>Vuelve a iniciar sesión o revisa las policies.</span>`;
    return;
  }

  if(pdf){
    target.outerHTML = `<div class="student-cv-preview"><iframe src="${signed}"></iframe></div><div class="student-cv-actions"><a href="${signed}" target="_blank">Abrir temporal</a><a href="${signed}" download="${esc(name)}">Descargar</a></div>`;
    return;
  }

  if(img){
    target.outerHTML = `<div class="student-cv-image"><img src="${signed}"></div><div class="student-cv-actions"><a href="${signed}" target="_blank">Abrir temporal</a><a href="${signed}" download="${esc(name)}">Descargar</a></div>`;
    return;
  }

  if(docx){
    target.outerHTML = `<div class="student-cv-empty"><b>${esc(name)}</b><span>Word guardado de forma privada. Descárgalo o súbelo en PDF para vista previa directa.</span></div><div class="student-cv-actions"><a href="${signed}" target="_blank">Abrir/descargar temporal</a></div>`;
    return;
  }

  target.outerHTML = `<div class="student-cv-empty"><b>${esc(name)}</b><span>Archivo privado guardado.</span></div><div class="student-cv-actions"><a href="${signed}" target="_blank">Abrir/descargar temporal</a></div>`;
}

previewAnyFile = function(file, title="Documento"){
  modal("Previsualizar documento", `<section><h2>${esc(title)}</h2>${filePreviewHTML(file,"modal")}</section>`, ()=>closeModal());
};

/* Ajustes privados */
const renderAjustesPrivateBase35 = renderAjustes;
renderAjustes = function(){
  renderAjustesPrivateBase35();
  const ajustes = $("#ajustes .grid-2");
  if(ajustes && !$("#privacySettingsCard")){
    ajustes.insertAdjacentHTML("afterbegin", `
      <div id="privacySettingsCard" class="card table-card privacy-card">
        <h3>Cuenta privada</h3>
        <div id="authStatus"></div>
        <div class="form-grid">
          <input id="authEmail" type="email" placeholder="Tu email">
          <input id="authPassword" type="password" placeholder="Contraseña opcional">
        </div>
        <div class="settings-row">
          <button class="primary" onclick="loginBloomEmail()">Entrar / crear cuenta</button>
          <button class="soft-btn" onclick="logoutBloom()">Cerrar sesión</button>
        </div>
        <p>Sin sesión privada no se subirán documentos ni se guardará en la nube. Los archivos se almacenan en bucket privado y se visualizan con URLs temporales.</p>
      </div>
    `);
  }

  const storageCard = $("#storageSettingsCard");
  if(storageCard){
    storageCard.querySelector("p").innerHTML = "Bucket esperado: <b>bloom-crm-documents</b> privado.";
  }

  renderAuthStatus();
};

downloadStorageSQL = function(){
  const sql = `-- Bloom CRM privado
-- Ejecuta esto en Supabase SQL Editor.

-- 1) Tabla de backups por usuario.
create table if not exists bloom_crm_backups (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

alter table bloom_crm_backups enable row level security;

drop policy if exists "Bloom CRM private read backup" on bloom_crm_backups;
drop policy if exists "Bloom CRM private insert backup" on bloom_crm_backups;
drop policy if exists "Bloom CRM private update backup" on bloom_crm_backups;

create policy "Bloom CRM private read backup"
on bloom_crm_backups
for select
to authenticated
using (id = ('user-' || auth.uid()::text));

create policy "Bloom CRM private insert backup"
on bloom_crm_backups
for insert
to authenticated
with check (id = ('user-' || auth.uid()::text));

create policy "Bloom CRM private update backup"
on bloom_crm_backups
for update
to authenticated
using (id = ('user-' || auth.uid()::text))
with check (id = ('user-' || auth.uid()::text));

-- 2) Bucket privado.
insert into storage.buckets (id, name, public)
values ('bloom-crm-documents', 'bloom-crm-documents', false)
on conflict (id) do update set public = false;

-- 3) Policies Storage privado por carpeta de usuario.
drop policy if exists "Bloom CRM private read documents" on storage.objects;
drop policy if exists "Bloom CRM private upload documents" on storage.objects;
drop policy if exists "Bloom CRM private update documents" on storage.objects;
drop policy if exists "Bloom CRM private delete documents" on storage.objects;

create policy "Bloom CRM private read documents"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'bloom-crm-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Bloom CRM private upload documents"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'bloom-crm-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Bloom CRM private update documents"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'bloom-crm-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'bloom-crm-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Bloom CRM private delete documents"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'bloom-crm-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);`;

  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([sql],{type:"text/sql;charset=utf-8"}));
  a.download="bloom-crm-private-supabase.sql";
  a.click();
};

/* Inicialización Auth */
document.addEventListener("DOMContentLoaded", async () => {
  initPrivateSupabaseClient();
  if(bloomSupabase){
    bloomSupabase.auth.onAuthStateChange(async () => {
      await refreshBloomUser();
      renderAjustes();
    });
    await refreshBloomUser();
  }
});



/* =========================================================
   Bloom CRM 4.0 — Arquitectura profesional privada
   - Login obligatorio antes de ver el CRM
   - Supabase Auth
   - Tablas por entidad
   - RLS por owner_id
   - Storage privado con Signed URLs
   - Sin localStorage como fuente principal
========================================================= */

const NORMALIZED_TABLES = {
  empresas: "bloom_empresas",
  alumnos: "bloom_alumnos",
  convenios: "bloom_convenios",
  documentos: "bloom_documentos",
  carpetas: "bloom_carpetas",
  seguimientos: "bloom_seguimientos",
  emails: "bloom_email_templates",
  actividad: "bloom_actividad"
};

let bloomProfessionalReady = false;
let bloomIsLoadingCloud = false;
let bloomSaveQueue = Promise.resolve();
let bloomSignedUrlCache = new Map();

function emptyCRMState(){
  return {
    empresas: [],
    alumnos: [],
    convenios: [],
    documentos: [],
    carpetas: [
      {id:"all",nombre:"Todas"},
      {id:"sin",nombre:"Sin carpeta"},
      {id:"curso",nombre:"Curso 2025/26"},
      {id:"conv",nombre:"Convenios"}
    ],
    seguimientos: [],
    emails: [],
    actividad: []
  };
}

function ensureSupabaseClient4(){
  if(window.supabase && !bloomSupabase){
    bloomSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession:true, autoRefreshToken:true, detectSessionInUrl:true }
    });
  }
  return bloomSupabase;
}

function authToken4(){
  return bloomSupabase.auth.getSession().then(({data}) => data.session?.access_token || "");
}

function setGateStatus(text, type="info"){
  const el = $("#authGateStatus");
  if(el){
    el.className = "auth-status " + type;
    el.textContent = text;
  }
}

function lockCRM(){
  document.body.classList.add("locked");
  state = emptyCRMState();
}

function unlockCRM(){
  document.body.classList.remove("locked");
}

async function getCurrentUser4(){
  ensureSupabaseClient4();
  if(!bloomSupabase) return null;
  const { data } = await bloomSupabase.auth.getUser();
  bloomUser = data?.user || null;
  return bloomUser;
}

async function loginPassword4(mode="login"){
  ensureSupabaseClient4();
  const email = $("#gateEmail")?.value?.trim();
  const password = $("#gatePassword")?.value || "";

  if(!email || !password){
    setGateStatus("Introduce email y contraseña.", "error");
    return;
  }

  try{
    setGateStatus(mode === "signup" ? "Creando cuenta..." : "Entrando...", "info");
    const result = mode === "signup"
      ? await bloomSupabase.auth.signUp({ email, password })
      : await bloomSupabase.auth.signInWithPassword({ email, password });

    if(result.error) throw result.error;

    await bootstrapPrivateCRM4();
  }catch(error){
    setGateStatus(error.message || "No se pudo iniciar sesión.", "error");
  }
}

async function loginMagic4(){
  ensureSupabaseClient4();
  const email = $("#gateEmail")?.value?.trim();
  if(!email){
    setGateStatus("Introduce tu email.", "error");
    return;
  }
  const { error } = await bloomSupabase.auth.signInWithOtp({
    email,
    options:{ emailRedirectTo: window.location.href.split("#")[0] }
  });
  if(error) setGateStatus(error.message, "error");
  else setGateStatus("Revisa tu correo para entrar.", "ok");
}

async function logout4(){
  ensureSupabaseClient4();
  await bloomSupabase.auth.signOut();
  bloomUser = null;
  lockCRM();
  setGateStatus("Sesión cerrada.", "info");
}

function userId4(){
  return bloomUser?.id || "";
}

function tableRowFromEntity(entity){
  const row = { id:String(entity.id), owner_id:userId4(), data:stripHeavyFiles ? stripHeavyFiles(entity) : entity };
  if(entity.nombre) row.nombre = entity.nombre;
  if(entity.empresa) row.empresa = entity.empresa;
  if(entity.estado) row.estado = entity.estado;
  if(entity.sector) row.sector = entity.sector;
  if(entity.tipo) row.tipo = entity.tipo;
  if(entity.fecha) row.fecha = entity.fecha;
  if(entity.fechaProxima) row.fecha_proxima = entity.fechaProxima;
  if(entity.carpeta) row.carpeta = String(entity.carpeta);
  return row;
}

async function upsertEntityTable(key){
  const table = NORMALIZED_TABLES[key];
  const rows = (state[key] || [])
    .filter(x => x && x.id !== "all" && x.id !== "sin")
    .map(tableRowFromEntity);

  if(!rows.length) return;

  const { error } = await bloomSupabase.from(table).upsert(rows, { onConflict:"id" });
  if(error) throw error;
}

async function loadEntityTable(key){
  const table = NORMALIZED_TABLES[key];
  const { data, error } = await bloomSupabase
    .from(table)
    .select("id,data")
    .order("updated_at", { ascending:false });

  if(error) throw error;
  return (data || []).map(r => r.data || {});
}

async function loadAllNormalized4(){
  if(!bloomUser) return;
  bloomIsLoadingCloud = true;
  setSync("Cargando privado...", "saving");

  const loaded = emptyCRMState();
  loaded.empresas = await loadEntityTable("empresas");
  loaded.alumnos = await loadEntityTable("alumnos");
  loaded.convenios = await loadEntityTable("convenios");
  loaded.documentos = await loadEntityTable("documentos");
  loaded.seguimientos = await loadEntityTable("seguimientos");
  loaded.emails = await loadEntityTable("emails");
  loaded.actividad = await loadEntityTable("actividad");

  const cloudFolders = await loadEntityTable("carpetas");
  loaded.carpetas = [
    {id:"all",nombre:"Todas"},
    {id:"sin",nombre:"Sin carpeta"},
    ...(cloudFolders.length ? cloudFolders : [{id:"curso",nombre:"Curso 2025/26"},{id:"conv",nombre:"Convenios"}])
  ];

  state = loaded;
  bloomIsLoadingCloud = false;
}



async function persistAllNormalized4(){
  if(!bloomUser || bloomIsLoadingCloud) return;
  bloomSaveQueue = bloomSaveQueue.then(async () => {
    try{
      setSync("Guardando privado...", "saving");
      await upsertEntityTable("empresas");
      await upsertEntityTable("alumnos");
      await upsertEntityTable("convenios");
      await upsertEntityTable("documentos");
      await upsertEntityTable("carpetas");
      await upsertEntityTable("seguimientos");
      await upsertEntityTable("emails");
      await upsertEntityTable("actividad");
      setSync("Privado sincronizado", "ok");
    }catch(error){
      console.error("persistAllNormalized4", error);
      setSync("Error guardado", "error");
      alert("Error guardando en Supabase:\n\n" + (error.message || error));
    }
  });
  return bloomSaveQueue;
}

/* Sustituye save: ya no usa localStorage como origen principal */
save = function(){
  if(!bloomUser){
    setSync("Sin sesión", "error");
    return;
  }
  persistAllNormalized4();
};

/* Mantiene compatibilidad con botones antiguos */
saveCloud = async function(silent=false){
  if(!bloomUser) return requirePrivateUser ? requirePrivateUser() : null;
  await persistAllNormalized4();
  if(!silent) toast("Datos guardados por tablas 🌸");
};

loadCloud = async function(){
  if(!bloomUser) return requirePrivateUser ? requirePrivateUser() : null;
  await loadAllNormalized4();
  render();
  toast("Datos privados cargados 🌸");
};

async function bootstrapPrivateCRM4(){
  const user = await getCurrentUser4();
  if(!user){
    lockCRM();
    return;
  }

  bloomUser = user;
  unlockCRM();
  setGateStatus("Sesión activa.", "ok");
  await loadAllNormalized4();
  render();
  renderAjustes();
  setSync("Privado sincronizado", "ok");
}

/* Storage privado: solo bajo carpeta auth.uid() */
uploadFileToStorage = async function(file, folder="general"){
  if(!file) return null;
  if(!bloomUser){
    alert("Inicia sesión antes de subir documentos.");
    return null;
  }

  const relativePath = `${folder}/${new Date().getFullYear()}/${Date.now()}-${safeFileName(file.name)}`;
  const path = `${bloomUser.id}/${relativePath}`;

  try{
    setSync("Subiendo archivo...", "saving");
    const { data, error } = await bloomSupabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { upsert:true, contentType:file.type || "application/octet-stream" });

    if(error) throw error;

    setSync("Archivo privado subido", "ok");
    return { name:file.name, type:file.type || "", size:file.size || 0, path:data.path, storage:true, private:true };
  }catch(error){
    console.error("uploadFileToStorage 4", error);
    alert("No se pudo subir el archivo privado.\n\nRevisa el bucket privado y las policies.\n\nDetalle: " + (error.message || error));
    setSync("Error Storage", "error");
    return null;
  }
};

async function signedUrl4(path, expires=300){
  if(!path || !bloomSupabase) return "";
  const cached = bloomSignedUrlCache.get(path);
  if(cached && cached.expires > Date.now() + 30000) return cached.url;

  const { data, error } = await bloomSupabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(path, expires);

  if(error){
    console.error("signedUrl4", error);
    return "";
  }
  bloomSignedUrlCache.set(path, { url:data.signedUrl, expires:Date.now() + expires*1000 });
  return data.signedUrl;
}

filePreviewHTML = function(file, aid="x"){
  if(!file?.path && !file?.data && !file?.url){
    return `<div class="student-cv-empty">No hay archivo adjunto.</div>`;
  }

  if(file?.path){
    const id = `signed-preview-${String(aid).replace(/[^a-zA-Z0-9_-]/g,"")}-${Math.floor(Math.random()*9999)}`;
    setTimeout(() => renderSignedPreview4(file, id), 80);
    return `<div id="${id}" class="student-cv-empty"><b>Preparando vista privada...</b><span>Generando enlace temporal seguro.</span></div>`;
  }

  if(file?.url){
    const n=file.name||"archivo", t=file.type||"";
    const pdf=t.includes("pdf")||n.toLowerCase().endsWith(".pdf");
    const img=t.includes("image")||/\.(png|jpg|jpeg|webp)$/i.test(n);
    if(pdf) return `<div class="student-cv-preview"><iframe src="${file.url}"></iframe></div><div class="student-cv-actions"><a href="${file.url}" target="_blank">Abrir</a><a href="${file.url}" download="${esc(n)}">Descargar</a></div>`;
    if(img) return `<div class="student-cv-image"><img src="${file.url}"></div><div class="student-cv-actions"><a href="${file.url}" target="_blank">Abrir</a><a href="${file.url}" download="${esc(n)}">Descargar</a></div>`;
  }

  return filePreviewHTMLBase34 ? filePreviewHTMLBase34(file, aid) : `<div class="student-cv-empty">Archivo heredado.</div>`;
};

async function renderSignedPreview4(file, id){
  const el = document.getElementById(id);
  if(!el) return;
  const url = await signedUrl4(file.path);
  const name = file.name || "archivo";
  const type = file.type || "";
  const pdf = type.includes("pdf") || name.toLowerCase().endsWith(".pdf");
  const img = type.includes("image") || /\.(png|jpg|jpeg|webp)$/i.test(name);

  if(!url){
    el.innerHTML = `<b>No se pudo abrir el archivo.</b><span>Revisa sesión y policies.</span>`;
    return;
  }

  if(pdf){
    el.outerHTML = `<div class="student-cv-preview"><iframe src="${url}"></iframe></div><div class="student-cv-actions"><a href="${url}" target="_blank">Abrir temporal</a><a href="${url}" download="${esc(name)}">Descargar</a></div>`;
  }else if(img){
    el.outerHTML = `<div class="student-cv-image"><img src="${url}"></div><div class="student-cv-actions"><a href="${url}" target="_blank">Abrir temporal</a><a href="${url}" download="${esc(name)}">Descargar</a></div>`;
  }else{
    el.outerHTML = `<div class="student-cv-empty"><b>${esc(name)}</b><span>Archivo privado guardado. Usa el enlace temporal para abrirlo.</span></div><div class="student-cv-actions"><a href="${url}" target="_blank">Abrir/descargar temporal</a></div>`;
  }
};

previewAnyFile = function(file, title="Documento"){
  modal("Previsualizar documento", `<section><h2>${esc(title)}</h2>${filePreviewHTML(file,"modal")}</section>`, ()=>closeModal());
};

/* Ajustes: panel de usuario privado */
renderAjustes = function(){
  $("#ajustes").innerHTML = pageHead("Ajustes","Ajustes","Cuenta privada, Supabase y mantenimiento") + `
    <section class="grid-2">
      <div class="card table-card privacy-card">
        <h3>Cuenta privada</h3>
        <div class="${bloomUser ? "auth-ok" : "auth-warn"}">
          <b>${bloomUser ? "Sesión activa" : "Sin sesión"}</b>
          <span>${esc(bloomUser?.email || "Inicia sesión para acceder a tus datos privados.")}</span>
        </div>
        <div class="settings-row">
          <button class="primary" onclick="loadCloud()">Recargar mis datos</button>
          <button class="soft-btn" onclick="logout4()">Cerrar sesión</button>
        </div>
      </div>

      <div class="card table-card">
        <h3>Supabase profesional</h3>
        <p>Datos separados por tablas, protegidos con RLS por usuario.</p>
        <button class="primary" onclick="downloadPrivateSchemaSQL4()">Descargar SQL completo</button>
      </div>

      <div class="card table-card">
        <h3>Backup local opcional</h3>
        <button class="primary" onclick="downloadBackup()">Descargar JSON local</button>
        <label class="soft-btn">Restaurar JSON local<input type="file" onchange="restoreBackup(event)" hidden></label>
      </div>

      <div class="card table-card">
        <h3>Storage privado</h3>
        <p>Bucket: <b>${STORAGE_BUCKET}</b>. Los documentos se abren con Signed URLs temporales.</p>
        <button class="soft-btn" onclick="cleanLegacyBase64Files && cleanLegacyBase64Files()">Limpiar base64 antiguo</button>
      </div>
    </section>`;
};

function downloadPrivateSchemaSQL4(){
  const sql = `-- Bloom CRM 4.0: esquema profesional privado
-- Ejecuta en Supabase SQL Editor.
-- Activa Email Auth en Authentication > Providers > Email.

create extension if not exists pgcrypto;

create table if not exists bloom_empresas (
  id text primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  nombre text,
  sector text,
  estado text,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_alumnos (
  id text primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  nombre text,
  empresa text,
  estado text,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_convenios (
  id text primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  empresa text,
  estado text,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_documentos (
  id text primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  nombre text,
  empresa text,
  tipo text,
  estado text,
  carpeta text,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_carpetas (
  id text primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  nombre text,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_seguimientos (
  id text primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  empresa text,
  tipo text,
  fecha date,
  fecha_proxima date,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_email_templates (
  id text primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  nombre text,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_actividad (
  id text primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table bloom_empresas enable row level security;
alter table bloom_alumnos enable row level security;
alter table bloom_convenios enable row level security;
alter table bloom_documentos enable row level security;
alter table bloom_carpetas enable row level security;
alter table bloom_seguimientos enable row level security;
alter table bloom_email_templates enable row level security;
alter table bloom_actividad enable row level security;

do $$
declare t text;
begin
  foreach t in array array['bloom_empresas','bloom_alumnos','bloom_convenios','bloom_documentos','bloom_carpetas','bloom_seguimientos','bloom_email_templates','bloom_actividad']
  loop
    execute format('drop policy if exists "owner select" on %I', t);
    execute format('drop policy if exists "owner insert" on %I', t);
    execute format('drop policy if exists "owner update" on %I', t);
    execute format('drop policy if exists "owner delete" on %I', t);

    execute format('create policy "owner select" on %I for select to authenticated using (owner_id = auth.uid())', t);
    execute format('create policy "owner insert" on %I for insert to authenticated with check (owner_id = auth.uid())', t);
    execute format('create policy "owner update" on %I for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid())', t);
    execute format('create policy "owner delete" on %I for delete to authenticated using (owner_id = auth.uid())', t);
  end loop;
end $$;

insert into storage.buckets (id, name, public)
values ('bloom-crm-documents', 'bloom-crm-documents', false)
on conflict (id) do update set public = false;

drop policy if exists "private read documents" on storage.objects;
drop policy if exists "private upload documents" on storage.objects;
drop policy if exists "private update documents" on storage.objects;
drop policy if exists "private delete documents" on storage.objects;

create policy "private read documents"
on storage.objects
for select
to authenticated
using (bucket_id = 'bloom-crm-documents' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "private upload documents"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'bloom-crm-documents' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "private update documents"
on storage.objects
for update
to authenticated
using (bucket_id = 'bloom-crm-documents' and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id = 'bloom-crm-documents' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "private delete documents"
on storage.objects
for delete
to authenticated
using (bucket_id = 'bloom-crm-documents' and (storage.foldername(name))[1] = auth.uid()::text);`;

  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([sql], {type:"text/sql;charset=utf-8"}));
  a.download = "bloom-crm-4-schema-privado.sql";
  a.click();
}

/* Login gate events */
document.addEventListener("DOMContentLoaded", async () => {
  ensureSupabaseClient4();

  $("#gateLoginBtn")?.addEventListener("click", () => loginPassword4("login"));
  $("#gateSignupBtn")?.addEventListener("click", () => loginPassword4("signup"));
  $("#gateMagicBtn")?.addEventListener("click", loginMagic4);
  $("#userPrivateBtn")?.addEventListener("click", () => show("ajustes"));

  if(bloomSupabase){
    bloomSupabase.auth.onAuthStateChange(async () => {
      const u = await getCurrentUser4();
      if(u) await bootstrapPrivateCRM4();
      else lockCRM();
    });
  }

  const u = await getCurrentUser4();
  if(u) await bootstrapPrivateCRM4();
  else lockCRM();
});

/* Bloquea render inicial si no hay sesión */
const renderBaseBeforeAuth4 = render;
render = function(){
  if(!bloomUser && document.body.classList.contains("locked")){
    return;
  }
  renderBaseBeforeAuth4();
};
