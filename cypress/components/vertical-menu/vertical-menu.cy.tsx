import React from "react";
import { VerticalMenuFullScreenProps } from "../../../src/components/vertical-menu";
import {
  Default,
  VerticalMenuItemCustom,
  VerticalMenuTriggerCustom,
  VerticalMenuItemCustomHref,
  VerticalMenuFullScreenCustom,
  VerticalMenuFullScreenBackgroundScrollTest,
  ClosedVerticalMenuFullScreenWithButtons,
} from "../../../src/components/vertical-menu/vertical-menu-test.stories";
import VerticalMenuTrigger, {
  VerticalMenuTriggerProps,
} from "../../../src/components/vertical-menu/vertical-menu-trigger.component";
import * as stories from "../../../src/components/vertical-menu/vertical-menu.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  checkGoldenOutline,
  assertCssValueIsApproximately,
} from "../../support/component-helper/common-steps";
import {
  verticalMenuComponent,
  verticalMenuItem,
  verticalMenuTrigger,
  verticalMenuFullScreen,
} from "../../locators/vertical-menu";
import { closeIconButton } from "../../locators/index";
import { CHARACTERS } from "../../support/component-helper/constants";
import { continuePressingTABKey, keyCode } from "../../support/helper";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testData = CHARACTERS.STANDARD;
const keysToTrigger = ["Space", "Enter"] as const;

const checkTheBackgroundValue = ($els: JQuery<Element>) => {
  // get Window reference from element
  const win = $els[0].ownerDocument.defaultView;
  // use getComputedStyle to read the pseudo selector
  const before = win?.getComputedStyle($els[0], "before");
  // read the value of the `background-color` CSS property
  const backgroundValue = before?.getPropertyValue("background-color");
  // the returned value will have double quotes around it, but this is correct
  cy.wrap(backgroundValue).should("equal", "rgba(255, 255, 255, 0.3)");
};

const checkTheBorderValue = ($els: JQuery<Element>) => {
  // get Window reference from element
  const win = $els[0].ownerDocument.defaultView;
  // use getComputedStyle to read the pseudo selector
  const before = win?.getComputedStyle($els[0], "before");
  // read the value of the `border-radius` CSS property
  const radiusValue = before?.getPropertyValue("border-radius");
  // the returned value will have double quotes around it, but this is correct
  cy.wrap(radiusValue).should("equal", "8px");
};

