import React from "react";
import { render, screen, within } from "@testing-library/react";
import PopoverMenu, { FocusableHandle, PopoverMenuProps } from "./popover-menu.component";
import {
  MenuItem,
  MenuItemDivider,
  MenuItemHeading,
  MenuItemLeading,
  MenuItemLabel,
  MenuItemSubtext,
} from "./menu-item";
import userEvent from "@testing-library/user-event";
import Button, { ButtonHandle } from "../../components/button/__next__";
import Icon from "../../components/icon";
import { PopoverControlProps } from "./contexts";

interface AdditionalControlProps extends PopoverControlProps {
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const popoverControlButton = (
  ref: React.RefObject<ButtonHandle>,
  props: AdditionalControlProps
) => (
  <Button
    {...props}
    ref={ref}
  >
    Button label
  </Button>
);

const popoverControlInput = (
  ref: React.RefObject<HTMLInputElement>,
  props: AdditionalControlProps 
) => (
  <input
    aria-label="combobox-label"
    {...props}
    ref={ref}
  />
);

const buttonChildren = (
  <>
    <Button>Item 1</Button>
    <Button>Item 2</Button>
    <Button>Item 3</Button>
  </>
);

const renderPopoverMenu = <TRef extends FocusableHandle = HTMLElement>({
  open = false,
  children,
  onOpen = () => {},
  onClose = () => {},
  popoverControl = popoverControlInput as unknown as PopoverMenuProps<TRef>["popoverControl"],
  ...props
}: Partial<PopoverMenuProps<TRef>> = {}) => {
  return render(
    <PopoverMenu<TRef>
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      popoverControl={(ref, controlProps) => {
        return (
          popoverControl(ref, {
            ...controlProps,
            onKeyDown: (e) => {
              if (e.key === "Enter") onOpen();
            }
          } as AdditionalControlProps)
        );
      }}
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

const Submenu = () => (
   <>
    <MenuItem>Subitem 1</MenuItem>
    <MenuItem>Subitem 2</MenuItem>
  </>
)

const PopoverMenuWithState = <TRef extends FocusableHandle = HTMLElement>(
  {
    children,
    popoverControl = popoverControlInput as unknown as PopoverMenuProps<TRef>["popoverControl"],
    ...props
  }: Partial<PopoverMenuProps<TRef>> = {}) => {
  const [open, setOpen] = React.useState(false);
  const [submenuOpen, setSubmenuOpen] = React.useState(false);

  return (
    <PopoverMenu<TRef>
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      popoverControl={(ref, controlProps) => {
        return (
          popoverControl(
            ref,
            { ...controlProps,
              onClick: () => setOpen(true),
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  setOpen(true);
                }
              } 
            } as AdditionalControlProps
          )
        );
      }}
      {...props}
    >
      {children ?? (
        <>
          <MenuItem id="item-1">
            Item 1
          </MenuItem>
          <MenuItem id="item-2" submenu={<Submenu />} submenuOpen={submenuOpen} onSubmenuOpen={() => setSubmenuOpen(true)} onSubmenuClose={() => setSubmenuOpen(false)}>
            Item 2
          </MenuItem>
          <MenuItem id="item-3">
            Item 3
          </MenuItem>
        </>
      )}
    </PopoverMenu>
  );
};

const focusTrigger = (role: "combobox" | "button" = "combobox") => {
  const name = role === "combobox" ? "combobox-label" : "Button label";
  screen.getByRole(role, { name }).focus();
};

describe("PopoverMenu - typeahead (Search)", () => {
  it("does not render the list when closed", () => {
    renderPopoverMenu();

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("renders the list with options when open", () => {
    renderPopoverMenu({ open: true });

    expect(screen.getAllByRole("listbox")[0]).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(4);
  });

  it("wrapper has expected data- attributes", () => {
    renderPopoverMenu({
      "data-role": "popover-menu-role",
      "data-element": "popover-menu-element",
    });
    const wrapper = screen.getByTestId("popover-menu-role");

    expect(wrapper).toHaveAttribute("data-component", "popover-menu");
    expect(wrapper).toHaveAttribute("data-element", "popover-menu-element");
  });

  it("popoverControl button receives aria-haspopup='listbox'", () => {
    renderPopoverMenu();

    expect(
      screen.getByRole("combobox", { name: "combobox-label" }),
    ).toHaveAttribute("aria-haspopup", "listbox");
  });

  it("popoverControl receives aria-expanded='false' when closed", () => {
    renderPopoverMenu({ open: false });

    expect(
      screen.getByRole("combobox", { name: "combobox-label" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("popoverControl button receives aria-expanded='true' when open", () => {
    renderPopoverMenu({ open: true });

    expect(
      screen.getByRole("combobox", { name: "combobox-label" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("aria-controls on the button references the listbox id", () => {
    renderPopoverMenu({ open: true });

    const button = screen.getByRole("combobox", { name: "combobox-label" });
    const listbox = screen.getAllByRole("listbox")[0];

    expect(button).toHaveAttribute("aria-controls", listbox.id);
  });

  it("id prop is applied to the list element", () => {
    renderPopoverMenu({
      id: "my-menu",
      "data-role": "popover-menu-role",
      open: true,
    });

    expect(screen.getAllByRole("listbox")[0]).toHaveAttribute("id", "my-menu");
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
        <PopoverMenuWithState>
          <MenuItem>Item 1</MenuItem>
          <MenuItem selected>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </PopoverMenuWithState>,
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
        <PopoverMenuWithState>
          <MenuItem>Item 1</MenuItem>
          <MenuItem selected disabled>
            Item 2
          </MenuItem>
          <MenuItem>Item 3</MenuItem>
        </PopoverMenuWithState>,
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
        <PopoverMenuWithState>
          <MenuItem>Item 1</MenuItem>
          <MenuItem selected>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </PopoverMenuWithState>,
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

  it("focuses the last item when list is open and nothing is highlighted or selected", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({ open: true });

    focusTrigger();
    await user.keyboard("{Enter}");
    await user.keyboard("{ArrowUp}");
    const options = screen.getAllByRole("option");
    const last = options[options.length - 1];

    expect(last).toHaveAttribute("data-has-focus", "true");
  });

  it("shows list when user clicks the control and focuses selected item on ArrowDown", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState>
        <MenuItem>Item 1</MenuItem>
        <MenuItem selected>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </PopoverMenuWithState>,
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

  it("shows list when user clicks the control and focuses selected item on ArrowUp", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState>
        <MenuItem>Item 1</MenuItem>
        <MenuItem selected>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </PopoverMenuWithState>,
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

  it("calls onClose when Escape is pressed while open and control is an input", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    renderPopoverMenu({ open: true, onClose });

    focusTrigger();
    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape is pressed while open and control is a Button", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <PopoverMenu
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

  it("ArrowDown focuses the first item when list is open and nothing is highlighted", async () => {
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

  it("ArrowDown advances the highlight to the next item", async () => {
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

  it("ArrowDown wraps from the last item back to the first", async () => {
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

  it("ArrowUp retreats the highlight to the previous item", async () => {
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

  it("ArrowUp wraps from the first item to the last", async () => {
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

  it("Home moves the highlight to the first item", async () => {
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

  it("Home moves the highlight to the first item that is not disabled", async () => {
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

  it("End moves the highlight to the last item", async () => {
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

  it("End moves the highlight to the last item that is not disabled", async () => {
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

  it("Enter clicks the currently highlighted item", async () => {
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
});

it("renders the list container with the expected max-height when size is small", () => {
  renderPopoverMenu({ open: true, size: "small" });
  const listbox = screen.getAllByRole("listbox")[0];

  expect(listbox).toHaveStyleRule(
    "max-height",
    "calc(5 * var(--global-size-s))",
  );
});

it("renders the list container with the expected max-height when size is medium", () => {
  renderPopoverMenu({ open: true, size: "medium" });
  const listbox = screen.getAllByRole("listbox")[0];

  expect(listbox).toHaveStyleRule(
    "max-height",
    "calc(5 * var(--global-size-m))",
  );
});

describe.only("PopoverMenu - button menu", () => {
  it("passes aria-haspopup='menu' to the popoverControl button", () => {
    renderPopoverMenu<NonNullable<ButtonHandle>>({ isButtonMenu: true, popoverControl: popoverControlButton });
    
    expect(
      screen.getByRole("button", { name: "Button label" }),
    ).toHaveAttribute("aria-haspopup", "menu");
  });

  it("passes aria-expanded='false' when closed to the popoverControl button", () => {
    renderPopoverMenu<NonNullable<ButtonHandle>>({ isButtonMenu: true, popoverControl: popoverControlButton, open: false, children: buttonChildren });

    expect(
      screen.getByRole("button", { name: "Button label" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("passes aria-expanded='true' when open to the popoverControl button", () => {
    renderPopoverMenu<NonNullable<ButtonHandle>>({ isButtonMenu: true, popoverControl: popoverControlButton, open: true, children: buttonChildren });

    expect(
      screen.getByRole("button", { name: "Button label" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("passes aria-controls referencing the list id when open to the popoverControl button", () => {
    renderPopoverMenu<NonNullable<ButtonHandle>>({ isButtonMenu: true, popoverControl: popoverControlButton, open: true, id: "foo", children: buttonChildren });

    const button = screen.getByRole("button", { name: "Button label" });

    expect(button).toHaveAttribute("aria-controls", "foo");
  });

  it("renders the items with role='menuitem' when isButtonMenu is true", () => {
    renderPopoverMenu<NonNullable<ButtonHandle>>({ isButtonMenu: true, popoverControl: popoverControlButton, open: true, children: buttonChildren });

    const items = screen.getAllByRole("menuitem");

    expect(items).toHaveLength(3);
  });

  it("does not focus an item when the list is opened via the user clicking on the popover control", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<NonNullable<ButtonHandle>> isButtonMenu popoverControl={popoverControlButton}>
        <Button>Item 1</Button>
        <Button>Item 2</Button>
        <Button>Item 3</Button>
      </PopoverMenuWithState>,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));
    const items = screen.getAllByRole("menuitem");

    items.forEach((item) => {
      expect(item).toBeVisible();
      expect(item).not.toHaveFocus();
    });
  });

  it.each([["Enter", "{Enter}"], ["Space", " "], ["ArrowDown", "{ArrowDown}"]])(
    "does not focus the first item when the focusItemOnOpen is falsy and the list is opened by the user pressing %s on the popover control", async (_, key) => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<NonNullable<ButtonHandle>> isButtonMenu popoverControl={popoverControlButton} focusItemOnOpen={false}>
        <Button>Item 1</Button>
        <Button>Item 2</Button>
        <Button>Item 3</Button>
      </PopoverMenuWithState>,
    );

    focusTrigger("button");
    await user.keyboard(key);
    const items = screen.getAllByRole("menuitem");

    items.forEach((item) => {
      expect(item).toBeVisible();
      expect(within(item).getByRole("button")).not.toHaveFocus();
    });
  });

   it("does not focus the last item when the focusItemOnOpen is falsy and the list is opened by the user pressing ArrowUp", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<NonNullable<ButtonHandle>> isButtonMenu popoverControl={popoverControlButton} focusItemOnOpen={false}>
        <Button>Item 1</Button>
        <Button>Item 2</Button>
        <Button>Item 3</Button>
      </PopoverMenuWithState>,
    );

    focusTrigger("button");
    await user.keyboard("{ArrowUp}");
    const items = screen.getAllByRole("menuitem");
    const last = items[items.length - 1];

    expect(within(last).getByRole("button")).not.toHaveFocus();
  });

  it.each([["Enter", "{Enter}"], ["Space", " "], ["ArrowDown", "{ArrowDown}"]])(
    "focuses the first item when the focusItemOnOpen is true and the list is opened by the user pressing %s on the popover control", async (_, key) => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<NonNullable<ButtonHandle>> isButtonMenu popoverControl={popoverControlButton} focusItemOnOpen>
        <Button>Item 1</Button>
        <Button>Item 2</Button>
        <Button>Item 3</Button>
      </PopoverMenuWithState>,
    );

    focusTrigger("button");
    await user.keyboard(key);
    const [first] = screen.getAllByRole("menuitem");

    expect(within(first).getByRole("button")).toHaveFocus();
  });

  it("focuses the last item when the focusItemOnOpen is true and the list is opened by the user pressing ArrowUp", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<NonNullable<ButtonHandle>> isButtonMenu popoverControl={popoverControlButton} focusItemOnOpen>
        <Button>Item 1</Button>
        <Button>Item 2</Button>
        <Button>Item 3</Button>
      </PopoverMenuWithState>,
    );

    focusTrigger("button");
    await user.keyboard("{ArrowUp}");
    const items = screen.getAllByRole("menuitem");
    const last = items[items.length - 1];

    expect(within(last).getByRole("button")).toHaveFocus();
  });

  it("does not loop the focus when the user presses ArrowDown on the last item", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<NonNullable<ButtonHandle>> isButtonMenu popoverControl={popoverControlButton}>
        <Button>Item 1</Button>
        <Button>Item 2</Button>
        <Button>Item 3</Button>
      </PopoverMenuWithState>,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    const items = screen.getAllByRole("menuitem");
    const last = items[items.length - 1];

    expect(within(last).getByRole("button")).toHaveFocus();
  });

  it("does not loop the focus when the user presses ArrowUp on the first item", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<NonNullable<ButtonHandle>> isButtonMenu popoverControl={popoverControlButton}>
        <Button>Item 1</Button>
        <Button>Item 2</Button>
        <Button>Item 3</Button>
      </PopoverMenuWithState>,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));
    await user.keyboard("{ArrowUp}");
    await user.keyboard("{ArrowUp}");
    await user.keyboard("{ArrowUp}");
    await user.keyboard("{ArrowUp}");
    const [first] = screen.getAllByRole("menuitem");

    expect(within(first).getByRole("button")).toHaveFocus();
  });

  it("displays a submenu when one is passed to an item and the user presses Enter whilst it is focused", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<NonNullable<ButtonHandle>> isButtonMenu popoverControl={popoverControlButton}/>
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    expect(screen.getByRole("menuitem", { name: "Subitem 1" })).toBeVisible();
    expect(screen.getByRole("menuitem", { name: "Subitem 2" })).toBeVisible();
  });
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
