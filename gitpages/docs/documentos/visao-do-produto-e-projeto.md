# Visão do Produto e Projeto

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
|------|--------|-----------|-------|
| 26/04/23 | 0.1 | Início do documento | Equipe Mochileiros |
| 27/04/23 | 1.0 | Documento pronto para a Entrega 1 | Equipe Mochileiros |



## Sumário
---
- VISÃO GERAL DO PRODUTO

    - 1.1	Declaração de Posição do Produto
    - 1.2	Objetivos do Produto
    - 1.3	Tecnologias a Serem Utilizadas  
---
- VISÃO GERAL DO PROJETO

    - 2.1	Organização do Projeto
    - 2.2	Planejamento das Fases e/ou Iterações do Projeto
    - 2.3	Matriz de Comunicação
    - 2.4	Gerenciamento de Riscos
    - 2.5	Critérios de Replanejamento
---
- PROCESSO DE DESENVOLVIMENTO DE SOFTWARE

    - 3.1 Abordagem de desenvolvimento
        - 3.1.1 Requisitos
        - 3.1.2 Equipe de desenvolvimento
        - 3.1.3 Usuários
        - 3.1.4 Tipo de projeto e riscos associados
        - 3.1.5 Conclusão
    - 3.2 Escolhas de Engenharia de Requisitos
        - 3.2.1 Processo de ER
        - 3.2.2 Atividades de ER
---
- LIÇÕES APRENDIDAS

    - 4.1 Unidade 1
---
- REFERÊNCIAS BIBLIOGRÁFICAS
---

# VISÃO GERAL DO PRODUTO

## 1.1 Declaração de Posição do Produto

Estamos propondo o desenvolvimento de um site/app para gerenciamento de viagens, que permitirá que os usuários façam todo o planejamento de suas viagens em um único lugar, gerenciem pagamentos e dividam valores. O objetivo é proporcionar aos usuários uma experiência mais fácil, organizada e prática de planejamento de viagens, ao mesmo tempo em que ajuda a gerenciar as finanças e divisões de valores entre os membros do grupo de viagem.

O que torna este produto diferente dos concorrentes é a sua funcionalidade integrada de gerenciamento de pagamentos e divisão de valores, que permite os usuários calculem e gerenciem facilmente o quanto cada membro do grupo deve contribuir para despesas compartilhadas, como hospedagem, aluguel de carros e refeições. Além disso, nosso site/app fornecerá uma interface intuitiva e fácil de usar, tornando a experiência de planejamento de viagens mais agradável e eficiente para os usuários.

Nossos usuários-alvo são pessoas que viajam em grupos, como famílias, amigos ou colegas de trabalho. Eles são indivíduos que valorizam a conveniência e a organização em sua vida cotidiana e desejam a mesma facilidade e praticidade ao planejar suas viagens. Nossos clientes são aqueles que procuram uma solução integrada para gerenciar todas as suas necessidades de planejamento de viagens em um único lugar, economizando tempo e minimizando a possibilidade de erros.

Os clientes devem utilizar/comprar este produto porque ele oferece uma maneira eficiente e fácil de planejar e gerenciar viagens em grupo. Eles podem economizar tempo e esforço ao planejar sua viagem, bem como evitar erros e desentendimentos no gerenciamento de pagamentos e divisão de valores entre membros do grupo. Em resumo, nosso site/app oferece uma solução completa e integrada para o planejamento de viagens em grupo, tornando a experiência mais prática e agradável para os usuários.

| Pergunta | Resposta |
|----------|----------|
| Para | Famílias e viajantes em grupo |
| Quem | Busca uma solução fácil e organizada para o planejamento de viagens em grupo |
| O (nome do produto) | MóViagem |
| Que | Permite o planejamento completo de viagens em grupo e o gerenciamento de pagamentos e divisão de valores |
| Ao contrário | Os usuários precisam usar várias ferramentas diferentes para planejar suas viagens em grupo |
| Nosso produto | É uma plataforma integrada que oferece uma solução completa e fácil para o planejamento de viagens em grupo, com uma funcionalidade de gerenciamento de pagamentos e divisão de valores e uma interface intuitiva e fácil de usar |

