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

## v4.3 — Detalle contextual de tareas

En Seguimiento y Agenda ahora las tareas de llamada, email o visita son clicables.
Al abrir una tarea se muestra la información relevante para actuar: empresa, contacto, teléfono, email, ubicación, alumnado vinculado, convenio, documentos y últimos seguimientos.
También se añaden accesos rápidos para llamar, enviar correo o abrir la ubicación en Google Maps cuando existen datos suficientes.


## v4.4 — Botones de tareas corregidos

- El botón Completar ya no depende de imágenes externas ni queda como rectángulo blanco.
- Se añaden iconos integrados a Ver acción, Completar, Reabrir, Modificar y Eliminar.
- Las tareas completadas se muestran tachadas y con estado visual verde.

## v4.5 — Previsualización de convenios y documentos adjuntos

En la pestaña Convenios se añade:
- Botón “Ver” para abrir una previsualización completa del convenio.
- Resumen de datos del convenio, empresa, contacto, alumnado vinculado y seguimientos relacionados.
- Listado de documentos adjuntos con previsualización, descarga, modificación y opción de quitar del convenio.
- Adjuntar documentos existentes del archivo documental al convenio.


## v4.6 — Pestaña Prácticas

Se añade una pestaña independiente **Prácticas** con:
- Listado de alumnos actualmente en prácticas.
- KPIs de prácticas activas, empresas, documentos y tareas pendientes.
- Ficha rápida de cada alumno en prácticas con empresa, tutor, fechas, documentos y tareas.
- Acción para marcar las prácticas como finalizadas.


## Bloom CRM 3.0 profesional sobre estos archivos

Esta entrega se ha aplicado sobre los archivos que subiste (`index.html`, `script.js`, `style.css`, `README.md`, `manifest.webmanifest` y la flor).

Cambios principales:
- Login obligatorio con Supabase Auth.
- Registro, enlace mágico y recuperación de contraseña.
- Datos privados por usuario.
- Eliminado `bloom_crm_backups` como arquitectura principal.
- Nuevas tablas normalizadas:
  - bloom_profiles
  - bloom_empresas
  - bloom_alumnos
  - bloom_convenios
  - bloom_expedientes
  - bloom_carpetas
  - bloom_documentos
  - bloom_seguimientos
  - bloom_recordatorios
  - bloom_notificaciones
  - bloom_email_templates
  - bloom_reportes
- RLS en todas las tablas.
- Storage privado `bloom-crm-documents`.
- Documentos reales en Storage.
- Signed URLs para abrir documentos privados.
- La estética Bloom y la flor enviada se mantienen.

### Instalación Supabase

1. Ve a Authentication > URL Configuration:
   - Site URL: `https://duna1986.github.io/bloomie-crm/`
   - Redirect URLs:
     - `https://duna1986.github.io/bloomie-crm/`
     - `http://localhost:3000`

2. Ejecuta `supabase/schema.sql` en SQL Editor.

3. Sube los archivos del ZIP a GitHub Pages.


## Mejora funcional consolidada — empresas y alumnos

Aplicada sobre los archivos subidos en esta conversación.

Incluye:
- Edición real de empresas sin tener que reescribir todos los campos.
- Carga correcta de datos importados desde Excel y datos guardados en `data`.
- Eliminación del campo “ciclos recomendados” del formulario de empresas.
- Clic sobre una empresa para abrir ficha 360 completa.
- Clic sobre un alumno para abrir ficha completa.
- DNI/NIE en alumnos:
  - tabla,
  - formulario,
  - ficha completa,
  - búsqueda,
  - exportación/importación cuando las funciones están disponibles.
- Fichas completas con empresa, documentos, seguimiento y observaciones.


## v3.0 — Importar y exportar XML

Añadido en las pestañas **Empresas** y **Alumnos**:

- Botón **Importar XML**.
- Botón **Exportar XML**.
- Exportación estructurada:
  - `bloom_empresas.xml`
  - `bloom_alumnos.xml`
- Importación con vista previa.
- Actualización de registros existentes si coinciden por:
  - ID,
  - nombre,
  - email,
  - DNI en alumnos.
- Compatible con XML tipo:

```xml
<bloom>
  <empresas>
    <empresa>
      <nombre>Empresa ejemplo</nombre>
      <sector>Sanidad</sector>
    </empresa>
  </empresas>
</bloom>
```

y

```xml
<bloom>
  <alumnos>
    <alumno>
      <nombre>Alumno ejemplo</nombre>
      <dni>12345678Z</dni>
    </alumno>
  </alumnos>
</bloom>
```


## v3.0 — Importar y exportar Excel funcional

