# Norton Fenix Challenge

Uma interface que prioriza a percepção de velocidade e a estabilidade visual, é a resposta ao desafio de criar uma experiência de operador fluida, moderna e responsiva, integrando-se a uma API legado imutável.

## Visão Geral

- Dashboard com gráficos (evolução de KPI, barras de conversão e mapa de clientes).
- Gestão de tickets com filtros, tabela e ações.
- Chat IA com atualizações periódicas.
- Simulador de planos com seleção de opções e ajustes de perfil do cliente.

## Principais Funcionalidades

- Dados assíncronos com TanStack React Query (cache, retry, staleTime, gcTime).
- Skeleton loading padronizado (estilo shadcn) em páginas e componentes críticos.
- Animações de entrada com GSAP (stagger por elemento e fade/slide controlado).

## Stack Técnica

- Framework: `Next.js 16.0.7 (App Router + Turbopack)`
- Linguagem: `TypeScript`
- Estilos: `Tailwind CSS`
- Estado assíncrono: `@tanstack/react-query`
- Gráficos: `recharts`
- Mapas: `ol` (OpenLayers)
- Animações: `gsap` (com `@gsap/react`)

## Requisitos

- Node.js 18+
- npm 9+ (ou yarn/pnpm equivalente)

## Como Rodar

1. Instalar dependências:
   ```bash
   npm install
   ```
2. Ambiente (opcional): criar `.env.local` conforme necessidade do projeto.
3. Desenvolvimento:
   ```bash
   npm run dev
   ```
4. Lint:
   ```bash
   npm run lint
   ```
5. Build de produção:
   ```bash
   npm run build
   ```
6. Start de produção:
   ```bash
   npm run start
   ```

## Scripts Úteis

- `npm run dev`: inicia servidor de desenvolvimento com Turbopack.
- `npm run build`: compila para produção.
- `npm run start`: inicia servidor com build gerado.
- `npm run lint`: executa linter.

## Estrutura de Pastas (resumo)

- `src/app/(private)/dashboard`: página de dashboard e seus componentes.
- `src/app/(private)/plan-simulator`: simulador de planos e componentes.
- `src/app/(private)/ticket-management`: gestão de tickets.
- `src/app/(private)/chat-ia`: chat com IA.
- `src/app/api/*`: endpoints internos de dados.
- `src/components/ui/*`: biblioteca de componentes (Cards, Title, Skeleton, etc.).
- `src/styles/globals.css`: estilos globais e variáveis de tema.
- `src/types/*`: tipos globais do domínio (e.g., `nortus.d.ts`).

## Páginas e Fluxos

### Dashboard

- KPI Trends: gráfico de áreas com múltiplas séries (ARPU, retenção, conversão, churn).
- Mapa de clientes: OpenLayers com camadas, overlay e filtros.

### Plan Simulator

- Seleção de planos com preços, destaque de recomendado.
- Benefícios adicionais com custos incrementais.
- Skeleton no carregamento; após dados, animação de “cards subindo um a um” com GSAP.

### Ticket Management

- Tabela com filtros e paginação.
- Ações contextuais (ver/editar) e métricas.

### Chat IA

- Mensagens atualizadas periodicamente via React Query.
- Componentes de UI pensados para leitura confortável.

## Carregamento Assíncrono e Estabilidade

Para evitar erros de hidratação em SSR/CSR:

- Use Skeletons visuais ao invés de textos variáveis durante o carregamento.
- Evite ramos condicionais client-only em componentes SSR na fase de hidratação.
- Não use `Date.now()`, `Math.random()` ou formatação dependente de locale antes da hidratação.
- Mantenha o markup idêntico entre server e client até que os dados sejam resolvidos.

## Skeleton (shadcn)

- Componente base: `src/components/ui/Skeleton.tsx`
  - Classe padrão: `animate-pulse rounded-md bg-muted`
  - Uso: `<Skeleton />`

## Animações com GSAP

Integração com `@gsap/react` via `useGSAP`.
Padrões:

- `gsap.from(element, { opacity: 0, y: 16, duration: 0.45 })` para entrada suave.
- Stagger nos filhos para “um por vez”:
  ```ts
  gsap.from(container.children, {
    opacity: 0,
    y: 24,
    stagger: 0.2,
    duration: 0.45,
    ease: 'power2.out',
  });
  ```

## Estilos e Tema

- Tailwind configurado com tokens em `globals.css`.

## Qualidade e Acessibilidade

- Lint e TypeScript ativos; recomenda-se manter o código sem warnings.
- ARIA aplicado em elementos interativos (e.g., botões e inputs) e gráficos (via `aria-label`).

## API Interna

- Endpoints em `src/app/api/*` (e.g., `/api/nortus-v1/dashboard`, `/api/map/locations`, `/api/tickets`).
- Tratamento de erros consistente com `NextResponse`.

## Variáveis de Ambiente

- `.env.local` para armazenar chaves e URLs.
