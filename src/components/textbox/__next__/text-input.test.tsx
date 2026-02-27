import React from "react";
import { act, render, screen } from "@testing-library/react";
import TextInput from ".";
import { testStyledSystemMargin } from "../../../__spec_helper__/__internal__/test-utils";
import createGuid from "../../../__internal__/utils/helpers/guid";

jest.mock("../../../__internal__/utils/logger");

const mockedGuid = "mocked-guid";
jest.mock("../../../__internal__/utils/helpers/guid");

(createGuid as jest.MockedFunction<typeof createGuid>).mockReturnValue(
  mockedGuid,
);

testStyledSystemMargin(
  (props) => (
    <TextInput
      label="label"
      data-role="text-input-wrapper"
      value="foo"
      onChange={() => {}}
      {...props}
    />
  ),
  () => screen.getByTestId("text-input-wrapper"),
);

test("should render", () => {
  render(<TextInput label="label" value="foo" onChange={() => {}} />);

  expect(screen.getByRole("textbox")).toBeVisible();
  expect(screen.getByRole("textbox")).toHaveAccessibleName("label");
});

test("should render with an id attribute via the `id` prop", () => {
  render(
    <TextInput id="id-123" label="label" value="foo" onChange={() => {}} />,
  );

  expect(screen.getByRole("textbox")).toHaveAttribute("id", "id-123");
});

test("should render with an id attribute via a guid if the `id` prop is not provided", () => {
  render(<TextInput label="label" value="foo" onChange={() => {}} />);

  expect(screen.getByRole("textbox")).toHaveAttribute("id", mockedGuid);
});

test("should render with data attributes via the `data-element` and `data-role` props", () => {
  render(
    <TextInput
      data-role="custom-role"
      data-element="custom-element"
      label="label"
      value="foo"
      onChange={() => {}}
    />,
  );

  expect(screen.getByTestId("custom-role")).toHaveAttribute(
    "data-element",
    "custom-element",
  );
});

test("should render with a placeholder via the `placeholder` prop", () => {
  render(
    <TextInput
      placeholder="baz"
      label="label"
      value="foo"
      onChange={() => {}}
    />,
  );

  expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "baz");
});

test("should not render with a placeholder when `disabled` prop is true", () => {
  render(
    <TextInput
      disabled
      placeholder="baz"
      label="label"
      value="foo"
      onChange={() => {}}
    />,
  );

  expect(screen.getByRole("textbox")).not.toHaveAttribute("placeholder", "baz");
});

test("should not render with a placeholder when `readOnly` prop is true", () => {
  render(
    <TextInput
      readOnly
      placeholder="baz"
      label="label"
      value="foo"
      onChange={() => {}}
    />,
  );

  expect(screen.getByRole("textbox")).not.toHaveAttribute("placeholder", "baz");
});

test("should render with an input hint via the `inputHint` prop", () => {
  render(
    <TextInput inputHint="baz" label="label" value="foo" onChange={() => {}} />,
  );

  expect(screen.getByRole("textbox")).toHaveAccessibleDescription("baz");
});

test("should render with an error border via the `error` prop", () => {
  render(
    <TextInput
      error
      placeholder="baz"
      label="label"
      value="foo"
      onChange={() => {}}
    />,
  );

  const errorBorder = screen.getByTestId("error-border");

  expect(errorBorder).toBeVisible();
});

test("should render with an error message via the `error` prop", () => {
  render(
    <TextInput
      error="error"
      placeholder="baz"
      label="label"
      value="foo"
      onChange={() => {}}
    />,
  );

  expect(screen.getByRole("textbox")).toHaveAccessibleDescription("error");
});

test("should announce the error message after the input hint", () => {
  render(
    <TextInput
      error="error"
      inputHint="hint text"
      placeholder="baz"
      label="label"
      value="foo"
      onChange={() => {}}
    />,
  );

  expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
    "hint text error",
  );
});

test("should render with a warning border via the `warning` prop", () => {
  render(
    <TextInput
      warning
      placeholder="baz"
      label="label"
      value="foo"
      onChange={() => {}}
    />,
  );

  const errorBorder = screen.getByTestId("error-border");

  expect(errorBorder).toBeVisible();
});

test("should render with a warning message via the `warning` prop", () => {
  render(
    <TextInput
      warning="warning"
      placeholder="baz"
      label="label"
      value="foo"
      onChange={() => {}}
    />,
  );

  expect(screen.getByRole("textbox")).toHaveAccessibleDescription("warning");
});

