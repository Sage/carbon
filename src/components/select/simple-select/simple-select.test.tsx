import React, { useState } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Box from "../../box";
import Button from "../../button";
import { testStyledSystemMargin } from "../../../__spec_helper__/__internal__/test-utils";

import SimpleSelect, { CustomSelectChangeEvent, SimpleSelectProps } from ".";
import Option from "../option";
import setupSelectMocks from "../setup-select-mocks";

beforeEach(() => {
  setupSelectMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});

type InteractiveComponentProps = Omit<
  SimpleSelectProps,
  "onChange" | "value"
> & {
  children: React.ReactNode;
  onChange: (
    ev: CustomSelectChangeEvent | React.ChangeEvent<HTMLInputElement>,
  ) => void;
  value?: string;
};

const InteractiveComponent = ({
  children,
  onChange,
  value = "",
  ...props
}: InteractiveComponentProps) => {
  const [internalValue, setValue] = useState(value);
  return (
    <SimpleSelect
      onChange={(event) => {
        setValue(event.target.value);
        onChange(event);
      }}
      value={internalValue}
      {...props}
    >
      {children}
    </SimpleSelect>
  );
};

test("renders a visually-hidden input box", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}} value="">
      <Option text="amber" value="amber" />
    </SimpleSelect>,
  );

  const input = screen.getByRole("combobox");
  expect(input).toBeInTheDocument();
  expect(input).not.toBeVisible();
});

test("renders input with a textbox role when readOnly prop is true", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}} readOnly value="">
      <Option text="amber" value="amber" />
    </SimpleSelect>,
  );

  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

// Styling test for coverage - styles are covered by Chromatic
test("applies transparent background and no border to input, when transparent prop is true", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}} transparent value="">
      <Option text="amber" value="amber" />
    </SimpleSelect>,
  );

  expect(screen.getByRole("combobox")).toHaveStyle(`
    background-color: transparent;
    border: none;
  `);
});

test("displays the selected option text, when value prop matches an option", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}} value="amber">
      <Option text="amber" value="amber" />
    </SimpleSelect>,
  );

  expect(screen.getByText("amber", { ignore: "li" })).toBeVisible();
});

test("clears option selection when value prop is set to an empty string", () => {
  const { rerender } = render(
    <SimpleSelect label="Colour" onChange={() => {}} value="amber">
      <Option text="amber" value="amber" />
    </SimpleSelect>,
  );
  rerender(
    <SimpleSelect label="Colour" onChange={() => {}} value="">
      <Option text="amber" value="amber" />
    </SimpleSelect>,
  );

  expect(screen.getByText("Please Select...")).toBeVisible();
  expect(screen.getByRole("combobox")).toHaveValue("");
});

test("displays default placeholder text when no value is selected", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}} value="">
      <Option text="amber" value="amber" />
    </SimpleSelect>,
  );

  expect(screen.getByText("Please Select...")).toBeVisible();
});

test("displays custom text when placeholder prop is provided and no value is selected", () => {
  render(
    <SimpleSelect
      label="Colour"
      onChange={() => {}}
      value=""
      placeholder="Select a colour"
    >
      <Option text="amber" value="amber" />
    </SimpleSelect>,
  );

  expect(screen.getByText("Select a colour")).toBeVisible();
});

test("hides select text overlay from screen readers using aria-hidden", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}} value="">
      <Option text="amber" value="amber" />
    </SimpleSelect>,
  );

  expect(screen.getByTestId("select-text")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
});

