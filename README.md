  **InvestidorX** 💰

> Desafio técnico desenvolvido para a **Stalse**  

A **InvestidorX** é uma plataforma simples voltada para o mundo de investimentos. Nela você pode visualizar seus investimentos feitos e ter uma análise de como está o mercado atual com uma lista de ações. Para a coleta de dados, além de uma a API local, foi utilizado também a API da [Brapi](https://brapi.dev/), para os dados confiáveis do mercado financeiro.

Link para o projeto: [Acesse aqui](https://investidorx.vercel.app/)

<img width="1884" height="870" alt="image" src="https://github.com/user-attachments/assets/fc5f074f-528c-414b-9d71-4aed1743df12" />


---

## 🛠️ Tecnologias usadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🧩 Requisitos para rodar o projeto

- [Node.js](https://www.nodejs.tech/pt-br)

### Como rodar na minha maquina?

- clone o projeto
- rode `npm install`
- rode `npm run dev`
- Pronto!

## 🔐 Variáveis de Ambiente

Antes de rodar o projeto, crie um arquivo `.env` na raiz com base no `.env.example`:

```bash
cp .env.example .env
```

## 🧪 Testes

O projeto utiliza **Vitest** e **Testing Library** para testes unitários e de componentes.

### Rodar todos os testes

```bash
npm test
```
### Rodar testes em modo watch

```bash
npx vitest
```

## Estrutura do projeto

- `./src` pasta fonte, onde vai conter todas as pastas com os códigos do projeto
- `./src/app` pasta responsável por organizar todas as rotas/páginas do nosso sistema, além é claro na nossa API
- `./src/components` são todos os fragmentos essencias de interface do projeto como Tabelas, dashboards, ações e etc.
- `./src/data` onde são armazenados os dados que serão renderizados em algumas partes da nossa aplicação, visando melhor organização
- `./src/services` pasta dedicadas ás funções que são responsáveis por interagir com alguma API
- `./src/hooks` alguns hooks essenciais para o projeto
- `./src/types` Contém todas as tipagens do sistema.
- `./src/utils` contém funções úteis que vão ser usadas no projeto como função para formatar número em preço em real

### Algumas funcionalidades

- Recharts para criação de dashboards
- Modais
- Skeleton para carregamentos
- Tabelas mostrando dados em tempo real
- Uso consciente do Server components + tanstack query
- Toast para simular erro ao tentar comprar alguma ação
- useSearchParams para filtros
- múltiplas escolhas de temas
- e mais
