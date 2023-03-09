/* eslint-disable react/prop-types */
import React from "react";
import path from "path";

import { ActionPopoverMenuButton } from "../../../src/components/action-popover";
import { Accordion } from "../../../src/components/accordion";

import { accordionDefaultTitle } from "../../locators/accordion";

import {
  actionPopoverButton,
  actionPopover,
  actionPopoverSubmenu,
  actionPopoverSubmenuByIndex,
  actionPopoverInnerItem,
  actionPopoverWrapper,
} from "../../locators/action-popover";

import { getDataElementByValue, cyRoot } from "../../locators/index";

import { buttonDataComponent } from "../../locators/button";
import { alertDialogPreview } from "../../locators/dialog";

import { keyCode } from "../../../cypress/support/helper";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  ActionPopoverCustom,
  ActionPopoverWithProps,
  ActionPopoverMenuWithProps,
  ActionPopoverProps,
} from "../../../src/components/action-popover/action-popover-test.stories.tsx";
import {
  ActionPopoverComponent,
  ActionPopoverComponentIcons,
  ActionPopoverComponentDisabledItems,
  ActionPopoverComponentMenuRightAligned,
  ActionPopoverComponentContentAlignedRight,
  ActionPopoverComponentNoIcons,
  ActionPopoverComponentCustomMenuButton,
  ActionPopoverComponentSubmenu,
  ActionPopoverComponentDisabledSubmenu,
  ActionPopoverComponentSubmenuAlignedRight,
  ActionPopoverComponentMenuOpeningAbove,
  ActionPopoverComponentKeyboardNavigation,
  ActionPopoverComponentKeyboardNaviationLeftAlignedSubmenu,
  ActionPopoverComponentKeyboardNaviationRightAlignedSubmenu,
  ActionPopoverComponentAdditionalOptions,
  ActionPopoverComponentDownloadButton,
  ActionPopoverComponentInOverflowHiddenContainer,
  ActionPopoverComponentInFlatTable,
  ActionPopoverComponentOpeningAModal,
  ActionPopoverNestedInDialog,
} from "../../../src/components/action-popover/action-popover.stories.tsx";

