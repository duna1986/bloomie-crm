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


## v4.1 — Emails con previsualización y adjuntos

En la pestaña Emails se añade:
- Botón “Previsualizar” para ver asunto, cuerpo e imágenes antes de copiar o enviar manualmente.
- Campo para adjuntar imágenes y documentos a cada plantilla.
- Descarga y vista previa de adjuntos desde la plantilla.
- Modificación y eliminación de adjuntos guardados.

## v4.2 — Tareas completables y curso del alumno

- En Seguimiento y Agenda se añade la opción **Completar** tarea.
- Las tareas completadas pueden **reabrirse**.
- El contador de recordatorios activos solo cuenta pendientes no completados.
- En la ficha de Alumnos se añade el campo **Curso de procedencia**.
- La importación y la plantilla Excel de Alumnos incluyen la columna `curso`.
