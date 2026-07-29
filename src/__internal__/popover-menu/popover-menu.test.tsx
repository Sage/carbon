import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import PopoverMenu, {
  FocusableHandle,
  PopoverMenuProps,
  menuPopoverMiddleware,
} from "./popover-menu.component";
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
import { PopoverControlProps } from "./contexts";

let mockVirtualizerOptions: {
  count?: number;
  getScrollElement?: () => Element | null;
  estimateSize?: () => number;
  getItemKey?: (index: number) => React.Key;
  rangeExtractor?: (range: {
    startIndex: number;
    endIndex: number;
    overscan: number;
    count: number;
  }) => number[];
} = {};
const mockMeasureElement = jest.fn();
const mockMeasureVirtualItems = jest.fn();
const mockScrollToIndex = jest.fn();

jest.mock("@tanstack/react-virtual", () => {
  const actual = jest.requireActual("@tanstack/react-virtual");

  return {
    ...actual,
    useVirtualizer: (options: typeof mockVirtualizerOptions) => {
      mockVirtualizerOptions = options;
      return {
        getVirtualItems: () => {
          const count = options.count ?? 0;
          const indexes = count
            ? (options.rangeExtractor?.({
                startIndex: 0,
                endIndex: 0,
                overscan: 0,
                count,
              }) ?? [0])
            : [];

          return indexes.map((index) => ({
            index,
            key: options.getItemKey?.(index) ?? index,
            start: index * 40,
          }));
        },
        getTotalSize: () => 480,
        measureElement: mockMeasureElement,
        measure: mockMeasureVirtualItems,
        scrollToIndex: mockScrollToIndex,
      };
    },
  };
});

