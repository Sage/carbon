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
import mockDOMRect from "../../../__spec_helper__/mock-dom-rect";
import Logger from "../../../__internal__/utils/logger";
import { testStyledSystemMarginRTL } from "../../../__spec_helper__/__internal__/test-utils";

import MultiSelect from ".";
import Option from "../option";

beforeEach(() => {
  // Mock non-zero dimensions for the scrollable container in dropdown list. To ensure react-virtual renders options in the dropdown list correctly.
  mockDOMRect(40, 100, "select-list-scrollable-container");
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("displays input", () => {
  render(
    <MultiSelect label="Colour" onChange={() => {}} value={[]}>
      <Option text="amber" value="amber" />
    </MultiSelect>
  );

  expect(screen.getByRole("combobox")).toBeVisible();
});

test("displays default placeholder text when no value is selected", () => {
  render(
    <MultiSelect label="Colour" onChange={() => {}} value={[]}>
      <Option text="amber" value="amber" />
    </MultiSelect>
  );

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Please Select..."
  );
});

test("displays custom text when placeholder prop is provided and no value is selected", () => {
  render(
    <MultiSelect
      label="Colour"
      onChange={() => {}}
      value={[]}
      placeholder="Select a colour"
    >
      <Option text="amber" value="amber" />
    </MultiSelect>
  );

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Select a colour"
  );
});

describe("when value prop is provided", () => {
  it("displays a pill for each selected option", () => {
    render(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        value={["amber", "blue"]}
        placeholder="Select a colour"
      >
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </MultiSelect>
    );

    const selectTextbox = screen.getByTestId("select-textbox");
    expect(within(selectTextbox).getByText("amber")).toBeVisible();
    expect(within(selectTextbox).getByText("blue")).toBeVisible();
  });

  it("displays a styled pill for a matching option that has style props specified", () => {
    render(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        value={["amber"]}
        placeholder="Select a colour"
      >
        <Option text="amber" value="amber" borderColor="red" fill />
      </MultiSelect>
    );

    const selectTextbox = screen.getByTestId("select-textbox");
    expect(within(selectTextbox).getByText("amber")).toHaveStyle(`
      border: 2px solid red;
      background-color: red;
    `);
  });

  it("does not display any pill, when value array contains a value that does not match any option", () => {
    render(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        value={["green"]}
        placeholder="Select a colour"
      >
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </MultiSelect>
    );

    const selectTextbox = screen.getByTestId("select-textbox");
    expect(within(selectTextbox).queryByText("green")).not.toBeInTheDocument();
  });

  it("removes all rendered pills when set to an empty array", () => {
    const { rerender } = render(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        value={["amber"]}
        placeholder="Select a colour"
      >
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    rerender(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        value={[]}
        placeholder="Select a colour"
      >
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    const selectTextbox = screen.getByTestId("select-textbox");
    expect(within(selectTextbox).queryByText("amber")).not.toBeInTheDocument();
  });
});

describe("accessible name of the input", () => {
  it("is set to the label prop when provided", () => {
    render(
      <MultiSelect label="Colour" onChange={() => {}} value={[]}>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("Colour");
  });

  it("is set to the text referenced by the aria-labelledby prop when provided", () => {
    render(
      <>
        <h2 id="my-select-heading">My Select</h2>
        <MultiSelect
          aria-labelledby="my-select-heading"
          onChange={() => {}}
          value={[]}
        >
          <Option text="amber" value="amber" />
        </MultiSelect>
      </>
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("My Select");
  });

  it("is set to the text referenced by aria-labelledby when aria-labelledby and label props are passed", () => {
    render(
      <>
        <h2 id="my-select-heading">My Select</h2>
        <MultiSelect
          label="Colour"
          aria-labelledby="my-select-heading"
          onChange={() => {}}
          value={[]}
        >
          <Option text="amber" value="amber" />
        </MultiSelect>
      </>
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("My Select");
  });
});

test("associates the dropdown list with the correct accessible name from the label prop", async () => {
  const user = userEvent.setup();
  render(
    <MultiSelect label="Colour" onChange={() => {}} value={[]}>
      <Option text="amber" value="amber" />
    </MultiSelect>
  );

  await user.click(screen.getByRole("combobox"));

  expect(await screen.findByRole("listbox")).toHaveAccessibleName("Colour");
});

test.each(["top", "bottom"] as const)(
  "should override the data attribute on the list when listWidth is set and placement is %s",
  async (listPlacement) => {
    const user = userEvent.setup();
    render(
      <MultiSelect
        listPlacement={listPlacement}
        listWidth={100}
        label="Colour"
        onChange={() => {}}
      >
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      `${listPlacement}-end`
    );
  }
);

test.each(["top-end", "bottom-end", "top-start", "bottom-start"] as const)(
  "should not override the data attribute on the list when listWidth is set and placement is %s",
  async (listPlacement) => {
    const user = userEvent.setup();
    render(
      <MultiSelect
        listPlacement={listPlacement}
        listWidth={100}
        label="Colour"
        onChange={() => {}}
      >
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      listPlacement
    );
  }
);

describe("dropdown list", () => {
  it("opens when input is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByRole("listbox")).toBeVisible();
  });

  it("opens when input's dropdown icon is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    await user.click(screen.getByTestId("input-icon-toggle"));

    expect(await screen.findByRole("listbox")).toBeVisible();
  });

  it.each(["Space", "ArrowUp", "ArrowDown", "Home", "End"])(
    "opens when input is focused and %s key is pressed",
    async (key) => {
      const user = userEvent.setup();
      render(
        <MultiSelect label="Colour" onChange={() => {}}>
          <Option text="amber" value="amber" />
        </MultiSelect>
      );

      await user.tab();
      await user.keyboard(key);

      expect(await screen.findByRole("listbox")).toBeVisible();
    }
  );

  it.each(["Enter", "a"] as const)(
    "does not open when %s key is pressed",
    async (key) => {
      const user = userEvent.setup();
      render(
        <MultiSelect label="Colour" onChange={() => {}}>
          <Option text="amber" value="amber" />
        </MultiSelect>
      );

      await user.tab();
      await user.keyboard(`[${key}]`);

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    }
  );

  it("does not open, when input is disabled and is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}} disabled>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    await user.click(screen.getByRole("combobox"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not open, when input is disabled and is selected with the keyboard", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}} disabled>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    await user.tab();
    await user.keyboard("[Space]");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not open, when input is read-only and is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}} readOnly>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    await user.click(screen.getByRole("textbox"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not open, when input is read-only and Space bar is pressed", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}} readOnly>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    await user.tab();
    await user.keyboard("[Space]");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens when input is focused and openOnFocus prop is true", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}} openOnFocus>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    await user.tab();

    expect(await screen.findByRole("listbox")).toBeVisible();
  });

  it("does not open, when input is focused and openOnFocus prop is false", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}} openOnFocus={false}>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    await user.tab();

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("stays open after an option is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "amber" }));

    expect(screen.getByRole("listbox")).toBeVisible();
  });

  it("stays open after an option is focused and Enter key is pressed", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    await user.click(screen.getByRole("combobox"));
    await user.keyboard("ArrowDown");
    await user.keyboard("Enter");

    expect(screen.getByRole("listbox")).toBeVisible();
  });

  it("closes when clicking outside the list", async () => {
    const user = userEvent.setup();
    render(
      <>
        <MultiSelect label="Colour" onChange={() => {}}>
          <Option text="amber" value="amber" />
        </MultiSelect>
        <p>Outside content</p>
      </>
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Outside content"));

    await waitFor(() =>
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    );
  });

  it("closes when input is clicked twice", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("combobox"));

    await waitFor(() =>
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    );
  });
});

