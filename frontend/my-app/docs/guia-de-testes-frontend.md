# Guia de testes no frontend

Este guia ensina a escrever testes no frontend do Vila-Kiaxi, desde o primeiro teste até testes de formulários, chamadas HTTP e fluxos completos no navegador.

## 1. Tecnologias instaladas

| Tecnologia | Para que serve | Onde aparece |
| --- | --- | --- |
| `vitest` | Executa testes unitários e de integração. Tem `describe`, `it`, `expect` e `vi`. | `vitest.config.mts` |
| `@testing-library/react` | Renderiza componentes React e permite consultá-los como uma pessoa usuária faria. | Testes `.test.tsx` |
| `@testing-library/jest-dom` | Adiciona asserções como `toBeInTheDocument` e `toBeDisabled`. | `src/test/setup.ts` |
| `@testing-library/user-event` | Simula cliques, digitação, teclado e outras interações reais. | Testes de componentes |
| `jsdom` | Cria uma versão simulada do DOM para o Vitest. | `environment: "jsdom"` |
| `@playwright/test` | Testa a aplicação real em navegadores, do início ao fim (E2E). | Testes Playwright |
| `@types/react`, `@types/react-dom`, `@types/node` | Tipos TypeScript usados pelo código e pelos testes. | Compilação |
| `@vitejs/plugin-react` | Permite ao Vitest/Vite transformar componentes React e JSX/TSX. | `vitest.config.mts` |

O `package.json` também contém os scripts:

```bash
pnpm test       # executa o Vitest em modo watch
pnpm test:run   # executa todos os testes uma vez
```

O projeto já está configurado com `jsdom` e carrega `src/test/setup.ts`. Por isso, as asserções do `jest-dom` ficam disponíveis nos testes sem importar o setup em cada arquivo.

## 2. O que é um bom teste?

Um teste deve responder a uma pergunta concreta sobre o comportamento do produto. Uma forma simples de pensar é:

1. **Arrange (preparar):** criar os dados e renderizar o componente.
2. **Act (agir):** clicar, escrever ou chamar a função.
3. **Assert (verificar):** confirmar o resultado esperado.

```tsx
render(<Greating />)                         // Arrange
const titulo = screen.getByRole("heading")   // Act/consulta
expect(titulo).toHaveTextContent("ola mundo") // Assert
```

Prefira testar o que a pessoa vê e faz, e não detalhes internos como nomes de estados, classes CSS ou a implementação de um hook.

## 3. Primeiro teste: `Greating`

O componente `src/shared/components/greating.tsx` mostra um `h1` com o texto `ola mundo`. O teste existente é:

```tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import Greating from "./greating"

describe("Greating", () => {
  it("deve mostrar o texto ola mundo", () => {
    render(<Greating />)

    expect(screen.getByText("ola mundo")).toBeInTheDocument()
  })
})
```

### O que cada parte faz?

- `describe("Greating", () => {})`: agrupa testes relacionados. Também pode ser aninhado para organizar cenários.
- `it("...", () => {})`: define um caso de teste. `test` é um alias de `it`.
- `render(<Greating />)`: monta o componente dentro de um DOM de teste.
- `screen`: consulta o DOM renderizado, sem depender de uma referência frágil ao componente.
- `screen.getByText("ola mundo")`: procura texto visível. Falha imediatamente se não encontrar exatamente um resultado.
- `expect(valor)`: começa uma verificação (assertion).
- `toBeInTheDocument()`: verifica se o elemento existe no DOM. Vem de `jest-dom`.

Execute este teste com:

```bash
pnpm vitest run src/shared/components/greating.test.tsx
```

## 4. Consultas do Testing Library

Escolha a consulta que representa melhor a experiência da pessoa usuária. Em geral, a ordem recomendada é `Role`, `Label`, `Placeholder`, `Text` e, por último, `TestId`.

