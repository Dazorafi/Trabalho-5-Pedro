import { render, screen } from "@testing-library/react";
import Input from "../components/Input";

describe("Componente Input", () => {
  test("deve renderizar label, placeholder e mensagem de erro", () => {
    render(
      <Input
        label="Email"
        placeholder="seu@email.com"
        error="Email inválido"
      />
    );

    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByPlaceholderText("seu@email.com")).toBeTruthy();
    expect(screen.getByText("Email inválido")).toBeTruthy();
  });
});