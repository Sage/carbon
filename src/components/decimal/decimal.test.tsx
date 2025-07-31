import React, { useState } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Decimal from "./decimal.component";
import type { DecimalProps, CustomEvent } from "./decimal.component";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import I18nProvider from "../i18n-provider";
import Logger from "../../__internal__/utils/logger";

jest.mock("../../__internal__/utils/logger");

const ControlledDecimal = ({
  onChange,
  startingValue,
  ...rest
}: Partial<DecimalProps> & { startingValue: string }) => {
  const [value, setValue] = useState(startingValue);
  const handleChange = (e: CustomEvent) => {
    setValue(e.target.value.rawValue);
    onChange?.(e);
  };

  return <Decimal value={value} onChange={handleChange} {...rest} />;
};

testStyledSystemMargin(
  (props) => (
    <Decimal
      data-role="decimal"
      value="0.01"
      onChange={() => jest.fn()}
      {...props}
    />
  ),
  () => screen.getByTestId("decimal"),
  { modifier: "&&&" },
);

it.each([
  ["123", "123.00"],
  ["456", "456.00"],
  ["", ""],
])("renders the value prop %s in the input", (rawValue, formattedValue) => {
  render(<Decimal value={rawValue} onChange={jest.fn} />);

  expect(screen.getByRole("textbox")).toHaveValue(formattedValue);
  expect(screen.getByTestId("hidden-input")).toHaveValue(formattedValue);
});

it("does not fire onChange when the input blurs with no change in value", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(<Decimal value="123" onChange={onChange} />);

  act(() => {
    screen.getByRole("textbox").focus();
  });
  await user.tab();

  expect(onChange).not.toHaveBeenCalled();
});

it("does not revert to the default value on blur when the user enters just a negative sign", async () => {
  const user = userEvent.setup();
  render(<ControlledDecimal startingValue="123" />);
  const decimalInput = screen.getByRole("textbox");

  await user.type(decimalInput, "-");
  await user.tab();

  expect(decimalInput).toHaveValue("-");
  expect(screen.getByTestId("hidden-input")).toHaveValue("-");
});

it("formats the default value correctly on blur when precision is 0 and allowEmptyValue is false", async () => {
  const user = userEvent.setup();
  render(
    <ControlledDecimal
      precision={0}
      startingValue=""
      allowEmptyValue={false}
    />,
  );

  act(() => {
    screen.getByRole("textbox").focus();
  });
  await user.tab();

  expect(screen.getByRole("textbox")).toHaveValue("0");
  expect(screen.getByTestId("hidden-input")).toHaveValue("0");
});

it("formats the default value correctly on blur when precision is 1 and allowEmptyValue is false", async () => {
  const user = userEvent.setup();
  render(
    <ControlledDecimal
      precision={1}
      startingValue=""
      allowEmptyValue={false}
    />,
  );

  act(() => {
    screen.getByRole("textbox").focus();
  });
  await user.tab();

  expect(screen.getByRole("textbox")).toHaveValue("0.0");
  expect(screen.getByTestId("hidden-input")).toHaveValue("0.0");
});

it("does not revert to the empty value when allowEmptyValue is true and the user enters just a negative sign", async () => {
  const user = userEvent.setup();
  render(<ControlledDecimal startingValue="" allowEmptyValue />);
  const decimalInput = screen.getByRole("textbox");

  await user.type(decimalInput, "-");
  await user.tab();

  expect(decimalInput).toHaveValue("-");
  expect(screen.getByTestId("hidden-input")).toHaveValue("-");
});

it("does not format a value that is not a number", async () => {
  const user = userEvent.setup();
  render(<ControlledDecimal startingValue="" />);

  const decimalInput = screen.getByRole("textbox");
  await user.type(decimalInput, "FooBar");
  expect(decimalInput).toHaveValue("FooBar");
  expect(screen.getByTestId("hidden-input")).toHaveValue("FooBar");
});

