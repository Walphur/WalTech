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
  skills: ["HTML", "CSS", "JavaScript", "Diseño web", "Ideas nuevas"],
  contactos: [
    { texto: "Email", url: "mailto:tucorreo@ejemplo.com" },
    { texto: "GitHub", url: "https://github.com/tuusuario" },
    { texto: "LinkedIn", url: "https://linkedin.com/in/tuusuario" },
  ],
};

const PROYECTOS = [
  {
    titulo: "Mi primer proyecto",
    descripcion:
      "Una breve descripción de qué hace este proyecto y por qué lo construiste.",
    estado: "completado",
    icono: "🚀",
    tags: ["HTML", "CSS", "JavaScript"],
    links: [
      { texto: "Ver demo", url: "" },
      { texto: "Código", url: "" },
    ],
  },
  {
    titulo: "App de tareas",
    descripcion:
      "Una aplicación simple para organizar tareas del día a día con recordatorios.",
    estado: "completado",
    icono: "✅",
    tags: ["JavaScript", "LocalStorage"],
    links: [{ texto: "Ver demo", url: "" }],
  },
  {
    titulo: "Tienda online",
    descripcion:
      "Un proyecto que estoy planeando: una tienda con carrito y pagos.",
    estado: "proximo",
    icono: "🛒",
    tags: ["React", "Pagos"],
    links: [],
  },
  {
    titulo: "Juego web",
    descripcion:
      "Próximamente: un mini juego en el navegador para practicar lógica.",
    estado: "proximo",
    icono: "🎮",
    tags: ["Canvas", "JavaScript"],
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

  return `
    <article class="card">
      <div class="card__top">
        <div class="card__icon">${p.icono || "📦"}</div>
        <span class="badge badge--${p.estado}">${etiqueta}</span>
      </div>
      <h3 class="card__title">${p.titulo}</h3>
      <p class="card__desc">${p.descripcion}</p>
      <div class="card__tags">${tags}</div>
      ${links ? `<div class="card__links">${links}</div>` : ""}
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
