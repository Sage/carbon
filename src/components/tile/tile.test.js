import * as React from "react";
import Tile from "./tile.component";
import Content from "../content";
import Dl from "../definition-list/dl.component";
import Dt from "../definition-list/dt.component";
import Dd from "../definition-list/dd.component";

import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import { getDataElementByValue } from "../../../cypress/locators/index";

import tile from "../../../cypress/locators/tile";

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
      ["vertical", 265],
      ["horizontal", 89],
    ])(
      "should check %s orientation for Tile component",
      (orientation, height) => {
        CypressMountWithProviders(<TileComponent orientation={orientation} />);
        tile().should("have.css", "height", `${height}px`);
      }
    );

    it.each([
      ["30%", 405],
      ["50%", 675],
      [0, 1350],
    ])(
      "should check width as %s for Tile component",
      (widthInPercentage, widthInPixel) => {
        CypressMountWithProviders(<TileComponent width={widthInPercentage} />);
        tile().should("have.css", "width", `${widthInPixel}px`);
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
        .and("have.css", "width", "1350px");
      getDataElementByValue("dd")
        .should("have.css", "text-align", "left")
        .and("have.css", "margin-left", "0px")
        .and("have.css", "width", "1350px");
    });

    it.each([
      [10, 111, 1215],
      [30, 381, 945],
    ])(
      "should check dtTextAlign as %s for Tile component",
      (w, dtWidth, ddWidth) => {
        CypressMountWithProviders(
          <DlTileComponent w={w} dtTextAlign="left" ddTextAlign="left" />
        );
        getDataElementByValue("dt")
          .should("have.css", "text-align", "left")
          .and("have.css", "width", `${dtWidth}px`)
          .and("have.css", "margin-block-start", "0px")
          .and("have.css", "margin-block-end", "16px")
          .and("have.css", "margin-left", "0px");

        getDataElementByValue("dd")
          .should("have.css", "text-align", "left")
          .and("have.css", "margin-block-start", "0px")
          .and("have.css", "margin-block-end", "16px")
          .and("have.css", "width", `${ddWidth}px`);
      }
    );
  });
});
