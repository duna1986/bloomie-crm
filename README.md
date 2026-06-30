# Bloom CRM 5.0 — base limpia profesional

Versión reescrita desde cero para evitar los conflictos de los parches anteriores.

## Incluye
- Login obligatorio antes de ver el CRM.
- Supabase Auth.
- Datos por tablas: empresas, alumnos, prácticas, convenios, expedientes, documentos, seguimiento, emails, reportes.
- Storage privado para documentos.
- Signed URLs temporales.
- Importar/exportar Excel en Empresas y Alumnos.
- Campo DNI/NIE en Alumnos.
- Pestaña Prácticas restaurada.
- Dashboard navegable.
- Pipeline con drag & drop.
- Calendario clicable.
- Documentos con carpetas editables.
- Sin localStorage como fuente principal.

## Instalación Supabase
1. Sube los archivos a GitHub Pages.
2. Abre Bloom CRM.
3. Crea cuenta o inicia sesión.
4. Ve a Ajustes > Descargar SQL completo.
5. Ejecuta el SQL en Supabase SQL Editor.
6. Recarga la app.

## Nota
GitHub Pages solo sirve la web. La privacidad la garantiza Supabase Auth + RLS + Storage privado.


## v5.1 — Login corregido

Cambios:
- El login ya no se queda permanentemente en “Entrando...”.
- Si el usuario inicia sesión pero aún no existen las tablas privadas, la app entra en Ajustes para descargar el SQL.
- Añadido botón “Probar conexión” en la pantalla de login.
- Añadido botón “Descargar SQL” directamente en login.
- Mejorados mensajes de error:
  - credenciales incorrectas
  - email sin confirmar
  - tablas privadas pendientes
- Corregido un typo interno en la exportación de empresas.
