import * as React from "react";
import StepSequence from "./step-sequence.component";
import StepSequenceItem from "./step-sequence-item/step-sequence-item.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  stepSequenceItemIndicator,
  stepSequenceDataComponent,
  stepSequenceDataComponentItem,
} from "../../../cypress/locators/step-sequence";
import { ICON } from "../../../cypress/locators/locators";

const testData = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];

const StepSequenceComponent = ({ ...props }) => {
  return (
    <StepSequence {...props}>
      <StepSequenceItem
        aria-label="Step 1 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="1"
        status="complete"
      >
        Name
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 2 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="2"
        status="complete"
      >
        Delivery Address
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 3 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="3"
        status="current"
      >
        Delivery Details
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 4 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="4"
        status="incomplete"
      >
        Payment
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 5 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="5"
        status="incomplete"
      >
        Confirm
      </StepSequenceItem>
    </StepSequence>
  );
};

const StepSequenceItemCustom = ({ ...props }) => {
  return (
    <StepSequenceItem
      aria-label="Step 1 of 5"
      hiddenCompleteLabel="Complete"
      hiddenCurrentLabel="Current"
      indicator="1"
      status="complete"
      {...props}
    >
      Name
    </StepSequenceItem>
  );
};

context("Testing StepSequence component", () => {
  describe("should render StepSequence component", () => {
    it.each([
      ["horizontal", 18],
      ["vertical", 0],
    ])(
      "should render StepSequence with orientation set to %s",
      (orientation, padding) => {
        CypressMountWithProviders(
          <StepSequenceComponent orientation={orientation} />
        );

        stepSequenceDataComponent()
          .should("have.attr", "orientation", orientation)
          .and("have.css", "padding-top", `${padding}px`);

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
});
