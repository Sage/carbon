import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MenuSegmentTitle from "./menu-segment-title.component";
import MenuContext, {
  MenuContextProps,
  MenuType,
} from "../__internal__/menu.context";
import { MenuItem } from "..";
import menuConfigVariants from "../menu.config";

const menuContextValues = (
  menuType: MenuType,
  inFullscreenView = false,
): MenuContextProps => ({
  menuType,
  setOpenSubmenuId: () => null,
  openSubmenuId: null,
  inMenu: true,
  inFullscreenView,
});

test("should render with correct colour when 'light' `menuType` received from context", async () => {
  const user = userEvent.setup();
  const { title: color } = menuConfigVariants.light;
  render(
    <MenuContext.Provider value={menuContextValues("light")}>
      <ul>
        <MenuItem submenu="Item One">
          <MenuSegmentTitle text="foo">
            <li>bar</li>
          </MenuSegmentTitle>
        </MenuItem>
      </ul>
    </MenuContext.Provider>,
  );

  await user.click(screen.getByText("Item One"));

  expect(screen.getByText("foo")).toHaveStyle({
    color,
  });
});

test("should render with correct colour when 'dark' `menuType` received from context", async () => {
  const user = userEvent.setup();
  const { title: color } = menuConfigVariants.dark;
  render(
    <MenuContext.Provider value={menuContextValues("dark")}>
      <ul>
        <MenuItem submenu="Item One">
          <MenuSegmentTitle text="foo">
            <li>bar</li>
          </MenuSegmentTitle>
        </MenuItem>
      </ul>
    </MenuContext.Provider>,
  );

  await user.click(screen.getByText("Item One"));

  expect(screen.getByText("foo")).toHaveStyle({
    color,
  });
});

test("should render with correct colour when 'white' `menuType` received from context", async () => {
  const user = userEvent.setup();
  const { title: color } = menuConfigVariants.white;
  render(
    <MenuContext.Provider value={menuContextValues("white")}>
      <ul>
        <MenuItem submenu="Item One">
          <MenuSegmentTitle text="foo">
            <li>bar</li>
          </MenuSegmentTitle>
        </MenuItem>
      </ul>
    </MenuContext.Provider>,
  );

  await user.click(screen.getByText("Item One"));

  expect(screen.getByText("foo")).toHaveStyle({
    color,
  });
});

test("should render with correct colour when 'black' `menuType` received from context", async () => {
  const user = userEvent.setup();
  const { title: color } = menuConfigVariants.black;
  render(
    <MenuContext.Provider value={menuContextValues("black")}>
      <ul>
        <MenuItem submenu="Item One">
          <MenuSegmentTitle text="foo">
            <li>bar</li>
          </MenuSegmentTitle>
        </MenuItem>
      </ul>
    </MenuContext.Provider>,
  );

  await user.click(screen.getByText("Item One"));

  expect(screen.getByText("foo")).toHaveStyle({
    color,
  });
});

test("should render title as an h2 heading element by default and render list items as children of the ul", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues("black")}>
      <ul>
        <MenuItem submenu="Item One">
          <MenuSegmentTitle text="Title">
            <li>bar</li>
          </MenuSegmentTitle>
        </MenuItem>
      </ul>
    </MenuContext.Provider>,
  );

  await user.click(screen.getByText("Item One"));
  const segmentList = screen.getByTestId("menu-segment-children");

  expect(
    screen.getByRole("heading", { level: 2, name: "Title" }),
  ).toBeVisible();
  expect(segmentList).toContainElement(screen.getByText("bar"));
});

test("should render title `as` an 'h2' heading element and render list items as children of the ul", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues("black")}>
      <ul>
        <MenuItem submenu="Item One">
          <MenuSegmentTitle as="h2" text="Title">
            <li>bar</li>
          </MenuSegmentTitle>
        </MenuItem>
      </ul>
    </MenuContext.Provider>,
  );

  await user.click(screen.getByText("Item One"));
  const segmentList = screen.getByTestId("menu-segment-children");

  expect(
    screen.getByRole("heading", { level: 2, name: "Title" }),
  ).toBeVisible();
  expect(segmentList).toContainElement(screen.getByText("bar"));
});

test("should render title `as` an 'h3' heading element and render list items as children of the ul", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues("black")}>
      <ul>
        <MenuItem submenu="Item One">
          <MenuSegmentTitle as="h3" text="Title">
            <li>bar</li>
          </MenuSegmentTitle>
        </MenuItem>
      </ul>
    </MenuContext.Provider>,
  );

  await user.click(screen.getByText("Item One"));
  const segmentList = screen.getByTestId("menu-segment-children");

  expect(
    screen.getByRole("heading", { level: 3, name: "Title" }),
  ).toBeVisible();
  expect(segmentList).toContainElement(screen.getByText("bar"));
});

test("should render title `as` an 'h4' heading element and render list items as children of the ul", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues("black")}>
      <ul>
        <MenuItem submenu="Item One">
          <MenuSegmentTitle as="h4" text="Title">
            <li>bar</li>
          </MenuSegmentTitle>
        </MenuItem>
      </ul>
    </MenuContext.Provider>,
  );

  await user.click(screen.getByText("Item One"));
  const segmentList = screen.getByTestId("menu-segment-children");

  expect(
    screen.getByRole("heading", { level: 4, name: "Title" }),
  ).toBeVisible();
  expect(segmentList).toContainElement(screen.getByText("bar"));
});

