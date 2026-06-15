import { isPasswordValid } from "../utils/password";

describe("Validação de senha", () => {
  test("deve aceitar senha forte com exatamente 8 caracteres", () => {
    const senha = "Aa1@aaaa";

    expect(isPasswordValid(senha)).toBe(true);
  });

  test("deve rejeitar senha fraca", () => {
    expect(isPasswordValid("abc")).toBe(false);
  });
});