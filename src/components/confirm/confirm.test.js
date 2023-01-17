import React from "react";
import Confirm from "./confirm.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { ConfirmComponent } from "./confirm-test.stories";
import {
  dialogPreview,
  dialogSubtitle,
  confirmButton,
  cancelButton,
} from "../../../cypress/locators/confirm";
import { getDataElementByValue, icon } from "../../../cypress/locators/index";
import { positionOfElement, keyCode } from "../../../cypress/support/helper";
import {
  SIZE,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const heights = [
  [0, "0"],
  [10, "10"],
  [999, "999"],
  [1500, "1500"],
];
const confirmButtonTypes = [
  ["primary", "rgb(255, 255, 255)", "rgba(0, 0, 0, 0)"],
  ["secondary", "rgb(0, 126, 69)", "rgb(0, 126, 69)"],
  ["tertiary", "rgb(0, 126, 69)", "rgba(0, 0, 0, 0)"],
  ["dashed", "rgb(51, 91, 112)", "rgb(51, 91, 112)"],
  ["darkBackground", "rgb(0, 126, 69)", "rgba(0, 0, 0, 0)"],
];
const cancelButtonTypes = [
  ["primary", "rgb(255, 255, 255)", "rgba(0, 0, 0, 0)"],
  ["secondary", "rgb(0, 126, 69)", "rgb(0, 126, 69)"],
  ["tertiary", "rgb(0, 126, 69)", "rgba(0, 0, 0, 0)"],
  ["dashed", "rgb(51, 91, 112)", "rgb(51, 91, 112)"],
  ["darkBackground", "rgb(0, 126, 69)", "rgba(0, 0, 0, 0)"],
];

context("Testing Confirm component", () => {
  describe("should render Confirm component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it.each(testData)(
      "should check confirm button text is %s",
      (confirmButtonText) => {
        CypressMountWithProviders(
          <ConfirmComponent confirmLabel={confirmButtonText} />
        );

        confirmButton().should("have.text", confirmButtonText);
      }
    );

    it.each(testData)(
      "should check cancel button text is %s",
      (cancelButtonText) => {
        CypressMountWithProviders(
          <ConfirmComponent cancelLabel={cancelButtonText} />
        );

        cancelButton().should("have.text", cancelButtonText);
      }
    );

    it.each(testData)("should check title text is %s", (titleText) => {
      CypressMountWithProviders(<ConfirmComponent title={titleText} />);

      getDataElementByValue("title").should("have.text", titleText);
    });

    it.each(testData)("should check subtitle text is %s", (subTitleText) => {
      CypressMountWithProviders(<ConfirmComponent subtitle={subTitleText} />);

      dialogSubtitle().should("have.text", subTitleText);
    });

    it.each(heights)(
      "should check Confirm height is %spx",
      (heightnumber, heightstring) => {
        CypressMountWithProviders(<ConfirmComponent height={heightstring} />);

        const { viewportHeight } = Cypress.config();

        let resultHeight;
        if (heightnumber >= viewportHeight - 20) {
          resultHeight = viewportHeight - 20;
        } else {
          resultHeight = heightnumber;
        }

        dialogPreview().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", resultHeight);
        });
      }
    );

    it.each([
      [SIZE.EXTRASMALL, 300],
      [SIZE.SMALL, 380],
      [SIZE.MEDIUMSMALL, 540],
      [SIZE.MEDIUM, 750],
      [SIZE.MEDIUMLARGE, 850],
      [SIZE.LARGE, 960],
      [SIZE.EXTRALARGE, 1080],
    ])(
      "should check confirm size is %s with width of %spx",
      (sizeName, size) => {
        CypressMountWithProviders(<ConfirmComponent size={sizeName} />);

        dialogPreview().then(($el) => {
          useJQueryCssValueAndAssert($el, "width", size);
        });
      }
    );

    it.each([["error"], ["warning"]])(
      "should check confirm has %s icon",
      (iconType) => {
        CypressMountWithProviders(<ConfirmComponent iconType={iconType} />);

        icon()
          .eq(positionOfElement("first"))
          .should("have.attr", "data-element", iconType);
      }
    );

    it.each(confirmButtonTypes)(
      "should check confirm button is %s type",
      (type, colour, border) => {
        CypressMountWithProviders(
          <ConfirmComponent confirmButtonType={type} />
        );

        confirmButton()
          .should("have.css", "color", colour)
          .and("have.css", "border-color", border);
      }
    );

    it.each(cancelButtonTypes)(
      "should check cancel button is %s type",
      (type, colour, border) => {
        CypressMountWithProviders(<ConfirmComponent cancelButtonType={type} />);

        cancelButton()
          .should("have.css", "color", colour)
          .and("have.css", "border-color", border);
      }
    );

    it.each([
      [true, "disabled"],
      [false, "enabled"],
    ])(
      "should check when disableCancel prop is %s that cancel button is %s",
      (state) => {
        CypressMountWithProviders(<ConfirmComponent disableCancel={state} />);

        if (state === true) {
          cancelButton().should("be.disabled").and("have.attr", "disabled");
        } else {
          cancelButton().should("not.be.disabled");
        }
      }
    );

    it.each([
      [true, "disabled"],
      [false, "enabled"],
    ])(
      "should check when disableConfirm prop is %s that confirm button is %s",
      (state) => {
        CypressMountWithProviders(<ConfirmComponent disableConfirm={state} />);

        if (state === true) {
          confirmButton().should("be.disabled").and("have.attr", "disabled");
        } else {
          confirmButton().should("not.be.disabled");
        }
      }
    );

    it("should check confirm button is loading", () => {
      CypressMountWithProviders(<ConfirmComponent isLoadingConfirm />);

      confirmButton().should("be.disabled").and("have.attr", "disabled");
      confirmButton()
        .children()
        .children()
        .children()
        .should("have.attr", "data-component", "loader")
        .and("be.visible");
    });

    it("should check Esc key is disabled", () => {
      CypressMountWithProviders(<ConfirmComponent disableEscKey />);

      dialogPreview()
        .trigger("keyup", keyCode("Esc"))
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).not.to.have.been.calledOnce;
        });

      dialogPreview().should("be.visible");
    });

    it("should check close icon is enabled", () => {
      CypressMountWithProviders(<ConfirmComponent showCloseIcon />);

      icon().click();

      dialogPreview().should("not.exist");
    });

    it.each([
      [true, "rgb(203, 55, 74)", "rgb(203, 55, 74)"],
      [false, "rgb(0, 126, 69)", "rgb(0, 126, 69)"],
    ])(
      "should check cancel button has destructive CSS properties",
      (state, color, bordercolor) => {
        CypressMountWithProviders(
          <ConfirmComponent cancelButtonDestructive={state} />
        );

        cancelButton()
          .should("have.css", "color", color)
          .and("have.css", "border-color", bordercolor);
      }
    );

    it.each([
      [true, "rgb(203, 55, 74)"],
      [false, "rgb(0, 126, 69)"],
    ])(
      "should check confirm button has destructive CSS properties",
      (state, backgroundcolor) => {
        CypressMountWithProviders(
          <ConfirmComponent confirmButtonDestructive={state} />
        );

        confirmButton().should("have.css", "background-color", backgroundcolor);
      }
    );

    it("should check clicking cancel button closes dialog", () => {
      CypressMountWithProviders(<ConfirmComponent />);

      cancelButton().click();
      dialogPreview().should("not.exist");
    });

    it("should check clicking confirm button closes dialog", () => {
      CypressMountWithProviders(<ConfirmComponent />);

      confirmButton().click();

      dialogPreview().should("not.exist");
    });

    it("should check clicking confirm button does not close dialog when confirm button is disabled", () => {
      CypressMountWithProviders(<ConfirmComponent disableConfirm />);

      confirmButton().click({ force: true });

      dialogPreview().should("be.visible");
    });

    it("should check clicking Esc key closes dialog", () => {
      CypressMountWithProviders(<ConfirmComponent />);

      dialogPreview().trigger("keyup", keyCode("Esc"));

      dialogPreview().should("not.exist");
    });

    it("should render Confirm with aria-label prop", () => {
      CypressMountWithProviders(<ConfirmComponent aria-label="cypress-aria" />);

      dialogPreview().should("have.attr", "aria-label", "cypress-aria");
    });

    it("should check confirm button has save icon", () => {
      CypressMountWithProviders(
        <ConfirmComponent confirmButtonIconType="Save" />
      );

      getDataElementByValue("Save").should("have.attr", "type", "Save");
    });

    it("should check cancel button has bin icon", () => {
      CypressMountWithProviders(
        <ConfirmComponent cancelButtonIconType="bin" />
      );

      getDataElementByValue("bin").should("have.attr", "type", "bin");
    });

    it("should render Confirm with aria-labelledby prop", () => {
      CypressMountWithProviders(
        <Confirm open aria-labelledby={CHARACTERS.STANDARD} />
      );

      dialogPreview().should(
        "have.attr",
        "aria-labelledby",
        CHARACTERS.STANDARD
      );
    });

    it("should render Confirm with aria-describedby prop", () => {
      CypressMountWithProviders(
        <Confirm open aria-describedby={CHARACTERS.STANDARD} />
      );

      dialogPreview().should(
        "have.attr",
        "aria-describedby",
        CHARACTERS.STANDARD
      );
    });

    it("should focus the dialog container", () => {
      CypressMountWithProviders(<ConfirmComponent blockFocusElement />);
      const dialogContainer = () => cy.get('[data-component="dialog"]');
      dialogContainer().should("be.focused");
    });

    it.each([
      ["before", 0],
      ["after", 1],
    ])(
      "should verify position of icon on Cancel button",
      (position, positionInElement) => {
        CypressMountWithProviders(
          <ConfirmComponent
            cancelButtonIconType="bin"
            cancelButtonIconPosition={position}
          />
        );

        cancelButton()
          .children()
          .eq(positionInElement)
          .should("have.attr", "data-element", "bin");
      }
    );
  });

  describe("should render Confirm component for event tests", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onCancel callback when a click event is triggered", () => {
      CypressMountWithProviders(<ConfirmComponent onCancel={callback} />);

      cancelButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onConfirm callback when a click event is triggered", () => {
      CypressMountWithProviders(<ConfirmComponent onConfirm={callback} />);

      confirmButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should check onCancel callback when Esc key event is triggered", () => {
      CypressMountWithProviders(<ConfirmComponent onCancel={callback} />);

      dialogPreview()
        .trigger("keyup", keyCode("Esc"))
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("should check accessibility for Confirm", () => {
    it.each(confirmButtonTypes)(
      "should check accessibility for confirm button of %s type",
      (type) => {
        CypressMountWithProviders(
          <ConfirmComponent confirmButtonType={type} />
        );
        cy.checkAccessibility();
      }
    );

    it.each(cancelButtonTypes)(
      "should check accessibility for cancel button of %s type",
      (type) => {
        CypressMountWithProviders(
          <ConfirmComponent cancelButtonTypes={type} />
        );
        cy.checkAccessibility();
      }
    );

    it.each([
      [true, "disabled"],
      [false, "enabled"],
    ])(
      "should check accessibility when disableCancel prop is %s that cancel button is %s",
      (state) => {
        CypressMountWithProviders(<ConfirmComponent disableCancel={state} />);

        cy.checkAccessibility();
      }
    );

    it.each([
      [true, "disabled"],
      [false, "enabled"],
    ])(
      "should check accessibility when disableConfirm prop is %s that confirm button is %s",
      (state) => {
        CypressMountWithProviders(<ConfirmComponent disableConfirm={state} />);

        cy.checkAccessibility();
      }
    );

    it("should check accessibility for confirm button is loading", () => {
      CypressMountWithProviders(<ConfirmComponent isLoadingConfirm />);

      cy.checkAccessibility();
    });

    it("should check accessibility for Esc key is disabled", () => {
      CypressMountWithProviders(<ConfirmComponent disableEscKey />);

      cy.checkAccessibility();
    });

    it("should check accessibility for close icon is enabled", () => {
      CypressMountWithProviders(<ConfirmComponent showCloseIcon />);

      cy.checkAccessibility();
    });

    it("should check accessibility when clicking cancel button closes dialog", () => {
      CypressMountWithProviders(<ConfirmComponent />);

      cy.checkAccessibility();
    });

    it("should check accessibility when clicking confirm button does not close dialog when confirm button is disabled", () => {
      CypressMountWithProviders(<ConfirmComponent disableConfirm />);

      cy.checkAccessibility();
    });

    it("should check accessibility when confirm button has save icon", () => {
      CypressMountWithProviders(
        <ConfirmComponent confirmButtonIconType="Save" />
      );

      cy.checkAccessibility();
    });

    it("should check accessibility when cancel button has bin icon", () => {
      CypressMountWithProviders(
        <ConfirmComponent cancelButtonIconType="bin" />
      );

      cy.checkAccessibility();
    });

    it("should check accessibility for isLoadingConfirm state", () => {
      CypressMountWithProviders(<ConfirmComponent isLoadingConfirm />);

      cy.checkAccessibility();
    });
  });
});
