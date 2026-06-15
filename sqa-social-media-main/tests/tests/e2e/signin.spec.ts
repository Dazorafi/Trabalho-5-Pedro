import { expect, test } from "@playwright/test";

const API_URL = "http://localhost:8080";

test("E2E 2 - usuário deve conseguir entrar com credenciais corretas", async ({
  page,
  request,
}) => {
  const email = `e2e-login-${Date.now()}@teste.com`;
  const senha = "Senha1@Forte";

  const cadastro = await request.post(`${API_URL}/auth/signup`, {
    data: {
      email,
      password: senha,
    },
  });

  expect(cadastro.status()).toBe(200);

  await page.goto("/signin");

  await page.getByPlaceholder("seu@email.com").fill(email);
  await page.getByPlaceholder("••••••••").fill(senha);

  await page
  .getByRole("main")
  .getByRole("button", { name: "Entrar" })
  .click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await expect(
    page.getByRole("button", { name: "Sair" })
  ).toBeVisible();
});