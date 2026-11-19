# SECAP² Ingeniería · Sitio web

Sitio estático (HTML, CSS y JavaScript). No necesita instalar nada: abre `index.html` en el navegador.

## Estructura

```
index.html           Contenido de la página (3 áreas: Gasfitería, Construcción, Electricidad)
css/styles.css       Estilos
js/main.js           Cambio de área, formularios y envío por WhatsApp
assets/favicon.svg   Ícono de la pestaña
assets/img/trabajos/ Fotos de trabajos realizados
```

## Datos de contacto

Teléfono y WhatsApp: +56 9 6322 5763 · Correo: secapingenieria@gmail.com
Para cambiarlos, busca `56963225763` y `secapingenieria@gmail.com` en `index.html` y `js/main.js`.

## Agregar más fotos de trabajos

Ya hay 8 fotos colocadas (gasfitería y construcción). Los recuadros que siguen con "Espacio para foto" esperan más fotos.

1. Guarda la foto en `assets/img/trabajos/` (por ejemplo `calefont-01.jpg`).
2. En `index.html`, dentro de la sección "Trabajos realizados", reemplaza el bloque
   `<div class="ph">…</div>` por:
   `<img src="assets/img/trabajos/calefont-01.jpg" alt="Descripción del trabajo" loading="lazy">`

## Publicar

Sube toda la carpeta a cualquier hosting estático (Netlify, Vercel, GitHub Pages, etc.).
La fuente Manrope se carga desde Google Fonts, por lo que se necesita internet.
