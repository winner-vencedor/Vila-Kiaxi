# Testes do backend com Vitest

Este guia ensina a testar o backend do FutVila-Kiaxi usando Vitest, desde os primeiros testes até testes de integração e E2E.

O projeto usa:

- TypeScript
- Fastify
- Zod
- Drizzle ORM
- PostgreSQL
- Argon2
- JWT e cookies
- Faker
- Vitest

O Vitest já está instalado como dependência de desenvolvimento no projeto. Nenhuma biblioteca adicional é necessária para começar a testar funções e rotas Fastify. O Fastify possui o método `inject()`, que permite chamar uma rota sem abrir uma porta HTTP real.

---

## 1. O que é um teste automatizado?

Um teste automatizado executa um trecho do sistema, observa o resultado e verifica se esse resultado é o esperado.

Um teste normalmente possui três etapas:

1. **Arrange**: preparar os dados e dependências.
2. **Act**: executar a função ou a requisição.
3. **Assert**: verificar o resultado.

Exemplo simples:

```ts
const password = "minha-senha";

const result = password.length >= 8;

expect(result).toBe(true);
```

Nesse exemplo:

- `password` é o dado preparado.
- A verificação do tamanho é a ação.
- `expect(result).toBe(true)` é a validação.

---

## 2. O que o Vitest fornece?

O Vitest fornece as principais ferramentas para escrever testes:

- `describe`: agrupa testes relacionados.
- `it`: define um caso de teste.
- `test`: outra forma de definir um caso de teste.
- `expect`: verifica o resultado.
- `beforeEach`: executa uma preparação antes de cada teste.
- `afterEach`: executa uma limpeza depois de cada teste.
- `beforeAll`: executa uma preparação uma vez antes de todos os testes.
- `afterAll`: executa uma limpeza uma vez depois de todos os testes.
- `vi`: cria mocks, spies e funções controladas.

Importação comum:

```ts
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
```

---

## 3. Primeiro teste

Crie os testes dentro de uma pasta `tests` ou próximos do código testado. Uma organização possível é:

```text
tests/
  unit/
  integration/
  e2e/
src/
  utils/
  routes/
```

O Vitest encontra automaticamente arquivos com nomes como:

```text
password.test.ts
password.spec.ts
login.test.ts
```

### Exemplo com `describe`, `it` e `expect`

Arquivo: `tests/unit/example.test.ts`

```ts
import { describe, expect, it } from "vitest";

describe("regras de senha", () => {
  it("deve identificar uma senha com pelo menos oito caracteres", () => {
    const password = "senha-segura";

    const isValid = password.length >= 8;

    expect(isValid).toBe(true);
  });

  it("deve rejeitar uma senha curta", () => {
    const password = "123";

    const isValid = password.length >= 8;

    expect(isValid).toBe(false);
  });
});
```

### `describe`

`describe` agrupa testes que pertencem ao mesmo assunto. Ele melhora a leitura do resultado no terminal.

```ts
describe("hashPassword", () => {
  // testes relacionados ao hash de senha
});
```

### `it` e `test`

`it` e `test` fazem a mesma coisa. Escolha um padrão e mantenha-o no projeto.

```ts
it("deve retornar um hash", () => {
  // teste
});

test("deve retornar um hash", () => {
  // teste equivalente
});
```

Neste guia, será usado `it`.

### `expect`

`expect` recebe o valor observado. O método seguinte define a regra esperada:

```ts
expect(value).toBe(expected);
expect(value).toEqual(expected);
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeDefined();
expect(value).toBeUndefined();
expect(value).toBeNull();
expect(value).toContain(item);
expect(value).toHaveLength(length);
expect(value).toMatchObject(object);
expect(value).toThrow();
```

Diferença entre `toBe` e `toEqual`:

```ts
expect(2 + 2).toBe(4);
expect({ name: "Ana" }).toEqual({ name: "Ana" });
```

Use `toBe` para valores primitivos e `toEqual` para comparar objetos ou arrays pelo conteúdo.

---

## 4. Como executar os testes

O `package.json` atual ainda não possui um script `test`. Como o Vitest está instalado, os testes podem ser executados diretamente:

```bash
npx vitest
```

Para executar uma vez e encerrar o processo:

```bash
npx vitest run
```

Para executar apenas um arquivo:

```bash
npx vitest run tests/unit/password.test.ts
```

Para executar testes cujo nome ou caminho contenha uma palavra:

```bash
npx vitest run login
```

Para ver a interface interativa durante o desenvolvimento:

```bash
npx vitest --watch
```

Mais tarde, podem ser adicionados scripts ao `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:unit": "vitest run tests/unit",
    "test:integration": "vitest run tests/integration",
    "test:e2e": "vitest run tests/e2e"
  }
}
```

---

## 5. Testes unitários

Um teste unitário testa uma unidade pequena e isolada do sistema, normalmente uma função.

Características:

- É rápido.
- Não precisa de banco de dados.
- Não precisa iniciar o servidor.
- Deve ter poucas dependências externas.
- Ajuda a encontrar exatamente onde uma regra falhou.

No seu projeto, bons candidatos são:

- `src/utils/password.ts`
- `src/utils/hash-token.ts`
- `src/utils/token.ts`
- schemas em `src/lib/zod/`

### 5.1 Testando `hasToken`

A função `hasToken` transforma um token em um hash. O mesmo token deve sempre produzir o mesmo resultado.

Arquivo: `tests/unit/hash-token.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { hasToken } from "../../src/utils/hash-token.ts";

describe("hasToken", () => {
  it("deve gerar sempre o mesmo hash para o mesmo token", () => {
    const token = "refresh-token-de-teste";

    const firstHash = hasToken(token);
    const secondHash = hasToken(token);

    expect(firstHash).toBe(secondHash);
  });

  it("não deve retornar o token original", () => {
    const token = "refresh-token-de-teste";

    const result = hasToken(token);

    expect(result).not.toBe(token);
  });

  it("deve produzir um hash hexadecimal com 64 caracteres", () => {
    const result = hasToken("qualquer-token");

    expect(result).toMatch(/^[a-f0-9]{64}$/);
  });
});
```

### `not`

`not` inverte a expectativa:

```ts
expect(result).not.toBe(token);
```

O teste passa quando `result` é diferente de `token`.

### 5.2 Testando senha com Argon2

A implementação do projeto está em `src/utils/password.ts`. O hash não deve ser igual à senha original e deve poder ser validado por `comparePassword`.

Arquivo: `tests/unit/password.test.ts`

```ts
import { describe, expect, it } from "vitest";
import {
  comparePassword,
  hashPassword,
} from "../../src/utils/password.ts";

describe("password utilities", () => {
  it("deve gerar um hash diferente da senha original", async () => {
    const password = "senha-segura-123";

    const passwordHash = await hashPassword(password);

    expect(passwordHash).not.toBe(password);
  });

  it("deve aceitar a senha correta", async () => {
    const password = "senha-segura-123";
    const passwordHash = await hashPassword(password);

    const isValid = await comparePassword(password, passwordHash);

    expect(isValid).toBe(true);
  });

  it("deve rejeitar uma senha incorreta", async () => {
    const passwordHash = await hashPassword("senha-correta");

    const isValid = await comparePassword("senha-errada", passwordHash);

    expect(isValid).toBe(false);
  });
});
```

Como as funções são assíncronas, o teste também precisa ser `async` e usar `await`.

Um erro comum é esquecer o `await`:

```ts
const result = comparePassword(password, passwordHash);
expect(result).toBe(true);
```

Nesse caso, `result` é uma `Promise`, não um booleano. O correto é:

```ts
const result = await comparePassword(password, passwordHash);
expect(result).toBe(true);
```

### 5.3 Testando schemas do Zod

O `loginSchema` do projeto valida:

- `email` como e-mail válido.
- `password` como texto não vazio.
- `password_remember` como booleano.

Arquivo: `tests/unit/login-schema.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { loginSchema } from "../../src/lib/zod/login-schema.ts";

describe("loginSchema", () => {
  it("deve aceitar dados válidos", () => {
    const result = loginSchema.safeParse({
      email: "jogador@example.com",
      password: "senha-segura",
      password_remember: true,
    });

    expect(result.success).toBe(true);
  });

  it("deve rejeitar um e-mail inválido", () => {
    const result = loginSchema.safeParse({
      email: "email-invalido",
      password: "senha-segura",
      password_remember: false,
    });

    expect(result.success).toBe(false);
  });

  it("deve rejeitar uma senha vazia", () => {
    const result = loginSchema.safeParse({
      email: "jogador@example.com",
      password: "",
      password_remember: false,
    });

    expect(result.success).toBe(false);
  });
});
```