## 1.2 Objetivos do Produto

O objetivo principal do nosso projeto é desenvolver uma plataforma online (site/app) para gerenciamento de viagens em grupo, com o intuito de facilitar o planejamento, organização e divisão de valores entre os membros do grupo.

Além disso, buscamos oferecer uma interface intuitiva e fácil de usar, para que os usuários possam planejar suas viagens sem dificuldade. A plataforma também permitirá que os usuários armazenem e gerenciem informações importantes de suas viagens, como voos, reservas de hotel e itinerários, em um único lugar.
Outro objetivo é permitir que os usuários convidem outros membros do grupo para participar do planejamento da viagem e gerenciar o acesso de cada um às informações. A ferramenta de comunicação integrada também será disponibilizada, para que os membros do grupo possam se comunicar facilmente durante o planejamento da viagem.

Por fim, queremos garantir que o processo de gerenciamento de pagamentos e divisão de valores seja simples e transparente, para que os membros do grupo não precisem lidar com cálculos complexos ou confusos. Com esses objetivos em mente, esperamos oferecer uma solução completa e eficiente para o planejamento de viagens em grupo.


## 1.3 Tecnologias a Serem Utilizadas

### Web
| Categoria | Tecnologias |
|-----------|-------------|
| Linguagem de programação | JavaScript, TypeScript |
| Framework de frontend | React |
| Backend | Node.js |
| Banco de Dados | MySQL |
| Hospedagem | Heroku |

### Mobile
| Categoria | Tecnologias |
|-----------|-------------|
| Linguagem de programação | JavaScript, TypeScript |
| Framework de frontend | React Native |
| Backend | Node.js |
| Banco de Dados | SQLite |
| Hospedagem | AWS |

# VISÃO GERAL DO PROJETO

## 2.1 Organização do Projeto

| Papel | Atribuições | Responsável | Participantes |
|-------|-------------|-------------|---------------|
| Desenvolvedor | Codificar o produto, codificar testes unitários, realizar refatoração | Eduardo | Pedro, João, Gabriel, Siqueira |
| Product Owner | Atualizar o escopo do produto, organizar o escopo das sprints, validar as entregas | Pedro | Siqueira, Eduardo |
| Analista de Qualidade | Garantir a qualidade do produto, garantir o cumprimento do conceito de pronto, realizar inspeções de código | Gabriel | João, Siqueira |
| Design e UX | Responsável por criar a identidade visual da plataforma, bem como garantir uma experiência de usuário intuitiva e agradável | João | Pedro, Eduardo |

## 2.2	Planejamento das Fases e/ou Iterações do Projeto

| Sprint | Produto (entrega) | Data Início | Data Fim |
|-------|-------------|-------------|---------------|
| Sprint 1 | MVP e Planejamento do Projeto | 25/04/23 | 08/05/23 |
| Sprint 2 | Implementação da interface básica da plataforma web e mobile (login e cadastro) | 09/05/23 | 22/05/23 |
| Sprint 3 | Implementação da funcionalidade de gerenciamento de viagens (CRUD’s) | 23/05/23 | 05/06/23 |
| Sprint 4 | Implementação da funcionalidade de gerenciamento de pagamentos e divisão de valores | 06/06/23 | 19/06/23 |

## 2.3	Matriz de Comunicação

| Descrição | Área/Envolvidos | Periodicidade | Produtos Gerados |
|-------|-------------|-------------|---------------|
| Acompanhamento das Atividades em Andamento; Acompanhamento dos Riscos, Compromissos, Ações Pendentes, Indicadores | Toda equipe | Quinzenal (e em dias de aula) | Ata de reunião; Relatório de situação do projeto |
| Comunicar situação do projeto | Toda equipe; Professor | Quinzenal | Ata de reunião; Relatório de Situação do Projeto |