| Consulta | Exemplo | Quando usar |
| --- | --- | --- |
| `getByRole` | `screen.getByRole("button", { name: "Entrar" })` | Botões, headings, links, caixas de texto e outros elementos semânticos. É a opção preferida. |
| `getByLabelText` | `screen.getByLabelText("Email")` | Inputs associados a um `label`. |
| `getByPlaceholderText` | `screen.getByPlaceholderText("Email")` | Inputs que ainda não têm label acessível. |
| `getByText` | `screen.getByText("ola mundo")` | Texto visível que não é melhor identificado por role. |
| `getByDisplayValue` | `screen.getByDisplayValue("email@teste.com")` | Valor atual de um input. |
| `getByTestId` | `screen.getByTestId("loading")` | Último recurso para elementos sem uma representação acessível. |

Cada família tem três versões:

- `getBy...`: espera que exista exatamente um resultado e falha se não existir.
- `queryBy...`: devolve `null` se não existir. Use para verificar ausência: `expect(screen.queryByText("Erro")).not.toBeInTheDocument()`.
- `findBy...`: devolve uma Promise e espera até o elemento aparecer. Use em resultados assíncronos.

Para vários resultados existem `getAllBy...`, `queryAllBy...` e `findAllBy...`.

Exemplo com o `FormLogin`:

```tsx
render(<FormLogin />)

expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
expect(screen.getByPlaceholderText("Password")).toHaveAttribute("type", "Password")
expect(screen.getByRole("button", { name: "Entrar" })).toBeEnabled()
expect(screen.getByRole("link", { name: /Esqueceu a senha/i }))
  .toHaveAttribute("href", "/forgot-password")
```

Se possível, melhore a acessibilidade do componente usando `<label htmlFor="email">Email</label>` e então prefira `getByLabelText("Email")`.

## 5. Asserções mais usadas

Asserções são as frases que dizem o resultado esperado:

```tsx
expect(value).toBe(3)                         // igualdade estrita
expect(value).toEqual({ name: "Vila-Kiaxi" }) // objetos/arrays pelo conteúdo
expect(value).toBeTruthy()                    // valor considerado verdadeiro
expect(value).toBeNull()                      // null
expect(value).toBeDefined()                   // não é undefined
expect(items).toHaveLength(2)                // tamanho
expect(text).toContain("Kiaxi")              // texto ou item contido
expect(fn).toHaveBeenCalled()                // mock foi chamado
expect(fn).toHaveBeenCalledWith("email")     // chamado com estes argumentos
expect(element).toBeVisible()                // visível
expect(element).toBeDisabled()              // desativado
expect(element).toHaveValue("abc")          // valor de input
expect(element).toHaveAttribute("href", "/home")
expect(element).toHaveClass("text-red-600")
```

Para negar uma condição, use `.not`:

```tsx
expect(screen.queryByText("Mensagem de erro")).not.toBeInTheDocument()
```

Para erros assíncronos:

```tsx
await expect(fetchUser()).resolves.toEqual({ name: "Ana" })
await expect(fetchUser()).rejects.toThrow("Falha")
```

## 6. Interações com `user-event`

`userEvent` é preferível a chamar `fireEvent` diretamente porque reproduz melhor a sequência de eventos do navegador.

```tsx
import userEvent from "@testing-library/user-event"

it("permite escrever no email", async () => {
  const user = userEvent.setup()
  render(<FormLogin />)

  const email = screen.getByPlaceholderText("Email")
  await user.type(email, "jogador@vilakiaxi.com")

  expect(email).toHaveValue("jogador@vilakiaxi.com")
})
```

Operações comuns:

- `await user.click(element)`: clique.
- `await user.type(input, "texto")`: digitação.
- `await user.clear(input)`: limpa um campo.
- `await user.selectOptions(select, "valor")`: escolhe uma opção.
- `await user.click(checkbox)`: alterna checkbox.
- `await user.tab()`: muda o foco pelo teclado.
- `await user.keyboard("{Enter}")`: envia tecla ou combinação.
- `await user.hover(element)`: passa o mouse sobre um elemento.

Use `async` no teste e `await` em todas as ações de `user-event`.

## 7. Testando validação do login

