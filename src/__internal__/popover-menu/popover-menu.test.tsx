import React from "react";
import { render, screen } from "@testing-library/react";
import PopoverMenu, { PopoverMenuProps } from "./popover-menu.component";
import {
  MenuItem,
  MenuItemDivider,
  MenuItemHeading,
  MenuItemLeading,
  MenuItemLabel,
  MenuItemSubtext,
} from "./menu-item";
import userEvent from "@testing-library/user-event";
import Button from "../../components/button/__next__";
import Icon from "../../components/icon";

const renderPopoverMenu = ({
  open = false,
  children,
  onOpen = () => {},
  onClose = () => {},
  ...props
}: Partial<PopoverMenuProps<HTMLInputElement>> = {}) => {
  return render(
    <PopoverMenu<HTMLInputElement>
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      popoverControl={(ref, controlProps) => (
        <input
          aria-label="combobox-label"
          ref={ref}
          {...controlProps}
          onKeyDown={(e) => {
            if (e.key === "Enter") onOpen();
          }}
        />
      )}
      {...props}
    >
      {children ?? (
        <>
          <MenuItem id="item-1">
            <MenuItemLeading>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">1</MenuItemLabel>
            <MenuItemSubtext>Subtext</MenuItemSubtext>
          </MenuItem>
          <MenuItemDivider />
          <MenuItemHeading text="Heading">
            <MenuItem id="item-2">
              <MenuItemLabel>Item 2</MenuItemLabel>
            </MenuItem>
          </MenuItemHeading>
          <MenuItem id="item-3">
            <MenuItemLabel>Item 3</MenuItemLabel>
          </MenuItem>
        </>
      )}
    </PopoverMenu>,
  );
};

const MenuWithState = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <PopoverMenu<HTMLInputElement>
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      popoverControl={(ref, controlProps) => (
        <input
          aria-label="combobox-label"
          ref={ref}
          {...controlProps}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setOpen(true);
          }}
        />
      )}
    >
      {children}
    </PopoverMenu>
  );
};

const focusTrigger = () =>
  screen.getByRole("combobox", { name: "combobox-label" }).focus();

test("does not render the list when closed", () => {
  renderPopoverMenu();

  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
});

test("renders the list with options when open", () => {
  renderPopoverMenu({ open: true });

  expect(screen.getAllByRole("listbox")[0]).toBeInTheDocument();
  expect(screen.getAllByRole("option")).toHaveLength(4);
});

test("wrapper has expected data- attributes", () => {
  renderPopoverMenu({
    "data-role": "popover-menu-role",
    "data-element": "popover-menu-element",
  });
  const wrapper = screen.getByTestId("popover-menu-role");

  expect(wrapper).toHaveAttribute("data-component", "popover-menu");
  expect(wrapper).toHaveAttribute("data-element", "popover-menu-element");
});

test("popoverControl button receives aria-haspopup='listbox'", () => {
  renderPopoverMenu();

  expect(
    screen.getByRole("combobox", { name: "combobox-label" }),
  ).toHaveAttribute("aria-haspopup", "listbox");
});

test("popoverControl receives aria-expanded='false' when closed", () => {
  renderPopoverMenu({ open: false });

  expect(
    screen.getByRole("combobox", { name: "combobox-label" }),
  ).toHaveAttribute("aria-expanded", "false");
});

test("popoverControl button receives aria-expanded='true' when open", () => {
  renderPopoverMenu({ open: true });

  expect(
    screen.getByRole("combobox", { name: "combobox-label" }),
  ).toHaveAttribute("aria-expanded", "true");
});

test("aria-controls on the button references the listbox id", () => {
  renderPopoverMenu({ open: true });

  const button = screen.getByRole("combobox", { name: "combobox-label" });
  const listbox = screen.getAllByRole("listbox")[0];

  expect(button).toHaveAttribute("aria-controls", listbox.id);
});

test("id prop is applied to the outer wrapper element", () => {
  renderPopoverMenu({
    id: "my-menu",
    "data-role": "popover-menu-role",
    open: true,
  });

  expect(screen.getByTestId("popover-menu-role")).toHaveAttribute(
    "id",
    "my-menu",
  );
});

