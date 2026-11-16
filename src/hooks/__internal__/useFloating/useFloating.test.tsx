import React, { useRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import * as floatingUi from "@floating-ui/dom";

import useFloating, { UseFloatingProps } from "./useFloating";

const MockComponent = ({
  isOpen,
  strategy,
  placement,
  animationFrame,
  middleware,
  children,
}: Partial<UseFloatingProps> & { children?: React.ReactNode }) => {
  const reference = useRef<HTMLDivElement>(null);
  const floating = useRef<HTMLDivElement>(null);
  useFloating({
    reference,
    floating,
    isOpen,
    strategy,
    placement,
    animationFrame,
    middleware,
  });

  return (
    <div
      ref={reference}
      data-role="reference-element"
      style={{ width: "100px", height: "20px" }}
    >
      <div
        style={{ top: "100px", left: "50px", position: "static" }}
        ref={floating}
        data-role="floating-element"
      >
        {children ?? "Child"}
      </div>
    </div>
  );
};

test("computePosition is called with the correct arguments when MockComponent is rendered", () => {
  const computePositionSpy = jest.spyOn(floatingUi, "computePosition");
  render(<MockComponent isOpen strategy="fixed" placement="top" />);

  expect(computePositionSpy.mock.calls[0][0]).toBe(
    screen.getByTestId("reference-element"),
  );
  expect(computePositionSpy.mock.calls[0][1]).toBe(
    screen.getByTestId("floating-element"),
  );
  expect(computePositionSpy.mock.calls[0][2]).toMatchObject({
    strategy: "fixed",
    placement: "top",
  });
});

test("autoUpdate is invoked with proper arguments across different states", () => {
  const autoUpdateSpy = jest.spyOn(floatingUi, "autoUpdate");

  const { rerender } = render(<MockComponent isOpen />);

  expect(autoUpdateSpy.mock.calls[0][0]).toBe(
    screen.getByTestId("reference-element"),
  );
  expect(autoUpdateSpy.mock.calls[0][1]).toBe(
    screen.getByTestId("floating-element"),
  );
  expect(autoUpdateSpy.mock.calls[0][3]).toMatchObject({
    animationFrame: undefined,
  });

  rerender(<MockComponent isOpen animationFrame />);
  expect(autoUpdateSpy.mock.calls[1][3]).toMatchObject({
    animationFrame: true,
  });
});

test("does not invoke autoUpdate when closed", () => {
  jest.clearAllMocks();
  const autoUpdateSpy = jest.spyOn(floatingUi, "autoUpdate");

  render(<MockComponent isOpen={false} />);

  expect(autoUpdateSpy).not.toHaveBeenCalled();

  jest.restoreAllMocks();
});

test("calls autoUpdate cleanup when closing", () => {
  jest.clearAllMocks();
  const cleanupSpy = jest.fn();
  const autoUpdateSpy = jest
    .spyOn(floatingUi, "autoUpdate")
    .mockImplementation(() => cleanupSpy);

  const { rerender } = render(<MockComponent isOpen />);

  expect(autoUpdateSpy).toHaveBeenCalledTimes(1);
  expect(cleanupSpy).not.toHaveBeenCalled();

  rerender(<MockComponent isOpen={false} />);

  expect(cleanupSpy).toHaveBeenCalledTimes(1);

  jest.restoreAllMocks();
});

test("does not invoke autoUpdate across rerenders while closed even with new middleware references", () => {
  jest.clearAllMocks();
  const autoUpdateSpy = jest.spyOn(floatingUi, "autoUpdate");

  const { rerender } = render(
    <MockComponent
      isOpen={false}
      middleware={[floatingUi.offset(6)]}
      placement="bottom"
    />,
  );

  rerender(
    <MockComponent
      isOpen={false}
      middleware={[floatingUi.offset(8)]}
      placement="top"
    />,
  );

  rerender(
    <MockComponent
      isOpen={false}
      middleware={[floatingUi.flip()]}
      strategy="fixed"
    />,
  );

  expect(autoUpdateSpy).not.toHaveBeenCalled();

  jest.restoreAllMocks();
});

test("saves floating element original styles and restores them after closing", async () => {
  const { rerender } = render(<MockComponent isOpen />);

  const floatingElement = await screen.findByTestId("floating-element");
  const positionedStyle = window.getComputedStyle(floatingElement);

  expect(positionedStyle.position).toBe("absolute");
  expect(positionedStyle.top).toBe("0px");
  expect(positionedStyle.left).toBe("0px");

  rerender(<MockComponent isOpen={false} />);
  const originalStyle = window.getComputedStyle(floatingElement);

  expect(originalStyle.position).toBe("static");
  expect(originalStyle.top).toBe("100px");
  expect(originalStyle.left).toBe("50px");
});

test("when using size middleware, the original width and height are restored after closing", async () => {
  const middleWare = [
    floatingUi.size({
      apply({ rects, elements }) {
        elements.floating.style.height = `${rects.reference.height}px`;
        elements.floating.style.width = `${rects.reference.width}px`;
      },
    }),
  ];

  const { rerender } = render(<MockComponent isOpen middleware={middleWare} />);

  const floatingElement = await screen.findByTestId("floating-element");
  expect(floatingElement).toHaveStyle({ height: "0px", width: "0px" });

  rerender(<MockComponent isOpen={false} middleware={middleWare} />);
  expect(floatingElement).not.toHaveAttribute(
    "style",
    expect.stringMatching(/(?:^|;)\s*(?:height|width)\s*:/),
  );
});

test("data-floating-placement attribute is added with correct placement when open and removed when closed", async () => {
  const { rerender } = render(
    <MockComponent isOpen strategy="fixed" placement="top" />,
  );

  await waitFor(() => {
    expect(screen.getByTestId("floating-element")).toHaveAttribute(
      "data-floating-placement",
      "top",
    );
  });

  rerender(<MockComponent strategy="fixed" placement="top" />);

  expect(screen.getByTestId("floating-element")).not.toHaveAttribute(
    "data-floating-placement",
  );
});

test("hides a clipped reference's popover, shows it again on scroll, and restores visibility on close", async () => {
  let updatePosition = () => {};
  const position = {
    x: 0,
    y: 0,
    placement: "bottom" as const,
    strategy: "absolute" as const,
    middlewareData: { hide: { referenceHidden: true } },
  };
  const computePositionSpy = jest
    .spyOn(floatingUi, "computePosition")
    .mockResolvedValue(position);
  const autoUpdateSpy = jest
    .spyOn(floatingUi, "autoUpdate")
    .mockImplementation((_reference, _floating, update) => {
      updatePosition = update;
      update();
      return () => {};
    });

  try {
    const { rerender } = render(<MockComponent isOpen />);
    const floatingElement = screen.getByTestId("floating-element");

    await waitFor(() => {
      expect(floatingElement).toHaveStyle({ visibility: "hidden" });
    });

    computePositionSpy.mockResolvedValue({
      ...position,
      middlewareData: { hide: { referenceHidden: false } },
    });
    updatePosition();

    await waitFor(() => {
      expect(floatingElement).toHaveStyle({ visibility: "visible" });
    });

    computePositionSpy.mockResolvedValue(position);
    updatePosition();

    await waitFor(() => {
      expect(floatingElement).toHaveStyle({ visibility: "hidden" });
    });

    rerender(<MockComponent isOpen={false} />);
    expect(floatingElement).toHaveStyle({ visibility: "visible" });
  } finally {
    computePositionSpy.mockRestore();
    autoUpdateSpy.mockRestore();
  }
});

test.each([
  "restore",
  "focus retained on item",
  "focus moved elsewhere",
  "item disabled",
  "menu closed",
])(
  "restores a menu item's focus after hiding only when appropriate: %s",
  async (scenario) => {
    let updatePosition = () => {};
    const position = {
      x: 0,
      y: 0,
      placement: "bottom" as const,
      strategy: "absolute" as const,
      middlewareData: { hide: { referenceHidden: false } },
    };
    const computePositionSpy = jest
      .spyOn(floatingUi, "computePosition")
      .mockResolvedValue(position);
    const autoUpdateSpy = jest
      .spyOn(floatingUi, "autoUpdate")
      .mockImplementation((_reference, _floating, update) => {
        updatePosition = update;
        update();
        return () => {};
      });
    const content = (isOpen = true) => (
      <>
        <MockComponent isOpen={isOpen}>
          <button>First item</button>
          <button>Second item</button>
        </MockComponent>
        <button>Outside menu</button>
      </>
    );
    let focusSpy: jest.SpyInstance | undefined;

    try {
      const { rerender } = render(content());
      const floatingElement = screen.getByTestId("floating-element");
      await waitFor(() => {
        expect(floatingElement).toHaveAttribute(
          "data-floating-placement",
          "bottom",
        );
      });
      const item = screen.getByRole("button", { name: "Second item" });
      item.focus();

      computePositionSpy.mockResolvedValue({
        ...position,
        middlewareData: { hide: { referenceHidden: true } },
      });
      updatePosition();
      await waitFor(() => {
        expect(floatingElement).toHaveStyle({ visibility: "hidden" });
      });
      // Browsers drop focus when an element becomes hidden; JSDOM does not.
      expect(item).toHaveFocus();
      if (scenario !== "focus retained on item") {
        item.blur();
      }

      if (scenario === "focus moved elsewhere") {
        const outside = screen.getByRole("button", { name: "Outside menu" });
        outside.focus();
        outside.blur();
      } else if (scenario === "item disabled") {
        item.setAttribute("disabled", "");
      } else if (scenario === "menu closed") {
        rerender(content(false));
      }

      focusSpy = jest.spyOn(item, "focus");
      computePositionSpy.mockResolvedValue(position);
      if (scenario === "menu closed") {
        rerender(content());
      } else {
        updatePosition();
      }
      await waitFor(() => {
        expect(floatingElement).toHaveStyle({ visibility: "visible" });
      });

      const restoresFocus =
        scenario === "restore" || scenario === "focus retained on item";
      expect(focusSpy.mock.calls).toEqual(
        restoresFocus ? [[{ preventScroll: true }]] : [],
      );
      expect(restoresFocus ? item : document.body).toHaveFocus();
    } finally {
      focusSpy?.mockRestore();
      computePositionSpy.mockRestore();
      autoUpdateSpy.mockRestore();
    }
  },
);
