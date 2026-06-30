# Bloom CRM 4.0 — Profesional privado

Esta versión migra Bloom CRM hacia una arquitectura profesional:

- Pantalla de login obligatoria antes de acceder al CRM.
- Registro e inicio de sesión con Supabase Auth.
- Datos separados por tablas: empresas, alumnos, convenios, documentos, carpetas, seguimientos, emails y actividad.
- RLS por `owner_id = auth.uid()`.
- Bucket de Storage privado.
- Documentos con Signed URLs temporales.
- Sin usar `localStorage` como origen principal de datos.
- Sin JSON gigante único.
- Cada entidad se guarda por separado.

## Pasos obligatorios en Supabase

1. Ve a Authentication > Providers > Email y activa Email.
2. Abre la app, entra en Ajustes y descarga `bloom-crm-4-schema-privado.sql`.
3. Ejecuta ese SQL en Supabase SQL Editor.
4. Vuelve a la app, crea cuenta o inicia sesión.
5. A partir de ahí los datos y documentos se guardan de forma privada por usuario.

## Importante

GitHub Pages solo sirve la app. La privacidad real la garantiza Supabase con Auth + RLS + Storage privado.
