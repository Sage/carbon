import React, { useRef, useState } from "react";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { testStyledSystemMargin } from "../../../__spec_helper__/__internal__/test-utils";
import { FilterableSelect, Option, FilterableSelectProps } from "..";
import guid from "../../../__internal__/utils/helpers/guid";
import Logger from "../../../__internal__/utils/logger";
import mockDOMRect from "../../../__spec_helper__/mock-dom-rect";

const mockedGuid = "mocked-guid";
jest.mock("../../../__internal__/utils/logger");
jest.mock("../../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockReturnValue(mockedGuid);

beforeAll(() => {
  mockDOMRect(200, 200, "select-list-scrollable-container");
});

testStyledSystemMargin(
  (props) => (
    <FilterableSelect data-role="my-select" {...props}>
      <Option text="Amber" value="1" />
    </FilterableSelect>
  ),
  () => screen.getByTestId("my-select"),
);

const FilterableSelectWithState = ({
  disableDefaultFiltering,
  children,
  value = "",
}: Partial<FilterableSelectProps>) => {
  const [innerValue, setInnerValue] = useState(value);
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInnerValue(ev.target.value);
  };
  return (
    <FilterableSelect
      openOnFocus
      disableDefaultFiltering={disableDefaultFiltering}
      label="filterable-select"
      onChange={handleChange}
      value={innerValue}
    >
      {children}
    </FilterableSelect>
  );
};

const FilterableSelectWithStateAndObjects = ({
  label,
  ...props
}: Partial<FilterableSelectProps>) => {
  const optionListValues = [
    { id: "Black", value: 1, text: "Black" },
    { id: "Blue", value: 2, text: "Blue" },
  ];

  const [value, setValue] = useState<Record<string, unknown>>(
    optionListValues[1],
  );

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as Record<string, unknown>);
  }
  return (
    <FilterableSelect
      label={label}
      value={value}
      onChange={onChangeHandler}
      {...props}
    >
      {optionListValues.map((option) => (
        <Option key={option.id} text={option.text} value={option} />
      ))}
    </FilterableSelect>
  );
};

const FilterableSelectWithDefaultValueStateAndObjects = ({
  label,
  defaultValue,
  ...props
}: Partial<FilterableSelectProps>) => {
  const optionListValues = [
    { id: "Black", value: 1, text: "Black" },
    { id: "Blue", value: 2, text: "Blue" },
  ];

  return (
    <FilterableSelect
      label={label}
      defaultValue={defaultValue}
      onChange={() => {}}
      {...props}
    >
      {optionListValues.map((option) => (
        <Option key={option.id} text={option.text} value={option} />
      ))}
    </FilterableSelect>
  );
};

test("should display deprecation warning once when rendered as optional", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");

  render(
    <>
      <FilterableSelect
        label="one"
        defaultValue="opt1"
        isOptional
        onChange={() => {}}
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>
      <FilterableSelect
        label="one"
        defaultValue="opt1"
        isOptional
        onChange={() => {}}
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>
    </>,
  );

  expect(loggerSpy).toHaveBeenNthCalledWith(
    1,
    "`isOptional` is deprecated in FilterableSelect and support will soon be removed. If the value of this component is not required, use the `required` prop and set it to false instead.",
  );

  loggerSpy.mockRestore();
});

test("should display a deprecation warning only once for all instances of component when they are uncontrolled", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(
    <>
      <FilterableSelect label="one" defaultValue="opt1">
        <Option value="opt1" text="red" />
      </FilterableSelect>
      <FilterableSelect label="two" defaultValue="opt1">
        <Option value="opt1" text="red" />
      </FilterableSelect>
    </>,
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    "Uncontrolled behaviour in `Filterable Select` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);
  loggerSpy.mockClear();
});

test("should not display deprecation warning about uncontrolled Textbox when parent component is controlled", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(
    <FilterableSelect
      label="Colour"
      onChange={() => {}}
      value="1"
      placeholder="Select a colour"
    >
      <Option text="Amber" value="1" />
    </FilterableSelect>,
  );

  expect(loggerSpy).not.toHaveBeenCalled();
  loggerSpy.mockClear();
});

test("should not display deprecation warning about uncontrolled Textbox when parent component is not controlled", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(
    <FilterableSelect label="Colour" placeholder="Select a colour">
      <Option text="Amber" value="1" />
    </FilterableSelect>,
  );

  expect(loggerSpy).not.toHaveBeenCalledWith(
    "Uncontrolled behaviour in `Textbox` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
  );
  loggerSpy.mockClear();
});

test("should update the input value when user clicks an option and the component is uncontrolled", async () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  const user = userEvent.setup();
  render(
    <FilterableSelect>
      <Option value="opt1" text="red" />
    </FilterableSelect>,
  );

  const input = screen.getByRole("combobox");
  await user.click(input);
  const option = await screen.findByRole("option", { name: "red" });
  await user.click(option);

  expect(input).toHaveValue("red");
  loggerSpy.mockClear();
});

