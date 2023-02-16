import React from "react";
import * as stories from "./textbox-test.stories";
import * as defaultStories from "./textbox.stories";
import Box from "../box";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  verifyRequiredAsteriskForLabel,
  checkGoldenOutline,
  useJQueryCssValueAndAssert,
} from "../../../cypress/support/component-helper/common-steps";

import {
  getDataElementByValue,
  tooltipPreview,
  commonInputCharacterLimit,
  body,
  getComponent,
  cyRoot,
  fieldHelpPreview,
  getElement,
} from "../../../cypress/locators";
import {
  CHARACTERS,
  SIZE,
  VALIDATION,
} from "../../../cypress/support/component-helper/constants";

import {
  textbox,
  textboxInput,
  textboxPrefix,
} from "../../../cypress/locators/textbox";

import { keyCode } from "../../../cypress/support/helper";
import Button from "../button/button.component";
import { ICON } from "../../../cypress/locators/locators";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const verifyOptional = (element) =>
  element.then(($els) => {
    // get Window reference from element
    const win = $els[0].ownerDocument.defaultView;
    // use getComputedStyle to read the pseudo selector
    const after = win.getComputedStyle($els[0], "after");
    // read the value of the `content` CSS property
    const contentValue = after.getPropertyValue("content");
    // the returned value will have double quotes around it, but this is correct
    expect(contentValue).to.eq('"(optional)"');
  });

