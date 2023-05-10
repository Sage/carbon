import React from "react";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import * as testStories from "../../../src/components/tooltip/tooltip-test.stories";
import * as stories from "../../../src/components/tooltip/tooltip.stories";
import {
  tooltipPreview,
  tooltipTrigger,
  tooltipTriggerToggle,
} from "../../locators/tooltip/index";
import {
  SIZE,
  COLOR,
  CHARACTERS,
} from "../../support/component-helper/constants";
import { useJQueryCssValueAndAssert } from "../../support/component-helper/common-steps";
import { getDataElementByValue } from "../../locators";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const backgroundColors = [COLOR.ORANGE, COLOR.RED, COLOR.BLACK, COLOR.BROWN];

context("Tests for Tooltip component", () => {
  describe("should check Tooltip component properties", () => {
    it.each(testData)(
      "should check %s as message for Tooltip component",
      (message) => {
        CypressMountWithProviders(
          <testStories.TooltipComponent message={message} />
        );
        tooltipPreview().should("have.text", message);
      }
    );

    it.each(testData)("should check %s as Id for Tooltip component", (id) => {
      CypressMountWithProviders(<testStories.TooltipComponent id={id} />);
      tooltipPreview().should("have.id", id);
    });

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should check when tooltip visibility is %s for Tooltip component",
      (bool, state) => {
        CypressMountWithProviders(
          <testStories.TooltipComponent isVisible={bool} />
        );
        tooltipPreview().should(state);
      }
    );

    it.each(["bottom", "left", "right", "top"])(
      "should check %s position of tooltip for Tooltip component",
      (position) => {
        CypressMountWithProviders(
          <testStories.TooltipComponent position={position}>
            {`This tooltip is positioned ${position}`}
          </testStories.TooltipComponent>
        );
        tooltipPreview().should("be.visible").and("have.css", position);
      }
    );

    it.each(["undefined", "error"])(
      "should check %s type for Tooltip component",
      (type) => {
        CypressMountWithProviders(<testStories.TooltipComponent type={type} />);
        tooltipPreview().should("have.attr", "type", type);
      }
    );

    it.each(backgroundColors)(
      "should check tooltip background-color as %s for Tooltip component",
      (color) => {
        CypressMountWithProviders(
          <testStories.TooltipComponent bgColor={color} />
        );
        tooltipPreview().should("have.css", "background-color", color);
      }
    );

    it.each(backgroundColors)(
      "should check tooltip font color as %s for Tooltip component",
      (color) => {
        CypressMountWithProviders(
          <testStories.TooltipComponent fontColor={color} />
        );
        tooltipPreview().should("have.css", "color", color);
      }
    );

    it.each([
      [SIZE.MEDIUM, 14],
      [SIZE.LARGE, 16],
    ])("should check %s size for Tooltip component", (size, fontSize) => {
      CypressMountWithProviders(<testStories.TooltipComponent size={size} />);
      tooltipPreview().should("have.css", "font-size", `${fontSize}px`);
    });

    it.each([
      ["left", "bottom", "top"],
      ["top", "bottom", "top"],
      ["left", "top", "bottom"],
      ["bottom", "top", "bottom"],
      ["bottom", "left", "bottom"],
      ["bottom", "right", "bottom"],
      ["top", "left", "top"],
      ["top", "right", "top"],
      ["right", "bottom", "right"],
      ["right", "top", "right"],
    ])(
      "should check flip position to the %s when tooltip position is %s and scrolling to the %s side for Tooltip component",
      (flipPosition, tooltipPosition, scrollPosition) => {
        CypressMountWithProviders(
          <div style={{ padding: "60px 60px 60px 60px" }}>
            <testStories.TooltipComponent
              flipOverrides={[flipPosition]}
              position={tooltipPosition}
            />
          </div>
        );
        cy.viewport(700, 120);
        cy.scrollTo(scrollPosition);
        tooltipPreview().should("have.attr", "data-placement", flipPosition);
      }
    );

    describe.each(["top", "bottom", "right", "left"])(
      "when tooltip has %s position and",
      (position) => {
        it.each([
          [SIZE.SMALL, { top: 15, bottom: 631, left: 47, right: 1040 }],
          [SIZE.MEDIUM, { top: 14, bottom: 630, left: 44, right: 1037 }],
          [SIZE.LARGE, { top: 10, bottom: 626, left: 40, right: 1033 }],
        ])(
          "when inputSize is %s should have correct styles applied",
          (inputSize, offset) => {
            CypressMountWithProviders(
              <testStories.TooltipComponent
                isPartOfInput
                inputSize={inputSize}
                position={position}
              />
            );
            tooltipPreview().then(($el) => {
              useJQueryCssValueAndAssert($el, position, offset[position]);
              Cypress.dom.isVisible($el);
            });
          }
        );
      }
    );

    it("should show tooltip when target is hovered", () => {
      CypressMountWithProviders(<testStories.UncontrolledTooltipComponent />);
      tooltipPreview().should("not.exist");
      tooltipTrigger().trigger("mouseenter");
      tooltipPreview().should("be.visible");
    });

    it("should hide tooltip when mouse leaves target", () => {
      CypressMountWithProviders(<testStories.UncontrolledTooltipComponent />);
      tooltipPreview().should("not.exist");
      tooltipTrigger().trigger("mouseenter");
      tooltipPreview().should("be.visible");
      tooltipTrigger().trigger("mouseleave");
      tooltipPreview().should("not.exist");
    });

    it("should show tooltip when target is focused", () => {
      CypressMountWithProviders(<testStories.UncontrolledTooltipComponent />);
      tooltipPreview().should("not.exist");
      tooltipTrigger().focus();
      tooltipPreview().should("be.visible");
    });

    it("should hide tooltip when target is blurred", () => {
      CypressMountWithProviders(<testStories.UncontrolledTooltipComponent />);
      tooltipPreview().should("not.exist");
      tooltipTrigger().focus();
      tooltipPreview().should("be.visible");
      tooltipTrigger().blur();
      tooltipPreview().should("not.exist");
    });

    it("new tooltip target should still trigger tooltip visibility", () => {
      CypressMountWithProviders(
        <testStories.TooltipWithChangingTargetComponent />
      );
      tooltipTrigger().should("have.text", "Target");

      tooltipTrigger().trigger("mouseenter");
      tooltipPreview().should("be.visible");
      tooltipTrigger().trigger("mouseleave");
      tooltipPreview().should("not.exist");

      tooltipTriggerToggle().click();
      tooltipTrigger().should("have.text", "Secondary target");

      tooltipTrigger().trigger("mouseenter");
      tooltipPreview().should("be.visible");
      tooltipTrigger().trigger("mouseleave");
      tooltipPreview().should("not.exist");
    });
  });

  describe("Accessibility tests for Tooltip component", () => {
    it("should pass accessibilty tests for Tooltip Default story", () => {
      CypressMountWithProviders(<stories.Default />);

      getDataElementByValue("main-text")
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should pass accessibilty tests for Tooltip Controlled story", () => {
      CypressMountWithProviders(<stories.Controlled />);

      getDataElementByValue("main-text")
        .eq(0)
        .click()
        .then(() => cy.checkAccessibility());
    });

    it.each([
      ["top", 0],
      ["bottom", 1],
      ["left", 2],
      ["right", 3],
    ])(
      "should pass accessibilty tests for Tooltip Positioning story %s position",
      (position, button) => {
        CypressMountWithProviders(<stories.Positioning />);

        getDataElementByValue("main-text")
          .eq(button)
          .click()
          .then(() => cy.checkAccessibility());
      }
    );

    it("should pass accessibilty tests for Tooltip FlipBehviourOverrides story", () => {
      CypressMountWithProviders(<stories.FlipBehviourOverrides />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for Tooltip LargeTooltip story", () => {
      CypressMountWithProviders(<stories.LargeTooltip />);

      getDataElementByValue("main-text")
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should pass accessibilty tests for Tooltip Types story", () => {
      CypressMountWithProviders(<stories.Types />);

      getDataElementByValue("main-text")
        .eq(1)
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          getDataElementByValue("main-text")
            .eq(2)
            .click()
            .then(() => cy.checkAccessibility());
        });
    });

    it("should pass accessibilty tests for Tooltip ColorOverrides story", () => {
      CypressMountWithProviders(<stories.ColorOverrides />);

      getDataElementByValue("main-text")
        .click()
        .then(() => cy.checkAccessibility());
    });

    it("should pass accessibilty tests for Tooltip ColorOverrides story", () => {
      CypressMountWithProviders(<stories.ColorOverrides />);

      getDataElementByValue("main-text")
        .click()
        .then(() => cy.checkAccessibility());
    });
  });

  it("should render the Tooltip with the expected border radius styling", () => {
    CypressMountWithProviders(<testStories.TooltipComponent />);
    tooltipPreview().should("have.css", "border-radius", "4px");
  });
});