describe("when dropdown list is opened", () => {
  it("highlights the first option in list when ArrowDown key is pressed", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}} openOnFocus>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </MultiSelect>
    );

    await user.tab();
    await user.keyboard("{ArrowDown}");

    expect(
      await screen.findByRole("option", { name: "amber" })
    ).toHaveStyleRule("background-color", "var(--colorsUtilityMajor200)");
  });

  it("highlights the last option in list when ArrowUp key is pressed", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}} openOnFocus>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </MultiSelect>
    );

    await user.tab();
    await user.keyboard("{ArrowUp}");

    expect(await screen.findByRole("option", { name: "blue" })).toHaveStyleRule(
      "background-color",
      "var(--colorsUtilityMajor200)"
    );
  });

  it("calls onChange when an option is selected", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <MultiSelect label="Colour" onChange={onChange}>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </MultiSelect>
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "amber" }));

    expect(onChange).toHaveBeenCalled();
  });

  it("does not call onChange when navigating to an option in the list via the keyboard", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <MultiSelect label="Colour" onChange={onChange} openOnFocus>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </MultiSelect>
    );

    await user.tab();
    await user.keyboard("{ArrowDown}");

    expect(onChange).not.toHaveBeenCalled();

    await user.keyboard("{ArrowUp}");

    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not call onChange after selecting an already selected option", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <MultiSelect label="Colour" onChange={onChange} value={["amber"]}>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </MultiSelect>
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "amber" }));

    expect(onChange).not.toHaveBeenCalled();
  });
});

test.todo(
  "pressing Backspace key while input is focused removes the last selected option"
);

test("clears the input after clicking away from the input", async () => {
  const user = userEvent.setup();
  render(
    <>
      <MultiSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </MultiSelect>
      <p>Outside content</p>
    </>
  );

  await user.type(screen.getByRole("combobox"), "a");
  await user.click(screen.getByText("Outside content"));

  expect(screen.getByRole("combobox")).toHaveValue("");
});

test("clears the input after an option is selected", async () => {
  const user = userEvent.setup();
  render(
    <MultiSelect label="Colour" onChange={() => {}}>
      <Option text="amber" value="amber" />
    </MultiSelect>
  );

  await user.click(screen.getByRole("combobox"));
  await user.click(await screen.findByRole("option", { name: "amber" }));

  expect(screen.getByRole("combobox")).toHaveValue("");
});

