import React from "react";
import Pill from "./pill.component";
import { pillPreview } from "../../../cypress/locators/pill/index";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { checkOutlineCss } from "../../../cypress/support/component-helper/common-steps";
import { closeIconButton } from "../../../cypress/locators/index";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testData = CHARACTERS.STANDARD;
const warning = "rgb(242, 133, 51)";
const neutral = "rgb(51, 91, 112)";
const negative = "rgb(203, 55, 74)";
const positive = "rgb(0, 138, 33)";
const tag = "rgb(0, 126, 69)";
const status = "rgb(51, 91, 112)";
const transparent = "rgba(0, 0, 0, 0)";
const colorsSemanticCaution500 = "rgb(239, 103, 0)";
const blackOpacity65 = "rgba(0, 0, 0, 0.65)";
const brilliantGreenShade20 = "rgb(0, 176, 0)";
const red = "rgb(255, 0, 0)";
const hexBlue = "#123456";
const green = "rgb(0, 123, 10)";
const small = "S";
const medium = "M";
const large = "L";
const extraLarge = "XL";

const PillComponent = ({ ...props }) => {
  return (
    <>
      <Pill onDelete="noop" {...props} />
    </>
  );
};

context("Testing Pill component", () => {
  describe("should render Pill component with props", () => {
    it.each(specialCharacters)(
      "should render Pill using %s as label",
      (label) => {
        CypressMountWithProviders(<PillComponent>{label}</PillComponent>);

        pillPreview().should("have.text", label);
      }
    );

    it.each([
      ["warning", warning],
      ["neutral", neutral],
      ["negative", negative],
      ["positive", positive],
    ])(
      "should render Pill component with colorVariant set to %s",
      (color, output) => {
        CypressMountWithProviders(
          <PillComponent pillRole="status" colorVariant={color}>
            Pill
          </PillComponent>
        );

        pillPreview()
          .then((elem) => {
            checkOutlineCss(elem, 1, "border", "solid", output);
          })
          .should("have.css", "background-color", transparent);
      }
    );

    it("should render Pill component with data-element", () => {
      CypressMountWithProviders(<PillComponent data-element={testData} />);
      pillPreview().should("have.attr", "data-element", testData);
    });

    it("should render Pill component with data-role", () => {
      CypressMountWithProviders(<PillComponent data-role={testData} />);
      pillPreview().should("have.attr", "data-role", testData);
    });

    it.each([
      ["warning", warning],
      ["neutral", neutral],
      ["negative", negative],
      ["positive", positive],
    ])(
      "should render Pill component with color fill to %s",
      (color, output) => {
        CypressMountWithProviders(
          <PillComponent pillRole="status" colorVariant={color} fill>
            Pill
          </PillComponent>
        );

        pillPreview().then((elem) => {
          checkOutlineCss(elem, 1, "border", "solid", output);
          expect(elem.css("background-color")).to.equals(output);
        });
      }
    );

    it.each([
      ["tag", tag],
      ["status", status],
    ])(
      "should render Dialog component with pillRole set to %s",
      (role, output) => {
        CypressMountWithProviders(
          <PillComponent pillRole={role}>{role}</PillComponent>
        );
        pillPreview().then((elem) => {
          checkOutlineCss(elem, 1, "border", "solid", output);
        });
      }
    );

    it.each([
      [
        "colorsSemanticCaution500",
        colorsSemanticCaution500,
        "rgb(239, 103, 0)",
      ],
      ["blackOpacity65", blackOpacity65, "rgba(0, 0, 0, 0.65)"],
      ["brilliantGreenShade20", brilliantGreenShade20, "rgb(0, 176, 0)"],
      ["red", red, "rgb(255, 0, 0)"],
      ["#123456", hexBlue, "rgb(18, 52, 86)"],
      [green, green, "rgb(0, 123, 10)"],
    ])(
      "should render Pill component with borderColor set to %s.",
      (colourDescription, color, output) => {
        CypressMountWithProviders(
          <PillComponent pillRole="status" borderColor={color}>
            Pill
          </PillComponent>
        );

        pillPreview().then((elem) => {
          checkOutlineCss(elem, 1, "border", "solid", output);
        });
      }
    );

    it.each(["20px", "100px"])(
      "should render Pill component with maxWidth set to %s",
      (maxWidth) => {
        CypressMountWithProviders(
          <Pill maxWidth={maxWidth}>Pill with a long label</Pill>
        );

        pillPreview().should("have.css", "max-width", maxWidth);
      }
    );

    it.each([
      [small, "16px", "10px", "0px 7px"],
      [medium, "20px", "12px", "0px 11px"],
      [large, "24px", "14px", "0px 15px"],
      [extraLarge, "26px", "16px", "0px 19px"],
    ])(
      "should render Pill component with size set to %s",
      (size, height, fontSize, padding) => {
        CypressMountWithProviders(<Pill size={size}>Pill</Pill>);

        pillPreview()
          .should("have.css", "min-height", height)
          .should("have.css", "line-height", height)
          .should("have.css", "font-size", fontSize)
          .should("have.css", "padding", padding);
      }
    );

    it.each([
      [true, "break-spaces"],
      [false, "nowrap"],
    ])(
      "should render Pill component with wrapText set to %s",
      (booleanState, cssValue) => {
        CypressMountWithProviders(
          <Pill maxWidth="44px" wrapText={booleanState}>
            Wrapped pill
          </Pill>
        );

        pillPreview()
          .should("have.text", "Wrapped pill")
          .should("have.css", "white-space", cssValue);
      }
    );

    describe("should render Pill component and check events", () => {
      let callback;

      beforeEach(() => {
        callback = cy.stub();
      });
      it("should call the delete action after the CloseIcon is clicked", () => {
        CypressMountWithProviders(<PillComponent onDelete={callback} />);

        closeIconButton()
          .click()
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });

      it("should call the click action after the Pill is clicked", () => {
        CypressMountWithProviders(<PillComponent onClick={callback} />);

        pillPreview()
          .click()
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });
    });
  });
});
