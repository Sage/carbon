import React from "react";
import DismissibleBox from "./dismissible-box.component";
import Box from "../box/box.component";
import Typography from "../typography/typography.component";
import VerticalDivider from "../vertical-divider/vertical-divider.component";
import Image from "../image/image.component";
import point from "../../../.assets/point.svg";
import dismissibleBoxDataComponent from "../../../cypress/locators/dismissible-box";
import { icon } from "../../../cypress/locators/index.js";
import { keyCode } from "../../../cypress/support/helper";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";

const DismissibleBoxCustomComponent = ({ ...props }) => {
  return (
    <Box p={2}>
      <DismissibleBox onClose={() => {}} {...props}>
        <Box display="flex">
          <Typography mb={0}>Hello All!</Typography>
          <VerticalDivider p={0} px={2} />
          <Image alt="Example alt text" src={point} width="120px" />
        </Box>
      </DismissibleBox>
    </Box>
  );
};

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
});
