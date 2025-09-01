import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Switch from "./switch.component";
import Logger from "../../__internal__/utils/logger";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import I18nProvider from "../../components/i18n-provider";
import CarbonProvider from "../../components/carbon-provider";

jest.mock("../../__internal__/utils/helpers/guid");

test("should display deprecation warning once", () => {
  const loggerSpy = jest
    .spyOn(Logger, "deprecate")
    .mockImplementation(() => {});

  render(<Switch name="my-switch" defaultValue="test" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "Uncontrolled behaviour in `Switch` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockRestore();
});

testStyledSystemMargin(
  (props) => <Switch data-role="switch-wrapper" {...props} />,
  () => screen.getByTestId("switch-wrapper"),
);

test("accepts ref as a ref object", () => {
  const ref = { current: null };
  render(<Switch ref={ref} />);

  expect(ref.current).toBe(screen.getByRole("switch"));
});

test("accepts ref as a ref callback", () => {
  const ref = jest.fn();
  render(<Switch ref={ref} />);

  expect(ref).toHaveBeenCalledWith(screen.getByRole("switch"));
});

test("sets ref to empty after unmounting", () => {
  const ref = { current: null };
  const { unmount } = render(<Switch ref={ref} />);

  unmount();

  expect(ref.current).toBe(null);
});

test("when component is uncontrolled, it sets proper default internal state", () => {
  render(<Switch name="my-switch" defaultValue="test" defaultChecked />);

  expect(screen.getByRole("switch")).toBeChecked();
});

test("when component is uncontrolled, it changes internal state and passes event to the provided onChange prop when change is triggered", async () => {
  const user = userEvent.setup({ delay: null });
  const onChangeMock = jest.fn();

  render(<Switch onChange={onChangeMock} />);

  const switchElement = screen.getByRole("switch");
  await user.click(switchElement);

  expect(onChangeMock).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({
        checked: true,
      }),
    }),
  );
  expect(switchElement).toBeChecked();
});

test("when component is controlled, it passes checked value to the Switch", () => {
  render(<Switch checked onChange={() => {}} />);

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toBeChecked();
});

test("when component is controlled, it reacts properly to checked prop change", () => {
  const { rerender } = render(<Switch checked onChange={() => {}} />);

  const switchElement = screen.getByRole("switch");
  expect(switchElement).toBeChecked();

  rerender(<Switch checked={false} onChange={() => {}} />);
  expect(switchElement).not.toBeChecked();
});

test("has default a translation for on", () => {
  render(<Switch checked onChange={() => {}} />);

  const sliderPanelText = screen.getByText("ON");

  expect(sliderPanelText).toBeVisible();
});

test("has default a translation for off", () => {
  render(<Switch checked={false} onChange={() => {}} />);

  const sliderPanelText = screen.getAllByText("OFF");

  expect(sliderPanelText[1]).toBeVisible();
});

// required for styling coverage
test("when `reverse` is false, the correct Label component styles are applied", () => {
  render(<Switch reverse={false} label="label" />);

  const labelContainer = screen.getByTestId("label-container");

  expect(labelContainer).toHaveStyle("margin-bottom: 8px");
});

test("when `reverse` is true, the correct Label component styles are applied", () => {
  render(<Switch reverse={false} label="label" />);

  const labelContainer = screen.getByTestId("label-container");

  expect(labelContainer).toHaveStyle("margin-top: 8px");
});

test("when `reverse` is false and `fieldHelpInline` is true, the correct FieldHelp component styles are applied", () => {
  render(
    <Switch
      reverse={false}
      fieldHelp="This text provides help"
      fieldHelpInline
      label="label"
    />,
  );

  const fieldHelp = screen.getByText("This text provides help");

  expect(fieldHelp).toHaveStyle("margin-top: 8px");
});

test("when `labelInline` is true, fieldHelpInline is false and `reverse` is false, the correct FieldHelp component styles are applied", () => {
  render(
    <Switch
      label="label"
      fieldHelp="This text provides help"
      fieldHelpInline={false}
      labelInline
      reverse={false}
    />,
  );
  const fieldHelp = screen.getByText("This text provides help");

  expect(fieldHelp).toHaveStyle("margin-left: 60px");
});

test("when `fieldHelpInline` is true, the correct FieldHelp component styles are applied", () => {
  render(
    <Switch
      fieldHelpInline
      fieldHelp="This text provides help"
      label="label"
    />,
  );

  const fieldHelp = screen.getByText("This text provides help");

  expect(fieldHelp).toHaveStyle("margin: 0px");
});

test("when `labelInline` is true, the correct Label component styles are applied", () => {
  render(<Switch label="label" labelInline />);

  const labelContainer = screen.getByTestId("label-container");

  expect(labelContainer).toHaveStyle("margin-bottom: 0px");
});

