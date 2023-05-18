import React from "react";

import {
  Default as ButtonMinor,
  ButtonMinorCustom,
  ButtonMinorDifferentTypes,
} from "../../../src/components/button-minor/button-minor-test.Stories";
import * as Stories from "../../../src/components/button-minor/button-minor.Stories";
import {
  buttonSubtextPreview,
  buttonMinorComponent,
} from "../../locators/button";

import {
  BUTTON_SIZES,
  BUTTON_ICON_POSITIONS,
} from "../../../src/components/button/button.config";

import { cyRoot, icon, tooltipPreview } from "../../locators";
import { CHARACTERS } from "../../support/component-helper/constants";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { useJQueryCssValueAndAssert } from "../../support/component-helper/common-steps";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const buttonTypesAndBackgrounds = [
  ["1st", "primary", 0],
  ["2nd", "secondary", 1],
  ["3rd", "tertiary", 2],
];

const destructive = "rgb(162, 44, 59)";
const transparent = "rgba(0, 0, 0, 0)";

context("Test for Button Minor component", () => {
  describe("Check props for Button Minor component", () => {
    it("should render Button Minor with aria-label prop", () => {
      CypressMountWithProviders(
        <ButtonMinorCustom aria-label="cypress-aria" />
      );

      buttonMinorComponent().should("have.attr", "aria-label", "cypress-aria");
    });

    it.each(testData)(
      "should render Button Minor label using %s special characters",
      (label) => {
        CypressMountWithProviders(<ButtonMinor>{label}</ButtonMinor>);

        buttonMinorComponent().should("have.text", label);
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

        buttonMinorComponent().should("have.attr", "name", name);
      }
    );

    it.each(testData)(
      "should render Button Minor id using %s special characters",
      (id) => {
        CypressMountWithProviders(<ButtonMinorCustom id={id} />);

        buttonMinorComponent().should("have.attr", "id", id);
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

        buttonMinorComponent().children().last().realHover();
        tooltipPreview().should("have.text", tooltipMessage);
        cyRoot().realHover({ position: "topLeft" });
      }
    );

    it("when icon only, icon's position is absolute", () => {
      CypressMountWithProviders(<ButtonMinor iconType="bin" />);
      icon().should("have.css", "position", "absolute");
    });

    it.each([
      [BUTTON_SIZES[0], 32],
      [BUTTON_SIZES[1], 40],
      [BUTTON_SIZES[2], 48],
    ])("should render Button Minor in %s size", (size, minHeight) => {
      CypressMountWithProviders(<ButtonMinor size={size}>{size}</ButtonMinor>);

      buttonMinorComponent().should("have.css", "min-height", `${minHeight}px`);
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

      buttonMinorComponent().then(($el) => {
        useJQueryCssValueAndAssert($el, "width", 1365);
      });
    });

    it("should render Button Minor with href", () => {
      CypressMountWithProviders(
        <ButtonMinorCustom href="https://carbon.sage.com/" />
      );

      buttonMinorComponent().should(
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

        buttonMinorComponent().should("have.css", cssValue, assertion);
      }
    );

    it.each(buttonTypesAndBackgrounds)(
      "should check Button Minor is disabled for the %s button",
      (position, type, index) => {
        CypressMountWithProviders(<ButtonMinorDifferentTypes disabled />);

        buttonMinorComponent(index)
          .should("be.disabled")
          .and("have.attr", "disabled");
      }
    );

    it.each(buttonTypesAndBackgrounds)(
      "should check Button Minor is enabled for the %s button",
      (position, type, index) => {
        CypressMountWithProviders(<ButtonMinorDifferentTypes />);

        buttonMinorComponent(index).should("be.enabled");
      }
    );

    it.each(buttonTypesAndBackgrounds)(
      "should check Button Minor is destructive for the %s button when buttonType is %s",
      (_, type, index) => {
        CypressMountWithProviders(
          <ButtonMinorDifferentTypes buttonType={type} destructive />
        );

        buttonMinorComponent(index).realHover();

        buttonMinorComponent(index)
          .should(
            "have.css",
            "background",
            `${destructive} none repeat scroll 0% 0% / auto padding-box border-box`
          )
          .and("have.css", "border-color", transparent)
          .and("have.css", "color", "rgb(255, 255, 255)");
      }
    );

    it.each(["_blank", "_self", "_parent", "_top"])(
      "should render Button Minor with target prop set to %s",
      (target) => {
        CypressMountWithProviders(<ButtonMinorCustom target={target} />);

        buttonMinorComponent().should("have.attr", "target", target);
      }
    );

    it.each(["add", "share", "tick"])(
      "should render Button Minor with type prop set to %s",
      (type) => {
        CypressMountWithProviders(<ButtonMinorCustom type={type} />);

        buttonMinorComponent().should("have.attr", "type", type);
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

      buttonMinorComponent()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<ButtonMinorCustom onBlur={callback} />);

      buttonMinorComponent()
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

        buttonMinorComponent()
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

      buttonMinorComponent()
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("accessibility tests", () => {
    it("should check accessibility for primary Button Minor", () => {
      CypressMountWithProviders(<Stories.PrimaryButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for primary destructive Button Minor", () => {
      CypressMountWithProviders(<Stories.PrimaryDestructiveButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for primary disabled Button Minor", () => {
      CypressMountWithProviders(<Stories.PrimaryDisabledButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for primary icon before and after Button Minor", () => {
      CypressMountWithProviders(<Stories.PrimaryIconButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for primary full width Button Minor", () => {
      CypressMountWithProviders(<Stories.PrimaryFullWidthButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for primary no wrap Button Minor", () => {
      CypressMountWithProviders(<Stories.PrimaryNoWrapButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for secondary Button Minor", () => {
      CypressMountWithProviders(<Stories.SecondaryButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for secondary destrictive Button Minor", () => {
      CypressMountWithProviders(<Stories.SecondaryDestructiveButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for secondary disabled Button Minor", () => {
      CypressMountWithProviders(<Stories.SecondaryDisabledButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for secondary icon before and after Button Minor", () => {
      CypressMountWithProviders(<Stories.SecondaryIconButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for secondary full width Button Minor", () => {
      CypressMountWithProviders(<Stories.SecondaryFullWidthButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for secondary no wrap Button Minor", () => {
      CypressMountWithProviders(<Stories.SecondaryNoWrapButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for tertiary Button Minor", () => {
      CypressMountWithProviders(<Stories.TertiaryButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for tertiary destructive Button Minor", () => {
      CypressMountWithProviders(<Stories.TertiaryDestructiveButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for tertiary disabled Button Minor", () => {
      CypressMountWithProviders(<Stories.TertiaryDisabledButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for tertiary icon before and after Button Minor", () => {
      CypressMountWithProviders(<Stories.TertiaryIconButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for tertiary full width Button Minor", () => {
      CypressMountWithProviders(<Stories.TertiaryFullWidthButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for tertiary no wrap Button Minor", () => {
      CypressMountWithProviders(<Stories.TertiaryNoWrapButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for icon only Button Minor", () => {
      CypressMountWithProviders(<Stories.IconOnlyButton />);

      cy.checkAccessibility();
    });

    it("should check accessibility for icon only with tooltip Button Minor", () => {
      CypressMountWithProviders(<Stories.IconOnlyWithTooltipButton />);

      cy.checkAccessibility();
    });
  });

  it("should have the expected border radius and focus styling", () => {
    CypressMountWithProviders(<ButtonMinor>Foo</ButtonMinor>);
    buttonMinorComponent().should("have.css", `border-radius`, "4px");
    buttonMinorComponent()
      .focus()
      .should("have.css", "outline", "rgb(255, 181, 0) solid 3px");
  });
});
