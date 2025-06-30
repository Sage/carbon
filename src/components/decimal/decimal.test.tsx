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
}: Partial<DecimalProps> & { startingValue?: string }) => {
  const [value, setValue] = useState(startingValue);
  const handleChange = (e: CustomEvent) => {
    setValue(e.target.value.rawValue);
    onChange?.(e);
  };

  return <Decimal value={value} onChange={handleChange} {...rest} />;
};

testStyledSystemMargin(
  (props) => <Decimal data-role="decimal" {...props} />,
  () => screen.getByTestId("decimal"),
  { modifier: "&&&" },
);

describe("when the component is uncontrolled", () => {
  it("displays a deprecation warning for uncontrolled", () => {
    const loggerSpy = jest.spyOn(Logger, "deprecate");
    render(<Decimal defaultValue="0.01" />);

    expect(loggerSpy).toHaveBeenCalledWith(
      "Uncontrolled behaviour in `Decimal` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
    );
    expect(loggerSpy).toHaveBeenCalledTimes(1);

    loggerSpy.mockRestore();
  });

  it("has a default value of 0.00 when no defaultValue prop is provided", () => {
    render(<Decimal />);
    expect(screen.getByRole("textbox")).toHaveValue("0.00");
    expect(screen.getByTestId("hidden-input")).toHaveValue("0.00");
  });

  it("has a default value specified by the defaultValue prop", () => {
    render(<Decimal defaultValue="12345.67" />);
    expect(screen.getByRole("textbox")).toHaveValue("12,345.67");
    expect(screen.getByTestId("hidden-input")).toHaveValue("12345.67");
  });

  it("has a default value specified by the defaultValue prop when the value is negative", () => {
    render(<Decimal defaultValue="-1234.56" />);
    expect(screen.getByRole("textbox")).toHaveValue("-1,234.56");
    expect(screen.getByTestId("hidden-input")).toHaveValue("-1234.56");
  });

  it("removes unnecessary separators on blur", async () => {
    const user = userEvent.setup();
    render(<Decimal />);
    const decimalInput = screen.getByRole("textbox");

    await user.type(decimalInput, "1,1");
    await user.tab();

    expect(decimalInput).toHaveValue("11.00");
    expect(screen.getByTestId("hidden-input")).toHaveValue("11.00");
  });

  it("fixes incorrectly placed separators on blur", async () => {
    const user = userEvent.setup();
    render(<Decimal />);
    const decimalInput = screen.getByRole("textbox");

    await user.type(decimalInput, "1,2,34576.00");
    await user.tab();

    expect(decimalInput).toHaveValue("1,234,576.00");
    expect(screen.getByTestId("hidden-input")).toHaveValue("1234576.00");
  });

  it("does not change the value on blur when it contains numbers, letters and too many separators", async () => {
    const user = userEvent.setup();
    render(<Decimal />);
    const decimalInput = screen.getByRole("textbox");

    await user.type(decimalInput, "123a,123a,123a");
    await user.tab();

    expect(decimalInput).toHaveValue("123a,123a,123a");
    expect(screen.getByTestId("hidden-input")).toHaveValue("123a,123a,123a");
  });

  it("does not change the value on blur when it contains numbers, letters and too many separators, and ends with a separator", async () => {
    const user = userEvent.setup();
    render(<Decimal />);
    const decimalInput = screen.getByRole("textbox");

    await user.type(decimalInput, "123a,123a,123a,");
    await user.tab();

    expect(decimalInput).toHaveValue("123a,123a,123a,");
    expect(screen.getByTestId("hidden-input")).toHaveValue("123a,123a,123a,");
  });

  it("does not revert to the defaultValue on blur when allowEmptyValue is not set and the user enters just a negative sign", async () => {
    const user = userEvent.setup();
    render(<Decimal defaultValue="-1234.56" />);
    const decimalInput = screen.getByRole("textbox");

    await user.type(decimalInput, "-");
    await user.tab();

    expect(decimalInput).toHaveValue("-");
    expect(screen.getByTestId("hidden-input")).toHaveValue("-");
  });

  it("does not revert to an empty value on blur when allowEmptyValue is set and the user enters just a negative sign", async () => {
    const user = userEvent.setup();
    render(<Decimal defaultValue="-1234.56" allowEmptyValue />);
    const decimalInput = screen.getByRole("textbox");

    await user.type(decimalInput, "-");
    await user.tab();

    expect(decimalInput).toHaveValue("-");
    expect(screen.getByTestId("hidden-input")).toHaveValue("-");
  });

  it("fires a console error if precision is changed", () => {
    const loggerSpy = jest.spyOn(Logger, "error").mockImplementation(() => {});

    const { rerender } = render(<Decimal defaultValue="12345" precision={2} />);

    rerender(<Decimal precision={1} />);
    expect(loggerSpy).toHaveBeenCalledWith(
      "Decimal `precision` prop has changed value. Changing the Decimal `precision` prop has no effect.",
    );
    loggerSpy.mockRestore();
  });

  it("supports having a precision of 0", () => {
    render(<Decimal defaultValue="12345.65" precision={0} />);
    expect(screen.getByRole("textbox")).toHaveValue("12,345.65");
    expect(screen.getByTestId("hidden-input")).toHaveValue("12345.65");
  });

  it("does not round the default value if it has more precision than the `precision` prop", () => {
    render(<Decimal defaultValue="12345.655" precision={2} />);
    expect(screen.getByRole("textbox")).toHaveValue("12,345.655");
    expect(screen.getByTestId("hidden-input")).toHaveValue("12345.655");
  });

  it("supports having a bigger precision than the default of 2", () => {
    render(<Decimal defaultValue="12345.654" precision={3} />);
    expect(screen.getByRole("textbox")).toHaveValue("12,345.654");
    expect(screen.getByTestId("hidden-input")).toHaveValue("12345.654");
  });

  it.each<[DecimalProps["precision"], string]>([
    [0, "150"],
    [1, "130.4"],
    [2, "136.42"],
    [3, "150.456"],
    [4, "130.5776"],
    [5, "136.42345"],
    [6, "150.234543"],
    [7, "130.4234435"],
    [8, "136.87556431"],
    [9, "150.192837564"],
    [10, "130.1988745670"],
    [11, "136.10029938475"],
    [12, "136.129034895673"],
    [13, "150.1290238945785"],
    [14, "130.10299288377462"],
    [15, "136.896647588492756"],
  ])(
    "formats the default value correctly when the precision is (%s)",
    (precisionValue, decimalValue) => {
      render(
        <Decimal defaultValue={decimalValue} precision={precisionValue} />,
      );
      expect(screen.getByRole("textbox")).toHaveValue(decimalValue);
      expect(screen.getByTestId("hidden-input")).toHaveValue(decimalValue);
    },
  );

  it("pads the value with 0s if the precision is greater than the number of decimal places", () => {
    render(<Decimal defaultValue="12345" precision={3} />);
    expect(screen.getByRole("textbox")).toHaveValue("12,345.000");
    expect(screen.getByTestId("hidden-input")).toHaveValue("12345.000");
  });

  it("calls onChange when the user enters a value", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(<Decimal onChange={onChange} />);

    await user.type(screen.getByRole("textbox"), "12345.56");

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          value: {
            formattedValue: "12,345.56",
            rawValue: "12345.56",
          },
        },
      }),
    );
  });

  it("calls onBlur when the field loses focus", async () => {
    const onBlur = jest.fn();
    const user = userEvent.setup();

    render(<Decimal onBlur={onBlur} />);

    await user.type(screen.getByRole("textbox"), "12345.56");
    await user.tab();

    expect(onBlur).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          value: {
            formattedValue: "12,345.56",
            rawValue: "12345.56",
          },
        },
      }),
    );
  });

  it.each([
    "1a",
    "1b",
    "1c",
    "1d",
    "1e",
    "1f",
    "1g",
    "1h",
    "1i",
    "1j",
    "1k",
    "1l",
    "1m",
    "1n",
    "1o",
    "1p",
    "1q",
    "1r",
    "1s",
    "1t",
    "1u",
    "1v",
    "1w",
    "1x",
    "1y",
    "1z",
    "1A",
    "1B",
    "1C",
    "1D",
    "1E",
    "1F",
    "1G",
    "1H",
    "1I",
    "1J",
    "1K",
    "1L",
    "1M",
    "1N",
    "1O",
    "1P",
    "1Q",
    "1R",
    "1S",
    "1T",
    "1U",
    "1V",
    "1W",
    "1X",
    "1Y",
    "1Z",
    "1!",
    '1"',
    "1£",
    "1$",
    "1%",
    "1^",
    "1&",
    "1*",
    "1(",
    "1)",
    "1_",
    "1+",
    "1`",
    "1¬",
    "1\\",
    "1|",
    "1[",
    "1{",
    "1]",
    "1}",
    "1:",
    "1;",
    "1@",
    "1'",
    "1~",
    "1#",
    "1<",
    "1>",
    "1?",
    "1/",
    "a1",
    "b1",
    "c1",
    "d1",
    "e1",
    "f1",
    "g1",
    "h1",
    "i1",
    "j1",
    "k1",
    "l1",
    "m1",
    "n1",
    "o1",
    "p1",
    "q1",
    "r1",
    "s1",
    "t1",
    "u1",
    "v1",
    "w1",
    "x1",
    "y1",
    "z1",
    "A1",
    "B1",
    "C1",
    "D1",
    "E1",
    "F1",
    "G1",
    "H1",
    "I1",
    "J1",
    "K1",
    "L1",
    "M1",
    "N1",
    "O1",
    "P1",
    "Q1",
    "R1",
    "S1",
    "T1",
    "U1",
    "V1",
    "W1",
    "X1",
    "Y1",
    "Z1",
    "!1",
    '"1',
    "£1",
    "$1",
    "%1",
    "^1",
    "&1",
    "*1",
    "(1",
    ")1",
    "_1",
    "`1",
    "¬1",
    "\\1",
    "|1",
    "[1",
    "{1",
    "]1",
    "}1",
    ":1",
    ";1",
    "@1",
    "'1",
    "~1",
    "#1",
    "<1",
    ">1",
    "?1",
    "/1",
    "11111a",
    "a111111",
    "1111a1111",
  ])(
    "allows the user to paste `%s` and calls onChange with the pasted value",
    async (pastedText) => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(<Decimal onChange={onChange} />);

      act(() => {
        screen.getByRole("textbox").focus();
      });
      (screen.getByRole("textbox") as HTMLInputElement).select();
      await user.paste(pastedText);

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: pastedText,
              rawValue: pastedText,
            },
          },
        }),
      );
    },
  );

  it.each([
    [1, "0-.00"],
    [2, "0.-00"],
    [3, "0.0-0"],
  ])(
    "allows the user to type the negative symbol within the number at index %s",
    async (insertionIndex, result) => {
      const user = userEvent.setup();
      render(<Decimal defaultValue="0.00" />);

      const decimalInput = screen.getByRole("textbox");

      await user.type(decimalInput, "-", {
        initialSelectionStart: insertionIndex,
      });

      expect(decimalInput).toHaveValue(result);
      expect(screen.getByTestId("hidden-input")).toHaveValue(result);
    },
  );

  // insertions at start and end have to be handled separately from the cases above, as setting the
  // initialSelectionStart to 0 or 4 (the default input length) seems to result in the entire value
  // being selected. So we explicitly use arrow-key manipulation to handle these cases correctly.
  it("allows the user to type a negative symbol at the start of the number", async () => {
    const user = userEvent.setup();
    render(<Decimal defaultValue="0.00" />);

    const decimalInput = screen.getByRole("textbox");

    act(() => {
      decimalInput.focus();
    });
    await user.keyboard("{ArrowLeft}");
    await user.keyboard("-");

    expect(decimalInput).toHaveValue("-0.00");
    expect(screen.getByTestId("hidden-input")).toHaveValue("-0.00");
  });

  it("allows the user to type a negative symbol at the end of the number", async () => {
    const user = userEvent.setup();
    render(<Decimal defaultValue="0.00" />);

    const decimalInput = screen.getByRole("textbox");

    act(() => {
      decimalInput.focus();
    });
    await user.keyboard("{ArrowRight}");
    await user.keyboard("-");

    expect(decimalInput).toHaveValue("0.00-");
    expect(screen.getByTestId("hidden-input")).toHaveValue("0.00-");
  });

  it.each([
    [1, 1, ",234.56", ",234.56"],
    [2, 2, "1234.56", "1234.56"],
    [3, 3, "1,34.56", "134.56"],
    [4, 4, "1,24.56", "124.56"],
    [5, 5, "1,23.56", "123.56"],
    [6, 6, "1,23456", "123456"],
    [7, 7, "1,234.6", "1234.6"],
    [0, 1, ",234.56", ",234.56"],
    [0, 2, "234.56", "234.56"],
    [0, 3, "34.56", "34.56"],
    [0, 4, "4.56", "4.56"],
    [0, 5, ".56", ".56"],
    [0, 6, "56", "56"],
    [0, 7, "6", "6"],
    [0, 8, "", ""],
    [1, 2, "1234.56", "1234.56"],
    [1, 3, "134.56", "134.56"],
    [1, 4, "14.56", "14.56"],
    [1, 5, "1.56", "1.56"],
    [1, 6, "156", "156"],
    [1, 7, "16", "16"],
    [1, 8, "1", "1"],
    [2, 3, "1,34.56", "134.56"],
    [2, 4, "1,4.56", "14.56"],
    [2, 5, "1,.56", "1,.56"],
    [2, 6, "1,56", "156"],
    [2, 7, "1,6", "16"],
    [2, 8, "1,", "1,"],
    [3, 4, "1,24.56", "124.56"],
    [3, 5, "1,2.56", "12.56"],
    [3, 6, "1,256", "1256"],
    [3, 7, "1,26", "126"],
    [3, 8, "1,2", "12"],
    [4, 5, "1,23.56", "123.56"],
    [4, 6, "1,2356", "12356"],
    [4, 7, "1,236", "1236"],
    [4, 8, "1,23", "123"],
    [5, 6, "1,23456", "123456"],
    [5, 7, "1,2346", "12346"],
    [5, 8, "1,234", "1234"],
    [6, 7, "1,234.6", "1234.6"],
    [6, 8, "1,234.", "1,234."],
    [7, 8, "1,234.5", "1234.5"],
  ])(
    "allows deletion of content using the backspace key for a selection starting at index %s and ending at index %s",
    async (selectionStart, selectionEnd, rawValue, sanitisedValue) => {
      const user = userEvent.setup();
      render(<Decimal defaultValue="1234.56" />);

      const decimalInput = screen.getByRole("textbox") as HTMLInputElement;
      act(() => {
        decimalInput.focus();
      });
      decimalInput.setSelectionRange(selectionStart, selectionEnd);
      await user.keyboard("{Backspace}");

      expect(decimalInput).toHaveValue(rawValue);
      expect(screen.getByTestId("hidden-input")).toHaveValue(sanitisedValue);
    },
  );

  // as above, a simple cursor placement (no selection) at the start or end need special handling
  it("doesn't delete anything when backspace is pressed with the cursor at the start of the input", async () => {
    const user = userEvent.setup();
    render(<Decimal defaultValue="1234.56" />);

    const decimalInput = screen.getByRole("textbox");
    act(() => {
      decimalInput.focus();
    });
    await user.keyboard("{ArrowLeft}");
    await user.keyboard("{Backspace}");

    expect(decimalInput).toHaveValue("1,234.56");
    expect(screen.getByTestId("hidden-input")).toHaveValue("1234.56");
  });

  it("allows deletion of the final character using the backspace key with the cursor at the end of the input", async () => {
    const user = userEvent.setup();
    render(<Decimal defaultValue="1234.56" />);

    const decimalInput = screen.getByRole("textbox");
    act(() => {
      decimalInput.focus();
    });
    await user.keyboard("{ArrowRight}");
    await user.keyboard("{Backspace}");

    expect(decimalInput).toHaveValue("1,234.5");
    expect(screen.getByTestId("hidden-input")).toHaveValue("1234.5");
  });

  it.each([
    [1, 1, "1234.56", "1234.56"],
    [2, 2, "1,34.56", "134.56"],
    [3, 3, "1,24.56", "124.56"],
    [4, 4, "1,23.56", "123.56"],
    [5, 5, "1,23456", "123456"],
    [6, 6, "1,234.6", "1234.6"],
    [7, 7, "1,234.5", "1234.5"],
    [0, 1, ",234.56", ",234.56"],
    [0, 2, "234.56", "234.56"],
    [0, 3, "34.56", "34.56"],
    [0, 4, "4.56", "4.56"],
    [0, 5, ".56", ".56"],
    [0, 6, "56", "56"],
    [0, 7, "6", "6"],
    [0, 8, "", ""],
    [1, 2, "1234.56", "1234.56"],
    [1, 3, "134.56", "134.56"],
    [1, 4, "14.56", "14.56"],
    [1, 5, "1.56", "1.56"],
    [1, 6, "156", "156"],
    [1, 7, "16", "16"],
    [1, 8, "1", "1"],
    [2, 3, "1,34.56", "134.56"],
    [2, 4, "1,4.56", "14.56"],
    [2, 5, "1,.56", "1,.56"],
    [2, 6, "1,56", "156"],
    [2, 7, "1,6", "16"],
    [2, 8, "1,", "1,"],
    [3, 4, "1,24.56", "124.56"],
    [3, 5, "1,2.56", "12.56"],
    [3, 6, "1,256", "1256"],
    [3, 7, "1,26", "126"],
    [3, 8, "1,2", "12"],
    [4, 5, "1,23.56", "123.56"],
    [4, 6, "1,2356", "12356"],
    [4, 7, "1,236", "1236"],
    [4, 8, "1,23", "123"],
    [5, 6, "1,23456", "123456"],
    [5, 7, "1,2346", "12346"],
    [5, 8, "1,234", "1234"],
    [6, 7, "1,234.6", "1234.6"],
    [6, 8, "1,234.", "1,234."],
    [7, 8, "1,234.5", "1234.5"],
  ])(
    "allows deletion of content using the delete key for a selection starting at index %s and ending at index %s",
    async (selectionStart, selectionEnd, rawValue, sanitisedValue) => {
      const user = userEvent.setup();
      render(<Decimal defaultValue="1234.56" />);

      const decimalInput = screen.getByRole("textbox") as HTMLInputElement;
      act(() => {
        decimalInput.focus();
      });
      decimalInput.setSelectionRange(selectionStart, selectionEnd);
      await user.keyboard("{Delete}");

      expect(decimalInput).toHaveValue(rawValue);
      expect(screen.getByTestId("hidden-input")).toHaveValue(sanitisedValue);
    },
  );

  // as above, a simple cursor placement (no selection) at the start or end need special handling
  it("deletes the first character when delete is pressed with the cursor at the start of the input", async () => {
    const user = userEvent.setup();
    render(<Decimal defaultValue="1234.56" />);

    const decimalInput = screen.getByRole("textbox");
    act(() => {
      decimalInput.focus();
    });
    await user.keyboard("{ArrowLeft}");
    await user.keyboard("{Delete}");

    expect(decimalInput).toHaveValue(",234.56");
    expect(screen.getByTestId("hidden-input")).toHaveValue(",234.56");
  });

  it("doesn't delete anything when delete is pressed with the cursor at the end of the input", async () => {
    const user = userEvent.setup();
    render(<Decimal defaultValue="1234.56" />);

    const decimalInput = screen.getByRole("textbox");
    act(() => {
      decimalInput.focus();
    });
    await user.keyboard("{ArrowRight}");
    await user.keyboard("{Delete}");

    expect(decimalInput).toHaveValue("1,234.56");
    expect(screen.getByTestId("hidden-input")).toHaveValue("1234.56");
  });

  it.each([",", ".", "£", "$", "%", "@", "!", "*", "#"])(
    "should not format multiple `%s` characters",
    async (char) => {
      const user = userEvent.setup();
      render(<Decimal />);

      const input = char.repeat(4);
      await user.type(screen.getByRole("textbox"), input);
      await user.tab();

      expect(screen.getByRole("textbox")).toHaveValue(input);
      expect(screen.getByTestId("hidden-input")).toHaveValue(input);
    },
  );

  it("calls the onKeyDown callback when a key is pressed", async () => {
    const user = userEvent.setup();
    const onKeyDown = jest.fn();
    render(<Decimal defaultValue="0.00" onKeyDown={onKeyDown} />);

    act(() => {
      screen.getByRole("textbox").focus();
    });
    await user.keyboard("{ArrowRight}");
    await user.keyboard("1");

    expect(onKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({ key: "1" }),
    );
  });

  it("has the correct data tag", () => {
    render(
      <Decimal data-role="test-data-role" data-element="test-data-element" />,
    );
    expect(screen.getByTestId("test-data-role")).toHaveAttribute(
      "data-component",
      "decimal",
    );
    expect(screen.getByTestId("test-data-role")).toHaveAttribute(
      "data-element",
      "test-data-element",
    );
  });

  it("adds the expected HTML attributes to the hidden input", async () => {
    const user = userEvent.setup();
    render(<Decimal name="example" />);

    await user.type(screen.getByRole("textbox"), "1.23");

    const hiddenInput = screen.getByTestId("hidden-input");
    expect(hiddenInput).toHaveAttribute("data-component", "hidden-input");
    expect(hiddenInput).toHaveAttribute("type", "hidden");
    expect(hiddenInput).toHaveValue("1.23");
    expect(hiddenInput).toHaveAttribute("name", "example");
  });

  it("does not fire onChange when the input blurs with no change in value", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Decimal allowEmptyValue onChange={onChange} />);

    act(() => {
      screen.getByRole("textbox").focus();
    });
    await user.tab();

    expect(onChange).not.toHaveBeenCalled();
  });

  it.each([
    ["1,1,1,1,1.1", "11,111.10", "11111.1"],
    ["1,1,1222,12,1.1", "111,222,121.10", "111222121.1"],
    ["1,,1,,1", "1,,1,,1", "1,,1,,1"],
  ])(
    "formats %s to %s and rawValue %s when the `en` locale is set",
    async (input, formatted, rawValue) => {
      const user = userEvent.setup();
      const onBlur = jest.fn();
      render(<Decimal locale="en" onBlur={onBlur} />);

      await user.type(screen.getByRole("textbox"), input);
      await user.tab();

      expect(screen.getByRole("textbox")).toHaveValue(formatted);
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: formatted,
              rawValue,
            },
          },
        }),
      );
    },
  );

  it.each([
    ["1000.23", "1000,23"],
    ["10000.00", "10.000,00"],
    ["10000.23", "10.000,23"],
    ["100000.00", "100.000,00"],
    ["1000000.00", "1.000.000,00"],
  ])(
    "formats %s to %s when provided as the defaultValue prop and the `es-ES` locale is set",
    async (input, formatted) => {
      render(<Decimal locale="es-ES" defaultValue={input} />);

      expect(screen.getByRole("textbox")).toHaveValue(formatted);
      expect(screen.getByTestId("hidden-input")).toHaveValue(input);
    },
  );

  it.each([
    ["1.1.1.1.1.1,1", "111.111,10", "111111.1"],
    ["2.123", "2123,00", "2123"],
    ["21.21.111.1,013", "21.211.111,013", "21211111.013"],
    ["2.,12.,1", "2.,12.,1", "2.,12.,1"],
    ["100", "100,00", "100"],
    ["1000", "1000,00", "1000"],
    ["1000,23", "1000,23", "1000.23"],
    ["10000", "10.000,00", "10000"],
    ["10000,23", "10.000,23", "10000.23"],
    ["100000", "100.000,00", "100000"],
    ["1000000", "1.000.000,00", "1000000"],
  ])(
    "formats %s to %s and rawValue %s when the `es-ES` locale is set",
    async (input, formatted, rawValue) => {
      const user = userEvent.setup();
      const onBlur = jest.fn();
      render(<Decimal locale="es-ES" onBlur={onBlur} />);

      await user.type(screen.getByRole("textbox"), input);
      await user.tab();

      expect(screen.getByRole("textbox")).toHaveValue(formatted);
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: formatted,
              rawValue,
            },
          },
        }),
      );
    },
  );

  it("formats an empty value correctly when precision is 0, allowEmptyValue is false, and the `es-ES` locale is set", async () => {
    const user = userEvent.setup();
    render(
      <Decimal
        precision={0}
        defaultValue="123.45"
        allowEmptyValue={false}
        locale="es-ES"
      />,
    );

    act(() => {
      screen.getByRole("textbox").focus();
    });
    await user.keyboard("{Delete}");
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveValue("0");
    expect(screen.getByTestId("hidden-input")).toHaveValue("0");
  });

  it("formats an empty value correctly when precision is 1, allowEmptyValue is false, and the `es-ES` locale is set", async () => {
    const user = userEvent.setup();
    render(
      <Decimal
        precision={1}
        defaultValue="123.45"
        allowEmptyValue={false}
        locale="es-ES"
      />,
    );

    act(() => {
      screen.getByRole("textbox").focus();
    });
    await user.keyboard("{Delete}");
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveValue("0,0");
    expect(screen.getByTestId("hidden-input")).toHaveValue("0.0");
  });

  it.each([
    ["1000.23", "1000,23"],
    ["10000.00", "10\xa0000,00"],
    ["10000.23", "10\xa0000,23"],
    ["100000.00", "100\xa0000,00"],
    ["1000000.00", "1\xa0000\xa0000,00"],
  ])(
    "formats %s to %s when provided as the defaultValue prop and the `pt-PT` locale is set",
    async (input, formatted) => {
      render(<Decimal locale="pt-PT" defaultValue={input} />);

      expect(screen.getByRole("textbox")).toHaveValue(formatted);
      expect(screen.getByTestId("hidden-input")).toHaveValue(input);
    },
  );

  it.each([
    ["1111,2", "1111,20", "1111.2"],
    ["100", "100,00", "100"],
    ["1000", "1000,00", "1000"],
    ["1000.23", "1000,23", "1000.23"],
    ["10000", "10\xa0000,00", "10000"],
    ["10000.23", "10\xa0000,23", "10000.23"],
    ["100000", "100\xa0000,00", "100000"],
    ["1000000", "1\xa0000\xa0000,00", "1000000"],
  ])(
    "formats %s to %s and rawValue %s when the `pt-PT` locale is set",
    async (input, formatted, rawValue) => {
      const user = userEvent.setup();
      const onBlur = jest.fn();
      render(<Decimal locale="pt-PT" onBlur={onBlur} />);

      await user.type(screen.getByRole("textbox"), input);
      await user.tab();

      expect(screen.getByRole("textbox")).toHaveValue(formatted);
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: formatted,
              rawValue,
            },
          },
        }),
      );
    },
  );

  it("correctly handles a value that has white-spaces when the `pt-PT` locale is set", async () => {
    const user = userEvent.setup();
    render(<Decimal locale="pt-PT" />);

    await user.type(screen.getByRole("textbox"), "10 000,00");
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveValue("10\xa0000,00");
    expect(screen.getByTestId("hidden-input")).toHaveValue("10000.00");
  });

  it("correctly handles a value that has white-spaces in the wrong place when the `pt-PT` locale is set", async () => {
    const user = userEvent.setup();
    render(<Decimal locale="pt-PT" />);

    await user.type(screen.getByRole("textbox"), "1 0000,00");
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveValue("10\xa0000,00");
    expect(screen.getByTestId("hidden-input")).toHaveValue("10000.00");
  });

  it("correctly handles a value that has multiple white-spaces when the `pt-PT` locale is set", async () => {
    const user = userEvent.setup();
    render(<Decimal locale="pt-PT" />);

    await user.type(screen.getByRole("textbox"), "1  0000,00");
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveValue("1  0000,00");
    expect(screen.getByTestId("hidden-input")).toHaveValue("1  0000,00");
  });

  it("correctly handles a value that has multiple groups with white-spaces when the `pt-PT` locale is set", async () => {
    const user = userEvent.setup();
    render(<Decimal locale="pt-PT" />);

    await user.type(screen.getByRole("textbox"), "1 0000 000,00");
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveValue("10\xa0000\xa0000,00");
    expect(screen.getByTestId("hidden-input")).toHaveValue("10000000.00");
  });

  it("formats an empty value correctly when precision is 0, allowEmptyValue is false, and the `pt-PT` locale is set", async () => {
    const user = userEvent.setup();
    render(
      <Decimal
        precision={0}
        defaultValue="123.45"
        allowEmptyValue={false}
        locale="pt-PT"
      />,
    );

    act(() => {
      screen.getByRole("textbox").focus();
    });
    await user.keyboard("{Delete}");
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveValue("0");
    expect(screen.getByTestId("hidden-input")).toHaveValue("0");
  });

  it("formats an empty value correctly when precision is 1, allowEmptyValue is false, and the `pt-PT` locale is set", async () => {
    const user = userEvent.setup();
    render(
      <Decimal
        precision={1}
        defaultValue="123.45"
        allowEmptyValue={false}
        locale="pt-PT"
      />,
    );

    act(() => {
      screen.getByRole("textbox").focus();
    });
    await user.keyboard("{Delete}");
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveValue("0,0");
    expect(screen.getByTestId("hidden-input")).toHaveValue("0.0");
  });

  it("formats %s to %s and rawValue %s when the `fr` locale is set", async () => {
    const user = userEvent.setup();
    const onBlur = jest.fn();
    render(<Decimal locale="fr" onBlur={onBlur} />);

    await user.type(screen.getByRole("textbox"), "11111,25");
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveValue("11 111,25");
    expect(onBlur).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          value: {
            formattedValue: "11 111,25",
            rawValue: "11111.25",
          },
        },
      }),
    );
  });

  it("formats an empty value correctly when precision is 0, allowEmptyValue is false, and the `fr` locale is set", async () => {
    const user = userEvent.setup();
    render(
      <Decimal
        precision={0}
        defaultValue="123.45"
        allowEmptyValue={false}
        locale="fr"
      />,
    );

    act(() => {
      screen.getByRole("textbox").focus();
    });
    await user.keyboard("{Delete}");
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveValue("0");
    expect(screen.getByTestId("hidden-input")).toHaveValue("0");
  });

  it("formats an empty value correctly when precision is 1, allowEmptyValue is false, and the `fr` locale is set", async () => {
    const user = userEvent.setup();
    render(
      <Decimal
        precision={1}
        defaultValue="123.45"
        allowEmptyValue={false}
        locale="fr"
      />,
    );

    act(() => {
      screen.getByRole("textbox").focus();
    });
    await user.keyboard("{Delete}");
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveValue("0,0");
    expect(screen.getByTestId("hidden-input")).toHaveValue("0.0");
  });

  it("has a defaultValue of 0,00 when the `it` locale is set", () => {
    render(<Decimal locale="it" />);

    expect(screen.getByRole("textbox")).toHaveValue("0,00");
    expect(screen.getByTestId("hidden-input")).toHaveValue("0.00");
  });

  it("formats the defaultValue prop correctly when the `it` locale is set", () => {
    render(<Decimal defaultValue="12345.67" locale="it" />);

    expect(screen.getByRole("textbox")).toHaveValue("12.345,67");
    expect(screen.getByTestId("hidden-input")).toHaveValue("12345.67");
  });

  it("formats a user-entered value correctly when the `it` locale is set", async () => {
    const user = userEvent.setup();
    render(<Decimal locale="it" />);

    await user.type(screen.getByRole("textbox"), "1234576");
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveValue("1.234.576,00");
    expect(screen.getByTestId("hidden-input")).toHaveValue("1234576.00");
  });

  it("formats a value correctly when it has an extra separator and the `it` locale is set", async () => {
    const user = userEvent.setup();
    render(<Decimal locale="it" />);

    await user.type(screen.getByRole("textbox"), "1.2.34576,00");
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveValue("1.234.576,00");
    expect(screen.getByTestId("hidden-input")).toHaveValue("1234576.00");
  });

  it("fixes incorrectly placed delimiters when the `it` locale is set", async () => {
    const user = userEvent.setup();
    render(<Decimal locale="it" />);

    await user.type(screen.getByRole("textbox"), "1.1");
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveValue("11,00");
    expect(screen.getByTestId("hidden-input")).toHaveValue("11.00");
  });

  it("renders a negative value with correct formatting when the `it` locale is set", () => {
    render(<Decimal defaultValue="-1234.56" locale="it" />);

    const formatter = new Intl.NumberFormat("it", { minimumFractionDigits: 2 });
    const formatted = formatter.format(-1234.56);

    expect(screen.getByRole("textbox")).toHaveValue(formatted);
    expect(screen.getByTestId("hidden-input")).toHaveValue("-1234.56");
  });

  it("formats an empty value correctly when precision is 0, allowEmptyValue is false and the `it` locale is set", async () => {
    const user = userEvent.setup();
    render(
      <Decimal
        precision={0}
        defaultValue="123.45"
        allowEmptyValue={false}
        locale="it"
      />,
    );

    act(() => {
      screen.getByRole("textbox").focus();
    });
    await user.keyboard("{Delete}");
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveValue("0");
    expect(screen.getByTestId("hidden-input")).toHaveValue("0");
  });

  it("formats an empty value correctly when precision is 1, allowEmptyValue is false, and the `it` locale is set", async () => {
    const user = userEvent.setup();
    render(
      <Decimal
        precision={1}
        defaultValue="123.45"
        allowEmptyValue={false}
        locale="it"
      />,
    );

    act(() => {
      screen.getByRole("textbox").focus();
    });
    await user.keyboard("{Delete}");
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveValue("0,0");
    expect(screen.getByTestId("hidden-input")).toHaveValue("0.0");
  });
});