O `FormLogin` usa React Hook Form e o schema Zod. Um teste deve verificar o comportamento visível, por exemplo, se o email inválido mostra uma mensagem:

```tsx
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import FormLogin from "./Form"

describe("FormLogin - validação", () => {
  it("mostra erro quando o email é inválido", async () => {
    const user = userEvent.setup()
    render(<FormLogin />)

    await user.type(screen.getByPlaceholderText("Email"), "email-invalido")
    await user.click(screen.getByRole("button", { name: "Entrar" }))

    expect(await screen.findByText(/email/i)).toBeInTheDocument()
  })
})
```

A mensagem exata deve acompanhar `LoginUserSchema.ts`. Evite fixar no teste uma frase diferente da que o produto realmente apresenta.

## 8. Testes assíncronos e chamadas HTTP

Quando o componente usa `fetch`, não faça uma chamada real ao backend em um teste unitário. Substitua a dependência por um mock e verifique o comportamento do componente.

```tsx
import { beforeEach, describe, expect, it, vi } from "vitest"

describe("login", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("envia email e password para a API", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 }),
    )

    // render, preencher os campos e submeter o FormLogin aqui

    expect(fetchMock).toHaveBeenCalledWith("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "jogador@vilakiaxi.com",
        password: "segredo-valido",
        password_remember: false,
      }),
    })
  })
})
```

Casos importantes para testar:

1. Resposta `200`: o utilizador é redirecionado.
2. Resposta não `ok`: aparece a mensagem de erro da API.
3. `fetch` rejeitado: aparece a mensagem de falha de conexão.
4. Formulário inválido: `fetch` não é chamado.

`vi.fn()` cria uma função falsa, `vi.spyOn(objeto, "metodo")` observa ou substitui um método, `mockReturnValue` devolve um valor síncrono e `mockResolvedValue` devolve uma Promise resolvida. `mockRejectedValue` simula uma Promise rejeitada.

## 9. Mocks de router, toast e módulos

O login usa `useRouter` e `toast`. Em testes isolados, essas dependências externas podem ser simuladas:

```tsx
const pushMock = vi.fn()

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}))

vi.mock("sonner", () => ({
  toast: { error: vi.fn() },
}))
```

Use mocks somente quando a dependência impedir o teste ou tornar o resultado não determinístico. Não faça mock de tudo: quanto mais real for o componente, mais confiança o teste dá.

Depois de cada teste, limpe o estado dos mocks:

```tsx
afterEach(() => {
  vi.clearAllMocks()       // limpa chamadas, mantém a implementação
  // vi.resetAllMocks()    // também reseta implementações
  // vi.restoreAllMocks()  // restaura spies originais
})
```

## 10. Ciclo de vida e isolamento

As funções de ciclo de vida organizam preparação e limpeza:

- `beforeAll`: uma vez antes de todos os testes do bloco.
- `beforeEach`: antes de cada teste.
- `afterEach`: depois de cada teste.
- `afterAll`: uma vez depois de todos os testes.

Cada teste deve poder ser executado sozinho. Não dependa da ordem dos testes nem de dados mutados por outro teste.

## 11. Testes unitários, integração e E2E

### Unitário

Testa uma unidade pequena isolada, como uma função ou `Greating`. É rápido e localiza bem a causa da falha.

### Integração

Testa várias peças juntas, como `FormLogin` + React Hook Form + schema Zod + interação do utilizador. É o tipo mais útil para a maioria dos componentes de negócio.

### E2E com Playwright

Testa a aplicação rodando em um navegador real, por exemplo: abrir login, preencher, submeter e chegar ao dashboard. O Playwright está instalado, mas ainda é necessário criar a configuração e os arquivos de teste E2E.

Exemplo de um teste Playwright:

```ts
import { test, expect } from "@playwright/test"

test("utilizador consegue abrir a página de login", async ({ page }) => {
  await page.goto("http://localhost:3000/login")

  await expect(page.getByText("Vila-Kiaxi")).toBeVisible()
  await expect(page.getByPlaceholder("Email")).toBeVisible()
})
```

