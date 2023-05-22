/* eslint-disable jest/valid-expect */
import React from "react";
import { ButtonBarProps } from "components/button-bar";
import {
  Default as ButtonBarCustom,
  DefaultWithWrapper as ButtonBarWithWrapper,
  DefaultWithButtonMinor as ButtonBarMinor,
} from "../../../src/components/button-bar/button-bar-test.stories";

import {
  BUTTON_BAR_SIZES,
  BUTTON_BAR_ICON_POSITIONS,
} from "../../../src/components/button-bar/button-bar.config";

<<<<<<< HEAD
import { buttonDataComponent } from "../../locators/button";
import { icon } from "../../locators";
=======
import {
  buttonDataComponent,
  buttonMinorComponent,
} from "../../locators/button";
import { cyRoot, icon } from "../../locators";
>>>>>>> 33ffdbc3b (test(button-minor button-bar): change useJQueryCssValueAndAssert to assertCssValuesApproximately)
import { assertCssValueIsApproximately } from "../../support/component-helper/common-steps";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

context("Test for Button-Bar component", () => {
  describe("check props for Button-Bar component", () => {
    it.each([
      [BUTTON_BAR_SIZES[0], 32, "--spacing200"],
      [BUTTON_BAR_SIZES[1], 40, "--spacing300"],
      [BUTTON_BAR_SIZES[2], 48, "--spacing400"],
    ] as [ButtonBarProps["size"], number, string][])(
      "should set size to %s for a Button-Bar",
      (size, px, token) => {
        CypressMountWithProviders(<ButtonBarCustom size={size} />);
        for (let i = 0; i < 3; i++) {
          buttonDataComponent()
            .eq(i)
            .should("have.css", "min-height", `${px}px`);
          buttonDataComponent()
            .eq(i)
            .getDesignTokensByCssProperty("padding-left")
            .then(($el) => {
              expect($el[0]).to.equal(token);
            });
        }
      }
    );

    it.each([
      [BUTTON_BAR_ICON_POSITIONS[0], "right"],
      [BUTTON_BAR_ICON_POSITIONS[1], "left"],
    ] as [ButtonBarProps["iconPosition"], string][])(
      "should set position to %s for icon in a Button-Bar",
      (iconPosition, margin) => {
        CypressMountWithProviders(
          <ButtonBarCustom iconPosition={iconPosition} />
        );

        icon().should("have.css", `margin-${margin}`, "8px");
      }
    );

    it("should render Button-Bar with full width", () => {
      CypressMountWithProviders(<ButtonBarCustom fullWidth />);

      buttonDataComponent()
        .parent()
        .then(($el: JQuery<HTMLElement>) => {
          assertCssValueIsApproximately($el, "width", 1366);
        });
    });
  });

  describe("accessibility tests", () => {
    it.each([BUTTON_BAR_SIZES[0], BUTTON_BAR_SIZES[1], BUTTON_BAR_SIZES[2]])(
      "should check accessibility for %s size for a Button-Bar",
      (size) => {
        CypressMountWithProviders(<ButtonBarCustom size={size} />);

        cy.checkAccessibility();
      }
    );

    it.each([BUTTON_BAR_ICON_POSITIONS[0], BUTTON_BAR_ICON_POSITIONS[1]])(
      "should check accessibility for %s icon position in a Button-Bar",
      (iconPosition) => {
        CypressMountWithProviders(
          <ButtonBarCustom iconPosition={iconPosition} />
        );

        cy.checkAccessibility();
      }
    );

    it("should check the accessibility of Button-Bar with full width", () => {
      CypressMountWithProviders(<ButtonBarCustom fullWidth />);

      cy.checkAccessibility();
    });
  });

  describe("check ButtonBar can be navigated using a keyboard", () => {
    it("should verify ButtonBar with wrapped components can be navigated using keyboard", () => {
      CypressMountWithProviders(<ButtonBarCustom />);

      buttonDataComponent().eq(0).focus();
      buttonDataComponent().eq(0).tab();
      buttonDataComponent().eq(1).should("be.focused");
      buttonDataComponent().eq(0).should("not.be.focused");
      buttonDataComponent().eq(1).tab();
      buttonDataComponent().eq(2).should("be.focused");
      buttonDataComponent().eq(1).should("not.be.focused");
    });
  });

  describe("when custom Button wrapper components are used as children in ButtonBar", () => {
    it("Button size is small when the size prop is set to small and passed to ButtonBar", () => {
      CypressMountWithProviders(<ButtonBarWithWrapper size="small" />);

      buttonDataComponent().then(($el: JQuery<HTMLElement>) => {
        assertCssValueIsApproximately($el, "width", 81);
      });
    });

    it("Button is fullWidth when the fullWidth prop is passed to ButtonBar", () => {
      CypressMountWithProviders(<ButtonBarWithWrapper fullWidth />);

      buttonDataComponent().then(($el: JQuery<HTMLElement>) => {
        assertCssValueIsApproximately($el, "width", 339);
      });
    });

    it.each([
      ["after", "left"],
      ["before", "right"],
    ])(
      "Button Icon position is %s text when the iconPosition is set and passed to ButtonBar",
      (iconPosition, margin) => {
        CypressMountWithProviders(
          <ButtonBarWithWrapper iconPosition={iconPosition} />
        );

        icon().should("have.css", `margin-${margin}`, "8px");
      }
    );

    it("should verify ButtonBar with wrapped components can be navigated using keyboard", () => {
      CypressMountWithProviders(<ButtonBarWithWrapper />);

      buttonDataComponent().eq(0).focus();
      buttonDataComponent().eq(0).tab();
      buttonDataComponent().eq(1).should("be.focused");
      buttonDataComponent().eq(0).should("not.be.focused");
      buttonDataComponent().eq(1).tab();
      buttonDataComponent().eq(2).should("be.focused");
      buttonDataComponent().eq(1).should("not.be.focused");
      buttonDataComponent().eq(2).tab();
      icon().eq(3).parent().should("be.focused");
      buttonDataComponent().eq(2).should("not.be.focused");
    });
  });

  describe("renders with ButtonMinor children", () => {
    it("should apply correct background-color on hover for all ButtonMinor children", () => {
      CypressMountWithProviders(<ButtonBarMinor />);

      buttonMinorComponent(0).should(
        "have.css",
        "background-color",
        "rgba(0, 0, 0, 0)"
      );
      buttonMinorComponent(0).realHover();

      buttonMinorComponent(1).should(
        "have.css",
        "background-color",
        "rgba(0, 0, 0, 0)"
      );
      buttonMinorComponent(1).realHover();

      buttonMinorComponent(2).should(
        "have.css",
        "background-color",
        "rgba(0, 0, 0, 0)"
      );
      buttonMinorComponent(2).realHover();

      // reset focus
      cyRoot().realHover({ position: "topLeft" });
    });

    it("should apply the correct color to the all ButtonMinor children", () => {
      CypressMountWithProviders(<ButtonBarMinor />);

      buttonMinorComponent(0).should("have.css", "color", "rgb(51, 91, 112)");
      buttonMinorComponent(0).realHover();

      buttonMinorComponent(1).should("have.css", "color", "rgb(51, 91, 112)");
      buttonMinorComponent(1).realHover();

      buttonMinorComponent(2).should("have.css", "color", "rgb(51, 91, 112)");
      buttonMinorComponent(2).realHover();

      // reset focus
      cyRoot().realHover({ position: "topLeft" });
    });

    it("should check Button Minor Bar have correct border-color for the button at index %n", () => {
      CypressMountWithProviders(<ButtonBarMinor />);

      buttonMinorComponent(0).should(
        "have.css",
        "border-color",
        "rgb(51, 91, 112) rgba(0, 0, 0, 0) rgb(51, 91, 112) rgb(51, 91, 112)"
      );
      buttonMinorComponent(1).realHover();

      buttonMinorComponent(1).should(
        "have.css",
        "border-color",
        "rgb(51, 91, 112) rgba(0, 0, 0, 0) rgb(51, 91, 112) rgb(51, 91, 112)"
      );
      buttonMinorComponent(0).realHover();

      buttonMinorComponent(2).should(
        "have.css",
        "border-color",
        "rgb(51, 91, 112)"
      );
      buttonMinorComponent(2).realHover();

      // reset focus
      cyRoot().realHover({ position: "topLeft" });
    });
  });
});
