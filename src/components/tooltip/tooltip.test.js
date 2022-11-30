/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import * as React from "react";
import { forwardRef } from "react";
import Tooltip from "./tooltip.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import { tooltipPreview } from "../../../cypress/locators/tooltip/index";
import {
  SIZE,
  COLOR,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const backgroundColors = [COLOR.ORANGE, COLOR.RED, COLOR.BLACK, COLOR.BROWN];

const TooltipComponent = ({ ...props }) => {
  const Component = forwardRef(({ children }, ref) => (
    <button
      tabIndex="0"
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
  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        {" "}
        {}
      </div>
      <div
        style={{
          padding: "60px 60px 60px 160px",
        }}
      >
        <Tooltip message="I am a tooltip!" isVisible {...props}>
          <Component>target</Component>
        </Tooltip>
      </div>
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
          [
            SIZE.SMALL,
            { top: "5px", bottom: "5px", left: "5px", right: "5px" },
          ],
          [
            SIZE.MEDIUM,
            { top: "4px", bottom: "4px", left: "2px", right: "2px" },
          ],
          [
            SIZE.LARGE,
            { top: "0px", bottom: "0px", left: "-2px", right: "-2px" },
          ],
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
            tooltipPreview()
              .should("have.css", position, offset[position])
              .and("be.visible");
          }
        );
      }
    );
  });
});
