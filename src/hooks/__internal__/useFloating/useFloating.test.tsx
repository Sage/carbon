import React, { useRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import * as floatingUi from "@floating-ui/react-dom";

import useFloating, { UseFloatingProps } from "./useFloating";

jest.mock("@floating-ui/react-dom", () => {
  const actual = jest.requireActual("@floating-ui/react-dom");
  return {
    ...actual,
    computePosition: jest.fn((...args) => actual.computePosition(...args)),
    autoUpdate: jest.fn((...args) => actual.autoUpdate(...args)),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

const MockComponent = ({
  isOpen,
  strategy,
  placement,
  animationFrame,
  middleware,
}: Partial<UseFloatingProps>) => {
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
        Child
      </div>
    </div>
  );
};

test("computePosition is called with the correct arguments when MockComponent is rendered", () => {
  const { computePosition } = floatingUi;
  render(<MockComponent isOpen strategy="fixed" placement="top" />);

  expect(computePosition).toHaveBeenCalledWith(
    screen.getByTestId("reference-element"),
    screen.getByTestId("floating-element"),
    expect.objectContaining({
      strategy: "fixed",
      placement: "top",
    }),
  );
});

// Test passes when run alone, fails when run with other tests
test("autoUpdate is invoked with proper arguments across different states", () => {
  const autoUpdateSpy = jest.spyOn(floatingUi, "autoUpdate");

  const { rerender } = render(<MockComponent isOpen />);

  // Pull out the elements from the spy call
  const [calledReference, calledFloating, , options] =
    autoUpdateSpy.mock.calls[0];

  // Confirm they exist
  expect(calledReference).toBeInstanceOf(HTMLElement);
  expect(calledFloating).toBeInstanceOf(HTMLElement);

  // Confirm correct roles
  expect(calledReference).toHaveAttribute("data-role", "reference-element");
  expect(calledFloating).toHaveAttribute("data-role", "floating-element");

  expect(options).toMatchObject({
    animationFrame: undefined,
  });

  rerender(<MockComponent isOpen animationFrame />);
  const [, , , updatedOptions] = autoUpdateSpy.mock.calls[1];

  expect(updatedOptions).toMatchObject({
    animationFrame: true,
  });
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
      apply({
        rects,
        elements,
      }: {
        rects: { reference: floatingUi.Rect };
        elements: { floating: HTMLElement };
      }) {
        elements.floating.style.height = `${rects.reference.height}px`;
        elements.floating.style.width = `${rects.reference.width}px`;
      },
    }),
  ];

  const { rerender } = render(<MockComponent isOpen middleware={middleWare} />);

  const floatingElement = await screen.findByTestId("floating-element");
  const positionedStyle = window.getComputedStyle(floatingElement);

  expect(positionedStyle.width).not.toBe("");
  expect(positionedStyle.height).not.toBe("");

  rerender(<MockComponent isOpen={false} middleware={middleWare} />);
  const originalStyle = window.getComputedStyle(floatingElement);

  expect(originalStyle.height).toBe("");
  expect(originalStyle.width).toBe("");
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
