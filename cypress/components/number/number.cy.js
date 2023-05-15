import React from "react";
import { NumberInputComponent } from "../../../src/components/number/number-test.stories";
import * as stories from "../../../src/components/number/number.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  getDataElementByValue,
  getElement,
  fieldHelpPreview,
  helpIcon,
  tooltipPreview,
  commonDataElementInputPreview,
  commonInputPrefix,
  commonInputCharacterLimit,
} from "../../locators";
import {
  useJQueryCssValueAndAssert,
  verifyRequiredAsteriskForLabel,
} from "../../support/component-helper/common-steps";
import { SIZE, CHARACTERS } from "../../support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Tests for Number component", () => {
  describe("check props for Number component", () => {
    it.each(testData)(
      "should render Number label using %s special characters",
      (labelValue) => {
        CypressMountWithProviders(<NumberInputComponent label={labelValue} />);

        getDataElementByValue("label").should("have.text", labelValue);
      }
    );

    it.each(testData)(
      "should render labelHelp message using %s special characters",
      (labelHelpValue) => {
        CypressMountWithProviders(
          <NumberInputComponent labelHelp={labelHelpValue} />
        );

        helpIcon().trigger("mouseover");
        tooltipPreview().should("have.text", labelHelpValue);
      }
    );

    it.each(testData)(
      "should render fieldHelp message using %s special characters",
      (fieldHelpValue) => {
        CypressMountWithProviders(
          <NumberInputComponent fieldHelp={fieldHelpValue} />
        );

        fieldHelpPreview().should("have.text", fieldHelpValue);
      }
    );

    it.each(testData)(
      "should render prefix using %s special characters",
      (prefixValue) => {
        CypressMountWithProviders(
          <NumberInputComponent prefix={prefixValue} />
        );

        commonInputPrefix().should("have.text", prefixValue);
      }
    );

    it.each(testData)(
      "should render placeholder using %s special characters",
      (placeholderValue) => {
        CypressMountWithProviders(
          <NumberInputComponent placeholder={placeholderValue} />
        );

        commonDataElementInputPreview().should(
          "have.attr",
          "placeholder",
          placeholderValue
        );
      }
    );

    it.each([
      [11, 11],
      [10, 10],
    ])(
      "should input %s characters and enforce character limit of %s in Number",
      (charactersUsed, limit) => {
        const inputValue = "12345678901";
        const underCharacters =
          limit - charactersUsed === 1 ? "character" : "characters";
        const overCharacters =
          charactersUsed - limit === 1 ? "character" : "characters";

        CypressMountWithProviders(
          <NumberInputComponent enforceCharacterLimit characterLimit={limit} />
        );

        commonDataElementInputPreview()
          .type(inputValue)
          .then(() => {
            commonInputCharacterLimit().should(
              "have.text",
              `${
                charactersUsed - limit
                  ? `You have ${
                      limit - charactersUsed
                    } ${overCharacters} too many`
                  : `You have ${
                      charactersUsed - limit
                    } ${underCharacters} remaining`
              }`
            );
          });
      }
    );

    it.each([
      [11, 11, "rgba(0, 0, 0, 0.55)"],
      [11, 10, "rgb(203, 55, 74)"],
    ])(
      "should input %s characters and warn if over character limit of %s in Number",
      (charactersUsed, limit, color) => {
        const inputValue = "12345678901";
        const underCharacters =
          limit - charactersUsed === 1 ? "character" : "characters";
        const overCharacters =
          charactersUsed - limit === 1 ? "character" : "characters";

        CypressMountWithProviders(
          <NumberInputComponent
            enforceCharacterLimit={false}
            characterLimit={limit}
          />
        );

        commonDataElementInputPreview()
          .type(inputValue)
          .then(() => {
            commonInputCharacterLimit()
              .should(
                "have.text",
                `${
                  charactersUsed - limit
                    ? `You have ${
                        charactersUsed - limit
                      } ${overCharacters} too many`
                    : `You have ${
                        charactersUsed - limit
                      } ${underCharacters} remaining`
                }`
              )
              .and("have.css", "color", color);
          });
      }
    );

    it("should check add icon inside of the Number renders", () => {
      CypressMountWithProviders(<NumberInputComponent inputIcon="add" />);

      getElement("add").and("be.visible");
    });

    it("should check Number is disabled", () => {
      CypressMountWithProviders(<NumberInputComponent disabled />);

      commonDataElementInputPreview()
        .should("be.disabled")
        .and("have.attr", "disabled");
    });

    it("should render Number as read only", () => {
      CypressMountWithProviders(<NumberInputComponent readOnly />);

      const inputValue = "1";

      commonDataElementInputPreview().realType(inputValue);
      commonDataElementInputPreview()
        .should("not.have.value", inputValue)
        .and("have.attr", "readOnly");
    });

    it.each([
      [SIZE.SMALL, "32px"],
      [SIZE.MEDIUM, "40px"],
      [SIZE.LARGE, "48px"],
    ])(
      "should use %s as size and render Number with %s as height",
      (size, height) => {
        CypressMountWithProviders(<NumberInputComponent size={size} />);

        commonDataElementInputPreview()
          .parent()
          .should("have.css", "min-height", height);
      }
    );

    it("should check Number has autofocus", () => {
      CypressMountWithProviders(<NumberInputComponent autoFocus />);

      commonDataElementInputPreview().should("be.focused");
    });

    it("should check Number is required", () => {
      CypressMountWithProviders(<NumberInputComponent required />);

      verifyRequiredAsteriskForLabel();
    });

    it("should check Number label is inline", () => {
      CypressMountWithProviders(<NumberInputComponent labelInline />);

      getDataElementByValue("label")
        .parent()
        .should("have.css", "-webkit-box-pack", "end");
    });

    it.each([
      ["right", "end"],
      ["left", "start"],
    ])(
      "should use %s as labelAligment and render it with flex-%s as css properties",
      (alignment, cssProp) => {
        CypressMountWithProviders(
          <NumberInputComponent labelInline labelAlign={alignment} />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "-webkit-box-pack", cssProp)
          .and("have.css", "justify-content", `flex-${cssProp}`);
      }
    );

    it.each([
      ["10", "90", 135, 1229],
      ["30", "70", 409, 956],
      ["80", "20", 1092, 273],
    ])(
      "should use %s as labelWidth, %s as inputWidth and render it with correct label and input width ratios",
      (label, input, labelRatio, inputRatio) => {
        CypressMountWithProviders(
          <NumberInputComponent
            labelInline
            labelWidth={label}
            inputWidth={input}
          />
        );

        getDataElementByValue("label")
          .parent()
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", labelRatio);
          });

        getDataElementByValue("input")
          .parent()
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", inputRatio);
          });
      }
    );
  });

  it.each(["10%", "30%", "50%", "80%", "100%"])(
    "should check maxWidth as %s for Number component",
    (maxWidth) => {
      CypressMountWithProviders(<NumberInputComponent maxWidth={maxWidth} />);

      getDataElementByValue("input")
        .parent()
        .parent()
        .should("have.css", "max-width", maxWidth);
    }
  );

  it("when maxWidth has no value it should render as 100%", () => {
    CypressMountWithProviders(<NumberInputComponent maxWidth="" />);

    getDataElementByValue("input")
      .parent()
      .parent()
      .should("have.css", "max-width", "100%");
  });

  describe("check events for Number component", () => {
    const inputValue = "1";
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onChange callback when a type event is triggered", () => {
      CypressMountWithProviders(<NumberInputComponent onChange={callback} />);

      commonDataElementInputPreview()
        .type(inputValue)
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each([
      [1000, "1"],
      [5000, "5"],
      [10000, "10"],
    ])(
      "should use %s as deferTimeout and defer onChangeDeferred event for %s seconds",
      (timeout) => {
        const callbackOnChange = cy.stub();
        const callbackOnChangeDeff = cy.stub();

        CypressMountWithProviders(
          <NumberInputComponent
            deferTimeout={timeout}
            onChange={callbackOnChange}
            onChangeDeferred={callbackOnChangeDeff}
          />
        );

        cy.clock();

        commonDataElementInputPreview()
          .type(inputValue)
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callbackOnChange).to.have.been.calledOnce;
            // eslint-disable-next-line no-unused-expressions
            expect(callbackOnChangeDeff).to.not.have.been.called;
          })
          .then(() => {
            cy.tick(timeout);
          })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callbackOnChangeDeff).to.have.been.calledOnce;
          });
      }
    );

    it.each([["downarrow"], ["leftarrow"], ["rightarrow"], ["uparrow"]])(
      "should call onKeyDown callback when a %s keydown event is triggered",
      (key) => {
        CypressMountWithProviders(
          <NumberInputComponent onKeyDown={callback} />
        );

        commonDataElementInputPreview()
          .clear()
          .type(key)
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.called;
          });
      }
    );
  });

  describe("check accessibility for Number component", () => {
    it("should pass accessibility tests for Number Default story", () => {
      CypressMountWithProviders(<stories.Default />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Number Sizes story", () => {
      CypressMountWithProviders(<stories.Sizes />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Number Disabled story", () => {
      CypressMountWithProviders(<stories.Disabled />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Number ReadOnly story", () => {
      CypressMountWithProviders(<stories.ReadOnly />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Number AutoFocus story", () => {
      CypressMountWithProviders(<stories.AutoFocus />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Number WithLabelInline story", () => {
      CypressMountWithProviders(<stories.WithLabelInline />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Number WithLabelAlign story", () => {
      CypressMountWithProviders(<stories.WithLabelAlign />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Number WithCustomLabelWidthAndInputWidth story", () => {
      CypressMountWithProviders(<stories.WithCustomLabelWidthAndInputWidth />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Number WithCustomMaxWidth story", () => {
      CypressMountWithProviders(<stories.WithCustomMaxWidth />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Number WithFieldHelp story", () => {
      CypressMountWithProviders(<stories.WithFieldHelp />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Number WithLabelHelp story", () => {
      CypressMountWithProviders(<stories.WithLabelHelp />);

      cy.checkAccessibility();
    });
  });

  it("should have the expected border radius styling", () => {
    CypressMountWithProviders(<NumberInputComponent />);
    getElement("input").should("have.css", "border-radius", "4px");
  });
});
