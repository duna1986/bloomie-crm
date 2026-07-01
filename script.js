/* Bloom CRM 3.0 reparado - código limpio */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const KEY="bloom_crm_3_state"; const SUPABASE_URL="https://wmvalzkkoivfwhhwhplw.supabase.co"; const SUPABASE_KEY="sb_publishable_fH2h9fGmXxTT5b9LMCfeQg_80RawgWH"; const CLOUD_ID="bloom-crm-3-main";
const icons={home:'<svg viewBox="0 0 24 24"><path d="M4 10.6 12 4l8 6.6V20h-6v-5h-4v5H4Z"/></svg>',building:'<svg viewBox="0 0 24 24"><path d="M5 21V5h14v16M8 9h2M14 9h2M8 13h2M14 13h2M3 21h18"/></svg>',student:'<svg viewBox="0 0 24 24"><path d="M12 4 3 8.5 12 13l9-4.5Z"/><path d="M6 11v5c2 2 10 2 12 0v-5"/></svg>',file:'<svg viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',folder:'<svg viewBox="0 0 24 24"><path d="M3 7h7l2 2h9v10H3Z"/></svg>',archive:'<svg viewBox="0 0 24 24"><path d="M3 7h18v4H3Z"/><path d="M5 11h14l-2 8H7Z"/></svg>',phone:'<svg viewBox="0 0 24 24"><path d="M6 4l4 4-2 2c1.5 3 3.5 5 6.5 6.5l2-2 4 4-2 3C10 20 4 14 3 6Z"/></svg>',mail:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 8 8 5 8-5"/></svg>',calendar:'<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>',chart:'<svg viewBox="0 0 24 24"><path d="M4 20h16M7 17V9M12 17V5M17 17v-6"/></svg>',settings:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M4 12h2M18 12h2M12 4v2M12 18v2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4"/></svg>',search:'<svg viewBox="0 0 24 24"><path d="m21 21-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"/></svg>',users:'<svg viewBox="0 0 24 24"><circle cx="9" cy="9" r="3"/><path d="M3 20c1-4 11-4 12 0"/><circle cx="17" cy="10" r="2"/><path d="M15 16c2 0 4 1 5 4"/></svg>'};
function uid(){return Date.now()+Math.floor(Math.random()*9999)} function today(){return new Date().toISOString().slice(0,10)} function datePlus(n){const d=new Date();d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)} function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))} function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),1800)} function fileToData(file){return new Promise(res=>{if(!file)return res(null);const r=new FileReader();r.onload=()=>res({name:file.name,type:file.type,size:file.size,data:r.result});r.readAsDataURL(file)})}
const seed={empresas:[{id:uid(),nombre:"Deloitte",sector:"Consultoría",isla:"Gran Canaria",ciudad:"Las Palmas",estado:"nueva",prioridad:"alta",contacto:"Laura Pérez",telefono:"928000001",email:"rrhh@deloitte.es",notas:"Potencial para administración y finanzas"},{id:uid()+1,nombre:"AON",sector:"Seguros",isla:"Gran Canaria",ciudad:"Las Palmas",estado:"contactada",prioridad:"alta",contacto:"Marta Sosa",telefono:"928000002",email:"canarias@aon.es",notas:"Enviar convenio"},{id:uid()+2,nombre:"EY",sector:"Consultoría",isla:"Gran Canaria",ciudad:"Las Palmas",estado:"interesada",prioridad:"media",contacto:"Javier Martín",telefono:"928000003",email:"talent@ey.es",notas:"Interesados"},{id:uid()+3,nombre:"Domingo Alonso",sector:"Automoción",isla:"Gran Canaria",ciudad:"Las Palmas",estado:"convenio",prioridad:"alta",contacto:"Beatriz Vega",telefono:"928000005",email:"personas@domingoalonso.com",notas:"Convenio enviado"},{id:uid()+4,nombre:"Clínica Dental",sector:"Salud",isla:"Gran Canaria",ciudad:"Las Palmas",estado:"activa",prioridad:"baja",contacto:"Sara González",telefono:"928000006",email:"info@clinicadental.es",notas:"Prácticas activas"}],alumnos:[{id:uid()+10,nombre:"María López",telefono:"600000001",email:"maria@email.com",direccion:"Las Palmas",nss:"123456789012",estado:"sin asignar",empresa:"",inicio:"",fin:"",tutor:"",notas:"",foto:null,curriculum:null},{id:uid()+11,nombre:"Juan Pérez",telefono:"600000002",email:"juan@email.com",direccion:"Telde",nss:"223456789012",estado:"prácticas",empresa:"Clínica Dental",inicio:today(),fin:datePlus(60),tutor:"Sara González",notas:"Buen progreso",foto:null,curriculum:null}],convenios:[{id:uid()+20,empresa:"AON",centro:"Centro educativo",inicio:today(),fin:datePlus(90),tutorEmpresa:"Marta Sosa",tutorCentro:"María García",estado:"pendiente",anexos:[]},{id:uid()+21,empresa:"Domingo Alonso",centro:"Centro educativo",inicio:today(),fin:datePlus(100),tutorEmpresa:"Beatriz Vega",tutorCentro:"María García",estado:"enviado",anexos:[]}],documentos:[],carpetas:[{id:"all",nombre:"Todas"},{id:"sin",nombre:"Sin carpeta"},{id:"curso",nombre:"Curso 2025/26"},{id:"conv",nombre:"Convenios"}],seguimientos:[{id:uid()+40,fecha:today(),empresa:"Deloitte",tipo:"llamada",resultado:"Pendiente respuesta",proxima:"Llamar a Deloitte",fechaProxima:today(),responsable:""},{id:uid()+41,fecha:today(),empresa:"AON",tipo:"email",resultado:"Convenio enviado",proxima:"Revisar firma",fechaProxima:datePlus(2),responsable:""}],emails:[{id:uid()+50,nombre:"Primer contacto",asunto:"Colaboración para prácticas",cuerpo:"Buenos días,\n\nNos gustaría valorar una posible colaboración para prácticas.\n\nUn saludo."}],actividad:[]};
let state=JSON.parse(JSON.stringify(seed)); if(!Array.isArray(state.dismissedNotifications)) state.dismissedNotifications=[]; let current="dashboard"; let activeFolder="all"; let selectedDate=today(); let draggedCompany=null; let cloudTimer=null;
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
function buildAllNotifications(){const list=[];state.empresas.filter(e=>!state.seguimientos.some(s=>s.empresa===e.nombre)).forEach(e=>list.push({id:`empresa-sin-seguimiento-${e.id}-${e.nombre}`,t:"Empresa",h:`${e.nombre} sin seguimiento`,p:"No tiene interacción registrada.",v:"empresas"}));state.convenios.filter(c=>c.estado!=="firmado"&&c.estado!=="completo").forEach(c=>list.push({id:`convenio-pendiente-${c.id}-${c.estado}`,t:"Convenio",h:`Convenio pendiente · ${c.empresa}`,p:`Estado: ${c.estado}`,v:"convenios"}));state.alumnos.filter(a=>!a.empresa).forEach(a=>list.push({id:`alumno-sin-empresa-${a.id}-${a.nombre}`,t:"Alumno",h:`${a.nombre} sin empresa`,p:"Pendiente de asignación.",v:"alumnos"}));state.seguimientos.filter(s=>s.fechaProxima&&s.fechaProxima<=datePlus(2)).forEach(s=>list.push({id:`seguimiento-${s.id}-${s.fechaProxima}-${s.proxima||s.empresa}`,t:"Seguimiento",h:s.proxima||`Revisar ${s.empresa}`,p:`${s.empresa} · ${s.fechaProxima}`,v:"seguimiento"}));return list} function buildNotifications(){const hidden=new Set(state.dismissedNotifications||[]);return buildAllNotifications().filter(n=>!hidden.has(n.id))} function renderNotifications(){const n=buildNotifications();$("#alertCount").textContent=n.length;const clearBtn=$("#clearNotifications");if(clearBtn)clearBtn.disabled=!n.length;$("#drawerList").innerHTML=n.length?n.map(x=>`<article class="notification" onclick="show('${x.v}');closeDrawer()"><b>${esc(x.h)}</b><p>${esc(x.t)} · ${esc(x.p)}</p></article>`).join(""):`<article class="notification"><b>Todo tranquilo</b><p>No hay revisiones urgentes.</p></article>`} function clearNotifications(){const currentIds=buildNotifications().map(n=>n.id);state.dismissedNotifications=[...new Set([...(state.dismissedNotifications||[]),...currentIds])];save();renderNotifications();toast("Centro de notificaciones limpio 🌸")} function openDrawer(){renderNotifications();$("#drawer").classList.add("open");$("#overlay").classList.add("open")} function closeDrawer(){$("#drawer").classList.remove("open");$("#overlay").classList.remove("open")}
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
   Bloom CRM 3.4 — Importar alumnos desde Excel / CSV
========================================================= */
let pendingAlumnoImportRows = [];

function normalizeStudentStatus(value){
  const raw = String(value || "").trim();
  if(!raw) return "sin asignar";
  const key = raw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const allowed = ["sin asignar", "propuesta", "entrevista", "prácticas", "finalizado"];
  if(key === "practicas") return "prácticas";
  return allowed.find(x => x.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === key) || raw;
}

function normalizeDateValue(value){
  if(value === undefined || value === null || value === "") return "";
  if(value instanceof Date && !isNaN(value)) return value.toISOString().slice(0,10);
  if(typeof value === "number"){
    // Excel serial date. 25569 = 1970-01-01.
    const d = new Date(Math.round((value - 25569) * 86400 * 1000));
    return isNaN(d) ? "" : d.toISOString().slice(0,10);
  }
  const text = String(value).trim();
  if(/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const m = text.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
  if(m){
    const y = m[3].length === 2 ? `20${m[3]}` : m[3];
    return `${y}-${m[2].padStart(2,"0")}-${m[1].padStart(2,"0")}`;
  }
  return text;
}

function mapAlumnoImportRow(row){
  const nombre = rowValue(row, ["nombre_alumno","alumno","nombre","nombre_completo","estudiante","student","name"]);
  return {
    id: uid(),
    nombre,
    telefono: rowValue(row, ["telefono","teléfono","movil","móvil","phone","contacto_telefono"]),
    email: rowValue(row, ["email","correo","correo_electronico","correo electrónico","mail"]),
    direccion: rowValue(row, ["direccion","dirección","domicilio","address"]),
    nss: rowValue(row, ["nss","numero_seguridad_social","nº_seguridad_social","numero ss","seguridad_social"]),
    estado: normalizeStudentStatus(rowValue(row, ["estado","estado_alumno","estado_practicas","status"])),
    empresa: rowValue(row, ["empresa","empresa_asignada","centro_practicas","centro de prácticas","company"]),
    inicio: normalizeDateValue(rowValue(row, ["inicio","fecha_inicio","inicio_practicas","fecha_inicio_practicas"])),
    fin: normalizeDateValue(rowValue(row, ["fin","fecha_fin","fin_practicas","fecha_fin_practicas"])),
    tutor: rowValue(row, ["tutor","tutor_empresa","tutor_practicas","responsable"]),
    notas: rowValue(row, ["notas","observaciones","comentarios"]),
    foto: null,
    curriculum: null
  };
}

function openAlumnoImport(){
  modal("Importar alumnos desde Excel", `
    <section class="import-panel">
      <p>Sube un archivo <b>.xlsx</b>, <b>.xls</b> o <b>.csv</b>. Bloom leerá las columnas y las convertirá en fichas de alumnos.</p>
      <div class="import-actions">
        <label class="import-file-label">Seleccionar archivo
          <input id="alumnoImportFile" type="file" accept=".xlsx,.xls,.csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">
        </label>
        <button type="button" class="soft-btn" onclick="downloadAlumnoTemplate()">Descargar plantilla</button>
      </div>

      <div class="import-help">
        <b>Columnas recomendadas</b>
        <span>nombre_alumno, telefono, email, direccion, nss, estado, empresa, inicio, fin, tutor, notas</span>
      </div>

      <label class="import-option">
        <input id="alumnoImportUpdateExisting" type="checkbox" checked>
        Actualizar alumnos existentes si el email o el nombre coincide
      </label>

      <div id="alumnoImportPreview" class="import-preview">
        <p>Selecciona un archivo para ver la vista previa.</p>
      </div>
    </section>
  `, () => confirmAlumnoImport());

  const input = $("#alumnoImportFile");
  if(input) input.addEventListener("change", handleAlumnoImportFile);
}

async function handleAlumnoImportFile(event){
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
        $("#alumnoImportPreview").innerHTML = `<div class="import-error">No se pudo cargar el lector Excel. Revisa la conexión o usa CSV.</div>`;
        return;
      }
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: "array", cellDates: true });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      rows = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });
    }

    pendingAlumnoImportRows = rows.map(mapAlumnoImportRow).filter(r => r.nombre);
    renderAlumnoImportPreview(pendingAlumnoImportRows, rows.length);
  }catch(error){
    console.error(error);
    $("#alumnoImportPreview").innerHTML = `<div class="import-error">No se pudo leer el archivo. Comprueba que el formato sea correcto.</div>`;
  }
}

function sameAlumno(a, row){
  const aEmail = String(a.email || "").trim().toLowerCase();
  const rEmail = String(row.email || "").trim().toLowerCase();
  if(aEmail && rEmail && aEmail === rEmail) return true;
  return String(a.nombre || "").trim().toLowerCase() === String(row.nombre || "").trim().toLowerCase();
}

function renderAlumnoImportPreview(rows, rawCount){
  const preview = $("#alumnoImportPreview");
  if(!preview) return;

  const duplicates = rows.filter(r => state.alumnos.some(a => sameAlumno(a, r))).length;
  preview.innerHTML = `
    <div class="import-summary">
      <article><b>${rawCount}</b><span>Filas leídas</span></article>
      <article><b>${rows.length}</b><span>Alumnos válidos</span></article>
      <article><b>${duplicates}</b><span>Coincidencias existentes</span></article>
    </div>
    <div class="import-table-wrap">
      <table>
        <thead><tr><th>Alumno</th><th>Contacto</th><th>Empresa</th><th>Estado</th><th>Fechas</th><th>Tutor</th></tr></thead>
        <tbody>
          ${rows.slice(0,10).map(r=>`
            <tr>
              <td><b>${esc(r.nombre)}</b><br><small>NSS: ${esc(r.nss)}</small></td>
              <td>${esc(r.telefono)}<br><small>${esc(r.email)}</small></td>
              <td>${esc(r.empresa || "Sin empresa")}</td>
              <td><span class="badge">${esc(r.estado)}</span></td>
              <td>${esc(r.inicio)}${r.fin ? ` → ${esc(r.fin)}` : ""}</td>
              <td>${esc(r.tutor)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
    ${rows.length > 10 ? `<p class="import-note">Mostrando 10 de ${rows.length} alumnos.</p>` : ""}
  `;
}

function confirmAlumnoImport(){
  if(!pendingAlumnoImportRows.length){
    toast("No hay alumnos válidos para importar");
    return;
  }

  const updateExisting = $("#alumnoImportUpdateExisting")?.checked;
  let created = 0;
  let updated = 0;

  pendingAlumnoImportRows.forEach(row => {
    const existing = state.alumnos.find(a => sameAlumno(a, row));
    if(existing && updateExisting){
      Object.assign(existing, {
        nombre: row.nombre || existing.nombre,
        telefono: row.telefono || existing.telefono,
        email: row.email || existing.email,
        direccion: row.direccion || existing.direccion,
        nss: row.nss || existing.nss,
        estado: row.estado || existing.estado,
        empresa: row.empresa || existing.empresa,
        inicio: row.inicio || existing.inicio,
        fin: row.fin || existing.fin,
        tutor: row.tutor || existing.tutor,
        notas: row.notas || existing.notas
      });
      updated++;
    }else if(!existing){
      state.alumnos.unshift(row);
      created++;
    }
  });

  log(`Importación Excel: ${created} alumnos añadidos, ${updated} actualizados`);
  pendingAlumnoImportRows = [];
  save();
  closeModal();
  dashboardFilters.alumnos = "all";
  show("alumnos");
  toast(`${created} añadidos · ${updated} actualizados 🌸`);
}

function downloadAlumnoTemplate(){
  const headers = ["nombre_alumno","telefono","email","direccion","nss","estado","empresa","inicio","fin","tutor","notas"];
  const example = ["Alumno Ejemplo","600000000","alumno@email.com","Las Palmas de Gran Canaria","123456789012","sin asignar","","2026-03-01","2026-06-15","Tutor/a","Notas internas"];

  if(window.XLSX){
    const ws = XLSX.utils.aoa_to_sheet([headers, example]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Alumnos");
    XLSX.writeFile(wb, "plantilla_alumnos_bloom_crm.xlsx");
  }else{
    const csv = [headers, example].map(row => row.map(v => `"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], {type:"text/csv;charset=utf-8"}));
    a.download = "plantilla_alumnos_bloom_crm.csv";
    a.click();
  }
}

/* Añade botones de importación a Alumnos */
const renderAlumnosImportBase34 = renderAlumnos;
renderAlumnos = function(){
  renderAlumnosImportBase34();
  const toolbar = document.querySelector("#alumnos .toolbar");
  if(toolbar && !document.querySelector("#importAlumnosBtn")){
    const importBtn = document.createElement("button");
    importBtn.id = "importAlumnosBtn";
    importBtn.className = "soft-btn";
    importBtn.type = "button";
    importBtn.textContent = "Importar Excel/CSV";
    importBtn.onclick = openAlumnoImport;

    const templateBtn = document.createElement("button");
    templateBtn.id = "templateAlumnosBtn";
    templateBtn.className = "soft-btn";
    templateBtn.type = "button";
    templateBtn.textContent = "Plantilla Excel";
    templateBtn.onclick = downloadAlumnoTemplate;

    toolbar.appendChild(importBtn);
    toolbar.appendChild(templateBtn);
  }
};

/* =========================================================
   Bloom CRM 4.0 — Modificar y eliminar en todos los apartados
========================================================= */
if(!Array.isArray(state.reportes)) state.reportes = [];

function optionList(values, selected){return values.map(v=>`<option ${String(selected||"")===String(v)?"selected":""}>${esc(v)}</option>`).join("")}
function empresaOptions(selected=""){return `<option value="">Sin empresa</option>`+state.empresas.map(e=>`<option value="${esc(e.nombre)}" ${selected===e.nombre?"selected":""}>${esc(e.nombre)}</option>`).join("")}
function alumnoOptions(selected=""){return `<option value="">Sin alumno</option>`+state.alumnos.map(a=>`<option value="${esc(a.nombre)}" ${selected===a.nombre?"selected":""}>${esc(a.nombre)}</option>`).join("")}
function carpetaOptions(selected=""){return `<option value="">Sin carpeta</option>`+state.carpetas.filter(f=>!["all","sin"].includes(String(f.id))).map(f=>`<option value="${esc(f.id)}" ${String(selected)===String(f.id)?"selected":""}>${esc(f.nombre)}</option>`).join("")}

function editDoc(id){
  const d = state.documentos.find(x=>Number(x.id)===Number(id));
  if(!d) return;
  modal("Modificar documento",`<form id="docEditForm" class="form-grid">
    <input name="nombre" value="${esc(d.nombre)}" placeholder="Nombre visible" required>
    <select name="carpeta">${carpetaOptions(d.carpeta||"")}</select>
    <select name="tipo">${optionList(["convenio firmado","DNI/NIF","seguro","acuerdo formativo","evaluación","anexo de prácticas","cv","otro"],d.tipo)}</select>
    <select name="empresa">${empresaOptions(d.empresa||"")}</select>
    <select name="alumno">${alumnoOptions(d.alumno||"")}</select>
    <select name="estado">${optionList(["pendiente","para enviar","enviado","firmado","caducado"],d.estado)}</select>
    <input name="fecha" type="date" value="${esc(d.fecha||today())}">
    <input name="subidoPor" value="${esc(d.subidoPor||"")}" placeholder="Subido por">
    <textarea name="notas" placeholder="Notas">${esc(d.notas||"")}</textarea>
  </form>`,()=>{
    Object.assign(d,Object.fromEntries(new FormData($("#docEditForm")).entries()));
    log(`Documento modificado: ${d.nombre}`);
    save(); closeModal(); render(); toast("Documento modificado 🌸");
  });
}
const docCardBase40 = docCard;
docCard = function(d){return `<article class="card doc-card"><h3>${esc(d.nombre)}</h3><p>${esc(d.tipo)} · ${esc(d.estado)}</p><p>${esc(d.empresa||d.alumno||"General")} · ${esc(d.fecha)}</p><p>${esc(d.notas||"")}</p><div class="doc-actions"><button onclick="previewAnyFile(state.documentos.find(x=>x.id===${d.id}).file,'${esc(d.nombre)}')">Previsualizar</button><a href="${d.file?.data||"#"}" download="${esc(d.file?.name||d.nombre)}">Descargar</a><button onclick="editDoc(${d.id})">Modificar</button><button onclick="replaceDoc(${d.id})">Reemplazar archivo</button><button onclick="delDoc(${d.id})">Eliminar</button></div></article>`}
const delDocBase40 = delDoc;
delDoc = function(id){if(confirm("¿Eliminar documento?")){state.documentos=state.documentos.filter(d=>Number(d.id)!==Number(id));log("Documento eliminado");save();render();toast("Documento eliminado 🌸")}}

function openSeguimiento(id=null, defaultDate=today()){
  const s = state.seguimientos.find(x=>Number(x.id)===Number(id)) || {fecha:defaultDate,empresa:"",tipo:"llamada",resultado:"",proxima:"",fechaProxima:defaultDate,responsable:""};
  modal(id?"Modificar seguimiento":"Añadir seguimiento",`<form id="seguimientoForm" class="form-grid">
    <input name="fecha" type="date" value="${esc(s.fecha||today())}">
    <select name="empresa">${empresaOptions(s.empresa||"")}</select>
    <select name="tipo">${optionList(["llamada","email","visita","reunión","LinkedIn","tarea"],s.tipo)}</select>
    <input name="resultado" value="${esc(s.resultado||"")}" placeholder="Resultado / nota">
    <input name="proxima" value="${esc(s.proxima||"")}" placeholder="Próxima acción">
    <input name="fechaProxima" type="date" value="${esc(s.fechaProxima||s.fecha||today())}">
    <input name="responsable" value="${esc(s.responsable||"")}" placeholder="Responsable">
  </form>`,()=>{
    Object.assign(s,Object.fromEntries(new FormData($("#seguimientoForm")).entries()));
    if(!id){s.id=uid();state.seguimientos.unshift(s)}
    selectedDate=s.fechaProxima||s.fecha||selectedDate;
    log(`${id?"Seguimiento modificado":"Seguimiento registrado"}: ${s.empresa||s.proxima}`);
    save(); closeModal(); render(); toast(id?"Seguimiento modificado 🌸":"Seguimiento guardado 🌸");
  });
}
function delSeguimiento(id){if(confirm("¿Eliminar seguimiento o pendiente?")){state.seguimientos=state.seguimientos.filter(s=>Number(s.id)!==Number(id));log("Seguimiento eliminado");save();render();toast("Seguimiento eliminado 🌸")}}
renderSeguimiento = function(){
  const rows = state.seguimientos.map(s=>`<article class="item"><div><b>${esc(s.tipo)} · ${esc(s.empresa||"Sin empresa")}</b><p>${esc(s.resultado||"")} · Próxima: ${esc(s.proxima||"")} · ${esc(s.fechaProxima||"")}</p></div><div class="row-actions"><button class="task-btn edit" onclick="openSeguimiento(${s.id})"><span>✎</span> Modificar</button><button class="task-btn delete" onclick="delSeguimiento(${s.id})"><span>🗑️</span> Eliminar</button></div></article>`).join("")||"<p>No hay seguimientos.</p>";
  $("#seguimiento").innerHTML=pageHead("Seguimiento","Seguimiento","Llamadas, emails, visitas, reuniones y tareas")+`<section class="grid-2"><div class="card table-card"><div class="section-head"><div><p>Nuevo</p><h3>Registrar seguimiento</h3></div><button class="primary" onclick="openSeguimiento(null,'${today()}')">Añadir</button></div><p>Usa “Añadir” para crear y los botones de cada fila para modificar o eliminar.</p></div><div class="card table-card"><div class="list">${rows}</div></div></section>`;
}
addSeguimiento = function(ev){ev.preventDefault();openSeguimiento(null,today())}
quickEvent = function(date){openSeguimiento(null,date)}

function openEmailTemplate(id=null){
  const t = state.emails.find(x=>Number(x.id)===Number(id)) || {nombre:"",asunto:"",cuerpo:""};
  modal(id?"Modificar plantilla":"Nueva plantilla",`<form id="emailTemplateForm" class="form-grid">
    <input name="nombre" value="${esc(t.nombre)}" placeholder="Nombre plantilla" required>
    <input name="asunto" value="${esc(t.asunto||"")}" placeholder="Asunto">
    <textarea name="cuerpo" placeholder="Cuerpo">${esc(t.cuerpo||"")}</textarea>
  </form>`,()=>{
    Object.assign(t,Object.fromEntries(new FormData($("#emailTemplateForm")).entries()));
    if(!id){t.id=uid();state.emails.unshift(t)}
    log(`${id?"Plantilla modificada":"Plantilla creada"}: ${t.nombre}`);
    save(); closeModal(); render(); toast(id?"Plantilla modificada 🌸":"Plantilla guardada 🌸");
  });
}
renderEmails = function(){
  $("#emails").innerHTML=pageHead("Emails","Emails","Plantillas reutilizables")+`<section class="grid-2"><div class="card table-card"><div class="section-head"><div><p>Plantillas</p><h3>Crear nueva plantilla</h3></div><button class="primary" onclick="openEmailTemplate()">Añadir plantilla</button></div><p>Todas las plantillas se pueden copiar, modificar y eliminar.</p></div><div class="card table-card"><div class="list">${state.emails.map(t=>`<article class="item"><div><b>${esc(t.nombre)}</b><p>${esc(t.asunto)}</p></div><div class="row-actions"><button onclick="copyEmail(${t.id})">Copiar</button><button onclick="openEmailTemplate(${t.id})">Modificar</button><button onclick="delEmail(${t.id})">Eliminar</button></div></article>`).join("")||"<p>No hay plantillas.</p>"}</div></div></section>`
}
addEmail = function(ev){ev.preventDefault();openEmailTemplate()}
delEmail = function(id){if(confirm("¿Eliminar plantilla?")){state.emails=state.emails.filter(e=>Number(e.id)!==Number(id));log("Plantilla eliminada");save();render();toast("Plantilla eliminada 🌸")}}

const dayEventsBase40 = dayEvents;
dayEvents = function(date){
  const ev=[];
  state.seguimientos.forEach(s=>{if(s.fecha===date||s.fechaProxima===date)ev.push({id:s.id,kind:"Seguimiento",title:s.proxima||s.resultado||s.tipo,sub:`${s.empresa||"Sin empresa"} · ${s.tipo}`,view:"seguimiento",edit:`openSeguimiento(${s.id})`,del:`delSeguimiento(${s.id})`})});
  state.convenios.forEach(c=>{if(c.inicio===date||c.fin===date)ev.push({id:c.id,kind:c.inicio===date?"Inicio convenio":"Fin convenio",title:c.empresa,sub:`${c.estado}`,view:"convenios",edit:`openConvenio(${c.id})`,del:`delConvenio(${c.id})`})});
  state.alumnos.forEach(a=>{if(a.inicio===date||a.fin===date)ev.push({id:a.id,kind:a.inicio===date?"Inicio prácticas":"Fin prácticas",title:a.nombre,sub:a.empresa||"Sin empresa",view:"alumnos",edit:`openAlumno(${a.id})`,del:`delAlumno(${a.id})`})});
  state.documentos.forEach(d=>{if(d.fecha===date)ev.push({id:d.id,kind:"Documento",title:d.nombre,sub:`${d.tipo} · ${d.estado}`,view:"documentos",edit:`editDoc(${d.id})`,del:`delDoc(${d.id})`})});
  return ev;
}
renderAgenda = function(){
  const ev=dayEvents(selectedDate);const formatted=new Date(selectedDate+"T12:00:00").toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  $("#agenda").innerHTML=pageHead("Agenda","Próximas acciones","Calendario mensual con detalle diario")+`<section class="grid-2"><div class="card table-card"><div class="section-head"><div><p>Calendario</p><h3>Selecciona un día</h3></div><button class="soft-btn" onclick="selectedDate=today();renderAgenda()">Hoy</button></div>${miniCalendar(selectedDate)}</div><div class="card table-card day-detail"><div class="section-head"><div><p>Día seleccionado</p><h3>${esc(formatted)}</h3></div><button class="soft-btn" onclick="quickEvent('${selectedDate}')">Añadir pendiente</button></div><div class="day-summary"><article><b>${ev.length}</b><span>Pendientes</span></article><article><b>${ev.filter(e=>e.kind==='Seguimiento').length}</b><span>Seguimientos</span></article><article><b>${ev.filter(e=>e.kind.includes('convenio')).length}</b><span>Convenios</span></article></div><div class="list">${ev.length?ev.map(e=>`<article class="item"><div onclick="show('${e.view}')"><b>${esc(e.title)}</b><p>${esc(e.kind)} · ${esc(e.sub)}</p></div><div class="row-actions"><button class="task-btn edit" onclick="${e.edit}"><span>✎</span> Modificar</button><button class="task-btn delete" onclick="${e.del}"><span>🗑️</span> Eliminar</button></div></article>`).join(""):`<article class="empty-day"><b>No hay tareas ni pendientes este día.</b><p>Puedes crear un seguimiento, llamada, reunión o tarea para este día.</p><button class="primary" onclick="quickEvent('${selectedDate}')">Crear pendiente</button></article>`}</div></div></section>`
}

renderExpedientes = function(){
  const rows=state.alumnos.map(a=>{const e=state.empresas.find(x=>x.nombre===a.empresa),c=state.convenios.find(x=>x.empresa===a.empresa),docs=state.documentos.filter(d=>d.alumno===a.nombre||d.empresa===a.empresa);return `<article class="card table-card"><div class="section-head"><div><p>Expediente</p><h3>${esc(a.nombre)}</h3></div><span class="badge">${esc(a.estado)}</span></div><div class="grid-2"><div><b>Empresa</b><p>${esc(a.empresa||"Sin empresa")}</p><b>Contacto</b><p>${esc(e?.contacto||"")}</p><b>Fechas</b><p>${esc(a.inicio||"")} → ${esc(a.fin||"")}</p></div><div><b>Convenio</b><p>${esc(c?.estado||"Sin convenio")}</p><b>Documentos</b><p>${docs.length} asociados</p><b>Próxima acción</b><p>${esc(state.seguimientos.find(s=>s.empresa===a.empresa)?.proxima||"Sin acción")}</p></div></div><div class="row-actions"><button class="primary" onclick="openStudentProfile(${a.id})">Ver ficha</button><button onclick="openAlumno(${a.id})">Modificar</button><button onclick="delAlumno(${a.id})">Eliminar</button></div></article>`}).join("");
  $("#expedientes").innerHTML=pageHead("Expedientes","Expedientes","Vista completa por alumno")+`<section class="grid-2">${rows||"<p>No hay expedientes.</p>"}</section>`
}

function reportSnapshot(){return {empresas:state.empresas.length,alumnos:state.alumnos.length,convenios:state.convenios.length,documentos:state.documentos.length,fecha:new Date().toLocaleString("es-ES")}}
function saveReporte(){const name=prompt("Nombre del reporte guardado:",`Reporte ${new Date().toLocaleDateString("es-ES")}`);if(!name)return;state.reportes.unshift({id:uid(),nombre:name,...reportSnapshot()});log(`Reporte guardado: ${name}`);save();render();toast("Reporte guardado 🌸")}
function editReporte(id){const r=state.reportes.find(x=>Number(x.id)===Number(id));if(!r)return;const name=prompt("Nuevo nombre del reporte:",r.nombre);if(!name)return;r.nombre=name;save();render();toast("Reporte modificado 🌸")}
function delReporte(id){if(confirm("¿Eliminar reporte guardado?")){state.reportes=state.reportes.filter(r=>Number(r.id)!==Number(id));save();render();toast("Reporte eliminado 🌸")}}
const renderReportesBase40 = renderReportes;
renderReportes = function(){
  const group=(arr,fn)=>arr.reduce((a,x)=>{const k=fn(x)||"Sin dato";a[k]=(a[k]||0)+1;return a},{});
  $("#reportes").innerHTML=pageHead("Reportes","Reportes","Estadísticas, exportación y reportes guardados")+`<section class="kpi-grid">${kpi("Empresas",state.empresas.length,"empresas","pink","building")}${kpi("Alumnos",state.alumnos.length,"alumnos","blue","student")}${kpi("Convenios",state.convenios.length,"convenios","orange","file")}${kpi("Documentos",state.documentos.length,"documentos","green","archive")}</section><section class="report-grid"><div class="card table-card"><h3>Empresas por sector</h3>${bars(group(state.empresas,e=>e.sector))}</div><div class="card table-card"><h3>Estados CRM</h3>${bars(group(state.empresas,e=>e.estado))}</div><div class="card table-card"><h3>Convenios</h3>${bars(group(state.convenios,c=>c.estado))}</div><div class="card table-card"><h3>Alumnos</h3>${bars(group(state.alumnos,a=>a.estado))}</div><div class="card table-card"><button class="primary" onclick="exportCSV()">Exportar CSV</button><button class="soft-btn" onclick="window.print()">Exportar PDF</button><button class="soft-btn" onclick="saveReporte()">Guardar reporte</button></div><div class="card table-card"><h3>Reportes guardados</h3><div class="list">${(state.reportes||[]).map(r=>`<article class="item"><div><b>${esc(r.nombre)}</b><p>${esc(r.fecha)} · ${r.empresas} empresas · ${r.alumnos} alumnos · ${r.convenios} convenios · ${r.documentos} docs.</p></div><div class="row-actions"><button onclick="editReporte(${r.id})">Modificar</button><button onclick="delReporte(${r.id})">Eliminar</button></div></article>`).join("")||"<p>No hay reportes guardados.</p>"}</div></div></section>`
}

