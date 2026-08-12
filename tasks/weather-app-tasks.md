# Backlog — Weather App

## Entrega 1 — Fundamentos (tipos + funções puras)

### T-01 — Definir tipos do domínio
- **Tipo:** Data
- **Descrição:** Criar `src/types/weather.ts` com as interfaces e tipos compartilhados do app: `Unit`, `City`, `CurrentWeather`, `ForecastDay` e `WeatherData`.
- **Critérios de aceite:**
  - o arquivo existe em `src/types/`
  - todos os tipos refletem o modelo de dados do plano
  - o TypeScript compila com `strict` sem erros
- **Dependências:** —
- **Arquivos prováveis:** `src/types/weather.ts`

### T-02 — Converter temperatura
- **Tipo:** Data
- **Descrição:** Criar `src/lib/temperature.ts` com funções puras para converter Celsius/Fahrenheit e formatar valores para exibição.
- **Critérios de aceite:**
  - `0°C` converte para `32°F`
  - `100°C` converte para `212°F`
  - `-40°C` converte para `-40°F`
  - valores fracionários são arredondados de forma consistente
- **Dependências:** T-01
- **Arquivos prováveis:** `src/lib/temperature.ts`

### T-03 — Mapear códigos meteorológicos
- **Tipo:** Data
- **Descrição:** Criar `src/lib/weatherCodes.ts` para transformar `weather_code` em texto pt-BR e ícone/descrição amigável ao usuário.
- **Critérios de aceite:**
  - mapeia os principais códigos da Open-Meteo
  - possui fallback para código desconhecido
  - retorna rótulo legível para a UI
- **Dependências:** —
- **Arquivos prováveis:** `src/lib/weatherCodes.ts`

### T-04 — Formatar datas e labels de dia
- **Tipo:** Data
- **Descrição:** Criar `src/lib/format.ts` com utilitários para exibir data de forma natural: Hoje, Amanhã e dia da semana.
- **Critérios de aceite:**
  - o primeiro item da previsão aparece como "Hoje"
  - o segundo aparece como "Amanhã"
  - demais dias usam nome do dia em pt-BR
- **Dependências:** —
- **Arquivos prováveis:** `src/lib/format.ts`

## Entrega 2 — Acesso a dados

### T-05 — Service de geocoding
- **Tipo:** Data
- **Descrição:** Implementar `searchCities(name)` em `src/services/weatherService.ts` para consultar a API de geocoding da Open-Meteo.
- **Critérios de aceite:**
  - retorna `City[]` em caso de sucesso
  - trata busca vazia sem disparar request
  - trata ausência de resultados e falhas HTTP com erro consistente
  - usa `AbortController` para cancelar a requisição em caso de nova busca
- **Dependências:** T-01
- **Arquivos prováveis:** `src/services/weatherService.ts`

### T-06 — Service de forecast
- **Tipo:** Data
- **Descrição:** Implementar `getWeather(lat, lon)` para consultar e mapear os dados atuais e de previsão dos próximos 5 dias.
- **Critérios de aceite:**
  - retorna um `WeatherData` completo
  - inclui hoje + 4 dias seguintes
  - mapeia todos os campos relevantes da API
  - trata timeout, erro e resposta parcial sem quebrar o app
- **Dependências:** T-01, T-05
- **Arquivos prováveis:** `src/services/weatherService.ts`

### T-07 — Hook `useWeather`
- **Tipo:** Data
- **Descrição:** Criar o hook que orquestra busca, carregamento, erros, cidade selecionada e dados do clima.
- **Critérios de aceite:**
  - expõe estados `idle | loading | success | error | empty`
  - dispara geocoding e forecast em fluxo consistente
  - oferece retry em caso de falha
  - mantém a unidade atual em estado do UI
- **Dependências:** T-05, T-06
- **Arquivos prováveis:** `src/hooks/useWeather.ts`

## Entrega 3 — UI

### T-08 — Componente `SearchBar`
- **Tipo:** UI
- **Descrição:** Criar input de busca com label acessível e ação de submeter a pesquisa.
- **Critérios de aceite:**
  - input usa label ou `aria-label`
  - não dispara busca com valor vazio
  - dispara a busca ao enviar a consulta
  - comunica status de loading ao usuário
- **Dependências:** T-07
- **Arquivos prováveis:** `src/components/SearchBar.tsx`

### T-09 — Componentes de estado (Loading/Error/Empty)
- **Tipo:** UI
- **Descrição:** Criar componentes para estados de carregamento, erro e vazio.
- **Critérios de aceite:**
  - cada estado tem mensagem clara em pt-BR
  - `ErrorState` oferece ação de tentar novamente
  - `EmptyState` informa que nada foi encontrado
- **Dependências:** —
- **Arquivos prováveis:** `src/components/states/LoadingState.tsx`, `ErrorState.tsx`, `EmptyState.tsx`

### T-10 — Componente `CurrentWeather`
- **Tipo:** UI
- **Descrição:** Exibir o clima atual com temperatura, condição e conjunto de métricas principais.
- **Critérios de aceite:**
  - mostra temperatura principal
  - mostra condição climática
  - mostra umidade, vento, pressão e precipitação
  - usa unidade ativa (`°C` ou `°F`)
