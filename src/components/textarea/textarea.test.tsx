import React, { useState } from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as floatingUi from "@floating-ui/react-dom";

import {
  assertLoggerComponentMessage,
  testStyledSystemMargin,
} from "../../__spec_helper__/__internal__/test-utils";
import Textarea, { TextareaProps } from ".";
import { EnterKeyHintTypes } from "../../__internal__/legacy-input";
import guid from "../../__internal__/utils/helpers/guid";
import StyledInput from "../../__internal__/legacy-input/input.style";
import StyledHintText from "../../__internal__/hint-text/hint-text.style";
import Logger from "../../__internal__/utils/logger";
import { parseValueUnit } from "./textarea.component";

jest.mock("../../__internal__/utils/logger");

jest.mock("../../__internal__/utils/helpers/guid");
const mockedGuid = "guid-12345";
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockedGuid);

type CustomType = Omit<TextareaProps, "onChange" | "value"> & {
  value?: string;
};

const MockComponent = (props: CustomType) => {
  const [value, setValue] = useState(() => props.value ?? "Initial content");
  return (
    <Textarea
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

test("should display deprecation warning once when rendered as optional", () => {
  assertLoggerComponentMessage({
    component: <MockComponent name="my-textarea" isOptional />,
    message:
      "`isOptional` is deprecated in TextArea and support will soon be removed. If the value of this component is not required, use the `required` prop and set it to false instead.",
  });
});

test("should render a textarea element", () => {
  render(<MockComponent />);
  const textarea = screen.getByRole("textbox");
  expect(textarea).toBeInTheDocument();
  expect(textarea.tagName).toEqual("TEXTAREA");
});

test("should not render character counter if no characterLimit prop is given", () => {
  render(<MockComponent />);
  expect(screen.queryByText(/you can enter up to/i)).not.toBeInTheDocument();
});

test("should render character counter if characterLimit prop is given", () => {
  render(<MockComponent characterLimit={5} />);
  expect(screen.getByText(/you can enter up to/i)).toBeInTheDocument();
});

test("should not render a placeholder if disabled", () => {
  render(<MockComponent placeholder="foo" disabled />);
  expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "");
});

testStyledSystemMargin(
  (props) => <MockComponent data-role="textarea-wrapper" {...props} />,
  () => screen.getByTestId("textarea-wrapper"),
);

test("should display the correct value when the value prop is set", () => {
  render(<MockComponent />);

  expect(screen.getByRole("textbox")).toHaveTextContent("Initial content");
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
  "styles the textarea appropriately when an icon is present inside",
  (props) => {
    render(<MockComponent data-role="icon-test" {...props} />);
    expect(screen.getByTestId("icon-test")).toHaveStyleRule(
      "padding-right",
      "var(--spacing500)",
      { modifier: `& ${StyledInput}` },
    );
  },
);

test("should have default min-height of 79px if no minHeight is specified", () => {
  render(<MockComponent />);

  const textarea = screen.getByRole("textbox");

  expect(textarea).toHaveStyle({ "min-height": "79px" });
});

test("should have default min-height for specified size if the minHeight is smaller", () => {
  render(<MockComponent size="medium" minHeight={10} />);

  const textarea = screen.getByRole("textbox");

  expect(textarea).toHaveStyle({ "min-height": "79px" });
});

test("should keep the size default min-height when rows is provided and scrollHeight is 0", () => {
  const scrollHeightSpy = jest
    .spyOn(HTMLTextAreaElement.prototype, "scrollHeight", "get")
    .mockReturnValue(0);

  render(<MockComponent rows={3} />);

  expect(screen.getByRole("presentation")).toHaveStyle({
    "min-height": "var(--global-size-4-xl)",
  });

  scrollHeightSpy.mockRestore();
});

test("should have default min-height of 71px if size is small", () => {
  render(<MockComponent size="small" />);

  const textarea = screen.getByRole("textbox");

  expect(textarea).toHaveStyle({ "min-height": "71px" });
});

test("should have default min-height of 79px if size is medium", () => {
  render(<MockComponent size="medium" />);

  const textarea = screen.getByRole("textbox");

  expect(textarea).toHaveStyle({ "min-height": "79px" });
});

test("should have default min-height of 96px if size is large", () => {
  render(<MockComponent size="large" />);

  const textarea = screen.getByRole("textbox");

  expect(textarea).toHaveStyle({ "min-height": "96px" });
});

test("should apply the correct min-height if minHeight is specified", () => {
  render(<MockComponent minHeight={200} />);

  const textarea = screen.getByRole("textbox");

  expect(textarea).toHaveStyle({ "min-height": "200px" });
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
  "'enterKeyHint' is correctly passed to the input when prop value is '%s'",
  (keyHint) => {
    render(<MockComponent enterKeyHint={keyHint} />);

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "enterkeyhint",
      keyHint,
    );
  },
);

test.skip.each(["error", "warning", "info"])(
  "renders a validation icon in the textarea when %s prop is a string",
  (validationProp) => {
    render(<MockComponent {...{ [validationProp]: "Message" }} />);
    const inputPresentationContainer = screen.getByRole("presentation");
    const validationIcon = screen.getByTestId(`icon-${validationProp}`);
    expect(inputPresentationContainer).toContainElement(validationIcon);
  },
);

test.skip.each(["error", "warning", "info"])(
  "overrides the tooltip position on the validation icon when %s prop is a string the tooltipPosition prop is set",
  (validationProp) => {
    const useFloatingSpy = jest.spyOn(floatingUi, "useFloating");

    render(
      <MockComponent
        {...{
          label: "Label",
          [validationProp]: "Message",
          tooltipPosition: "bottom",
        }}
      />,
    );

    expect(useFloatingSpy).toHaveBeenCalledWith(
      expect.objectContaining({ placement: "bottom" }),
    );

    useFloatingSpy.mockRestore();
  },
);

test.skip.each(["error", "warning", "info"])(
  "renders a validation icon on the label when %s prop is a string and validationOnLabel passed as true",
  (validationProp) => {
    render(
      <MockComponent
        {...{
          label: "Label",
          [validationProp]: "Message",
          validationOnLabel: true,
        }}
      />,
    );
    const labelContainer = screen.getByTestId("label-container");
    const validationIcon = screen.getByTestId(`icon-${validationProp}`);
    expect(labelContainer).toContainElement(validationIcon);
  },
);

test.skip.each(["error", "warning", "info"])(
  "overrides the tooltip position on the validation icon when %s prop is a string, the tooltipPosition prop is set and validationOnLabel is true",
  (validationProp) => {
    const useFloatingSpy = jest.spyOn(floatingUi, "useFloating");

    render(
      <MockComponent
        {...{
          label: "Label",
          [validationProp]: "Message",
          tooltipPosition: "bottom",
          validationOnLabel: true,
        }}
      />,
    );

    expect(useFloatingSpy).toHaveBeenCalledWith(
      expect.objectContaining({ placement: "bottom" }),
    );

    useFloatingSpy.mockRestore();
  },
);

test.each(["error", "warning", "info"])(
  "when %s validation prop is true boolean, does not render any validation icon",
  (validationProp) => {
    render(<MockComponent {...{ [validationProp]: true }} />);
    expect(
      screen.queryByTestId(`icon-${validationProp}`),
    ).not.toBeInTheDocument();
  },
);

test.skip("should set the aria-label on the Help component to the value of the helpAriaLabel prop", () => {
  render(<MockComponent label="foo" labelHelp="bar" helpAriaLabel="baz" />);

  expect(screen.getByRole("button")).toHaveAttribute("aria-label", "baz");
});

test.skip("should set the Help component's text content to the value of the labelHelp prop", async () => {
  render(<MockComponent label="foo" labelHelp="bar" helpAriaLabel="baz" />);

  act(() => {
    screen.getByRole("button").focus();
  });

  expect(await screen.findByRole("tooltip", { name: "bar" })).toBeVisible();
});

test.each(["warning", "error"])(
  "with id prop provided, %s prop set as a string and the textarea element focused, the validation tooltip provides an accessible description for the textarea element",
  (validationType) => {
    render(
      <MockComponent id="foo" label="bar" {...{ [validationType]: "test" }} />,
    );
    const textarea = screen.getByRole("textbox");
    act(() => {
      textarea.focus();
    });

    expect(textarea).toHaveAccessibleDescription("test");
  },
);

test.each(["warning", "error"])(
  "with id prop not provided, %s prop set as a string and the textarea element focused, the validation tooltip provides an accessible description for the textarea element",
  (validationType) => {
    render(<MockComponent label="bar" {...{ [validationType]: "test" }} />);
    const textarea = screen.getByRole("textbox");
    act(() => {
      textarea.focus();
    });

    expect(textarea).toHaveAccessibleDescription("test");
  },
);

test("renders the hint when inputHint prop is provided", () => {
  render(<MockComponent inputHint="foo" />);
  expect(screen.getByText("foo")).toBeInTheDocument();
});

test("assigns the input hint as the accessible description of the textarea", () => {
  render(<MockComponent inputHint="bar" />);
  expect(screen.getByRole("textbox")).toHaveAccessibleDescription("bar");
});

test("inputHint should have priority over labelHelp when both are passed", () => {
  render(
    <MockComponent labelHelp="labelHelp" inputHint="inputHint" error="foo" />,
  );
  expect(screen.getByText("inputHint")).toBeInTheDocument();
  expect(screen.queryByText("labelHelp")).not.toBeInTheDocument();
});

test.skip("when id and fieldHelp are both present, the field help provides an accessible description for the textarea element", () => {
  render(<MockComponent id="foo" label="bar" fieldHelp="baz" />);

  expect(screen.getByRole("textbox")).toHaveAccessibleDescription("baz");
});

test.skip("fieldHelp is present and id is not present, the field help provides an accessible description for the textarea element", () => {
  render(<MockComponent label="bar" fieldHelp="baz" />);

  expect(screen.getByRole("textbox")).toHaveAccessibleDescription("baz");
});

test.each(["warning", "error"])(
  "with id prop provided, fieldHelp present, %s prop set as a string and the textarea element focused, the tooltip provides an accessible description for the textarea element",
  (validationType) => {
    render(
      <MockComponent
        id="foo"
        label="bar"
        fieldHelp="baz"
        {...{ [validationType]: "test" }}
      />,
    );
    const textarea = screen.getByRole("textbox");
    act(() => {
      textarea.focus();
    });

    expect(textarea).toHaveAccessibleDescription("test");
  },
);

test.each(["warning", "error"])(
  "with id prop not provided, fieldHelp present, %s prop set as a string and the textarea element focused, the tooltip provides an accessible description for the textarea element",
  async (validationType) => {
    render(
      <MockComponent
        label="bar"
        fieldHelp="baz"
        {...{ [validationType]: "test" }}
      />,
    );
    const textarea = screen.getByRole("textbox");
    act(() => {
      textarea.focus();
    });

    expect(textarea).toHaveAccessibleDescription("test");
  },
);

test("sets the accessible label to the provided aria-labelledby", () => {
  const Component = () => (
    <>
      <p id="test">label</p>
      <MockComponent aria-labelledby="test" />
    </>
  );
  render(<Component />);

  expect(screen.getByRole("textbox")).toHaveAccessibleName("label");
});

test("appends the provided `aria-describedby` to the accessible description", () => {
  const Component = () => (
    <>
      <p id="test">description</p>
      <MockComponent inputHint="hint text" aria-describedby="test" />
    </>
  );
  render(<Component />);

  expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
    "hint text description",
  );
});

describe(`when the characterLimit prop is passed`, () => {
  it("renders a character counter with the appropriate message when the value is too long by 1 character", () => {
    const valueString = "foo";
    render(<MockComponent value={valueString} characterLimit={2} />);

    expect(
      screen.getByText("1 character too many", {
        selector: '[aria-hidden="true"]',
      }),
    ).toBeInTheDocument();
  });

  it("renders a character counter with the appropriate message when the value is too long by more than 1 character", () => {
    const valueString = "foo";
    render(<MockComponent value={valueString} characterLimit={1} />);

    expect(
      screen.getByText("2 characters too many", {
        selector: '[aria-hidden="true"]',
      }),
    ).toBeInTheDocument();
  });

  it("renders a character counter with the appropriate message when the input length exactly matches the limit", () => {
    const valueString = "foo";
    render(<MockComponent value={valueString} characterLimit={3} />);

    expect(
      screen.getByText("0 characters left", {
        selector: '[aria-hidden="true"]',
      }),
    ).toBeInTheDocument();
  });

  it("renders a character counter with the appropriate message when there is 1 character remaining", () => {
    const valueString = "foo";
    render(<MockComponent value={valueString} characterLimit={4} />);

    expect(
      screen.getByText("1 character left", {
        selector: '[aria-hidden="true"]',
      }),
    ).toBeInTheDocument();
  });

  it("renders a character counter with the appropriate message when there is more than 1 character remaining", () => {
    const valueString = "foo";
    render(<MockComponent value={valueString} characterLimit={5} />);

    expect(
      screen.getByText("2 characters left", {
        selector: '[aria-hidden="true"]',
      }),
    ).toBeInTheDocument();
  });

  it("renders a visually hidden hint with id generated via guid", () => {
    render(<MockComponent value="foo" characterLimit={73} />);
    expect(
      screen.getByText("You can enter up to 73 characters", {
        selector: '[data-element="visually-hidden-hint"]',
      }),
    ).toHaveAttribute("id", mockedGuid);
  });

  it("assigns the visually hidden hint as the textarea's accessible description", () => {
    render(<MockComponent value="foo" characterLimit={73} />);
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription("foo");
  });
});

describe('when the "expandable" prop is set to "true"', () => {
  it("sets the height of the textarea to the same as its scrollHeight on window resize", () => {
    render(<MockComponent expandable />);
    const expectedScrollHeight = 500;

    const textarea = screen.getByRole("textbox");

    jest
      .spyOn(textarea, "scrollHeight", "get")
      .mockImplementation(() => expectedScrollHeight);

    fireEvent.resize(window);

    expect(textarea).toHaveStyle({ height: `${expectedScrollHeight}px` });
  });

  it("sets the height of the textarea to the same as its scrollHeight on component update", async () => {
    const ControlledExpandableTextArea = () => {
      const [value, setValue] = useState("");
      return (
        <Textarea
          expandable
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    };
    render(<ControlledExpandableTextArea />);
    const expectedScrollHeight = 500;
    const user = userEvent.setup();

    const textarea = screen.getByRole("textbox");
    jest
      .spyOn(textarea, "scrollHeight", "get")
      .mockImplementation(() => expectedScrollHeight);

    await user.clear(textarea);
    await user.type(textarea, "abc");

    expect(textarea).toHaveStyle({ height: `${expectedScrollHeight}px` });
  });
});

test('when the "expandable" prop is false, the height of the textarea remains unchanged when the window is resized', () => {
  render(<MockComponent />);

  const expectedScrollHeight = 500;
  const originalHeight = "50px";
  const textarea = screen.getByRole("textbox");

  textarea.style.height = originalHeight;
  jest
    .spyOn(textarea, "scrollHeight", "get")
    .mockImplementation(() => expectedScrollHeight);

  fireEvent.resize(window);

  expect(textarea.style.height).toEqual(originalHeight);
});

test('when the "expandable" prop is true, and maxRows is set, the height of the textarea will not go over the height of the maxRows', async () => {
  const paddingTop = 8;
  const paddingBottom = 8;
  const rowHeight = 21;
  const maxRows = 5;
  const maxHeight = rowHeight * maxRows + paddingTop + paddingBottom;

  let mockScrollHeight = rowHeight + paddingTop + paddingBottom;
  jest
    .spyOn(HTMLTextAreaElement.prototype, "scrollHeight", "get")
    .mockImplementation(() => mockScrollHeight);

  render(<MockComponent expandable maxRows={maxRows} size="medium" />);

  const user = userEvent.setup();
  const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

  await user.click(textarea);

  const lines = ["1", "2", "3", "4", "5", "6", "7"];
  for (const line of lines) {
    await user.keyboard(line);
    await user.keyboard("{Enter}");
    mockScrollHeight += rowHeight;
  }

  const height = parseFloat(window.getComputedStyle(textarea).height);

  expect(height).toBe(maxHeight);
});

test("renders a label that is linked to the TextArea, if the label prop is promoted", () => {
  render(<MockComponent label="This is a Text Area" />);

  expect(screen.getByLabelText("This is a Text Area")).toBe(
    screen.getByRole("textbox"),
  );
});

test("when labelInline prop is set, the input label should accommodate for input internal padding", () => {
  render(<MockComponent label="foo" labelInline />);

  expect(screen.getByTestId("label-container")).toHaveStyle({
    paddingTop: "var(--global-space-comp-s)",
    alignItems: "flex-start",
  });
});

test("when labelInline prop is set, and size is large, correct paddingRight is applied", () => {
  render(<MockComponent label="foo" labelInline size="large" />);

  expect(screen.getByTestId("label-container")).toHaveStyle({
    paddingRight: "var(--global-space-comp-xl)",
  });
});

test("when labelInline prop is set and resize prop is set, the input width should adjust accordingly", () => {
  render(<MockComponent label="foo" labelInline resize="both" size="small" />);

  expect(screen.getByRole("textbox")).toHaveStyle({
    width: "70vw",
  });
});

test("when inputWidth prop is set, it determines the input width", () => {
  render(<MockComponent inputWidth={30} />);
  expect(screen.getByTestId("input-presentation-container")).toHaveStyle({
    flex: "0 0 30%",
  });
});

test("when inputWidth is not set but labelWidth is, input width defaults to 100 minus label width", () => {
  render(<MockComponent labelWidth={45} />);
  expect(screen.getByTestId("input-presentation-container")).toHaveStyle({
    flex: "0 0 55%",
  });
});

test("when an expandable textarea unmounts, the event listener is removed from the window", () => {
  const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

  const { unmount } = render(
    <Textarea
      value="foo"
      name="textarea"
      onChange={jest.fn()}
      label="Label"
      expandable
      rows={10}
      characterLimit={100}
    />,
  );

  unmount();

  expect(removeEventListenerSpy).toHaveBeenCalledWith(
    "resize",
    expect.any(Function),
  );

  removeEventListenerSpy.mockRestore();
});

// TODO: test should be removed once FE-5551 (shared coverage) is implemented. This test is needed for coverage,
// but it doesn't add value as it still passes even when the bug is reintroduced, as the bug only happens in a
// real browser environment, not in JSDOM.
describe("when a parent container scrolls vertically", () => {
  it("restores the scroll position after expanding", () => {
    render(
      <div
        data-role="scroll-wrapper"
        style={{ height: "200px", overflowY: "scroll" }}
      >
        <div id="inner-wrapper" style={{ height: "1000px" }}>
          <Textarea
            value="foo"
            name="textarea"
            onChange={jest.fn()}
            label="Label"
            expandable
            rows={10}
          />
        </div>
      </div>,
    );

    const scrollWrapper = screen.getByTestId("scroll-wrapper");
    const textarea = screen.getByRole("textbox");

    scrollWrapper.scrollTop = 700;
    jest.spyOn(textarea, "scrollHeight", "get").mockImplementation(() => 500);

    fireEvent.resize(window);

    expect(scrollWrapper.scrollTop).toBe(700);
  });
});

test("when textarea cannot be expanded, it does not remove any event listener from the window", () => {
  const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

  const { unmount } = render(
    <Textarea
      id="Dummy Area"
      name="textarea"
      value="foo"
      onChange={jest.fn()}
      label="Label"
      rows={10}
    />,
  );

  unmount();

  expect(removeEventListenerSpy).not.toHaveBeenCalledWith(
    "resize",
    expect.any(Function),
  );

  removeEventListenerSpy.mockRestore();
});

test("the required prop is passed to the input", () => {
  render(<MockComponent required label="required" />);
  expect(screen.getByRole("textbox")).toBeRequired();
});

describe("when rendered with new validations", () => {
  it.each(["error", "warning"])(
    "the validation text is assigned as the accessible description for textarea element",
    (validationType) => {
      render(
        <MockComponent
          inputHint="Hint"
          {...{ [validationType]: "Validation" }}
        />,
      );

      expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
        "Validation Hint",
      );
    },
  );

  it.each(["error", "warning"])(
    "the validation text is assigned as the accessible description for textarea element when validationMessagePositionTop is false",
    (validationType) => {
      render(
        <MockComponent
          inputHint="Hint"
          {...{ [validationType]: "Validation" }}
          validationMessagePositionTop={false}
        />,
      );

      expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
        "Hint Validation",
      );
    },
  );

  it("renders the hint text with the correct styling when the labelHelp prop is passed", () => {
    render(<MockComponent labelHelp="Example hint text" />);
    const hintText = screen.getByText("Example hint text");
    expect(hintText).toBeInTheDocument();
    expect(hintText).toHaveStyleRule(
      "font",
      "var(--global-font-static-comp-regular-m)",
    );
    expect(hintText).toHaveStyleRule(
      "color",
      "var(--input-labelset-label-alt)",
    );
  });
});

