import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Tabs } from "../index";

// Mock do tema
const mockTheme = {
  backgroundColor: "#ffffff",
  textColor: "#000000",
  textSecondary: "#666666",
  textExtra: "#999999",
  highlight: "#f0f0f0",
  border: "#e1e8ed",
  accent: "#1da1f2",
  toggle: "#333333",
};

// Wrapper para testes
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
);

describe("Tabs", () => {
  const mockTabs = ["Tab 1", "Tab 2", "Tab 3"];
  const mockOnTabChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all tabs", () => {
    render(
      <TestWrapper>
        <Tabs tabs={mockTabs} activeTab="Tab 1" onTabChange={mockOnTabChange} />
      </TestWrapper>
    );

    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Tab 3")).toBeInTheDocument();
  });

  it("should highlight active tab", () => {
    render(
      <TestWrapper>
        <Tabs tabs={mockTabs} activeTab="Tab 2" onTabChange={mockOnTabChange} />
      </TestWrapper>
    );

    const activeTab = screen.getByText("Tab 2");
    expect(activeTab).toHaveClass("active");

    const inactiveTab = screen.getByText("Tab 1");
    expect(inactiveTab).not.toHaveClass("active");
  });

  it("should call onTabChange when tab is clicked", () => {
    render(
      <TestWrapper>
        <Tabs tabs={mockTabs} activeTab="Tab 1" onTabChange={mockOnTabChange} />
      </TestWrapper>
    );

    const secondTab = screen.getByText("Tab 2");
    fireEvent.click(secondTab);

    expect(mockOnTabChange).toHaveBeenCalledWith("Tab 2");
    expect(mockOnTabChange).toHaveBeenCalledTimes(1);
  });

  it("should render with custom padding", () => {
    render(
      <TestWrapper>
        <Tabs
          tabs={mockTabs}
          activeTab="Tab 1"
          onTabChange={mockOnTabChange}
          paddingTop="20px"
        />
      </TestWrapper>
    );

    const tabsContainer = screen.getByText("Tab 1").closest("div");
    expect(tabsContainer).toHaveStyle("padding-top: 20px");
  });

  it("should handle empty tabs array", () => {
    render(
      <TestWrapper>
        <Tabs tabs={[]} activeTab="" onTabChange={mockOnTabChange} />
      </TestWrapper>
    );

    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(0);
  });
});
