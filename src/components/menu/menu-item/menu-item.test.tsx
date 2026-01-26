import React, { createRef } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Menu, MenuItem, MenuItemHandle, MenuSegmentTitle } from "..";
import {
  StrictMenuContextType,
  StrictMenuProvider,
} from "../__internal__/strict-menu.context";
import SubmenuContext from "../__internal__/submenu/submenu.context";
import menuConfigVariants from "../menu.config";

import {
  testStyledSystemFlexBox,
  testStyledSystemPadding,
} from "../../../__spec_helper__/__internal__/test-utils";
import Logger from "../../../__internal__/utils/logger";

import Icon from "../../icon/icon.component";
import IconButton from "../../icon-button";
import Search from "../../search";

test("logs error if not used within Menu", () => {
  const loggerErrorSpy = jest
    .spyOn(Logger, "error")
    .mockImplementation(() => {});

  render(<MenuItem>content</MenuItem>);

  expect(loggerErrorSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon Menu: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );

  loggerErrorSpy.mockRestore();
});

describe("When MenuItem has no submenu", () => {
  testStyledSystemPadding(
    (props) => (
      <Menu>
        <MenuItem href="#" {...props}>
          Foo
        </MenuItem>
      </Menu>
    ),
    () => screen.getByTestId("menu-item-wrapper"),
    { modifier: "&&& > a" },
  );

  testStyledSystemFlexBox(
    (props) => (
      <Menu>
        <MenuItem href="#" {...props}>
          Foo
        </MenuItem>
      </Menu>
    ),
    () => screen.getByRole("listitem"),
  );

  it("should apply the expected styling when `width` prop passed", () => {
    render(
      <Menu>
        <MenuItem width="50%" href="#">
          Item One
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByRole("listitem")).toHaveStyle({
      width: "50%",
    });
  });

  it("should apply the expected styling when `maxWidth` prop passed", () => {
    render(
      <Menu>
        <MenuItem maxWidth="50%" href="#">
          Item One
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByRole("listitem")).toHaveStyle({
      maxWidth: "50%",
    });
  });

  it("should apply the expected styling when `minWidth` prop passed", () => {
    render(
      <Menu>
        <MenuItem minWidth="50%" href="#">
          Item One
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByRole("listitem")).toHaveStyle({
      minWidth: "50%",
    });
  });

  it("should render children correctly", () => {
    render(
      <Menu>
        <MenuItem href="#">Item One</MenuItem>
      </Menu>,
    );

    expect(screen.getByRole("listitem")).toHaveTextContent("Item One");
  });

  it("should render an anchor element if `href` prop is set", () => {
    render(
      <Menu>
        <MenuItem href="#">Item One</MenuItem>
      </Menu>,
    );

    expect(screen.getByRole("link", { name: "Item One" })).toBeVisible();
  });

  it("should render a button element if `onClick` prop is set", () => {
    render(
      <Menu>
        <MenuItem onClick={() => {}}>Item One</MenuItem>
      </Menu>,
    );

    expect(
      screen.getByRole("button", { name: "Item One" }),
    ).toBeInTheDocument();
  });

  it("should render an anchor element if both `href` and `onClick` props are set", () => {
    render(
      <Menu>
        <MenuItem onClick={() => {}} href="#">
          Item One
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByRole("link", { name: "Item One" })).toBeInTheDocument();
  });

  it("should render additional `carbon-menu-item--has-link` class if specified `href` prop is set", () => {
    render(
      <Menu>
        <MenuItem href="#">Item One</MenuItem>
      </Menu>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveClass(
      "carbon-menu-item--has-link",
    );
  });

  it("should render additional `carbon-menu-item--has-link` class if specified `onClick` prop is set", () => {
    render(
      <Menu>
        <MenuItem onClick={() => {}}>Item One</MenuItem>
      </Menu>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveClass(
      "carbon-menu-item--has-link",
    );
  });

  it("should add a `title` attribute with the full text when `maxWidth` prop is set", () => {
    render(
      <Menu>
        <MenuItem maxWidth="100px" href="#">
          Item One
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByRole("listitem", { name: "Item One" })).toHaveAttribute(
      "title",
      "Item One",
    );
  });

  it("should add the correct styles when `maxWidth` prop is set", () => {
    render(
      <Menu>
        <MenuItem href="#" maxWidth="100px">
          Item One
        </MenuItem>
      </Menu>,
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
      <Menu menuType="light">
        <MenuItem href="#">Item One</MenuItem>
      </Menu>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.light.background,
    });
  });

  it("should apply the expected styles when `menuType` is set to 'white'", () => {
    render(
      <Menu menuType="white">
        <MenuItem href="#">Item One</MenuItem>
      </Menu>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.white.background,
    });
  });

  it("should apply the expected styles when `menuType` is set to 'dark'", () => {
    render(
      <Menu menuType="dark">
        <MenuItem href="#">Item One</MenuItem>
      </Menu>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.dark.background,
    });
  });

  it("should apply the expected styles when `menuType` is set to 'black'", () => {
    render(
      <Menu menuType="black">
        <MenuItem href="#">Item One</MenuItem>
      </Menu>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.black.background,
    });
  });

  it("should set the expected style overrides when an IconButton is rendered as a child", () => {
    render(
      <Menu>
        <MenuItem>
          <IconButton>
            <Icon type="home" />
          </IconButton>
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByTestId("icon")).toHaveStyle({
      display: "inline-block",
      marginRight: "0",
    });
  });

  it("should render the expected styles when a menu item is `selected` and `menuType` is 'light'", () => {
    render(
      <Menu menuType="light">
        <MenuItem selected href="#">
          Item One
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.light.selected,
    });
  });

  it("should render the expected styles when a menu item is `selected` and `menuType` is 'white'", () => {
    render(
      <Menu menuType="white">
        <MenuItem selected href="#">
          Item One
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.white.selected,
    });
  });

  it("should render the expected styles when a menu item is `selected` and `menuType` is 'dark'", () => {
    render(
      <Menu menuType="dark">
        <MenuItem selected href="#">
          Item One
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.dark.selected,
    });
  });

  it("should render the expected styles when a menu item is `selected` and `menuType` is 'black'", () => {
    render(
      <Menu menuType="black">
        <MenuItem selected href="#">
          Item One
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.black.selected,
    });
  });

  it("should call `onKeyDown` when the user presses a key and prop is set", () => {
    const onKeyDown = jest.fn();
    render(
      <Menu>
        <MenuItem href="#" onKeyDown={onKeyDown}>
          Item One
        </MenuItem>
      </Menu>,
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
      <Menu>
        <MenuItem icon="settings" href="#" ariaLabel="Item One">
          Item One
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByRole("link", { name: "Item One" })).toHaveAttribute(
      "aria-label",
      "Item One",
    );
    expect(screen.getByTestId("icon")).not.toHaveAttribute("aria-label");
  });

  it("should add any passed `aria-label` to the underlying button element and remove one from any passed `icon`", () => {
    render(
      <Menu>
        <MenuItem icon="settings" onClick={() => {}} ariaLabel="Item One">
          Item One
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByRole("button", { name: "Item One" })).toHaveAttribute(
      "aria-label",
      "Item One",
    );
    expect(screen.getByTestId("icon")).not.toHaveAttribute("aria-label");
  });

  it("should add any passed `aria-current` to the underlying link element", () => {
    render(
      <Menu>
        <MenuItem icon="settings" href="#" ariaCurrent="page">
          Item One
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByRole("link", { name: "Item One" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("should add any passed `aria-current` to the underlying button element`", () => {
    render(
      <Menu>
        <MenuItem icon="settings" onClick={() => {}} ariaCurrent="page">
          Item One
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByRole("button", { name: "Item One" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("should throw an error when `aria-label` is not set and menu item has no child text", () => {
    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(
        <Menu>
          <MenuItem icon="settings" href="#" />
        </Menu>,
      );
    }).toThrow(
      "If no text or node is provided via the `submenu` prop, an `ariaLabel` should be given to facilitate accessibility",
    );

    consoleSpy.mockRestore();
  });

  it("should throw an error when menu item has empty children", () => {
    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(
        <Menu>
          <MenuItem icon="settings" href="#" />
        </Menu>,
      );
    }).toThrow(
      "If no text or node is provided via the `submenu` prop, an `ariaLabel` should be given to facilitate accessibility",
    );

    consoleSpy.mockRestore();
  });

  it("should throw an error when menu item has null children", () => {
    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(
        <Menu>
          <MenuItem icon="settings" href="#">
            {null}
          </MenuItem>
        </Menu>,
      );
    }).toThrow(
      "If no text or node is provided via the `submenu` prop, an `ariaLabel` should be given to facilitate accessibility",
    );

    consoleSpy.mockRestore();
  });

  it("should throw an error when menu item has undefined children", () => {
    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(
        <Menu>
          <MenuItem icon="settings" href="#">
            {undefined}
          </MenuItem>
        </Menu>,
      );
    }).toThrow(
      "If no text or node is provided via the `submenu` prop, an `ariaLabel` should be given to facilitate accessibility",
    );

    consoleSpy.mockRestore();
  });

  it("should throw an error when ariaLabel is empty string", () => {
    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(
        <Menu>
          <MenuItem icon="settings" href="#" ariaLabel="" />
        </Menu>,
      );
    }).toThrow(
      "If no text or node is provided via the `submenu` prop, an `ariaLabel` should be given to facilitate accessibility",
    );

    consoleSpy.mockRestore();
  });

  it("should throw an error when submenu is null", () => {
    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(
        <Menu>
          <MenuItem icon="settings" href="#" submenu={null} />
        </Menu>,
      );
    }).toThrow(
      "If no text or node is provided via the `submenu` prop, an `ariaLabel` should be given to facilitate accessibility",
    );

    consoleSpy.mockRestore();
  });

  it("should throw an error when submenu is empty string", () => {
    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(
        <Menu>
          <MenuItem icon="settings" href="#" submenu="" />
        </Menu>,
      );
    }).toThrow(
      "If no text or node is provided via the `submenu` prop, an `ariaLabel` should be given to facilitate accessibility",
    );

    consoleSpy.mockRestore();
  });

  it("should throw an error when when no `children` or `icon` are passed", () => {
    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(
        <Menu>
          <MenuItem ariaLabel="a" href="#" />
        </Menu>,
      );
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
      <Menu>
        <MenuItem href={href} target={target} rel={rel}>
          Item One
        </MenuItem>
      </Menu>,
    );
    const anchor = screen.getByRole("link", { name: "Item One" });

    expect(anchor).toHaveAttribute("href", href);
    expect(anchor).toHaveAttribute("target", target);
    expect(anchor).toHaveAttribute("rel", rel);
  });

  it("should set the correct `data-` tags as attributes on the menu item", () => {
    render(
      <Menu>
        <MenuItem data-element="bar" data-role="baz" href="#">
          Item One
        </MenuItem>
      </Menu>,
    );
    const item = screen.getByRole("listitem");

    expect(item).toHaveAttribute("data-component", "menu-item");
    expect(item).toHaveAttribute("data-element", "bar");
    expect(item).toHaveAttribute("data-role", "baz");
  });

  it("should set the set the expected override color when `overrideColor` is passed and `variant` is 'alternate'", async () => {
    render(
      <Menu menuType="light">
        <MenuItem overrideColor variant="alternate" href="#">
          Item One
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
      backgroundColor: menuConfigVariants.light.alternate,
    });
  });
});

