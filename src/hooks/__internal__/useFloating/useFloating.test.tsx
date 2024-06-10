import React, { useRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as floatingUi from "@floating-ui/dom";

import useFloating, { UseFloatingProps } from "./useFloating";

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

describe("useFloating", () => {
  it("invokes computePosition with proper arguments", () => {
    const computePositionSpy = jest.spyOn(floatingUi, "computePosition");

    render(<MockComponent isOpen strategy="fixed" placement="top" />);
    expect(computePositionSpy.mock.calls[0][0]).toBe(
      screen.getByTestId("reference-element")
    );
    expect(computePositionSpy.mock.calls[0][1]).toBe(
      screen.getByTestId("floating-element")
    );
    expect(computePositionSpy.mock.calls[0][2]).toMatchObject({
      strategy: "fixed",
      placement: "top",
    });
  });

  it("invokes autoUpdate with proper arguments", () => {
    const autoUpdateSpy = jest.spyOn(floatingUi, "autoUpdate");

    const { rerender } = render(<MockComponent isOpen />);

    expect(autoUpdateSpy.mock.calls[0][0]).toBe(
      screen.getByTestId("reference-element")
    );
    expect(autoUpdateSpy.mock.calls[0][1]).toBe(
      screen.getByTestId("floating-element")
    );
    expect(autoUpdateSpy.mock.calls[0][3]).toMatchObject({
      animationFrame: undefined,
    });

    rerender(<MockComponent isOpen animationFrame />);
    expect(autoUpdateSpy.mock.calls[1][3]).toMatchObject({
      animationFrame: true,
    });
  });

  it("saves floating element original styles and restores them after closing", async () => {
    const { rerender } = render(<MockComponent isOpen />);

    await waitFor(() => {
      const positionedStyle = window.getComputedStyle(
        screen.getByTestId("floating-element")
      );
      expect(positionedStyle).toMatchObject({
        position: "absolute",
        top: "0px",
        left: "0px",
      });
    });

    rerender(<MockComponent isOpen={false} />);
    const originalStyle = window.getComputedStyle(
      screen.getByTestId("floating-element")
    );

    expect(originalStyle).toMatchObject({
      position: "static",
      top: "100px",
      left: "50px",
    });
  });

  it("when using size middleware, the original width and height are restored after closing", async () => {
    const middleWare = [
      floatingUi.size({
        apply({ rects, elements }) {
          elements.floating.style.height = `${rects.reference.height}px`;
          elements.floating.style.width = `${rects.reference.width}px`;
        },
      }),
    ];

    const { rerender } = render(
      <MockComponent isOpen middleware={middleWare} />
    );

    await waitFor(() => {
      const positionedStyle = window.getComputedStyle(
        screen.getByTestId("floating-element")
      );
      expect(positionedStyle).not.toMatchObject({
        width: "",
        height: "",
      });
    });

    rerender(<MockComponent isOpen={false} />);

    const originalStyle = window.getComputedStyle(
      screen.getByTestId("floating-element")
    );

    expect(originalStyle.height).toBe("");
    expect(originalStyle.width).toBe("");
  });

  it("adds data-floating-placement attribute to the floating element", async () => {
    const { rerender } = render(
      <MockComponent isOpen strategy="fixed" placement="top" />
    );

    await waitFor(() => {
      expect(screen.getByTestId("floating-element")).toHaveAttribute(
        "data-floating-placement",
        "top"
      );
    });

    rerender(<MockComponent strategy="fixed" placement="top" />);

    expect(screen.getByTestId("floating-element")).not.toHaveAttribute(
      "data-floating-placement"
    );
  });
});
