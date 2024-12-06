import React from "react";
import {
  fireEvent,
  act,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockDOMRect from "../../../__spec_helper__/mock-dom-rect";
import Logger from "../../../__internal__/utils/logger";
import { testStyledSystemMargin } from "../../../__spec_helper__/__internal__/test-utils";

import MultiSelect from ".";
import { Option } from "..";

import Modal from "../../modal";

beforeEach(() => {
  // Mock non-zero dimensions for the scrollable container in dropdown list. To ensure react-virtual renders options in the dropdown list correctly.
  mockDOMRect(40, 100, "select-list-scrollable-container");
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("displays default placeholder text when no value is selected", () => {
  render(
    <MultiSelect label="Colour" onChange={() => {}} value={[]}>
      <Option text="amber" value="amber" />
    </MultiSelect>,
  );

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Please Select...",
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
    </MultiSelect>,
  );

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Select a colour",
  );
});

describe("when value prop is provided", () => {
  it("displays a pill for a matching option", () => {
    render(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        value={["amber"]}
        placeholder="Select a colour"
      >
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    const amberPill = screen.getByTitle("amber");
    expect(amberPill).toBeVisible();
  });

  it("displays pill with correct text, when value is an object which matches an option", () => {
    const selectedOptions = [{ id: "0", value: "amber" }];
    render(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        value={selectedOptions}
        placeholder="Select a colour"
      >
        <Option text="amber" value={selectedOptions[0]} />
      </MultiSelect>,
    );

    const amberPill = screen.getByTitle("amber");
    expect(amberPill).toBeVisible();
  });

  it("displays a styled pill for an option that has custom style props", () => {
    render(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        value={["amber"]}
        placeholder="Select a colour"
      >
        <Option text="amber" value="amber" borderColor="red" fill />
      </MultiSelect>,
    );

    const amberPill = screen.getByTitle("amber");
    expect(amberPill).toHaveStyle(`
      border: 2px solid red;
      background-color: red;
    `);
  });

  it("does not display a pill, when value array contains an unmatched option", () => {
    render(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        value={["green"]}
        placeholder="Select a colour"
      >
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </MultiSelect>,
    );

    expect(screen.queryByTitle("green")).not.toBeInTheDocument();
  });

  it("removes all rendered pills when the value array is set to empty", () => {
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

    expect(screen.queryByTitle("amber")).not.toBeInTheDocument();
  });

  test("displays a pill with a dismiss button for a selected option", async () => {
    render(
      <MultiSelect label="Colour" onChange={() => {}} value={["amber"]}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    const amberPill = screen.getByTitle("amber");
    expect(
      within(amberPill).getByRole("button", { name: "remove pill" }),
    ).toBeVisible();
  });

  test("displays a pill without a dismiss button for a selected option when the component is disabled", () => {
    render(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        value={["amber"]}
        disabled
      >
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    const amberPill = screen.getByTitle("amber");
    expect(
      within(amberPill).queryByRole("button", { name: "remove pill" }),
    ).not.toBeInTheDocument();
  });

  test("displays a pill without a dismiss button for a selected option when the component is read-only", () => {
    render(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        value={["amber"]}
        readOnly
      >
        <Option text="amber" value="amber" />
      </MultiSelect>,
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
      <MultiSelect label="Colour" onChange={() => {}} value={[]}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
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
      </>,
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
      </>,
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("My Select");
  });
});

test("associates the dropdown list with the correct accessible name from the label prop", async () => {
  const user = userEvent.setup();
  render(
    <MultiSelect label="Colour" onChange={() => {}} value={[]}>
      <Option text="amber" value="amber" />
    </MultiSelect>,
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
      </MultiSelect>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      `${listPlacement}-end`,
    );
  },
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
      </MultiSelect>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByTestId("select-list-wrapper")).toHaveAttribute(
      "data-floating-placement",
      listPlacement,
    );
  },
);

describe("dropdown list", () => {
  it("opens when input is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByRole("listbox")).toBeVisible();
  });

  it("opens when input's dropdown icon is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
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
        </MultiSelect>,
      );

      await user.tab();
      await user.keyboard(key);

      expect(await screen.findByRole("listbox")).toBeVisible();
    },
  );

  it.each(["Enter", "a"] as const)(
    "does not open when %s key is pressed",
    async (key) => {
      const user = userEvent.setup();
      render(
        <MultiSelect label="Colour" onChange={() => {}}>
          <Option text="amber" value="amber" />
        </MultiSelect>,
      );

      await user.tab();
      await user.keyboard(`[${key}]`);

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    },
  );

  it("does not open, when input is disabled and is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}} disabled>
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not open, when input is disabled and is selected with the keyboard", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}} disabled>
        <Option text="amber" value="amber" />
      </MultiSelect>,
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
      </MultiSelect>,
    );

    await user.click(screen.getByRole("textbox"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not open, when input is read-only and Space bar is pressed", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}} readOnly>
        <Option text="amber" value="amber" />
      </MultiSelect>,
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
      </MultiSelect>,
    );

    await user.tab();

    expect(await screen.findByRole("listbox")).toBeVisible();
  });

  it("does not open, when input is focused and openOnFocus prop is false", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}} openOnFocus={false}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    await user.tab();

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("stays open after an option is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
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
      </MultiSelect>,
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
      <MultiSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
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
      <MultiSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
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
      <MultiSelect label="Colour" onChange={() => {}} openOnFocus>
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByRole("listbox")).toBeVisible();
  });
});