test("should update the input value to highlight any matching option text when user types and the component is uncontrolled", async () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  const user = userEvent.setup();
  render(
    <FilterableSelect>
      <Option value="opt1" text="green" />
    </FilterableSelect>,
  );

  const input = screen.getByRole("combobox") as HTMLInputElement;
  await user.type(input, "gre");

  expect(input.selectionStart).toBe(3);
  expect(input.selectionEnd).toBe(5);

  loggerSpy.mockClear();
});

test("should render combobox without text overlay", () => {
  render(
    <FilterableSelect label="Colour" onChange={() => {}} value="">
      <Option text="Amber" value="1" />
    </FilterableSelect>,
  );

  expect(screen.getByRole("combobox")).toBeVisible();
  expect(screen.queryByTestId("select-text")).not.toBeInTheDocument();
});

test("should initially render combobox with placeholder text when props is not passed", () => {
  render(
    <FilterableSelect label="Colour" onChange={() => {}} value="">
      <Option text="Amber" value="1" />
    </FilterableSelect>,
  );

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Please Select...",
  );
});

test("should initially render combobox with custom `placeholder` when prop is passed", () => {
  render(
    <FilterableSelect
      label="Colour"
      onChange={() => {}}
      value=""
      placeholder="Select a colour"
    >
      <Option text="Amber" value="1" />
    </FilterableSelect>,
  );

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Select a colour",
  );
});

test("should initially render default value text when prop is passed", () => {
  render(
    <FilterableSelectWithDefaultValueStateAndObjects
      defaultValue={{ id: "Blue", value: 2, text: "Blue" }}
    />,
  );

  expect(screen.getByRole("combobox")).toHaveValue("Blue");
});

test("should render combobox with correct accessible name when `label` prop is provided", () => {
  render(
    <FilterableSelect label="Colour" onChange={() => {}} value="">
      <Option text="Amber" value="1" />
    </FilterableSelect>,
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("Colour");
});

test("should render combobox with correct accessible name when `aria-label` prop is provided", () => {
  render(
    <FilterableSelect aria-label="Colour" onChange={() => {}} value="">
      <Option text="Amber" value="1" />
    </FilterableSelect>,
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("Colour");
});

test("combobox has correct accessible name when `aria-labelledby` prop is provided", () => {
  render(
    <>
      <h2 id="my-select-heading">My Select</h2>
      <FilterableSelect
        aria-labelledby="my-select-heading"
        onChange={() => {}}
        value=""
      >
        <Option text="Amber" value="1" />
      </FilterableSelect>
    </>,
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("My Select");
});

test("should render combobox with no accessible name when none of the relevant props are provided", () => {
  render(
    <FilterableSelect onChange={() => {}} value="">
      <Option text="Amber" value="1" />
    </FilterableSelect>,
  );

  expect(screen.getByRole("combobox")).not.toHaveAccessibleName();
});

test("should render the input with `type` attribute of 'text'", () => {
  render(
    <FilterableSelect
      label="testSelect"
      id="testSelect"
      onChange={() => {}}
      value=""
    >
      <Option value="opt1" text="red" />
    </FilterableSelect>,
  );

  expect(screen.getByRole("combobox")).toHaveAttribute("type", "text");
});

test("should forward the `ref` to the input element", () => {
  let mockRef = { current: null };

  const WrapperComponent = () => {
    mockRef = useRef(null);

    return (
      <FilterableSelect
        label="testSelect"
        id="testSelect"
        ref={mockRef}
        onChange={() => {}}
        value=""
      >
        <Option value="opt1" text="red" />
        <Option value="opt2" text="green" />
        <Option value="opt3" text="blue" />
        <Option value="opt4" text="black" />
      </FilterableSelect>
    );
  };

  render(<WrapperComponent />);

  expect(mockRef.current).toBe(screen.getByRole("combobox"));
});

test("should call the `ref` with the input element when passed as a callback", () => {
  let mockRef;

  const WrapperComponent = () => {
    mockRef = jest.fn();

    return (
      <FilterableSelect
        label="testSelect"
        id="testSelect"
        ref={mockRef}
        onChange={() => {}}
        value=""
      >
        <Option value="opt1" text="red" />
        <Option value="opt2" text="green" />
        <Option value="opt3" text="blue" />
        <Option value="opt4" text="black" />
      </FilterableSelect>
    );
  };

  render(<WrapperComponent />);

  expect(mockRef).toHaveBeenCalledWith(screen.getByRole("combobox"));
});

describe("when the `id` prop is set", () => {
  const mockId = "foo";

  it("should be passed to the underlying input", () => {
    render(
      <FilterableSelect
        label="filterable-select"
        id={mockId}
        onChange={() => {}}
        value=""
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );

    expect(screen.getByRole("combobox")).toHaveAttribute("id", mockId);
  });

  it("should be used to create an id for the label element", () => {
    render(
      <FilterableSelect
        label="filterable-select"
        id={mockId}
        onChange={() => {}}
        value=""
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    expect(screen.getByText("filterable-select")).toHaveAttribute(
      "id",
      `${mockId}-label`,
    );
  });

  it("should be used to set an accessible name on the list element", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        id={mockId}
        onChange={() => {}}
        value=""
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));
    const list = await screen.findByRole("listbox");

    await waitFor(() => {
      expect(list).toHaveAccessibleName("filterable-select");
    });
  });
});

describe("when the `id` prop is not set", () => {
  it("should pass a uniquely generated string to the input element", () => {
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );

    expect(screen.getByRole("combobox")).toHaveAttribute("id", mockedGuid);
  });

  it("should use the uniquely generated string to create an id for the label element", () => {
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );

    expect(screen.getByText("filterable-select")).toHaveAttribute(
      "id",
      `${mockedGuid}-label`,
    );
  });

  it("should use the uniquely generated string to set an accessible name on the list element", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));
    const list = await screen.findByRole("listbox");

    await waitFor(() => {
      expect(list).toHaveAccessibleName("filterable-select");
    });
  });
});

