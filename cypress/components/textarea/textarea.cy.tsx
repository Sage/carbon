/* eslint-disable no-unused-expressions */
/* eslint-disable jest/valid-expect */
import React from "react";
import { TextareaProps } from "components/textarea";
import {
  TextareaComponent,
  InScrollableContainer,
} from "../../../src/components/textarea/textarea-test.stories";
import Box from "../../../src/components/box";
import * as stories from "../../../src/components/textarea/textarea.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  verifyRequiredAsteriskForLabel,
  checkGoldenOutline,
  assertCssValueIsApproximately,
} from "../../support/component-helper/common-steps";

import {
  getDataElementByValue,
  tooltipPreview,
  characterCount,
  body,
  getComponent,
  cyRoot,
  fieldHelpPreview,
  getElement,
} from "../../locators";
import {
  CHARACTERS,
  SIZE,
  VALIDATION,
} from "../../support/component-helper/constants";

import {
  textarea,
  textareaChildren,
  visuallyHiddenCharacterCount,
  visuallyHiddenHint,
} from "../../locators/textarea";

import { keyCode } from "../../support/helper";
import { ICON } from "../../locators/locators";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Tests for Textarea component", () => {
  describe("check props for Textarea component", () => {
    it("should render Textarea with data-component prop", () => {
      CypressMountWithProviders(
        <TextareaComponent data-component={CHARACTERS.STANDARD} />
      );

      getComponent(CHARACTERS.STANDARD).should("be.visible");
    });

    it("should render Textarea with data-element prop", () => {
      CypressMountWithProviders(
        <TextareaComponent data-element={CHARACTERS.STANDARD} />
      );
      cyRoot()
        .children()
        .children()
        .should("have.attr", "data-element", CHARACTERS.STANDARD);
    });

    it("should render Textarea with data-role prop", () => {
      CypressMountWithProviders(
        <TextareaComponent data-role={CHARACTERS.STANDARD} />
      );

      cyRoot()
        .children()
        .children()
        .should("have.attr", "data-role", CHARACTERS.STANDARD);
    });

    it("should render Textarea with id prop", () => {
      CypressMountWithProviders(<TextareaComponent id={CHARACTERS.STANDARD} />);

      textareaChildren().should("have.attr", "id", CHARACTERS.STANDARD);
    });

    it.each(testData)(
      "should render Textarea with label prop set to %s",
      (label) => {
        CypressMountWithProviders(<TextareaComponent label={label} />);

        getDataElementByValue("label").should("have.text", label);
      }
    );

    it("should render Textarea with labelInline prop", () => {
      CypressMountWithProviders(<TextareaComponent labelInline />);

      getDataElementByValue("label")
        .parent()
        .should("have.css", "justify-content", "flex-end");
    });

    it.each([
      ["left", "start"],
      ["right", "end"],
    ] as [TextareaProps["labelAlign"], string][])(
      "should render Textarea with labelAlign prop set to %s",
      (labelAlign, cssValue) => {
        CypressMountWithProviders(
          <TextareaComponent labelInline labelAlign={labelAlign} />
        );

        getDataElementByValue("label")
          .parent()
          .should(($element) =>
            expect($element).to.have.css("justify-content", `flex-${cssValue}`)
          );
      }
    );

    it.each(testData)(
      "should render Textarea with labelHelp prop set to %s",
      (labelHelp) => {
        CypressMountWithProviders(
          <TextareaComponent labelInline labelHelp={labelHelp} />
        );

        getDataElementByValue("question").trigger("mouseover");
        tooltipPreview().should("have.text", labelHelp);
      }
    );

    it.each([
      [1, "8px"],
      [2, "16px"],
    ] as [TextareaProps["labelSpacing"], string][])(
      "should render Textarea with labelSpacing prop set to %s",
      (spacing, padding) => {
        CypressMountWithProviders(
          <TextareaComponent labelInline labelSpacing={spacing} />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "padding-right", padding);
      }
    );

    it.each([
      [10, 90, 135, 1229],
      [30, 70, 409, 956],
      [80, 20, 1092, 273],
    ] as [TextareaProps["labelWidth"], TextareaProps["inputWidth"], number, number][])(
      "should use %s as labelWidth, %s as inputWidth and render it with correct label and input width ratios",
      (label, input, labelRatio, inputRatio) => {
        CypressMountWithProviders(
          <TextareaComponent
            labelInline
            labelWidth={label}
            inputWidth={input}
          />
        );

        getDataElementByValue("label")
          .parent()
          .then(($el) => {
            assertCssValueIsApproximately($el, "width", labelRatio);
          });

        getDataElementByValue("input")
          .parent()
          .then(($el) => {
            assertCssValueIsApproximately($el, "width", inputRatio);
          });
      }
    );

    it("should render Textarea with required prop", () => {
      CypressMountWithProviders(<TextareaComponent required />);

      verifyRequiredAsteriskForLabel();
    });

    it.each([
      [11, 11, "rgba(0, 0, 0, 0.55)"],
      [11, 10, "rgb(203, 55, 74)"],
    ])(
      "should input %s characters and warn if over character limit of %s in Textarea",
      (charactersUsed, limit, color) => {
        const inputValue = "12345678901";
        const underCharacters =
          limit - charactersUsed === 1 ? "character" : "characters";
        const overCharacters =
          charactersUsed - limit === 1 ? "character" : "characters";

        CypressMountWithProviders(<TextareaComponent characterLimit={limit} />);

        textareaChildren()
          .type(inputValue)
          .then(() => {
            characterCount()
              .should(
                "have.text",
                `${
                  charactersUsed - limit
                    ? `${charactersUsed - limit} ${overCharacters} too many`
                    : `${charactersUsed - limit} ${underCharacters} left`
                }`
              )
              .and("have.css", "color", color);

            visuallyHiddenCharacterCount().should(
              "have.text",
              `${
                charactersUsed - limit
                  ? `${charactersUsed - limit} ${overCharacters} too many`
                  : `${charactersUsed - limit} ${underCharacters} left`
              }`
            );
          });
      }
    );

    it.each([
      ["foo", "exist"],
      ["", "not.exist"],
    ])(
      "input hint should be conditionally rendered",
      (inputHint, renderStatus) => {
        CypressMountWithProviders(<TextareaComponent inputHint={inputHint} />);

        getDataElementByValue("input-hint").should(renderStatus);
      }
    );

    it.each([
      [5, "exist"],
      [null, "not.exist"],
    ] as [TextareaProps["characterLimit"], string][])(
      "character counter should be conditionally rendered",
      (characterLimit, renderStatus) => {
        CypressMountWithProviders(
          <TextareaComponent characterLimit={characterLimit} />
        );

        characterCount().should(renderStatus);
      }
    );

    it.each([
      [5, "exist"],
      [null, "not.exist"],
    ] as [TextareaProps["characterLimit"], string][])(
      "visually hidden character count should be conditionally rendered",
      (characterLimit, renderStatus) => {
        CypressMountWithProviders(
          <TextareaComponent characterLimit={characterLimit} />
        );

        visuallyHiddenCharacterCount().should(renderStatus);
      }
    );

    it.each([
      [5, "exist"],
      [null, "not.exist"],
    ] as [TextareaProps["characterLimit"], string][])(
      "visually hidden hint should be conditionally rendered",
      (characterLimit, renderStatus) => {
        CypressMountWithProviders(
          <TextareaComponent characterLimit={characterLimit} />
        );

        visuallyHiddenHint().should(renderStatus);
      }
    );

    it.each(["10%", "30%", "50%", "80%", "100%"])(
      "should check maxWidth as %s for TextArea component",
      (maxWidth) => {
        CypressMountWithProviders(<TextareaComponent maxWidth={maxWidth} />);

        getDataElementByValue("input")
          .parent()
          .parent()
          .should("have.css", "max-width", maxWidth);
      }
    );

    it("when maxWidth has no value it should render as 100%", () => {
      CypressMountWithProviders(<TextareaComponent maxWidth="" />);

      getDataElementByValue("input")
        .parent()
        .parent()
        .should("have.css", "max-width", "100%");
    });

    it("should render Textarea with name prop", () => {
      CypressMountWithProviders(
        <TextareaComponent name={CHARACTERS.STANDARD} />
      );

      textareaChildren().should("have.attr", "name", CHARACTERS.STANDARD);
    });

    it("should render Textarea with disabled prop", () => {
      CypressMountWithProviders(<TextareaComponent disabled />);

      textareaChildren().should("be.disabled").and("have.attr", "disabled");
    });

    it("should render Textarea icon with disabled style", () => {
      CypressMountWithProviders(<TextareaComponent disabled inputIcon="bin" />);

      textarea()
        .find(ICON)
        .should("be.visible")
        .and("have.css", "color", "rgba(0, 0, 0, 0.3)");
    });

    it.each(testData)(
      "should render Textarea with placeholder prop set to %s",
      (placeholder) => {
        CypressMountWithProviders(
          <TextareaComponent placeholder={placeholder} />
        );

        textareaChildren().should("have.attr", "placeholder", placeholder);
      }
    );

    it("should render Textarea with autoFocus prop and correct styling when focusRedesignOptOut is false", () => {
      CypressMountWithProviders(
        <TextareaComponent autoFocus />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: false,
        }
      );

      body().tab();
      textareaChildren()
        .should("be.focused")
        .parent()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
    });

    it("should render Textarea with autoFocus prop and correct styling when focusRedesignOptOut is true", () => {
      CypressMountWithProviders(
        <TextareaComponent autoFocus />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );

      body().tab();
      textareaChildren()
        .should("be.focused")
        .then(($el) => {
          checkGoldenOutline($el.parent());
        });
    });

    it("should render Textarea with readOnly prop", () => {
      CypressMountWithProviders(<TextareaComponent readOnly />);

      textareaChildren().and("have.attr", "readOnly");
    });

    it("should render Textarea icon with readOnly style", () => {
      CypressMountWithProviders(<TextareaComponent readOnly inputIcon="bin" />);

      textarea()
        .find(ICON)
        .should("be.visible")
        .and("have.css", "color", "rgba(0, 0, 0, 0.3)");
    });

    it.each(["error", "warning", "info"])(
      "should verify Textarea is displayed with %s validation icon on input",
      (type) => {
        CypressMountWithProviders(
          <TextareaComponent
            labelInline
            labelAlign="right"
            {...{ [type]: "Message" }}
          />
        );

        textarea().find(ICON).should("have.attr", "data-element", type);
      }
    );

    it.each(["error", "warning", "info"])(
      "should verify Textarea is displayed with %s validation icon on label",
      (type) => {
        CypressMountWithProviders(
          <TextareaComponent
            labelInline
            labelAlign="right"
            validationOnLabel
            {...{ [type]: "Message" }}
          />
        );

        getDataElementByValue("label")
          .parent()
          .find(ICON)
          .should("have.attr", "data-element", type);
      }
    );

    it.each([
      [VALIDATION.ERROR, "error", true],
      [VALIDATION.WARNING, "warning", true],
      [VALIDATION.INFO, "info", true],
      ["rgb(102, 132, 148)", "error", false],
      ["rgb(102, 132, 148)", "warning", false],
      ["rgb(102, 132, 148)", "info", false],
    ])(
      "should verify Textarea input border colour is %s when validation is %s and boolean prop is %s",
      (borderColor, type, bool) => {
        CypressMountWithProviders(
          <TextareaComponent
            labelInline
            labelAlign="right"
            {...{ [type]: bool }}
          />
        );

        textarea().should("have.css", "border-bottom-color", borderColor);
      }
    );

    it.each([
      [SIZE.SMALL, "32px"],
      [SIZE.MEDIUM, "40px"],
      [SIZE.LARGE, "48px"],
    ] as [TextareaProps["size"], string][])(
      "should use %s as size and render Textarea with %s as height",
      (size, height) => {
        CypressMountWithProviders(<TextareaComponent size={size} />);

        textarea().should("have.css", "min-height", height);
      }
    );

    it.each([
      ["flex", 399],
      ["flex", 400],
      ["block", 401],
    ])(
      "should check Textarea label alignment is %s with adaptiveLabelBreakpoint %s and viewport 400",
      (displayValue, breakpoint) => {
        cy.viewport(400, 300);

        CypressMountWithProviders(
          <TextareaComponent adaptiveLabelBreakpoint={breakpoint} />
        );

        getDataElementByValue("label")
          .parent()
          .parent()
          .should("have.css", "display", displayValue);
      }
    );

    it.each(testData)(
      "should render Textarea with fieldHelp prop set to %s",
      (fieldHelp) => {
        CypressMountWithProviders(<TextareaComponent fieldHelp={fieldHelp} />);

        fieldHelpPreview().should("have.text", fieldHelp);
      }
    );

    it.each(["add", "filter", "play"] as TextareaProps["inputIcon"][])(
      "should render Textarea with inputIcon prop set to %s",
      (icon) => {
        CypressMountWithProviders(<TextareaComponent inputIcon={icon} />);

        getElement(icon).and("be.visible");
      }
    );

    it.each([
      "top",
      "bottom",
      "left",
      "right",
    ] as TextareaProps["tooltipPosition"][])(
      "should render Textarea component with tooltip positioned to the %s",
      (position) => {
        CypressMountWithProviders(
          <Box m="250px">
            <TextareaComponent
              error={CHARACTERS.STANDARD}
              tooltipPosition={position}
            />
          </Box>
        );
        getDataElementByValue("error").trigger("mouseover");
        tooltipPreview()
          .should("have.text", CHARACTERS.STANDARD)
          .should("have.attr", "data-placement", position);
      }
    );

    it("should render Textarea with helpAriaLabel prop", () => {
      CypressMountWithProviders(
        <TextareaComponent
          labelHelp="field help"
          helpAriaLabel={CHARACTERS.STANDARD}
        />
      );

      getComponent("help").should(
        "have.attr",
        "aria-label",
        CHARACTERS.STANDARD
      );
    });

    it.each(["left", "right"] as TextareaProps["align"][])(
      "should render Textarea with align prop set to %s",
      (align) => {
        CypressMountWithProviders(<TextareaComponent align={align} />);

        textareaChildren().should("have.css", "text-align", align);
      }
    );

    it.each(testData)(
      "should input into Textarea and verify the value",
      (input) => {
        CypressMountWithProviders(<TextareaComponent />);

        textareaChildren().type(input).should("have.text", input);
      }
    );

    it.each(testData)(
      "should render Textarea with value prop set to %s",
      (value) => {
        CypressMountWithProviders(<TextareaComponent value={value} />);

        textareaChildren().should("have.text", value);
      }
    );

    it.each([5, 25, 100])(
      "should render Textarea with cols prop set to %s",
      (cols) => {
        CypressMountWithProviders(<TextareaComponent cols={cols} />);

        textareaChildren().should("have.attr", "cols", cols);
      }
    );

    it.each([5, 25, 100])(
      "should render Textarea with rows prop set to %s",
      (rows) => {
        CypressMountWithProviders(<TextareaComponent rows={rows} />);

        textareaChildren().should("have.attr", "rows", rows);
      }
    );

    it.each([
      [true, 106],
      [false, 64],
    ])(
      "should verify Textarea is displayed with expandable set to %s",
      (boolean, height) => {
        CypressMountWithProviders(<TextareaComponent expandable={boolean} />);

        textareaChildren()
          .type("t{enter}e{enter}s{enter}t{enter}")
          .wait(50)
          .then(($el) => {
            expect(parseInt($el.css("height"))).to.be.within(
              height - 3,
              height + 3
            );
          });
      }
    );
  });

  describe("check events for Textarea component", () => {
    const inputValue = "1";

    it("should call onChange callback when a type event is triggered", () => {
      const callback: TextareaProps["onChange"] = cy.stub();

      CypressMountWithProviders(<TextareaComponent onChange={callback} />);

      textareaChildren()
        .type(inputValue)
        .then(() => {
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      const callback: TextareaProps["onBlur"] = cy.stub();

      CypressMountWithProviders(<TextareaComponent onBlur={callback} />);

      textareaChildren()
        .click()
        .blur()
        .then(() => {
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClick callback when a click event is triggered", () => {
      const callback: TextareaProps["onClick"] = cy.stub();

      CypressMountWithProviders(<TextareaComponent onClick={callback} />);

      textareaChildren()
        .click()
        .then(() => {
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      const callback: TextareaProps["onFocus"] = cy.stub();

      CypressMountWithProviders(<TextareaComponent onFocus={callback} />);

      textareaChildren()
        .focus()
        .then(() => {
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onMouseDown callback when a mousedown event is triggered", () => {
      const callback: TextareaProps["onMouseDown"] = cy.stub();

      CypressMountWithProviders(<TextareaComponent onMouseDown={callback} />);

      textareaChildren()
        .trigger("mousedown")
        .then(() => {
          expect(callback).to.have.been.calledOnce;
        });
    });

    const keyToTrigger = ["Enter", "Space"] as const;

    it.each([keyToTrigger[0], keyToTrigger[1]])(
      "should call onKeyDown callback when %s key is triggered",
      (key) => {
        const callback: TextareaProps["onKeyDown"] = cy.stub();

        CypressMountWithProviders(<TextareaComponent onKeyDown={callback} />);

        textareaChildren()
          .focus()
          .trigger("keydown", { ...keyCode(key), force: true })
          .then(() => {
            expect(callback).to.have.been.calledOnce;
          });
      }
    );
  });

  describe("Accessibility tests for Textarea component", () => {
    it("should pass accessibility tests for Textarea default story", () => {
      CypressMountWithProviders(<stories.DefaultStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea AutoFocusStory", () => {
      CypressMountWithProviders(<stories.AutoFocusStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea CharacterLimitStory", () => {
      CypressMountWithProviders(<stories.CharacterLimitStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea CustomWidthStory", () => {
      CypressMountWithProviders(<stories.CustomWidthStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea DisabledStory", () => {
      CypressMountWithProviders(<stories.DisabledStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea ExpandableStory", () => {
      CypressMountWithProviders(<stories.ExpandableStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea FieldHelpStory", () => {
      CypressMountWithProviders(<stories.FieldHelpStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea LabelAlignStory", () => {
      CypressMountWithProviders(<stories.LabelAlignStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea LabelHelpStory", () => {
      CypressMountWithProviders(<stories.LabelHelpStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea LabelInlineStory", () => {
      CypressMountWithProviders(<stories.LabelInlineStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea MaxWidthStory", () => {
      CypressMountWithProviders(<stories.MaxWidthStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea NewDesignValidationStory", () => {
      CypressMountWithProviders(<stories.NewDesignValidationStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea ReadOnlyStory", () => {
      CypressMountWithProviders(<stories.ReadOnlyStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea RequiredStory", () => {
      CypressMountWithProviders(<stories.RequiredStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea ValidationBooleanStory", () => {
      CypressMountWithProviders(<stories.ValidationBooleanStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea ValidationLabelPositionStory", () => {
      CypressMountWithProviders(<stories.ValidationLabelPositionStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea ValidationLabelStory", () => {
      CypressMountWithProviders(<stories.ValidationLabelStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea ValidationStringPositionStory", () => {
      CypressMountWithProviders(<stories.ValidationStringPositionStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea ValidationStringStory", () => {
      CypressMountWithProviders(<stories.ValidationStringStory />);

      cy.checkAccessibility();
    });
  });

  it("should have the expected border radius styling", () => {
    CypressMountWithProviders(<TextareaComponent />);
    getElement("input").parent().should("have.css", "border-radius", "4px");
  });

  it("should not change the scroll position of a scrollable container when typing", () => {
    CypressMountWithProviders(<InScrollableContainer />);

    cy.get('[data-element="form-content"]').scrollTo("bottom");
    textareaChildren()
      .click({ force: true })
      .type("{rightArrow}foo", { force: true });
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.get('[data-element="form-content"]').then(($el) =>
      expect($el.scrollTop()).greaterThan(1000)
    );
  });
});
