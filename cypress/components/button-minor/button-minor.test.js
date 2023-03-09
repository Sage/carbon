import React from "react";

import {
  Default as ButtonMinor,
  ButtonMinorCustom,
  ButtonMinorDifferentTypes,
} from "../../../src/components/button-minor/button-minor-test.stories";

import * as stories from "../../../src/components/button-minor/button-minor.stories.tsx";

import {
  BUTTON_SIZES,
  BUTTON_ICON_POSITIONS,
} from "../../../src/components/button/button.config";

import {
  buttonSubtextPreview,
  buttonDataComponent,
} from "../../locators/button";

import { cyRoot, icon, tooltipPreview } from "../../locators";
import { positionOfElement } from "../../../cypress/support/helper";
import { CHARACTERS } from "../../support/component-helper/constants";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { useJQueryCssValueAndAssert } from "../../support/component-helper/common-steps";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const destructive = "rgb(203, 55, 74)";
const transparent = "rgba(0, 0, 0, 0)";

context("Test for Button Minor component", () => {
  describe("Check props for Button Minor component", () => {
    it("should render Button Minor with aria-label prop", () => {
      CypressMountWithProviders(
        <ButtonMinorCustom aria-label="cypress-aria" />
      );

      buttonDataComponent().should("have.attr", "aria-label", "cypress-aria");
    });

    it.each(testData)(
      "should render Button Minor label using %s special characters",
      (label) => {
        CypressMountWithProviders(<ButtonMinor>{label}</ButtonMinor>);

        buttonDataComponent().should("have.text", label);
      }
    );

    it.each(testData)(
      "should render Button Minor subtext with %s special characters",
      (subtext) => {
        CypressMountWithProviders(
          <ButtonMinorCustom size="large" subtext={subtext} />
        );

        buttonSubtextPreview().should("have.text", subtext);
      }
    );

    it.each(testData)(
      "should render Button Minor name using %s special characters",
      (name) => {
        CypressMountWithProviders(<ButtonMinorCustom name={name} />);

        buttonDataComponent().should("have.attr", "name", name);
      }
    );

    it.each(testData)(
      "should render Button Minor id using %s special characters",
      (id) => {
        CypressMountWithProviders(<ButtonMinorCustom id={id} />);

        buttonDataComponent().should("have.attr", "id", id);
      }
    );

    it.each(testData)(
      "should render tooltip message with %s special characters",
      (tooltipMessage) => {
        CypressMountWithProviders(
          <ButtonMinor
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
      [BUTTON_SIZES[0], 32],
      [BUTTON_SIZES[1], 40],
      [BUTTON_SIZES[2], 48],
    ])("should render Button Minor in %s size", (size, minHeight) => {
      CypressMountWithProviders(<ButtonMinor size={size}>{size}</ButtonMinor>);

      buttonDataComponent().should("have.css", "min-height", `${minHeight}px`);
    });

    it.each([
      [BUTTON_ICON_POSITIONS[0], "right"],
      [BUTTON_ICON_POSITIONS[1], "left"],
    ])(
      "should set position to %s for icon in a button",
      (iconPosition, margin) => {
        CypressMountWithProviders(
          <ButtonMinorCustom iconType="add" iconPosition={iconPosition} />
        );

        icon().should("have.css", `margin-${margin}`, "8px");
      }
    );

    it("should render Button Minor with full width", () => {
      CypressMountWithProviders(<ButtonMinorCustom fullWidth />);

      buttonDataComponent().then(($el) => {
        useJQueryCssValueAndAssert($el, "width", 1365);
      });
    });

    it("should render Button Minor with href", () => {
      CypressMountWithProviders(
        <ButtonMinorCustom href="https://carbon.sage.com/" />
      );

      buttonDataComponent().should(
        "have.attr",
        "href",
        "https://carbon.sage.com/"
      );
    });

    it.each([
      [true, "white-space"],
      [false, "flex-wrap"],
    ])(
      "should render the Button Minor text with noWrap prop set to %s",
      (booleanState, cssValue) => {
        const assertion = booleanState ? "nowrap" : "wrap";

        CypressMountWithProviders(
          <ButtonMinor noWrap={booleanState}>
            {" "}
            Long long long long long text{" "}
          </ButtonMinor>
        );

        buttonDataComponent().should("have.css", cssValue, assertion);
      }
    );

    it("should check Button Minor is disabled", () => {
      CypressMountWithProviders(<ButtonMinorDifferentTypes disabled />);

      for (let i = 0; i < 3; i++) {
        buttonDataComponent()
          .eq(i)
          .should("be.disabled")
          .and("have.attr", "disabled");
      }
    });

    it("should check Button Minor is enabled", () => {
      CypressMountWithProviders(<ButtonMinorDifferentTypes />);

      for (let i = 0; i < 3; i++) {
        buttonDataComponent().eq(i).should("be.enabled");
      }
    });

    it("should check Button Minor is destructive", () => {
      CypressMountWithProviders(<ButtonMinorDifferentTypes destructive />);

      cyRoot().realHover({ position: "topRight" });

      buttonDataComponent()
        .eq(positionOfElement("first"))
        .should(
          "have.css",
          "background",
          `${destructive} none repeat scroll 0% 0% / auto padding-box border-box`
        )
        .and("have.css", "border-color", transparent)
        .and("have.css", "color", "rgb(255, 255, 255)");
      buttonDataComponent()
        .eq(positionOfElement("second"))
        .should(
          "have.css",
          "background",
          `${transparent} none repeat scroll 0% 0% / auto padding-box border-box`
        )
        .and("have.css", "border-color", destructive)
        .and("have.css", "color", destructive);
      buttonDataComponent()
        .eq(positionOfElement("third"))
        .should(
          "have.css",
          "background",
          "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"
        )
        .and("have.css", "border-color", transparent)
        .and("have.css", "color", destructive);
    });

    it.each(["noopener", "noreferrer", "opener"])(
      "should render Button Minor with rel prop set to %s",
      (rel) => {
        CypressMountWithProviders(<ButtonMinorCustom rel={rel} />);

        buttonDataComponent().should("have.attr", "rel", rel);
      }
    );

    it.each(["_blank", "_self", "_parent", "_top"])(
      "should render Button Minor with target prop set to %s",
      (target) => {
        CypressMountWithProviders(<ButtonMinorCustom target={target} />);

        buttonDataComponent().should("have.attr", "target", target);
      }
    );

    it.each(["add", "share", "tick"])(
      "should render Button Minor with type prop set to %s",
      (type) => {
        CypressMountWithProviders(<ButtonMinorCustom type={type} />);

        buttonDataComponent().should("have.attr", "type", type);
      }
    );
  });

  describe("check events for Button Minor component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onClick callback when a click event is triggered", () => {
      CypressMountWithProviders(<ButtonMinorCustom onClick={callback} />);

      buttonDataComponent()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<ButtonMinorCustom onBlur={callback} />);

      buttonDataComponent()
        .focus()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter"])(
      "should call onKeyDown callback when a keydown event is triggered",
      (key) => {
        CypressMountWithProviders(<ButtonMinorCustom onKeyDown={callback} />);

        buttonDataComponent()
          .focus()
          .realPress(key)
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it("should call onFocus callback when a focus event is triggered", () => {
      CypressMountWithProviders(<ButtonMinorCustom onFocus={callback} />);

      buttonDataComponent()
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("accessibility tests", () => {
    it("should check accessibility for primary Button Minor", () => {
      CypressMountWithProviders(<stories.PrimaryButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for primary destructive Button Minor", () => {
      CypressMountWithProviders(<stories.PrimaryDestructiveButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for primary disabled Button Minor", () => {
      CypressMountWithProviders(<stories.PrimaryDisabledButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for primary icon before and after Button Minor", () => {
      CypressMountWithProviders(<stories.PrimaryIconButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for primary full width Button Minor", () => {
      CypressMountWithProviders(<stories.PrimaryFullWidthButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for primary no wrap Button Minor", () => {
      CypressMountWithProviders(<stories.PrimaryNoWrapButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for secondary Button Minor", () => {
      CypressMountWithProviders(<stories.SecondaryButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for secondary destrictive Button Minor", () => {
      CypressMountWithProviders(<stories.SecondaryDestructiveButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for secondary disabled Button Minor", () => {
      CypressMountWithProviders(<stories.SecondaryDisabledButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for secondary icon before and after Button Minor", () => {
      CypressMountWithProviders(<stories.SecondaryIconButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for secondary full width Button Minor", () => {
      CypressMountWithProviders(<stories.SecondaryFullWidthButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for secondary no wrap Button Minor", () => {
      CypressMountWithProviders(<stories.SecondaryNoWrapButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for tertiary Button Minor", () => {
      CypressMountWithProviders(<stories.TertiaryButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for tertiary destructive Button Minor", () => {
      CypressMountWithProviders(<stories.TertiaryDestructiveButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for tertiary disabled Button Minor", () => {
      CypressMountWithProviders(<stories.TertiaryDisabledButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for tertiary icon before and after Button Minor", () => {
      CypressMountWithProviders(<stories.TertiaryIconButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for tertiary full width Button Minor", () => {
      CypressMountWithProviders(<stories.TertiaryFullWidthButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for tertiary no wrap Button Minor", () => {
      CypressMountWithProviders(<stories.TertiaryNoWrapButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for icon only Button Minor", () => {
      CypressMountWithProviders(<stories.IconOnlyButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for icon only with tooltip Button Minor", () => {
      CypressMountWithProviders(<stories.IconOnlyWithTooltipButton />);

      cy.checkAccessibility();
    });
  });
});
