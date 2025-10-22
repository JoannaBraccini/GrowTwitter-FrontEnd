import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderWithProviders, screen } from "../../../test/test-utils";
import { UserCard } from "../index";
import { UserBase, Tweet } from "../../../@types";
import { formatDate } from "../../../utils/formatDate";

// Mock dos hooks e utilitários
vi.mock("../../../hooks", () => ({
  useVerificationIcon: vi.fn(() => ({
    icon: "mock-icon.svg",
    label: "Verificado",
  })),
  useProfileNavigation: () => ({
    handleProfileClick: vi.fn(),
  }),
}));

vi.mock("../../../utils/formatDate", () => ({
  formatDate: vi.fn((_date, format) => {
    if (format === "shortRelative") return "2h";
    return "12:34 PM · Jan 1, 2023";
  }),
}));

// Mock do window.innerWidth
Object.defineProperty(window, "innerWidth", {
  writable: true,
  configurable: true,
  value: 1024,
});

describe("UserCard Component", () => {
  const mockUser: UserBase = {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    avatarUrl: "https://example.com/avatar.jpg",
    verified: "BLUE",
  };

  const mockTweet: Tweet = {
    id: "1",
    userId: "1",
    content: "Test tweet content",
    tweetType: "TWEET",
    createdAt: "2023-01-01T12:34:56Z",
    likes: [],
    retweets: [],
    replies: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    window.innerWidth = 1024;
  });

  it("should render user information correctly", () => {
    renderWithProviders(<UserCard user={mockUser} tweet={mockTweet} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("@johndoe")).toBeInTheDocument();
  });

  it("should render verification icon", () => {
    renderWithProviders(<UserCard user={mockUser} tweet={mockTweet} />);

    const verificationIcon = screen.getByAltText("Verificado");
    expect(verificationIcon).toBeInTheDocument();
    expect(verificationIcon).toHaveAttribute("src", "mock-icon.svg");
  });

  it("should render user avatar", () => {
    renderWithProviders(<UserCard user={mockUser} tweet={mockTweet} />);

    const avatar = screen.getByRole("img", { name: "John Doe" });
    expect(avatar).toBeInTheDocument();
  });

  it("should format date correctly for desktop", () => {
    const mockFormatDate = vi.mocked(formatDate);

    renderWithProviders(<UserCard user={mockUser} tweet={mockTweet} />);

    expect(mockFormatDate).toHaveBeenCalledWith("2023-01-01T12:34:56Z", "long");
    expect(
      screen.getByText("12:34 PM · Jan 1, 2023", { exact: false })
    ).toBeInTheDocument();
  });

  it("should format date correctly for mobile", () => {
    const mockFormatDate = vi.mocked(formatDate);
    window.innerWidth = 500;

    renderWithProviders(<UserCard user={mockUser} tweet={mockTweet} />);

    expect(mockFormatDate).toHaveBeenCalledWith(
      "2023-01-01T12:34:56Z",
      "shortRelative"
    );
    expect(screen.getByText("2h", { exact: false })).toBeInTheDocument();
  });

  it("should use updatedAt when available", () => {
    const mockFormatDate = vi.mocked(formatDate);
    const tweetWithUpdate = {
      ...mockTweet,
      updatedAt: "2023-01-02T12:34:56Z",
    };

    renderWithProviders(<UserCard user={mockUser} tweet={tweetWithUpdate} />);

    expect(mockFormatDate).toHaveBeenCalledWith("2023-01-02T12:34:56Z", "long");
  });

  it("should render children when provided", () => {
    const childElement = <div data-testid="child-element">Child Content</div>;

    renderWithProviders(
      <UserCard user={mockUser} tweet={mockTweet}>
        {childElement}
      </UserCard>
    );

    expect(screen.getByTestId("child-element")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = renderWithProviders(
      <UserCard user={mockUser} tweet={mockTweet} className="custom-class" />
    );

    // O className é aplicado ao componente UserCardStyle que é o primeiro div
    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });

  it("should handle user with different verification status", () => {
    const unverifiedUser: UserBase = {
      ...mockUser,
      verified: "NONE",
    };

    renderWithProviders(<UserCard user={unverifiedUser} tweet={mockTweet} />);

    expect(screen.getByAltText("Verificado")).toBeInTheDocument();
  });
});
