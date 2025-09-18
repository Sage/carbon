import React, { useState } from "react";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockDOMRect from "../../../__spec_helper__/mock-dom-rect";
import { testStyledSystemMargin } from "../../../__spec_helper__/__internal__/test-utils";

import MultiSelect, { MultiSelectProps } from ".";
import { CustomSelectChangeEvent, Option } from "..";

import Modal from "../../modal";

beforeEach(() => {
  // Mock non-zero dimensions for the scrollable container in dropdown list. To ensure react-virtual renders options in the dropdown list correctly.
  mockDOMRect(40, 100, "select-list-scrollable-container");
});

afterEach(() => {
  jest.restoreAllMocks();
});

type InteractiveComponentProps = Omit<
  MultiSelectProps,
  "onChange" | "value"
> & {
  children: React.ReactNode;
  onChange: (
    ev: CustomSelectChangeEvent | React.ChangeEvent<HTMLInputElement>,
  ) => void;
  value?: string[] | Record<string, unknown>[];
};

const InteractiveComponent = ({
  children,
  onChange,
  value = [""],
  ...props
}: InteractiveComponentProps) => {
  const [internalValue, setValue] = useState(value);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as string[]);
  }

  return (
    <MultiSelect
      onChange={(event) => {
        onChangeHandler(event);
        onChange(event);
      }}
      value={internalValue}
      {...props}
    >
      {children}
    </MultiSelect>
  );
};

test("displays default placeholder text when no value is selected", () => {
  render(
    <InteractiveComponent label="Colour" onChange={() => {}} value={[]}>
      <Option text="amber" value="amber" />
    </InteractiveComponent>,
  );

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Please Select...",
  );
});

test("displays custom text when placeholder prop is provided and no value is selected", () => {
  render(
    <InteractiveComponent
      label="Colour"
      onChange={() => {}}
      value={[]}
      placeholder="Select a colour"
    >
      <Option text="amber" value="amber" />
    </InteractiveComponent>,
  );

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Select a colour",
  );
});

