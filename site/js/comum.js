/* Funções partilhadas: ícones, cartões, menu, contactos e rodapé.
   Este site usa JavaScript normal: não necessita de bibliotecas. */
"use strict";

const FB = {
  // Escapa texto antes de o colocar em HTML, incluindo texto vindo da pesquisa.
  texto(valor) {
    return String(valor ?? "").replace(
      /[&<>"']/g,
      (letra) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[letra],
    );
  },

  normalizar(valor) {
    return String(valor)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  },

  icone(nome, classe = "") {
    const caminhos = {
      seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
      baixo: '<path d="M12 4v16M6 14l6 6 6-6"/>',
      cima: '<path d="M12 20V4M6 10l6-6 6 6"/>',
      anterior: '<path d="m14 6-6 6 6 6"/>',
      seguinte: '<path d="m10 6 6 6-6 6"/>',
      fechar: '<path d="m6 6 12 12M6 18 18 6"/>',
      menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
      email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
      telefone:
        '<path d="M21 16v3a2 2 0 0 1-2.2 2A18 18 0 0 1 3 5.2 2 2 0 0 1 5 3h3l2 5-2 2a12 12 0 0 0 6 6l2-2Z"/>',
      local:
        '<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
      pesquisa: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
      grelha:
        '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
      lista: '<path d="M9 5h12M9 12h12M9 19h12M3 5h1M3 12h1M3 19h1"/>',
      estrela: '<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"/>',
      ampliar: '<path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5"/>',
    };
    return `<svg class="icon ${FB.texto(classe)}" viewBox="0 0 24 24" aria-hidden="true">${caminhos[nome] || caminhos.seta}</svg>`;
  },

  cartao(projeto) {
    const t = FB.texto;
    return `<a class="project-card" href="projeto.html?slug=${encodeURIComponent(projeto.slug)}">
      <div class="project-image"><img src="${t(projeto.img)}" alt="${t(projeto.name)}" width="700" height="580" loading="lazy">
        <span class="project-open">${FB.icone("diagonal")}</span></div>
      <div class="project-copy"><div class="project-meta"><span>${t(projeto.category)}</span><span>${t(projeto.year)}</span></div>
        <h3>${t(projeto.name)}</h3><p>${t(projeto.desc)}</p>
        <span class="project-location">${FB.icone("local")}${t(projeto.location)}</span>
      </div></a>`;
  },

  // Função sem efeitos externos: utilizada pelo formulário e pelos testes.
  prepararEmail(dados) {
    const assunto = dados.subject.trim();
    const corpo = `Nome: ${dados.name.trim()}\nEmail: ${dados.email.trim()}\nTelefone: ${dados.phone.trim() || "Não indicado"}\n\n${dados.message.trim()}`;
    return {
      corpo,
      href: `mailto:${CONTEUDO.empresa.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`,
    };
  },

  filtrarProjetos({ q = "", cat = "Todos", sort = "recentes" }) {
    const pesquisa = FB.normalizar(q);
    return CONTEUDO.projetos
      .filter((projeto) => {
        const campos = [
          projeto.name,
          projeto.desc,
          projeto.category,
          projeto.location,
          projeto.scope,
          ...projeto.services,
        ];
        return (
          (cat === "Todos" || projeto.category === cat) &&
          FB.normalizar(campos.join(" ")).includes(pesquisa)
        );
      })
      .sort((a, b) =>
        sort === "populares" ? b.popularity - a.popularity : b.sortDate.localeCompare(a.sortDate),
      );
  },
};

// Ícones de elementos estáticos: basta escrever data-icone="nome" no HTML.
document.querySelectorAll("[data-icone]").forEach((elemento) => {
  elemento.innerHTML = FB.icone(elemento.dataset.icone);
});

// Os contactos repetidos são atualizados a partir de um único local.
document.querySelectorAll("[data-empresa]").forEach((elemento) => {
  const campo = elemento.dataset.empresa;
  elemento.textContent = CONTEUDO.empresa[campo] || "";
  if (elemento.tagName === "A" && campo === "email")
    elemento.href = `mailto:${CONTEUDO.empresa.email}`;
  if (elemento.tagName === "A" && campo === "telefone")
    elemento.href = `tel:${CONTEUDO.empresa.telefoneLink}`;
});
document.querySelectorAll("[data-ano]").forEach((elemento) => {
  elemento.textContent = new Date().getFullYear();
});

// O logótipo também está no HTML, para aparecer antes do JavaScript carregar.
// Aqui sincronizamos o caminho se for alterado no ficheiro de conteúdo.
if (CONTEUDO.empresa.logo) {
  document.querySelectorAll(".brand-image").forEach((imagem) => {
    imagem.src = CONTEUDO.empresa.logo;
    imagem.alt = `${CONTEUDO.empresa.nome} — Produção Cultural`;
  });
}
document.querySelectorAll("[data-redes]").forEach((elemento) => {
  elemento.innerHTML = CONTEUDO.empresa.redesSociais
    .filter((rede) => /^https:\/\//.test(rede.url))
    .map(
      (rede) =>
        `<a href="${FB.texto(rede.url)}" target="_blank" rel="noopener noreferrer">${FB.texto(rede.nome)} ↗</a>`,
    )
    .join("");
});

// Navegação móvel: fecha por Escape, por clique fora ou ao escolher uma secção.
const cabecalho = document.querySelector(".site-header");
const botaoMenu = document.querySelector(".menu-toggle");
if (cabecalho && botaoMenu) {
  function definirMenu(aberto, devolverFoco = false) {
    cabecalho.dataset.menuOpen = String(aberto);
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    if (devolverFoco) botaoMenu.focus();
  }
  botaoMenu.addEventListener("click", () => definirMenu(cabecalho.dataset.menuOpen !== "true"));
  cabecalho
    .querySelectorAll("nav a")
    .forEach((link) => link.addEventListener("click", () => definirMenu(false)));
  document.addEventListener("click", (evento) => {
    if (!cabecalho.contains(evento.target)) definirMenu(false);
  });
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && cabecalho.dataset.menuOpen === "true") definirMenu(false, true);
  });
  window.matchMedia("(min-width: 801px)").addEventListener("change", () => definirMenu(false));
}

const topo = document.querySelector(".back-top");
if (topo) {
  const atualizarTopo = () => {
    topo.hidden = window.scrollY < 600;
  };
  window.addEventListener("scroll", atualizarTopo, { passive: true });
  atualizarTopo();
}