A pirâmide recomendada é ter muitos testes unitários rápidos, uma quantidade relevante de testes de integração e poucos E2E cobrindo os fluxos críticos.

## 12. O que não fazer

- Não teste implementação interna quando pode testar o resultado visível.
- Não use `getByTestId` como primeira opção.
- Não use `waitFor` com `setTimeout` para “dar tempo” ao componente.
- Não deixe chamadas HTTP reais em testes unitários.
- Não crie testes que dependem da ordem em que são executados.
- Não verifique apenas que uma função foi chamada; confirme também o resultado que a pessoa vê.
- Não use snapshots gigantes como substituto de asserções específicas.

Quando precisar esperar, prefira `findBy...` ou `waitFor`:

```tsx
await waitFor(() => {
  expect(screen.getByText("Sessão iniciada")).toBeInTheDocument()
})
```

## 13. Cobertura e qualidade

O Vitest pode medir cobertura depois de instalar e configurar um provider de cobertura. A cobertura ajuda a encontrar código sem teste, mas 100% de linhas não significa 100% de comportamento.

Uma boa revisão pergunta:

- O caminho de sucesso está coberto?
- Os erros de validação estão cobertos?
- O estado de carregamento e o estado vazio estão cobertos?
- A interação principal funciona com teclado e mouse?
- Os componentes mostram conteúdo acessível?
- O teste falharia se o comportamento quebrasse?

## 14. Checklist para criar um teste

1. Escreva o comportamento esperado em uma frase.
2. Escolha o nível: unitário, integração ou E2E.
3. Renderize o componente com os dados mínimos.
4. Consulte elementos por role, label ou texto visível.
5. Simule a ação com `userEvent`.
6. Aguarde operações assíncronas com `findBy` ou `waitFor`.
7. Verifique o resultado com `expect`.
8. Limpe mocks e dados no final.
9. Execute o teste isolado.
10. Execute toda a suíte com `pnpm test:run`.

## 15. Resumo rápido da API

### Vitest

`describe`, `it`/`test`, `expect`, `vi`, `beforeAll`, `beforeEach`, `afterEach`, `afterAll`.

### Testing Library React

`render`, `screen`, `within`, `cleanup`.

### Testing Library DOM

`getBy...`, `queryBy...`, `findBy...`, `getAllBy...`, `queryAllBy...`, `findAllBy...`.

### User Event

`userEvent.setup`, `click`, `type`, `clear`, `keyboard`, `tab`, `hover`, `selectOptions`.

### Jest DOM

`toBeInTheDocument`, `toBeVisible`, `toBeEnabled`, `toBeDisabled`, `toHaveTextContent`, `toHaveValue`, `toHaveAttribute`, `toHaveClass`, `toBeChecked`, `toHaveAccessibleName`.

### Mocks

`vi.fn`, `vi.spyOn`, `vi.mock`, `mockImplementation`, `mockReturnValue`, `mockResolvedValue`, `mockRejectedValue`, `vi.clearAllMocks`, `vi.resetAllMocks`, `vi.restoreAllMocks`.

Comece pelos comportamentos que já existem no projeto, como o texto de `Greating`, os campos e links de `FormLogin`, e avance para a submissão e os estados de erro. Assim, cada novo conceito de teste fica ligado a uma funcionalidade real do Vila-Kiaxi.

## 16. Como pensar antes de escrever o teste

Antes de abrir o arquivo de teste, descreva o comportamento em linguagem simples.

Uma descrição boa é específica:

> Quando a pessoa informa um email inválido e envia o formulário, uma mensagem de validação aparece e nenhuma chamada à API é feita.

Uma descrição fraca é vaga:

> Testar o login.

Use estas perguntas para transformar uma funcionalidade em cenários:

