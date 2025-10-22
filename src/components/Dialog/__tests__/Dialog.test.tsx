import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Dialog } from "../index";
import { light } from "../../../configs/themes";

// Mock do createPortal
vi.mock("react-dom", async () => {
  const actual = await vi.importActual("react-dom");
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node,
  };
});

describe("Dialog Component", () => {
  const mockOnClose = vi.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    children: <div>Dialog Content</div>,
  };

  const renderDialog = (props = {}) => {
    return render(
      <ThemeProvider theme={light}>
        <Dialog {...defaultProps} {...props} />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render dialog when isOpen is true", () => {
    renderDialog();

    expect(screen.getByText("Dialog Content")).toBeInTheDocument();
  });

  it("should not render dialog when isOpen is false", () => {
    renderDialog({ isOpen: false });

    expect(screen.queryByText("Dialog Content")).not.toBeInTheDocument();
  });

  it("should call onClose when clicking on overlay", () => {
    renderDialog();

    // O overlay é o elemento mais externo com styled-components
    const dialogContent = screen.getByText("Dialog Content");
    const overlay =
      dialogContent.closest('[class*="sc-"]')?.parentElement?.parentElement;

    if (overlay) {
      fireEvent.click(overlay);
    }

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when clicking close button", () => {
    renderDialog();

    // Encontrar o SVG pela tag e depois o span pai
    const svgElement = document.querySelector("svg");
    const closeButton = svgElement?.parentElement;

    if (closeButton) {
      fireEvent.click(closeButton);
    }

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose when clicking on dialog content", () => {
    renderDialog();

    const content = screen.getByText("Dialog Content");
    fireEvent.click(content);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("should not show header when showHeader is false", () => {
    renderDialog({ showHeader: false });

    expect(screen.getByText("Dialog Content")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { hidden: true })
    ).not.toBeInTheDocument();
  });

  it("should render without portal when usePortal is false", () => {
    renderDialog({ usePortal: false });

    expect(screen.getByText("Dialog Content")).toBeInTheDocument();
  });

  it("should render children correctly", () => {
    const customChildren = (
      <div>
        <h1>Custom Title</h1>
        <p>Custom paragraph content</p>
      </div>
    );

    renderDialog({ children: customChildren });

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom paragraph content")).toBeInTheDocument();
  });

  it("should stop event propagation when clicking on dialog content", () => {
    renderDialog();

    const content = screen.getByText("Dialog Content");
    const stopPropagationSpy = vi.fn();

    const event = new MouseEvent("click", { bubbles: true });
    event.stopPropagation = stopPropagationSpy;

    fireEvent(content.parentElement!, event);

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
