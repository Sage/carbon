import React from "react";
import { render, screen } from "@testing-library/react";
import MenuItemHeading from "./menu-item-heading.component";
import { PopoverMenuContext } from "../../contexts";

test("renders the heading text", () => {
  render(
    <ul>
      <MenuItemHeading text="Heading">
        <li>item</li>
      </MenuItemHeading>
      xw
    </ul>,
  );

  expect(screen.getByText("Heading")).toBeVisible();
});

test("renders the heading icon when icon is provided", () => {
  render(
    <ul>
      <MenuItemHeading
        text="Heading"
        icon={<span data-role="heading-icon">icon</span>}
      >
        <li>item</li>
      </MenuItemHeading>
    </ul>,
  );

  const icon = screen.getByTestId("heading-icon");

  expect(icon).toBeVisible();
});

test.each([
  ["small", "var(--global-space-comp-2-xs)"],
  ["medium", "var(--global-space-comp-xs)"],
  ["large", "var(--global-space-comp-xs)"],
] as const)("renders with gap %s when size is %s", (size, expectedGap) => {
  render(
    <PopoverMenuContext.Provider value={{ size }}>
      <ul>
        <MenuItemHeading text="Heading" icon={<span>icon</span>}>
          <li>item</li>
        </MenuItemHeading>
      </ul>
    </PopoverMenuContext.Provider>,
  );

  const textAndIconContainer = screen.getByTestId("text-with-icon");

  expect(textAndIconContainer).toHaveStyleRule("gap", expectedGap);
});
