/* Página de detalhe: escolhe o projeto pelo parâmetro ?slug= no endereço.
   Exemplo: projeto.html?slug=festival-de-musica */
"use strict";

const slug = new URLSearchParams(window.location.search).get("slug");
const projeto = CONTEUDO.projetos.find((item) => item.slug === slug);
const principal = document.querySelector("#conteudo");
const t = FB.texto;

if (!projeto) {
  document.title = "Projeto não encontrado — FreeBeats";
  const robots = document.createElement("meta");
  robots.name = "robots";
  robots.content = "noindex";
  document.head.append(robots);
  principal.innerHTML = `<section class="not-found"><p class="eyebrow accent">Projeto não encontrado</p><h1>Há outras histórias<br>por <span class="editorial accent">descobrir.</span></h1><p>O projeto que procura não está disponível.</p><a class="button" href="projetos.html">Ver todos os projetos ${FB.icone("seta")}</a></section>`;
} else {
  document.title = `${projeto.name} — FreeBeats Produção Cultural`;
  document.querySelector('meta[name="description"]').content = projeto.intro;
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[property="og:description"]').content = projeto.intro;

  // As imagens e os restantes textos estão concentrados em conteudo.js.
  const galeria = projeto.gallery.length ? projeto.gallery : [projeto.img];
  const outros = CONTEUDO.projetos.filter((item) => item.slug !== projeto.slug).slice(0, 3);
  const assuntoProjeto = `Projeto semelhante: ${projeto.name}`;
  const contacto = `index.html?assunto=${encodeURIComponent(assuntoProjeto)}#contactos`;

  principal.innerHTML = `
    <section class="detail-head"><div class="container">
      <nav class="breadcrumb" aria-label="Percurso"><a href="index.html">Início</a>${FB.icone("seguinte")}<a href="projetos.html">Projetos</a>${FB.icone("seguinte")}<span aria-current="page">${t(projeto.name)}</span></nav>
      <p class="eyebrow accent">${t(projeto.category)}</p><h1 class="page-title">${t(projeto.name)}</h1><p class="detail-intro">${t(projeto.intro)}</p>
    </div></section>
    <div class="container"><img class="detail-cover" src="${t(projeto.img)}" alt="${t(projeto.name)}" width="1400" height="700" fetchpriority="high">
      <dl class="detail-meta"><div><dt>Ano</dt><dd>${t(projeto.year)}</dd></div><div><dt>Local</dt><dd>${t(projeto.location)}</dd></div><div><dt>Público</dt><dd>${t(projeto.audience)}</dd></div><div><dt>Âmbito</dt><dd>${t(projeto.scope)}</dd></div></dl>
      <div class="detail-body"><section class="detail-content" aria-labelledby="sobre-projeto"><h2 id="sobre-projeto">Por dentro do <span class="editorial accent">projeto.</span></h2>
        ${projeto.content.map((paragrafo) => `<p>${t(paragrafo)}</p>`).join("")}
        <div class="highlights">${projeto.highlights.map((destaque) => `<div class="highlight"><strong>${t(destaque.title)}</strong><p>${t(destaque.desc)}</p></div>`).join("")}</div>
      </section><aside class="detail-aside"><h2>O que fizemos</h2><ul class="detail-services">${projeto.services.map((servico) => `<li>${t(servico)}</li>`).join("")}</ul>
        <h3>Tem um projeto <span class="editorial accent">semelhante?</span></h3><p>Vamos conversar. Desenhamos a produção do seu evento cultural de A a Z.</p><a class="button" href="${t(contacto)}">Pedir proposta ${FB.icone("diagonal")}</a><a class="aside-email" href="mailto:${t(CONTEUDO.empresa.email)}">${t(CONTEUDO.empresa.email)}</a>
      </aside></div>
    </div>
    <section class="section gallery-section" aria-labelledby="titulo-galeria"><div class="container">
      <div class="section-head"><div><p class="eyebrow accent">Galeria</p><h2 class="section-title" id="titulo-galeria">Momentos que <span class="editorial accent">ficam.</span></h2></div><div class="gallery-navigation"><button class="circle-button" id="galeria-anterior" type="button" aria-label="Fotografia anterior">${FB.icone("anterior")}</button><button class="circle-button" id="galeria-seguinte" type="button" aria-label="Fotografia seguinte">${FB.icone("seguinte")}</button></div></div>
      <div class="gallery-feature"><button class="gallery-open" id="abrir-galeria" type="button" aria-label="Ampliar fotografia"><img id="galeria-imagem" src="${t(galeria[0])}" alt="${t(projeto.name)} — fotografia 1" width="1400" height="900" loading="lazy"></button><span class="gallery-count" id="galeria-contador" aria-live="polite"></span><span class="gallery-expand">${FB.icone("ampliar")}</span></div>
      <div class="gallery-thumbs" id="miniaturas" role="group" aria-label="Escolher fotografia">${galeria.map((imagem, indice) => `<button class="gallery-thumb" type="button" data-imagem="${indice}" aria-label="Ver fotografia ${indice + 1}" aria-pressed="false"><img src="${t(imagem)}" alt="" width="350" height="195" loading="lazy"></button>`).join("")}</div>
    </div></section>
    <section class="section" aria-labelledby="outros-projetos"><div class="container"><div class="section-head"><div><p class="eyebrow accent">Continue a descobrir</p><h2 class="section-title" id="outros-projetos">Outros <span class="editorial accent">projetos.</span></h2></div><a class="text-link" href="projetos.html">Ver todos ${FB.icone("diagonal")}</a></div><div class="project-grid">${outros.map(FB.cartao).join("")}</div></div></section>
    <section class="project-cta"><div class="container"><div><h2>Vamos criar <span class="editorial accent">juntos?</span></h2><p>Da ideia à execução, a FreeBeats acompanha todo o ciclo do seu projeto cultural.</p></div><a class="button" href="${t(contacto)}">Falar com a equipa ${FB.icone("diagonal")}</a></div></section>`;

  let imagemAtual = 0;
  const modal = document.querySelector("#lightbox");
  const miniaturas = document.querySelector("#miniaturas");
  const imagemPrincipal = document.querySelector("#galeria-imagem");
  const imagemAmpliada = document.querySelector("#lightbox-imagem");
  document.querySelector("#lightbox-titulo").textContent = projeto.name;

  function mostrarImagem(indice) {
    imagemAtual = (indice + galeria.length) % galeria.length;
    const legenda = `${projeto.name} — fotografia ${imagemAtual + 1} de ${galeria.length}`;
    imagemPrincipal.src = galeria[imagemAtual];
    imagemPrincipal.alt = legenda;
    imagemAmpliada.src = galeria[imagemAtual];
    imagemAmpliada.alt = legenda;
    document.querySelector("#galeria-contador").textContent =
      `${imagemAtual + 1} / ${galeria.length}`;
    document.querySelector("#lightbox-contador").textContent =
      `${imagemAtual + 1} / ${galeria.length}`;
    miniaturas
      .querySelectorAll("button")
      .forEach((botao, numero) =>
        botao.setAttribute("aria-pressed", String(numero === imagemAtual)),
      );
  }
  function anterior() {
    mostrarImagem(imagemAtual - 1);
  }
  function seguinte() {
    mostrarImagem(imagemAtual + 1);
  }

  document.querySelector("#galeria-anterior").addEventListener("click", anterior);
  document.querySelector("#galeria-seguinte").addEventListener("click", seguinte);
  document.querySelector("#lightbox-anterior").addEventListener("click", anterior);
  document.querySelector("#lightbox-seguinte").addEventListener("click", seguinte);
  miniaturas.addEventListener("click", (evento) => {
    const botao = evento.target.closest("[data-imagem]");
    if (botao) mostrarImagem(Number(botao.dataset.imagem));
  });
  miniaturas.addEventListener("keydown", (evento) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(evento.key)) return;
    evento.preventDefault();
    if (evento.key === "ArrowLeft") anterior();
    if (evento.key === "ArrowRight") seguinte();
    if (evento.key === "Home") mostrarImagem(0);
    if (evento.key === "End") mostrarImagem(galeria.length - 1);
    miniaturas.children[imagemAtual].focus();
  });
  document.querySelector("#abrir-galeria").addEventListener("click", () => modal.showModal());
  document.querySelector("#fechar-galeria").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) modal.close();
  });
  modal.addEventListener("keydown", (evento) => {
    if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      anterior();
    }
    if (evento.key === "ArrowRight") {
      evento.preventDefault();
      seguinte();
    }
    // Escape e a devolução do foco são tratados pelo elemento <dialog> do browser.
  });
  mostrarImagem(0);
}
