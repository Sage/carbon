import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VersionPicker from ".";
import fetchData from "./fetch-data";
import mockData from "./mock-data/metadata.json";

// Mock global fetch
global.fetch = jest.fn();

// Mock fetchData module to allow spying/overriding for specific tests
// while keeping the actual implementation for others
jest.mock("./fetch-data", () => {
  const originalModule = jest.requireActual("./fetch-data");
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn((...args) => originalModule.default(...args)),
  };
});

// Mock Storybook components to avoid testing implementation details
jest.mock("@storybook/components", () => ({
  IconButton: ({
    children,
    active,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) => (
    <button type="button" {...props}>
      {children}
    </button>
  ),
  WithTooltip: ({
    children,
    tooltip,
  }: {
    children: React.ReactNode;
    tooltip: (args: { onHide: () => void }) => React.ReactNode;
  }) => (
    <div>
      {children}
      <div>{tooltip({ onHide: jest.fn() })}</div>
    </div>
  ),
  TooltipLinkList: ({
    links,
  }: {
    links: { id: string; title: string; active?: boolean }[];
  }) => (
    <ul>
      {links.map((link) => (
        <li key={link.id}>{link.title}</li>
      ))}
    </ul>
  ),
}));

describe("When VersionPicker is instantiated", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset URL to root
    window.history.pushState({}, "Test Page", "/");
  });

  it("renders success state with filtered and sorted versions", async () => {
    const user = userEvent.setup();
    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        versions: {
          "1.0.0": "http://v1",
          "2.0.0-beta.1": "http://beta",
          "0.9.0": "http://v0",
        },
      }),
    });

    render(<VersionPicker />);

    // Wait for data load
    const triggerButton = await screen.findByRole("button", { name: "Latest" });
    await user.click(triggerButton);

    // Expect 2.0.0-beta.1 to be filtered out (logic: !key.match(/-beta\.\d+$/))
    expect(screen.queryByText(/beta/)).not.toBeInTheDocument();

    // Expect 1.0.0 to be first (sorted) and tagged latest
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("1.0.0 (latest)");
    expect(items[1]).toHaveTextContent("0.9.0");
  });

  it("renders with version from URL parameter", async () => {
    // Simulate ?v=1.2.3 in URL
    window.history.pushState({}, "Test Page", "/?v=1.2.3");

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ versions: { "1.2.3": "url" } }),
    });

    render(<VersionPicker />);

    // Button should display the version from URL
    expect(
      await screen.findByRole("button", { name: "v1.2.3" }),
    ).toBeInTheDocument();
  });

  it("handles fetch error by falling back to mock data", async () => {
    // Simulate network failure
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));
    const errorSpy = jest.spyOn(console, "error").mockImplementation();
    const logSpy = jest.spyOn(console, "log").mockImplementation();

    render(<VersionPicker />);

    // Should still render because of fallback data
    await screen.findByRole("button");

    expect(errorSpy).toHaveBeenCalledWith(
      "Failed to fetch metadata:",
      expect.any(Error),
    );
    expect(logSpy).toHaveBeenCalledWith("Returning mock data as fallback");

    // Verify content from mockData matches
    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));

    const listItems = screen.getAllByRole("listitem");
    const mockVersions = Object.keys(mockData.versions).filter(
      (v) => !v.includes("-beta"),
    );

    // Check a few key versions to ensure fallback data is rendered correctly
    // The component filters out betas and adds (latest) to the first one
    expect(listItems[0]).toHaveTextContent(`${mockVersions[0]} (latest)`);
    expect(listItems[1]).toHaveTextContent(mockVersions[1]);

    errorSpy.mockRestore();
    logSpy.mockRestore();
  });

  it("handles catastrophic failure (component error state)", async () => {
    // Force fetchData to reject to hit the component's catch block
    (fetchData as jest.Mock).mockRejectedValueOnce(new Error("Critical Fail"));
    const errorSpy = jest.spyOn(console, "error").mockImplementation();

    render(<VersionPicker />);

    // Wait for the component error handler to log
    await waitFor(() =>
      expect(errorSpy).toHaveBeenCalledWith(
        "Failed to retrieve version data:",
        expect.any(Error),
      ),
    );

    errorSpy.mockRestore();
  });

  it("handles HTTP 500 error by falling back to mock data", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });
    const errorSpy = jest.spyOn(console, "error").mockImplementation();
    const logSpy = jest.spyOn(console, "log").mockImplementation();

    render(<VersionPicker />);

    await screen.findByRole("button");

    expect(errorSpy).toHaveBeenCalledWith(
      "Failed to fetch metadata:",
      expect.any(Error),
    );
    expect(logSpy).toHaveBeenCalledWith("Returning mock data as fallback");

    errorSpy.mockRestore();
    logSpy.mockRestore();
  });

  it("handles fetchData returning null", async () => {
    (fetchData as jest.Mock).mockResolvedValueOnce(null);
    const errorSpy = jest.spyOn(console, "error").mockImplementation();

    render(<VersionPicker />);

    await waitFor(() =>
      expect(errorSpy).toHaveBeenCalledWith(
        "Failed to retrieve version data:",
        expect.objectContaining({ message: "Failed to fetch metadata" }),
      ),
    );

    errorSpy.mockRestore();
  });
});
