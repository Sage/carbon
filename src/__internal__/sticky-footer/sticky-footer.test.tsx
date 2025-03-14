import React, { useRef } from "react";
import { fireEvent, screen } from "@testing-library/react";
import StickyFooter, { StickyFooterProps } from "./sticky-footer.component";
import { render } from "../../__spec_helper__/__internal__/test-utils";

const MockFooterContainer = (props: Partial<StickyFooterProps> = {}) => {
  const mockRef = useRef(null);

  return (
    <div data-role="container" ref={mockRef}>
      <StickyFooter containerRef={mockRef} {...props}>
        Some content
      </StickyFooter>
    </div>
  );
};

test("when `disableSticky` is true, footer should have correct padding", () => {
  render(<MockFooterContainer disableSticky />);

  expect(screen.getByText("Some content")).toHaveStyle({
    padding: "var(--spacing200) var(--spacing400)",
    boxSizing: "border-box",
  });
});

test("when `disableSticky` is false, footer should have correct padding", () => {
  render(<MockFooterContainer disableSticky={false} />);

  expect(screen.getByText("Some content")).toHaveStyle({
    padding: "var(--spacing200) var(--spacing400)",
    boxSizing: "border-box",
  });
});

describe("scroll behaviour", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should be sticky when the user has not scrolled to the bottom of containing element", () => {
    render(<MockFooterContainer />);

    const footer = screen.getByText("Some content");
    const container = screen.getByTestId("container");
    jest.spyOn(container, "clientHeight", "get").mockImplementation(() => 1000);
    jest.spyOn(container, "scrollHeight", "get").mockImplementation(() => 1500);

    fireEvent.scroll(container, { target: { scrollTop: 0 } });
    jest.runAllTimers();

    expect(footer).toHaveStyle({
      position: "sticky",
      width: "100%",
      bottom: "0",
      left: "0",
      backgroundColor: "var(--colorsActionMinorYang100)",
      boxShadow: "var(--boxShadow150)",
      zIndex: "1000",
    });
  });

  it("should not be sticky when the user has scrolled to the bottom of containing element", () => {
    render(<MockFooterContainer />);

    const footer = screen.getByText("Some content");
    const container = screen.getByTestId("container");
    jest.spyOn(footer, "clientHeight", "get").mockImplementation(() => 40);
    jest.spyOn(container, "clientHeight", "get").mockImplementation(() => 1000);
    jest.spyOn(container, "scrollHeight", "get").mockImplementation(() => 1500);

    fireEvent.scroll(container, { target: { scrollTop: 500 } });
    jest.runAllTimers();

    expect(footer).not.toHaveStyle({
      position: "sticky",
    });
  });

  it("removes scroll event listener when component unmounts", () => {
    const { unmount } = render(<MockFooterContainer />);

    const container = screen.getByTestId("container");
    const remover = jest.spyOn(container, "removeEventListener");

    unmount();

    expect(remover).toHaveBeenCalledTimes(1);
    expect(remover.mock.lastCall?.[0]).toEqual("scroll");
  });
});

test("when `disableSticky` prop is true, should disable the sticky behaviour", () => {
  render(<MockFooterContainer disableSticky />);

  expect(screen.getByText("Some content")).not.toHaveStyle({
    position: "sticky",
  });
});