describe("when dropdown list is opened", () => {
  it("highlights the first option in list when ArrowDown key is pressed", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}} openOnFocus>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </MultiSelect>,
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
      <MultiSelect label="Colour" onChange={() => {}} openOnFocus>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </MultiSelect>,
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
        <MultiSelect
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
        </MultiSelect>
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
      <MultiSelect label="Colour" onChange={onChange} openOnFocus>
        <Option text="amber" value="amber" />
        <Option text="blue" value="blue" />
      </MultiSelect>,
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
      </MultiSelect>,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "amber" }));

    expect(onChange).not.toHaveBeenCalled();
  });

  test("does not render an empty pill, when Enter key is pressed and input text does not match any option", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
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
        <MultiSelect
          label="Colour"
          value={value}
          onChange={(event) => {
            setValue(event.target.value as unknown as string[]);
          }}
        >
          <Option text="amber" value="amber" />
        </MultiSelect>
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
      <MultiSelect
        label="Colour"
        value={value}
        onChange={(event) => {
          setValue(event.target.value as unknown as string[]);
        }}
      >
        <Option text="amber" value="amber" />
      </MultiSelect>
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
      <MultiSelect
        label="Colour"
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value as unknown as string[]);
          onChange(ev);
        }}
      >
        <Option text="amber" value="amber" />
        <Option text="black" value="black" />
      </MultiSelect>
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
      <MultiSelect
        label="Colour"
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value as unknown as string[]);
          onChange(ev);
        }}
      >
        <Option text="amber" value="amber" />
        <Option text="black" value="black" />
      </MultiSelect>
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
      <MultiSelect label="Colour" onChange={() => {}}>
        <Option text="amber" value="amber" />
      </MultiSelect>
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
    <MultiSelect label="Colour" onChange={() => {}}>
      <Option text="amber" value="amber" />
    </MultiSelect>,
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
      <MultiSelect label="Colour" onChange={() => {}} onClick={onClick}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is not called when disabled input is clicked", async () => {
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
      </MultiSelect>,
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
      </MultiSelect>,
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
      <MultiSelect label="Colour" onChange={() => {}} onOpen={onOpen}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    await user.click(screen.getByRole("combobox"));

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("is called when list is opened as the user begins typing in the input", async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();
    render(
      <MultiSelect label="Colour" onChange={() => {}} onOpen={onOpen}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    await user.type(screen.getByRole("combobox"), "a");

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("is called when openOnFocus prop is true and the input is focused", async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();
    render(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        onOpen={onOpen}
        openOnFocus
      >
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    await user.tab();

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("is called when list is opened by clicking the dropdown icon", async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();
    render(
      <MultiSelect label="Colour" onChange={() => {}} onOpen={onOpen}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    await user.click(screen.getByTestId("input-icon-toggle"));

    expect(onOpen).toHaveBeenCalledTimes(1);
  });
});

test("calls onFocus prop when input is focused", async () => {
  const user = userEvent.setup();
  const onFocus = jest.fn();
  render(
    <MultiSelect label="Colour" onChange={() => {}} onFocus={onFocus}>
      <Option text="amber" value="amber" />
    </MultiSelect>,
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
    </MultiSelect>,
  );

  await user.tab();
  await user.tab({ shift: true });

  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("does not call onBlur, when input temporarily loses focus due to an option being clicked in the dropdown list", async () => {
  const user = userEvent.setup();
  const onBlur = jest.fn();
  render(
    <MultiSelect label="Colour" onChange={() => {}} onBlur={onBlur}>
      <Option text="amber" value="amber" />
    </MultiSelect>,
  );

  await user.click(screen.getByRole("combobox"));
  await user.click(await screen.findByRole("option", { name: "amber" }));

  expect(onBlur).not.toHaveBeenCalled();
});

test("calls onKeyDown prop when input is focused and a key is pressed", async () => {
  const user = userEvent.setup();
  const onKeyDown = jest.fn();
  render(
    <MultiSelect label="Colour" onChange={() => {}} onKeyDown={onKeyDown}>
      <Option text="amber" value="amber" />
    </MultiSelect>,
  );

  await user.tab();
  await user.keyboard("{ArrowDown}");

  expect(onKeyDown).toHaveBeenCalledTimes(1);
});

test("calls onFilterChange prop when input text changes", async () => {
  const user = userEvent.setup();
  const onFilterChange = jest.fn();
  render(
    <MultiSelect
      label="Colour"
      onChange={() => {}}
      onFilterChange={onFilterChange}
    >
      <Option text="amber" value="amber" />
    </MultiSelect>,
  );

  await user.type(screen.getByRole("combobox"), "a");

  expect(onFilterChange).toHaveBeenCalledTimes(1);
});

describe("when typing into the input", () => {
  it("renders matching options in the dropdown list, even if the text contains leading whitespace", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}}>
        <Option text="red" value="red" />
      </MultiSelect>,
    );

    await user.type(screen.getByRole("combobox"), "   red");

    expect(screen.getByRole("option", { name: "red" })).toBeVisible();
  });

  it("renders matching options in the dropdown list, even if the text contains trailing whitespace", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect label="Colour" onChange={() => {}}>
        <Option text="red" value="red" />
      </MultiSelect>,
    );

    await user.type(screen.getByRole("combobox"), "red   ");

    expect(screen.getByRole("option", { name: "red" })).toBeVisible();
  });
});

