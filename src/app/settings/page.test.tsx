import { render, screen, act, fireEvent, cleanup } from "@testing-library/react";
import SettingsPage from "./page";

const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

function mockClipboard(writeText = jest.fn().mockResolvedValue(undefined)) {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
  return writeText;
}

beforeEach(() => {
  jest.useFakeTimers();
  mockClipboard();
  mockMatchMedia(false);
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  cleanup();
  delete process.env.NEXT_PUBLIC_AGENTPAY_API_BASE;
});

describe("SettingsPage", () => {
  it("renders the settings headings and description text", () => {
    render(<SettingsPage />);

    expect(screen.getByRole("heading", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Appearance" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Connection" })).toBeInTheDocument();
    expect(
      screen.getByText("Resolved API base URL of the AgentPay backend.")
    ).toBeInTheDocument();
  });

  it("uses the default API base URL (http://localhost:3001) when env is not set", () => {
    render(<SettingsPage />);

    expect(screen.getByText("http://localhost:3001")).toBeInTheDocument();
  });

  it("uses an overridden API base URL when NEXT_PUBLIC_AGENTPAY_API_BASE is set", () => {
    process.env.NEXT_PUBLIC_AGENTPAY_API_BASE = "https://api.custombackend.com";
    render(<SettingsPage />);

    expect(screen.getByText("https://api.custombackend.com")).toBeInTheDocument();
  });

  it("renders the copy button and handles the copy behavior with aria-live feedback", async () => {
    const writeText = mockClipboard();
    process.env.NEXT_PUBLIC_AGENTPAY_API_BASE = "https://api.custombackend.com";
    render(<SettingsPage />);

    const copyBtn = screen.getByRole("button", { name: "Copy" });
    expect(copyBtn).toBeInTheDocument();
    expect(copyBtn).toHaveAttribute("aria-live", "polite");

    await act(async () => {
      fireEvent.click(copyBtn);
    });

    expect(writeText).toHaveBeenCalledWith("https://api.custombackend.com");
    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
  });
});