function hideNotification(id){state.dismissedNotifications=[...new Set([...(state.dismissedNotifications||[]),id])];save();renderNotifications();toast("Notificación ocultada 🌸")}
renderNotifications = function(){
  const n=buildNotifications();$("#alertCount").textContent=n.length;const clearBtn=$("#clearNotifications");if(clearBtn)clearBtn.disabled=!n.length;
  $("#drawerList").innerHTML=n.length?n.map(x=>`<article class="notification" onclick="show('${x.v}');closeDrawer()"><b>${esc(x.h)}</b><p>${esc(x.t)} · ${esc(x.p)}</p><div class="row-actions"><button onclick="event.stopPropagation();hideNotification('${esc(x.id)}')">Marcar resuelta</button></div></article>`).join(""):`<article class="notification"><b>Todo tranquilo</b><p>No hay revisiones urgentes.</p></article>`
}

function resetDemoData(){if(confirm("¿Restaurar datos de ejemplo? Se reemplazarán los datos actuales.")){state=JSON.parse(JSON.stringify(seed));state.dismissedNotifications=[];state.reportes=[];save();render();toast("Datos restaurados 🌸")}}
const renderAjustesBase40 = renderAjustes;
renderAjustes = function(){
  $("#ajustes").innerHTML=pageHead("Ajustes","Ajustes","Supabase, backup, restauración y mantenimiento")+`<section class="grid-2"><div class="card table-card"><h3>Supabase</h3><p>Usa la tabla <b>bloom_crm_backups</b>.</p><button class="primary" onclick="saveCloud()">Guardar nube</button><button class="soft-btn" onclick="loadCloud()">Cargar nube</button><button class="soft-btn" onclick="downloadSQL()">Descargar SQL</button></div><div class="card table-card"><h3>Backup local</h3><button class="primary" onclick="downloadBackup()">Descargar JSON</button><label class="soft-btn">Restaurar JSON<input type="file" onchange="restoreBackup(event)" hidden></label><button class="soft-btn" onclick="resetDemoData()">Restaurar demo</button></div></section>`
}

render();

/* v4.1 — Emails con previsualización y adjuntos */
function isImageAttachment(file){const n=(file?.name||'').toLowerCase(),t=(file?.type||'').toLowerCase();return t.startsWith('image/')||/\.(png|jpe?g|webp|gif|svg)$/i.test(n)}
function filesToDataList(input){return Promise.all([...(input?.files||[])].map(fileToData))}
function emailAttachmentList(files=[]){return files.length?`<div class="email-attachments">${files.map((f,i)=>`<article><b>${isImageAttachment(f)?'🖼️':'📎'} ${esc(f.name||'Adjunto')}</b><span>${f.size?Math.round(f.size/1024)+' KB':''}</span><div class="row-actions"><button onclick="previewAnyFile(state.emails.flatMap(e=>e.adjuntos||[]).find(x=>x.data==='${esc(f.data||'')}'),'${esc(f.name||'Adjunto')}')">Ver</button><a href="${f.data||'#'}" download="${esc(f.name||'adjunto')}">Descargar</a></div></article>`).join('')}</div>`:'<p class="muted-small">Sin imágenes ni documentos adjuntos.</p>'}
function emailBodyHTML(text=''){return esc(text).replace(/\n/g,'<br>')}
function previewEmailTemplate(id){const t=state.emails.find(x=>Number(x.id)===Number(id));if(!t)return;const imgs=(t.adjuntos||[]).filter(isImageAttachment),docs=(t.adjuntos||[]).filter(x=>!isImageAttachment(x));modal('Previsualizar mensaje',`<section class="email-preview"><p class="eyebrow">${esc(t.nombre||'Plantilla')}</p><h2>${esc(t.asunto||'Sin asunto')}</h2><article class="email-message">${emailBodyHTML(t.cuerpo||'')}</article>${imgs.length?`<h3>Imágenes</h3><div class="email-image-grid">${imgs.map(f=>`<figure><img src="${f.data}" alt="${esc(f.name||'Imagen')}"><figcaption>${esc(f.name||'Imagen')}</figcaption></figure>`).join('')}</div>`:''}${docs.length?`<h3>Documentos</h3>${emailAttachmentList(docs)}`:''}</section>`,()=>closeModal())}
function removeEmailAttachment(id,index){const t=state.emails.find(x=>Number(x.id)===Number(id));if(!t||!Array.isArray(t.adjuntos))return;t.adjuntos.splice(index,1);save();closeModal();openEmailTemplate(id);toast('Adjunto eliminado 🌸')}
openEmailTemplate = function(id=null){
  const t = state.emails.find(x=>Number(x.id)===Number(id)) || {nombre:"",asunto:"",cuerpo:"",adjuntos:[]};
  if(!Array.isArray(t.adjuntos)) t.adjuntos=[];
  modal(id?"Modificar plantilla":"Nueva plantilla",`<form id="emailTemplateForm" class="form-grid">
    <input name="nombre" value="${esc(t.nombre)}" placeholder="Nombre plantilla" required>
    <input name="asunto" value="${esc(t.asunto||"")}" placeholder="Asunto">
    <textarea name="cuerpo" placeholder="Cuerpo del mensaje">${esc(t.cuerpo||"")}</textarea>
    <label class="student-files" style="grid-column:1/-1">Añadir imágenes o documentos
      <input id="emailAdjuntos" type="file" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.odt">
    </label>
    <div style="grid-column:1/-1"><b>Adjuntos actuales</b>${(t.adjuntos||[]).length?`<div class="email-attachments">${t.adjuntos.map((f,i)=>`<article><b>${isImageAttachment(f)?'🖼️':'📎'} ${esc(f.name||'Adjunto')}</b><span>${f.size?Math.round(f.size/1024)+' KB':''}</span><div class="row-actions">${id?`<button type="button" onclick="removeEmailAttachment(${id},${i})">Eliminar</button>`:''}</div></article>`).join('')}</div>`:'<p class="muted-small">No hay adjuntos todavía.</p>'}</div>
  </form>`,async()=>{
    Object.assign(t,Object.fromEntries(new FormData($("#emailTemplateForm")).entries()));
    const nuevos=await filesToDataList($("#emailAdjuntos"));
    t.adjuntos=[...(t.adjuntos||[]),...nuevos.filter(Boolean)];
    if(!id){t.id=uid();state.emails.unshift(t)}
    log(`${id?"Plantilla modificada":"Plantilla creada"}: ${t.nombre}`);
    save(); closeModal(); render(); toast(id?"Plantilla modificada 🌸":"Plantilla guardada 🌸");
  });
}
copyEmail = function(id){const t=state.emails.find(x=>Number(x.id)===Number(id));if(!t)return;navigator.clipboard.writeText(`Asunto: ${t.asunto||''}\n\n${t.cuerpo||''}\n\nAdjuntos: ${(t.adjuntos||[]).map(f=>f.name).join(', ')||'Sin adjuntos'}`);toast('Mensaje copiado')}
renderEmails = function(){
  const rows=state.emails.map(t=>`<article class="item"><div><b>${esc(t.nombre)}</b><p>${esc(t.asunto)} ${(t.adjuntos||[]).length?`· ${(t.adjuntos||[]).length} adjunto(s)`:''}</p></div><div class="row-actions"><button onclick="previewEmailTemplate(${t.id})">Previsualizar</button><button onclick="copyEmail(${t.id})">Copiar</button><button onclick="openEmailTemplate(${t.id})">Modificar</button><button onclick="delEmail(${t.id})">Eliminar</button></div></article>`).join('')||"<p>No hay plantillas.</p>";
  $("#emails").innerHTML=pageHead("Emails","Emails","Plantillas reutilizables con previsualización y adjuntos")+`<section class="grid-2"><div class="card table-card"><div class="section-head"><div><p>Plantillas</p><h3>Crear mensaje</h3></div><button class="primary" onclick="openEmailTemplate()">Añadir plantilla</button></div><p>Ahora puedes previsualizar el mensaje y guardar imágenes o documentos junto a cada plantilla.</p></div><div class="card table-card"><div class="list">${rows}</div></div></section>`
}

/* v4.2 — Tareas completables y curso de procedencia del alumno */
function ensureTaskFields(){
  if(!Array.isArray(state.seguimientos)) state.seguimientos=[];
  state.seguimientos.forEach(s=>{ if(typeof s.completada==='undefined') s.completada=false; });
  if(!Array.isArray(state.alumnos)) state.alumnos=[];
  state.alumnos.forEach(a=>{ if(typeof a.curso==='undefined') a.curso=''; });
}
ensureTaskFields();

function isTaskCompleted(s){return !!s.completada}
function completeTask(id){
  const s=state.seguimientos.find(x=>Number(x.id)===Number(id));
  if(!s) return;
  s.completada=true;
  s.fechaCompletada=new Date().toISOString();
  log(`Tarea completada: ${s.proxima||s.resultado||s.tipo}`);
  save(); render(); toast('Tarea completada 🌸');
}
function reopenTask(id){
  const s=state.seguimientos.find(x=>Number(x.id)===Number(id));
  if(!s) return;
  s.completada=false;
  s.fechaCompletada='';
  log(`Tarea reabierta: ${s.proxima||s.resultado||s.tipo}`);
  save(); render(); toast('Tarea reabierta 🌸');
}

const dashboardDataBase42 = dashboardData;
dashboardData = function(){
  const d=dashboardDataBase42();
  d.recordatorios=state.seguimientos.filter(s=>!isTaskCompleted(s) && s.fechaProxima>=today()).length;
  d.tareasCompletadas=state.seguimientos.filter(isTaskCompleted).length;
  return d;
}

actionItem = function(s){return `<article class="item ${isTaskCompleted(s)?'task-done':''}"><div><b>${esc(s.proxima||s.resultado)}</b><p>${esc(s.empresa||'Sin empresa')} · ${esc(s.tipo)} ${isTaskCompleted(s)?'· Completada':''}</p></div><div class="row-actions"><span>${esc(s.fechaProxima||'')}</span>${isTaskCompleted(s)?`<button class="task-btn reopen" onclick="reopenTask(${s.id})"><span>↩️</span> Reabrir</button>`:`<button class="task-btn complete" onclick="completeTask(${s.id})"><span>✓</span> Completar</button>`}</div></article>`}

openSeguimiento = function(id=null, defaultDate=today()){
  const s = state.seguimientos.find(x=>Number(x.id)===Number(id)) || {fecha:defaultDate,empresa:"",tipo:"llamada",resultado:"",proxima:"",fechaProxima:defaultDate,responsable:"",completada:false,fechaCompletada:""};
  modal(id?"Modificar seguimiento":"Añadir seguimiento",`<form id="seguimientoForm" class="form-grid">
    <input name="fecha" type="date" value="${esc(s.fecha||today())}">
    <select name="empresa">${empresaOptions(s.empresa||"")}</select>
    <select name="tipo">${optionList(["llamada","email","visita","reunión","LinkedIn","tarea"],s.tipo)}</select>
    <input name="resultado" value="${esc(s.resultado||"")}" placeholder="Resultado / nota">
    <input name="proxima" value="${esc(s.proxima||"")}" placeholder="Tarea / próxima acción">
    <input name="fechaProxima" type="date" value="${esc(s.fechaProxima||s.fecha||today())}">
    <input name="responsable" value="${esc(s.responsable||"")}" placeholder="Responsable">
    <label class="import-option" style="grid-column:1/-1"><input id="seguimientoCompletada" type="checkbox" ${isTaskCompleted(s)?'checked':''}> Tarea completada</label>
  </form>`,()=>{
    Object.assign(s,Object.fromEntries(new FormData($("#seguimientoForm")).entries()));
    s.completada=!!$("#seguimientoCompletada")?.checked;
    if(s.completada && !s.fechaCompletada) s.fechaCompletada=new Date().toISOString();
    if(!s.completada) s.fechaCompletada='';
    if(!id){s.id=uid();state.seguimientos.unshift(s)}
    selectedDate=s.fechaProxima||s.fecha||selectedDate;
    log(`${id?"Seguimiento modificado":"Seguimiento registrado"}: ${s.empresa||s.proxima}`);
    save(); closeModal(); render(); toast(id?"Seguimiento modificado 🌸":"Seguimiento guardado 🌸");
  });
}
quickEvent = function(date){openSeguimiento(null,date)}

renderSeguimiento = function(){
  ensureTaskFields();
  const pendientes=state.seguimientos.filter(s=>!isTaskCompleted(s));
  const completadas=state.seguimientos.filter(isTaskCompleted);
  const row=s=>`<article class="item ${isTaskCompleted(s)?'task-done':''}"><div><b>${esc(s.tipo)} · ${esc(s.empresa||"Sin empresa")}</b><p>${esc(s.resultado||"")} · Próxima: ${esc(s.proxima||"")} · ${esc(s.fechaProxima||"")} ${isTaskCompleted(s)?'· Completada':''}</p></div><div class="row-actions">${isTaskCompleted(s)?`<button class="task-btn reopen" onclick="reopenTask(${s.id})"><span>↩️</span> Reabrir</button>`:`<button class="task-btn complete" onclick="completeTask(${s.id})"><span>✓</span> Completar</button>`}<button class="task-btn edit" onclick="openSeguimiento(${s.id})"><span>✎</span> Modificar</button><button class="task-btn delete" onclick="delSeguimiento(${s.id})"><span>🗑️</span> Eliminar</button></div></article>`;
  $("#seguimiento").innerHTML=pageHead("Seguimiento","Seguimiento","Llamadas, emails, visitas, reuniones y tareas")+`<section class="grid-2"><div class="card table-card"><div class="section-head"><div><p>Nuevo</p><h3>Registrar seguimiento</h3></div><button class="primary" onclick="openSeguimiento(null,'${today()}')">Añadir</button></div><p>Ahora puedes marcar cada tarea como completada o reabrirla.</p><div class="day-summary"><article><b>${pendientes.length}</b><span>Pendientes</span></article><article><b>${completadas.length}</b><span>Completadas</span></article><article><b>${state.seguimientos.length}</b><span>Total</span></article></div></div><div class="card table-card"><h3>Pendientes</h3><div class="list">${pendientes.map(row).join("")||"<p>No hay pendientes.</p>"}</div><h3 style="margin-top:18px">Completadas</h3><div class="list">${completadas.map(row).join("")||"<p>No hay tareas completadas.</p>"}</div></div></section>`;
}

const dayEventsBase42 = dayEvents;
dayEvents = function(date){
  const ev=[];
  state.seguimientos.forEach(s=>{if(s.fecha===date||s.fechaProxima===date)ev.push({id:s.id,kind:isTaskCompleted(s)?"Tarea completada":"Seguimiento",title:s.proxima||s.resultado||s.tipo,sub:`${s.empresa||"Sin empresa"} · ${s.tipo}`,view:"seguimiento",edit:`openSeguimiento(${s.id})`,del:`delSeguimiento(${s.id})`,done:isTaskCompleted(s)})});
  state.convenios.forEach(c=>{if(c.inicio===date||c.fin===date)ev.push({id:c.id,kind:c.inicio===date?"Inicio convenio":"Fin convenio",title:c.empresa,sub:`${c.estado}`,view:"convenios",edit:`openConvenio(${c.id})`,del:`delConvenio(${c.id})`})});
  state.alumnos.forEach(a=>{if(a.inicio===date||a.fin===date)ev.push({id:a.id,kind:a.inicio===date?"Inicio prácticas":"Fin prácticas",title:a.nombre,sub:a.empresa||"Sin empresa",view:"alumnos",edit:`openAlumno(${a.id})`,del:`delAlumno(${a.id})`})});
  state.documentos.forEach(d=>{if(d.fecha===date)ev.push({id:d.id,kind:"Documento",title:d.nombre,sub:`${d.tipo} · ${d.estado}`,view:"documentos",edit:`editDoc(${d.id})`,del:`delDoc(${d.id})`})});
  return ev;
}

renderAgenda = function(){
  const ev=dayEvents(selectedDate);const formatted=new Date(selectedDate+"T12:00:00").toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  const pendientes=ev.filter(e=>!e.done), completadas=ev.filter(e=>e.done);
  $("#agenda").innerHTML=pageHead("Agenda","Próximas acciones","Calendario mensual con detalle diario")+`<section class="grid-2"><div class="card table-card"><div class="section-head"><div><p>Calendario</p><h3>Selecciona un día</h3></div><button class="soft-btn" onclick="selectedDate=today();renderAgenda()">Hoy</button></div>${miniCalendar(selectedDate)}</div><div class="card table-card day-detail"><div class="section-head"><div><p>Día seleccionado</p><h3>${esc(formatted)}</h3></div><button class="soft-btn" onclick="quickEvent('${selectedDate}')">Añadir pendiente</button></div><div class="day-summary"><article><b>${pendientes.length}</b><span>Pendientes</span></article><article><b>${completadas.length}</b><span>Completadas</span></article><article><b>${ev.filter(e=>e.kind.includes('convenio')).length}</b><span>Convenios</span></article></div><div class="list">${ev.length?ev.map(e=>`<article class="item ${e.done?'task-done':''}"><div onclick="show('${e.view}')"><b>${esc(e.title)}</b><p>${esc(e.kind)} · ${esc(e.sub)}</p></div><div class="row-actions">${e.id&&e.view==='seguimiento'?(e.done?`<button class="task-btn reopen" onclick="reopenTask(${e.id})"><span>↩️</span> Reabrir</button>`:`<button class="task-btn complete" onclick="completeTask(${e.id})"><span>✓</span> Completar</button>`):''}<button class="task-btn edit" onclick="${e.edit}"><span>✎</span> Modificar</button><button class="task-btn delete" onclick="${e.del}"><span>🗑️</span> Eliminar</button></div></article>`).join(""):`<article class="empty-day"><b>No hay tareas ni pendientes este día.</b><p>Puedes crear un seguimiento, llamada, reunión o tarea para este día.</p><button class="primary" onclick="quickEvent('${selectedDate}')">Crear pendiente</button></article>`}</div></div></section>`
}

openAlumno = function(aid=null){
  const a=state.alumnos.find(x=>Number(x.id)===Number(aid))||{nombre:"",telefono:"",email:"",direccion:"",nss:"",curso:"",estado:"sin asignar",empresa:"",inicio:"",fin:"",tutor:"",notas:"",foto:null,curriculum:null};
  modal("Alumno",`<form id="alumnoForm" class="form-grid"><div class="student-photo-preview">${a.foto?.data?`<img src="${a.foto.data}">`:"Foto"}</div><input name="nombre" value="${esc(a.nombre)}" placeholder="Nombre" required><input name="telefono" value="${esc(a.telefono)}" placeholder="Teléfono"><input name="email" value="${esc(a.email)}" placeholder="Correo"><input name="direccion" value="${esc(a.direccion)}" placeholder="Dirección"><input name="nss" value="${esc(a.nss)}" placeholder="Nº Seguridad Social"><input name="curso" value="${esc(a.curso||"")}" placeholder="Curso de procedencia"><label class="student-files">Foto<input id="alumnoFoto" type="file" accept="image/*"></label><label class="student-files">Currículum<input id="alumnoCV" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"></label><select name="empresa">${empresaOptions(a.empresa||"")}</select><select name="estado">${optionList(["sin asignar","propuesta","entrevista","prácticas","finalizado"],a.estado)}</select><input name="inicio" type="date" value="${esc(a.inicio)}"><input name="fin" type="date" value="${esc(a.fin)}"><input name="tutor" value="${esc(a.tutor)}" placeholder="Tutor"><textarea name="notas">${esc(a.notas)}</textarea></form>`,async()=>{Object.assign(a,Object.fromEntries(new FormData($("#alumnoForm")).entries()));const foto=$("#alumnoFoto").files[0],cv=$("#alumnoCV").files[0];if(foto)a.foto=await fileToData(foto);if(cv)a.curriculum=await fileToData(cv);if(!aid){a.id=uid();state.alumnos.unshift(a)}log(`Alumno guardado: ${a.nombre}`);save();closeModal();render()})
}

renderAlumnos = function(){
  ensureTaskFields();
  const list=(dashboardFilters?.alumnos==="sinEmpresa"?state.alumnos.filter(a=>!a.empresa):state.alumnos);
  const toolbar=document.createElement('div');
  $("#alumnos").innerHTML=pageHead("Alumnos","Alumnos",dashboardFilters?.alumnos==="sinEmpresa"?"Alumnos sin empresa asignada":"Ficha completa del alumnado")+`<section class="card table-card"><div class="toolbar">${typeof filterPill==='function'?filterPill("alumnos","Filtro Dashboard"):''}<button class="primary" onclick="openAlumno()">Añadir alumno</button><button class="soft-btn" id="alumnoImportBtn">Importar Excel/CSV</button><button class="soft-btn" onclick="downloadAlumnoTemplate()">Plantilla Excel</button></div><table><thead><tr><th>Alumno</th><th>Curso</th><th>Contacto</th><th>Empresa</th><th>Estado</th><th>Archivos</th><th></th></tr></thead><tbody>${list.map(a=>`<tr class="student-row" onclick="openStudentProfile(${a.id})"><td><div class="student-cell"><div class="student-avatar">${a.foto?.data?`<img src="${a.foto.data}">`:`<span>${esc((a.nombre||"A")[0])}</span>`}</div><div><b>${esc(a.nombre)}</b><br><small>NSS: ${esc(a.nss||"")}</small></div></div></td><td>${esc(a.curso||"Sin dato")}</td><td>${esc(a.telefono)}<br><small>${esc(a.email)}</small></td><td>${esc(a.empresa||"Sin empresa")}</td><td><span class="badge">${esc(a.estado)}</span></td><td onclick="event.stopPropagation()"><div class="student-files">${a.foto?.data?`<button onclick="previewAnyFile(state.alumnos.find(x=>x.id===${a.id}).foto,'Foto')">Foto</button>`:`<span>Sin foto</span>`}${a.curriculum?.data?`<button onclick="previewAnyFile(state.alumnos.find(x=>x.id===${a.id}).curriculum,'CV')">CV</button>`:`<span>Sin CV</span>`}</div></td><td class="row-actions" onclick="event.stopPropagation()"><button onclick="openAlumno(${a.id})">Modificar</button><button onclick="delAlumno(${a.id})">Eliminar</button></td></tr>`).join("")||`<tr><td colspan="7">No hay resultados.</td></tr>`}</tbody></table></section>`;
  const btn=$("#alumnoImportBtn"); if(btn) btn.onclick=openAlumnoImport;
}

openStudentProfile = function(aid){
  const a=state.alumnos.find(x=>Number(x.id)===Number(aid));if(!a)return;const empresa=state.empresas.find(e=>e.nombre===a.empresa),conv=state.convenios.find(c=>c.empresa===a.empresa),docs=state.documentos.filter(d=>d.alumno===a.nombre||d.empresa===a.empresa),follows=state.seguimientos.filter(s=>s.empresa===a.empresa);
  modal("Ficha del alumno",`<section class="student-profile"><aside class="student-profile-side"><div class="student-profile-photo">${a.foto?.data?`<img src="${a.foto.data}">`:`<span>${esc((a.nombre||"A")[0])}</span>`}</div><h2>${esc(a.nombre)}</h2><p>${esc(a.estado)}</p><button class="primary" onclick="openAlumno(${a.id})">Editar ficha</button></aside><main class="student-profile-main"><section class="student-profile-grid">${[["Teléfono",a.telefono],["Correo",a.email],["Dirección",a.direccion],["NSS",a.nss],["Curso de procedencia",a.curso],["Empresa",a.empresa||"Sin empresa"],["Tutor",a.tutor||empresa?.contacto||""],["Inicio",a.inicio||conv?.inicio||""],["Fin",a.fin||conv?.fin||""]].map(([b,v])=>`<article><b>${b}</b><span>${esc(v||"Sin dato")}</span></article>`).join("")}</section><section class="student-profile-section"><div class="section-head"><div><p>Currículum</p><h3>Vista previa</h3></div></div>${filePreviewHTML(a.curriculum,a.id)}</section><section class="student-profile-section"><div class="section-head"><div><p>Documentos</p><h3>Relacionados</h3></div></div><div class="list">${docs.map(d=>`<article class="item"><div><b>${esc(d.nombre)}</b><p>${esc(d.tipo)} · ${esc(d.estado)}</p></div><button onclick="previewAnyFile(state.documentos.find(x=>x.id===${d.id}).file,'${esc(d.nombre)}')">Ver</button></article>`).join("")||"<p>No hay documentos asociados.</p>"}</div></section><section class="student-profile-section"><div class="section-head"><div><p>Seguimiento</p><h3>Actividad</h3></div></div><div class="list">${follows.map(s=>`<article class="item ${isTaskCompleted(s)?'task-done':''}"><div><b>${esc(s.tipo)} · ${esc(s.empresa)}</b><p>${esc(s.fecha)} · ${esc(s.resultado||"")} ${isTaskCompleted(s)?'· Completada':''}</p></div></article>`).join("")||"<p>Sin seguimientos asociados.</p>"}</div></section><section class="student-profile-section"><div class="section-head"><div><p>Observaciones</p><h3>Notas</h3></div></div><p>${esc(a.notas||"Sin observaciones.")}</p></section></main></section>`,()=>closeModal())
}

const mapAlumnoImportRowBase42 = mapAlumnoImportRow;
mapAlumnoImportRow = function(row){const r=mapAlumnoImportRowBase42(row);r.curso=rowValue(row,["curso","curso_procedencia","curso de procedencia","grupo","clase","programa_formativo","formacion","formación"]);return r}
const renderAlumnoImportPreviewBase42 = renderAlumnoImportPreview;
renderAlumnoImportPreview = function(rows, rawCount){
  const preview=$("#alumnoImportPreview"); if(!preview) return;
  const duplicates=rows.filter(r=>state.alumnos.some(a=>sameAlumno(a,r))).length;
  preview.innerHTML=`<div class="import-summary"><article><b>${rawCount}</b><span>Filas leídas</span></article><article><b>${rows.length}</b><span>Alumnos válidos</span></article><article><b>${duplicates}</b><span>Coincidencias existentes</span></article></div><div class="import-table-wrap"><table><thead><tr><th>Alumno</th><th>Curso</th><th>Contacto</th><th>Empresa</th><th>Estado</th><th>Fechas</th><th>Tutor</th></tr></thead><tbody>${rows.slice(0,10).map(r=>`<tr><td><b>${esc(r.nombre)}</b><br><small>NSS: ${esc(r.nss)}</small></td><td>${esc(r.curso||"")}</td><td>${esc(r.telefono)}<br><small>${esc(r.email)}</small></td><td>${esc(r.empresa||"Sin empresa")}</td><td><span class="badge">${esc(r.estado)}</span></td><td>${esc(r.inicio)}${r.fin?` → ${esc(r.fin)}`:""}</td><td>${esc(r.tutor)}</td></tr>`).join("")}</tbody></table></div>${rows.length>10?`<p class="import-note">Mostrando 10 de ${rows.length} alumnos.</p>`:""}`;
}
const confirmAlumnoImportBase42 = confirmAlumnoImport;
confirmAlumnoImport = function(){
  if(!pendingAlumnoImportRows.length){toast("No hay alumnos válidos para importar");return;}
  const updateExisting=$("#alumnoImportUpdateExisting")?.checked;let created=0,updated=0;
  pendingAlumnoImportRows.forEach(row=>{const existing=state.alumnos.find(a=>sameAlumno(a,row));if(existing&&updateExisting){Object.assign(existing,{nombre:row.nombre||existing.nombre,telefono:row.telefono||existing.telefono,email:row.email||existing.email,direccion:row.direccion||existing.direccion,nss:row.nss||existing.nss,curso:row.curso||existing.curso,estado:row.estado||existing.estado,empresa:row.empresa||existing.empresa,inicio:row.inicio||existing.inicio,fin:row.fin||existing.fin,tutor:row.tutor||existing.tutor,notas:row.notas||existing.notas});updated++;}else if(!existing){state.alumnos.unshift(row);created++;}});
  log(`Importación Excel: ${created} alumnos añadidos, ${updated} actualizados`);pendingAlumnoImportRows=[];save();closeModal();dashboardFilters.alumnos="all";show("alumnos");toast(`${created} añadidos · ${updated} actualizados 🌸`);
}
downloadAlumnoTemplate = function(){
  const headers=["nombre_alumno","telefono","email","direccion","nss","curso","estado","empresa","inicio","fin","tutor","notas"];
  const example=["Alumno Ejemplo","600000000","alumno@email.com","Las Palmas de Gran Canaria","123456789012","2º CFGM Gestión Administrativa","sin asignar","","2026-03-01","2026-06-15","Tutor/a","Notas internas"];
  if(window.XLSX){const ws=XLSX.utils.aoa_to_sheet([headers,example]);const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,"Alumnos");XLSX.writeFile(wb,"plantilla_alumnos_bloom_crm.xlsx");}else{const csv=[headers,example].map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));a.download="plantilla_alumnos_bloom_crm.csv";a.click();}
}

render();

/* v4.4 — Botones de tareas con iconos integrados */
function findEmpresaByName(name){return state.empresas.find(e=>(e.nombre||'').toLowerCase()===(name||'').toLowerCase())||null}
function taskActionLabel(tipo=''){
  const t=String(tipo).toLowerCase();
  if(t.includes('email')||t.includes('correo')) return 'Enviar correo';
  if(t.includes('visita')) return 'Preparar visita';
  if(t.includes('llamada')) return 'Llamar';
  if(t.includes('reun')) return 'Reunión';
  return 'Ver tarea';
}
function taskActionIcon(tipo=''){
  const t=String(tipo).toLowerCase();
  if(t.includes('email')||t.includes('correo')) return '✉️';
  if(t.includes('visita')) return '📍';
  if(t.includes('llamada')) return '📞';
  if(t.includes('reun')) return '🤝';
  return '✅';
}
function companyContactBlock(e){
  if(!e) return `<article><b>Empresa</b><span>No hay empresa vinculada.</span></article>`;
  const tel=e.telefono||e.contacto_telefono||'';
  const email=e.email||e.contacto_email||'';
  const web=e.web||'';
  const lugar=[e.direccion,e.ciudad,e.isla].filter(Boolean).join(', ');
  return `${[
    ['Empresa',e.nombre],['Sector',e.sector],['Contacto',e.contacto||e.contacto_nombre],['Teléfono',tel],['Email',email],['Web',web],['Ubicación',lugar],['Estado CRM',e.estado],['Prioridad',e.prioridad],['Notas empresa',e.notas]
  ].map(([b,v])=>`<article><b>${b}</b><span>${v?esc(v):'Sin dato'}</span></article>`).join('')}`;
}
function openTaskAction(id){
  const s=state.seguimientos.find(x=>Number(x.id)===Number(id));
  if(!s) return;
  const e=findEmpresaByName(s.empresa);
  const relatedStudents=state.alumnos.filter(a=>a.empresa===s.empresa);
  const relatedDocs=state.documentos.filter(d=>d.empresa===s.empresa || relatedStudents.some(a=>a.nombre===d.alumno));
  const conv=state.convenios.find(c=>c.empresa===s.empresa);
  const lastFollow=state.seguimientos.filter(x=>x.id!==s.id && x.empresa===s.empresa).slice(0,4);
  const tipo=String(s.tipo||'').toLowerCase();
  const tel=e?.telefono||e?.contacto_telefono||'';
  const email=e?.email||e?.contacto_email||'';
  const location=[e?.direccion,e?.ciudad,e?.isla].filter(Boolean).join(', ');
  const subject=encodeURIComponent(s.proxima||'Seguimiento de prácticas');
  const body=encodeURIComponent(`Buenos días,\n\n${s.proxima||s.resultado||''}\n\nUn saludo.`);
  let quick='';
  if(tipo.includes('llamada')) quick=`${tel?`<a class="primary" href="tel:${esc(tel)}">Llamar ahora</a>`:''}${email?`<a class="soft-btn" href="mailto:${esc(email)}?subject=${subject}&body=${body}">Enviar email</a>`:''}`;
  else if(tipo.includes('email')||tipo.includes('correo')) quick=`${email?`<a class="primary" href="mailto:${esc(email)}?subject=${subject}&body=${body}">Abrir correo</a>`:'<span class="badge">Sin email confirmado</span>'}${tel?`<a class="soft-btn" href="tel:${esc(tel)}">Llamar</a>`:''}`;
  else if(tipo.includes('visita')) quick=`${location?`<a class="primary" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}">Abrir mapa</a>`:'<span class="badge">Sin ubicación completa</span>'}${tel?`<a class="soft-btn" href="tel:${esc(tel)}">Avisar por teléfono</a>`:''}${email?`<a class="soft-btn" href="mailto:${esc(email)}?subject=${subject}&body=${body}">Avisar por email</a>`:''}`;
  else quick=`${tel?`<a class="soft-btn" href="tel:${esc(tel)}">Llamar</a>`:''}${email?`<a class="soft-btn" href="mailto:${esc(email)}?subject=${subject}&body=${body}">Enviar email</a>`:''}${location?`<a class="soft-btn" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}">Mapa</a>`:''}`;
  modal(`${taskActionIcon(s.tipo)} ${taskActionLabel(s.tipo)}`,`<section class="student-profile task-action-modal"><aside class="student-profile-side"><h2>${esc(s.proxima||s.resultado||s.tipo)}</h2><p>${esc(s.tipo)} · ${isTaskCompleted(s)?'Completada':'Pendiente'}</p><div class="student-cv-actions task-quick-actions">${quick||'<span class="badge">No hay acción directa disponible</span>'}</div>${isTaskCompleted(s)?`<button class="task-btn reopen big" onclick="reopenTask(${s.id});closeModal()"><span>↩️</span> Reabrir tarea</button>`:`<button class="task-btn complete big" onclick="completeTask(${s.id});closeModal()"><span>✓</span> Marcar como completada</button>`}<button class="task-btn edit big" onclick="openSeguimiento(${s.id})"><span>✎</span> Modificar tarea</button></aside><main class="student-profile-main"><section class="student-profile-section"><div class="section-head"><div><p>Acción pendiente</p><h3>Qué hay que hacer</h3></div></div><div class="student-profile-grid">${[['Tipo',s.tipo],['Fecha registro',s.fecha],['Fecha prevista',s.fechaProxima],['Responsable',s.responsable],['Resultado / nota',s.resultado],['Próxima acción',s.proxima]].map(([b,v])=>`<article><b>${b}</b><span>${esc(v||'Sin dato')}</span></article>`).join('')}</div></section><section class="student-profile-section"><div class="section-head"><div><p>Información relevante</p><h3>Empresa y contacto</h3></div></div><div class="student-profile-grid">${companyContactBlock(e)}</div></section><section class="student-profile-section"><div class="section-head"><div><p>Alumnado vinculado</p><h3>${relatedStudents.length} alumno(s)</h3></div></div><div class="list">${relatedStudents.map(a=>`<article class="item"><div><b>${esc(a.nombre)}</b><p>${esc(a.curso||'Sin curso')} · ${esc(a.estado||'Sin estado')} · ${esc(a.telefono||'Sin teléfono')} · ${esc(a.email||'Sin email')}</p></div><button onclick="openStudentProfile(${a.id})">Ficha</button></article>`).join('')||'<p>No hay alumnos vinculados a esta empresa.</p>'}</div></section><section class="student-profile-section"><div class="section-head"><div><p>Contexto</p><h3>Convenio, documentos y últimos contactos</h3></div></div><div class="student-profile-grid">${[['Convenio',conv?`${conv.estado||''} · ${conv.inicio||''} → ${conv.fin||''}`:'Sin convenio'],['Documentos asociados',relatedDocs.length],['Últimos seguimientos',lastFollow.length]].map(([b,v])=>`<article><b>${b}</b><span>${esc(v||'Sin dato')}</span></article>`).join('')}</div><div class="list" style="margin-top:12px">${lastFollow.map(f=>`<article class="item"><div><b>${esc(f.tipo)} · ${esc(f.fecha||'')}</b><p>${esc(f.resultado||f.proxima||'Sin nota')}</p></div></article>`).join('')||'<p>No hay seguimientos anteriores.</p>'}</div></section></main></section>`,()=>closeModal());
}