describe("when value prop is provided", () => {
  it("displays a pill for a matching option", () => {
    render(
      <InteractiveComponent
        label="Colour"
        onChange={() => {}}
        value={["amber"]}
        placeholder="Select a colour"
      >
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    const amberPill = screen.getByTitle("amber");
    expect(amberPill).toBeVisible();
  });

  it("displays pill with correct text, when value is an object which matches an option", () => {
    const selectedOptions = [{ id: "0", value: "amber" }];
    render(
      <InteractiveComponent
        label="Colour"
        onChange={() => {}}
        value={selectedOptions}
        placeholder="Select a colour"
      >
        <Option text="amber" value={selectedOptions[0]} />
      </InteractiveComponent>,
    );

    const amberPill = screen.getByTitle("amber");
    expect(amberPill).toBeVisible();
  });

  it("displays a styled pill for an option that has custom style props", () => {
    render(
      <InteractiveComponent
        label="Colour"
        onChange={() => {}}
        value={["amber"]}
        placeholder="Select a colour"
      >
        <Option text="amber" value="amber" borderColor="red" fill />
      </InteractiveComponent>,
    );

    const amberPill = screen.getByTitle("amber");
    expect(amberPill).toHaveStyle(`
      border: 2px solid red;
      background-color: red;
    `);
  });

  it("does not display a pill, when value array contains an unmatched option", () => {
    render(
      <InteractiveComponent
        label="Colour"
        onChange={() => {}}
        value={["green"]}
        placeholder="Select a colour"
      >
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </InteractiveComponent>,
    );

    expect(screen.queryByTitle("green")).not.toBeInTheDocument();
  });

  it("removes all rendered pills when the value array is set to empty", async () => {
    const { rerender } = render(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        value={["amber"]}
        placeholder="Select a colour"
      >
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    expect(screen.getByTitle("amber")).toBeInTheDocument();

    rerender(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        value={[]}
        placeholder="Select a colour"
      >
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    await waitFor(() => {
      expect(screen.queryByTitle("amber")).not.toBeInTheDocument();
    });
  });

  test("displays a pill with a dismiss button for a selected option", async () => {
    render(
      <InteractiveComponent
        label="Colour"
        onChange={() => {}}
        value={["amber"]}
      >
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    const amberPill = screen.getByTitle("amber");
    expect(
      within(amberPill).getByRole("button", { name: "Remove amber pill" }),
    ).toBeVisible();
  });

  test("displays a pill without a dismiss button for a selected option when the component is disabled", () => {
    render(
      <InteractiveComponent
        label="Colour"
        onChange={() => {}}
        value={["amber"]}
        disabled
      >
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    const amberPill = screen.getByTitle("amber");
    expect(
      within(amberPill).queryByRole("button", { name: "remove pill" }),
    ).not.toBeInTheDocument();
  });

  test("displays a pill without a dismiss button for a selected option when the component is read-only", () => {
    render(
      <InteractiveComponent
        label="Colour"
        onChange={() => {}}
        value={["amber"]}
        readOnly
      >
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    const amberPill = screen.getByTitle("amber");
    expect(
      within(amberPill).queryByRole("button", { name: "remove pill" }),
    ).not.toBeInTheDocument();
  });
});

describe("accessible name of the input", () => {
  it("is set to the label prop when provided", () => {
    render(
      <InteractiveComponent label="Colour" onChange={() => {}} value={[]}>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("Colour");
  });

  it("is set to the text referenced by the aria-labelledby prop when provided", () => {
    render(
      <>
        <h2 id="my-select-heading">My Select</h2>
        <InteractiveComponent
          aria-labelledby="my-select-heading"
          onChange={() => {}}
          value={[]}
        >
          <Option text="amber" value="amber" />
        </InteractiveComponent>
      </>,
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("My Select");
  });

  it("is set to the text referenced by aria-labelledby when aria-labelledby and label props are passed", () => {
    render(
      <>
        <h2 id="my-select-heading">My Select</h2>
        <InteractiveComponent
          label="Colour"
          aria-labelledby="my-select-heading"
          onChange={() => {}}
          value={[]}
        >
          <Option text="amber" value="amber" />
        </InteractiveComponent>
      </>,
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("My Select");
  });
});

test("associates the dropdown list with the correct accessible name from the label prop", async () => {
  const user = userEvent.setup();
  render(
    <InteractiveComponent label="Colour" onChange={() => {}} value={[]}>
      <Option text="amber" value="amber" />
    </InteractiveComponent>,
  );

  await user.click(screen.getByRole("combobox"));

  expect(await screen.findByRole("listbox")).toHaveAccessibleName("Colour");
});

["top", "bottom"].forEach((placement) => {
  test(`should override the data attribute on the list when listWidth is set and placement is ${placement}`, async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent
        listPlacement={placement as "top" | "bottom"}
        listWidth={100}
        label="Colour"
        onChange={() => {}}
      >
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      `${placement}-end`,
    );
  });
});

["top-end", "bottom-end", "top-start", "bottom-start"].forEach((placement) => {
  test(`should not override the data attribute on the list when listWidth is set and placement is ${placement}`, async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent
        listPlacement={
          placement as "top-end" | "bottom-end" | "top-start" | "bottom-start"
        }
        listWidth={100}
        label="Colour"
        onChange={() => {}}
      >
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      placement,
    );
  });
});

describe("dropdown list", () => {
  it("opens when input is clicked", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByRole("listbox")).toBeVisible();
  });

  it("opens when input's dropdown icon is clicked", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.click(screen.getByTestId("input-icon-toggle"));

    expect(await screen.findByRole("listbox")).toBeVisible();
  });

  ["Space", "ArrowUp", "ArrowDown", "Home", "End"].forEach((key) => {
    test(`opens when input is focused and ${key} key is pressed`, async () => {
      const user = userEvent.setup();
      render(
        <InteractiveComponent label="Colour" onChange={() => {}}>
          <Option text="amber" value="amber" />
        </InteractiveComponent>,
      );

      await user.tab();
      await user.keyboard(key);

      expect(await screen.findByRole("listbox")).toBeVisible();
    });
  });

  ["Enter", "a"].forEach((key) => {
    test(`does not open when ${key} key is pressed`, async () => {
      const user = userEvent.setup();
      render(
        <InteractiveComponent label="Colour" onChange={() => {}}>
          <Option text="amber" value="amber" />
        </InteractiveComponent>,
      );

      await user.tab();
      await user.keyboard(`[${key}]`);

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  it("does not open, when input is disabled and is clicked", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}} disabled>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not open, when input is disabled and is selected with the keyboard", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}} disabled>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.tab();
    await user.keyboard("[Space]");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not open, when input is read-only and is clicked", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}} readOnly>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.click(screen.getByRole("textbox"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not open, when input is read-only and Space bar is pressed", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}} readOnly>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.tab();
    await user.keyboard("[Space]");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens when input is focused and openOnFocus prop is true", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}} openOnFocus>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.tab();

    expect(await screen.findByRole("listbox")).toBeVisible();
  });

  it("does not open, when input is focused and openOnFocus prop is false", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent
        label="Colour"
        onChange={() => {}}
        openOnFocus={false}
      >
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.tab();

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("stays open after an option is clicked", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "amber" }));

    expect(screen.getByRole("listbox")).toBeVisible();
  });

  it("stays open after an option is focused and Enter key is pressed", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
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
        <InteractiveComponent label="Colour" onChange={() => {}}>
          <Option text="amber" value="amber" />
        </InteractiveComponent>
        <p>Outside content</p>
      </>,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Outside content"));

    await waitFor(() =>
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
    );
  });

  it("closes when input is clicked twice", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("combobox"));

    await waitFor(() =>
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
    );
  });

  it("closes when input's dropdown icon is clicked twice", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.click(screen.getByTestId("input-icon-toggle"));
    await user.click(screen.getByTestId("input-icon-toggle"));

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  it("opens when input is clicked and openOnFocus prop is true", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}} openOnFocus>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByRole("listbox")).toBeVisible();
  });
});

