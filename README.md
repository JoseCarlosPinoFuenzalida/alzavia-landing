# Alzavía — landing page

Landing page estática (HTML/CSS/JS puro, sin build, sin base de datos) para el
servicio de optimización de Google Business Profile y SEO local de Alzavía en
Santiago de Chile.

## Estructura

```
alzavia-landing/
├── index.html        # Toda la página (inicio, servicios, casos de éxito, cotización, contacto)
├── css/styles.css     # Estilos (línea editorial minimalista)
├── js/script.js       # Menú móvil, scroll reveal, envío del formulario
└── README.md
```

No requiere `npm install` ni build: es HTML/CSS/JS estático, listo para
hostear en Vercel (o cualquier hosting estático) tal cual.

## Antes de publicar — pendientes

1. **Conectar el formulario de cotización a Formspree**
   - Crea una cuenta gratis en [formspree.io](https://formspree.io).
   - Crea un formulario nuevo y copia su endpoint (`https://formspree.io/f/xxxxxxx`).
   - En `index.html`, busca `YOUR_FORM_ID` dentro del `<form id="quoteForm" ...>`
     y reemplázalo por tu ID real.
   - Mientras no hagas este cambio, el formulario avisa en pantalla que no
     está conectado (no falla en silencio).

2. **Casos de éxito**
   - La sección `#casos` está en modo "en construcción" a propósito (sin
     testimonios ni cifras inventadas).
   - Cuando tengas tu primer cliente real, en `index.html` busca el comentario
     `PLANTILLA` dentro de la sección `#casos`, descoméntalo, complétalo con
     datos reales y quita (o dejar oculto) el bloque `.cases-empty`.

3. **Redes sociales**
   - Los íconos de redes están comentados en `index.html` (sección `#contacto`)
     para no mostrar enlaces rotos. Cuando existan las cuentas, descomenta el
     bloque `.social-links` y reemplaza cada `href="#"` por la URL real.

4. **Teléfono / WhatsApp**
   - A propósito **no aparece en ningún lugar del sitio** (ni en HTML, ni en
     metadatos, ni en botones), porque es de uso exclusivo para clientes ya
     confirmados. No lo agregues al código público.

5. **Precios**
   - No se publican montos exactos. Si en el futuro decides mostrar una
     referencia, hazlo siempre en formato "desde" (nunca un rango cerrado) —
     hay una nota comentada en `index.html`, sección `#servicios`, lista para
     descomentar si lo decides.

## Deploy en Vercel (gratis)

1. Sube esta carpeta a un repositorio de GitHub (ver más abajo).
2. Entra a [vercel.com](https://vercel.com) → **Add New → Project**.
3. Importa el repositorio `alzavia-landing`.
4. Framework preset: **Other** (o "No Framework"). No hace falta configurar
   build command ni output directory — Vercel sirve `index.html` tal cual.
5. Deploy. Vercel te da una URL `https://alzavia-landing.vercel.app` (puedes
   agregar un dominio propio después, gratis, desde el panel del proyecto).

## Actualizar el sitio más adelante

Cualquier cambio de texto, precios o casos de éxito se hace editando
`index.html` directamente (no hay CMS ni base de datos). Cada vez que subas
un cambio a la rama principal del repo conectado a Vercel, el sitio se
vuelve a desplegar automáticamente.
