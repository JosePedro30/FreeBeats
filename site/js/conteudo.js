/*
 * CONTEÚDO DO SITE — começa por editar este ficheiro.
 * Mantém as aspas, as vírgulas e os parênteses.
 * As imagens são caminhos relativos à pasta site/.
 * As estatísticas, os projetos e os testemunhos vieram do projeto original.
 * Confirma estes dados antes da publicação.
 * logo: caminho da imagem transparente, usada no cabeçalho e no rodapé.
 * redesSociais: adiciona objetos { nome: "Instagram", url: "https://..." }.
 */

const CONTEUDO = {
  empresa: {
    nome: "FreeBeats",
    email: "silvapedrojl@gmail.com",
    telefone: "+351 916 310 970",
    telefoneLink: "+351916310970",
    localidade: "Guimarães, Portugal",
    anoFundacao: 2020,
    logo: "assets/images/freebeats-logo-transparente.png",
    redesSociais: [],
  },
  servicos: [
    {
      title: "Produção Cultural",
      desc: "Planeamento e organização de eventos culturais do conceito à execução.",
    },
    {
      title: "Produção Técnica",
      desc: "Coordenação técnica, logística e apoio operacional em palco e bastidores.",
    },
    {
      title: "Comunicação Cultural",
      desc: "Promoção de eventos e estratégias de comunicação digital e offline.",
    },
    {
      title: "Consultoria",
      desc: "Apoio na criação e desenvolvimento de projetos culturais sustentáveis.",
    },
  ],
  estatisticas: [
    {
      value: 50,
      suffix: "+",
      label: "Projetos realizados",
    },
    {
      value: 30,
      suffix: "+",
      label: "Parceiros",
    },
    {
      value: 10,
      suffix: "+",
      label: "Municípios",
    },
    {
      value: 100,
      suffix: "%",
      label: "Dedicação",
    },
  ],
  processo: [
    {
      title: "Planeamento",
      desc: "Definimos objetivos, conceito e cronograma.",
    },
    {
      title: "Produção",
      desc: "Estruturamos equipas, parceiros e recursos.",
    },
    {
      title: "Execução",
      desc: "Acompanhamento integral no terreno.",
    },
    {
      title: "Avaliação",
      desc: "Análise de resultados e relatório final.",
    },
  ],
  testemunhos: [
    {
      quote:
        "A Freebeats superou todas as expectativas. Uma parceria estratégica para a nossa programação cultural.",
      author: "Município de Braga",
      role: "Divisão de Cultura",
    },
    {
      quote:
        "Excelente organização, atenção ao detalhe e uma equipa que respira cultura em cada projeto.",
      author: "Associação Cultural",
      role: "Direção Artística",
    },
    {
      quote:
        "Uma equipa extremamente profissional. Voltaremos a trabalhar com a Freebeats sem hesitar.",
      author: "Parceiro Cultural",
      role: "Coordenação de Eventos",
    },
  ],
  artigos: [
    {
      title: "Como organizar um festival cultural",
      cat: "Guias",
      read: "6 min",
      img: "assets/images/festival-ao-ar-livre.webp",
    },
    {
      title: "Bastidores da produção de um concerto",
      cat: "Bastidores",
      read: "4 min",
      img: "assets/images/microfone-palco.webp",
    },
    {
      title: "A importância da comunicação digital na cultura",
      cat: "Estratégia",
      read: "5 min",
      img: "assets/images/comunicacao-eventos.webp",
    },
  ],
  projetos: [
    {
      slug: "festival-de-musica",
      name: "Festival de Música",
      category: "Festival",
      desc: "Três dias de música ao vivo com curadoria artística e produção integral.",
      img: "assets/images/festival-musica.webp",
      gallery: [
        "assets/images/hero-festival.webp",
        "assets/images/festival-palco.webp",
        "assets/images/publico-concerto.webp",
        "assets/images/festival-universitario.webp",
      ],
      year: "2024",
      location: "Braga, Portugal",
      sortDate: "2024-07-19",
      popularity: 98,
      audience: "+15 000 pessoas",
      scope: "Produção integral",
      intro:
        "Três dias de música ao vivo com curadoria artística cuidada, palcos multi-género e uma experiência imersiva desenhada para artistas e público.",
      content: [
        "A FreeBeats assumiu a produção integral do festival, desde a conceção artística à execução técnica no terreno, coordenando dezenas de profissionais em várias frentes.",
        "Trabalhámos lado a lado com artistas nacionais e internacionais, garantindo condições técnicas de excelência, hospitalidade e uma comunicação alinhada com a identidade do evento.",
        "O resultado foi um festival de referência, com salas cheias, cobertura mediática relevante e feedback positivo do público, artistas e parceiros institucionais.",
      ],
      highlights: [
        {
          title: "3 dias",
          desc: "de programação intensiva",
        },
        {
          title: "2 palcos",
          desc: "em recinto ao ar livre",
        },
        {
          title: "+15 mil",
          desc: "espectadores no total",
        },
        {
          title: "20+ artistas",
          desc: "em cartaz",
        },
      ],
      services: ["Direção artística", "Produção executiva", "Produção técnica", "Comunicação"],
    },
    {
      slug: "mostra-de-teatro",
      name: "Mostra de Teatro",
      category: "Artes Cénicas",
      desc: "Ciclo de espetáculos em espaços icónicos com companhias nacionais.",
      img: "assets/images/mostra-teatro.webp",
      gallery: [
        "assets/images/mostra-teatro.webp",
        "assets/images/teatro-interior.webp",
        "assets/images/microfone-palco.webp",
      ],
      year: "2024",
      location: "Porto, Portugal",
      sortDate: "2024-03-08",
      popularity: 74,
      audience: "+3 500 pessoas",
      scope: "Programação e produção",
      intro:
        "Um ciclo de espetáculos em espaços icónicos que reuniu companhias nacionais em torno de uma programação exigente e diversa.",
      content: [
        "Desenhámos a mostra com foco na relação entre companhias emergentes e criadores estabelecidos, dando espaço à experimentação e ao diálogo com o público.",
        "A produção envolveu coordenação logística de várias salas, adaptação técnica a cada espaço e uma comunicação segmentada por público-alvo.",
        "A mostra tornou-se um ponto de encontro para o setor, com sessões esgotadas e conversas paralelas com criadores.",
      ],
      highlights: [
        {
          title: "6 semanas",
          desc: "de programação",
        },
        {
          title: "4 espaços",
          desc: "icónicos da cidade",
        },
        {
          title: "+3 500",
          desc: "espectadores",
        },
        {
          title: "8 companhias",
          desc: "em residência",
        },
      ],
      services: ["Curadoria", "Produção executiva", "Comunicação", "Bilheteira"],
    },
    {
      slug: "residencia-artistica",
      name: "Residência Artística",
      category: "Criação",
      desc: "Espaço de criação e experimentação para artistas emergentes.",
      img: "assets/images/residencia-artistica.webp",
      gallery: [
        "assets/images/residencia-artistica.webp",
        "assets/images/estudio-musica.webp",
        "assets/images/artista-concerto.webp",
        "assets/images/festival-ao-ar-livre.webp",
      ],
      year: "2023",
      location: "Guimarães, Portugal",
      sortDate: "2023-09-15",
      popularity: 61,
      audience: "12 artistas em residência",
      scope: "Programa e mentoria",
      intro:
        "Um programa de residências que oferece tempo, espaço e acompanhamento a artistas emergentes para desenvolverem novas criações.",
      content: [
        "Cada residência foi acompanhada por mentores da área, com apresentações abertas ao público e momentos de partilha entre artistas.",
        "A FreeBeats geriu todo o programa: seleção de candidaturas, produção, alojamento, comunicação e apresentação final.",
        "O programa gerou parcerias duradouras entre artistas, salas e programadores.",
      ],
      highlights: [
        {
          title: "8 semanas",
          desc: "por residência",
        },
        {
          title: "12 artistas",
          desc: "acompanhados",
        },
        {
          title: "24 obras",
          desc: "apresentadas",
        },
        {
          title: "1 estúdio",
          desc: "dedicado",
        },
      ],
      services: ["Curadoria", "Mentoria", "Produção", "Apresentação pública"],
    },
    {
      slug: "festival-universitario",
      name: "Festival Universitário",
      category: "Festival",
      desc: "Encontro anual que junta música, cultura e comunidade académica.",
      img: "assets/images/festival-universitario.webp",
      gallery: [
        "assets/images/festival-universitario.webp",
        "assets/images/producao-concertos.webp",
        "assets/images/festival-ao-ar-livre.webp",
        "assets/images/festival-musica.webp",
      ],
      year: "2024",
      location: "Coimbra, Portugal",
      sortDate: "2024-05-02",
      popularity: 89,
      audience: "+8 000 estudantes",
      scope: "Produção integral",
      intro:
        "Um encontro anual que celebra a comunidade académica com música, atividades culturais e experiências colaborativas.",
      content: [
        "Trabalhámos em estreita colaboração com associações académicas para desenhar uma programação relevante e ambiciosa.",
        "A produção envolveu vários palcos, ativações de marca e uma logística cuidada para receber milhares de estudantes.",
        "O festival consolidou-se como referência académica no calendário cultural.",
      ],
      highlights: [
        {
          title: "4 dias",
          desc: "de festival",
        },
        {
          title: "+8 mil",
          desc: "estudantes",
        },
        {
          title: "18 concertos",
          desc: "em três palcos",
        },
        {
          title: "1 campus",
          desc: "transformado",
        },
      ],
      services: ["Produção integral", "Comunicação", "Parcerias", "Logística"],
    },
    {
      slug: "producao-de-concertos",
      name: "Produção de Concertos",
      category: "Música ao vivo",
      desc: "Concertos chave na mão em salas, praças e recintos ao ar livre.",
      img: "assets/images/producao-concertos.webp",
      gallery: [
        "assets/images/producao-concertos.webp",
        "assets/images/concerto-luzes.webp",
        "assets/images/publico-concerto.webp",
        "assets/images/festival-musica.webp",
      ],
      year: "2022 – 2024",
      location: "Vários locais, Portugal",
      sortDate: "2024-11-20",
      popularity: 95,
      audience: "+25 000 pessoas",
      scope: "Chave na mão",
      intro:
        "Concertos chave na mão em salas, praças e recintos ao ar livre, com foco na experiência do artista e do público.",
      content: [
        "Desenvolvemos concertos para artistas nacionais e internacionais, coordenando produção, técnica, logística e comunicação.",
        "Cada projeto é desenhado à medida do artista e do espaço, garantindo qualidade artística e segurança operacional.",
        "A nossa rede de parceiros técnicos permite chegar a qualquer local do país com o mesmo nível de exigência.",
      ],
      highlights: [
        {
          title: "40+ concertos",
          desc: "produzidos",
        },
        {
          title: "20 cidades",
          desc: "de norte a sul",
        },
        {
          title: "+25 mil",
          desc: "espectadores",
        },
        {
          title: "3 anos",
          desc: "de circuito",
        },
      ],
      services: ["Produção técnica", "Logística", "Backline", "Hospitalidade"],
    },
    {
      slug: "ciclo-cultural-municipal",
      name: "Ciclo Cultural Municipal",
      category: "Programação",
      desc: "Programação cultural anual para municípios e associações locais.",
      img: "assets/images/publico-concerto.webp",
      gallery: [
        "assets/images/publico-concerto.webp",
        "assets/images/mostra-teatro.webp",
        "assets/images/festival-ao-ar-livre.webp",
        "assets/images/microfone-palco.webp",
      ],
      year: "2023 – 2024",
      location: "Vários municípios, Portugal",
      sortDate: "2024-01-12",
      popularity: 68,
      audience: "+12 000 pessoas",
      scope: "Programação anual",
      intro:
        "Programação cultural anual desenhada em parceria com municípios e associações locais para dinamizar o território.",
      content: [
        "Trabalhamos com autarquias para desenhar programações que respeitem a identidade local e ampliem o acesso à cultura.",
        "O ciclo inclui música, artes cénicas, cinema ao ar livre e atividades para famílias, com forte componente comunitária.",
        "Cada edição é avaliada com indicadores claros de público, satisfação e impacto local.",
      ],
      highlights: [
        {
          title: "12 meses",
          desc: "de programação",
        },
        {
          title: "6 municípios",
          desc: "envolvidos",
        },
        {
          title: "60+ eventos",
          desc: "por edição",
        },
        {
          title: "+12 mil",
          desc: "participantes",
        },
      ],
      services: ["Programação", "Produção", "Comunicação", "Avaliação"],
    },
  ],
};