actionItem = function(s){return `<article class="item ${isTaskCompleted(s)?'task-done':''}"><div onclick="openTaskAction(${s.id})" style="cursor:pointer"><b>${taskActionIcon(s.tipo)} ${esc(s.proxima||s.resultado||taskActionLabel(s.tipo))}</b><p>${esc(s.empresa||'Sin empresa')} · ${esc(s.tipo)} ${isTaskCompleted(s)?'· Completada':''}</p></div><div class="row-actions"><span>${esc(s.fechaProxima||'')}</span><button class="task-btn view" onclick="openTaskAction(${s.id})"><span>👁️</span> Ver acción</button>${isTaskCompleted(s)?`<button class="task-btn reopen" onclick="reopenTask(${s.id})"><span>↩️</span> Reabrir</button>`:`<button class="task-btn complete" onclick="completeTask(${s.id})"><span>✓</span> Completar</button>`}</div></article>`}

renderSeguimiento = function(){
  ensureTaskFields();
  const pendientes=state.seguimientos.filter(s=>!isTaskCompleted(s));
  const completadas=state.seguimientos.filter(isTaskCompleted);
  const row=s=>`<article class="item ${isTaskCompleted(s)?'task-done':''}"><div onclick="openTaskAction(${s.id})" style="cursor:pointer"><b>${taskActionIcon(s.tipo)} ${esc(s.tipo)} · ${esc(s.empresa||"Sin empresa")}</b><p>${esc(s.resultado||"")} · Próxima: ${esc(s.proxima||"")} · ${esc(s.fechaProxima||"")} ${isTaskCompleted(s)?'· Completada':''}</p></div><div class="row-actions"><button class="task-btn view" onclick="openTaskAction(${s.id})"><span>👁️</span> Ver acción</button>${isTaskCompleted(s)?`<button class="task-btn reopen" onclick="reopenTask(${s.id})"><span>↩️</span> Reabrir</button>`:`<button class="task-btn complete" onclick="completeTask(${s.id})"><span>✓</span> Completar</button>`}<button class="task-btn edit" onclick="openSeguimiento(${s.id})"><span>✎</span> Modificar</button><button class="task-btn delete" onclick="delSeguimiento(${s.id})"><span>🗑️</span> Eliminar</button></div></article>`;
  $("#seguimiento").innerHTML=pageHead("Seguimiento","Seguimiento","Clica en una llamada, email o visita para ver la información útil de esa acción")+`<section class="grid-2"><div class="card table-card"><div class="section-head"><div><p>Nuevo</p><h3>Registrar seguimiento</h3></div><button class="primary" onclick="openSeguimiento(null,'${today()}')">Añadir</button></div><p>Las tareas de llamar, enviar correo o visitar muestran contacto, alumnado, convenio, documentos y accesos rápidos.</p><div class="day-summary"><article><b>${pendientes.length}</b><span>Pendientes</span></article><article><b>${completadas.length}</b><span>Completadas</span></article><article><b>${state.seguimientos.length}</b><span>Total</span></article></div></div><div class="card table-card"><h3>Pendientes</h3><div class="list">${pendientes.map(row).join("")||"<p>No hay pendientes.</p>"}</div><h3 style="margin-top:18px">Completadas</h3><div class="list">${completadas.map(row).join("")||"<p>No hay tareas completadas.</p>"}</div></div></section>`;
}

const dayEventsBase43 = dayEvents;
dayEvents = function(date){
  const ev=[];
  state.seguimientos.forEach(s=>{if(s.fecha===date||s.fechaProxima===date)ev.push({id:s.id,kind:isTaskCompleted(s)?"Tarea completada":"Seguimiento",title:s.proxima||s.resultado||taskActionLabel(s.tipo),sub:`${s.empresa||"Sin empresa"} · ${s.tipo}`,view:"seguimiento",edit:`openSeguimiento(${s.id})`,del:`delSeguimiento(${s.id})`,detail:`openTaskAction(${s.id})`,done:isTaskCompleted(s)})});
  state.convenios.forEach(c=>{if(c.inicio===date||c.fin===date)ev.push({id:c.id,kind:c.inicio===date?"Inicio convenio":"Fin convenio",title:c.empresa,sub:`${c.estado}`,view:"convenios",edit:`openConvenio(${c.id})`,del:`delConvenio(${c.id})`})});
  state.alumnos.forEach(a=>{if(a.inicio===date||a.fin===date)ev.push({id:a.id,kind:a.inicio===date?"Inicio prácticas":"Fin prácticas",title:a.nombre,sub:a.empresa||"Sin empresa",view:"alumnos",edit:`openAlumno(${a.id})`,del:`delAlumno(${a.id})`})});
  state.documentos.forEach(d=>{if(d.fecha===date)ev.push({id:d.id,kind:"Documento",title:d.nombre,sub:`${d.tipo} · ${d.estado}`,view:"documentos",edit:`editDoc(${d.id})`,del:`delDoc(${d.id})`})});
  return ev;
}

renderAgenda = function(){
  const ev=dayEvents(selectedDate);const formatted=new Date(selectedDate+"T12:00:00").toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  const pendientes=ev.filter(e=>!e.done), completadas=ev.filter(e=>e.done);
  $("#agenda").innerHTML=pageHead("Agenda","Próximas acciones","Clica en una tarea para ver contacto, alumnado y accesos rápidos")+`<section class="grid-2"><div class="card table-card"><div class="section-head"><div><p>Calendario</p><h3>Selecciona un día</h3></div><button class="soft-btn" onclick="selectedDate=today();renderAgenda()">Hoy</button></div>${miniCalendar(selectedDate)}</div><div class="card table-card day-detail"><div class="section-head"><div><p>Día seleccionado</p><h3>${esc(formatted)}</h3></div><button class="soft-btn" onclick="quickEvent('${selectedDate}')">Añadir pendiente</button></div><div class="day-summary"><article><b>${pendientes.length}</b><span>Pendientes</span></article><article><b>${completadas.length}</b><span>Completadas</span></article><article><b>${ev.filter(e=>e.kind.includes('convenio')).length}</b><span>Convenios</span></article></div><div class="list">${ev.length?ev.map(e=>`<article class="item ${e.done?'task-done':''}"><div onclick="${e.detail||`show('${e.view}')`}" style="cursor:pointer"><b>${e.view==='seguimiento'?taskActionIcon(e.sub):''} ${esc(e.title)}</b><p>${esc(e.kind)} · ${esc(e.sub)}</p></div><div class="row-actions">${e.id&&e.view==='seguimiento'?`<button class="task-btn view" onclick="openTaskAction(${e.id})"><span>👁️</span> Ver acción</button>${e.done?`<button class="task-btn reopen" onclick="reopenTask(${e.id})"><span>↩️</span> Reabrir</button>`:`<button class="task-btn complete" onclick="completeTask(${e.id})"><span>✓</span> Completar</button>`}`:''}<button class="task-btn edit" onclick="${e.edit}"><span>✎</span> Modificar</button><button class="task-btn delete" onclick="${e.del}"><span>🗑️</span> Eliminar</button></div></article>`).join(""):`<article class="empty-day"><b>No hay tareas ni pendientes este día.</b><p>Puedes crear un seguimiento, llamada, reunión o tarea para este día.</p><button class="primary" onclick="quickEvent('${selectedDate}')">Crear pendiente</button></article>`}</div></div></section>`
}


/* v4.4 — refresco final */
render();

/* v4.5 — Convenios con previsualización de información y documentos adjuntos */
function convenioDocuments(c){
  const ids=(c?.anexos||[]).map(x=>String(x));
  const docs=state.documentos.filter(d=>ids.includes(String(d.id)) || (c?.empresa && d.empresa===c.empresa));
  const seen=new Set();
  return docs.filter(d=>{const k=String(d.id); if(seen.has(k)) return false; seen.add(k); return true;});
}
function convenioStatusText(c){
  const docs=convenioDocuments(c);
  if((c?.anexos||[]).length>=3 || docs.length>=3) return 'Completo';
  if((c?.anexos||[]).length || docs.length) return 'Incompleto';
  return 'Pendiente';
}
function detachDocFromConvenio(cid,did){
  const c=state.convenios.find(x=>Number(x.id)===Number(cid));
  if(!c) return;
  c.anexos=(c.anexos||[]).filter(x=>String(x)!==String(did));
  log(`Documento desvinculado de convenio: ${c.empresa}`);
  save(); render(); previewConvenio(cid); toast('Documento desvinculado 🌸');
}
function previewConvenio(cid){
  const c=state.convenios.find(x=>Number(x.id)===Number(cid));
  if(!c) return;
  const e=state.empresas.find(x=>x.nombre===c.empresa)||{};
  const docs=convenioDocuments(c);
  const alumnos=state.alumnos.filter(a=>a.empresa===c.empresa);
  const follows=state.seguimientos.filter(s=>s.empresa===c.empresa).slice(0,6);
  modal('Previsualización del convenio',`<section class="student-profile convenio-preview">
    <aside class="student-profile-side">
      <h2>${esc(c.empresa||'Convenio')}</h2>
      <p>${esc(c.estado||'Sin estado')}</p>
      <span class="badge">${esc(convenioStatusText(c))}</span>
      <button class="primary" onclick="openConvenio(${c.id})">Modificar convenio</button>
      <button class="task-btn view big" onclick="attachDoc(${c.id})"><span>📎</span> Adjuntar documento</button>
      <button class="task-btn delete big" onclick="delConvenio(${c.id});closeModal()"><span>🗑️</span> Eliminar convenio</button>
    </aside>
    <main class="student-profile-main">
      <section class="student-profile-section">
        <div class="section-head"><div><p>Información del convenio</p><h3>Resumen</h3></div></div>
        <div class="student-profile-grid">${[
          ['Empresa',c.empresa],['Centro',c.centro],['Inicio',c.inicio],['Fin',c.fin],['Tutor empresa',c.tutorEmpresa],['Tutor centro',c.tutorCentro],['Estado',c.estado],['Documentos adjuntos',docs.length]
        ].map(([b,v])=>`<article><b>${b}</b><span>${esc(v||'Sin dato')}</span></article>`).join('')}</div>
      </section>
      <section class="student-profile-section">
        <div class="section-head"><div><p>Contacto de empresa</p><h3>Datos útiles</h3></div></div>
        <div class="student-profile-grid">${[
          ['Contacto',e.contacto],['Teléfono',e.telefono],['Email',e.email],['Web',e.web],['Ciudad',e.ciudad],['Isla',e.isla]
        ].map(([b,v])=>`<article><b>${b}</b><span>${esc(v||'Sin dato')}</span></article>`).join('')}</div>
      </section>
      <section class="student-profile-section">
        <div class="section-head"><div><p>Documentos adjuntos</p><h3>Previsualización y descarga</h3></div><button class="soft-btn" onclick="attachDoc(${c.id})">Añadir</button></div>
        <div class="doc-grid">${docs.map(d=>`<article class="card doc-card"><h3>${esc(d.nombre)}</h3><p>${esc(d.tipo)} · ${esc(d.estado)}</p><p>${esc(d.fecha||'')} · ${esc(d.subidoPor||'')}</p><p>${esc(d.notas||'')}</p><div class="doc-actions"><button onclick="previewAnyFile(state.documentos.find(x=>Number(x.id)===Number(${d.id})).file,'${esc(d.nombre)}')">Previsualizar</button><a href="${d.file?.data||'#'}" download="${esc(d.file?.name||d.nombre)}">Descargar</a><button onclick="editDoc(${d.id})">Modificar</button><button onclick="detachDocFromConvenio(${c.id},${d.id})">Quitar del convenio</button></div></article>`).join('')||'<p>No hay documentos adjuntos todavía. Puedes añadirlos desde “Adjuntar documento”.</p>'}</div>
      </section>
      <section class="student-profile-section">
        <div class="section-head"><div><p>Alumnado vinculado</p><h3>${alumnos.length} alumno(s)</h3></div></div>
        <div class="list">${alumnos.map(a=>`<article class="item"><div><b>${esc(a.nombre)}</b><p>${esc(a.curso||'Sin curso')} · ${esc(a.estado||'Sin estado')} · ${esc(a.inicio||'')} → ${esc(a.fin||'')}</p></div><button onclick="openStudentProfile(${a.id})">Ficha</button></article>`).join('')||'<p>No hay alumnado vinculado a esta empresa.</p>'}</div>
      </section>
      <section class="student-profile-section">
        <div class="section-head"><div><p>Seguimiento relacionado</p><h3>Últimos contactos</h3></div></div>
        <div class="list">${follows.map(s=>`<article class="item"><div><b>${esc(s.tipo)} · ${esc(s.fecha||'')}</b><p>${esc(s.resultado||s.proxima||'Sin nota')}</p></div><button onclick="openSeguimiento(${s.id})">Modificar</button></article>`).join('')||'<p>No hay seguimientos relacionados.</p>'}</div>
      </section>
    </main>
  </section>`,()=>closeModal());
}

attachDoc = function(cid){
  const c=state.convenios.find(x=>Number(x.id)===Number(cid));
  if(!c) return;
  const already=(c.anexos||[]).map(x=>String(x));
  const options=state.documentos.map(d=>`<option value="${d.id}" ${already.includes(String(d.id))?'disabled':''}>${esc(d.nombre)} · ${esc(d.tipo)} · ${esc(d.empresa||d.alumno||'General')}</option>`).join('');
  modal('Adjuntar documento al convenio',`<section><p>Selecciona un documento del archivo documental para vincularlo a <b>${esc(c.empresa)}</b>.</p>${state.documentos.length?`<select id="docToAttach">${options}</select>`:'<p>No hay documentos subidos todavía. Súbelos primero desde la pestaña Documentos.</p>'}</section>`,()=>{
    const did=Number($('#docToAttach')?.value||0);
    c.anexos=c.anexos||[];
    if(did && !c.anexos.map(x=>String(x)).includes(String(did))) c.anexos.push(did);
    log(`Documento adjuntado a convenio: ${c.empresa}`); save(); closeModal(); render(); toast('Documento adjuntado 🌸');
  });
}

renderConvenios = function(){
  const list=(dashboardFilters?.convenios==='pendientes'?state.convenios.filter(c=>c.estado!=='firmado'):state.convenios);
  $('#convenios').innerHTML=pageHead('Convenios','Convenios',dashboardFilters?.convenios==='pendientes'?'Convenios pendientes de completar':'Previsualiza información, anexos y documentos adjuntos')+`<section class="grid-2"><div class="card table-card"><div class="toolbar">${typeof filterPill==='function'?filterPill('convenios','Filtro Dashboard'):''}<button class="primary" onclick="openConvenio()">Nuevo convenio</button><button class="soft-btn" onclick="show('documentos')">Archivo documental</button></div><table><thead><tr><th>Empresa</th><th>Fechas</th><th>Estado</th><th>Documentos</th><th></th></tr></thead><tbody>${list.map(c=>{const docs=convenioDocuments(c);return `<tr><td onclick="previewConvenio(${c.id})" style="cursor:pointer"><b>${esc(c.empresa)}</b><br><small>${esc(c.centro)}</small></td><td>${esc(c.inicio)} → ${esc(c.fin)}</td><td><span class="badge">${esc(c.estado)}</span></td><td>${docs.length}</td><td class="row-actions"><button onclick="previewConvenio(${c.id})">Ver</button><button onclick="openConvenio(${c.id})">Modificar</button><button onclick="attachDoc(${c.id})">Adjuntar</button><button onclick="delConvenio(${c.id})">Eliminar</button></td></tr>`}).join('')||`<tr><td colspan="5">No hay resultados.</td></tr>`}</tbody></table></div><div class="card table-card"><div class="section-head"><div><p>Estado documental</p><h3>Checklist</h3></div></div><div class="list">${list.map(c=>`<article class="item" onclick="previewConvenio(${c.id})" style="cursor:pointer"><div><b>${esc(c.empresa)}</b><p>${esc(convenioStatusText(c))} · ${convenioDocuments(c).length} documento(s)</p></div><span>${esc(c.estado)}</span></article>`).join('')||'<p>No hay convenios.</p>'}</div></div></section>`;
}

const dayEventsBase45 = dayEvents;
dayEvents = function(date){
  const ev=dayEventsBase45(date);
  ev.forEach(e=>{ if(e.view==='convenios' && e.id) e.detail=`previewConvenio(${e.id})`; });
  return ev;
}

/* v4.5 — refresco final */
render();


/* v4.6 — Pestaña Alumnos en prácticas */
function parseDateSafe(v){
  if(!v) return null;
  const d=new Date(String(v)+'T12:00:00');
  return isNaN(d.getTime())?null:d;
}
function alumnoEnPracticas(a){
  const estado=String(a.estado||'').toLowerCase();
  if(estado.includes('práctica') || estado.includes('practica')) return true;
  const hasEmpresa=!!String(a.empresa||'').trim();
  const ini=parseDateSafe(a.inicio), fin=parseDateSafe(a.fin), now=new Date();
  if(hasEmpresa && ini && fin) return ini<=now && now<=fin;
  return false;
}
function practicasDaysLeft(a){
  const fin=parseDateSafe(a.fin);
  if(!fin) return 'Sin fecha fin';
  const todayD=new Date(); todayD.setHours(0,0,0,0);
  fin.setHours(0,0,0,0);
  const days=Math.ceil((fin-todayD)/(1000*60*60*24));
  if(days<0) return 'Finalizada por fecha';
  if(days===0) return 'Termina hoy';
  return `${days} día${days===1?'':'s'} restantes`;
}
function renderPracticas(){
  const el=$('#practicas'); if(!el) return;
  const q=($('#practicasSearch')?.value||'').toLowerCase();
  const alumnos=state.alumnos.filter(alumnoEnPracticas).filter(a=>!q || JSON.stringify(a).toLowerCase().includes(q));
  const sinDocs=alumnos.filter(a=>!state.documentos.some(d=>d.alumno===a.nombre||d.empresa===a.empresa)).length;
  el.innerHTML=pageHead('Prácticas','Alumnos en prácticas','Seguimiento específico del alumnado actualmente en empresa')+`
    <section class="kpi-grid">
      <article class="kpi card"><div class="kpi-icon green">${icons.calendar}</div><strong>${alumnos.length}</strong><span>En prácticas</span></article>
      <article class="kpi card"><div class="kpi-icon blue">${icons.building}</div><strong>${new Set(alumnos.map(a=>a.empresa).filter(Boolean)).size}</strong><span>Empresas activas</span></article>
      <article class="kpi card"><div class="kpi-icon orange">${icons.archive}</div><strong>${sinDocs}</strong><span>Sin documentos asociados</span></article>
      <article class="kpi card"><div class="kpi-icon pink">${icons.phone}</div><strong>${alumnos.filter(a=>state.seguimientos.some(s=>s.empresa===a.empresa && !isTaskCompleted(s))).length}</strong><span>Con tareas pendientes</span></article>
    </section>
    <section class="card table-card">
      <div class="toolbar"><input id="practicasSearch" placeholder="Buscar alumno, empresa, curso..." oninput="renderPracticas()" value="${esc(q)}"><button class="primary" onclick="openAlumno()">Añadir alumno</button><button class="soft-btn" onclick="show('alumnos')">Ver todos los alumnos</button></div>
      <table><thead><tr><th>Alumno</th><th>Curso</th><th>Empresa</th><th>Tutor</th><th>Fechas</th><th>Estado</th><th></th></tr></thead><tbody>${alumnos.map(a=>{const docs=state.documentos.filter(d=>d.alumno===a.nombre||d.empresa===a.empresa).length;return `<tr class="student-row" onclick="openPracticasProfile(${a.id})"><td><div class="student-cell"><div class="student-avatar">${a.foto?.data?`<img src="${a.foto.data}">`:`<span>${esc((a.nombre||'A')[0])}</span>`}</div><div><b>${esc(a.nombre)}</b><br><small>${esc(a.telefono||'')} · ${esc(a.email||'')}</small></div></div></td><td>${esc(a.curso||'Sin dato')}</td><td>${esc(a.empresa||'Sin empresa')}</td><td>${esc(a.tutor||'Sin dato')}</td><td>${esc(a.inicio||'')} → ${esc(a.fin||'')}<br><small>${esc(practicasDaysLeft(a))}</small></td><td><span class="badge">${esc(a.estado||'prácticas')}</span><br><small>${docs} doc.</small></td><td class="row-actions" onclick="event.stopPropagation()"><button onclick="openPracticasProfile(${a.id})">Ver</button><button onclick="openAlumno(${a.id})">Modificar</button><button onclick="finalizarPracticas(${a.id})">Finalizar</button></td></tr>`}).join('')||'<tr><td colspan="7">No hay alumnos en prácticas.</td></tr>'}</tbody></table>
    </section>`;
}
function openPracticasProfile(aid){
  const a=state.alumnos.find(x=>Number(x.id)===Number(aid)); if(!a) return;
  const e=state.empresas.find(x=>x.nombre===a.empresa)||{};
  const c=state.convenios.find(x=>x.empresa===a.empresa)||{};
  const docs=state.documentos.filter(d=>d.alumno===a.nombre||d.empresa===a.empresa);
  const tareas=state.seguimientos.filter(s=>s.empresa===a.empresa);
  modal('Alumno en prácticas',`<section class="student-profile"><aside class="student-profile-side"><div class="student-profile-photo">${a.foto?.data?`<img src="${a.foto.data}">`:`<span>${esc((a.nombre||'A')[0])}</span>`}</div><h2>${esc(a.nombre)}</h2><p>${esc(a.empresa||'Sin empresa')}</p><span class="badge">${esc(practicasDaysLeft(a))}</span><button class="primary" onclick="openAlumno(${a.id})">Modificar alumno</button><button class="task-btn complete big" onclick="finalizarPracticas(${a.id});closeModal()"><span>✓</span> Finalizar prácticas</button></aside><main class="student-profile-main"><section class="student-profile-section"><div class="section-head"><div><p>Información de prácticas</p><h3>Resumen</h3></div></div><div class="student-profile-grid">${[['Alumno',a.nombre],['Curso',a.curso],['Empresa',a.empresa],['Tutor alumno',a.tutor],['Inicio',a.inicio],['Fin',a.fin],['Estado',a.estado],['Convenio',c.estado||'Sin convenio']].map(([b,v])=>`<article><b>${b}</b><span>${esc(v||'Sin dato')}</span></article>`).join('')}</div></section><section class="student-profile-section"><div class="section-head"><div><p>Contacto empresa</p><h3>Datos útiles</h3></div></div><div class="student-profile-grid">${[['Contacto',e.contacto],['Teléfono',e.telefono],['Email',e.email],['Ciudad',e.ciudad],['Web',e.web]].map(([b,v])=>`<article><b>${b}</b><span>${esc(v||'Sin dato')}</span></article>`).join('')}</div></section><section class="student-profile-section"><div class="section-head"><div><p>Documentos</p><h3>Adjuntos relacionados</h3></div><button class="soft-btn" onclick="show('documentos');closeModal()">Ir a documentos</button></div><div class="list">${docs.map(d=>`<article class="item"><div><b>${esc(d.nombre)}</b><p>${esc(d.tipo)} · ${esc(d.estado)}</p></div><button onclick="previewAnyFile(state.documentos.find(x=>Number(x.id)===Number(${d.id})).file,'${esc(d.nombre)}')">Ver</button></article>`).join('')||'<p>No hay documentos relacionados.</p>'}</div></section><section class="student-profile-section"><div class="section-head"><div><p>Tareas y seguimiento</p><h3>Acciones vinculadas</h3></div><button class="soft-btn" onclick="openSeguimiento()">Añadir tarea</button></div><div class="list">${tareas.map(s=>`<article class="item ${isTaskCompleted(s)?'task-done':''}"><div><b>${esc(s.tipo)} · ${esc(s.proxima||s.resultado||'Tarea')}</b><p>${esc(s.fechaProxima||s.fecha||'')} · ${isTaskCompleted(s)?'Completada':'Pendiente'}</p></div><div class="row-actions"><button onclick="openTaskContext(${s.id})">Ver</button><button onclick="openSeguimiento(${s.id})">Modificar</button></div></article>`).join('')||'<p>No hay tareas vinculadas a esta empresa.</p>'}</div></section></main></section>`,()=>closeModal());
}
function finalizarPracticas(aid){
  const a=state.alumnos.find(x=>Number(x.id)===Number(aid)); if(!a) return;
  if(!confirm(`¿Marcar como finalizadas las prácticas de ${a.nombre}?`)) return;
  a.estado='finalizado';
  if(!a.fin) a.fin=today();
  log(`Prácticas finalizadas: ${a.nombre}`);
  save(); render(); toast('Prácticas finalizadas 🌸');
}
const renderBase46 = render;
render = function(){ renderBase46(); renderPracticas(); }
render();



/* =========================================================
   Bloom CRM 3.0 Profesional sobre tus archivos
   Arquitectura:
   - Login obligatorio con Supabase Auth.
   - Tablas normalizadas.
   - RLS por user_id = auth.uid().
   - Storage privado + Signed URLs.
   - Sin bloom_crm_backups como origen principal.
========================================================= */

const BLOOM3_BUCKET = "bloom-crm-documents";
let bloom3Client = null;
let bloom3Session = null;
let bloom3Ready = false;
let bloom3SignedCache = new Map();

const bloom3Tables = {
  empresas: "bloom_empresas",
  alumnos: "bloom_alumnos",
  convenios: "bloom_convenios",
  carpetas: "bloom_carpetas",
  documentos: "bloom_documentos",
  seguimientos: "bloom_seguimientos",
  emails: "bloom_email_templates",
  notificaciones: "bloom_notificaciones",
  reportes: "bloom_reportes"
};

function bloom3ClientGet(){
  if(!window.supabase){
    bloom3AuthStatus("No se pudo cargar Supabase. Revisa la conexión.", "error");
    return null;
  }
  if(!bloom3Client){
    bloom3Client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth:{ persistSession:true, autoRefreshToken:true, detectSessionInUrl:true }
    });
  }
  return bloom3Client;
}

function bloom3AuthStatus(message, type="info"){
  const el = document.querySelector("#authStatus");
  if(el){
    el.className = "auth-status " + type;
    el.textContent = message;
  }
}

function bloom3Lock(message="Inicia sesión para acceder.", type="info"){
  document.body.classList.add("auth-locked");
  const gate = document.querySelector("#authGate");
  if(gate) gate.classList.remove("hidden");
  bloom3AuthStatus(message, type);
}

function bloom3Unlock(){
  document.body.classList.remove("auth-locked");
  const gate = document.querySelector("#authGate");
  if(gate) gate.classList.add("hidden");
}

function bloom3ToTextId(value){
  return String(value ?? uid());
}

function bloom3PublicRow(kind, item){
  const id = bloom3ToTextId(item.id);
  const row = {
    id,
    user_id: bloom3Session.user.id,
    data: JSON.parse(JSON.stringify(item || {})),
    updated_at: new Date().toISOString()
  };

  if(kind === "empresas"){
    Object.assign(row, {
      nombre: item.nombre || "Sin nombre",
      sector: item.sector || null,
      subsector: item.subsector || null,
      ciudad: item.ciudad || null,
      isla: item.isla || null,
      web: item.web || null,
      fuente: item.fuente || null,
      acepta_practicas: item.acepta_practicas || null,
      tipo_practicas: item.tipo_practicas || null,
      ciclos_recomendados: item.ciclos_recomendados || null,
      contacto: item.contacto || null,
      telefono: item.telefono || null,
      email: item.email || null,
      estado: item.estado || "nueva",
      prioridad: item.prioridad || "media",
      notas: item.notas || null
    });
  }

  if(kind === "alumnos"){
    Object.assign(row, {
      nombre: item.nombre || "Sin nombre",
      dni: item.dni || null,
      telefono: item.telefono || null,
      email: item.email || null,
      direccion: item.direccion || null,
      nss: item.nss || null,
      curso: item.curso || null,
      estado: item.estado || "sin asignar",
      empresa: item.empresa || null,
      inicio: item.inicio || null,
      fin: item.fin || null,
      tutor: item.tutor || null,
      horas: item.horas || null,
      evaluacion: item.evaluacion || null,
      notas: item.notas || null,
      foto_path: item.foto?.path || item.foto_path || null,
      cv_path: item.curriculum?.path || item.cv_path || null
    });
  }

  if(kind === "convenios"){
    Object.assign(row, {
      empresa: item.empresa || null,
      centro: item.centro || null,
      inicio: item.inicio || null,
      fin: item.fin || null,
      tutor_empresa: item.tutorEmpresa || item.tutor_empresa || null,
      tutor_centro: item.tutorCentro || item.tutor_centro || null,
      estado: item.estado || "pendiente",
      anexos: item.anexos || []
    });
  }

  if(kind === "carpetas"){
    Object.assign(row, {
      nombre: item.nombre || "Sin nombre",
      color: item.color || null,
      parent_id: item.parent_id || null
    });
  }

  if(kind === "documentos"){
    Object.assign(row, {
      nombre: item.nombre || "Documento",
      tipo: item.tipo || null,
      estado: item.estado || "pendiente",
      carpeta: item.carpeta || null,
      empresa: item.empresa || null,
      alumno: item.alumno || null,
      convenio_id: item.convenio_id || null,
      storage_path: item.file?.path || item.storage_path || null,
      mime_type: item.file?.type || item.mime_type || null,
      size_bytes: item.file?.size || item.size_bytes || null,
      notas: item.notas || null,
      uploaded_by: item.subidoPor || item.uploaded_by || bloom3Session.user.email,
      fecha: item.fecha || null
    });
  }

  if(kind === "seguimientos"){
    Object.assign(row, {
      empresa: item.empresa || null,
      tipo: item.tipo || null,
      fecha: item.fecha || null,
      resultado: item.resultado || null,
      proxima: item.proxima || null,
      fecha_proxima: item.fechaProxima || item.fecha_proxima || null,
      responsable: item.responsable || null,
      completada: !!item.completada
    });
  }

  if(kind === "emails"){
    Object.assign(row, {
      nombre: item.nombre || "Plantilla",
      asunto: item.asunto || null,
      cuerpo: item.cuerpo || null,
      adjuntos: item.adjuntos || []
    });
  }

  return row;
}

