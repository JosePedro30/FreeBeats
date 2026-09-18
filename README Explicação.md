# FreeBeats — começa aqui

Uma reconstrução do teu projeto em **HTML, CSS e JavaScript**, com o logótipo adaptado para fundo transparente, tons creme e dourados suaves, fotografias locais e uma estrutura pensada para editares no Visual Studio Code.

**Não precisas de React, Lovable, Tailwind, npm install ou de uma base de dados.** A pasta `site` contém a versão pronta a publicar.

## 1. Abrir e ver o site

1. Extrai este ZIP.
2. No VS Code, escolhe **File → Open Folder** e abre a pasta `freebeats-novo`.
3. Abre `site/index.html` no teu browser. Podes fazê-lo com duplo clique a partir da pasta no computador.

Se já usas a extensão Live Server, também podes clicar com o botão direito em `site/index.html` e escolher **Open with Live Server**.

### Opção com terminal

Se tens Node.js 20 ou superior, abre o terminal do VS Code na pasta `freebeats-novo` e executa:

```sh
npm run dev
```

Abre **http://localhost:8080**. Não é necessário executar `npm install`.

Guarda as alterações no VS Code e atualiza a página no browser. O servidor incluído não faz atualização automática; o Live Server pode fazê-la. Termina o servidor com `Ctrl+C`.

Se a porta estiver ocupada:

```sh
npm run dev -- 8081
```

## 2. Onde alterar cada coisa

Todos os caminhos abaixo são relativos à pasta `freebeats-novo`.

| Quero alterar…                                       | Ficheiro               | O que procurar                                 |
| ---------------------------------------------------- | ---------------------- | ---------------------------------------------- |
| Título e introdução da página inicial                | `site/index.html`      | Comentário `1. APRESENTAÇÃO`                   |
| Texto sobre a empresa                                | `site/index.html`      | Comentário `2. SOBRE`                          |
| Texto dos contactos e prazo de resposta              | `site/index.html`      | Comentário `8. CONTACTOS`                      |
| Email, telefone e localidade apresentados            | `site/js/conteudo.js`  | Objeto `empresa`                               |
| Serviços e descrições                                | `site/js/conteudo.js`  | Lista `servicos`                               |
| Números apresentados                                 | `site/js/conteudo.js`  | Lista `estatisticas`                           |
| Método de trabalho                                   | `site/js/conteudo.js`  | Lista `processo`                               |
| Testemunhos                                          | `site/js/conteudo.js`  | Lista `testemunhos`                            |
| Títulos do blog                                      | `site/js/conteudo.js`  | Lista `artigos`                                |
| Projetos, textos, imagens e galerias                 | `site/js/conteudo.js`  | Lista `projetos`                               |
| Cores, fontes, espaçamentos e adaptação ao telemóvel | `site/css/estilos.css` | Variáveis em `:root` e secções comentadas      |
| HTML da listagem de projetos                         | `site/projetos.html`   | Pesquisa, filtros e lista                      |
| Pesquisa, filtros, ordenação e vista em lista        | `site/js/projetos.js`  | Funções `atualizarFiltros` e `mostrarProjetos` |
| Organização da página individual e galeria           | `site/js/projeto.js`   | `principal.innerHTML` e `mostrarImagem`        |
| Menu móvel, ícones e cartões reutilizados            | `site/js/comum.js`     | Comentários por função                         |
| Formulário de contacto e testemunhos                 | `site/js/inicio.js`    | Comentários correspondentes                    |

`conteudo.js` é carregado primeiro. Depois `comum.js` disponibiliza as funções partilhadas. Por último, cada página carrega o seu ficheiro de interações. É esta a ordem dos elementos `<script defer>` no HTML.

O HTML descreve a estrutura, o CSS controla o aspeto e o JavaScript trata das interações e dos conteúdos repetidos.

O cabeçalho e o rodapé estão no HTML de cada página. Se mudares a estrutura do menu ou os textos fixos do rodapé, repete essa alteração nas quatro páginas HTML. As cores e o comportamento continuam partilhados.

## 3. Alterar cores e fontes

Abre `site/css/estilos.css`. No início encontras:

```css
:root {
  --fundo: #faf8f2;
  --papel: #fffefa;
  --areia: #f1eddf;
  --texto: #25241f;
  --dourado: #806019;
  --dourado-claro: #f0e6cb;
  --dourado-marca: #e8bd5d;
  --fundo-cabecalho: var(--fundo);
  --fundo-rodape: var(--areia);
}
```

