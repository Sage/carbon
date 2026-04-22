import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Textbox, { TextboxProps } from ".";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import { EnterKeyHintTypes } from "../../__internal__/legacy-input";
import createGuid from "../../__internal__/utils/helpers/guid";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Logger from "../../__internal__/utils/logger";

jest.mock("../../__internal__/utils/logger");

const mockedGuid = "mocked-guid";
jest.mock("../../__internal__/utils/helpers/guid");

(createGuid as jest.MockedFunction<typeof createGuid>).mockReturnValue(
  mockedGuid,
);

let loggerSpy: jest.SpyInstance<void, [message: string]> | jest.Mock;

beforeEach(() => {
  loggerSpy = jest.spyOn(Logger, "deprecate");
});

afterEach(() => {
  loggerSpy.mockRestore();
});

afterAll(() => {
  loggerSpy.mockClear();
});

testStyledSystemMargin(
  (props) => (
    <Textbox
      data-role="textbox-wrapper"
      value="foo"
      onChange={() => {}}
      {...props}
    />
  ),
  () => screen.getByTestId("textbox-wrapper"),
);

describe(`when the characterLimit prop is passed`, () => {
  it.each([2, 3, 4])("renders a character counter", (characterLimit) => {
    const valueString = "foo";
    const limitMinusValue = characterLimit - valueString.length >= 0;
    render(
      <Textbox
        value={valueString}
        onChange={() => {}}
        characterLimit={characterLimit}
      />,
    );
    const underCharacters =
      characterLimit - valueString.length === 1 ? "character" : "characters";
    const overCharacters =
      valueString.length - characterLimit === 1 ? "character" : "characters";

    expect(
      screen.getByText(
        `${
          limitMinusValue
            ? `${characterLimit - valueString.length} ${underCharacters} left`
            : `${
                valueString.length - characterLimit
              } ${overCharacters} too many`
        }`,
        { selector: '[aria-hidden="true"]' },
      ),
    ).toBeInTheDocument();
  });

  it("should render a visually hidden hint with id generated via guid", () => {
    render(<Textbox value="foo" onChange={() => {}} characterLimit={73} />);
    expect(
      screen.getByText("You can enter up to 73 characters", {
        selector: '[data-element="visually-hidden-hint"]',
      }),
    ).toHaveAttribute("id", mockedGuid);
  });

  it("should reference the visually hidden hint id in the input's aria-describedby", () => {
    render(<Textbox value="foo" onChange={() => {}} characterLimit={73} />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      mockedGuid,
    );
  });

  it("renders a counter with an over limit warning", () => {
    render(
      <Textbox value="test string" onChange={() => {}} characterLimit={10} />,
    );

    expect(
      screen.getByText("1 character too many", {
        selector: '[aria-hidden="true"]',
      }),
    ).toHaveStyleRule("color", "var(--colorsSemanticNegative500)");
  });
});

test("accepts ref as a ref object", () => {
  const ref = { current: null };
  render(<Textbox value="foo" onChange={() => {}} ref={ref} />);

  expect(ref.current).toBe(screen.getByRole("textbox"));
});

test("accepts ref as a ref callback", () => {
  const ref = jest.fn();
  render(<Textbox value="foo" onChange={() => {}} ref={ref} />);

  expect(ref).toHaveBeenCalledWith(screen.getByRole("textbox"));
});

test("sets ref to empty after unmount", () => {
  const ref = { current: null };
  const { unmount } = render(
    <Textbox value="foo" onChange={() => {}} ref={ref} />,
  );

  unmount();

  expect(ref.current).toBe(null);
});

test("supports a separate onClick handler passing for the icon", async () => {
  const onClick = jest.fn();
  const iconOnClick = jest.fn();
  const user = userEvent.setup();

  render(
    <Textbox
      value="foobar"
      onChange={() => {}}
      inputIcon="search"
      onClick={onClick}
      iconOnClick={iconOnClick}
    >
      normal children
    </Textbox>,
  );
  await user.click(screen.getByTestId("input-icon-toggle"));
  expect(iconOnClick).toHaveBeenCalled();
  expect(onClick).not.toHaveBeenCalled();
});

