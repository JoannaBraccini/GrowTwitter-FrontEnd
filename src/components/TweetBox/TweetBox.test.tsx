import { describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen, fireEvent } from "../../test/test-utils";
import { TweetBox, TweetBoxProps } from "./index";
import { Tweet, UserBase } from "../../@types";

// Mock dos hooks
vi.mock("../../hooks", () => ({
  useProfileNavigation: () => ({
    handleProfileClick: vi.fn(),
  }),
  useVerificationIcon: () => ({
    icon: "mock-icon.svg",
    label: "Verificado",
  }),
}));

describe("TweetBox Component", () => {
  const mockUser: UserBase = {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    avatarUrl: "https://example.com/avatar.jpg",
    verified: "NONE",
  };

  const mockTweet: Tweet = {
    id: "1",
    userId: "1",
    content: "Test tweet content",
    tweetType: "TWEET",
    createdAt: "2023-01-01T00:00:00Z",
    likes: [],
    retweets: [],
    replies: [],
  };

  const defaultProps: TweetBoxProps = {
    tweetUser: mockUser,
    tweet: mockTweet,
    mode: "create",
    onTweetSubmit: vi.fn(),
    initialContent: "",
    initialImageUrl: "",
  };

  it("should render in create mode with correct placeholder", () => {
    renderWithProviders(<TweetBox {...defaultProps} />);

    const textarea = screen.getByPlaceholderText("O que está acontencendo?");
    expect(textarea).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: "Postar" });
    expect(submitButton).toBeInTheDocument();
  });

  it("should render in reply mode with correct content", () => {
    const replyProps = {
      ...defaultProps,
      mode: "reply" as const,
    };

    renderWithProviders(<TweetBox {...replyProps} />);

    const textarea = screen.getByPlaceholderText("Postar sua resposta");
    expect(textarea).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: "Responder" });
    expect(submitButton).toBeInTheDocument();

    expect(screen.getByText("Test tweet content")).toBeInTheDocument();
  });

  it("should handle text input correctly", () => {
    renderWithProviders(<TweetBox {...defaultProps} />);

    const textarea = screen.getByPlaceholderText("O que está acontencendo?");
    fireEvent.change(textarea, { target: { value: "New tweet content" } });

    expect(textarea).toHaveValue("New tweet content");
  });

  it("should call onTweetSubmit when form is submitted", () => {
    const mockSubmit = vi.fn();
    const props = { ...defaultProps, onTweetSubmit: mockSubmit };

    renderWithProviders(<TweetBox {...props} />);

    const textarea = screen.getByPlaceholderText("O que está acontencendo?");
    const submitButton = screen.getByRole("button", { name: "Postar" });

    fireEvent.change(textarea, { target: { value: "Test content" } });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith("Test content", "", undefined, "");
  });

  it("should render with initial content in edit mode", () => {
    const tweetToEdit = {
      ...mockTweet,
      content: "Initial content",
    };

    const editProps = {
      ...defaultProps,
      mode: "edit" as const,
      tweet: tweetToEdit,
      initialContent: "Initial content",
    };

    renderWithProviders(<TweetBox {...editProps} />);

    const textarea = screen.getByDisplayValue("Initial content");
    expect(textarea).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: "Salvar" });
    expect(submitButton).toBeInTheDocument();
  });

  it("should handle image URL input", () => {
    renderWithProviders(<TweetBox {...defaultProps} />);

    const imageInput = screen.getByPlaceholderText(
      "Adicionar uma URL de imagem"
    );
    fireEvent.change(imageInput, {
      target: { value: "https://example.com/image.jpg" },
    });

    expect(imageInput).toHaveValue("https://example.com/image.jpg");
  });
});
