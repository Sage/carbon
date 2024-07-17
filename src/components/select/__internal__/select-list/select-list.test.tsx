import React, { useRef, useState } from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SelectList, { SelectListProps } from "./select-list.component";
import Option from "../../option";

beforeAll(() => {
  // Mock getBoundingClientRect to return an arbitrary non-zero value, since react-virtual depends on it
  const ESTIMATED_SIZE = 40;
  jest.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
    height: ESTIMATED_SIZE,
    width: ESTIMATED_SIZE,
  } as DOMRect);
});

afterAll(() => {
  jest.restoreAllMocks();
});

const WithOptions = ({
  onSelect,
  onSelectListClose,
  ...rest
}: SelectListProps) => {
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <SelectList
      ref={ref}
      isOpen={open}
      onSelect={onSelect}
      onSelectListClose={() => {
        onSelectListClose();
        setOpen(false);
      }}
      {...rest}
    >
      <Option id="red" value="red" text="red" />
      <Option id="green" value="green" text="green" />
      <Option id="blue" value="blue" text="blue" />
    </SelectList>
  );
};

test("does not call onSelectListClose when Space key is pressed while list is open", async () => {
  const onSelectListClose = jest.fn();
  const user = userEvent.setup();
  render(
    <WithOptions onSelectListClose={onSelectListClose} onSelect={() => {}} />
  );

  await user.keyboard("{ }");

  expect(onSelectListClose).not.toHaveBeenCalled();
});

test.each(["Enter", "Tab", "Escape"])(
  "calls onSelectListClose when %s key is pressed while list is open",
  async (key) => {
    const onSelectListClose = jest.fn();
    const user = userEvent.setup();
    render(
      <WithOptions onSelectListClose={onSelectListClose} onSelect={() => {}} />
    );

    await user.keyboard(`{${key}}`);

    expect(onSelectListClose).toHaveBeenCalled();
  }
);

// TODO: Review coverage, replicate the following tests if the OptionRow variant needs be tested
describe("navigation", () => {
  test("calls onSelect with correct arguments when an option is highlighted and Enter key is pressed", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();
    render(
      <WithOptions
        onSelect={onSelect}
        onSelectListClose={() => {}}
        highlightedValue="red"
      />
    );

    await user.keyboard("{Enter}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "red",
        value: "red",
        text: "red",
        selectionConfirmed: true,
        selectionType: "enterKey",
      })
    );
  });

  test("calls onSelect with correct arguments when the first option is highlighted via the ArrowDown key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();
    render(<WithOptions onSelect={onSelect} onSelectListClose={() => {}} />);

    await user.keyboard("{ArrowDown}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "red",
        value: "red",
        text: "red",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      })
    );
  });

  test("calls onSelect with correct arguments when highlighted option cycles back to the top via ArrowDown key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();
    render(
      <WithOptions
        onSelect={onSelect}
        onSelectListClose={() => {}}
        highlightedValue="blue"
      />
    );

    await user.keyboard("{ArrowDown}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "red",
        value: "red",
        text: "red",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      })
    );
  });

  test("does not call onSelect when last option is highlighted, ArrowDown key is pressed and isLoading is true", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();
    render(
      <WithOptions
        onSelect={onSelect}
        onSelectListClose={() => {}}
        highlightedValue="blue"
        isLoading
      />
    );

    await user.keyboard("{ArrowDown}");

    expect(onSelect).not.toHaveBeenCalled();
  });

  test("calls onSelect with correct arguments when the last option is highlighted via the ArrowUp key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();
    render(<WithOptions onSelect={onSelect} onSelectListClose={() => {}} />);

    await user.keyboard("{ArrowUp}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "blue",
        value: "blue",
        text: "blue",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      })
    );
  });

  test("calls onSelect with correct arguments when highlighted option cycles back to the bottom via ArrowUp key", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();
    render(
      <WithOptions
        onSelect={onSelect}
        onSelectListClose={() => {}}
        highlightedValue="red"
      />
    );

    await user.keyboard("{ArrowUp}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "blue",
        value: "blue",
        text: "blue",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      })
    );
  });

  test("calls onSelect with correct arguments when Home key is pressed", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();
    render(<WithOptions onSelect={onSelect} onSelectListClose={() => {}} />);

    await user.keyboard("{Home}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "red",
        value: "red",
        text: "red",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      })
    );
  });

  test("calls onSelect with correct arguments when End key is pressed", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();
    render(<WithOptions onSelect={onSelect} onSelectListClose={() => {}} />);

    await user.keyboard("{End}");

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "blue",
        value: "blue",
        text: "blue",
        selectionConfirmed: false,
        selectionType: "navigationKey",
      })
    );
  });

  test("no option is highlighted when neither a navigation nor Enter key is pressed", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();
    render(<WithOptions onSelect={onSelect} onSelectListClose={() => {}} />);

    await user.keyboard("{a}");

    expect(onSelect).not.toHaveBeenCalled();
  });
});