Muda os códigos para experimentar outras cores. Mantém contraste suficiente entre letras, fundos e botões. A fonte DM Sans está incluída localmente. As partes em itálico usam Georgia, uma fonte de sistema.

O cabeçalho usa creme e o rodapé usa um tom areia suave. `--fundo-cabecalho` e `--fundo-rodape` permitem mudar esses fundos separadamente. `--dourado-marca` é o dourado claro dos botões, com letras escuras. `--dourado` é mais escuro para os textos sobre fundos claros. `--dourado-claro` é o tom suave usado em fundos de destaque.

As regras `@media` no fim do ficheiro adaptam a composição aos ecrãs mais pequenos. A regra `prefers-reduced-motion` respeita quem desativa animações no dispositivo.

## 4. Trocar fotografias e logótipo

Coloca as novas imagens em `site/assets/images`. Usa nomes simples, sem espaços, por exemplo `novo-festival.webp`.

Para um projeto, altera o campo `img` e a lista `gallery` em `conteudo.js`:

```js
"img": "assets/images/novo-festival.webp",
"gallery": [
  "assets/images/novo-festival.webp",
  "assets/images/novo-festival-2.webp"
],
```

As fotografias fixas do início e do bloco Sobre são alteradas diretamente nos elementos `<img>` de `index.html`. Atualiza também o atributo `alt`, que descreve a fotografia.

**Não uses caminhos como `/Users/...`, `C:\...` ou links do editor Lovable.** Os caminhos devem apontar para ficheiros dentro do site.

O logótipo usado no cabeçalho, no rodapé e no ícone do separador está em `site/assets/images/freebeats-logo-transparente.png`. Tem fundo transparente, círculo dourado e o nome em escuro para ser legível sobre o creme. O JPEG original está guardado em `site/assets/images/freebeats-logo.jpg` como referência. O caminho da versão apresentada está definido em `site/js/conteudo.js`:

```js
logo: "assets/images/freebeats-logo-transparente.png",
```

Para trocar a imagem, podes substituir esse ficheiro por outro PNG transparente com o mesmo nome. **O formato JPEG não suporta transparência.** Se usares outro nome ou formato, atualiza o campo `logo` e procura `assets/images/freebeats-logo-transparente.png` nos quatro ficheiros HTML: aparece nos elementos `<img>` e em `<link rel="icon">`. Ajusta também o `type` do ícone ao formato escolhido.

Para alterar o tamanho, procura `.brand-image` em `site/css/estilos.css`. Há dimensões próprias para o cabeçalho, para o telemóvel e para o rodapé. A regra `object-fit: contain` mostra o desenho completo sem o esticar; `background: transparent` deixa ver o fundo da página.

## 5. Editar ou acrescentar um projeto

Em `conteudo.js`, cada objeto de `projetos` representa um projeto. Para acrescentar outro, duplica um objeto completo, coloca uma vírgula entre os objetos e altera os valores.

| Campo                           | Serve para                                                                         |
| ------------------------------- | ---------------------------------------------------------------------------------- |
| `slug`                          | Identificador único no endereço; letras minúsculas e hífen, sem espaços ou acentos |
| `name`                          | Nome visível                                                                       |
| `category`                      | Categoria; os botões de filtro são criados automaticamente                         |
| `desc`                          | Resumo do cartão                                                                   |
| `img`                           | Imagem principal                                                                   |
| `gallery`                       | Fotografias da galeria; mantém pelo menos uma                                      |
| `year`                          | Ano ou intervalo de anos apresentado                                               |
| `sortDate`                      | Data de ordenação, no formato `AAAA-MM-DD`                                         |
| `popularity`                    | Valor manual usado para ordenar por popularidade; não são visitas reais            |
| `location`, `audience`, `scope` | Local, público e âmbito                                                            |
| `intro`                         | Introdução e descrição da página                                                   |
| `content`                       | Lista de parágrafos da descrição completa                                          |
| `highlights`                    | Lista de destaques; `title` e `desc` são apresentados                              |
| `services`                      | Lista de serviços prestados                                                        |

Não precisas de criar outra página: `projeto.html?slug=identificador` apresenta automaticamente o projeto correspondente. O novo projeto aparece na página inicial e no portefólio.

A lista mostra três projetos de cada vez. Para mudar esse número, altera `POR_PAGINA` no início de `site/js/projetos.js`.

## 6. Contactos, redes sociais e blog

### Contactos

O email e o telefone do original foram preservados. Ao alterar `empresa` em `conteudo.js`, os contactos visíveis e o destinatário do formulário são atualizados. Os textos de reserva nos HTML, usados antes do JavaScript ou sem JavaScript, também podem ser atualizados com uma pesquisa global no VS Code.

