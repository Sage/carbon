import React from "react";
import Button, { ButtonProps } from "../../../src/components/button";
import * as stories from "../../../src/components/button/button-test.stories";
import * as storiesDefault from "../../../src/components/button/button.stories";

import {
  buttonSubtextPreview,
  buttonDataComponent,
} from "../../locators/button";

import {
  cyRoot,
  getDataElementByValue,
  icon,
  tooltipPreview,
} from "../../locators";
import { positionOfElement, keyCode } from "../../support/helper";
import { CHARACTERS } from "../../support/component-helper/constants";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { assertCssValueIsApproximately } from "../../support/component-helper/common-steps";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Test for Button component", () => {
  describe("Check props for Button component", () => {
    it.each(testData)(
      "should render Button label using %s special characters",
      (label) => {
        CypressMountWithProviders(<Button>{label}</Button>);

        buttonDataComponent().should("have.text", label);
      }
    );

    it.each(testData)(
      "should render Button subtext with %s special characters",
      (subtext) => {
        CypressMountWithProviders(
          <Button size="large" subtext={subtext}>
            Foo
          </Button>
        );

        buttonSubtextPreview().should("have.text", subtext);
      }
    );

    it.each(testData)(
      "should render tooltip message with %s special characters",
      (tooltipMessage) => {
        CypressMountWithProviders(
          <Button
            iconType="bin"
            iconTooltipMessage={tooltipMessage}
            m="100px"
          />
        );

        buttonDataComponent().children().last().realHover();
        tooltipPreview().should("have.text", tooltipMessage);
        cyRoot().realHover({ position: "topLeft" });
      }
    );

    it.each([
      ["after", "left"],
      ["before", "right"],
    ] as [ButtonProps["iconPosition"], string][])(
      "should set position to %s for icon in a button",
      (iconPosition, margin) => {
        CypressMountWithProviders(
          <Button iconType="add" iconPosition={iconPosition}>
            IconPosition
          </Button>
        );

        icon().should("have.css", `margin-${margin}`, "8px");
      }
    );

    it("should render Button with full width", () => {
      CypressMountWithProviders(<Button fullWidth>Foo</Button>);

      buttonDataComponent().then(($el) => {
        assertCssValueIsApproximately($el, "width", 1365);
      });
    });

    it.each([
      [true, "nowrap"],
      [false, "normal"],
    ])(
      "should render the Button text with noWrap prop %s",
      (booleanState, cssValue) => {
        CypressMountWithProviders(
          <Button noWrap={booleanState}> Long long long long long text </Button>
        );

        getDataElementByValue("main-text").should(
          "have.css",
          "white-space",
          cssValue
        );
      }
    );

    it("should check Button is disabled", () => {
      CypressMountWithProviders(<stories.ButtonDifferentTypes disabled />);

      buttonDataComponent()
        .eq(positionOfElement("first"))
        .should("be.disabled")
        .and("have.attr", "disabled");
      buttonDataComponent()
        .eq(positionOfElement("second"))
        .should("be.disabled")
        .and("have.attr", "disabled");
      buttonDataComponent()
        .eq(positionOfElement("third"))
        .should("be.disabled")
        .and("have.attr", "disabled");
      buttonDataComponent()
        .eq(positionOfElement("fourth"))
        .should("be.disabled")
        .and("have.attr", "disabled");
    });

    it("should check Button is enabled", () => {
      CypressMountWithProviders(<stories.ButtonDifferentTypes />);

      buttonDataComponent().eq(positionOfElement("first")).should("be.enabled");
      buttonDataComponent()
        .eq(positionOfElement("second"))
        .should("be.enabled");
      buttonDataComponent().eq(positionOfElement("third")).should("be.enabled");
      buttonDataComponent()
        .eq(positionOfElement("fourth"))
        .should("be.enabled");
    });
  });

  describe("check events for Button component", () => {
    it("should call onClick callback when a click event is triggered", () => {
      const callback: ButtonProps["onClick"] = cy.stub().as("onClick");
      CypressMountWithProviders(<Button onClick={callback}>Foo</Button>);

      buttonDataComponent().click({ force: true });
      cy.get("@onClick").should("have.been.calledOnce");
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      const callback: ButtonProps["onBlur"] = cy.stub().as("onBlur");
      CypressMountWithProviders(<Button onBlur={callback}>Foo</Button>);

      buttonDataComponent().focus().blur({ force: true });
      cy.get("@onBlur").should("have.been.calledOnce");
    });

    it("should call onKeyDown callback when a keydown event is triggered", () => {
      const callback: ButtonProps["onKeyDown"] = cy.stub().as("onKeyDown");
      CypressMountWithProviders(<Button onKeyDown={callback}>Foo</Button>);

      buttonDataComponent().trigger("keydown", {
        force: true,
        key: keyCode("rightarrow"),
      });
      cy.get("@onKeyDown").should("have.been.calledOnce");
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      const callback: ButtonProps["onFocus"] = cy.stub().as("onFocus");
      CypressMountWithProviders(<Button onFocus={callback}>Foo</Button>);

      buttonDataComponent().focus().blur({ force: true });
      cy.get("@onFocus").should("have.been.calledOnce");
    });
  });

  describe("when focused", () => {
    it("should have the expected styling when the focusRedesignOptOut is false", () => {
      CypressMountWithProviders(<Button>Foo</Button>);
      buttonDataComponent()
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
    });

    it("should have the expected styling when the focusRedesignOptOut is true", () => {
      CypressMountWithProviders(<Button>Foo</Button>, undefined, undefined, {
        focusRedesignOptOut: true,
      });
      buttonDataComponent()
        .focus()
        .should("have.css", "outline", "rgb(255, 188, 25) solid 3px");
    });
  });

  describe("border-radius", () => {
    it("should have the expected styling when roundedCornersOptOut is false", () => {
      CypressMountWithProviders(<Button>Foo</Button>);
      buttonDataComponent().should("have.css", `border-radius`, "32px");
    });

    it("should have the expected styling when roundedCornersOptOut is true", () => {
      CypressMountWithProviders(<Button>Foo</Button>, undefined, undefined, {
        roundedCornersOptOut: true,
      });
      buttonDataComponent().should("have.css", `border-radius`, "0px");
    });
  });

  describe("Accessibility tests for Button", () => {
    it("should pass accessibility tests for ButtonStory", () => {
      CypressMountWithProviders(
        <stories.ButtonStory>{CHARACTERS.STANDARD}</stories.ButtonStory>
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ButtonAsASiblingStory", () => {
      CypressMountWithProviders(
        <stories.ButtonAsASiblingStory>
          {CHARACTERS.STANDARD}
        </stories.ButtonAsASiblingStory>
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ButtonIconBefore", () => {
      CypressMountWithProviders(<stories.ButtonIconBefore />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ButtonIconAfter", () => {
      CypressMountWithProviders(<stories.ButtonIconAfter />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for PrimaryButtonDestructive", () => {
      CypressMountWithProviders(<storiesDefault.PrimaryButtonDestructive />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for PrimaryButtonDisabled", () => {
      CypressMountWithProviders(<storiesDefault.PrimaryButtonDisabled />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for PrimaryButtonFullWitdth", () => {
      CypressMountWithProviders(<storiesDefault.PrimaryButtonFullWitdth />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for PrimaryButtonNoWrap", () => {
      CypressMountWithProviders(<storiesDefault.PrimaryButtonNoWrap />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for SecondaryButtonIconAfter", () => {
      CypressMountWithProviders(<stories.SecondaryButtonIconAfter />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for SecondaryButtonIconBefore", () => {
      CypressMountWithProviders(<stories.SecondaryButtonIconBefore />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for SecondaryButtonDestructive", () => {
      CypressMountWithProviders(<storiesDefault.SecondaryButtonDestructive />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for SecondaryButtonDisabled", () => {
      CypressMountWithProviders(<storiesDefault.SecondaryButtonDisabled />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for SecondaryFullWidth", () => {
      CypressMountWithProviders(<storiesDefault.SecondaryFullWidth />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for SecondaryNoWrap", () => {
      CypressMountWithProviders(<storiesDefault.SecondaryNoWrap />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for DashedButtonIconAfter", () => {
      CypressMountWithProviders(<stories.DashedButtonIconAfter />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for DashedButtonIconBefore", () => {
      CypressMountWithProviders(<stories.DashedButtonIconBefore />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for DashedButtonDisabled", () => {
      CypressMountWithProviders(<storiesDefault.DashedButtonDisabled />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for DashedButtonFullWidth", () => {
      CypressMountWithProviders(<storiesDefault.DashedButtonFullWidth />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for DashedButtonNoWrap", () => {
      CypressMountWithProviders(<storiesDefault.DashedButtonNoWrap />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for DarkBackgroundButtonIconBefore", () => {
      CypressMountWithProviders(<stories.DarkBackgroundButtonIconBefore />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for DarkBackgroundButtonIconAfter", () => {
      CypressMountWithProviders(<stories.DarkBackgroundButtonIconAfter />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for DarkBackgroundButtonDisabled", () => {
      CypressMountWithProviders(
        <storiesDefault.DarkBackgroundButtonDisabled />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for DarkBackgroundButtonFullWidth", () => {
      CypressMountWithProviders(
        <storiesDefault.DarkBackgroundButtonFullWidth />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for DarkBackgroundButtonNoWrap", () => {
      CypressMountWithProviders(<storiesDefault.DarkBackgroundButtonNoWrap />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for TertiaryButtonIconBefore", () => {
      CypressMountWithProviders(<stories.TertiaryButtonIconBefore />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for TertiaryButtonIconAfter", () => {
      CypressMountWithProviders(<stories.TertiaryButtonIconAfter />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for TertiaryButtonDestructive", () => {
      CypressMountWithProviders(<storiesDefault.TertiaryButtonDestructive />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for TertiaryButtonDisabled", () => {
      CypressMountWithProviders(<storiesDefault.TertiaryButtonDisabled />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for TertiaryButtonFullWidth", () => {
      CypressMountWithProviders(<storiesDefault.TertiaryButtonFullWitdth />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for TertiaryButtonNoWrap", () => {
      CypressMountWithProviders(<storiesDefault.TertiaryButtonNoWrap />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for fullWidth story", () => {
      CypressMountWithProviders(<Button fullWidth>Foo</Button>);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for iconOnly story", () => {
      CypressMountWithProviders(
        <Button buttonType="primary" iconType="bin" aria-label="bin-icon" />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for noWrap story", () => {
      CypressMountWithProviders(<Button noWrap>Foo</Button>);

      cy.checkAccessibility();
    });
  });
});