test("skips out a disabled option when navigating with arrow keys", async () => {
  const onSelect = jest.fn();
  const user = userEvent.setup();

  const WithDisabledOption = () => {
    const ref = useRef<HTMLDivElement>(null);
    return (
      <SelectList
        ref={ref}
        isOpen
        onSelect={onSelect}
        onSelectListClose={() => {}}
      >
        <Option id="red" value="red" text="red" disabled />
        <Option id="green" value="green" text="green" />
      </SelectList>
    );
  };

  render(<WithDisabledOption />);

  await user.keyboard("{ArrowDown}");

  expect(onSelect).toHaveBeenCalledWith(
    expect.objectContaining({
      id: "green",
      value: "green",
      text: "green",
      selectionConfirmed: false,
      selectionType: "navigationKey",
    })
  );
});

test("does not call onSelect when the highlighted option is disabled and Enter key is pressed", async () => {
  const onSelect = jest.fn();
  const user = userEvent.setup();

  const WithDisabledOption = () => {
    const ref = useRef<HTMLDivElement>(null);
    return (
      <SelectList
        ref={ref}
        isOpen
        onSelect={onSelect}
        onSelectListClose={() => {}}
        highlightedValue="red"
      >
        <Option id="red" value="red" text="red" disabled />
      </SelectList>
    );
  };

  render(<WithDisabledOption />);

  await user.keyboard("{Enter}");

  expect(onSelect).not.toHaveBeenCalled();
});

test("calls onSelect with correct arguments when a highlighted option is clicked", async () => {
  const onSelect = jest.fn();
  const user = userEvent.setup();
  render(
    <WithOptions
      onSelect={onSelect}
      onSelectListClose={() => {}}
      highlightedValue="red"
    />
  );

  await user.click(screen.getByRole("option", { name: /red/i }));

  expect(onSelect).toHaveBeenCalledWith(
    expect.objectContaining({
      id: "red",
      value: "red",
      text: "red",
      selectionConfirmed: true,
      selectionType: "click",
    })
  );
});

test("calls onSelect with correct arguments when highlighted option was defined with an object and Enter key is pressed", async () => {
  const onSelect = jest.fn();
  const user = userEvent.setup();

  const WithComplexOptions = () => {
    const ref = useRef<HTMLDivElement>(null);
    return (
      <SelectList
        ref={ref}
        isOpen
        onSelect={onSelect}
        onSelectListClose={() => {}}
        highlightedValue={{ id: "red", value: 1 }}
      >
        <Option id="red" value={{ id: "red", value: 1 }} text="red" />
        <Option id="green" value={{ id: "green", value: 2 }} text="green" />
      </SelectList>
    );
  };

  render(<WithComplexOptions />);

  await user.click(screen.getByRole("option", { name: /red/i }));

  expect(onSelect).toHaveBeenCalledWith(
    expect.objectContaining({
      id: "red",
      value: { id: "red", value: 1 },
      text: "red",
      selectionConfirmed: true,
      selectionType: "click",
    })
  );
});

test("highlights first matching option when filterText prop is provided", () => {
  const onSelect = jest.fn();
  render(
    <WithOptions
      onSelect={onSelect}
      onSelectListClose={() => {}}
      filterText="g"
    />
  );

  const greenOption = screen.getByRole("option", { name: /green/i });
  expect(greenOption).toBeVisible();
  expect(greenOption).toHaveStyleRule(
    "background-color",
    "var(--colorsUtilityMajor200)"
  );
});