describe("when dropdown list is opened", () => {
  it("highlights the first option in list when ArrowDown key is pressed", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}} openOnFocus>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </InteractiveComponent>,
    );

    await user.tab();
    await user.keyboard("{ArrowDown}");

    expect(
      await screen.findByRole("option", { name: "amber" }),
    ).toHaveStyleRule("background-color", "var(--colorsUtilityMajor200)");
  });

  it("highlights the last option in list when ArrowUp key is pressed", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}} openOnFocus>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </InteractiveComponent>,
    );

    await user.tab();
    await user.keyboard("{ArrowUp}");

    expect(await screen.findByRole("option", { name: "blue" })).toHaveStyleRule(
      "background-color",
      "var(--colorsUtilityMajor200)",
    );
  });

  it("calls onChange when an option is selected", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    const ControlledMultiSelect = () => {
      const [value, setValue] = React.useState<string[]>([]);

      return (
        <InteractiveComponent
          label="Colour"
          name="colour"
          id="colour"
          value={value}
          onChange={(event) => {
            setValue(event.target.value as unknown as string[]);
            onChange(event);
          }}
        >
          <Option text="amber" value="amber" />
          <Option text="blue" value="blue" />
        </InteractiveComponent>
      );
    };
    render(<ControlledMultiSelect />);

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "amber" }));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: "colour",
          id: "colour",
          value: ["amber"],
        }),
      }),
    );
  });

  it("does not call onChange when navigating to an option in the list via the keyboard", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <InteractiveComponent label="Colour" onChange={onChange} openOnFocus>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </InteractiveComponent>,
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
      <InteractiveComponent
        label="Colour"
        onChange={onChange}
        value={["amber"]}
      >
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </InteractiveComponent>,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "amber" }));

    expect(onChange).not.toHaveBeenCalled();
  });

  test("does not render an empty pill, when Enter key is pressed and input text does not match any option", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );
    await user.type(screen.getByRole("combobox"), "x");
    await screen.findByText('No results for "x"');

    await user.keyboard("{Enter}");

    expect(screen.getByRole("combobox")).toHaveValue("");
  });
});