test.each([
  "enter",
  "done",
  "go",
  "next",
  "previous",
  "search",
  "send",
] as EnterKeyHintTypes[])(
  "'enterKeyHint' is correctly passed to the input when prop value is %s",
  (keyHints) => {
    render(
      <Textbox value="foobar" onChange={() => {}} enterKeyHint={keyHints} />,
    );

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "enterkeyhint",
      keyHints,
    );
  },
);

test.each(["disabled", "readOnly"])(
  "does not call iconOnClick handler for the icon when input is %s",
  async (propName) => {
    const onClick = jest.fn();
    const iconOnClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Textbox
        value="foobar"
        onChange={() => {}}
        inputIcon="search"
        onClick={onClick}
        iconOnClick={iconOnClick}
        disabled={propName === "disabled"}
        readOnly={propName === "readOnly"}
      >
        normal children
      </Textbox>,
    );
    await user.click(screen.getByTestId("input-icon-toggle"));
    expect(iconOnClick).not.toHaveBeenCalled();
  },
);

test.each(["disabled", "readOnly"])(
  "does not call iconOnMouseDown handler for the icon when input is %s",
  async (propName) => {
    const onMouseDown = jest.fn();
    const iconOnMouseDown = jest.fn();
    const user = userEvent.setup();

    render(
      <Textbox
        value="foobar"
        onChange={() => {}}
        inputIcon="search"
        onMouseDown={onMouseDown}
        iconOnMouseDown={iconOnMouseDown}
        disabled={propName === "disabled"}
        readOnly={propName === "readOnly"}
      >
        normal children
      </Textbox>,
    );
    await user.click(screen.getByTestId("input-icon-toggle"));
    expect(iconOnMouseDown).not.toHaveBeenCalled();
  },
);

test.each(["disabled", "readOnly"])(
  "does not call onClick handler when input is %s and icon is clicked",
  async (propName) => {
    const onClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Textbox
        value="foobar"
        onChange={() => {}}
        inputIcon="search"
        onClick={onClick}
        disabled={propName === "disabled"}
        readOnly={propName === "readOnly"}
      >
        normal children
      </Textbox>,
    );
    await user.click(screen.getByTestId("input-icon-toggle"));
    expect(onClick).not.toHaveBeenCalled();
  },
);

test.each(["disabled", "readOnly"])(
  "does not call onMouseDown handler when input is %s and icon is clicked",
  async (propName) => {
    const onMouseDown = jest.fn();
    const user = userEvent.setup();

    render(
      <Textbox
        value="foobar"
        onChange={() => {}}
        inputIcon="search"
        onMouseDown={onMouseDown}
        disabled={propName === "disabled"}
        readOnly={propName === "readOnly"}
      >
        normal children
      </Textbox>,
    );
    await user.click(screen.getByTestId("input-icon-toggle"));
    expect(onMouseDown).not.toHaveBeenCalled();
  },
);

test("should call onChangeDeferred when the input value changes and prop is provided", async () => {
  jest.useFakeTimers();
  const onChangeDeferred = jest.fn();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <Textbox
      value="foobar"
      onChange={() => {}}
      onChangeDeferred={onChangeDeferred}
    />,
  );

  await user.type(screen.getByRole("textbox"), "new value");
  jest.advanceTimersByTime(750);

  expect(onChangeDeferred).toHaveBeenCalled();

  jest.useRealTimers();
});

test("calls the onClick callback when input icon is clicked and no iconOnClick prop is passed", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup();

  render(
    <Textbox
      value="foobar"
      onChange={() => {}}
      inputIcon="search"
      onClick={onClick}
    >
      normal children
    </Textbox>,
  );
  await user.click(screen.getByTestId("input-icon-toggle"));

  expect(onClick).toHaveBeenCalled();
});

