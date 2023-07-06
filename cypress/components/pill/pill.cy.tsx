import React from "react";
import Pill, { PillProps } from "../../../src/components/pill";
import { PillComponent } from "../../../src/components/pill/pill-test.stories";
import { pillPreview, pillCloseIcon } from "../../locators/pill/index";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { checkOutlineCss } from "../../support/component-helper/common-steps";
import { closeIconButton } from "../../locators/index";
import { CHARACTERS } from "../../support/component-helper/constants";

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

context("Testing Pill component", () => {
  describe("when focused", () => {
    it.each(["S", "M", "L", "XL"] as PillProps["size"][])(
      "should have the expected styling when size is %s and focusRedesignOptOut is false",
      (size) => {
        CypressMountWithProviders(
          <PillComponent size={size} onDelete={() => {}}>
            Pill
          </PillComponent>
        );

        pillCloseIcon()
          .focus()
          .then(() => {
            pillCloseIcon()
              .should(
                "have.css",
                "box-shadow",
                "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
              )
              .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
          });
      }
    );

    it.each(["S", "M", "L", "XL"] as PillProps["size"][])(
      "should have the expected styling when size is %s and focusRedesignOptOut is true",
      (size) => {
        CypressMountWithProviders(
          <PillComponent size={size} onDelete={() => {}}>
            Pill
          </PillComponent>,
          undefined,
          undefined,
          {
            focusRedesignOptOut: true,
          }
        );
        pillCloseIcon()
          .focus()
          .then(() => {
            pillCloseIcon().should(
              "have.css",
              "box-shadow",
              "rgb(255, 188, 25) 0px 0px 0px 3px"
            );
          });
      }
    );
  });

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
    ] as [PillProps["colorVariant"], string][])(
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
    ] as [PillProps["colorVariant"], string][])(
      "should render Pill component with color fill to %s",
      (color, output) => {
        CypressMountWithProviders(
          <PillComponent pillRole="status" colorVariant={color} fill>
            Pill
          </PillComponent>
        );

        pillPreview()
          .then((elem) => {
            checkOutlineCss(elem, 1, "border", "solid", output);
          })
          .should("have.css", "background-color", output);
      }
    );

    it.each([
      ["tag", tag],
      ["status", status],
    ] as [PillProps["pillRole"], string][])(
      "should render Pill component with pillRole set to %s",
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
      "should render Pill component with borderColor set to %s",
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
      [small, "16px", "12px", "0px 8px"],
      [medium, "20px", "14px", "0px 8px"],
      [large, "24px", "14px", "0px 8px"],
      [extraLarge, "28px", "16px", "0px 12px"],
    ] as [PillProps["size"], string, string, string][])(
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
      it("should call the delete action after the CloseIcon is clicked", () => {
        const callback: PillProps["onDelete"] = cy.stub().as("onDelete");

        CypressMountWithProviders(<PillComponent onDelete={callback} />);

        closeIconButton().click();
        cy.get("@onDelete").should("have.been.calledOnce");
      });

      it("should call the click action after the Pill is clicked", () => {
        const callback: PillProps["onClick"] = cy.stub().as("onClick");

        CypressMountWithProviders(<PillComponent onClick={callback} />);

        pillPreview().click();
        cy.get("@onClick").should("have.been.calledOnce");
      });
    });

    describe("Accessibility tests for Pill component", () => {
      it.each(specialCharacters)(
        "should render Pill using %s as label for accessibility tests",
        (label) => {
          CypressMountWithProviders(<PillComponent>{label}</PillComponent>);

          cy.checkAccessibility();
        }
      );

      it.each([
        "warning",
        "neutral",
        "negative",
        "positive",
      ] as PillProps["colorVariant"][])(
        "should render Pill component with colorVariant set to %s for accessibility tests",
        (color) => {
          CypressMountWithProviders(
            <PillComponent pillRole="status" colorVariant={color}>
              Pill
            </PillComponent>
          );
          cy.checkAccessibility();
        }
      );

      it("should render Pill component with data-element for accessibility tests", () => {
        CypressMountWithProviders(<PillComponent data-element={testData} />);
        cy.checkAccessibility();
      });

      it("should render Pill component with data-role for accessibility tests", () => {
        CypressMountWithProviders(<PillComponent data-role={testData} />);
        cy.checkAccessibility();
      });

      it.each([
        "warning",
        "neutral",
        "negative",
        "positive",
      ] as PillProps["colorVariant"][])(
        "should render Pill component with color fill to %s for accessibility tests",
        (color) => {
          CypressMountWithProviders(
            <PillComponent pillRole="status" colorVariant={color} fill>
              Pill
            </PillComponent>
          );
          cy.checkAccessibility();
        }
      );

      it.each(["tag", "status"] as PillProps["pillRole"][])(
        "should render Pill component with pillRole set to %s for accessibility tests",
        (role) => {
          CypressMountWithProviders(
            <PillComponent pillRole={role}>{role}</PillComponent>
          );
          cy.checkAccessibility();
        }
      );

      it.each(["20px", "100px"])(
        "should render Pill component with maxWidth set to %s for accessibility tests",
        (maxWidth) => {
          CypressMountWithProviders(
            <Pill maxWidth={maxWidth}>Pill with a long label</Pill>
          );
          cy.checkAccessibility();
        }
      );

      it.each([small, medium, large, extraLarge] as PillProps["size"][])(
        "should render Pill component with size set to %s for accessibility tests",
        (size) => {
          CypressMountWithProviders(<Pill size={size}>Pill</Pill>);
          cy.checkAccessibility();
        }
      );

      it.each([
        [true, "break-spaces"],
        [false, "nowrap"],
      ])(
        "should render Pill component with wrapText set to %s for accessibility tests",
        (booleanState) => {
          CypressMountWithProviders(
            <Pill maxWidth="44px" wrapText={booleanState}>
              Wrapped pill
            </Pill>
          );
          cy.checkAccessibility();
        }
      );

      it.each([
        colorsSemanticCaution500,
        blackOpacity65,
        brilliantGreenShade20,
        red,
        hexBlue,
        green,
      ])(
        "should render Pill component with borderColor set to %s for accessibility tests",
        (color) => {
          CypressMountWithProviders(
            <PillComponent pillRole="status" borderColor={color}>
              Pill
            </PillComponent>
          );
          cy.checkAccessibility();
        }
      );
    });
  });

  it.each(["S", "M", "L", "XL"] as PillProps["size"][])(
    "should have the expected border radius styling when size is %s",
    (size) => {
      CypressMountWithProviders(
        <PillComponent size={size} onDelete={() => {}}>
          Pill
        </PillComponent>
      );
      pillPreview().should("have.css", "border-radius", "2px");
      pillCloseIcon().should("have.css", "border-radius", "0px");
      pillCloseIcon()
        .focus()
        .then(() => {
          pillCloseIcon().should(
            "have.css",
            "border-radius",
            "0px 2px 2px 0px"
          );
        });
    }
  );
});
