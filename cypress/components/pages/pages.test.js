import React from "react";
import * as stories from "../../../src/components/pages/pages-test.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

import { dataComponentButtonByText, backArrow } from "../../locators/pages";
import { getComponent, getDataElementByValue } from "../../locators/index";
import { CHARACTERS } from "../../support/component-helper/constants";
import { disableTheAnimationAndTransitions } from "../../support/component-helper/common-steps";

context("Testing Pages component", () => {
  before(() => {
    disableTheAnimationAndTransitions();
  });

  describe("should render Pages component", () => {
    describe.each(["initialPageIndex", "pageIndex"])("when %s", (propName) => {
      describe.each([
        ["number", 1],
        ["string", "1"],
      ])(`is passed as %s`, (type, propValue) => {
        it("should show the title that matches the one on the page with that index", () => {
          const props = { [propName]: propValue };

          CypressMountWithProviders(<stories.PagesComponent {...props} />);

          dataComponentButtonByText("Open Preview").click();
          getDataElementByValue("title").should("have.text", "My Second Page");
        });
      });
    });

    it.each(["slide", "fade"])(
      "should render Pages component with transition set to %s",
      (transition) => {
        CypressMountWithProviders(
          <stories.PagesComponent transition={transition} />
        );

        dataComponentButtonByText("Open Preview").click();
        dataComponentButtonByText("Go to second page").click();
        getComponent("page")
          .should("have.attr", "class")
          .and("contain", transition);
      }
    );

    it("should render Pages component and go next to Second page", () => {
      CypressMountWithProviders(<stories.PagesComponent />);

      dataComponentButtonByText("Open Preview")
        .click()
        .then(() => {
          dataComponentButtonByText("Go to second page").click();
        });

      getDataElementByValue("title").should("have.text", "My Second Page");
    });

    it("should render Pages component and go next to Third page", () => {
      CypressMountWithProviders(
        <stories.PagesComponent initialPageIndex={1} />
      );

      dataComponentButtonByText("Open Preview")
        .click()
        .then(() => {
          dataComponentButtonByText("Go to third page").click();
        });

      getDataElementByValue("title").should("have.text", "My Third Page");
    });

    it("should render Pages component and go back to Second page", () => {
      CypressMountWithProviders(
        <stories.PagesComponent initialPageIndex={2} />
      );

      dataComponentButtonByText("Open Preview")
        .click()
        .then(() => {
          backArrow().click();
        });

      getDataElementByValue("title").should("have.text", "My Second Page");
    });

    it("should render Pages component and go back to First page", () => {
      CypressMountWithProviders(
        <stories.PagesComponent initialPageIndex={1} />
      );

      dataComponentButtonByText("Open Preview")
        .click()
        .then(() => {
          backArrow().click();
        });

      getDataElementByValue("title").should("have.text", "My First Page");
    });
  });

  describe("should render Page component", () => {
    it.each([CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS])(
      "with title prop set to %s",
      (title) => {
        CypressMountWithProviders(<stories.PageComponent title={title} />);

        getComponent("page").should("have.text", title);
      }
    );
  });

  describe("should render Pages component and check accessibility", () => {
    describe.each(["initialPageIndex", "pageIndex"])("when %s", (propName) => {
      describe.each([
        ["number", 1],
        ["string", "1"],
      ])(`is passed as %s`, (type, propValue) => {
        it("should show the title that matches the one on the page with that index and check accessibility", () => {
          const props = { [propName]: propValue };

          CypressMountWithProviders(<stories.PagesComponent {...props} />);

          dataComponentButtonByText("Open Preview")
            .click()
            .then(() => {
              cy.checkAccessibility();
            });
        });
      });
    });

    it.each(["slide", "fade"])(
      "should render Pages component with transition set to %s and check accessibility",
      (transition) => {
        CypressMountWithProviders(
          <stories.PagesComponent transition={transition} />
        );

        dataComponentButtonByText("Open Preview")
          .click()
          .then(() => {
            cy.checkAccessibility();
          });
      }
    );

    it("should render Pages component and check accessibility", () => {
      CypressMountWithProviders(
        <stories.PagesComponent initialPageIndex={1} />
      );

      dataComponentButtonByText("Open Preview")
        .click()
        .then(() => {
          cy.checkAccessibility();
        });
    });

    it("should render Page component with different padding and check accessibility", () => {
      CypressMountWithProviders(<stories.PageComponent p={0} />);

      cy.checkAccessibility();
    });
  });
});
