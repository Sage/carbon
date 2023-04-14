/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { forwardRef, useState } from "react";
import Tooltip from "../../../src/components/tooltip/tooltip.component";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

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

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const backgroundColors = [COLOR.ORANGE, COLOR.RED, COLOR.BLACK, COLOR.BROWN];

const Button = forwardRef(({ children }, ref) => (
  <button
    tabIndex="0"
    data-component="tooltip-trigger"
    style={{
      backgroundColor: "#00815D",
      color: "white",
      cursor: "pointer",
      border: "none",
      padding: "8px",
    }}
    ref={ref}
  >
    {children}
  </button>
));

const SecondaryButton = forwardRef(({ children }, ref) => (
  <button tabIndex="0" data-component="tooltip-trigger" ref={ref}>
    {children}
  </button>
));

const TooltipComponent = ({ ...props }) => (
  <div
    style={{
      padding: "60px 60px 60px 160px",
    }}
  >
    <Tooltip message="I am a tooltip!" isVisible {...props}>
      <Button>target</Button>
    </Tooltip>
  </div>
);

const UncontrolledTooltipComponent = () => (
  <div
    style={{
      padding: "60px 60px 60px 160px",
    }}
  >
    <Tooltip message="I am a tooltip!">
      <Button>target</Button>
    </Tooltip>
  </div>
);

const TooltipWithChangingTargetComponent = () => {
  const [displayOther, setDisplayOther] = useState(false);

  return (
    <>
      <button
        data-component="tooltip-trigger-toggle"
        onClick={() => setDisplayOther(!displayOther)}
      >
        Change target
      </button>
      <Tooltip message="I am a tooltip!">
        {displayOther ? (
          <SecondaryButton>Secondary target</SecondaryButton>
        ) : (
          <Button>Target</Button>
        )}
      </Tooltip>
    </>
  );
};

context("Tests for Tooltip component", () => {
  describe("should check Tooltip component properties", () => {
    it.each(testData)(
      "should check %s as message for Tooltip component",
      (message) => {
        CypressMountWithProviders(<TooltipComponent message={message} />);
        tooltipPreview().should("have.text", message);
      }
    );

    it.each(testData)("should check %s as Id for Tooltip component", (id) => {
      CypressMountWithProviders(<TooltipComponent id={id} />);
      tooltipPreview().should("have.id", id);
    });

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should check when tooltip visibility is %s for Tooltip component",
      (bool, state) => {
        CypressMountWithProviders(<TooltipComponent isVisible={bool} />);
        tooltipPreview().should(state);
      }
    );

    it.each(["bottom", "left", "right", "top"])(
      "should check %s position of tooltip for Tooltip component",
      (position) => {
        CypressMountWithProviders(
          <TooltipComponent position={position}>
            {`This tooltip is positioned ${position}`}
          </TooltipComponent>
        );
        tooltipPreview().should("be.visible").and("have.css", position);
      }
    );

    it.each(["undefined", "error"])(
      "should check %s type for Tooltip component",
      (type) => {
        CypressMountWithProviders(<TooltipComponent type={type} />);
        tooltipPreview().should("have.attr", "type", type);
      }
    );

    it.each(backgroundColors)(
      "should check tooltip background-color as %s for Tooltip component",
      (color) => {
        CypressMountWithProviders(<TooltipComponent bgColor={color} />);
        tooltipPreview().should("have.css", "background-color", color);
      }
    );

    it.each(backgroundColors)(
      "should check tooltip font color as %s for Tooltip component",
      (color) => {
        CypressMountWithProviders(<TooltipComponent fontColor={color} />);
        tooltipPreview().should("have.css", "color", color);
      }
    );

    it.each([
      [SIZE.MEDIUM, 14],
      [SIZE.LARGE, 16],
    ])("should check %s size for Tooltip component", (size, fontSize) => {
      CypressMountWithProviders(<TooltipComponent size={size} />);
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
            <TooltipComponent
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
              <TooltipComponent
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
      CypressMountWithProviders(<UncontrolledTooltipComponent />);
      tooltipPreview().should("not.exist");
      tooltipTrigger().trigger("mouseenter");
      tooltipPreview().should("be.visible");
    });

    it("should hide tooltip when mouse leaves target", () => {
      CypressMountWithProviders(<UncontrolledTooltipComponent />);
      tooltipPreview().should("not.exist");
      tooltipTrigger().trigger("mouseenter");
      tooltipPreview().should("be.visible");
      tooltipTrigger().trigger("mouseleave");
      tooltipPreview().should("not.exist");
    });

    it("should show tooltip when target is focused", () => {
      CypressMountWithProviders(<UncontrolledTooltipComponent />);
      tooltipPreview().should("not.exist");
      tooltipTrigger().focus();
      tooltipPreview().should("be.visible");
    });

    it("should hide tooltip when target is blurred", () => {
      CypressMountWithProviders(<UncontrolledTooltipComponent />);
      tooltipPreview().should("not.exist");
      tooltipTrigger().focus();
      tooltipPreview().should("be.visible");
      tooltipTrigger().blur();
      tooltipPreview().should("not.exist");
    });

    it("new tooltip target should still trigger tooltip visibility", () => {
      CypressMountWithProviders(<TooltipWithChangingTargetComponent />);
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
});
