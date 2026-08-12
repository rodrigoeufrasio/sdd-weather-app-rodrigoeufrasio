# Especificação do Produto — Weather App

## Overview

A aplicação web é uma SPA de previsão do tempo com foco em experiência rápida, clara e responsiva para uso pessoal. O usuário pode buscar uma cidade, visualizar o clima atual e acompanhar a previsão para os próximos 5 dias, com alternância entre Celsius e Fahrenheit. O produto é mobile-first, usa interface em tema dark glassmorphism e não exige login nem chave de API. Os dados são fornecidos pela Open-Meteo, com geocoding e forecast públicos.

## Functional Requirements

- **RF1 — Busca de cidade:** o usuário deve conseguir digitar o nome de uma cidade e receber sugestões relevantes de localidades para escolher.
- **RF2 — Clima atual:** ao selecionar uma cidade, a aplicação deve exibir temperatura atual, condição climática, umidade, vento, pressão e precipitação.
- **RF3 — Previsão de 5 dias:** a aplicação deve mostrar a previsão para hoje + 4 dias seguintes, incluindo temperatura mínima e máxima, condição do tempo e precipitação.
- **RF4 — Alternância de unidade:** o usuário deve poder trocar entre Celsius e Fahrenheit e ver todos os valores atualizados na mesma tela sem recarregar a página.
- **RF5 — Estados de interface:** a aplicação deve indicar claramente carregamento, erro e ausência de resultados.
- **RF6 — Feedback semântico de busca:** quando a busca não encontrar resultados ou houver dados incompletos, a interface deve comunicar isso de forma objetiva ao usuário.

## User Stories

- **US1** — Como decisor do dia a dia, quero buscar minha cidade para ver rapidamente o clima atual e decidir o que vestir.
- **US2** — Como viajante planejador, quero consultar a previsão de 5 dias para organizar melhor a semana e os deslocamentos.
- **US3** — Como usuário brasileiro, quero alternar entre °C e °F para entender a temperatura na unidade que me é mais familiar.
- **US4** — Como usuário mobile, quero uma interface responsiva para usar o app no celular com conforto e rapidez.
- **US5** — Como usuário em rede instável, quero mensagens de erro claras para saber quando a consulta falhou e como tentar novamente.
- **US6** — Como usuário que busca resultados específicos, quero ver cidades sugeridas com contexto de país/estado para evitar confusão entre nomes repetidos.

## Acceptance Criteria

### RF1 / US1 / US6

- Dado um texto válido de cidade, Quando o usuário digita e dispara a busca, Então a aplicação mostra sugestões de cidades com nome e contexto regional.
- Dado um nome de cidade que não corresponde a nenhum resultado, Quando a busca é executada, Então a aplicação exibe uma mensagem informando que nenhum resultado foi encontrado.
- Dado uma cidade escolhida na lista, Quando o usuário confirma a seleção, Então a busca é disparada e a UI passa para o estado de carregamento.

### RF2 / US1

- Dada uma cidade selecionada, Quando os dados forem carregados, Então a aplicação exibe temperatura atual, condição, umidade, vento, pressão e precipitação.
- Dada uma cidade selecionada, Quando algum campo de clima não estiver disponível, Então a interface mostra um valor substituto ou indicador apropriado sem quebrar o layout.

### RF3 / US2

- Dada uma cidade selecionada, Quando os dados forem carregados, Então a aplicação exibe 5 dias de previsão, incluindo hoje e os próximos 4 dias.
- Dada a previsão de 5 dias, Quando a listagem renderiza, Então cada dia mostra temperatura mínima, máxima, condição climática e precipitação.

### RF4 / US3

- Dado que a unidade atual é Celsius, Quando o usuário alterna para Fahrenheit, Então todas as temperaturas exibidas na tela são convertidas imediatamente sem nova requisição.
- Dado que a unidade atual é Fahrenheit, Quando o usuário alterna para Celsius, Então todas as temperaturas exibidas voltam ao valor correspondente em Celsius.

### RF5 / US5

- Dada uma requisição em andamento, Quando o carregamento ainda não concluiu, Então a UI apresenta um indicador de loading visível.
- Dada uma falha na API ou na rede, Quando a busca falha, Então a aplicação exibe uma mensagem clara e orienta o usuário a tentar novamente.
- Dado que não existam resultados para a busca, Quando o estado vazio é alcançado, Então a interface mostra uma mensagem amigável, sem erro técnico cru.

