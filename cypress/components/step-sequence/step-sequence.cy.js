import React from "react";
import {
  StepSequenceComponent,
  StepSequenceItemCustom,
} from "../../../src/components/step-sequence/step-sequence-test.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  stepSequenceItemIndicator,
  stepSequenceDataComponent,
  stepSequenceDataComponentItem,
} from "../../locators/step-sequence";
import { ICON } from "../../locators/locators";
import { CHARACTERS } from "../../support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Testing StepSequence component", () => {
  describe("should render StepSequence component", () => {
    it.each(["horizontal", "vertical"])(
      "should render StepSequence with orientation set to %s",
      (orientation) => {
        CypressMountWithProviders(
          <StepSequenceComponent orientation={orientation} />
        );

        stepSequenceDataComponent().should(
          "have.attr",
          "orientation",
          orientation
        );

        if (orientation === "vertical") {
          stepSequenceDataComponent().should(
            "have.css",
            "flex-direction",
            "column"
          );
        }
      }
    );
  });

  describe("should render StepSequenceItem component", () => {
    it("should render StepSequenceItem with children", () => {
      CypressMountWithProviders(<StepSequenceItemCustom />);

      stepSequenceDataComponentItem()
        .find("span")
        .eq(1)
        .should("have.text", "Name");
    });

    it.each([["-100"], ["0"], ["999"], testData[0], testData[1]])(
      "should render StepSequenceItem with indicator set to %s",
      (indicator) => {
        CypressMountWithProviders(
          <StepSequenceItemCustom status="incomplete" indicator={indicator} />
        );

        stepSequenceItemIndicator().should("have.text", indicator);
      }
    );

    it.each(testData)(
      "should render StepSequenceItem with ariaLabel set to %s",
      (ariaLabel) => {
        CypressMountWithProviders(
          <StepSequenceItemCustom aria-label={ariaLabel} />
        );

        stepSequenceDataComponentItem().should(
          "have.attr",
          "aria-label",
          ariaLabel
        );
      }
    );

    it.each([
      ["complete", "rgb(0, 138, 33)"],
      ["current", "rgba(0, 0, 0, 0.9)"],
      ["incomplete", "rgba(0, 0, 0, 0.55)"],
    ])(
      "should render StepSequenceItem with status set to %s",
      (status, color) => {
        CypressMountWithProviders(<StepSequenceItemCustom status={status} />);

        stepSequenceDataComponentItem()
          .children()
          .should("have.css", "color", color);
        stepSequenceItemIndicator().should("have.css", "color", color);
      }
    );

    it.each(testData)(
      "should render StepSequenceItem with hiddenCompleteLabel set to %s",
      (hiddenCompleteLabel) => {
        CypressMountWithProviders(
          <StepSequenceItemCustom
            status="complete"
            hiddenCompleteLabel={hiddenCompleteLabel}
          />
        );

        stepSequenceDataComponentItem()
          .children()
          .eq(0)
          .should("have.text", hiddenCompleteLabel);
      }
    );

    it.each(testData)(
      "should render StepSequenceItem with hiddenCurrentLabel set to %s",
      (hiddenCurrentLabel) => {
        CypressMountWithProviders(
          <StepSequenceItemCustom
            status="current"
            hiddenCurrentLabel={hiddenCurrentLabel}
          />
        );

        stepSequenceDataComponentItem()
          .children()
          .eq(0)
          .should("have.text", hiddenCurrentLabel);
      }
    );

    it.each([
      ["complete", "be.visible", 2],
      ["current", "not.exist", 1],
      ["incomplete", "not.exist", 0],
    ])(
      "should render StepSequenceItem with hideIndicator prop and status set to %s",
      (status, assertion, spanCount) => {
        CypressMountWithProviders(
          <StepSequenceItemCustom status={status} hideIndicator />
        );

        stepSequenceDataComponentItem().find(ICON).should(assertion);
        stepSequenceDataComponentItem()
          .find("span")
          .eq(1)
          .find("span")
          .should("have.length", spanCount);
      }
    );
  });

  describe("Accessibility tests for StepSequence component", () => {
    it.each(["horizontal", "vertical"])(
      "should check %s orientation for accessibility tests",
      (orientation) => {
        CypressMountWithProviders(
          <StepSequenceComponent orientation={orientation} />
        );
        cy.checkAccessibility();
      }
    );

    describe("check StepSequenceItem component for accessibility tests", () => {
      it("should check StepSequenceItem with children for accessibility tests", () => {
        CypressMountWithProviders(<StepSequenceItemCustom />);
        cy.checkAccessibility();
      });

      it.each([["-100"], ["0"], ["999"], testData[0], testData[1]])(
        "should check StepSequenceItem with indicator set to %s for accessibility tests",
        (indicator) => {
          CypressMountWithProviders(
            <StepSequenceItemCustom status="incomplete" indicator={indicator} />
          );
          cy.checkAccessibility();
        }
      );

      it.each(testData)(
        "should check StepSequenceItem with ariaLabel set to %s for accessibility tests",
        (ariaLabel) => {
          CypressMountWithProviders(
            <StepSequenceItemCustom aria-label={ariaLabel} />
          );
          cy.checkAccessibility();
        }
      );

      it.each(["complete", "current", "incomplete"])(
        "should check StepSequenceItem with status set to %s for accessibility tests",
        (status) => {
          CypressMountWithProviders(<StepSequenceItemCustom status={status} />);
          cy.checkAccessibility();
        }
      );

      it.each(testData)(
        "should check StepSequenceItem with hiddenCompleteLabel set to %s for accessibility tests",
        (hiddenCompleteLabel) => {
          CypressMountWithProviders(
            <StepSequenceItemCustom
              status="complete"
              hiddenCompleteLabel={hiddenCompleteLabel}
            />
          );
          cy.checkAccessibility();
        }
      );

      it.each(testData)(
        "should check StepSequenceItem with hiddenCurrentLabel set to %s for accessibility tests",
        (hiddenCurrentLabel) => {
          CypressMountWithProviders(
            <StepSequenceItemCustom
              status="current"
              hiddenCurrentLabel={hiddenCurrentLabel}
            />
          );
          cy.checkAccessibility();
        }
      );

      it.each(["complete", "current", "incomplete"])(
        "should check StepSequenceItem with hideIndicator prop and status set to %s for accessibility tests",
        (status) => {
          CypressMountWithProviders(
            <StepSequenceItemCustom status={status} hideIndicator />
          );
          cy.checkAccessibility();
        }
      );
    });
  });
});