Añadido/reparado en **Empresas** y **Alumnos**:

- Importar Excel `.xlsx`, `.xls` y `.csv`.
- Exportar Excel `.xlsx`.
- Descargar plantilla Excel Base.
- Vista previa antes de importar.
- Actualización de registros existentes si coinciden por:
  - ID,
  - nombre,
  - email,
  - DNI en alumnos.
- Plantillas incluidas en:
  - `templates/plantilla_empresas_bloom.xlsx`
  - `templates/plantilla_alumnos_bloom.xlsx`

Las plantillas incluyen hoja de instrucciones, listas desplegables y fila de ejemplo.


## Fix final — miniatura de foto del alumno

Aplicado sobre los archivos subidos en esta versión.

Corrige que en la tabla de Alumnos aparezca la inicial en lugar de la foto.

Ahora el cuadrado de la lista carga la imagen real desde:
- `foto.data`
- `foto.url`
- `foto_url`
- `foto_path`
- `foto.path`
- Supabase Storage privado mediante Signed URL temporal.

También añade:
- previsualización instantánea al elegir una foto en el formulario,
- foto recortada con `object-fit: cover`,
- fallback a iniciales solo si no existe fotografía.


## Fix — click, ficha y edición de alumno

Se corrige el problema introducido por el fix de miniaturas:

- Al pinchar sobre un alumno vuelve a abrirse la ficha completa.
- El botón Editar vuelve a abrir el formulario.
- El botón Eliminar funciona con IDs numéricos o de texto.
- La foto sigue apareciendo en el cuadrado de la tabla.
- Se mantiene compatibilidad con foto en Base64 y Supabase Storage privado.


## Fix — sincronización casa/trabajo y borrado definitivo

Se corrige el problema de empresas duplicadas y registros que reaparecen tras eliminarlos.

Cambios:
- La carga desde Supabase sustituye la copia local.
- Al eliminar una empresa se ejecuta `DELETE` real en Supabase.
- Al eliminar un alumno se ejecuta `DELETE` real en Supabase.
- Se limpian duplicados por nombre de empresa.
- Se limpian duplicados de alumnos por DNI, email o nombre.
- `localStorage` queda como caché local, no como origen principal.
- Añadidos botones:
  - Recargar desde nube.
  - Limpiar caché local.
  - Limpiar duplicados.
  - Guardar ahora.

Recomendación:
- Al cambiar de casa a trabajo o de trabajo a casa, entra en Ajustes y pulsa **Recargar desde nube**.
- Si ves información antigua, pulsa **Limpiar caché local**.


## Fix — visualización de alumnos

Corrige la vista de la tabla de alumnos:

- La foto ya no muestra texto roto dentro del círculo.
- Si la imagen no carga, se muestran iniciales limpias.
- La tabla usa columnas estables.
- Los botones Modificar, Ver ficha y Eliminar ya no se salen de la tabla.
- La fila completa sigue abriendo la ficha del alumno.


## Mejora — Alumnos CRM profesional

Se reconstruye visualmente la pestaña Alumnos:

- Vista tipo CRM con tarjetas profesionales.
- Foto real en miniatura grande.
- Fallback a iniciales si no hay foto o si la imagen falla.
- Compatible con fotos en Base64 y Supabase Storage privado.
- KPIs superiores: total, sin empresa, en prácticas y con CV.
- Datos visibles: DNI, NSS, teléfono, email, curso, empresa y estado.
- Indicador de progreso de prácticas.
- Botones: Ver ficha, Editar, Eliminar, Foto y CV.
- Clic en toda la tarjeta abre la ficha del alumno.


## Bloom CRM 3.1 — Alumno 360, fotos y sincronización

Entrega consolidada sobre los archivos actuales.

Incluye:
- Miniaturas reales de alumnos en la pestaña Alumnos.
- Compatible con fotos en Base64, URL pública y Supabase Storage privado.
- Signed URLs con caché temporal para evitar imágenes rotas.
- Ficha Alumno 360 rediseñada.
- Foto grande en la ficha.
- Cambio de foto directamente desde la ficha.
- Edición robusta de alumnos.
- Previsualización de currículum y documentos privados.
- Eliminación definitiva de empresas y alumnos en Supabase.
- Limpieza de duplicados.
- Botones en Ajustes:
  - Recargar desde nube.
  - Limpiar caché local.
  - Limpiar duplicados.
  - Guardar ahora.

Recomendación de uso:
- Al cambiar entre casa y trabajo, entra en Ajustes y pulsa **Recargar desde nube**.
- Si ves datos antiguos, pulsa **Limpiar caché local**.
