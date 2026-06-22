import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MenuItem from "./menu-item.component";
import MenuItemLeading from "./menu-item-content/menu-item-leading.component";
import MenuItemLabel from "./menu-item-content/menu-item-label.component";
import MenuItemSubtext from "./menu-item-content/menu-item-subtext.component";
import { PopoverMenuContext } from "../contexts";
import Icon from "../../../components/icon";

test("renders with data-component attribute", () => {
  render(
    <ul>
      <MenuItem>Menu item</MenuItem>
    </ul>,
  );

  expect(screen.getByRole("option")).toHaveAttribute(
    "data-component",
    "popover-menu-item",
  );
});

test("renders with popover-menu-item class name", () => {
  render(
    <ul>
      <MenuItem>Menu item</MenuItem>
    </ul>,
  );

  expect(screen.getByRole("option")).toHaveClass("popover-menu-item");
});

test("renders with popover-menu-item-disabled class name", () => {
  render(
    <ul>
      <MenuItem disabled>Menu item</MenuItem>
    </ul>,
  );

  expect(screen.getByRole("option")).toHaveClass("popover-menu-item-disabled");
});

test("does not set aria-selected to false by default", () => {
  render(
    <ul>
      <MenuItem>Menu item</MenuItem>
    </ul>,
  );

  expect(screen.getByRole("option")).not.toHaveAttribute(
    "aria-selected",
    "false",
  );
});

test("sets aria-selected to false when selected is false", () => {
  render(
    <ul>
      <MenuItem selected={false}>Menu item</MenuItem>
    </ul>,
  );

  expect(screen.getByRole("option")).toHaveAttribute("aria-selected", "false");
});

test("sets aria-selected to true when selected is true", () => {
  render(
    <ul>
      <MenuItem selected>Menu item</MenuItem>
    </ul>,
  );

  expect(screen.getByRole("option")).toHaveAttribute("aria-selected", "true");
});

test("does not set aria-selected to true when selected and disabled are true", () => {
  render(
    <ul>
      <MenuItem selected disabled>
        Menu item
      </MenuItem>
    </ul>,
  );

  const option = screen.getByRole("option");

  expect(option).toHaveAttribute("aria-selected", "false");
  expect(option).toHaveAttribute("aria-disabled", "true");
});

test("calls onClick when clicked", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup();
  render(
    <ul>
      <MenuItem onClick={onClick}>Menu item</MenuItem>
    </ul>,
  );

  await user.click(screen.getByRole("option"));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test.each(["small", "medium", "large"] as const)(
  "renders with size %s from context",
  (size) => {
    render(
      <PopoverMenuContext.Provider value={{ size }}>
        <ul>
          <MenuItem>Menu item</MenuItem>
        </ul>
      </PopoverMenuContext.Provider>,
    );

    const item = screen.getByRole("option");

    expect(item).toHaveStyleRule(
      "min-height",
      `var(--global-size-${size[0]})`,
      {
        modifier:
          ":not(:has(button)):not(:has(a)):not(:has(.menu-item-subtext))",
      },
    );
    expect(item).toHaveStyleRule(
      "font",
      `var(--global-font-static-comp-regular-${size[0]})`,
      { modifier: `*:not(.menu-item-subtext):not(.menu-item-label-prefix)` },
    );
  },
);

test("should render the selected icon when selectedIcon on MenuItemLeading is true", () => {
  render(
    <PopoverMenuContext.Provider value={{ size: "medium" }}>
      <ul>
        <MenuItem>
          <MenuItemLeading selectedIcon>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel>Menu item</MenuItemLabel>
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
      </ul>
    </PopoverMenuContext.Provider>,
  );

  expect(screen.getByTestId("selected-icon")).toBeVisible();
  expect(screen.getByTestId("selected-icon-wrapper")).toHaveStyle(
    "visibility: visible",
  );
});

test("should not render the selected icon when selectedIcon on MenuItemLeading is false", () => {
  render(
    <PopoverMenuContext.Provider value={{ size: "medium" }}>
      <ul>
        <MenuItem>
          <MenuItemLeading selectedIcon={false}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel>Menu item</MenuItemLabel>
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
      </ul>
    </PopoverMenuContext.Provider>,
  );

  expect(screen.queryByTestId("selected-icon")).not.toBeVisible();
  expect(screen.getByTestId("selected-icon-wrapper")).toHaveStyle(
    "visibility: hidden",
  );
});