describe("accessible name of the input", () => {
  it("is set to the label prop when provided", () => {
    render(
      <SimpleSelect label="Colour" onChange={() => {}} value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("Colour");
  });

  it("is set to the aria-label prop when provided", () => {
    render(
      <SimpleSelect aria-label="Colour" onChange={() => {}} value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("Colour");
  });

  it("is set to the aria-label when both aria-label and label props are passed", () => {
    render(
      <SimpleSelect
        label="foobar"
        onChange={() => {}}
        aria-label="Colour"
        value=""
      >
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("Colour");
  });

  it("is set to the text referenced by the aria-labelledby prop when provided", () => {
    render(
      <>
        <h2 id="my-select-heading">My Select</h2>
        <SimpleSelect
          aria-labelledby="my-select-heading"
          onChange={() => {}}
          value=""
        >
          <Option text="amber" value="amber" />
        </SimpleSelect>
      </>,
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("My Select");
  });

  it("is set to the text referenced by aria-labelledby when both aria-labelledby and aria-label props are passed", () => {
    render(
      <>
        <h2 id="my-select-heading">My Select</h2>
        <SimpleSelect
          aria-labelledby="my-select-heading"
          aria-label="foobar"
          onChange={() => {}}
          value=""
        >
          <Option text="amber" value="amber" />
        </SimpleSelect>
      </>,
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("My Select");
  });
});

test("associates the dropdown list with the correct accessible name from the label prop", async () => {
  const user = userEvent.setup();
  render(
    <SimpleSelect label="Colour" onChange={() => {}} value="">
      <Option text="amber" value="amber" />
    </SimpleSelect>,
  );

  await user.click(screen.getByRole("combobox"));

  expect(await screen.findByRole("listbox")).toHaveAccessibleName("Colour");
});

test("updates input’s aria-activedescendant value when navigating options via keyboard", async () => {
  const user = userEvent.setup();
  render(
    <SimpleSelect label="Colour" onChange={() => {}} value="amber">
      <Option text="amber" value="amber" />
      <Option text="blue" value="blue" />
      <Option id="cherry" text="cherry" value="cherry" />
    </SimpleSelect>,
  );

  const input = screen.getByRole("combobox");
  await user.click(input);

  expect(await screen.findByRole("listbox")).toBeVisible();

  await user.keyboard("{End}");

  expect(input).toHaveFocus();
  expect(input).toHaveAttribute("aria-activedescendant", "cherry");
});

["top", "bottom"].forEach((listPlacement) => {
  test(`should override the data attribute on the list when listWidth is set and placement is ${listPlacement}`, async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect
        listPlacement={listPlacement as "top" | "bottom"}
        listWidth={100}
        label="Colour"
        onChange={() => {}}
        value="amber"
      >
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      `${listPlacement}-end`,
    );
  });
});

["top-end", "bottom-end", "top-start", "bottom-start"].forEach(
  (listPlacement) => {
    test(`should not override the data attribute on the list when listWidth is set and placement is ${listPlacement}`, async () => {
      const user = userEvent.setup();
      render(
        <SimpleSelect
          listPlacement={
            listPlacement as
              | "top-end"
              | "bottom-end"
              | "top-start"
              | "bottom-start"
          }
          listWidth={100}
          label="Colour"
          onChange={() => {}}
          value="amber"
        >
          <Option text="amber" value="amber" />
        </SimpleSelect>,
      );

      await user.click(screen.getByRole("combobox"));

      expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
        "data-floating-placement",
        listPlacement,
      );
    });
  },
);

describe("typing into the input", () => {
  it("selects the first option with text starting with the typed printable character", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
        <Option text="black" value="black" />
      </InteractiveComponent>,
    );

    await user.type(screen.getByRole("combobox"), "b");

    expect(screen.getByText("blue", { ignore: "li" })).toBeVisible();
  });

  it("selects the second option with text starting with the typed printable character when typed twice", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
        <Option text="black" value="black" />
      </InteractiveComponent>,
    );

    await user.type(screen.getByRole("combobox"), "bb");

    expect(screen.getByText("black", { ignore: "li" })).toBeVisible();
  });

  it("does not change the selected option when no option text starts with the typed printable character", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
        <Option text="black" value="black" />
      </InteractiveComponent>,
    );

    await user.type(screen.getByRole("combobox"), "bx");

    expect(screen.getByText("blue", { ignore: "li" })).toBeVisible();
  });

  it("selects the first option with text matching the typed substring when typed quickly", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}}>
        <Option text="blue" value="blue" />
        <Option text="black" value="black" />
        <Option text="brown" value="brown" />
      </InteractiveComponent>,
    );

    await user.type(screen.getByRole("combobox"), "bla");

    expect(screen.getByText("black", { ignore: "li" })).toBeVisible();
  });

  it("selects the first option starting with the latest printable character typed after a long pause", async () => {
    jest.useFakeTimers();

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <InteractiveComponent label="Colour" onChange={() => {}}>
        <Option text="blue" value="blue" />
        <Option text="black" value="black" />
        <Option text="brown" value="brown" />
        <Option text="green" value="green" />
      </InteractiveComponent>,
    );

    const input = screen.getByRole("combobox");
    await user.type(input, "bla");
    act(() => jest.runOnlyPendingTimers());
    await user.type(input, "g");

    expect(screen.getByText("green", { ignore: "li" })).toBeVisible();

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  ["Meta", "Control"].forEach((specialKey) => {
    test(`does not select any option when a printable character is typed while holding down the ${specialKey} key`, async () => {
      const user = userEvent.setup();
      render(
        <InteractiveComponent label="Colour" onChange={() => {}}>
          <Option text="amber" value="amber" />
          <Option text="blue" value="blue" />
          <Option text="black" value="black" />
        </InteractiveComponent>,
      );

      // Hold special key down while typing 'b'
      await user.type(screen.getByRole("combobox"), `{${specialKey}>}b`);

      expect(screen.getByText("Please Select...")).toBeVisible();
    });
  });

  it("does not change selected option when value prop is set", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} value="amber">
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </SimpleSelect>,
    );

    await user.type(screen.getByRole("combobox"), "blue");

    expect(
      screen.queryByText("blue", { ignore: "li" }),
    ).not.toBeInTheDocument();
  });

  it("calls onChange prop each time a character typed into the input", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <InteractiveComponent label="Colour" onChange={onChange}>
        <Option text="blue" value="blue" />
        <Option text="black" value="black" />
        <Option text="brown" value="brown" />
      </InteractiveComponent>,
    );

    await user.type(screen.getByRole("combobox"), "bla");

    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it("calls onChange prop with the value of the matched option after a character is typed into the input", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <InteractiveComponent
        label="Colour"
        name="colour"
        id="colour"
        onChange={onChange}
      >
        <Option text="blue" value="blue" />
        <Option text="black" value="black" />
        <Option text="brown" value="brown" />
      </InteractiveComponent>,
    );

    await user.type(screen.getByRole("combobox"), "b");

    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        target: { value: "blue", name: "colour", id: "colour" },
        selectionConfirmed: false,
      }),
    );
  });
});

