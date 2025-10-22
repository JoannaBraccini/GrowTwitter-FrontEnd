import { describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen } from "../../test/test-utils";
import { Button } from "./index";

describe("Button Component", () => {
  it("should render with default props", () => {
    renderWithProviders(<Button>Click me</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  it("should render as ghost variant", () => {
    renderWithProviders(<Button ghost>Ghost Button</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle("background-color: rgba(0, 0, 0, 0)");
  });

  it("should render full width when specified", () => {
    renderWithProviders(<Button fullwidth>Full Width</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveStyle("width: 100%");
  });

  it("should render with shadow when specified", () => {
    renderWithProviders(<Button shadow>Shadow Button</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveStyle("box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1)");
  });

  it("should render different sizes correctly", () => {
    const { rerender } = renderWithProviders(
      <Button size="small">Small</Button>
    );
    let button = screen.getByRole("button");
    expect(button).toHaveStyle("font-size: 12px");

    rerender(<Button size="large">Large</Button>);
    button = screen.getByRole("button");
    expect(button).toHaveStyle("font-size: 16px");
    expect(button).toHaveStyle("height: 50px");
  });

  it("should be clickable", () => {
    const handleClick = vi.fn();
    renderWithProviders(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button");
    button.click();

    expect(handleClick).toHaveBeenCalledOnce();
  });
});
