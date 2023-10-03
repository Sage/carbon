import React from "react";
import { DlProps } from "components/definition-list/dl.component";
import {
  Tile,
  TileProps,
  TileContent,
  TileFooter,
  TileFooterProps,
} from "../../../src/components/tile";
import * as testStories from "../../../src/components/tile/tile-test.stories";
import Typography from "../../../src/components/typography/typography.component";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { getDataElementByValue } from "../../locators/index";
import { CHARACTERS } from "../../support/component-helper/constants";

import { tile, tileFooter } from "../../locators/tile/index";
import {
  checkOutlineCss,
  assertCssValueIsApproximately,
} from "../../support/component-helper/common-steps";

const testData = ["left", "center", "right"];

context("Tests for Tile component", () => {
  describe("check props for Tile component", () => {
    it.each([
      ["tile", "rgb(204, 214, 219)", "rgb(255, 255, 255)"],
      ["transparent", "rgb(204, 214, 219)", "rgba(0, 0, 0, 0)"],
      ["active", "rgb(0, 126, 69)", "rgb(242, 249, 246)"],
    ] as [TileProps["variant"], string, string][])(
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
      ["vertical", 199],
      ["horizontal", 67],
    ] as [TileProps["orientation"], number][])(
      "should check %s orientation for Tile component",
      (orientation, height) => {
        CypressMountWithProviders(
          <testStories.TileComponent orientation={orientation} />
        );
        tile().then(($el) => {
          assertCssValueIsApproximately($el, "height", height);
        });
      }
    );

    it.each([
      ["30%", 409],
      ["50%", 683],
      [0, 1366],
    ] as [TileProps["width"], number][])(
      "should check width as %s for Tile component",
      (widthInPercentage, widthInPixel) => {
        CypressMountWithProviders(
          <testStories.TileComponent width={widthInPercentage} />
        );
        tile().then(($el) => {
          assertCssValueIsApproximately($el, "width", widthInPixel);
        });
      }
    );

    it.each([
      ["30%", 54],
      ["50%", 90],
      [0, 67],
    ] as [TileProps["height"], number][])(
      "should check height as %s for Tile component",
      (heightInPercentage, heightInPixel) => {
        CypressMountWithProviders(
          <testStories.TileComponent height={heightInPercentage} />
        );
        tile().then(($el) => {
          assertCssValueIsApproximately($el, "height", heightInPixel);
        });
      }
    );

    it.each([...testData] as DlProps["ddTextAlign"][])(
      "should check ddTextAlign as %s for Tile component",
      (align) => {
        CypressMountWithProviders(
          <testStories.DlTileComponent ddTextAlign={align} />
        );
        getDataElementByValue("dd").should("have.css", "text-align", align);
      }
    );

    it.each([...testData] as DlProps["dtTextAlign"][])(
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
          assertCssValueIsApproximately($el, "width", 1316);
        });
      getDataElementByValue("dd").then(($el) => {
        assertCssValueIsApproximately($el, "width", 1316);
        assertCssValueIsApproximately($el, "margin-left", 0);
      });
    });

    it.each([
      [10, 107, 1184],
      [30, 370, 921],
    ])(
      "should check dtTextAlign as number %s for Tile component",
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
            assertCssValueIsApproximately($el, "width", dtWidth);
            assertCssValueIsApproximately($el, "margin-block-start", 0);
            assertCssValueIsApproximately($el, "margin-block-end", 16);
            assertCssValueIsApproximately($el, "margin-left", 0);
          });
        getDataElementByValue("dd")
          .should("have.css", "text-align", "left")
          .then(($el) => {
            assertCssValueIsApproximately($el, "width", ddWidth);
            assertCssValueIsApproximately($el, "margin-block-start", 0);
            assertCssValueIsApproximately($el, "margin-block-end", 16);
            assertCssValueIsApproximately($el, "margin-left", 0);
          });
      }
    );

    it.each([
      ["default", "rgb(204, 214, 219)"],
      ["transparent", "rgba(0, 0, 0, 0)"],
      ["black", "rgb(0, 0, 0)"],
    ] as [TileFooterProps["variant"], string][])(
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
      [10, 107],
      [30, 370],
      [60, 765],
    ])("should check w as %s for Tile component", (w, dtWidth) => {
      CypressMountWithProviders(<testStories.DlTileComponent w={w} />);
      getDataElementByValue("dt").then(($el) => {
        assertCssValueIsApproximately($el, "width", dtWidth);
      });
    });

    it.each([
      ["default", "rgb(204, 214, 219)"],
      ["selected", "rgb(0, 0, 0)"],
      ["positive", "rgb(0, 138, 33)"],
      ["negative", "rgb(203, 55, 74)"],
      ["caution", "rgb(239, 103, 0)"],
      ["info", "rgb(0, 96, 167)"],
    ] as [TileProps["borderVariant"], string][])(
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
    ] as [TileProps["borderWidth"], number][])(
      "should check border width as %s for Tile component",
      (borderWidth, pixelWidth) => {
        CypressMountWithProviders(
          <testStories.TileComponent borderWidth={borderWidth} />
        );
        tile().then(($el) => {
          assertCssValueIsApproximately($el, "border-width", pixelWidth);
        });
      }
    );

    it.each(["default", "large"] as TileProps["roundness"][])(
      "render with the expected border radius when roundness is %s",
      (roundness) => {
        CypressMountWithProviders(
          <testStories.TileComponent roundness={roundness} />
        );
        const result = roundness === "default" ? "8px" : "16px";

        tile().should("have.css", "border-radius", result);
      }
    );

    it("should not render any falsy children passed", () => {
      CypressMountWithProviders(<testStories.TileComponentWithFalsyChildren />);

      tile().children().eq(0).should("exist");
      tile().children().eq(1).should("not.exist");
      tile().children().eq(2).should("not.exist");
    });
  });

  describe("check Accessibility for Tile component", () => {
    it.each(["tile", "transparent", "active"] as TileProps["variant"][])(
      "should check Accessibility for %s variant for Tile component",
      (variant) => {
        CypressMountWithProviders(
          <testStories.TileComponent variant={variant} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(["vertical", "horizontal"] as TileProps["orientation"][])(
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
          <TileContent>children_test</TileContent>
        </Tile>
      );

      cy.checkAccessibility();
    });

    it.each([...testData] as DlProps["ddTextAlign"][])(
      "should check Accessibility for ddTextAlign as %s for Tile component",
      (align) => {
        CypressMountWithProviders(
          <testStories.DlTileComponent ddTextAlign={align} />
        );

        cy.checkAccessibility();
      }
    );

    it.each([...testData] as DlProps["dtTextAlign"][])(
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
      "should check Accessibility for dtTextAlign as number %s for Tile component",
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

    it.each([
      "default",
      "transparent",
      "black",
    ] as TileFooterProps["variant"][])(
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

    it.each([
      "default",
      "selected",
      "positive",
      "negative",
      "caution",
      "info",
    ] as TileProps["borderVariant"][])(
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
    ] as TileProps["borderWidth"][])(
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
