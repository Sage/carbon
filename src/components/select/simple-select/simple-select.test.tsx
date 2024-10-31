import React, { useState } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Box from "components/box/box.component";
import Button from "components/button/button.component";
import { testStyledSystemMarginRTL } from "../../../__spec_helper__/__internal__/test-utils";
import mockDOMRect from "../../../__spec_helper__/mock-dom-rect";
import Logger from "../../../__internal__/utils/logger";

import SimpleSelect from ".";
import Option from "../option";

beforeEach(() => {
  // Mock non-zero dimensions for the scrollable container in dropdown list. To ensure react-virtual renders options in the dropdown list correctly.
  mockDOMRect(40, 100, "select-list-scrollable-container");
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders a visually-hidden input box", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}}>
      <Option text="amber" value="amber" />
    </SimpleSelect>
  );

  const input = screen.getByRole("combobox");
  expect(input).toBeInTheDocument();
  expect(input).not.toBeVisible();
});

test("renders input with a textbox role when readOnly prop is true", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}} readOnly>
      <Option text="amber" value="amber" />
    </SimpleSelect>
  );

  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

// Styling test for coverage - styles are covered by Chromatic
test("applies transparent background and no border to input, when transparent prop is true", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}} transparent>
      <Option text="amber" value="amber" />
    </SimpleSelect>
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
    </SimpleSelect>
  );

  expect(screen.getByText("amber", { ignore: "li" })).toBeVisible();
});

test("clears option selection when value prop is set to an empty string", () => {
  const { rerender } = render(
    <SimpleSelect label="Colour" onChange={() => {}} value="amber">
      <Option text="amber" value="amber" />
    </SimpleSelect>
  );
  rerender(
    <SimpleSelect label="Colour" onChange={() => {}} value="">
      <Option text="amber" value="amber" />
    </SimpleSelect>
  );

  expect(screen.getByText("Please Select...")).toBeVisible();
  expect(screen.getByRole("combobox")).toHaveValue("");
});

test("displays default placeholder text when no value is selected", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}} value="">
      <Option text="amber" value="amber" />
    </SimpleSelect>
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
    </SimpleSelect>
  );

  expect(screen.getByText("Select a colour")).toBeVisible();
});

test("hides select text overlay from screen readers using aria-hidden", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}}>
      <Option text="amber" value="amber" />
    </SimpleSelect>
  );

  expect(screen.getByTestId("select-text")).toHaveAttribute(
    "aria-hidden",
    "true"
  );
});

