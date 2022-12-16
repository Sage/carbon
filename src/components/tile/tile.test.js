import React from "react";
import Tile from ".";
import Content from "../content";
import { Dl, Dt, Dd } from "../definition-list";
import Accordion from "../accordion/accordion.component";
import Button from "../button/button.component";
import TileFooter from "./tile-footer";
import Typography from "../typography/typography.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { getDataElementByValue } from "../../../cypress/locators/index";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";

import { tile, tileFooter } from "../../../cypress/locators/tile/index";
import {
  checkOutlineCss,
  useJQueryCssValueAndAssert,
} from "../../../cypress/support/component-helper/common-steps";

const testData = ["left", "center", "right"];

const TileComponent = ({ ...props }) => {
  return (
    <Tile {...props}>
      <Content title="Test Title One">Test Body One</Content>
      <Content title="Test Title Two">Test Body Two</Content>
      <Content title="Test Title Three">Test Body Three</Content>
    </Tile>
  );
};

const TileFooterComponent = ({ ...props }) => {
  return (
    <Tile p={0} orientation="vertical">
      <Accordion
        p={0}
        headerSpace={{
          p: 3,
        }}
        borders="none"
        title="Accordion"
      >
        <Dl dtTextAlign="left" ddTextAlign="right">
          <Dt>Coffee Subscription</Dt>
          <Dd>£7.00 a month</Dd>
          <Dt>Grind Size</Dt>
          <Dd>Espresso</Dd>
          <Dt>Quantity</Dt>
          <Dd>3kg</Dd>
          <Dd>
            <Button
              buttonType="tertiary"
              href="https://goo.gl/maps/GMReLoBpbn9mdZVZ7"
            >
              Have a promo code?
            </Button>
          </Dd>
        </Dl>
      </Accordion>
      <TileFooter {...props} p={3}>
        <Typography pr={2} display="inline" variant="b">
          Example footer text
        </Typography>
        <Typography display="inline">Example text</Typography>
      </TileFooter>
    </Tile>
  );
};

const DlTileComponent = ({ ...props }) => {
  return (
    <div>
      <Dl data-element="dl" {...props}>
        <Dt>Coffee Subscription</Dt>
        <Dd data-element="dd">£7.00 a month</Dd>
        <Dt>Grind Size</Dt>
        <Dd>Espresso</Dd>
        <Dt>Quantity</Dt>
        <Dd>3kg</Dd>
      </Dl>
    </div>
  );
};

context("Tests for Tile component", () => {
  describe("check props for Tile component", () => {
    it.each([
      ["tile", "rgb(204, 214, 219)", "rgb(255, 255, 255)"],
      ["transparent", "rgb(204, 214, 219)", "rgba(0, 0, 0, 0)"],
      ["active", "rgb(0, 126, 69)", "rgb(242, 249, 246)"],
    ])(
      "should check %s variant for Tile component",
      (variant, borderColor, backGroundColor) => {
        CypressMountWithProviders(<TileComponent variant={variant} />);
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
        CypressMountWithProviders(<TileComponent orientation={orientation} />);
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
        CypressMountWithProviders(<TileComponent width={widthInPercentage} />);
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
        CypressMountWithProviders(<DlTileComponent ddTextAlign={align} />);
        getDataElementByValue("dd").should("have.css", "text-align", align);
      }
    );

    it.each(testData)(
      "should check dtTextAlign as %s for Tile component",
      (align) => {
        CypressMountWithProviders(
          <DlTileComponent dtTextAlign={align} ddTextAlign="right" />
        );
        getDataElementByValue("dt").should("have.css", "text-align", align);
      }
    );

    it("should check single column for Tile component", () => {
      CypressMountWithProviders(
        <DlTileComponent dtTextAlign="left" asSingleColumn />
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
          <DlTileComponent w={w} dtTextAlign="left" ddTextAlign="left" />
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
      "should check tile footer variant as %s for Tile component",
      (variant, backGroundColor) => {
        CypressMountWithProviders(<TileFooterComponent variant={variant} />);
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
      "should check tile footer children as %s for Tile component",
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
      CypressMountWithProviders(<DlTileComponent w={w} />);
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
      "should check border variant as %s for tile component",
      (borderVariant, borderColor) => {
        CypressMountWithProviders(
          <TileComponent borderVariant={borderVariant} />
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
      "should check border width as %s for tile component",
      (borderWidth, pixelWidth) => {
        CypressMountWithProviders(<TileComponent borderWidth={borderWidth} />);
        tile().then(($el) => {
          useJQueryCssValueAndAssert($el, "border-width", pixelWidth);
        });
      }
    );
  });
});
