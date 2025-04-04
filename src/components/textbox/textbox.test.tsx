import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as floatingUi from "@floating-ui/react-dom";
import Textbox, { TextboxProps } from ".";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import { EnterKeyHintTypes } from "../../__internal__/input";
import createGuid from "../../__internal__/utils/helpers/guid";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Logger from "../../__internal__/utils/logger";
import StyledInput from "../../__internal__/input/input.style";

jest.mock("../../__internal__/utils/logger");

const mockedGuid = "mocked-guid";
jest.mock("../../__internal__/utils/helpers/guid");

(createGuid as jest.MockedFunction<typeof createGuid>).mockReturnValue(
  mockedGuid,
);

let loggerSpy: jest.SpyInstance<void, [message: string]> | jest.Mock;

const validationTypes = ["error", "warning", "info"];

beforeEach(() => {
  loggerSpy = jest.spyOn(Logger, "deprecate");
});

afterEach(() => {
  loggerSpy.mockRestore();
});

afterAll(() => {
  loggerSpy.mockClear();
});

test("should display deprecation warning once when rendered as uncontrolled", () => {
  render(<Textbox name="my-textbox" defaultValue="test" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "Uncontrolled behaviour in `Textbox` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
  );

  expect(loggerSpy).toHaveBeenCalledTimes(1);
});

test("should display deprecation warning once for `ariaDescribedby`", () => {
  render(<Textbox onChange={() => {}} ariaDescribedBy="test" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "The `ariaDescribedBy` prop in `Textbox` is deprecated and will soon be removed, please use `aria-describedby` instead.",
  );

  expect(loggerSpy).toHaveBeenCalledTimes(1);
});

testStyledSystemMargin(
  (props) => <Textbox data-role="textbox-wrapper" {...props} />,
  () => screen.getByTestId("textbox-wrapper"),
  { modifier: "&&&" },
);

describe(`when the characterLimit prop is passed`, () => {
  it.each([2, 3, 4])("renders a character counter", (characterLimit) => {
    const valueString = "foo";
    const limitMinusValue = characterLimit - valueString.length >= 0;
    render(<Textbox value={valueString} characterLimit={characterLimit} />);
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
    render(<Textbox value="foo" characterLimit={73} />);
    expect(
      screen.getByText("You can enter up to 73 characters", {
        selector: '[data-element="visually-hidden-hint"]',
      }),
    ).toHaveAttribute("id", mockedGuid);
  });

  it("should reference the visually hidden hint id in the input's aria-describedby", () => {
    render(<Textbox value="foo" characterLimit={73} />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      mockedGuid,
    );
  });

  it("renders a counter with an over limit warning", () => {
    render(<Textbox value="test string" characterLimit={10} />);

    expect(
      screen.getByText("1 character too many", {
        selector: '[aria-hidden="true"]',
      }),
    ).toHaveStyleRule("color", "var(--colorsSemanticNegative500)");
  });
});

test("accepts ref as a ref object", () => {
  const ref = { current: null };
  render(<Textbox ref={ref} />);

  expect(ref.current).toBe(screen.getByRole("textbox"));
});

test("accepts ref as a ref callback", () => {
  const ref = jest.fn();
  render(<Textbox ref={ref} />);

  expect(ref).toHaveBeenCalledWith(screen.getByRole("textbox"));
});

test("sets ref to empty after unmount", () => {
  const ref = { current: null };
  const { unmount } = render(<Textbox ref={ref} />);

  unmount();

  expect(ref.current).toBe(null);
});

test.each([
  {
    inputIcon: "search",
  },
  {
    error: "error",
  },
  {
    warning: "warning",
  },
  {
    info: "info",
  },
] as const)(
  "styles the input appropriately when an icon is present inside",
  (props: Partial<TextboxProps>) => {
    render(<Textbox value="test string" {...props} />);
    expect(screen.getByRole("presentation")).toHaveStyleRule(
      "padding-right",
      "0",
      { modifier: `& ${StyledInput}` },
    );
  },
);

