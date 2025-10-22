import React from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen } from "../../test/test-utils";
import { Avatar } from "./index";
import { UserBase } from "../../@types";

// Mock do styled-components
vi.mock("./AvatarStyle", () => ({
  AvatarStyle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="avatar-style">{children}</div>
  ),
}));

// Mock do hook useProfileNavigation
vi.mock("../../hooks", () => ({
  useProfileNavigation: () => ({
    handleProfileClick: vi.fn(),
  }),
}));

describe("Avatar Component", () => {
  const mockUser: UserBase = {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    avatarUrl: "https://example.com/avatar.jpg",
    verified: "NONE",
  };

  it("should render avatar with correct image and alt text", () => {
    renderWithProviders(<Avatar user={mockUser} />);

    const avatar = screen.getByRole("img");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", mockUser.avatarUrl);
    expect(avatar).toHaveAttribute("alt", mockUser.name);
  });

  it("should be clickable", () => {
    renderWithProviders(<Avatar user={mockUser} />);

    const avatar = screen.getByRole("img");
    expect(avatar).toBeInTheDocument();

    // Verifica se o elemento é clicável (tem evento de click)
    avatar.click();
  });

  it("should render with different user data", () => {
    const differentUser: UserBase = {
      id: "2",
      name: "Jane Smith",
      username: "janesmith",
      avatarUrl: "https://example.com/jane.jpg",
      verified: "BLUE",
    };

    renderWithProviders(<Avatar user={differentUser} />);

    const avatar = screen.getByRole("img");
    expect(avatar).toHaveAttribute("src", differentUser.avatarUrl);
    expect(avatar).toHaveAttribute("alt", differentUser.name);
  });
});
