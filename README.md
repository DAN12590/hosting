# Portfolio

Mi web personal, publicada con GitHub Pages: https://danapps.dev/

Está hecha con HTML, CSS y JavaScript sin frameworks ni dependencias, así que no hace falta instalar ni compilar nada. Para verla en local basta con abrir `index.html` en el navegador.

## Estructura

```
index.html            portada del portfolio
fuera-del-codigo.html página aparte con mis gustos (gata, LoL, gimnasio)
styles.css            estilos (variables en :root, luego cada sección en orden)
script.js             menú móvil, animaciones al hacer scroll, copiar email y repos de GitHub
favicon.svg
img/                  fotos de la sección "Fuera del código", en webp para que pesen poco
```

Los proyectos tienen su propia web en un subdominio, publicada desde su repo:

- https://pdf-viewer.danapps.dev/ ([PDF-photo-viewer](https://github.com/DAN12590/PDF-photo-viewer))
- https://warframe-checker.danapps.dev/ ([Warframe-Primes-checker](https://github.com/DAN12590/Warframe-Primes-checker))

## Algunas decisiones

- **Repos en vivo.** La sección "Actividad reciente" pide los repos a la API pública de GitHub. Si la API no responde en 6 segundos o se ha pasado el límite de peticiones, se muestra una lista guardada en el propio `script.js`, para que la sección nunca se quede vacía.
- **Sin `innerHTML` con datos externos.** Las tarjetas de los repos se crean con `createElement` y `textContent`, así ningún texto que venga de la API puede meter HTML en la página.
- **IntersectionObserver** para las animaciones de entrada y para marcar en el menú la sección actual, en lugar de escuchar el evento `scroll`.
- **Accesibilidad:** enlace para saltar al contenido, `aria-expanded` en el menú, foco visible con teclado y respeto a `prefers-reduced-motion`.
- Si JavaScript está desactivado, la clase `no-js` hace que todo el contenido se vea igual, solo que sin animaciones.