test.each(["Backspace", "Delete"])(
  "pressing %s key within the input removes the last selected option if it exists",
  async (key) => {
    const user = userEvent.setup();

    const ControlledMultiSelect = () => {
      const [value, setValue] = React.useState(["amber"]);

      return (
        <InteractiveComponent
          label="Colour"
          value={value}
          onChange={(event) => {
            setValue(event.target.value as unknown as string[]);
          }}
        >
          <Option text="amber" value="amber" />
        </InteractiveComponent>
      );
    };
    render(<ControlledMultiSelect />);

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "amber" }));
    await user.keyboard(`{${key}}`);

    const amberPill = screen.queryByTitle("amber");
    expect(amberPill).not.toBeInTheDocument();
  },
);

test("a selected option, that renders dismissible pill, can be removed by clicking the dismiss button", async () => {
  const user = userEvent.setup();
  const ControlledMultiSelect = () => {
    const [value, setValue] = React.useState(["amber"]);

    return (
      <InteractiveComponent
        label="Colour"
        value={value}
        onChange={(event) => {
          setValue(event.target.value as unknown as string[]);
        }}
      >
        <Option text="amber" value="amber" />
      </InteractiveComponent>
    );
  };
  render(<ControlledMultiSelect />);

  await user.click(screen.getByRole("combobox"));

  const amberPill = await screen.findByTitle("amber");
  const dismissButton = within(amberPill).getByRole("button");
  await user.click(dismissButton);

  expect(amberPill).not.toBeInTheDocument();
});

test("calls onChange prop when a previously selected option is removed", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  const ControlledMultiSelect = () => {
    const [value, setValue] = React.useState(["amber", "black"]);

    return (
      <InteractiveComponent
        label="Colour"
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value as unknown as string[]);
          onChange(ev);
        }}
      >
        <Option text="amber" value="amber" />
        <Option text="black" value="black" />
      </InteractiveComponent>
    );
  };
  render(<ControlledMultiSelect />);

  await user.click(screen.getByRole("combobox"));
  await user.keyboard("{Backspace}");

  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({
        value: ["amber"],
      }),
    }),
  );
});

test("does not call onChange prop, when Backspace key is pressed but nothing has been selected", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  const ControlledMultiSelect = () => {
    const [value, setValue] = React.useState<string[]>([]);

    return (
      <InteractiveComponent
        label="Colour"
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value as unknown as string[]);
          onChange(ev);
        }}
      >
        <Option text="amber" value="amber" />
        <Option text="black" value="black" />
      </InteractiveComponent>
    );
  };
  render(<ControlledMultiSelect />);

  await user.click(screen.getByRole("combobox"));
  await user.keyboard("{Backspace}");

  expect(onChange).not.toHaveBeenCalled();
});

test("clears the input after clicking away from it", async () => {
  const user = userEvent.setup();
  render(
    <>
      <InteractiveComponent label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </InteractiveComponent>
      <p>Outside content</p>
    </>,
  );

  await user.type(screen.getByRole("combobox"), "a");
  await user.click(screen.getByText("Outside content"));

  expect(screen.getByRole("combobox")).toHaveValue("");
});

test("clears the input after an option is selected", async () => {
  const user = userEvent.setup();
  render(
    <InteractiveComponent label="Colour" onChange={() => {}}>
      <Option text="amber" value="amber" />
    </InteractiveComponent>,
  );

  await user.type(screen.getByRole("combobox"), "amber");
  await user.click(await screen.findByRole("option", { name: "amber" }));

  expect(screen.getByRole("combobox")).toHaveValue("");
});