context("Testing Vertical Menu component", () => {
  describe("should render Vertical Menu component", () => {
    describe.each(["aria-label", "aria-labelledby"])(
      "when %s prop is passed",
      (propName) => {
        it(`verify that the ${propName} is set to cypress-standard`, () => {
          const props = { [propName]: CHARACTERS.STANDARD };
          CypressMountWithProviders(<Default {...props} />);

          verticalMenuComponent().should(
            "have.attr",
            propName,
            CHARACTERS.STANDARD
          );
        });
      }
    );

    it.each([200, 350, 632])(
      "should render Vertical Menu component with %s as a width",
      (width) => {
        CypressMountWithProviders(<Default width={`${width}px`} />);

        verticalMenuComponent().then(($el) => {
          assertCssValueIsApproximately($el, "width", width);
        });
      }
    );

    it.each([
      ["30%", 230],
      ["45%", 345],
      ["95%", 729],
    ])(
      "should render Vertical Menu component with %s as a height",
      (height, heightInPx) => {
        CypressMountWithProviders(<Default height={height} />);

        verticalMenuComponent()
          .should("have.attr", "height", height)
          .then(($el) => {
            assertCssValueIsApproximately($el, "height", heightInPx);
          });
      }
    );

    it.each(specialCharacters)(
      "should render Vertical Menu Item with %s as title",
      (title) => {
        CypressMountWithProviders(<VerticalMenuItemCustom title={title} />);

        verticalMenuItem().should("contain.text", title);
      }
    );

    it("should render Vertical Menu Item with adornment prop", () => {
      CypressMountWithProviders(<VerticalMenuItemCustom />);

      verticalMenuItem()
        .eq(0)
        .find("div > span")
        .should("have.attr", "data-component", "pill")
        .and("be.visible");

      verticalMenuItem().eq(0).click();

      verticalMenuItem()
        .eq(1)
        .find("div > span")
        .should("have.attr", "data-component", "pill")
        .and("be.visible");

      verticalMenuItem().eq(0).find("div").find("span").should("not.exist");

      verticalMenuItem().eq(0).click();

      verticalMenuItem()
        .eq(0)
        .find("div > span")
        .should("have.attr", "data-component", "pill")
        .and("be.visible");

      verticalMenuItem().eq(1).should("not.exist");
    });

    it("should render Vertical Menu Item with iconType prop", () => {
      CypressMountWithProviders(<VerticalMenuItemCustom iconType="filter" />);

      verticalMenuItem()
        .eq(0)
        .find("span")
        .eq(0)
        .should("have.attr", "data-element", "filter")
        .and("be.visible");
    });

    it("should render Vertical Menu Item with active prop", () => {
      CypressMountWithProviders(
        <VerticalMenuItemCustom active={(isOpen) => !isOpen} />
      );

      verticalMenuItem().then(($els) => {
        checkTheBackgroundValue($els);
      });
    });

    it.each(["27px", "59px", "77px"])(
      "should render Vertical Menu Item with %s height prop",
      (height) => {
        CypressMountWithProviders(<VerticalMenuItemCustom height={height} />);

        verticalMenuItem().should("have.css", "min-height", height);
      }
    );

    it("should render an active Vertical Menu Item with expected border radius styling", () => {
      CypressMountWithProviders(<VerticalMenuItemCustom active />);

      verticalMenuItem().then(($els) => {
        checkTheBorderValue($els);
      });
    });

    it("should render Vertical Menu Item without href prop", () => {
      CypressMountWithProviders(<VerticalMenuItemCustomHref />);

      verticalMenuItem().click();
      verticalMenuItem().eq(1).parent().find("div").should("be.visible");
    });

    it("should render Vertical Menu Item with href prop", () => {
      CypressMountWithProviders(<VerticalMenuItemCustomHref href={testData} />);

      verticalMenuItem().click();
      verticalMenuItem().eq(1).parent().find("a").should("be.visible");
    });

    it("should render Vertical Menu Item with href prop in Vertical Menu", () => {
      CypressMountWithProviders(<stories.CustomComponent />);

      verticalMenuComponent()
        .find("li")
        .find("a")
        .should("have.attr", "href", "/item-1")
        .and("be.visible");
    });

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should render Vertical Menu Item opened with defaultOpen set to %s",
      (boolean, assertion) => {
        CypressMountWithProviders(
          <VerticalMenuItemCustom defaultOpen={boolean} />
        );

        cy.contains("ChildItem 1").should(assertion);
        cy.contains("ChildItem 2").should(assertion);
      }
    );

    describe("with beforeEach for VerticalMenuFullScreen", () => {
      beforeEach(() => {
        cy.viewport(320, 599);
      });

      describe.each(["aria-label", "aria-labelledby"])(
        "when %s prop is passed",
        (propName) => {
          it(`verify that the ${propName} is set to cypress_standard`, () => {
            cy.viewport(320, 599);
            const props = { [propName]: CHARACTERS.STANDARD };
            CypressMountWithProviders(
              <VerticalMenuFullScreenCustom {...props} />
            );

            verticalMenuTrigger().click();

            verticalMenuFullScreen().should(
              "have.attr",
              propName,
              CHARACTERS.STANDARD
            );
          });

          it("should close the Vertical Menu Full Screen when escape key is pressed", () => {
            const callback: VerticalMenuFullScreenProps["onClose"] = cy
              .stub()
              .as("onClose");

            CypressMountWithProviders(
              <VerticalMenuFullScreenCustom onClose={callback} />
            );

            verticalMenuTrigger().click();

            verticalMenuFullScreen().trigger("keydown", keyCode("Esc"));

            cy.get("@onClose").should("be.calledOnce");
          });

          // TODO remove skip as part of FE-5650
          // eslint-disable-next-line jest/no-disabled-tests
          it.skip("should render Vertical Menu Full Screen without isOpen prop", () => {
            CypressMountWithProviders(<VerticalMenuFullScreenCustom />);

            verticalMenuItem().should("not.be.visible");
          });

          it("should render Vertical Menu Full Screen with isOpen prop", () => {
            CypressMountWithProviders(<VerticalMenuFullScreenCustom isOpen />);

            verticalMenuItem().should("be.visible");
          });

          it("should verify that Vertical Menu Fullscreen has no effect on the tab order when isOpen prop is false", () => {
            // this test currently passes even without the necessary fix to FocusTrap for MenuFullScreen, as
            // VerticalMenuFullScreen currently does not render its children at all when isOpen is false. This will
            // change once FE-5650 is done and this test will be required when that is done to ensure the children of
            // a closed VerticalMenuFullScreen do not interfere with tabbing.
            CypressMountWithProviders(
              <ClosedVerticalMenuFullScreenWithButtons />
            );

            cy.tab();
            cy.get("#button-1").should("be.focused");
            cy.tab();
            cy.get("#button-2").should("be.focused");
          });
        }
      );

      it("should return focus to Vertical Menu Full Screen close button with tabbing", () => {
        CypressMountWithProviders(<VerticalMenuFullScreenCustom isOpen />);

        verticalMenuItem().should("be.visible");
        verticalMenuFullScreen().find("div").eq(0).click();
        verticalMenuFullScreen().tab();
        closeIconButton().should("be.focused");
      });
    });

    it.each(["25px", "55px", "77px"])(
      "should render Vertical Menu Trigger with height prop is set to %spx",
      (height) => {
        CypressMountWithProviders(
          <VerticalMenuTriggerCustom height={height} />
        );

        verticalMenuTrigger()
          .should("have.attr", "height", height)
          .then(($el) => {
            assertCssValueIsApproximately($el, "min-height", parseInt(height));
          });
      }
    );

    it("should render Vertical Menu Trigger with children prop is set to cypress_test", () => {
      CypressMountWithProviders(
        <VerticalMenuTrigger onClick={() => {}}>{testData}</VerticalMenuTrigger>
      );

      verticalMenuTrigger().should("have.text", testData);
    });

    it("should navigate to the 3rd item using Tab key", () => {
      CypressMountWithProviders(<Default />);

      verticalMenuItem().tab().tab();
      cy.contains("Item 3").should("be.focused");
    });

    it("should navigate to the 5th item using Tab key", () => {
      CypressMountWithProviders(<Default />);

      verticalMenuItem().tab().tab().tab().tab();
      cy.contains("Item 5").should("be.focused");
    });

    it("should navigate to the 4th item using Shift Tab key", () => {
      CypressMountWithProviders(<Default />);

      verticalMenuItem().eq(5).tab({ shift: true }).tab({ shift: true });
      cy.contains("Item 4").should("be.focused");
    });

    it("should expand to item 3 using click", () => {
      CypressMountWithProviders(<Default />);

      verticalMenuItem().eq(2).click();
      cy.contains("Active item").should("be.visible");
    });

    it("should collapse to item 3 using click", () => {
      CypressMountWithProviders(<Default />);

      verticalMenuItem().eq(2).click().click();
      cy.contains("Active item").should("not.exist");
    });

    it.each([
      ["expand", keysToTrigger[0], 1, "be.visible"],
      ["expand", keysToTrigger[1], 1, "be.visible"],
      ["collapse", keysToTrigger[0], 2, "not.exist"],
      ["collapse", keysToTrigger[1], 2, "not.exist"],
    ] as [string, "Space" | "Enter", number, string][])(
      "should %s Item 2 using keyboard %s",
      (action, key, index, assertion) => {
        CypressMountWithProviders(<Default />);

        for (let i = 0; i < index; i++) {
          verticalMenuItem().eq(2).focus().realPress(key);
        }

        cy.contains("Active item").should(assertion);
      }
    );

    it("should navigate to the children element using Tab key", () => {
      CypressMountWithProviders(<Default />);

      verticalMenuItem().tab().tab().click().tab().tab();
      cy.contains("Active item").should("be.focused");
    });

    it("should check the focus styling, focusRedesignOptOut true", () => {
      CypressMountWithProviders(<Default />, undefined, undefined, {
        focusRedesignOptOut: true,
      });

      verticalMenuItem().tab();
      verticalMenuItem()
        .eq(1)
        .then(($el) => {
          checkGoldenOutline($el);
        });
    });

    it("should check the focus styling, focusRedesignOptOut false", () => {
      CypressMountWithProviders(<Default />);

      verticalMenuItem().tab();
      verticalMenuItem()
        .eq(1)
        .should(
          "have.css",
          "box-shadow",
          "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
    });

    describe("VerticalMenuFullScreen test background scroll when tabbing", () => {
      it("tabbing forward through the menu and back to the start should not make the background scroll to the bottom", () => {
        CypressMountWithProviders(
          <VerticalMenuFullScreenBackgroundScrollTest />
        );

        continuePressingTABKey(4);

        closeIconButton().should("be.focused");

        cy.checkNotInViewport("#bottom-box");
      });

      it("tabbing backward through the menu and back to the start should not make the background scroll to the bottom", () => {
        CypressMountWithProviders(
          <VerticalMenuFullScreenBackgroundScrollTest />
        );

        continuePressingTABKey(3, true);

        closeIconButton().should("be.focused");

        cy.checkNotInViewport("#bottom-box");
      });
    });
  });

  describe("check events for Vertical Menu component", () => {
    it("should call onClick callback when a click event is triggered", () => {
      const callback: VerticalMenuTriggerProps["onClick"] = cy
        .stub()
        .as("onClick");

      CypressMountWithProviders(
        <VerticalMenuTriggerCustom onClick={callback} />
      );

      verticalMenuTrigger().click();
      cy.get("@onClick").should("be.calledOnce");
    });

    it("should call onClose callback when a click event is triggered for VerticalMenuFullScreen", () => {
      const callback: VerticalMenuFullScreenProps["onClose"] = cy
        .stub()
        .as("onClose");

      cy.viewport(320, 599);
      CypressMountWithProviders(
        <VerticalMenuFullScreenCustom onClose={callback} />
      );

      verticalMenuTrigger().click();

      closeIconButton().click();

      cy.get("@onClose").should("be.calledOnce");
    });

    it.each([...keysToTrigger])(
      "should call onClose callback when a %s key event is triggered for VerticalMenuFullScreen",
      (key) => {
        const callback: VerticalMenuFullScreenProps["onClose"] = cy
          .stub()
          .as("onClose");

        cy.viewport(320, 599);
        CypressMountWithProviders(
          <VerticalMenuFullScreenCustom onClose={callback} />
        );

        verticalMenuTrigger().click();

        closeIconButton().focus().realPress(key);

        cy.get("@onClose").should("be.calledOnce");
      }
    );
  });

  describe("should check the accessibility tests", () => {
    it("should check accessiblity for verticalMenuComponent", () => {
      CypressMountWithProviders(<Default />);

      cy.checkAccessibility();
    });

    it("should check accessiblity for verticalMenuComponent open", () => {
      CypressMountWithProviders(<Default />);

      verticalMenuItem().tab().tab().click();
      cy.checkAccessibility();
    });

    it("should check accessiblity for verticalMenuComponent Active", () => {
      CypressMountWithProviders(
        <VerticalMenuItemCustom active={(isOpen) => !isOpen} />
      );

      cy.checkAccessibility();
    });

    it("should check accessiblity for verticalMenuComponent Adornment", () => {
      CypressMountWithProviders(<stories.Adornment />);

      cy.checkAccessibility();
    });

    it("should check accessiblity for verticalMenuComponent CustomItemHeight", () => {
      CypressMountWithProviders(<stories.CustomItemHeight />);

      cy.checkAccessibility();
    });

    it("should check accessiblity for verticalMenuComponent CustomItemPadding", () => {
      CypressMountWithProviders(<stories.CustomItemPadding />);

      cy.checkAccessibility();
    });

    it("should check accessiblity for verticalMenuComponent FullScreen", () => {
      cy.viewport(320, 599);
      CypressMountWithProviders(<VerticalMenuFullScreenCustom />);

      cy.checkAccessibility();
    });

    it("should check accessiblity for verticalMenuComponent FullScreen open", () => {
      cy.viewport(320, 599);
      CypressMountWithProviders(<VerticalMenuFullScreenCustom isOpen />);

      cy.checkAccessibility();
    });
  });

  describe("href redirect", () => {
    // this test must be last in the test suite as the navigation to a new page messes up any later tests
    it("should navigate to the children href", () => {
      CypressMountWithProviders(<Default />);

      verticalMenuItem().eq(1).click();

      cy.location("pathname").should("eq", "/item1");
    });
  });
});