describe("when the list opens", () => {
  it("calls the onOpen callback", async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();
    renderPopoverMenu({ open: false, onOpen });

    focusTrigger();
    await user.keyboard("{Enter}");

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("focuses the selected item when the list is opened and the the user presses ArrowDown", async () => {
    const user = userEvent.setup();
    render(
      <MenuWithState>
        <MenuItem>Item 1</MenuItem>
        <MenuItem selected>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </MenuWithState>,
    );

    focusTrigger();
    await user.keyboard("{Enter}");
    const items = Array.from(screen.queryAllByRole("option") || []);
    const selectedItem = items.find(
      (item) => item.getAttribute("aria-selected") === "true",
    );
    await user.keyboard("{ArrowDown}");

    expect(selectedItem).toHaveAttribute("data-has-focus", "true");

    await user.keyboard("{ArrowDown}");

    expect(selectedItem).not.toHaveAttribute("data-has-focus", "true");
    expect(items[2]).toHaveAttribute("data-has-focus", "true");
  });

  it("focuses first item when the selected item is disabled and the list is opened", async () => {
    const user = userEvent.setup();
    render(
      <MenuWithState>
        <MenuItem>Item 1</MenuItem>
        <MenuItem selected disabled>
          Item 2
        </MenuItem>
        <MenuItem>Item 3</MenuItem>
      </MenuWithState>,
    );

    focusTrigger();
    await user.keyboard("{Enter}");
    await user.keyboard("{ArrowDown}");

    const items = Array.from(screen.queryAllByRole("option") || []);

    expect(items[0]).toHaveAttribute("data-has-focus", "true");
  });

  it("focuses the selected item when the list is opened and the user presses ArrowUp", async () => {
    const user = userEvent.setup();
    render(
      <MenuWithState>
        <MenuItem>Item 1</MenuItem>
        <MenuItem selected>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </MenuWithState>,
    );

    focusTrigger();
    await user.keyboard("{Enter}");

    const items = Array.from(screen.queryAllByRole("option") || []);

    const selectedItem = items.find(
      (item) => item.getAttribute("aria-selected") === "true",
    );

    await user.keyboard("{ArrowUp}");

    expect(selectedItem).toHaveAttribute("data-has-focus", "true");

    await user.keyboard("{ArrowUp}");

    expect(selectedItem).not.toHaveAttribute("data-has-focus", "true");
    expect(items[0]).toHaveAttribute("data-has-focus", "true");
  });
});

test("focuses the last item when list is open and nothing is highlighted or selected", async () => {
  const user = userEvent.setup();
  renderPopoverMenu({ open: true });

  focusTrigger();
  await user.keyboard("{Enter}");
  await user.keyboard("{ArrowUp}");

  const options = screen.getAllByRole("option");
  const last = options[options.length - 1];
  expect(last).toHaveAttribute("data-has-focus", "true");
});

test("shows list when user clicks the control and focuses selected item on ArrowDown", async () => {
  const user = userEvent.setup();
  render(
    <MenuWithState>
      <MenuItem>Item 1</MenuItem>
      <MenuItem selected>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </MenuWithState>,
  );

  await user.click(screen.getByRole("combobox", { name: "combobox-label" }));

  const items = Array.from(screen.queryAllByRole("option") || []);

  const selectedItem = items.find(
    (item) => item.getAttribute("aria-selected") === "true",
  );

  await user.keyboard("{ArrowDown}");

  expect(selectedItem).toHaveAttribute("data-has-focus", "true");

  await user.keyboard("{ArrowDown}");

  expect(selectedItem).not.toHaveAttribute("data-has-focus", "true");
  expect(items[2]).toHaveAttribute("data-has-focus", "true");
});

test("shows list when user clicks the control and focuses selected item on ArrowUp", async () => {
  const user = userEvent.setup();
  render(
    <MenuWithState>
      <MenuItem>Item 1</MenuItem>
      <MenuItem selected>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </MenuWithState>,
  );

  await user.click(screen.getByRole("combobox", { name: "combobox-label" }));

  const items = Array.from(screen.queryAllByRole("option") || []);

  const selectedItem = items.find(
    (item) => item.getAttribute("aria-selected") === "true",
  );

  await user.keyboard("{ArrowUp}");

  expect(selectedItem).toHaveAttribute("data-has-focus", "true");

  await user.keyboard("{ArrowUp}");

  expect(selectedItem).not.toHaveAttribute("data-has-focus", "true");
  expect(items[0]).toHaveAttribute("data-has-focus", "true");
});

test("calls onClose when Escape is pressed while open and control is an input", async () => {
  const user = userEvent.setup();
  const onClose = jest.fn();
  renderPopoverMenu({ open: true, onClose });

  focusTrigger();
  await user.keyboard("{Escape}");

  expect(onClose).toHaveBeenCalledTimes(1);
});

test("calls onClose when Escape is pressed while open and control is a Button", async () => {
  const user = userEvent.setup();
  const onClose = jest.fn();
  render(
    <PopoverMenu<HTMLButtonElement | HTMLAnchorElement>
      open
      onOpen={() => {}}
      onClose={onClose}
      popoverControl={(
        ref,
        {
          "aria-haspopup": ariaHasPopup,
          "aria-controls": ariaControls,
          "aria-expanded": ariaExpanded,
        },
      ) => (
        <Button
          aria-label="button-label"
          ref={ref}
          aria-haspopup={ariaHasPopup}
          aria-controls={ariaControls}
          aria-expanded={ariaExpanded}
        >
          Button
        </Button>
      )}
    >
      <MenuItem>Item 1</MenuItem>
    </PopoverMenu>,
  );

  screen.getByRole("button", { name: "button-label" }).focus();
  await user.keyboard("{Escape}");

  expect(onClose).toHaveBeenCalledTimes(1);
});

test("ArrowDown focuses the first item when list is open and nothing is highlighted", async () => {
  const user = userEvent.setup();
  renderPopoverMenu({ open: true });

  focusTrigger();
  await user.keyboard("{ArrowDown}");
  const [first] = screen.getAllByRole("option");

  expect(first).toHaveAttribute("data-has-focus", "true");
  expect(
    screen.getByRole("combobox", { name: "combobox-label" }),
  ).toHaveAttribute("aria-activedescendant", "item-1");
});

test("ArrowDown advances the highlight to the next item", async () => {
  const user = userEvent.setup();
  renderPopoverMenu({ open: true });

  focusTrigger();
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowDown}");
  const options = screen.getAllByRole("option");

  expect(options[0]).not.toHaveAttribute("data-has-focus", "true");
  expect(options[2]).toHaveAttribute("data-has-focus", "true");
  expect(
    screen.getByRole("combobox", { name: "combobox-label" }),
  ).toHaveAttribute("aria-activedescendant", "item-2");
});

