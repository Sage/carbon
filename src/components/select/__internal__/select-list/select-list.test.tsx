import React, { useRef, useState } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SelectList, { SelectListProps } from "./select-list.component";
import Option from "../../option";
import OptionRow from "../../option-row";
import setupSelectMocks from "../../setup-select-mocks";

beforeEach(() => {
  jest.useFakeTimers();
  setupSelectMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

const SelectListWithInput = ({
  children,
  onSelect,
  onSelectListClose,
  ...rest
}: Partial<SelectListProps>) => {
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <label htmlFor="textbox">
        Select an option
        <input type="textbox" ref={inputRef} id="textbox" name="textbox" />
      </label>
      <SelectList
        ref={ref}
        isOpen={open}
        anchorElement={inputRef.current as HTMLInputElement}
        onSelect={(ev) => {
          onSelect?.(ev);
        }}
        onSelectListClose={() => {
          onSelectListClose?.();
          setOpen(false);
        }}
        {...rest}
      >
        {children}
      </SelectList>
    </>
  );
};

describe("rendered content", () => {
  it("renders custom action button when listActionButton prop is provided", () => {
    render(
      <SelectListWithInput
        listActionButton={<button type="button">Click me</button>}
      >
        <Option id="red" value="red" text="red" />
      </SelectListWithInput>,
    );
    const button = screen.getByRole("button", { name: /Click me/i });
    expect(button).toBeVisible();
  });

  it("renders loading indicator when isLoading prop is true", () => {
    render(
      <SelectListWithInput isLoading>
        <Option id="red" value="red" text="red" />
      </SelectListWithInput>,
    );

    expect(screen.getByTestId("select-list-loader")).toBeVisible();
  });

  it("renders options in a table layout when multiColumn prop is true", () => {
    render(
      <SelectListWithInput multiColumn>
        <OptionRow id="dark-red" value="dark-red" text="dark red">
          <td>dark</td>
          <td>red</td>
        </OptionRow>
        <OptionRow id="light-blue" value="light-blue" text="light blue">
          <td>light</td>
          <td>blue</td>
        </OptionRow>
      </SelectListWithInput>,
    );

    const table = screen.getByRole("table");

    expect(table).toBeVisible();
    expect(
      within(table).getByRole("option", { name: /dark red/i }),
    ).toBeVisible();
    expect(
      within(table).getByRole("option", { name: /light blue/i }),
    ).toBeVisible();
  });

  it.each(["top", "bottom"] as const)(
    "computes correct position for list when listPlacement prop is %s",
    async (listPlacement) => {
      const { rerender } = render(
        <SelectListWithInput listPlacement={listPlacement}>
          <Option id="red" value="red" text="red" />
        </SelectListWithInput>,
      );
      rerender(
        <SelectListWithInput listPlacement={listPlacement}>
          <Option id="red" value="red" text="red" />
        </SelectListWithInput>,
      );
      const list = await screen.findByTestId("select-list-wrapper");

      await waitFor(() => {
        expect(list).toHaveAttribute("data-floating-placement", listPlacement);
      });
    },
  );

  it("highlights the correct selected option when highlightedValue prop is provided", () => {
    render(
      <SelectListWithInput highlightedValue="green">
        <Option id="red" value="red" text="red" />
        <Option id="green" value="green" text="green" />
      </SelectListWithInput>,
    );

    const greenOption = screen.getByRole("option", { name: /green/i });
    expect(greenOption).toHaveAttribute("aria-selected", "true");
    expect(greenOption).toHaveStyleRule(
      "background-color",
      "var(--colorsUtilityMajor200)",
    );
  });

  it("highlights the correct selected option when highlightedValue prop is provided and option has an object value", () => {
    render(
      <SelectListWithInput highlightedValue={{ id: "green", value: 2 }}>
        <Option id="red" value={{ id: "red", value: 1 }} text="red" />
        <Option id="green" value={{ id: "green", value: 2 }} text="green" />
      </SelectListWithInput>,
    );

    const greenOption = screen.getByRole("option", { name: /green/i });
    expect(greenOption).toHaveAttribute("aria-selected", "true");
    expect(greenOption).toHaveStyleRule(
      "background-color",
      "var(--colorsUtilityMajor200)",
    );
  });
});

test("sets its max height according to the listMaxHeight prop", () => {
  render(
    <SelectListWithInput listMaxHeight={100}>
      <Option id="red" value="red" text="red" />
    </SelectListWithInput>,
  );

  const scrollableArea = screen.getByTestId("select-list-scrollable-container");
  expect(scrollableArea).toHaveStyle("max-height: 100px");
});

describe("behaviour on option click", () => {
  it("calls onSelect to confirm selection when an option is clicked", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect}>
        <Option id="red" value="red" text="red" />
        <Option id="green" value="green" text="green" />
        <Option id="blue" value="blue" text="blue" />
      </SelectListWithInput>,
    );

    await user.click(screen.getByRole("option", { name: /red/i }));

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "red",
        selectionConfirmed: true,
        selectionType: "click",
      }),
    );
  });

  it("calls onSelect to confirm selection when an option row is clicked", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect} multiColumn>
        <OptionRow id="dark-red" value="dark-red" text="dark red">
          <td>dark</td>
          <td>red</td>
        </OptionRow>
        <OptionRow id="light-blue" value="light-blue" text="light blue">
          <td>light</td>
          <td>blue</td>
        </OptionRow>
      </SelectListWithInput>,
    );

    await user.click(screen.getByRole("option", { name: /dark red/i }));

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "dark-red",
        selectionConfirmed: true,
        selectionType: "click",
      }),
    );
  });

  it("calls onSelect to confirm selection when an option, with an object value, is clicked", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect}>
        <Option id="red" value={{ id: "red", value: 1 }} text="red" />
        <Option id="green" value={{ id: "green", value: 2 }} text="green" />
      </SelectListWithInput>,
    );

    await user.click(screen.getByRole("option", { name: /red/i }));

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: { id: "red", value: 1 },
        selectionConfirmed: true,
        selectionType: "click",
      }),
    );
  });

  it("does not call onSelect when an option, not defined with Option nor OptionRow, is clicked", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect}>
        <option value="apple">apple</option>
      </SelectListWithInput>,
    );

    const appleOption = screen.getByRole("option", { name: /apple/i });
    await user.click(appleOption);

    expect(onSelect).not.toHaveBeenCalled();
  });

  it("does not call onSelect when a disabled option is clicked", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect}>
        <Option id="red" value="red" text="red" disabled />
      </SelectListWithInput>,
    );

    const redOption = screen.getByRole("option", { name: /red/i });
    await user.click(redOption);

    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe("filtering options", () => {
  it("highlights first matching option when filterText prop is provided", () => {
    const onSelect = jest.fn();

    render(
      <SelectListWithInput onSelect={onSelect} filterText="g">
        <Option id="red" value="red" text="red" />
        <Option id="green" value="green" text="green" />
        <Option id="blue" value="blue" text="blue" />
      </SelectListWithInput>,
    );

    const greenOption = screen.getByRole("option", { name: /green/i });
    expect(greenOption).toHaveAttribute("aria-selected", "true");
    expect(greenOption).toHaveStyleRule(
      "background-color",
      "var(--colorsUtilityMajor200)",
    );
  });

  it("does not highlight any option when filterText prop is provided and none match", () => {
    const onSelect = jest.fn();
    render(
      <SelectListWithInput onSelect={onSelect} filterText="z">
        <Option id="red" value="red" text="red" />
        <Option id="green" value="green" text="green" />
        <Option id="blue" value="blue" text="blue" />
      </SelectListWithInput>,
    );

    expect(screen.getByRole("option", { name: /red/i })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    expect(screen.getByRole("option", { name: /green/i })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    expect(screen.getByRole("option", { name: /blue/i })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });
});

test("no error thrown when no options are passed but a highlightedValue is provided", () => {
  expect(() =>
    render(<SelectListWithInput highlightedValue="red" />),
  ).not.toThrow();
});

test("hides the selected option if it is the only list item and the list is loading.", () => {
  render(
    <SelectListWithInput highlightedValue="green" isLoading>
      <Option id="green" value="green" text="green" />
    </SelectListWithInput>,
  );

  const hiddenOption = screen.getByRole("option", {
    hidden: true,
  });
  expect(hiddenOption).toHaveTextContent("green");
});

describe("keyboard navigation", () => {
  it("calls onSelect to confirm selection when option is selected by pressing Enter key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect} highlightedValue="red">
        <Option id="red" value="red" text="red" />
        <Option id="green" value="green" text="green" />
        <Option id="blue" value="blue" text="blue" />
      </SelectListWithInput>,
    );

    await user.keyboard("{Enter}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "red",
        selectionConfirmed: true,
        selectionType: "enterKey",
      }),
    );
  });

  it("calls onSelect to confirm selection when option row is selected by pressing Enter key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput
        onSelect={onSelect}
        highlightedValue="dark-red"
        multiColumn
      >
        <OptionRow id="dark-red" value="dark-red" text="dark red">
          <td>dark</td>
          <td>red</td>
        </OptionRow>
        <OptionRow id="light-blue" value="light-blue" text="light blue">
          <td>light</td>
          <td>blue</td>
        </OptionRow>
      </SelectListWithInput>,
    );

    await user.keyboard("{Enter}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "dark-red",
        selectionConfirmed: true,
        selectionType: "enterKey",
      }),
    );
  });

  it("if the highlighted option is disabled, pressing Enter key does not call onSelect", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect} highlightedValue="red">
        <Option id="red" value="red" text="red" disabled />
      </SelectListWithInput>,
    );

    await user.keyboard("{Enter}");

    expect(onSelect).not.toHaveBeenCalled();
  });

  it("calls onSelect when attempting to navigate to first option in list by pressing the ArrowDown key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect}>
        <Option id="red" value="red" text="red" />
        <Option id="green" value="green" text="green" />
        <Option id="blue" value="blue" text="blue" />
      </SelectListWithInput>,
    );

    await user.keyboard("{ArrowDown}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "red",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      }),
    );
  });

  it("calls onSelect when attempting to navigate to first option row in list by pressing the ArrowDown key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <SelectListWithInput onSelect={onSelect} multiColumn>
        <OptionRow id="dark-red" value="dark-red" text="dark red">
          <td>dark</td>
          <td>red</td>
        </OptionRow>
        <OptionRow id="light-blue" value="light-blue" text="light blue">
          <td>light</td>
          <td>blue</td>
        </OptionRow>
      </SelectListWithInput>,
    );

    await user.keyboard("{ArrowDown}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "dark-red",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      }),
    );
  });

  it("calls onSelect when attempting to navigate to last option in the list by pressing the ArrowUp key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect}>
        <Option id="red" value="red" text="red" />
        <Option id="green" value="green" text="green" />
        <Option id="blue" value="blue" text="blue" />
      </SelectListWithInput>,
    );

    await user.keyboard("{ArrowUp}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "blue",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      }),
    );
  });

  it("calls onSelect when attempting to navigate to last option row in the list by pressing the ArrowUp key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect} multiColumn>
        <OptionRow id="dark-red" value="dark-red" text="dark red">
          <td>dark</td>
          <td>red</td>
        </OptionRow>
        <OptionRow id="light-blue" value="light-blue" text="light blue">
          <td>light</td>
          <td>blue</td>
        </OptionRow>
      </SelectListWithInput>,
    );

    await user.keyboard("{ArrowUp}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "light-blue",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      }),
    );
  });

  it("calls onSelect when attempting to navigate from last option to the first option by pressing the ArrowDown key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect} highlightedValue="blue">
        <Option id="red" value="red" text="red" />
        <Option id="green" value="green" text="green" />
        <Option id="blue" value="blue" text="blue" />
      </SelectListWithInput>,
    );

    await user.keyboard("{ArrowDown}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "red",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      }),
    );
  });

  it("calls onSelect when attempting to navigate from last option row to the first option row by pressing the ArrowDown key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput
        onSelect={onSelect}
        highlightedValue="light-blue"
        multiColumn
      >
        <OptionRow id="dark-red" value="dark-red" text="dark red">
          <td>dark</td>
          <td>red</td>
        </OptionRow>
        <OptionRow id="light-blue" value="light-blue" text="light blue">
          <td>light</td>
          <td>blue</td>
        </OptionRow>
      </SelectListWithInput>,
    );

    await user.keyboard("{ArrowDown}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "dark-red",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      }),
    );
  });

  it("calls onSelect when attempting to navigate from the first option to the last option by pressing the ArrowUp key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect} highlightedValue="red">
        <Option id="red" value="red" text="red" />
        <Option id="green" value="green" text="green" />
        <Option id="blue" value="blue" text="blue" />
      </SelectListWithInput>,
    );

    await user.keyboard("{ArrowUp}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "blue",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      }),
    );
  });

  it("calls onSelect when attempting to navigate from the first option row to the last option row by pressing the ArrowUp key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput
        onSelect={onSelect}
        highlightedValue="dark-red"
        multiColumn
      >
        <OptionRow id="dark-red" value="dark-red" text="dark red">
          <td>dark</td>
          <td>red</td>
        </OptionRow>
        <OptionRow id="light-blue" value="light-blue" text="light blue">
          <td>light</td>
          <td>blue</td>
        </OptionRow>
      </SelectListWithInput>,
    );

    await user.keyboard("{ArrowUp}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "light-blue",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      }),
    );
  });

  it("calls onSelect when attempting to navigate to first option in list by pressing the Home key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect}>
        <Option id="red" value="red" text="red" />
        <Option id="green" value="green" text="green" />
        <Option id="blue" value="blue" text="blue" />
      </SelectListWithInput>,
    );

    await user.keyboard("{Home}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "red",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      }),
    );
  });

  it("calls onSelect when attempting to navigate to first option row in list by pressing the Home key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect} multiColumn>
        <OptionRow id="dark-red" value="dark-red" text="dark red">
          <td>dark</td>
          <td>red</td>
        </OptionRow>
        <OptionRow id="light-blue" value="light-blue" text="light blue">
          <td>light</td>
          <td>blue</td>
        </OptionRow>
      </SelectListWithInput>,
    );

    await user.keyboard("{Home}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "dark-red",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      }),
    );
  });

  it("calls onSelect when attempting to navigate to last option in list by pressing the End key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect}>
        <Option id="red" value="red" text="red" />
        <Option id="green" value="green" text="green" />
        <Option id="blue" value="blue" text="blue" />
      </SelectListWithInput>,
    );

    await user.keyboard("{End}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "blue",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      }),
    );
  });

  it("calls onSelect when attempting to navigate to last option row in list by pressing the End key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput
        onSelect={onSelect}
        highlightedValue="dark-red"
        multiColumn
      >
        <OptionRow id="dark-red" value="dark-red" text="dark red">
          <td>dark</td>
          <td>red</td>
        </OptionRow>
        <OptionRow id="light-blue" value="light-blue" text="light blue">
          <td>light</td>
          <td>blue</td>
        </OptionRow>
      </SelectListWithInput>,
    );

    await user.keyboard("{End}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "light-blue",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      }),
    );
  });

  it("does not call onSelect when neither a navigation key nor Enter key is pressed", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect}>
        <Option id="red" value="red" text="red" />
        <Option id="green" value="green" text="green" />
        <Option id="blue" value="blue" text="blue" />
      </SelectListWithInput>,
    );

    await user.keyboard("{a}");

    expect(onSelect).not.toHaveBeenCalled();
  });

  it("skips out disabled options when navigating with arrow keys", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect}>
        <Option id="red" value="red" text="red" disabled />
        <Option id="green" value="green" text="green" />
      </SelectListWithInput>,
    );

    await user.keyboard("{ArrowDown}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "green",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      }),
    );
  });

  test("does not call onSelect when attempting to press ArrowDown key while last option is highlighted and isLoading is true", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput
        onSelect={onSelect}
        highlightedValue="blue"
        isLoading
      >
        <Option id="red" value="red" text="red" />
        <Option id="green" value="green" text="green" />
        <Option id="blue" value="blue" text="blue" />
      </SelectListWithInput>,
    );

    await user.keyboard("{ArrowDown}");

    expect(onSelect).not.toHaveBeenCalled();
  });

  it("does not call onSelect when attempting to navigate to non-Option/OptionRow list content", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput onSelect={onSelect}>
        <p>apple</p>
      </SelectListWithInput>,
    );

    await user.keyboard("{ArrowDown}");

    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe("closing behaviour", () => {
  it("does not close when Space key is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput>
        <Option id="red" value="red" text="red" />
      </SelectListWithInput>,
    );

    await user.keyboard("{ }");

    expect(screen.getByRole("listbox")).toBeVisible();
  });

  it.each(["Enter", "Tab", "Escape"])(
    "closes when %s key is pressed",
    async (key) => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      render(
        <SelectListWithInput>
          <Option id="red" value="red" text="red" />
        </SelectListWithInput>,
      );

      await user.keyboard(`{${key}}`);

      await waitFor(() =>
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
      );
    },
  );

  it("closes when navigating away from custom action button by pressing Tab", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput
        listActionButton={<button type="button">Click me</button>}
      >
        <Option id="red" value="red" text="red" />
      </SelectListWithInput>,
    );

    const actionButton = screen.getByRole("button", { name: /Click me/i });
    actionButton.focus();

    await user.keyboard("{Tab}");

    await waitFor(() =>
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
    );
  });

  it("does not close when navigating from last option to custom action button by pressing Tab", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <SelectListWithInput
        listActionButton={<button type="button">Click me</button>}
      >
        <Option id="red" value="red" text="red" />
        <Option id="green" value="green" text="green" />
        <Option id="blue" value="blue" text="blue" />
      </SelectListWithInput>,
    );

    screen.getByRole("option", { name: /blue/i }).focus();
    await user.tab();

    expect(screen.getByRole("button", { name: /Click me/i })).toHaveFocus();
    expect(screen.getByRole("listbox")).toBeVisible();
  });
});