## 2.4	Gerenciamento de Riscos

No contexto do projeto de desenvolvimento do site/app de gerenciamento de viagens, alguns dos riscos que podem ser identificados incluem problemas de segurança de dados, problemas de escalabilidade, problemas de compatibilidade com diferentes dispositivos e navegadores, e problemas de integração com serviços externos.

A cada ciclo de sprint, é importante avaliar os riscos existentes e atualizar a lista de riscos, a fim de garantir que os riscos sejam monitorados e gerenciados adequadamente. Isso permite que a equipe do projeto possa agir rapidamente no caso de um risco se materializar, minimizando o impacto no projeto. Os riscos devem ser registrados no painel de controle do projeto e no plano do projeto, de forma a garantir que sejam levados em consideração em todas as fases do projeto.


## 2.5	Critérios de Replanejamento

No projeto de gerenciamento de viagens, os critérios de replanejamento devem ser estabelecidos desde o início do projeto. Alguns possíveis critérios incluem mudanças significativas nos requisitos do projeto, atrasos na execução de tarefas, mudanças na disponibilidade de recursos, entre outros. Caso um ou mais critérios sejam atendidos, o time do projeto deve avaliar e decidir se é necessário realizar um replanejamento, levando em consideração os impactos e possíveis alternativas. É importante que a equipe mantenha uma comunicação clara e transparente com todas as partes interessadas sobre as decisões de replanejamento, a fim de garantir o sucesso do projeto.

# PROCESSO DE DESENVOLVIMENTO DE SOFTWARE

## 3.1 Abordagem de desenvolvimento

Para definir a abordagem de desenvolvimento de software que o projeto irá seguir, nos baseamos na metodologia proposta por Gupta (2019). Portanto foram respondidas questões sobre tópicos pré determinados para definir a abordagem que mais se adequa à equipe e ao projeto. Os tópicos são:

- Requisitos;
- Equipe de desenvolvimento;
- Usuários;
- Tipo de projeto e riscos associados.

Obs: Considere que, em resultados, cada caracter ‘+’ é a quantidade de vezes em que o processo especificado se encaixa com nosso projeto baseado em nossas respostas.


## 3.1.1 Requisitos

| Perguntas | Respostas |
|-----------|-------------|
| Os requisitos são fáceis de entender e definir? | Sim |
| Nós mudamos os requisitos com bastante frequência? | Não |
| Nós podemos definir os requisitos ao início de cada ciclo? | Sim |
| Os requisitos estão indicando um sistema complexo para se construir? | Sim |

### Resultados: 
- Cascata +++
- Protótipo +
- Incremental +++
- Evolutivo +++
- Espiral +
- RAD +++


## 3.1.2 Equipe de desenvolvimento

| Perguntas | Respostas |
|-----------|-------------|
| Pouca experiência em projetos similares? | Sim |
| Pouco conhecimento de domínio (novato na tecnologia)? | Não |
| Pouca experiência com as ferramentas que serão usadas? | Sim |
| Disponibilidade para treinamento, se necessário | Sim |

### Resultados: 
- Cascata +
- Protótipo ++
- Incremental +
- Evolutivo +
- Espiral ++
- RAD ++

## 3.1.3 Usuários

| Perguntas | Respostas |
|-----------|-------------|
| Usuário está envolvido em todas as fases? | Sim |
| Participação limitada do usuário? | Não |
| Usuário não tem experiência prévia de participações em projetos similares? | Sim |
| Usuário é especialista no domínio do problema? | Não |

### Resultados: 
- Cascata +
- Protótipo +++
- Incremental +
- Evolutivo ++
- Espiral ++
- RAD ++

## 3.1.4 Tipo de projeto e riscos associados

