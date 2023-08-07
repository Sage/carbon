/* eslint-disable array-callback-return, no-unused-expressions, jest/valid-expect-in-promise, jest/valid-expect */
import React from "react";
import Decimal, {
  CustomEvent,
  DecimalProps,
} from "../../../src/components/decimal";
import * as stories from "../../../src/components/decimal/decimal.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

import {
  fieldHelpPreview,
  getDataElementByValue,
  tooltipPreview,
  commonDataElementInputPreview,
  cyRoot,
  getElement,
} from "../../locators/index";

import { textboxPrefix } from "../../locators/textbox";
import { CHARACTERS } from "../../support/component-helper/constants";

const eventOutput = (formattedVal: string, rawVal: string) => {
  return {
    target: {
      id: undefined,
      name: undefined,
      value: {
        formattedValue: formattedVal,
        rawValue: rawVal,
      },
    },
  };
};

context("Tests for Decimal component", () => {
  describe("check props for Decimal component", () => {
    const input = [
      [0, "1", "1"],
      [0, "134^", "134^"],
      [0, "1234567789", "1,234,567,789"],
      [0, ",,,,,", ",,,,,"],
      [0, ".....", "....."],
      [0, "abc,.123,.!@.00", "abc,.123,.!@.00"],
      [0, "1,234$", "1,234$"],

      [1, "1", "1.0"],
      [1, "1.2", "1.2"],
      [1, "1.23", "1.23"],

      [2, "2", "2.00"],
      [2, "2.1", "2.10"],
      [2, "2.12", "2.12"],
      [2, "2.123", "2.123"],

      [3, "2.1", "2.100"],
      [3, "2.12", "2.120"],
      [3, "2.123", "2.123"],
      [3, "2.1234", "2.1234"],

      [4, "1.1234", "1.1234"],
      [4, "2", "2.0000"],
      [4, "234556654", "234,556,654.0000"],
      [4, "%^%^%<<,,,", "%^%^%<<,,,"],

      [5, "1", "1.00000"],
      [5, "1.12345", "1.12345"],
      [5, "1a.23", "1a.23"],

      [6, "2.123456", "2.123456"],
      [6, "2.1", "2.100000"],
      [6, "2a.12", "2a.12"],
      [6, "1,232.123", "1,232.123000"],

      [7, "1", "1.0000000"],
      [7, "2344.1234567", "2,344.1234567"],
      [7, "88652344.1234567", "88,652,344.1234567"],

      [8, "1", "1.00000000"],
      [8, "1.2", "1.20000000"],
      [8, "1.23", "1.23000000"],

      [9, "2", "2.000000000"],
      [9, "2.1", "2.100000000"],
      [9, "1222.12", "1,222.120000000"],
      [9, "2.123000000", "2.123000000"],

      [10, "2.1", "2.1000000000"],
      [10, "2.12", "2.1200000000"],
      [10, "1222.123", "1,222.1230000000"],
      [10, "2.12345", "2.1234500000"],

      [11, "1", "1.00000000000"],
      [11, "2345", "2,345.00000000000"],
      [11, "17899536472345", "17,899,536,472,345.00000000000"],

      [12, "1", "1.000000000000"],
      [12, "1.12345", "1.123450000000"],
      [12, "1a.23", "1a.23"],

      [13, "2", "2.0000000000000"],
      [13, "2.1", "2.1000000000000"],
      [13, "2a.12", "2a.12"],
      [13, "1232.123", "1,232.1230000000000"],

      [14, "2.1", "2.10000000000000"],
      [14, "2.12", "2.12000000000000"],
      [14, "2.123", "2.12300000000000"],
      [14, "1222.1234", "1,222.12340000000000"],

      [15, "1", "1.000000000000000"],
      [15, "2332.78", "2,332.780000000000000"],
      [15, "1a3.55", "1a3.55"],
      [15, "1.12345", "1.123450000000000"],
      [15, "1a.23", "1a.23"],
    ] as [DecimalProps["precision"], string, string][];

    it.each(input)(
      "should use %s as precision and %s as input value to produce %s output value",
      (precision, inputValue, outputValue) => {
        CypressMountWithProviders(<Decimal precision={precision} />);

        commonDataElementInputPreview()
          .type(inputValue, { delay: 0 })
          .blur({ force: true });
        commonDataElementInputPreview().should("have.value", outputValue);
      }
    );

    const inputLocale = [
      ["en", "1,1,1,1,1.1", "11,111.100"],
      ["en", "1,1,1222,12,1.1", "111,222,121.100"],
      ["en", "1,,1,,1", "1,,1,,1"],

      ["es-ES", "1.1.1.1.1.1,1", "111.111,100"],
      ["es-ES", "2.123", "2123,000"],
      ["es-ES", "21.21.111.1,013", "21.211.111,013"],
      ["es-ES", "2.,12.,1", "2.,12.,1"],

      ["fr", "11111,25", "11 111,250"],
      ["fr", "1  1  1  1  1,25", "1  1  1  1  1,25"],

      ["pt-PT", "1111,2", "1111,200"],
      ["pt-PT", "111 11,25", "11 111,250"],

      ["no-NO", "1 1 11,21", "1 111,210"],
      ["no-No", "111 1 1,25", "11 111,250"],
      ["no-NO", "1  1  1  1  1,25", "1  1  1  1  1,25"],
    ] as [DecimalProps["locale"], string, string][];

    it.each(inputLocale)(
      "should use %s locale and %s input value to produce %s output value",
      (locale, inputValue, outputValue) => {
        CypressMountWithProviders(<Decimal locale={locale} precision={3} />);

        commonDataElementInputPreview()
          .type(inputValue, { delay: 0 })
          .blur({ force: true });
        commonDataElementInputPreview()
          .invoke("val")
          .then(($el) => {
            for (let number = 0; number < String($el).length; number++) {
              expect(
                String($el)
                  .replace(/(\s)|(&nbsp;)|(\u00a0)/g, " ")
                  .charCodeAt(number)
              ).to.equals(outputValue.charCodeAt(number));
            }
          });
      }
    );

    it("should render Decimal with readOnly prop", () => {
      CypressMountWithProviders(<Decimal readOnly />);

      const inputValue = "test";

      commonDataElementInputPreview()
        .type(inputValue, { force: true })
        .blur({ force: true });
      commonDataElementInputPreview()
        .parent()
        .should("not.have.value", inputValue)
        .and("have.attr", "readOnly");
    });

    it.each(["10%", "30%", "50%", "80%", "100%"])(
      "should check maxWidth as %s for Decimal component",
      (maxWidth) => {
        CypressMountWithProviders(<Decimal maxWidth={maxWidth} />);

        getDataElementByValue("input")
          .parent()
          .parent()
          .should("have.css", "max-width", maxWidth);
      }
    );

    it("when maxWidth has no value it should render as 100%", () => {
      CypressMountWithProviders(<Decimal maxWidth="" />);

      getDataElementByValue("input")
        .parent()
        .parent()
        .should("have.css", "max-width", "100%");
    });
  });

  describe("check Decimal input", () => {
    const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

    it.each(testData)(
      "check label renders properly with %s as specific value",
      (specificValue) => {
        CypressMountWithProviders(<Decimal fieldHelp={specificValue} />);

        fieldHelpPreview().should("have.text", specificValue);
      }
    );

    it.each(testData)(
      "check fieldHelp renders properly with %s specific value",
      (specificValue) => {
        CypressMountWithProviders(<Decimal label={specificValue} />);

        getDataElementByValue("label").should("have.text", specificValue);
      }
    );

    it.each(testData)(
      "check tooltip renders properly with %s specific values",
      (specificValue) => {
        CypressMountWithProviders(
          <Decimal label="Label" labelHelp={specificValue} />
        );

        getDataElementByValue("question").trigger("mouseover");
        tooltipPreview().should("have.text", specificValue);
        cyRoot().realHover({ position: "topLeft" });
      }
    );

    it.each(testData)(
      "should render Decimal with prefix prop set to %s",
      (prefix) => {
        CypressMountWithProviders(<Decimal prefix={prefix} />);

        textboxPrefix()
          .should("have.text", prefix)
          .and("have.css", "font-size", "14px")
          .and("have.css", "font-weight", "900")
          .and("have.css", "margin-left", "12px");
      }
    );

    it("when prefix prop is set, 'flex-direction' should be 'row'", () => {
      CypressMountWithProviders(<Decimal prefix="foo" />);

      getDataElementByValue("input")
        .parent()
        .should("have.css", "flex-direction", "row");
    });

    it.each(testData)(
      "check Decimal component accepts %s as specific value",
      (specificValue) => {
        CypressMountWithProviders(<Decimal />);

        commonDataElementInputPreview()
          .type(specificValue)
          .blur({ force: true });
        commonDataElementInputPreview()
          .invoke("val")
          .then(($el) => {
            for (let number = 0; number < String($el).length; number++) {
              expect(
                String($el)
                  .replace(/(\s)|(&nbsp;)|(\u00a0)/g, " ")
                  .charCodeAt(number)
              ).to.equals(specificValue.charCodeAt(number));
            }
          });
      }
    );

    it("check Decimal component accepts white spaces", () => {
      CypressMountWithProviders(<Decimal />);

      commonDataElementInputPreview().type("   ").blur({ force: true });
      commonDataElementInputPreview().should("have.attr", "value", "   ");
    });
  });

  describe("allowEmptyValue", () => {
    it.each([
      [0, "en", "0", "0"],
      [1, "en", "0.0", "0.0"],
      [2, "en", "0.00", "0.00"],
      [0, "es-ES", "0", "0"],
      [1, "es-ES", "0.0", "0,0"],
      [2, "es-ES", "0.00", "0,00"],
      [0, "fr", "0", "0"],
      [1, "fr", "0.0", "0,0"],
      [2, "fr", "0.00", "0,00"],
      [0, "pt-PT", "0", "0"],
      [1, "pt-PT", "0.0", "0,0"],
      [2, "pt-PT", "0.00", "0,00"],
    ] as [DecimalProps["precision"], string, string, string][])(
      "should format an empty value correctly when precision is %s, locale is %s and allowEmptyValue is false",
      (precisionValue, localeValue, rawValue, expectedValue) => {
        const callback: DecimalProps["onBlur"] = cy.stub().as("onBlur");

        CypressMountWithProviders(
          <Decimal
            precision={precisionValue}
            locale={localeValue}
            allowEmptyValue={false}
            onBlur={callback}
          />
        );

        commonDataElementInputPreview().type("100");
        commonDataElementInputPreview()
          .clear()
          .blur({ force: true })
          .then(() => {
            cy.get("@onBlur").should(
              "have.been.calledWith",
              eventOutput(expectedValue, rawValue)
            );
          });
        expect(
          commonDataElementInputPreview().should("have.value", expectedValue)
        );
      }
    );

    it.each([
      [0, "en"],
      [1, "en"],
      [2, "en"],
      [0, "es-ES"],
      [1, "es-ES"],
      [2, "es-ES"],
      [0, "fr"],
      [1, "fr"],
      [2, "fr"],
      [0, "pt-PT"],
      [1, "pt-PT"],
      [2, "pt-PT"],
    ] as [DecimalProps["precision"], string][])(
      "should format an empty value correctly when precision is %s, locale is %s and allowEmptyValue is true",
      (precisionValue, localeValue) => {
        const callback: DecimalProps["onBlur"] = cy.stub().as("onBlur");

        CypressMountWithProviders(
          <Decimal
            precision={precisionValue}
            locale={localeValue}
            allowEmptyValue
            onBlur={callback}
          />
        );

        commonDataElementInputPreview().type("100");
        commonDataElementInputPreview()
          .clear()
          .blur({ force: true })
          .then(() => {
            cy.get("@onBlur").should(
              "have.been.calledWith",
              eventOutput("", "")
            );
          });
        expect(commonDataElementInputPreview().should("have.value", ""));
      }
    );
  });

  describe("check events for Decimal component", () => {
    const inputValue = "123";
    const iterable = [
      ["1", "1.00"],
      ["12", "12.00"],
      ["123", "123.00"],
    ] as [string, string][];

    it.each(iterable)(
      "should call onChange callback when a type event is triggered with %s value",
      (rawValueTest, formattedValueTest) => {
        const callback: DecimalProps["onChange"] = cy.stub().as("onChange");

        CypressMountWithProviders(<Decimal onChange={callback} />);

        commonDataElementInputPreview()
          .type(rawValueTest)
          .blur({ force: true })

          .then(() => {
            cy.get("@onChange").should(
              "have.been.calledWith",
              eventOutput(formattedValueTest, rawValueTest)
            );
          });
      }
    );

    it("can have a custom onChange handler", () => {
      const CustomDecimalComponent = (props: DecimalProps) => {
        const [state, setState] = React.useState("0.01");
        const handleChange = ({ target }: CustomEvent) => {
          let newValue = target.value.rawValue;
          if (newValue.startsWith("22.22")) newValue = "22.22";
          setState(newValue);
        };

        return <Decimal onChange={handleChange} value={state} {...props} />;
      };

      CypressMountWithProviders(<CustomDecimalComponent />);

      commonDataElementInputPreview().type("22.222");
      expect(
        commonDataElementInputPreview().should("have.attr", "value", "22.22")
      );
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      const callback: DecimalProps["onBlur"] = cy.stub().as("onBlur");

      CypressMountWithProviders(<Decimal onBlur={callback} />);

      commonDataElementInputPreview()
        .type(inputValue)
        .blur({ force: true })
        .then(() => {
          cy.get("@onBlur").should(
            "have.been.calledWith",
            eventOutput("123.00", inputValue)
          );
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("Accessibility tests for Decimal component", () => {
    it.each(["small", "medium", "large"] as DecimalProps["size"][])(
      "should pass accessibility tests for Decimal with %s input size",
      (size) => {
        CypressMountWithProviders(<stories.DefaultStory size={size} />);

        cy.checkAccessibility();
      }
    );

    it.each(["left", "right"] as DecimalProps["labelAlign"][])(
      "should pass accessibility tests for Decimal with label aligned %s",
      (labelAlign) => {
        CypressMountWithProviders(
          <stories.DefaultStory labelAlign={labelAlign} />
        );

        cy.checkAccessibility();
      }
    );

    it("should pass accessibility tests for Decimal with custom precision", () => {
      CypressMountWithProviders(<stories.WithCustomPrecision />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Decimal with custom label width and input width", () => {
      CypressMountWithProviders(<stories.WithCustomLabelWidthAndInputWidth />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Decimal with custom max width", () => {
      CypressMountWithProviders(<stories.WithCustomMaxWidth />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Decimal with field help", () => {
      CypressMountWithProviders(<stories.WithFieldHelp fieldHelp="Help" />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Decimal with label help", () => {
      CypressMountWithProviders(<stories.WithLabelHelp labelHelp="Help" />);

      getDataElementByValue("question")
        .trigger("mouseover")
        .then(() => {
          cy.checkAccessibility();
        });
    });

    it("should pass accessibility tests for Decimal required", () => {
      CypressMountWithProviders(<stories.Required />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Decimal left aligned", () => {
      CypressMountWithProviders(<stories.LeftAligned />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Decimal with validation", () => {
      CypressMountWithProviders(<stories.Validations />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Decimal validations redesigned", () => {
      CypressMountWithProviders(<stories.ValidationsRedesign />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Decimal default", () => {
      CypressMountWithProviders(
        <Decimal
          label="Decimal"
          onChange={function noRefCheck() {
            ("");
          }}
          value="0.01"
        />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Decimal with readOnly prop", () => {
      CypressMountWithProviders(
        <Decimal
          label="Decimal"
          onChange={function noRefCheck() {
            ("");
          }}
          value="0.01"
          readOnly
        />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Decimal with tooltip", () => {
      CypressMountWithProviders(<stories.ValidationsTooltip />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Decimal with tooltip label", () => {
      CypressMountWithProviders(<stories.ValidationsTooltipLabel />);

      cy.checkAccessibility();
    });
  });

  it("should have the expected border radius styling", () => {
    CypressMountWithProviders(<Decimal />);
    getElement("input").should("have.css", "border-radius", "4px");
  });
});
