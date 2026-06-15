import { expect, test } from "@playwright/test";

const API_URL = "http://localhost:8080";

function gerarEmail(prefixo: string): string {
  return `${prefixo}-${Date.now()}-${Math.random()}@teste.com`;
}

const SENHA_FORTE = "Senha1@Forte";

test.describe("Testes da API de autenticação", () => {
  test("API 1 - deve cadastrar um novo usuário com sucesso", async ({
    request,
  }) => {
    const email = gerarEmail("cadastro");

    const resposta = await request.post(`${API_URL}/auth/signup`, {
      data: {
        email,
        password: SENHA_FORTE,
      },
    });

    expect(resposta.status()).toBe(200);

    const corpo = await resposta.json();

    expect(corpo.email).toBe(email);
    expect(corpo.id).toBeDefined();
  });

  test("API 2 - deve rejeitar cadastro com e-mail duplicado", async ({
    request,
  }) => {
    const email = gerarEmail("duplicado");

    const primeiroCadastro = await request.post(
      `${API_URL}/auth/signup`,
      {
        data: {
          email,
          password: SENHA_FORTE,
        },
      }
    );

    expect(primeiroCadastro.status()).toBe(200);

    const cadastroDuplicado = await request.post(
      `${API_URL}/auth/signup`,
      {
        data: {
          email,
          password: SENHA_FORTE,
        },
      }
    );

    expect(cadastroDuplicado.status()).toBe(409);

    const corpo = await cadastroDuplicado.json();

    expect(corpo.message).toBe("E-mail já está em uso");
  });

  test("API 3 - deve realizar login com credenciais corretas", async ({
    request,
  }) => {
    const email = gerarEmail("login");

    const cadastro = await request.post(`${API_URL}/auth/signup`, {
      data: {
        email,
        password: SENHA_FORTE,
      },
    });

    expect(cadastro.status()).toBe(200);

    const login = await request.post(`${API_URL}/auth/signin`, {
      data: {
        email,
        password: SENHA_FORTE,
      },
    });

    expect(login.status()).toBe(200);

    const corpo = await login.json();

    expect(corpo.email).toBe(email);
    expect(corpo.id).toBeDefined();
  });

  test("API 4 - deve rejeitar login com senha incorreta", async ({
    request,
  }) => {
    const email = gerarEmail("senha-incorreta");

    const cadastro = await request.post(`${API_URL}/auth/signup`, {
      data: {
        email,
        password: SENHA_FORTE,
      },
    });

    expect(cadastro.status()).toBe(200);

    const login = await request.post(`${API_URL}/auth/signin`, {
      data: {
        email,
        password: "Senha9@Errada",
      },
    });

    expect(login.status()).toBe(401);

    const corpo = await login.json();

    expect(corpo.message).toBe("Credenciais inválidas");
  });
});