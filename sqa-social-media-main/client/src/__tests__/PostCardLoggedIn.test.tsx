import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PostCard from "../components/PostCard";

describe("Fluxo de curtida para usuário logado", () => {
  test("deve chamar onLike e alterar botão para Curtido", async () => {
    const onLikeMock = jest.fn().mockResolvedValue(undefined);

    render(
      <PostCard
        post={{
          id: 1,
          title: "Título do post",
          body: "Conteúdo do post",
          liked: false,
        }}
        isAuthenticated={true}
        onLike={onLikeMock}
      />
    );

    fireEvent.click(screen.getByText("Curtir"));

    expect(onLikeMock).toHaveBeenCalledWith(1);

    await waitFor(() => {
      expect(screen.getByText("Curtido")).toBeTruthy();
    });
  });
});