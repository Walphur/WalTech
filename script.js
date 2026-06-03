/* =====================================================================
   TUS DATOS — Editá todo desde acá. No hace falta tocar nada más.
   =====================================================================

   Para AGREGAR un proyecto, copiá un bloque { ... } y cambiá los valores.
   estado puede ser: "completado"  o  "proximo"
   icono: cualquier emoji que te guste 🚀 🎮 📱 🛒 🤖 🎨
   links: poné los que tengas; si no tenés, dejá el texto vacío ""
======================================================================= */

const PERFIL = {
  nombre: "Waltech",
  skills: ["JavaScript", "TypeScript", "React / Next.js", "Node.js", "HTML / CSS", "Supabase"],
  contactos: [
    { texto: "GitHub", url: "https://github.com/Walphur" },
    { texto: "Email", url: "mailto:juancruz.gagliano@gmail.com" },
  ],
};

const PROYECTOS = [
  {
    titulo: "ARC-IA",
    descripcion:
      "SaaS para estudios de arquitectura: cómputo de obra, terrenos e instalaciones con auditoría visual e IA.",
    estado: "completado",
    icono: "🤖",
    tags: ["IA", "SaaS", "Full-stack"],
    links: [
      { texto: "Ver sitio", url: "https://arq-ia.pro" },
      { texto: "Código", url: "https://github.com/Walphur/ARQ-IA" },
    ],
  },
  {
    titulo: "ActionSnap",
    descripcion:
      "Marketplace de fotografía deportiva: encontrá tus fotos por dorsal y compralas en HD al instante.",
    estado: "completado",
    icono: "📸",
    tags: ["Next.js", "Marketplace", "Supabase"],
    links: [
      { texto: "Ver sitio", url: "https://actionsnap.store/" },
      { texto: "Código", url: "https://github.com/Walphur/ActionSnap" },
    ],
  },
  {
    titulo: "Incognito",
    descripcion:
      "Juego de fiesta social: descubrí al impostor que no conoce la palabra secreta. Salas online en tiempo real, con modo voz y chat.",
    estado: "completado",
    icono: "🕵️",
    tags: ["Juego", "Multijugador", "Node.js"],
    links: [
      { texto: "Jugar", url: "https://incognitogame.online/" },
      { texto: "Código", url: "https://github.com/Walphur/Impostor-Arcane" },
    ],
  },
  {
    titulo: "MCV Oficial",
    descripcion:
      "Plataforma para un clan competitivo de Rust: torneos, tracker de jugadores, streams en vivo y administración.",
    estado: "completado",
    icono: "🎮",
    tags: ["JavaScript", "Web", "Gaming"],
    links: [
      { texto: "Ver sitio", url: "https://mcvoficial.com/" },
      { texto: "Código", url: "https://github.com/Walphur/MCVOFICIAL" },
    ],
  },
  {
    titulo: "GLUGLU 24/7",
    descripcion:
      "Sistema web para una expendedora de agua automática, disponible las 24 horas.",
    estado: "completado",
    icono: "💧",
    tags: ["JavaScript", "Web"],
    links: [
      { texto: "Ver sitio", url: "https://gluglu-24-7.onrender.com/" },
      { texto: "Código", url: "https://github.com/Walphur/GLUGLU-24-7" },
    ],
  },
  {
    titulo: "PrietaHogar",
    descripcion:
      "Sitio web institucional de PrietaHogar, hecho con HTML y CSS.",
    estado: "completado",
    icono: "🏠",
    tags: ["HTML", "CSS"],
    links: [
      { texto: "Ver sitio", url: "https://prietahogar.com.ar/" },
      { texto: "Código", url: "https://github.com/Walphur/prietahogar" },
    ],
  },
  {
    titulo: "Apps para kioscos y comercios",
    descripcion:
      "Punto de venta, control de stock y caja para kioscos y negocios de barrio. En camino.",
    estado: "proximo",
    icono: "🏪",
    tags: ["Negocios", "Punto de venta"],
    links: [],
  },
  {
    titulo: "Gestión para clínicas y consultorios",
    descripcion:
      "Turnos, historias clínicas y administración para clínicas y consultorios médicos. En camino.",
    estado: "proximo",
    icono: "🏥",
    tags: ["Salud", "Turnos"],
    links: [],
  },
  {
    titulo: "Soluciones para el sector público",
    descripcion:
      "Sistemas a medida para hospitales, municipios y organismos de gobierno. En camino.",
    estado: "proximo",
    icono: "🏛️",
    tags: ["Gobierno", "A medida"],
    links: [],
  },
];

