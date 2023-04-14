import React from "react";
import { LinkPreviewComponentTest as LinkPreviewComponent } from "../../../src/components/link-preview/link-preview-test.stories";
import { getComponent } from "../../locators";
import {
  linkPreview,
  linkPreviewCloseIcon,
  linkPreviewTextElement,
  linkPreviewAs,
} from "../../locators/link-preview/index";
import { keyCode } from "../../../cypress/support/helper";
import { checkGoldenOutline } from "../../support/component-helper/common-steps";
import { CHARACTERS } from "../../support/component-helper/constants";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testCypress = "test-cypress";
const urlProp = "./carbon-by-sage-logo.png";

context("Test for Link Preview component", () => {
  describe("check props for Link Preview component", () => {
    it.each([["div"], ["a"]])(
      "should render Link Preview as prop using %s",
      (as) => {
        CypressMountWithProviders(<LinkPreviewComponent as={as} />);
        linkPreviewAs(as).should("be.visible");
      }
    );

    it.each(testData)(
      "should render Link Preview title prop using %s as special character",
      (title) => {
        CypressMountWithProviders(<LinkPreviewComponent title={title} />);
        linkPreviewTextElement(0).should("have.text", title);
      }
    );

    it.each(testData)(
      "should render Link Preview description prop using %s as special character",
      (description) => {
        CypressMountWithProviders(
          <LinkPreviewComponent description={description} />
        );
        linkPreviewTextElement(1).should("have.text", description);
      }
    );

    it("should render Link Preview with isLoading prop", () => {
      CypressMountWithProviders(<LinkPreviewComponent isLoading />);
      getComponent("link preview image placeholder")
        .parent()
        .children()
        .eq(1)
        .children()
        .find("span")
        .should("have.length", 4)
        .and("have.attr", "data-component", "preview");
    });

    it("should render Link Preview with Image props", () => {
      CypressMountWithProviders(
        <LinkPreviewComponent image={{ url: urlProp, alt: testCypress }} />
      );

      linkPreview()
        .find("img")
        .should("have.attr", "src", urlProp)
        .and("have.attr", "alt", testCypress);
    });

    it("should render Link Preview with url prop", () => {
      CypressMountWithProviders(
        <LinkPreviewComponent url="https://www.foo.com" />
      );

      linkPreviewTextElement(3).should("have.text", "www.foo.com");
    });
  });

  describe("check functionality of Link Preview component", () => {
    it("should verify hover color of Link Preview component", () => {
      CypressMountWithProviders(<LinkPreviewComponent />);

      linkPreview()
        .realHover()
        .should("have.css", "background-color", "rgb(204, 214, 219)");
    });

    it("verify border outline color and width of Link Preview on focus", () => {
      CypressMountWithProviders(<LinkPreviewComponent />);

      linkPreview()
        .focus()
        .then(($el) => {
          checkGoldenOutline($el, 2);
        });
    });

    it("should verify border outline color and width of close icon on focus", () => {
      CypressMountWithProviders(
        <LinkPreviewComponent as="div" onClose={() => cy.log("click")} />
      );

      linkPreviewCloseIcon()
        .parent()
        .focus()
        .then(($el) => {
          checkGoldenOutline($el);
        });
    });
  });

  describe("check events for Link Preview component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onClose callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <LinkPreviewComponent as="div" onClose={callback} />
      );

      linkPreviewCloseIcon()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each([["Enter"], ["Space"]])(
      "should call onClose callback when a keyboard event is triggered",
      (key) => {
        CypressMountWithProviders(
          <LinkPreviewComponent as="div" onClose={callback} />
        );

        linkPreviewCloseIcon()
          .trigger("keydown", keyCode(key))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );
  });
  describe("Accessibility tests for LinkPreview component", () => {
    it("should pass accessibilty tests for LinkPreview default story", () => {
      CypressMountWithProviders(<LinkPreviewComponent />);
      cy.checkAccessibility();
    });
    it("should pass accessibility tests for loading state", () => {
      CypressMountWithProviders(<LinkPreviewComponent isLoading />);
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for close icon", () => {
      CypressMountWithProviders(
        <LinkPreviewComponent onClose={() => cy.log("click")} />
      );
      cy.checkAccessibility();
    });
  });
});