1. O que aparece quando o componente começa?
2. O que acontece quando a pessoa usa o caminho feliz?
3. O que acontece quando a entrada é inválida?
4. O que acontece quando a rede falha?
5. O que acontece enquanto uma operação está em andamento?
6. O que acontece quando não há dados?
7. O que acontece quando a pessoa cancela?
8. A funcionalidade pode ser usada pelo teclado?
9. O que acontece em uma tela pequena?
10. O que acontece se a pessoa clicar duas vezes?

Não é necessário transformar todas as perguntas em testes para cada componente. Escolha as que representam riscos reais.

## 17. Anatomia de um arquivo de teste

Uma organização consistente torna o teste fácil de ler:

```tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import Greating from "./greating"

describe("Greating", () => {
  it("mostra a saudação", () => {
    render(<Greating />)

    expect(screen.getByRole("heading")).toHaveTextContent("ola mundo")
  })
})
```

O arquivo normalmente contém:

1. Imports das ferramentas.
2. Imports do componente ou da função a testar.
3. Um `describe` com o nome da unidade.
4. Um ou mais `it` com nomes que descrevem comportamentos.
5. Preparação local do cenário.
6. A ação da pessoa usuária.
7. Asserções sobre o resultado.

O nome do teste deve completar a frase “deve...” ou “quando..., então...”.

Bons nomes:

```tsx
it("mostra uma mensagem quando o email é inválido", () => {})
it("envia os dados válidos para a API", () => {})
it("desabilita o botão enquanto o login está carregando", () => {})
```

Nomes pouco úteis:

```tsx
it("teste 1", () => {})
it("funciona", () => {})
it("login", () => {})
```

## 18. Arrange, Act e Assert com mais detalhe

O padrão AAA ajuda a separar causa e resultado.

```tsx
it("marca a opção de lembrar a senha", async () => {
  const user = userEvent.setup()
  render(<FormLogin />)
  const checkbox = screen.getByRole("checkbox", {
    name: "Lembrar da senha",
  })

  await user.click(checkbox)

  expect(checkbox).toBeChecked()
})
```

O teste prepara o componente, executa uma ação real e verifica o efeito. Evite misturar muitas ações sem verificar o resultado:

```tsx
await user.type(email, "a@b.com")
await user.type(password, "senha")
await user.click(submit)
await user.click(checkbox)
```

Esse teste pode estar verificando vários comportamentos ao mesmo tempo. Divida-o se uma falha não deixar claro qual regra quebrou.

## 19. Testes de componentes com props

Quando um componente recebe props, crie cenários para valores importantes.

```tsx
type StatusProps = {
  label: string
  active?: boolean
}

function Status({ label, active = false }: StatusProps) {
  return (
    <span aria-label={label} data-active={active}>
      {active ? "Ativo" : "Inativo"}
    </span>
  )
}
```

```tsx
describe("Status", () => {
  it("mostra o estado ativo", () => {
    render(<Status label="Estado do jogador" active />)

    expect(screen.getByLabelText("Estado do jogador"))
      .toHaveTextContent("Ativo")
  })

  it("mostra o estado inativo por padrão", () => {
    render(<Status label="Estado do jogador" />)

    expect(screen.getByLabelText("Estado do jogador"))
      .toHaveTextContent("Inativo")
  })
})
```

Teste uma prop quando ela altera comportamento, conteúdo, acessibilidade ou interação. Não crie um teste separado para cada combinação se várias combinações são equivalentes.

## 20. Testando o componente `Button`

O projeto possui um `Button` baseado em `@base-ui/react/button`. O teste deve privilegiar o comportamento público:

```tsx
import { Button } from "@/components/ui/button"

describe("Button", () => {
  it("mostra o texto recebido", () => {
    render(<Button>Guardar</Button>)

    expect(screen.getByRole("button", { name: "Guardar" }))
      .toBeInTheDocument()
  })

  it("pode ser desabilitado", () => {
    render(<Button disabled>Guardar</Button>)

    expect(screen.getByRole("button", { name: "Guardar" }))
      .toBeDisabled()
  })
})
```

Para testar o callback:

```tsx
it("chama o callback quando é clicado", async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Guardar</Button>)

  await user.click(screen.getByRole("button", { name: "Guardar" }))

  expect(onClick).toHaveBeenCalledTimes(1)
})
```