test("should override the default list 'max-height' when `listMaxHeight` passed", async () => {
  render(
    <FilterableSelect
      label="filterable-select"
      listMaxHeight={200}
      onChange={() => {}}
      value=""
    >
      <Option value="opt1" text="red" />
    </FilterableSelect>,
  );
  act(() => {
    screen.getByRole("combobox").focus();
  });

  const listContainer = await screen.findByTestId(
    "select-list-scrollable-container",
  );

  await waitFor(() => {
    expect(listContainer).toHaveStyle("max-height: 200px");
  });
});

test("should set the `placeholder` text when prop is passed", () => {
  render(
    <FilterableSelect
      label="filterable-select"
      onChange={() => {}}
      value=""
      placeholder="Select a colour"
    >
      <Option value="opt1" text="red" />
    </FilterableSelect>,
  );

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Select a colour",
  );
});

describe("when controlled", () => {
  it("should set the input `value` to the matching option's `text`", () => {
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value="opt1"
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );

    expect(screen.getByRole("combobox")).toHaveValue("red");
  });

  it("should set the input `value` to empty string if no matching option exists", () => {
    render(
      <FilterableSelect
        name="testSelect"
        id="testSelect"
        value="opt2"
        onChange={() => {}}
      >
        <Option value="opt1" text="blue" />
      </FilterableSelect>,
    );

    expect(screen.getByRole("combobox")).toHaveValue("");
  });

  it("should set the input `value` to the option `text` if one is dynamically added on rerender", () => {
    const { rerender } = render(
      <FilterableSelectWithState value="opt2">
        <Option value="opt1" text="blue" />
      </FilterableSelectWithState>,
    );

    expect(screen.getByRole("combobox")).toHaveValue("");

    rerender(
      <FilterableSelectWithState>
        <Option value="opt1" text="blue" />
        <Option value="opt2" text="red" />
      </FilterableSelectWithState>,
    );

    expect(screen.getByRole("combobox")).toHaveValue("red");
  });
});

test("should call `onFocus` callback when input is focused", () => {
  jest.useFakeTimers();
  const onFocusFn = jest.fn();
  render(
    <FilterableSelect
      label="filterable-select"
      onChange={() => {}}
      value=""
      onFocus={onFocusFn}
    >
      <Option value="opt1" text="red" />
    </FilterableSelect>,
  );
  act(() => {
    screen.getByRole("combobox").focus();
    jest.runOnlyPendingTimers();
  });

  expect(onFocusFn).toHaveBeenCalled();
  jest.useRealTimers();
});

test("should call `onFocus` callback when input is focused and `openOnFocus` is set", () => {
  jest.useFakeTimers();
  const onFocusFn = jest.fn();
  render(
    <FilterableSelect
      openOnFocus
      label="filterable-select"
      onChange={() => {}}
      value=""
      onFocus={onFocusFn}
    >
      <Option value="opt1" text="red" />
    </FilterableSelect>,
  );
  act(() => {
    screen.getByRole("combobox").focus();
    jest.runOnlyPendingTimers();
  });

  expect(onFocusFn).toHaveBeenCalled();
  jest.useRealTimers();
});

test("should call `onBlur` callback when input is blurred", () => {
  const onBlurFn = jest.fn();
  render(
    <FilterableSelect
      label="filterable-select"
      onChange={() => {}}
      value=""
      onBlur={onBlurFn}
    >
      <Option value="opt1" text="red" />
    </FilterableSelect>,
  );
  act(() => {
    screen.getByRole("combobox").focus();
    screen.getByRole("combobox").blur();
  });

  expect(onBlurFn).toHaveBeenCalled();
});

test("should not call `onBlur` when the user clicks on an option", async () => {
  const onBlurFn = jest.fn();
  const user = userEvent.setup();
  render(
    <FilterableSelect
      openOnFocus
      label="filterable-select"
      onChange={() => {}}
      value=""
      onBlur={onBlurFn}
    >
      <Option value="opt1" text="red" />
    </FilterableSelect>,
  );
  act(() => {
    screen.getByRole("combobox").focus();
  });

  await user.click(await screen.findByRole("option", { name: "red" }));

  expect(onBlurFn).not.toHaveBeenCalled();
});