test("no options are highlighted when filterText prop is provided and none match", () => {
  const onSelect = jest.fn();
  render(
    <WithOptions
      onSelect={onSelect}
      onSelectListClose={() => {}}
      filterText="z"
    />
  );

  expect(screen.getByRole("option", { name: /red/i })).not.toHaveStyleRule(
    "background-color",
    "var(--colorsUtilityMajor200)"
  );
  expect(screen.getByRole("option", { name: /green/i })).not.toHaveStyleRule(
    "background-color",
    "var(--colorsUtilityMajor200)"
  );
  expect(screen.getByRole("option", { name: /blue/i })).not.toHaveStyleRule(
    "background-color",
    "var(--colorsUtilityMajor200)"
  );
});

test("no error thrown when no options are passed but a highlightedValue is provided", () => {
  expect(() =>
    render(
      <SelectList
        ref={{ current: null }}
        isOpen
        onSelect={() => {}}
        onSelectListClose={() => {}}
        highlightedValue="red"
      />
    )
  ).not.toThrow();
});

test("highlights option matching highlightedValue after it has been loaded", () => {
  const { rerender } = render(
    <WithOptions
      onSelect={() => {}}
      onSelectListClose={() => {}}
      highlightedValue="green"
      isLoading
    />
  );

  rerender(
    <WithOptions
      onSelect={() => {}}
      onSelectListClose={() => {}}
      highlightedValue="green"
      isLoading={false}
    />
  );

  const selectedOption = screen.getByRole("option", { selected: true });
  expect(selectedOption).toHaveTextContent(/green/i);
  expect(selectedOption).toHaveStyleRule(
    "background-color",
    "var(--colorsUtilityMajor200)"
  );
});

test("renders loader indicator when isLoading prop is true", () => {
  render(
    <WithOptions onSelect={() => {}} onSelectListClose={() => {}} isLoading />
  );

  expect(screen.getByRole("progressbar", { name: "Loading" })).toBeVisible();
});

test("calls onListScrollBottom callback when the list is scrolled to the bottom", () => {
  const onListScrollBottom = jest.fn();
  render(
    <WithOptions
      onSelect={() => {}}
      onSelectListClose={() => {}}
      onListScrollBottom={onListScrollBottom}
    />
  );

  const scrollableContainer = screen.getByTestId(
    "select-list-scrollable-container"
  );
  jest.spyOn(scrollableContainer, "scrollHeight", "get").mockReturnValue(120);
  jest.spyOn(scrollableContainer, "clientHeight", "get").mockReturnValue(40);

  fireEvent.scroll(scrollableContainer, { target: { scrollTop: 80 } });

  expect(onListScrollBottom).toHaveBeenCalled();
});

test("does not call onListScrollBottom callback when the list is not scrolled to the bottom", () => {
  const onListScrollBottom = jest.fn();
  render(
    <WithOptions
      onSelect={() => {}}
      onSelectListClose={() => {}}
      onListScrollBottom={onListScrollBottom}
    />
  );

  const scrollableContainer = screen.getByTestId(
    "select-list-scrollable-container"
  );
  jest.spyOn(scrollableContainer, "scrollHeight", "get").mockReturnValue(120);
  jest.spyOn(scrollableContainer, "clientHeight", "get").mockReturnValue(40);

  fireEvent.scroll(scrollableContainer, { target: { scrollTop: 79 } });

  expect(onListScrollBottom).not.toHaveBeenCalled();
});

describe("virtual scrolling", () => {
  test("renders all options when enableVirtualScroll is false", () => {
    render(
      <WithOptions
        onSelect={() => {}}
        onSelectListClose={() => {}}
        enableVirtualScroll={false}
      />
    );

    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  test("does not render all options when enableVirtualScroll is true", () => {
    const WithVirtualScrolling = () => {
      const ref = useRef<HTMLDivElement>(null);
      return (
        <SelectList
          ref={ref}
          isOpen
          onSelect={() => {}}
          onSelectListClose={() => {}}
          enableVirtualScroll
          virtualScrollOverscan={2}
        >
          <Option id="1" value="1" text="1" />
          <Option id="2" value="2" text="2" />
          <Option id="3" value="3" text="3" />
          <Option id="4" value="4" text="4" />
          <Option id="5" value="5" text="5" />
        </SelectList>
      );
    };
    render(<WithVirtualScrolling />);

    expect(screen.getAllByRole("option").length).toBeLessThan(5);
  });
});