describe("when the prefix prop is set", () => {
  it("renders a StyledPrefix with this prop value", () => {
    const prefixValue = "bar";
    render(<Textbox value="foo" onChange={() => {}} prefix={prefixValue} />);
    expect(screen.getByText(prefixValue)).toHaveAttribute(
      "data-element",
      "textbox-prefix",
    );
  });
});

test("the required prop is passed to the input", () => {
  render(<Textbox value="foo" onChange={() => {}} label="Required" required />);
  expect(screen.getByRole("textbox")).toBeRequired();
});

test("when the required prop is set, the label includes the 'required' asterisk", () => {
  render(<Textbox value="foo" onChange={() => {}} label="Required" required />);
  expect(screen.getByText("Required")).toHaveStyleRule("content", '"*"', {
    modifier: "::after",
  });
});

test("renders the positionChildren prop before the input", () => {
  const Component = () => <div>positionedChildren content</div>;
  render(
    <Textbox
      value="foo"
      onChange={() => {}}
      positionedChildren={<Component />}
    />,
  );
  const positionChildren = screen.getByText("positionedChildren content");
  const input = screen.getByRole("textbox");
  expect(positionChildren.compareDocumentPosition(input)).toEqual(
    Node.DOCUMENT_POSITION_FOLLOWING,
  );
});

test("sets the accessible label to the provided aria-labelledby", () => {
  const Component = () => (
    <>
      <p id="test">label</p>
      <Textbox aria-labelledby="test" value="foo" onChange={() => {}} />
    </>
  );
  render(<Component />);

  expect(screen.getByRole("textbox")).toHaveAccessibleName("label");
});

test("appends the provided `aria-describedby` to the accessible description", () => {
  const Component = () => (
    <>
      <p id="test">description</p>
      <Textbox
        label="foo"
        inputHint="hint text"
        aria-describedby="test"
        value="foo"
        onChange={() => {}}
      />
    </>
  );
  render(<Component />);

  expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
    "hint text description",
  );
});

test("when id and fieldHelp are both present, the id of the field help is added to 'aria-describedby' in the input", () => {
  render(
    <Textbox
      id="foo"
      label="bar"
      fieldHelp="baz"
      value="foo"
      onChange={() => {}}
    />,
  );

  expect(screen.getByText("baz")).toHaveAttribute("id", "foo-field-help");
  expect(screen.getByRole("textbox")).toHaveAttribute(
    "aria-describedby",
    "foo-field-help",
  );
});

test("when fieldHelp is present and id is not present, the id of the field help is added to 'aria-describedby' in the input", () => {
  render(
    <Textbox label="bar" fieldHelp="baz" value="foo" onChange={() => {}} />,
  );

  expect(screen.getByText("baz")).toHaveAttribute(
    "id",
    `${mockedGuid}-field-help`,
  );
  expect(screen.getByRole("textbox")).toHaveAttribute(
    "aria-describedby",
    `${mockedGuid}-field-help`,
  );
});

test("describes the input with the inputHint and error message when validationMessagePositionTop is true", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Textbox
        label="foo"
        inputHint="input hint"
        value="foo"
        onChange={() => {}}
        error="validation message"
      />
    </CarbonProvider>,
  );

  expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
    "input hint validation message",
  );
});

test("describes the input with the inputHint and warning when validationMessagePositionTop is true", () => {
  render(
    <Textbox
      label="foo"
      inputHint="input hint"
      value="foo"
      onChange={() => {}}
      warning="validation message"
    />,
  );

  expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
    "input hint validation message",
  );
});

test("describes the input with the inputHint and error message when validationMessagePositionTop is false", () => {
  render(
    <Textbox
      label="foo"
      inputHint="input hint"
      value="foo"
      onChange={() => {}}
      error="validation message"
      validationMessagePositionTop={false}
    />,
  );

  expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
    "input hint validation message",
  );
});

test("describes the input with the inputHint and warning when validationMessagePositionTop is false", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Textbox
        label="foo"
        value="foo"
        onChange={() => {}}
        inputHint="input hint"
        warning="validation message"
        validationMessagePositionTop={false}
      />
    </CarbonProvider>,
  );

  expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
    "input hint validation message",
  );
});

