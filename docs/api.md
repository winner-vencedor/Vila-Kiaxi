2. api.md

Este documento explica a API.

Ele responde.

Como o frontend conversa com o backend?

Normalmente possui.

Base URL
/api/v1
Autenticação

JWT

Bearer Token

Refresh Token

Rotas

Por exemplo.

POST /login

POST /register

GET /matches

POST /matches

PATCH /matches/:id

DELETE /matches/:id
Corpo das requisições

Exemplo.

{
 "email":"..."
}
Respostas

200

401

404

500

Middleware

Autenticação

Permissões

Validação

Fluxo
Frontend

↓

Controller

↓

Service

↓

Repository

↓

Database
Tratamento de erros

Formato padrão.

{
 "message":"..."
}
Versionamento
v1

v2
Resumindo

Esse documento responde.

Como consumir a API?