test("should call `onChange` callback when the user types in the input", async () => {
  const onChangeFn = jest.fn();
  const user = userEvent.setup();
  render(
    <FilterableSelect
      id="foo"
      name="bar"
      label="filterable-select"
      onChange={onChangeFn}
      value=""
    >
      <Option value="opt1" text="red" />
    </FilterableSelect>,
  );
  await user.type(screen.getByRole("combobox"), "r");

  await waitFor(() => {
    expect(onChangeFn).toHaveBeenCalledWith({
      selectionConfirmed: false,
      target: { id: "foo", name: "bar", value: "opt1" },
    });
  });
});

describe("when the input is focused", () => {
  it("should not display the list when the `openOnFocus` prop is not set", () => {
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    act(() => {
      screen.getByRole("combobox").focus();
    });

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should display the list when the `openOnFocus` prop is set", async () => {
    jest.useFakeTimers();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        openOnFocus
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    act(() => {
      screen.getByRole("combobox").focus();
    });

    act(() => jest.runOnlyPendingTimers());

    expect(await screen.findByRole("listbox")).toBeVisible();
    jest.useRealTimers();
  });

  it.each(["ArrowDown", "ArrowUp", "Home", "End"])(
    "should display the list when the '%s' key is pressed",
    async (key) => {
      const user = userEvent.setup();
      render(
        <FilterableSelect
          label="filterable-select"
          onChange={() => {}}
          value=""
        >
          <Option value="opt1" text="red" />
        </FilterableSelect>,
      );
      await user.type(screen.getByRole("combobox"), key);

      expect(await screen.findByRole("listbox")).toBeVisible();
    },
  );

  it.each(["ArrowDown", "ArrowUp", "Home", "End"])(
    "should not display the list when the '%s' key is pressed and `readOnly` is set",
    async (key) => {
      const user = userEvent.setup();
      render(
        <FilterableSelect
          readOnly
          label="filterable-select"
          onChange={() => {}}
          value=""
        >
          <Option value="opt1" text="red" />
        </FilterableSelect>,
      );
      await user.type(screen.getByRole("textbox"), key);

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    },
  );

  it("should not display the list when the user presses the 'Enter' key", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.type(screen.getByRole("combobox"), "{Enter}");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should display the list and update the input value when the user types a character that matches an option", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.type(screen.getByRole("combobox"), "r");

    expect(await screen.findByRole("listbox")).toBeVisible();
    expect(screen.getByRole("combobox")).toHaveValue("red");
  });

  it("should delete the last character with backspace and the correct match text is provided, if the values are objects", async () => {
    const user = userEvent.setup();

    render(<FilterableSelectWithStateAndObjects />);

    const input = screen.getByRole("combobox");

    expect(input).toHaveValue("Blue");

    await user.click(input);
    await user.click(input);

    await user.type(input, "{Backspace}");
    expect(input).toHaveValue("Blu");

    await user.type(input, "{Backspace}");
    expect(input).toHaveValue("Black");
  });

  it("should display the list but not update the input value when the user types a character that does not match an option", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.type(screen.getByRole("combobox"), "x");

    expect(await screen.findByRole("listbox")).toBeVisible();
    expect(screen.getByRole("combobox")).toHaveValue("x");
  });
});

describe("when the user clicks on the input", () => {
  it("should display the list when `openOnFocus` is not set", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByRole("listbox")).toBeVisible();
  });

  it("should call the `onClick` callback if prop is passed", async () => {
    const onClickFn = jest.fn();
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        onClick={onClickFn}
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(onClickFn).toHaveBeenCalled();
  });

  it("should call `onOpen` callback if prop is passed", async () => {
    const onOpenFn = jest.fn();
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        onOpen={onOpenFn}
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(onOpenFn).toHaveBeenCalled();
  });

  it("should not call the `onOpen` callback if the list is already open", async () => {
    const onOpenFn = jest.fn();
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));
    onOpenFn.mockReset();
    await user.click(screen.getByRole("combobox"));

    expect(onOpenFn).not.toHaveBeenCalled();
  });

  it("should not display the list when the `readOnly prop is set", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        readOnly
        label="filterable-select"
        onChange={() => {}}
        value=""
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("textbox"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should not display the list when the `disabled` prop is set", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        disabled
        label="filterable-select"
        onChange={() => {}}
        value=""
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should not close the list when the user clicks on the input and the list is already open", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByRole("listbox")).toBeVisible();
  });
});