| Perguntas | Respostas |
|-----------|-------------|
| O projeto é a melhoria de um sistema existente? | Não |
| O financiamento é estável para o projeto? | Sim |
| Requisitos de alta confiabilidade? | Não |
| Cronograma do projeto é apertado? | Sim |
| Uso de componentes reutilizáveis? | Sim |
| Os recursos (Tempo, dinheiro, pessoas etc) estão escassos? | Não |

### Resultados: 
- Cascata +++
- Protótipo +++++
- Incremental +
- Evolutivo +
- Espiral ++++
- RAD +++++

## 3.1.5 Conclusão

- Cascata 8+
- Protótipo 11+
- Incremental 6+
- Evolutivo 7+
- Espiral 9+
- ### RAD 12+

Ao analisar os resultados individuais de cada tópico, foi obtida a metodologia de desenvolvimento mais adequada, o RAD (Rapid Application Development). Esta é uma abordagem ágil e tem como pontos característicos ser centrada no usuário e no design do produto, permitindo uma prototipagem mais rápida e uma entrega iterativa.


## 3.2 Escolhas de Engenharia de Requisitos

## 3.2.1 Processo de ER

As facetas do processo de requisitos foram definidas seguindo o proposto pelo IREB (2022):

![Facetas de ER](assets/Facetas-de-ER.png)

Ao fazer a análise do projeto, os facetas resultantes foram:

- Alvo: Orientado ao Mercado
    - Nossa solução é voltada para um grande número de pessoas, não um cliente específico. O nosso cliente servirá como um representante do público-alvo.

- Propósito: Exploratório
    - Nossos requisitos serão descobertos durante o projeto, sendo constantemente atualizados devido à: conversas com o cliente, implementação do código, ...

- Tempo: Iterativo
    - Feedback rápido para diminuir o risco e alterar os requisitos conforme necessário.

## 3.2.2 Atividades de ER

![Atividades de ER](assets/Atividades-de-Requisitos.png)

Conforme a divisão das atividades de Engenharia de Requisitos acima (MARSICANO, 2023), integramos as atividades de requisitos à metodologia de desenvolvimento de software do projeto, definida na seção 3.1.

![Integração RAD - ER](assets/RAD-e-Requisitos.jpeg)


# LIÇÕES APRENDIDAS

## 4.1 Unidade 1

Na unidade 1 foi possível ter uma introdução com relação aos processos de desenvolvimento de software. Na qual foi possível ver suas abordagens dirigidas a plano e ágeis em que  teve bastante enfoque na parte de ciclos de vida de um software como preditivo, iterativo, incremental, ágil e híbridos alguns exemplos práticos são Cascata, Spiral, RAD dentre outras. É dentro destes ciclos que é utilizado um  método de engenharia de requisitos de software, por isso foi importante essa introdução para que começássemos a entender sobre as atividades da engenharia de requisitos. Foi entendido também como definir o processo de desenvolvimento de um produto utilizando métodos como Sommerville e Gupta.

Outras lições foram entender as necessidades e desejos dos envolvidos, bem como entender melhor qual é de fato o problema a ser resolvido por meio da análise do problema fazendo o uso do diagrama de causa-efeito (fishbone) dentre outras ferramentas.

Para realizar um melhor projeto a partir da próxima etapa, uma possível melhoria seria uma melhor organização do tempo da equipe. Nesta unidade algumas entregas foram feitas muito em cima da hora, o que compromete a qualidade do trabalho. Portanto, a realização das atividades deve começar a ser realizada mais rápido nas próximas unidades.


# REFERÊNCIAS BIBLIOGRÁFICAS

Raja Gupta. Fundamentals of Software Engineering. Engineering Handbook. 2019. 

MARSICANO, George. Slides da matéria Requisitos. 2023

Handbook IREB CPRE Foundation Level, Version 1.1.0, september 2022
