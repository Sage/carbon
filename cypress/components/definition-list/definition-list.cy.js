import React from "react";
import Dl from "../../../src/components/definition-list/dl.component";
import Dt from "../../../src/components/definition-list/dt.component";
import Dd from "../../../src/components/definition-list/dd.component";
import Box from "../../../src/components/box";
import Icon from "../../../src/components/icon";
import Hr from "../../../src/components/hr";
import Typography from "../../../src/components/typography";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { getDataElementByValue } from "../../locators/index";
import { CHARACTERS } from "../../support/component-helper/constants";
import { assertCssValueIsApproximately } from "../../support/component-helper/common-steps";

const specialCharacters = [
  CHARACTERS.STANDARD,
  CHARACTERS.DIACRITICS,
  CHARACTERS.SPECIALCHARACTERS,
];
const widths = [
  [135, 1229, 10, 90],
  [683, 683, 50, 50],
  [1229, 135, 90, 10],
];
const alignValue = ["left", "center", "right"];

const DLComponent = ({ ...props }) => {
  return (
    <div>
      <Dl data-element="dl" {...props}>
        <Dt>First</Dt>
        <Dd data-element="dd">Description 1</Dd>
        <Dt>Second</Dt>
        <Dd>Description 2</Dd>
        <Dt>Third</Dt>
        <Dd>Description 3</Dd>
      </Dl>
    </div>
  );
};

const DLBoxComponent = () => {
  return (
    <div>
      <Box data-element="box" width="65%" px={2} pt={4} pb={3}>
        <Box width="90%">
          <Typography color="rgba(0,0,0,0.55)" variant="segment-subheader-alt">
            Segment Header
          </Typography>
          <Hr ml={0} mt={2} />
        </Box>
        <Box mb={3} display="flex">
          <Box flexGrow="1">
            <Dl dtTextAlign="left" asSingleColumn>
              <Dt>First</Dt>
              <Dd>Description 1</Dd>
              <Dt>Second</Dt>
              <Dd>Description 2</Dd>
              <Dt>Third</Dt>
              <Dd>Description</Dd>
            </Dl>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

context("Testing Definition List component", () => {
  describe("should render Definition List component", () => {
    it.each(alignValue)(
      "should verify Definition List text is %s aligned",
      (align) => {
        CypressMountWithProviders(
          <DLComponent dtTextAlign={align} ddTextAlign="right" />
        );

        getDataElementByValue("dt").should("have.css", "text-align", align);
      }
    );

    it.each(alignValue)(
      "should verify Definition List definition is %s aligned",
      (align) => {
        CypressMountWithProviders(<DLComponent ddTextAlign={align} />);

        getDataElementByValue("dd").should("have.css", "text-align", align);
      }
    );

    it.each(widths)(
      "should verify text width is %spx and definition width is %spx, %s%/%s% of the Definition List width",
      (dtPixels, ddPixels, dtPercent) => {
        CypressMountWithProviders(<DLComponent w={dtPercent} />);

        getDataElementByValue("dl")
          .children()
          .then(($el) => {
            assertCssValueIsApproximately($el, "width", dtPixels);
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
      "should check Definition List text is %s when children prop is set to %s",
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
      "should check Definition List definition is %s when children prop is set to %s",
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

      getDataElementByValue("dt")
        .should("have.css", "text-align", "left")
        .then(($el) => {
          assertCssValueIsApproximately($el, "width", 1366);
        });
      getDataElementByValue("dd")
        .should("have.css", "text-align", "left")
        .and("have.css", "margin-left", "0px")
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
  });

  describe("Accessibility tests for Definition List component", () => {
    it.each(alignValue)(
      "should pass accessibility tests for Definition List when text is %s aligned",
      (align) => {
        CypressMountWithProviders(
          <DLComponent dtTextAlign={align} ddTextAlign="right" />
        );

        cy.checkAccessibility();
      }
    );

    it.each(alignValue)(
      "should pass accessibility tests for Definition List when DD text is %s aligned",
      (align) => {
        CypressMountWithProviders(<DLComponent ddTextAlign={align} />);

        cy.checkAccessibility();
      }
    );

    it.each(widths)(
      "should pass the accessibility tests when text width is %spx and definition width is %spx, %s%/%s% of the Definition List width",
      (dtPixels, ddPixels, dtPercent) => {
        CypressMountWithProviders(<DLComponent w={dtPercent} />);

        cy.checkAccessibility();
      }
    );

    it.each(specialCharacters)(
      "should pass accessibility tests for Definition List if text is %s when children prop is set to %s",
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
      "should pass accessibility tests for Definition List if is %s when children prop is set to %s",
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