describe("when the user clicks on the input icon", () => {
  it("should display the list when `openOnFocus` is not set", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    const icon = within(screen.getByRole("presentation")).getByTestId("icon");
    await user.click(icon);

    expect(await screen.findByRole("listbox")).toBeVisible();
  });

  it("should not display the list when `openOnFocus` is set and mousedown is detected on icon", async () => {
    const user = userEvent.setup();

    render(
      <FilterableSelect
        openOnFocus
        label="filterable-select"
        onChange={() => {}}
        value=""
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );

    const icon = within(screen.getByRole("presentation")).getByTestId("icon");
    await user.pointer({ keys: "[MouseLeft>]", target: icon });

    await waitFor(() => {
      expect(screen.getByRole("combobox")).toHaveFocus();
    });

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should close the list when the user clicks on the input icon and the list is already open", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    const icon = within(screen.getByRole("presentation")).getByTestId("icon");
    await user.click(icon);
    await user.click(icon);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should call the `onClick` callback if one is passed", async () => {
    const user = userEvent.setup();
    const onClickFn = jest.fn();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        onClick={onClickFn}
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    const icon = within(screen.getByRole("presentation")).getByTestId("icon");
    await user.click(icon);

    expect(onClickFn).toHaveBeenCalled();
  });

  it("should call `onOpen` callback if prop is passed", async () => {
    const onOpenFn = jest.fn();
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        onOpen={onOpenFn}
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    const icon = within(screen.getByRole("presentation")).getByTestId("icon");
    await user.click(icon);

    expect(onOpenFn).toHaveBeenCalled();
  });
});

describe("the placement of the list element", () => {
  it("should set the expected attribute on the list when `listPlacement` is not passed", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      "bottom",
    );
  });

  it("should set the expected attribute on the list when `listPlacement` is 'top'", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        listPlacement="top"
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      "top",
    );
  });

  it("should set the expected attribute on the list when `listPlacement` is 'bottom'", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        listPlacement="bottom"
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      "bottom",
    );
  });

  it("should set the expected attribute on the list when `listPlacement` is 'top-end'", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        listPlacement="top-end"
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      "top-end",
    );
  });

  it("should set the expected attribute on the list when `listPlacement` is 'bottom-end'", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        listPlacement="bottom-end"
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      "bottom-end",
    );
  });

  it("should set the expected attribute on the list when `listPlacement` is 'top-start'", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        listPlacement="top-start"
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      "top-start",
    );
  });

  it("should set the expected attribute on the list when `listPlacement` is 'bottom-start'", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        listPlacement="bottom-start"
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      "bottom-start",
    );
  });

  it("should set the expected attribute on the list when `listPlacement` is not passed but `listWidth` is set", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        listWidth={100}
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      "bottom-end",
    );
  });

  it("should set the expected attribute on the list when `listPlacement` is 'top' and `listWidth` is set", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        listPlacement="top"
        listWidth={100}
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      "top-end",
    );
  });

  it("should set the expected attribute on the list when `listPlacement` is 'bottom' and `listWidth` is set", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        listPlacement="bottom"
        listWidth={100}
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      "bottom-end",
    );
  });

  it("should not override the attribute on the list when `listPlacement` is 'top-start' and `listWidth` is set", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        listPlacement="top-start"
        listWidth={100}
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      "top-start",
    );
  });

  it("should not override the attribute on the list when `listPlacement` is 'top-end' and `listWidth` is set", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        listPlacement="top-end"
        listWidth={100}
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      "top-end",
    );
  });

  it("should not override the attribute on the list when `listPlacement` is 'bottom-start' and `listWidth` is set", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        listPlacement="bottom-start"
        listWidth={100}
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      "bottom-start",
    );
  });

  it("should not override the attribute on the list when `listPlacement` is 'bottom-end' and `listWidth` is set", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        listPlacement="bottom-end"
        listWidth={100}
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      "bottom-end",
    );
  });
});

