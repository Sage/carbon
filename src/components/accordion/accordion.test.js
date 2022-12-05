import * as React from "react";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  accordion,
  accordionIcon,
  accordionDefaultTitle,
  accordionTitleContainer,
  accordionTitleContainerByPosition,
  accordionContent,
} from "../../../cypress/locators/accordion";
import { positionOfElement, keyCode } from "../../../cypress/support/helper";
import { getDataElementByValue } from "../../../cypress/locators";
import {
  ACCORDION_ADD_CONTENT,
  ACCORDION_REMOVE_CONTENT,
} from "../../../cypress/locators/accordion/locators";
import { checkGoldenOutline } from "../../../cypress/support/component-helper/common-steps";
import {
  SIZE,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";

import {
  AccordionComponent,
  AccordionWithIcon,
  AccordionGroupWithError,
  AccordionGroupWithWarning,
  AccordionGroupWithInfo,
  AccordionGroupComponent,
  DynamicContent,
  AccordionDefault,
  AccordionWithBoxAndDifferentPaddings,
  AccordionOpeningButton,
  AccordionGroupDefault,
  AccordionGroupValidation,
  AccordionWithDefinitionList,
} from "./accordion-test.stories";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const accWidths = [["700px"], ["900px"], ["1100px"], ["1300px"]];

context("Testing Accordion component", () => {
  describe("should render Accordion component", () => {
    it("should check AccordionRow is expanded using click", () => {
      CypressMountWithProviders(<AccordionComponent />);

      accordionTitleContainer().click();

      accordionTitleContainer()
        .should("have.attr", "aria-expanded", "true")
        .and("be.visible");

      accordionContent()
        .should("have.attr", "data-element", "accordion-content")
        .and("be.visible");
    });

    it("should check AccordionRow is expanded using Enter key", () => {
      CypressMountWithProviders(<AccordionComponent />);

      accordionTitleContainer().trigger("keydown", keyCode("Enter"));

      accordionTitleContainer()
        .should("have.attr", "aria-expanded", "true")
        .and("be.visible");

      accordionContent()
        .should("have.attr", "data-element", "accordion-content")
        .and("be.visible");
    });

    it("should verify AccordionRow has golden border outline", () => {
      CypressMountWithProviders(<AccordionComponent />);

      accordionTitleContainer().focus();

      accordionDefaultTitle()
        .then(($el) => {
          checkGoldenOutline($el);
        })
        .and("be.visible");
    });

    it.each([["chevron_down"], ["dropdown"]])(
      "should set iconType to %s when Accordion row is closed",
      (iconType) => {
        CypressMountWithProviders(<AccordionComponent iconType={iconType} />);

        accordionIcon()
          .should("have.attr", "type", iconType)
          .and("be.visible")
          .and(
            "have.css",
            "transform",
            "matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)"
          );
      }
    );

    it.each([["chevron_down"], ["dropdown"]])(
      "should set iconType to %s when Accordion row is open",
      (iconType) => {
        CypressMountWithProviders(<AccordionComponent iconType={iconType} />);

        accordionTitleContainer().click();

        accordionIcon()
          .should("have.attr", "type", iconType)
          .and("be.visible")
          .and(
            "not.have.css",
            "transform",
            "matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)"
          );
      }
    );

    it.each([["left"], ["right"]])(
      "should set Accordion iconAlign to %s",
      (iconAlign) => {
        CypressMountWithProviders(<AccordionComponent iconAlign={iconAlign} />);

        accordionTitleContainerByPosition(positionOfElement("first"))
          .first()
          .should("have.attr", "data-element", "accordion-headings-container")
          .and("be.visible");
        accordionTitleContainerByPosition(positionOfElement("first"))
          .last()
          .should("have.attr", "data-component", "icon")
          .and("be.visible");
        if (iconAlign === "right") {
          // set by default
          accordionTitleContainer()
            .should("have.css", "justify-content", "space-between")
            .and("not.have.css", "flex-direction", "row-reverse");
          accordionTitleContainer(positionOfElement("first"))
            .first()
            .should("have.css", "margin-right", "0px");
        } else {
          accordionTitleContainer().should(
            "have.css",
            "flex-direction",
            "row-reverse"
          );
          accordionTitleContainerByPosition(positionOfElement("first"))
            .last()
            .should("have.css", "margin-right", "16px");
        }
      }
    );

    it("should verify AccordionRow is expanded by clicking on validation icon", () => {
      CypressMountWithProviders(<AccordionWithIcon />);

      accordionIcon().eq(0).click();

      accordionTitleContainer()
        .should("have.attr", "aria-expanded", "true")
        .and("be.visible");

      accordionContent()
        .should("have.attr", "data-element", "accordion-content")
        .and("be.visible");
    });

    it.each([[true], [false]])(
      "should call onChange callback when a click event is triggered and expanded is set to %s",
      (isExpanded) => {
        const callback = cy.stub();

        CypressMountWithProviders(
          <AccordionComponent expanded={isExpanded} onChange={callback} />
        );

        accordionTitleContainer()
          .click()
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it.each(testData)(
      "should render Accordion component with %s as a title",
      (titleValue) => {
        CypressMountWithProviders(<AccordionComponent title={titleValue} />);

        accordionTitleContainer().should("contain.text", titleValue);
      }
    );

    it.each(testData)(
      "should render Accordion component with %s as a subtitle",
      (titleValue) => {
        CypressMountWithProviders(<AccordionComponent subTitle={titleValue} />);

        accordionTitleContainer().should("contain.text", titleValue);
      }
    );

    it.each([
      [SIZE.SMALL, "24px"],
      [SIZE.LARGE, "46px"],
    ])(
      "should render Accordion component with %s as a size and has height property set to %s",
      (size, height) => {
        CypressMountWithProviders(<AccordionComponent size={size} />);

        accordionTitleContainer()
          .should("have.css", "height")
          .and("contain", height);
      }
    );

    it.each([
      ["solid", "rgb(204, 214, 219)"],
      ["none", "rgba(0, 0, 0, 0.9)"],
    ])(
      "should render Accordion component with border type '%s'",
      (border, colour) => {
        CypressMountWithProviders(<AccordionComponent borders={border} />);

        accordion()
          .should("have.css", "border-bottom-style", border)
          .and("have.css", "border-bottom-color", colour);
      }
    );

    it.each([["true"], ["false"]])(
      "should check Accordion is expanded or not by default",
      (state) => {
        CypressMountWithProviders(
          <AccordionComponent defaultExpanded={state} />
        );

        accordionTitleContainer()
          .should("have.attr", "aria-expanded", state)
          .and("be.visible");
      }
    );

    it.each([
      ["true", "be.visible"],
      ["false", "be.visible"],
    ])("should check Accordion is expanded or not", (state, visibility) => {
      CypressMountWithProviders(<AccordionComponent expanded={state} />);

      accordionTitleContainer()
        .should("have.attr", "aria-expanded", state)
        .and(visibility);
    });

    it.each([
      ["white", "rgb(255, 255, 255)", "be.visible"],
      ["transparent", "rgba(0, 0, 0, 0)", "be.visible"],
    ])("should check Accordion scheme is %s", (scheme, colour) => {
      CypressMountWithProviders(<AccordionComponent scheme={scheme} />);

      accordion().should("have.css", "background-color", colour);
    });

    it.each(accWidths)("should check Accordion width is %s", (widths) => {
      CypressMountWithProviders(<AccordionComponent width={widths} />);

      accordion().should("have.css", "width").and("equal", widths);
    });

    it("should verify Accordion has an error message in the tooltip", () => {
      CypressMountWithProviders(<AccordionGroupWithError />);

      accordionIcon().eq(0).click();

      accordionIcon()
        .should("have.attr", "data-element", "error")
        .and("have.attr", "type", "error");
    });

    it("should verify AccordionRow has a warning message in the tooltip", () => {
      CypressMountWithProviders(<AccordionGroupWithWarning />);

      accordionIcon().eq(0).click();

      accordionIcon()
        .should("have.attr", "data-element", "warning")
        .and("have.attr", "type", "warning");
    });

    it("should verify AccordionRow has an info message in the tooltip", () => {
      CypressMountWithProviders(<AccordionGroupWithInfo />);

      accordionIcon().eq(0).click();

      accordionIcon()
        .should("have.attr", "data-element", "info")
        .and("have.attr", "type", "info");
    });

    it.each([[100], [200], [300]])(
      "should check accordion heading is a button with width %spx",
      (widths) => {
        CypressMountWithProviders(
          <AccordionComponent
            title="Button"
            buttonHeading
            buttonWidth={widths}
          />
        );

        accordionTitleContainer()
          .should("have.css", "width")
          .and("contain", widths);
      }
    );

    it("should verify accordion title changes when accordion is opened", () => {
      CypressMountWithProviders(
        <AccordionComponent buttonHeading title="Closed" openTitle="Open" />
      );

      accordionTitleContainer().should("contain.text", "Closed");

      accordionIcon().eq(0).click();

      accordionTitleContainer().should("contain.text", "Open");
    });
  });

  describe("should render Accordion Grouped component", () => {
    it("should move through all grouped accordions using ArrowDown key and check focus", () => {
      CypressMountWithProviders(<AccordionGroupComponent />);

      accordionTitleContainer().eq(0).focus();
      accordionTitleContainerByPosition(0)
        .parent()
        .then(($el) => {
          checkGoldenOutline($el);
        })
        .and("be.visible");

      accordionTitleContainer().eq(0).trigger("keydown", keyCode("downarrow"));
      accordionTitleContainerByPosition(1)
        .parent()
        .then(($el) => {
          checkGoldenOutline($el);
        })
        .and("be.visible");

      accordionTitleContainer().eq(1).trigger("keydown", keyCode("downarrow"));
      accordionTitleContainerByPosition(2)
        .parent()
        .then(($el) => {
          checkGoldenOutline($el);
        })
        .and("be.visible");
    });

    it("should move to the last grouped accordion using End key and check it is focused", () => {
      CypressMountWithProviders(<AccordionGroupComponent />);

      accordionTitleContainer().eq(0).focus();

      accordionTitleContainer().eq(0).trigger("keydown", keyCode("End"));

      accordionTitleContainerByPosition(2)
        .parent()
        .then(($el) => {
          checkGoldenOutline($el);
        })
        .and("be.visible");
    });

    it("should move to the first grouped accordion using Home key and check it is focused", () => {
      CypressMountWithProviders(<AccordionGroupComponent />);

      accordionTitleContainer().eq(2).focus();

      accordionTitleContainer().eq(2).trigger("keydown", keyCode("Home"));

      accordionTitleContainerByPosition(0)
        .parent()
        .then(($el) => {
          checkGoldenOutline($el);
        })
        .and("be.visible");
    });
  });

  describe("should change content height when children change", () => {
    it("should have proper height", () => {
      CypressMountWithProviders(<DynamicContent />);
      accordionContent().parent().should("have.css", "height", "78px");
      getDataElementByValue(ACCORDION_ADD_CONTENT).click();
      accordionContent().parent().should("have.css", "height", "96px");
      getDataElementByValue(ACCORDION_ADD_CONTENT).click();
      accordionContent().parent().should("have.css", "height", "114px");
      getDataElementByValue(ACCORDION_REMOVE_CONTENT).click();
      accordionContent().parent().should("have.css", "height", "96px");
      getDataElementByValue(ACCORDION_REMOVE_CONTENT).click();
      accordionContent().parent().should("have.css", "height", "78px");
    });
  });

  describe("Accessibility tests for Accordion", () => {
    it("should pass accessibility tests for AccordionDefault", () => {
      CypressMountWithProviders(<AccordionDefault />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for AccordionDefault expanded", () => {
      CypressMountWithProviders(<AccordionDefault expanded />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Accordion with disableContentPadding ", () => {
      CypressMountWithProviders(<AccordionDefault disableContentPadding />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Accordion transparent", () => {
      CypressMountWithProviders(<AccordionDefault scheme="transparent" />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Accordion size small", () => {
      CypressMountWithProviders(<AccordionDefault size="small" />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Accordion with subTitle", () => {
      CypressMountWithProviders(<AccordionDefault subTitle="Sub title" />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Accordion with full borders", () => {
      CypressMountWithProviders(<AccordionDefault borders="full" />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Accordion with full borders expanded", () => {
      CypressMountWithProviders(<AccordionDefault borders="full" expanded />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Accordion with left aligned icon", () => {
      CypressMountWithProviders(<AccordionDefault iconAlign="left" />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Accordion with 500px width", () => {
      CypressMountWithProviders(<AccordionDefault width="500px" />);

      cy.checkAccessibility();
    });

    it.each([
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 5],
      [6, 6],
    ])(
      "should pass accessibility tests for Accordion with margin set to %s and padding set to %s",
      (margin, padding) => {
        CypressMountWithProviders(<AccordionDefault m={margin} p={padding} />);

        cy.checkAccessibility();
      }
    );

    it.each([[0], [1], [2], [3], [4], [5], [6]])(
      "should pass accessibility tests for Accordion with title padding set to %s",
      (padding) => {
        CypressMountWithProviders(
          <AccordionDefault
            headerSpacing={{
              p: padding,
            }}
          />
        );

        cy.checkAccessibility();
      }
    );

    it("should pass accessibility tests for Accordion with Box and different paddings", () => {
      CypressMountWithProviders(<AccordionWithBoxAndDifferentPaddings />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Accordion with opening buttons", () => {
      CypressMountWithProviders(<AccordionOpeningButton />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for AccordionGroup", () => {
      CypressMountWithProviders(<AccordionGroupDefault />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for AccordionGroupValidation", () => {
      CypressMountWithProviders(<AccordionGroupValidation />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for AccordionWithDefinitionList", () => {
      CypressMountWithProviders(<AccordionWithDefinitionList />);

      cy.checkAccessibility();
    });
  });
});
