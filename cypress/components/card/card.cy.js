/* eslint-disable react/prop-types */
import React from "react";
import { Card } from "../../../src/components/card";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  CardComponent,
  DraggableExample,
  CardTextAlignment,
} from "../../../src/components/card/card-test.stories";
import {
  SmallSpacing,
  LargeSpacing,
  WithCardWidthProvided,
  WithCustomHeight,
  Interactive,
  WithCustomBoxShadow,
  DifferentCardRowPadding,
  DifferentCardFooterPadding,
  MoreExamplesOfCardFooter,
  WithStringAsChild,
  WithDraggable,
} from "../../../src/components/card/card.stories";
import {
  card,
  draggableCard,
  draggableContainer,
  columnCard,
  footerCard,
} from "../../locators/card/index";
import { SIZE, CHARACTERS } from "../../support/component-helper/constants";
import {
  useJQueryCssValueAndAssert,
  disableTheAnimationAndTransitions,
} from "../../support/component-helper/common-steps";
import { cyRoot } from "../../locators";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const textAlignment = ["center", "left", "right"];

context("Tests for Card component", () => {
  describe("should check Card component properties", () => {
    it.each([
      [SIZE.SMALL, 24],
      [SIZE.MEDIUM, 32],
      [SIZE.LARGE, 48],
    ])(
      "should check %s spacing and padding for Card component ",
      (spacing, paddings) => {
        CypressMountWithProviders(<CardComponent spacing={spacing} />);
        card().then(($el) => {
          useJQueryCssValueAndAssert($el, "padding-left", paddings);
          useJQueryCssValueAndAssert($el, "padding-right", paddings);
        });
      }
    );

    it.each(testData)(
      "should check %s as children for Card component",
      (stringValue) => {
        CypressMountWithProviders(<Card>{stringValue}</Card>);
        card().should("have.text", stringValue);
      }
    );

    it.each([250, 500, 650, 300])(
      "should check %s width for Card component",
      (width) => {
        CypressMountWithProviders(<CardComponent cardWidth={`${width}px`} />);
        card().then(($el) => {
          useJQueryCssValueAndAssert($el, "width", width);
        });
      }
    );

    it.each([
      [1, 2, 2, 2],
      [3, 1, 4, 0],
      [4, 2, 2, 2],
    ])(
      "drag %s Card item to the %s column",
      (draggableCardItem, columnName, lengthOfFirst, lengthOfSecond) => {
        CypressMountWithProviders(<DraggableExample />);

        draggableCard(draggableCardItem - 1).trigger("dragstart");
        draggableContainer(columnName).trigger("drop");
        draggableContainer(columnName).trigger("dragend");

        draggableContainer(columnName)
          .find(`[data-element="draggable-card-${draggableCardItem - 1}"]`)
          .should("exist")
          .and("be.visible");

        draggableContainer(1)
          .children()
          .should("have.length", lengthOfFirst + 1);

        draggableContainer(2)
          .children()
          .should("have.length", lengthOfSecond + 1);
      }
    );

    it("should check dataRole for Card component", () => {
      CypressMountWithProviders(<CardComponent data-role="cypress" />);
      card().should("have.attr", "data-role", "cypress");
    });

    it("should check interactive for Card component", () => {
      CypressMountWithProviders(<CardComponent interactive />);
      card().realHover();
      card()
        .should("have.css", "cursor", "pointer")
        .and(
          "have.css",
          "box-shadow",
          "rgba(0, 20, 30, 0.2) 0px 5px 5px 0px, rgba(0, 20, 30, 0.1) 0px 10px 10px 0px"
        );

      // to reset hover()
      cyRoot().realHover({ position: "topLeft" });
    });

    it("should allow custom boxShadow and hoverBoxShadow prop values", () => {
      disableTheAnimationAndTransitions();

      CypressMountWithProviders(
        <CardComponent
          boxShadow="boxShadow400"
          hoverBoxShadow="boxShadow200"
          interactive
        />
      );

      card().should(
        "have.css",
        "box-shadow",
        "rgba(0, 20, 30, 0.04) 0px 10px 40px 0px, rgba(0, 20, 30, 0.1) 0px 50px 80px 0px"
      );

      card()
        .realHover()
        .wait(50)
        .then(($el) => {
          expect($el).to.have.css("cursor", "pointer");
          expect($el).to.have.css(
            "box-shadow",
            "rgba(0, 20, 30, 0.2) 0px 10px 20px 0px, rgba(0, 20, 30, 0.1) 0px 20px 40px 0px"
          );
        });

      // to reset hover()
      cyRoot().realHover({ position: "topLeft" });
    });

    it.each(textAlignment)(
      "should check %s alignment for Card component",
      (align) => {
        CypressMountWithProviders(<CardTextAlignment align={align} />);
        columnCard().should("have.css", "text-align", align);
      }
    );

    it.each([375, 535, 777])(
      "should check %s height for Card component",
      (height) => {
        CypressMountWithProviders(<CardComponent height={`${height}px`} />);
        card().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", height);
        });
      }
    );

    it("should call onClick callback when a click event is triggered", () => {
      const setClickCounter = cy.stub();

      CypressMountWithProviders(
        <CardComponent interactive action={setClickCounter} />
      );
      card()
        .click({ force: true })
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(setClickCounter).to.have.been.calledOnce;
        });
    });
  });

  describe("Accessibility tests for Card component", () => {
    it("should pass accessibility tests for Card default story", () => {
      CypressMountWithProviders(<CardComponent />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Card with small spacing", () => {
      CypressMountWithProviders(<SmallSpacing />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Card with large spacing", () => {
      CypressMountWithProviders(<LargeSpacing />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Card with width provided", () => {
      CypressMountWithProviders(<WithCardWidthProvided />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Card with custom height", () => {
      CypressMountWithProviders(<WithCustomHeight />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for interactive Card", () => {
      CypressMountWithProviders(<Interactive />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Card with custom box shadow", () => {
      CypressMountWithProviders(<WithCustomBoxShadow />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Card with different card row padding", () => {
      CypressMountWithProviders(<DifferentCardRowPadding />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Card with different card footer padding", () => {
      CypressMountWithProviders(<DifferentCardFooterPadding />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Card with more examples of footer", () => {
      CypressMountWithProviders(<MoreExamplesOfCardFooter />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Card with string as a child", () => {
      CypressMountWithProviders(<WithStringAsChild />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for draggable Card", () => {
      CypressMountWithProviders(<WithDraggable />);

      cy.checkAccessibility();
    });
  });

  it.each(["default", "large"])(
    "should have the expected border radius styling when roundness is %s",
    (roundness) => {
      const result = roundness === "default" ? "8px" : "16px";
      CypressMountWithProviders(<CardComponent roundness={roundness} />);
      card().should("have.css", "border-radius", result);
      footerCard().should(
        "have.css",
        "border-radius",
        `0px 0px ${result} ${result}`
      );
    }
  );
});