describe("accessible name of the input", () => {
  it("is set to the label prop when provided", () => {
    render(
      <SimpleSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("Colour");
  });

  it("is set to the aria-label prop when provided", () => {
    render(
      <SimpleSelect aria-label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("Colour");
  });

  it("is set to the aria-label when both aria-label and label props are passed", () => {
    render(
      <SimpleSelect label="foobar" onChange={() => {}} aria-label="Colour">
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("Colour");
  });

  it("is set to the text referenced by the aria-labelledby prop when provided", () => {
    render(
      <>
        <h2 id="my-select-heading">My Select</h2>
        <SimpleSelect aria-labelledby="my-select-heading" onChange={() => {}}>
          <Option text="amber" value="amber" />
        </SimpleSelect>
      </>
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
        >
          <Option text="amber" value="amber" />
        </SimpleSelect>
      </>
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("My Select");
  });
});

test("associates the dropdown list with the correct accessible name from the label prop", async () => {
  const user = userEvent.setup();
  render(
    <SimpleSelect label="Colour" onChange={() => {}}>
      <Option text="amber" value="amber" />
    </SimpleSelect>
  );

  await user.click(screen.getByRole("combobox"));

  expect(await screen.findByRole("listbox")).toHaveAccessibleName("Colour");
});

test.each(["top", "bottom"] as const)(
  "should override the data attribute on the list when listWidth is set and placement is %s",
  async (listPlacement) => {
    const user = userEvent.setup();
    render(
      <SimpleSelect
        listPlacement={listPlacement}
        listWidth={100}
        label="Colour"
        onChange={() => {}}
      >
        <Option text="amber" value="amber" />
      </SimpleSelect>
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
      <SimpleSelect
        listPlacement={listPlacement}
        listWidth={100}
        label="Colour"
        onChange={() => {}}
      >
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      listPlacement
    );
  }
);

describe("typing into the input", () => {
  it("selects the first option with text starting with the typed printable character", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
        <Option text="black" value="black" />
      </SimpleSelect>
    );

    await user.type(screen.getByRole("combobox"), "b");

    expect(screen.getByText("blue", { ignore: "li" })).toBeVisible();
  });

  it("selects the second option with text starting with the typed printable character when typed twice", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
        <Option text="black" value="black" />
      </SimpleSelect>
    );

    await user.type(screen.getByRole("combobox"), "bb");

    expect(screen.getByText("black", { ignore: "li" })).toBeVisible();
  });

  it("does not change the selected option when no option text starts with the typed printable character", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
        <Option text="black" value="black" />
      </SimpleSelect>
    );

    await user.type(screen.getByRole("combobox"), "bx");

    expect(screen.getByText("blue", { ignore: "li" })).toBeVisible();
  });

  it("selects the first option with text matching the typed substring when typed quickly", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}}>
        <Option text="blue" value="blue" />
        <Option text="black" value="black" />
        <Option text="brown" value="brown" />
      </SimpleSelect>
    );

    await user.type(screen.getByRole("combobox"), "bla");

    expect(screen.getByText("black", { ignore: "li" })).toBeVisible();
  });

  it("selects the first option starting with the latest printable character typed after a long pause", async () => {
    jest.useFakeTimers();

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <SimpleSelect label="Colour" onChange={() => {}}>
        <Option text="blue" value="blue" />
        <Option text="black" value="black" />
        <Option text="brown" value="brown" />
        <Option text="green" value="green" />
      </SimpleSelect>
    );

    const input = screen.getByRole("combobox");
    await user.type(input, "bla");
    act(() => jest.runOnlyPendingTimers());
    await user.type(input, "g");

    expect(screen.getByText("green", { ignore: "li" })).toBeVisible();

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it.each(["Meta", "Control"])(
    "does not select any option when a printable character is typed while holding down the %s key",
    async (specialKey) => {
      const user = userEvent.setup();
      render(
        <SimpleSelect label="Colour" onChange={() => {}}>
          <Option text="amber" value="amber" />
          <Option text="blue" value="blue" />
          <Option text="black" value="black" />
        </SimpleSelect>
      );

      // Hold special key down while typing 'b'
      await user.type(screen.getByRole("combobox"), `{${specialKey}>}b`);

      expect(screen.getByText("Please Select...")).toBeVisible();
    }
  );

  it("does not change selected option when value prop is set (controlled usage)", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} value="amber">
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </SimpleSelect>
    );

    await user.type(screen.getByRole("combobox"), "blue");

    expect(
      screen.queryByText("blue", { ignore: "li" })
    ).not.toBeInTheDocument();
  });

  it("calls onChange prop each time a character typed into the input", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <SimpleSelect label="Colour" onChange={onChange}>
        <Option text="blue" value="blue" />
        <Option text="black" value="black" />
        <Option text="brown" value="brown" />
      </SimpleSelect>
    );

    await user.type(screen.getByRole("combobox"), "bla");

    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it("calls onChange prop with the value of the matched option after a character is typed into the input", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <SimpleSelect
        label="Colour"
        name="colour"
        id="colour"
        onChange={onChange}
      >
        <Option text="blue" value="blue" />
        <Option text="black" value="black" />
        <Option text="brown" value="brown" />
      </SimpleSelect>
    );

    await user.type(screen.getByRole("combobox"), "b");

    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        target: { value: "blue", name: "colour", id: "colour" },
        selectionConfirmed: false,
      })
    );
  });
});

describe("dropdown list", () => {
  it("opens when input is clicked", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByRole("listbox")).toBeVisible();
  });

  it("opens when input's dropdown icon is clicked", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    await user.click(screen.getByTestId("input-icon-toggle"));

    expect(await screen.findByRole("listbox")).toBeVisible();
  });

  it.each(["Space", "ArrowUp", "ArrowDown", "Home", "End"] as const)(
    "opens when input is focused and %s key is pressed",
    async (key) => {
      const user = userEvent.setup();
      render(
        <SimpleSelect label="Colour" onChange={() => {}}>
          <Option text="amber" value="amber" />
        </SimpleSelect>
      );

      await user.tab();
      await user.keyboard(`[${key}]`);

      expect(await screen.findByRole("listbox")).toBeVisible();
    }
  );

  it.each(["Enter", "a"] as const)(
    "does not open when %s key is pressed",
    async (key) => {
      const user = userEvent.setup();
      render(
        <SimpleSelect label="Colour" onChange={() => {}}>
          <Option text="amber" value="amber" />
        </SimpleSelect>
      );

      await user.tab();
      await user.keyboard(`[${key}]`);

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    }
  );

  it("does not open, when input is disabled and is clicked", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} disabled>
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    await user.click(screen.getByRole("combobox"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not open, when input is disabled and is selected with the keyboard", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} disabled>
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    await user.tab();
    await user.keyboard("[Space]");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not open, when input is read-only and is clicked", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} readOnly>
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    await user.click(screen.getByRole("textbox"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not open, when input is read-only and Space bar is pressed", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} readOnly>
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    await user.tab();
    await user.keyboard("[Space]");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens when input is focused and openOnFocus prop is true", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} openOnFocus>
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    await user.tab();

    expect(await screen.findByRole("listbox")).toBeVisible();
  });

  it("does not open, when input is focused and openOnFocus prop is false", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} openOnFocus={false}>
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    await user.tab();

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes when an option is clicked", async () => {
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>
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
      </SimpleSelect>
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
      </SimpleSelect>
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
      </>
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Outside content"));

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });
});