`toHaveBeenCalledTimes(1)` ajuda a detectar cliques duplicados e efeitos inesperados.

## 21. Testando links e navegação

Um link pode ser verificado pelo nome acessível e pelo destino:

```tsx
it("aponta para a página de recuperação", () => {
  render(<FormLogin />)

  const link = screen.getByRole("link", {
    name: /Esqueceu a senha/i,
  })

  expect(link).toHaveAttribute("href", "/forgot-password")
})
```

Não é necessário testar o funcionamento interno do Next.js. A responsabilidade deste teste é confirmar que o componente publicou o destino correto. Para um fluxo de navegação completo, prefira um teste Playwright.

## 22. Testando listas

Componentes de listas devem ser testados com zero, um e vários itens quando esses estados têm comportamento diferente.

```tsx
type Player = { id: string; name: string }

function PlayerList({ players }: { players: Player[] }) {
  if (players.length === 0) {
    return <p>Nenhum jogador encontrado.</p>
  }

  return (
    <ul aria-label="Jogadores">
      {players.map((player) => (
        <li key={player.id}>{player.name}</li>
      ))}
    </ul>
  )
}
```

```tsx
it("mostra o estado vazio", () => {
  render(<PlayerList players={[]} />)

  expect(screen.getByText("Nenhum jogador encontrado.")).toBeInTheDocument()
})

it("mostra todos os jogadores", () => {
  render(
    <PlayerList
      players={[
        { id: "1", name: "Ana" },
        { id: "2", name: "João" },
      ]}
    />,
  )

  expect(screen.getAllByRole("listitem")).toHaveLength(2)
  expect(screen.getByText("Ana")).toBeInTheDocument()
})
```

Use `within(element)` quando uma página contém várias listas:

```tsx
const list = screen.getByRole("list", { name: "Jogadores" })
expect(within(list).getByText("Ana")).toBeInTheDocument()
```

## 23. Testando estados de carregamento

Um componente que busca dados normalmente possui estados de inicialização, carregamento, sucesso, lista vazia e erro.

```tsx
it("mostra o conteúdo depois de carregar", async () => {
  render(<Squad />)

  expect(screen.getByText("A carregar...")).toBeInTheDocument()
  expect(await screen.findByText("Plantel Vila-Kiaxi")).toBeInTheDocument()
  expect(screen.queryByText("A carregar...")).not.toBeInTheDocument()
})
```

Não use `getByText` imediatamente para algo assíncrono. `getByText` consulta uma vez; `findByText` espera a atualização do DOM.

## 24. Testando estado de erro

Um erro deve ser testado pela mensagem que a pessoa vê e, quando relevante, por uma ação de recuperação:

```tsx
it("mostra um erro e permite tentar novamente", async () => {
  const user = userEvent.setup()
  render(<Matches />)

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Não foi possível carregar os jogos",
  )

  await user.click(screen.getByRole("button", { name: "Tentar novamente" }))
  expect(screen.getByText("A carregar...")).toBeInTheDocument()
})
```

Quando o componente usa `role="alert"`, a mensagem pode ser encontrada de maneira semântica. Isso melhora o teste e a acessibilidade.

## 25. Testando checkboxes e radios

Checkboxes representam escolhas independentes. Radios representam uma escolha entre opções.

```tsx
it("permite ativar notificações", async () => {
  const user = userEvent.setup()
  render(<Settings />)

  const checkbox = screen.getByRole("checkbox", {
    name: "Receber notificações",
  })

  expect(checkbox).not.toBeChecked()
  await user.click(checkbox)
  expect(checkbox).toBeChecked()
})
```

Para radios:

```tsx
it("seleciona o modo escuro", async () => {
  const user = userEvent.setup()
  render(<Appearance />)

  const dark = screen.getByRole("radio", { name: "Escuro" })
  await user.click(dark)

  expect(dark).toBeChecked()
})
```

## 26. Testando inputs de texto

