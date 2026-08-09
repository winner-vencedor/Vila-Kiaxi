Este documento explica como o banco de dados foi projetado.

Ele não serve para ensinar PostgreSQL. Ele serve para explicar o modelo de dados do seu sistema.

Normalmente contém:

Objetivo

Explicar a estrutura do banco de dados.

Banco utilizado

Exemplo:

PostgreSQL 17
ORM

Exemplo:

Drizzle ORM
Convenções

Por exemplo:

UUID como chave primária
Nomes das tabelas
Convenção de timestamps
Soft Delete (se existir)
Entidades

Exemplo.

User

PlayerProfile

Match

MatchParticipant

MembershipRequest

MatchSuggestion

Chat

Message
Relacionamentos

Você pode colocar uma tabela.

Entidade	Relaciona com
User	PlayerProfile
User	MatchSuggestion
Match	MatchParticipant
Diagrama MER

Aqui você coloca o diagrama do banco.

Índices

Caso existam.

Por exemplo.

email

phone

match_id
Migrations

Como criar.

pnpm drizzle-kit generate
pnpm drizzle-kit migrate
Estrutura de pastas
src/database/

schema.ts

client.ts

migrations/
Resumindo

Esse documento responde:

Como o banco foi projetado?