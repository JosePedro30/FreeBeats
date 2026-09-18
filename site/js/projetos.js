/* Pesquisa e filtros do portefólio. O estado fica no endereço para poder partilhar. */
"use strict";
const POR_PAGINA = 3;
const categorias = ["Todos", ...new Set(CONTEUDO.projetos.map((projeto) => projeto.category))];
let quantidadeVisivel = POR_PAGINA;
let filtros = lerFiltros();
const pesquisa = document.querySelector("#pesquisa-projetos");
const ordenar = document.querySelector("#ordenar-projetos");
const lista = document.querySelector("#lista-projetos");
const carregarMais = document.querySelector("#carregar-mais");
const botoesCategorias = document.querySelector("#categorias");

function lerFiltros() {
  const parametros = new URLSearchParams(window.location.search);
  return {
    q: parametros.get("q") || "",
    cat: categorias.includes(parametros.get("cat")) ? parametros.get("cat") : "Todos",
    sort: parametros.get("sort") === "populares" ? "populares" : "recentes",
    view: parametros.get("view") === "lista" ? "lista" : "grelha",
  };
}

function guardarEndereco() {
  const endereco = new URL(window.location.href);
  endereco.search = "";
  const valoresIniciais = { q: "", cat: "Todos", sort: "recentes", view: "grelha" };
  Object.entries(filtros).forEach(([chave, valor]) => {
    if (valor !== valoresIniciais[chave]) endereco.searchParams.set(chave, valor);
  });
  // Alguns browsers limitam o histórico quando se abre o HTML sem servidor.
  try {
    window.history.replaceState(null, "", endereco);
  } catch {
    /* Os filtros continuam a funcionar. */
  }
}

function atualizarFiltros(alteracoes) {
  if (!(Object.keys(alteracoes).length === 1 && "view" in alteracoes))
    quantidadeVisivel = POR_PAGINA;
  filtros = { ...filtros, ...alteracoes };
  guardarEndereco();
  mostrarProjetos();
}

botoesCategorias.innerHTML = categorias
  .map(
    (categoria) =>
      `<button type="button" class="filter-button" data-categoria="${FB.texto(categoria)}" aria-pressed="false">${FB.texto(categoria)}</button>`,
  )
  .join("");

function mostrarProjetos() {
  const resultado = FB.filtrarProjetos(filtros);
  lista.classList.toggle("is-list", filtros.view === "lista");
  lista.innerHTML = resultado.slice(0, quantidadeVisivel).map(FB.cartao).join("");
  document.querySelector("#sem-resultados").hidden = resultado.length !== 0;
  const apresentados = Math.min(quantidadeVisivel, resultado.length);
  document.querySelector("#numero-resultados").textContent =
    resultado.length === 0
      ? "Nenhum projeto encontrado"
      : `${apresentados} de ${resultado.length} ${resultado.length === 1 ? "projeto" : "projetos"}`;
  carregarMais.hidden = apresentados >= resultado.length;
  pesquisa.value = filtros.q;
  ordenar.value = filtros.sort;
  document.querySelector("#limpar-pesquisa").hidden = !filtros.q;
  botoesCategorias
    .querySelectorAll("button")
    .forEach((botao) =>
      botao.setAttribute("aria-pressed", String(botao.dataset.categoria === filtros.cat)),
    );
  document
    .querySelectorAll("[data-vista]")
    .forEach((botao) =>
      botao.setAttribute("aria-pressed", String(botao.dataset.vista === filtros.view)),
    );
  const ativos = [];
  if (filtros.q.trim()) ativos.push(["q", `Pesquisa: ${filtros.q.trim()}`]);
  if (filtros.cat !== "Todos") ativos.push(["cat", filtros.cat]);
  if (filtros.sort !== "recentes") ativos.push(["sort", "Popularidade"]);
  document.querySelector("#filtros-ativos").innerHTML = ativos
    .map(
      ([campo, nome]) =>
        `<button type="button" class="filter-chip" data-remover="${campo}" aria-label="Remover filtro ${FB.texto(nome)}">${FB.texto(nome)}${FB.icone("fechar")}</button>`,
    )
    .join("");
  document.querySelector("#limpar-filtros").hidden = ativos.length === 0;
}

pesquisa.addEventListener("input", () => atualizarFiltros({ q: pesquisa.value }));
ordenar.addEventListener("change", () => atualizarFiltros({ sort: ordenar.value }));
document.querySelector("#limpar-pesquisa").addEventListener("click", () => {
  atualizarFiltros({ q: "" });
  pesquisa.focus();
});
botoesCategorias.addEventListener("click", (evento) => {
  const botao = evento.target.closest("[data-categoria]");
  if (botao) atualizarFiltros({ cat: botao.dataset.categoria });
});
document
  .querySelectorAll("[data-vista]")
  .forEach((botao) =>
    botao.addEventListener("click", () => atualizarFiltros({ view: botao.dataset.vista })),
  );
document.querySelectorAll("[data-limpar]").forEach((botao) =>
  botao.addEventListener("click", () => {
    atualizarFiltros({ q: "", cat: "Todos", sort: "recentes" });
    pesquisa.focus();
  }),
);
document.querySelector("#filtros-ativos").addEventListener("click", (evento) => {
  const botao = evento.target.closest("[data-remover]");
  if (botao) {
    const campo = botao.dataset.remover;
    atualizarFiltros({ [campo]: { q: "", cat: "Todos", sort: "recentes" }[campo] });
    pesquisa.focus();
  }
});
carregarMais.addEventListener("click", () => {
  const anterior = quantidadeVisivel;
  quantidadeVisivel += POR_PAGINA;
  mostrarProjetos();
  lista.children[anterior]?.focus({ preventScroll: true });
});
window.addEventListener("popstate", () => {
  filtros = lerFiltros();
  quantidadeVisivel = POR_PAGINA;
  mostrarProjetos();
});
mostrarProjetos();