Verifique o valor depois da ação e não apenas se o input existe:

```tsx
it("atualiza o nome do perfil", async () => {
  const user = userEvent.setup()
  render(<Profile />)

  const name = screen.getByRole("textbox", { name: "Nome" })
  await user.clear(name)
  await user.type(name, "Maria Silva")

  expect(name).toHaveValue("Maria Silva")
})
```

Para inputs de email e password, labels explícitos tornam o teste mais claro:

```tsx
const email = screen.getByLabelText("Email")
const password = screen.getByLabelText("Password")
```

## 27. Testando formulários completos

Um formulário costuma precisar de uma matriz pequena de cenários:

| Cenário | Preparação | Resultado esperado |
| --- | --- | --- |
| Vazio | Enviar sem preencher | Mensagens de campos obrigatórios |
| Email inválido | Digitar texto sem formato | Erro no email |
| Password curta | Digitar password menor | Erro na password |
| Dados válidos | Preencher corretamente | Callback ou API chamado |
| API com erro | Mock retorna `ok: false` | Mensagem de erro visível |
| Rede indisponível | Mock rejeita | Mensagem de conexão |

Não precisa testar todas as combinações se o schema Zod já possui testes próprios. Teste os limites importantes e a integração entre schema e formulário.

## 28. Testando o schema Zod separadamente

Regras puras de validação podem ser testadas sem renderizar React:

```tsx
import { UserLoginFormSchema } from "@/features/auth/schemas/LoginUserSchema"

it("aceita dados válidos", () => {
  const result = UserLoginFormSchema.safeParse({
    email: "jogador@vilakiaxi.com",
    password: "segredo-valido",
    password_remember: false,
  })

  expect(result.success).toBe(true)
})

it("rejeita email inválido", () => {
  const result = UserLoginFormSchema.safeParse({
    email: "email-invalido",
    password: "segredo-valido",
    password_remember: false,
  })

  expect(result.success).toBe(false)
})
```

`safeParse` devolve um objeto com `success`, sem lançar exceção. Use `parse` quando quiser verificar explicitamente uma exceção.

## 29. Testando funções utilitárias

Funções puras são candidatas ideais para testes unitários:

```tsx
function formatScore(goals: number): string {
  return `${goals} ${goals === 1 ? "golo" : "golos"}`
}

it.each([
  [0, "0 golos"],
  [1, "1 golo"],
  [2, "2 golos"],
])("formata %s como %s", (goals, expected) => {
  expect(formatScore(goals)).toBe(expected)
})
```

`it.each` executa o mesmo teste para várias entradas. Isso evita duplicação quando a regra é a mesma.

## 30. Dados de teste e factories

Quando muitos testes repetem objetos, use uma factory pequena:

```tsx
function makeUser(overrides: Partial<User> = {}): User {
  return {
    id: "user-1",
    name: "Jogador de teste",
    email: "jogador@vilakiaxi.com",
    ...overrides,
  }
}
```

Uso:

```tsx
const user = makeUser({ name: "Capitão" })
render(<Profile user={user} />)
expect(screen.getByText("Capitão")).toBeInTheDocument()
```

A factory deve criar dados previsíveis. Evite datas aleatórias, valores aleatórios e ids gerados com `Math.random`, porque tornam a falha difícil de reproduzir.

## 35. `waitFor` corretamente

`waitFor` repete uma função até ela não lançar erro ou até o timeout terminar:

```tsx
await waitFor(() => {
  expect(apiMock).toHaveBeenCalledTimes(1)
})
```

Use-o para efeitos que não possuem um elemento conveniente para `findBy`. Para esperar um elemento, prefira:

```tsx
expect(await screen.findByText("Resultado")).toBeInTheDocument()
```

Não coloque ações dentro do callback de `waitFor`. A ação deve acontecer uma vez, antes da espera:

```tsx
await user.click(button)
expect(await screen.findByText("Resultado")).toBeInTheDocument()
```

## 36. Timers e relógio do sistema

Quando um componente usa `setTimeout`, `setInterval` ou uma data atual, o Vitest pode controlar o relógio:

```tsx
beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

it("esconde a mensagem depois de dois segundos", async () => {
  render(<TemporaryMessage />)

  expect(screen.getByText("Guardado")).toBeInTheDocument()
  await vi.advanceTimersByTimeAsync(2000)

  expect(screen.queryByText("Guardado")).not.toBeInTheDocument()
})
```

Sempre restaure timers reais no `afterEach`. Para datas, use valores fixos:

```tsx
vi.setSystemTime(new Date("2026-09-20T10:00:00Z"))
```

Assim o teste não depende do relógio ou do fuso horário da máquina.

## 37. Testando foco e teclado

A navegação por teclado é parte do comportamento de menus, modais e formulários:

```tsx
it("move o foco para o campo de password", async () => {
  const user = userEvent.setup()
  render(<FormLogin />)

  await user.tab()
  await user.tab()

  expect(document.activeElement).toBe(
    screen.getByPlaceholderText("Password"),
  )
})
```

Para um diálogo, confirme foco e fechamento:

```tsx
await user.keyboard("{Escape}")
expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
```

## 38. Testando acessibilidade

Os testes acessíveis previnem regressões de usabilidade:

```tsx
expect(screen.getByRole("button", { name: "Entrar" }))
  .toHaveAccessibleName("Entrar")
expect(input).toHaveAttribute("aria-invalid", "true")
expect(screen.getByRole("alert")).toHaveTextContent("Email inválido")
```

Use filtros de role quando necessário:

```tsx
screen.getByRole("heading", { level: 1, name: "Vila-Kiaxi" })
screen.getByRole("checkbox", { name: "Lembrar da senha", checked: false })
```

Se uma consulta acessível falha, verifique primeiro o HTML. Muitas vezes o teste revela uma melhoria real de acessibilidade.

## 39. Labels e erros associados

Um formulário acessível associa label, input e mensagem:

```tsx
<label htmlFor="email">Email</label>
<input
  id="email"
  aria-invalid={Boolean(errors.email)}
  aria-describedby={errors.email ? "email-error" : undefined}
  {...register("email")}
/>
{errors.email && (
  <span id="email-error" role="alert">
    {errors.email.message}
  </span>
)}
```

O teste pode usar:

```tsx
const email = screen.getByLabelText("Email")
expect(email).toHaveAttribute("aria-describedby", "email-error")
expect(screen.getByRole("alert")).toBeInTheDocument()
```

Labels são mais robustos que placeholders porque continuam identificando o campo depois que a pessoa começa a escrever.

## 40. Testando modais

Um modal deve ter papel, nome e forma clara de fechar:

```tsx
it("abre e fecha o pedido de adesão", async () => {
  const user = userEvent.setup()
  render(<MembershipRequest />)

  await user.click(screen.getByRole("button", { name: "Pedir adesão" }))
  expect(screen.getByRole("dialog", { name: "Pedido de adesão" }))
    .toBeInTheDocument()

  await user.click(screen.getByRole("button", { name: "Fechar" }))
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
})
```

## 48. Debugging de testes

Quando um teste falhar, pergunte:

1. O elemento ainda não apareceu?
2. O nome acessível está diferente?
3. Existem vários resultados?
4. A Promise foi aguardada?
5. O mock recebeu argumentos diferentes?
6. Falta algum provider?

Durante a investigação:

```tsx
screen.debug()
```

Também pode imprimir um elemento específico:

```tsx
screen.debug(screen.getByRole("form"))
```

Remova logs de investigação quando o teste ficar claro.

## 49. Testes de regressão

Um teste de regressão nasce de um bug real:

1. Reproduza o bug manualmente.
2. Escreva um teste que falha.
3. Corrija o código.
4. Execute o teste novamente.
5. Mantenha o teste para impedir o retorno do bug.

Exemplo de nome: `it("mantém o botão desabilitado enquanto o pedido está em andamento", () => {})`.

Esse teste preserva conhecimento do produto, não apenas detalhes de implementação.