describe("when the user types in the input", () => {
  it("should update the input value when the user presses 'Delete' and the text is highlighted", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value="opt1"
      >
        <Option value="opt1" text="abc" />
      </FilterableSelect>,
    );
    const input = screen.getByRole("combobox");
    await user.type(input, "{Delete}");

    expect(input).toHaveValue("");
  });

  it("should update the input value when the user presses 'Delete' and the cursor is at the start of the text", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value="opt1"
      >
        <Option value="opt1" text="abc" />
      </FilterableSelect>,
    );
    const input = screen.getByRole("combobox") as HTMLInputElement;
    await user.click(input);
    input.setSelectionRange(0, 0);
    await user.keyboard("{Delete}");

    expect(input).toHaveValue("bc");
  });

  it("should highlight the remaining part after matching with the relevant option text", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="green" />
      </FilterableSelect>,
    );
    const input = screen.getByRole("combobox") as HTMLInputElement;
    await user.type(screen.getByRole("combobox"), "gree");

    expect(input.selectionStart).toBe(4);
    expect(input.selectionEnd).toBe(5);
  });

  it("should not highlight any part of the option text when it fully matches", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="green" />
      </FilterableSelect>,
    );
    const input = screen.getByRole("combobox") as HTMLInputElement;
    await user.type(screen.getByRole("combobox"), "green");

    expect(input.selectionStart).toBe(5);
    expect(input.selectionEnd).toBe(5);
  });

  it("should trim any preceding whitespace and set the input selection correctly", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="green" />
      </FilterableSelect>,
    );
    const input = screen.getByRole("combobox") as HTMLInputElement;
    await user.type(screen.getByRole("combobox"), "   gre");

    expect(input).toHaveValue("green");
    expect(input.selectionStart).toBe(3);
    expect(input.selectionEnd).toBe(5);
  });

  it("should set the aria-selected attribute on the matching option", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="green" />
      </FilterableSelect>,
    );
    await user.type(screen.getByRole("combobox"), "gre");

    expect(await screen.findByRole("option")).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("should not trim any following whitespace that matches an option text", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="black and white" />
      </FilterableSelect>,
    );
    const input = screen.getByRole("combobox") as HTMLInputElement;
    await user.type(screen.getByRole("combobox"), "black ");

    expect(input).toHaveValue("black and white");
  });

  it("should trim any following whitespace and select the matching option", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="green" />
      </FilterableSelect>,
    );
    await user.type(screen.getByRole("combobox"), "gre   ");

    expect(await screen.findByRole("option")).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("should not trim the if only whitespace is typed", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect label="filterable-select" onChange={() => {}} value="">
        <Option value="opt1" text="black" />
      </FilterableSelect>,
    );
    const input = screen.getByRole("combobox") as HTMLInputElement;
    await user.type(screen.getByRole("combobox"), "   ");

    expect(input).toHaveValue("   ");
  });

  it("should call the `onFilterChange` callback if passed", async () => {
    const onFilterChangeFn = jest.fn();
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        onFilterChange={onFilterChangeFn}
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );
    await user.type(screen.getByRole("combobox"), "foo");

    expect(onFilterChangeFn).toHaveBeenCalledWith("foo");
  });

  it("should not be call the `onFilterChange` callback if passed when the component rerenders", () => {
    const onFilterChangeFn = jest.fn();
    const { rerender } = render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        onFilterChange={onFilterChangeFn}
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );

    rerender(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        onFilterChange={onFilterChangeFn}
      >
        <Option value="opt1" text="red" />
      </FilterableSelect>,
    );

    expect(onFilterChangeFn).not.toHaveBeenCalled();
  });

  it("should update the input value as the user types a filter string that matches different option text", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value="opt1"
      >
        <Option value="opt1" text="blue" />
        <Option value="opt2" text="black" />
      </FilterableSelect>,
    );
    const input = screen.getByRole("combobox") as HTMLInputElement;
    await user.type(screen.getByRole("combobox"), "bla");

    expect(input).toHaveValue("black");
  });
});

describe("when the user selects an option", () => {
  it("should update the input value when the user clicks", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelectWithState value="opt1">
        <Option value="opt1" text="red" />
        <Option value="opt2" text="green" />
      </FilterableSelectWithState>,
    );
    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "green" }));

    expect(screen.getByRole("combobox")).toHaveValue("green");
  });

  it("should call `onSelect` when the user clicks", async () => {
    const user = userEvent.setup();
    const onSelectFn = jest.fn();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        onSelect={onSelectFn}
      >
        <Option value="opt1" text="green" />
      </FilterableSelect>,
    );
    const input = screen.getByRole("combobox");
    await user.click(input);
    await user.click(await screen.findByRole("option", { name: "green" }));

    expect(onSelectFn).toHaveBeenCalled();
  });

  it("should call `onSelect` when the user presses the 'Enter' key", async () => {
    const onSelectFn = jest.fn();
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        onSelect={onSelectFn}
      >
        <Option value="opt1" text="green" />
      </FilterableSelect>,
    );
    act(() => {
      screen.getByRole("combobox").focus();
    });
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    expect(onSelectFn).toHaveBeenCalled();
  });

  it("should call `onSelect` when the user presses the 'Space' key", async () => {
    const onSelectFn = jest.fn();
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        onSelect={onSelectFn}
      >
        <Option value="opt1" text="green" />
      </FilterableSelect>,
    );
    act(() => {
      screen.getByRole("combobox").focus();
    });
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard(" ");

    expect(onSelectFn).toHaveBeenCalled();
  });

  it("should call `onSelect` each time the user presses the 'ArrowDown' key to navigate the list", async () => {
    const onSelectFn = jest.fn();
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        onSelect={onSelectFn}
      >
        <Option value="opt1" text="green" />
        <Option value="opt2" text="blue" />
      </FilterableSelect>,
    );
    act(() => {
      screen.getByRole("combobox").focus();
    });
    await user.keyboard("{ArrowDown}");

    expect(onSelectFn).toHaveBeenCalled();
    onSelectFn.mockReset();
    await user.keyboard("{ArrowDown}");
    expect(onSelectFn).toHaveBeenCalled();
  });

  it("should call `onSelect` each time the user presses the 'ArrowUp' key to navigate the list", async () => {
    const onSelectFn = jest.fn();
    const user = userEvent.setup();
    render(
      <FilterableSelect
        label="filterable-select"
        onChange={() => {}}
        value=""
        onSelect={onSelectFn}
      >
        <Option value="opt1" text="green" />
        <Option value="opt2" text="blue" />
      </FilterableSelect>,
    );
    act(() => {
      screen.getByRole("combobox").focus();
    });
    await user.keyboard("{ArrowUp}");

    expect(onSelectFn).toHaveBeenCalled();
    onSelectFn.mockReset();
    await user.keyboard("{ArrowUp}");
    expect(onSelectFn).toHaveBeenCalled();
  });
});