test("should render title `as` an 'h5' heading element and render list items as children of the ul", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues("black")}>
      <ul>
        <MenuItem submenu="Item One">
          <MenuSegmentTitle as="h5" text="Title">
            <li>bar</li>
          </MenuSegmentTitle>
        </MenuItem>
      </ul>
    </MenuContext.Provider>,
  );

  await user.click(screen.getByText("Item One"));
  const segmentList = screen.getByTestId("menu-segment-children");

  expect(
    screen.getByRole("heading", { level: 5, name: "Title" }),
  ).toBeVisible();
  expect(segmentList).toContainElement(screen.getByText("bar"));
});

test("should render title `as` an 'h6' heading element and render list items as children of the ul", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues("black")}>
      <ul>
        <MenuItem submenu="Item One">
          <MenuSegmentTitle as="h6" text="Title">
            <li>bar</li>
          </MenuSegmentTitle>
        </MenuItem>
      </ul>
    </MenuContext.Provider>,
  );

  await user.click(screen.getByText("Item One"));
  const segmentList = screen.getByTestId("menu-segment-children");

  expect(
    screen.getByRole("heading", { level: 6, name: "Title" }),
  ).toBeVisible();
  expect(segmentList).toContainElement(screen.getByText("bar"));
});

test("should render title with expected styling when `variant` is 'alternate' and `menuType` is 'light'", async () => {
  const user = userEvent.setup();
  const { alternate: backgroundColor } = menuConfigVariants.light;
  render(
    <MenuContext.Provider value={menuContextValues("black")}>
      <ul>
        <MenuItem submenu="Item One">
          <MenuSegmentTitle text="foo" variant="alternate">
            <li>bar</li>
          </MenuSegmentTitle>
        </MenuItem>
      </ul>
    </MenuContext.Provider>,
  );

  await user.click(screen.getByText("Item One"));

  expect(screen.getByText("foo")).toHaveStyle({
    backgroundColor,
  });
});

test("should render title with expected styling when `variant` is 'alternate' and `menuType` is 'dark'", async () => {
  const user = userEvent.setup();
  const { alternate: backgroundColor } = menuConfigVariants.dark;
  render(
    <MenuContext.Provider value={menuContextValues("black")}>
      <ul>
        <MenuItem submenu="Item One">
          <MenuSegmentTitle text="foo" variant="alternate">
            <li>bar</li>
          </MenuSegmentTitle>
        </MenuItem>
      </ul>
    </MenuContext.Provider>,
  );

  await user.click(screen.getByText("Item One"));

  expect(screen.getByText("foo")).toHaveStyle({
    backgroundColor,
  });
});

test("should render title with expected styling when `variant` is 'alternate' and `menuType` is 'white'", async () => {
  const user = userEvent.setup();
  const { alternate: backgroundColor } = menuConfigVariants.white;
  render(
    <MenuContext.Provider value={menuContextValues("black")}>
      <ul>
        <MenuItem submenu="Item One">
          <MenuSegmentTitle text="foo" variant="alternate">
            <li>bar</li>
          </MenuSegmentTitle>
        </MenuItem>
      </ul>
    </MenuContext.Provider>,
  );

  await user.click(screen.getByText("Item One"));

  expect(screen.getByText("foo")).toHaveStyle({
    backgroundColor,
  });
});

test("should render title with expected styling when `variant` is 'alternate' and `menuType` is 'black'", async () => {
  const user = userEvent.setup();
  const { alternate: backgroundColor } = menuConfigVariants.black;
  render(
    <MenuContext.Provider value={menuContextValues("black")}>
      <ul>
        <MenuItem submenu="Item One">
          <MenuSegmentTitle text="foo" variant="alternate">
            <li>bar</li>
          </MenuSegmentTitle>
        </MenuItem>
      </ul>
    </MenuContext.Provider>,
  );

  await user.click(screen.getByText("Item One"));

  expect(screen.getByText("foo")).toHaveStyle({
    backgroundColor,
  });
});

test("should apply expected `data-` attributes", () => {
  render(
    <MenuSegmentTitle text="foo" data-element="bar" data-role="baz">
      <li>bar</li>
    </MenuSegmentTitle>,
  );

  expect(screen.getByText("foo")).toHaveAttribute(
    "data-component",
    "menu-segment-title",
  );
  expect(screen.getByText("foo")).toHaveAttribute("data-element", "bar");
  expect(screen.getByText("foo")).toHaveAttribute("data-role", "baz");
});

test("should not wrap when the submenu parent has no max-width set", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues("light")}>
      <ul>
        <MenuItem submenu="Item One">
          <MenuSegmentTitle text="Title">
            <li>bar</li>
          </MenuSegmentTitle>
        </MenuItem>
      </ul>
    </MenuContext.Provider>,
  );
  await user.click(screen.getByText("Item One"));

  expect(
    await screen.findByRole("heading", { level: 2, name: "Title" }),
  ).toHaveStyle("white-space: nowrap");
});

test("should wrap when the submenu parent has a max-width set", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues("light")}>
      <ul>
        <MenuItem submenuMaxWidth="200px" submenu="Item One">
          <MenuSegmentTitle text="Title">
            <li>bar</li>
          </MenuSegmentTitle>
        </MenuItem>
      </ul>
    </MenuContext.Provider>,
  );
  await user.click(screen.getByText("Item One"));

  expect(
    await screen.findByRole("heading", { level: 2, name: "Title" }),
  ).toHaveStyle("white-space: normal");
});

// coverage
test("should set the correct colour when a child of `MenuSegmentTitle` and `variant` is 'alternate'", async () => {
  render(
    <MenuContext.Provider value={menuContextValues("black", true)}>
      <MenuSegmentTitle text="Title" variant="alternate">
        <MenuItem variant="alternate" href="#">
          Item One
        </MenuItem>
      </MenuSegmentTitle>
    </MenuContext.Provider>,
  );

  expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
    backgroundColor: menuConfigVariants.black.alternate,
  });
});
