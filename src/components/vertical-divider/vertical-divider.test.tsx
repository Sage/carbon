import React from "react";
import { render, screen } from "@testing-library/react";
import { testStyledSystemSpacingRTL } from "../../__spec_helper__/__internal__/test-utils";
import VerticalDivider from ".";
import MenuContext from "../menu/__internal__/menu.context";

testStyledSystemSpacingRTL(
  (props) => <VerticalDivider {...props} />,
  () => screen.getByTestId("vertical-divider"),
  { p: 3 },
);

test("should apply the expected height when `h` prop is passed a value of `100`", () => {
  render(<VerticalDivider h={200} />);
  const verticalDividerElement = screen.getByTestId("vertical-divider");

  expect(verticalDividerElement).toHaveStyle("height: 200px");
});

test("should apply the expected height when `h` prop is passed a string value", () => {
  render(<VerticalDivider h="100px" />);
  const verticalDividerElement = screen.getByTestId("vertical-divider");

  expect(verticalDividerElement).toHaveStyle("height: 100px");
});

test("should apply the expected styling when `displayInline` prop is true", () => {
  render(<VerticalDivider displayInline />);
  const verticalDividerElement = screen.getByTestId("vertical-divider");

  expect(verticalDividerElement).toHaveStyle("display: inline");
});

test("should apply the expected tint when `tint` prop is passed a value of `20`", () => {
  render(<VerticalDivider tint={20} />);
  const verticalDividerElement = screen.getByTestId("divider");

  expect(verticalDividerElement).toHaveStyle("borderLeft: 1px solid #335C6D");
});

test("should apply the expected tint when `tint` prop is passed a value of `90`", () => {
  render(<VerticalDivider tint={90} />);
  const verticalDividerElement = screen.getByTestId("divider");

  expect(verticalDividerElement).toHaveStyle("borderLeft: 1px solid #E6EBED");
});

test("should render as an `li` element with `aria-hidden` when inside a Menu", () => {
  render(
    <MenuContext.Provider
      value={{
        menuType: "light",
        inMenu: true,
        openSubmenuId: null,
        setOpenSubmenuId: () => {},
      }}
    >
      <VerticalDivider />
    </MenuContext.Provider>,
  );
  const verticalDividerElement = screen.getByTestId("vertical-divider");

  expect(verticalDividerElement.tagName).toEqual("LI");
  expect(verticalDividerElement).toHaveAttribute("aria-hidden", "true");
});

test("should allow the `aria-hidden` attribute to be set when not in a menu", () => {
  render(<VerticalDivider aria-hidden />);
  const verticalDividerElement = screen.getByTestId("vertical-divider");

  expect(verticalDividerElement).toHaveAttribute("aria-hidden", "true");
});

test("should not allow the `aria-hidden` attribute to be overridden when in a menu", () => {
  render(
    <MenuContext.Provider
      value={{
        menuType: "light",
        inMenu: true,
        openSubmenuId: null,
        setOpenSubmenuId: () => {},
      }}
    >
      <VerticalDivider aria-hidden={false} />
    </MenuContext.Provider>,
  );
  const verticalDividerElement = screen.getByTestId("vertical-divider");

  expect(verticalDividerElement).toHaveAttribute("aria-hidden", "true");
});