- **Dependências:** T-01, T-02, T-03
- **Arquivos prováveis:** `src/components/CurrentWeather.tsx`

### T-11 — Componentes `ForecastList` e `ForecastCard`
- **Tipo:** UI
- **Descrição:** Exibir a previsão de 5 dias em cards responsivos.
- **Critérios de aceite:**
  - mostra 5 itens (hoje + 4 dias seguintes)
  - cada card mostra mínimo, máximo e condição
  - layout responsivo em mobile e desktop
- **Dependências:** T-01, T-02, T-03, T-04
- **Arquivos prováveis:** `src/components/ForecastList.tsx`, `src/components/ForecastCard.tsx`

### T-12 — Componente `UnitToggle`
- **Tipo:** UI
- **Descrição:** Criar toggle para alternar entre Celsius e Fahrenheit.
- **Critérios de aceite:**
  - alterna entre `°C` e `°F`
  - é acessível por teclado
  - atualiza todos os valores da tela sem nova request
- **Dependências:** T-02
- **Arquivos prováveis:** `src/components/UnitToggle.tsx`

### T-13 — Integrar tudo no `App`
- **Tipo:** UI
- **Descrição:** Montar a experiência completa do app conectando hook, estados e componentes.
- **Critérios de aceite:**
  - layout completo da aplicação funciona
  - estados de loading/erro/vazio/ sucesso estão conectados
  - componente principal renderiza a interface final
- **Dependências:** T-07, T-08, T-09, T-10, T-11, T-12
- **Arquivos prováveis:** `src/App.tsx`

## Entrega 4 — Testes

### T-14 — Testes unitários de utilitários e service
- **Tipo:** Test
- **Descrição:** Cobrir conversion helpers e lógica de serviço com mock de `fetch`.
- **Critérios de aceite:**
  - testes de conversão Celsius/Fahrenheit
  - testes de `weatherService` em sucesso e erro
  - testes para timeout e resposta parcial
- **Dependências:** T-02, T-05, T-06
- **Arquivos prováveis:** `tests/unit/temperature.test.ts`, `weatherService.test.ts`

### T-15 — Testes de componentes
- **Tipo:** Test
- **Descrição:** Validar renderização dos principais componentes nos diferentes estados.
- **Critérios de aceite:**
  - loading aparece durante busca
  - error mostra mensagem e botão de retry
  - empty mostra mensagem sem dados
  - sucesso renderiza clima atual e previsão
- **Dependências:** T-08, T-09, T-10, T-11, T-12
- **Arquivos prováveis:** `tests/unit/components.test.tsx`

### T-16 — Testes E2E do fluxo principal
- **Tipo:** Test
- **Descrição:** Validar o comportamento real do app em browser, incluindo busca e troca de unidade.
- **Critérios de aceite:**
  - fluxo principal: busca → resultado → previsão → toggle de unidade
  - usa viewport mobile em pelo menos um cenário
  - usa dados mockados com `page.route`
- **Dependências:** T-13
- **Arquivos prováveis:** `tests/e2e/weather-app.spec.ts`

## Entrega 5 — Hardening

### T-17 — Acessibilidade e foco
- **Tipo:** UI
- **Descrição:** Revisar a interface para atender requisitos de acessibilidade e navegação por teclado.
- **Critérios de aceite:**
  - foco visível em todos os elementos interativos
  - botões e inputs têm labels/roles apropriados
  - contraste e navegação por teclado são satisfatórios
- **Dependências:** T-13
- **Arquivos prováveis:** `src/components/*`

### T-18 — Resiliência e edge cases
- **Tipo:** Data/UI
- **Descrição:** Implementar tratamentos para dados incompletos, timeout e nomes de cidade ambíguos.
- **Critérios de aceite:**
  - campos ausentes aparecem como "—"
  - timeout exibe mensagem clara
  - geocoding sem resultado mostra empty state correto
- **Dependências:** T-06, T-09
- **Arquivos prováveis:** `src/services/weatherService.ts`, `src/components/states/*`

## Rastreabilidade requisito → tarefa

| Requisito | Tarefas |
| --- | --- |
| RF1 Busca de cidade | T-05, T-08, T-16 |
| RF2 Clima atual | T-06, T-10, T-14, T-15 |
| RF3 Previsão de 5 dias | T-06, T-11, T-16 |
| RF4 Alternância Celsius/Fahrenheit | T-02, T-12, T-15, T-16 |
| RF5 Estados de interface | T-07, T-09, T-13, T-15 |
| RF6 Feedback semântico de busca | T-05, T-09, T-18 |

## Ordem recomendada de execução

1. T-01 → T-02 → T-03 → T-04
2. T-05 → T-06 → T-07
3. T-08 → T-09 → T-10 → T-11 → T-12 → T-13
4. T-14 → T-15 → T-16
5. T-17 → T-18

## Priorização

- **P0**: T-01, T-02, T-05, T-06, T-07, T-08, T-10, T-11, T-12, T-13
- **P1**: T-03, T-04, T-09, T-17, T-18
- **P2**: T-14, T-15, T-16
