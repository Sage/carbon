import React from "react";
import { render, screen, within } from "@testing-library/react";

import ScrollableBlock from ".";

import Logger from "../../../__internal__/utils/logger";
import MenuItem from "../menu-item";
import menuConfigVariants from "../menu.config";
import {
  StrictMenuContextType,
  StrictMenuProvider,
} from "../__internal__/strict-menu.context";

const menuContextValues: StrictMenuContextType = {
  variant: "white",
  setOpenSubmenuId: () => {},
  openSubmenuId: null,
};

test("logs error if not used within Menu", () => {
  const loggerErrorSpy = jest
    .spyOn(Logger, "error")
    .mockImplementation(() => {});

  render(
    <ScrollableBlock data-role="scrollable-block" variant="default">
      <MenuItem href="#">Apple</MenuItem>
    </ScrollableBlock>,
  );

  expect(loggerErrorSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon Menu: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );

  loggerErrorSpy.mockRestore();
});

test("renders with children", () => {
  render(
    <StrictMenuProvider value={menuContextValues}>
      <ScrollableBlock data-role="scrollable-block">
        <MenuItem href="#">Apple</MenuItem>
      </ScrollableBlock>
    </StrictMenuProvider>,
  );

  expect(screen.getByRole("link", { name: "Apple" })).toBeVisible();
});

test("should render the `parent` item, wrapped in a MenuItem", () => {
  render(
    <StrictMenuProvider value={menuContextValues}>
      <ScrollableBlock
        data-role="scrollable-block"
        parent={<span>Parent</span>}
      >
        <MenuItem href="#">Apple</MenuItem>
      </ScrollableBlock>
    </StrictMenuProvider>,
  );

  const parentItem = screen.getByTestId("scrollable-block-parent-menu-item");
  expect(within(parentItem).getByText("Parent")).toBeVisible();
});

test("sets the height and max-height props", () => {
  render(
    <StrictMenuProvider value={menuContextValues}>
      <ScrollableBlock
        data-role="scrollable-block"
        height={200}
        maxHeight={300}
      >
        <MenuItem href="#">Apple</MenuItem>
      </ScrollableBlock>
    </StrictMenuProvider>,
  );

  const container = within(screen.getByTestId("scrollable-block")).getByRole(
    "list",
  );
  expect(container).toHaveStyle({
    height: "200px",
    maxHeight: "300px",
  });
});

// coverage
test("sets the height and max-height from string props", () => {
  render(
    <StrictMenuProvider value={menuContextValues}>
      <ScrollableBlock
        data-role="scrollable-block"
        height="50vh"
        maxHeight="75vh"
      >
        <MenuItem href="#">Apple</MenuItem>
      </ScrollableBlock>
    </StrictMenuProvider>,
  );

  const container = within(screen.getByTestId("scrollable-block")).getByRole(
    "list",
  );
  expect(container).toHaveStyleRule("height", "50vh");
  expect(container).toHaveStyleRule("max-height", "75vh");
});

// coverage
test("does not apply the alternate variant styling when rendered in fullscreen view", () => {
  render(
    <StrictMenuProvider
      value={{ ...menuContextValues, inFullscreenView: true }}
    >
      <ScrollableBlock data-role="scrollable-block" variant="alternate">
        <MenuItem href="#">Apple</MenuItem>
      </ScrollableBlock>
    </StrictMenuProvider>,
  );

  expect(screen.getByRole("link", { name: "Apple" })).not.toHaveStyleRule(
    "background-color",
    menuConfigVariants.white.alternate,
  );
});

test("applies the provided data- attributes", () => {
  render(
    <StrictMenuProvider value={menuContextValues}>
      <ScrollableBlock data-role="scrollable-block" data-element="foo">
        <MenuItem href="#">Apple</MenuItem>
      </ScrollableBlock>
    </StrictMenuProvider>,
  );
  const scrollableBlock = screen.getByTestId("scrollable-block");

  expect(scrollableBlock).toHaveAttribute(
    "data-component",
    "submenu-scrollable-block",
  );
  expect(scrollableBlock).toHaveAttribute("data-element", "foo");
  expect(scrollableBlock).toHaveAttribute("data-role", "scrollable-block");
});