`safeParse` não lança uma exceção. Ele retorna um objeto com `success` e, dependendo do resultado, `data` ou `error`.

Quando a exceção é esperada, pode ser usado `parse`:

```ts
expect(() => loginSchema.parse({})).toThrow();
```

Para testes de validação, `safeParse` costuma ser mais claro porque permite observar o resultado sem usar `try/catch`.

---

## 6. Testes assíncronos

O Vitest espera uma Promise quando o teste é `async`:

```ts
it("deve aguardar uma operação assíncrona", async () => {
  const result = await Promise.resolve("sucesso");

  expect(result).toBe("sucesso");
});
```

Também é possível retornar a Promise diretamente:

```ts
it("deve retornar sucesso", () => {
  return Promise.resolve("sucesso").then((result) => {
    expect(result).toBe("sucesso");
  });
});
```

Prefira `async` e `await` porque deixam o teste mais legível.

---

## 7. Hooks: preparação e limpeza

Hooks evitam repetição entre testes.

```ts
import { beforeEach, describe, expect, it } from "vitest";

describe("carrinho", () => {
  let items: string[];

  beforeEach(() => {
    items = [];
  });

  it("deve começar vazio", () => {
    expect(items).toEqual([]);
  });

  it("deve permitir adicionar um item", () => {
    items.push("bola");

    expect(items).toContain("bola");
  });
});
```

- `beforeEach`: executa antes de cada teste.
- `afterEach`: executa depois de cada teste.
- `beforeAll`: executa uma vez antes de todos os testes do grupo.
- `afterAll`: executa uma vez depois de todos os testes do grupo.

Para banco de dados, `beforeEach` pode limpar ou preparar dados. `afterAll` pode fechar conexões.

---

## 8. Mocks, spies e `vi`

Um mock substitui uma dependência real por um comportamento controlado pelo teste.

Isso é útil quando a dependência:

- Faz requisições externas.
- Envia e-mails.
- Usa uma API paga.
- Depende de horário, aleatoriedade ou ambiente.
- É lenta ou difícil de reproduzir.

### 8.1 Espiar uma função

```ts
import { describe, expect, it, vi } from "vitest";

describe("spy", () => {
  it("deve observar chamadas de uma função", () => {
    const logger = {
      info: (message: string) => message,
    };

    const infoSpy = vi.spyOn(logger, "info");

    logger.info("login realizado");

    expect(infoSpy).toHaveBeenCalledOnce();
    expect(infoSpy).toHaveBeenCalledWith("login realizado");

    infoSpy.mockRestore();
  });
});
```

Principais verificações:

```ts
expect(mock).toHaveBeenCalled();
expect(mock).toHaveBeenCalledTimes(1);
expect(mock).toHaveBeenCalledWith(value);
expect(mock).toHaveBeenCalledOnce();
```

### 8.2 Criar uma função mockada

```ts
const sendEmail = vi.fn();

sendEmail.mockResolvedValue({ accepted: true });

await sendEmail("jogador@example.com");

expect(sendEmail).toHaveBeenCalledWith("jogador@example.com");
```

Para função síncrona:

```ts
const getUser = vi.fn().mockReturnValue({ id: "user-id" });
```

Para erro:

```ts
const sendEmail = vi.fn().mockRejectedValue(new Error("Falha no envio"));
```

### 8.3 Mock de módulo

A função `forgot-password` usa serviços externos de e-mail. Em um teste unitário, o envio não deve acontecer de verdade.

A ideia de um mock de módulo é:

```ts
vi.mock("../../src/lib/resendEmail.ts", () => ({
  sendResetEmail: vi.fn().mockResolvedValue(undefined),
}));
```

O nome exportado no mock precisa ser exatamente igual ao nome exportado pelo módulo real. Antes de escrever esse teste, confira o export de `src/lib/resendEmail.ts`.

### 8.4 Limpeza de mocks

