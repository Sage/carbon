import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as floatingUi from "@floating-ui/react-dom";

import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import Textarea from ".";
import { EnterKeyHintTypes } from "../../__internal__/input";
import guid from "../../__internal__/utils/helpers/guid";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Logger from "../../__internal__/utils/logger";
import StyledInput from "../../__internal__/input/input.style";

jest.mock("../../__internal__/utils/logger");

jest.mock("../../__internal__/utils/helpers/guid");
const mockedGuid = "guid-12345";
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockedGuid);

test("should display deprecation warning once when rendered as uncontrolled", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");

  render(<Textarea name="my-textarea" defaultValue="test" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "Uncontrolled behaviour in `Textarea` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
  );

  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockRestore();
});

test("should render a textarea element", () => {
  render(<Textarea />);
  const textarea = screen.getByRole("textbox");
  expect(textarea).toBeInTheDocument();
  expect(textarea.tagName).toEqual("TEXTAREA");
});

test("should not render character counter if no characterLimit prop is given", () => {
  render(<Textarea />);
  expect(screen.queryByText(/you can enter up to/i)).not.toBeInTheDocument();
});

test("should render character counter if characterLimit prop is given", () => {
  render(<Textarea characterLimit={5} />);
  expect(screen.getByText(/you can enter up to/i)).toBeInTheDocument();
});

test("should not render a placeholder if disabled", () => {
  render(<Textarea placeholder="foo" disabled />);
  expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "");
});

testStyledSystemMargin(
  (props) => <Textarea data-role="textarea-wrapper" {...props} />,
  () => screen.getByTestId("textarea-wrapper"),
);

test("should display the correct value when the value prop is set", () => {
  render(<Textarea value="Initial content" />);

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
    render(<Textarea value="test string" data-role="icon-test" {...props} />);
    expect(screen.getByTestId("icon-test")).toHaveStyleRule(
      "padding-right",
      "var(--spacing500)",
      { modifier: `& ${StyledInput}` },
    );
  },
);

test("should have default min-height of 64px if no minHeight is specified", () => {
  render(<Textarea value="Initial content" />);

  const textarea = screen.getByRole("textbox");

  expect(textarea).toHaveStyle({ "min-height": "64px" });
});

test("should apply the correct min-height if minHeight is specified", () => {
  render(<Textarea minHeight={200} value="Initial content" />);

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
    render(<Textarea enterKeyHint={keyHint} />);

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "enterkeyhint",
      keyHint,
    );
  },
);

test.each(["error", "warning", "info"])(
  "renders a validation icon in the textarea when %s prop is a string",
  (validationProp) => {
    render(<Textarea {...{ [validationProp]: "Message" }} />);
    const inputPresentationContainer = screen.getByRole("presentation");
    const validationIcon = screen.getByTestId(`icon-${validationProp}`);
    expect(inputPresentationContainer).toContainElement(validationIcon);
  },
);

