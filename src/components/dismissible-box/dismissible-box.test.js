import React from "react";
import { Default as DismissibleBoxCustomComponent } from "./dismissible-box-test.stories";
import * as stories from "./dismissible-box.stories";
import dismissibleBoxDataComponent from "../../../cypress/locators/dismissible-box";
import { icon } from "../../../cypress/locators/index.js";
import { keyCode } from "../../../cypress/support/helper";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";

context("Test for DismissibleBox component", () => {
  describe("check props for DismissibleBox component", () => {
    it.each([
      [true, "rgba(0, 0, 0, 0.9)"],
      [false, "rgb(204, 214, 219)"],
    ])(
      "should render DismissibleBox with hasBorderLeftHighlight prop set to %s",
      (boolValue, color) => {
        CypressMountWithProviders(
          <DismissibleBoxCustomComponent hasBorderLeftHighlight={boolValue} />
        );

        dismissibleBoxDataComponent().should(
          "have.css",
          "border-left-color",
          color
        );
      }
    );

    it.each([150, 350])(
      "should render DismissibleBox with width prop set to %s",
      (width) => {
        CypressMountWithProviders(
          <DismissibleBoxCustomComponent width={`${width}px`} />
        );

        dismissibleBoxDataComponent()
          .should("have.attr", "width", `${width}px`)
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", width);
          });
      }
    );

    it.each([
      ["light", "rgb(255, 255, 255)"],
      ["dark", "rgb(230, 235, 237)"],
    ])(
      "should render DismissibleBox with variant prop set to %s",
      (variant, color) => {
        CypressMountWithProviders(
          <DismissibleBoxCustomComponent variant={variant} />
        );

        dismissibleBoxDataComponent().should(
          "have.css",
          "background-color",
          color
        );
      }
    );

    describe("check events for DismissibleBox component", () => {
      let callback;

      beforeEach(() => {
        callback = cy.stub();
      });

      it("should call onClose callback when a mouse click event is triggered", () => {
        CypressMountWithProviders(
          <DismissibleBoxCustomComponent onClose={callback} />
        );

        icon()
          .click()
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });

      it.each([["Space"], ["Enter"]])(
        "should call onClose callback when a keyboard key %s event is triggered",
        (key) => {
          CypressMountWithProviders(
            <DismissibleBoxCustomComponent onClose={callback} />
          );

          icon()
            .trigger("keydown", keyCode(key))
            .then(() => {
              // eslint-disable-next-line no-unused-expressions
              expect(callback).to.have.been.calledOnce;
            });
        }
      );
    });
  });

  describe("Accessibility tests for DismissibleBox", () => {
    it("should pass accessibility tests for DismissibleBox DefaultDarkVariant story", () => {
      CypressMountWithProviders(<stories.DefaultDarkVariant />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for DismissibleBox DefaultLightVariant story", () => {
      CypressMountWithProviders(<stories.DefaultLightVariant />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for DismissibleBox WidthOverridden story", () => {
      CypressMountWithProviders(<stories.WidthOverridden />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for DismissibleBox WithNoLeftBorderHighlight story", () => {
      CypressMountWithProviders(<stories.WithNoLeftBorderHighlight />);

      cy.checkAccessibility();
    });
  });
});