describe("dropdown list", () => {
  it("opens when input is clicked", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByRole("listbox")).toBeVisible();
  });

  it("opens when input's dropdown icon is clicked", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.click(screen.getByTestId("input-icon-toggle"));

    expect(await screen.findByRole("listbox")).toBeVisible();
  });

  ["Space", "ArrowUp", "ArrowDown", "Home", "End"].forEach((key) => {
    test(`opens when input is focused and ${key} key is pressed`, async () => {
      const user = userEvent.setup();
      render(
        <SimpleSelect label="Colour" onChange={() => {}} value={""}>
          <Option text="amber" value="amber" />
        </SimpleSelect>,
      );

      await user.tab();
      await user.keyboard(`[${key}]`);

      expect(await screen.findByRole("listbox")).toBeVisible();
    });
  });

  ["Enter", "a"].forEach((key) =>
    test(`does not open when ${key} key is pressed`, async () => {
      const user = userEvent.setup();
      render(
        <SimpleSelect label="Colour" onChange={() => {}} value="">
          <Option text="amber" value="amber" />
        </SimpleSelect>,
      );

      await user.tab();
      await user.keyboard(`[${key}]`);

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    }),
  );

  it("does not open, when input is disabled and is clicked", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} disabled value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not open, when input is disabled and is selected with the keyboard", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} disabled value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.tab();
    await user.keyboard("[Space]");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not open, when input is read-only and is clicked", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} readOnly value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.click(screen.getByRole("textbox"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not open, when input is read-only and Space bar is pressed", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} readOnly value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.tab();
    await user.keyboard("[Space]");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens when input is focused and openOnFocus prop is true", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} openOnFocus value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.tab();

    expect(await screen.findByRole("listbox")).toBeVisible();
  });

  it("does not open, when input is focused and openOnFocus prop is false", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect
        label="Colour"
        onChange={() => {}}
        openOnFocus={false}
        value=""
      >
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.tab();

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes when an option is clicked", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "amber" }));

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  it("closes when an option is focused and Enter key is pressed", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.click(screen.getByRole("combobox"));
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  it("closes when input is clicked twice", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("combobox"));

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  it("closes when clicking outside the list", async () => {
    const user = userEvent.setup();
    render(
      <>
        <SimpleSelect label="Colour" onChange={() => {}} value="">
          <Option text="amber" value="amber" />
        </SimpleSelect>
        <p>Outside content</p>
      </>,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Outside content"));

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  test("when a custom adaptive sidebar blur event is dispatched the list closes", async () => {
    const user = userEvent.setup();

    render(
      <SimpleSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="green" />
      </SimpleSelect>,
    );

    act(() => {
      screen.getByRole("combobox").focus();
    });
    await user.keyboard("{ArrowDown}");

    const listbox = screen.queryByRole("listbox");

    expect(listbox).toBeVisible();

    await act(async () => {
      document.dispatchEvent(
        new CustomEvent("adaptiveSidebarModalFocusIn", {
          bubbles: true,
          detail: { source: "adaptiveSidebarModal" },
        }),
      );
    });

    expect(listbox).not.toBeVisible();
  });
});

describe("when onClick prop is passed", () => {
  it("is called when input is clicked", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <SimpleSelect
        label="Colour"
        onChange={() => {}}
        onClick={onClick}
        value=""
      >
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is not called when disabled input is clicked", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <SimpleSelect
        label="Colour"
        onChange={() => {}}
        onClick={onClick}
        disabled
        value=""
      >
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("is not called when read-only input is clicked", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <SimpleSelect
        label="Colour"
        onChange={() => {}}
        onClick={onClick}
        readOnly
        value=""
      >
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.click(screen.getByRole("textbox"));

    expect(onClick).not.toHaveBeenCalled();
  });
});

test("calls onOpen when list is opened", async () => {
  const onOpen = jest.fn();
  const user = userEvent.setup();
  render(
    <SimpleSelect label="Colour" onChange={() => {}} onOpen={onOpen} value="">
      <Option text="amber" value="amber" />
    </SimpleSelect>,
  );

  await user.click(screen.getByRole("combobox"));

  expect(onOpen).toHaveBeenCalledTimes(1);
});

test("calls onKeyDown prop with details of the pressed key, when typing a character into the input", async () => {
  const user = userEvent.setup();
  const onKeyDown = jest.fn();
  render(
    <SimpleSelect
      label="Colour"
      onChange={() => {}}
      onKeyDown={onKeyDown}
      value=""
    >
      <Option text="amber" value="amber" />
    </SimpleSelect>,
  );

  await user.type(screen.getByRole("combobox"), "{c}");

  expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ key: "c" }));
});