test("when `fieldHelpInline` is true and `labelInline` is true, the correct CheckableInput component styles are applied", () => {
  render(
    <Switch
      label="label"
      fieldHelp="This text provides help"
      fieldHelpInline
      labelInline
    />,
  );

  const checkableInput = screen.getByTestId("checkable-input");

  expect(checkableInput).toHaveStyle("margin-left: 10px");
});

test("when `fieldHelpInline` true and `labelInline` true, the correct Label component styles are applied", () => {
  render(
    <Switch
      label="label"
      fieldHelp="This text provides help"
      fieldHelpInline
      labelInline
    />,
  );

  const labelContainer = screen.getByTestId("label-container");

  expect(labelContainer).toHaveStyle("margin-right: 10px");
});

test("when `fieldHelpInline` true and `labelInline` true, the correct FieldHelp component styles are applied", () => {
  render(
    <Switch
      label="label"
      fieldHelp="This text provides help"
      fieldHelpInline
      labelInline
    />,
  );

  const fieldHelp = screen.getByText("This text provides help");

  expect(fieldHelp).toHaveStyle("margin-left: 0px");
});

test("when `size` is large, the correct CheckableInput component styles are applied", () => {
  render(<Switch size="large" />);

  expect(screen.getByRole("switch")).toHaveStyle("height: 44px");
});

test("when `size` is large, the correct SwitchSlider component styles are applied", () => {
  render(<Switch size="large" />);

  const switchSlider = screen.getByTestId("slider");

  expect(switchSlider).toHaveStyle("height: 44px");
});

test("when `size` is large and `labelInline` is true, the correct Label component styles are applied", () => {
  render(<Switch size="large" labelInline label="label" />);

  const labelContainer = screen.getByTestId("label-container");

  expect(labelContainer).toHaveStyle({
    paddingBottom: "10px",
    paddingTop: "10px",
    marginTop: "1px",
  });
});

test("when `size` is large and `reverse` is false, the correct FieldHelp component styles are applied", () => {
  render(
    <Switch
      size="large"
      labelInline
      label="label"
      reverse={false}
      fieldHelp="this is field help"
    />,
  );

  const fieldHelp = screen.getByText("this is field help");

  expect(fieldHelp).toHaveStyle("margin-left: 78px");
});

test("the `error` prop should not throw an error if `loading` is true", () => {
  expect(() => {
    render(<Switch id="mock-input" loading error />);
  }).not.toThrow();
});

test("the `warning` prop should not throw an error if `loading` is true", () => {
  expect(() => {
    render(<Switch id="mock-input" loading warning />);
  }).not.toThrow();
});

test("the `info` prop should not throw an error if `loading` is true", () => {
  expect(() => {
    render(<Switch id="mock-input" loading info />);
  }).not.toThrow();
});

test.each(["error", "warning"])(
  "should render the validation message under the input when %s passed as string and validationMessagePositionTop is false",
  (validationType) => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <Switch
          label="label"
          validationMessagePositionTop={false}
          {...{ [validationType]: "This is a validation message" }}
        />
      </CarbonProvider>,
    );

    const validationMessage = screen.getByTestId("validation-message-bottom");

    expect(validationMessage).toBeVisible();
  },
);

test("`helpAriaLabel` prop should set the aria-label on the Help component", () => {
  render(<Switch label="foo" labelHelp="fooHelp" helpAriaLabel="text" />);

  const help = screen.getByRole("button");

  expect(help).toHaveAttribute("aria-label", "text");
});

// Required for coverage
test("the correct border colour is applied when `error` validation is true", () => {
  render(<Switch error />);

  const switchSlider = screen.getByTestId("slider");

  expect(switchSlider).toHaveStyleRule(
    "border-color: var(--colorsSemanticNegative500)",
  );
});

// Required for coverage
test("the correct border colour is applied when `warning` validation is true", () => {
  render(<Switch warning />);

  const switchSlider = screen.getByTestId("slider");

  expect(switchSlider).toHaveStyleRule(
    "border-color: var(--colorsSemanticCaution500)",
  );
});

// Required for coverage
test("the correct background colour is applied to the `ErrorBorder` element when `error` validation is a string", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch error="this is an error" />
    </CarbonProvider>,
  );

  const switchSlider = screen.getByTestId("error-border");

  expect(switchSlider).toHaveStyleRule(
    "background-color: var(--colorsSemanticNegative500)",
  );
});

// Required for coverage
test("the correct background colour is applied to the `ErrorBorder` element when `warning` validation is a string", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch warning="this is a warning" />
    </CarbonProvider>,
  );

  const switchSlider = screen.getByTestId("error-border");

  expect(switchSlider).toHaveStyleRule(
    "background-color: var(--colorsSemanticCaution500)",
  );
});

