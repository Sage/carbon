import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ActionOption from ".";

test("renders as an Option and forwards its props and ref", () => {
  const ref = createRef<HTMLLIElement>();

  render(
    <ul>
      <ActionOption
        ref={ref}
        id="add-item"
        data-element="add-item"
        text="Add an item"
        value="add"
      />
    </ul>,
  );

  const item = screen.getByRole("option", { name: "Add an item" });
  expect(item.tagName).toBe("LI");
  expect(item).toHaveAttribute("data-component", "option");
  expect(item).toHaveAttribute("data-element", "add-item");
  expect(ref.current).toBe(item);
});

test("uses the secondary action colours", () => {
  render(
    <ul>
      <ActionOption text="Add an item" value="add" />
    </ul>,
  );

  const item = screen.getByRole("option", { name: "Add an item" });
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
  expect(item).toHaveStyleRule(
    "color",
    "var(--button-typical-secondary-label-hover)",
    { modifier: ":hover" },
  );
});

test("sets `aria-disabled` and does not apply action colours when disabled", () => {
  render(
    <ul>
      <ActionOption text="Add an item" value="add" disabled />
    </ul>,
  );

  const item = screen.getByRole("option", { name: "Add an item" });
  expect(item).toHaveAttribute("aria-disabled", "true");
  expect(item).not.toHaveStyleRule(
    "background-color",
    "var(--button-typical-secondary-bg-default)",
  );
});

test("should call `onClick` with the option value when the user clicks on the element", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup();
  render(
    <ul>
      <ActionOption text="Add an item" value="add" onClick={onClick} />
    </ul>,
  );

  await user.click(screen.getByRole("option", { name: "Add an item" }));

  expect(onClick).toHaveBeenCalledWith("add");
});
