import React from "react";
import { act, render, screen, within } from "@testing-library/react";
import Fieldset from ".";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";

test("renders with provided `children`", () => {
  render(
    <Fieldset>
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const input = within(screen.getByRole("group")).getByRole("textbox");

  expect(input).toBeVisible();
});

test("renders fieldset with provided `legend`", () => {
  render(
    <Fieldset legend="Legend">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const fieldset = screen.getByRole("group", { name: "Legend" });

  expect(fieldset).toBeVisible();
});

test("sets child inputs as required when `isRequired` is true", () => {
  render(
    <Fieldset isRequired>
      <input title="Test" placeholder="Placeholder" />
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const inputs = screen.getAllByRole("textbox");

  expect(inputs[0]).toBeRequired();
  expect(inputs[1]).toBeRequired();
});

test("renders validation icon and hidden message when `legend` and `error` are provided", () => {
  render(
    <Fieldset legend="Legend" error="error message">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const icon = screen.getByTestId("icon-error");
  const message = screen.getByText("error message");

  expect(icon).toBeVisible();
  expect(message).toBeInTheDocument();
  expect(screen.getByRole("group")).toHaveAccessibleDescription(
    "error message",
  );
});

test("renders validation icon and hidden message when `legend` and `warning` are provided", () => {
  render(
    <Fieldset legend="Legend" warning="warning message">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const icon = screen.getByTestId("icon-warning");
  const message = screen.getByText("warning message");

  expect(icon).toBeVisible();
  expect(message).toBeInTheDocument();
  expect(screen.getByRole("group")).toHaveAccessibleDescription(
    "warning message",
  );
});

test("renders validation icon and hidden message when `legend` and `info` are provided", () => {
  render(
    <Fieldset legend="Legend" info="info message">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const icon = screen.getByTestId("icon-info");
  const message = screen.getByText("info message");

  expect(icon).toBeVisible();
  expect(message).toBeInTheDocument();
  expect(screen.getByRole("group")).toHaveAccessibleDescription("info message");
});

test("renders help icon when `labelHelp` is provided", () => {
  render(
    <Fieldset legend="Legend" labelHelp="label help">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const help = screen.getByRole("button", { name: "help" });

  expect(help).toBeVisible();
});

test("renders fieldHelp when `fieldHelp` is provided", () => {
  render(
    <Fieldset legend="Legend" fieldHelp="field help">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const fieldHelp = screen.getByText("field help");

  expect(fieldHelp).toBeVisible();
  expect(screen.getByRole("group")).toHaveAccessibleDescription("field help");
});

// coverage - tested in Help component
test("sets `aria-describedby` on help icon as tooltip content when focused and removes it on blur", () => {
  render(
    <Fieldset legend="Legend" labelHelp="label help">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );
  const help = screen.getByRole("button", { name: "help" });

  act(() => {
    help.focus();
  });
  expect(help).toHaveAccessibleDescription("label help");

  act(() => {
    help.blur();
  });
  expect(help).not.toHaveAttribute("aria-describedby");
});

// coverage
test("renders legend with provided `legendWidth` when `inline` is true", () => {
  render(
    <Fieldset legend="Legend" inline legendWidth={30}>
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const legend = screen.getByTestId("legend");

  expect(legend).toHaveStyle({ width: "30%" });
});

// coverage
test("renders with expected styles when `inline` is true and `legendAlign` is 'left'", () => {
  render(
    <Fieldset legend="Legend" inline legendAlign="left">
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const legend = screen.getByTestId("legend");

  expect(legend).toHaveStyle({ justifyContent: "flex-start" });
});

// coverage
test("renders with expected padding when `inline` is true and `legendSpacing` is 1", () => {
  render(
    <Fieldset legend="Legend" inline legendSpacing={1}>
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>,
  );

  const legend = screen.getByTestId("legend");

  expect(legend).toHaveStyleRule("padding-right", "var(--spacing100)");
});

testStyledSystemMargin(
  (props) => (
    <Fieldset {...props}>
      <input title="Test" placeholder="Placeholder" />
    </Fieldset>
  ),
  () => screen.getByRole("group"),
);

describe("when `applyNewValidation` is provided", () => {
  it("renders with `inputHint` when provided", () => {
    render(
      <Fieldset legend="Legend" applyNewValidation inputHint="input hint">
        <input title="Test" placeholder="Placeholder" />
      </Fieldset>,
    );

    const hint = screen.getByText("input hint");

    expect(hint).toBeVisible();
    expect(screen.getByRole("group")).toHaveAccessibleDescription("input hint");
  });

  it("renders with validation message when `error` is provided", () => {
    render(
      <Fieldset legend="Legend" applyNewValidation error="error message">
        <input title="Test" placeholder="Placeholder" />
      </Fieldset>,
    );
    const message = screen.getByText("error message");

    expect(message).toBeVisible();
    expect(screen.getByRole("group")).toHaveAccessibleDescription(
      "error message",
    );
  });

  it("renders with validation message when `warning` is provided", () => {
    render(
      <Fieldset legend="Legend" applyNewValidation warning="warning message">
        <input title="Test" placeholder="Placeholder" />
      </Fieldset>,
    );
    const message = screen.getByText("warning message");

    expect(message).toBeVisible();
    expect(screen.getByRole("group")).toHaveAccessibleDescription(
      "warning message",
    );
  });

  it("combines `inputHint` and validation message in `aria-describedby` when both are provided", () => {
    render(
      <Fieldset
        legend="Legend"
        applyNewValidation
        error="error message"
        inputHint="input hint"
      >
        <input title="Test" placeholder="Placeholder" />
      </Fieldset>,
    );

    expect(screen.getByRole("group")).toHaveAccessibleDescription(
      "input hint error message",
    );
  });

  it("renders with required inputs when `isRequired` is true", () => {
    render(
      <Fieldset applyNewValidation isRequired>
        <input title="Test" placeholder="Placeholder" />
      </Fieldset>,
    );

    const inputs = screen.getByRole("textbox");

    expect(inputs).toBeRequired();
  });

  it("renders with expected styles when `isDisabled` is true", () => {
    render(
      <Fieldset
        applyNewValidation
        legend="Legend"
        inputHint="input hint"
        isDisabled
      >
        <input title="Test" placeholder="Placeholder" />
      </Fieldset>,
    );

    const legend = screen.getByText("Legend");
    const hint = screen.getByText("input hint");

    expect(legend).toHaveStyleRule("color", "var(--colorsUtilityYin030)");
    expect(hint).toHaveStyleRule("color", "var(--colorsUtilityYin030)");
  });
});