test("should close the list when the user presses `Escape` key", async () => {
  const user = userEvent.setup();
  render(
    <FilterableSelect
      openOnFocus
      label="filterable-select"
      onChange={() => {}}
      value=""
    >
      <Option value="opt1" text="green" />
    </FilterableSelect>,
  );
  act(() => {
    screen.getByRole("combobox").focus();
  });
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{Escape}");

  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
});

test("should close the list when the user clicks outside the component", async () => {
  const user = userEvent.setup();
  render(
    <FilterableSelect label="filterable-select" onChange={() => {}} value="">
      <Option value="opt1" text="green" />
    </FilterableSelect>,
  );
  act(() => {
    screen.getByRole("combobox").focus();
  });
  await user.keyboard("{ArrowDown}");
  await user.click(document.body);

  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
});

test("should call the `onKeyDown` callback when the user presses a key and the input is focused", async () => {
  const onKeyDownFn = jest.fn();
  const user = userEvent.setup();
  render(
    <FilterableSelect
      label="filterable-select"
      onChange={() => {}}
      value=""
      onKeyDown={onKeyDownFn}
    >
      <Option value="opt1" text="green" />
    </FilterableSelect>,
  );
  act(() => {
    screen.getByRole("combobox").focus();
  });
  await user.keyboard("{ArrowDown}");

  expect(onKeyDownFn).toHaveBeenCalled();
});

describe("when the `listActionButton` is passed", () => {
  it("should render the element when the list is open", async () => {
    render(
      <FilterableSelect
        onListAction={() => {}}
        openOnFocus
        label="filterable-select"
        onChange={() => {}}
        value=""
        listActionButton={<button type="button">mock button</button>}
      >
        <Option value="opt1" text="green" />
      </FilterableSelect>,
    );
    act(() => {
      screen.getByRole("combobox").focus();
    });

    expect(
      await screen.findByRole("button", { name: "mock button" }),
    ).toBeVisible();
  });

  it("should call the `onListAction` callback when the element is clicked", async () => {
    const onListActionFn = jest.fn();
    const user = userEvent.setup();
    render(
      <FilterableSelect
        openOnFocus
        label="filterable-select"
        onChange={() => {}}
        value=""
        listActionButton={<button type="button">mock button</button>}
        onListAction={onListActionFn}
      >
        <Option value="opt1" text="green" />
      </FilterableSelect>,
    );
    act(() => {
      screen.getByRole("combobox").focus();
    });
    await user.click(
      await screen.findByRole("button", { name: "mock button" }),
    );

    expect(onListActionFn).toHaveBeenCalled();
  });

  it("should focus the element when the user presses the 'Tab' key when the input is focused", async () => {
    const user = userEvent.setup();
    render(
      <FilterableSelect
        openOnFocus
        onListAction={() => {}}
        label="filterable-select"
        onChange={() => {}}
        value=""
        listActionButton={<button type="button">mock button</button>}
      >
        <Option value="opt1" text="green" />
      </FilterableSelect>,
    );
    act(() => {
      screen.getByRole("combobox").focus();
    });
    await user.tab();

    expect(
      await screen.findByRole("button", { name: "mock button" }),
    ).toHaveFocus();
  });

  it("should call the `onListAction` callback when the element is focused and the user presses the 'Enter' key", async () => {
    const user = userEvent.setup();
    const onListActionFn = jest.fn();
    render(
      <FilterableSelect
        openOnFocus
        onListAction={onListActionFn}
        label="filterable-select"
        onChange={() => {}}
        value=""
        listActionButton={<button type="button">mock button</button>}
      >
        <Option value="opt1" text="green" />
      </FilterableSelect>,
    );
    act(() => {
      screen.getByRole("combobox").focus();
    });
    await user.tab();
    await user.keyboard("{Enter}");

    expect(onListActionFn).toHaveBeenCalled();
  });

  it("should call the `onListAction` callback when the element is focused and the user presses the 'Space' key", async () => {
    const user = userEvent.setup();
    const onListActionFn = jest.fn();
    render(
      <FilterableSelect
        openOnFocus
        onListAction={onListActionFn}
        label="filterable-select"
        onChange={() => {}}
        value=""
        listActionButton={<button type="button">mock button</button>}
      >
        <Option value="opt1" text="green" />
      </FilterableSelect>,
    );
    act(() => {
      screen.getByRole("combobox").focus();
    });
    await user.tab();
    await user.keyboard(" ");

    expect(onListActionFn).toHaveBeenCalled();
  });

  it("should call the `onSelect` callback when the user presses tab and the action button is focused", async () => {
    const user = userEvent.setup();
    const onSelectFn = jest.fn();

    render(
      <FilterableSelect
        onSelect={onSelectFn}
        openOnFocus
        onListAction={() => {}}
        label="filterable-select"
        onChange={() => {}}
        value=""
        listActionButton={<button type="button">mock button</button>}
      >
        <Option value="opt1" text="green" />
      </FilterableSelect>,
    );
    act(() => {
      screen.getByRole("combobox").focus();
    });
    await user.tab();
    await user.tab();

    expect(onSelectFn).toHaveBeenCalled();
  });

  it("allows next focusable element to be focused, when 'Tab' is pressed while action button is focused", async () => {
    const user = userEvent.setup();
    render(
      <form>
        <FilterableSelect
          openOnFocus
          onListAction={() => {}}
          label="filterable-select"
          onChange={() => {}}
          value=""
          listActionButton={<button type="button">mock button</button>}
        >
          <Option value="opt1" text="green" />
        </FilterableSelect>
        <label htmlFor="address">
          Address
          <input id="address" type="text" />
        </label>
      </form>,
    );

    act(() => {
      screen.getByRole("combobox").focus();
    });
    await user.tab();
    await user.tab();

    expect(screen.getByLabelText("Address")).toHaveFocus();
  });
});

