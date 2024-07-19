import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Menu, MenuItem } from ".";
import {
  testStyledSystemLayout,
  testStyledSystemFlexBox,
} from "../../__spec_helper__/__internal__/test-utils";

testStyledSystemLayout((props) => <Menu {...props}>Foo</Menu>);
testStyledSystemFlexBox((props) => <Menu {...props}>Foo</Menu>);

test("should focus the last item when 'End' key is pressed by user", async () => {
  const user = userEvent.setup();
  render(
    <Menu>
      <MenuItem href="#">test one</MenuItem>
      <MenuItem href="#">test two</MenuItem>
      <MenuItem href="#">test three</MenuItem>
      <MenuItem href="#">test four</MenuItem>
    </Menu>
  );
  const firstMenuItem = screen.getByRole("link", { name: "test one" });
  firstMenuItem.focus();
  const lastMenuItem = screen.getByRole("link", { name: "test four" });
  await user.keyboard("{End}");

  expect(lastMenuItem).toBeFocused();
});

test("should focus the first item when 'Home' key is pressed by user", async () => {
  const user = userEvent.setup();
  render(
    <Menu>
      <MenuItem href="#">test one</MenuItem>
      <MenuItem href="#">test two</MenuItem>
      <MenuItem href="#">test three</MenuItem>
      <MenuItem href="#">test four</MenuItem>
    </Menu>
  );
  const lastMenuItem = screen.getByRole("link", { name: "test four" });
  lastMenuItem.focus();
  const firstMenuItem = screen.getByRole("link", { name: "test one" });
  await user.keyboard("{Home}");

  expect(firstMenuItem).toBeFocused();
});

test("should focus the next item in sequence, and remove focus from menu on last item, when 'Tab' key is pressed by user", async () => {
  const user = userEvent.setup();
  render(
    <Menu>
      <MenuItem href="#">test one</MenuItem>
      <MenuItem href="#">test two</MenuItem>
      <MenuItem href="#">test three</MenuItem>
      <MenuItem href="#">test four</MenuItem>
    </Menu>
  );
  const items = screen.getAllByRole("link");
  items[0].focus();
  await user.tab();

  expect(items[1]).toBeFocused();
  await user.tab();
  expect(items[2]).toBeFocused();
  await user.tab();
  expect(items[3]).toBeFocused();
  await user.tab();
  expect(document.body).toBeFocused();
});

test("should focus the previous item in sequence, and remove focus from menu on first item, when 'Shift+Tab' key is pressed by user", async () => {
  const user = userEvent.setup();
  render(
    <Menu>
      <MenuItem href="#">test one</MenuItem>
      <MenuItem href="#">test two</MenuItem>
      <MenuItem href="#">test three</MenuItem>
      <MenuItem href="#">test four</MenuItem>
    </Menu>
  );
  const items = screen.getAllByRole("link");
  items[3].focus();
  await user.tab({ shift: true });

  expect(items[2]).toBeFocused();
  await user.tab({ shift: true });
  expect(items[1]).toBeFocused();
  await user.tab({ shift: true });
  expect(items[0]).toBeFocused();
  await user.tab({ shift: true });
  expect(document.body).toBeFocused();
});

test("should not focus the next item in sequence when 'arrowright' key is pressed by user", async () => {
  const user = userEvent.setup();
  render(
    <Menu>
      <MenuItem href="#">test one</MenuItem>
      <MenuItem href="#">test two</MenuItem>
      <MenuItem href="#">test three</MenuItem>
      <MenuItem href="#">test four</MenuItem>
    </Menu>
  );
  const items = screen.getAllByRole("link");
  items[0].focus();
  await user.keyboard("{arrowright}");

  expect(items[0]).toBeFocused();
  await user.keyboard("{arrowright}");
  expect(items[0]).toBeFocused();
  await user.keyboard("{arrowright}");
  expect(items[0]).toBeFocused();
});

test("should not focus the previous item in sequence when 'arrowleft' key is pressed by user", async () => {
  const user = userEvent.setup();
  render(
    <Menu>
      <MenuItem href="#">test one</MenuItem>
      <MenuItem href="#">test two</MenuItem>
      <MenuItem href="#">test three</MenuItem>
      <MenuItem href="#">test four</MenuItem>
    </Menu>
  );
  const items = screen.getAllByRole("link");
  items[3].focus();
  await user.keyboard("{arrowleft}");

  expect(items[3]).toBeFocused();
  await user.keyboard("{arrowleft}");
  expect(items[3]).toBeFocused();
  await user.keyboard("{arrowleft}");
  expect(items[3]).toBeFocused();
});

test("should not throw an error when conditionally rendered `children` are passed", () => {
  expect(() => {
    render(
      <Menu>
        {true && <MenuItem href="#">test one</MenuItem>}
        {false && <MenuItem href="#">test two</MenuItem>}
      </Menu>
    );
  }).not.toThrow();
});

test("should close any open submenus when a new submenu is opened", async () => {
  const user = userEvent.setup();
  render(
    <Menu>
      <MenuItem href="#">menu item</MenuItem>
      <MenuItem submenu="submenu 1">
        <MenuItem href="#">submenu 1 item 1</MenuItem>
        <MenuItem href="#">submenu 1 item 2</MenuItem>
      </MenuItem>
      <MenuItem submenu="submenu 2">
        <MenuItem href="#">submenu 2 item 1</MenuItem>
        <MenuItem href="#">submenu 2 item 2</MenuItem>
      </MenuItem>
    </Menu>
  );
  const firstSubmenuItem = screen.getByRole("button", { name: "submenu 1" });
  const secondSubmenuItem = screen.getByRole("button", { name: "submenu 2" });

  await user.click(firstSubmenuItem);

  expect(screen.getByRole("link", { name: "submenu 1 item 1" })).toBeVisible();
  expect(
    screen.queryByRole("link", { name: "submenu 2 item 2" })
  ).not.toBeInTheDocument();

  await user.click(secondSubmenuItem);

  expect(
    screen.queryByRole("link", { name: "submenu 1 item 1" })
  ).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "submenu 2 item 2" })).toBeVisible();
});

// this is to hit test coverage that the item unregisters its ID on unmount
test("should support menu items unmounting", async () => {
  const user = userEvent.setup();
  const MockMenu = () => {
    const [show, setShow] = React.useState(true);
    return (
      <Menu>
        {show && (
          <MenuItem onClick={() => setShow(false)}>test element 1</MenuItem>
        )}
        <MenuItem onClick={() => {}}>test element 2</MenuItem>
      </Menu>
    );
  };
  render(<MockMenu />);

  expect(screen.getAllByRole("button").length).toBe(2);

  await user.click(screen.getByRole("button", { name: "test element 1" }));

  expect(screen.getAllByRole("button").length).toBe(1);
});

test("should apply the expected `data-` tags as attributes", () => {
  render(
    <Menu data-element="bar" data-role="baz">
      <MenuItem>Foo</MenuItem>
    </Menu>
  );
  const menu = screen.getByRole("list");

  expect(menu).toHaveAttribute("data-component", "menu");
  expect(menu).toHaveAttribute("data-element", "bar");
  expect(menu).toHaveAttribute("data-role", "baz");
});
