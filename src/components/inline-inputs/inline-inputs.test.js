import React from "react";
import Textbox from "../textbox/textbox.component";
import Decimal from "../decimal/decimal.component";
import SimpleSelect from "../select/simple-select/simple-select.component";
import Option from "../select/option/option.component";
import InlineInputs from "./inline-inputs.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  inlineInputContainer,
  inlineInputsPreview,
  inlineLabel,
  inlinelabelWidth,
  inlineChildren,
} from "../../../cypress/locators/inline-inputs/index";
import {
  SIZE,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const InlineInputComponent = ({ ...props }) => {
  return (
    <InlineInputs label="Inline Input" {...props}>
      <Textbox hasWarning inputIcon="warning" tooltipMessage="warning" />

      <Decimal onChange={function noRefCheck() {}} value="0.00" />

      <SimpleSelect onChange={function noRefCheck() {}} value="">
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
      </SimpleSelect>
    </InlineInputs>
  );
};

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
    ])(
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
});
