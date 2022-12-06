import React from "react";
import ButtonBar from ".";
import Button from "../button";
import {
  BUTTON_BAR_SIZES,
  BUTTON_BAR_ICON_POSITIONS,
} from "./button-bar.config";

import { buttonDataComponent } from "../../../cypress/locators/button";

import { icon } from "../../../cypress/locators";
import { positionOfElement, keyCode } from "../../../cypress/support/helper";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

const ButtonBarCustom = ({ onClick, ...props }) => {
  return (
    <ButtonBar onClick={onClick} {...props} ml={2} mt={2}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </ButtonBar>
  );
};

const ButtonBarIconPosition = ({ iconPositionProp, ...props }) => {
  return (
    <ButtonBar {...props} size={BUTTON_BAR_SIZES[0]} ml={2} mt={2}>
      <Button iconType="csv">{iconPositionProp} Button</Button>
      <Button iconType="pdf">{iconPositionProp} Button</Button>
      <Button iconType="delete">{iconPositionProp} Button</Button>
    </ButtonBar>
  );
};

context("Test for Button-Bar component", () => {
  describe("check props for Button-Bar component", () => {
    it.each([
      [BUTTON_BAR_SIZES[0], 32],
      [BUTTON_BAR_SIZES[1], 40],
      [BUTTON_BAR_SIZES[2], 48],
    ])("should set size to %s for a Button-Bar", (size, px) => {
      CypressMountWithProviders(<ButtonBarCustom size={size} />);

      buttonDataComponent().eq(0).should("have.css", "min-height", `${px}px`);
      buttonDataComponent().eq(1).should("have.css", "min-height", `${px}px`);
      buttonDataComponent().eq(2).should("have.css", "min-height", `${px}px`);
    });

    it.each([
      [BUTTON_BAR_ICON_POSITIONS[0], "right"],
      [BUTTON_BAR_ICON_POSITIONS[1], "left"],
    ])(
      "should set position to %s for icon in a Button-Bar",
      (iconPosition, margin) => {
        CypressMountWithProviders(
          <ButtonBarIconPosition iconPosition={iconPosition} />
        );

        icon().should("have.css", `margin-${margin}`, "8px");
      }
    );

    it("should render Button-Bar with full width", () => {
      CypressMountWithProviders(<ButtonBarCustom fullWidth />);

      buttonDataComponent()
        .parent()
        .then(($el) => {
          useJQueryCssValueAndAssert($el, "width", 1366);
        });
    });

    describe("check events for Button-Bar component", () => {
      let callback;

      beforeEach(() => {
        callback = cy.stub();
      });

      it("should call onClick callback when a click event is triggered", () => {
        CypressMountWithProviders(<ButtonBarCustom onClick={callback} />);

        buttonDataComponent()
          .eq(positionOfElement("first"))
          .click({ force: true })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });

      it("should call onBlur callback when a blur event is triggered", () => {
        CypressMountWithProviders(<ButtonBarCustom onBlur={callback} />);

        buttonDataComponent()
          .eq(positionOfElement("second"))
          .focus()
          .blur({ force: true })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });

      it("should call onKeyDown callback when a keydown event is triggered", () => {
        CypressMountWithProviders(<ButtonBarCustom onKeyDown={callback} />);

        buttonDataComponent()
          .eq(positionOfElement("first"))
          .trigger("keydown", { force: true }, keyCode("rightarrow"))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });

      it("should call onFocus callback when a focus event is triggered", () => {
        CypressMountWithProviders(<ButtonBarCustom onFocus={callback} />);

        buttonDataComponent()
          .eq(positionOfElement("third"))
          .focus()
          .blur({ force: true })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });
    });
  });
});
