import { describe, it, expect } from "vitest";
import { hasToken } from "../../src/utils/hash-token.ts";

describe("hashToken ", () => {
  it("deve gerar o meu hash para o mesmo token", () => {
    const token = "djskjdsjdsdksdjskdjskdjsjjskdj";
    const firstToken = hasToken(token);
    const secondToken = hasToken(token);

    expect(firstToken).toBe(secondToken);
  });

  it("não deve retornar o mesmo hash", () => {
    const token = "djskjdsjdsdksdjskdjskdjsjjskdj";
    const hashtoken = hasToken(token);

    expect(hashtoken).not.toBe(token);
  });

  it("deve produzir um hash hexadecimal com 64 caracteres", () => {
    const hashtokenResult = hasToken("dhshdshdsdjhjsdhshdsjhd");
    expect(hashtokenResult).toMatch(/^[a-f0-9]{64}$/);
  });
});