describe("scroll behaviour", () => {
  it("calls onListScrollBottom callback when the list is scrolled to the bottom", () => {
    const onListScrollBottom = jest.fn();

    render(
      <SelectListWithInput onListScrollBottom={onListScrollBottom}>
        <Option id="red" value="red" text="red" />
      </SelectListWithInput>,
    );

    const scrollableContainer = screen.getByTestId(
      "select-list-scrollable-container",
    );
    jest.spyOn(scrollableContainer, "scrollHeight", "get").mockReturnValue(120);
    jest.spyOn(scrollableContainer, "clientHeight", "get").mockReturnValue(40);

    fireEvent.scroll(scrollableContainer, { target: { scrollTop: 80 } });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(onListScrollBottom).toHaveBeenCalled();
  });

  it("triggers onListScrollBottom only once when the list is repeatedly scrolled to the bottom in quick succession", () => {
    const onListScrollBottom = jest.fn();

    render(
      <SelectListWithInput onListScrollBottom={onListScrollBottom}>
        <Option id="red" value="red" text="red" />
      </SelectListWithInput>,
    );

    const scrollableContainer = screen.getByTestId(
      "select-list-scrollable-container",
    );
    jest.spyOn(scrollableContainer, "scrollHeight", "get").mockReturnValue(120);
    jest.spyOn(scrollableContainer, "clientHeight", "get").mockReturnValue(40);

    fireEvent.scroll(scrollableContainer, { target: { scrollTop: 80 } });
    fireEvent.scroll(scrollableContainer, { target: { scrollTop: 78 } });
    fireEvent.scroll(scrollableContainer, { target: { scrollTop: 80 } });
    fireEvent.scroll(scrollableContainer, { target: { scrollTop: 78 } });
    fireEvent.scroll(scrollableContainer, { target: { scrollTop: 80 } });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(onListScrollBottom).toHaveBeenCalledTimes(1);
  });

  it("does not call onListScrollBottom callback when the list is not scrolled to the bottom", () => {
    const onListScrollBottom = jest.fn();

    render(
      <SelectListWithInput onListScrollBottom={onListScrollBottom}>
        <Option id="red" value="red" text="red" />
      </SelectListWithInput>,
    );

    const scrollableContainer = screen.getByTestId(
      "select-list-scrollable-container",
    );
    jest.spyOn(scrollableContainer, "scrollHeight", "get").mockReturnValue(120);
    jest.spyOn(scrollableContainer, "clientHeight", "get").mockReturnValue(40);

    fireEvent.scroll(scrollableContainer, { target: { scrollTop: 79 } });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(onListScrollBottom).not.toHaveBeenCalled();
  });
});