test("ArrowDown wraps from the last item back to the first", async () => {
  const user = userEvent.setup();
  renderPopoverMenu({
    open: true,
    children: (
      <>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
      </>
    ),
  });

  focusTrigger();
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowDown}");
  const [first, second] = screen.getAllByRole("option");

  expect(first).toHaveAttribute("data-has-focus", "true");
  expect(second).not.toHaveAttribute("data-has-focus", "true");
});

test("ArrowUp retreats the highlight to the previous item", async () => {
  const user = userEvent.setup();
  renderPopoverMenu({ open: true });

  focusTrigger();
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowUp}");
  const [first, second] = screen.getAllByRole("option");

  expect(first).toHaveAttribute("data-has-focus", "true");
  expect(second).not.toHaveAttribute("data-has-focus", "true");
  expect(
    screen.getByRole("combobox", { name: "combobox-label" }),
  ).toHaveAttribute("aria-activedescendant", "item-1");
});

test("ArrowUp wraps from the first item to the last", async () => {
  const user = userEvent.setup();
  renderPopoverMenu({ open: true });

  focusTrigger();
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowUp}");
  const options = screen.getAllByRole("option");
  const last = options[options.length - 1];

  expect(last).toHaveAttribute("data-has-focus", "true");
  expect(
    screen.getByRole("combobox", { name: "combobox-label" }),
  ).toHaveAttribute("aria-activedescendant", "item-3");
});

test("Home moves the highlight to the first item", async () => {
  const user = userEvent.setup();
  renderPopoverMenu({ open: true });

  focusTrigger();
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{Home}");
  const [first, second] = screen.getAllByRole("option");

  expect(first).toHaveAttribute("data-has-focus", "true");
  expect(second).not.toHaveAttribute("data-has-focus", "true");
  expect(
    screen.getByRole("combobox", { name: "combobox-label" }),
  ).toHaveAttribute("aria-activedescendant", "item-1");
});