describe("when inputHint prop is present", () => {
  it("renders the hint", () => {
    render(
      <Textbox
        label="foo"
        value="test string"
        onChange={() => {}}
        inputHint="bar"
      />,
    );
    expect(screen.getByText("bar")).toBeVisible();
  });

  it("does not render the hint if no label is provided", () => {
    render(<Textbox value="test string" onChange={() => {}} inputHint="bar" />);
    expect(screen.queryByText("bar")).not.toBeInTheDocument();
  });

  it("assigns the input hint a guid as id and references it in the aria-describedby of the input", () => {
    render(
      <Textbox
        label="foo"
        value="test string"
        onChange={() => {}}
        inputHint="bar"
      />,
    );
    expect(screen.getByText("bar")).toHaveAttribute("id", mockedGuid);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      mockedGuid,
    );
  });
});

describe("when rendered with new validations", () => {
  const renderWithNewValidations = (props: TextboxProps) =>
    render(
      <CarbonProvider validationRedesignOptIn>
        <Textbox {...props} />
      </CarbonProvider>,
    );

  it('adds the id of the validation text to "aria-describedby" in the input', () => {
    const mockId = "foo";
    renderWithNewValidations({
      id: mockId,
      error: "bar",
      value: "foo",
      onChange: jest.fn(),
    });

    expect(screen.getByText("bar")).toHaveAttribute(
      "id",
      `${mockId}-validation-1`,
    );
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      `${mockId}-validation-1`,
    );
  });
});

describe("when validation message changes", () => {
  const renderWithNewValidations = (props: TextboxProps) =>
    render(<Textbox {...props} />);

  const newValidationTypes = ["error", "warning"] as const;

  it.each(newValidationTypes)(
    "updates the %s validation id from validation-1 to validation-2 when the message changes",
    (validationType) => {
      const mockId = "foo";
      const { rerender } = renderWithNewValidations({
        id: mockId,
        [validationType]: "first message",
        value: "foo",
        onChange: jest.fn(),
      });

      expect(screen.getByText("first message")).toHaveAttribute(
        "id",
        `${mockId}-validation-1`,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-describedby",
        `${mockId}-validation-1`,
      );

      rerender(
        <Textbox
          id={mockId}
          {...{ [validationType]: "different message" }}
          value="foo"
          onChange={jest.fn()}
        />,
      );

      expect(screen.getByText("different message")).toHaveAttribute(
        "id",
        `${mockId}-validation-2`,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-describedby",
        `${mockId}-validation-2`,
      );
    },
  );

  it.each(newValidationTypes)(
    "keeps the same %s validation id when the message stays the same",
    (validationType) => {
      const mockId = "foo";
      const { rerender } = renderWithNewValidations({
        id: mockId,
        [validationType]: "same message",
        value: "foo",
        onChange: jest.fn(),
      });

      expect(screen.getByText("same message")).toHaveAttribute(
        "id",
        `${mockId}-validation-1`,
      );

      rerender(
        <CarbonProvider validationRedesignOptIn>
          <Textbox
            id={mockId}
            {...{ [validationType]: "same message" }}
            value="foo"
            onChange={jest.fn()}
          />
        </CarbonProvider>,
      );

      expect(screen.getByText("same message")).toHaveAttribute(
        "id",
        `${mockId}-validation-1`,
      );
    },
  );

  it("updates validation id when switching from error to warning", () => {
    const mockId = "foo";
    const { rerender } = renderWithNewValidations({
      id: mockId,
      error: "error message",
      value: "foo",
      onChange: jest.fn(),
    });

    expect(screen.getByText("error message")).toHaveAttribute(
      "id",
      `${mockId}-validation-1`,
    );

    rerender(
      <Textbox
        id={mockId}
        warning="warning message"
        value="foo"
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByText("warning message")).toHaveAttribute(
      "id",
      `${mockId}-validation-2`,
    );
  });
});