test("should call the `onFocus` callback prop when the input is focused", async () => {
  const onFocus = jest.fn();

  render(
    <TextInput
      onFocus={onFocus}
      label="label"
      value="foo"
      onChange={() => {}}
    />,
  );

  expect(onFocus).not.toHaveBeenCalled();

  act(() => {
    screen.getByRole("textbox").focus();
  });

  expect(onFocus).toHaveBeenCalled();
});

test("should call the `onBlur` callback prop when the input is blurred", async () => {
  const onBlur = jest.fn();

  render(
    <TextInput onBlur={onBlur} label="label" value="foo" onChange={() => {}} />,
  );

  act(() => {
    screen.getByRole("textbox").focus();
  });

  expect(onBlur).not.toHaveBeenCalled();

  act(() => {
    screen.getByRole("textbox").blur();
  });

  expect(onBlur).toHaveBeenCalled();
});

test("should apply flex-direction row when `labelInline` prop is true", () => {
  render(
    <TextInput
      data-role="text-input"
      label="Test"
      value="foo"
      onChange={() => {}}
      labelInline
    />,
  );
  const locator = screen.getByTestId("text-input");
  expect(locator).toHaveStyleRule("flex-direction", "row");
});

test("should apply flex-direction column when `labelInline` prop is false", () => {
  render(
    <TextInput
      data-role="text-input"
      label="Test"
      value="foo"
      onChange={() => {}}
      labelInline={false}
    />,
  );
  const locator = screen.getByTestId("text-input");
  expect(locator).toHaveStyleRule("flex-direction", "column");
});

test("should apply `containerWidth` prop as percentage when provided as number", () => {
  render(
    <TextInput
      data-role="text-input"
      label="Test"
      value="foo"
      onChange={() => {}}
      containerWidth={50}
    />,
  );
  const locator = screen.getByTestId("text-input");
  expect(locator).toHaveStyleRule("width", "50%");
});

test.each([
  ["small", "var(--global-space-comp-l)"],
  ["medium", "var(--global-space-comp-l)"],
  ["large", "var(--global-space-comp-xl)"],
] as const)(
  "should apply correct gap when `labelInline` prop is true and `size` prop is %s",
  (size, expectedGap) => {
    render(
      <TextInput
        data-role="text-input"
        label="Test"
        value="foo"
        onChange={() => {}}
        labelInline
        size={size}
      />,
    );
    const locator = screen.getByTestId("text-input");
    expect(locator).toHaveStyleRule("gap", expectedGap);
  },
);

test.each([
  ["small", "var(--global-space-comp-xs)"],
  ["medium", "var(--global-space-comp-s)"],
  ["large", "var(--global-space-comp-m)"],
] as const)(
  "should apply correct gap when `labelInline` prop is false and `size` prop is %s",
  (size, expectedGap) => {
    render(
      <TextInput
        data-role="text-input"
        label="Test"
        value="foo"
        onChange={() => {}}
        labelInline={false}
        size={size}
      />,
    );
    const locator = screen.getByTestId("text-input");
    expect(locator).toHaveStyleRule("gap", expectedGap);
  },
);

test("should apply padding-top small for LabelSet when `labelInline` prop is true and `size` prop is medium", () => {
  render(
    <TextInput
      label="Test"
      value="foo"
      onChange={() => {}}
      labelInline
      size="medium"
    />,
  );
  const locator = screen.getByTestId("label-set");
  expect(locator).toHaveStyleRule("padding-top", "var(--global-space-comp-s)");
});

test("should calculate labelSetWidth as 100 minus `inputWidth` prop when `labelInline` prop is true", () => {
  render(
    <TextInput
      label="Test"
      value="foo"
      onChange={() => {}}
      labelInline
      inputWidth={30}
    />,
  );
  const locator = screen.getByTestId("label-set");
  expect(locator).toHaveStyleRule("width", "70%");
});

test("should apply `inputWidth` prop as percentage when provided as number", () => {
  render(
    <TextInput label="Test" value="foo" onChange={() => {}} inputWidth={75} />,
  );
  const locator = screen.getByTestId("input-set");
  expect(locator).toHaveStyleRule("width", "75%");
});

test.each([
  ["small", "var(--global-space-comp-xs)"],
  ["medium", "var(--global-space-comp-s)"],
  ["large", "var(--global-space-comp-s)"],
] as const)(
  "should apply correct gap to InputSet when `size` prop is %s",
  (size, expectedGap) => {
    render(
      <TextInput label="Test" value="foo" onChange={() => {}} size={size} />,
    );
    const locator = screen.getByTestId("input-set");
    expect(locator).toHaveStyleRule("gap", expectedGap);
  },
);
