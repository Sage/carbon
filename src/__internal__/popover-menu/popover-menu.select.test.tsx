import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Virtualizer } from "@tanstack/react-virtual";
import PopoverMenu, {
  FocusableHandle,
  PopoverMenuProps,
} from "./popover-menu.component";
import {
  MenuItem,
  MenuItemDivider,
  MenuItemLabel,
  MenuItemSubtext,
} from "./menu-item";
import { PopoverControlProps } from "./contexts";

let mockVirtualizerOptions: {
  count?: number;
  getScrollElement?: () => Element | null;
  estimateSize?: () => number;
  getItemKey?: (index: number) => React.Key;
  measureElement?: (
    element: HTMLElement,
    entry: ResizeObserverEntry | undefined,
    instance: Virtualizer<HTMLElement, HTMLElement>,
  ) => number;
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
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const popoverControlInput = (
  ref: React.RefObject<HTMLInputElement>,
  props: AdditionalControlProps,
) => <input aria-label="combobox-label" {...props} ref={ref} />;

const renderPopoverMenu = <TRef extends FocusableHandle = HTMLElement>({
  open = false,
  children,
  onOpen = () => {},
  onClose = () => {},
  popoverControl = popoverControlInput as unknown as PopoverMenuProps<TRef>["popoverControl"],
  ...props
}: Partial<PopoverMenuProps<TRef>> = {}) =>
  render(
    <PopoverMenu<TRef>
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      popoverControl={(ref, controlProps) =>
        popoverControl(ref, {
          ...controlProps,
          onKeyDown: (event) => {
            if (event.key === "Enter") onOpen();
          },
        } as AdditionalControlProps)
      }
      {...props}
    >
      {children}
    </PopoverMenu>,
  );

describe("PopoverMenu - Select extensions", () => {
  it("does not activate a selected disabled option in a virtualised menu", () => {
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      highlightSelectedOption: true,
      children: (
        <MenuItem selected disabled>
          Item 1
        </MenuItem>
      ),
    });

    expect(screen.getByRole("combobox")).not.toHaveAttribute(
      "aria-activedescendant",
    );
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

  it("describes each virtualised item's position in the complete option set", () => {
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      initialScrollIndex: 7,
      children: Array.from({ length: 12 }, (_, index) => (
        <MenuItem key={`item-${index + 1}`}>Item {index + 1}</MenuItem>
      )),
    });

    expect(screen.getAllByRole("option")).toHaveLength(2);
    expect(screen.getByRole("option", { name: "Item 1" })).toHaveAttribute(
      "aria-setsize",
      "12",
    );
    expect(screen.getByRole("option", { name: "Item 1" })).toHaveAttribute(
      "aria-posinset",
      "1",
    );
    expect(screen.getByRole("option", { name: "Item 8" })).toHaveAttribute(
      "aria-setsize",
      "12",
    );
    expect(screen.getByRole("option", { name: "Item 8" })).toHaveAttribute(
      "aria-posinset",
      "8",
    );
  });

  it("virtualises rows containing an option and non-interactive content", async () => {
    const user = userEvent.setup();
    const onItem1Click = jest.fn();
    const onItem2Click = jest.fn();
    const VirtualRow = React.forwardRef<
      HTMLLIElement,
      React.LiHTMLAttributes<HTMLLIElement>
    >(({ children, ...props }, ref) => (
      <li ref={ref} {...props}>
        <ul role="presentation">{children}</ul>
      </li>
    ));

    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      children: [
        <VirtualRow key="row-1" data-virtual-menu-row="true">
          <MenuItem onClick={onItem1Click}>Item 1</MenuItem>
          <MenuItemDivider />
          Non-interactive row content
        </VirtualRow>,
        <VirtualRow key="row-2" data-virtual-menu-row="true">
          <MenuItem onClick={onItem2Click}>Item 2</MenuItem>
          <MenuItemDivider />
        </VirtualRow>,
      ],
    });

    const input = screen.getByRole("combobox");
    input.focus();
    await user.keyboard("{End}");

    const secondOption = screen.getByRole("option", { name: "Item 2" });

    expect(secondOption).toHaveAttribute("aria-setsize", "2");
    expect(secondOption).toHaveAttribute("aria-posinset", "2");

    await user.keyboard("{Enter}");

    expect(secondOption).toHaveAttribute("data-has-focus", "true");
    expect(onItem1Click).not.toHaveBeenCalled();
    expect(onItem2Click).toHaveBeenCalledTimes(1);
  });

  it("preserves consumer styles without overriding virtual positioning", () => {
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      children: (
        <MenuItem
          key="item-1"
          style={{
            color: "red",
            position: "relative",
            top: 12,
            transform: "scale(2)",
          }}
        >
          Item 1
        </MenuItem>
      ),
    });

    expect(screen.getByRole("option", { name: "Item 1" })).toHaveStyle({
      color: "rgb(255, 0, 0)",
      position: "absolute",
      top: "0px",
      width: "100%",
      transform: "translateY(0px)",
    });
  });

  it("keeps virtualised selection, active state and confirmation synchronized", async () => {
    const user = userEvent.setup();
    const onItem1Click = jest.fn();
    const onItem2Click = jest.fn();
    const onItem3Click = jest.fn();
    const menu = (selectedItem: number) => (
      <PopoverMenu
        open
        onClose={() => {}}
        popoverControl={popoverControlInput}
        enableVirtualScroll
        highlightSelectedOption
      >
        <MenuItem
          id="item-1"
          selected={selectedItem === 1}
          onClick={onItem1Click}
        >
          Item 1
        </MenuItem>
        <MenuItem
          id="item-2"
          selected={selectedItem === 2}
          onClick={onItem2Click}
        >
          Item 2
        </MenuItem>
        <MenuItem
          id="item-3"
          selected={selectedItem === 3}
          onClick={onItem3Click}
        >
          Item 3
        </MenuItem>
      </PopoverMenu>
    );
    const { rerender } = render(menu(1));
    const input = screen.getByRole("combobox");
    input.focus();

    await waitFor(() =>
      expect(input).toHaveAttribute("aria-activedescendant", "item-1"),
    );
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", "item-2");

    rerender(menu(3));
    await waitFor(() =>
      expect(input).toHaveAttribute("aria-activedescendant", "item-3"),
    );
    expect(screen.getByRole("option", { name: "Item 3" })).toHaveAttribute(
      "data-has-focus",
      "true",
    );

    await user.keyboard("{Enter}");
    expect(onItem3Click).toHaveBeenCalledTimes(1);
    expect(onItem1Click).not.toHaveBeenCalled();
    expect(onItem2Click).not.toHaveBeenCalled();
  });

  it.each([
    ["the loading state changes", "loading"],
    ["options are appended", "options"],
  ])(
    "preserves the active virtualised option when %s",
    async (_description, update) => {
      const user = userEvent.setup();
      const onItem1Click = jest.fn();
      const onItem2Click = jest.fn();
      const menu = (applyUpdate = false) => (
        <PopoverMenu
          open
          onClose={() => {}}
          popoverControl={popoverControlInput}
          enableVirtualScroll
          highlightSelectedOption
        >
          <MenuItem id="item-1" selected onClick={onItem1Click}>
            Item 1
          </MenuItem>
          <MenuItem id="item-2" onClick={onItem2Click}>
            Item 2
          </MenuItem>
          {applyUpdate && update === "loading" && (
            <MenuItem id="loader" disabled>
              Loading
            </MenuItem>
          )}
          {applyUpdate && update === "options" && (
            <MenuItem id="item-3">Item 3</MenuItem>
          )}
        </PopoverMenu>
      );
      const { rerender } = render(menu());
      const input = screen.getByRole("combobox");
      input.focus();

      await waitFor(() =>
        expect(input).toHaveAttribute("aria-activedescendant", "item-1"),
      );
      await user.keyboard("{ArrowDown}");
      expect(input).toHaveAttribute("aria-activedescendant", "item-2");

      rerender(menu(true));

      expect(input).toHaveAttribute("aria-activedescendant", "item-2");
      await user.keyboard("{Enter}");
      expect(onItem2Click).toHaveBeenCalledTimes(1);
      expect(onItem1Click).not.toHaveBeenCalled();
    },
  );

  it("clears the active virtualised option when it becomes disabled", async () => {
    const user = userEvent.setup();
    const onItem2Click = jest.fn();
    const menu = (disableItem2 = false) => (
      <PopoverMenu
        open
        onClose={() => {}}
        popoverControl={popoverControlInput}
        enableVirtualScroll
        highlightSelectedOption
      >
        <MenuItem id="item-1" selected>
          Item 1
        </MenuItem>
        <MenuItem id="item-2" disabled={disableItem2} onClick={onItem2Click}>
          Item 2
        </MenuItem>
      </PopoverMenu>
    );
    const { rerender } = render(menu());
    const input = screen.getByRole("combobox");
    input.focus();

    await waitFor(() =>
      expect(input).toHaveAttribute("aria-activedescendant", "item-1"),
    );
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", "item-2");

    rerender(menu(true));

    await waitFor(() =>
      expect(input).not.toHaveAttribute("aria-activedescendant"),
    );
    await user.keyboard("{Enter}");
    expect(onItem2Click).not.toHaveBeenCalled();
  });

  it("measures virtualised items after layout and reuses cached sizes before layout", () => {
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      children: <MenuItem key="alpha">Alpha</MenuItem>,
    });

    const element = screen.getByRole("option");
    const instance = {
      getVirtualItems: () => [{ index: 0, size: 48 }],
      options: { horizontal: false },
    } as unknown as Virtualizer<HTMLElement, HTMLElement>;
    const resizeEntry = {
      borderBoxSize: [{ blockSize: 52 }],
    } as unknown as ResizeObserverEntry;

    expect(
      mockVirtualizerOptions.measureElement?.(element, resizeEntry, instance),
    ).toBe(52);
    expect(
      mockVirtualizerOptions.measureElement?.(element, undefined, instance),
    ).toBe(48);

    element.setAttribute("data-index", "1");
    expect(
      mockVirtualizerOptions.measureElement?.(element, undefined, instance),
    ).toBe(40);
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

  it("loops a virtualised menu and clamps page navigation at its bounds", async () => {
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

    await user.keyboard("{ArrowUp}");
    expect(input).toHaveAttribute("aria-activedescendant", "item-12");

    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", "item-1");
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", "item-2");
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

  it("loops the highlight when ArrowDown reaches the last option", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
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

    expect(input).toHaveAttribute("aria-activedescendant", "dl-1");
  });

  it("loops the highlight when ArrowUp reaches the first option", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
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

    expect(input).toHaveAttribute("aria-activedescendant", "ul-2");
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

  it("loops the virtualised highlight at both ends", async () => {
    const user = userEvent.setup();
    renderPopoverMenu({
      open: true,
      enableVirtualScroll: true,
      children: Array.from({ length: 5 }, (_, index) => (
        <MenuItem key={`item-${index + 1}`} id={`item-${index + 1}`}>
          Item {index + 1}
        </MenuItem>
      )),
    });

    const input = screen.getByRole("combobox", { name: "combobox-label" });
    input.focus();
    await user.keyboard("{Home}");
    await user.keyboard("{ArrowUp}");
    expect(input).toHaveAttribute("aria-activedescendant", "item-5");

    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", "item-1");
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
    const outside = screen.getByRole("button", { name: "Outside" });

    fireEvent.focusOut(outside, { relatedTarget: input });
    expect(onClose).not.toHaveBeenCalled();

    input.focus();
    outside.focus();

    expect(onClose).toHaveBeenCalled();
  });
});