describe("when the component is controlled", () => {
  it.each([
    ["123", "123.00"],
    ["456", "456.00"],
    ["", ""],
  ])("renders the value prop %s in the input", (rawValue, formattedValue) => {
    render(<Decimal value={rawValue} />);

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
});

describe("refs", () => {
  it("accepts ref as a ref object", () => {
    const ref = { current: null };
    render(<Decimal ref={ref} />);

    expect(ref.current).toBe(screen.getByRole("textbox"));
  });

  it("accepts ref as a ref callback", () => {
    const ref = jest.fn();
    render(<Decimal ref={ref} />);

    expect(ref).toHaveBeenCalledWith(screen.getByRole("textbox"));
  });

  it("sets ref to empty after unmount", () => {
    const ref = { current: null };
    const { unmount } = render(<Decimal ref={ref} />);

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
      <Decimal />
    </I18nProvider>,
  );
  expect(screen.getByRole("textbox")).toHaveValue("0,00");

  rerender(
    <I18nProvider
      locale={{
        locale: () => "en-GB",
      }}
    >
      <Decimal />
    </I18nProvider>,
  );
  act(() => {
    screen.getByRole("textbox").focus();
  });
  await user.tab();
  expect(screen.getByRole("textbox")).toHaveValue("0.00");
});

test("the `id` prop is passed to the input element", () => {
  render(<Decimal id="decimalId" />);

  expect(screen.getByRole("textbox")).toHaveAttribute("id", "decimalId");
});

test("no error message is triggered if the `precision` prop is not specified", () => {
  const consoleSpy = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => {});

  render(<Decimal defaultValue="12345.654" />);
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

test("the `required` prop is passed to the visible input", () => {
  render(<Decimal label="required" required />);

  expect(screen.getByRole("textbox")).toBeRequired();
});

test("the `required` prop is not passed to the hidden input", () => {
  render(<Decimal label="required" required />);

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