Use limpeza para impedir que um teste influencie o seguinte:

```ts
afterEach(() => {
  vi.restoreAllMocks();
});
```

Diferenças importantes:

- `vi.clearAllMocks()`: limpa o histórico de chamadas.
- `vi.resetAllMocks()`: limpa histórico e configurações dos mocks.
- `vi.restoreAllMocks()`: restaura implementações originais de spies.

---

## 9. Testes de integração

Um teste de integração verifica se partes reais do sistema trabalham juntas.

No FutVila-Kiaxi, exemplos são:

- Fastify + plugin de cookies.
- Fastify + validação Zod.
- Rota de login + banco PostgreSQL.
- Rota de registro + hash Argon2 + banco.
- Refresh token + cookies + banco.

O teste de integração não precisa abrir a aplicação com `server.listen()`. O método `inject()` chama o ciclo HTTP interno do Fastify.

### 9.1 Teste de rota com `app.inject`

O servidor Fastify é exportado em `src/app.ts`:

```ts
export { server };
```

Por isso, um teste pode importar esse servidor:

```ts
import { describe, expect, it } from "vitest";
import { server } from "../../src/app.ts";

describe("API", () => {
  it("deve retornar 404 para uma rota inexistente", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/rota-que-nao-existe",
    });

    expect(response.statusCode).toBe(404);
  });
});
```

`inject` aceita os dados de uma requisição HTTP:

```ts
const response = await server.inject({
  method: "POST",
  url: "/auth/login",
  payload: {
    email: "jogador@example.com",
    password: "senha-segura",
    password_remember: false,
  },
});
```

Propriedades mais usadas:

- `method`: método HTTP.
- `url`: caminho da rota.
- `payload`: corpo JSON.
- `headers`: cabeçalhos HTTP.
- `cookies`: cookies da requisição, quando suportado pelo fluxo de teste.

### 9.2 Testando a validação da rota de login

Este cenário testa a integração entre Fastify e Zod. Como os dados são inválidos, a execução deve ser interrompida antes de precisar consultar um usuário real.

Arquivo: `tests/integration/login-validation.test.ts`

```ts
import { afterAll, describe, expect, it } from "vitest";
import { server } from "../../src/app.ts";

describe("POST /auth/login - validação", () => {
  it("deve rejeitar e-mail inválido", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "email-invalido",
        password: "senha-segura",
        password_remember: false,
      },
    });

    expect(response.statusCode).toBe(400);
  });

  it("deve rejeitar password_remember ausente", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "jogador@example.com",
        password: "senha-segura",
      },
    });

    expect(response.statusCode).toBe(400);
  });

  afterAll(async () => {
    await server.close();
  });
});
```

O status exato de validação depende da configuração de erro do Fastify e pode ser ajustado se o projeto personalizar o formato das respostas.

### 9.3 Testando login com PostgreSQL real

Para testar o login completo, o banco deve ter um usuário preparado. O fluxo será:

1. Criar um usuário de teste no PostgreSQL.
2. Gerar o hash com `hashPassword`.
3. Fazer `POST /auth/login`.
4. Verificar status `200`.
5. Verificar os cookies `access_token` e `refresh_token`.
6. Remover o usuário e os tokens ao final.

Exemplo conceitual:

```ts
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { server } from "../../src/app.ts";
import { db } from "../../src/db/index.ts";
import { hashPassword } from "../../src/utils/password.ts";
import { user } from "../../src/db/schema/user.ts";

describe("POST /auth/login - integração", () => {
  const email = "login-test@example.com";
  const password = "senha-de-teste-123";

  beforeAll(async () => {
    const passwordHash = await hashPassword(password);

    await db.insert(user).values({
      name: "Usuário de teste",
      email,
      password: passwordHash,
      gender: "MALE",
      phone: "900000000",
      terms: true,
    });
  });

  it("deve autenticar o usuário e criar cookies", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email,
        password,
        password_remember: false,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ message: "sucesso" });
    expect(response.headers["set-cookie"]).toBeDefined();
  });

  afterAll(async () => {
    // Remova aqui os registros criados para o teste.
    await server.close();
  });
});
```

Os campos obrigatórios do insert devem seguir o schema atual do projeto. Se o schema sofrer alterações, atualize o fixture do teste junto com ele.

