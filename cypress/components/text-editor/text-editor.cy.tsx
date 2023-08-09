/* eslint-disable jest/no-disabled-tests */
import React from "react";
import { TextEditorProps } from "../../../src/components/text-editor";
import {
  TextEditorCustom,
  TextEditorCustomValidation,
} from "../../../src/components/text-editor/text-editor-test.stories";

import {
  textEditorInput,
  textEditorCounter,
  textEditorContainer,
  textEditorToolbar,
  innerText,
  innerTextList,
} from "../../locators/text-editor";

import { getDataElementByValue } from "../../locators";
import {
  positionOfElement,
  keyCode,
  pressShiftTABKey,
} from "../../support/helper";
import {
  checkGoldenOutline,
  verifyRequiredAsteriskForLabel,
} from "../../support/component-helper/common-steps";
import {
  VALIDATION,
  CHARACTERS,
} from "../../support/component-helper/constants";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

const textForInput = "Testing is awesome";
const linkText = "https://carbon.sage.com";
const longText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const longTextAssert =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ";
const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Test for TextEditor component", () => {
  describe("check functionality for TextEditor component", () => {
    it("should check the counter works properly", () => {
      CypressMountWithProviders(<TextEditorCustom />);

      textEditorInput().clear().type(textForInput);
      textEditorCounter().should("have.text", 2982);
    });

    it.each(["bold", "italic"])(
      "should render text using %s style",
      (buttonType) => {
        CypressMountWithProviders(<TextEditorCustom />);

        textEditorToolbar(buttonType).click();
        textEditorInput().clear().type(textForInput);
        if (buttonType === "bold") {
          innerText().should("have.css", "font-weight", "700");
        } else if (buttonType === "italic") {
          innerText().should("have.css", "font-style", "italic");
        }
        textEditorToolbar(buttonType).should(
          "have.css",
          "background-color",
          "rgb(204, 214, 219)"
        );
      }
    );

    it.each(["bullet-list", "number-list"])(
      "should render text in %s style",
      (buttonType) => {
        CypressMountWithProviders(<TextEditorCustom />);

        textEditorToolbar(buttonType).click();
        textEditorInput().clear().type("Testing{Enter}is{Enter}awesome");
        if (buttonType === "bullet-list") {
          innerTextList("ul", positionOfElement("second")).should(
            "have.text",
            "Testing"
          );
          innerTextList("ul", positionOfElement("third")).should(
            "have.text",
            "is"
          );
          innerTextList("ul", positionOfElement("fourth")).should(
            "have.text",
            "awesome"
          );
        } else if (buttonType === "bullet-list-numbers") {
          innerTextList("ol", positionOfElement("second")).should(
            "have.text",
            "Testing"
          );
          innerTextList("ol", positionOfElement("third")).should(
            "have.text",
            "is"
          );
          innerTextList("ol", positionOfElement("fourth")).should(
            "have.text",
            "awesome"
          );
        }
        textEditorToolbar(buttonType).should(
          "have.css",
          "background-color",
          "rgb(204, 214, 219)"
        );
      }
    );

    it.each([
      ["bold", 0],
      ["italic", 1],
      ["bullet-list", 2],
      ["number-list", 3],
    ])(
      "should focus %s button using RightArrow keyboard key",
      (buttonType, times) => {
        CypressMountWithProviders(<TextEditorCustom />);
        textEditorInput().focus().tab();
        for (let i = 0; i < times; i++) {
          cy.focused().trigger("keydown", keyCode("rightarrow"));
        }
        textEditorToolbar(buttonType).should("be.focused");
      }
    );

    it.each([
      ["bold", 4],
      ["italic", 3],
      ["bullet-list", 2],
      ["number-list", 1],
    ])(
      "should focus %s button using ArrowLeft keyboard key",
      (buttonType, times) => {
        CypressMountWithProviders(<TextEditorCustom />);
        textEditorInput().focus().tab();
        for (let i = 0; i < times; i++) {
          cy.focused().trigger("keydown", keyCode("leftarrow"));
        }
        textEditorToolbar(buttonType).should("be.focused");
      }
    );

    it.each([
      ["bold", 0],
      ["italic", 1],
      ["bullet-list", 2],
      ["number-list", 3],
    ])(
      "should activate %s button using Enter keyboard key",
      (buttonType, times) => {
        CypressMountWithProviders(<TextEditorCustom />);
        textEditorInput().focus().tab();
        for (let i = 0; i < times; i++) {
          cy.focused().trigger("keydown", keyCode("rightarrow"));
        }
        cy.focused().trigger("keydown", keyCode("Enter"));
        textEditorToolbar(buttonType).should(
          "have.css",
          "background-color",
          "rgb(204, 214, 219)"
        );
      }
    );

    it.each([
      ["bold", 0],
      ["italic", 1],
      ["bullet-list", 2],
      ["number-list", 3],
    ])(
      "should activate %s button using Space keyboard key",
      (buttonType, times) => {
        CypressMountWithProviders(<TextEditorCustom />);
        textEditorInput().focus().tab();
        for (let i = 0; i < times; i++) {
          cy.focused().trigger("keydown", keyCode("rightarrow"));
        }
        cy.focused().trigger("keydown", keyCode("Space"));
        textEditorToolbar(buttonType).should(
          "have.css",
          "background-color",
          "rgb(204, 214, 219)"
        );
      }
    );

    it("should render formatted link", () => {
      CypressMountWithProviders(<TextEditorCustom />);

      textEditorInput().clear().type(linkText);
      innerText().should("have.text", linkText);
    });

    it("should not allow user to type more than characterLimit", () => {
      CypressMountWithProviders(<TextEditorCustom characterLimit={100} />);

      textEditorInput().clear().type(longText);

      textEditorCounter().should("have.text", 0);
      innerText().should("have.text", longTextAssert);
    });

    it("should focus the first button when focus is moved to the input from the toolbar and tab key pressed", () => {
      CypressMountWithProviders(<TextEditorCustom />);
      textEditorInput().focus().tab();
      textEditorToolbar("bold").should("be.focused");
      cy.focused().trigger("keydown", keyCode("rightarrow"));
      textEditorToolbar("italic").should("be.focused");
      cy.root().click();
      textEditorInput().focus().tab();
      textEditorToolbar("bold").should("be.focused");
    });

    it("should focus the first button when focus is moved outside of the component from the toolbar and shift-tab key pressed", () => {
      CypressMountWithProviders(<TextEditorCustom />);
      textEditorInput().focus().tab();
      textEditorToolbar("bold").should("be.focused");
      cy.focused().trigger("keydown", keyCode("rightarrow"));
      textEditorToolbar("italic").should("be.focused");
      textEditorToolbar("italic").tab();
      pressShiftTABKey(1);
      textEditorToolbar("bold").should("be.focused");
    });

    describe("check props for TextEditor component", () => {
      it.each(testData)(
        "should render TextEditor with %s as a label",
        (labelValue) => {
          CypressMountWithProviders(
            <TextEditorCustom labelText={labelValue} />
          );

          getDataElementByValue("label")
            .invoke("text")
            .should("equal", labelValue);
        }
      );

      it("should render TextEditor with required prop", () => {
        CypressMountWithProviders(<TextEditorCustom required />);

        verifyRequiredAsteriskForLabel();
      });

      it.each([
        ["error", 0, VALIDATION.ERROR],
        ["warning", 5, VALIDATION.WARNING],
        ["info", 10, VALIDATION.INFO],
      ])("should show %s validation state", (state, times, color) => {
        CypressMountWithProviders(<TextEditorCustomValidation />);

        for (let i = 0; i < times; i++) {
          textEditorInput().type("{backspace}");
        }

        getDataElementByValue(state).then(($els) => {
          const win = $els[0].ownerDocument.defaultView;
          const before = win?.getComputedStyle($els[0], "before");
          const contentValue = before?.getPropertyValue("color");
          cy.wrap(contentValue).should("equal", color);
        });
      });

      it.each([
        [2, 42],
        [4, 84],
      ])("should render TextEditor with set rows prop to %s", (rows, px) => {
        CypressMountWithProviders(<TextEditorCustom rows={rows} />);

        textEditorContainer().should("have.css", "min-height", `${px}px`);
      });

      it("render with the expected border radius on the toolbar buttons", () => {
        CypressMountWithProviders(<TextEditorCustom />);
        textEditorToolbar("bold").should("have.css", "border-radius", "4px");
        textEditorToolbar("italic").should("have.css", "border-radius", "4px");
        textEditorToolbar("bullet-list").should(
          "have.css",
          "border-radius",
          "4px"
        );
        textEditorToolbar("number-list").should(
          "have.css",
          "border-radius",
          "4px"
        );
      });
    });

    describe("check events for TextEditor component", () => {
      // created an issue FE-5139 to fix this
      it.skip("should call onChange callback when a type event is triggered", () => {
        const callback: TextEditorProps["onChange"] = cy.stub().as("onChange");

        CypressMountWithProviders(<TextEditorCustom onChange={callback} />);

        textEditorInput().type("t");

        cy.get("@onChange").should("have.been.calledOnce");
      });

      it("should call onLinkAdded callback when a valid url is detected by TextEditor", () => {
        const callback: TextEditorProps["onLinkAdded"] = cy
          .stub()
          .as("onLinkAdded");

        CypressMountWithProviders(<TextEditorCustom onLinkAdded={callback} />);

        textEditorInput().type("https://carbon.s");
        cy.get("@onLinkAdded").should("have.been.calledOnce");
      });
    });

    describe("rounded corners", () => {
      it("should render with the expected border radius on the toolbar buttons", () => {
        CypressMountWithProviders(<TextEditorCustom />);
        textEditorToolbar("bold").should("have.css", "border-radius", "4px");
        textEditorToolbar("italic").should("have.css", "border-radius", "4px");
        textEditorToolbar("bullet-list").should(
          "have.css",
          "border-radius",
          "4px"
        );
        textEditorToolbar("number-list").should(
          "have.css",
          "border-radius",
          "4px"
        );
      });
    });

    describe("when focused", () => {
      it("has the expected styling, focusRedesignOptOut true", () => {
        CypressMountWithProviders(<TextEditorCustom />, undefined, undefined, {
          focusRedesignOptOut: true,
        });
        textEditorInput().focus();
        textEditorContainer()
          .parent()
          .should("have.css", "outline", "rgb(255, 188, 25) solid 3px");
        textEditorToolbar("bold")
          .focus()
          .then(($el) => checkGoldenOutline($el));
        textEditorToolbar("italic")
          .focus()
          .then(($el) => checkGoldenOutline($el));
        textEditorToolbar("bullet-list")
          .focus()
          .then(($el) => checkGoldenOutline($el));
        textEditorToolbar("number-list")
          .focus()
          .then(($el) => checkGoldenOutline($el));
      });

      it("has the expected styling, focusRedesignOptOut false", () => {
        CypressMountWithProviders(<TextEditorCustom />);
        textEditorInput().focus();
        textEditorContainer()
          .parent()
          .should(
            "have.css",
            "box-shadow",
            "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
          )
          .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
        textEditorToolbar("bold")
          .focus()
          .should(
            "have.css",
            "box-shadow",
            "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
          )
          .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
        textEditorToolbar("italic")
          .focus()
          .should(
            "have.css",
            "box-shadow",
            "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
          )
          .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
        textEditorToolbar("bullet-list")
          .focus()
          .should(
            "have.css",
            "box-shadow",
            "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
          )
          .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
        textEditorToolbar("number-list")
          .focus()
          .should(
            "have.css",
            "box-shadow",
            "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
          )
          .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
      });
    });
  });

  describe("Accessibility tests for TextEditor component", () => {
    it("should check accessibility for TextEditor component", () => {
      CypressMountWithProviders(<TextEditorCustom />);

      cy.checkAccessibility();
    });

    it.each(testData)(
      "should check accessibility for TextEditor with %s as a label",
      (labelValue) => {
        CypressMountWithProviders(<TextEditorCustom labelText={labelValue} />);

        cy.checkAccessibility();
      }
    );

    it("should check accessibility for TextEditor with required prop", () => {
      CypressMountWithProviders(<TextEditorCustom required />);

      cy.checkAccessibility();
    });

    it("should check accessibility for TextEditor validation state", () => {
      CypressMountWithProviders(<TextEditorCustomValidation />);

      cy.checkAccessibility();
    });

    it.each([2, 4])(
      "should check accessibility when TextEditor with rows prop sets to %s",
      (rows) => {
        CypressMountWithProviders(<TextEditorCustom rows={rows} />);

        cy.checkAccessibility();
      }
    );
  });
});
