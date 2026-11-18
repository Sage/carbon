import React from "react";
import { render, screen } from "@testing-library/react";
import { MenuHeadingContext, PopoverMenuContext } from "../contexts";
import { wrapChildrenInItem } from "../utils";
import MenuActionItem from "./menu-action-item.component";
import MenuOptionItem from "./menu-option-item.component";

test("keeps option attributes and heading context in a submenu", () => {
  const measureElement = jest.fn();
  render(
    <PopoverMenuContext.Provider value={{ size: "small", isSubmenu: true }}>
      <MenuHeadingContext.Provider value={{ headingId: "heading" }}>
        <ul>
          <MenuOptionItem
            id="custom-option"
            className="custom-class"
            aria-describedby="description"
            measureElement={measureElement}
            selected
          >
            Option
          </MenuOptionItem>
        </ul>
      </MenuHeadingContext.Provider>
    </PopoverMenuContext.Provider>,
  );

  const option = screen.getByRole("option", { name: "Option" });
  expect(option).toHaveAttribute("id", "custom-option");
  expect(option).toHaveAttribute("data-component", "popover-submenu-item");
  expect(option).toHaveAttribute("aria-describedby", "description heading");
  expect(option).toHaveAttribute("aria-selected", "true");
  expect(option).toHaveClass("popover-menu-item", "custom-class");
  expect(measureElement).toHaveBeenCalledWith(option);
});

test("keeps complete option and action items when wrapping menu children", () => {
  render(
    <ul>
      {wrapChildrenInItem(
        <>
          <MenuOptionItem>Option</MenuOptionItem>
          <MenuActionItem>Action</MenuActionItem>
        </>,
      )}
    </ul>,
  );

  expect(screen.getAllByRole("option")).toHaveLength(2);
});