describe("when onClick prop is passed", () => {
  it("is called when input is clicked", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} onClick={onClick}>
        <Option text="amber" value="amber" />
      </SimpleSelect>
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
      >
        <Option text="amber" value="amber" />
      </SimpleSelect>
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
      >
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    await user.click(screen.getByRole("textbox"));

    expect(onClick).not.toHaveBeenCalled();
  });
});

test("calls onOpen when list is opened", async () => {
  const onOpen = jest.fn();
  const user = userEvent.setup();
  render(
    <SimpleSelect label="Colour" onChange={() => {}} onOpen={onOpen}>
      <Option text="amber" value="amber" />
    </SimpleSelect>
  );

  await user.click(screen.getByRole("combobox"));

  expect(onOpen).toHaveBeenCalledTimes(1);
});

test("calls onKeyDown prop with details of the pressed key, when typing a character into the input", async () => {
  const user = userEvent.setup();
  const onKeyDown = jest.fn();
  render(
    <SimpleSelect label="Colour" onChange={() => {}} onKeyDown={onKeyDown}>
      <Option text="amber" value="amber" />
    </SimpleSelect>
  );

  await user.type(screen.getByRole("combobox"), "{c}");

  expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ key: "c" }));
});

test("calls onFocus prop when input is focused", async () => {
  const onFocus = jest.fn();
  const user = userEvent.setup();
  render(
    <SimpleSelect label="Colour" onChange={() => {}} onFocus={onFocus}>
      <Option text="amber" value="amber" />
    </SimpleSelect>
  );

  await user.tab();

  expect(onFocus).toHaveBeenCalledTimes(1);
});

describe("when onBlur prop is passed", () => {
  it("is called when input loses focus", async () => {
    const onBlur = jest.fn();
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} onBlur={onBlur}>
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    await user.tab();
    await user.tab({ shift: true });

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("is not called when input loses focus temporarily due to option selection", async () => {
    const onBlur = jest.fn();
    const user = userEvent.setup();
    render(
      <SimpleSelect label="Colour" onChange={() => {}} onBlur={onBlur}>
        <Option text="amber" value="amber" />
      </SimpleSelect>
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
      <SimpleSelect label="Colour" onChange={() => {}} ref={mockRef}>
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    expect(mockRef).toHaveBeenNthCalledWith(1, screen.getByRole("combobox"));
  });

  it("allows access to the input element through a forwarded ref object", () => {
    const mockRef = { current: null };
    render(
      <SimpleSelect label="Colour" onChange={() => {}} ref={mockRef}>
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    expect(mockRef.current).toBe(screen.getByRole("combobox"));
  });
});

describe("deprecation warnings", () => {
  it("raises deprecation warning when component is used with defaultValue and no onChange (uncontrolled usage)", () => {
    jest.spyOn(console, "warn").mockImplementation(() => {});

    const loggerSpy = jest.spyOn(Logger, "deprecate");
    render(
      <SimpleSelect label="Colour" onChange={undefined} defaultValue="amber">
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    expect(loggerSpy).toHaveBeenNthCalledWith(
      1,
      "Uncontrolled behaviour in `Simple Select` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
    );
  });

  it("should not display deprecation about uncontrolled Textbox when parent component is controlled", () => {
    const loggerSpy = jest.spyOn(Logger, "deprecate");
    render(
      <SimpleSelect
        label="Colour"
        onChange={() => {}}
        value="1"
        placeholder="Select a colour"
      >
        <Option text="Amber" value="1" />
      </SimpleSelect>
    );

    expect(loggerSpy).not.toHaveBeenCalled();
    loggerSpy.mockClear();
  });

  it("should not display deprecation about uncontrolled Textbox when parent component is not controlled", () => {
    const loggerSpy = jest.spyOn(Logger, "deprecate");
    render(
      <SimpleSelect label="Colour" placeholder="Select a colour">
        <Option text="Amber" value="1" />
      </SimpleSelect>
    );

    expect(loggerSpy).not.toHaveBeenCalledWith(
      "Uncontrolled behaviour in `Textbox` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
    );
    loggerSpy.mockClear();
  });
});

it("marks input as required when required prop is true", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}} required>
      <Option text="amber" value="amber" />
    </SimpleSelect>
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
    >
      <Option text="amber" value="amber" />
    </SimpleSelect>
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

testStyledSystemMarginRTL(
  (props) => (
    <SimpleSelect
      {...props}
      data-role="my-select"
      label="Colour"
      onChange={() => {}}
    >
      <Option text="amber" value="amber" />
    </SimpleSelect>
  ),
  () => screen.getByTestId("my-select")
);
