import React, { useRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import * as floatingUi from "@floating-ui/react-dom";

import useFloating, { UseFloatingProps } from "./useFloating";

jest.mock("@floating-ui/react-dom", () => {
  const actual = jest.requireActual("@floating-ui/react-dom");

  return {
    ...actual,
    autoUpdate: jest.fn((_, __, update) => {
      update();
      return () => {};
    }),
    useFloating: jest.fn(actual.useFloating),
  };
});

const originalUseFloating = jest.requireActual(
  "@floating-ui/react-dom",
).useFloating;

afterEach(() => {
  jest.mocked(floatingUi.useFloating).mockImplementation(originalUseFloating);
});

const FloatingFixture = ({
  children,
  ...props
}: Partial<UseFloatingProps> & { children?: React.ReactNode }) => {
  const reference = useRef<HTMLButtonElement>(null);
  const floating = useRef<HTMLDivElement>(null);

  useFloating({
    floating,
    reference,
    ...props,
  });

  return (
    <>
      <button ref={reference} type="button">
        Reference
      </button>
      <div
        ref={floating}
        data-role="floating-element"
        style={{ left: "50px", position: "static", top: "100px" }}
      >
        {children ?? "Floating content"}
      </div>
    </>
  );
};

test("defaults to open, positions the floating element, and restores its original styles when closed", async () => {
  jest.mocked(floatingUi.useFloating).mockImplementation((options) => {
    const result = originalUseFloating(options);

    return { ...result, isPositioned: true, placement: "top", x: 12, y: 24 };
  });
  const { rerender } = render(<FloatingFixture />);
  const floatingElement = screen.getByTestId("floating-element");

  await waitFor(() =>
    expect(floatingElement).toHaveAttribute("data-floating-placement", "top"),
  );
  expect(floatingElement).toHaveStyle({
    left: "12px",
    position: "absolute",
    top: "24px",
  });

  rerender(<FloatingFixture isOpen={false} />);

  expect(floatingElement).toHaveStyle({
    left: "50px",
    position: "static",
    top: "100px",
  });
  expect(floatingElement).not.toHaveAttribute("data-floating-placement");
});

test("only auto-updates while open and cleans up on close", async () => {
  const cleanup = jest.fn();
  const autoUpdateMock = jest.mocked(floatingUi.autoUpdate);
  autoUpdateMock.mockClear();
  autoUpdateMock.mockImplementationOnce(() => cleanup);

  const { rerender } = render(<FloatingFixture isOpen={false} />);
  expect(autoUpdateMock).not.toHaveBeenCalled();

  rerender(<FloatingFixture isOpen />);
  await waitFor(() => expect(autoUpdateMock).toHaveBeenCalledTimes(1));

  rerender(<FloatingFixture isOpen={false} />);
  expect(cleanup).toHaveBeenCalledTimes(1);
});

test("hides clipped content and restores its original visibility", async () => {
  let referenceHidden = true;
  jest.mocked(floatingUi.useFloating).mockImplementation((options) => {
    const result = originalUseFloating(options);

    return {
      ...result,
      middlewareData: { hide: { referenceHidden } },
      x: 12,
      y: 24,
    };
  });
  const { rerender } = render(<FloatingFixture isOpen />);
  const floatingElement = screen.getByTestId("floating-element");

  await waitFor(() => expect(floatingElement).not.toBeVisible());

  referenceHidden = false;
  rerender(<FloatingFixture isOpen />);

  await waitFor(() => expect(floatingElement).toBeVisible());
  expect(floatingElement).toHaveStyle({ left: "12px", top: "24px" });
});

test("restores focus after a clipped reference becomes visible", async () => {
  let referenceHidden = false;
  jest.mocked(floatingUi.useFloating).mockImplementation((options) => {
    const result = originalUseFloating(options);

    return {
      ...result,
      middlewareData: { hide: { referenceHidden } },
    };
  });
  const { rerender } = render(
    <FloatingFixture isOpen>
      <button type="button">Floating item</button>
    </FloatingFixture>,
  );
  const item = screen.getByRole("button", { name: "Floating item" });
  item.focus();

  referenceHidden = true;
  rerender(
    <FloatingFixture isOpen>
      <button type="button">Floating item</button>
    </FloatingFixture>,
  );
  await waitFor(() => expect(item).not.toBeVisible());

  referenceHidden = false;
  rerender(
    <FloatingFixture isOpen>
      <button type="button">Floating item</button>
    </FloatingFixture>,
  );

  await waitFor(() => expect(item).toBeVisible());
  expect(item).toHaveFocus();
});
