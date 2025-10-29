import { renderHook, act } from "@testing-library/react";
import useModeSwitcher from "./useModeSwitcher";

let _matches = false;
let _listeners: ((e: MediaQueryListEvent) => void)[] = [];

const setupMock = () => {
  if (typeof window === "undefined") {
    return;
  }

  Object.defineProperty(global.window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: _matches,
      media: query,
      addEventListener: (
        event: string,
        handler: (e: MediaQueryListEvent) => void,
      ) => {
        if (event === "change") {
          _listeners.push(handler);
        }
      },
      removeEventListener: (
        event: string,
        handler: (e: MediaQueryListEvent) => void,
      ) => {
        if (event === "change") {
          _listeners = _listeners.filter((l) => l !== handler);
        }
      },
    }),
  });
};

const mockMedia = (matches: boolean) => {
  _matches = matches;

  // Trigger change events
  const event = { matches } as MediaQueryListEvent;
  _listeners.forEach((listener) => listener(event));
};

describe("useModeSwitcher", () => {
  beforeAll(() => {
    setupMock();
  });

  beforeEach(() => {
    // reset matches and clear listeners before each test
    _matches = false;
    _listeners = [];
  });

  it("returns the correct mode when no modePreference is passed", () => {
    const { result } = renderHook(() => useModeSwitcher());

    expect(result.current).toBe("light");
  });

  it("returns the correct mode when `light` modePreference is passed", () => {
    const { result } = renderHook(() => useModeSwitcher("light"));

    expect(result.current).toBe("light");
  });

  it("returns the correct mode when `dark` modePreference is passed", () => {
    const { result } = renderHook(() => useModeSwitcher("dark"));

    expect(result.current).toBe("dark");
  });

  it("returns dark mode when system initially prefers dark", () => {
    _matches = true;
    const { result } = renderHook(() => useModeSwitcher());

    expect(result.current).toBe("dark");
  });

  it("updates mode when system preference changes and no modePreference is passed", () => {
    const { result } = renderHook(() => useModeSwitcher());

    expect(result.current).toBe("light");

    act(() => {
      mockMedia(true);
    });

    expect(result.current).toBe("dark");

    act(() => {
      mockMedia(false);
    });

    expect(result.current).toBe("light");
  });
});