Se mudares a localidade, altera também o endereço do link **Ver no mapa** em `index.html`.

**O formulário prepara uma mensagem na aplicação de email do visitante. A pessoa ainda tem de a enviar nessa aplicação.** O site mantém o texto e permite copiá-lo quando não existe uma aplicação de email configurada.

Não há envio automático, armazenamento de pedidos nem servidor de email. Para receber mensagens diretamente a partir do formulário, seria necessário configurar um serviço de formulários ou um backend. Não coloques palavras-passe ou chaves privadas no JavaScript público.

### Redes sociais

Os links vazios do original foram removidos. Acrescenta apenas os endereços reais em `empresa.redesSociais`:

```js
"redesSociais": [
  { "nome": "Instagram", "url": "https://www.instagram.com/o-teu-perfil/" }
],
```

O endereço do exemplo deve ser substituído pelo teu perfil. A lista vazia não apresenta botões.

### Blog

O original incluía três títulos e tempos de leitura, mas não incluía o texto dos artigos. Os três temas estão preservados e identificados como **Em breve**, com os tempos de leitura previstos. Não há ligações que finjam abrir artigos existentes.

Quando os artigos estiverem escritos, podes criar páginas HTML e transformar os respetivos cartões em ligações, no bloco dos artigos de `inicio.js`.

## 7. Colocar online

Publica **apenas a pasta `site`**. O ficheiro `index.html` tem de ficar na raiz publicada, junto de `css`, `js` e `assets`. Não publiques o ZIP como se fosse o site nem a pasta exterior que contém este guia.

Não há etapa de compilação, base de dados ou servidor Node.js em produção. Todos os recursos necessários estão dentro de `site`, incluindo fotografias e fontes.

### Netlify, por arrastar a pasta

1. Inicia sessão na tua conta Netlify.
2. Usa a opção de publicação por arrastar e largar, como o Netlify Drop.
3. Arrasta a pasta `site`, já extraída.
4. Verifica a visibilidade e o endereço atribuídos ao projeto.
5. Para uma atualização, envia novamente a pasta `site` atualizada na área de deploys do mesmo projeto.

O procedimento está descrito na [documentação oficial de deploys da Netlify](https://docs.netlify.com/deploy/create-deploys/#drag-and-drop). Não foi criada uma conta nem feita uma publicação por ti.

### Alojamento com cPanel ou FTP

Copia **o conteúdo** de `site` para a pasta pública do teu domínio, normalmente `public_html`. Se já existir outro site, guarda uma cópia antes de substituir os seus ficheiros.

### GitHub Pages

Coloca o conteúdo de `site` na raiz da branch que vais publicar e configura essa branch como origem no GitHub Pages. O ficheiro `.nojekyll` incluído indica que se trata de ficheiros estáticos.

Consulta [Criar um site GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site). Os caminhos relativos permitem abrir este site numa subpasta de um repositório.

### Endereços e partilha

As páginas usam `index.html`, `projetos.html` e `projeto.html?slug=...`. Não precisam de regras especiais para aplicações React. Se um site antigo já tiver endereços como `/projetos/festival-de-musica`, configura redirecionamentos no teu alojamento antes de o substituir.

A página inicial tem título e descrição no HTML. O título e a descrição de cada projeto são atualizados com JavaScript, tal como no projeto original. Alguns serviços de partilha que não executam JavaScript podem mostrar a descrição genérica da página de projeto. Para obter metadados estáticos distintos para cada projeto, será necessário gerar um HTML por projeto.

## 8. O que foi verificado

Foram verificados a sintaxe dos scripts, os ficheiros e ligações locais, a preservação das descrições e os comportamentos de pesquisa, filtros, ordenação, paginação, menu, testemunhos, galerias e preparação de email, através de testes automáticos num DOM simulado.

Na atualização do logótipo, foram confirmados a transparência do PNG, a presença da imagem nas quatro páginas, a preservação dos conteúdos, o funcionamento do menu e os contrastes das principais combinações de texto e fundo da nova paleta clara.

A abertura dos ficheiros locais no browser remoto deste ambiente foi bloqueada. Por isso, **não foi concluído um teste visual num browser real**, nem um teste de entrega de email. As regras responsivas estão implementadas, mas deves confirmar a apresentação no teu browser e no telemóvel antes de publicar.

A análise do projeto original e as decisões da reconstrução estão em `ANALISE.md`.
