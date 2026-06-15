import { fireEvent, render, screen } from "@testing-library/react";
import PostCard from "../components/PostCard";

describe("Fluxo de curtida para usuário deslogado", () => {
  test("deve exibir alerta quando usuário deslogado tentar curtir", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    const onLikeMock = jest.fn();

    render(
      <PostCard
        post={{
          id: 1,
          title: "Título do post",
          body: "Conteúdo do post",
          liked: false,
        }}
        isAuthenticated={false}
        onLike={onLikeMock}
      />
    );

    fireEvent.click(screen.getByText("Curtir"));

    expect(alertMock).toHaveBeenCalledWith(
      "Você precisa estar autenticado para curtir posts!"
    );
    expect(onLikeMock).not.toHaveBeenCalled();

    alertMock.mockRestore();
  });
});