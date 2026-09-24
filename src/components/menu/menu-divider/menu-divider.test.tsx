import React from "react";
import { render, screen } from "@testing-library/react";

import MenuDivider from "./menu-divider.component";
import Logger from "../../../__internal__/utils/logger";
import Menu from "../menu.component";
import MenuFullScreen from "../menu-full-screen";

test("logs error if not used within Menu", () => {
  const loggerErrorSpy = jest
    .spyOn(Logger, "error")
    .mockImplementation(() => {});

  render(<MenuDivider data-role="divider" />);

  expect(loggerErrorSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon Menu: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );

  loggerErrorSpy.mockRestore();
});
test("should have the expected 'data-' attributes", () => {
  render(
    <Menu>
      <MenuDivider data-role="divider" data-element="foo" />
    </Menu>,
  );

  expect(screen.getByTestId("divider")).toHaveAttribute(
    "data-component",
    "menu-divider",
  );
  expect(screen.getByTestId("divider")).toHaveAttribute("data-element", "foo");
  expect(screen.getByTestId("divider")).toHaveAttribute("data-role", "divider");
});

test("should have aria-hidden='true' on the list item", () => {
  render(
    <Menu>
      <MenuDivider data-role="divider" />
    </Menu>,
  );

  expect(screen.getByTestId("divider-container")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
});

// coverage
test("renders `size` 'large' with expected styles'", () => {
  render(
    <Menu>
      <MenuDivider size="large" data-role="divider" />
    </Menu>,
  );

  const divider = screen.getByTestId("divider");
  expect(divider).toHaveStyle({ height: "4px", margin: "0" });
});

test("renders default divider with expected styles when inside a fullscreen menu", () => {
  render(
    <Menu>
      <MenuFullScreen onClose={() => {}} isOpen>
        <MenuDivider data-role="divider" />
      </MenuFullScreen>
    </Menu>,
  );

  expect(screen.getByTestId("divider")).toHaveStyleRule(
    "margin",
    "var(--global-space-comp-s) var(--global-space-comp-l)",
  );
});
