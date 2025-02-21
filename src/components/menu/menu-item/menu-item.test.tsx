import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MenuItem, MenuSegmentTitle } from "..";
import {
  testStyledSystemFlexBox,
  testStyledSystemPadding,
} from "../../../__spec_helper__/__internal__/test-utils";
import MenuContext, { MenuContextProps } from "../__internal__/menu.context";
import Icon from "../../icon/icon.component";
import menuConfigVariants from "../menu.config";
import IconButton from "../../icon-button";
import Search from "../../search";
import SubmenuContext from "../__internal__/submenu/submenu.context";

const menuContextValues: MenuContextProps = {
  menuType: "light",
  setOpenSubmenuId: () => {},
  openSubmenuId: null,
  inMenu: true,
  registerItem: () => {},
  unregisterItem: () => {},
};

describe("When MenuItem has no submenu", () => {
  testStyledSystemPadding(
    (props) => (
      <MenuItem href="#" {...props}>
        Foo
      </MenuItem>
    ),
    () => screen.getByTestId("menu-item-wrapper"),
    undefined,
    { modifier: "&&& > a" },
  );

  testStyledSystemFlexBox(
    (props) => (
      <MenuItem href="#" {...props}>
        Foo
      </MenuItem>
    ),
    () => screen.getByRole("listitem"),
  );

  it("should apply the expected styling when `width` prop passed", () => {
    render(<MenuItem width="50%">Item One</MenuItem>);

    expect(screen.getByRole("listitem")).toHaveStyle({
      width: "50%",
    });
  });

  it("should apply the expected styling when `maxWidth` prop passed", () => {
    render(<MenuItem maxWidth="50%">Item One</MenuItem>);

    expect(screen.getByRole("listitem")).toHaveStyle({
      maxWidth: "50%",
    });
  });

  it("should apply the expected styling when `minWidth` prop passed", () => {
    render(<MenuItem minWidth="50%">Item One</MenuItem>);

    expect(screen.getByRole("listitem")).toHaveStyle({
      minWidth: "50%",
    });
  });

  it("should render children correctly", () => {
    render(<MenuItem>Item One</MenuItem>);

    expect(screen.getByRole("listitem")).toHaveTextContent("Item One");
  });

  it("should render an anchor element if `href` prop is set", () => {
    render(<MenuItem href="#">Item One</MenuItem>);

    expect(screen.getByRole("link", { name: "Item One" })).toBeVisible();
  });

  it("should render a button element if `onClick` prop is set", () => {
    render(<MenuItem onClick={() => {}}>Item One</MenuItem>);

    expect(
      screen.getByRole("button", { name: "Item One" }),
    ).toBeInTheDocument();
  });

  it("should render an anchor element if both `href` and `onClick` props are set", () => {
    render(
      <MenuItem onClick={() => {}} href="#">
        Item One
      </MenuItem>,
    );

    expect(screen.getByRole("link", { name: "Item One" })).toBeInTheDocument();
  });

  it("should render additional `carbon-menu-item--has-link` class if specified `href` prop is set", () => {
    render(<MenuItem href="#">Item One</MenuItem>);

    expect(screen.getByTestId("menu-item-wrapper")).toHaveClass(
      "carbon-menu-item--has-link",
    );
  });

  it("should render additional `carbon-menu-item--has-link` class if specified `onClick` prop is set", () => {
    render(<MenuItem onClick={() => {}}>Item One</MenuItem>);

    expect(screen.getByTestId("menu-item-wrapper")).toHaveClass(
      "carbon-menu-item--has-link",
    );
  });

  it("should add a `title` attribute with the full text when `maxWidth` prop is set", () => {
    render(<MenuItem maxWidth="100px">Item One</MenuItem>);

    expect(screen.getByRole("listitem", { name: "Item One" })).toHaveAttribute(
      "title",
      "Item One",
    );
  });

  it("should add the correct styles when `maxWidth` prop is set", () => {
    render(
      <MenuItem href="#" maxWidth="100px">
        Item One
      </MenuItem>,
    );

    expect(screen.getByRole("link", { name: "Item One" })).toHaveStyle({
      maxWidth: "inherit",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      verticalAlign: "bottom",
    });
  });

  it("should apply the expected styles when `menuType` is set to 'light'", () => {
    render(
      <MenuContext.Provider value={{ ...menuContextValues, menuType: "light" }}>
        <MenuItem>Item One</MenuItem>
      </MenuContext.Provider>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.light.background,
    });
  });

  it("should apply the expected styles when `menuType` is set to 'white'", () => {
    render(
      <MenuContext.Provider value={{ ...menuContextValues, menuType: "white" }}>
        <MenuItem>Item One</MenuItem>
      </MenuContext.Provider>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.white.background,
    });
  });

  it("should apply the expected styles when `menuType` is set to 'dark'", () => {
    render(
      <MenuContext.Provider value={{ ...menuContextValues, menuType: "dark" }}>
        <MenuItem>Item One</MenuItem>
      </MenuContext.Provider>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.dark.background,
    });
  });

  it("should apply the expected styles when `menuType` is set to 'black'", () => {
    render(
      <MenuContext.Provider value={{ ...menuContextValues, menuType: "black" }}>
        <MenuItem>Item One</MenuItem>
      </MenuContext.Provider>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.black.background,
    });
  });

  it("should set the expected style overrides when an IconButton is rendered as a child", () => {
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem>
          <IconButton>
            <Icon type="home" />
          </IconButton>
        </MenuItem>
      </MenuContext.Provider>,
    );

    expect(screen.getByTestId("icon")).toHaveStyle({
      display: "inline-block",
      marginRight: "0",
    });
  });

  it("should render the expected styles when a menu item is `selected` and `menuType` is 'light'", () => {
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem selected>Item One</MenuItem>
      </MenuContext.Provider>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.light.selected,
    });
  });

  it("should render the expected styles when a menu item is `selected` and `menuType` is 'white'", () => {
    render(
      <MenuContext.Provider value={{ ...menuContextValues, menuType: "white" }}>
        <MenuItem selected>Item One</MenuItem>
      </MenuContext.Provider>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.white.selected,
    });
  });

  it("should render the expected styles when a menu item is `selected` and `menuType` is 'dark'", () => {
    render(
      <MenuContext.Provider value={{ ...menuContextValues, menuType: "dark" }}>
        <MenuItem selected>Item One</MenuItem>
      </MenuContext.Provider>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.dark.selected,
    });
  });

  it("should render the expected styles when a menu item is `selected` and `menuType` is 'black'", () => {
    render(
      <MenuContext.Provider value={{ ...menuContextValues, menuType: "black" }}>
        <MenuItem selected>Item One</MenuItem>
      </MenuContext.Provider>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.black.selected,
    });
  });

  it("should call `onKeyDown` when the user presses a key and prop is set", () => {
    const onKeyDown = jest.fn();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem href="#" onKeyDown={onKeyDown}>
          Item One
        </MenuItem>
      </MenuContext.Provider>,
    );
    const item = screen.getByRole("link", { name: "Item One" });
    fireEvent.keyDown(item, {
      key: "ArrowDown",
      code: "ArrowDown",
    });

    expect(onKeyDown).toHaveBeenCalled();
  });

  it("should add any passed `aria-label` to the underlying link element and remove one from any passed `icon`", () => {
    render(
      <MenuItem icon="settings" href="#" ariaLabel="Item One">
        Item One
      </MenuItem>,
    );

    expect(screen.getByRole("link", { name: "Item One" })).toHaveAttribute(
      "aria-label",
      "Item One",
    );
    expect(screen.getByTestId("icon")).not.toHaveAttribute("aria-label");
  });

  it("should add any passed `aria-label` to the underlying button element and remove one from any passed `icon`", () => {
    render(
      <MenuItem icon="settings" onClick={() => {}} ariaLabel="Item One">
        Item One
      </MenuItem>,
    );

    expect(screen.getByRole("button", { name: "Item One" })).toHaveAttribute(
      "aria-label",
      "Item One",
    );
    expect(screen.getByTestId("icon")).not.toHaveAttribute("aria-label");
  });

  it("should throw an error when `aria-label` is not set and menu item has no child text", () => {
    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(<MenuItem icon="settings" />);
    }).toThrow(
      "If no text is provided an `ariaLabel` should be given to facilitate accessibility.",
    );

    consoleSpy.mockRestore();
  });

  it("should throw an error when when no `children` or `icon` are passed", () => {
    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(<MenuItem ariaLabel="a" />);
    }).toThrow(
      "Either prop `icon` must be defined or this node must have `children`.",
    );

    consoleSpy.mockRestore();
  });

  it("should pass the `href`, `target` and `rel` props as attributes to the underlying HTML anchor element", () => {
    const href = "https://carbon.sage.com";
    const target = "_blank";
    const rel = "noopener";
    render(
      <MenuItem href={href} target={target} rel={rel}>
        Item One
      </MenuItem>,
    );
    const anchor = screen.getByRole("link", { name: "Item One" });

    expect(anchor).toHaveAttribute("href", href);
    expect(anchor).toHaveAttribute("target", target);
    expect(anchor).toHaveAttribute("rel", rel);
  });

  it("should set the correct `data-` tags as attributes on the menu item", () => {
    render(
      <MenuItem data-element="bar" data-role="baz">
        Item One
      </MenuItem>,
    );
    const item = screen.getByRole("listitem");

    expect(item).toHaveAttribute("data-component", "menu-item");
    expect(item).toHaveAttribute("data-element", "bar");
    expect(item).toHaveAttribute("data-role", "baz");
  });

  it("should set the set the expected override color when `overrideColor` is passed and `variant` is 'alternate'", async () => {
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem overrideColor variant="alternate">
          Item One
        </MenuItem>
      </MenuContext.Provider>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.light.alternate,
    });
  });
});