describe("when MenuItem has a submenu", () => {
  it("should render correctly when `submenu` is passed as a React node", () => {
    const submenuNode = <span>Custom Submenu Title</span>;
    render(
      <Menu>
        <MenuItem submenu={submenuNode}>
          <MenuItem href="#">Submenu Item One</MenuItem>
        </MenuItem>
      </Menu>,
    );

    expect(
      screen.getByRole("button", { name: "Custom Submenu Title" }),
    ).toBeVisible();
  });

  it("should render correctly when `submenu` is passed as a complex composition", () => {
    const submenuNode = (
      <div>
        <>
          <div>
            <span>Custom Submenu Title</span>
          </div>
        </>
      </div>
    );
    render(
      <Menu>
        <MenuItem submenu={submenuNode}>
          <MenuItem href="#">Submenu Item One</MenuItem>
        </MenuItem>
      </Menu>,
    );

    expect(
      screen.getByRole("button", { name: "Custom Submenu Title" }),
    ).toBeVisible();
  });

  /** START OF TESTS ADDED FOR CODE COVERAGE */
  it("should apply the expected spacing on the pseudo element when custom padding is passed value of '5px'", () => {
    render(
      <Menu>
        <MenuItem submenu="submenu" px="5px">
          <MenuItem href="#">foo</MenuItem>
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByTestId("submenu-parent-item")).toHaveStyleRule(
      "right",
      "5px",
      { modifier: "a::before" },
    );
  });

  it("should apply the expected spacing on the pseudo element when no custom padding is passed'", () => {
    render(
      <Menu>
        <MenuItem submenu="submenu">
          <MenuItem href="#">foo</MenuItem>
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByTestId("submenu-parent-item")).toHaveStyleRule(
      "right",
      "var(--spacing200)",
      { modifier: "a::before" },
    );
  });

  it("should apply the expected spacing on the pseudo element when custom padding is passed value of '0'", () => {
    render(
      <Menu>
        <MenuItem submenu="submenu" px={0}>
          <MenuItem href="#">foo</MenuItem>
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByTestId("submenu-parent-item")).toHaveStyleRule(
      "right",
      "2px",
      { modifier: "a::before" },
    );
  });

  it("should apply the expected spacing on the pseudo element when custom padding is passed value of '1'", () => {
    render(
      <Menu>
        <MenuItem submenu="submenu" px={1}>
          <MenuItem href="#">foo</MenuItem>
        </MenuItem>
      </Menu>,
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
        <Menu>
          <MenuItem submenu="submenu" px={padding}>
            <MenuItem href="#">foo</MenuItem>
          </MenuItem>
        </Menu>,
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
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
        </MenuItem>
      </Menu>,
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

  it("opens the submenu when the 'ArrowDown' key is pressed, then moves focus to the next submenu items on subsequent presses", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    await user.tab();
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("link");

    expect(submenuParentItem).toHaveFocus();
    expect(submenuItems[0]).toBeVisible();

    await user.keyboard("{arrowdown}");
    expect(submenuItems[0]).toHaveFocus();
    await user.keyboard("{arrowdown}");
    expect(submenuItems[1]).toHaveFocus();
    await user.keyboard("{arrowdown}");
    expect(submenuItems[2]).toHaveFocus();
    await user.keyboard("{arrowdown}");
    expect(submenuItems[2]).toHaveFocus();
  });

  it("moves focus to the previous submenu item when 'ArrowUp' key is pressed", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    await user.tab();
    await user.keyboard("{Enter}");
    const submenuItems = screen.getAllByRole("link");

    expect(submenuParentItem).toHaveFocus();
    expect(submenuItems[0]).toBeVisible();

    await user.keyboard("{End}");
    expect(submenuItems[2]).toHaveFocus();
    await user.keyboard("{arrowup}");
    expect(submenuItems[1]).toHaveFocus();
    await user.keyboard("{arrowup}");
    expect(submenuItems[0]).toHaveFocus();
    await user.keyboard("{arrowup}");
    expect(submenuItems[0]).toHaveFocus();
  });

  it("focuses last submenu item when 'End' key is pressed", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );

    await user.tab();
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("link");

    await user.keyboard("{End}");

    expect(submenuItems[2]).toHaveFocus();
  });

  it("focuses first submenu item when 'Home' key is pressed", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );

    await user.tab();
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("link");

    await user.keyboard("{End}");
    await user.keyboard("{Home}");

    expect(submenuItems[0]).toHaveFocus();
  });

  it("focuses succeeding submenu item when tabbing", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    await user.tab();
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("link");

    expect(submenuParentItem).toHaveFocus();
    await user.tab();
    expect(submenuItems[0]).toHaveFocus();
    await user.tab();
    expect(submenuItems[1]).toHaveFocus();
    await user.tab();
    expect(submenuItems[2]).toHaveFocus();
    await user.tab();
    expect(submenuItems[2]).not.toHaveFocus();
  });

  it("focuses preceding submenu item when shift tabbing, then focuses on the parent menu item", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    await user.tab();
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("link");
    await user.keyboard("{End}");

    expect(submenuItems[2]).toHaveFocus();
    await user.tab({ shift: true });
    expect(submenuItems[1]).toHaveFocus();
    await user.tab({ shift: true });
    expect(submenuItems[0]).toHaveFocus();
    await user.tab({ shift: true });
    expect(submenuParentItem).toHaveFocus();
  });

  it("closes submenu when shift tabbing from the parent menu item and focuses on the previous menu item", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem href="#">Item One</MenuItem>
        <MenuItem submenu="Item Two">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item Two" });
    await user.tab();
    await user.tab(); // focus item two
    await user.keyboard("{Enter}"); // open submenu
    const submenuItem = screen.getByRole("link", { name: /Submenu Item One/ });

    expect(submenuParentItem).toHaveFocus();
    expect(submenuItem).toBeVisible();

    await user.tab({ shift: true });
    expect(submenuItem).not.toBeVisible();
    expect(screen.getByRole("link", { name: "Item One" })).toHaveFocus();
  });

  it("allows focus on the last submenu item to be lost, when tabbing on it", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );
    await user.tab();
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("link");
    await user.keyboard("{End}");

    expect(submenuItems[2]).toHaveFocus();
    await user.tab();
    expect(submenuItems[2]).not.toHaveFocus();
  });

  it("skips any non-focusable submenu items when moving focus cursor with down arrow key", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Fruit">
          <MenuItem href="#">Apple</MenuItem>
          <MenuItem>Banana</MenuItem>
          <MenuItem>Cherry</MenuItem>
          <MenuItem href="#">Dates</MenuItem>
        </MenuItem>
      </Menu>,
    );

    await user.tab();
    await user.keyboard("{ArrowDown}");
    await user.tab();

    const appleItem = await screen.findByRole("link", { name: "Apple" });
    expect(appleItem).toHaveFocus();

    await user.keyboard("{ArrowDown}");

    const datesItem = screen.getByRole("link", { name: "Dates" });
    expect(datesItem).toHaveFocus();
  });

  it("skips any non-focusable submenu items when moving focus cursor with up arrow key", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Fruit">
          <MenuItem href="#">Apple</MenuItem>
          <MenuItem>Banana</MenuItem>
          <MenuItem>Cherry</MenuItem>
          <MenuItem href="#">Dates</MenuItem>
        </MenuItem>
      </Menu>,
    );

    await user.tab();
    await user.keyboard("{ArrowDown}");

    const datesItem = await screen.findByRole("link", { name: "Dates" });
    await user.keyboard("{End}");

    expect(datesItem).toHaveFocus();

    await user.keyboard("{ArrowUp}");

    const appleItem = screen.getByRole("link", { name: "Apple" });
    expect(appleItem).toHaveFocus();
  });

  it("focus moves to the last available focusable item, when End key is pressed and the last submenu item isn't focusable", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Fruit">
          <MenuItem href="#">Apple</MenuItem>
          <MenuItem href="#">Banana</MenuItem>
          <MenuItem href="#">Cherry</MenuItem>
          <MenuItem>Dates</MenuItem>
        </MenuItem>
      </Menu>,
    );

    await user.tab();
    await user.keyboard("{ArrowDown}");
    await user.tab();

    const appleItem = await screen.findByRole("link", { name: "Apple" });
    expect(appleItem).toHaveFocus();

    await user.keyboard("{End}");

    const cherryItem = screen.getByRole("link", { name: "Cherry" });
    expect(cherryItem).toHaveFocus();
  });

  it("focus moves to the first focusable item, when 'Home' key is pressed and the first submenu item isn't focusable", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Fruit">
          <MenuItem>Apple</MenuItem>
          <MenuItem href="#">Banana</MenuItem>
          <MenuItem href="#">Cherry</MenuItem>
          <MenuItem href="#">Dates</MenuItem>
        </MenuItem>
      </Menu>,
    );

    await user.tab();
    await user.keyboard("{ArrowDown}");
    await user.tab();

    const bananaItem = await screen.findByRole("link", { name: "Banana" });
    expect(bananaItem).toHaveFocus();

    await user.tab();
    await user.keyboard("{Home}");

    expect(bananaItem).toHaveFocus();
  });

  it("should focus the expected items when the user presses 'arrowdown' key and one item has an input child", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem>
            <Search value="foo" onChange={() => {}} />
          </MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );

    await user.tab();
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("link");

    await user.keyboard("{arrowdown}");
    expect(submenuItems[0]).toHaveFocus();
    await user.keyboard("{arrowdown}");
    expect(screen.getByDisplayValue("foo")).toHaveFocus();
    await user.keyboard("{arrowdown}");
    expect(submenuItems[1]).toHaveFocus();
  });

  it("should focus the expected items when the user presses 'arrowup' key and one item has an input child", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem>
            <Search value="foo" onChange={() => {}} />
          </MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );

    await user.tab();
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
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem>
            <Search value="foo" onChange={() => {}} />
          </MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );

    await user.tab();
    await user.keyboard("{arrowdown}");
    const submenuItems = screen.getAllByRole("link");

    await user.tab();
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
      <Menu>
        <MenuItem href="#" submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );

    await user.tab();
    await user.keyboard("{arrowdown}");
    await user.tab();

    expect(
      screen.getByRole("link", { name: "Submenu Item One" }),
    ).toHaveFocus();
  });

  it("should focus the expected item when the parent item is a link and the user opens the submenu and presses 'a' character key", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem href="#" submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );

    await user.tab();
    await user.keyboard("{arrowdown}");
    await user.keyboard("{a}");

    expect(screen.getByRole("link", { name: "Item One" })).toHaveFocus();
  });

  it("should call the `onClick` callback if one is passed and the user clicks the parent item", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Menu>
        <MenuItem onClick={onClick} submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );
    const submenuParentItem = screen.getByRole("button", { name: "Item One" });
    await user.click(submenuParentItem);

    expect(onClick).toHaveBeenCalled();
  });

  it("should focus the first item when parent has `href` user presses 'arrowdown' key twice", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem href="#" submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );
    const submenuParentItem = screen.getByRole("link", { name: "Item One" });
    await user.click(submenuParentItem);
    await user.unhover(submenuParentItem);
    await user.keyboard("{arrowdown}");
    await user.keyboard("{arrowdown}");
    const submenuItem = screen.getByRole("link", { name: "Submenu Item One" });

    expect(submenuItem).toHaveFocus();
  });

  it("maintains focus on the menu item when `submenu` is initially opened via click, closed via mouseout and then 'arrowdown' key pressed", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );

    const submenuParentItem = screen.getByRole("listitem");
    const submenuParentButton = screen.getByRole("button", {
      name: "Item One",
    });

    await user.click(submenuParentButton);
    await user.unhover(submenuParentButton);
    await user.keyboard("{arrowdown}");

    const submenu = await within(submenuParentItem).findByRole("list");
    const menuItem = screen.getByRole("button", { name: "Item One" });

    expect(submenu).toBeVisible();
    expect(menuItem).toHaveFocus();
  });

  it("focus moves to the first available focusable item, when a submenu opens and the first item isn't focusable", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Fruit">
          <MenuItem>Apple</MenuItem>
          <MenuItem href="#">Banana</MenuItem>
          <MenuItem href="#">Cherry</MenuItem>
          <MenuItem href="#">Dates</MenuItem>
        </MenuItem>
      </Menu>,
    );

    await user.tab();
    await user.keyboard("{Enter}");
    await user.keyboard("{ArrowDown}");

    const bananaItem = await screen.findByRole("link", { name: "Banana" });
    expect(bananaItem).toHaveFocus();
  });

  it("should focus an interactive MenuItem when the focus method on the ref handle is invoked", async () => {
    const menuItemHandle = createRef<MenuItemHandle>();
    render(
      <Menu>
        <MenuItem href="#" ref={menuItemHandle}>
          Apple
        </MenuItem>
        <MenuItem href="#">Banana</MenuItem>
        <MenuItem href="#">Cherry</MenuItem>
        <MenuItem href="#">Dates</MenuItem>
      </Menu>,
    );

    act(() => {
      menuItemHandle.current?.focus();
    });

    const appleItem = await screen.findByRole("link", { name: "Apple" });
    expect(appleItem).toHaveFocus();
  });

  it("does not focus an non-interactive MenuItem when the focus method on the ref handle is invoked", () => {
    const menuItemHandle = createRef<MenuItemHandle>();
    render(
      <Menu>
        <MenuItem ref={menuItemHandle}>Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
        <MenuItem href="#">Cherry</MenuItem>
        <MenuItem href="#">Dates</MenuItem>
      </Menu>,
    );

    act(() => {
      menuItemHandle.current?.focus();
    });

    const appleItem = screen.getByText("Apple");
    expect(appleItem).not.toHaveFocus();
  });

  it("should focus an interactive Submenu when the focus method on the ref handle is invoked", async () => {
    const user = userEvent.setup();
    const menuItemHandle = createRef<MenuItemHandle>();
    render(
      <Menu>
        <MenuItem submenu="Fruit">
          <MenuItem ref={menuItemHandle} href="#">
            Apple
          </MenuItem>
          <MenuItem href="#">Banana</MenuItem>
          <MenuItem href="#">Cherry</MenuItem>
          <MenuItem href="#">Dates</MenuItem>
        </MenuItem>
      </Menu>,
    );
    await user.tab();
    await user.keyboard("{Enter}");

    act(() => {
      menuItemHandle.current?.focus();
    });

    const appleItem = await screen.findByRole("link", { name: "Apple" });
    expect(appleItem).toHaveFocus();
  });

  it("should not open the `submenu` when initially opened via click, closed via mouseout and then non-related key pressed", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
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
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );
    const parentItem = screen.getByRole("listitem");
    const parentItemButton = within(parentItem).getByRole("button");
    act(() => {
      parentItemButton.focus();
    });
    await user.keyboard("{ArrowLeft}");

    const submenu = within(parentItem).queryByRole("list");
    expect(submenu).not.toBeInTheDocument();
  });

  it("should close when the user presses 'Escape'", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem>
            <Search value="foo" onChange={() => {}} />
          </MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );
    const parentItem = screen.getByRole("listitem");
    const parentItemButton = within(parentItem).getByRole("button");

    await user.tab();
    await user.keyboard("{arrowdown}");
    await user.keyboard("{arrowdown}");
    await user.keyboard("{Escape}");

    const submenu = within(parentItem).queryByRole("list");
    expect(submenu).not.toBeInTheDocument();
    expect(parentItemButton).toHaveFocus();
  });

  it("should not close when the user presses 'Enter' and focus is on input", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem>
            <Search value="foo" onChange={() => {}} />
          </MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );
    const parentItem = screen.getByRole("listitem");

    await user.tab();
    await user.keyboard("{arrowdown}");
    await user.keyboard("{arrowdown}");
    await user.keyboard("{arrowdown}");

    expect(screen.getByDisplayValue("foo")).toHaveFocus();
    await user.keyboard("{Enter}");

    const submenu = within(parentItem).queryByRole("list");
    expect(submenu).toBeVisible();
    expect(screen.getByDisplayValue("foo")).toHaveFocus();
  });

  it("should close when the user presses 'Enter' and focus is not on input", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem>
            <Search value="foo" onChange={() => {}} />
          </MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );

    await user.tab();
    await user.keyboard("{arrowdown}");
    await user.keyboard("{Enter}");

    await waitFor(() => {
      const parentItem = screen.getByRole("listitem");
      const submenu = within(parentItem).queryByRole("list");
      expect(submenu).not.toBeInTheDocument();
    });
  });

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])(
    "should close when the focus is on a button parent item and '%s' key is pressed",
    async (_, key) => {
      const user = userEvent.setup();
      render(
        <Menu>
          <MenuItem submenu="Item One">
            <MenuItem href="#">Submenu Item One</MenuItem>
            <MenuItem href="#">Submenu Item Two</MenuItem>
            <MenuItem href="#">Submenu Item Three</MenuItem>
          </MenuItem>
        </Menu>,
      );
      const parentItem = screen.getByRole("listitem");

      await user.tab();
      await user.keyboard(key);
      const submenu = within(parentItem).queryByRole("list");

      expect(submenu).toBeVisible();

      await user.keyboard(key);
      expect(submenu).not.toBeInTheDocument();
    },
  );

  it("should close when the parent is a link parent item and 'Space' key is pressed", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem href="#" submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );
    const parentItem = screen.getByRole("listitem");

    await user.tab();
    await user.keyboard(" ");
    const submenu = within(parentItem).queryByRole("list");

    expect(submenu).toBeVisible();

    await user.keyboard(" ");
    expect(submenu).not.toBeInTheDocument();
  });

  it("should not throw an error when a passed null `children`", () => {
    expect(() => {
      render(
        <Menu>
          <MenuItem submenu="test">
            {true && <MenuItem href="#">One</MenuItem>}
            {false && <MenuItem href="#">Two</MenuItem>}
          </MenuItem>
        </Menu>,
      );
    }).not.toThrow();
  });

  it("should update the focused element when a user clicks a child item", async () => {
    const user = userEvent.setup();
    render(
      <Menu>
        <MenuItem href="#" submenu="Item One">
          <MenuItem onClick={() => {}}>Submenu Item One</MenuItem>
          <MenuItem onClick={() => {}}>Submenu Item Two</MenuItem>
          <MenuItem onClick={() => {}}>Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );

    const parentItem = screen.getByRole("listitem");

    await user.tab();
    await user.keyboard("{arrowdown}");

    const subitems = within(parentItem).getAllByRole("listitem");
    const thirdItemButton = within(subitems[2]).getByRole("button");

    await user.click(thirdItemButton);

    expect(thirdItemButton).toHaveFocus();
  });

  it("should call the `handleKeyDown` function when one is passed via `submenuContext`", () => {
    const handleKeyDown = jest.fn();
    const contextValues: StrictMenuContextType = {
      menuType: "light",
      setOpenSubmenuId: () => {},
      openSubmenuId: null,
      registerItem: () => {},
      unregisterItem: () => {},
    };

    render(
      <StrictMenuProvider value={contextValues}>
        <SubmenuContext.Provider value={{ handleKeyDown }}>
          <MenuItem href="#">Item One</MenuItem>
        </SubmenuContext.Provider>
      </StrictMenuProvider>,
    );
    const item = screen.getByRole("link", { name: "Item One" });
    fireEvent.keyDown(item, { key: "ArrowDown", code: "ArrowDown" });

    expect(handleKeyDown).toHaveBeenCalled();
  });

  it("should have the expected styling when a child item is `selected`", () => {
    render(
      <Menu>
        <MenuItem selected submenu="Item One">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByRole("button", { name: "Item One" })).toHaveStyle({
      backgroundColor: menuConfigVariants.light.selected,
    });
  });

  it("should apply the expected padding when the item also has `maxWidth` set", () => {
    render(
      <Menu>
        <MenuItem submenu="Item One" maxWidth="100px">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
          <MenuItem href="#">Submenu Item Three</MenuItem>
        </MenuItem>
      </Menu>,
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
      <Menu>
        <MenuItem submenu="">Item One</MenuItem>
      </Menu>,
    );
  }).toThrow(
    "You should not pass `children` when `submenu` is an empty string",
  );

  consoleSpy.mockRestore();
});

// coverage
test("should set the correct colour when a child of `MenuSegmentTitle` and `variant` is 'alternate'", async () => {
  render(
    <Menu menuType="black">
      <MenuSegmentTitle text="Test">
        <MenuItem variant="alternate" href="#">
          Item One
        </MenuItem>
      </MenuSegmentTitle>
    </Menu>,
  );

  expect(screen.getByTestId("menu-item-wrapper")).toHaveStyle({
    backgroundColor: menuConfigVariants.black.alternate,
  });
});