it("does not format a value that is white-space only", async () => {
  const user = userEvent.setup();
  render(<ControlledDecimal startingValue="" />);

  const decimalInput = screen.getByRole("textbox");
  await user.type(decimalInput, "     ");
  expect(decimalInput).toHaveValue("     ");
  expect(screen.getByTestId("hidden-input")).toHaveValue("     ");
});

it("does not format a value that is delimiters only", async () => {
  const user = userEvent.setup();
  render(<ControlledDecimal startingValue="" />);

  const decimalInput = screen.getByRole("textbox");
  await user.type(decimalInput, ",,,");
  expect(decimalInput).toHaveValue(",,,");
  expect(screen.getByTestId("hidden-input")).toHaveValue(",,,");
});

it("does not format a value that is special characters and delimiters only", async () => {
  const user = userEvent.setup();
  render(<ControlledDecimal startingValue="" />);

  const decimalInput = screen.getByRole("textbox");
  await user.type(decimalInput, "^^&^%%$,,,,");
  expect(decimalInput).toHaveValue("^^&^%%$,,,,");
  expect(screen.getByTestId("hidden-input")).toHaveValue("^^&^%%$,,,,");
});

it("does not format a value that has numbers and has too many delimiters", async () => {
  const user = userEvent.setup();
  render(<ControlledDecimal startingValue="" />);

  const decimalInput = screen.getByRole("textbox");
  await user.type(decimalInput, "10,.10,.11,.6");
  expect(decimalInput).toHaveValue("10,.10,.11,.6");
  expect(screen.getByTestId("hidden-input")).toHaveValue("10,.10,.11,.6");
});

it("handles a value that is numbers, delimiters and special characters only", async () => {
  const user = userEvent.setup();
  render(<ControlledDecimal startingValue="" />);

  const decimalInput = screen.getByRole("textbox");
  await user.type(decimalInput, "1,234$");
  expect(decimalInput).toHaveValue("1,234$");
  expect(screen.getByTestId("hidden-input")).toHaveValue("1,234$");
});

it("handles an empty value on blur when allowEmptyValue is true", async () => {
  const onBlur = jest.fn();
  const user = userEvent.setup();
  render(
    <ControlledDecimal startingValue="1" onBlur={onBlur} allowEmptyValue />,
  );

  const decimalInput = screen.getByRole("textbox");
  act(() => {
    decimalInput.focus();
  });
  await user.keyboard("{Backspace}");
  await user.tab();

  expect(decimalInput).toHaveValue("");
  expect(screen.getByTestId("hidden-input")).toHaveValue("");
  expect(onBlur).toHaveBeenCalledWith(
    expect.objectContaining({
      target: {
        value: {
          formattedValue: "",
          rawValue: "",
        },
      },
    }),
  );
});

it("handles an empty value on blur when allowEmptyValue is false", async () => {
  const onBlur = jest.fn();
  const user = userEvent.setup();
  render(<ControlledDecimal startingValue="1" onBlur={onBlur} />);

  const decimalInput = screen.getByRole("textbox");
  act(() => {
    decimalInput.focus();
  });
  await user.keyboard("{Backspace}");
  await user.tab();

  expect(decimalInput).toHaveValue("0.00");
  expect(screen.getByTestId("hidden-input")).toHaveValue("0.00");
  expect(onBlur).toHaveBeenCalledWith(
    expect.objectContaining({
      target: {
        value: {
          formattedValue: "0.00",
          rawValue: "0.00",
        },
      },
    }),
  );
});

describe("refs", () => {
  it("accepts ref as a ref object", () => {
    const ref = { current: null };
    render(<Decimal ref={ref} onChange={jest.fn} value="0.01" />);

    expect(ref.current).toBe(screen.getByRole("textbox"));
  });

  it("accepts ref as a ref callback", () => {
    const ref = jest.fn();
    render(<Decimal ref={ref} onChange={jest.fn} value="0.01" />);

    expect(ref).toHaveBeenCalledWith(screen.getByRole("textbox"));
  });

  it("sets ref to empty after unmount", () => {
    const ref = { current: null };
    const { unmount } = render(
      <Decimal ref={ref} onChange={jest.fn} value="0.01" />,
    );

    unmount();

    expect(ref.current).toBe(null);
  });
});

