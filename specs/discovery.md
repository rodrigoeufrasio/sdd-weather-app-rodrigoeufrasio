# Discovery — Weather App

## Contexto

Aplicação web de previsão do tempo voltada para uso pessoal rápido. O usuário deve conseguir buscar uma cidade, consultar o clima atual e visualizar a previsão para os próximos 5 dias, com a possibilidade de alternar entre Celsius e Fahrenheit. A experiência deve funcionar bem em dispositivos móveis e ter feedback claro para estados de carregamento, vazio e erro.

## Requisitos Funcionais

- **RF1** — Buscar cidade por nome, com suporte a sugestões e, quando necessário, desambiguação de resultados.
- **RF2** — Exibir o clima atual da cidade pesquisada, incluindo pelo menos temperatura, condição climática, umidade, vento e pressão.
- **RF3** — Exibir a previsão de 5 dias, cobrindo hoje mais 4 dias seguintes, com temperatura mínima e máxima e indicadores de condição.
- **RF4** — Permitir alternância entre unidades de temperatura em Celsius e Fahrenheit, atualizando todos os valores exibidos.
- **RF5** — Exibir estados de carregamento enquanto a consulta está em andamento.
- **RF6** — Exibir mensagens de erro quando a busca falhar ou quando não houver resultado.
- **RF7** — Suportar uso em smartphones e tablets, com layout responsivo e leitura confortável em telas pequenas.

## Requisitos Não-Funcionais

- **RNF1 — Performance:** a aplicação deve carregar rapidamente e responder à busca com baixa latência percebida.
- **RNF2 — Responsividade:** a interface deve funcionar de forma apropriada em telas pequenas e grandes, priorizando mobile-first.
- **RNF3 — Acessibilidade:** a UI deve oferecer navegação por teclado, labels semânticos, contraste adequado e elementos acessíveis.
- **RNF4 — Resiliência:** a aplicação deve lidar com falhas de rede e indisponibilidade de API de forma amigável ao usuário.
- **RNF5 — Simplicidade de implantação:** a solução deve utilizar uma fonte pública e sem chave de API, como Open-Meteo, para facilitar uso estático.
- **RNF6 — Observabilidade básica:** erros e ausência de dados devem resultar em mensagens claras e acionáveis para o usuário.
- **RNF7 — Internacionalização básica:** a interface deve seguir o idioma pt-BR como padrão no treinamento.

## Riscos

| Risco | Probabilidade | Impacto | Mitigação |
| --- | --- | --- | --- |
| Rate limiting ou indisponibilidade da API de clima | Média | Alto | Tratar falhas com mensagens claras e, se possível, cache leve de consultas recentes |
| Cidade ambígua com nomes repetidos em diferentes regiões | Alta | Médio | Exibir sugestões com estado/pais e confirmar a cidade antes de consultar |
| Inconsistência visual entre dispositivos | Média | Médio | Usar design mobile-first e validar a interface em diferentes viewports |
| Falha de rede no cliente | Média | Médio | Exibir estado de erro e permitir tentativa manual de nova busca |
| Conversão incorreta de temperatura entre Celsius e Fahrenheit | Baixa | Alto | Centralizar a conversão em funções puras e testar unitariamente |
| Latência percebida durante a busca | Média | Médio | Otimizar carregamento, reduzir requests e mostrar indicadores de loading |

## Perguntas em Aberto (Open Questions)

1. **Qual será a fonte de dados da previsão?**  
   Impacto: define custo, disponibilidade, autenticação e confiabilidade da solução.

2. **A previsão de 5 dias inclui o dia atual?**  
   Impacto: altera a lógica de agrupamento de datas e a experiência de uso.

3. **A aplicação deve usar geolocalização automática do usuário?**  
   Impacto: exige permissões, UX adicional e possíveis preocupações de privacidade.

4. **Qual será a unidade padrão de temperatura para a primeira renderização?**  
   Impacto: define a experiência inicial e a necessidade de conversão de valores.

5. **A aplicação precisa funcionar offline ou com cache local?**  
   Impacto: aumenta a complexidade de implementação e a persistência de dados.

6. **Quais idiomas a interface deve suportar?**  
   Impacto: influencia a estrutura de textos, labels e localização da UI.

7. **Há necessidade de histórico, favoritos ou persistência de buscas?**  
   Impacto: exige armazenamento local ou servidor, além de novas regras de negócio.

8. **A API exige autenticação ou há limite de uso gratuito?**  
   Impacto: impacta custos, deploy e a viabilidade de uso em produção.

## Suposições (Assumptions)

- A maioria dos usuários terá acesso à internet durante o uso do app.
- O público-alvo é individual, sem necessidade de login ou contas.
- A aplicação será usada em navegadores modernos e atualizados.
- A v1 do produto não requer geolocalização automática nem persistência em servidor.
- O foco inicial é a experiência realista de consulta rápida e leitura simples do clima.

## Decisões

- **Fonte de dados:** Open-Meteo (geocoding + forecast), sem API key.  
  Justificativa: elimina custos e limitações de autenticação, além de ser uma solução pública e direta para um projeto de treinamento.

- **"5 dias" = hoje + 4 dias seguintes.**  
  Justificativa: torna a previsao consistente e fácil de explicar, além de reduzir ambiguidades na apresentação de dados.

- **Unidade padrão:** Celsius.  
  Justificativa: é a unidade mais comum em contextos de uso no Brasil e também a base esperada da API em muitos casos.

- **Sem autenticação e sem persistência de servidor.**  
  Justificativa: simplifica a arquitetura e atende ao escopo do app como ferramenta de consulta pessoal e estática.

- **Idioma da UI: pt-BR.**  
  Justificativa: alinha com o contexto do treinamento e a expectativa do público brasileiro.

- **Sem geolocalização automática na v1.**  
  Justificativa: evita permissões de localização e reduz a complexidade no primeiro ciclo de desenvolvimento.

## Personas

- **Viajante planejador** — quer consultar a previsão dos próximos dias para organizar a semana e decidir sobre itinerários ou roupas adequadas.
- **Decisor do dia a dia** — quer saber rapidamente se precisa levar guarda-chuva, ajustar a roupa ou planejar deslocamentos curtos.
- **Usuário móvel em trânsito** — busca uma experiência leve, rápida e funcional em celular, com informações essenciais em poucos segundos.
