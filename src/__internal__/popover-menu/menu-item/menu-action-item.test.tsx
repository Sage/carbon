import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MenuActionItem from "./menu-action-item.component";

test("applies action colours without changing option semantics", () => {
  render(
    <ul>
      <MenuActionItem>Action item</MenuActionItem>
    </ul>,
  );

  const item = screen.getByRole("option", { name: "Action item" });
  expect(item).toHaveStyleRule(
    "background-color",
    "var(--button-typical-secondary-bg-default)",
  );
  expect(item).toHaveStyleRule(
    "color",
    "var(--button-typical-secondary-label-default)",
  );
  expect(item).toHaveStyleRule(
    "background-color",
    "var(--button-typical-secondary-bg-hover)",
    { modifier: ":hover" },
  );
  expect(item).not.toHaveStyleRule(
    "background-color",
    "var(--input-dropdown-bg-hover)",
    { modifier: ":not(:has(button)):not(:has(a)):hover" },
  );
  expect(item).toHaveStyleRule(
    "background-color",
    "var(--button-typical-secondary-bg-hover)",
    { modifier: ":active" },
  );
  expect(item).toHaveStyleRule(
    "color",
    "var(--button-typical-secondary-label-hover)",
    { modifier: ":active" },
  );
});

test("does not apply action colours when disabled", () => {
  render(
    <ul>
      <MenuActionItem disabled>Action item</MenuActionItem>
    </ul>,
  );

  expect(
    screen.getByRole("option", { name: "Action item" }),
  ).not.toHaveStyleRule(
    "background-color",
    "var(--button-typical-secondary-bg-default)",
  );
});

test("retains selection and measurement while blocking disabled activation", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  const measureElement = jest.fn();
  const { rerender } = render(
    <ul>
      <MenuActionItem
        selected
        measureElement={measureElement}
        onClick={onClick}
      >
        Action item
      </MenuActionItem>
    </ul>,
  );
  const item = screen.getByRole("option");
  expect(item).toHaveAttribute("aria-selected", "true");
  expect(measureElement).toHaveBeenCalledWith(item);
  await user.click(item);
  expect(onClick).toHaveBeenCalledTimes(1);

  rerender(
    <ul>
      <MenuActionItem selected disabled onClick={onClick}>
        Action item
      </MenuActionItem>
    </ul>,
  );
  expect(screen.getByRole("option")).toHaveAttribute("aria-disabled", "true");
  expect(screen.getByRole("option")).toHaveAttribute("aria-selected", "false");
  await user.click(screen.getByRole("option"));
  expect(onClick).toHaveBeenCalledTimes(1);
});