test("accepts ref as a ref object", () => {
  const ref = { current: null };
  render(<Textarea ref={ref} value="" onChange={jest.fn} />);

  expect(ref.current).toBe(screen.getByRole("textbox"));
});

test("accepts ref as a ref callback", () => {
  const ref = jest.fn();
  render(<Textarea ref={ref} value="" onChange={jest.fn} />);

  expect(ref).toHaveBeenCalledWith(screen.getByRole("textbox"));
});

test("sets ref to empty after unmount", () => {
  const ref = { current: null };
  const { unmount } = render(
    <Textarea ref={ref} value="" onChange={jest.fn} />,
  );

  unmount();

  expect(ref.current).toBe(null);
});

test("renders with the expected default border radius styling", () => {
  render(<MockComponent />);
  expect(screen.getByRole("textbox")).toHaveStyleRule(
    "border-radius",
    "var(--borderRadius050)",
  );
});

test("renders with the expected custom border radius styling", () => {
  render(<MockComponent borderRadius="borderRadius200" />);
  expect(screen.getByRole("textbox")).toHaveStyleRule(
    "border-radius",
    "var(--borderRadius200)",
  );
});

test("renders with the expected custom border radius styling as an array", () => {
  render(
    <MockComponent
      borderRadius={[
        "borderRadius050",
        "borderRadius100",
        "borderRadius200",
        "borderRadius400",
      ]}
    />,
  );
  expect(screen.getByRole("textbox")).toHaveStyleRule(
    "border-radius",
    "var(--borderRadius050) var(--borderRadius100) var(--borderRadius200) var(--borderRadius400)",
  );
});