function bloom3FromRow(kind, row){
  const item = Object.assign({}, row.data || {});
  item.id = row.id;

  if(kind === "empresas"){
    Object.assign(item, {
      nombre: row.nombre,
      sector: row.sector,
      subsector: row.subsector,
      ciudad: row.ciudad,
      isla: row.isla,
      web: row.web,
      fuente: row.fuente,
      acepta_practicas: row.acepta_practicas,
      tipo_practicas: row.tipo_practicas,
      ciclos_recomendados: row.ciclos_recomendados,
      contacto: row.contacto,
      telefono: row.telefono,
      email: row.email,
      estado: row.estado,
      prioridad: row.prioridad,
      notas: row.notas
    });
  }

  if(kind === "alumnos"){
    Object.assign(item, {
      nombre: row.nombre,
      dni: row.dni,
      telefono: row.telefono,
      email: row.email,
      direccion: row.direccion,
      nss: row.nss,
      curso: row.curso,
      estado: row.estado,
      empresa: row.empresa,
      inicio: row.inicio || "",
      fin: row.fin || "",
      tutor: row.tutor,
      horas: row.horas,
      evaluacion: row.evaluacion,
      notas: row.notas
    });
    if(row.foto_path) item.foto = { name:"Foto", path:row.foto_path, storage:true, type:"image/*" };
    if(row.cv_path) item.curriculum = { name:"Currículum", path:row.cv_path, storage:true };
  }

  if(kind === "convenios"){
    Object.assign(item, {
      empresa: row.empresa,
      centro: row.centro,
      inicio: row.inicio || "",
      fin: row.fin || "",
      tutorEmpresa: row.tutor_empresa,
      tutorCentro: row.tutor_centro,
      estado: row.estado,
      anexos: row.anexos || []
    });
  }

  if(kind === "carpetas"){
    Object.assign(item, { nombre: row.nombre, color: row.color });
  }

  if(kind === "documentos"){
    Object.assign(item, {
      nombre: row.nombre,
      tipo: row.tipo,
      estado: row.estado,
      carpeta: row.carpeta,
      empresa: row.empresa,
      alumno: row.alumno,
      convenio_id: row.convenio_id,
      notas: row.notas,
      fecha: row.fecha || "",
      subidoPor: row.uploaded_by,
      file: row.storage_path ? {
        name: row.nombre,
        path: row.storage_path,
        storage: true,
        type: row.mime_type,
        size: row.size_bytes
      } : item.file
    });
  }

  if(kind === "seguimientos"){
    Object.assign(item, {
      empresa: row.empresa,
      tipo: row.tipo,
      fecha: row.fecha || "",
      resultado: row.resultado,
      proxima: row.proxima,
      fechaProxima: row.fecha_proxima || "",
      responsable: row.responsable,
      completada: !!row.completada
    });
  }

  if(kind === "emails"){
    Object.assign(item, {
      nombre: row.nombre,
      asunto: row.asunto,
      cuerpo: row.cuerpo,
      adjuntos: row.adjuntos || []
    });
  }

  return item;
}

async function bloom3LoadKind(kind){
  const table = bloom3Tables[kind];
  if(!table) return [];
  const { data, error } = await bloom3Client.from(table).select("*").order("created_at", { ascending:false });
  if(error) throw error;
  return (data || []).map(row => bloom3FromRow(kind, row));
}

async function bloom3LoadAll(){
  setSync("Cargando privado...", "saving");

  const loaded = {
    empresas: await bloom3LoadKind("empresas"),
    alumnos: await bloom3LoadKind("alumnos"),
    convenios: await bloom3LoadKind("convenios"),
    documentos: await bloom3LoadKind("documentos"),
    carpetas: await bloom3LoadKind("carpetas"),
    seguimientos: await bloom3LoadKind("seguimientos"),
    emails: await bloom3LoadKind("emails"),
    actividad: [],
    dismissedNotifications: []
  };

  if(!loaded.carpetas.length){
    loaded.carpetas = [
      { id:"all", nombre:"Todas" },
      { id:"sin", nombre:"Sin carpeta" },
      { id:"curso", nombre:"Curso 2025/26" },
      { id:"conv", nombre:"Convenios" }
    ];
    for(const f of loaded.carpetas.filter(f => !["all","sin"].includes(String(f.id)))){
      await bloom3Client.from("bloom_carpetas").upsert(bloom3PublicRow("carpetas", f), { onConflict:"id" });
    }
  }else{
    loaded.carpetas = [
      { id:"all", nombre:"Todas" },
      { id:"sin", nombre:"Sin carpeta" },
      ...loaded.carpetas.filter(f => !["all","sin"].includes(String(f.id)))
    ];
  }

  state = loaded;
  bloom3Ready = true;
  setSync("Privado sincronizado", "ok");
}

async function bloom3SaveKind(kind){
  const table = bloom3Tables[kind];
  if(!table) return;

  const rows = (state[kind] || [])
    .filter(item => item && item.id !== "all" && item.id !== "sin")
    .map(item => bloom3PublicRow(kind, item));

  if(!rows.length) return;

  const { error } = await bloom3Client.from(table).upsert(rows, { onConflict:"id" });
  if(error) throw error;
}

async function bloom3SaveAll(silent=false){
  if(!bloom3Ready || !bloom3Session?.user) return;

  try{
    if(!silent) setSync("Guardando privado...", "saving");
    for(const kind of ["empresas","alumnos","convenios","carpetas","documentos","seguimientos","emails"]){
      await bloom3SaveKind(kind);
    }
    if(!silent) toast("Guardado privado 🌸");
    setSync("Privado sincronizado", "ok");
  }catch(error){
    console.error("bloom3SaveAll", error);
    setSync("Error guardado", "error");
    if(!silent) alert("Error guardando en Supabase:\n\n" + error.message);
  }
}

function bloom3SafeFileName(name){
  return String(name || "archivo")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .slice(0, 120);
}

async function bloom3UploadFile(file, folder="documentos"){
  if(!file) return null;
  if(!bloom3Session?.user) throw new Error("Debes iniciar sesión para subir archivos.");

  const path = `${bloom3Session.user.id}/${folder}/${Date.now()}-${bloom3SafeFileName(file.name)}`;
  const { data, error } = await bloom3Client.storage
    .from(BLOOM3_BUCKET)
    .upload(path, file, { upsert:true, contentType:file.type || "application/octet-stream" });

  if(error) throw error;

  return {
    name: file.name,
    type: file.type,
    size: file.size,
    path: data.path,
    storage: true
  };
}

async function bloom3SignedUrl(path){
  if(!path) return "";
  const cached = bloom3SignedCache.get(path);
  if(cached && cached.exp > Date.now() + 30000) return cached.url;

  const { data, error } = await bloom3Client.storage
    .from(BLOOM3_BUCKET)
    .createSignedUrl(path, 300);

  if(error) throw error;
  bloom3SignedCache.set(path, { url:data.signedUrl, exp:Date.now()+300000 });
  return data.signedUrl;
}

/* Sustituye fileToData: ahora los archivos van a Storage privado */
fileToData = async function(file){
  if(!file) return null;
  return await bloom3UploadFile(file, "adjuntos");
};

/* Reemplaza previewAnyFile para Storage privado */
previewAnyFile = async function(file, title="Documento"){
  if(!file){
    modal("Previsualizar documento", `<p>No hay archivo adjunto.</p>`, () => closeModal());
    return;
  }

  if(file.storage && file.path){
    try{
      const url = await bloom3SignedUrl(file.path);
      const type = file.type || "";
      const name = file.name || title;
      const isPdf = type.includes("pdf") || /\.pdf$/i.test(name);
      const isImage = type.includes("image") || /\.(png|jpg|jpeg|webp)$/i.test(name);

      modal("Previsualizar documento", `
        <section>
          <h2>${esc(title)}</h2>
          ${isPdf ? `<div class="student-cv-preview"><iframe src="${url}"></iframe></div>` :
            isImage ? `<div class="student-cv-image"><img src="${url}"></div>` :
            `<div class="student-cv-empty"><b>${esc(name)}</b><span>Archivo privado. Puedes abrirlo con enlace temporal.</span></div>`}
          <div class="student-cv-actions">
            <a href="${url}" target="_blank">Abrir temporal</a>
            <a href="${url}" download="${esc(name)}">Descargar</a>
          </div>
        </section>
      `, () => closeModal());
      return;
    }catch(error){
      alert("No se pudo abrir el archivo privado:\n\n" + error.message);
      return;
    }
  }

  modal("Previsualizar documento", `<section><h2>${esc(title)}</h2>${filePreviewHTML(file,"modal")}</section>`, () => closeModal());
};

const bloom3OriginalSave = save;
save = function(){
  if(!bloom3Ready){
    bloom3OriginalSave();
    return;
  }
  setSync("Guardando privado...", "saving");
  clearTimeout(cloudTimer);
  cloudTimer = setTimeout(() => bloom3SaveAll(true), 600);
};

saveCloud = async function(silent=false){
  await bloom3SaveAll(silent);
};

loadCloud = async function(){
  await bloom3LoadAll();
  render();
};

/* Auth */
async function bloom3Login(mode="login"){
  const client = bloom3ClientGet();
  if(!client) return;

  const email = document.querySelector("#authEmail")?.value?.trim();
  const password = document.querySelector("#authPassword")?.value || "";

  if(!email || !password){
    bloom3AuthStatus("Introduce email y contraseña.", "error");
    return;
  }

  try{
    bloom3AuthStatus(mode === "signup" ? "Creando cuenta..." : "Entrando...", "info");

    const result = mode === "signup"
      ? await client.auth.signUp({
          email,
          password,
          options:{ emailRedirectTo: window.location.href.split("#")[0] }
        })
      : await client.auth.signInWithPassword({ email, password });

    if(result.error) throw result.error;

    const { data } = await client.auth.getSession();
    if(!data.session){
      bloom3AuthStatus("Cuenta creada. Revisa tu correo para confirmar el email.", "ok");
      return;
    }

    await bloom3Enter(data.session);
  }catch(error){
    let msg = error.message || "No se pudo iniciar sesión.";
    const lower = msg.toLowerCase();
    if(lower.includes("invalid login credentials")) msg = "Email o contraseña incorrectos.";
    if(lower.includes("email not confirmed")) msg = "Email sin confirmar. Revisa tu correo.";
    if(lower.includes("rate limit")) msg = "Supabase ha limitado temporalmente los emails. Espera o entra con contraseña si la cuenta ya existe.";
    bloom3AuthStatus(msg, "error");
  }
}

async function bloom3Magic(){
  const client = bloom3ClientGet();
  const email = document.querySelector("#authEmail")?.value?.trim();

  if(!client) return;
  if(!email){
    bloom3AuthStatus("Introduce tu email.", "error");
    return;
  }

  try{
    bloom3AuthStatus("Enviando enlace mágico...", "info");
    const { error } = await client.auth.signInWithOtp({
      email,
      options:{ emailRedirectTo: window.location.href.split("#")[0] }
    });
    if(error) throw error;
    bloom3AuthStatus("Revisa tu correo para entrar.", "ok");
  }catch(error){
    bloom3AuthStatus(error.message || "No se pudo enviar el enlace.", "error");
  }
}

async function bloom3Reset(){
  const client = bloom3ClientGet();
  const email = document.querySelector("#authEmail")?.value?.trim();

  if(!client) return;
  if(!email){
    bloom3AuthStatus("Introduce tu email.", "error");
    return;
  }

  try{
    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.href.split("#")[0]
    });
    if(error) throw error;
    bloom3AuthStatus("Revisa tu correo para recuperar la contraseña.", "ok");
  }catch(error){
    bloom3AuthStatus(error.message || "No se pudo enviar recuperación.", "error");
  }
}

async function bloom3Enter(session){
  bloom3Session = session;
  bloom3Unlock();

  try{
    await bloom3LoadAll();
    render();
    toast("Bienvenida a Bloom CRM 🌸");
  }catch(error){
    console.error("bloom3Enter load", error);
    setSync("Configuración pendiente", "error");
    bloom3Unlock();
    render();
    show("ajustes");
    alert(
      "Sesión iniciada, pero falta ejecutar el SQL de la arquitectura profesional.\n\n" +
      "Ve a Supabase SQL Editor y ejecuta supabase/schema.sql.\n\n" +
      error.message
    );
  }
}

async function bloom3Logout(){
  const client = bloom3ClientGet();
  if(client) await client.auth.signOut();
  bloom3Session = null;
  bloom3Ready = false;
  bloom3Lock("Sesión cerrada.", "info");
}

function bloom3PatchSettings(){
  const base = renderAjustes;
  renderAjustes = function(){
    base();

    const target = document.querySelector("#ajustes .grid-2") || document.querySelector("#ajustes");
    if(target && !document.querySelector("#bloom3ProfessionalCard")){
      target.insertAdjacentHTML("afterbegin", `
        <section id="bloom3ProfessionalCard" class="card table-card professional-card">
          <div class="section-head">
            <div>
              <p>Arquitectura profesional</p>
              <h3>Supabase privado normalizado</h3>
            </div>
          </div>
          <p><b>Usuario:</b> ${esc(bloom3Session?.user?.email || "Sin sesión")}</p>
          <p>Esta versión ya no usa <code>bloom_crm_backups</code> como base principal. Los datos se guardan en tablas separadas con RLS por usuario.</p>
          <div class="settings-row">
            <a class="soft-btn" href="supabase/schema.sql" download>Descargar SQL</a>
            <button class="soft-btn" onclick="loadCloud()">Cargar privado</button>
            <button class="primary" onclick="saveCloud()">Guardar privado</button>
            <button class="soft-btn" onclick="bloom3Logout()">Cerrar sesión</button>
          </div>
        </section>
      `);
    }
  };
}

function bloom3Bind(){
  document.querySelector("#authLoginBtn")?.addEventListener("click", () => bloom3Login("login"));
  document.querySelector("#authSignupBtn")?.addEventListener("click", () => bloom3Login("signup"));
  document.querySelector("#authMagicBtn")?.addEventListener("click", bloom3Magic);
  document.querySelector("#authResetBtn")?.addEventListener("click", bloom3Reset);
  document.querySelector("#authLogoutBtn")?.addEventListener("click", () => show("ajustes"));
  bloom3PatchSettings();
}