test.each(["error", "warning", "info"])(
  "overrides the tooltip position on the validation icon when %s prop is a string the tooltipPosition prop is set",
  (validationProp) => {
    const useFloatingSpy = jest.spyOn(floatingUi, "useFloating");

    render(
      <Textarea
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

test.each(["error", "warning", "info"])(
  "renders a validation icon on the label when %s prop is a string and validationOnLabel passed as true",
  (validationProp) => {
    render(
      <Textarea
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

test.each(["error", "warning", "info"])(
  "overrides the tooltip position on the validation icon when %s prop is a string, the tooltipPosition prop is set and validationOnLabel is true",
  (validationProp) => {
    const useFloatingSpy = jest.spyOn(floatingUi, "useFloating");

    render(
      <Textarea
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
    render(<Textarea {...{ [validationProp]: true }} />);
    expect(
      screen.queryByTestId(`icon-${validationProp}`),
    ).not.toBeInTheDocument();
  },
);

test("should set the aria-label on the Help component to the value of the helpAriaLabel prop", () => {
  render(<Textarea label="foo" labelHelp="bar" helpAriaLabel="baz" />);

  expect(screen.getByRole("button")).toHaveAttribute("aria-label", "baz");
});

test("should set the Help component's text content to the value of the labelHelp prop", async () => {
  render(<Textarea label="foo" labelHelp="bar" helpAriaLabel="baz" />);

  screen.getByRole("button").focus();
  expect(await screen.findByRole("tooltip", { name: "bar" })).toBeVisible();
});

test.each(["info", "warning", "error"])(
  "with id prop provided, %s prop set as a string and the textarea element focused, the validation tooltip provides an accessible description for the textarea element",
  (validationType) => {
    render(<Textarea id="foo" label="bar" {...{ [validationType]: "test" }} />);
    const textarea = screen.getByRole("textbox");
    textarea.focus();

    expect(textarea).toHaveAccessibleDescription("test");
  },
);

test.each(["info", "warning", "error"])(
  "with id prop not provided, %s prop set as a string and the textarea element focused, the validation tooltip provides an accessible description for the textarea element",
  (validationType) => {
    render(<Textarea label="bar" {...{ [validationType]: "test" }} />);
    const textarea = screen.getByRole("textbox");
    textarea.focus();

    expect(textarea).toHaveAccessibleDescription("test");
  },
);

test("renders the hint when inputHint prop is provided", () => {
  render(<Textarea inputHint="foo" />);
  expect(screen.getByText("foo")).toBeInTheDocument();
});

test("assigns the input hint as the accessible description of the textarea", () => {
  render(<Textarea inputHint="bar" />);
  expect(screen.getByRole("textbox")).toHaveAccessibleDescription("bar");
});

test("inputHint should have priority over labelHelp when both are passed", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Textarea labelHelp="labelHelp" inputHint="inputHint" error="foo" />
    </CarbonProvider>,
  );
  expect(screen.getByText("inputHint")).toBeInTheDocument();
  expect(screen.queryByText("labelHelp")).not.toBeInTheDocument();
});

test("when id and fieldHelp are both present, the field help provides an accessible description for the textarea element", () => {
  render(<Textarea id="foo" label="bar" fieldHelp="baz" />);

  expect(screen.getByRole("textbox")).toHaveAccessibleDescription("baz");
});

test("fieldHelp is present and id is not present, the field help provides an accessible description for the textarea element", () => {
  render(<Textarea label="bar" fieldHelp="baz" />);

  expect(screen.getByRole("textbox")).toHaveAccessibleDescription("baz");
});

test.each(["info", "warning", "error"])(
  "with id prop provided, fieldHelp present, %s prop set as a string and the textarea element focused, the fieldHelp and the validation tooltip are combined to provide an accessible description for the textarea element",
  (validationType) => {
    render(
      <Textarea
        id="foo"
        label="bar"
        fieldHelp="baz"
        {...{ [validationType]: "test" }}
      />,
    );
    const textarea = screen.getByRole("textbox");
    textarea.focus();

    expect(textarea).toHaveAccessibleDescription("baz test");
  },
);

test.each(["info", "warning", "error"])(
  "with id prop not provided, fieldHelp present, %s prop set as a string and the textarea element focused, the fieldHelp and the validation tooltip are combined to provide an accessible description for the textarea element",
  (validationType) => {
    render(
      <Textarea
        label="bar"
        fieldHelp="baz"
        {...{ [validationType]: "test" }}
      />,
    );
    const textarea = screen.getByRole("textbox");
    textarea.focus();

    expect(textarea).toHaveAccessibleDescription("baz test");
  },
);

describe(`when the characterLimit prop is passed`, () => {
  it("renders a character counter with the appropriate message when the value is too long by 1 character", () => {
    const valueString = "foo";
    render(<Textarea value={valueString} characterLimit={2} />);

    expect(
      screen.getByText("1 character too many", {
        selector: '[aria-hidden="true"]',
      }),
    ).toBeInTheDocument();
  });

  it("renders a character counter with the appropriate message when the value is too long by more than 1 character", () => {
    const valueString = "foo";
    render(<Textarea value={valueString} characterLimit={1} />);

    expect(
      screen.getByText("2 characters too many", {
        selector: '[aria-hidden="true"]',
      }),
    ).toBeInTheDocument();
  });

  it("renders a character counter with the appropriate message when the input length exactly matches the limit", () => {
    const valueString = "foo";
    render(<Textarea value={valueString} characterLimit={3} />);

    expect(
      screen.getByText("0 characters left", {
        selector: '[aria-hidden="true"]',
      }),
    ).toBeInTheDocument();
  });

  it("renders a character counter with the appropriate message when there is 1 character remaining", () => {
    const valueString = "foo";
    render(<Textarea value={valueString} characterLimit={4} />);

    expect(
      screen.getByText("1 character left", {
        selector: '[aria-hidden="true"]',
      }),
    ).toBeInTheDocument();
  });

  it("renders a character counter with the appropriate message when there is more than 1 character remaining", () => {
    const valueString = "foo";
    render(<Textarea value={valueString} characterLimit={5} />);

    expect(
      screen.getByText("2 characters left", {
        selector: '[aria-hidden="true"]',
      }),
    ).toBeInTheDocument();
  });

  it("renders a visually hidden hint with id generated via guid", () => {
    render(<Textarea value="foo" characterLimit={73} />);
    expect(
      screen.getByText("You can enter up to 73 characters", {
        selector: '[data-element="visually-hidden-hint"]',
      }),
    ).toHaveAttribute("id", mockedGuid);
  });

  it("assigns the visually hidden hint as the textarea's accessible description", () => {
    render(<Textarea value="foo" characterLimit={73} />);
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription("foo");
  });
});

describe('when the "expandable" prop is set to "true"', () => {
  it("sets the height of the textarea to the same as its scrollHeight on window resize", () => {
    render(<Textarea expandable />);
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
  render(<Textarea />);

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

test("renders a label that is linked to the TextArea, if the label prop is promoted", () => {
  render(<Textarea label="This is a Text Area" />);

  expect(screen.getByLabelText("This is a Text Area")).toBe(
    screen.getByRole("textbox"),
  );
});

test("when labelInline prop is set, the input label should accommodate for input internal padding", () => {
  render(<Textarea label="foo" labelInline />);

  expect(screen.getByTestId("label-container")).toHaveStyle({
    paddingTop: "6px",
    alignItems: "flex-start",
  });
});

test("when inputWidth prop is set, it determines the input width", () => {
  render(<Textarea inputWidth={30} />);
  expect(screen.getByTestId("input-presentation-container")).toHaveStyle({
    flex: "0 0 30%",
  });
});

test("when inputWidth is not set but labelWidth is, input width defaults to 100 minus label width", () => {
  render(<Textarea labelWidth={45} />);
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
  render(<Textarea required label="required" />);
  expect(screen.getByRole("textbox")).toBeRequired();
});

describe("when rendered with new validations", () => {
  it.each(["error", "warning"])(
    "the validation text is assigned as the accessible description for textarea element",
    (validationType) => {
      render(
        <CarbonProvider validationRedesignOptIn>
          <Textarea {...{ [validationType]: "bar" }} />
        </CarbonProvider>,
      );

      expect(screen.getByRole("textbox")).toHaveAccessibleDescription("bar");
    },
  );

  it("ignores the labelInline and related styling props", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <Textarea
          labelInline
          label="example label"
          labelAlign="left"
          labelWidth={100}
          labelSpacing={1}
        />
      </CarbonProvider>,
    );

    const labelContainer = screen.getByTestId("label-container");
    expect(labelContainer).toHaveStyle({ width: undefined });
    expect(labelContainer).toHaveStyle({ justifyContent: undefined });
    expect(labelContainer).toHaveStyle({ paddingLeft: undefined });
    expect(labelContainer).toHaveStyle({ paddingRight: undefined });
    expect(labelContainer).not.toHaveStyle({ paddingTop: "6px" });
    expect(labelContainer).not.toHaveStyle({ alignItems: "flex-start" });
  });

  it("renders the hint text with the correct styling when the labelHelp prop is passed", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <Textarea labelHelp="Example hint text" />
      </CarbonProvider>,
    );
    const hintText = screen.getByText("Example hint text");
    expect(hintText).toBeInTheDocument();
    expect(hintText).toHaveStyle({
      fontSize: "14px",
      marginTop: "0px",
      marginBottom: "8px",
    });
    expect(hintText).toHaveStyleRule("color", "var(--colorsUtilityYin055)");
  });
});

test("accepts ref as a ref object", () => {
  const ref = { current: null };
  render(<Textarea ref={ref} />);

  expect(ref.current).toBe(screen.getByRole("textbox"));
});

test("accepts ref as a ref callback", () => {
  const ref = jest.fn();
  render(<Textarea ref={ref} />);

  expect(ref).toHaveBeenCalledWith(screen.getByRole("textbox"));
});

test("sets ref to empty after unmount", () => {
  const ref = { current: null };
  const { unmount } = render(<Textarea ref={ref} />);

  unmount();

  expect(ref.current).toBe(null);
});

test("renders with the expected default border radius styling", () => {
  render(<Textarea />);
  expect(screen.getByRole("textbox")).toHaveStyleRule(
    "border-radius",
    "var(--borderRadius050)",
  );
});

test("renders with the expected custom border radius styling", () => {
  render(<Textarea borderRadius="borderRadius200" />);
  expect(screen.getByRole("textbox")).toHaveStyleRule(
    "border-radius",
    "var(--borderRadius200)",
  );
});

test("renders with the expected custom border radius styling as an array", () => {
  render(
    <Textarea
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
  const consoleSpy = jest.spyOn(console, "warn");
  consoleSpy.mockImplementation(() => {});

  render(
    <Textarea
      borderRadius={[
        "borderRadius050",
        "borderRadius100",
        "borderRadius200",
        "borderRadius400",
        "borderRadius050",
      ]}
    />,
  );

  expect(consoleSpy).toHaveBeenCalledWith(
    "The `borderRadius` prop in `Textarea` component only supports up to 4 values.",
  );

  consoleSpy.mockRestore();
});

test("should render component without borders when hideBorders prop is true", () => {
  render(<Textarea hideBorders />);
  expect(screen.getByRole("presentation")).toHaveStyle({
    border: "1px solid transparent",
  });
});

test("should render component without borders when hideBorders prop is true and disabled is set", () => {
  render(<Textarea hideBorders disabled />);
  expect(screen.getByRole("presentation")).toHaveStyle({
    border: "1px solid transparent",
  });
});

test("should render component without borders when hideBorders prop is true and readonly is set", () => {
  render(<Textarea hideBorders readOnly />);
  expect(screen.getByRole("presentation")).toHaveStyle({
    border: "1px solid transparent",
  });
});
