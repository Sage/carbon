import React from "react";
import {
  PortraitDefaultComponent,
  PortraitComponent,
} from "../../../src/components/portrait/portrait-test.stories";
import Box from "../../../src/components/box";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { useJQueryCssValueAndAssert } from "../../support/component-helper/common-steps";
import { icon, getDataElementByValue } from "../../locators";
import {
  PORTRAIT_SIZES,
  PORTRAIT_SIZE_PARAMS,
} from "../../../src/components/portrait/portrait.config";

import {
  portraitPreview,
  portraitInitials,
  portraitImage,
} from "../../locators/portrait";
import {
  SIZE,
  VALIDATION,
  COLOR,
  CHARACTERS,
} from "../../support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const colors = [
  ["orange", COLOR.ORANGE],
  ["red", COLOR.RED],
  ["black", COLOR.BLACK],
  ["brown", COLOR.BROWN],
];

const testImage =
  "https://www.gravatar.com/avatar/cceff1ad774bf89b1f75cb6e5005333c?s=40&d=404";

const imageURL = [
  "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
  "https://www.gravatar.com/avatar/05c1c705ee45d7ae88b80b3a8866ddaa?s=24&d=404",
];

context("Tests for Portrait component", () => {
  describe("check props for Portrait component", () => {
    it("should check gravatar for Portrait component", () => {
      CypressMountWithProviders(
        <PortraitDefaultComponent gravatar="chris.barber@sage.com" />
      );
      portraitPreview()
        .should("have.css", "height", "40px")
        .and("have.css", "width", "40px");
      portraitPreview().children().should("have.attr", "src", testImage);
    });

    it.each(imageURL)(
      "should check custom image url for Portrait component",
      (srcImage) => {
        CypressMountWithProviders(<PortraitDefaultComponent src={srcImage} />);
        portraitPreview()
          .should("have.css", "height", "40px")
          .and("have.css", "width", "40px");
        portraitPreview().children().should("have.attr", "src", srcImage);
      }
    );

    it.each([
      [PORTRAIT_SIZES[0], PORTRAIT_SIZE_PARAMS[PORTRAIT_SIZES[0]].dimensions],
      [PORTRAIT_SIZES[1], PORTRAIT_SIZE_PARAMS[PORTRAIT_SIZES[1]].dimensions],
      [PORTRAIT_SIZES[2], PORTRAIT_SIZE_PARAMS[PORTRAIT_SIZES[2]].dimensions],
      [PORTRAIT_SIZES[3], PORTRAIT_SIZE_PARAMS[PORTRAIT_SIZES[3]].dimensions],
      [PORTRAIT_SIZES[4], PORTRAIT_SIZE_PARAMS[PORTRAIT_SIZES[4]].dimensions],
      [PORTRAIT_SIZES[5], PORTRAIT_SIZE_PARAMS[PORTRAIT_SIZES[5]].dimensions],
      [PORTRAIT_SIZES[6], PORTRAIT_SIZE_PARAMS[PORTRAIT_SIZES[6]].dimensions],
    ])(
      "should check %s size for Portrait component",
      (size, heightAndWidth) => {
        CypressMountWithProviders(<PortraitDefaultComponent size={size} />);
        portraitPreview().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", heightAndWidth);
          useJQueryCssValueAndAssert($el, "width", heightAndWidth);
        });
      }
    );

    it("should check alt text for %s in Portrait component", () => {
      CypressMountWithProviders(
        <PortraitDefaultComponent src={testImage} alt="cypress-test" />
      );
      portraitImage().should("have.attr", "alt", "cypress-test");
    });

    it.each([
      ["square", "0px"],
      ["circle", "50%"],
    ])("should check %s shape for Portrait component", (shape, radius) => {
      CypressMountWithProviders(<PortraitDefaultComponent shape={shape} />);
      portraitPreview().children().should("have.css", "border-radius", radius);
    });

    it.each(["error", "warning", "info"])(
      "should check %s icon for Portrait component",
      (iconType) => {
        CypressMountWithProviders(
          <PortraitDefaultComponent iconType={iconType} />
        );
        icon().should("have.attr", "data-element", iconType).and("be.visible");
      }
    );

    it.each([
      ["Kate Wool", "KW"],
      ["Jane Col", "JC"],
      ["Luke Peter Smith", "LPS"],
    ])(
      "should check initials for %s in Portrait component",
      (name, passInitials) => {
        CypressMountWithProviders(
          <PortraitDefaultComponent initials={passInitials} />
        );
        portraitInitials().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", 38);
          useJQueryCssValueAndAssert($el, "width", 38);
        });
      }
    );

    it.each([
      [false, "rgb(242, 245, 246)"],
      [true, "rgb(153, 173, 183)"],
    ])(
      "should check when dark background colour set to % in Portrait component",
      (boolValue, color) => {
        CypressMountWithProviders(
          <PortraitDefaultComponent darkBackground={boolValue} />
        );
        portraitPreview()
          .children()
          .should("have.css", "background-color", color);
      }
    );

    it.each(testData)(
      "should check tooltipMessage as %s for Portrait component",
      (tooltipMessage) => {
        CypressMountWithProviders(
          <PortraitComponent tooltipMessage={tooltipMessage} />
        );
        portraitPreview().realHover();
        getDataElementByValue("tooltip")
          .should("be.visible")
          .and("have.text", tooltipMessage);
      }
    );

    it.each(testData)(
      "should check tooltipId as %s for Portrait component",
      (tooltipId) => {
        CypressMountWithProviders(<PortraitComponent tooltipId={tooltipId} />);
        portraitPreview().realHover();
        getDataElementByValue("tooltip")
          .should("be.visible")
          .and("have.id", tooltipId);
      }
    );

    it("should check when tooltip visibility is true for Portrait component", () => {
      CypressMountWithProviders(<PortraitComponent tooltipIsVisible />);
      getDataElementByValue("tooltip")
        .should("be.visible")
        .and("have.text", "Rebecca Smith");
    });

    it("should check when tooltip visibility is false for Portrait component", () => {
      CypressMountWithProviders(<PortraitComponent tooltipIsVisible={false} />);
      getDataElementByValue("tooltip").should("not.exist");
    });

    it.each(["top", "bottom", "left", "right"])(
      "should render Portrait with the tooltip in the %s position",
      (tooltipPosition) => {
        CypressMountWithProviders(
          <Box width="700px" height="108px">
            <div
              style={{
                padding: "200px",
              }}
            >
              <PortraitComponent tooltipPosition={tooltipPosition} />
            </div>
          </Box>
        );
        getDataElementByValue("tooltip")
          .should("be.visible")
          .and("have.attr", "data-placement", tooltipPosition);
      }
    );

    it("should check error tooltipType for Portrait component", () => {
      CypressMountWithProviders(<PortraitComponent tooltipType="error" />);
      getDataElementByValue("tooltip").and(
        "have.css",
        "background-color",
        VALIDATION.ERROR
      );
    });

    it.each([
      [SIZE.MEDIUM, "14px"],
      [SIZE.LARGE, "16px"],
    ])(
      "should render Portrait with the tooltip in the %s size",
      (tooltipSize, fontSize) => {
        CypressMountWithProviders(
          <PortraitComponent tooltipSize={tooltipSize} />
        );
        getDataElementByValue("tooltip")
          .should("be.visible")
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "font-size", parseInt(fontSize));
          });
      }
    );

    it.each(colors)(
      "should check tooltip background-color as %s for Portrait component",
      (name, color) => {
        CypressMountWithProviders(<PortraitComponent tooltipBgColor={color} />);
        getDataElementByValue("tooltip").should(
          "have.css",
          "background-color",
          color
        );
      }
    );

    it.each(colors)(
      "should check tooltip font color as %s for Portrait component",
      (name, color) => {
        CypressMountWithProviders(
          <PortraitComponent tooltipFontColor={color} isFocused />
        );
        getDataElementByValue("tooltip").should("have.css", "color", color);
      }
    );

    describe("should render Portrait component for event tests", () => {
      let callback;

      beforeEach(() => {
        callback = cy.stub();
      });

      it("should call onClick callback when a click event is triggered for Portrait component", () => {
        CypressMountWithProviders(
          <PortraitDefaultComponent onClick={callback} />
        );

        portraitPreview()
          .click()
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });
    });
  });

  describe("Accessibility tests for Portrait component", () => {
    it("should check gravatar for accessibility tests", () => {
      CypressMountWithProviders(
        <PortraitDefaultComponent gravatar="chris.barber@sage.com" />
      );
      cy.checkAccessibility();
    });

    it.each(imageURL)(
      "should check custom image url for accessibility tests",
      (srcImage) => {
        CypressMountWithProviders(<PortraitDefaultComponent src={srcImage} />);
        cy.checkAccessibility();
      }
    );

    it.each([
      PORTRAIT_SIZES[0],
      PORTRAIT_SIZES[1],
      PORTRAIT_SIZES[2],
      PORTRAIT_SIZES[3],
      PORTRAIT_SIZES[4],
      PORTRAIT_SIZES[5],
      PORTRAIT_SIZES[6],
    ])("should check %s size for accessibility tests", (size) => {
      CypressMountWithProviders(<PortraitDefaultComponent size={size} />);
      cy.checkAccessibility();
    });

    it("should check alt text for accessibility tests", () => {
      CypressMountWithProviders(
        <PortraitDefaultComponent alt="cypress-test" />
      );
      cy.checkAccessibility();
    });

    it.each(["square", "circle"])(
      "should check %s shape for accessibility tests",
      (shape) => {
        CypressMountWithProviders(<PortraitDefaultComponent shape={shape} />);
        cy.checkAccessibility();
      }
    );

    it.each(["error", "warning", "info"])(
      "should check %s icon for accessibility tests",
      (iconType) => {
        CypressMountWithProviders(
          <PortraitDefaultComponent iconType={iconType} />
        );
        cy.checkAccessibility();
      }
    );

    it.each(["KW", "JC", "LPS"])(
      "should check initials for %s for accessibility tests",
      (passInitials) => {
        CypressMountWithProviders(
          <PortraitDefaultComponent initials={passInitials} />
        );
        cy.checkAccessibility();
      }
    );

    it.each([false, true])(
      "should check when dark background colour set to % for accessibility tests",
      (boolValue) => {
        CypressMountWithProviders(
          <PortraitDefaultComponent darkBackground={boolValue} />
        );
        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check tooltipMessage as %s for accessibility tests",
      (tooltipMessage) => {
        CypressMountWithProviders(
          <PortraitComponent tooltipMessage={tooltipMessage} />
        );
        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check tooltipId as %s for accessibility tests",
      (tooltipId) => {
        CypressMountWithProviders(<PortraitComponent tooltipId={tooltipId} />);
        cy.checkAccessibility();
      }
    );

    it("should check when tooltip visibility is true for accessibility tests", () => {
      CypressMountWithProviders(<PortraitComponent tooltipIsVisible />);
      cy.checkAccessibility();
    });

    it("should check when tooltip visibility is false for accessibility tests", () => {
      CypressMountWithProviders(<PortraitComponent tooltipIsVisible={false} />);
      cy.checkAccessibility();
    });

    it.each(["top", "bottom", "left", "right"])(
      "should render Portrait with the tooltip in the %s position for accessibility tests",
      (tooltipPosition) => {
        CypressMountWithProviders(
          <Box width="700px" height="108px">
            <div
              style={{
                padding: "200px",
              }}
            >
              <PortraitComponent tooltipPosition={tooltipPosition} />
            </div>
          </Box>
        );
        cy.checkAccessibility();
      }
    );

    it("should check error tooltipType for accessibility tests", () => {
      CypressMountWithProviders(<PortraitComponent tooltipType="error" />);
      cy.checkAccessibility();
    });

    it.each([SIZE.MEDIUM, SIZE.LARGE])(
      "should render Portrait with the tooltip in the %s size for accessibility tests",
      (tooltipSize) => {
        CypressMountWithProviders(
          <PortraitComponent tooltipSize={tooltipSize} />
        );
        cy.checkAccessibility();
      }
    );

    it.each([COLOR.ORANGE, COLOR.RED, COLOR.BLACK, COLOR.BROWN])(
      "should check tooltip background-color as %s for accessibility tests",
      (color) => {
        CypressMountWithProviders(<PortraitComponent tooltipBgColor={color} />);
        cy.checkAccessibility();
      }
    );

    it.each([COLOR.ORANGE, COLOR.RED, COLOR.BLACK, COLOR.BROWN])(
      "should check tooltip font color as %s for accessibility tests",
      (color) => {
        CypressMountWithProviders(
          <PortraitComponent tooltipFontColor={color} isFocused />
        );
        cy.checkAccessibility();
      }
    );

    describe("should check event for accessibility tests", () => {
      let callback;

      beforeEach(() => {
        callback = cy.stub();
      });

      it("should call onClick callback when a click event is triggered for accessibility tests", () => {
        CypressMountWithProviders(
          <PortraitDefaultComponent onClick={callback} />
        );
        cy.checkAccessibility();
      });
    });
  });
});