### Atenção à conexão do banco

`src/db/index.ts` cria a conexão usando `DATABASE_URL` assim que o módulo é importado. Portanto, os testes de integração precisam de:

- Um `.env.test` ou variáveis de ambiente equivalentes.
- Um banco de teste separado do banco de desenvolvimento.
- Migrações aplicadas nesse banco.
- Limpeza dos dados criados por cada teste.

Nunca use o banco de produção para executar testes.

Uma separação mais fácil de testar é criar uma função de conexão:

```ts
export function createDatabase(databaseUrl: string) {
  return drizzle(databaseUrl, { schema });
}

export const db = createDatabase(process.env.DATABASE_URL!);
```

Com isso, testes avançados podem criar uma conexão específica para o banco de teste sem depender de estado global.

---

## 10. Testes E2E

E2E significa end-to-end. Esse teste verifica um fluxo completo do ponto de vista de um cliente da API.

Exemplo do FutVila-Kiaxi:

1. Registrar usuário.
2. Fazer login.
3. Receber cookies.
4. Usar o cookie para acessar uma rota protegida.
5. Fazer logout.
6. Confirmar que o acesso foi revogado.

Um E2E pode usar `server.inject()` e ainda testar o fluxo HTTP completo dentro do processo. O importante é que vários componentes reais participem do fluxo.

Exemplo de estrutura:

```ts
import { afterAll, describe, expect, it } from "vitest";
import { server } from "../../src/app.ts";

describe("fluxo E2E de autenticação", () => {
  it("deve registrar e autenticar um usuário", async () => {
    const email = `e2e-${Date.now()}@example.com`;

    const registerResponse = await server.inject({
      method: "POST",
      url: "/auth/register",
      payload: {
        name: "Usuário E2E",
        email,
        gender: "MALE",
        password: "senha-e2e-123",
        phone: `9${Date.now()}`.slice(-9),
        terms: true,
      },
    });

    expect(registerResponse.statusCode).toBe(201);

    const loginResponse = await server.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email,
        password: "senha-e2e-123",
        password_remember: false,
      },
    });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.headers["set-cookie"]).toBeDefined();
  });

  afterAll(async () => {
    await server.close();
  });
});
```

Esse exemplo depende do PostgreSQL estar disponível e dos campos do schema de registro permanecerem compatíveis.

### Diferença entre integração e E2E

- **Integração**: verifica a colaboração entre alguns módulos.
- **E2E**: verifica um fluxo completo que representa uma ação real do cliente.

Não é necessário transformar todo teste em E2E. Testes unitários são mais rápidos e localizam melhor os defeitos.

---

## 11. Faker para dados de teste

O projeto já possui `@faker-js/faker`. Ele ajuda a gerar dados diferentes em cada execução.

```ts
import { faker } from "@faker-js/faker";

const testUser = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.string.numeric(9),
  password: "senha-de-teste-123",
};
```

Exemplo em um registro:

```ts
const response = await server.inject({
  method: "POST",
  url: "/auth/register",
  payload: {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    gender: "MALE",
    password: "senha-de-teste-123",
    phone: faker.string.numeric(9),
    terms: true,
  },
});

expect(response.statusCode).toBe(201);
```

Não dependa apenas de dados aleatórios para casos que precisam ser reproduzíveis. Para cenários específicos, use valores fixos. Use Faker principalmente para evitar colisões e criar fixtures.

---

## 12. Fixtures e factories

Uma fixture é um conjunto de dados pronto para um teste. Uma factory é uma função que cria dados com valores padrão e permite sobrescrever alguns campos.

```ts
import { faker } from "@faker-js/faker";

type TestUserInput = Partial<{
  name: string;
  email: string;
  phone: string;
  password: string;
}>;

export function makeTestUser(overrides: TestUserInput = {}) {
  return {
    name: overrides.name ?? faker.person.fullName(),
    email: overrides.email ?? faker.internet.email(),
    phone: overrides.phone ?? faker.string.numeric(9),
    password: overrides.password ?? "senha-de-teste-123",
  };
}
```

Uso:

```ts
const user = makeTestUser({
  email: "login@example.com",
});
```

