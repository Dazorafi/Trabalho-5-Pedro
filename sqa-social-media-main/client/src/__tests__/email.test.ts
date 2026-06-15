import { isEmailValid, getEmailValidationMessage } from "../utils/email";

describe("Validação de e-mail", () => {
  test("deve aceitar um e-mail válido", () => {
    expect(isEmailValid("teste@email.com")).toBe(true);
  });

  test("deve rejeitar um e-mail inválido", () => {
    expect(isEmailValid("teste-sem-arroba")).toBe(false);
    expect(getEmailValidationMessage("teste-sem-arroba")).toBe("Email inválido");
  });
});