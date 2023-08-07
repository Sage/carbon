/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/valid-expect, no-unused-expressions */
import React from "react";
import Message, { MessageProps } from "../../../src/components/message";
import {
  MessageComponent,
  MessageComponentWithRef,
} from "../../../src/components/message/message-test.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { getDataElementByValue } from "../../locators";
import {
  messagePreview,
  messageChildren,
  messageTitle,
  messageDismissIcon,
  messageDismissIconButton,
  messageContent,
  variantPreview,
} from "../../locators/message/index";
import { buttonDataComponent } from "../../locators/button";
import {
  VALIDATION,
  CHARACTERS,
} from "../../support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Tests for Message component", () => {
  describe("should check Message component properties", () => {
    it.each([
      ["info", "rgb(51, 91, 112)"],
      ["error", VALIDATION.ERROR],
      ["success", "rgb(0, 138, 33)"],
      ["warning", VALIDATION.WARNING],
    ] as [MessageProps["variant"], string][])(
      "should check %s variant for Message component",
      (variant, backgroundColor) => {
        CypressMountWithProviders(<MessageComponent variant={variant} />);
        variantPreview().should(
          "have.css",
          "background-color",
          backgroundColor
        );
      }
    );

    it.each(testData)(
      "should check %s as children for Message component",
      (stringValue) => {
        CypressMountWithProviders(<Message>{stringValue}</Message>);
        messageChildren().should("have.text", stringValue);
      }
    );

    it.each(testData)(
      "should check %s className for Message component",
      (className) => {
        CypressMountWithProviders(<MessageComponent className={className} />);
        messagePreview().should("have.class", className);
      }
    );

    it.each(testData)("should check %s id for Message component", (id) => {
      CypressMountWithProviders(<MessageComponent id={id} />);
      messagePreview().should("have.id", id);
    });

    it.each([true, false])(
      "should check when open is %s for Message component",
      (boolVal) => {
        CypressMountWithProviders(<MessageComponent open={boolVal} />);
        if (boolVal === true) {
          messagePreview().should("be.visible");
        } else {
          messagePreview().should("not.exist");
        }
      }
    );

    it("should focus component when open is true and component has a ref", () => {
      CypressMountWithProviders(<MessageComponentWithRef />);

      buttonDataComponent().click();
      messagePreview().should("be.focused");
    });

    // Unable to run this test due to the Message component having a tabIndex of -1.
    // cypress-plugin-tab does not allow tabbing on elements with an tabIndex of -1,
    // however this test has been kept incase the bug is ever addressed. https://github.com/kuceb/cypress-plugin-tab/issues/18
    it.skip("should focus icon button when open is true for Message component and tab key is pressed", () => {
      CypressMountWithProviders(<MessageComponentWithRef />);

      buttonDataComponent().click();
      messagePreview().should("be.focused");
      messagePreview().tab();
      messageDismissIconButton().should("be.focused");
    });

    it.each(testData)(
      "should check %s title for Message component",
      (title) => {
        CypressMountWithProviders(<MessageComponent title={title} />);
        messageTitle().should("have.text", title);
      }
    );

    it.each([
      [true, "rgba(0, 0, 0, 0)"],
      [false, "rgb(255, 255, 255)"],
    ])(
      "should check %s for transparent background for Message component",
      (boolVal, backgroundColor) => {
        CypressMountWithProviders(<MessageComponent transparent={boolVal} />);
        messagePreview().should(
          "have.css",
          "background-color",
          backgroundColor
        );
      }
    );

    it.each([
      [true, 50],
      [false, 20],
    ])(
      "should check showCloseIcon when it's %s for Message component",
      (boolVal, paddingVal) => {
        CypressMountWithProviders(<MessageComponent showCloseIcon={boolVal} />);
        if (boolVal === true) {
          messageDismissIcon().should("be.visible");
          messageContent().should(
            "have.css",
            "padding",
            `15px ${paddingVal}px 15px 20px`
          );
        } else {
          messageDismissIcon().should("not.exist");
          messageContent().should(
            "have.css",
            "padding",
            `15px ${paddingVal}px`
          );
        }
      }
    );

    it.each(testData)(
      "should check close button %s aria-label for Message component",
      (ariaLabel) => {
        CypressMountWithProviders(
          <MessageComponent closeButtonAriaLabel={ariaLabel} />
        );
        getDataElementByValue("close").should(
          "have.attr",
          "aria-label",
          ariaLabel
        );
      }
    );

    it("should call onDismiss callback when a click event is triggered", () => {
      const callback = cy.stub();

      CypressMountWithProviders(<MessageComponent onDismiss={callback} />);
      messageDismissIcon()
        .click()
        .then(() => {
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("Accessibility tests for Message component", () => {
    it.each([
      "info",
      "error",
      "success",
      "warning",
    ] as MessageProps["variant"][])(
      "should check %s as variant for accessibility tests",
      (variant) => {
        CypressMountWithProviders(<MessageComponent variant={variant} />);
        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check %s as children for accessibility tests",
      (stringValue) => {
        CypressMountWithProviders(<Message>{stringValue}</Message>);
        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check %s as className for accessibility tests",
      (className) => {
        CypressMountWithProviders(<MessageComponent className={className} />);
        cy.checkAccessibility();
      }
    );

    it.each(testData)("should check %s as id for accessibility tests", (id) => {
      CypressMountWithProviders(<MessageComponent id={id} />);
      cy.checkAccessibility();
    });

    it.each([true, false])(
      "should check open value is %s for accessibility tests",
      (boolVal) => {
        CypressMountWithProviders(<MessageComponent open={boolVal} />);
        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check %s as title for accessibility tests",
      (title) => {
        CypressMountWithProviders(<MessageComponent title={title} />);
        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "should check transparent value is %s for accessibility tests",
      (boolVal) => {
        CypressMountWithProviders(<MessageComponent transparent={boolVal} />);
        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "should check showCloseIcon value is %s for accessibility tests",
      (boolVal) => {
        CypressMountWithProviders(<MessageComponent showCloseIcon={boolVal} />);
        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check %s as closeButtonAriaLabel for accessibility tests",
      (ariaLabel) => {
        CypressMountWithProviders(
          <MessageComponent closeButtonAriaLabel={ariaLabel} />
        );
        cy.checkAccessibility();
      }
    );

    it("should check onDismiss for accessibility tests", () => {
      const callback = cy.stub();
      CypressMountWithProviders(<MessageComponent onDismiss={callback} />);
      cy.checkAccessibility();
    });
  });

  it("should render with expected border radius styling", () => {
    CypressMountWithProviders(<MessageComponent />);

    messagePreview().should("have.css", "border-radius", "8px");
  });
});
