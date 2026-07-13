# FutVila-Kiaxi - Frontend

O **FutVila-Kiaxi** é uma aplicação web desenvolvida com **Next.js** para facilitar a organização e o agendamento de jogos de futebol da congregação.

O sistema foi projetado para oferecer uma experiência simples, rápida e intuitiva aos usuários, permitindo que os membros da congregação acompanhem e participem dos jogos de forma organizada.

Diferentemente de sites institucionais, o projeto **não possui uma Landing Page**. O fluxo da aplicação inicia diretamente na tela de autenticação.

---

# Sobre o Projeto

O frontend é responsável por toda a interface gráfica da aplicação, oferecendo uma experiência moderna, responsiva e acessível.

A aplicação comunica-se com o backend através de uma API REST para realizar autenticação, cadastro de usuários, gerenciamento de dados e demais funcionalidades do sistema.

Todo o projeto está sendo desenvolvido utilizando as boas práticas do ecossistema React e Next.js, priorizando organização, reutilização de componentes e escalabilidade.

---

# Objetivos

- Facilitar a organização dos jogos da congregação.
- Centralizar o gerenciamento dos participantes.
- Oferecer uma interface moderna e intuitiva.
- Garantir uma experiência responsiva para dispositivos móveis e desktops.
- Manter uma arquitetura escalável e de fácil manutenção.

---

# Fluxo Inicial da Aplicação

Ao acessar a aplicação, o usuário seguirá o seguinte fluxo:

### 1. Login

O sistema inicia diretamente na tela de login.

São solicitadas as seguintes informações:

- E-mail
- Senha

Caso as credenciais sejam válidas, o usuário será redirecionado para o Dashboard.

---

### 2. Cadastro

Caso o usuário ainda não possua uma conta, poderá criar uma nova.

As informações solicitadas são:

- Nome completo
- Número de telefone
- E-mail
- Senha
- Confirmação da senha

Após concluir o cadastro, o usuário poderá realizar o login e acessar o sistema.

---

### 3. Dashboard

Após autenticar-se com sucesso, o usuário será redirecionado para a página principal da aplicação (Dashboard), onde terá acesso às funcionalidades disponibilizadas pelo sistema.

---
### Funcionalidades do projecto

Autenticação
Perfil do usuário
Agendamento de jogos
Participantes
Confirmação de presença
Histórico de jogos
Estatísticas
Notificações
Administração
Configurações
Chat entre jogadores
Ranking dos jogadores

### 🔐 Auth (features/auth)
Responsável por toda a autenticação do sistema.
Funcionalidades

Login
Cadastro
Recuperação de senha
Alteração de senha
Logout
Validação da sessão
Proteção de rotas

### 👤 Profile (features/profile)
Gerencia os dados do usuário.
Funcionalidades

Visualizar perfil
Editar nome
Alterar telefone
Alterar foto
Alterar senha
Informações da conta

### ⚽ Games (features/games)
É o coração do sistema.
Funcionalidades

Criar jogo
Editar jogo
Cancelar jogo
Definir local
Definir data
Definir horário
Definir número máximo de participantes
Visualizar detalhes do jogo

### 👥 Participants (features/participants)
Gerencia quem participa dos jogos.
Funcionalidades

Lista de participantes
Adicionar participante
Remover participante
Visualizar participantes inscritos

### ✅ Attendance (features/attendance)
Confirmação de presença.
Funcionalidades

Confirmar presença
Cancelar presença
Lista de confirmados
Lista de ausentes

### 📅 History (features/history)
Armazena jogos já realizados.
Funcionalidades

Histórico dos jogos
Participantes de cada jogo
Datas
Resultados (caso exista)

### 📊 Statistics (features/statistics)
Exibe informações estatísticas.
Funcionalidades

Jogos realizados
Participações do usuário
Número de presenças
Frequência
Jogadores mais ativos

### 🔔 Notifications (features/notifications)
Responsável pelos avisos.
Funcionalidades:

Novos jogos
Alterações de horários
Cancelamentos
Confirmações
Mensagens do administrador

### 🛡️ Admin (features/admin)
Área exclusiva dos administradores.
Funcionalidades:

Gerenciar usuários
Criar jogos
Editar jogos
Excluir jogos
Enviar avisos
Controlar participantes
Definir administradores

### ⚙️ Settings (features/settings)
Preferências do usuário.
Funcionalidades:

Alterar tema
Idioma
Preferências de notificações
Configurações da conta

### 💬 Chat (features/chat)
Comunicação entre os participantes.
Funcionalidades:

Conversa geral
Mensagens em tempo real
Compartilhamento de informações do jogo

### 🏆 Ranking (features/ranking)

Classificação dos jogadores.
Funcionalidades:

Ranking de participação
Ranking de presenças
Jogadores mais ativos
Estatísticas individuais

