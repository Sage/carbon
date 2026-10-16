import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PopoverMenu, {
  FocusableHandle,
  PopoverMenuProps,
} from "./popover-menu.component";
import { MenuItem } from "./menu-item";
import { PopoverControlProps } from "./contexts";

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

  it("renders the empty listbox when the menu has no children", () => {
    render(
      <PopoverMenu open onClose={() => {}} popoverControl={popoverControlInput}>
        {null}
      </PopoverMenu>,
    );

    expect(screen.getByRole("listbox")).toBeInTheDocument();
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
