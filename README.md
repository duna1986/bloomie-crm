# Bloom CRM 5.0 — Base limpia privada

Reescritura desde cero para evitar conflictos de parches.

Incluye:
- Login obligatorio con Supabase Auth.
- Tablas normalizadas por entidad.
- RLS por usuario.
- Storage privado con signed URLs.
- Empresas, Alumnos con DNI, Prácticas, Convenios, Documentos, Seguimiento, Agenda, Emails, Reportes.
- Importar/exportar Excel en Empresas y Alumnos.
- Documentos en Storage privado, no en JSON gigante.
- Dashboard, pipeline arrastrable y estética Bloom.

## Configuración

1. Sube los archivos a GitHub Pages.
2. Abre la web.
3. Crea cuenta o inicia sesión.
4. En Ajustes descarga el SQL.
5. Ejecuta el SQL en Supabase SQL Editor.
6. Recarga la web.

Sin ejecutar el SQL, la app no podrá cargar/guardar tablas.