test("when wrapped in an I18nProvider, the appropriate locale is used, and the formatting updates on blur when the locale is changed", async () => {
  const user = userEvent.setup();
  const { rerender } = render(
    <I18nProvider
      locale={{
        locale: () => "fr-FR",
      }}
    >
      <Decimal onChange={jest.fn} value="0.00" />
    </I18nProvider>,
  );
  expect(screen.getByRole("textbox")).toHaveValue("0,00");

  rerender(
    <I18nProvider
      locale={{
        locale: () => "en-GB",
      }}
    >
      <Decimal onChange={jest.fn} value="0.00" />
    </I18nProvider>,
  );
  act(() => {
    screen.getByRole("textbox").focus();
  });
  await user.tab();
  expect(screen.getByRole("textbox")).toHaveValue("0.00");
});

test("the `id` prop is passed to the input element", () => {
  render(<Decimal id="decimalId" onChange={jest.fn} value="0.01" />);

  expect(screen.getByRole("textbox")).toHaveAttribute("id", "decimalId");
});

test("no error message is triggered if the `precision` prop is not specified", () => {
  const consoleSpy = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => {});

  render(<Decimal value="12345.654" onChange={jest.fn} />);
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

test("the `required` prop is passed to the visible input", () => {
  render(<Decimal label="required" required onChange={jest.fn} value="0.01" />);

  expect(screen.getByRole("textbox")).toBeRequired();
});

test("the `required` prop is not passed to the hidden input", () => {
  render(<Decimal label="required" required onChange={jest.fn} value="0.01" />);

  expect(screen.getByTestId("hidden-input")).not.toBeRequired();
});

test("component should render without invariant firing in strict mode", () => {
  const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  render(<ControlledDecimal startingValue="123" />, { reactStrictMode: true });

  expect(screen.getByRole("textbox")).toHaveValue("123.00");
  expect(screen.getByTestId("hidden-input")).toHaveValue("123.00");

  expect(consoleErrorSpy).not.toHaveBeenCalledWith(
    expect.stringContaining(
      "Input elements should not switch from uncontrolled to controlled (or vice versa). " +
        "Decide between using a controlled or uncontrolled input element for the lifetime of the component",
    ),
  );

  consoleErrorSpy.mockRestore();
});

test("logs an error when precision changes", () => {
  const loggerSpy = jest.spyOn(Logger, "error");

  const { rerender } = render(
    <Decimal onChange={jest.fn} value="0.01" precision={2} />,
  );

  rerender(<Decimal onChange={jest.fn} value="0.01" precision={4} />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "Decimal `precision` prop has changed value. Changing the Decimal `precision` prop has no effect.",
  );
});

describe("check events for Decimal component", () => {
  (
    [
      ["1", "1.00"],
      ["12", "12.00"],
      ["123", "123.00"],
    ] as [string, string][]
  ).forEach(([rawValueTest, formattedValueTest]) => {
    it(`should call onChange callback when a type event is triggered with ${rawValueTest} value`, async () => {
      const user = userEvent.setup();
      render(<ControlledDecimal startingValue="" />);

      const decimalInput = screen.getByRole("textbox");
      await user.type(decimalInput, rawValueTest);
      act(() => {
        decimalInput.blur();
      });
      expect(decimalInput).toHaveValue(formattedValueTest);
    });
  });

  test("should call onBlur callback when a blur event is triggered", async () => {
    let callbackCount = 0;
    const callback: DecimalProps["onBlur"] = () => {
      callbackCount += 1;
    };
    const user = userEvent.setup();
    render(<ControlledDecimal startingValue="" onBlur={callback} />);

    const decimalInput = screen.getByRole("textbox");
    await user.type(decimalInput, "123");
    act(() => {
      decimalInput.blur();
    });

    expect(decimalInput).toHaveValue("123.00");
    expect(callbackCount).toBe(1);
  });
});
