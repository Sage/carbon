import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Portal from "../../portal";
import FocusTrap from "../../../__internal__/focus-trap/focus-trap.component";
import { VerticalMenuFullScreen, VerticalMenuItem } from "..";

jest.mock("../../portal", () =>
  jest.fn(({ children }) => <div>{children}</div>),
);

jest.mock("../../../__internal__/focus-trap/focus-trap.component", () =>
  jest.fn(({ children }) => <div>{children}</div>),
);

describe("VerticalMenuFullScreen", () => {
  it("should accepts aria-label prop", () => {
    render(
      <VerticalMenuFullScreen isOpen onClose={() => {}} aria-label="test">
        <VerticalMenuItem title="Item1" />
      </VerticalMenuFullScreen>,
    );

    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "test",
    );
  });

  it("should accepts aria-labelledby prop", () => {
    render(
      <VerticalMenuFullScreen isOpen onClose={() => {}} aria-labelledby="test">
        <VerticalMenuItem title="Item1" />
      </VerticalMenuFullScreen>,
    );

    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-labelledby",
      "test",
    );
  });

  it("should render in a Portal", () => {
    render(
      <VerticalMenuFullScreen isOpen onClose={() => {}}>
        <VerticalMenuItem title="Item1" />
      </VerticalMenuFullScreen>,
    );

    expect(Portal).toHaveBeenCalled();
  });

  it("should render a FocusTrap", () => {
    render(
      <VerticalMenuFullScreen isOpen onClose={() => {}}>
        <VerticalMenuItem title="Item1" />
      </VerticalMenuFullScreen>,
    );

    expect(FocusTrap).toHaveBeenCalled();
  });

  // TODO remove skip as part of FE-5650
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should render hidden when "isOpen" prop is false', () => {
    render(
      <VerticalMenuFullScreen isOpen={false} onClose={() => {}}>
        <VerticalMenuItem title="Item1" />
      </VerticalMenuFullScreen>,
    );

    expect(screen.getByRole("navigation", { hidden: true })).toHaveStyle({
      visibility: "hidden",
      transform: "translateX(-100%)",
    });
  });

  // TODO remove skip as part of FE-5650
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should render visible when "isOpen" prop is true', () => {
    render(
      <VerticalMenuFullScreen isOpen onClose={() => {}}>
        <VerticalMenuItem title="Item1" />
      </VerticalMenuFullScreen>,
    );

    expect(screen.getByRole("navigation")).toHaveStyle({
      visibility: "visible",
      transform: "translateX(0)",
    });
  });

  // TODO remove this as part of FE-5650
  it("should not render the menu if isOpen is false", () => {
    render(
      <VerticalMenuFullScreen isOpen={false} onClose={() => {}}>
        <VerticalMenuItem title="Item1" />
      </VerticalMenuFullScreen>,
    );

    const menu = screen.queryByRole("navigation");

    expect(menu).not.toBeInTheDocument();
  });

  it("should override the scrollbar styling", () => {
    render(
      <VerticalMenuFullScreen isOpen onClose={() => {}}>
        <VerticalMenuItem title="Item1" />
      </VerticalMenuFullScreen>,
    );

    expect(screen.getByRole("navigation")).toHaveStyleRule(
      "background-color",
      "#cccccc",
      {
        modifier: "::-webkit-scrollbar-track",
      },
    );

    expect(screen.getByRole("navigation")).toHaveStyleRule(
      "background-color",
      "#808080",
      {
        modifier: "::-webkit-scrollbar-thumb",
      },
    );

    expect(screen.getByRole("navigation")).toHaveStyleRule("width", "12px", {
      modifier: "::-webkit-scrollbar",
    });
  });

  it("should invoke onClose callback when close Icon is clicked", async () => {
    const user = userEvent.setup();

    const onClose = jest.fn();
    render(
      <VerticalMenuFullScreen isOpen onClose={onClose}>
        <VerticalMenuItem title="Item1" />
      </VerticalMenuFullScreen>,
    );

    await user.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalled();
  });

  it("should invoke onClose callback escape key pressed", async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    render(
      <VerticalMenuFullScreen isOpen onClose={onClose}>
        <VerticalMenuItem title="Item1" />
      </VerticalMenuFullScreen>,
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalled();
  });

  it("should have the expected data attributes", () => {
    render(
      <VerticalMenuFullScreen
        isOpen
        data-element="foo"
        data-role="bar"
        onClose={() => {}}
      >
        <VerticalMenuItem title="Item1" />
      </VerticalMenuFullScreen>,
    );

    const menu = screen.getByRole("navigation");

    expect(menu).toHaveAttribute("data-component", "vertical-menu-full-screen");
    expect(menu).toHaveAttribute("data-element", "foo");
    expect(menu).toHaveAttribute("data-role", "bar");
  });
});