Factories reduzem repetição e mantêm os testes legíveis.

---

## 13. Cobertura de testes

Cobertura mostra quais partes do código foram executadas pelos testes. Ela não prova sozinha que o sistema está correto, mas ajuda a encontrar áreas sem testes.

Para usar cobertura com Vitest, adicione o provider de cobertura escolhido pelo projeto e execute:

```bash
npx vitest run --coverage
```

As métricas mais comuns são:

- **Statements**: instruções executadas.
- **Branches**: caminhos condicionais executados.
- **Functions**: funções chamadas.
- **Lines**: linhas executadas.

No login, por exemplo, devem existir testes para:

- Usuário inexistente.
- Senha incorreta.
- Login bem-sucedido.
- Criação dos cookies.
- Falha ao inserir refresh token, se esse erro for tratado.

Não busque apenas 100% de cobertura. Busque cobrir regras importantes, caminhos de erro e comportamento público.

---

## 14. Como testar cada cenário do login

A rota `POST /auth/login` possui os seguintes comportamentos principais:

### Usuário inexistente

Entrada válida, mas nenhum usuário com o e-mail informado:

```ts
expect(response.statusCode).toBe(401);
expect(response.json()).toEqual({
  message: "Credenciais inválidos",
});
```

### Senha incorreta

Usuário existe, mas `comparePassword` retorna falso:

```ts
expect(response.statusCode).toBe(401);
```

### Login bem-sucedido

Usuário e senha corretos:

```ts
expect(response.statusCode).toBe(200);
expect(response.json()).toEqual({ message: "sucesso" });
expect(response.headers["set-cookie"]).toBeDefined();
```

### Cookies

O login deve criar:

- `access_token`
- `refresh_token`

O teste pode verificar se os nomes existem no cabeçalho `set-cookie`:

```ts
const cookies = response.headers["set-cookie"];

expect(cookies).toBeDefined();
expect(cookies?.some((cookie) => cookie.startsWith("access_token="))).toBe(true);
expect(cookies?.some((cookie) => cookie.startsWith("refresh_token="))).toBe(true);
```

---

## 15. Testando erros e exceções

Quando uma função deve lançar um erro:

```ts
function requireEmail(email: string) {
  if (!email) {
    throw new Error("E-mail obrigatório");
  }

  return email;
}

it("deve lançar erro quando o e-mail estiver vazio", () => {
  expect(() => requireEmail("")).toThrow("E-mail obrigatório");
});
```

Para função assíncrona:

```ts
async function failAsync() {
  throw new Error("Falha assíncrona");
}

it("deve rejeitar a Promise", async () => {
  await expect(failAsync()).rejects.toThrow("Falha assíncrona");
});
```

Para verificar uma Promise bem-sucedida:

```ts
await expect(Promise.resolve("ok")).resolves.toBe("ok");
```

---

## 16. Configuração opcional do Vitest

Quando a quantidade de testes crescer, crie `vitest.config.ts` na raiz do backend:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: false,
    clearMocks: true,
    restoreMocks: true,
    include: ["tests/**/*.test.ts"],
  },
});
```

### Opções usadas

- `environment: "node"`: informa que os testes rodam no ambiente Node.js.
- `globals: false`: exige importar `describe`, `it` e `expect`, deixando as dependências explícitas.
- `clearMocks: true`: limpa o histórico dos mocks entre os testes.
- `restoreMocks: true`: restaura spies depois dos testes.
- `include`: limita a descoberta aos arquivos de teste definidos.

Como o projeto usa módulos ES e extensões `.ts` nos imports, mantenha a extensão nos imports dos testes, seguindo o padrão atual do código.

---

## 17. Organização recomendada

Uma organização possível:

```text
docs/
  testes-backend-vitest.md

tests/
  unit/
    hash-token.test.ts
    password.test.ts
    login-schema.test.ts
  integration/
    login-validation.test.ts
    login.test.ts
    register.test.ts
    refresh.test.ts
  e2e/
    authentication-flow.test.ts
  factories/
    user.factory.ts