test("Home moves the highlight to the first item that is not disabled", async () => {
  const user = userEvent.setup();
  renderPopoverMenu({
    open: true,
    children: (
      <>
        <MenuItem id="item-1" disabled>
          Item 1
        </MenuItem>
        <MenuItem id="item-2">Item 2</MenuItem>
        <MenuItem id="item-3">Item 3</MenuItem>
        <MenuItem id="item-4">Item 4</MenuItem>
      </>
    ),
  });

  focusTrigger();
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{Home}");
  const [first, second] = screen.getAllByRole("option");

  expect(first).not.toHaveAttribute("data-has-focus", "true");
  expect(second).toHaveAttribute("data-has-focus", "true");
  expect(
    screen.getByRole("combobox", { name: "combobox-label" }),
  ).toHaveAttribute("aria-activedescendant", "item-2");
});

test("End moves the highlight to the last item", async () => {
  const user = userEvent.setup();
  renderPopoverMenu({ open: true });

  focusTrigger();
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{End}");
  const options = screen.getAllByRole("option");
  const last = options[options.length - 1];

  expect(last).toHaveAttribute("data-has-focus", "true");
  expect(
    screen.getByRole("combobox", { name: "combobox-label" }),
  ).toHaveAttribute("aria-activedescendant", "item-3");
});

test("End moves the highlight to the last item that is not disabled", async () => {
  const user = userEvent.setup();
  renderPopoverMenu({
    open: true,
    children: (
      <>
        <MenuItem id="item-1">Item 1</MenuItem>
        <MenuItem id="item-2">Item 2</MenuItem>
        <MenuItem id="item-3">Item 3</MenuItem>
        <MenuItem id="item-4" disabled>
          Item 4
        </MenuItem>
      </>
    ),
  });

  focusTrigger();
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{End}");

  const options = screen.getAllByRole("option");
  expect(options[2]).toHaveAttribute("data-has-focus", "true");
  expect(
    screen.getByRole("combobox", { name: "combobox-label" }),
  ).toHaveAttribute("aria-activedescendant", "item-3");
});

test("Enter clicks the currently highlighted item", async () => {
  const user = userEvent.setup();
  const onItemClick = jest.fn();
  renderPopoverMenu({
    open: true,
    children: (
      <>
        <MenuItem onClick={onItemClick}>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
      </>
    ),
  });

  focusTrigger();
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{Enter}");

  expect(onItemClick).toHaveBeenCalledTimes(1);
});

test("renders the list container with the expected max-height when size is small", () => {
  renderPopoverMenu({ open: true, size: "small" });

  const listbox = screen.getAllByRole("listbox")[0];

  expect(listbox).toHaveStyleRule(
    "max-height",
    "calc(5 * var(--global-size-s))",
  );
});

test("renders the list container with the expected max-height when size is medium", () => {
  renderPopoverMenu({ open: true, size: "medium" });

  const listbox = screen.getAllByRole("listbox")[0];

  expect(listbox).toHaveStyleRule(
    "max-height",
    "calc(5 * var(--global-size-m))",
  );
});

test("renders the list container with the expected max-height when size is large", () => {
  renderPopoverMenu({ open: true, size: "large" });

  const listbox = screen.getAllByRole("listbox")[0];

  expect(listbox).toHaveStyleRule(
    "max-height",
    "calc(5 * var(--global-size-l))",
  );
});

test("wraps any non-option children in list item with role of option", () => {
  render(
    <PopoverMenu
      open
      onOpen={() => {}}
      onClose={() => {}}
      popoverControl={() => <button>Control</button>}
    >
      <button>Not an option</button>
    </PopoverMenu>,
  );

  expect(screen.getByRole("option", { name: "Not an option" })).toBeVisible();
});

test("clicking the menu wrapper does not close the menu", async () => {
  const user = userEvent.setup();
  const onClose = jest.fn();
  render(
    <PopoverMenu
      open
      onOpen={() => {}}
      onClose={onClose}
      popoverControl={() => <button>Control</button>}
    >
      <MenuItem>Option 1</MenuItem>
    </PopoverMenu>,
  );

  await user.click(screen.getByTestId("menu-wrapper"));

  expect(onClose).not.toHaveBeenCalled();
});
