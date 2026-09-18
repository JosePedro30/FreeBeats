# Análise do projeto FreeBeats

## O que o projeto original contém

O ZIP fornecido inclui um site institucional construído com React, TypeScript, Vite, Tailwind CSS, componentes shadcn/ui e Framer Motion. Inclui uma página inicial, uma listagem pesquisável de projetos e uma página de detalhe alimentada por dados.

A estrutura não tem backend, base de dados, autenticação nem envio real de email.

A página inicial reúne apresentação, empresa, serviços, números, projetos, método de trabalho, testemunhos, blog e contactos. Existem seis fichas de projetos, cada uma com descrições, indicadores, serviços e uma galeria.

## Problemas identificados e resposta na nova versão

| No original                                                                                                            | Na reconstrução                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Muitas dependências e cerca de 50 componentes de interface auxiliares para um site institucional relativamente simples | HTML, CSS e JavaScript, sem dependências de execução ou instalação                                                   |
| Quase toda a página inicial concentrada num componente React extenso                                                   | HTML dividido em secções comentadas e interações separadas por página                                                |
| Fundo preto, letras muito pesadas, bastante contraste e animações em várias secções                                    | Fundos creme e areia, detalhes dourados e logótipo transparente; mais espaço e movimentos discretos                  |
| A galeria de um projeto usa um caminho absoluto `/Users/...`                                                           | Caminhos relativos para imagens incluídas no site                                                                    |
| Muitas fotografias carregadas a partir de URLs externas                                                                | Fotografias guardadas e otimizadas em WebP                                                                           |
| Uma fotografia externa da Mostra de Teatro devolve erro 404                                                            | Referência removida; ficam as três fotografias disponíveis dessa galeria                                             |
| `fernao.jpg` tem 12000 × 9000 píxeis, cerca de 10,8 MB, e não está usado na apresentação                               | Versão otimizada usada no bloco Sobre, mantendo a fotografia existente                                               |
| O logótipo em imagem não está no ZIP                                                                                   | Logótipo fornecido posteriormente, adaptado para transparência e integrado no cabeçalho, rodapé e ícone do separador |
| Formulário espera 700 ms e mostra “Mensagem enviada” sem fazer qualquer pedido de envio                                | Mensagem preparada na aplicação de email e alternativa para copiar; sem confirmação fictícia                         |
| Links de redes sociais e artigos apontam para `#`                                                                      | Redes só aparecem com URLs reais; artigos identificados como “Em breve”                                              |
| O bloco Sobre diz que a empresa foi criada em julho de 2020, mas apresenta também “10+ anos de cultura”                | Mantida a informação “desde 2020”; retirado o indicador de antiguidade que não estava explicado                      |
| Testemunhos mudam automaticamente de seis em seis segundos                                                             | Navegação manual com botões e indicadores                                                                            |
| Campos do formulário identificados sobretudo por placeholders                                                          | Etiquetas permanentes, validação nativa e mensagens de estado                                                        |
| Galeria limitada à escolha por miniaturas                                                                              | Miniaturas, anterior/seguinte, navegação por teclado e ampliação                                                     |

## Conteúdo preservado

- Identidade FreeBeats e frase “Todas as cabeças estão cheias de projetos”.
- Atividade de produção e gestão cultural, trabalho com museus, eventos e consultoria.
- Referências ao Guimarães Project Room e à exposição Fernão de Magalhães.
- Quatro serviços, quatro fases de trabalho e quatro indicadores.
- Os seis projetos, com os seus textos, datas, localidades, público, âmbito, destaques e serviços.
- Três testemunhos, com os mesmos autores e funções.
- Três temas de blog e respetivos tempos de leitura previstos.
- Email, telefone, localidade e indicação de resposta em 48 horas úteis.

## Pontos a rever antes de uma publicação real

Os números de projetos, parceiros, municípios, públicos, popularidade e os testemunhos foram mantidos a partir dos dados fornecidos. Esta reconstrução **não verificou a veracidade comercial desses dados**. Confirma-os e substitui quaisquer conteúdos demonstrativos antes de apresentar o site como portefólio real.

Os valores de `popularity` são classificações manuais do original, não estatísticas recolhidas de visitantes. Os artigos completos continuam a não estar disponíveis. Os contactos foram preservados sem alteração.

## Atualização da identidade visual

A versão 2.2 usa uma adaptação do logótipo para PNG com fundo transparente e o nome em escuro para continuar legível sobre fundos claros. O cabeçalho, o menu móvel, o rodapé e a galeria ampliada usam tons creme e areia. Os detalhes usam dourado escuro sobre creme, e os botões principais usam dourado claro com letras escuras. As cores estão identificadas nas variáveis no início da folha de estilos. O JPEG original permanece incluído como referência.

## Organização e limites

O novo site é estático: pode ser alojado em qualquer serviço que disponibilize HTML, CSS, JavaScript e imagens. Não tem painel de administração; a edição é feita nos ficheiros. O servidor Node.js incluído é apenas uma opção de desenvolvimento local.

As páginas de detalhe são renderizadas com JavaScript a partir de um único ficheiro de conteúdo. Esta escolha simplifica a edição e evita manter várias cópias dos mesmos textos, mas os serviços de partilha que não executam JavaScript podem usar metadados genéricos.

O teste automático confirmou os comportamentos num DOM simulado e a existência dos recursos. Não foi possível concluir a inspeção visual através do browser remoto, porque o acesso a ficheiros locais foi bloqueado. A abertura nativa da aplicação de email e a entrega da mensagem também não foram testadas.