interface AdditionalControlProps extends PopoverControlProps {
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const popoverControlButton = (
  ref: React.RefObject<HTMLButtonElement>,
  props: AdditionalControlProps,
) => (
  <Button {...props} ref={ref}>
    Button label
  </Button>
);

const popoverControlInput = (
  ref: React.RefObject<HTMLInputElement>,
  props: AdditionalControlProps,
) => <input aria-label="combobox-label" {...props} ref={ref} />;

const buttonChildren = (
  <>
    <Button>Item 1</Button>
    <Button>Item 2</Button>
    <Button>Item 3</Button>
  </>
);

test("includes flip middleware by default and removes it when disabled", () => {
  expect(menuPopoverMiddleware().map(({ name }) => name)).toContain("flip");
  expect(
    menuPopoverMiddleware(undefined, false, false, false, false).map(
      ({ name }) => name,
    ),
  ).not.toContain("flip");
});

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
        return popoverControl(ref, {
          ...controlProps,
          onKeyDown: (e) => {
            if (e.key === "Enter") onOpen();
          },
        } as AdditionalControlProps);
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

const PopoverMenuWithState = <TRef extends FocusableHandle = HTMLElement>({
  children,
  popoverControl = popoverControlInput as unknown as PopoverMenuProps<TRef>["popoverControl"],
  disabledItems,
  applyDisabledButton,
  ...props
}: Partial<PopoverMenuProps<TRef>> & {
  disabledItems?: number[];
  applyDisabledButton?:
    | "disabled"
    | "aria-disabled-bool"
    | "aria-disabled-string";
} = {}) => {
  const [open, setOpen] = React.useState(false);
  const [submenuOpen, setSubmenuOpen] = React.useState(false);

  return (
    <PopoverMenu<TRef>
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      popoverControl={(ref, controlProps) => {
        return popoverControl(ref, {
          ...controlProps,
          onClick: () => setOpen(true),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              setOpen(true);
            }
          },
        } as AdditionalControlProps);
      }}
      {...props}
    >
      {children ?? (
        <>
          <MenuItem id="item-1" disabled={disabledItems?.includes(0)}>
            <Button>Item 1</Button>
          </MenuItem>
          <MenuItem
            id="item-2"
            disabled={disabledItems?.includes(1)}
            submenu={
              <>
                <Button>Subitem 1</Button>
                <Button>Subitem 2</Button>
              </>
            }
            submenuOpen={submenuOpen}
            onSubmenuOpen={() => setSubmenuOpen(true)}
            onSubmenuClose={() => setSubmenuOpen(false)}
          >
            <Button
              disabled={applyDisabledButton === "disabled"}
              aria-disabled={
                applyDisabledButton === "aria-disabled-bool" ||
                applyDisabledButton === "aria-disabled-string"
                  ? "true"
                  : undefined
              }
              onClick={() => setSubmenuOpen((p) => !p)}
            >
              Item 2
            </Button>
          </MenuItem>
          <MenuItem id="item-3" disabled={disabledItems?.includes(2)}>
            <Button>Item 3</Button>
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

const createRect = (width: number, height = 40) =>
  ({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    bottom: height,
    right: width,
    width,
    height,
    toJSON: () => ({}),
  }) as DOMRect;

describe("PopoverMenu - typeahead (Search)", () => {
  it("does not render the list when closed", () => {
    renderPopoverMenu();

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("renders the list with options when open", () => {
    renderPopoverMenu({ open: true });

    expect(screen.getAllByRole("listbox")[0]).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(4);
    expect(screen.getAllByRole("listbox")[0]).not.toHaveAttribute("tabindex");
    expect(screen.getByTestId("menu-wrapper")).not.toHaveAttribute(
      "data-element",
    );
  });

  it("applies an opted-in data element to the menu wrapper", () => {
    renderPopoverMenu({
      open: true,
      menuWrapperDataElement: "custom-menu-wrapper",
    });

    expect(screen.getByTestId("menu-wrapper")).toHaveAttribute(
      "data-element",
      "custom-menu-wrapper",
    );
  });

  it("applies an opted-in tab index to the list", () => {
    renderPopoverMenu({ open: true, listTabIndex: -1 });

    expect(screen.getAllByRole("listbox")[0]).toHaveAttribute("tabindex", "-1");
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

  it("focuses the last item on ArrowUp when focusSelectedOnOpen is set but no option is selected", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({ open: true, focusSelectedOnOpen: true });

    focusTrigger();
    await user.keyboard("{ArrowUp}");
    const options = screen.getAllByRole("option");

    expect(options[options.length - 1]).toHaveAttribute(
      "data-has-focus",
      "true",
    );
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
      <PopoverMenu<HTMLButtonElement>
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

  it("PageUp moves the highlight up by a fixed number of items when enabled", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      enablePageNavigation: true,
      children: (
        <>
          {Array.from({ length: 14 }, (_, index) => (
            <MenuItem key={index} id={`item-${index + 1}`}>
              Item {index + 1}
            </MenuItem>
          ))}
        </>
      ),
    });

    focusTrigger();
    await user.keyboard("{End}");
    await user.keyboard("{PageUp}");
    const options = screen.getAllByRole("option");

    expect(options[3]).toHaveAttribute("data-has-focus", "true");
    expect(
      screen.getByRole("combobox", { name: "combobox-label" }),
    ).toHaveAttribute("aria-activedescendant", "item-4");
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

  it("PageDown moves the highlight down by a fixed number of items when enabled", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      enablePageNavigation: true,
      children: (
        <>
          {Array.from({ length: 14 }, (_, index) => (
            <MenuItem key={index} id={`item-${index + 1}`}>
              Item {index + 1}
            </MenuItem>
          ))}
        </>
      ),
    });

    focusTrigger();
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{PageDown}");
    const options = screen.getAllByRole("option");

    expect(options[10]).toHaveAttribute("data-has-focus", "true");
    expect(
      screen.getByRole("combobox", { name: "combobox-label" }),
    ).toHaveAttribute("aria-activedescendant", "item-11");
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

  it("closes the list when the user presses Tab", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    renderPopoverMenu({ open: true, onClose });

    focusTrigger();
    await user.keyboard("{Tab}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not confirm the highlighted item on Space by default", async () => {
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
    await user.keyboard(" ");

    expect(onItemClick).not.toHaveBeenCalled();
  });

  it("confirms the highlighted item on Space when selectOnSpaceAndTab is set", async () => {
    const user = userEvent.setup();
    const onItemClick = jest.fn();
    renderPopoverMenu({
      open: true,
      selectOnSpaceAndTab: true,
      children: (
        <>
          <MenuItem onClick={onItemClick}>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
        </>
      ),
    });

    focusTrigger();
    await user.keyboard("{ArrowDown}");
    await user.keyboard(" ");

    expect(onItemClick).toHaveBeenCalledTimes(1);
  });

  it("confirms the highlighted item and closes on Tab when selectOnSpaceAndTab is set", async () => {
    const user = userEvent.setup();
    const onItemClick = jest.fn();
    const onClose = jest.fn();
    renderPopoverMenu({
      open: true,
      selectOnSpaceAndTab: true,
      onClose,
      children: (
        <>
          <MenuItem onClick={onItemClick}>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
        </>
      ),
    });

    focusTrigger();
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Tab}");

    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalled();
  });

  it("preserves virtualised item keys and explicit ids when reordered", () => {
    const VirtualizedMenu = ({ reversed = false }) => {
      const items = [
        <MenuItem key="alpha" id="alpha-id">
          Alpha
        </MenuItem>,
        <MenuItem key="beta" id="beta-id">
          Beta
        </MenuItem>,
      ];

      return (
        <PopoverMenu
          open
          enableVirtualScroll
          initialScrollIndex={1}
          onClose={() => {}}
          popoverControl={popoverControlInput}
        >
          {reversed ? items.reverse() : items}
        </PopoverMenu>
      );
    };

    const { rerender } = render(<VirtualizedMenu />);
    const alphaKey = mockVirtualizerOptions.getItemKey?.(0);

    expect(screen.getByRole("option", { name: "Alpha" })).toHaveAttribute(
      "id",
      "alpha-id",
    );

    rerender(<VirtualizedMenu reversed />);

    expect(mockVirtualizerOptions.getItemKey?.(1)).toBe(alphaKey);
    expect(screen.getByRole("option", { name: "Alpha" })).toHaveAttribute(
      "id",
      "alpha-id",
    );
  });

  it("generates an id for a virtualised item with a key but no id", () => {
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      children: <MenuItem key="alpha">Alpha</MenuItem>,
    });

    expect(screen.getByRole("option", { name: "Alpha" }).id).toContain(
      "-option-",
    );
    expect(mockVirtualizerOptions.getItemKey?.(0)).toBeDefined();
  });

  it("scrolls to the initial virtualised item after the list is mounted", async () => {
    mockScrollToIndex.mockClear();
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      initialScrollIndex: 1,
      children: (
        <>
          <MenuItem id="item-1">Item 1</MenuItem>
          <MenuItem id="item-2">Item 2</MenuItem>
        </>
      ),
    });

    await waitFor(() => {
      expect(mockScrollToIndex).toHaveBeenCalledWith(1, { align: "center" });
    });
  });

  it("clears cached virtual item measurements when the list closes", () => {
    mockMeasureVirtualItems.mockClear();
    const { rerender } = renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      initialScrollIndex: 1,
      children: (
        <>
          <MenuItem id="item-1">Item 1</MenuItem>
          <MenuItem id="item-2">Item 2</MenuItem>
        </>
      ),
    });

    rerender(
      <PopoverMenu
        open={false}
        onClose={() => {}}
        enableVirtualScroll
        initialScrollIndex={1}
        popoverControl={popoverControlInput}
      >
        <MenuItem id="item-1">Item 1</MenuItem>
        <MenuItem id="item-2">Item 2</MenuItem>
      </PopoverMenu>,
    );

    expect(mockMeasureVirtualItems).toHaveBeenCalledTimes(1);
  });

  it("navigates and confirms virtualised menu items", async () => {
    const user = userEvent.setup();
    const onItemClick = jest.fn();
    const onClose = jest.fn();
    mockMeasureElement.mockClear();
    renderPopoverMenu({
      open: true,
      onClose,
      enableVirtualScroll: true,
      initialScrollIndex: 2,
      enablePageNavigation: true,
      selectOnSpaceAndTab: true,
      children: Array.from({ length: 12 }, (_, index) => (
        <MenuItem
          key={`item-${index + 1}`}
          id={`item-${index + 1}`}
          onClick={index === 1 ? onItemClick : undefined}
        >
          <MenuItemLabel>Item {index + 1}</MenuItemLabel>
          {index === 2 && <MenuItemSubtext>Additional detail</MenuItemSubtext>}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();

    expect(mockVirtualizerOptions.getScrollElement?.()).toBe(
      screen.getByRole("listbox"),
    );
    expect(mockVirtualizerOptions.estimateSize?.()).toBe(40);
    screen.getAllByRole("option").forEach((option) => {
      expect(mockMeasureElement).toHaveBeenCalledWith(option);
    });

    expect(screen.getByTestId("virtual-scroll-spacer")).toBeVisible();

    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", "item-3");

    await user.keyboard("{PageDown}");
    await user.keyboard("{PageUp}");
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    await user.keyboard("{Tab}");

    expect(onItemClick).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("skips disabled items during virtual keyboard navigation", async () => {
    const user = userEvent.setup();
    const onEnabledClick = jest.fn();
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      initialScrollIndex: 2,
      children: (
        <>
          <MenuItem id="disabled-first" disabled>
            Disabled first
          </MenuItem>
          <MenuItem id="enabled-first" onClick={onEnabledClick}>
            Enabled first
          </MenuItem>
          <MenuItem id="disabled-selected" aria-disabled="true">
            Disabled selected
          </MenuItem>
          <MenuItem id="enabled-last">Enabled last</MenuItem>
        </>
      ),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();

    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", "enabled-first");

    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", "enabled-last");

    await user.keyboard("{Home}{Enter}");
    expect(onEnabledClick).toHaveBeenCalledTimes(1);

    await user.keyboard("{ArrowUp}");
    expect(input).toHaveAttribute("aria-activedescendant", "enabled-last");

    await user.keyboard("{End}{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", "enabled-first");
  });

  it("applies virtual page navigation to enabled items only", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      enablePageNavigation: true,
      children: Array.from({ length: 25 }, (_, index) => (
        <MenuItem
          key={`page-item-${index + 1}`}
          id={`page-item-${index + 1}`}
          disabled={index % 2 === 1}
        >
          Item {index + 1}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();

    await user.keyboard("{PageDown}");
    expect(input).toHaveAttribute("aria-activedescendant", "page-item-21");

    await user.keyboard("{PageUp}");
    expect(input).toHaveAttribute("aria-activedescendant", "page-item-1");
  });

  it("navigates a virtualised menu from its bounds without looping", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      disableNavigationLoop: true,
      enablePageNavigation: true,
      children: Array.from({ length: 12 }, (_, index) => (
        <MenuItem key={`item-${index + 1}`} id={`item-${index + 1}`}>
          Item {index + 1}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();

    await user.keyboard("{ArrowUp}");
    expect(input).toHaveAttribute("aria-activedescendant", "item-12");

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Home}");
    await user.keyboard("{PageUp}");
    expect(input).toHaveAttribute("aria-activedescendant", "item-1");

    await user.keyboard("{End}");
    await user.keyboard("{PageDown}");
    expect(input).toHaveAttribute("aria-activedescendant", "item-12");
  });

  it("resets the virtualised menu active option when it closes", async () => {
    const user = userEvent.setup();
    const { rerender } = renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      children: Array.from({ length: 2 }, (_, index) => (
        <MenuItem key={`item-${index + 1}`} id={`item-${index + 1}`}>
          Item {index + 1}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{ArrowDown}");

    rerender(
      <PopoverMenu
        open={false}
        onClose={() => {}}
        enableVirtualScroll
        popoverControl={popoverControlInput}
      >
        <MenuItem id="item-1">Item 1</MenuItem>
        <MenuItem id="item-2">Item 2</MenuItem>
      </PopoverMenu>,
    );

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not move the virtualised highlight with page keys when page navigation is disabled", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      children: Array.from({ length: 12 }, (_, index) => (
        <MenuItem key={`item-${index + 1}`} id={`item-${index + 1}`}>
          Item {index + 1}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{PageDown}");
    await user.keyboard("{PageUp}");

    expect(input).toHaveAttribute("aria-activedescendant", "item-1");
  });

  it("uses virtual navigation fallbacks without an initial selection", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      enablePageNavigation: true,
      selectOnSpaceAndTab: true,
      children: Array.from({ length: 2 }, (_, index) => (
        <MenuItem key={`item-${index + 1}`} id={`item-${index + 1}`}>
          Item {index + 1}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{PageUp}");
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    await user.keyboard("{ArrowUp}");
    await user.keyboard("{ArrowDown}");

    expect(input).toHaveAttribute("aria-activedescendant", "item-1");
  });

  it("handles virtual page keys and navigation without an active option", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      enablePageNavigation: true,
      children: Array.from({ length: 12 }, (_, index) => (
        <MenuItem key={`item-${index + 1}`} id={`item-${index + 1}`}>
          Item {index + 1}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{PageDown}");
    await user.keyboard("{PageUp}");
    await user.keyboard(" ");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowUp}");

    expect(input).toHaveAttribute("aria-activedescendant", "item-1");
  });

  it("does not loop the highlight when ArrowDown reaches the last option with looping disabled", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      disableNavigationLoop: true,
      children: (
        <>
          <MenuItem id="dl-1">Item 1</MenuItem>
          <MenuItem id="dl-2">Item 2</MenuItem>
        </>
      ),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");

    expect(input).toHaveAttribute("aria-activedescendant", "dl-2");
  });

  it("does not loop the highlight when ArrowUp reaches the first option with looping disabled", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      disableNavigationLoop: true,
      children: (
        <>
          <MenuItem id="ul-1">Item 1</MenuItem>
          <MenuItem id="ul-2">Item 2</MenuItem>
        </>
      ),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{ArrowUp}");
    await user.keyboard("{ArrowUp}");
    await user.keyboard("{ArrowUp}");

    expect(input).toHaveAttribute("aria-activedescendant", "ul-1");
  });

  it("uses the selected option as the PageDown base when nothing is highlighted", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      enablePageNavigation: true,
      children: Array.from({ length: 15 }, (_, index) => (
        <MenuItem
          key={`pgs-${index}`}
          id={`pgs-${index}`}
          selected={index === 3}
        >
          Item {index}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{PageDown}");

    expect(input).toHaveAttribute("aria-activedescendant", "pgs-13");
  });

  it("uses the first option as the PageDown base when nothing is highlighted or selected", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      enablePageNavigation: true,
      children: Array.from({ length: 15 }, (_, index) => (
        <MenuItem key={`pgn-${index}`} id={`pgn-${index}`}>
          Item {index}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{PageDown}");

    expect(input).toHaveAttribute("aria-activedescendant", "pgn-10");
  });

  it("uses the last option as the PageUp base when nothing is highlighted or selected", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      enablePageNavigation: true,
      children: Array.from({ length: 15 }, (_, index) => (
        <MenuItem key={`pgu-${index}`} id={`pgu-${index}`}>
          Item {index}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{PageUp}");

    expect(input).toHaveAttribute("aria-activedescendant", "pgu-4");
  });

  it("closes on Tab without confirming when no option is highlighted and selectOnSpaceAndTab is set", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const onItemClick = jest.fn();
    renderPopoverMenu({
      open: true,
      selectOnSpaceAndTab: true,
      onClose,
      children: (
        <>
          <MenuItem onClick={onItemClick}>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
        </>
      ),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{Tab}");

    expect(onItemClick).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("returns a null scroll element from the virtualizer when the menu is closed", () => {
    renderPopoverMenu({
      open: false,
      enableVirtualScroll: true,
      children: Array.from({ length: 2 }, (_, index) => (
        <MenuItem key={`item-${index + 1}`} id={`item-${index + 1}`}>
          Item {index + 1}
        </MenuItem>
      )),
    });

    expect(mockVirtualizerOptions.getScrollElement?.()).toBeNull();
  });

  it("renders the empty listbox when the menu has no children", () => {
    render(
      <PopoverMenu open onClose={() => {}} popoverControl={popoverControlInput}>
        {null}
      </PopoverMenu>,
    );

    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("moves the virtualised highlight up from an active option when looping is enabled", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      initialScrollIndex: 3,
      children: Array.from({ length: 5 }, (_, index) => (
        <MenuItem key={`item-${index + 1}`} id={`item-${index + 1}`}>
          Item {index + 1}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowUp}");
    await user.keyboard("{ArrowUp}");

    expect(input).toHaveAttribute("aria-activedescendant", "item-2");
  });

  it("moves the virtualised highlight up from an active option when looping is disabled", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      disableNavigationLoop: true,
      children: Array.from({ length: 5 }, (_, index) => (
        <MenuItem key={`item-${index + 1}`} id={`item-${index + 1}`}>
          Item {index + 1}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{End}");
    await user.keyboard("{ArrowUp}");
    await user.keyboard("{ArrowUp}");

    expect(input).toHaveAttribute("aria-activedescendant", "item-3");
  });

  it("moves the virtualised highlight from PageUp without an active option", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      enablePageNavigation: true,
      initialScrollIndex: 6,
      children: Array.from({ length: 12 }, (_, index) => (
        <MenuItem key={`item-${index + 1}`} id={`item-${index + 1}`}>
          Item {index + 1}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{PageUp}");

    expect(input).toHaveAttribute("aria-activedescendant", "item-1");
  });

  it("closes on Tab when selectOnSpaceAndTab is not set", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      onClose,
      children: Array.from({ length: 3 }, (_, index) => (
        <MenuItem key={`item-${index + 1}`} id={`item-${index + 1}`}>
          Item {index + 1}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Tab}");

    expect(onClose).toHaveBeenCalled();
  });

  it("closes on Tab when selectOnSpaceAndTab is set but no option is active", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      selectOnSpaceAndTab: true,
      onClose,
      children: Array.from({ length: 3 }, (_, index) => (
        <MenuItem key={`item-${index + 1}`} id={`item-${index + 1}`}>
          Item {index + 1}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{Tab}");

    expect(onClose).toHaveBeenCalled();
  });

  it("moves the virtualised highlight to the initial scroll index on ArrowUp without an active option", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      initialScrollIndex: 3,
      children: Array.from({ length: 6 }, (_, index) => (
        <MenuItem key={`item-${index + 1}`} id={`item-${index + 1}`}>
          Item {index + 1}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{ArrowUp}");

    expect(input).toHaveAttribute("aria-activedescendant", "item-4");
  });

  it("does not close when focus enters content outside the control by default", () => {
    const onClose = jest.fn();
    render(
      <>
        <PopoverMenu
          open
          onClose={onClose}
          popoverControl={popoverControlInput}
        >
          <MenuItem>Item 1</MenuItem>
        </PopoverMenu>
        <button type="button">Outside</button>
      </>,
    );

    screen.getByRole("button", { name: "Outside" }).focus();

    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes when focus leaves the control", () => {
    const onClose = jest.fn();
    render(
      <>
        <PopoverMenu
          open
          onClose={onClose}
          closeOnFocusOut
          popoverControl={popoverControlInput}
        >
          <MenuItem>Item 1</MenuItem>
        </PopoverMenu>
        <button type="button">Outside</button>
      </>,
    );

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    screen.getByRole("button", { name: "Outside" }).focus();

    expect(onClose).toHaveBeenCalled();
  });
});

describe("PopoverMenu - button menu", () => {
  it("passes aria-haspopup='true' to the popoverControl button", () => {
    renderPopoverMenu<HTMLButtonElement>({
      isButtonMenu: true,
      popoverControl: popoverControlButton,
    });

    expect(
      screen.getByRole("button", { name: "Button label" }),
    ).toHaveAttribute("aria-haspopup", "true");
  });

  it("passes aria-expanded='false' when closed to the popoverControl button", () => {
    renderPopoverMenu<HTMLButtonElement>({
      isButtonMenu: true,
      popoverControl: popoverControlButton,
      open: false,
      children: buttonChildren,
    });

    expect(
      screen.getByRole("button", { name: "Button label" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("passes aria-expanded='true' when open to the popoverControl button", () => {
    renderPopoverMenu<HTMLButtonElement>({
      isButtonMenu: true,
      popoverControl: popoverControlButton,
      open: true,
      children: buttonChildren,
    });

    expect(
      screen.getByRole("button", { name: "Button label" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("passes aria-controls referencing the list id when open to the popoverControl button", () => {
    renderPopoverMenu<HTMLButtonElement>({
      isButtonMenu: true,
      popoverControl: popoverControlButton,
      open: true,
      id: "foo",
      children: buttonChildren,
    });

    const button = screen.getByRole("button", { name: "Button label" });

    expect(button).toHaveAttribute("aria-controls", "foo");
  });

  it("renders the items with role='listitem' when isButtonMenu is true", () => {
    renderPopoverMenu<HTMLButtonElement>({
      isButtonMenu: true,
      popoverControl: popoverControlButton,
      open: true,
      children: buttonChildren,
    });

    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(3);
  });

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
    ["ArrowDown", "{ArrowDown}"],
  ])(
    "focuses the first non-disabled item when the the list is opened by the user pressing %s on the popover control",
    async (_, key) => {
      const user = userEvent.setup();
      render(
        <PopoverMenuWithState<HTMLButtonElement>
          isButtonMenu
          popoverControl={popoverControlButton}
        >
          <Button disabled>Item 1</Button>
          <Button href="#" disabled>
            Item 2
          </Button>
          <Button>Item 3</Button>
          <Button>Item 4</Button>
        </PopoverMenuWithState>,
      );

      focusTrigger("button");
      await user.keyboard(key);

      await waitFor(() =>
        expect(screen.getByRole("button", { name: "Item 3" })).toHaveFocus(),
      );
    },
  );

  it("focuses the last non-disabled item when the the list is opened by the user pressing ArrowUp", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
      >
        <Button>Item 1</Button>
        <Button>Item 2</Button>
        <Button disabled>Item 3</Button>
        <Button href="#" disabled>
          Item 4
        </Button>
      </PopoverMenuWithState>,
    );

    focusTrigger("button");
    await user.keyboard("{ArrowUp}");

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Item 2" })).toHaveFocus(),
    );
  });

  it("does not loop the focus when the user presses ArrowDown on the last item", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
      >
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

    expect(screen.getByRole("button", { name: "Item 3" })).toHaveFocus();
  });

  it("does not loop the focus when the user presses ArrowUp on the first item", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
      >
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

    expect(screen.getByRole("button", { name: "Item 1" })).toHaveFocus();
  });

  it("displays a submenu when the user clicks on an item that has one", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));
    await user.click(screen.getByRole("button", { name: "Item 2" }));

    expect(screen.getByRole("button", { name: "Subitem 1" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Subitem 2" })).toBeVisible();
  });

  it("does not display a submenu when the user clicks on a disabled item that has one", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
        disabledItems={[1]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));
    await user.click(screen.getByRole("button", { name: "Item 2" }));

    expect(
      screen.queryByRole("button", { name: "Subitem 1" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Subitem 2" }),
    ).not.toBeInTheDocument();
  });

  it("displays a submenu when one is passed to an item and the user presses Enter whilst it is focused", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Item 1" })).toHaveFocus(),
    );

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    expect(screen.getByRole("button", { name: "Subitem 1" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Subitem 2" })).toBeVisible();
  });

  it("displays a submenu when one is passed to an item and the user presses ArrowRight whilst it is focused", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Item 1" })).toHaveFocus(),
    );

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("button", { name: "Subitem 1" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Subitem 2" })).toBeVisible();
  });

  it("does not loop focus to the first item within the submenu when the user presses ArrowDown", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Item 1" })).toHaveFocus(),
    );

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("button", { name: "Subitem 1" })).toHaveFocus();

    await user.keyboard("{ArrowDown}");

    expect(screen.getByRole("button", { name: "Subitem 2" })).toHaveFocus();

    await user.keyboard("{ArrowDown}");

    expect(screen.getByRole("button", { name: "Subitem 2" })).toHaveFocus();
  });

  it("does not loop focus to the last item within the submenu when the user presses ArrowUp", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Item 1" })).toHaveFocus(),
    );

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("button", { name: "Subitem 1" })).toHaveFocus();

    await user.keyboard("{ArrowUp}");

    expect(screen.getByRole("button", { name: "Subitem 1" })).toHaveFocus();
  });

  it("focuses the first item within the submenu when the user presses Home", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Item 1" })).toHaveFocus(),
    );

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("button", { name: "Subitem 1" })).toHaveFocus();

    await user.keyboard("{ArrowDown}");

    expect(screen.getByRole("button", { name: "Subitem 2" })).toHaveFocus();

    await user.keyboard("{Home}");

    expect(screen.getByRole("button", { name: "Subitem 1" })).toHaveFocus();
  });

  it("focuses the last item within the submenu when the user presses End", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Item 1" })).toHaveFocus(),
    );

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("button", { name: "Subitem 1" })).toHaveFocus();

    await user.keyboard("{End}");

    expect(screen.getByRole("button", { name: "Subitem 2" })).toHaveFocus();
  });

  it("focuses the parent item of the submenu when the user presses ArrowLeft when focus is within the submenu", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Item 1" })).toHaveFocus(),
    );

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("button", { name: "Subitem 1" })).toHaveFocus();

    await user.keyboard("{ArrowLeft}");

    expect(screen.getByRole("button", { name: "Item 2" })).toHaveFocus();
  });

  it("closes the open menu and submenu when the user clicks outside of the menu", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));
    await user.click(screen.getByRole("button", { name: "Item 2" }));

    expect(screen.getByRole("button", { name: "Subitem 1" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Subitem 2" })).toBeVisible();

    await user.click(document.body);

    expect(
      screen.queryByRole("button", { name: "Subitem 1" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Subitem 2" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Item 1" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Item 2" }),
    ).not.toBeInTheDocument();
  });

  it("closes the open submenu but not the main menu when the user presses Escape", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));
    await user.click(screen.getByRole("button", { name: "Item 2" }));

    expect(screen.getByRole("button", { name: "Subitem 1" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Subitem 2" })).toBeVisible();

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("button", { name: "Subitem 1" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Subitem 2" }),
    ).not.toBeInTheDocument();

    screen.getAllByRole("button").forEach((item) => {
      expect(item).toBeVisible();
    });
  });

  it("does not display a submenu when the child of a submenu item has a child with disabled attribute", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
        applyDisabledButton="disabled"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));
    await user.click(screen.getByRole("button", { name: "Item 2" }));

    expect(
      screen.queryByRole("button", { name: "Subitem 1" }),
    ).not.toBeInTheDocument();
  });

  it("does not display a submenu when the child of a submenu item has a child with aria-disabled=true attribute", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
        applyDisabledButton="aria-disabled-bool"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));
    await user.click(screen.getByRole("button", { name: "Item 2" }));

    expect(
      screen.queryByRole("button", { name: "Subitem 1" }),
    ).not.toBeInTheDocument();
  });

  it("does not display a submenu when the child of a submenu item has a child with aria-disabled='true' attribute", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
        applyDisabledButton="aria-disabled-string"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));
    await user.click(screen.getByRole("button", { name: "Item 2" }));

    expect(
      screen.queryByRole("button", { name: "Subitem 1" }),
    ).not.toBeInTheDocument();
  });

  it("moves focus back to the submenu first item when the user presses ArrowRight from the parent and the submenu is open", async () => {
    const user = userEvent.setup();
    render(
      <PopoverMenuWithState<HTMLButtonElement>
        isButtonMenu
        popoverControl={popoverControlButton}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Button label" }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Item 1" })).toHaveFocus(),
    );

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    expect(screen.getByRole("button", { name: "Subitem 1" })).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Item 2" }));

    expect(screen.getByRole("button", { name: "Item 2" })).toHaveFocus();

    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("button", { name: "Subitem 1" })).toHaveFocus();
  });
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

test("menu width matches the controlReference element width", async () => {
  const rectSpy = jest
    .spyOn(HTMLElement.prototype, "getBoundingClientRect")
    .mockImplementation(function (this: HTMLElement) {
      if (this.getAttribute("data-role") === "input-container") {
        return createRect(320);
      }

      if (this.getAttribute("data-component") === "popover-menu-control") {
        return createRect(640);
      }

      return createRect(120);
    });

  const MenuWithReferenceSelector = () => {
    const [open, setOpen] = React.useState(false);
    const controlReference = React.useRef<HTMLDivElement>(null);

    return (
      <PopoverMenu<HTMLInputElement>
        open={open}
        onOpen={() => {}}
        onClose={() => setOpen(false)}
        controlReference={controlReference}
        popoverControl={(ref, controlProps) => (
          <div>
            <div
              data-role="input-container"
              data-testid="input-container"
              ref={controlReference}
            >
              <input
                aria-label="combobox-label"
                ref={ref}
                {...controlProps}
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        )}
      >
        <MenuItem>Option 1</MenuItem>
      </PopoverMenu>
    );
  };

  render(<MenuWithReferenceSelector />);

  await userEvent.click(
    screen.getByRole("combobox", { name: "combobox-label" }),
  );

  await waitFor(() => {
    expect(screen.getByTestId("menu-wrapper")).toHaveStyle("width: 320px");
  });

  rectSpy.mockRestore();
});

test("menu width falls back to control wrapper width when controlReference is not provided", async () => {
  const rectSpy = jest
    .spyOn(HTMLElement.prototype, "getBoundingClientRect")
    .mockImplementation(function (this: HTMLElement) {
      if (this.getAttribute("data-role") === "input-container") {
        return createRect(320);
      }

      if (this.getAttribute("data-component") === "popover-menu-control") {
        return createRect(640);
      }

      return createRect(120);
    });

  const MenuWithReferenceFallback = () => {
    const [open, setOpen] = React.useState(false);

    return (
      <PopoverMenu<HTMLInputElement>
        open={open}
        onOpen={() => {}}
        onClose={() => setOpen(false)}
        popoverControl={(ref, controlProps) => (
          <div>
            <div data-role="input-container" data-testid="input-container">
              <input
                aria-label="combobox-label"
                ref={ref}
                {...controlProps}
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        )}
      >
        <MenuItem>Option 1</MenuItem>
      </PopoverMenu>
    );
  };

  render(<MenuWithReferenceFallback />);

  await userEvent.click(
    screen.getByRole("combobox", { name: "combobox-label" }),
  );

  await waitFor(() => {
    expect(screen.getByTestId("menu-wrapper")).toHaveStyle("width: 640px");
  });

  rectSpy.mockRestore();
});