test("supports a separate onClick handler passing for the icon", async () => {
  const onClick = jest.fn();
  const iconOnClick = jest.fn();
  const user = userEvent.setup();

  render(
    <Textbox
      value="foobar"
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
    render(<Textbox value="foobar" enterKeyHint={keyHints} />);

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

test.each(validationTypes)(
  "when %s prop passed as string render proper validation icon by the input",
  (type) => {
    render(<Textbox label="Label" {...{ [type]: "Message" }} />);
    const inputPresentationContainer = screen.getByRole("presentation");
    const validationIcon = screen.getByTestId(`icon-${type}`);
    expect(inputPresentationContainer).toContainElement(validationIcon);
  },
);

test.each(validationTypes)(
  `when %s prop passed as string and validationOnLabel
  as true render proper validation icon on the label`,
  (type) => {
    render(
      <Textbox label="Label" {...{ [type]: "Message" }} validationOnLabel />,
    );
    const labelContainer = screen.getByTestId("label-container");
    const validationIcon = screen.getByTestId(`icon-${type}`);
    expect(labelContainer).toContainElement(validationIcon);
  },
);

test.each([
  ["top", true],
  ["bottom", true],
  ["left", true],
  ["top", false],
  ["bottom", false],
  ["left", false],
] as const)(
  "when tooltipPosition prop provided with a validation string, should pass the expected value %s rather than the default ('right')",
  (tooltipPosition, onLabel) => {
    const useFloatingSpy = jest.spyOn(floatingUi, "useFloating");

    render(
      <Textbox
        label="Label"
        error="Message"
        validationOnLabel={onLabel}
        tooltipPosition={tooltipPosition}
      />,
    );

    expect(useFloatingSpy).toHaveBeenCalledWith(
      expect.objectContaining({ placement: tooltipPosition }),
    );

    useFloatingSpy.mockRestore();
  },
);

describe("when the prefix prop is set", () => {
  it("renders a StyledPrefix with this prop value", () => {
    const prefixValue = "bar";
    render(<Textbox value="foo" prefix={prefixValue} />);
    expect(screen.getByText(prefixValue)).toHaveAttribute(
      "data-element",
      "textbox-prefix",
    );
  });

  it("renders with 'flex-direction' as 'row' when the align prop is 'right'", () => {
    const prefixValue = "bar";
    render(<Textbox value="foo" prefix={prefixValue} align="right" />);
    expect(screen.getByRole("presentation")).toHaveStyle({
      flexDirection: "row",
    });
  });
});

test("the required prop is passed to the input", () => {
  render(<Textbox value="foo" label="Required" required />);
  expect(screen.getByRole("textbox")).toBeRequired();
});

test("when the required prop is set, the label includes the 'required' asterisk", () => {
  render(<Textbox value="foo" label="Required" required />);
  expect(screen.getByText("Required")).toHaveStyleRule("content", '"*"', {
    modifier: "::after",
  });
});

test("renders the positionChildren prop before the input", () => {
  const Component = () => <div>positionedChildren content</div>;
  render(<Textbox positionedChildren={<Component />} />);
  const positionChildren = screen.getByText("positionedChildren content");
  const input = screen.getByRole("textbox");
  expect(positionChildren.compareDocumentPosition(input)).toEqual(
    Node.DOCUMENT_POSITION_FOLLOWING,
  );
});

test("passes the helpAriaLabel prop down to the help component", () => {
  const text = "foo";
  render(
    <Textbox
      value=""
      label="label"
      labelHelp="some help"
      helpAriaLabel={text}
    />,
  );

  expect(screen.getByRole("button")).toHaveAttribute("aria-label", text);
});

test("sets the accessible label to the provided aria-labelledby", () => {
  const Component = () => (
    <>
      <p id="test">label</p>
      <Textbox aria-labelledby="test" />
    </>
  );
  render(<Component />);

  expect(screen.getByRole("textbox")).toHaveAccessibleName("label");
});

test("appends the provided `aria-describedby` to the accessible description", () => {
  const Component = () => (
    <>
      <p id="test">description</p>
      <Textbox inputHint="hint text" aria-describedby="test" />
    </>
  );
  render(<Component />);

  expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
    "hint text description",
  );
});

test("appends the provided `ariaDescribedBy` to the accessible description", () => {
  const Component = () => (
    <>
      <p id="test">description</p>
      <Textbox inputHint="hint text" ariaDescribedBy="test" />
    </>
  );
  render(<Component />);

  expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
    "hint text description",
  );
});

test.each(validationTypes)(
  'when id is present, %s prop is set as a string and the input is focused, the id of the validation tooltip is added to "aria-describedby" in the input',
  async (validationType) => {
    render(<Textbox label="bar" id="foo" {...{ [validationType]: "test" }} />);
    const input = screen.getByRole("textbox");
    act(() => {
      input.focus();
    });

    expect(await screen.findByRole("tooltip")).toHaveAttribute(
      "id",
      "foo-validation",
    );
    expect(input).toHaveAttribute("aria-describedby", "foo-validation");
  },
);

test.each(validationTypes)(
  "when id is not present, %s prop is set as a string and the input is focused, the id of the validation tooltip is added to 'aria-describedby' in the input",
  async (validationType) => {
    render(<Textbox label="bar" {...{ [validationType]: "test" }} />);
    const input = screen.getByRole("textbox");
    act(() => {
      input.focus();
    });

    expect(await screen.findByRole("tooltip")).toHaveAttribute(
      "id",
      `${mockedGuid}-validation`,
    );
    expect(input).toHaveAttribute(
      "aria-describedby",
      `${mockedGuid}-validation`,
    );
  },
);

test("when id and fieldHelp are both present, the id of the field help is added to 'aria-describedby' in the input", () => {
  render(<Textbox id="foo" label="bar" fieldHelp="baz" />);

  expect(screen.getByText("baz")).toHaveAttribute("id", "foo-field-help");
  expect(screen.getByRole("textbox")).toHaveAttribute(
    "aria-describedby",
    "foo-field-help",
  );
});

test("when fieldHelp is present and id is not present, the id of the field help is added to 'aria-describedby' in the input", () => {
  render(<Textbox label="bar" fieldHelp="baz" />);

  expect(screen.getByText("baz")).toHaveAttribute(
    "id",
    `${mockedGuid}-field-help`,
  );
  expect(screen.getByRole("textbox")).toHaveAttribute(
    "aria-describedby",
    `${mockedGuid}-field-help`,
  );
});

test.each(validationTypes)(
  'when id is present, %s prop is set as a string, fieldHelp is present and the input is focused, the ids of both the validation tooltip are added to "aria-describedby" in the input',
  async (validationType) => {
    render(
      <Textbox
        label="bar"
        id="foo"
        fieldHelp="baz"
        {...{ [validationType]: "test" }}
      />,
    );
    const input = screen.getByRole("textbox");
    act(() => {
      input.focus();
    });

    expect(await screen.findByRole("tooltip")).toHaveAttribute(
      "id",
      "foo-validation",
    );
    expect(screen.getByText("baz")).toHaveAttribute("id", "foo-field-help");
    expect(input).toHaveAttribute(
      "aria-describedby",
      "foo-field-help foo-validation",
    );
  },
);

test.each(validationTypes)(
  'when id is not present, %s prop is set as a string, fieldHelp is present and the input is focused, the ids of both the validation tooltip are added to "aria-describedby" in the input',
  async (validationType) => {
    render(
      <Textbox label="bar" fieldHelp="baz" {...{ [validationType]: "test" }} />,
    );
    const input = screen.getByRole("textbox");
    act(() => {
      input.focus();
    });

    expect(await screen.findByRole("tooltip")).toHaveAttribute(
      "id",
      `${mockedGuid}-validation`,
    );
    expect(screen.getByText("baz")).toHaveAttribute(
      "id",
      `${mockedGuid}-field-help`,
    );
    expect(input).toHaveAttribute(
      "aria-describedby",
      `${mockedGuid}-field-help ${mockedGuid}-validation`,
    );
  },
);

test("renders validation tooltip with provided 'tooltipId' prop", async () => {
  render(<Textbox label="bar" error="baz" tooltipId="foo" />);

  const input = screen.getByRole("textbox");
  act(() => {
    input.focus();
  });

  expect(await screen.findByRole("tooltip")).toHaveAttribute("id", "foo");
  expect(input).toHaveAccessibleDescription("baz");
});

describe("when inputHint prop is present", () => {
  it("renders the hint", () => {
    render(<Textbox value="test string" inputHint="foo" />);
    expect(screen.getByText("foo")).toBeInTheDocument();
  });

  it("assigns the input hint a guid as id and references it in the aria-describedby of the input", () => {
    render(<Textbox value="test string" inputHint="bar" />);
    expect(screen.getByText("bar")).toHaveAttribute("id", mockedGuid);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      mockedGuid,
    );
  });

  it("uses the inputHint prop instead of labelHelp when both are passed", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <Textbox labelHelp="labelHelp" inputHint="inputHint" error="foo" />
      </CarbonProvider>,
    );
    expect(screen.getByText("inputHint")).toBeInTheDocument();
    expect(screen.queryByText("labelHelp")).not.toBeInTheDocument();
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
    renderWithNewValidations({ id: mockId, error: "bar" });

    expect(screen.getByText("bar")).toHaveAttribute(
      "id",
      `${mockId}-validation`,
    );
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      `${mockId}-validation`,
    );
  });

  it("ignores the labelInline and related styling props", () => {
    renderWithNewValidations({
      labelInline: true,
      label: "example label",
      labelAlign: "left",
      labelWidth: 100,
      labelSpacing: 1,
      reverse: true,
    });
    const labelContainer = screen.getByTestId("label-container");
    expect(labelContainer).toHaveStyle({ width: undefined });
    expect(labelContainer).toHaveStyle({ justifyContent: undefined });
    expect(labelContainer).toHaveStyle({ paddingLeft: undefined });
    expect(labelContainer).toHaveStyle({ paddingRight: undefined });
  });

  it("renders the hint text with the correct styling when the labelHelp prop is passed", () => {
    renderWithNewValidations({ labelHelp: "help" });
    const hintText = screen.getByText("help");
    expect(hintText).toBeInTheDocument();
    expect(hintText).toHaveStyleRule("color", "var(--colorsUtilityYin055)");
    expect(hintText).toHaveStyleRule("font-size", "14px");
    expect(hintText).toHaveStyleRule("margin-top", "var(--spacing000)");
    expect(hintText).toHaveStyleRule("margin-bottom", "var(--spacing100)");
  });
});

test("renders with the expected border radius styling", () => {
  render(<Textbox />);
  expect(screen.getByRole("textbox")).toHaveStyleRule(
    "border-radius",
    "var(--borderRadius050)",
  );
});

test("should not set `maxWidth` on the presentation layer when `labelAlign` is 'right'", () => {
  render(
    <Textbox
      value=""
      onChange={() => {}}
      label="foo"
      labelAlign="right"
      maxWidth="200px"
    />,
  );

  expect(screen.getByTestId("input-presentation-container")).toHaveStyle(
    "max-width: 100%",
  );
  expect(screen.getByTestId("field-line")).toHaveStyle("max-width: 200px");
});
