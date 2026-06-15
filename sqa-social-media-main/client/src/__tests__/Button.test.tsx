import { render, screen } from "@testing-library/react";
import Button from "../components/Button";

describe("Componente Button", () => {
  test("deve renderizar o texto informado", () => {
    render(<Button>Entrar</Button>);

    expect(screen.getByRole("button", { name: "Entrar" })).toBeTruthy();
  });

  test("deve mostrar texto de carregamento quando isLoading for true", () => {
    render(<Button isLoading>Entrar</Button>);

    expect(screen.getByText("Carregando...")).toBeTruthy();
  });
});