test("calls onFocus prop when input is focused", async () => {
  const onFocus = jest.fn();
  const user = userEvent.setup();
  render(
    <SimpleSelect label="Colour" onChange={() => {}} onFocus={onFocus} value="">
      <Option text="amber" value="amber" />
    </SimpleSelect>,
  );

  await user.tab();

  expect(onFocus).toHaveBeenCalledTimes(1);
});

describe("when onBlur prop is passed", () => {
  it("is called when input loses focus", async () => {
    const onBlur = jest.fn();
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} onBlur={onBlur} value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.tab();
    await user.tab({ shift: true });

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("is not called when input loses focus temporarily due to option selection", async () => {
    const onBlur = jest.fn();
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} onBlur={onBlur} value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    await user.click(screen.getByRole("combobox"));

    await user.click(screen.getByRole("option", { name: "amber" }));

    expect(onBlur).not.toHaveBeenCalled();
  });
});

describe("forwarded ref", () => {
  it("allows access to the input element through a forwarded callback ref", () => {
    const mockRef = jest.fn((element) => element);
    render(
      <SimpleSelect label="Colour" onChange={() => {}} ref={mockRef} value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    expect(mockRef).toHaveBeenNthCalledWith(1, screen.getByRole("combobox"));
  });

  it("allows access to the input element through a forwarded ref object", () => {
    const mockRef = { current: null };
    render(
      <SimpleSelect label="Colour" onChange={() => {}} ref={mockRef} value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>,
    );

    expect(mockRef.current).toBe(screen.getByRole("combobox"));
  });
});

test("marks input as required when required prop is true", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}} required value="">
      <Option text="amber" value="amber" />
    </SimpleSelect>,
  );

  expect(screen.getByRole("combobox")).toBeRequired();
});

test("does not call onOpen, when openOnFocus is true and the input is refocused while the dropdown list is already open", () => {
  jest.useFakeTimers();

  const onOpen = jest.fn();
  render(
    <SimpleSelect
      label="Colour"
      onChange={() => {}}
      onOpen={onOpen}
      openOnFocus
      value=""
    >
      <Option text="amber" value="amber" />
    </SimpleSelect>,
  );

  const input = screen.getByRole("combobox");

  // open dropdown list
  fireEvent.focus(input);
  act(() => jest.runOnlyPendingTimers());

  onOpen.mockClear();

  // refocus input
  fireEvent.focus(input);
  act(() => jest.runOnlyPendingTimers());

  expect(onOpen).not.toHaveBeenCalled();

  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("the options are cleared when the reset button is pressed", async () => {
  const user = userEvent.setup();
  const SimpleSelectComponent = () => {
    const [value, setValue] = useState("");
    const [optionList, setOptionList] = useState([
      <Option text="amber" value="amber" key="amber" />,
    ]);

    const clearData = () => {
      setOptionList([]);
      setValue("");
    };

    return (
      <Box height={300}>
        <Button onClick={clearData} mb={2}>
          reset button
        </Button>
        <SimpleSelect
          name="select"
          id="select"
          label="color"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          {optionList}
        </SimpleSelect>
      </Box>
    );
  };

  render(<SimpleSelectComponent />);

  await user.click(screen.getByRole("combobox"));

  await user.click(await screen.findByRole("option", { name: "amber" }));

  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

  await user.click(screen.getByText("reset button"));

  await user.click(screen.getByRole("combobox"));

  expect(screen.queryByRole("option")).not.toBeInTheDocument();
});

testStyledSystemMargin(
  (props) => (
    <SimpleSelect
      {...props}
      data-role="my-select"
      label="Colour"
      onChange={() => {}}
      value=""
    >
      <Option text="amber" value="amber" />
    </SimpleSelect>
  ),
  () => screen.getByTestId("my-select"),
);