describe("when onClick prop is passed", () => {
  it("is called when input is clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <InteractiveComponent
        label="Colour"
        onChange={() => {}}
        onClick={onClick}
      >
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is not called when disabled input is clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <InteractiveComponent
        label="Colour"
        onChange={() => {}}
        disabled
        onClick={onClick}
      >
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("is not called when read-only input is clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <InteractiveComponent
        label="Colour"
        onChange={() => {}}
        readOnly
        onClick={onClick}
      >
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.click(screen.getByRole("textbox"));

    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("when onOpen prop is passed", () => {
  it("is called when list is opened by clicking the input", async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}} onOpen={onOpen}>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("is called when list is opened as the user begins typing in the input", async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}} onOpen={onOpen}>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.type(screen.getByRole("combobox"), "a");

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("is called when openOnFocus prop is true and the input is focused", async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();
    render(
      <InteractiveComponent
        label="Colour"
        onChange={() => {}}
        onOpen={onOpen}
        openOnFocus
      >
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.tab();

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("is called when list is opened by clicking the dropdown icon", async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}} onOpen={onOpen}>
        <Option text="amber" value="amber" />
      </InteractiveComponent>,
    );

    await user.click(screen.getByTestId("input-icon-toggle"));

    expect(onOpen).toHaveBeenCalledTimes(1);
  });
});

test("calls onFocus prop when input is focused", async () => {
  const user = userEvent.setup();
  const onFocus = jest.fn();
  render(
    <InteractiveComponent label="Colour" onChange={() => {}} onFocus={onFocus}>
      <Option text="amber" value="amber" />
    </InteractiveComponent>,
  );

  await user.tab();

  expect(onFocus).toHaveBeenCalledTimes(1);
});

test("calls onBlur prop when input loses focus", async () => {
  const user = userEvent.setup();
  const onBlur = jest.fn();
  render(
    <InteractiveComponent label="Colour" onChange={() => {}} onBlur={onBlur}>
      <Option text="amber" value="amber" />
    </InteractiveComponent>,
  );

  await user.tab();
  await user.tab({ shift: true });

  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("does not call onBlur, when input temporarily loses focus due to an option being clicked in the dropdown list", async () => {
  const user = userEvent.setup();
  const onBlur = jest.fn();
  render(
    <InteractiveComponent label="Colour" onChange={() => {}} onBlur={onBlur}>
      <Option text="amber" value="amber" />
    </InteractiveComponent>,
  );

  await user.click(screen.getByRole("combobox"));
  await user.click(await screen.findByRole("option", { name: "amber" }));

  expect(onBlur).not.toHaveBeenCalled();
});

test("calls onKeyDown prop when input is focused and a key is pressed", async () => {
  const user = userEvent.setup();
  const onKeyDown = jest.fn();
  render(
    <InteractiveComponent
      label="Colour"
      onChange={() => {}}
      onKeyDown={onKeyDown}
    >
      <Option text="amber" value="amber" />
    </InteractiveComponent>,
  );

  await user.tab();
  await user.keyboard("{ArrowDown}");

  expect(onKeyDown).toHaveBeenCalledTimes(1);
});

test("calls onFilterChange prop when input text changes", async () => {
  const user = userEvent.setup();
  const onFilterChange = jest.fn();
  render(
    <InteractiveComponent
      label="Colour"
      onChange={() => {}}
      onFilterChange={onFilterChange}
    >
      <Option text="amber" value="amber" />
    </InteractiveComponent>,
  );

  await user.type(screen.getByRole("combobox"), "a");

  expect(onFilterChange).toHaveBeenCalledTimes(1);
});

describe("when typing into the input", () => {
  it("renders matching options in the dropdown list, even if the text contains leading whitespace", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}}>
        <Option text="red" value="red" />
      </InteractiveComponent>,
    );

    await user.type(screen.getByRole("combobox"), "   red");

    expect(screen.getByRole("option", { name: "red" })).toBeVisible();
  });

  it("renders matching options in the dropdown list, even if the text contains trailing whitespace", async () => {
    const user = userEvent.setup();
    render(
      <InteractiveComponent label="Colour" onChange={() => {}}>
        <Option text="red" value="red" />
      </InteractiveComponent>,
    );

    await user.type(screen.getByRole("combobox"), "red   ");

    expect(screen.getByRole("option", { name: "red" })).toBeVisible();
  });
});

