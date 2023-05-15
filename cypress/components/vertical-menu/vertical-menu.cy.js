import React from "react";
import {
  Default,
  VerticalMenuItemCustom,
  VerticalMenuTriggerCustom,
  VerticalMenuItemCustomHref,
  VerticalMenuFullScreenCustom,
} from "../../../src/components/vertical-menu/vertical-menu-test.stories";
import VerticalMenuTrigger from "../../../src/components/vertical-menu/vertical-menu-trigger.component";
import * as stories from "../../../src/components/vertical-menu/vertical-menu.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  checkGoldenOutline,
  useJQueryCssValueAndAssert,
} from "../../support/component-helper/common-steps";
import {
  verticalMenuComponent,
  verticalMenuItem,
  verticalMenuTrigger,
  verticalMenuFullScreen,
} from "../../locators/vertical-menu";
import { closeIconButton } from "../../locators/index";
import { CHARACTERS } from "../../support/component-helper/constants";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testData = CHARACTERS.STANDARD;

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
          useJQueryCssValueAndAssert($el, "width", width);
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

        verticalMenuComponent().then(($el) => {
          expect($el).to.have.attr("height").to.equals(height);
          useJQueryCssValueAndAssert($el, "height", heightInPx);
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
        // get Window reference from element
        const win = $els[0].ownerDocument.defaultView;
        // use getComputedStyle to read the pseudo selector
        const before = win.getComputedStyle($els[0], "before");
        // read the value of the `background-color` CSS property
        const backgroundValue = before.getPropertyValue("background-color");
        // the returned value will have double quotes around it, but this is correct
        expect(backgroundValue).to.eq("rgba(255, 255, 255, 0.3)");
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
        // get Window reference from element
        const win = $els[0].ownerDocument.defaultView;
        // use getComputedStyle to read the pseudo selector
        const before = win.getComputedStyle($els[0], "before");
        // read the value of the `border-radius` CSS property
        const radiusValue = before.getPropertyValue("border-radius");
        // the returned value will have double quotes around it, but this is correct
        expect(radiusValue).to.eq("8px");
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

    it("should render Vertical Menu Item without href prop", () => {
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
            const callback = cy.stub();

            CypressMountWithProviders(
              <VerticalMenuFullScreenCustom onClose={callback} />
            );

            verticalMenuTrigger().click();

            verticalMenuFullScreen().trigger("keydown", { key: "Escape" });

            verticalMenuFullScreen().then(() => {
              // eslint-disable-next-line no-unused-expressions
              expect(callback).to.have.been.calledOnce;
            });
          });

          // TODO remove skip as part of FE-5650
          it.skip("should render Vertical Menu Full Screen without isOpen prop", () => {
            CypressMountWithProviders(<VerticalMenuFullScreenCustom />);

            verticalMenuItem().should("not.be.visible");
          });

          it("should render Vertical Menu Full Screen with isOpen prop", () => {
            CypressMountWithProviders(<VerticalMenuFullScreenCustom isOpen />);

            verticalMenuItem().should("be.visible");
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

        verticalMenuTrigger().then(($el) => {
          expect($el).to.have.attr("height").to.equals(height);
          useJQueryCssValueAndAssert($el, "min-height", parseInt(height));
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
      ["expand", "Space", 1, "be.visible"],
      ["expand", "Enter", 1, "be.visible"],
      ["collapse", "Space", 2, "not.exist"],
      ["collapse", "Enter", 2, "not.exist"],
    ])(
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

    it("should check the golden outline", () => {
      CypressMountWithProviders(<Default />);

      verticalMenuItem().tab();
      verticalMenuItem()
        .eq(1)
        .then(($el) => {
          checkGoldenOutline($el);
        });
    });
  });

  describe("check events for Vertical Menu component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onClick callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <VerticalMenuTriggerCustom onClick={callback} />
      );

      verticalMenuTrigger()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClose callback when a click event is triggered for VerticalMenuFullScreen", () => {
      cy.viewport(320, 599);
      CypressMountWithProviders(
        <VerticalMenuFullScreenCustom onClose={callback} />
      );

      verticalMenuTrigger().click();

      closeIconButton().click();

      verticalMenuFullScreen().then(() => {
        // eslint-disable-next-line no-unused-expressions
        expect(callback).to.have.been.calledOnce;
      });
    });

    it.each(["Space", "Enter"])(
      "should call onClose callback when a %s key event is triggered for VerticalMenuFullScreen",
      (key) => {
        cy.viewport(320, 599);
        CypressMountWithProviders(
          <VerticalMenuFullScreenCustom onClose={callback} />
        );

        verticalMenuTrigger().click();

        closeIconButton().focus().realPress(key);

        verticalMenuFullScreen().then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
      }
    );
  });

  describe("should check the accessibility tests", () => {
    it("should check accessiblity for verticalMenuComponent", () => {
      CypressMountWithProviders(<Default />);

      cy.checkAccessibility();
    });

    it("should check accessiblity for verticalMenuComponent open", () => {
      CypressMountWithProviders(<Default isOpen />);

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

    it("should check accessiblity for verticalMenuComponent CustomItemHeight", () => {
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
    it("should navigate to the children href", () => {
      CypressMountWithProviders(<Default />);

      verticalMenuItem().eq(1).click();

      cy.location("pathname").should("eq", "/item1");
    });
  });
});
