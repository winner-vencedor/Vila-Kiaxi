architecture.md

Esse é um dos documentos mais importantes.

Ele explica como o projeto foi organizado.

Arquitetura utilizada

Por exemplo.

Feature Based Architecture
Estrutura de pastas
src/

modules/

database/

http/

middlewares/

utils/
Camadas
Routes

↓

Controllers

↓

Services

↓

Repositories

↓

Database
Responsabilidade de cada camada

Por exemplo.

Controller.

Recebe a requisição.

Service.

Implementa a regra de negócio.

Repository.

Conversa com o banco.

Database.

Persistência.

Dependências

Quem pode conversar com quem.

Por exemplo.

Controller

↓

Service

↓

Repository

Nunca.

Controller

↓

Database
Fluxo de uma requisição

Exemplo.

Frontend

↓

POST /login

↓

Controller

↓

Service

↓

Repository

↓

Database

↓

Response
Padrões utilizados

Repository Pattern

Dependency Injection

DTO

Factory

Middleware

Segurança

JWT

Hash de senha

Validação

Permissões

Escalabilidade

Como adicionar novos módulos.

Resumindo

Esse documento responde.

Como o sistema foi construído internamente?