-----


# Tecnologias

O projeto utiliza tecnologias modernas do ecossistema JavaScript e React.

| Tecnologia | Finalidade |
|------------|------------|
| **Next.js** | Framework React utilizado para construção da aplicação. |
| **React** | Biblioteca responsável pela construção da interface. |
| **TypeScript** | Adiciona tipagem estática, aumentando a segurança e a qualidade do código. |
| **React Hook Form** | Gerenciamento eficiente de formulários. |
| **Zod** | Validação de dados através de esquemas tipados. |
| **@hookform/resolvers** | Integra o React Hook Form com o Zod. |
| **shadcn/ui** | Biblioteca de componentes modernos, acessíveis e reutilizáveis. |
| **Tailwind CSS** | Framework CSS utilitário para construção rápida da interface. |
| **Lucide React** | Biblioteca de ícones utilizada na interface. |
| **clsx** | Facilita a manipulação condicional de classes CSS. |
| **tailwind-merge** | Resolve conflitos entre classes do Tailwind CSS. |
| **class-variance-authority (CVA)** | Criação de componentes altamente reutilizáveis com variantes. |
| **ESLint** | Ferramenta para padronização e qualidade do código. |
| **Prettier** *(futuramente)* | Formatação automática do código. |

---

# 📁 Estrutura do Projeto
````
src
│
├── app
│
├── features
│
│   ├── auth
│   │   ├── components
│   │   ├── hooks
│   │   ├── schemas
│   │   ├── services
│   │   ├── types
│   │   └── index.ts
│   │
│   ├── games
│   │   ├── components
│   │   ├── hooks
│   │   ├── services
│   │   ├── schemas
│   │   └── index.ts
│   │
│   ├── profile
│   │
│   ├── notifications
│   │
│   └── dashboard
│
├── shared
│
├── lib
│
└── types
```
Estrutura explícita de todas as funcionalidade

src/
├── app/
│
├── features/
│   ├── auth/
│   ├── profile/
│   ├── games/
│   ├── participants/
│   ├── attendance/
│   ├── history/
│   ├── statistics/
│   ├── notifications/
│   ├── admin/
│   ├── settings/
│   ├── chat/
│   └── ranking/
│
├── components/
├── lib/
├── providers/
├── styles/
├── types/
└── utils/
---


# 📱 Responsividade

A interface foi planejada para funcionar corretamente em:

- Desktop
- Notebook
- Tablet
- Smartphone

---

# 🎨 Interface

A interface segue os princípios de:

- Design moderno
- Componentização
- Reutilização
- Acessibilidade
- Responsividade

Os componentes visuais são construídos utilizando o **shadcn/ui** juntamente com o **Tailwind CSS**.

---

# 🔒 Autenticação

A autenticação será realizada através da API do backend.

O frontend será responsável por:

- Envio das credenciais.
- Validação dos formulários.
- Tratamento de erros.
- Armazenamento da sessão (definido conforme a estratégia adotada no backend).
- Controle de acesso às páginas protegidas.

---

# 📦 Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

---

# ⚙ Configuração

Crie um arquivo:

```
.env.local
```

Exemplo:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

# ▶ Executando o Projeto

Modo de desenvolvimento

```bash
npm run dev
```

Build da aplicação

```bash
npm run build
```

Executar em produção

```bash
npm run start
```

Executar o ESLint

```bash
npm run lint
```

---

# 🌐 Comunicação com o Backend

Toda a comunicação do frontend é realizada através de requisições HTTP para a API.

Exemplos:

```
POST /auth/login

POST /auth/register

GET /users/me
```

---

# 📌 Boas Práticas

Durante o desenvolvimento serão seguidos os seguintes princípios:

- Componentes reutilizáveis.
- Separação de responsabilidades.
- Código limpo.
- Organização por funcionalidades.
- Tipagem completa com TypeScript.
- Validação de dados utilizando Zod.
- Formulários utilizando React Hook Form.
- Interface consistente utilizando shadcn/ui.

---

# 🚧 Roadmap

## Em desenvolvimento
Marcar com x as tarefas já realizadas Marionel

- [x] Configuração do projeto
- [x] Estrutura inicial
- [ ] Sistema de Login
- [ ] Sistema de Cadastro
- [ ] Dashboard
- [ ] Perfil do usuário
- [ ] Agendamento de jogos
- [ ] Lista de participantes
- [ ] Histórico de jogos
- [ ] Notificações
- [ ] Tema escuro
- [ ] Testes automatizados

---

# 📄 Licença

Este projeto faz parte do sistema **FutVila-Kiaxi** e destina-se ao gerenciamento e organização dos jogos da congregação.

O código está em desenvolvimento e poderá receber novas funcionalidades conforme a evolução do projeto.