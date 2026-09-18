/* Interações exclusivas da página inicial. O conteúdo vem de conteudo.js. */
"use strict";

document.querySelector("#lista-servicos").innerHTML = CONTEUDO.servicos
  .map(
    (servico, indice) => `
  <a class="service-row" href="#contactos" data-assunto="${FB.texto(servico.title)}">
    <span class="service-number">0${indice + 1}</span><h3>${FB.texto(servico.title)}</h3>
    <p>${FB.texto(servico.desc)}</p><span class="circle-button">${FB.icone("diagonal")}</span>
  </a>`,
  )
  .join("");

document.querySelector("#estatisticas").innerHTML = CONTEUDO.estatisticas
  .map(
    (estatistica) => `
  <div class="stat"><strong>${FB.texto(estatistica.value)}<span>${FB.texto(estatistica.suffix)}</span></strong>
  <p>${FB.texto(estatistica.label)}</p></div>`,
  )
  .join("");

document.querySelector("#projetos-destaque").innerHTML = CONTEUDO.projetos.map(FB.cartao).join("");

document.querySelector("#passos").innerHTML = CONTEUDO.processo
  .map(
    (passo, indice) => `
  <li class="step"><span>0${indice + 1}</span><div><h3>${FB.texto(passo.title)}</h3><p>${FB.texto(passo.desc)}</p></div></li>`,
  )
  .join("");

document.querySelector("#artigos").innerHTML = CONTEUDO.artigos
  .map(
    (artigo) => `
  <article class="post"><img class="post-image" src="${FB.texto(artigo.img)}" alt="${FB.texto(artigo.title)}" width="600" height="400" loading="lazy">
    <div class="post-meta"><span>${FB.texto(artigo.cat)}</span><span>Leitura prevista · ${FB.texto(artigo.read)}</span></div>
    <h3>${FB.texto(artigo.title)}</h3><span class="post-status">Em breve</span>
  </article>`,
  )
  .join("");

// Testemunhos sem reprodução automática: a leitura fica ao ritmo do visitante.
let testemunhoAtual = 0;
const textoTestemunho = document.querySelector("#texto-testemunho");
const botoesTestemunhos = document.querySelector("#botoes-testemunhos");
botoesTestemunhos.innerHTML = CONTEUDO.testemunhos
  .map(
    (_, indice) =>
      `<button class="dot" type="button" data-testemunho="${indice}" aria-label="Ver testemunho ${indice + 1}" aria-pressed="false"></button>`,
  )
  .join("");
function mostrarTestemunho(indice) {
  testemunhoAtual = (indice + CONTEUDO.testemunhos.length) % CONTEUDO.testemunhos.length;
  const testemunho = CONTEUDO.testemunhos[testemunhoAtual];
  textoTestemunho.innerHTML = `<p>“${FB.texto(testemunho.quote)}”</p><cite>${FB.texto(testemunho.author)} <span>— ${FB.texto(testemunho.role)}</span></cite>`;
  botoesTestemunhos
    .querySelectorAll("button")
    .forEach((botao, numero) =>
      botao.setAttribute("aria-pressed", String(numero === testemunhoAtual)),
    );
}
document
  .querySelector("#testemunho-anterior")
  .addEventListener("click", () => mostrarTestemunho(testemunhoAtual - 1));
document
  .querySelector("#testemunho-seguinte")
  .addEventListener("click", () => mostrarTestemunho(testemunhoAtual + 1));
botoesTestemunhos.addEventListener("click", (evento) => {
  const botao = evento.target.closest("[data-testemunho]");
  if (botao) mostrarTestemunho(Number(botao.dataset.testemunho));
});
mostrarTestemunho(0);

// Destaca no menu a secção que está a ser lida.
if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        document.querySelectorAll(".main-nav a").forEach((link) => {
          if (link.hash === `#${entrada.target.id}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-18% 0px -65% 0px" },
  );
  document.querySelectorAll("main > section[id]").forEach((secao) => observador.observe(secao));
}

// Links de serviços e de projetos podem deixar o assunto preenchido.
const formulario = document.querySelector("#form-contacto");
const assunto = formulario.elements.subject;
const assuntoRecebido = new URLSearchParams(window.location.search).get("assunto");
if (assuntoRecebido) assunto.value = assuntoRecebido.slice(0, 150);
document.querySelectorAll("[data-assunto]").forEach((link) =>
  link.addEventListener("click", () => {
    assunto.value = link.dataset.assunto;
  }),
);

const estado = document.querySelector("#estado-formulario");
const copiaEmail = document.querySelector("#copia-email");
const textoEmail = document.querySelector("#texto-email");
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  for (const nome of ["name", "email", "phone", "subject", "message"]) {
    const campo = formulario.elements[nome];
    campo.value = campo.value.trim();
    campo.setCustomValidity("");
    if (campo.minLength > 0 && campo.value.length < campo.minLength) {
      campo.setCustomValidity(`Escreva pelo menos ${campo.minLength} caracteres.`);
    }
  }
  if (!formulario.reportValidity()) return;
  const dados = Object.fromEntries(new FormData(formulario));
  const email = FB.prepararEmail(dados);
  textoEmail.value = `Assunto: ${dados.subject}\n\n${email.corpo}`;
  copiaEmail.hidden = false;
  estado.textContent =
    "A mensagem está preparada. Conclua o envio na sua aplicação de email. Se não abrir, copie o texto abaixo e envie para " +
    CONTEUDO.empresa.email +
    ".";
  window.location.href = email.href;
});
formulario.addEventListener("input", (evento) => {
  if (typeof evento.target.setCustomValidity === "function") evento.target.setCustomValidity("");
  // O texto preparado só é apresentado enquanto corresponder aos campos atuais.
  if (!copiaEmail.hidden) {
    copiaEmail.hidden = true;
    estado.textContent = "";
  }
});
document.querySelector("#copiar-email").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(textoEmail.value);
    estado.textContent = "Texto copiado. Cole-o na sua aplicação de email para concluir o envio.";
  } catch {
    textoEmail.focus();
    textoEmail.select();
    estado.textContent = "Texto selecionado. Use Ctrl+C ou ⌘C para o copiar e enviar por email.";
  }
});