context("Test for ActionPopover component", () => {
  describe("check functionality for ActionPopover component", () => {
    it("should render ActionPopover component", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      actionPopover().should("be.visible");
    });

    it.each([
      [0, "Business"],
      [1, "Email Invoice"],
      [2, "Print Invoice"],
      [3, "Download PDF"],
      [4, "Download CSV"],
      [5, "Delete"],
    ])(
      "should render ActionPopover and be able to press downarrow %s times and get button %s focused",
      (times, elementText) => {
        CypressMountWithProviders(<ActionPopoverCustom />);

        actionPopoverButton().eq(0).click();
        for (let i = 0; i < times; i++) {
          cy.focused().trigger("keydown", keyCode("downarrow"));
        }
        cy.focused().should("contain", elementText);
      }
    );

    it.each([["Enter"], ["Space"], ["downarrow"]])(
      "should Open ActionPopover component using %s keyboard key",
      (key) => {
        CypressMountWithProviders(<ActionPopoverCustom />);

        actionPopoverButton().first().trigger("keydown", keyCode(key));
        cy.focused().should("contain", "Business");

        actionPopover().should("be.visible");
      }
    );

    it("should focus the first element Business using Home key", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      for (let i = 0; i < 2; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", keyCode("Home"));
      cy.focused().should("contain", "Business");
    });

    it("should focus the first sub menu 1 element using Home key", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      for (let i = 0; i < 2; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", keyCode("leftarrow"));
      for (let i = 0; i < 2; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", keyCode("Home"));
      cy.focused().should("contain", "Sub Menu 1");
    });

    it.each([["uparrow"], ["End"]])(
      "should focus the last element Delete using %s keyboard key",
      (key) => {
        CypressMountWithProviders(<ActionPopoverCustom />);

        actionPopoverButton().eq(0).click();
        cy.focused().trigger("keydown", keyCode(key));
        cy.focused().should("contain", "Delete");
      }
    );

    it("should focus the last sub menu 3 element using End keyboard key", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      for (let i = 0; i < 2; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", keyCode("leftarrow"));
      cy.focused().trigger("keydown", keyCode("End"));
      cy.focused().should("contain", "Sub Menu 3");
    });

    it("should open ActionPopover and close it using Tab key", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      cy.focused().tab();
      actionPopover().should("not.exist");
    });

    it("should open ActionPopover and close it using ShiftTab key", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      cy.focused().tab({ shift: true });
      actionPopover().should("not.exist");
    });

    it("should open ActionPopover and close it using ESC key", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      cy.focused().trigger("keydown", {
        key: "Shift",
        release: false,
      });
      cy.focused().type("{esc}", { force: true });
      actionPopover().should("not.exist");
    });

    it("should close ActionPopover using ESC key if it hasn't a submenu", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      cy.focused().trigger("keydown", keyCode("downarrow"));
      cy.focused().trigger("keydown", {
        key: "Shift",
        release: false,
      });
      cy.focused().type("{esc}", { force: true });
      actionPopover().should("not.exist");
    });

    it("should close ActionPopover using ESC key if it has a submenu", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      for (let i = 0; i < 2; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", {
        key: "Shift",
        release: false,
      });
      cy.focused().type("{esc}", { force: true });
      actionPopover().should("not.exist");
    });

    it("should open ActionPopover and close it by clicking outside of the component", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      cyRoot().click({ force: true });
      actionPopover().should("not.exist");
    });

    it("should open ActionPopover and close it by clicking onto Open icon", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).dblclick();
      actionPopover().should("not.exist");
    });

    it.each([
      ["d", "Download PDF", 1],
      ["d", "Download CSV", 2],
      ["d", "Delete", 3],
      ["e", "Email Invoice", 1],
      ["p", "Print Invoice", 1],
    ])(
      "should focus element using %s keyboard key",
      (key, innerText, times) => {
        CypressMountWithProviders(<ActionPopoverCustom />);

        actionPopoverButton().eq(0).click();

        for (let i = 0; i < times; i++) {
          cy.focused().type(`${key}`);
        }
        actionPopover().should("be.visible");
        cy.focused().should("contain", innerText);
      }
    );

    it.each([
      ["Sub Menu 1", 0],
      ["Sub Menu 2", 1],
      ["Sub Menu 3", 2],
    ])("should focus %s element", (innerText, times) => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      for (let i = 0; i < 2; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", keyCode("leftarrow"));
      for (let i = 0; i < times; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().should("contain", innerText);
    });

    it.each([
      ["Sub Menu 1", 0],
      ["Sub Menu 2", 1],
    ])(
      "should close %s and ActionPopover after press Enter keyboard key",
      (name, element) => {
        CypressMountWithProviders(<ActionPopoverCustom />);

        actionPopoverButton().eq(0).click();
        for (let i = 0; i < 2; i++) {
          cy.focused().trigger("keydown", keyCode("downarrow"));
        }
        cy.focused().trigger("keydown", keyCode("leftarrow"));
        getDataElementByValue("submenu1")
          .eq(element)
          .trigger("keydown", keyCode("EnterForce"));
        actionPopover().should("not.exist");
      }
    );

    it.each([
      ["Sub Menu 1", 0],
      ["Sub Menu 2", 1],
    ])("should close %s after press ArrowRight keyboard key", (times) => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      actionPopoverButton().eq(0).click();
      for (let i = 0; i < 2; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", keyCode("leftarrow"));
      for (let i = 0; i < times; i++) {
        cy.focused().trigger("keydown", keyCode("downarrow"));
      }
      cy.focused().trigger("keydown", keyCode("rightarrow"));
      actionPopoverSubmenuByIndex().should("not.be.visible");
    });

    it.each([
      ["Sub Menu 1", 0],
      ["Sub Menu 2", 1],
    ])(
      "should close %s and ActionPopover after press Esc keyboard key",
      (times) => {
        CypressMountWithProviders(<ActionPopoverCustom />);

        actionPopoverButton().eq(0).click();
        for (let i = 0; i < 2; i++) {
          cy.focused().trigger("keydown", keyCode("downarrow"));
        }
        cy.focused().trigger("keydown", keyCode("leftarrow"));
        for (let i = 0; i < times; i++) {
          cy.focused().trigger("keydown", keyCode("downarrow"));
        }
        cy.focused().trigger("keydown", {
          key: "Shift",
          release: false,
        });
        cy.focused().type("{esc}", { force: true });
        actionPopover().should("not.exist");
      }
    );

    it.each([
      ["Sub Menu 1", 0],
      ["Sub Menu 2", 1],
    ])(
      "should close %s and ActionPopover after clicking on the submenu",
      (name, item) => {
        CypressMountWithProviders(<ActionPopoverCustom />);

        actionPopoverButton().eq(0).click();
        for (let i = 0; i < 2; i++) {
          cy.focused().trigger("keydown", keyCode("downarrow"));
        }
        cy.focused().trigger("keydown", keyCode("leftarrow"));
        for (let i = 0; i < 2; i++) {
          cy.focused().trigger("keydown", keyCode("downarrow"));
        }
        actionPopoverSubmenu(item).click({ force: true });
        actionPopover().should("not.exist");
      }
    );

    it("should invoke ActionPopover component in a hidden container", () => {
      CypressMountWithProviders(
        <Accordion title="Heading">
          <ActionPopoverCustom />
        </Accordion>
      );

      accordionDefaultTitle().trigger("keydown", keyCode("Enter"));
      actionPopoverButton().eq(0).click();
      actionPopover().should("be.visible");
    });

    it("should check that actionPopoverInnerItem has download prop", () => {
      CypressMountWithProviders(<ActionPopoverCustom />);

      const downloadsFolder = Cypress.config("downloadsFolder");
      const downloadedFilename = path.join(downloadsFolder, "example-img.jpg");

      actionPopoverButton().eq(1).click();
      actionPopover()
        .find("a")
        .should("have.attr", "href", "example-img.jpg")
        .and("have.attr", "download");
      actionPopover().click();
      cy.readFile(downloadedFilename, "binary", {
        timeout: 15000,
      }).should((buffer) => expect(buffer.length).to.be.gt(100));
    });

    it("should show ActionPopover list is positioned properly in large viewport", () => {
      cy.viewport(700, 300);

      CypressMountWithProviders(
        <Accordion mt="150px" title="Heading">
          <ActionPopoverCustom />
        </Accordion>
      );

      accordionDefaultTitle().trigger("keydown", keyCode("Enter"));
      actionPopoverButton().eq(0).click();
      cy.scrollTo("0", "1000");
      actionPopover()
        .should("have.attr", "data-floating-placement", "bottom-end")
        .and("be.visible");
      cy.scrollTo("0", "0");
      actionPopover()
        .should("have.attr", "data-floating-placement", "top-end")
        .and("be.visible");
    });

    it.each([[0], [1]])(
      "should have correct hover state of submenu item in ActionPopoverMenu",
      (element) => {
        CypressMountWithProviders(<ActionPopoverMenuWithProps />);

        actionPopoverButton().eq(0).click();
        actionPopoverInnerItem(element)
          .realHover()
          .should("have.css", "background-color", "rgb(204, 214, 219)");
      }
    );
  });

  describe("check props for ActionPopover component", () => {
    it("should render ActionPopover with unique id", () => {
      CypressMountWithProviders(<ActionPopoverWithProps id="cypress" />);

      actionPopoverButton().eq(0).click();
      actionPopoverWrapper().should("have.attr", "id", "cypress");
    });

    it.each([
      [true, "right"],
      [false, "left"],
    ])(
      "should render ActionPopover with rightAlignMenu set to %s",
      (rightAlignMenu, css) => {
        CypressMountWithProviders(
          <ActionPopoverWithProps rightAlignMenu={rightAlignMenu} />
        );

        actionPopoverButton().eq(0).click();
        actionPopover().should("have.css", css);
      }
    );

    it("should render ActionPopover with custom button", () => {
      CypressMountWithProviders(
        <ActionPopoverWithProps
          renderButton={() => (
            <ActionPopoverMenuButton
              buttonType="tertiary"
              iconType="dropdown"
              iconPosition="after"
              size="small"
            >
              More
            </ActionPopoverMenuButton>
          )}
        />
      );

      buttonDataComponent().click();
      actionPopoverWrapper()
        .find('[data-component="button"]')
        .should("be.visible");
    });

    it.each([
      ["left", "start"],
      ["right", "end"],
    ])(
      "should render ActionPopover with horizontalAlignment prop set to %s",
      (position, attrValue) => {
        CypressMountWithProviders(
          <ActionPopoverWithProps horizontalAlignment={position} />
        );

        actionPopoverButton().eq(0).click();
        actionPopover()
          .children()
          .should("have.css", "justify-content", `flex-${attrValue}`);
      }
    );

    it("should render ActionPopoverMenu with menuID", () => {
      CypressMountWithProviders(
        <ActionPopoverMenuWithProps menuID="cypress" />
      );

      actionPopoverButton().eq(0).click();
      actionPopover()
        .eq(1)
        .should("have.attr", "id")
        .and("contain", "ActionPopoverMenu_");
    });

    it("should render ActionPopoverMenu with focusIndex set to null", () => {
      CypressMountWithProviders(
        <ActionPopoverMenuWithProps focusIndex={null} />
      );

      actionPopoverButton().eq(0).click();
      actionPopover().eq(1).children().eq(0).should("not.be.focused");
    });
  });

  describe("check events for ActionPopover component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it.each([[1], [4], [6]])(
      "should call onClick callback when a click event is triggered",
      (element) => {
        CypressMountWithProviders(<ActionPopoverCustom onClick={callback} />);
        actionPopoverButton().eq(0).click();
        actionPopoverInnerItem(element)
          .click({ force: true })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it.each([[1], [4], [6]])(
      "should call onClick callback when a keydown event is triggered by pressing Enter",
      (element) => {
        CypressMountWithProviders(<ActionPopoverCustom onClick={callback} />);
        actionPopoverButton().eq(0).click();
        actionPopoverInnerItem(element)
          .trigger("keydown", keyCode("Enter"))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it.each([[0], [1]])(
      "should call onClick callback when a click event is triggered for submenu",
      (element) => {
        CypressMountWithProviders(<ActionPopoverCustom onClick={callback} />);

        actionPopoverButton().eq(0).click();
        actionPopoverInnerItem(2).realHover();
        actionPopoverSubmenu(element)
          .invoke("show")
          .click({ force: true })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it.each([[0], [1]])(
      "should call onClick callback when a keydown event is triggered for submenu by pressing Enter",
      (element) => {
        CypressMountWithProviders(<ActionPopoverCustom onClick={callback} />);
        actionPopoverButton().eq(0).click();
        actionPopoverInnerItem(2).realHover();
        actionPopoverSubmenu(element)
          .invoke("show")
          .trigger("keydown", keyCode("EnterForce"))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it("should call onOpen callback when a click event is triggered ActionPopover", () => {
      CypressMountWithProviders(<ActionPopoverProps onOpen={callback} />);
      actionPopoverButton()
        .eq(0)
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClose callback when a click event is triggered ActionPopover", () => {
      CypressMountWithProviders(<ActionPopoverProps onClose={callback} />);
      actionPopoverButton()
        .eq(0)
        .dblclick()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("Accessibility tests for ActionPopover", () => {
    it("should pass accessibility tests for ActionPopover with custom button", () => {
      CypressMountWithProviders(
        <ActionPopoverWithProps
          renderButton={() => (
            <ActionPopoverMenuButton
              buttonType="tertiary"
              iconType="dropdown"
              iconPosition="after"
              size="small"
            >
              More
            </ActionPopoverMenuButton>
          )}
        />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover default", () => {
      CypressMountWithProviders(<ActionPopoverComponent />);

      actionPopoverButton().eq(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover with Icons", () => {
      CypressMountWithProviders(<ActionPopoverComponentIcons />);

      actionPopoverButton().eq(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover with disabled items", () => {
      CypressMountWithProviders(<ActionPopoverComponentDisabledItems />);

      actionPopoverButton().eq(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover with menu right aligned", () => {
      CypressMountWithProviders(<ActionPopoverComponentMenuRightAligned />);

      actionPopoverButton().eq(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover with item content right aligned", () => {
      CypressMountWithProviders(<ActionPopoverComponentContentAlignedRight />);

      actionPopoverButton().eq(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover with no icons", () => {
      CypressMountWithProviders(<ActionPopoverComponentNoIcons />);

      actionPopoverButton().eq(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover with custom menu button", () => {
      CypressMountWithProviders(<ActionPopoverComponentCustomMenuButton />);

      actionPopoverButton().eq(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover with submenu", () => {
      CypressMountWithProviders(<ActionPopoverComponentSubmenu />);

      actionPopoverButton().eq(0).click();
      actionPopoverInnerItem(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover with disabled submenu", () => {
      CypressMountWithProviders(<ActionPopoverComponentDisabledSubmenu />);

      actionPopoverButton().eq(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover with submenu aligned right", () => {
      CypressMountWithProviders(<ActionPopoverComponentSubmenuAlignedRight />);

      actionPopoverButton().eq(0).click();
      actionPopoverInnerItem(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover with menu opening above", () => {
      CypressMountWithProviders(<ActionPopoverComponentMenuOpeningAbove />);

      actionPopoverButton().eq(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover with keyboard navigation", () => {
      CypressMountWithProviders(<ActionPopoverComponentKeyboardNavigation />);

      actionPopoverButton().eq(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover with keyboard navigation in left aligned submenu", () => {
      CypressMountWithProviders(
        <ActionPopoverComponentKeyboardNaviationLeftAlignedSubmenu />
      );

      actionPopoverButton().eq(0).click();
      actionPopoverInnerItem(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover with keyboard navigation in right aligned submenu", () => {
      CypressMountWithProviders(
        <ActionPopoverComponentKeyboardNaviationRightAlignedSubmenu />
      );

      actionPopoverButton().eq(0).click();
      actionPopoverInnerItem(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover with additional options", () => {
      CypressMountWithProviders(<ActionPopoverComponentAdditionalOptions />);

      actionPopoverButton().eq(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover with download button", () => {
      CypressMountWithProviders(<ActionPopoverComponentDownloadButton />);

      actionPopoverButton().eq(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover in overflow hidden container", () => {
      CypressMountWithProviders(
        <ActionPopoverComponentInOverflowHiddenContainer />
      );

      getDataElementByValue("accordion-icon").click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover in FlatTable", () => {
      CypressMountWithProviders(<ActionPopoverComponentInFlatTable />);

      actionPopoverButton().eq(0).click();
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for ActionPopover opening a modal", () => {
      CypressMountWithProviders(<ActionPopoverComponentOpeningAModal />);

      actionPopoverButton().eq(0).click();
      cy.checkAccessibility();
    });
  });

  describe("when nested inside of a Dialog component", () => {
    it("should not close the Dialog when ActionPopover is closed by pressing an escape key", () => {
      CypressMountWithProviders(<ActionPopoverNestedInDialog />);

      actionPopoverButton().eq(0).click();
      actionPopoverButton()
        .eq(0)
        .type("{esc}", { force: true })
        .then(() => {
          actionPopover().should("not.exist");
          alertDialogPreview().should("exist");
        });

      actionPopoverButton()
        .eq(0)
        .type("{esc}", { force: true })
        .then(() => {
          alertDialogPreview().should("not.exist");
        });
    });
  });
});