describe("when MenuItem has a submenu", () => {
  /** START OF TESTS ADDED FOR CODE COVERAGE */
  it("should apply the expected spacing on the pseudo element when custom padding is passed value of '5px'", () => {
    render(
      <MenuItem href="#" submenu="submenu" px="5px">
        <MenuItem>foo</MenuItem>
      </MenuItem>,
    );

    expect(screen.getByTestId("submenu-parent-item")).toHaveStyleRule(
      "right",
      "5px",
      { modifier: "a::before" },
    );
  });

  it("should apply the expected spacing on the pseudo element when no custom padding is passed'", () => {
    render(
      <MenuItem href="#" submenu="submenu">
        <MenuItem>foo</MenuItem>
      </MenuItem>,
    );

    expect(screen.getByTestId("submenu-parent-item")).toHaveStyleRule(
      "right",
      "var(--spacing200)",
      { modifier: "a::before" },
    );
  });

  it("should apply the expected spacing on the pseudo element when custom padding is passed value of '0'", () => {
    render(
      <MenuItem href="#" submenu="submenu" px={0}>
        <MenuItem>foo</MenuItem>
      </MenuItem>,
    );

    expect(screen.getByTestId("submenu-parent-item")).toHaveStyleRule(
      "right",
      "2px",
      { modifier: "a::before" },
    );
  });

  it("should apply the expected spacing on the pseudo element when custom padding is passed value of '1'", () => {
    render(
      <MenuItem href="#" submenu="submenu" px={1}>
        <MenuItem>foo</MenuItem>
      </MenuItem>,
    );

    expect(screen.getByTestId("submenu-parent-item")).toHaveStyleRule(
      "right",
      "var(--spacing100)",
      { modifier: "a::before" },
    );
  });

  it.each([2, 3, 4, 5, 6, 7, 8])(
    "should apply the expected spacing on the pseudo element when custom padding is passed value of '%s'",
    (padding) => {
      render(
        <MenuItem href="#" submenu="submenu" px={padding}>
          <MenuItem>foo</MenuItem>
        </MenuItem>,
      );

      expect(screen.getByTestId("submenu-parent-item")).toHaveStyleRule(
        "right",
        `var(--spacing${padding}00)`,
        { modifier: "a::before" },
      );
    },
  );
  /** END OF TESTS ADDED FOR CODE COVERAGE */

  it("should render with it closed when the prop is set", () => {
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem>Submenu Item One</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenu = screen.getByTestId("submenu-wrapper");

    expect(submenu).toBeInTheDocument();
    expect(
      within(submenu).getByRole("button", { name: "Item One" }),
    ).toBeInTheDocument();
    expect(
      within(submenu).queryByRole("link", { name: "Submenu Item One" }),
    ).not.toBeInTheDocument();
  });

  it("should focus the last item when the user presses the 'End' key and first when they press the 'Home' key", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    act(() => {
      submenuParentItem.focus();
    });
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("link");

    expect(submenuItems[0]).toHaveFocus();
    await user.keyboard("{End}");
    expect(submenuItems[2]).toHaveFocus();
    await user.keyboard("{arrowup}");
    expect(submenuItems[1]).toHaveFocus();
    await user.keyboard("{arrowup}");
    expect(submenuItems[0]).toHaveFocus();
    await user.keyboard("{arrowup}");
    expect(submenuItems[0]).toHaveFocus();
  });

  it("should focus the expected item when the user presses 'arrowdown' key", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    act(() => {
      submenuParentItem.focus();
    });
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("link");

    expect(submenuItems[0]).toHaveFocus();
    await user.keyboard("{arrowdown}");
    expect(submenuItems[1]).toHaveFocus();
    await user.keyboard("{arrowdown}");
    expect(submenuItems[2]).toHaveFocus();
    await user.keyboard("{arrowdown}");
    expect(submenuItems[2]).toHaveFocus();
  });

  it("should focus the expected item when the user presses 'arrowup' key", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    act(() => {
      submenuParentItem.focus();
    });
    await user.keyboard("{arrowup}");
    const submenuItems = screen.getAllByRole("link");

    expect(submenuItems[0]).toHaveFocus();
    await user.keyboard("{End}");
    expect(submenuItems[2]).toHaveFocus();
    await user.keyboard("{arrowup}");
    expect(submenuItems[1]).toHaveFocus();
    await user.keyboard("{arrowup}");
    expect(submenuItems[0]).toHaveFocus();
    await user.keyboard("{arrowup}");
    expect(submenuItems[0]).toHaveFocus();
  });

  it("should focus the expected item when the user presses 'home' and 'end' keys", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    act(() => {
      submenuParentItem.focus();
    });
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("link");

    expect(submenuItems[0]).toHaveFocus();
    await user.keyboard("{End}");
    expect(submenuItems[2]).toHaveFocus();
    await user.keyboard("{Home}");
    expect(submenuItems[0]).toHaveFocus();
  });

  it("should focus the expected item when the user presses 'tab' key and moves focus out of submenu when pressed on last submenu item", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    act(() => {
      submenuParentItem.focus();
    });
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("link");

    expect(submenuItems[0]).toHaveFocus();
    await user.tab();
    expect(submenuItems[1]).toHaveFocus();
    await user.tab();
    expect(submenuItems[2]).toHaveFocus();
    await user.tab();
    expect(submenuItems[2]).not.toHaveFocus();
  });

  it("should focus the expected item when the user presses 'shift+tab' keys and moves focus to parent item when pressed on first submenu item", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    act(() => {
      submenuParentItem.focus();
    });
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("link");
    await user.keyboard("{End}");

    expect(submenuItems[2]).toHaveFocus();
    await user.tab({ shift: true });
    expect(submenuItems[1]).toHaveFocus();
    await user.tab({ shift: true });
    expect(submenuItems[0]).toHaveFocus();
    await user.tab({ shift: true });
    expect(submenuItems[0]).not.toHaveFocus();
  });

  it("should focus the expected items when the user presses 'arrowdown' key and one item has an input child", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem>
            <Search value="foo" onChange={() => {}} />
          </MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    act(() => {
      submenuParentItem.focus();
    });
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("link");

    expect(submenuItems[0]).toHaveFocus();
    await user.keyboard("{arrowdown}");
    expect(screen.getByDisplayValue("foo")).toHaveFocus();
    await user.keyboard("{arrowdown}");
    expect(submenuItems[1]).toHaveFocus();
  });

  it("should focus the expected items when the user presses 'arrowup' key and one item has an input child", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem>
            <Search value="foo" onChange={() => {}} />
          </MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    act(() => {
      submenuParentItem.focus();
    });
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("link");
    await user.keyboard("{End}");

    expect(submenuItems[1]).toHaveFocus();
    await user.keyboard("{arrowup}");
    expect(screen.getByDisplayValue("foo")).toHaveFocus();
    await user.keyboard("{arrowup}");
    expect(submenuItems[0]).toHaveFocus();
  });

  it("should focus the expected items when the user presses 'tab' key and one item has an input child", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem>
            <Search value="foo" onChange={() => {}} />
          </MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    act(() => {
      submenuParentItem.focus();
    });
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("link");

    expect(submenuItems[0]).toHaveFocus();
    await user.tab();
    expect(screen.getByDisplayValue("foo")).toHaveFocus();
    await user.tab();
    expect(screen.getByTestId("input-icon-toggle")).not.toHaveFocus();
    expect(submenuItems[1]).toHaveFocus();
  });

  it("should focus the expected item when the parent item is a link and the user opens the submenu and presses 'tab' key", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem href="#" submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("link", { name: "Item One" });
    act(() => {
      submenuParentItem.focus();
    });
    await user.keyboard("{arrowdown}");
    await user.tab();

    expect(
      screen.getByRole("link", { name: "Submenu Item One" }),
    ).toHaveFocus();
  });

  it("should focus the expected item when the parent item is a link and the user opens the submenu and presses 'a' character key", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem href="#" submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("link", { name: "Item One" });
    act(() => {
      submenuParentItem.focus();
    });
    await user.keyboard("{arrowdown}");
    await user.keyboard("{a}");

    expect(screen.getByRole("link", { name: "Item One" })).toHaveFocus();
  });

  it("should call the `onClick` callback if one is passed and the user clicks the parent item", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem onClick={onClick} submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    await user.click(submenuParentItem);

    expect(onClick).toHaveBeenCalled();
  });

  it("should focus the first item when parent has `href` user presses 'arrowdown' key twice", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem href="#" submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("link", { name: "Item One" });
    await user.click(submenuParentItem);
    await user.unhover(submenuParentItem);
    await user.keyboard("{arrowdown}");
    await user.keyboard("{arrowdown}");
    const submenuItem = screen.getByRole("link", { name: "Submenu Item One" });

    expect(submenuItem).toHaveFocus();
  });

  it("should focus the first item when parent has `href` user presses 'arrowup' key twice", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem href="#" submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("link", { name: "Item One" });
    await user.click(submenuParentItem);
    await user.unhover(submenuParentItem);
    await user.keyboard("{arrowup}");
    await user.keyboard("{arrowup}");
    const submenuItem = screen.getByRole("link", { name: "Submenu Item One" });

    expect(submenuItem).toHaveFocus();
  });

  it("should focus the first item when `submenu` is initially opened via click, closed via mouseout and then 'arrowdown' key pressed", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    await user.click(submenuParentItem);
    await user.unhover(submenuParentItem);
    await user.keyboard("{arrowdown}");
    const submenuItem = screen.getByRole("link", { name: "Submenu Item One" });

    expect(submenuItem).toHaveFocus();
  });

  it("should focus the first item when `submenu` is initially initially opened via click, closed via mouseout and then 'arrowup' key pressed", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    await user.click(submenuParentItem);
    await user.unhover(submenuParentItem);
    await user.keyboard("{arrowup}");
    const submenuItem = screen.getByRole("link", { name: "Submenu Item One" });

    expect(submenuItem).toHaveFocus();
  });

  it("should focus the first item when initially opened via click, closed via mouseout and then 'tab' key pressed", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    await user.click(submenuParentItem);
    await user.unhover(submenuParentItem);
    await user.keyboard("{arrowdown}");
    const submenuItem = screen.getByRole("link", { name: "Submenu Item One" });

    expect(submenuItem).toHaveFocus();
  });

  it("should not open the `submenu` when initially opened via click, closed via mouseout and then non-related key pressed", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    await user.click(submenuParentItem);
    await user.unhover(submenuParentItem);
    await user.keyboard("{arrowleft}");
    const submenuItem = screen.queryByRole("link", {
      name: "Submenu Item One",
    });

    expect(submenuItem).not.toBeInTheDocument();
  });

  it("should not open if an unrelated key is pressed", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    act(() => {
      submenuParentItem.focus();
    });
    await user.keyboard("{arrowleft}");

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("should close when the user presses 'Escape'", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem>
            <Search value="foo" onChange={() => {}} />
          </MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    act(() => {
      submenuParentItem.focus();
    });
    await user.keyboard("{arrowdown}");
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(submenuParentItem).toHaveFocus();
  });

  it("should not close when the user presses 'Enter' and focus is on input", async () => {
    jest.useFakeTimers();

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem>
            <Search value="foo" onChange={() => {}} />
          </MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    act(() => {
      submenuParentItem.focus();
    });
    await user.keyboard("{arrowdown}");
    await user.keyboard("{arrowdown}");
    await user.keyboard("{Enter}");

    expect(screen.getByRole("list")).toBeVisible();

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should close when the user presses 'Enter' and focus is not on input", async () => {
    jest.useFakeTimers();

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem>
            <Search value="foo" onChange={() => {}} />
          </MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    act(() => {
      submenuParentItem.focus();
    });

    await user.keyboard("{arrowdown}");
    await user.keyboard("{Enter}");

    act(() => {
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
    jest.useRealTimers();
  });

  it("should not throw an error when a passed null `children`", () => {
    expect(() => {
      render(
        <MenuContext.Provider value={{ ...menuContextValues }}>
          <MenuItem submenu="test">
            {true && <MenuItem>One</MenuItem>}
            {false && <MenuItem>Two</MenuItem>}
          </MenuItem>
        </MenuContext.Provider>,
      );
    }).not.toThrow();
  });

  it("should update the focused element when a user clicks a child item", async () => {
    const user = userEvent.setup();
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem href="#" submenu="Item One">
          <MenuItem onClick={() => {}}>Submenu Item One</MenuItem>
          <MenuItem onClick={() => {}}>Submenu Item Two</MenuItem>
          <MenuItem onClick={() => {}}>Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );
    const submenuParentItem = screen.getByRole("link", { name: "Item One" });
    act(() => {
      submenuParentItem.focus();
    });
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("button");
    await user.click(submenuItems[2]);

    expect(submenuItems[2]).toHaveFocus();
  });

  it("should call the `handleKeyDown` function when one is passed via `submenuContext`", () => {
    const handleKeyDown = jest.fn();
    render(
      <MenuContext.Provider value={menuContextValues}>
        <SubmenuContext.Provider value={{ handleKeyDown }}>
          <MenuItem href="#">Item One</MenuItem>
        </SubmenuContext.Provider>
      </MenuContext.Provider>,
    );
    const item = screen.getByRole("link", { name: "Item One" });
    fireEvent.keyDown(item, { key: "ArrowDown", code: "ArrowDown" });

    expect(handleKeyDown).toHaveBeenCalled();
  });

  it("should have the expected styling when a child item is `selected`", () => {
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem selected submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem>Submenu Item Two</MenuItem>
          <MenuItem>Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );

    expect(screen.getByRole("button", { name: "Item One" })).toHaveStyle({
      backgroundColor: menuConfigVariants.light.selected,
    });
  });

  it("should apply the expected padding when the item also has `maxWidth` set", () => {
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="Item One" maxWidth="100px">
          <MenuItem>Submenu Item One</MenuItem>
          <MenuItem>Submenu Item Two</MenuItem>
          <MenuItem>Submenu Item Three</MenuItem>
        </MenuItem>
      </MenuContext.Provider>,
    );

    expect(screen.getByRole("button", { name: "Item One" })).toHaveStyle({
      padding: "11px 16px 12px",
    });
  });
});

test("should throw when `children` passed and `submenu` is an empty string", () => {
  const consoleSpy = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => {});

  expect(() => {
    render(
      <MenuContext.Provider value={{ ...menuContextValues }}>
        <MenuItem submenu="">Item One</MenuItem>
      </MenuContext.Provider>,
    );
  }).toThrow(
    "You should not pass `children` when `submenu` is an empty string",
  );

  consoleSpy.mockRestore();
});

// coverage
test("should set the correct colour when a child of `MenuSegmentTitle` and `variant` is 'alternate'", async () => {
  render(
    <MenuContext.Provider value={{ ...menuContextValues, menuType: "black" }}>
      <MenuSegmentTitle text="Test">
        <MenuItem variant="alternate">Item One</MenuItem>
      </MenuSegmentTitle>
    </MenuContext.Provider>,
  );

  expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
    backgroundColor: menuConfigVariants.black.alternate,
  });
});