describe("when onClick prop is passed", () => {
  it("is called when input is clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <MultiSelect label="Colour" onChange={() => {}} onClick={onClick}>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    await user.click(screen.getByRole("combobox"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is not called when disable input is clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        disabled
        onClick={onClick}
      >
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    await user.click(screen.getByRole("combobox"));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("is not called when read-only input is clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        readOnly
        onClick={onClick}
      >
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    await user.click(screen.getByRole("textbox"));

    expect(onClick).not.toHaveBeenCalled();
  });
});

test("calls onOpen when list is opened", async () => {
  const user = userEvent.setup();
  const onOpen = jest.fn();
  render(
    <MultiSelect label="Colour" onChange={() => {}} onOpen={onOpen}>
      <Option text="amber" value="amber" />
    </MultiSelect>
  );

  await user.click(screen.getByRole("combobox"));

  expect(onOpen).toHaveBeenCalledTimes(1);
});

test("calls onFocus prop when input is focused", async () => {
  const user = userEvent.setup();
  const onFocus = jest.fn();
  render(
    <MultiSelect label="Colour" onChange={() => {}} onFocus={onFocus}>
      <Option text="amber" value="amber" />
    </MultiSelect>
  );

  await user.tab();

  expect(onFocus).toHaveBeenCalledTimes(1);
});

test("calls onBlur prop when input loses focus", async () => {
  const user = userEvent.setup();
  const onBlur = jest.fn();
  render(
    <MultiSelect label="Colour" onChange={() => {}} onBlur={onBlur}>
      <Option text="amber" value="amber" />
    </MultiSelect>
  );

  await user.tab();
  await user.tab({ shift: true });

  expect(onBlur).toHaveBeenCalledTimes(1);
});

describe("forwarded ref", () => {
  it("allows access to the input element through a forwarded callback ref", () => {
    const mockRef = jest.fn((element) => element);
    render(
      <MultiSelect label="Colour" onChange={() => {}} ref={mockRef}>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    expect(mockRef).toHaveBeenNthCalledWith(1, screen.getByRole("combobox"));
  });

  it("allows access to the input element through a forwarded ref object", () => {
    const mockRef = { current: null };
    render(
      <MultiSelect label="Colour" onChange={() => {}} ref={mockRef}>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    expect(mockRef.current).toBe(screen.getByRole("combobox"));
  });
});

describe("deprecation warnings", () => {
  it("raises deprecation warning when component is used with defaultValue and no onChange (uncontrolled usage)", () => {
    jest.spyOn(console, "warn").mockImplementation(() => {});

    const loggerSpy = jest.spyOn(Logger, "deprecate");
    render(
      <MultiSelect label="Colour" onChange={undefined} defaultValue={["amber"]}>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    expect(loggerSpy).toHaveBeenNthCalledWith(
      1,
      "Uncontrolled behaviour in `Multi Select` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
    );
  });

  it("should not display deprecation about uncontrolled Textbox when parent component is controlled", () => {
    const loggerSpy = jest.spyOn(Logger, "deprecate");
    render(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        value={["amber"]}
        placeholder="Select a colour"
      >
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    expect(loggerSpy).not.toHaveBeenCalled();
  });

  it("should not display deprecation about uncontrolled Textbox when parent component is not controlled", () => {
    const loggerSpy = jest.spyOn(Logger, "deprecate");
    render(
      <MultiSelect label="Colour" placeholder="Select a colour">
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    expect(loggerSpy).not.toHaveBeenCalledWith(
      "Uncontrolled behaviour in `Textbox` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
    );
  });
});

test("marks input as required when required prop is true", () => {
  render(
    <MultiSelect label="Colour" onChange={() => {}} required>
      <Option text="amber" value="amber" />
    </MultiSelect>
  );

  expect(screen.getByRole("combobox")).toBeRequired();
});

test("does not call onOpen, when openOnFocus is true and the input is refocused while the dropdown list is already open", async () => {
  jest.useFakeTimers();

  const onOpen = jest.fn();
  render(
    <MultiSelect label="Colour" onChange={() => {}} onOpen={onOpen} openOnFocus>
      <Option text="amber" value="amber" />
    </MultiSelect>
  );

  const input = screen.getByRole("combobox");

  // open the dropdown list
  fireEvent.focus(input);
  act(() => jest.runOnlyPendingTimers());

  onOpen.mockClear();

  // refocus input
  fireEvent.focus(input);
  act(() => jest.runOnlyPendingTimers());

  expect(onOpen).not.toHaveBeenCalled();

  jest.useRealTimers();
});

testStyledSystemMarginRTL(
  (props) => (
    <MultiSelect
      {...props}
      data-role="my-select"
      label="Colour"
      onChange={() => {}}
    >
      <Option text="amber" value="amber" />
    </MultiSelect>
  ),
  () => screen.getByTestId("my-select")
);
