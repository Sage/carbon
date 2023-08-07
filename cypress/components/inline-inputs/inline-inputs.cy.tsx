import React from "react";
import Textbox from "../../../src/components/textbox";
import Decimal from "../../../src/components/decimal";
import InlineInputs, {
  InlineInputsProps,
} from "../../../src/components/inline-inputs/inline-inputs.component";
import * as stories from "../../../src/components/inline-inputs/inline-inputs.stories";
import { Default as InlineInputComponent } from "../../../src/components/inline-inputs/inline-inputs-test.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  inlineInputContainer,
  inlineInputsPreview,
  inlineLabel,
  inlinelabelWidth,
  inlineChildren,
} from "../../locators/inline-inputs/index";
import { SIZE, CHARACTERS } from "../../support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Tests for InlineInputs component", () => {
  describe("should check InlineInputs component properties", () => {
    it.each([
      ["none", 0],
      [SIZE.EXTRASMALL, -8],
      [SIZE.SMALL, -16],
      [SIZE.MEDIUMSMALL, -20],
      [SIZE.MEDIUM, -24],
      [SIZE.MEDIUMLARGE, -28],
      [SIZE.LARGE, -32],
      [SIZE.EXTRALARGE, -40],
    ] as [InlineInputsProps["gutter"], number][])(
      "should check when gutter size is %s for InlineInputs component",
      (size, gutterMargin) => {
        CypressMountWithProviders(<InlineInputComponent gutter={size} />);
        inlineInputContainer()
          .should("have.css", "margin-left", `${gutterMargin}px`)
          .and("be.visible");
      }
    );

    it.each(testData)(
      "should check label as %s for InlineInputs component",
      (label) => {
        CypressMountWithProviders(<InlineInputComponent label={label} />);
        inlineLabel().should("have.text", label);
      }
    );

    it.each(testData)(
      "should check classname as %s for InlineInputs component",
      (classname) => {
        CypressMountWithProviders(
          <InlineInputComponent className={classname} />
        );
        inlineInputsPreview().should("have.class", classname);
      }
    );

    it.each([30, 60, 50, 90])(
      "should check inputWidth as %s for InlineInputs component",
      (inputWidth) => {
        CypressMountWithProviders(
          <InlineInputComponent inputWidth={inputWidth} />
        );
        inlineInputContainer().should("have.css", "flex", `0 0 ${inputWidth}%`);
      }
    );

    it.each(testData)(
      "should check children as %s for InlineInputs component",
      (children) => {
        CypressMountWithProviders(
          <InlineInputs label="Inline Input">
            <Textbox>{children}</Textbox>
          </InlineInputs>
        );
        inlineChildren().should("have.text", children).and("be.visible");
      }
    );

    it.each([45, 25, 35, 15])(
      "should check labelWidth as %s for InlineInputs component",
      (labelwidth) => {
        CypressMountWithProviders(
          <InlineInputComponent labelWidth={labelwidth} />
        );
        inlinelabelWidth().should("have.css", "flex", `0 0 ${labelwidth}%`);
      }
    );

    it.each(testData)(
      "should check htmlFor as %s for InlineInputs component",
      (htmlFor) => {
        CypressMountWithProviders(<InlineInputComponent htmlFor={htmlFor} />);
        inlineLabel().should("have.attr", "for", htmlFor);
      }
    );
  });

  describe("Accessibility tests for InlineInputs component", () => {
    it("should pass accessibility tests for InlineInputs Default story", () => {
      CypressMountWithProviders(<stories.Default />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for InlineInputs WithAdaptiveLabelBreakpoint story", () => {
      CypressMountWithProviders(<stories.WithAdaptiveLabelBreakpoint />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for InlineInputs Required story", () => {
      CypressMountWithProviders(<stories.Required />);

      cy.checkAccessibility();
    });
  });

  describe("rounded corners", () => {
    it.each([
      "none",
      "extra-small",
      "small",
      "medium-small",
      "medium",
      "medium-large",
      "large",
      "extra-large",
    ] as InlineInputsProps["gutter"][])(
      "should have the expected border radius styling when gutter is %s and has three input children",
      (gutter) => {
        const firstInputResult = gutter === "none" ? "4px 0px 0px 4px" : "4px";
        const middleInputResult = gutter === "none" ? "0px" : "4px";
        const lastInputResult = gutter === "none" ? "0px 4px 4px 0px" : "4px";

        CypressMountWithProviders(<InlineInputComponent gutter={gutter} />);
        inlineInputContainer()
          .children()
          .find('[role="presentation"]')
          .first()
          .should("have.css", "border-radius", firstInputResult);
        inlineInputContainer()
          .children()
          .find('[role="presentation"]')
          .eq(1)
          .should("have.css", "border-radius", middleInputResult);
        inlineInputContainer()
          .children()
          .find('[role="presentation"]')
          .last()
          .should("have.css", "border-radius", lastInputResult);
      }
    );

    it.each([
      "none",
      "extra-small",
      "small",
      "medium-small",
      "medium",
      "medium-large",
      "large",
      "extra-large",
    ] as InlineInputsProps["gutter"][])(
      "should have the expected border radius styling when gutter is %s and has two input children",
      (gutter) => {
        const firstInputResult = gutter === "none" ? "4px 0px 0px 4px" : "4px";
        const lastInputResult = gutter === "none" ? "0px 4px 4px 0px" : "4px";

        CypressMountWithProviders(
          <InlineInputs label="Inline Input" gutter={gutter}>
            <Textbox warning inputIcon="warning" />
            <Decimal
              onChange={function noRefCheck() {
                ("");
              }}
              value="0.00"
            />
          </InlineInputs>
        );
        inlineInputContainer()
          .children()
          .find('[role="presentation"]')
          .first()
          .should("have.css", "border-radius", firstInputResult);
        inlineInputContainer()
          .children()
          .find('[role="presentation"]')
          .last()
          .should("have.css", "border-radius", lastInputResult);
      }
    );

    it.each([
      "none",
      "extra-small",
      "small",
      "medium-small",
      "medium",
      "medium-large",
      "large",
      "extra-large",
    ] as InlineInputsProps["gutter"][])(
      "should have the expected border radius styling when gutter is %s and has one input child",
      (gutter) => {
        CypressMountWithProviders(
          <InlineInputs label="Inline Input" gutter={gutter}>
            <Textbox warning inputIcon="warning" />
          </InlineInputs>
        );
        inlineInputContainer()
          .children()
          .find('[role="presentation"]')
          .first()
          .should("have.css", "border-radius", "4px");
      }
    );
  });
});