// Required for coverage
test("renders `labelHelp` as hint text when `validationRedesignOptIn` flag is true", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch label="foo" labelHelp="hint text" warning="this is a warning" />
    </CarbonProvider>,
  );

  expect(screen.getByText("hint text")).toBeVisible();
});

test("should render with correct accessible name and description when `validationRedesignOptIn` flag is true", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch label="foo" labelHelp="hint text" error="this is an error" />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveAccessibleName("foo");
  expect(switchElement).toHaveAccessibleDescription(
    "hint text this is an error",
  );
});

test("the expected translations are correctly applied for on", () => {
  render(
    <I18nProvider
      locale={{
        locale: () => "fr-FR",
        switch: {
          on: () => "sur",
          off: () => "de",
        },
      }}
    >
      <Switch checked onChange={() => {}} />
    </I18nProvider>,
  );

  const i18nText = screen.getAllByText("sur");

  expect(i18nText[0]).toBeVisible();
});

test("the expected translations are correctly applied for off", () => {
  render(
    <I18nProvider
      locale={{
        locale: () => "fr-FR",
        switch: {
          on: () => "sur",
          off: () => "de",
        },
      }}
    >
      <Switch onChange={() => {}} />
    </I18nProvider>,
  );

  const i18nText = screen.getAllByText("de");

  expect(i18nText[0]).toBeVisible();
});

// coverage
test("renders with normal styles when `isDarkBackground` is false", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch isDarkBackground={false} />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule(
    "color: var(--colorsActionMinorYang100)",
  );
});

// coverage
test("renders with dark background styles when `isDarkBackground` is true", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch isDarkBackground />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("color: var(--colorsUtilityYin100)");
});

// coverage
test("renders correctly with inputWidth set to numerical value of between 0 and 1", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch inputWidth={0.5} />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with labelInline and new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch labelInline />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with reverse flag set under erroneous state and new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch reverse error="error" />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with no reverse flag set under erroneous state and new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch reverse={false} error="error" />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with reverse flag not set and new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch reverse={false} />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with hint text and dark background in new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch labelHelp="hint text" isDarkBackground />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with hint text in new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch labelHelp="hint text" />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with inline label and field help in new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch labelInline fieldHelp="Field help" />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with inline label, dark background and field help in new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch labelInline fieldHelp="Field help" isDarkBackground />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with inline label, dark background, error and field help in new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch
        labelInline
        fieldHelp="Field help"
        error="error"
        isDarkBackground
      />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders with the correct error colour when `isDarkBackground` is false", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch
        labelInline
        fieldHelp="Field help"
        error="error"
        isDarkBackground={false}
      />
    </CarbonProvider>,
  );

  expect(screen.getByTestId("validation-message-top")).toHaveStyleRule(
    "color: var(--colorsSemanticNegative500)",
  );
});

// coverage
test("renders with the correct error colour when `isDarkBackground` is true", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch
        labelInline
        fieldHelp="Field help"
        error="error"
        isDarkBackground
      />
    </CarbonProvider>,
  );

  expect(screen.getByTestId("validation-message-top")).toHaveStyleRule(
    "color: var(--colorsSemanticNegative450)",
  );
});

// coverage
test("renders correctly with inline label and hint text in new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch labelInline labelHelp="Field help" />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with inline label and hint text in new validation when reversed", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch labelInline labelHelp="Field help" reverse={false} />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

test("when `labelInline` is true and `reverse` is false no margin left is applied to the input-wrapper", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch label="label" labelInline reverse={false} />
    </CarbonProvider>,
  );

  const inputWrapper = screen.getByTestId("input-wrapper");
  expect(inputWrapper).toHaveStyle("margin-left: var(--spacing000)");
});

test("when `labelInline` is true and `reverse` is true no margin right is applied to the input-wrapper", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch label="label" labelInline reverse />
    </CarbonProvider>,
  );

  const inputWrapper = screen.getByTestId("input-wrapper");
  expect(inputWrapper).toHaveStyleRule("margin-right: var(--spacing000)");
});

test("when `labelInline` is true, the provided `labelWidth` is applied to the label-wrapper", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch label="label" labelInline labelWidth={50} />
    </CarbonProvider>,
  );

  const labelWrapper = screen.getByTestId("label-wrapper");
  expect(labelWrapper).toHaveStyle("width: 50%");
});

test("when component is uncontrolled and loading, it doesn't change internal state and the provided onChange is not called", async () => {
  const user = userEvent.setup({ delay: null });
  const onChangeMock = jest.fn();

  render(<Switch onChange={onChangeMock} loading />);

  const switchElement = screen.getByRole("switch");
  await user.click(switchElement);

  expect(onChangeMock).not.toHaveBeenCalled();
});
