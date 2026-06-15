import { expect, test } from "@playwright/test";

test("E2E 1 - usuário deve conseguir criar uma conta", async ({
  page,
}) => {
  const email = `e2e-cadastro-${Date.now()}@teste.com`;
  const senha = "Senha1@Forte";

  await page.goto("/signup");

  await page.getByPlaceholder("seu@email.com").fill(email);

  const camposSenha = page.getByPlaceholder("••••••••");

  await camposSenha.nth(0).fill(senha);
  await camposSenha.nth(1).fill(senha);

 await page
  .getByRole("main")
  .getByRole("button", { name: "Criar Conta" })
  .click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await expect(
    page.getByRole("button", { name: "Sair" })
  ).toBeVisible();
});