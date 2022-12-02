/* eslint-disable no-undef */
import * as React from "react";
import { useState } from "react";
import Button from "../button";
import Message from "./message.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import { getDataElementByValue } from "../../../cypress/locators";

import {
  messagePreview,
  messageChildren,
  messageTitle,
  messageDismissIcon,
  variantPreview,
} from "../../../cypress/locators/message/index";
import {
  VALIDATION,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const MessageComponent = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open Message</Button>}
      <Message open={isOpen} onDismiss={() => setIsOpen(false)} {...props}>
        Some custom message
      </Message>
    </div>
  );
};

context("Tests for Message component", () => {
  describe("should check Message component properties", () => {
    it.each([
      ["info", "rgb(51, 91, 112)"],
      ["error", VALIDATION.ERROR],
      ["success", "rgb(0, 138, 33)"],
      ["warning", VALIDATION.WARNING],
    ])(
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

    it.each([true, false])(
      "should check showCloseIcon when it's %s for Message component",
      (boolVal) => {
        CypressMountWithProviders(<MessageComponent showCloseIcon={boolVal} />);
        if (boolVal === true) {
          messageDismissIcon().should("be.visible");
        } else {
          messageDismissIcon().should("not.exist");
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
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });
});