### RF6

- Dado um campo ausente em uma resposta parcial da API, Quando os dados são processados, Então a aplicação não quebra e exibe valores vazios ou marcadores adequados.

## Non-Functional Requirements

- **NFR1 — Performance:** a aplicação deve responder à busca em tempo percebido curto, com feedback imediato de carregamento e processamento leve.
- **NFR2 — Responsividade:** o layout deve ser mobile-first e funcionar de forma adequada em telas de 320px até desktop.
- **NFR3 — Acessibilidade:** a interface deve oferecer navegação por teclado, foco visível, labels semânticos e contraste suficiente para leitura confortável.
- **NFR4 — Resiliência:** em falhas de rede ou da API, a aplicação deve degradar de forma graciosa, sem quebrar a interface.
- **NFR5 — Arquitetura sem API key:** a solução deve utilizar Open-Meteo sem credenciais, favorecendo deploy estático e simplicidade operacional.
- **NFR6 — Mensagens úteis:** estados de erro e vazio devem ser claras, em português do Brasil, e orientar a próxima ação do usuário.
- **NFR7 — Qualidade de código:** lint, build e testes devem passar em CI antes do merge.

## Edge Cases

| Caso | Comportamento esperado |
| --- | --- |
| Cidade inexistente | Exibir estado vazio com mensagem: "Nenhuma cidade encontrada". |
| Input vazio | Não disparar busca e manter a UI sem ação desnecessária. |
| Texto com caracteres especiais ou acentos | Realizar busca normalizada e mostrar resultados esperados. |
| Falha da API de geocoding | Mostrar erro amigável e manter a tela estável. |
| Timeout de rede | Exibir mensagem de falha e permitir nova tentativa. |
| Geocoding sem resultados | Mostrar estado vazio explicativo, sem quebra visual. |
| Resposta parcial da API | Exibir campos disponíveis e marcar campos ausentes como indisponíveis. |
| Nome de cidade muito genérico | Apresentar sugestões com país/estado para desambiguar. |

## Assumptions

- O usuário tem acesso à internet na maior parte do tempo.
- O app será usado por pessoas individuais, sem login ou autenticação.
- O navegador do usuário é moderno e compatível com recursos web atuais.
- O público principal usa o app em dispositivos móveis e desktops leves.
- A v1 do produto não inclui geolocalização automática nem persistência em servidor.

## Risks

- **Risco 1 — Rate limiting ou indisponibilidade da Open-Meteo:** probabilidade média, impacto alto. Mitigação: tratar erros com mensagens claras e reduzir tentativas redundantes.
- **Risco 2 — Cidades homônimas:** probabilidade alta, impacto médio. Mitigação: exibir país/estado nas sugestões e confirmar a cidade selecionada.
- **Risco 3 — Conversão incorreta de unidade:** probabilidade baixa, impacto alto. Mitigação: centralizar em função pura e testar unitariamente.
- **Risco 4 — Inconsistência entre mobile e desktop:** probabilidade média, impacto médio. Mitigação: design mobile-first e testes E2E com diferentes viewports.
- **Risco 5 — Falha de rede do usuário:** probabilidade média, impacto médio. Mitigação: estado de erro com ação de tentar novamente e feedback claro.

## Out of Scope

- Autenticação e contas de usuário.
- Histórico de buscas persistente.
- Favoritos ou listas personalizadas.
- Geolocalização automática.
- Notificações push ou alertas meteorológicos.
- Suporte multilíngue além de pt-BR.
- Persistência de dados em backend próprio.

## Open Questions

- Nenhuma bloqueante restante para o desenvolvimento desta v1. As decisões principais já foram fechadas no discovery, e os requisitos foram definidos com suficiente clareza para iniciar a implementação.

## Rastreabilidade

| User Story | Requisitos | Critérios principais |
| --- | --- | --- |
| US1 | RF1, RF2, RF5 | busca, clima atual, estados de loading/erro |
| US2 | RF3 | previsão de 5 dias |
| US3 | RF4 | alternância Celsius/Fahrenheit |
| US4 | NFR2, NFR3 | responsividade e acessibilidade |
| US5 | RF5, NFR4, NFR6 | erro, retry e mensagens claras |
| US6 | RF1 | sugestões com contexto regional |
