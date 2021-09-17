import React from "react";
import ReactDOM from "react-dom";
import { mount as enzymeMount } from "enzyme";

import Decimal from "./decimal.component";
import { testStyledSystemMargin } from "../../__spec_helper__/test-utils";
import Textbox from "../textbox/textbox.component";
import Label from "../../__internal__/label";
import FormFieldStyle from "../../__internal__/form-field/form-field.style";
import I18nProvider from "../i18n-provider";

// These have been written in a way that we can change our testing library or component implementation with relative
// ease without having to touch the tests.
// Note that we're asserting e.preventDefault has been called in may places, but we're simulating from the rendered
// input, not calling the prop directly, this is important. By mounting we can make these assertions with
// confidence that the `onChange` will not be dispatched if e.preventDefault has been called

let wrapper;
let container;
const onChange = jest.fn();

const mount = (jsx) => {
  wrapper = enzymeMount(jsx, { attachTo: container });
};

const DOM = (jsx) => {
  ReactDOM.render(jsx, container);
};

function render(props = {}, renderer = mount) {
  const defaultProps = {
    onChange,
    ...props,
  };

  renderer(<Decimal precision={2} {...defaultProps} />);
}

describe("Decimal", () => {
  function setProps(obj) {
    wrapper.setProps(obj);
    wrapper.update();
  }

  function getElements() {
    const cw = wrapper;
    if (cw) {
      const textbox = cw.find(Textbox);
      return {
        input: textbox.find("input"),
        textbox,
        hiddenInput: wrapper.find("input").at(1),
      };
    }
    throw new Error("No wrapper found");
  }

  const value = () => {
    const { textbox } = getElements();
    return textbox.prop("value");
  };

  const hiddenValue = () => {
    const { hiddenInput } = getElements();
    return hiddenInput.prop("value");
  };

  const checkWhere = (where) => {
    const without = where.replace(/\|/g, "");
    if (without !== value()) {
      throw new Error(
        `Testing error: where (${without}) does not match the current value (${value()})`
      );
    }
  };

  const type = (typedValue) => {
    // This function does not trigger the onblur, so the number will not be auto formatted
    const { input } = getElements();
    input.simulate("change", { target: { value: typedValue } });
  };

  const blur = () => {
    const { input } = getElements();
    input.simulate("blur");
  };

  const press = (obj, where, method = "keyPress") => {
    checkWhere(where);

    const preventDefault = jest.fn();
    const selectionStart = where.indexOf("|");
    const lastIndex = where.lastIndexOf("|");
    const selectionEnd =
      lastIndex === selectionStart ? lastIndex : lastIndex - 1;
    const { input } = getElements();
    input.simulate(method, {
      ...obj,
      preventDefault,
      target: { selectionStart, selectionEnd, value: value() },
    });
    return { preventDefault };
  };

  function ClipboardData(obj) {
    this.data = { ...obj };
  }

  ClipboardData.prototype.getData = function (dataType) {
    return this.data[dataType];
  };

  const paste = (obj, where) => {
    const clipboardData = new ClipboardData({ "text/plain": obj.key });
    return press({ clipboardData }, where, "paste");
  };

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    onChange.mockReset();
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  testStyledSystemMargin(
    (props) => <Decimal precision={2} {...props} />,
    undefined,
    (component) => component.find(FormFieldStyle),
    { modifier: "&&&" }
  );

  it("renders in ReactDOM", () => {
    render(null, DOM);
  });

  describe("Uncontrolled", () => {
    it("has a defaultValue of 0.00", () => {
      render();
      expect(value()).toBe("0.00");
      expect(hiddenValue()).toBe("0.00");
    });

    it("allows the defaultValue to be defined", () => {
      render({ defaultValue: "12345.67" });
      expect(value()).toBe("12,345.67");
      expect(hiddenValue()).toBe("12345.67");
    });

    it("renders a negative value", () => {
      render({ defaultValue: "-1234.56" });
      expect(value()).toBe("-1,234.56");
      expect(hiddenValue()).toBe("-1234.56");
      expect(hiddenValue()).toBe("-1234.56");
    });

    it("fixes incorrectly placed delimiters", () => {
      const onBlur = jest.fn();
      render({ onBlur, defaultValue: "0.00" });
      type("1,1");
      blur();
      expect(value()).toBe("11.00");
      expect(hiddenValue()).toBe("11.00");
    });

    it("formats a value correctly (extra separator)", () => {
      render();
      type("1,2,34576.00");
      blur();
      expect(value()).toBe("1,234,576.00");
      expect(hiddenValue()).toBe("1234576.00");
    });

    it("does not format a value with numbers, letters and too many separators", () => {
      render();
      type("123a,123a,123a");
      blur();
      expect(value()).toBe("123a,123a,123a");
      expect(hiddenValue()).toBe("123a,123a,123a");
    });

    it("does not format a value with numbers, letters, too many separators that end with a separator", () => {
      render();
      type("123a,123a,123a,");
      blur();
      expect(value()).toBe("123a,123a,123a,");
      expect(hiddenValue()).toBe("123a,123a,123a,");
    });

    it.each([
      ["0.00", {}],
      ["", { allowEmptyValue: true }],
    ])(
      "entering a negative sign and blurring should not revert to the defaultValue (%s)",
      (expectedValue, props) => {
        const onBlur = jest.fn();
        render({ onBlur, defaultValue: "-1234.56", ...props });
        type("-");
        blur();
        expect(value()).toBe("-");
        expect(hiddenValue()).toBe("-");
        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: {
              value: {
                formattedValue: "-",
                rawValue: "-",
              },
            },
          })
        );
        expect(onBlur).toHaveBeenCalledWith(
          expect.objectContaining({
            target: {
              value: {
                formattedValue: "-",
                rawValue: "-",
              },
            },
          })
        );
      }
    );

    describe("precision", () => {
      it("supports having a precision of 0", () => {
        render({ defaultValue: "12345.65", precision: 0 });
        expect(value()).toBe("12,345.65");
        expect(hiddenValue()).toBe("12345.65");
      });

      it("precision is not lost if the defaultValue has more precision", () => {
        render({ defaultValue: "12345.655", precision: 2 });
        expect(value()).toBe("12,345.655");
        expect(hiddenValue()).toBe("12345.655");
      });

      it("supports having a bigger precision than default", () => {
        render({ defaultValue: "12345.654", precision: 3 });
        expect(value()).toBe("12,345.654");
        expect(hiddenValue()).toBe("12345.654");
      });

      it("triggers an error message if the precision value is greater than 15", () => {
        jest.spyOn(global.console, "error").mockImplementation(() => {});
        mount(<Decimal defaultValue="12345.654" precision={16} />);
        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalledWith(
          "Warning: Failed prop type: Precision prop must be a number greater than 0 or equal to or less than 15.\n    in Decimal"
        );
        global.console.error.mockReset();
      });

      it.each([
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
        "setting precision to (%s) formats value correctly",
        (precisionValue, decimalValue) => {
          render({ defaultValue: decimalValue, precision: precisionValue });
          expect(value()).toBe(decimalValue);
          expect(hiddenValue()).toBe(decimalValue);
        }
      );
    });

    it("concatenates a 0 to the value if the value doesn't meet the precision", () => {
      render({ defaultValue: "12345", precision: 1 });
      expect(value()).toBe("12,345.0");
      expect(hiddenValue()).toBe("12345.0");
    });

    it("calls onChange when the user enters a value", () => {
      render();
      type("12345.56");
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: "12,345.56",
              rawValue: "12345.56",
            },
          },
        })
      );
    });

    it("calls onBlur when the field loses focus", () => {
      const onBlur = jest.fn();
      render({ onBlur });
      type("12345.56");
      blur();
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: "12,345.56",
              rawValue: "12345.56",
            },
          },
        })
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
    ])("allows the user to paste (%s)", (key) => {
      render();

      const { preventDefault } = paste({ key }, "0|.00");
      expect(preventDefault).not.toHaveBeenCalled();
      type(key);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: key,
              rawValue: key,
            },
          },
        })
      );
    });

    it.each(["0|.00", "0.|00", "0.0|0", "0.00|"])(
      "allows the user to type the negative symbol within the number (%s)",
      (where) => {
        render();

        const { preventDefault } = press({ key: "-" }, where);
        expect(preventDefault).not.toHaveBeenCalled();
      }
    );

    it("allows the user to type a negative symbol at the start of the number", () => {
      render();

      const { preventDefault } = press({ key: "-" }, "|0.00");
      expect(preventDefault).not.toHaveBeenCalled();
    });

    it("allows the user to interact with the page with control commands", () => {
      render();
      const { preventDefault } = press({ key: "r", ctrlKey: true }, "0.00|");
      expect(preventDefault).not.toHaveBeenCalled();
    });

    it("allows the user to interact with the page with control commands (safari)", () => {
      render();
      const { preventDefault } = press({ key: "r", metaKey: true }, "0.00|");
      expect(preventDefault).not.toHaveBeenCalled();
    });

    describe.each(["Backspace", "Delete"])(
      "allows the user to delete part of the decimal (%s)",
      (key) => {
        it.each([
          "|1,234.56",
          "1|,234.56",
          "1,|234.56",
          "1,2|34.56",
          "1,23|4.56",
          "1,234|.56",
          "1,234.|56",
          "1,234.5|6",
          "1,234.56|",
          "|1|,234.56",
          "|1,|234.56",
          "|1,2|34.56",
          "|1,23|4.56",
          "|1,234|.56",
          "|1,234.|56",
          "|1,234.5|6",
          "|1,234.56|",
          "1|,|234.56",
          "1|,2|34.56",
          "1|,23|4.56",
          "1|,234|.56",
          "1|,234.|56",
          "1|,234.5|6",
          "1|,234.56|",
          "1,|2|34.56",
          "1,|23|4.56",
          "1,|234|.56",
          "1,|234.|56",
          "1,|234.5|6",
          "1,|234.56|",
          "1,2|3|4.56",
          "1,2|34|.56",
          "1,2|34.|56",
          "1,2|34.5|6",
          "1,2|34.56|",
          "1,23|4|.56",
          "1,23|4.|56",
          "1,23|4.5|6",
          "1,23|4.56|",
          "1,234|.|56",
          "1,234|.5|6",
          "1,234|.56|",
          "1,234.|5|6",
          "1,234.|56|",
          "1,234.5|6|",
          "|1,234.56|",
        ])("%s", (where) => {
          render({ defaultValue: "1234.56" });
          const { preventDefault } = press({ key }, where);
          expect(preventDefault).not.toHaveBeenCalled();
        });
      }
    );

    describe("i18n", () => {
      describe("en", () => {
        const enProps = { locale: "en" };
        it.each([
          ["1,1,1,1,1.1", "11,111.10", "11111.1"],
          ["1,1,1222,12,1.1", "111,222,121.10", "111222121.1"],
          ["1,,1,,1", "1,,1,,1", "1,,1,,1"],
        ])("format %s to %s and rawValue %s", (input, formatted, rawValue) => {
          const onBlur = jest.fn();
          render({ onBlur, ...enProps });
          type(input);
          blur();
          expect(onBlur).toHaveBeenCalledWith(
            expect.objectContaining({
              target: {
                value: {
                  formattedValue: formatted,
                  rawValue,
                },
              },
            })
          );
        });
      });

      describe("es", () => {
        const esProps = { locale: "es-ES" };

        it.each([
          ["1000.23", "1000,23"],
          ["10000.00", "10.000,00"],
          ["10000.23", "10.000,23"],
          ["100000.00", "100.000,00"],
          ["1000000.00", "1.000.000,00"],
        ])("format %s to %s", (input, formatted) => {
          render({ value: input, ...esProps });
          expect(value()).toBe(formatted);
          expect(hiddenValue()).toBe(input);
        });

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
        ])("format %s to %s and rawValue %s", (input, formatted, rawValue) => {
          const onBlur = jest.fn();
          render({ onBlur, ...esProps });
          type(input);
          blur();
          expect(onBlur).toHaveBeenCalledWith(
            expect.objectContaining({
              target: {
                value: {
                  formattedValue: formatted,
                  rawValue,
                },
              },
            })
          );
        });
      });

      describe("pt", () => {
        const ptProps = { locale: "pt-PT" };

        it.each([
          ["1000.23", "1000,23"],
          ["10000.00", "10\xa0000,00"],
          ["10000.23", "10\xa0000,23"],
          ["100000.00", "100\xa0000,00"],
          ["1000000.00", "1\xa0000\xa0000,00"],
        ])("format %s to %s", (a, b) => {
          render({ value: a, ...ptProps });
          expect(value()).toBe(b);
          expect(hiddenValue()).toBe(a);
        });

        it.each([
          ["1111,2", "1111,20", "1111.2"],
          ["100", "100,00", "100"],
          ["1000", "1000,00", "1000"],
          ["1000.23", "1000,23", "1000.23"],
          ["10000", "10\xa0000,00", "10000"],
          ["10000.23", "10\xa0000,23", "10000.23"],
          ["100000", "100\xa0000,00", "100000"],
          ["1000000", "1\xa0000\xa0000,00", "1000000"],
        ])("format %s to %s and rawValue %s", (input, formatted, rawValue) => {
          const onBlur = jest.fn();
          render({ onBlur, ...ptProps });
          type(input);
          blur();
          expect(onBlur).toHaveBeenCalledWith(
            expect.objectContaining({
              target: {
                value: {
                  formattedValue: formatted,
                  rawValue,
                },
              },
            })
          );
        });

        it("handles a value that has white-spaces", () => {
          render({ ...ptProps });
          type("10 000,00");
          blur();
          expect(value()).toBe("10\xa0000,00");
          expect(hiddenValue()).toBe("10000.00");
        });

        it("handles a value that has white-spaces in wrong place", () => {
          render({ ...ptProps });
          type("1 0000,00");
          blur();
          expect(value()).toBe("10\xa0000,00");
          expect(hiddenValue()).toBe("10000.00");
        });

        it("handles a value that has multiple white-spaces", () => {
          render({ ...ptProps });
          type("1  0000,00");
          blur();
          expect(value()).toBe("1  0000,00");
          expect(hiddenValue()).toBe("1  0000,00");
        });

        it("handles a value that has multiple groups with white-spaces", () => {
          render({ ...ptProps });
          type("1 0000 000,00");
          blur();
          expect(value()).toBe("10\xa0000\xa0000,00");
          expect(hiddenValue()).toBe("10000000.00");
        });
      });

      describe("fr", () => {
        const frProps = { locale: "fr" };
        it.each([["11111,25", "11 111,25", "11111.25"]])(
          "format %s to %s and rawValue %s",
          (input, formatted, rawValue) => {
            const onBlur = jest.fn();
            render({ onBlur, ...frProps });
            type(input);
            blur();
            expect(onBlur).toHaveBeenCalled();
            expect(onBlur).toHaveBeenCalledWith(
              expect.objectContaining({
                target: {
                  id: undefined,
                  name: undefined,
                  value: {
                    formattedValue: formatted,
                    rawValue,
                  },
                },
              })
            );
          }
        );
      });

      describe("it", () => {
        const itProps = { locale: "it" };

        it("has a defaultValue of 0,00", () => {
          render({ ...itProps });
          expect(value()).toBe("0,00");
          expect(hiddenValue()).toBe("0.00");
        });

        it("allows the defaultValue to be defined", () => {
          render({ defaultValue: "12345.67", ...itProps });
          expect(value()).toBe("12.345,67");
          expect(hiddenValue()).toBe("12345.67");
        });

        it("formats a value correctly", () => {
          render({ ...itProps });
          type("1234576");
          blur();
          expect(value()).toBe("1.234.576,00");
          expect(hiddenValue()).toBe("1234576.00");
        });

        it("formats a value correctly (extra separator)", () => {
          render({ ...itProps });
          type("1.2.34576,00");
          blur();
          expect(value()).toBe("1.234.576,00");
          expect(hiddenValue()).toBe("1234576.00");
        });

        it("fixes incorrectly placed delimiters", () => {
          const onBlur = jest.fn();
          render({ onBlur, defaultValue: "0.00", ...itProps });
          type("1.1");
          blur();
          expect(value()).toBe("11,00");
          expect(hiddenValue()).toBe("11.00");
        });

        it("renders a negative value", () => {
          render({ defaultValue: "-1234.56", ...itProps });
          expect(value()).toBe("-1.234,56");
          expect(hiddenValue()).toBe("-1234.56");
        });
        describe("precision", () => {
          it("fires a console error when precision is changed once component is loaded.", () => {
            jest.spyOn(global.console, "error").mockImplementation(() => {});
            render({ defaultValue: "12345", precision: 2, ...itProps });
            setProps({ precision: 1 });
            expect(console.error).toHaveBeenCalledWith(
              "Decimal `precision` prop has changed value. Changing the Decimal `precision` prop has no effect."
            );
          });

          it("supports a precision of 0", () => {
            render({ defaultValue: "12345", precision: 0, ...itProps });
            expect(value()).toBe("12.345");
            expect(hiddenValue()).toBe("12345");
          });

          it("supports having a bigger precision", () => {
            render({ defaultValue: "12345.654", precision: 3, ...itProps });
            expect(value()).toBe("12.345,654");
            expect(hiddenValue()).toBe("12345.654");
          });

          it("has a default precision of 2 and does not round", () => {
            const onBlur = jest.fn();
            render({ onBlur, ...itProps });
            type("12345,566");
            blur();
            expect(onBlur).toHaveBeenCalledWith(
              expect.objectContaining({
                target: {
                  value: {
                    formattedValue: "12.345,566",
                    rawValue: "12345.566",
                  },
                },
              })
            );
          });

          it("adds additional zeros if required", () => {
            const onBlur = jest.fn();
            render({
              onBlur,
              precision: 4,
              ...itProps,
            });
            type("12345,56");
            blur();
            expect(value()).toBe("12.345,5600");
            expect(hiddenValue()).toBe("12345.5600");
          });

          it("does not format a value with numbers and too many delimiters", () => {
            const onBlur = jest.fn();
            render({
              onBlur,
              precision: 4,
              ...itProps,
            });
            type("123..45,56");
            blur();
            expect(value()).toBe("123..45,56");
            expect(hiddenValue()).toBe("123..45,56");
          });

          it("does not format a value with numbers and too many separators", () => {
            const onBlur = jest.fn();
            render({
              onBlur,
              precision: 4,
              ...itProps,
            });
            type("1,,2345,56");
            blur();
            expect(value()).toBe("1,,2345,56");
            expect(hiddenValue()).toBe("1,,2345,56");
          });

          it("supports having a shorter number", () => {
            render({ defaultValue: "12345.6", precision: 3, ...itProps });
            expect(value()).toBe("12.345,600");
            expect(hiddenValue()).toBe("12345.600");
          });

          it("supports having a longer number on default", () => {
            render({ defaultValue: "123123.99999", precision: 3, ...itProps });
            expect(value()).toBe("123.123,99999");
            expect(hiddenValue()).toBe("123123.99999");
          });

          it("supports having a longer number on change", () => {
            render({ value: "123123.99999", precision: 3, ...itProps });
            expect(value()).toBe("123.123,99999");
            expect(hiddenValue()).toBe("123123.99999");
          });
        });

        it("calls onChange when the user enters a value", () => {
          render({ defaultValue: "0.05", ...itProps });
          type("12345,56");
          expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({
              target: {
                value: {
                  formattedValue: "12.345,56",
                  rawValue: "12345.56",
                },
              },
            })
          );
        });

        it("calls onBlur when the field loses focus", () => {
          const onBlur = jest.fn();
          render({ onBlur, ...itProps });
          type("12345,56");
          blur();
          expect(onBlur).toHaveBeenCalledWith(
            expect.objectContaining({
              target: {
                value: {
                  formattedValue: "12.345,56",
                  rawValue: "12345.56",
                },
              },
            })
          );
        });

        describe.each(["Backspace", "Delete"])(
          "allows the user to delete part of the decimal (%s)",
          (key) => {
            it.each([
              "|1.234,56",
              "1|.234,56",
              "1.|234,56",
              "1.2|34,56",
              "1.23|4,56",
              "1.234|,56",
              "1.234,|56",
              "1.234,5|6",
              "1.234,56|",
              "|1|.234,56",
              "|1.|234,56",
              "|1.2|34,56",
              "|1.23|4,56",
              "|1.234|,56",
              "|1.234,|56",
              "|1.234,5|6",
              "|1.234,56|",
              "1|.|234,56",
              "1|.2|34,56",
              "1|.23|4,56",
              "1|.234|,56",
              "1|.234,|56",
              "1|.234,5|6",
              "1|.234,56|",
              "1.|2|34,56",
              "1.|23|4,56",
              "1.|234|,56",
              "1.|234,|56",
              "1.|234,5|6",
              "1.|234,56|",
              "1.2|3|4,56",
              "1.2|34|,56",
              "1.2|34,|56",
              "1.2|34,5|6",
              "1.2|34,56|",
              "1.23|4|,56",
              "1.23|4,|56",
              "1.23|4,5|6",
              "1.23|4,56|",
              "1.234|,|56",
              "1.234|,5|6",
              "1.234|,56|",
              "1.234,|5|6",
              "1.234,|56|",
              "1.234,5|6|",
              "|1.234,56|",
            ])("%s", (where) => {
              render({ defaultValue: "1234.56", ...itProps });
              const { preventDefault } = press({ key }, where);
              expect(preventDefault).not.toHaveBeenCalled();
            });
          }
        );

        it.each([
          ["0,00", "0.00", {}],
          ["", "", { allowEmptyValue: true }],
        ])(
          "entering a negative sign and blurring should revert to the defaultValue (%s)",
          (formattedValue, rawValue, props) => {
            const onBlur = jest.fn();
            render({
              onBlur,
              defaultValue: "-1234.56",
              ...props,
              ...itProps,
            });
            type("-");
            blur();
            expect(value()).toBe("-");
            expect(hiddenValue()).toBe("-");
            expect(onChange).toHaveBeenCalledWith(
              expect.objectContaining({
                target: {
                  value: {
                    formattedValue: "-",
                    rawValue: "-",
                  },
                },
              })
            );
            expect(onChange).toHaveBeenCalledWith(
              expect.objectContaining({
                target: {
                  value: {
                    formattedValue: "-",
                    rawValue: "-",
                  },
                },
              })
            );
            expect(onBlur).toHaveBeenCalledWith(
              expect.objectContaining({
                target: {
                  value: {
                    formattedValue: "-",
                    rawValue: "-",
                  },
                },
              })
            );
          }
        );
      });
    });

    it.each([
      ",,,,",
      "....",
      "££££",
      "$$$$",
      "%%%%",
      "@@@@",
      "!!!!",
      "****",
      "####",
    ])("should not format multiple %s characters", (char) => {
      const onBlur = jest.fn();
      render({ onBlur });
      type(char);
      blur();
      expect(value()).toBe(char);
      expect(hiddenValue()).toBe(char);
    });

    it("calls the onKeyPress callback", () => {
      const onKeyPress = jest.fn();

      render({ onKeyPress });
      press({ key: "1" }, "0.00|");
      expect(onKeyPress).toHaveBeenCalledWith(
        expect.objectContaining({ key: "1" })
      );
    });

    it("has the correct automation selectors", () => {
      render();
      expect(
        wrapper.find(Textbox).getDOMNode().getAttribute("data-component")
      ).toBe("decimal");
    });

    it("works as a form-data component", () => {
      render({ onChange: undefined, name: "example" });
      type("1.23");
      const { hiddenInput } = getElements();
      const html = hiddenInput.getDOMNode();
      expect(html.getAttribute("data-component")).toBe("hidden-input");
      expect(html.getAttribute("type")).toBe("hidden");
      expect(html.getAttribute("value")).toBe("1.23");
      expect(html.getAttribute("name")).toBe("example");
    });

    it("fires onChange when blurring only if the value has changed", () => {
      render({ allowEmptyValue: true });
      blur();
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("Controlled", () => {
    it("can be controlled", () => {
      render({ value: "123" });
      expect(value()).toBe("123.00");
      expect(hiddenValue()).toBe("123.00");

      setProps({ value: "456" });
      expect(value()).toBe("456.00");
      expect(hiddenValue()).toBe("456.00");

      setProps({ value: "" });
      expect(value()).toBe("");
      expect(hiddenValue()).toBe("");
    });

    it("blurring a field does not trigger onChange if the value has not changes", () => {
      render({ value: "123" });
      blur();
      expect(onChange).not.toHaveBeenCalled();
    });

    it("typing a negative value does not revert to the default value", () => {
      render({ value: "123" });
      type("-");
      expect(onChange).toHaveBeenCalled();
      expect(value()).toBe("-");
      expect(hiddenValue()).toBe("-");
    });

    it("typing a negative value does not revert to the default value (allowEmptyValue)", () => {
      render({ value: "", allowEmptyValue: true });
      setProps({ value: "-" });
      expect(onChange).not.toHaveBeenCalled();
      expect(value()).toBe("-");
      expect(hiddenValue()).toBe("-");
    });

    it("does not format a value that is not a number", () => {
      const onBlur = jest.fn();
      render({
        value: "",
        onBlur,
        onChange: (e) => {
          setProps({ value: e.target.value.rawValue });
        },
        allowEmptyValue: true,
      });

      setProps({ value: "FooBar" });
      blur();
      expect(value()).toBe("FooBar");
      expect(hiddenValue()).toBe("FooBar");
      expect(onBlur).toHaveBeenCalled();
    });

    it("handles a value that is white-space only", () => {
      const onBlur = jest.fn();
      render({
        value: "",
        onBlur,
        onChange: (e) => {
          setProps({ value: e.target.value.rawValue });
        },
        allowEmptyValue: true,
      });

      setProps({ value: "     " });
      blur();
      expect(value()).toBe("     ");
      expect(hiddenValue()).toBe("     ");
      expect(onBlur).toHaveBeenCalled();
    });

    it("handles a value that is delimiters only", () => {
      const onBlur = jest.fn();
      render({
        value: "",
        onBlur,
        onChange: (e) => {
          setProps({ value: e.target.value.rawValue });
        },
        allowEmptyValue: true,
      });

      setProps({ value: ",,," });
      blur();
      expect(value()).toBe(",,,");
      expect(hiddenValue()).toBe(",,,");
      expect(onBlur).toHaveBeenCalled();
    });

    it("handles a value that is special characters and delimiters only", () => {
      const onBlur = jest.fn();
      render({
        value: "",
        onBlur,
        onChange: (e) => {
          setProps({ value: e.target.value.rawValue });
        },
        allowEmptyValue: true,
      });

      setProps({ value: "^^&^%%$,,,," });
      blur();
      expect(value()).toBe("^^&^%%$,,,,");
      expect(hiddenValue()).toBe("^^&^%%$,,,,");
      expect(onBlur).toHaveBeenCalled();
    });

    it("does not format a value that has numbers and has too many delimiters", () => {
      const onBlur = jest.fn();
      render({
        value: "",
        onBlur,
        onChange: (e) => {
          setProps({ value: e.target.value.rawValue });
        },
        allowEmptyValue: true,
      });

      setProps({ value: "10,.10,.11,.6" });
      blur();
      expect(value()).toBe("10,.10,.11,.6");
      expect(hiddenValue()).toBe("10,.10,.11,.6");
      expect(onBlur).toHaveBeenCalled();
    });

    it("handles a value that is numbers, delimiters and special characters only", () => {
      const onBlur = jest.fn();
      render({
        value: "",
        onBlur,
        onChange: (e) => {
          setProps({ value: e.target.value.rawValue });
        },
        allowEmptyValue: true,
      });

      setProps({ value: "1,234$" });
      blur();
      expect(value()).toBe("1,234$");
      expect(hiddenValue()).toBe("1,234$");
      expect(onBlur).toHaveBeenCalled();
    });

    it("formats a empty value prop when firing events (allowEmptyValue)", () => {
      const onBlur = jest.fn();
      render({
        value: "",
        onBlur,
        onChange: (e) => {
          setProps({ value: e.target.value.rawValue });
        },
        allowEmptyValue: true,
      });

      blur();
      expect(value()).toBe("");
      expect(hiddenValue()).toBe("");
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: "",
              rawValue: "",
            },
          },
        })
      );

      onBlur.mockReset();
      type("1");
      blur();
      expect(value()).toBe("1.00");
      expect(hiddenValue()).toBe("1.00");
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: "1.00",
              rawValue: "1",
            },
          },
        })
      );

      onBlur.mockReset();
      type("");
      blur();
      expect(value()).toBe("");
      expect(hiddenValue()).toBe("");
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: "",
              rawValue: "",
            },
          },
        })
      );
    });

    it("formats a empty value prop when firing events", () => {
      const onBlur = jest.fn();
      render({
        value: "0.00",
        onBlur,
        onChange: (e) => {
          setProps({ value: e.target.value.rawValue });
        },
      });

      blur();
      expect(value()).toBe("0.00");
      expect(hiddenValue()).toBe("0.00");
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: "0.00",
              rawValue: "0.00",
            },
          },
        })
      );

      onBlur.mockReset();
      type("1");
      blur();
      expect(value()).toBe("1.00");
      expect(hiddenValue()).toBe("1.00");
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: "1.00",
              rawValue: "1",
            },
          },
        })
      );

      onBlur.mockReset();
      type("");
      blur();
      expect(value()).toBe("0.00");
      expect(hiddenValue()).toBe("0.00");
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: "0.00",
              rawValue: "0.00",
            },
          },
        })
      );
    });
  });

  describe("i18n", () => {
    describe("translation", () => {
      it("renders properly", () => {
        mount(
          <I18nProvider
            locale={{
              locale: () => "fr-FR",
            }}
          >
            <Decimal />
          </I18nProvider>
        );
        expect(value()).toBe("0,00");
        wrapper.setProps({
          locale: {
            locale: () => "en-GB",
          },
        });
        blur();
        expect(value()).toBe("0.00");
      });
    });
  });
});

describe("required", () => {
  let inputs;
  beforeAll(() => {
    render({ label: "required", required: true }, (jsx) => {
      wrapper = enzymeMount(jsx);
    });
    inputs = wrapper.find("input");
  });

  it("the required prop is passed to the input", () => {
    expect(inputs.at(0).prop("required")).toBe(true);
  });

  it("the required prop not passed to the hidden input", () => {
    expect(inputs.at(1).prop("required")).toBe(undefined);
  });

  it("the isRequired prop is passed to the label", () => {
    const label = wrapper.find(Label);
    expect(label.prop("isRequired")).toBe(true);
  });
});