/* =====================================================================
   De acá para abajo es la lógica. No necesitás editarlo.
======================================================================= */

const grid = document.getElementById("projectGrid");
const emptyState = document.getElementById("emptyState");
const filtersEl = document.getElementById("filters");
let filtroActual = "todos";

function obtenerPreview(p) {
  if (p.imagen) return p.imagen;
  const demo = (p.links || []).find(
    (l) => l.url && l.url.trim() !== "" && !l.url.includes("github.com")
  );
  if (!demo) return null;
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(
    demo.url
  )}?w=1024&h=640`;
}

function crearCard(p) {
  const links = (p.links || [])
    .filter((l) => l.url && l.url.trim() !== "")
    .map(
      (l) =>
        `<a href="${l.url}" target="_blank" rel="noopener">${l.texto} ↗</a>`
    )
    .join("");

  const tags = (p.tags || [])
    .map((t) => `<span class="tag">${t}</span>`)
    .join("");

  const etiqueta = p.estado === "completado" ? "Completado" : "Próximo";

  const preview = obtenerPreview(p);
  const media = preview
    ? `<img class="card__img" src="${preview}" alt="Vista previa de ${p.titulo}" loading="lazy" onload="this.classList.add('is-loaded')" onerror="this.remove();" />`
    : "";

  return `
    <article class="card">
      <div class="card__media">
        ${media}
        <span class="badge badge--${p.estado}">${etiqueta}</span>
      </div>
      <div class="card__body">
        <h3 class="card__title">${p.titulo}</h3>
        <p class="card__desc">${p.descripcion}</p>
        <div class="card__tags">${tags}</div>
        ${links ? `<div class="card__links">${links}</div>` : ""}
      </div>
    </article>
  `;
}

function render() {
  const lista =
    filtroActual === "todos"
      ? PROYECTOS
      : PROYECTOS.filter((p) => p.estado === filtroActual);

  grid.innerHTML = lista.map(crearCard).join("");
  emptyState.hidden = lista.length > 0;
}

filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  document
    .querySelectorAll(".filter")
    .forEach((b) => b.classList.remove("is-active"));
  btn.classList.add("is-active");
  filtroActual = btn.dataset.filter;
  render();
});

function renderStats() {
  const total = PROYECTOS.length;
  const completados = PROYECTOS.filter((p) => p.estado === "completado").length;
  const proximos = PROYECTOS.filter((p) => p.estado === "proximo").length;
  const stats = [
    { num: total, label: "Proyectos" },
    { num: completados, label: "Completados" },
    { num: proximos, label: "Por venir" },
  ];
  document.getElementById("heroStats").innerHTML = stats
    .map(
      (s) =>
        `<div class="stat"><div class="stat__num">${s.num}</div><div class="stat__label">${s.label}</div></div>`
    )
    .join("");
}

function renderPerfil() {
  document.querySelectorAll(".grad, .hero__title .grad").forEach((el) => {
    if (el.textContent.includes("tu nombre")) el.textContent = PERFIL.nombre;
  });

  document.getElementById("skills").innerHTML = PERFIL.skills
    .map((s) => `<li>${s}</li>`)
    .join("");

  document.getElementById("contactLinks").innerHTML = PERFIL.contactos
    .map(
      (c) =>
        `<a class="btn btn--ghost" href="${c.url}" target="_blank" rel="noopener">${c.texto}</a>`
    )
    .join("");
}

function initTema() {
  const toggle = document.getElementById("themeToggle");
  const guardado = localStorage.getItem("tema");
  if (guardado === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    toggle.textContent = "☀️";
  }
  toggle.addEventListener("click", () => {
    const esLight =
      document.documentElement.getAttribute("data-theme") === "light";
    if (esLight) {
      document.documentElement.removeAttribute("data-theme");
      toggle.textContent = "🌙";
      localStorage.setItem("tema", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      toggle.textContent = "☀️";
      localStorage.setItem("tema", "light");
    }
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
renderPerfil();
renderStats();
render();
initTema();
