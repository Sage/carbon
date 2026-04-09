import React from "react";
import { render, screen } from "@testing-library/react";
import Switch from "./switch.component";

import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import I18nProvider from "../../components/i18n-provider";
import CarbonProvider from "../../components/carbon-provider";

jest.mock("../../__internal__/utils/helpers/guid");

testStyledSystemMargin(
  (props) => (
    <Switch
      data-role="switch-wrapper"
      checked={false}
      onChange={() => {}}
      {...props}
    />
  ),
  () => screen.getByTestId("switch-wrapper"),
);

test("accepts ref as a ref object", () => {
  const ref = { current: null };
  render(<Switch ref={ref} checked={false} onChange={() => {}} />);

  expect(ref.current).toBe(screen.getByRole("switch"));
});

test("accepts ref as a ref callback", () => {
  const ref = jest.fn();
  render(<Switch ref={ref} checked={false} onChange={() => {}} />);

  expect(ref).toHaveBeenCalledWith(screen.getByRole("switch"));
});

test("sets ref to empty after unmounting", () => {
  const ref = { current: null };
  const { unmount } = render(
    <Switch ref={ref} checked={false} onChange={() => {}} />,
  );

  unmount();

  expect(ref.current).toBe(null);
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

  expect(sliderPanelText[0]).toBeVisible();
});

test("when `labelInline` is true, the correct Label component styles are applied", () => {
  render(
    <Switch label="label" labelInline checked={false} onChange={() => {}} />,
  );

  expect(screen.getByText("label")).toHaveStyle("margin-bottom: 0px");
});

test("the `error` prop should not throw an error if `loading` is true", () => {
  expect(() => {
    render(
      <Switch
        id="mock-input"
        loading
        error
        checked={false}
        onChange={() => {}}
      />,
    );
  }).not.toThrow();
});

test("the `warning` prop should not throw an error if `loading` is true", () => {
  expect(() => {
    render(
      <Switch
        id="mock-input"
        loading
        warning
        checked={false}
        onChange={() => {}}
      />,
    );
  }).not.toThrow();
});

test("the `info` prop should not throw an error if `loading` is true", () => {
  expect(() => {
    render(
      <Switch
        id="mock-input"
        loading
        info
        checked={false}
        onChange={() => {}}
      />,
    );
  }).not.toThrow();
});

test("the expected translations are correctly applied for on", () => {
  render(
    <I18nProvider
      locale={{
        locale: () => "fr-FR",
        switch: {
          on: () => "sur",
          off: () => "de",
          processingLabel: () => "Traitement...",
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
          processingLabel: () => "Traitement...",
        },
      }}
    >
      <Switch checked={false} onChange={() => {}} />
    </I18nProvider>,
  );

  const i18nText = screen.getAllByText("de");

  expect(i18nText[0]).toBeVisible();
});

// coverage
test("renders with normal styles when `isDarkBackground` is false", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch isDarkBackground={false} checked={false} onChange={() => {}} />
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
      <Switch isDarkBackground checked={false} onChange={() => {}} />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("color: var(--colorsUtilityYin100)");
});

// coverage
test("renders correctly with inputWidth set to numerical value of between 0 and 1", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch inputWidth={0.5} checked={false} onChange={() => {}} />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with labelInline and new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch labelInline checked={false} onChange={() => {}} />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with reverse flag set under erroneous state and new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch reverse error="error" checked={false} onChange={() => {}} />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with no reverse flag set under erroneous state and new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch
        reverse={false}
        error="error"
        checked={false}
        onChange={() => {}}
      />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with reverse flag not set and new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch reverse={false} checked={false} onChange={() => {}} />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with hint text and dark background in new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch
        labelHelp="hint text"
        isDarkBackground
        checked={false}
        onChange={() => {}}
      />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with hint text in new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch labelHelp="hint text" checked={false} onChange={() => {}} />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with inline label and field help in new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch
        labelInline
        fieldHelp="Field help"
        checked={false}
        onChange={() => {}}
      />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with inline label, dark background and field help in new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch
        labelInline
        fieldHelp="Field help"
        isDarkBackground
        checked={false}
        onChange={() => {}}
      />
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
        checked={false}
        onChange={() => {}}
      />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with inline label and hint text in new validation", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch
        labelInline
        labelHelp="Field help"
        checked={false}
        onChange={() => {}}
      />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

// coverage
test("renders correctly with inline label and hint text in new validation when reversed", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Switch
        labelInline
        labelHelp="Field help"
        reverse={false}
        checked={false}
        onChange={() => {}}
      />
    </CarbonProvider>,
  );

  const switchElement = screen.getByRole("switch");

  expect(switchElement).toHaveStyleRule("width: 50%");
});

test("when `labelInline` is true, the provided `labelWidth` is applied to the label", () => {
  render(
    <Switch
      label="label"
      labelInline
      labelWidth={50}
      onChange={jest.fn}
      checked
    />,
  );

  expect(screen.getByText("label")).toHaveStyle("width: 50%");
});
