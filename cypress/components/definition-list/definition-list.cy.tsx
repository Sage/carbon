import React from "react";
import {
  DLComponent,
  DLBoxComponent,
  UsingBoxToOverrideBackgroundColor,
} from "../../../src/components/definition-list/definition-list-test.stories";
import Dl, {
  DlProps,
} from "../../../src/components/definition-list/dl.component";
import Dt from "../../../src/components/definition-list/dt.component";
import Dd from "../../../src/components/definition-list/dd.component";
import Box from "../../../src/components/box";
import Icon from "../../../src/components/icon";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { getDataElementByValue } from "../../locators/index";
import { CHARACTERS } from "../../support/component-helper/constants";
import { assertCssValueIsApproximately } from "../../support/component-helper/common-steps";

const specialCharacters = [
  CHARACTERS.STANDARD,
  CHARACTERS.DIACRITICS,
  CHARACTERS.SPECIALCHARACTERS,
];

const alignValue = ["left", "center", "right"];
const PADDING_RIGHT = 24;
const VIEWPORT_WIDTH = 1000;

context("Definition List", () => {
  describe("when rendered", () => {
    it("should verify that display is grid when asSingleColumn prop is not set", () => {
      CypressMountWithProviders(<DLComponent />);

      getDataElementByValue("dl").should("have.css", "display", "grid");
      getDataElementByValue("dt").should("have.css", "grid-column", "1 / auto");
      getDataElementByValue("dd").should("have.css", "grid-column", "2 / auto");
    });
    it.each(alignValue as DlProps["dtTextAlign"][])(
      "should verify dt element text is %s aligned",
      (align) => {
        CypressMountWithProviders(
          <DLComponent dtTextAlign={align} ddTextAlign="right" />
        );
        getDataElementByValue("dt").should("have.css", "text-align", align);
      }
    );

    it.each(alignValue as DlProps["ddTextAlign"][])(
      "should verify dd element text is %s aligned",
      (align) => {
        CypressMountWithProviders(<DLComponent ddTextAlign={align} />);
        getDataElementByValue("dd").should("have.css", "text-align", align);
      }
    );

    it.each([
      [100, VIEWPORT_WIDTH - 100, 10],
      [500, VIEWPORT_WIDTH - 500, 50],
      [900, VIEWPORT_WIDTH - 900, 90],
    ])(
      "should verify text width is %spx and definition width is %spx, %s% of the Definition List width",
      (dtPixels, ddPixels, dtPercent) => {
        cy.viewport(VIEWPORT_WIDTH, 500);
        CypressMountWithProviders(<DLComponent w={dtPercent} />);
        getDataElementByValue("dl")
          .children()
          .then(($el) => {
            assertCssValueIsApproximately(
              $el,
              "width",
              dtPixels - PADDING_RIGHT
            );
          });
        getDataElementByValue("dl")
          .children()
          .eq(1)
          .then(($el) => {
            assertCssValueIsApproximately($el, "width", ddPixels);
          });
      }
    );

    it.each(specialCharacters)(
      "should check Definition List text when children prop is set to %s",
      (text) => {
        CypressMountWithProviders(
          <Dl>
            <Dt>{text}</Dt>
            <Dd>Definition</Dd>
          </Dl>
        );
        getDataElementByValue("dt").should("have.text", text);
      }
    );

    it.each(specialCharacters)(
      "should check Definition List when children prop is set to %s",
      (definition) => {
        CypressMountWithProviders(
          <Dl>
            <Dt>Text</Dt>
            <Dd data-element="dd">{definition}</Dd>
          </Dl>
        );
        getDataElementByValue("dd").should("have.text", definition);
      }
    );

    it("should verify Definition List text is displayed as a single column", () => {
      CypressMountWithProviders(
        <DLComponent dtTextAlign="left" asSingleColumn />
      );
      getDataElementByValue("dl").should("not.have.css", "display", "grid");
      getDataElementByValue("dt")
        .should("have.css", "text-align", "left")
        .and("not.have.css", "grid-column", "1 / auto")
        .then(($el) => {
          assertCssValueIsApproximately($el, "width", 1366);
        });
      getDataElementByValue("dd")
        .should("have.css", "text-align", "left")
        .and("have.css", "margin-left", "0px")
        .and("not.have.css", "grid-column", "2 / auto")
        .then(($el) => {
          assertCssValueIsApproximately($el, "width", 1366);
        });
    });

    it("should check Definition List definition is displayed with a tick icon", () => {
      CypressMountWithProviders(
        <Dl>
          <Dt>Text</Dt>
          <Dd data-element="dd">
            <Box display="inline-flex" alignItems="center">
              <Box mr={1}>Details example</Box>
              <Icon type="tick" />
            </Box>
          </Dd>
        </Dl>
      );
      getDataElementByValue("dd")
        .children()
        .children()
        .eq(1)
        .should("have.attr", "data-component", "icon")
        .and("have.attr", "data-element", "tick");
    });

    it("should verify Definition List is displayed with children inside React fragment", () => {
      CypressMountWithProviders(
        <Dl>
          {true && (
            <>
              <Dt>Text inside React Fragment</Dt>
              <Dd data-element="dd">Description inside React Fragment</Dd>
            </>
          )}
        </Dl>
      );
      getDataElementByValue("dt").should(
        "have.text",
        "Text inside React Fragment"
      );
      getDataElementByValue("dd").should(
        "have.text",
        "Description inside React Fragment"
      );
    });

    it("should render Definition List within a box combined with typography and hr components", () => {
      CypressMountWithProviders(<DLBoxComponent />);

      getDataElementByValue("box")
        .children()
        .children()
        .should("contain.text", "Segment Header");
      getDataElementByValue("box")
        .children()
        .children()
        .eq(1)
        .should("have.attr", "data-component", "hr");
      getDataElementByValue("box")
        .children()
        .eq(1)
        .children()
        .children()
        .should("have.attr", "data-component", "dl");
    });

    it("should render dt and dd children when wrapped in a Box", () => {
      CypressMountWithProviders(<UsingBoxToOverrideBackgroundColor />);
      getDataElementByValue("box1").children().should("be.visible");
      getDataElementByValue("box2").children().should("be.visible");
    });
  });

  describe("Accessibility tests for Definition List component", () => {
    it.each(alignValue as DlProps["dtTextAlign"][])(
      "should pass accessibility tests for Definition List when text is %s aligned",
      (align) => {
        CypressMountWithProviders(
          <DLComponent dtTextAlign={align} ddTextAlign="right" />
        );
        cy.checkAccessibility();
      }
    );

    it.each(alignValue as DlProps["ddTextAlign"][])(
      "should pass accessibility tests for Definition List when DD text is %s aligned",
      (align) => {
        CypressMountWithProviders(<DLComponent ddTextAlign={align} />);
        cy.checkAccessibility();
      }
    );

    it.each([10, 50, 90])(
      "should pass the accessibility tests when text width is %spx",
      (dtPercent) => {
        CypressMountWithProviders(<DLComponent w={dtPercent} />);
        cy.checkAccessibility();
      }
    );

    it.each(specialCharacters)(
      "should pass accessibility tests for Definition List if text is %s",
      (text) => {
        CypressMountWithProviders(
          <Dl>
            <Dt>{text}</Dt>
            <Dd>Definition</Dd>
          </Dl>
        );
        cy.checkAccessibility();
      }
    );

    it.each(specialCharacters)(
      "should pass accessibility tests for Definition List when children prop is set to %s",
      (definition) => {
        CypressMountWithProviders(
          <Dl>
            <Dt>Text</Dt>
            <Dd data-element="dd">{definition}</Dd>
          </Dl>
        );
        cy.checkAccessibility();
      }
    );

    it("should pass accessibility tests for Definition List when text is displayed as a single column", () => {
      CypressMountWithProviders(
        <DLComponent dtTextAlign="left" asSingleColumn />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Definition List when definition is displayed with a tick icon", () => {
      CypressMountWithProviders(
        <Dl>
          <Dt>Text</Dt>
          <Dd data-element="dd">
            <Box display="inline-flex" alignItems="center">
              <Box mr={1}>Details example</Box>
              <Icon type="tick" />
            </Box>
          </Dd>
        </Dl>
      );
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Definition List is displayed with children inside React fragment", () => {
      CypressMountWithProviders(
        <Dl>
          {true && (
            <>
              <Dt>Text inside React Fragment</Dt>
              <Dd data-element="dd">Description inside React Fragment</Dd>
            </>
          )}
        </Dl>
      );
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Definition List within a box combined with typography and hr components", () => {
      CypressMountWithProviders(<DLBoxComponent />);

      cy.checkAccessibility();
    });
  });
});
