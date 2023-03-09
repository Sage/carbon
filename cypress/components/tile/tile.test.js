import React from "react";
import Tile from "../../../src/components/tile";
import Content from "../../../src/components/content";
import * as testStories from "../../../src/components/tile/tile-test.stories";
import TileFooter from "../../../src/components/tile/tile-footer";
import Typography from "../../../src/components/typography/typography.component";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { getDataElementByValue } from "../../locators/index";
import { CHARACTERS } from "../../support/component-helper/constants";

import { tile, tileFooter } from "../../locators/tile/index";
import {
  checkOutlineCss,
  useJQueryCssValueAndAssert,
} from "../../support/component-helper/common-steps";

const testData = ["left", "center", "right"];

context("Tests for Tile component", () => {
  describe("check props for Tile component", () => {
    it.each([
      ["tile", "rgb(204, 214, 219)", "rgb(255, 255, 255)"],
      ["transparent", "rgb(204, 214, 219)", "rgba(0, 0, 0, 0)"],
      ["active", "rgb(0, 126, 69)", "rgb(242, 249, 246)"],
    ])(
      "should check %s variant for Tile component",
      (variant, borderColor, backGroundColor) => {
        CypressMountWithProviders(
          <testStories.TileComponent variant={variant} />
        );
        tile()
          .should("have.css", "border-color", borderColor)
          .and("have.css", "background-color", backGroundColor);
      }
    );

    it.each([
      ["vertical", 255],
      ["horizontal", 85],
    ])(
      "should check %s orientation for Tile component",
      (orientation, height) => {
        CypressMountWithProviders(
          <testStories.TileComponent orientation={orientation} />
        );
        tile().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", height);
        });
      }
    );

    it.each([
      ["30%", 409],
      ["50%", 683],
      [0, 1366],
    ])(
      "should check width as %s for Tile component",
      (widthInPercentage, widthInPixel) => {
        CypressMountWithProviders(
          <testStories.TileComponent width={widthInPercentage} />
        );
        tile().then(($el) => {
          useJQueryCssValueAndAssert($el, "width", widthInPixel);
        });
      }
    );

    it("should check children for Tile component", () => {
      CypressMountWithProviders(
        <Tile>
          <Content title="children_test" />
        </Tile>
      );
      tile().children().children().should("have.text", "children_test");
    });

    it.each(testData)(
      "should check ddTextAlign as %s for Tile component",
      (align) => {
        CypressMountWithProviders(
          <testStories.DlTileComponent ddTextAlign={align} />
        );
        getDataElementByValue("dd").should("have.css", "text-align", align);
      }
    );

    it.each(testData)(
      "should check dtTextAlign as %s for Tile component",
      (align) => {
        CypressMountWithProviders(
          <testStories.DlTileComponent
            dtTextAlign={align}
            ddTextAlign="right"
          />
        );
        getDataElementByValue("dt").should("have.css", "text-align", align);
      }
    );

    it("should check single column for Tile component", () => {
      CypressMountWithProviders(
        <testStories.DlTileComponent dtTextAlign="left" asSingleColumn />
      );
      getDataElementByValue("dt")
        .should("have.css", "text-align", "left")
        .then(($el) => {
          useJQueryCssValueAndAssert($el, "width", 1366);
        });
      getDataElementByValue("dd").then(($el) => {
        useJQueryCssValueAndAssert($el, "width", 1366);
        useJQueryCssValueAndAssert($el, "margin-left", 0);
      });
    });

    it.each([
      [10, 111, 1229],
      [30, 385, 954],
    ])(
      "should check dtTextAlign as %s for Tile component",
      (w, dtWidth, ddWidth) => {
        CypressMountWithProviders(
          <testStories.DlTileComponent
            w={w}
            dtTextAlign="left"
            ddTextAlign="left"
          />
        );
        getDataElementByValue("dt")
          .should("have.css", "text-align", "left")
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", dtWidth);
            useJQueryCssValueAndAssert($el, "margin-block-start", 0);
            useJQueryCssValueAndAssert($el, "margin-block-end", 16);
            useJQueryCssValueAndAssert($el, "margin-left", 0);
          });
        getDataElementByValue("dd")
          .should("have.css", "text-align", "left")
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", ddWidth);
            useJQueryCssValueAndAssert($el, "margin-block-start", 0);
            useJQueryCssValueAndAssert($el, "margin-block-end", 16);
            useJQueryCssValueAndAssert($el, "margin-left", 0);
          });
      }
    );

    it.each([
      ["default", "rgb(204, 214, 219)"],
      ["transparent", "rgba(0, 0, 0, 0)"],
      ["black", "rgb(0, 0, 0)"],
    ])(
      "should check Tile Footer variant as %s for Tile component",
      (variant, backGroundColor) => {
        CypressMountWithProviders(
          <testStories.TileFooterComponent variant={variant} />
        );
        tileFooter()
          .should("have.css", "background-color", backGroundColor)
          .then((elem) => {
            checkOutlineCss(
              elem,
              1,
              "border-top",
              "solid",
              "rgb(204, 214, 219)"
            );
            expect(elem.css("background-color")).to.equals(backGroundColor);
          });
      }
    );

    it.each([CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS])(
      "should check Tile Footer children as %s for Tile component",
      (children) => {
        CypressMountWithProviders(
          <Tile>
            <TileFooter p={3}>
              <Typography pr={2} display="inline" variant="b">
                {children}
              </Typography>
            </TileFooter>
          </Tile>
        );
        tileFooter().should("have.text", children);
      }
    );

    it.each([
      [10, 111],
      [30, 385],
      [60, 795],
    ])("should check w as %s for Tile component", (w, dtWidth) => {
      CypressMountWithProviders(<testStories.DlTileComponent w={w} />);
      getDataElementByValue("dt").then(($el) => {
        useJQueryCssValueAndAssert($el, "width", dtWidth);
      });
    });

    it.each([
      ["default", "rgb(204, 214, 219)"],
      ["selected", "rgb(0, 0, 0)"],
      ["positive", "rgb(0, 138, 33)"],
      ["negative", "rgb(203, 55, 74)"],
      ["caution", "rgb(239, 103, 0)"],
      ["info", "rgb(0, 96, 167)"],
    ])(
      "should check border variant as %s for Tile component",
      (borderVariant, borderColor) => {
        CypressMountWithProviders(
          <testStories.TileComponent borderVariant={borderVariant} />
        );
        tile().should("have.css", "border-color", borderColor);
      }
    );

    it.each([
      ["borderWidth000", 0],
      ["borderWidth100", 1],
      ["borderWidth200", 2],
      ["borderWidth300", 3],
      ["borderWidth400", 4],
    ])(
      "should check border width as %s for Tile component",
      (borderWidth, pixelWidth) => {
        CypressMountWithProviders(
          <testStories.TileComponent borderWidth={borderWidth} />
        );
        tile().then(($el) => {
          useJQueryCssValueAndAssert($el, "border-width", pixelWidth);
        });
      }
    );
  });

  describe("check Accessibility for Tile component", () => {
    it.each(["tile", "transparent", "active"])(
      "should check Accessibility for %s variant for Tile component",
      (variant) => {
        CypressMountWithProviders(
          <testStories.TileComponent variant={variant} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(["vertical", "horizontal"])(
      "should check Accessibility for %s orientation for Tile component",
      (orientation) => {
        CypressMountWithProviders(
          <testStories.TileComponent orientation={orientation} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(["30%", "50%", 0])(
      "should check Accessibility for width as %s for Tile component",
      (widthInPercentage) => {
        CypressMountWithProviders(
          <testStories.TileComponent width={widthInPercentage} />
        );

        cy.checkAccessibility();
      }
    );

    it("should check Accessibility for children for Tile component", () => {
      CypressMountWithProviders(
        <Tile>
          <Content title="children_test" />
        </Tile>
      );

      cy.checkAccessibility();
    });

    it.each(testData)(
      "should check Accessibility for ddTextAlign as %s for Tile component",
      (align) => {
        CypressMountWithProviders(
          <testStories.DlTileComponent ddTextAlign={align} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check Accessibility for dtTextAlign as %s for Tile component",
      (align) => {
        CypressMountWithProviders(
          <testStories.DlTileComponent
            dtTextAlign={align}
            ddTextAlign="right"
          />
        );

        cy.checkAccessibility();
      }
    );

    it("should check Accessibility for single column for Tile component", () => {
      CypressMountWithProviders(
        <testStories.DlTileComponent dtTextAlign="left" asSingleColumn />
      );

      cy.checkAccessibility();
    });

    it.each([10, 30])(
      "should check Accessibility for dtTextAlign as %s for Tile component",
      (w) => {
        CypressMountWithProviders(
          <testStories.DlTileComponent
            w={w}
            dtTextAlign="left"
            ddTextAlign="left"
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each(["default", "transparent", "black"])(
      "should check Accessibility for Tile Footer variant as %s for Tile component",
      (variant) => {
        CypressMountWithProviders(
          <testStories.TileFooterComponent variant={variant} />
        );

        cy.checkAccessibility();
      }
    );

    it.each([CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS])(
      "should check Accessibility for Tile Footer children as %s for Tile component",
      (children) => {
        CypressMountWithProviders(
          <Tile>
            <TileFooter p={3}>
              <Typography pr={2} display="inline" variant="b">
                {children}
              </Typography>
            </TileFooter>
          </Tile>
        );

        cy.checkAccessibility();
      }
    );

    it.each([10, 30, 60])(
      "should check Accessibility for w as %s for Tile component",
      (w) => {
        CypressMountWithProviders(<testStories.DlTileComponent w={w} />);

        cy.checkAccessibility();
      }
    );

    it.each(["default", "selected", "positive", "negative", "caution", "info"])(
      "should check Accessibility for border variant as %s for Tile component",
      (borderVariant) => {
        CypressMountWithProviders(
          <testStories.TileComponent borderVariant={borderVariant} />
        );

        cy.checkAccessibility();
      }
    );

    it.each([
      "borderWidth000",
      "borderWidth100",
      "borderWidth200",
      "borderWidth300",
      "borderWidth400",
    ])(
      "should check Accessibility for border width as %s for Tile component",
      (borderWidth) => {
        CypressMountWithProviders(
          <testStories.TileComponent borderWidth={borderWidth} />
        );

        cy.checkAccessibility();
      }
    );
  });
});