describe("forwarded ref", () => {
  it("allows access to the input element through a forwarded callback ref", () => {
    const mockRef = jest.fn((element) => element);
    render(
      <MultiSelect value={[]} label="Colour" onChange={() => {}} ref={mockRef}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    expect(mockRef).toHaveBeenNthCalledWith(1, screen.getByRole("combobox"));
  });

  it("allows access to the input element through a forwarded ref object", () => {
    const mockRef = { current: null };
    render(
      <MultiSelect value={[]} label="Colour" onChange={() => {}} ref={mockRef}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    expect(mockRef.current).toBe(screen.getByRole("combobox"));
  });
});

test("marks input as required when required prop is true", () => {
  render(
    <InteractiveComponent label="Colour" onChange={() => {}} required>
      <Option text="amber" value="amber" />
    </InteractiveComponent>,
  );

  expect(screen.getByRole("combobox")).toBeRequired();
});

test("should not be call `onListScrollBottom` callback when an option is clicked", async () => {
  const onListScrollBottomFn = jest.fn();
  const user = userEvent.setup();
  render(
    <InteractiveComponent
      onListScrollBottom={onListScrollBottomFn}
      openOnFocus
      label="filterable-select"
      onChange={() => {}}
    >
      <Option value="opt1" text="green" />
    </InteractiveComponent>,
  );

  act(() => {
    screen.getByRole("combobox").focus();
  });
  await user.click(await screen.findByRole("option", { name: "green" }));

  expect(onListScrollBottomFn).not.toHaveBeenCalled();
});

test("does not call onOpen, when openOnFocus is true and the input is refocused while the dropdown list is already open", async () => {
  const onOpen = jest.fn();

  render(
    <InteractiveComponent
      label="Colour"
      onChange={() => {}}
      onOpen={onOpen}
      openOnFocus
    >
      <Option text="amber" value="amber" />
    </InteractiveComponent>,
  );

  const input = screen.getByRole("combobox");

  act(() => {
    input.focus();
  });

  onOpen.mockClear();

  act(() => {
    input.focus();
  });

  expect(onOpen).not.toHaveBeenCalled();
});

test("dropdown list is open on initial render, when autoFocus and openOnFocus props are true, and component is inside a Carbon Modal", () => {
  jest.useFakeTimers();
  render(
    <Modal open>
      <InteractiveComponent
        label="Colour"
        onChange={() => {}}
        autoFocus
        openOnFocus
      >
        <Option text="amber" value="amber" />
      </InteractiveComponent>
    </Modal>,
  );

  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByRole("combobox")).toHaveFocus();
  expect(screen.getByRole("listbox")).toBeInTheDocument();

  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("should not display the list when `openOnFocus` is set and mousedown is detected on icon", async () => {
  const user = userEvent.setup();

  render(
    <InteractiveComponent openOnFocus label="multi-select" onChange={() => {}}>
      <Option value="opt1" text="red" />
    </InteractiveComponent>,
  );

  const icon = within(screen.getByRole("presentation")).getByTestId("icon");
  await user.pointer({ keys: "[MouseLeft>]", target: icon });

  await waitFor(() => {
    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
});

test("should display the list when `openOnFocus` is not set", async () => {
  const user = userEvent.setup();
  render(
    <InteractiveComponent label="multi-select" onChange={() => {}}>
      <Option value="opt1" text="red" />
    </InteractiveComponent>,
  );
  const icon = within(screen.getByRole("presentation")).getByTestId("icon");
  await user.click(icon);

  expect(await screen.findByRole("listbox")).toBeVisible();
});

test("should call `onOpen` callback if prop is passed", async () => {
  const onOpenFn = jest.fn();
  const user = userEvent.setup();
  render(
    <InteractiveComponent
      onOpen={onOpenFn}
      label="multi-select"
      onChange={() => {}}
    >
      <Option value="opt1" text="red" />
    </InteractiveComponent>,
  );
  await user.click(screen.getByRole("combobox"));

  expect(onOpenFn).toHaveBeenCalled();
});

test("should call `onOpen` callback if prop is passed and navigation key opens select list", async () => {
  const onOpenFn = jest.fn();
  const user = userEvent.setup();
  render(
    <InteractiveComponent
      onOpen={onOpenFn}
      label="multi-select"
      onChange={() => {}}
    >
      <Option value="opt1" text="red" />
    </InteractiveComponent>,
  );
  const input = screen.getByRole("combobox");

  act(() => {
    input.focus();
  });

  await user.keyboard("{ArrowDown}");

  expect(onOpenFn).toHaveBeenCalled();
});

test("should call `onFocus` callback when input is focused and `openOnFocus` is set", () => {
  jest.useFakeTimers();
  const onFocusFn = jest.fn();
  render(
    <InteractiveComponent
      openOnFocus
      label="multi-select"
      onChange={() => {}}
      onFocus={onFocusFn}
    >
      <Option value="opt1" text="red" />
    </InteractiveComponent>,
  );
  act(() => {
    screen.getByRole("combobox").focus();
  });
  act(() => jest.runOnlyPendingTimers());

  expect(onFocusFn).toHaveBeenCalled();
  jest.useRealTimers();
});

test("should close the list when the user clicks on the input icon and the list is already open", async () => {
  const user = userEvent.setup();
  const onClickFn = jest.fn();
  render(
    <InteractiveComponent
      label="multi-select"
      onChange={() => {}}
      onClick={onClickFn}
    >
      <Option value="opt1" text="red" />
    </InteractiveComponent>,
  );
  const icon = within(screen.getByRole("presentation")).getByTestId("icon");
  await user.click(icon);
  await user.click(icon);

  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  expect(onClickFn).toHaveBeenCalledTimes(2);
});

test("when a custom adaptive sidebar blur event is dispatched the list closes", async () => {
  const user = userEvent.setup();

  render(
    <InteractiveComponent label="multi-select" onChange={() => {}} openOnFocus>
      <Option value="opt1" text="abc" />
    </InteractiveComponent>,
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

// coverage
test("should update the input value when the user presses 'Delete' and the text is highlighted", async () => {
  const user = userEvent.setup();
  render(
    <InteractiveComponent label="multi-select" onChange={() => {}}>
      <Option value="opt1" text="abc" />
    </InteractiveComponent>,
  );
  const input = screen.getByRole("combobox");
  await user.click(input);
  await user.type(input, " ");
  (input as HTMLInputElement).setSelectionRange(0, 0);
  await user.keyboard("{Delete}");

  expect(input).toHaveValue("");
});

test("should focus the input when mousedown event is fired on input", async () => {
  const user = userEvent.setup();

  render(
    <InteractiveComponent label="multi-select" onChange={() => {}} openOnFocus>
      <Option value="opt1" text="abc" />
    </InteractiveComponent>,
  );

  const input = screen.getByRole("combobox");
  await user.pointer({ keys: "[MouseLeft>]", target: input });

  expect(input).toHaveFocus();
});

// coverage
test("the SelectList should stay visible if the input has received a mousedown event, then a click event and `openOnFocus` is true", async () => {
  const user = userEvent.setup();

  render(
    <InteractiveComponent label="multi-select" onChange={() => {}} openOnFocus>
      <Option value="opt1" text="abc" />
    </InteractiveComponent>,
  );

  const input = screen.getByRole("combobox");

  await user.pointer({ keys: "[MouseLeft>]", target: input });

  expect(screen.getByRole("listbox")).toBeVisible();
});

testStyledSystemMargin(
  (props) => (
    <InteractiveComponent
      {...props}
      data-role="my-select"
      label="Colour"
      onChange={() => {}}
    >
      <Option text="amber" value="amber" />
    </InteractiveComponent>
  ),
  () => screen.getByTestId("my-select"),
);