test("should set the `required` attribute on the input when the prop is passed", () => {
  render(
    <FilterableSelect
      label="filterable-select"
      onChange={() => {}}
      value=""
      required
    >
      <Option value="opt1" text="green" />
    </FilterableSelect>,
  );

  expect(screen.getByRole("combobox")).toBeRequired();
});

test("should not be call `onListScrollBottom` callback when an option is clicked", async () => {
  const onListScrollBottomFn = jest.fn();
  const user = userEvent.setup();
  render(
    <FilterableSelect
      onListScrollBottom={onListScrollBottomFn}
      openOnFocus
      label="filterable-select"
      onChange={() => {}}
      value=""
    >
      <Option value="opt1" text="green" />
    </FilterableSelect>,
  );
  act(() => {
    screen.getByRole("combobox").focus();
  });
  await user.click(await screen.findByRole("option", { name: "green" }));

  expect(onListScrollBottomFn).not.toHaveBeenCalled();
});

test("should apply the expected border radius styling to the list element", () => {
  render(
    <FilterableSelect
      openOnFocus
      label="filterable-select"
      onChange={() => {}}
      value=""
    >
      <Option value="opt1" text="green" />
    </FilterableSelect>,
  );
  act(() => {
    screen.getByRole("combobox").focus();
  });

  expect(screen.getByTestId("select-list-wrapper")).toHaveStyleRule(
    "border-radius",
    "var(--borderRadius050)",
  );
});

test("should apply the expected `maxWidth` styling when the prop is passed", () => {
  render(
    <FilterableSelect
      label="filterable-select"
      onChange={() => {}}
      value=""
      maxWidth="69%"
    >
      <Option value="opt1" text="green" />
    </FilterableSelect>,
  );

  expect(screen.getByTestId("input-presentation-container")).toHaveStyle(
    "max-width: 69%",
  );
});

test("should apply the expected `maxWidth` styling when the prop is not passed", () => {
  render(
    <FilterableSelect label="filterable-select" onChange={() => {}} value="">
      <Option value="opt1" text="green" />
    </FilterableSelect>,
  );

  expect(screen.getByTestId("input-presentation-container")).toHaveStyle(
    "max-width: 100%",
  );
});

test("should show all options when `disableDefaultFiltering` is true and the user types in the input", async () => {
  const user = userEvent.setup();
  render(
    <FilterableSelectWithState disableDefaultFiltering>
      <Option value="opt1" text="a" />
      <Option value="opt2" text="b" />
      <Option value="opt3" text="c" />
    </FilterableSelectWithState>,
  );
  await user.type(screen.getByRole("combobox"), "a");

  expect(await screen.findAllByRole("option")).toHaveLength(3);
});

test("should hide any non-matching options when `disableDefaultFiltering` is false and the user types in the input", async () => {
  const user = userEvent.setup();
  render(
    <FilterableSelectWithState disableDefaultFiltering={false}>
      <Option value="opt1" text="a" />
      <Option value="opt2" text="b" />
      <Option value="opt3" text="c" />
    </FilterableSelectWithState>,
  );
  await user.type(screen.getByRole("combobox"), "a");

  expect(await screen.findAllByRole("option")).toHaveLength(1);
});

test("should hide any non-matching options when `disableDefaultFiltering` is not set and the user types in the input", async () => {
  const user = userEvent.setup();
  render(
    <FilterableSelectWithState>
      <Option value="opt1" text="a" />
      <Option value="opt2" text="b" />
      <Option value="opt3" text="c" />
    </FilterableSelectWithState>,
  );
  await user.type(screen.getByRole("combobox"), "a");

  expect(await screen.findAllByRole("option")).toHaveLength(1);
});