describe("forwarded ref", () => {
  it("allows access to the input element through a forwarded callback ref", () => {
    const mockRef = jest.fn((element) => element);
    render(
      <MultiSelect label="Colour" onChange={() => {}} ref={mockRef}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    expect(mockRef).toHaveBeenNthCalledWith(1, screen.getByRole("combobox"));
  });

  it("allows access to the input element through a forwarded ref object", () => {
    const mockRef = { current: null };
    render(
      <MultiSelect label="Colour" onChange={() => {}} ref={mockRef}>
        <Option text="amber" value="amber" />
      </MultiSelect>,
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
      </MultiSelect>,
    );

    expect(loggerSpy).toHaveBeenNthCalledWith(
      1,
      "Uncontrolled behaviour in `Multi Select` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
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
      </MultiSelect>,
    );

    expect(loggerSpy).not.toHaveBeenCalled();
  });

  it("should not display deprecation about uncontrolled Textbox when parent component is not controlled", () => {
    const loggerSpy = jest.spyOn(Logger, "deprecate");
    render(
      <MultiSelect label="Colour" placeholder="Select a colour">
        <Option text="amber" value="amber" />
      </MultiSelect>,
    );

    expect(loggerSpy).not.toHaveBeenCalledWith(
      "Uncontrolled behaviour in `Textbox` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
    );
  });
});

test("marks input as required when required prop is true", () => {
  render(
    <MultiSelect label="Colour" onChange={() => {}} required>
      <Option text="amber" value="amber" />
    </MultiSelect>,
  );

  expect(screen.getByRole("combobox")).toBeRequired();
});

test("should not be call `onListScrollBottom` callback when an option is clicked", async () => {
  const onListScrollBottomFn = jest.fn();
  const user = userEvent.setup();
  render(
    <MultiSelect
      onListScrollBottom={onListScrollBottomFn}
      openOnFocus
      label="filterable-select"
      onChange={() => {}}
    >
      <Option value="opt1" text="green" />
    </MultiSelect>,
  );
  screen.getByRole("combobox").focus();
  await user.click(await screen.findByRole("option", { name: "green" }));

  expect(onListScrollBottomFn).not.toHaveBeenCalled();
});

test("does not call onOpen, when openOnFocus is true and the input is refocused while the dropdown list is already open", async () => {
  const onOpen = jest.fn();
  render(
    <MultiSelect label="Colour" onChange={() => {}} onOpen={onOpen} openOnFocus>
      <Option text="amber" value="amber" />
    </MultiSelect>,
  );

  const input = screen.getByRole("combobox");

  // focus input and open the dropdown list
  fireEvent.focus(input);
  onOpen.mockClear();

  // refocus input
  fireEvent.focus(input);

  expect(onOpen).not.toHaveBeenCalled();
});

test("dropdown list is open on initial render, when autoFocus and openOnFocus props are true, and component is inside a Carbon Modal", () => {
  jest.useFakeTimers();
  render(
    <Modal open>
      <MultiSelect label="Colour" onChange={() => {}} autoFocus openOnFocus>
        <Option text="amber" value="amber" />
      </MultiSelect>
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

test("should not display the list when `openOnFocus` is set and mousedown is detected", () => {
  jest.useFakeTimers();
  render(
    <MultiSelect openOnFocus label="multi-select" onChange={() => {}}>
      <Option value="opt1" text="red" />
    </MultiSelect>,
  );

  const icon = within(screen.getByRole("presentation")).getByTestId("icon");
  fireEvent.mouseDown(icon);

  act(() => jest.runOnlyPendingTimers());

  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  jest.useRealTimers();
});

test("should display the list when `openOnFocus` is not set", async () => {
  const user = userEvent.setup();
  render(
    <MultiSelect label="multi-select" onChange={() => {}}>
      <Option value="opt1" text="red" />
    </MultiSelect>,
  );
  const icon = within(screen.getByRole("presentation")).getByTestId("icon");
  await user.click(icon);

  expect(await screen.findByRole("listbox")).toBeVisible();
});

test("should call `onOpen` callback if prop is passed", async () => {
  const onOpenFn = jest.fn();
  const user = userEvent.setup();
  render(
    <MultiSelect onOpen={onOpenFn} label="multi-select" onChange={() => {}}>
      <Option value="opt1" text="red" />
    </MultiSelect>,
  );
  await user.click(screen.getByRole("combobox"));

  expect(onOpenFn).toHaveBeenCalled();
});

test("should call `onOpen` callback if prop is passed and navigation key opens select list", async () => {
  const onOpenFn = jest.fn();
  const user = userEvent.setup();
  render(
    <MultiSelect onOpen={onOpenFn} label="multi-select" onChange={() => {}}>
      <Option value="opt1" text="red" />
    </MultiSelect>,
  );
  const input = screen.getByRole("combobox");
  input.focus();

  await user.keyboard("{ArrowDown}");

  expect(onOpenFn).toHaveBeenCalled();
});

test("should call `onFocus` callback when input is focused and `openOnFocus` is set", () => {
  jest.useFakeTimers();
  const onFocusFn = jest.fn();
  render(
    <MultiSelect
      openOnFocus
      label="multi-select"
      onChange={() => {}}
      onFocus={onFocusFn}
    >
      <Option value="opt1" text="red" />
    </MultiSelect>,
  );
  screen.getByRole("combobox").focus();
  act(() => jest.runOnlyPendingTimers());

  expect(onFocusFn).toHaveBeenCalled();
  jest.useRealTimers();
});

test("should close the list when the user clicks on the input icon and the list is already open", async () => {
  const user = userEvent.setup();
  const onClickFn = jest.fn();
  render(
    <MultiSelect label="multi-select" onChange={() => {}} onClick={onClickFn}>
      <Option value="opt1" text="red" />
    </MultiSelect>,
  );
  const icon = within(screen.getByRole("presentation")).getByTestId("icon");
  await user.click(icon);
  await user.click(icon);

  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  expect(onClickFn).toHaveBeenCalledTimes(2);
});

// coverage
test("should update the input value when the user presses 'Delete' and the text is highlighted", async () => {
  const user = userEvent.setup();
  render(
    <MultiSelect label="multi-select" onChange={() => {}}>
      <Option value="opt1" text="abc" />
    </MultiSelect>,
  );
  const input = screen.getByRole("combobox");
  await user.click(input);
  await user.type(input, " ");
  (input as HTMLInputElement).setSelectionRange(0, 0);
  await user.keyboard("{Delete}");

  expect(input).toHaveValue("");
});

// coverage
test("should focus the input when mousedown event is fired on input", async () => {
  jest.useFakeTimers();
  render(
    <MultiSelect label="multi-select" onChange={() => {}} openOnFocus>
      <Option value="opt1" text="abc" />
    </MultiSelect>,
  );
  const input = screen.getByRole("combobox");
  fireEvent.mouseDown(input);
  act(() => jest.runOnlyPendingTimers());

  expect(input).toHaveFocus();
  jest.useRealTimers();
});

// coverage
test("the SelectList should stay visible if the input has received a mousedown event, then a click event and `openOnFocus` is true", () => {
  render(
    <MultiSelect label="multi-select" onChange={() => {}} openOnFocus>
      <Option value="opt1" text="abc" />
    </MultiSelect>,
  );

  const input = screen.getByRole("combobox");
  fireEvent.mouseDown(input);
  fireEvent.focus(input);
  fireEvent.click(input);

  expect(screen.getByRole("listbox")).toBeVisible();
});

testStyledSystemMargin(
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
  () => screen.getByTestId("my-select"),
);
