import { renderHook, act } from "@testing-library/react";
import useModeSwitcher from "./useModeSwitcher";
import {
  setupMatchMediaMock,
  mockMatchMedia,
  clearMatchMediaListeners,
} from "../../../../__spec_helper__/mock-match-media";

describe("useModeSwitcher", () => {
  beforeAll(() => {
    setupMatchMediaMock();
  });

  beforeEach(() => {
    clearMatchMediaListeners();
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

  it("updates mode when system preference changes and no modePreference is passed", () => {
    const { result } = renderHook(() => useModeSwitcher());

    expect(result.current).toBe("light");

    // Trigger dark mode
    act(() => {
      mockMatchMedia(true);
    });

    expect(result.current).toBe("dark");

    // Trigger light mode
    act(() => {
      mockMatchMedia(false);
    });

    expect(result.current).toBe("light");
  });
});