test("fires a console warning if more than four border-radius values are passed", () => {
  assertLoggerComponentMessage({
    component: (
      <MockComponent
        borderRadius={[
          "borderRadius050",
          "borderRadius100",
          "borderRadius200",
          "borderRadius400",
          "borderRadius050",
        ]}
      />
    ),
    message:
      "The `borderRadius` prop in `Textarea` component only supports up to 4 values.",
    method: "warn",
  });
});

test("should render component without borders when hideBorders prop is true", () => {
  render(<MockComponent hideBorders />);
  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "border",
    "1px solid transparent",
  );
});

test("should render component without borders when hideBorders prop is true and disabled is set", () => {
  render(<MockComponent hideBorders disabled />);
  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "border",
    "1px solid transparent",
  );
});

test("should render component without borders when hideBorders prop is true and readonly is set", () => {
  render(<MockComponent hideBorders readOnly />);
  expect(screen.getByRole("presentation")).toHaveStyleRule(
    "border",
    "1px solid transparent",
  );
});

test("should render component with the `width` equal to `100%` when `resize` is set", () => {
  render(
    <MockComponent
      resize="both"
      maxWidth="480"
      size="large"
      inputHint="hint"
      characterLimit={200}
    />,
  );
  expect(screen.getByRole("presentation")).toHaveStyleRule("width", "100%");
});

