/* eslint-disable testing-library/no-node-access */
import { renderHook } from "@testing-library/react";

import useInert from ".";

const setupMockDOM = () => {
  // Create fake portal elements
  const portal1 = document.createElement("div");
  portal1.classList.add("carbon-portal");
  const portal2 = document.createElement("div");
  portal2.classList.add("carbon-portal");

  // Create container and dialog content
  const container = document.createElement("div");
  const dialogContent = document.createElement("div");
  dialogContent.setAttribute("data-role", "dialog-content");

  dialogContent.focus = jest.fn();

  container.appendChild(dialogContent);

  // Append the portals to the document body
  portal1.appendChild(container);
  document.body.appendChild(portal1);
  document.body.appendChild(portal2);

  // Setup mock for querySelectorAll
  const originalQuerySelectorAll = document.querySelectorAll.bind(document);
  jest.spyOn(document, "querySelectorAll").mockImplementation((selector) => {
    if (selector === ".carbon-portal") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return [portal1, portal2] as any;
    }
    return originalQuerySelectorAll(selector);
  });

  return {
    portal1,
    portal2,
    container,
    dialogContent,
    cleanup: () => {
      document.body.removeChild(portal1);
      document.body.removeChild(portal2);
      jest.restoreAllMocks();
    },
  };
};

describe("useInert", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should not apply inert attributes when isTopModal is true", () => {
    const { container, cleanup } = setupMockDOM();

    const containerRef = { current: container };

    renderHook(() =>
      useInert({
        containerRef,
        defaultValue: false,
        open: true,
        isTopModal: true,
        hasAdaptiveSidebarModalOpen: true,
      }),
    );

    expect(document.querySelectorAll(".carbon-portal")[0]).not.toHaveAttribute(
      "inert",
    );
    expect(document.querySelectorAll(".carbon-portal")[1]).not.toHaveAttribute(
      "inert",
    );

    cleanup();
  });

  test("should apply inert attributes to other portals when modal is open", () => {
    const { container, portal1, portal2, dialogContent, cleanup } =
      setupMockDOM();

    const containerRef = { current: container };

    const { result } = renderHook(() =>
      useInert({
        containerRef,
        defaultValue: false,
        open: true,
        isTopModal: false,
        hasAdaptiveSidebarModalOpen: true,
      }),
    );

    expect(portal1).not.toHaveAttribute("inert");
    expect(portal1).not.toHaveAttribute("aria-hidden");
    expect(portal2).toHaveAttribute("inert");
    expect(portal2).toHaveAttribute("aria-hidden", "true");
    expect(dialogContent).toHaveAttribute("tabindex", "-1");
    expect(dialogContent.focus).toHaveBeenCalled();
    expect(result.current.localTopOverride).toBe(true);

    cleanup();
  });

  test("should remove inert attributes from other portals when modal is closed", () => {
    const { container, portal2, cleanup } = setupMockDOM();

    const containerRef = { current: container };

    const { result, rerender } = renderHook((props) => useInert(props), {
      initialProps: {
        containerRef,
        defaultValue: false,
        open: true,
        isTopModal: false,
        hasAdaptiveSidebarModalOpen: true,
      },
    });

    rerender({
      containerRef,
      defaultValue: false,
      open: false,
      isTopModal: false,
      hasAdaptiveSidebarModalOpen: true,
    });

    expect(portal2).not.toHaveAttribute("inert");
    expect(portal2).not.toHaveAttribute("aria-hidden");
    expect(result.current.localTopOverride).toBe(false);

    cleanup();
  });

  test("should not apply inert attributes when hasAdaptiveSidebarModalOpen is false", () => {
    const { container, portal1, portal2, cleanup } = setupMockDOM();

    const containerRef = { current: container };

    const { result } = renderHook(() =>
      useInert({
        containerRef,
        defaultValue: false,
        open: true,
        isTopModal: false,
        hasAdaptiveSidebarModalOpen: false,
      }),
    );

    expect(portal1).not.toHaveAttribute("inert");
    expect(portal2).not.toHaveAttribute("inert");

    expect(result.current.localTopOverride).toBe(false);

    cleanup();
  });

  test("should handle case when containerRef.current is null", () => {
    const { portal1, portal2, cleanup } = setupMockDOM();

    const containerRef = { current: null };

    const { result } = renderHook(() =>
      useInert({
        containerRef,
        defaultValue: false,
        open: true,
        isTopModal: false,
        hasAdaptiveSidebarModalOpen: true,
      }),
    );

    expect(portal1).not.toHaveAttribute("inert");
    expect(portal2).not.toHaveAttribute("inert");
    expect(result.current.localTopOverride).toBe(false);

    cleanup();
  });

  [true, false].forEach((defaultValue) => {
    test(`should work correctly when parent portal is not found and default value is ${defaultValue}`, () => {
      const container = document.createElement("div");
      const dialogContent = document.createElement("div");
      dialogContent.setAttribute("data-role", "dialog-content");
      dialogContent.focus = jest.fn();
      container.appendChild(dialogContent);
      document.body.appendChild(container);

      const containerRef = { current: container };

      const { result } = renderHook(() =>
        useInert({
          containerRef,
          defaultValue,
          open: true,
          isTopModal: false,
          hasAdaptiveSidebarModalOpen: true,
        }),
      );

      expect(result.current.localTopOverride).toBe(defaultValue);

      document.body.removeChild(container);
    });
  });
});
