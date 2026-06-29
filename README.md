# Bloom CRM 3.0 reparado

Versión reconstruida desde cero para eliminar conflictos de parches anteriores.

Incluye:
- Dashboard completo.
- Pipeline de empresas con drag & drop y botones de movimiento.
- Calendario clicable con detalle por día.
- Empresas CRUD.
- Alumnos con foto, CV y ficha completa.
- Previsualización PDF, imagen y DOCX/Word.
- Convenios con anexos.
- Expedientes.
- Documentos con carpetas, subida, descarga, preview, reemplazo y eliminación.
- Seguimiento.
- Emails/plantillas.
- Reportes.
- Notificaciones.
- Supabase.
- Backup JSON.

Abre `index.html`.


## v3.1 — Carpetas editables en Documentos

En la pestaña Documentos ahora puedes:
- Modificar el nombre de una carpeta.
- Eliminar carpetas.
- Si una carpeta eliminada contiene documentos, los documentos pasan automáticamente a “Sin carpeta”.
- Las carpetas del sistema “Todas” y “Sin carpeta” no se pueden eliminar.


## v3.2 — Dashboard totalmente navegable

- Empresas sin contactar → Empresas filtradas.
- Convenios pendientes → Convenios filtrados.
- Alumnos sin empresa → Alumnos filtrados.
- Prácticas activas → Expedientes filtrados.
- Llamadas → Seguimiento filtrado por llamadas.
- Reuniones → Seguimiento filtrado por reuniones.
- Recordatorios → Agenda en el día correspondiente.
- Pipeline: clic en empresa abre Empresa 360.
- Calendario: clic en día abre agenda del día.
- Actividad reciente: abre empresa/alumno/sección relacionada.
- Documentos pendientes: abre previsualización del documento.


## v3.3 — Importar empresas desde Excel/CSV

En la pestaña Empresas se añade:
- Botón “Importar Excel/CSV”.
- Botón “Plantilla Excel”.
- Lectura de .xlsx, .xls y .csv.
- Vista previa antes de importar.
- Detección de empresas existentes por nombre.
- Opción para actualizar empresas existentes.
- Importación de campos:
  nombre_empresa, sector, subsector, ciudad, isla, web, fuente,
  acepta_practicas, tipo_practicas, ciclos_recomendados,
  contacto_nombre, contacto_email, contacto_telefono,
  estado_crm, prioridad y notas.


## v3.4 — Importar alumnos desde Excel/CSV

En la pestaña Alumnos se añade:
- Botón “Importar Excel/CSV”.
- Botón “Plantilla Excel”.
- Lectura de .xlsx, .xls y .csv.
- Vista previa antes de importar.
- Detección de alumnos existentes por email o nombre.
- Opción para actualizar alumnos existentes.
- Importación de campos:
  nombre_alumno, telefono, email, direccion, nss, estado, empresa, inicio, fin, tutor y notas.


## v3.5 — Limpiar centro de notificaciones

En el centro de notificaciones se añade el botón “Limpiar” para ocultar las revisiones actuales. Las nuevas revisiones o cambios volverán a aparecer automáticamente.


## v4.0 — Modificar y eliminar en todos los apartados

Se añaden controles de modificación y eliminación a los apartados donde todavía faltaban acciones completas:
- Documentos: modificar metadatos, reemplazar archivo y eliminar.
- Seguimiento: añadir, modificar y eliminar llamadas, emails, visitas, reuniones y tareas.
- Emails/plantillas: añadir, copiar, modificar y eliminar.
- Agenda: modificar o eliminar pendientes, seguimientos, convenios, documentos y expedientes asociados al día.
- Expedientes: acceso directo a ficha, modificación y eliminación del expediente/alumno.
- Reportes: guardar reportes, modificar nombre y eliminar reportes guardados.
- Notificaciones: marcar individualmente como resuelta y limpiar el centro completo.
- Ajustes: restaurar datos de ejemplo además de backup y nube.