describe("virtualised options", () => {
  it("renders all options when enableVirtualScroll is false", () => {
    render(
      <SelectListWithInput enableVirtualScroll={false}>
        <Option id="red" value="red" text="red" />
        <Option id="green" value="green" text="green" />
        <Option id="blue" value="blue" text="blue" />
      </SelectListWithInput>,
    );

    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("renders fewer options when virtual scrolling is enabled with limited overscan", () => {
    render(
      <SelectListWithInput enableVirtualScroll virtualScrollOverscan={1}>
        <Option key="red" value="red" text="red" />
        <Option key="green" value="green" text="green" />
        <Option key="blue" value="blue" text="blue" />
        <Option key="white" value="white" text="white" />
        <Option key="black" value="black" text="black" />
      </SelectListWithInput>,
    );

    expect(screen.getAllByRole("option").length).toBeLessThan(5);
  });

  it("keeps selected option rendered even when out of view", () => {
    render(
      <SelectListWithInput enableVirtualScroll highlightedValue="1">
        {Array(50)
          .fill(undefined)
          .map((_, index) => (
            <Option
              key={`${index + 1}`}
              value={`${index + 1}`}
              text={`${index + 1}`}
            />
          ))}
      </SelectListWithInput>,
    );

    const container = screen.getByTestId("select-list-scrollable-container");

    jest.spyOn(container, "scrollHeight", "get").mockReturnValue(80);

    // Scroll to the bottom of the list
    fireEvent.scroll(container, {
      target: { scrollTop: 20 },
    });

    expect(
      screen.getByRole("option", {
        name: /1/i,
        selected: true,
      }),
    ).toBeInTheDocument();
  });
});

test("each rendered option has aria-setsize attribute set to the total number of options", async () => {
  render(
    <SelectListWithInput>
      <Option id="red" value="red" text="red" />
      <Option id="green" value="green" text="green" />
    </SelectListWithInput>,
  );

  expect(screen.getByRole("option", { name: "red" })).toHaveAttribute(
    "aria-setsize",
    "2",
  );
  expect(screen.getByRole("option", { name: "green" })).toHaveAttribute(
    "aria-setsize",
    "2",
  );
});

test("each rendered option has aria-posinset attribute set to its index in the list", () => {
  render(
    <SelectListWithInput>
      <Option id="red" value="red" text="red" />
      <Option id="green" value="green" text="green" />
    </SelectListWithInput>,
  );

  expect(screen.getByRole("option", { name: "red" })).toHaveAttribute(
    "aria-posinset",
    "1",
  );
  expect(screen.getByRole("option", { name: "green" })).toHaveAttribute(
    "aria-posinset",
    "2",
  );
});
