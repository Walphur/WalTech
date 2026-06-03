# Mi Portafolio

Una página web simple y moderna para mostrar todos tus proyectos: los que ya hiciste y los que vendrán.

## Cómo verla

Hacé doble clic en `index.html` y se abre en tu navegador. Eso es todo, no necesita instalar nada.

## Cómo agregar o editar proyectos

Todo se edita desde un solo archivo: **`script.js`** (arriba de todo).

### Agregar un proyecto nuevo

Copiá y pegá este bloque dentro de la lista `PROYECTOS` y cambiá los valores:

```js
{
  titulo: "Nombre del proyecto",
  descripcion: "Qué hace y por qué lo hiciste.",
  estado: "completado",        // o "proximo"
  icono: "🚀",                  // cualquier emoji
  tags: ["HTML", "CSS"],
  links: [
    { texto: "Ver demo", url: "https://..." },
    { texto: "Código", url: "https://..." }
  ],
},
```

- **estado**: `"completado"` (verde) o `"proximo"` (amarillo).
- **links**: si no tenés link todavía, dejá la lista vacía: `links: []`.

### Cambiar tus datos personales

En el mismo archivo, arriba, está el bloque `PERFIL` para tu nombre, tus habilidades y tus formas de contacto.

## Archivos

- `index.html` — estructura de la página.
- `styles.css` — diseño y colores.
- `script.js` — tus datos y la lógica (lo único que vas a tocar normalmente).

## Publicarla gratis en internet

Cuando quieras que sea pública, se puede subir gratis a **GitHub Pages**, **Cloudflare Pages** o **Netlify**. Avisá y lo configuramos.