async function bloom3Boot(){
  const client = bloom3ClientGet();
  bloom3Bind();

  if(!client){
    bloom3Lock("No se pudo cargar Supabase.", "error");
    return;
  }

  bloom3Lock("Comprobando sesión...", "info");

  const { data } = await client.auth.getSession();
  if(data.session){
    await bloom3Enter(data.session);
  }else{
    bloom3Lock("Inicia sesión para acceder a Bloom CRM.", "info");
  }

  client.auth.onAuthStateChange(async (event, session) => {
    if(event === "SIGNED_IN" && session){
      await bloom3Enter(session);
    }
    if(event === "SIGNED_OUT"){
      bloom3Lock("Sesión cerrada.", "info");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => setTimeout(bloom3Boot, 60));
if(document.readyState !== "loading") setTimeout(bloom3Boot, 60);




/* =========================================================
   Bloom CRM 3.0 — Mejoras funcionales sobre archivos actuales
   Incluye:
   1) Empresas: edición real sin reescribir todo y sin valores null.
   2) Empresas: clic en fila abre ficha 360 completa.
   3) Empresas: eliminado campo ciclos recomendados del formulario.
   4) Alumnos: clic en fila abre ficha completa con todos los datos.
   5) Alumnos: DNI/NIE visible en tabla, formulario, ficha, búsqueda y Excel.
========================================================= */

function bloomClean(value, fallback=""){
  if(value === null || value === undefined) return fallback;
  const text = String(value);
  if(text.toLowerCase() === "null" || text.toLowerCase() === "undefined" || text.trim() === "") return fallback;
  return text;
}

function bloomPick(source, keys, fallback=""){
  if(!source) return fallback;
  for(const key of keys){
    const value = source[key];
    if(bloomClean(value, "") !== "") return bloomClean(value);
  }
  const data = source.data || {};
  for(const key of keys){
    const value = data[key];
    if(bloomClean(value, "") !== "") return bloomClean(value);
  }
  return fallback;
}

function bloomEmpresaHydrate(source){
  const e = source || {};
  return Object.assign({}, e, {
    id: e.id || uid(),
    nombre: bloomPick(e, ["nombre","nombre_empresa","empresa","company","name"]),
    sector: bloomPick(e, ["sector","actividad","categoria"]),
    subsector: bloomPick(e, ["subsector","sub_sector"]),
    ciudad: bloomPick(e, ["ciudad","localidad","municipio"], "Las Palmas"),
    isla: bloomPick(e, ["isla"], "Gran Canaria"),
    web: bloomPick(e, ["web","website","url"]),
    fuente: bloomPick(e, ["fuente","origen"]),
    acepta_practicas: bloomPick(e, ["acepta_practicas","acepta","practicas"]),
    tipo_practicas: bloomPick(e, ["tipo_practicas","tipo"]),
    contacto: bloomPick(e, ["contacto","contacto_nombre","persona_contacto","responsable"]),
    telefono: bloomPick(e, ["telefono","contacto_telefono","phone","teléfono"]),
    email: bloomPick(e, ["email","correo","contacto_email","mail"]),
    estado: bloomPick(e, ["estado","estado_crm"], "nueva"),
    prioridad: bloomPick(e, ["prioridad"], "media"),
    notas: bloomPick(e, ["notas","observaciones","comentarios"])
  });
}

function bloomAlumnoHydrate(source){
  const a = source || {};
  return Object.assign({}, a, {
    id: a.id || uid(),
    nombre: bloomPick(a, ["nombre","nombre_alumno","alumno","name"]),
    dni: bloomPick(a, ["dni","nif","nie","documento","documento_identidad"]),
    telefono: bloomPick(a, ["telefono","phone","teléfono"]),
    email: bloomPick(a, ["email","correo","mail"]),
    direccion: bloomPick(a, ["direccion","dirección","address"]),
    nss: bloomPick(a, ["nss","seguridad_social","numero_seguridad_social"]),
    curso: bloomPick(a, ["curso","curso_procedencia"]),
    estado: bloomPick(a, ["estado"], "sin asignar"),
    empresa: bloomPick(a, ["empresa","empresa_nombre"]),
    inicio: bloomPick(a, ["inicio","fecha_inicio"]),
    fin: bloomPick(a, ["fin","fecha_fin"]),
    tutor: bloomPick(a, ["tutor","tutor_centro"]),
    tutor_empresa: bloomPick(a, ["tutor_empresa","tutorEmpresa"]),
    horas: bloomPick(a, ["horas","horas_fct"]),
    evaluacion: bloomPick(a, ["evaluacion","evaluación"]),
    notas: bloomPick(a, ["notas","observaciones"])
  });
}

function bloomInfo(label, value){
  return `<article><b>${esc(label)}</b><span>${esc(bloomClean(value, "Sin dato"))}</span></article>`;
}

function bloomDniOk(value){
  const dni = bloomClean(value, "").toUpperCase();
  if(!dni) return true;
  return /^(\d{8}[A-Z]|[XYZ]\d{7}[A-Z])$/.test(dni);
}

function bloomDniBadge(value){
  const dni = bloomClean(value, "");
  if(!dni) return `<span class="dni-badge empty">Sin DNI</span>`;
  return `<span class="dni-badge ${bloomDniOk(dni) ? "ok" : "warn"}">${esc(dni)}</span>`;
}

function bloomListHTML(items, empty){
  return items.length ? `<div class="list">${items.join("")}</div>` : `<p class="empty-text">${esc(empty)}</p>`;
}

function bloomEmpresaById(id){
  const idx = state.empresas.findIndex(x => String(x.id) === String(id));
  if(idx < 0) return null;
  state.empresas[idx] = bloomEmpresaHydrate(state.empresas[idx]);
  return state.empresas[idx];
}

function bloomAlumnoById(id){
  const idx = state.alumnos.findIndex(x => String(x.id) === String(id));
  if(idx < 0) return null;
  state.alumnos[idx] = bloomAlumnoHydrate(state.alumnos[idx]);
  return state.alumnos[idx];
}

function bloomInput(name, label, value, placeholder=label){
  return `
    <label class="field-label">
      ${esc(label)}
      <input name="${esc(name)}" value="${esc(bloomClean(value))}" placeholder="${esc(placeholder)}">
    </label>
  `;
}

/* ---------- Empresas: tabla clicable, edición parcial, sin ciclos ---------- */

renderEmpresas = function(){
  state.empresas = state.empresas.map(bloomEmpresaHydrate);

  const q = ($("#empresaSearch")?.value || "").toLowerCase();
  let list = state.empresas.filter(e => !q || JSON.stringify(e).toLowerCase().includes(q));

  $("#empresas").innerHTML = pageHead("Empresas", "Empresas", "CRM de empresas colaboradoras") + `
    <section class="card table-card">
      <div class="toolbar">
        <input id="empresaSearch" placeholder="Buscar empresa..." oninput="renderEmpresas()" value="${esc(q)}">
        <button class="primary" onclick="openEmpresa()">Añadir empresa</button>
        ${typeof openImportExcel === "function" ? `<button class="soft-btn" onclick="openImportExcel('empresas')">Importar Excel/CSV</button>` : ""}
        ${typeof exportExcel41 === "function" ? `<button class="soft-btn" onclick="exportExcel41('empresas')">Exportar Excel</button>` : ""}
        ${typeof downloadTemplateExcel41 === "function" ? `<button class="soft-btn" onclick="downloadTemplateExcel41('empresas')">Plantilla Excel</button>` : ""}
      </div>
      <table>
        <thead>
          <tr>
            <th>Empresa</th><th>Sector</th><th>Contacto</th><th>Estado</th><th>Prioridad</th><th></th>
          </tr>
        </thead>
        <tbody>
          ${list.map(e => `
            <tr class="clickable-row" data-empresa-id="${esc(e.id)}" onclick="openEmpresaFicha('${e.id}')">
              <td><b>${esc(e.nombre || "Sin nombre")}</b><br><small>${esc(e.ciudad || "")}${e.isla ? " · " + esc(e.isla) : ""}</small></td>
              <td>${esc(e.sector || "")}</td>
              <td>${esc(e.contacto || "Sin contacto")}<br><small>${esc(e.telefono || "")}${e.email ? " · " + esc(e.email) : ""}</small></td>
              <td><span class="badge">${esc(e.estado || "nueva")}</span></td>
              <td>${esc(e.prioridad || "media")}</td>
              <td class="row-actions" onclick="event.stopPropagation()">
                <button onclick="openEmpresa('${e.id}')">Editar</button>
                <button onclick="delEmpresa('${e.id}')">Eliminar</button>
              </td>
            </tr>
          `).join("") || `<tr><td colspan="6">No hay empresas.</td></tr>`}
        </tbody>
      </table>
      <p class="hint-click">Haz clic sobre una empresa para abrir su ficha completa.</p>
    </section>
  `;
};

openEmpresa = function(eid=null){
  const isEdit = eid !== null && eid !== undefined;
  const e = isEdit ? bloomEmpresaById(eid) : bloomEmpresaHydrate({
    nombre:"", sector:"", subsector:"", ciudad:"Las Palmas", isla:"Gran Canaria", web:"",
    fuente:"", acepta_practicas:"", tipo_practicas:"", contacto:"", telefono:"",
    email:"", estado:"nueva", prioridad:"media", notas:""
  });

  if(isEdit && !e){
    alert("No se encontró la empresa para editar.");
    return;
  }

  modal(isEdit ? "Editar empresa" : "Añadir empresa", `
    <form id="empresaForm" class="form-grid empresa-form-fixed">
      ${bloomInput("nombre", "Nombre", e.nombre, "Nombre de la empresa")}
      ${bloomInput("sector", "Sector", e.sector)}
      ${bloomInput("subsector", "Subsector", e.subsector)}
      ${bloomInput("ciudad", "Ciudad", e.ciudad)}
      ${bloomInput("isla", "Isla", e.isla)}
      ${bloomInput("web", "Web", e.web)}
      ${bloomInput("fuente", "Fuente", e.fuente)}
      ${bloomInput("acepta_practicas", "Acepta prácticas", e.acepta_practicas)}
      ${bloomInput("tipo_practicas", "Tipo prácticas", e.tipo_practicas)}
      ${bloomInput("contacto", "Contacto", e.contacto, "Persona de contacto")}
      ${bloomInput("telefono", "Teléfono", e.telefono)}
      ${bloomInput("email", "Email", e.email)}

      <label class="field-label">Estado
        <select name="estado">
          ${["nueva","contactada","interesada","convenio","activa","descartada"].map(x => `<option value="${x}" ${e.estado === x ? "selected" : ""}>${x}</option>`).join("")}
        </select>
      </label>

      <label class="field-label">Prioridad
        <select name="prioridad">
          ${["alta","media","baja"].map(x => `<option value="${x}" ${e.prioridad === x ? "selected" : ""}>${x}</option>`).join("")}
        </select>
      </label>

      <label class="field-label full">Notas
        <textarea name="notas" placeholder="Notas">${esc(e.notas || "")}</textarea>
      </label>
    </form>
  `, async () => {
    const form = Object.fromEntries(new FormData($("#empresaForm")).entries());
    Object.keys(form).forEach(k => form[k] = bloomClean(form[k]).trim());

    if(!form.nombre){
      alert("El nombre de la empresa es obligatorio.");
      return;
    }

    let empresa;
    if(isEdit){
      const idx = state.empresas.findIndex(x => String(x.id) === String(eid));
      empresa = Object.assign({}, state.empresas[idx], form, {
        id: state.empresas[idx].id,
        ciclos_recomendados: "",
        data: Object.assign({}, state.empresas[idx].data || {}, form, { ciclos_recomendados:"" })
      });
      state.empresas[idx] = empresa;
    }else{
      empresa = Object.assign({ id: uid() }, form, {
        ciclos_recomendados:"",
        data: Object.assign({}, form, { ciclos_recomendados:"" })
      });
      state.empresas.unshift(empresa);
    }

    try{
      if(typeof bloom3Client !== "undefined" && bloom3Client && typeof bloom3PublicRow === "function" && typeof bloom3Tables !== "undefined"){
        const row = bloom3PublicRow("empresas", empresa);
        row.ciclos_recomendados = "";
        row.data = Object.assign({}, row.data || {}, empresa.data || {});
        const { error } = await bloom3Client.from(bloom3Tables.empresas).upsert(row, { onConflict:"id" });
        if(error) throw error;
      }
      log(`Empresa guardada: ${empresa.nombre}`);
      save();
      closeModal();
      if(typeof loadCloud === "function") await loadCloud();
      render();
      toast(isEdit ? "Empresa modificada 🌸" : "Empresa creada 🌸");
    }catch(error){
      alert("No se pudo guardar la empresa:\n\n" + error.message);
    }
  });
};

function openEmpresaFicha(id){
  const e = bloomEmpresaById(id);
  if(!e) return;

  const alumnos = state.alumnos.map(bloomAlumnoHydrate).filter(a => a.empresa === e.nombre);
  const convenios = state.convenios.filter(c => c.empresa === e.nombre);
  const documentos = state.documentos.filter(d => d.empresa === e.nombre);
  const seguimientos = state.seguimientos.filter(s => s.empresa === e.nombre);

  modal("Ficha completa de empresa", `
    <section class="profile360 empresa360">
      <aside class="profile360-side">
        <div class="profile360-logo">${esc((e.nombre || "E")[0])}</div>
        <h2>${esc(e.nombre || "Empresa")}</h2>
        <p>${esc(e.sector || "Sin sector")}</p>
        <span class="badge">${esc(e.estado || "nueva")}</span>
        <button class="primary" onclick="openEmpresa('${e.id}')">Editar empresa</button>
      </aside>

      <main class="profile360-main">
        <section class="profile360-section">
          <div class="section-head"><div><p>Datos</p><h3>Información general</h3></div></div>
          <div class="profile360-grid">
            ${bloomInfo("Nombre", e.nombre)}
            ${bloomInfo("Sector", e.sector)}
            ${bloomInfo("Subsector", e.subsector)}
            ${bloomInfo("Contacto", e.contacto)}
            ${bloomInfo("Teléfono", e.telefono)}
            ${bloomInfo("Email", e.email)}
            ${bloomInfo("Web", e.web)}
            ${bloomInfo("Ciudad", e.ciudad)}
            ${bloomInfo("Isla", e.isla)}
            ${bloomInfo("Fuente", e.fuente)}
            ${bloomInfo("Acepta prácticas", e.acepta_practicas)}
            ${bloomInfo("Tipo prácticas", e.tipo_practicas)}
            ${bloomInfo("Prioridad", e.prioridad)}
          </div>
        </section>

        <section class="profile360-section">
          <div class="section-head"><div><p>Alumnos</p><h3>Asignados</h3></div></div>
          ${bloomListHTML(alumnos.map(a => `
            <article class="item clickable-row" onclick="openAlumnoFichaCompleta('${a.id}')">
              <div><b>${esc(a.nombre)}</b><p>DNI: ${esc(a.dni || "Sin DNI")} · ${esc(a.estado || "")}</p></div><span>Ver</span>
            </article>
          `), "No hay alumnos asignados.")}
        </section>

        <section class="profile360-section">
          <div class="section-head"><div><p>Convenios</p><h3>Relacionados</h3></div></div>
          ${bloomListHTML(convenios.map(c => `
            <article class="item"><div><b>${esc(c.empresa || e.nombre)}</b><p>${esc(c.inicio || "")} → ${esc(c.fin || "")} · ${esc(c.estado || "")}</p></div></article>
          `), "No hay convenios relacionados.")}
        </section>

        <section class="profile360-section">
          <div class="section-head"><div><p>Seguimiento</p><h3>Historial CRM</h3></div></div>
          ${bloomListHTML(seguimientos.map(s => `
            <article class="item"><div><b>${esc(s.tipo || "Seguimiento")} · ${esc(s.fecha || "")}</b><p>${esc(s.resultado || "")}${s.proxima ? " · Próxima: " + esc(s.proxima) : ""}</p></div></article>
          `), "No hay seguimientos registrados.")}
        </section>

        <section class="profile360-section">
          <div class="section-head"><div><p>Documentos</p><h3>Archivo documental</h3></div></div>
          ${bloomListHTML(documentos.map(d => `
            <article class="item clickable-row" onclick="previewAnyFile(state.documentos.find(x=>String(x.id)===String('${d.id}')).file,'${esc(d.nombre)}')">
              <div><b>${esc(d.nombre)}</b><p>${esc(d.tipo || "")} · ${esc(d.estado || "")}</p></div><span>Ver</span>
            </article>
          `), "No hay documentos vinculados.")}
        </section>

        <section class="profile360-section">
          <div class="section-head"><div><p>Notas</p><h3>Observaciones privadas</h3></div></div>
          <p>${esc(e.notas || "Sin notas")}</p>
        </section>
      </main>
    </section>
  `, () => closeModal());
}
openEmpresa360 = openEmpresaFicha;

/* ---------- Alumnos: DNI y ficha completa con clic funcional ---------- */

function bloomAlumnoProgress(a){
  if(!a.inicio || !a.fin) return 0;
  const start = new Date(a.inicio), end = new Date(a.fin), now = new Date();
  if(Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) return 0;
  if(now <= start) return 0;
  if(now >= end) return 100;
  return Math.round(((now-start)/(end-start))*100);
}

function openAlumnoFichaCompleta(id){
  const a = bloomAlumnoById(id);
  if(!a) return;

  const empresa = state.empresas.map(bloomEmpresaHydrate).find(e => e.nombre === a.empresa);
  const convenio = state.convenios.find(c => c.empresa === a.empresa || c.alumno === a.nombre);
  const docs = state.documentos.filter(d => d.alumno === a.nombre || d.empresa === a.empresa);
  const segs = state.seguimientos.filter(s => s.empresa === a.empresa || s.alumno === a.nombre);
  const progress = bloomAlumnoProgress(a);

  modal("Ficha completa del alumno", `
    <section class="student-full-card">
      <aside class="student-full-side">
        <div class="student-full-photo">
          ${a.foto?.data ? `<img src="${a.foto.data}">` : a.foto?.url ? `<img src="${a.foto.url}">` : `<span>${esc((a.nombre || "A")[0])}</span>`}
        </div>
        <h2>${esc(a.nombre || "Alumno")}</h2>
        <p>${esc(a.dni || "Sin DNI/NIE")}</p>
        <span class="badge">${esc(a.estado || "sin asignar")}</span>
        <div class="student-progress"><div><span>Progreso prácticas</span><b>${progress}%</b></div><i><em style="width:${progress}%"></em></i></div>
        <button class="primary" onclick="openAlumno('${a.id}')">Editar alumno</button>
        ${a.curriculum ? `<button class="soft-btn" onclick="previewAnyFile(state.alumnos.find(x=>String(x.id)===String('${a.id}')).curriculum,'Currículum')">Ver currículum</button>` : ""}
        ${a.foto ? `<button class="soft-btn" onclick="previewAnyFile(state.alumnos.find(x=>String(x.id)===String('${a.id}')).foto,'Foto')">Ver foto</button>` : ""}
      </aside>

      <main class="student-full-main">
        <section class="student-full-section">
          <div class="section-head"><div><p>Datos personales</p><h3>Información del alumno</h3></div></div>
          <div class="student-full-grid">
            ${bloomInfo("Nombre", a.nombre)}
            ${bloomInfo("DNI / NIE", a.dni)}
            ${bloomInfo("Teléfono", a.telefono)}
            ${bloomInfo("Correo", a.email)}
            ${bloomInfo("Dirección", a.direccion)}
            ${bloomInfo("Nº Seguridad Social", a.nss)}
            ${bloomInfo("Curso", a.curso)}
          </div>
        </section>

        <section class="student-full-section">
          <div class="section-head"><div><p>Prácticas</p><h3>Datos académicos y FCT</h3></div></div>
          <div class="student-full-grid">
            ${bloomInfo("Estado", a.estado)}
            ${bloomInfo("Empresa", a.empresa)}
            ${bloomInfo("Tutor centro", a.tutor)}
            ${bloomInfo("Tutor empresa", a.tutor_empresa)}
            ${bloomInfo("Inicio", a.inicio)}
            ${bloomInfo("Fin", a.fin)}
            ${bloomInfo("Horas", a.horas)}
            ${bloomInfo("Evaluación", a.evaluacion)}
            ${bloomInfo("Convenio", convenio ? convenio.estado : "")}
          </div>
        </section>

        <section class="student-full-section">
          <div class="section-head"><div><p>Empresa</p><h3>Empresa asignada</h3></div></div>
          ${empresa ? `
            <article class="item clickable-row" onclick="openEmpresaFicha('${empresa.id}')">
              <div><b>${esc(empresa.nombre)}</b><p>${esc(empresa.contacto || "Sin contacto")} · ${esc(empresa.telefono || "")} ${empresa.email ? "· " + esc(empresa.email) : ""}</p></div>
              <span>Ver empresa</span>
            </article>` : `<p class="empty-text">Sin empresa asignada.</p>`}
        </section>

        <section class="student-full-section">
          <div class="section-head"><div><p>Documentación</p><h3>Archivos del alumno</h3></div></div>
          <div class="student-doc-grid">
            ${a.curriculum ? `<article class="student-doc-card" onclick="previewAnyFile(state.alumnos.find(x=>String(x.id)===String('${a.id}')).curriculum,'Currículum')"><b>📄 Currículum</b><span>Ver / descargar</span></article>` : `<article class="student-doc-card muted"><b>📄 Currículum</b><span>No adjuntado</span></article>`}
            ${a.foto ? `<article class="student-doc-card" onclick="previewAnyFile(state.alumnos.find(x=>String(x.id)===String('${a.id}')).foto,'Foto')"><b>🖼 Foto</b><span>Ver / descargar</span></article>` : `<article class="student-doc-card muted"><b>🖼 Foto</b><span>No adjuntada</span></article>`}
            ${docs.map(d => `<article class="student-doc-card" onclick="previewAnyFile(state.documentos.find(x=>String(x.id)===String('${d.id}')).file,'${esc(d.nombre)}')"><b>📎 ${esc(d.nombre || "Documento")}</b><span>${esc(d.tipo || "Documento")} · ${esc(d.estado || "")}</span></article>`).join("")}
          </div>
        </section>

        <section class="student-full-section">
          <div class="section-head"><div><p>Seguimiento</p><h3>Historial relacionado</h3></div></div>
          ${bloomListHTML(segs.map(s => `<article class="item"><div><b>${esc(s.tipo || "Seguimiento")} · ${esc(s.fecha || "")}</b><p>${esc(s.resultado || "")}${s.proxima ? " · Próxima: " + esc(s.proxima) : ""}</p></div></article>`), "No hay seguimientos relacionados.")}
        </section>

        <section class="student-full-section">
          <div class="section-head"><div><p>Observaciones</p><h3>Notas privadas</h3></div></div>
          <p>${esc(a.notas || "Sin observaciones")}</p>
        </section>
      </main>
    </section>
  `, () => closeModal());
}
openStudentProfile = openAlumnoFichaCompleta;

renderAlumnos = function(){
  state.alumnos = state.alumnos.map(bloomAlumnoHydrate);

  const q = ($("#studentSearch")?.value || "").toLowerCase();
  let list = state.alumnos.filter(a => !q || JSON.stringify(a).toLowerCase().includes(q));

  $("#alumnos").innerHTML = pageHead("Alumnos", "Alumnos", "Ficha completa del alumnado") + `
    <section class="card table-card">
      <div class="toolbar">
        <input id="studentSearch" placeholder="Buscar por nombre, DNI, empresa, teléfono..." value="${esc(q)}" oninput="renderAlumnos()">
        <button class="primary" onclick="openAlumno()">Añadir alumno</button>
        ${typeof openImportExcel === "function" ? `<button class="soft-btn" onclick="openImportExcel('alumnos')">Importar Excel/CSV</button>` : ""}
        ${typeof exportExcel41 === "function" ? `<button class="soft-btn" onclick="exportExcel41('alumnos')">Exportar Excel</button>` : ""}
        ${typeof downloadTemplateExcel41 === "function" ? `<button class="soft-btn" onclick="downloadTemplateExcel41('alumnos')">Plantilla</button>` : ""}
      </div>
      <table>
        <thead>
          <tr><th>Alumno</th><th>DNI / NIE</th><th>Contacto</th><th>Empresa</th><th>Estado</th><th>Archivos</th><th></th></tr>
        </thead>
        <tbody>
          ${list.map(a => `
            <tr class="student-row clickable-row" data-alumno-id="${esc(a.id)}" onclick="openAlumnoFichaCompleta('${a.id}')">
              <td><div class="student-cell"><div class="student-avatar">${a.foto?.data ? `<img src="${a.foto.data}">` : a.foto?.url ? `<img src="${a.foto.url}">` : `<span>${esc((a.nombre || "A")[0])}</span>`}</div><div><b>${esc(a.nombre)}</b><br><small>NSS: ${esc(a.nss || "Sin NSS")}</small></div></div></td>
              <td>${bloomDniBadge(a.dni)}</td>
              <td>${esc(a.telefono || "")}<br><small>${esc(a.email || "")}</small></td>
              <td>${esc(a.empresa || "Sin empresa")}</td>
              <td><span class="badge">${esc(a.estado || "sin asignar")}</span></td>
              <td onclick="event.stopPropagation()"><div class="student-files">${a.foto ? `<button onclick="previewAnyFile(state.alumnos.find(x=>String(x.id)===String('${a.id}')).foto,'Foto')">Foto</button>` : `<span>Sin foto</span>`}${a.curriculum ? `<button onclick="previewAnyFile(state.alumnos.find(x=>String(x.id)===String('${a.id}')).curriculum,'CV')">CV</button>` : `<span>Sin CV</span>`}</div></td>
              <td class="row-actions" onclick="event.stopPropagation()"><button onclick="openAlumno('${a.id}')">Editar</button><button onclick="delAlumno('${a.id}')">Eliminar</button></td>
            </tr>
          `).join("") || `<tr><td colspan="7">No hay alumnos.</td></tr>`}
        </tbody>
      </table>
      <p class="hint-click">Haz clic sobre cualquier alumno para abrir su ficha completa.</p>
    </section>
  `;
};

openAlumno = function(aid=null){
  const isEdit = aid !== null && aid !== undefined;
  const a = isEdit ? bloomAlumnoById(aid) : bloomAlumnoHydrate({nombre:"",dni:"",telefono:"",email:"",direccion:"",nss:"",curso:"",estado:"sin asignar",empresa:"",inicio:"",fin:"",tutor:"",tutor_empresa:"",horas:"",evaluacion:"",notas:"",foto:null,curriculum:null});

  if(isEdit && !a){
    alert("No se encontró el alumno para editar.");
    return;
  }

  modal(isEdit ? "Editar alumno" : "Añadir alumno", `
    <form id="alumnoForm" class="form-grid alumno-form-dni">
      <div class="student-photo-preview">${a.foto?.data ? `<img src="${a.foto.data}">` : a.foto?.url ? `<img src="${a.foto.url}">` : "Foto"}</div>
      ${bloomInput("nombre", "Nombre completo", a.nombre, "Nombre")}
      ${bloomInput("dni", "DNI / NIE", a.dni, "12345678Z o X1234567L")}
      ${bloomInput("telefono", "Teléfono", a.telefono)}
      ${bloomInput("email", "Correo", a.email)}
      ${bloomInput("direccion", "Dirección", a.direccion)}
      ${bloomInput("nss", "Nº Seguridad Social", a.nss)}
      ${bloomInput("curso", "Curso", a.curso)}
      <label class="student-files">Foto<input id="alumnoFoto" type="file" accept="image/*"></label>
      <label class="student-files">Currículum<input id="alumnoCV" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"></label>
      <label class="field-label">Empresa
        <select name="empresa"><option value="">Sin empresa</option>${state.empresas.map(e => `<option ${a.empresa === e.nombre ? "selected" : ""}>${esc(e.nombre)}</option>`).join("")}</select>
      </label>
      <label class="field-label">Estado
        <select name="estado">${["sin asignar","propuesta","entrevista","prácticas","finalizado"].map(x => `<option ${a.estado === x ? "selected" : ""}>${x}</option>`).join("")}</select>
      </label>
      ${bloomInput("inicio", "Inicio prácticas", a.inicio)}
      ${bloomInput("fin", "Fin prácticas", a.fin)}
      ${bloomInput("tutor", "Tutor centro", a.tutor)}
      ${bloomInput("tutor_empresa", "Tutor empresa", a.tutor_empresa)}
      ${bloomInput("horas", "Horas", a.horas)}
      ${bloomInput("evaluacion", "Evaluación", a.evaluacion)}
      <label class="field-label full">Notas<textarea name="notas">${esc(a.notas || "")}</textarea></label>
    </form>
  `, async () => {
    const form = Object.fromEntries(new FormData($("#alumnoForm")).entries());
    Object.keys(form).forEach(k => form[k] = bloomClean(form[k]).trim());
    form.dni = String(form.dni || "").toUpperCase();

    if(form.dni && !bloomDniOk(form.dni) && !confirm("El DNI/NIE no parece válido. ¿Guardar igualmente?")) return;

    let alumno;
    if(isEdit){
      const idx = state.alumnos.findIndex(x => String(x.id) === String(aid));
      alumno = Object.assign({}, state.alumnos[idx], form, { id: state.alumnos[idx].id, data: Object.assign({}, state.alumnos[idx].data || {}, form) });
      state.alumnos[idx] = alumno;
    }else{
      alumno = Object.assign({ id: uid() }, form, { foto:null, curriculum:null, data:Object.assign({}, form) });
      state.alumnos.unshift(alumno);
    }

    const foto = $("#alumnoFoto").files[0], cv = $("#alumnoCV").files[0];
    if(foto) alumno.foto = await fileToData(foto);
    if(cv) alumno.curriculum = await fileToData(cv);

    log(`Alumno guardado: ${alumno.nombre}`);
    save();
    closeModal();
    render();
    toast(isEdit ? "Alumno modificado 🌸" : "Alumno creado 🌸");
  });
};

/* Delegación de seguridad: si algún render antiguo se ejecuta, los clics siguen funcionando */
document.addEventListener("click", function(event){
  const alumnoRow = event.target.closest("#alumnos tbody tr");
  if(alumnoRow && !event.target.closest("button, a, input, select, textarea, label")){
    const id = alumnoRow.dataset.alumnoId || (alumnoRow.getAttribute("onclick") || "").match(/['"]([^'"]+)['"]/)?.[1];
    if(id){
      event.preventDefault();
      event.stopPropagation();
      openAlumnoFichaCompleta(id);
    }
  }

  const empresaRow = event.target.closest("#empresas tbody tr");
  if(empresaRow && !event.target.closest("button, a, input, select, textarea, label")){
    const id = empresaRow.dataset.empresaId || (empresaRow.getAttribute("onclick") || "").match(/['"]([^'"]+)['"]/)?.[1];
    if(id){
      event.preventDefault();
      event.stopPropagation();
      openEmpresaFicha(id);
    }
  }
}, true);

/* Refuerzo importación/exportación Excel alumnos con DNI si existen funciones v4 */
if(typeof mapAlumnoRow41 === "function"){
  const _mapAlumnoRow41 = mapAlumnoRow41;
  mapAlumnoRow41 = function(row){
    const a = _mapAlumnoRow41(row);
    if(typeof getRow41 === "function"){
      a.dni = getRow41(row, ["dni","nif","nie","documento","documento_identidad"]);
    }
    return a;
  };
}

if(typeof exportExcel41 === "function"){
  const _exportExcel41 = exportExcel41;
  exportExcel41 = function(type){
    if(type !== "alumnos") return _exportExcel41(type);
    const rows = state.alumnos.map(bloomAlumnoHydrate).map(a => ({
      nombre_alumno:a.nombre || "",
      dni:a.dni || "",
      telefono:a.telefono || "",
      email:a.email || "",
      direccion:a.direccion || "",
      nss:a.nss || "",
      curso:a.curso || "",
      estado:a.estado || "",
      empresa:a.empresa || "",
      inicio:a.inicio || "",
      fin:a.fin || "",
      tutor:a.tutor || "",
      tutor_empresa:a.tutor_empresa || "",
      horas:a.horas || "",
      evaluacion:a.evaluacion || "",
      notas:a.notas || ""
    }));
    if(window.XLSX){
      const ws = XLSX.utils.json_to_sheet(rows), wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Alumnos");
      XLSX.writeFile(wb, "bloom_alumnos.xlsx");
    }
  };
}



/* =========================================================
   Bloom CRM 3.0 — Importar / Exportar XML
   Añade a Empresas y Alumnos:
   - Exportar XML
   - Importar XML
   Compatible con:
   - <bloom><empresas><empresa>...</empresa></empresas></bloom>
   - <bloom><alumnos><alumno>...</alumno></alumnos></bloom>
   - XML simple con <empresa> o <alumno> como nodos raíz.
========================================================= */

function bloomXmlClean(value){
  if(value === null || value === undefined) return "";
  const text = String(value);
  if(text.toLowerCase() === "null" || text.toLowerCase() === "undefined") return "";
  return text;
}

function bloomXmlEscape(value){
  return bloomXmlClean(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&apos;");
}

function bloomXmlDownload(filename, xml){
  const blob = new Blob([xml], { type:"application/xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function bloomXmlField(item, key){
  const value = item?.[key];
  if(value === null || value === undefined) return "";
  if(typeof value === "object") return "";
  return bloomXmlEscape(value);
}

function bloomEmpresaXmlItem(e){
  const empresa = typeof bloomEmpresaHydrate === "function" ? bloomEmpresaHydrate(e) : e;
  const fields = [
    "id","nombre","sector","subsector","ciudad","isla","web","fuente",
    "acepta_practicas","tipo_practicas","contacto","telefono","email",
    "estado","prioridad","notas"
  ];
  return `    <empresa>\n${fields.map(k => `      <${k}>${bloomXmlField(empresa,k)}</${k}>`).join("\n")}\n    </empresa>`;
}

function bloomAlumnoXmlItem(a){
  const alumno = typeof bloomAlumnoHydrate === "function" ? bloomAlumnoHydrate(a) : a;
  const fields = [
    "id","nombre","dni","telefono","email","direccion","nss","curso",
    "estado","empresa","inicio","fin","tutor","tutor_empresa","horas",
    "evaluacion","notas"
  ];
  return `    <alumno>\n${fields.map(k => `      <${k}>${bloomXmlField(alumno,k)}</${k}>`).join("\n")}\n    </alumno>`;
}

function exportXML(type){
  const now = new Date().toISOString();
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;

  if(type === "empresas"){
    const empresas = (state.empresas || []).map(e => typeof bloomEmpresaHydrate === "function" ? bloomEmpresaHydrate(e) : e);
    xml += `<bloom version="3.0" entidad="empresas" generado="${bloomXmlEscape(now)}">\n  <empresas>\n${empresas.map(bloomEmpresaXmlItem).join("\n")}\n  </empresas>\n</bloom>\n`;
    bloomXmlDownload("bloom_empresas.xml", xml);
    toast("Empresas exportadas en XML 🌸");
    return;
  }

  if(type === "alumnos"){
    const alumnos = (state.alumnos || []).map(a => typeof bloomAlumnoHydrate === "function" ? bloomAlumnoHydrate(a) : a);
    xml += `<bloom version="3.0" entidad="alumnos" generado="${bloomXmlEscape(now)}">\n  <alumnos>\n${alumnos.map(bloomAlumnoXmlItem).join("\n")}\n  </alumnos>\n</bloom>\n`;
    bloomXmlDownload("bloom_alumnos.xml", xml);
    toast("Alumnos exportados en XML 🌸");
    return;
  }
}

function bloomXmlText(node, names){
  for(const name of names){
    const el = node.querySelector(name);
    if(el && el.textContent !== null && el.textContent !== undefined){
      return el.textContent.trim();
    }
  }
  return "";
}

function bloomXmlEmpresaFromNode(node){
  return {
    id: bloomXmlText(node, ["id"]) || uid(),
    nombre: bloomXmlText(node, ["nombre","nombre_empresa","empresa"]),
    sector: bloomXmlText(node, ["sector"]),
    subsector: bloomXmlText(node, ["subsector"]),
    ciudad: bloomXmlText(node, ["ciudad","localidad","municipio"]) || "Las Palmas",
    isla: bloomXmlText(node, ["isla"]) || "Gran Canaria",
    web: bloomXmlText(node, ["web","website","url"]),
    fuente: bloomXmlText(node, ["fuente","origen"]),
    acepta_practicas: bloomXmlText(node, ["acepta_practicas","acepta"]),
    tipo_practicas: bloomXmlText(node, ["tipo_practicas","tipo"]),
    contacto: bloomXmlText(node, ["contacto","contacto_nombre","persona_contacto"]),
    telefono: bloomXmlText(node, ["telefono","contacto_telefono"]),
    email: bloomXmlText(node, ["email","correo","contacto_email"]),
    estado: bloomXmlText(node, ["estado","estado_crm"]) || "nueva",
    prioridad: bloomXmlText(node, ["prioridad"]) || "media",
    notas: bloomXmlText(node, ["notas","observaciones"]),
  };
}

function bloomXmlAlumnoFromNode(node){
  return {
    id: bloomXmlText(node, ["id"]) || uid(),
    nombre: bloomXmlText(node, ["nombre","nombre_alumno","alumno"]),
    dni: bloomXmlText(node, ["dni","nif","nie","documento","documento_identidad"]).toUpperCase(),
    telefono: bloomXmlText(node, ["telefono"]),
    email: bloomXmlText(node, ["email","correo"]),
    direccion: bloomXmlText(node, ["direccion","dirección"]),
    nss: bloomXmlText(node, ["nss","seguridad_social"]),
    curso: bloomXmlText(node, ["curso","curso_procedencia"]),
    estado: bloomXmlText(node, ["estado"]) || "sin asignar",
    empresa: bloomXmlText(node, ["empresa","empresa_nombre"]),
    inicio: bloomXmlText(node, ["inicio","fecha_inicio"]),
    fin: bloomXmlText(node, ["fin","fecha_fin"]),
    tutor: bloomXmlText(node, ["tutor","tutor_centro"]),
    tutor_empresa: bloomXmlText(node, ["tutor_empresa","tutorEmpresa"]),
    horas: bloomXmlText(node, ["horas","horas_fct"]),
    evaluacion: bloomXmlText(node, ["evaluacion","evaluación"]),
    notas: bloomXmlText(node, ["notas","observaciones"]),
  };
}

function bloomXmlFindNodes(doc, type){
  const selector = type === "empresas" ? "empresa" : "alumno";
  return [...doc.querySelectorAll(selector)];
}

function bloomXmlUpsert(type, rows, updateExisting){
  const collection = type === "empresas" ? state.empresas : state.alumnos;
  let created = 0;
  let updated = 0;
  let skipped = 0;

  rows.forEach(row => {
    if(!row.nombre){
      skipped++;
      return;
    }

    let idx = -1;
    if(row.id) idx = collection.findIndex(x => String(x.id) === String(row.id));

    if(idx < 0){
      if(type === "empresas"){
        idx = collection.findIndex(x => String((x.nombre || "")).toLowerCase() === String(row.nombre).toLowerCase());
      }else{
        idx = collection.findIndex(x =>
          (row.email && String(x.email || "").toLowerCase() === String(row.email).toLowerCase()) ||
          (row.dni && String(x.dni || "").toLowerCase() === String(row.dni).toLowerCase()) ||
          String((x.nombre || "")).toLowerCase() === String(row.nombre).toLowerCase()
        );
      }
    }

    if(idx >= 0){
      if(updateExisting){
        collection[idx] = Object.assign({}, collection[idx], row, {
          id: collection[idx].id,
          data: Object.assign({}, collection[idx].data || {}, row)
        });
        updated++;
      }else{
        skipped++;
      }
    }else{
      row.id = row.id || uid();
      row.data = Object.assign({}, row);
      collection.unshift(row);
      created++;
    }
  });

  return { created, updated, skipped };
}

function importXML(type){
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".xml,application/xml,text/xml";
  input.onchange = async () => {
    const file = input.files?.[0];
    if(!file) return;

    try{
      const text = await file.text();
      const doc = new DOMParser().parseFromString(text, "application/xml");
      const parseError = doc.querySelector("parsererror");
      if(parseError){
        alert("El XML no es válido.");
        return;
      }

      const nodes = bloomXmlFindNodes(doc, type);
      if(!nodes.length){
        alert(type === "empresas" ? "No se encontraron nodos <empresa> en el XML." : "No se encontraron nodos <alumno> en el XML.");
        return;
      }

      const rows = nodes.map(node => type === "empresas" ? bloomXmlEmpresaFromNode(node) : bloomXmlAlumnoFromNode(node));
      const validRows = rows.filter(r => r.nombre);

      if(!validRows.length){
        alert("El XML no contiene registros con nombre.");
        return;
      }

      const preview = validRows.slice(0,8).map(r => `
        <article class="item">
          <div>
            <b>${esc(r.nombre)}</b>
            <p>${type === "empresas" ? esc([r.sector, r.contacto, r.email].filter(Boolean).join(" · ")) : esc([r.dni, r.empresa, r.email].filter(Boolean).join(" · "))}</p>
          </div>
        </article>
      `).join("");

      modal(`Importar XML — ${type === "empresas" ? "Empresas" : "Alumnos"}`, `
        <section>
          <p>Se han detectado <b>${validRows.length}</b> registros en el archivo XML.</p>
          <div class="xml-preview-list">${preview}</div>
          ${validRows.length > 8 ? `<p class="hint-click">Vista previa de 8 registros.</p>` : ""}
          <label class="xml-check">
            <input id="xmlUpdateExisting" type="checkbox" checked>
            Actualizar registros existentes si coinciden por ID, nombre, email o DNI.
          </label>
        </section>
      `, () => {
        const updateExisting = $("#xmlUpdateExisting")?.checked !== false;
        const result = bloomXmlUpsert(type, validRows, updateExisting);
        log(`${type === "empresas" ? "Empresas" : "Alumnos"} importados desde XML: ${result.created} nuevos, ${result.updated} actualizados`);
        save();
        closeModal();
        render();
        toast(`XML importado: ${result.created} nuevos · ${result.updated} actualizados 🌸`);
      });

    }catch(error){
      alert("No se pudo importar el XML:\n\n" + error.message);
    }
  };
  input.click();
}

/* Re-render con botones XML incluidos */
const bloomXmlRenderEmpresasBase = renderEmpresas;
renderEmpresas = function(){
  bloomXmlRenderEmpresasBase();
  const toolbar = $("#empresas .toolbar");
  if(toolbar && !toolbar.querySelector("[data-xml='empresas-export']")){
    toolbar.insertAdjacentHTML("beforeend", `
      <button class="soft-btn" data-xml="empresas-import" onclick="importXML('empresas')">Importar XML</button>
      <button class="soft-btn" data-xml="empresas-export" onclick="exportXML('empresas')">Exportar XML</button>
    `);
  }
};

const bloomXmlRenderAlumnosBase = renderAlumnos;
renderAlumnos = function(){
  bloomXmlRenderAlumnosBase();
  const toolbar = $("#alumnos .toolbar");
  if(toolbar && !toolbar.querySelector("[data-xml='alumnos-export']")){
    toolbar.insertAdjacentHTML("beforeend", `
      <button class="soft-btn" data-xml="alumnos-import" onclick="importXML('alumnos')">Importar XML</button>
      <button class="soft-btn" data-xml="alumnos-export" onclick="exportXML('alumnos')">Exportar XML</button>
    `);
  }
};



/* =========================================================
   Bloom CRM 3.0 — Importar / Exportar Excel funcional
   Empresas y Alumnos:
   - Importar .xlsx, .xls y .csv
   - Exportar .xlsx
   - Descargar plantillas .xlsx
   - Vista previa antes de importar
========================================================= */

function bloomExcelClean(value){
  if(value === null || value === undefined) return "";
  const text = String(value);
  if(text.toLowerCase() === "null" || text.toLowerCase() === "undefined") return "";
  return text.trim();
}

function bloomExcelNormKey(key){
  return String(key || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function bloomExcelRowValue(row, keys){
  const normalized = {};
  Object.keys(row || {}).forEach(k => normalized[bloomExcelNormKey(k)] = row[k]);
  for(const k of keys){
    const nk = bloomExcelNormKey(k);
    if(normalized[nk] !== undefined && normalized[nk] !== null && String(normalized[nk]).trim() !== ""){
      return bloomExcelClean(normalized[nk]);
    }
  }
  return "";
}

function bloomExcelDate(value){
  if(!value) return "";
  if(value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0,10);
  if(typeof value === "number"){
    const date = XLSX.SSF.parse_date_code(value);
    if(date) return `${date.y}-${String(date.m).padStart(2,"0")}-${String(date.d).padStart(2,"0")}`;
  }
  return bloomExcelClean(value);
}

function bloomExcelEmpresaFromRow(row){
  const empresa = {
    id: bloomExcelRowValue(row, ["id"]) || uid(),
    nombre: bloomExcelRowValue(row, ["nombre_empresa","nombre","empresa","company","name"]),
    sector: bloomExcelRowValue(row, ["sector","actividad","categoria"]),
    subsector: bloomExcelRowValue(row, ["subsector","sub_sector"]),
    ciudad: bloomExcelRowValue(row, ["ciudad","localidad","municipio"]) || "Las Palmas",
    isla: bloomExcelRowValue(row, ["isla"]) || "Gran Canaria",
    web: bloomExcelRowValue(row, ["web","website","url"]),
    fuente: bloomExcelRowValue(row, ["fuente","origen"]),
    acepta_practicas: bloomExcelRowValue(row, ["acepta_practicas","acepta","practicas"]),
    tipo_practicas: bloomExcelRowValue(row, ["tipo_practicas","tipo"]),
    contacto: bloomExcelRowValue(row, ["contacto_nombre","contacto","persona_contacto","responsable"]),
    email: bloomExcelRowValue(row, ["contacto_email","email","correo","mail"]),
    telefono: bloomExcelRowValue(row, ["contacto_telefono","telefono","phone"]),
    estado: bloomExcelRowValue(row, ["estado_crm","estado"]) || "nueva",
    prioridad: bloomExcelRowValue(row, ["prioridad"]) || "media",
    notas: bloomExcelRowValue(row, ["notas","observaciones","comentarios"])
  };
  empresa.data = Object.assign({}, empresa);
  return empresa;
}

function bloomExcelAlumnoFromRow(row){
  const alumno = {
    id: bloomExcelRowValue(row, ["id"]) || uid(),
    nombre: bloomExcelRowValue(row, ["nombre_alumno","nombre","alumno","name"]),
    dni: bloomExcelRowValue(row, ["dni","nif","nie","documento","documento_identidad"]).toUpperCase(),
    telefono: bloomExcelRowValue(row, ["telefono","phone"]),
    email: bloomExcelRowValue(row, ["email","correo","mail"]),
    direccion: bloomExcelRowValue(row, ["direccion","direccion_alumno","address"]),
    nss: bloomExcelRowValue(row, ["nss","seguridad_social","numero_seguridad_social"]),
    curso: bloomExcelRowValue(row, ["curso","curso_procedencia"]),
    estado: bloomExcelRowValue(row, ["estado"]) || "sin asignar",
    empresa: bloomExcelRowValue(row, ["empresa","empresa_nombre"]),
    inicio: bloomExcelDate(row.inicio ?? row.fecha_inicio ?? row["Fecha inicio"]),
    fin: bloomExcelDate(row.fin ?? row.fecha_fin ?? row["Fecha fin"]),
    tutor: bloomExcelRowValue(row, ["tutor","tutor_centro"]),
    tutor_empresa: bloomExcelRowValue(row, ["tutor_empresa","tutorEmpresa"]),
    horas: bloomExcelRowValue(row, ["horas","horas_fct"]),
    evaluacion: bloomExcelRowValue(row, ["evaluacion","evaluación"]),
    notas: bloomExcelRowValue(row, ["notas","observaciones"])
  };
  alumno.data = Object.assign({}, alumno);
  return alumno;
}

function bloomExcelExportRows(type){
  if(type === "empresas"){
    return (state.empresas || []).map(e => ({
      nombre_empresa: e.nombre || "",
      sector: e.sector || "",
      subsector: e.subsector || "",
      ciudad: e.ciudad || "",
      isla: e.isla || "",
      web: e.web || "",
      fuente: e.fuente || "",
      acepta_practicas: e.acepta_practicas || "",
      tipo_practicas: e.tipo_practicas || "",
      contacto_nombre: e.contacto || "",
      contacto_email: e.email || "",
      contacto_telefono: e.telefono || "",
      estado_crm: e.estado || "",
      prioridad: e.prioridad || "",
      notas: e.notas || ""
    }));
  }

  return (state.alumnos || []).map(a => ({
    nombre_alumno: a.nombre || "",
    dni: a.dni || "",
    telefono: a.telefono || "",
    email: a.email || "",
    direccion: a.direccion || "",
    nss: a.nss || "",
    curso: a.curso || "",
    estado: a.estado || "",
    empresa: a.empresa || "",
    inicio: a.inicio || "",
    fin: a.fin || "",
    tutor: a.tutor || "",
    tutor_empresa: a.tutor_empresa || "",
    horas: a.horas || "",
    evaluacion: a.evaluacion || "",
    notas: a.notas || ""
  }));
}

function exportExcel(type){
  if(!window.XLSX){
    alert("No se pudo cargar la librería Excel. Revisa la conexión.");
    return;
  }

  const rows = bloomExcelExportRows(type);
  const wb = XLSX.utils.book_new();
  const sheetName = type === "empresas" ? "Empresas" : "Alumnos";
  const ws = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, type === "empresas" ? "bloom_empresas.xlsx" : "bloom_alumnos.xlsx");
  toast(`${sheetName} exportados a Excel 🌸`);
}

/* Compatibilidad con funciones antiguas */
exportExcel41 = exportExcel;

function downloadTemplateExcel(type){
  const file = type === "empresas"
    ? "templates/plantilla_empresas_bloom.xlsx"
    : "templates/plantilla_alumnos_bloom.xlsx";
  const name = type === "empresas"
    ? "plantilla_empresas_bloom.xlsx"
    : "plantilla_alumnos_bloom.xlsx";

  const a = document.createElement("a");
  a.href = file;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  toast("Plantilla Excel descargada 🌸");
}

downloadTemplateExcel41 = downloadTemplateExcel;

function bloomExcelUpsert(type, rows, updateExisting){
  const collection = type === "empresas" ? state.empresas : state.alumnos;
  let created = 0, updated = 0, skipped = 0;

  rows.forEach(row => {
    if(!row.nombre){
      skipped++;
      return;
    }

    let idx = collection.findIndex(x => String(x.id) === String(row.id));

    if(idx < 0 && type === "empresas"){
      idx = collection.findIndex(x => String(x.nombre || "").toLowerCase() === String(row.nombre || "").toLowerCase());
    }

    if(idx < 0 && type === "alumnos"){
      idx = collection.findIndex(x =>
        (row.dni && String(x.dni || "").toLowerCase() === String(row.dni).toLowerCase()) ||
        (row.email && String(x.email || "").toLowerCase() === String(row.email).toLowerCase()) ||
        String(x.nombre || "").toLowerCase() === String(row.nombre || "").toLowerCase()
      );
    }

    if(idx >= 0){
      if(updateExisting){
        collection[idx] = Object.assign({}, collection[idx], row, {
          id: collection[idx].id,
          data: Object.assign({}, collection[idx].data || {}, row)
        });
        updated++;
      }else{
        skipped++;
      }
    }else{
      collection.unshift(row);
      created++;
    }
  });

  return { created, updated, skipped };
}

function openImportExcel(type){
  if(!window.XLSX){
    alert("No se pudo cargar la librería Excel. Revisa la conexión.");
    return;
  }

  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".xlsx,.xls,.csv";
  input.onchange = async () => {
    const file = input.files?.[0];
    if(!file) return;

    try{
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type:"array", cellDates:true });
      const firstSheet = wb.SheetNames[0];
      const ws = wb.Sheets[firstSheet];
      const rawRows = XLSX.utils.sheet_to_json(ws, { defval:"", raw:false });

      const rows = rawRows
        .map(row => type === "empresas" ? bloomExcelEmpresaFromRow(row) : bloomExcelAlumnoFromRow(row))
        .filter(row => row.nombre);

      if(!rows.length){
        alert("No se encontraron registros válidos. Revisa que la plantilla tenga la columna de nombre.");
        return;
      }

      const preview = rows.slice(0, 10).map(row => `
        <article class="item">
          <div>
            <b>${esc(row.nombre)}</b>
            <p>${type === "empresas"
              ? esc([row.sector, row.contacto, row.email].filter(Boolean).join(" · "))
              : esc([row.dni, row.empresa, row.email].filter(Boolean).join(" · "))}</p>
          </div>
        </article>
      `).join("");

      modal(`Importar Excel — ${type === "empresas" ? "Empresas" : "Alumnos"}`, `
        <section>
          <p>Archivo: <b>${esc(file.name)}</b></p>
          <p>Se han detectado <b>${rows.length}</b> registros válidos.</p>
          <div class="excel-preview-list">${preview}</div>
          ${rows.length > 10 ? `<p class="hint-click">Vista previa de 10 registros.</p>` : ""}
          <label class="excel-check">
            <input id="excelUpdateExisting" type="checkbox" checked>
            Actualizar registros existentes si coinciden por ID, nombre, email o DNI.
          </label>
        </section>
      `, () => {
        const updateExisting = $("#excelUpdateExisting")?.checked !== false;
        const result = bloomExcelUpsert(type, rows, updateExisting);
        log(`${type === "empresas" ? "Empresas" : "Alumnos"} importados desde Excel: ${result.created} nuevos, ${result.updated} actualizados`);
        save();
        closeModal();
        render();
        toast(`Excel importado: ${result.created} nuevos · ${result.updated} actualizados 🌸`);
      });

    }catch(error){
      alert("No se pudo importar el Excel:\n\n" + error.message);
    }
  };

  input.click();
}

/* Añadir botones siempre a las vistas aunque el render base cambie */
const bloomExcelRenderEmpresasBase = renderEmpresas;
renderEmpresas = function(){
  bloomExcelRenderEmpresasBase();
  const toolbar = $("#empresas .toolbar");
  if(toolbar && !toolbar.querySelector("[data-excel-action='empresas-import']")){
    toolbar.insertAdjacentHTML("beforeend", `
      <button class="soft-btn" data-excel-action="empresas-import" onclick="openImportExcel('empresas')">Importar Excel</button>
      <button class="soft-btn" data-excel-action="empresas-export" onclick="exportExcel('empresas')">Exportar Excel</button>
      <button class="soft-btn" data-excel-action="empresas-template" onclick="downloadTemplateExcel('empresas')">Plantilla Excel</button>
    `);
  }
};

const bloomExcelRenderAlumnosBase = renderAlumnos;
renderAlumnos = function(){
  bloomExcelRenderAlumnosBase();
  const toolbar = $("#alumnos .toolbar");
  if(toolbar && !toolbar.querySelector("[data-excel-action='alumnos-import']")){
    toolbar.insertAdjacentHTML("beforeend", `
      <button class="soft-btn" data-excel-action="alumnos-import" onclick="openImportExcel('alumnos')">Importar Excel</button>
      <button class="soft-btn" data-excel-action="alumnos-export" onclick="exportExcel('alumnos')">Exportar Excel</button>
      <button class="soft-btn" data-excel-action="alumnos-template" onclick="downloadTemplateExcel('alumnos')">Plantilla Excel</button>
    `);
  }
};



/* =========================================================
   Bloom CRM 3.0 — FIX FINAL miniatura foto alumno
   Objetivo:
   - Sustituir la inicial del cuadrado por la foto real.
   - Funciona con foto.data, foto.url, foto_url, foto_path y foto.path.
   - Si la foto está en Supabase Storage privado, crea Signed URL.
   - Previsualización instantánea al elegir foto en el formulario.
========================================================= */

const BLOOM_STUDENT_PHOTO_CACHE = new Map();

function bloomPhotoIsEmpty(value){
  return value === null ||
    value === undefined ||
    String(value).trim() === "" ||
    String(value).toLowerCase() === "null" ||
    String(value).toLowerCase() === "undefined";
}

function bloomPhotoInitials(name){
  const parts = String(name || "A").trim().split(/\s+/).filter(Boolean);
  if(!parts.length) return "A";
  return parts.slice(0, 2).map(x => x[0]).join("").toUpperCase();
}

function bloomPhotoDirectSrc(alumno){
  if(!alumno) return "";
  if(alumno.foto?.data) return alumno.foto.data;
  if(alumno.foto?.url) return alumno.foto.url;
  if(alumno.foto?.signedUrl) return alumno.foto.signedUrl;
  if(alumno.foto_signed_url) return alumno.foto_signed_url;
  if(alumno.foto_url) return alumno.foto_url;
  if(alumno.fotoUrl) return alumno.fotoUrl;
  if(typeof alumno.foto === "string" && !bloomPhotoIsEmpty(alumno.foto)) return alumno.foto;
  return "";
}

function bloomPhotoStoragePath(alumno){
  if(!alumno) return "";
  return alumno.foto_path ||
    alumno.fotoPath ||
    alumno.foto?.path ||
    alumno.foto?.storage_path ||
    alumno.foto?.storagePath ||
    "";
}

function bloomPhotoAvatarHTML(alumno, size="sm"){
  const src = bloomPhotoDirectSrc(alumno);
  const path = bloomPhotoStoragePath(alumno);
  const id = alumno?.id || "";
  const initials = bloomPhotoInitials(alumno?.nombre);

  return `
    <div class="student-avatar bloom-photo-avatar ${size}" data-photo-student-id="${esc(id)}" data-photo-path="${esc(path)}">
      ${src
        ? `<img src="${esc(src)}" alt="Foto de ${esc(alumno?.nombre || "alumno")}" loading="lazy">`
        : `<span>${esc(initials)}</span>`}
    </div>
  `;
}

async function bloomPhotoCreateSignedUrl(path){
  if(!path) return "";
  const cached = BLOOM_STUDENT_PHOTO_CACHE.get(path);
  if(cached && cached.exp > Date.now() + 30000) return cached.url;

  try{
    if(typeof bloom3SignedUrl === "function"){
      const url = await bloom3SignedUrl(path);
      BLOOM_STUDENT_PHOTO_CACHE.set(path, { url, exp: Date.now() + 280000 });
      return url;
    }

    if(typeof bloom3Client !== "undefined" && bloom3Client){
      const bucket = typeof BLOOM3_BUCKET !== "undefined" ? BLOOM3_BUCKET : "bloom-crm-documents";
      const { data, error } = await bloom3Client.storage.from(bucket).createSignedUrl(path, 300);
      if(error) throw error;
      BLOOM_STUDENT_PHOTO_CACHE.set(path, { url: data.signedUrl, exp: Date.now() + 280000 });
      return data.signedUrl;
    }

    if(typeof supabase !== "undefined" && supabase?.storage){
      const bucket = typeof BLOOM3_BUCKET !== "undefined" ? BLOOM3_BUCKET : "bloom-crm-documents";
      const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, 300);
      if(error) throw error;
      BLOOM_STUDENT_PHOTO_CACHE.set(path, { url: data.signedUrl, exp: Date.now() + 280000 });
      return data.signedUrl;
    }
  }catch(error){
    console.warn("Bloom CRM: no se pudo obtener Signed URL para foto", error);
  }

  return "";
}

async function bloomPhotoResolve(alumno){
  const direct = bloomPhotoDirectSrc(alumno);
  if(direct) return direct;

  const path = bloomPhotoStoragePath(alumno);
  if(!path) return "";

  const signedUrl = await bloomPhotoCreateSignedUrl(path);
  if(signedUrl){
    alumno.foto = Object.assign({}, alumno.foto || {}, {
      path,
      signedUrl,
      storage: true,
      type: "image/*",
      name: alumno.foto?.name || "Foto alumno"
    });
    alumno.foto_signed_url = signedUrl;
  }
  return signedUrl;
}

async function bloomPhotoHydrateVisibleAvatars(){
  const avatars = [...document.querySelectorAll("[data-photo-student-id]")];

  for(const avatar of avatars){
    if(avatar.querySelector("img")) continue;

    const id = avatar.dataset.photoStudentId;
    const alumno = (state.alumnos || []).find(a => String(a.id) === String(id));
    if(!alumno) continue;

    const url = await bloomPhotoResolve(alumno);
    if(url){
      avatar.innerHTML = `<img src="${esc(url)}" alt="Foto de ${esc(alumno.nombre || "alumno")}" loading="lazy">`;
      avatar.classList.add("has-photo");
    }
  }
}

function bloomPhotoPatchRenderCycle(){
  setTimeout(bloomPhotoHydrateVisibleAvatars, 40);
  setTimeout(bloomPhotoHydrateVisibleAvatars, 250);
}

/* Render alumnos completo con foto en el primer cuadrado */
renderAlumnos = function(){
  const q = $("#studentSearch")?.value?.toLowerCase() || "";
  const alumnos = (state.alumnos || []).filter(a => !q || JSON.stringify(a).toLowerCase().includes(q));

  $("#alumnos").innerHTML = pageHead("Alumnos", "Alumnos", "Ficha completa del alumnado") + `
    <section class="card table-card">
      <div class="toolbar">
        <input id="studentSearch" placeholder="Buscar alumno..." oninput="renderAlumnos()" value="${esc(q)}">
        <button class="primary" onclick="openAlumno()">Añadir alumno</button>
        ${typeof openImportExcel === "function" ? `<button class="soft-btn" onclick="openImportExcel('alumnos')">Importar Excel</button>` : ""}
        ${typeof exportExcel === "function" ? `<button class="soft-btn" onclick="exportExcel('alumnos')">Exportar Excel</button>` : ""}
        ${typeof downloadTemplateExcel === "function" ? `<button class="soft-btn" onclick="downloadTemplateExcel('alumnos')">Plantilla Excel</button>` : ""}
      </div>
      <table>
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Contacto</th>
            <th>Empresa</th>
            <th>Estado</th>
            <th>Archivos</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${alumnos.map(a => `
            <tr class="student-row" data-photo-student-row="${esc(a.id)}" onclick="openStudentProfile(${JSON.stringify(String(a.id))})">
              <td>
                <div class="student-cell">
                  ${bloomPhotoAvatarHTML(a, "sm")}
                  <div>
                    <b>${esc(a.nombre || "Sin nombre")}</b><br>
                    <small>NSS: ${esc(a.nss || "")}</small>
                  </div>
                </div>
              </td>
              <td>${esc(a.telefono || "")}<br><small>${esc(a.email || "")}</small></td>
              <td>${esc(a.empresa || "Sin empresa")}</td>
              <td><span class="badge">${esc(a.estado || "sin asignar")}</span></td>
              <td onclick="event.stopPropagation()">
                <div class="student-files">
                  ${(bloomPhotoDirectSrc(a) || bloomPhotoStoragePath(a)) ? `<button onclick="previewAnyFile(state.alumnos.find(x=>String(x.id)===String('${a.id}')).foto,'Foto')">Foto</button>` : `<span>Sin foto</span>`}
                  ${a.curriculum?.data || a.curriculum?.url || a.curriculum?.path ? `<button onclick="previewAnyFile(state.alumnos.find(x=>String(x.id)===String('${a.id}')).curriculum,'CV')">CV</button>` : `<span>Sin CV</span>`}
                </div>
              </td>
              <td class="row-actions" onclick="event.stopPropagation()">
                <button onclick="openAlumno(${JSON.stringify(String(a.id))})">Editar</button>
                <button onclick="delAlumno(${JSON.stringify(String(a.id))})">Eliminar</button>
              </td>
            </tr>
          `).join("") || `<tr><td colspan="6">No hay alumnos.</td></tr>`}
        </tbody>
      </table>
    </section>
  `;

  bloomPhotoPatchRenderCycle();
};

/* Ficha alumno: también resuelve foto Storage privado */
const bloomPhotoOriginalOpenStudentProfile = openStudentProfile;
openStudentProfile = function(aid){
  const alumno = (state.alumnos || []).find(a => String(a.id) === String(aid));
  if(!alumno) return bloomPhotoOriginalOpenStudentProfile(aid);

  bloomPhotoResolve(alumno).then(() => {
    const original = alumno.foto;
    if(alumno.foto_signed_url && !alumno.foto?.data){
      alumno.foto = Object.assign({}, alumno.foto || {}, {
        data: alumno.foto_signed_url,
        signedUrl: alumno.foto_signed_url,
        type: "image/*"
      });
    }
    bloomPhotoOriginalOpenStudentProfile(aid);
    alumno.foto = original || alumno.foto;
  });
};

/* Editar alumno: previsualización instantánea en el mismo cuadrado */
const bloomPhotoOriginalOpenAlumno = openAlumno;
openAlumno = function(aid=null){
  bloomPhotoOriginalOpenAlumno(aid);

  setTimeout(async () => {
    const form = $("#alumnoForm");
    const input = $("#alumnoFoto");
    if(!form || !input) return;

    let preview = form.querySelector(".student-photo-preview");
    if(!preview) return;

    const alumno = (state.alumnos || []).find(a => String(a.id) === String(aid));
    if(alumno){
      const url = await bloomPhotoResolve(alumno);
      if(url && !preview.querySelector("img")){
        preview.innerHTML = `<img src="${esc(url)}" alt="Foto alumno">`;
      }
    }

    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        preview.innerHTML = `<img src="${reader.result}" alt="Foto alumno">`;
      };
      reader.readAsDataURL(file);
    });
  }, 60);
};

/* Guardar foto: si es imagen, asegurar foto_url para miniatura inmediata */
const bloomPhotoOriginalFileToData = fileToData;
fileToData = async function(file){
  const result = await bloomPhotoOriginalFileToData(file);
  if(result && file?.type?.startsWith("image/")){
    result.kind = "student-photo";
  }
  return result;
};

/* Tras cualquier render, intentar sustituir iniciales */
const bloomPhotoOriginalRender = render;
render = function(){
  bloomPhotoOriginalRender();
  bloomPhotoPatchRenderCycle();
};

/* Tras cargar nube, intentar sustituir iniciales */
if(typeof loadCloud === "function"){
  const bloomPhotoOriginalLoadCloud = loadCloud;
  loadCloud = async function(){
    await bloomPhotoOriginalLoadCloud();
    bloomPhotoPatchRenderCycle();
  };
}

document.addEventListener("DOMContentLoaded", bloomPhotoPatchRenderCycle);



/* =========================================================
   Bloom CRM 3.0 — FIX alumno click + editar + miniatura
   Corrige:
   - Clic en fila de alumno abre ficha aunque el ID sea texto o número.
   - Botón Editar vuelve a abrir formulario y permite modificar.
   - Botón Eliminar funciona con ID texto/número.
   - La miniatura sigue mostrando foto real si existe.
========================================================= */

function bloomAlunoIdEq(a, b){
  return String(a) === String(b);
}

function bloomAlumnoGet(id){
  return (state.alumnos || []).find(a => bloomAlunoIdEq(a.id, id));
}

function bloomAlumnoInitials(name){
  const parts = String(name || "A").trim().split(/\s+/).filter(Boolean);
  return (parts.length ? parts.slice(0,2).map(p => p[0]).join("") : "A").toUpperCase();
}

function bloomAlumnoPhotoDirect(a){
  if(!a) return "";
  if(a.foto?.data) return a.foto.data;
  if(a.foto?.url) return a.foto.url;
  if(a.foto?.signedUrl) return a.foto.signedUrl;
  if(a.foto_signed_url) return a.foto_signed_url;
  if(a.foto_url) return a.foto_url;
  if(a.fotoUrl) return a.fotoUrl;
  if(typeof a.foto === "string" && a.foto.trim()) return a.foto;
  return "";
}

function bloomAlumnoPhotoPath(a){
  if(!a) return "";
  return a.foto_path || a.fotoPath || a.foto?.path || a.foto?.storage_path || a.foto?.storagePath || "";
}

async function bloomAlumnoSignedPhoto(a){
  const direct = bloomAlumnoPhotoDirect(a);
  if(direct) return direct;

  const path = bloomAlumnoPhotoPath(a);
  if(!path) return "";

  try{
    let url = "";
    if(typeof bloom3SignedUrl === "function"){
      url = await bloom3SignedUrl(path);
    }else if(typeof bloom3Client !== "undefined" && bloom3Client){
      const bucket = typeof BLOOM3_BUCKET !== "undefined" ? BLOOM3_BUCKET : "bloom-crm-documents";
      const { data, error } = await bloom3Client.storage.from(bucket).createSignedUrl(path, 300);
      if(error) throw error;
      url = data.signedUrl;
    }
    if(url){
      a.foto = Object.assign({}, a.foto || {}, { path, signedUrl:url, storage:true, type:"image/*", name:"Foto alumno" });
      a.foto_signed_url = url;
      return url;
    }
  }catch(error){
    console.warn("No se pudo cargar miniatura/foto del alumno", error);
  }
  return "";
}

function bloomAlumnoAvatar(a, cls=""){
  const src = bloomAlumnoPhotoDirect(a);
  return `
    <div class="student-avatar bloom-alumno-avatar ${cls}" data-alumno-avatar-id="${esc(a?.id || "")}">
      ${src ? `<img src="${esc(src)}" alt="Foto de ${esc(a?.nombre || "alumno")}" loading="lazy">` : `<span>${esc(bloomAlumnoInitials(a?.nombre))}</span>`}
    </div>
  `;
}

async function bloomHydrateAlumnoAvatars(){
  const avatars = [...document.querySelectorAll("[data-alumno-avatar-id]")];
  for(const avatar of avatars){
    if(avatar.querySelector("img")) continue;
    const alumno = bloomAlumnoGet(avatar.dataset.alumnoAvatarId);
    if(!alumno) continue;
    const url = await bloomAlumnoSignedPhoto(alumno);
    if(url){
      avatar.innerHTML = `<img src="${esc(url)}" alt="Foto de ${esc(alumno.nombre || "alumno")}" loading="lazy">`;
      avatar.classList.add("has-photo");
    }
  }
}

function bloomAlumnoField(label, value){
  const v = value === undefined || value === null || String(value).trim() === "" ? "Sin dato" : String(value);
  return `<article><b>${esc(label)}</b><span>${esc(v)}</span></article>`;
}

/* Ficha completa robusta */
function openStudentProfile(aid){
  const a = bloomAlumnoGet(aid);
  if(!a) {
    alert("No se encontró el alumno seleccionado.");
    return;
  }

  bloomAlumnoSignedPhoto(a).then(() => {
    const empresa = (state.empresas || []).find(e => e.nombre === a.empresa);
    const conv = (state.convenios || []).find(c => c.empresa === a.empresa || c.alumno === a.nombre);
    const docs = (state.documentos || []).filter(d => d.alumno === a.nombre || d.empresa === a.empresa);
    const follows = (state.seguimientos || []).filter(s => s.empresa === a.empresa || s.alumno === a.nombre);

    const fotoUrl = bloomAlumnoPhotoDirect(a);

    modal("Ficha del alumno", `
      <section class="student-profile">
        <aside class="student-profile-side">
          <div class="student-profile-photo">
            ${fotoUrl ? `<img src="${esc(fotoUrl)}" alt="Foto de ${esc(a.nombre || "alumno")}">` : `<span>${esc(bloomAlumnoInitials(a.nombre))}</span>`}
          </div>
          <h2>${esc(a.nombre || "Alumno")}</h2>
          <p>${esc(a.estado || "sin asignar")}</p>
          ${a.dni ? `<p><b>DNI/NIE:</b> ${esc(a.dni)}</p>` : ""}
          <button class="primary" onclick="openAlumno('${esc(a.id)}')">Editar ficha</button>
        </aside>

        <main class="student-profile-main">
          <section class="student-profile-grid">
            ${[
              ["DNI / NIE", a.dni],
              ["Teléfono", a.telefono],
              ["Correo", a.email],
              ["Dirección", a.direccion],
              ["NSS", a.nss],
              ["Curso", a.curso],
              ["Empresa", a.empresa || "Sin empresa"],
              ["Tutor centro", a.tutor],
              ["Tutor empresa", a.tutor_empresa],
              ["Inicio", a.inicio || conv?.inicio],
              ["Fin", a.fin || conv?.fin],
              ["Horas", a.horas],
              ["Evaluación", a.evaluacion],
            ].map(([b,v]) => bloomAlumnoField(b,v)).join("")}
          </section>

          <section class="student-profile-section">
            <div class="section-head"><div><p>Currículum</p><h3>Vista previa</h3></div></div>
            ${filePreviewHTML(a.curriculum, a.id)}
          </section>

          <section class="student-profile-section">
            <div class="section-head"><div><p>Documentos</p><h3>Relacionados</h3></div></div>
            <div class="list">
              ${docs.map(d => `
                <article class="item">
                  <div><b>${esc(d.nombre)}</b><p>${esc(d.tipo || "")} · ${esc(d.estado || "")}</p></div>
                  <button onclick="previewAnyFile(state.documentos.find(x=>String(x.id)===String('${d.id}')).file,'${esc(d.nombre)}')">Ver</button>
                </article>
              `).join("") || "<p>No hay documentos asociados.</p>"}
            </div>
          </section>

          <section class="student-profile-section">
            <div class="section-head"><div><p>Seguimiento</p><h3>Actividad</h3></div></div>
            <div class="list">
              ${follows.map(s => `
                <article class="item">
                  <div><b>${esc(s.tipo || "Seguimiento")} · ${esc(s.empresa || "")}</b><p>${esc(s.fecha || "")} · ${esc(s.resultado || "")}</p></div>
                </article>
              `).join("") || "<p>Sin seguimientos asociados.</p>"}
            </div>
          </section>

          <section class="student-profile-section">
            <div class="section-head"><div><p>Observaciones</p><h3>Notas</h3></div></div>
            <p>${esc(a.notas || "Sin observaciones.")}</p>
          </section>
        </main>
      </section>
    `, () => closeModal());
  });
}

/* Formulario editar/crear robusto */
function openAlumno(aid=null){
  const isEdit = aid !== null && aid !== undefined && aid !== "";
  const existing = isEdit ? bloomAlumnoGet(aid) : null;
  const a = existing || {
    nombre:"", dni:"", telefono:"", email:"", direccion:"", nss:"", curso:"",
    estado:"sin asignar", empresa:"", inicio:"", fin:"", tutor:"", tutor_empresa:"",
    horas:"", evaluacion:"", notas:"", foto:null, curriculum:null
  };

  bloomAlumnoSignedPhoto(a).then(() => {
    const photo = bloomAlumnoPhotoDirect(a);

    modal(isEdit ? "Editar alumno" : "Alumno", `
      <form id="alumnoForm" class="form-grid">
        <div class="student-photo-preview" id="studentPhotoEditPreview">
          ${photo ? `<img src="${esc(photo)}" alt="Foto alumno">` : "Foto"}
        </div>

        <input name="nombre" value="${esc(a.nombre || "")}" placeholder="Nombre" required>
        <input name="dni" value="${esc(a.dni || "")}" placeholder="DNI / NIE">
        <input name="telefono" value="${esc(a.telefono || "")}" placeholder="Teléfono">
        <input name="email" value="${esc(a.email || "")}" placeholder="Correo">
        <input name="direccion" value="${esc(a.direccion || "")}" placeholder="Dirección">
        <input name="nss" value="${esc(a.nss || "")}" placeholder="Nº Seguridad Social">
        <input name="curso" value="${esc(a.curso || "")}" placeholder="Curso">

        <label class="student-files">Foto
          <input id="alumnoFoto" type="file" accept="image/*">
        </label>

        <label class="student-files">Currículum
          <input id="alumnoCV" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp">
        </label>

        <select name="empresa">
          <option value="">Sin empresa</option>
          ${(state.empresas || []).map(e => `<option ${a.empresa === e.nombre ? "selected" : ""}>${esc(e.nombre)}</option>`).join("")}
        </select>

        <select name="estado">
          ${["sin asignar","propuesta","entrevista","prácticas","finalizado","archivado"].map(x => `<option ${a.estado === x ? "selected" : ""}>${x}</option>`).join("")}
        </select>

        <input name="inicio" type="date" value="${esc(a.inicio || "")}">
        <input name="fin" type="date" value="${esc(a.fin || "")}">
        <input name="tutor" value="${esc(a.tutor || "")}" placeholder="Tutor centro">
        <input name="tutor_empresa" value="${esc(a.tutor_empresa || "")}" placeholder="Tutor empresa">
        <input name="horas" value="${esc(a.horas || "")}" placeholder="Horas">
        <input name="evaluacion" value="${esc(a.evaluacion || "")}" placeholder="Evaluación">
        <textarea name="notas" placeholder="Notas">${esc(a.notas || "")}</textarea>
      </form>
    `, async () => {
      const formData = Object.fromEntries(new FormData($("#alumnoForm")).entries());
      formData.dni = String(formData.dni || "").trim().toUpperCase();

      let target = existing;
      if(!target){
        target = { id: uid(), foto:null, curriculum:null };
        state.alumnos.unshift(target);
      }

      Object.assign(target, formData, {
        data: Object.assign({}, target.data || {}, formData)
      });

      const foto = $("#alumnoFoto")?.files?.[0];
      const cv = $("#alumnoCV")?.files?.[0];

      if(foto){
        target.foto = await fileToData(foto);
        if(target.foto?.data) target.foto_url = target.foto.data;
      }

      if(cv){
        target.curriculum = await fileToData(cv);
      }

      log(`Alumno guardado: ${target.nombre}`);
      save();
      closeModal();
      render();
      toast(isEdit ? "Alumno modificado 🌸" : "Alumno creado 🌸");
    });

    setTimeout(() => {
      const input = $("#alumnoFoto");
      const preview = $("#studentPhotoEditPreview");
      if(input && preview){
        input.addEventListener("change", () => {
          const file = input.files?.[0];
          if(!file) return;
          const reader = new FileReader();
          reader.onload = () => preview.innerHTML = `<img src="${reader.result}" alt="Foto alumno">`;
          reader.readAsDataURL(file);
        });
      }
    }, 40);
  });
}

function delAlumno(id){
  if(confirm("¿Eliminar alumno?")){
    state.alumnos = (state.alumnos || []).filter(a => !bloomAlunoIdEq(a.id, id));
    save();
    render();
  }
}

/* Tabla alumnos con eventos seguros, sin romper botones internos */
function renderAlumnos(){
  const q = $("#studentSearch")?.value?.toLowerCase() || "";
  const alumnos = (state.alumnos || []).filter(a => !q || JSON.stringify(a).toLowerCase().includes(q));

  $("#alumnos").innerHTML = pageHead("Alumnos", "Alumnos", "Ficha completa del alumnado") + `
    <section class="card table-card">
      <div class="toolbar">
        <input id="studentSearch" placeholder="Buscar alumno..." oninput="renderAlumnos()" value="${esc(q)}">
        <button class="primary" onclick="openAlumno()">Añadir alumno</button>
        ${typeof openImportExcel === "function" ? `<button class="soft-btn" onclick="openImportExcel('alumnos')">Importar Excel</button>` : ""}
        ${typeof exportExcel === "function" ? `<button class="soft-btn" onclick="exportExcel('alumnos')">Exportar Excel</button>` : ""}
        ${typeof downloadTemplateExcel === "function" ? `<button class="soft-btn" onclick="downloadTemplateExcel('alumnos')">Plantilla Excel</button>` : ""}
      </div>

      <table>
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Contacto</th>
            <th>Empresa</th>
            <th>Estado</th>
            <th>Archivos</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${alumnos.map(a => `
            <tr class="student-row clickable-row" data-alumno-row-id="${esc(a.id)}">
              <td>
                <div class="student-cell">
                  ${bloomAlumnoAvatar(a)}
                  <div>
                    <b>${esc(a.nombre || "Sin nombre")}</b><br>
                    <small>NSS: ${esc(a.nss || "")}</small>
                  </div>
                </div>
              </td>
              <td>${esc(a.telefono || "")}<br><small>${esc(a.email || "")}</small></td>
              <td>${esc(a.empresa || "Sin empresa")}</td>
              <td><span class="badge">${esc(a.estado || "sin asignar")}</span></td>
              <td>
                <div class="student-files">
                  ${(bloomAlumnoPhotoDirect(a) || bloomAlumnoPhotoPath(a)) ? `<button data-action="foto" data-alumno-id="${esc(a.id)}">Foto</button>` : `<span>Sin foto</span>`}
                  ${a.curriculum?.data || a.curriculum?.url || a.curriculum?.path ? `<button data-action="cv" data-alumno-id="${esc(a.id)}">CV</button>` : `<span>Sin CV</span>`}
                </div>
              </td>
              <td class="row-actions">
                <button data-action="edit" data-alumno-id="${esc(a.id)}">Editar</button>
                <button data-action="delete" data-alumno-id="${esc(a.id)}">Eliminar</button>
              </td>
            </tr>
          `).join("") || `<tr><td colspan="6">No hay alumnos.</td></tr>`}
        </tbody>
      </table>
    </section>
  `;

  bloomHydrateAlumnoAvatars();
}

/* Delegación de clicks: repara pinchar ficha y botones */
document.addEventListener("click", function(event){
  const actionBtn = event.target.closest("#alumnos [data-action]");
  if(actionBtn){
    event.preventDefault();
    event.stopPropagation();

    const id = actionBtn.dataset.alumnoId;
    const alumno = bloomAlumnoGet(id);
    const action = actionBtn.dataset.action;

    if(action === "edit") return openAlumno(id);
    if(action === "delete") return delAlumno(id);
    if(action === "foto" && alumno) return previewAnyFile(alumno.foto, "Foto");
    if(action === "cv" && alumno) return previewAnyFile(alumno.curriculum, "CV");
    return;
  }

  const row = event.target.closest("#alumnos tr[data-alumno-row-id]");
  if(row && !event.target.closest("button, a, input, select, textarea, label")){
    event.preventDefault();
    event.stopPropagation();
    openStudentProfile(row.dataset.alumnoRowId);
  }
}, true);

/* Si otras partes llaman con número o string, funcionan */
window.openStudentProfile = openStudentProfile;
window.openAlumno = openAlumno;
window.delAlumno = delAlumno;
window.renderAlumnos = renderAlumnos;



/* =========================================================
   Bloom CRM 3.0 — FIX sincronización real + borrado definitivo
   Corrige:
   - Empresas que vuelven a aparecer tras eliminarlas.
   - Duplicados por sincronización entre ordenador de casa/trabajo.
   - Carga nube sustituyendo estado local, no mezclando.
   - Botones para recargar nube y limpiar caché local.
========================================================= */

const BLOOM_SYNC_KINDS = ["empresas","alumnos","convenios","carpetas","documentos","seguimientos","emails"];

function bloomSyncText(value){
  return String(value || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function bloomSyncKey(kind, item){
  if(!item) return "";
  if(kind === "empresas"){
    return bloomSyncText(item.nombre || item.data?.nombre || item.data?.nombre_empresa);
  }
  if(kind === "alumnos"){
    return bloomSyncText(item.dni || item.email || item.nombre || item.data?.dni || item.data?.email || item.data?.nombre);
  }
  return String(item.id || "");
}

function bloomSyncDedupe(kind, list){
  const seen = new Map();
  const duplicates = [];

  (list || []).forEach(item => {
    const key = bloomSyncKey(kind, item) || String(item.id || "");
    if(!key){
      duplicates.push(item);
      return;
    }

    if(!seen.has(key)){
      seen.set(key, item);
    }else{
      duplicates.push(item);
    }
  });

  return {
    clean: [...seen.values()],
    duplicates
  };
}

async function bloomSyncDeleteRemote(kind, ids){
  if(!ids?.length || !bloom3Client || !bloom3Session?.user) return;

  const table = bloom3Tables?.[kind];
  if(!table) return;

  for(const id of ids){
    const { error } = await bloom3Client.from(table).delete().eq("id", String(id));
    if(error) console.warn(`No se pudo eliminar duplicado remoto ${kind}/${id}`, error);
  }
}

async function bloomSyncCleanDuplicates(){
  if(!bloom3Ready || !bloom3Client || !bloom3Session?.user) return;

  let removed = 0;

  for(const kind of ["empresas","alumnos"]){
    const result = bloomSyncDedupe(kind, state[kind] || []);
    state[kind] = result.clean;

    const duplicateIds = result.duplicates
      .map(x => x?.id)
      .filter(id => id !== undefined && id !== null && id !== "");

    if(duplicateIds.length){
      removed += duplicateIds.length;
      await bloomSyncDeleteRemote(kind, duplicateIds);
    }
  }

  if(removed){
    localStorage.setItem(KEY, JSON.stringify(state));
    setSync(`Duplicados limpiados: ${removed}`, "ok");
    toast(`Duplicados eliminados: ${removed} 🌸`);
  }
}

/* Carga estricta desde Supabase: sustituye el estado local */
const bloomSyncOriginalLoadAll = bloom3LoadAll;
bloom3LoadAll = async function(){
  await bloomSyncOriginalLoadAll();

  for(const kind of ["empresas","alumnos"]){
    const result = bloomSyncDedupe(kind, state[kind] || []);
    state[kind] = result.clean;

    const duplicateIds = result.duplicates
      .map(x => x?.id)
      .filter(Boolean);

    if(duplicateIds.length){
      await bloomSyncDeleteRemote(kind, duplicateIds);
    }
  }

  localStorage.setItem(KEY, JSON.stringify(state));
  setSync("Nube cargada", "ok");
};

/* Guardado: deduplica antes de subir */
const bloomSyncOriginalSaveAll = bloom3SaveAll;
bloom3SaveAll = async function(silent=false){
  for(const kind of ["empresas","alumnos"]){
    const result = bloomSyncDedupe(kind, state[kind] || []);
    state[kind] = result.clean;
  }

  localStorage.setItem(KEY, JSON.stringify(state));
  await bloomSyncOriginalSaveAll(silent);
};

/* LocalStorage solo caché. No debe restaurar datos antiguos si ya hay sesión. */
function bloomSyncCacheWrite(){
  try{
    localStorage.setItem(KEY, JSON.stringify(state));
  }catch(error){
    console.warn("No se pudo escribir caché local", error);
  }
}

async function forceCloudReload(){
  if(!bloom3Session?.user){
    alert("Inicia sesión para recargar desde la nube.");
    return;
  }

  if(!confirm("Esto sustituirá la copia local por la versión actual de Supabase. ¿Continuar?")) return;

  try{
    setSync("Recargando nube...", "saving");
    await bloom3LoadAll();
    render();
    toast("Datos recargados desde Supabase 🌸");
  }catch(error){
    setSync("Error nube", "error");
    alert("No se pudo recargar desde Supabase:\n\n" + error.message);
  }
}

function clearLocalCacheAndReload(){
  if(!confirm("Esto limpiará la caché local de este navegador y recargará la nube. ¿Continuar?")) return;
  localStorage.removeItem(KEY);
  forceCloudReload();
}

/* Borrado definitivo remoto */
async function bloomDeleteRemoteItem(kind, id){
  if(!bloom3Ready || !bloom3Client || !bloom3Session?.user){
    return false;
  }

  const table = bloom3Tables?.[kind];
  if(!table) return false;

  const { error } = await bloom3Client
    .from(table)
    .delete()
    .eq("id", String(id));

  if(error) throw error;
  return true;
}

/* Empresas: eliminar de Supabase, no solo local */
delEmpresa = async function(id){
  const empresa = (state.empresas || []).find(e => String(e.id) === String(id));
  const nombre = empresa?.nombre || "esta empresa";

  if(!confirm(`¿Eliminar definitivamente ${nombre}?`)) return;

  try{
    setSync("Eliminando empresa...", "saving");

    await bloomDeleteRemoteItem("empresas", id);

    state.empresas = (state.empresas || []).filter(e => String(e.id) !== String(id));
    bloomSyncCacheWrite();

    setSync("Empresa eliminada", "ok");
    toast("Empresa eliminada definitivamente 🌸");

    await bloom3LoadAll();
    render();
  }catch(error){
    setSync("Error eliminando", "error");
    alert("No se pudo eliminar la empresa en Supabase:\n\n" + error.message);
  }
};

/* Alumnos: mismo comportamiento seguro */
delAlumno = async function(id){
  const alumno = (state.alumnos || []).find(a => String(a.id) === String(id));
  const nombre = alumno?.nombre || "este alumno";

  if(!confirm(`¿Eliminar definitivamente ${nombre}?`)) return;

  try{
    setSync("Eliminando alumno...", "saving");

    await bloomDeleteRemoteItem("alumnos", id);

    state.alumnos = (state.alumnos || []).filter(a => String(a.id) !== String(id));
    bloomSyncCacheWrite();

    setSync("Alumno eliminado", "ok");
    toast("Alumno eliminado definitivamente 🌸");

    await bloom3LoadAll();
    render();
  }catch(error){
    setSync("Error eliminando", "error");
    alert("No se pudo eliminar el alumno en Supabase:\n\n" + error.message);
  }
};

/* Guardar sin resucitar duplicados locales */
const bloomSyncOriginalSave = save;
save = function(){
  for(const kind of ["empresas","alumnos"]){
    const result = bloomSyncDedupe(kind, state[kind] || []);
    state[kind] = result.clean;
  }

  bloomSyncCacheWrite();

  if(!bloom3Ready || !bloom3Session?.user){
    bloomSyncOriginalSave();
    return;
  }

  setSync("Guardando nube...", "saving");
  clearTimeout(cloudTimer);
  cloudTimer = setTimeout(() => bloom3SaveAll(true), 250);
};

/* Reforzar botones en ajustes */
const bloomSyncRenderAjustesBase = typeof renderAjustes === "function" ? renderAjustes : null;
if(bloomSyncRenderAjustesBase){
  renderAjustes = function(){
    bloomSyncRenderAjustesBase();

    const target = document.querySelector("#ajustes .grid-2") || document.querySelector("#ajustes");
    if(target && !document.querySelector("#bloomSyncFixCard")){
      target.insertAdjacentHTML("afterbegin", `
        <section id="bloomSyncFixCard" class="card table-card sync-fix-card">
          <div class="section-head">
            <div>
              <p>Sincronización</p>
              <h3>Casa / trabajo</h3>
            </div>
          </div>
          <p>Usa Supabase como fuente principal. Si cambias de ordenador, pulsa <b>Recargar desde nube</b>. Si ves datos antiguos, pulsa <b>Limpiar caché local</b>.</p>
          <div class="settings-row">
            <button class="primary" onclick="forceCloudReload()">Recargar desde nube</button>
            <button class="soft-btn" onclick="clearLocalCacheAndReload()">Limpiar caché local</button>
            <button class="soft-btn" onclick="bloomSyncCleanDuplicates().then(()=>render())">Limpiar duplicados</button>
            <button class="soft-btn" onclick="saveCloud()">Guardar ahora</button>
          </div>
        </section>
      `);
    }
  };
}

/* Botón visible también en Empresas */
const bloomSyncRenderEmpresasBase = typeof renderEmpresas === "function" ? renderEmpresas : null;
if(bloomSyncRenderEmpresasBase){
  renderEmpresas = function(){
    bloomSyncRenderEmpresasBase();

    const toolbar = document.querySelector("#empresas .toolbar");
    if(toolbar && !toolbar.querySelector("[data-sync-fix]")){
      toolbar.insertAdjacentHTML("beforeend", `
        <button class="soft-btn" data-sync-fix onclick="forceCloudReload()">Recargar nube</button>
        <button class="soft-btn" data-sync-fix onclick="bloomSyncCleanDuplicates().then(()=>render())">Limpiar duplicados</button>
      `);
    }
  };
}

window.forceCloudReload = forceCloudReload;
window.clearLocalCacheAndReload = clearLocalCacheAndReload;
window.bloomSyncCleanDuplicates = bloomSyncCleanDuplicates;



/* =========================================================
   Bloom CRM 3.0 — FIX visual tabla Alumnos
   Corrige:
   - Fotos rotas mostrando texto alt dentro del círculo.
   - Miniatura demasiado pequeña/descuadrada.
   - Botones Modificar / Ver ficha / Eliminar fuera de la tabla.
   - Tabla de alumnos sin distribución estable.
========================================================= */

function bloomSafeInitials(name){
  const parts = String(name || "A").trim().split(/\s+/).filter(Boolean);
  return (parts.length ? parts.slice(0,2).map(p => p[0]).join("") : "A").toUpperCase();
}

function bloomPhotoCandidate(a){
  if(!a) return "";
  if(a.foto?.data) return a.foto.data;
  if(a.foto?.url) return a.foto.url;
  if(a.foto?.signedUrl) return a.foto.signedUrl;
  if(a.foto_signed_url) return a.foto_signed_url;
  if(a.foto_url) return a.foto_url;
  if(a.fotoUrl) return a.fotoUrl;
  if(typeof a.foto === "string") return a.foto;
  return "";
}

function bloomAvatarFixed(a){
  const src = bloomPhotoCandidate(a);
  const initials = bloomSafeInitials(a?.nombre);
  const id = String(a?.id || "");
  return `
    <div class="student-avatar avatar-fixed" data-avatar-id="${esc(id)}" data-initials="${esc(initials)}">
      ${src ? `<img src="${esc(src)}" alt="" loading="lazy" onerror="this.closest('.student-avatar').innerHTML='<span>${esc(initials)}</span>'; this.remove();">` : `<span>${esc(initials)}</span>`}
    </div>
  `;
}

async function bloomHydrateFixedAvatars(){
  const avatars = [...document.querySelectorAll(".avatar-fixed[data-avatar-id]")];

  for(const avatar of avatars){
    if(avatar.querySelector("img")) continue;

    const alumno = (state.alumnos || []).find(a => String(a.id) === String(avatar.dataset.avatarId));
    if(!alumno) continue;

    let path = alumno.foto_path || alumno.fotoPath || alumno.foto?.path || alumno.foto?.storage_path || "";
    if(!path) continue;

    try{
      let url = "";
      if(typeof bloom3SignedUrl === "function"){
        url = await bloom3SignedUrl(path);
      }else if(typeof bloom3Client !== "undefined" && bloom3Client){
        const bucket = typeof BLOOM3_BUCKET !== "undefined" ? BLOOM3_BUCKET : "bloom-crm-documents";
        const { data, error } = await bloom3Client.storage.from(bucket).createSignedUrl(path, 300);
        if(error) throw error;
        url = data.signedUrl;
      }

      if(url){
        alumno.foto = Object.assign({}, alumno.foto || {}, { path, signedUrl:url, type:"image/*", storage:true });
        avatar.innerHTML = `<img src="${esc(url)}" alt="" loading="lazy" onerror="this.closest('.student-avatar').innerHTML='<span>${esc(bloomSafeInitials(alumno.nombre))}</span>'; this.remove();">`;
      }
    }catch(error){
      console.warn("No se pudo cargar foto alumno", error);
    }
  }
}

renderAlumnos = function(){
  const q = $("#studentSearch")?.value?.toLowerCase() || "";
  const alumnos = (state.alumnos || []).filter(a => !q || JSON.stringify(a).toLowerCase().includes(q));

  $("#alumnos").innerHTML = pageHead("Alumnos", "Alumnos", "Ficha completa del alumnado") + `
    <section class="card table-card alumnos-table-card">
      <div class="toolbar alumnos-toolbar">
        <input id="studentSearch" placeholder="Buscar alumno..." oninput="renderAlumnos()" value="${esc(q)}">
        <button class="primary" onclick="openAlumno()">Añadir alumno</button>
        ${typeof openImportExcel === "function" ? `<button class="soft-btn" onclick="openImportExcel('alumnos')">Importar Excel</button>` : ""}
        ${typeof exportExcel === "function" ? `<button class="soft-btn" onclick="exportExcel('alumnos')">Exportar Excel</button>` : ""}
        ${typeof downloadTemplateExcel === "function" ? `<button class="soft-btn" onclick="downloadTemplateExcel('alumnos')">Plantilla Excel</button>` : ""}
      </div>

      <table class="alumnos-table">
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Contacto</th>
            <th>Empresa</th>
            <th>Estado</th>
            <th>Archivos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${alumnos.map(a => `
            <tr class="student-row clickable-row" data-alumno-row-id="${esc(a.id)}">
              <td>
                <div class="student-cell">
                  ${bloomAvatarFixed(a)}
                  <div class="student-main-data">
                    <b>${esc(a.nombre || "Sin nombre")}</b>
                    <small>${a.dni ? "DNI: " + esc(a.dni) + " · " : ""}NSS: ${esc(a.nss || "Sin NSS")}</small>
                  </div>
                </div>
              </td>
              <td class="student-contact">
                <span>${esc(a.telefono || "")}</span>
                <small>${esc(a.email || "")}</small>
              </td>
              <td>${esc(a.empresa || "Sin empresa")}</td>
              <td><span class="badge">${esc(a.estado || "sin asignar")}</span></td>
              <td onclick="event.stopPropagation()">
                <div class="student-files compact">
                  ${(bloomPhotoCandidate(a) || a.foto_path || a.foto?.path) ? `<button onclick="previewAnyFile(state.alumnos.find(x=>String(x.id)===String('${a.id}')).foto,'Foto')">Foto</button>` : `<span>Sin foto</span>`}
                  ${a.curriculum?.data || a.curriculum?.url || a.curriculum?.path ? `<button onclick="previewAnyFile(state.alumnos.find(x=>String(x.id)===String('${a.id}')).curriculum,'CV')">CV</button>` : `<span>Sin CV</span>`}
                </div>
              </td>
              <td class="row-actions alumno-actions" onclick="event.stopPropagation()">
                <button onclick="openAlumno('${esc(a.id)}')">Modificar</button>
                <button onclick="openStudentProfile('${esc(a.id)}')">Ver ficha</button>
                <button onclick="delAlumno('${esc(a.id)}')">Eliminar</button>
              </td>
            </tr>
          `).join("") || `<tr><td colspan="6">No hay alumnos.</td></tr>`}
        </tbody>
      </table>
    </section>
  `;

  setTimeout(bloomHydrateFixedAvatars, 80);
};

/* Click en fila abre ficha; botones no disparan la fila */
document.addEventListener("click", function(event){
  const row = event.target.closest("#alumnos tr[data-alumno-row-id]");
  if(!row) return;
  if(event.target.closest("button, a, input, select, textarea, label")) return;

  event.preventDefault();
  event.stopPropagation();
  openStudentProfile(row.dataset.alumnoRowId);
}, true);



/* =========================================================
   Bloom CRM 3.0 — Alumnos CRM profesional
   Reconstruye la pestaña Alumnos para que:
   - Se vea la foto real en miniatura.
   - Si falla la imagen, aparecen iniciales limpias.
   - Cada alumno se muestra como tarjeta CRM profesional.
   - Click en tarjeta abre ficha completa.
   - Botones Editar / Ver ficha / Foto / CV funcionan sin romper el click.
========================================================= */

const BLOOM_STUDENT_PHOTO_SIGNED_CACHE = new Map();

function bloomProClean(value, fallback=""){
  if(value === null || value === undefined) return fallback;
  const text = String(value).trim();
  if(!text || text.toLowerCase() === "null" || text.toLowerCase() === "undefined") return fallback;
  return text;
}

function bloomProInitials(name){
  const parts = bloomProClean(name, "A").split(/\s+/).filter(Boolean);
  return parts.slice(0,2).map(p => p[0]).join("").toUpperCase() || "A";
}

function bloomProPhotoDirect(a){
  if(!a) return "";
  if(a.foto?.data) return a.foto.data;
  if(a.foto?.url) return a.foto.url;
  if(a.foto?.signedUrl) return a.foto.signedUrl;
  if(a.foto_signed_url) return a.foto_signed_url;
  if(a.foto_url) return a.foto_url;
  if(a.fotoUrl) return a.fotoUrl;
  if(typeof a.foto === "string") return bloomProClean(a.foto);
  return "";
}

function bloomProPhotoPath(a){
  if(!a) return "";
  return bloomProClean(a.foto_path || a.fotoPath || a.foto?.path || a.foto?.storage_path || a.foto?.storagePath);
}

async function bloomProSignedPhoto(path){
  if(!path) return "";
  const cached = BLOOM_STUDENT_PHOTO_SIGNED_CACHE.get(path);
  if(cached && cached.exp > Date.now() + 30000) return cached.url;

  try{
    let url = "";
    if(typeof bloom3SignedUrl === "function"){
      url = await bloom3SignedUrl(path);
    }else if(typeof bloom3Client !== "undefined" && bloom3Client){
      const bucket = typeof BLOOM3_BUCKET !== "undefined" ? BLOOM3_BUCKET : "bloom-crm-documents";
      const { data, error } = await bloom3Client.storage.from(bucket).createSignedUrl(path, 300);
      if(error) throw error;
      url = data.signedUrl;
    }

    if(url){
      BLOOM_STUDENT_PHOTO_SIGNED_CACHE.set(path, { url, exp: Date.now() + 280000 });
      return url;
    }
  }catch(error){
    console.warn("No se pudo obtener miniatura privada", error);
  }
  return "";
}

function bloomProStudentById(id){
  return (state.alumnos || []).find(a => String(a.id) === String(id));
}

function bloomProAvatar(a, size="md"){
  const direct = bloomProPhotoDirect(a);
  const initials = bloomProInitials(a?.nombre);
  return `
    <div class="student-pro-avatar ${size}" data-pro-avatar-id="${esc(a?.id || "")}" data-pro-photo-path="${esc(bloomProPhotoPath(a))}">
      ${direct
        ? `<img src="${esc(direct)}" alt="" loading="lazy" onerror="this.closest('.student-pro-avatar').innerHTML='<span>${esc(initials)}</span>'; this.remove();">`
        : `<span>${esc(initials)}</span>`}
    </div>
  `;
}

async function bloomProHydrateAvatars(){
  const avatars = [...document.querySelectorAll(".student-pro-avatar[data-pro-avatar-id]")];
  for(const avatar of avatars){
    if(avatar.querySelector("img")) continue;

    const alumno = bloomProStudentById(avatar.dataset.proAvatarId);
    if(!alumno) continue;

    const path = bloomProPhotoPath(alumno);
    if(!path) continue;

    const url = await bloomProSignedPhoto(path);
    if(url){
      alumno.foto = Object.assign({}, alumno.foto || {}, {
        path,
        signedUrl:url,
        storage:true,
        type:"image/*",
        name:"Foto alumno"
      });
      alumno.foto_signed_url = url;
      avatar.innerHTML = `<img src="${esc(url)}" alt="" loading="lazy" onerror="this.closest('.student-pro-avatar').innerHTML='<span>${esc(bloomProInitials(alumno.nombre))}</span>'; this.remove();">`;
      avatar.classList.add("has-photo");
    }
  }
}

function bloomProProgress(a){
  if(!a.inicio || !a.fin) return 0;
  const start = new Date(a.inicio);
  const end = new Date(a.fin);
  const now = new Date();
  if(Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) return 0;
  if(now <= start) return 0;
  if(now >= end) return 100;
  return Math.round(((now - start) / (end - start)) * 100);
}

function bloomProStatusClass(status){
  const s = bloomProClean(status).toLowerCase();
  if(s.includes("práct") || s.includes("pract")) return "active";
  if(s.includes("final")) return "done";
  if(s.includes("entrevista") || s.includes("propuesta")) return "pending";
  return "none";
}

function bloomProDocButton(a, kind){
  if(kind === "foto"){
    const hasPhoto = bloomProPhotoDirect(a) || bloomProPhotoPath(a);
    return hasPhoto ? `<button class="mini-pill" data-action="photo" data-id="${esc(a.id)}">Foto</button>` : `<span class="mini-muted">Sin foto</span>`;
  }
  if(kind === "cv"){
    const hasCv = a.curriculum?.data || a.curriculum?.url || a.curriculum?.path;
    return hasCv ? `<button class="mini-pill" data-action="cv" data-id="${esc(a.id)}">CV</button>` : `<span class="mini-muted">Sin CV</span>`;
  }
  return "";
}

function renderAlumnos(){
  const q = $("#studentSearch")?.value?.toLowerCase() || "";
  const alumnos = (state.alumnos || []).filter(a => !q || JSON.stringify(a).toLowerCase().includes(q));

  const total = (state.alumnos || []).length;
  const sinEmpresa = (state.alumnos || []).filter(a => !a.empresa).length;
  const enPracticas = (state.alumnos || []).filter(a => String(a.estado || "").toLowerCase().includes("práct") || String(a.estado || "").toLowerCase().includes("pract")).length;
  const conCv = (state.alumnos || []).filter(a => a.curriculum?.data || a.curriculum?.url || a.curriculum?.path).length;

  $("#alumnos").innerHTML = pageHead("Alumnos", "Alumnos", "Ficha completa del alumnado") + `
    <section class="students-pro-page">
      <div class="students-pro-kpis">
        <article><b>${total}</b><span>Alumnos</span></article>
        <article><b>${sinEmpresa}</b><span>Sin empresa</span></article>
        <article><b>${enPracticas}</b><span>En prácticas</span></article>
        <article><b>${conCv}</b><span>Con CV</span></article>
      </div>

      <section class="card students-pro-card">
        <div class="toolbar students-pro-toolbar">
          <input id="studentSearch" placeholder="Buscar por nombre, DNI, email, empresa..." oninput="renderAlumnos()" value="${esc(q)}">
          <button class="primary" onclick="openAlumno()">Añadir alumno</button>
          ${typeof openImportExcel === "function" ? `<button class="soft-btn" onclick="openImportExcel('alumnos')">Importar Excel</button>` : ""}
          ${typeof exportExcel === "function" ? `<button class="soft-btn" onclick="exportExcel('alumnos')">Exportar Excel</button>` : ""}
          ${typeof downloadTemplateExcel === "function" ? `<button class="soft-btn" onclick="downloadTemplateExcel('alumnos')">Plantilla Excel</button>` : ""}
        </div>

        <div class="students-pro-list">
          ${alumnos.map(a => {
            const progress = bloomProProgress(a);
            return `
              <article class="student-pro-row" data-student-pro-id="${esc(a.id)}">
                <div class="student-pro-main">
                  ${bloomProAvatar(a, "lg")}
                  <div class="student-pro-info">
                    <div class="student-pro-title">
                      <h3>${esc(a.nombre || "Sin nombre")}</h3>
                      <span class="student-status ${bloomProStatusClass(a.estado)}">${esc(a.estado || "sin asignar")}</span>
                    </div>

                    <div class="student-pro-meta">
                      <span>${a.dni ? "DNI: " + esc(a.dni) : "Sin DNI"}</span>
                      <span>NSS: ${esc(a.nss || "Sin NSS")}</span>
                      <span>${esc(a.empresa || "Sin empresa")}</span>
                    </div>

                    <div class="student-pro-contact">
                      <span>📞 ${esc(a.telefono || "Sin teléfono")}</span>
                      <span>✉ ${esc(a.email || "Sin email")}</span>
                      <span>🎓 ${esc(a.curso || "Sin curso")}</span>
                    </div>

                    <div class="student-pro-progress">
                      <i><em style="width:${progress}%"></em></i>
                      <span>${progress}% prácticas</span>
                    </div>
                  </div>
                </div>

                <div class="student-pro-docs" onclick="event.stopPropagation()">
                  ${bloomProDocButton(a, "foto")}
                  ${bloomProDocButton(a, "cv")}
                </div>

                <div class="student-pro-actions" onclick="event.stopPropagation()">
                  <button data-action="view" data-id="${esc(a.id)}">Ver ficha</button>
                  <button data-action="edit" data-id="${esc(a.id)}">Editar</button>
                  <button data-action="delete" data-id="${esc(a.id)}">Eliminar</button>
                </div>
              </article>
            `;
          }).join("") || `<div class="students-empty">No hay alumnos.</div>`}
        </div>
      </section>
    </section>
  `;

  setTimeout(bloomProHydrateAvatars, 50);
  setTimeout(bloomProHydrateAvatars, 250);
}

/* Eventos seguros para la nueva vista */
document.addEventListener("click", function(event){
  const btn = event.target.closest(".student-pro-actions button, .student-pro-docs button");
  if(btn){
    event.preventDefault();
    event.stopPropagation();

    const alumno = bloomProStudentById(btn.dataset.id);
    if(!alumno) return;

    const action = btn.dataset.action;
    if(action === "view") return openStudentProfile(alumno.id);
    if(action === "edit") return openAlumno(alumno.id);
    if(action === "delete") return delAlumno(alumno.id);
    if(action === "photo") return previewAnyFile(alumno.foto, "Foto");
    if(action === "cv") return previewAnyFile(alumno.curriculum, "CV");
  }

  const row = event.target.closest(".student-pro-row[data-student-pro-id]");
  if(row && !event.target.closest("button, a, input, select, textarea, label")){
    event.preventDefault();
    event.stopPropagation();
    openStudentProfile(row.dataset.studentProId);
  }
}, true);

/* Rehidratar miniaturas después de renders generales */
const bloomProOriginalRender = typeof render === "function" ? render : null;
if(bloomProOriginalRender){
  render = function(){
    bloomProOriginalRender();
    setTimeout(bloomProHydrateAvatars, 80);
  };
}


/* =========================================================
   Bloom CRM 3.2 estable — Supabase directo + Storage privado
   - Supabase es la fuente principal.
   - localStorage queda solo como caché auxiliar manual.
   - CRUD directo para empresas y alumnos.
   - Fotos/CV/documentos usan Storage path + Signed URL.
   - Borrado definitivo, limpieza de Storage y anti-duplicados.
========================================================= */

const BLOOM32_VERSION = "3.2 estable";
const BLOOM32_DEDUPE_KEY = {
  empresas: item => bloom32Normalize(item?.nombre),
  alumnos: item => bloom32Normalize(item?.email) || bloom32Normalize(item?.dni) || bloom32Normalize(item?.nombre)
};

function bloom32Normalize(value){
  return String(value || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .trim().toLowerCase().replace(/\s+/g, " ");
}

function bloom32EnsureId(item){
  if(!item.id) item.id = String(uid());
  item.id = String(item.id);
  return item.id;
}

function bloom32UniqueItems(kind, items){
  const keyFn = BLOOM32_DEDUPE_KEY[kind];
  if(!keyFn) return items || [];
  const seen = new Set();
  const clean = [];
  for(const item of items || []){
    if(!item) continue;
    bloom32EnsureId(item);
    const key = keyFn(item) || String(item.id);
    if(seen.has(key)) continue;
    seen.add(key);
    clean.push(item);
  }
  return clean;
}

function bloom32Client(){
  const client = bloom3Client || bloom3ClientGet?.();
  if(!client) throw new Error("Supabase no está disponible.");
  return client;
}

function bloom32RequireSession(){
  if(!bloom3Session?.user?.id) throw new Error("Debes iniciar sesión para guardar en Supabase.");
  return bloom3Session.user;
}

async function bloom32Upsert(kind, item){
  const user = bloom32RequireSession();
  bloom32EnsureId(item);
  const table = bloom3Tables[kind];
  if(!table) throw new Error("Tabla no configurada: " + kind);
  const row = bloom3PublicRow(kind, item);
  row.user_id = user.id;
  const { error } = await bloom32Client().from(table).upsert(row, { onConflict:"id" });
  if(error) throw error;
  return item;
}

async function bloom32Delete(kind, id){
  bloom32RequireSession();
  const table = bloom3Tables[kind];
  if(!table) throw new Error("Tabla no configurada: " + kind);
  const { error } = await bloom32Client().from(table).delete().eq("id", String(id));
  if(error) throw error;
}

async function bloom32RemoveStoragePaths(paths){
  const clean = [...new Set((paths || []).filter(Boolean))];
  if(!clean.length || !bloom3Session?.user) return;
  const owned = clean.filter(path => String(path).startsWith(bloom3Session.user.id + "/"));
  if(!owned.length) return;
  const { error } = await bloom32Client().storage.from(BLOOM3_BUCKET).remove(owned);
  if(error) console.warn("No se pudieron borrar algunos archivos de Storage", error);
}

async function bloom32SignedUrl(path, ttl=900){
  if(!path) return "";
  const cacheKey = path + ":" + ttl;
  const cached = bloom3SignedCache.get(cacheKey) || bloom3SignedCache.get(path);
  if(cached && cached.exp > Date.now() + 30000) return cached.url;
  const { data, error } = await bloom32Client().storage.from(BLOOM3_BUCKET).createSignedUrl(path, ttl);
  if(error) throw error;
  const url = data?.signedUrl || "";
  bloom3SignedCache.set(cacheKey, { url, exp: Date.now() + (ttl * 1000) });
  bloom3SignedCache.set(path, { url, exp: Date.now() + (ttl * 1000) });
  return url;
}

bloom3SignedUrl = bloom32SignedUrl;

async function bloom32HydrateStudentFiles(){
  for(const alumno of state.alumnos || []){
    const fotoPath = alumno.foto_path || alumno.foto?.path || alumno.foto?.storage_path;
    if(fotoPath){
      alumno.foto_path = fotoPath;
      alumno.foto = Object.assign({ name:"Foto", storage:true, type:"image/*" }, alumno.foto || {}, { path:fotoPath });
      try{ alumno.foto.signedUrl = await bloom32SignedUrl(fotoPath, 900); }catch(e){ console.warn(e); }
    }
    const cvPath = alumno.cv_path || alumno.curriculum?.path || alumno.curriculum?.storage_path;
    if(cvPath){
      alumno.cv_path = cvPath;
      alumno.curriculum = Object.assign({ name:"Currículum", storage:true }, alumno.curriculum || {}, { path:cvPath });
    }
  }
}

function bloom32StudentPhotoUrl(a){
  return a?.foto?.signedUrl || a?.foto?.url || a?.foto?.data || a?.foto_signed_url || "";
}

async function bloom32LoadAll(){
  await bloom3LoadAll();
  state.empresas = bloom32UniqueItems("empresas", state.empresas);
  state.alumnos = bloom32UniqueItems("alumnos", state.alumnos);
  await bloom32HydrateStudentFiles();
  bloom3Ready = true;
  try{ localStorage.setItem(KEY + "_last_user", bloom3Session?.user?.id || ""); }catch(e){}
  setSync("Supabase sincronizado", "ok");
}

loadCloud = async function(){
  await bloom32LoadAll();
  render();
};

saveCloud = async function(silent=false){
  if(!bloom3Ready || !bloom3Session?.user) return;
  try{
    setSync("Guardando en Supabase...", "saving");
    state.empresas = bloom32UniqueItems("empresas", state.empresas);
    state.alumnos = bloom32UniqueItems("alumnos", state.alumnos);
    for(const kind of ["empresas","alumnos","convenios","carpetas","documentos","seguimientos","emails"]){
      await bloom3SaveKind(kind);
    }
    setSync("Supabase sincronizado", "ok");
    if(!silent) toast("Guardado en Supabase 🌸");
  }catch(error){
    console.error(error);
    setSync("Error Supabase", "error");
    if(!silent) alert("No se pudo guardar en Supabase:\n\n" + error.message);
  }
};

save = function(){
  state.empresas = bloom32UniqueItems("empresas", state.empresas);
  state.alumnos = bloom32UniqueItems("alumnos", state.alumnos);
  clearTimeout(cloudTimer);
  if(bloom3Ready && bloom3Session?.user){
    setSync("Guardando en Supabase...", "saving");
    cloudTimer = setTimeout(() => saveCloud(true), 350);
  }else{
    setSync("Pendiente de sesión", "saving");
  }
};

function bloom32EmpresaForm(e){
  return `<form id="empresaForm" class="form-grid">
    <input name="nombre" value="${esc(e.nombre)}" placeholder="Nombre" required>
    <input name="sector" value="${esc(e.sector)}" placeholder="Sector">
    <input name="subsector" value="${esc(e.subsector || "")}" placeholder="Subsector">
    <input name="ciudad" value="${esc(e.ciudad)}" placeholder="Ciudad">
    <input name="isla" value="${esc(e.isla)}" placeholder="Isla">
    <input name="web" value="${esc(e.web || "")}" placeholder="Web">
    <input name="fuente" value="${esc(e.fuente || "")}" placeholder="Fuente">
    <input name="contacto" value="${esc(e.contacto)}" placeholder="Contacto">
    <input name="telefono" value="${esc(e.telefono)}" placeholder="Teléfono">
    <input name="email" value="${esc(e.email)}" placeholder="Email">
    <select name="estado">${["nueva","contactada","interesada","convenio","activa","descartada"].map(x=>`<option value="${x}" ${e.estado===x?"selected":""}>${x}</option>`).join("")}</select>
    <select name="prioridad">${["alta","media","baja"].map(x=>`<option value="${x}" ${e.prioridad===x?"selected":""}>${x}</option>`).join("")}</select>
    <textarea name="notas" placeholder="Notas">${esc(e.notas)}</textarea>
  </form>`;
}

openEmpresa = function(eid=null){
  const editing = (state.empresas || []).find(x => String(x.id) === String(eid));
  const e = editing || { id:String(uid()), nombre:"", sector:"", subsector:"", isla:"Gran Canaria", ciudad:"Las Palmas", estado:"nueva", prioridad:"media", contacto:"", telefono:"", email:"", notas:"" };
  modal("Empresa", bloom32EmpresaForm(e), async()=>{
    const values = Object.fromEntries(new FormData($("#empresaForm")).entries());
    Object.assign(e, values);
    bloom32EnsureId(e);
    try{
      setSync("Guardando empresa...", "saving");
      await bloom32Upsert("empresas", e);
      if(!editing) state.empresas.unshift(e);
      state.empresas = bloom32UniqueItems("empresas", state.empresas);
      log(`Empresa guardada: ${e.nombre}`);
      closeModal();
      setSync("Empresa sincronizada", "ok");
      render();
      toast("Empresa guardada 🌸");
    }catch(error){
      setSync("Error empresa", "error");
      alert("No se pudo guardar la empresa:\n\n" + error.message);
    }
  });
};

function bloom32AlumnoForm(a){
  const photoUrl = bloom32StudentPhotoUrl(a);
  return `<form id="alumnoForm" class="form-grid">
    <div class="student-photo-preview">${photoUrl ? `<img src="${esc(photoUrl)}">` : "Foto"}</div>
    <input name="nombre" value="${esc(a.nombre)}" placeholder="Nombre" required>
    <input name="dni" value="${esc(a.dni || "")}" placeholder="DNI/NIE">
    <input name="telefono" value="${esc(a.telefono)}" placeholder="Teléfono">
    <input name="email" value="${esc(a.email)}" placeholder="Correo">
    <input name="direccion" value="${esc(a.direccion)}" placeholder="Dirección">
    <input name="nss" value="${esc(a.nss)}" placeholder="Nº Seguridad Social">
    <input name="curso" value="${esc(a.curso || "")}" placeholder="Curso de procedencia">
    <label class="student-files">Foto<input id="alumnoFoto" type="file" accept="image/*"></label>
    <label class="student-files">Currículum<input id="alumnoCV" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"></label>
    <select name="empresa"><option value="">Sin empresa</option>${(state.empresas||[]).map(emp=>`<option value="${esc(emp.nombre)}" ${a.empresa===emp.nombre?"selected":""}>${esc(emp.nombre)}</option>`).join("")}</select>
    <select name="estado">${["sin asignar","propuesta","entrevista","prácticas","finalizado"].map(x=>`<option value="${x}" ${a.estado===x?"selected":""}>${x}</option>`).join("")}</select>
    <input name="inicio" type="date" value="${esc(a.inicio || "")}">
    <input name="fin" type="date" value="${esc(a.fin || "")}">
    <input name="tutor" value="${esc(a.tutor || "")}" placeholder="Tutor">
    <input name="horas" value="${esc(a.horas || "")}" placeholder="Horas">
    <textarea name="notas">${esc(a.notas || "")}</textarea>
  </form>`;
}

openAlumno = function(aid=null){
  const editing = (state.alumnos || []).find(x => String(x.id) === String(aid));
  const a = editing || { id:String(uid()), nombre:"", telefono:"", email:"", direccion:"", nss:"", dni:"", curso:"", estado:"sin asignar", empresa:"", inicio:"", fin:"", tutor:"", notas:"", foto:null, curriculum:null };
  modal("Alumno", bloom32AlumnoForm(a), async()=>{
    const values = Object.fromEntries(new FormData($("#alumnoForm")).entries());
    const oldPhoto = a.foto_path || a.foto?.path;
    const oldCv = a.cv_path || a.curriculum?.path;
    Object.assign(a, values);
    bloom32EnsureId(a);
    try{
      setSync("Guardando alumno...", "saving");
      const foto = $("#alumnoFoto")?.files?.[0];
      const cv = $("#alumnoCV")?.files?.[0];
      if(foto){
        a.foto = await bloom3UploadFile(foto, "alumnos/fotos");
        a.foto_path = a.foto.path;
        await bloom32RemoveStoragePaths([oldPhoto]);
        try{ a.foto.signedUrl = await bloom32SignedUrl(a.foto.path, 900); }catch(e){}
      }
      if(cv){
        a.curriculum = await bloom3UploadFile(cv, "alumnos/cv");
        a.cv_path = a.curriculum.path;
        await bloom32RemoveStoragePaths([oldCv]);
      }
      await bloom32Upsert("alumnos", a);
      if(!editing) state.alumnos.unshift(a);
      state.alumnos = bloom32UniqueItems("alumnos", state.alumnos);
      log(`Alumno guardado: ${a.nombre}`);
      closeModal();
      setSync("Alumno sincronizado", "ok");
      render();
      toast("Alumno guardado 🌸");
    }catch(error){
      setSync("Error alumno", "error");
      alert("No se pudo guardar el alumno:\n\n" + error.message);
    }
  });
};

delEmpresa = async function(id){
  const empresa = (state.empresas || []).find(e => String(e.id) === String(id));
  if(!confirm(`¿Eliminar definitivamente ${empresa?.nombre || "esta empresa"}?`)) return;
  try{
    setSync("Eliminando empresa...", "saving");
    await bloom32Delete("empresas", id);
    state.empresas = (state.empresas || []).filter(e => String(e.id) !== String(id));
    setSync("Empresa eliminada", "ok");
    render();
    toast("Empresa eliminada definitivamente 🌸");
  }catch(error){
    setSync("Error eliminando", "error");
    alert("No se pudo eliminar la empresa:\n\n" + error.message);
  }
};

delAlumno = async function(id){
  const alumno = (state.alumnos || []).find(a => String(a.id) === String(id));
  if(!confirm(`¿Eliminar definitivamente ${alumno?.nombre || "este alumno"}?`)) return;
  try{
    setSync("Eliminando alumno...", "saving");
    await bloom32Delete("alumnos", id);
    await bloom32RemoveStoragePaths([alumno?.foto_path || alumno?.foto?.path, alumno?.cv_path || alumno?.curriculum?.path]);
    state.alumnos = (state.alumnos || []).filter(a => String(a.id) !== String(id));
    setSync("Alumno eliminado", "ok");
    render();
    toast("Alumno eliminado definitivamente 🌸");
  }catch(error){
    setSync("Error eliminando", "error");
    alert("No se pudo eliminar el alumno:\n\n" + error.message);
  }
};

previewAnyFile = async function(file, title="Documento"){
  if(!file){ modal("Previsualizar documento", `<p>No hay archivo adjunto.</p>`, () => closeModal()); return; }
  const path = file.path || file.storage_path;
  if(file.storage && path){
    try{
      const url = await bloom32SignedUrl(path, 900);
      const name = file.name || title;
      const type = file.type || "";
      const isPdf = type.includes("pdf") || /\.pdf$/i.test(name);
      const isImage = type.includes("image") || /\.(png|jpg|jpeg|webp|gif)$/i.test(name);
      modal("Previsualizar documento", `<section><h2>${esc(title)}</h2>
        ${isPdf ? `<div class="student-cv-preview"><iframe src="${url}"></iframe></div>` : isImage ? `<div class="student-cv-image"><img src="${url}"></div>` : `<div class="student-cv-empty"><b>${esc(name)}</b><span>Archivo privado con enlace temporal.</span></div>`}
        <div class="student-cv-actions"><a href="${url}" target="_blank">Abrir temporal</a><a href="${url}" download="${esc(name)}">Descargar</a></div>
      </section>`, () => closeModal());
      return;
    }catch(error){ alert("No se pudo crear el enlace temporal:\n\n" + error.message); return; }
  }
  modal("Previsualizar documento", `<section><h2>${esc(title)}</h2>${filePreviewHTML(file,"modal")}</section>`, () => closeModal());
};

renderAjustes = function(){
  $("#ajustes").innerHTML = pageHead("Ajustes", "Ajustes", "Bloom CRM 3.2 estable") + `
    <section class="grid-2">
      <div class="card table-card">
        <h3>Supabase privado</h3>
        <p>Fuente principal: tablas normalizadas con RLS. Storage privado: <b>${BLOOM3_BUCKET}</b>.</p>
        <button class="primary" onclick="loadCloud()">Recargar desde Supabase</button>
        <button class="soft-btn" onclick="saveCloud()">Guardar ahora</button>
        <button class="soft-btn" onclick="bloom32CleanDuplicates()">Limpiar duplicados</button>
      </div>
      <div class="card table-card">
        <h3>Mantenimiento local</h3>
        <p>La caché local no se usa como base de datos. Sirve solo para compatibilidad temporal.</p>
        <button class="soft-btn" onclick="clearLocalCacheAndReload?.() || localStorage.removeItem(KEY)">Limpiar caché local</button>
        <button class="soft-btn" onclick="downloadBackup()">Exportar JSON de emergencia</button>
      </div>
    </section>`;
};

async function bloom32CleanDuplicates(){
  try{
    setSync("Limpiando duplicados...", "saving");
    for(const kind of ["empresas", "alumnos"]){
      const table = bloom3Tables[kind];
      const rows = await bloom3LoadKind(kind);
      const keep = bloom32UniqueItems(kind, rows);
      const keepIds = new Set(keep.map(x => String(x.id)));
      const duplicates = rows.filter(x => !keepIds.has(String(x.id)));
      for(const dup of duplicates){
        if(kind === "alumnos") await bloom32RemoveStoragePaths([dup.foto_path || dup.foto?.path, dup.cv_path || dup.curriculum?.path]);
        await bloom32Delete(kind, dup.id);
      }
      state[kind] = keep;
      await bloom3SaveKind(kind);
    }
    await bloom32HydrateStudentFiles();
    setSync("Duplicados limpios", "ok");
    render();
    toast("Duplicados revisados 🌸");
  }catch(error){
    setSync("Error duplicados", "error");
    alert("No se pudieron limpiar duplicados:\n\n" + error.message);
  }
}
window.bloom32CleanDuplicates = bloom32CleanDuplicates;

/* Inicialización reforzada: tras login, siempre recarga Supabase y no localStorage. */
const bloom32OldUnlock = typeof bloom3Unlock === "function" ? bloom3Unlock : null;
if(bloom32OldUnlock){
  bloom3Unlock = function(){
    bloom32OldUnlock();
    setTimeout(() => { if(bloom3Session?.user) loadCloud().catch(console.error); }, 50);
  };
}

document.title = "Bloom CRM 3.2";


/* =========================================================
   Bloom CRM 3.2.1 — reparación final de archivos
   Corrige el origen de datos, duplicados reales y miniaturas privadas.
========================================================= */
(function(){
  const FIX_VERSION = "3.2.1 archivos reparados";

  function norm(v){
    return String(v || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase().replace(/\s+/g," ");
  }

  async function signed(path, ttl=900){
    if(!path) return "";
    const cache = typeof bloom3SignedCache !== "undefined" ? bloom3SignedCache : new Map();
    const cached = cache.get(path);
    if(cached && cached.exp > Date.now()+30000) return cached.url;
    const client = (typeof bloom32Client === "function" ? bloom32Client() : bloom3Client);
    const { data, error } = await client.storage.from(BLOOM3_BUCKET).createSignedUrl(path, ttl);
    if(error) throw error;
    const url = data?.signedUrl || "";
    cache.set(path, {url, exp:Date.now()+ttl*1000});
    return url;
  }

  async function findExisting(kind, item){
    if(!bloom3Session?.user?.id) return null;
    const client = typeof bloom32Client === "function" ? bloom32Client() : bloom3Client;
    const table = bloom3Tables?.[kind];
    if(!client || !table) return null;

    if(kind === "empresas"){
      const name = String(item?.nombre || "").trim();
      if(!name) return null;
      const { data, error } = await client.from(table).select("id,nombre,data").eq("user_id", bloom3Session.user.id).ilike("nombre", name).limit(1);
      if(!error && data?.[0]) return data[0];
      const local = (state.empresas || []).find(e => norm(e.nombre) === norm(name));
      return local ? { id:String(local.id), data:local } : null;
    }

    if(kind === "alumnos"){
      const email = String(item?.email || "").trim();
      const dni = String(item?.dni || "").trim();
      if(email){
        const { data, error } = await client.from(table).select("id,email,dni,data").eq("user_id", bloom3Session.user.id).ilike("email", email).limit(1);
        if(!error && data?.[0]) return data[0];
      }
      if(dni){
        const { data, error } = await client.from(table).select("id,email,dni,data").eq("user_id", bloom3Session.user.id).ilike("dni", dni).limit(1);
        if(!error && data?.[0]) return data[0];
      }
      const name = String(item?.nombre || "").trim();
      const local = (state.alumnos || []).find(a => (email && norm(a.email) === norm(email)) || (dni && norm(a.dni) === norm(dni)) || (!email && !dni && name && norm(a.nombre) === norm(name)));
      return local ? { id:String(local.id), data:local } : null;
    }
    return null;
  }

  async function upsertClean(kind, item){
    if(typeof bloom32RequireSession === "function") bloom32RequireSession();
    if(!item.id) item.id = String(uid());
    item.id = String(item.id);
    const existing = await findExisting(kind, item);
    if(existing && String(existing.id) !== String(item.id)){
      item.id = String(existing.id);
      const list = state[kind] || [];
      const oldIndex = list.findIndex(x => String(x.id) === String(existing.id));
      if(oldIndex >= 0) list[oldIndex] = Object.assign({}, list[oldIndex], item);
    }
    const row = bloom3PublicRow(kind, item);
    row.user_id = bloom3Session.user.id;
    const { error } = await bloom32Client().from(bloom3Tables[kind]).upsert(row, { onConflict:"id" });
    if(error) throw error;
    return item;
  }

  window.bloom32FindExisting = findExisting;
  bloom32Upsert = upsertClean;

  const oldLoad = loadCloud;
  loadCloud = async function(){
    if(!bloom3Session?.user){ setSync("Inicia sesión", "saving"); return; }
    await oldLoad();
    state.empresas = bloom32UniqueItems("empresas", state.empresas || []);
    state.alumnos = bloom32UniqueItems("alumnos", state.alumnos || []);
    for(const a of state.alumnos || []){
      const p = a.foto_path || a.foto?.path || a.foto?.storage_path;
      if(p){
        a.foto_path = p;
        a.foto = Object.assign({name:"Foto alumno", type:"image/*", storage:true}, a.foto || {}, {path:p});
        try{ a.foto.signedUrl = await signed(p, 900); a.foto_signed_url = a.foto.signedUrl; }catch(e){ console.warn("Foto sin signed URL", e); }
      }
      const c = a.cv_path || a.curriculum?.path || a.curriculum?.storage_path;
      if(c){ a.cv_path = c; a.curriculum = Object.assign({name:"Currículum", storage:true}, a.curriculum || {}, {path:c}); }
    }
    try{ localStorage.removeItem(KEY); localStorage.removeItem("bloom_crm_3_state"); }catch(e){}
    setSync("Supabase sincronizado", "ok");
    render();
  };

  save = function(){
    if(!bloom3Session?.user || !bloom3Ready){ setSync("Pendiente de Supabase", "saving"); return; }
    state.empresas = bloom32UniqueItems("empresas", state.empresas || []);
    state.alumnos = bloom32UniqueItems("alumnos", state.alumnos || []);
    clearTimeout(cloudTimer);
    setSync("Guardando en Supabase...", "saving");
    cloudTimer = setTimeout(() => saveCloud(true), 350);
  };

  const oldOpenEmpresa = openEmpresa;
  openEmpresa = function(eid=null){
    const editing = (state.empresas || []).find(x => String(x.id) === String(eid));
    const e = editing || { id:String(uid()), nombre:"", sector:"", subsector:"", isla:"Gran Canaria", ciudad:"Las Palmas", estado:"nueva", prioridad:"media", contacto:"", telefono:"", email:"", notas:"" };
    modal("Empresa", bloom32EmpresaForm(e), async()=>{
      const values = Object.fromEntries(new FormData($("#empresaForm")).entries());
      Object.assign(e, values);
      try{
        setSync("Guardando empresa...", "saving");
        await bloom32Upsert("empresas", e);
        state.empresas = [e, ...(state.empresas || []).filter(x => String(x.id) !== String(e.id))];
        state.empresas = bloom32UniqueItems("empresas", state.empresas);
        log(`Empresa guardada: ${e.nombre}`);
        closeModal(); render(); setSync("Empresa sincronizada", "ok"); toast("Empresa guardada 🌸");
      }catch(error){ setSync("Error empresa", "error"); alert("No se pudo guardar la empresa:\n\n" + error.message); }
    });
  };

  const oldOpenAlumno = openAlumno;
  openAlumno = function(aid=null){
    const editing = (state.alumnos || []).find(x => String(x.id) === String(aid));
    const a = editing || { id:String(uid()), nombre:"", telefono:"", email:"", direccion:"", nss:"", dni:"", curso:"", estado:"sin asignar", empresa:"", inicio:"", fin:"", tutor:"", notas:"", foto:null, curriculum:null };
    modal("Alumno", bloom32AlumnoForm(a), async()=>{
      const values = Object.fromEntries(new FormData($("#alumnoForm")).entries());
      const oldPhoto = a.foto_path || a.foto?.path;
      const oldCv = a.cv_path || a.curriculum?.path;
      Object.assign(a, values);
      try{
        setSync("Guardando alumno...", "saving");
        const foto = $("#alumnoFoto")?.files?.[0];
        const cv = $("#alumnoCV")?.files?.[0];
        if(foto){
          a.foto = await bloom3UploadFile(foto, "alumnos/fotos");
          a.foto_path = a.foto.path;
          try{ a.foto.signedUrl = await signed(a.foto_path, 900); a.foto_signed_url = a.foto.signedUrl; }catch(e){}
          if(oldPhoto && oldPhoto !== a.foto_path) await bloom32RemoveStoragePaths([oldPhoto]);
        }
        if(cv){
          a.curriculum = await bloom3UploadFile(cv, "alumnos/cv");
          a.cv_path = a.curriculum.path;
          if(oldCv && oldCv !== a.cv_path) await bloom32RemoveStoragePaths([oldCv]);
        }
        await bloom32Upsert("alumnos", a);
        state.alumnos = [a, ...(state.alumnos || []).filter(x => String(x.id) !== String(a.id))];
        state.alumnos = bloom32UniqueItems("alumnos", state.alumnos);
        log(`Alumno guardado: ${a.nombre}`);
        closeModal(); render(); setSync("Alumno sincronizado", "ok"); toast("Alumno guardado 🌸");
      }catch(error){ setSync("Error alumno", "error"); alert("No se pudo guardar el alumno:\n\n" + error.message); }
    });
  };

  previewAnyFile = async function(file, title="Documento"){
    if(!file){ modal("Previsualizar documento", `<p>No hay archivo adjunto.</p>`, () => closeModal()); return; }
    const path = file.path || file.storage_path || file.storagePath;
    if(path && (file.storage || !file.data)){
      try{
        const url = await signed(path, 900);
        const name = file.name || title;
        const type = file.type || "";
        const isPdf = type.includes("pdf") || /\.pdf$/i.test(name);
        const isImage = type.includes("image") || /\.(png|jpg|jpeg|webp|gif)$/i.test(name);
        modal("Previsualizar documento", `<section><h2>${esc(title)}</h2>${isPdf ? `<div class="student-cv-preview"><iframe src="${url}"></iframe></div>` : isImage ? `<div class="student-cv-image"><img src="${url}"></div>` : `<div class="student-cv-empty"><b>${esc(name)}</b><span>Archivo privado con enlace temporal.</span></div>`}<div class="student-cv-actions"><a href="${url}" target="_blank">Abrir temporal</a><a href="${url}" download="${esc(name)}">Descargar</a></div></section>`, () => closeModal());
      }catch(error){ alert("No se pudo crear el enlace temporal:\n\n" + error.message); }
      return;
    }
    modal("Previsualizar documento", `<section><h2>${esc(title)}</h2>${filePreviewHTML(file,"modal")}</section>`, () => closeModal());
  };

  document.title = "Bloom CRM " + FIX_VERSION;
})();


/* Bloom CRM 3.2.2 paquete raíz reparado: cache-bust + supabase/schema.sql incluido */
window.BLOOM_CRM_BUILD="3.2.2-reparado-final";
console.info("Bloom CRM build", window.BLOOM_CRM_BUILD);

/* =========================================================
   Bloom CRM 3.2.3 — Reparación definitiva previsualización Documentos
   - Corrige botones con IDs no numéricos.
   - Soporta documentos guardados como file.path, storage_path, path, url o data.
   - Genera Signed URL antes de abrir/descargar archivos privados.
========================================================= */
(function(){
  const BUILD = "3.2.3-documentos-preview";

  function bloomDocById(id){
    return (state.documentos || []).find(d => String(d.id) === String(id));
  }

  function bloomDocFile(docOrFile){
    if(!docOrFile) return null;
    if(docOrFile.file) return docOrFile.file;
    return docOrFile;
  }

  function bloomDocPath(docOrFile){
    const obj = docOrFile || {};
    const file = bloomDocFile(obj) || {};
    return file.path || file.storage_path || file.storagePath || obj.path || obj.storage_path || obj.storagePath || obj.file_path || obj.documento_path || "";
  }

  async function bloomDocSignedUrl(path, ttl=900){
    if(!path) return "";
    if(typeof bloom32SignedUrl === "function") return await bloom32SignedUrl(path, ttl);
    if(typeof bloom3SignedUrl === "function") return await bloom3SignedUrl(path, ttl);
    const client = typeof bloom32Client === "function" ? bloom32Client() : bloom3Client;
    const bucket = typeof BLOOM3_BUCKET !== "undefined" ? BLOOM3_BUCKET : "bloom-crm-documents";
    const { data, error } = await client.storage.from(bucket).createSignedUrl(path, ttl);
    if(error) throw error;
    return data?.signedUrl || "";
  }

  async function bloomDocUrl(docOrFile){
    const file = bloomDocFile(docOrFile);
    if(!file) return "";
    if(file.data) return file.data;
    if(file.url) return file.url;
    if(file.signedUrl) return file.signedUrl;
    const path = bloomDocPath(docOrFile);
    if(path) return await bloomDocSignedUrl(path, 900);
    return "";
  }

  function bloomDocName(docOrFile, fallback="Documento"){
    const file = bloomDocFile(docOrFile) || {};
    return file.name || docOrFile?.nombre || fallback;
  }

  function bloomDocType(docOrFile){
    const file = bloomDocFile(docOrFile) || {};
    return file.type || docOrFile?.mime_type || docOrFile?.tipo_mime || "";
  }

  window.previewAnyFile = async function(fileOrDoc, title="Documento"){
    const file = bloomDocFile(fileOrDoc);
    if(!file){
      modal("Previsualizar documento", `<p>No hay archivo adjunto.</p>`, () => closeModal());
      return;
    }
    try{
      const url = await bloomDocUrl(fileOrDoc);
      const name = bloomDocName(fileOrDoc, title);
      const type = bloomDocType(fileOrDoc);
      if(!url){
        modal("Previsualizar documento", `<section><h2>${esc(title)}</h2><div class="student-cv-empty"><b>${esc(name)}</b><span>No se encontró la ruta del archivo.</span></div></section>`, () => closeModal());
        return;
      }
      const isPdf = type.includes("pdf") || /\.pdf$/i.test(name);
      const isImage = type.includes("image") || /\.(png|jpg|jpeg|webp|gif)$/i.test(name);
      const body = isPdf
        ? `<div class="student-cv-preview"><iframe src="${url}"></iframe></div>`
        : isImage
          ? `<div class="student-cv-image"><img src="${url}" alt="${esc(name)}"></div>`
          : `<div class="student-cv-empty"><b>${esc(name)}</b><span>Este tipo de archivo no tiene vista integrada. Puedes abrirlo o descargarlo.</span></div>`;
      modal("Previsualizar documento", `<section><h2>${esc(title)}</h2>${body}<div class="student-cv-actions"><a href="${url}" target="_blank" rel="noopener">Abrir</a><a href="${url}" download="${esc(name)}">Descargar</a></div></section>`, () => closeModal());
    }catch(error){
      console.error("previewAnyFile", error);
      alert("No se pudo previsualizar el documento:\n\n" + (error?.message || error));
    }
  };

  window.bloomPreviewDoc = function(id){
    const doc = bloomDocById(id);
    if(!doc) return alert("No se encontró el documento.");
    return window.previewAnyFile(doc, doc.nombre || "Documento");
  };

  window.bloomDownloadDoc = async function(id){
    const doc = bloomDocById(id);
    if(!doc) return alert("No se encontró el documento.");
    try{
      const url = await bloomDocUrl(doc);
      if(!url) return alert("No se encontró la ruta del archivo.");
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.download = bloomDocName(doc, doc.nombre || "documento");
      document.body.appendChild(a);
      a.click();
      a.remove();
    }catch(error){
      alert("No se pudo descargar el documento:\n\n" + (error?.message || error));
    }
  };

  window.docCard = function(d){
    const id = String(d.id).replace(/\\/g,"\\\\").replace(/'/g,"\\'");
    const hasFile = !!(d.file || d.path || d.storage_path || d.file_path || d.url || d.data);
    return `<article class="card doc-card">
      <h3>${esc(d.nombre || "Documento")}</h3>
      <p>${esc(d.tipo || "")} · ${esc(d.estado || "")}</p>
      <p>${esc(d.empresa || d.alumno || "General")} · ${esc(d.fecha || "")}</p>
      <p>${esc(d.notas || "")}</p>
      <div class="doc-actions">
        <button ${hasFile ? "" : "disabled"} onclick="bloomPreviewDoc('${id}')">Previsualizar</button>
        <button ${hasFile ? "" : "disabled"} onclick="bloomDownloadDoc('${id}')">Descargar</button>
        <button onclick="editDoc('${id}')">Modificar</button>
        <button onclick="replaceDoc('${id}')">Reemplazar archivo</button>
        <button onclick="delDoc('${id}')">Eliminar</button>
      </div>
    </article>`;
  };

  const previousReplaceDoc = window.replaceDoc;
  window.replaceDoc = function(id){
    const inp = document.createElement("input");
    inp.type = "file";
    inp.onchange = async () => {
      const d = bloomDocById(id);
      if(!d || !inp.files?.[0]) return;
      try{
        setSync("Reemplazando documento...", "saving");
        const oldPath = bloomDocPath(d);
        d.file = await fileToData(inp.files[0]);
        d.nombre = d.nombre || d.file?.name || "Documento";
        if(oldPath && d.file?.path !== oldPath && typeof bloom32RemoveStoragePaths === "function") await bloom32RemoveStoragePaths([oldPath]);
        if(typeof bloom32Upsert === "function") await bloom32Upsert("documentos", d); else save();
        render();
        setSync("Documento reemplazado", "ok");
        toast("Documento reemplazado 🌸");
      }catch(error){
        console.error(error);
        setSync("Error documento", "error");
        alert("No se pudo reemplazar el documento:\n\n" + (error?.message || error));
        if(previousReplaceDoc) return previousReplaceDoc(id);
      }
    };
    inp.click();
  };

  window.BLOOM_CRM_BUILD = BUILD;
  console.info("Bloom CRM build", BUILD);
})();

/* =========================================================
   Bloom CRM 3.2.4 — Documentos: reparación sin onclick inline
   - Rehace la pestaña Documentos con botones enlazados por addEventListener.
   - El botón Previsualizar recibe el documento completo, no solo file.
   - Soporta IDs numéricos, UUID/texto y rutas en file.path/storage_path.
========================================================= */
(function(){
  const BUILD = "3.2.4-documentos-final";

  const byId = (id) => (state.documentos || []).find(d => String(d.id) === String(id));
  const docPath = (doc) => {
    const f = doc?.file || {};
    return f.path || f.storage_path || f.storagePath || doc?.storage_path || doc?.path || doc?.file_path || doc?.documento_path || "";
  };
  const docFile = (doc) => doc?.file || (doc ? {
    name: doc.nombre || "Documento",
    type: doc.mime_type || doc.tipo_mime || "",
    path: docPath(doc),
    data: doc.data || "",
    url: doc.url || "",
    signedUrl: doc.signedUrl || doc.signed_url || "",
    storage: !!docPath(doc)
  } : null);
  const htmlId = (id) => esc(String(id));

  async function docUrl(doc){
    const f = docFile(doc);
    if(!f) return "";
    if(f.data) return f.data;
    if(f.url) return f.url;
    if(f.signedUrl) return f.signedUrl;
    const path = docPath(doc);
    if(!path) return "";
    if(typeof bloom32SignedUrl === "function") return await bloom32SignedUrl(path, 900);
    if(typeof bloom3SignedUrl === "function") return await bloom3SignedUrl(path);
    const client = typeof bloom32Client === "function" ? bloom32Client() : bloom3Client;
    const { data, error } = await client.storage.from(BLOOM3_BUCKET).createSignedUrl(path, 900);
    if(error) throw error;
    return data?.signedUrl || "";
  }

  window.previewAnyFile = async function(fileOrDoc, title="Documento"){
    const doc = fileOrDoc?.file ? fileOrDoc : null;
    const f = doc ? docFile(doc) : fileOrDoc;
    if(!f){
      modal("Previsualizar documento", `<p>No hay archivo adjunto.</p>`, () => closeModal());
      return;
    }
    try{
      const source = doc || f;
      const url = doc ? await docUrl(doc) : (f.data || f.url || f.signedUrl || (f.path ? await docUrl({file:f}) : ""));
      const name = f.name || doc?.nombre || title || "Documento";
      const type = f.type || doc?.mime_type || "";
      const isPdf = type.includes("pdf") || /\.pdf$/i.test(name);
      const isImage = type.includes("image") || /\.(png|jpg|jpeg|webp|gif)$/i.test(name);
      let body = "";
      if(!url){
        body = `<div class="student-cv-empty"><b>${esc(name)}</b><span>No se encontró una ruta o URL válida para este archivo.</span></div>`;
      }else if(isPdf){
        body = `<div class="student-cv-preview"><iframe src="${url}"></iframe></div>`;
      }else if(isImage){
        body = `<div class="student-cv-image"><img src="${url}" alt="${esc(name)}"></div>`;
      }else{
        body = `<div class="student-cv-empty"><b>${esc(name)}</b><span>Este tipo de archivo no tiene vista integrada. Usa Abrir o Descargar.</span></div>`;
      }
      modal("Previsualizar documento", `<section><h2>${esc(title || name)}</h2>${body}${url ? `<div class="student-cv-actions"><a href="${url}" target="_blank" rel="noopener">Abrir</a><a href="${url}" download="${esc(name)}">Descargar</a></div>` : ""}</section>`, () => closeModal());
    }catch(error){
      console.error("previewAnyFile/documentos", error);
      alert("No se pudo previsualizar el documento:\n\n" + (error?.message || error));
    }
  };

  function docCardSafe(d){
    const hasFile = !!(d.file || d.path || d.storage_path || d.file_path || d.url || d.data || docPath(d));
    return `<article class="card doc-card" data-doc-id="${htmlId(d.id)}">
      <h3>${esc(d.nombre || "Documento")}</h3>
      <p>${esc(d.tipo || "")} · ${esc(d.estado || "")}</p>
      <p>${esc(d.empresa || d.alumno || "General")} · ${esc(d.fecha || "")}</p>
      <p>${esc(d.notas || "")}</p>
      <div class="doc-actions">
        <button type="button" data-doc-action="preview" ${hasFile ? "" : "disabled"}>Previsualizar</button>
        <button type="button" data-doc-action="download" ${hasFile ? "" : "disabled"}>Descargar</button>
        <button type="button" data-doc-action="edit">Modificar</button>
        <button type="button" data-doc-action="replace">Reemplazar archivo</button>
        <button type="button" data-doc-action="delete">Eliminar</button>
      </div>
    </article>`;
  }
  window.docCard = docCard = docCardSafe;

  function bindDocButtons(){
    document.querySelectorAll("#documentos [data-doc-action]").forEach(btn => {
      btn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const card = btn.closest("[data-doc-id]");
        const id = card?.dataset?.docId;
        const doc = byId(id);
        if(!doc) return alert("No se encontró el documento.");
        const action = btn.dataset.docAction;
        if(action === "preview") return window.previewAnyFile(doc, doc.nombre || "Documento");
        if(action === "download"){
          try{
            const url = await docUrl(doc);
            if(!url) return alert("No se encontró la ruta del archivo.");
            const a = document.createElement("a");
            a.href = url;
            a.target = "_blank";
            a.rel = "noopener";
            a.download = (docFile(doc)?.name || doc.nombre || "documento");
            document.body.appendChild(a);
            a.click();
            a.remove();
          }catch(error){ alert("No se pudo descargar el documento:\n\n" + (error?.message || error)); }
          return;
        }
        if(action === "edit") return editDoc(id);
        if(action === "replace") return replaceDoc(id);
        if(action === "delete") return delDoc(id);
      });
    });
  }

  const oldRenderDocumentos = renderDocumentos;
  renderDocumentos = function(){
    try{
      const q = document.querySelector("#docSearch")?.value?.toLowerCase() || "";
      const t = document.querySelector("#docTypeFilter")?.value || "Todos";
      const folders = Array.isArray(state.carpetas) ? state.carpetas : [];
      const docs = (state.documentos || []).filter(d =>
        (activeFolder === "all" || (!d.carpeta && activeFolder === "sin") || String(d.carpeta) === String(activeFolder)) &&
        (!q || JSON.stringify(d).toLowerCase().includes(q)) &&
        (t === "Todos" || d.tipo === t)
      );
      const root = document.querySelector("#documentos");
      if(!root) return;
      root.innerHTML = pageHead("Documentos", "Documentos", "Archivo con carpetas y previsualización") + `
        <section class="doc-layout">
          <aside class="card table-card folders">
            <div class="section-head"><div><p>Carpetas</p><h3>Archivo</h3></div></div>
            <form class="form-grid" id="folderCreateForm"><input id="folderName" placeholder="Nueva carpeta" required><button class="primary">Crear</button></form>
            <div class="folder-list">${folders.map(f => `<div class="folder ${String(activeFolder) === String(f.id) ? "active" : ""}" data-folder-id="${htmlId(f.id)}">
              <span>📁 ${esc(f.nombre)}</span>
              <div class="folder-actions">
                <b>${(state.documentos || []).filter(d => f.id === "all" || (!d.carpeta && f.id === "sin") || String(d.carpeta) === String(f.id)).length}</b>
                ${!["all","sin"].includes(String(f.id)) ? `<button type="button" data-folder-action="edit">✎</button><button type="button" data-folder-action="delete">×</button>` : ""}
              </div>
            </div>`).join("")}</div>
          </aside>
          <main>
            <section class="card table-card">
              <div class="section-head"><div><p>Subir</p><h3>Nuevo documento</h3></div></div>
              <form class="form-grid" id="docUploadForm">
                <input id="docNombre" placeholder="Nombre visible">
                <select id="docCarpeta">${folders.filter(f => !["all","sin"].includes(String(f.id))).map(f => `<option value="${htmlId(f.id)}">${esc(f.nombre)}</option>`).join("")}</select>
                <select id="docTipo"><option>convenio firmado</option><option>DNI/NIF</option><option>seguro</option><option>acuerdo formativo</option><option>evaluación</option><option>anexo de prácticas</option><option>cv</option><option>otro</option></select>
                <select id="docEmpresa"><option value="">Sin empresa</option>${(state.empresas || []).map(e => `<option>${esc(e.nombre)}</option>`).join("")}</select>
                <select id="docAlumno"><option value="">Sin alumno</option>${(state.alumnos || []).map(a => `<option>${esc(a.nombre)}</option>`).join("")}</select>
                <select id="docEstado"><option>pendiente</option><option>para enviar</option><option>enviado</option><option>firmado</option><option>caducado</option></select>
                <input id="docFecha" type="date" value="${today()}">
                <input id="docUser" placeholder="Subido por">
                <label>Archivo<input id="docFile" type="file" required></label>
                <textarea id="docNotas" placeholder="Notas"></textarea>
                <button class="primary">Guardar documento</button>
              </form>
            </section>
            <section class="card table-card" style="margin-top:18px">
              <div class="toolbar"><input id="docSearch" placeholder="Buscar..." value="${esc(q)}"><select id="docTypeFilter"><option>Todos</option><option>convenio firmado</option><option>DNI/NIF</option><option>seguro</option><option>cv</option></select></div>
              <div class="doc-grid">${docs.map(docCardSafe).join("") || "<p>No hay documentos.</p>"}</div>
            </section>
          </main>
        </section>`;
      const typeSel = document.querySelector("#docTypeFilter");
      if(typeSel) typeSel.value = t;
      document.querySelector("#docSearch")?.addEventListener("input", renderDocumentos);
      typeSel?.addEventListener("change", renderDocumentos);
      document.querySelector("#docUploadForm")?.addEventListener("submit", addDoc);
      document.querySelector("#folderCreateForm")?.addEventListener("submit", addFolder);
      document.querySelectorAll("#documentos [data-folder-id]").forEach(el => {
        el.addEventListener("click", () => { activeFolder = el.dataset.folderId; renderDocumentos(); });
        el.querySelector('[data-folder-action="edit"]')?.addEventListener("click", ev => { ev.stopPropagation(); editFolder(el.dataset.folderId); });
        el.querySelector('[data-folder-action="delete"]')?.addEventListener("click", ev => { ev.stopPropagation(); deleteFolder(el.dataset.folderId); });
      });
      bindDocButtons();
    }catch(error){
      console.error("renderDocumentos 3.2.4", error);
      if(oldRenderDocumentos) oldRenderDocumentos();
    }
  };

  window.bloomPreviewDoc = function(id){
    const doc = byId(id);
    if(!doc) return alert("No se encontró el documento.");
    return window.previewAnyFile(doc, doc.nombre || "Documento");
  };

  window.BLOOM_CRM_BUILD = BUILD;
  console.info("Bloom CRM build", BUILD);
})();
