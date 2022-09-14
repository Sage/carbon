import * as React from "react";
import Number from "./number.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import {
  getDataElementByValue,
  getElement,
  fieldHelpPreview,
  helpIcon,
  tooltipPreview,
  commonDataElementInputPreview,
  commonInputPrefix,
  commonInputCharacterLimit,
} from "../../../cypress/locators";

import { verifyRequiredAsteriskForLabel } from "../../../cypress/support/component-helper/common-steps";

const testData = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];

const NumberInputComponent = ({ onChange, ...props }) => {
  const [state, setState] = React.useState("");

  const setValue = ({ target }) => {
    setState(target.value);
    if (onChange) {
      onChange(target);
    }
  };

  return <Number label="Number" value={state} onChange={setValue} {...props} />;
};

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
      ["11", "11"],
      ["10", "10"],
    ])(
      "should input %s characters and enforce character limit of %s in Number",
      (charactersUsed, limit) => {
        CypressMountWithProviders(
          <NumberInputComponent enforceCharacterLimit characterLimit={limit} />
        );

        const inputValue = "12345678901";

        commonDataElementInputPreview()
          .type(inputValue)
          .then(() => {
            commonInputCharacterLimit().should(
              "have.text",
              `${charactersUsed}/${limit}`
            );
          });
      }
    );

    it.each([
      ["11", "11", "rgba(0, 0, 0, 0.55)"],
      ["11", "10", "rgb(205, 56, 75)"],
    ])(
      "should input %s characters and warn if over character limit of %s in Number",
      (charactersUsed, limit, color) => {
        const inputValue = "12345678901";

        CypressMountWithProviders(
          <NumberInputComponent
            enforceCharacterLimit={false}
            warnOverLimit
            characterLimit={limit}
          />
        );

        commonDataElementInputPreview()
          .type(inputValue)
          .then(() => {
            commonInputCharacterLimit()
              .should("have.text", `${charactersUsed}/${limit}`)
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
      ["small", "32px"],
      ["medium", "40px"],
      ["large", "48px"],
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
      ["10", "90", "135px", "1215px"],
      ["30", "70", "405px", "945px"],
      ["80", "20", "1080px", "270px"],
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
          .should("have.css", "width", labelRatio);

        getDataElementByValue("input")
          .parent()
          .should("have.css", "width", inputRatio);
      }
    );
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
});