context("Tests for Textbox component", () => {
  describe("check props for Textbox component", () => {
    it("should render Textbox with isOptional prop", () => {
      CypressMountWithProviders(<stories.TextboxComponent isOptional />);

      verifyOptional(getDataElementByValue("label").parent());
    });

    it("should render Textbox with data-component prop", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent data-component={CHARACTERS.STANDARD} />
      );

      getComponent(CHARACTERS.STANDARD).should("be.visible");
    });

    it("should render Textbox with data-element prop", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent data-element={CHARACTERS.STANDARD} />
      );
      cyRoot()
        .children()
        .children()
        .should("have.attr", "data-element", CHARACTERS.STANDARD);
    });

    it("should render Textbox with data-role prop", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent data-role={CHARACTERS.STANDARD} />
      );

      cyRoot()
        .children()
        .children()
        .should("have.attr", "data-role", CHARACTERS.STANDARD);
    });

    it("should render Textbox with id prop", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent id={CHARACTERS.STANDARD} />
      );

      textboxInput().should("have.attr", "id", CHARACTERS.STANDARD);
    });

    it.each(testData)(
      "should render Textbox with label prop set to %s",
      (label) => {
        CypressMountWithProviders(<stories.TextboxComponent label={label} />);

        getDataElementByValue("label").should("have.text", label);
      }
    );

    it("should render Textbox with labelInline prop", () => {
      CypressMountWithProviders(<stories.TextboxComponent labelInline />);

      getDataElementByValue("label")
        .parent()
        .should("have.css", "justify-content", "flex-end");
    });

    it.each([
      ["left", "start"],
      ["right", "end"],
    ])(
      "should render Textbox with labelAlign prop set to %s",
      (labelAlign, cssValue) => {
        CypressMountWithProviders(
          <stories.TextboxComponent labelInline labelAlign={labelAlign} />
        );

        getDataElementByValue("label")
          .parent()
          .should(($element) =>
            expect($element).to.have.css("justify-content", `flex-${cssValue}`)
          );
      }
    );

    it.each(testData)(
      "should render Textbox with labelHelp prop",
      (labelHelp) => {
        CypressMountWithProviders(
          <stories.TextboxComponent labelInline labelHelp={labelHelp} />
        );

        getDataElementByValue("question").trigger("mouseover");
        tooltipPreview().should("have.text", labelHelp);
      }
    );

    it.each([
      [1, "8px"],
      [2, "16px"],
    ])(
      "should render Textbox with labelSpacing prop set to %s",
      (spacing, padding) => {
        CypressMountWithProviders(
          <stories.TextboxComponent labelInline labelSpacing={spacing} />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "padding-right", padding);
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
          <stories.TextboxComponent
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

    it.each([
      ["foo", "exist"],
      ["", "not.exist"],
    ])(
      "input hint should be conditionally rendered",
      (inputHint, renderStatus) => {
        CypressMountWithProviders(
          <stories.TextboxComponent
            enforceCharacterLimit={false}
            inputHint={inputHint}
          />
        );

        getDataElementByValue("input-hint").should(renderStatus);
      }
    );

    it.each([
      [4, "exist"],
      ["", "not.exist"],
    ])(
      "character counter hint should be conditionally rendered",
      (characterLimit, renderStatus) => {
        CypressMountWithProviders(
          <stories.TextboxComponent
            enforceCharacterLimit={false}
            characterLimit={characterLimit}
          />
        );

        getDataElementByValue("input-hint").should(renderStatus);
      }
    );

    it.each(["10%", "30%", "50%", "80%", "100%"])(
      "should check maxWidth as %s for TextBox component",
      (maxWidth) => {
        CypressMountWithProviders(
          <stories.TextboxComponent maxWidth={maxWidth} />
        );

        getDataElementByValue("input")
          .parent()
          .parent()
          .should("have.css", "max-width", maxWidth);
      }
    );

    it("when maxWidth has no value it should render as 100%", () => {
      CypressMountWithProviders(<stories.TextboxComponent maxWidth="" />);

      getDataElementByValue("input")
        .parent()
        .parent()
        .should("have.css", "max-width", "100%");
    });

    it("should render Textbox with required prop", () => {
      CypressMountWithProviders(<stories.TextboxComponent required />);

      verifyRequiredAsteriskForLabel();
    });

    it.each([
      [11, 11, "rgba(0, 0, 0, 0.55)"],
      [11, 10, "rgb(203, 55, 74)"],
    ])(
      "should input %s characters and warn if over character limit of %s in Textbox",
      (charactersUsed, limit, color) => {
        const inputValue = "12345678901";
        const underCharacters =
          limit - charactersUsed === 1 ? "character" : "characters";
        const overCharacters =
          charactersUsed - limit === 1 ? "character" : "characters";

        CypressMountWithProviders(
          <stories.TextboxComponent
            enforceCharacterLimit={false}
            characterLimit={limit}
          />
        );

        textboxInput()
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

    it.each([
      [11, 11],
      [10, 10],
    ])(
      "should input %s characters and enforce character limit of %s in Textbox",
      (charactersUsed, limit) => {
        const inputValue = "12345678901";
        const underCharacters =
          limit - charactersUsed === 1 ? "character" : "characters";
        const overCharacters =
          charactersUsed - limit === 1 ? "character" : "characters";

        CypressMountWithProviders(
          <stories.TextboxComponent
            enforceCharacterLimit
            characterLimit={limit}
          />
        );

        textboxInput()
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

    it("should render Textbox with name prop", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent name={CHARACTERS.STANDARD} />
      );

      textboxInput().should("have.attr", "name", CHARACTERS.STANDARD);
    });

    it("should render Textbox with disabled prop", () => {
      CypressMountWithProviders(<stories.TextboxComponent disabled />);

      textboxInput().should("be.disabled").and("have.attr", "disabled");
    });

    it.each(testData)(
      "should render Textbox with placeholder prop set to %s",
      (placeholder) => {
        CypressMountWithProviders(
          <stories.TextboxComponent placeholder={placeholder} />
        );

        textboxInput().should("have.attr", "placeholder", placeholder);
      }
    );

    it("should render Textbox with autoFocus prop", () => {
      CypressMountWithProviders(<stories.TextboxComponent autoFocus />);

      body().tab();
      textboxInput()
        .should("be.focused")
        .then(($el) => {
          checkGoldenOutline($el.parent());
        });
    });

    it("should render Textbox with readOnly prop", () => {
      CypressMountWithProviders(<stories.TextboxComponent readOnly />);

      textboxInput().and("have.attr", "readOnly");
    });

    it.each(["error", "warning", "info"])(
      "should verify Textbox is displayed with %s validation icon on input",
      (type) => {
        CypressMountWithProviders(
          <stories.TextboxComponent
            labelInline
            labelAlign="right"
            {...{ [type]: "Message" }}
          />
        );

        textbox().find(ICON).should("have.attr", "data-element", type);
      }
    );

    it.each(["error", "warning", "info"])(
      "should verify Textbox is displayed with %s validation icon on label",
      (type) => {
        CypressMountWithProviders(
          <stories.TextboxComponent
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
      "should verify Textbox input border colour is %s when validation is %s and boolean prop is %s",
      (borderColor, type, bool) => {
        CypressMountWithProviders(
          <stories.TextboxComponent
            labelInline
            labelAlign="right"
            {...{ [type]: bool }}
          />
        );

        textbox().should("have.css", "border-bottom-color", borderColor);
      }
    );

    it("should render Textbox with leftChildren prop", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent leftChildren={<Button>Test</Button>} />
      );

      textbox()
        .children(0)
        .should("have.attr", "data-component", "button")
        .and("be.visible");
    });

    it.each(testData)(
      "should render Textbox with prefix prop set to %s",
      (prefix) => {
        CypressMountWithProviders(<stories.TextboxComponent prefix={prefix} />);

        textboxPrefix()
          .should("have.text", prefix)
          .and("have.css", "font-size", "14px")
          .and("have.css", "font-weight", "900")
          .and("have.css", "margin-left", "12px");
      }
    );

    it.each([
      [true, "input", "label"],
      [false, "label", "input"],
    ])(
      "should render Textbox with reverse prop set to %s",
      (boolean, firstElement, secondElement) => {
        CypressMountWithProviders(
          <stories.TextboxComponent reverse={boolean} />
        );

        getDataElementByValue("label").parent().parent().as("startPoint");

        cy.get("@startPoint")
          .children()
          .eq(0)
          .find(firstElement)
          .should("be.visible");
        cy.get("@startPoint")
          .children()
          .eq(1)
          .find(secondElement)
          .should("be.visible");
      }
    );

    it.each([
      [SIZE.SMALL, "32px"],
      [SIZE.MEDIUM, "40px"],
      [SIZE.LARGE, "48px"],
    ])(
      "should use %s as size and render Textbox with %s as height",
      (size, height) => {
        CypressMountWithProviders(<stories.TextboxComponent size={size} />);

        textbox().should("have.css", "min-height", height);
      }
    );

    it("should render Textbox with positionedChildren prop", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent positionedChildren={<Button>Test</Button>} />
      );

      textbox()
        .parent()
        .children(0)
        .should("have.attr", "data-component", "button")
        .and("be.visible");
    });

    it.each([
      ["flex", "399"],
      ["flex", "400"],
      ["block", "401"],
    ])(
      "should check Textbox label alignment is %s with adaptiveLabelBreakpoint %s and viewport 400",
      (displayValue, breakpoint) => {
        cy.viewport(400, 300);

        CypressMountWithProviders(
          <stories.TextboxComponent adaptiveLabelBreakpoint={breakpoint} />
        );

        getDataElementByValue("label")
          .parent()
          .parent()
          .should("have.css", "display", displayValue);
      }
    );

    it("should render Textbox with labelId prop", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent id={`${CHARACTERS.STANDARD}_cy`} />
      );

      getDataElementByValue("label")
        .should("have.attr", "id", `${CHARACTERS.STANDARD}_cy-label`)
        .and("have.attr", "for", `${CHARACTERS.STANDARD}_cy`);
    });

    it.each(testData)(
      "should render Textbox with fieldHelp prop set to %s",
      (fieldHelp) => {
        CypressMountWithProviders(
          <stories.TextboxComponent fieldHelp={fieldHelp} />
        );

        fieldHelpPreview().should("have.text", fieldHelp);
      }
    );

    it("should render Textbox with formattedValue prop", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent formattedValue={CHARACTERS.STANDARD} />
      );

      textboxInput().should("have.attr", "value", CHARACTERS.STANDARD);
    });

    it.each(["add", "filter", "play"])(
      "should render Textbox with inputIcon prop set to %s",
      (icon) => {
        CypressMountWithProviders(
          <stories.TextboxComponent inputIcon={icon} />
        );

        getElement(icon).and("be.visible");
      }
    );

    it("should render Textbox with iconTabIndex prop", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent iconTabIndex={25} inputIcon="add" />
      );

      getDataElementByValue("add").parent().should("have.attr", "tabindex", 25);
    });

    it.each(["top", "bottom", "left", "right"])(
      "should render Textbox component with tooltip positioned to the %s",
      (position) => {
        CypressMountWithProviders(
          <Box m="250px">
            <stories.TextboxComponent
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

    it("should render Textbox with helpAriaLabel prop", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent
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

    it.each(["left", "right"])(
      "should render Textbox with align prop set to %s",
      (align) => {
        CypressMountWithProviders(<stories.TextboxComponent align={align} />);

        textboxInput().should("have.css", "text-align", align);
      }
    );

    it("should render Textbox with inputRef prop and focus the input via click on ref component", () => {
      CypressMountWithProviders(<stories.TextboxComponentInputRef />);

      getComponent("button").click();
      textboxInput().should("be.focused");
    });

    it.each(testData)(
      "should input into Textbox and verify the value",
      (input) => {
        CypressMountWithProviders(<stories.TextboxComponent />);

        textboxInput().type(input).should("have.attr", "value", input);
      }
    );
  });

  describe("check events for Textbox component", () => {
    const inputValue = "1";
    let callback;
    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onChange callback when a type event is triggered", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent onChange={callback} />
      );

      textboxInput()
        .type(inputValue)
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<stories.TextboxComponent onBlur={callback} />);

      textboxInput()
        .click()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClick callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent onClick={callback} />
      );

      textboxInput()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent onFocus={callback} />
      );

      textboxInput()
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onMouseDown callback when a mousedown event is triggered", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent onMouseDown={callback} />
      );

      textboxInput()
        .trigger("mousedown")
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call iconOnMouseDown callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent iconOnMouseDown={callback} inputIcon="add" />
      );

      getComponent("icon")
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call iconOnClick callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <stories.TextboxComponent iconOnClick={callback} inputIcon="add" />
      );

      getComponent("icon")
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
    it.each([["Enter"], ["Space"]])(
      "should call iconOnClick callback when %s key is triggered",
      (key) => {
        CypressMountWithProviders(
          <stories.TextboxComponent
            inputIcon="home"
            iconOnClick={callback}
            iconTabIndex="0"
          />
        );

        getComponent("icon")
          .trigger("keydown", { ...keyCode(key), force: true })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it.each([["Enter"], ["Space"]])(
      "should call onKeyDown callback when %s key is triggered",
      (key) => {
        CypressMountWithProviders(
          <stories.TextboxComponent onKeyDown={callback} />
        );

        textboxInput()
          .focus()
          .trigger("keydown", { ...keyCode(key), force: true })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

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
          <stories.TextboxComponent
            deferTimeout={timeout}
            onChange={callbackOnChange}
            onChangeDeferred={callbackOnChangeDeff}
          />
        );

        cy.clock();

        textboxInput()
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
  });

  describe("Accessibility tests for Textbox component", () => {
    it("should pass accessibility tests for Textbox default story", () => {
      CypressMountWithProviders(<defaultStories.Default />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textbox autoFocus story", () => {
      CypressMountWithProviders(<defaultStories.AutoFocus />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textbox characterCounter story", () => {
      CypressMountWithProviders(<defaultStories.CharacterCounter />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textbox disabled story", () => {
      CypressMountWithProviders(<defaultStories.Disabled />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textbox LabelAlign story", () => {
      CypressMountWithProviders(<defaultStories.LabelAlign />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textbox Margins story", () => {
      CypressMountWithProviders(<defaultStories.Margins />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textbox NewDesignsValidation story", () => {
      CypressMountWithProviders(<defaultStories.NewDesignsValidation />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textbox Prefix story", () => {
      CypressMountWithProviders(<defaultStories.Prefix />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textbox ReadOnly story", () => {
      CypressMountWithProviders(<defaultStories.ReadOnly />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textbox Required story", () => {
      CypressMountWithProviders(<defaultStories.Required />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textbox Sizes story", () => {
      CypressMountWithProviders(<defaultStories.Sizes />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textbox ValidationsAsABoolean story", () => {
      CypressMountWithProviders(<defaultStories.ValidationsAsABoolean />);

      cy.checkAccessibility();
    });

    // FE-5382
    it.skip("should pass accessibility tests for Textbox ValidationsAsAString story", () => {
      CypressMountWithProviders(<defaultStories.ValidationsAsAString />);

      cy.checkAccessibility();
    });

    // FE-5382
    it.skip("should pass accessibility tests for Textbox ValidationsAsAStringDisplayedOnLabel story", () => {
      CypressMountWithProviders(
        <defaultStories.ValidationsAsAStringDisplayedOnLabel />
      );

      cy.checkAccessibility();
    });

    // FE-5382
    it.skip("should pass accessibility tests for Textbox ValidationsAsAStringWithTooltipCustom story", () => {
      CypressMountWithProviders(
        <defaultStories.ValidationsAsAStringWithTooltipCustom />
      );

      cy.checkAccessibility();
    });

    // FE-5382
    it.skip("should pass accessibility tests for Textbox ValidationsAsAStringWithTooltipDefault story", () => {
      CypressMountWithProviders(
        <defaultStories.ValidationsAsAStringWithTooltipDefault />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textbox WithCustomLabelWidthAndInputWidth story", () => {
      CypressMountWithProviders(
        <defaultStories.WithCustomLabelWidthAndInputWidth />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textbox WithCustomMaxWidth story", () => {
      CypressMountWithProviders(<defaultStories.WithCustomMaxWidth />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textbox WithFieldHelp story", () => {
      CypressMountWithProviders(<defaultStories.WithFieldHelp />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textbox WithLabelHelp story", () => {
      CypressMountWithProviders(<defaultStories.WithLabelHelp />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textbox WithLabelInline story", () => {
      CypressMountWithProviders(<defaultStories.WithLabelInline />);

      cy.checkAccessibility();
    });
  });
});