```

Critérios práticos:

- Testes unitários não acessam PostgreSQL.
- Testes de integração usam um banco de teste isolado.
- Testes E2E cobrem fluxos completos e importantes.
- Cada teste deve ter um motivo claro para existir.
- O teste deve descrever o comportamento, não a implementação interna.

---

## 18. O que deve ser mockado?

Mocke dependências externas ou instáveis:

- Resend e envio de e-mail.
- APIs externas.
- Horário atual, quando o resultado depende dele.
- Geradores aleatórios, quando a previsibilidade for necessária.
- Serviços caros ou lentos.

Evite mockar tudo. Se você mockar o banco em todos os testes, pode deixar de descobrir problemas reais de SQL, schema ou relacionamento.

Uma divisão equilibrada é:

- Unitários: mocks quando necessário.
- Integração: PostgreSQL de teste real.
- E2E: o máximo possível de componentes reais.

---

## 19. Erros comuns

### Iniciar `src/server.ts` no teste

Não importe o arquivo que executa `server.listen()` nos testes. Use `src/app.ts`, que exporta o Fastify sem abrir a porta.

Correto:

```ts
import { server } from "../../src/app.ts";
```

Evite:

```ts
import "../../src/server.ts";
```

### Usar banco de desenvolvimento

O teste pode apagar ou modificar dados. Configure sempre uma base exclusiva para testes.

### Esquecer `await`

Funções de Argon2, banco e `inject()` são assíncronas.

### Testes dependentes da ordem

Cada teste deve preparar seus próprios dados e não depender de um teste executado anteriormente.

### Reutilizar o mesmo e-mail em testes de registro

A rota de registro rejeita e-mails duplicados. Use Faker ou valores únicos para evitar colisões.

### Não fechar recursos

Feche o Fastify com `server.close()` e encerre conexões adicionais criadas especificamente pelo teste.

### Testar detalhes internos demais

Prefira verificar status, resposta, cookies e efeitos observáveis. Isso permite refatorar a implementação sem quebrar testes válidos.

---

## 20. Plano de evolução recomendado

### Etapa 1: unitários

Comece por:

1. `hasToken`.
2. `hashPassword`.
3. `comparePassword`.
4. `loginSchema`.
5. Outros schemas Zod.

### Etapa 2: validação das rotas

Use `server.inject()` para testar:

1. Payload inválido.
2. Rotas inexistentes.
3. Status HTTP.
4. Formato básico da resposta.

### Etapa 3: integração com PostgreSQL

Adicione testes para:

1. Registro de usuário.
2. Login válido.
3. Login com senha errada.
4. Refresh token.
5. Logout.

### Etapa 4: E2E

Cubra fluxos reais:

1. Registro e login.
2. Login e refresh.
3. Recuperação e redefinição de senha.
4. Acesso autorizado e não autorizado.

### Etapa 5: qualidade contínua

Execute antes de entregar código:

```bash
npx vitest run
```

Depois, adicione cobertura e execução automática no CI.

---

## 21. Checklist antes de considerar um recurso testado

- [ ] O caminho de sucesso está testado.
- [ ] Entradas inválidas estão testadas.
- [ ] Erros esperados estão testados.
- [ ] O status HTTP foi verificado.
- [ ] O corpo da resposta foi verificado.
- [ ] Cookies ou tokens foram verificados quando aplicável.
- [ ] O banco de teste não é o banco de desenvolvimento.
- [ ] Os dados criados pelo teste são removidos.
- [ ] Mocks são restaurados.
- [ ] Testes podem executar em qualquer ordem.
- [ ] O teste não depende de uma porta HTTP disponível.
- [ ] O teste descreve comportamento observável.

---

## Resumo

Para o backend do FutVila-Kiaxi:

- Use **Vitest** para executar testes e fazer asserções.
- Use `describe` para agrupar cenários.
- Use `it` para declarar cada comportamento.
- Use `expect` para verificar resultados.
- Use `vi` para mocks e spies.
- Use `server.inject()` para testar rotas Fastify sem abrir uma porta.
- Use PostgreSQL separado para testes de integração.
- Use Faker para fixtures dinâmicas.
- Use testes unitários para regras isoladas.
- Use testes de integração para Fastify, Drizzle e PostgreSQL.
- Use E2E para fluxos completos de autenticação.

O objetivo não é testar cada linha sem critério. O objetivo é garantir que as regras importantes do backend continuem funcionando enquanto o código evolui.
