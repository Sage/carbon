import React from "react";
import { Default as DismissibleBoxCustomComponent } from "../../../src/components/dismissible-box/dismissible-box-test.stories";
import * as stories from "../../../src/components/dismissible-box/dismissible-box.stories";
import dismissibleBoxDataComponent from "../../locators/dismissible-box";
import { icon } from "../../locators/index.js";
import { keyCode } from "../../support/helper";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { assertCssValueIsApproximately } from "../../support/component-helper/common-steps";

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
            assertCssValueIsApproximately($el, "width", width);
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

  it.each([
    [undefined, "8px"],
    ["borderRadius000", "0px"],
    ["borderRadius025", "2px"],
    ["borderRadius050", "4px"],
    ["borderRadius200", "16px"],
    ["borderRadius400", "32px"],
  ])(
    "applies the expected border radius when %s passed to borderRadius prop",
    (borderRadius, expected) => {
      CypressMountWithProviders(
        <DismissibleBoxCustomComponent borderRadius={borderRadius} />
      );
      dismissibleBoxDataComponent().should(
        "have.css",
        "border-radius",
        expected
      );
    }
  );
});