test("should render component with the `width` equal to `70vw` when `resize` and `labelInline` are set", () => {
  render(<MockComponent labelInline resize="both" data-role="test-textarea" />);

  expect(screen.getByTestId("test-textarea")).toHaveStyleRule("width", "70vw", {
    modifier: `${StyledInput}`,
  });
});

test("hint text should be aligned with the label when `labelAlign` is set", () => {
  render(
    <MockComponent
      data-role="test-textarea"
      label="Textarea large"
      inputHint="this is a hint"
      labelAlign="right"
    />,
  );

  expect(screen.getByTestId("test-textarea")).toHaveStyleRule(
    "justify-content",
    "flex-end",
    {
      modifier: `${StyledHintText}`,
    },
  );
});

describe("parseValueUnit", () => {
  const validCases: Array<[string, number]> = [
    ["12px", 12],
    ["1.5rem", 1.5],
    ["2em", 2],
    ["50%", 50],
    ["-4px", -4],
  ];

  it.each(validCases)("parses %s to %d", (input, expected) => {
    expect(parseValueUnit(input)).toBe(expected);
  });

  it("returns 0 and logs a warning on invalid input", () => {
    expect(parseValueUnit("12pixels")).toBe(0);
    expect(Logger.warn).toHaveBeenCalledWith(
      'Unexpected value/unit format: "12pixels"',
    );
  });
});
