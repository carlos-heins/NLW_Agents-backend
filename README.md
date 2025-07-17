# NLW Agents

Este projeto foi desenvolvido durante a **Semana NLW** da **RocketSeat** e tem como objetivo criar uma IA para responder comentários em salas de streaming. O projeto utiliza tecnologias modernas e padrões de desenvolvimento para garantir escalabilidade e eficiência.

---

## Tecnologias Utilizadas

- **Fastify**: Framework web rápido e leve para Node.js.
- **Zod**: Biblioteca para validação e tipagem de dados.
- **Drizzle ORM**: ORM moderno e leve para manipulação de bancos de dados.
- **Postgres.js**: Cliente PostgreSQL eficiente e minimalista.
- **Docker**: Utilizado para configurar o banco de dados PostgreSQL com extensões como `pgvector`.
- **TypeScript**: Linguagem de programação tipada para desenvolvimento seguro e escalável.

---

## Padrões de Projeto

- **Arquitetura Modular**: O projeto é dividido em módulos como `http`, `db` e `env` para facilitar a manutenção e escalabilidade.
- **Validação com Zod**: Todas as variáveis de ambiente e dados de entrada são validados utilizando Zod.
- **ORM com Drizzle**: Utilização de Drizzle ORM para manipulação de tabelas e migrações de banco de dados.
- **Configuração com Docker**: Banco de dados configurado com Docker Compose para facilitar o setup.

---

## Setup do Projeto

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **Docker** (para configurar o banco de dados)
- **PostgreSQL** (caso não utilize Docker)

### Passos para Configuração

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/nlw-agents.git
   cd nlw-agents/server
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   - Renomeie o arquivo `.env.example` para `.env` e configure os valores necessários:
     ```env
     PORT=3333
     DATABASE_URL="postgresql://user:password@localhost:5432/agents"
     ```

4. **Inicie o banco de dados com Docker**:
   - Certifique-se de que o Docker está instalado e execute:
     ```bash
     docker-compose up -d
     ```

5. **Execute as migrações**:
   - Utilize o Drizzle para aplicar as migrações no banco de dados:
     ```bash
     npx drizzle-kit generate:pg
     ```

6. **Inicie o servidor**:
   - Para iniciar o servidor em modo de desenvolvimento:
     ```bash
     npm run dev
     ```

---

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento.
- `npm run start`: Inicia o servidor em produção.
- `npm run db:seed`: Popula o banco de dados com dados iniciais.

---

## Estrutura do Projeto

```plaintext
src/
├── db/                # Configuração do banco de dados
├── env.ts             # Validação de variáveis de ambiente
├── http/              # Rotas HTTP
├── server.ts          # Configuração do servidor Fastify
```

---

## Licença

Este projeto é licenciado sob a **ISC License**.

---

Desenvolvido com 💜 durante a Semana NLW da RocketSeat.