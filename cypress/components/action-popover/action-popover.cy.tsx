/* eslint-disable jest/valid-expect-in-promise, jest/valid-expect */
import React from "react";
import path from "path";

import {
  ActionPopoverMenuButton,
  ActionPopoverItemProps,
  ActionPopoverProps,
  RenderButtonProps,
} from "../../../src/components/action-popover";
import { Accordion } from "../../../src/components/accordion";

import { accordionDefaultTitle } from "../../locators/accordion";

import {
  actionPopoverButton,
  actionPopover,
  actionPopoverSubmenu,
  actionPopoverMenuItemIcon,
  actionPopoverMenuItemInnerText,
  actionPopoverMenuItemChevron,
  actionPopoverSubmenuByIndex,
  actionPopoverInnerItem,
  actionPopoverWrapper,
} from "../../locators/action-popover";

import { getDataElementByValue, cyRoot } from "../../locators/index";

import { buttonDataComponent } from "../../locators/button";
import { alertDialogPreview } from "../../locators/dialog";

import { keyCode } from "../../support/helper";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

import {
  ActionPopoverCustom,
  ActionPopoverWithProps,
  ActionPopoverMenuWithProps,
  ActionPopoverPropsComponent,
  ActionPopoverWithNoIconsOrSubmenus,
  ActionPopoverWithSomeSubmenusAndNoIcons,
  ActionPopoverWithSubmenusAndNoIcons,
  ActionPopoverWithIconsAndNoSubmenus,
  ActionPopoverWithSubmenusAndIcons,
  ActionPopoverWithIconsAndSomeSubmenus,
  ActionPopoverWithSubmenusAndSomeIcons,
  ActionPopoverWithVariableChildren,
} from "../../../src/components/action-popover/action-popover-test.stories";
import {
  ActionPopoverComponent,
  ActionPopoverComponentIcons,
  ActionPopoverComponentDisabledItems,
  ActionPopoverComponentMenuRightAligned,
  ActionPopoverComponentContentAlignedRight,
  ActionPopoverComponentSubmenuPositionedRight,
  ActionPopoverComponentNoIcons,
  ActionPopoverComponentCustomMenuButton,
  ActionPopoverComponentSubmenu,
  ActionPopoverComponentDisabledSubmenu,
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
} from "../../../src/components/action-popover/action-popover.stories";

const keyToTrigger = ["Enter", "Space", "End", "downarrow", "uparrow"] as const;

const subMenuOption = ["Sub Menu 1", "Sub Menu 2", "Sub Menu 3"] as const;

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

    it.each([keyToTrigger[0], keyToTrigger[1], keyToTrigger[3]])(
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

    it.each([keyToTrigger[2], keyToTrigger[4]])(
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
      [subMenuOption[0], 0],
      [subMenuOption[1], 1],
      [subMenuOption[2], 2],
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
      [subMenuOption[0], 0],
      [subMenuOption[1], 1],
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
      [subMenuOption[0], 0],
      [subMenuOption[1], 1],
    ])("should close %s after press ArrowRight keyboard key", (name, times) => {
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
      [subMenuOption[0], 0],
      [subMenuOption[1], 1],
    ])(
      "should close %s and ActionPopover after press Esc keyboard key",
      (name, times) => {
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
      [subMenuOption[0], 0],
      [subMenuOption[1], 1],
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
      cy.readFile(downloadedFilename, "binary", {})
        .its("length")
        .should("be.greaterThan", 100);
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

    it.each([0, 1])(
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
          renderButton={({
            tabIndex,
            "data-element": dataElement,
            ariaAttributes,
          }: RenderButtonProps) => (
            <ActionPopoverMenuButton
              buttonType="tertiary"
              iconType="dropdown"
              iconPosition="after"
              size="small"
              tabIndex={tabIndex}
              data-element={dataElement}
              ariaAttributes={ariaAttributes}
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

    it("should render ActionPopover with icons within a submenu", () => {
      CypressMountWithProviders(<ActionPopoverWithSubmenusAndNoIcons />);

      actionPopoverButton().eq(0).click();
      actionPopoverMenuItemIcon().eq(0).should("exist");
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
          .get("button")
          .should("have.css", "justify-content", `flex-${attrValue}`);
      }
    );

    it.each([
      ["left", "chevron_left_thick"],
      ["right", "chevron_right_thick"],
    ])(
      "should render ActionPopover with submenuPosition prop set to %s",
      (position, chevronType) => {
        CypressMountWithProviders(
          <ActionPopoverWithSubmenusAndIcons submenuPosition={position} />
        );

        actionPopoverButton().eq(0).click();
        actionPopoverMenuItemChevron().should("have.attr", "type", chevronType);
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
    it.each([1, 4, 6])(
      "should call onClick callback when a click event is triggered",
      (element) => {
        const callback: ActionPopoverItemProps["onClick"] = cy
          .stub()
          .as("onClick");
        CypressMountWithProviders(<ActionPopoverCustom onClick={callback} />);
        actionPopoverButton().eq(0).click();
        actionPopoverInnerItem(element).click({ force: true });
        cy.get("@onClick").should("have.been.calledOnce");
      }
    );

    it.each([1, 4, 6])(
      "should call onClick callback when a keydown event is triggered by pressing Enter",
      (element) => {
        const callback: ActionPopoverItemProps["onClick"] = cy
          .stub()
          .as("onClick");
        CypressMountWithProviders(<ActionPopoverCustom onClick={callback} />);
        actionPopoverButton().eq(0).click();
        actionPopoverInnerItem(element).trigger("keydown", keyCode("Enter"));
        cy.get("@onClick").should("have.been.calledOnce");
      }
    );

    it.each([0, 1])(
      "should call onClick callback when a click event is triggered for submenu",
      (element) => {
        const callback: ActionPopoverItemProps["onClick"] = cy
          .stub()
          .as("onClick");
        CypressMountWithProviders(<ActionPopoverCustom onClick={callback} />);

        actionPopoverButton().eq(0).click();
        actionPopoverInnerItem(2).realHover();
        actionPopoverSubmenu(element).invoke("show").click({ force: true });
        cy.get("@onClick").should("have.been.calledOnce");
      }
    );

    it.each([0, 1])(
      "should call onClick callback when a keydown event is triggered for submenu by pressing Enter",
      (element) => {
        const callback: ActionPopoverItemProps["onClick"] = cy
          .stub()
          .as("onClick");
        CypressMountWithProviders(<ActionPopoverCustom onClick={callback} />);
        actionPopoverButton().eq(0).click();
        actionPopoverInnerItem(2).realHover();
        actionPopoverSubmenu(element)
          .invoke("show")
          .trigger("keydown", keyCode("EnterForce"));
        cy.get("@onClick").should("have.been.calledOnce");
      }
    );

    it("should call onOpen callback when a click event is triggered ActionPopover", () => {
      const callback: ActionPopoverProps["onOpen"] = cy.stub().as("onOpen");
      CypressMountWithProviders(
        <ActionPopoverPropsComponent onOpen={callback} />
      );
      actionPopoverButton().eq(0).click();
      cy.get("@onOpen").should("have.been.calledOnce");
    });

    it("should call onClose callback when a click event is triggered ActionPopover", () => {
      const callback: ActionPopoverProps["onClose"] = cy.stub().as("onClose");
      CypressMountWithProviders(
        <ActionPopoverPropsComponent onClose={callback} />
      );
      actionPopoverButton().eq(0).dblclick();
      cy.get("@onClose").should("have.been.calledOnce");
    });
  });

  describe("padding checks on 'StyledMenuItemInnerText'", () => {
    it.each([
      ["left", "left"],
      ["left", "right"],
      ["right", "left"],
      ["right", "right"],
    ])(
      "when horizontalAlignment is %s and submenuPosition is %s, then left and right padding is --spacing100",
      (alignment, position) => {
        CypressMountWithProviders(
          <ActionPopoverWithNoIconsOrSubmenus
            horizontalAlignment={alignment}
            submenuPosition={position}
          />
        );

        actionPopoverButton()
          .eq(0)
          .click()
          .then(() => {
            actionPopoverMenuItemInnerText()
              .should("have.css", "padding-left", "8px")
              .getDesignTokensByCssProperty("padding-left")
              .then(($el) => {
                expect($el[0]).to.equal("--spacing100");
              });

            actionPopoverMenuItemInnerText()
              .should("have.css", "padding-right", "8px")
              .getDesignTokensByCssProperty("padding-right")
              .then(($el) => {
                expect($el[0]).to.equal("--spacing100");
              });
          });
      }
    );

    it("when horizontalAlignment is left, submenuPosition is left and Menu Item children have some submenus and no icons, then padding-left is --spacing400", () => {
      CypressMountWithProviders(
        <ActionPopoverWithSomeSubmenusAndNoIcons
          horizontalAlignment="left"
          submenuPosition="left"
        />
      );

      actionPopoverButton()
        .eq(0)
        .click()
        .then(() => {
          actionPopoverMenuItemInnerText()
            .eq(0)
            .should("have.css", "padding-left", "32px")
            .getDesignTokensByCssProperty("padding-left")
            .then(($el) => {
              expect($el[0]).to.equal("--spacing400");
            });
        });
    });

    it("when horizontalAlignment is right, submenuPosition is right and Menu Item children have some submenus and no icons, then padding-right is --spacing400", () => {
      CypressMountWithProviders(
        <ActionPopoverWithSomeSubmenusAndNoIcons
          horizontalAlignment="right"
          submenuPosition="right"
        />
      );

      actionPopoverButton()
        .eq(0)
        .click()
        .then(() => {
          actionPopoverMenuItemInnerText()
            .eq(0)
            .should("have.css", "padding-right", "32px")
            .getDesignTokensByCssProperty("padding-right")
            .then(($el) => {
              expect($el[0]).to.equal("--spacing400");
            });
        });
    });

    it("when horizontalAlignment is left, submenuPosition is left and Menu Item children have submenus and some icons, then padding-left is --spacing600", () => {
      CypressMountWithProviders(
        <ActionPopoverWithSubmenusAndSomeIcons
          horizontalAlignment="left"
          submenuPosition="left"
        />
      );

      actionPopoverButton()
        .eq(0)
        .click()
        .then(() => {
          actionPopoverMenuItemInnerText()
            .eq(0)
            .should("have.css", "padding-left", "48px")
            .getDesignTokensByCssProperty("padding-left")
            .then(($el) => {
              expect($el[0]).to.equal("--spacing600");
            });
        });
    });

    it("when horizontalAlignment is right, submenuPosition is right and Menu Item children have submenus and some icons, then padding-right is --spacing600", () => {
      CypressMountWithProviders(
        <ActionPopoverWithSubmenusAndSomeIcons
          horizontalAlignment="right"
          submenuPosition="right"
        />
      );

      actionPopoverButton()
        .eq(0)
        .click()
        .then(() => {
          actionPopoverMenuItemInnerText()
            .eq(0)
            .should("have.css", "padding-right", "48px")
            .getDesignTokensByCssProperty("padding-right")
            .then(($el) => {
              expect($el[0]).to.equal("--spacing600");
            });
        });
    });

    it("when horizontalAlignment is left, submenuPosition is left and Menu Item children are variable, then padding-left is --spacing900", () => {
      CypressMountWithProviders(
        <ActionPopoverWithVariableChildren
          horizontalAlignment="left"
          submenuPosition="left"
        />
      );

      actionPopoverButton()
        .eq(0)
        .click()
        .then(() => {
          actionPopoverMenuItemInnerText()
            .eq(0)
            .should("have.css", "padding-left", "72px")
            .getDesignTokensByCssProperty("padding-left")
            .then(($el) => {
              expect($el[0]).to.equal("--spacing900");
            });
        });
    });

    it("when horizontalAlignment is right, submenuPosition is right and Menu Item children are variable, then padding-right is --spacing900", () => {
      CypressMountWithProviders(
        <ActionPopoverWithVariableChildren
          horizontalAlignment="right"
          submenuPosition="right"
        />
      );

      actionPopoverButton()
        .eq(0)
        .click()
        .then(() => {
          actionPopoverMenuItemInnerText()
            .eq(0)
            .should("have.css", "padding-right", "72px")
            .getDesignTokensByCssProperty("padding-right")
            .then(($el) => {
              expect($el[0]).to.equal("--spacing900");
            });
        });
    });

    it.each([
      ["left", "left", 1],
      ["left", "right", 2],
      ["right", "left", 3],
      ["right", "right", 4],
    ])(
      "when horizontalAlignment is %s, submenuPosition is %s and Menu Item child is a submenu, then left and right padding is --spacing000",
      (alignment, position, index) => {
        CypressMountWithProviders(
          <ActionPopoverMenuWithProps
            horizontalAlignment={alignment}
            submenuPosition={position}
          />
        );

        actionPopoverButton()
          .eq(0)
          .click()
          .then(() => {
            actionPopoverMenuItemInnerText()
              .eq(index)
              .should("have.css", "padding-left", "0px")
              .getDesignTokensByCssProperty("padding-left")
              .then(($el) => {
                expect($el[0]).to.equal("--spacing000");
              });

            actionPopoverMenuItemInnerText()
              .eq(index)
              .should("have.css", "padding-right", "0px")
              .getDesignTokensByCssProperty("padding-right")
              .then(($el) => {
                expect($el[0]).to.equal("--spacing000");
              });
          });
      }
    );
  });

  describe("justify-content checks on 'StyledMenuItem'", () => {
    it.each([
      ["left", "flex-start"],
      ["right", "flex-end"],
    ])(
      "when horizontalAlignment is %s then content should be justified %s",
      (alignment, itemAlignment) => {
        CypressMountWithProviders(
          <ActionPopoverWithProps horizontalAlignment={alignment} />
        );

        actionPopoverButton().eq(0).click();
        getDataElementByValue("menu-item1").should(
          "have.css",
          "justify-content",
          itemAlignment
        );
      }
    );

    it.each([
      ["left", "right", "space-between"],
      ["right", "left", "flex-end"],
    ])(
      "when horizontalAlignment is %s, submenuPosition is %s and Menu Item children have no submenus, then content should be justified %s",
      (alignment, position, itemAlignment) => {
        CypressMountWithProviders(
          <ActionPopoverWithProps
            horizontalAlignment={alignment}
            submenuPosition={position}
          />
        );

        actionPopoverButton().eq(0).click();
        getDataElementByValue("menu-item1").should(
          "have.css",
          "justify-content",
          itemAlignment
        );
      }
    );

    it.each([
      ["left", "right", "space-between"],
      ["right", "left", "space-between"],
    ])(
      "when horizontalAlignment is %s, submenuPosition is %s and Menu Item children have a submenu, then content should be justified %s",
      (alignment, position, itemAlignment) => {
        CypressMountWithProviders(
          <ActionPopoverWithSubmenusAndIcons
            horizontalAlignment={alignment}
            submenuPosition={position}
          />
        );

        actionPopoverButton().eq(0).click();
        getDataElementByValue("menu-item1").should(
          "have.css",
          "justify-content",
          itemAlignment
        );
      }
    );
  });

  describe("padding checks on 'MenuItemIcon'", () => {
    it("padding is: --spacing100", () => {
      CypressMountWithProviders(<ActionPopoverWithIconsAndNoSubmenus />);

      actionPopoverButton()
        .eq(0)
        .click()
        .then(() => {
          actionPopoverMenuItemIcon()
            .eq(0)
            .should("have.css", "padding", "8px")
            .getDesignTokensByCssProperty("padding")
            .then(($el) => {
              expect($el.join(" ")).to.deep.equal(
                "--spacing100 --spacing100 --spacing100 --spacing100"
              );
            });
        });
    });

    it.each([
      [
        "left",
        "left",
        "--spacing100 --spacing100 --spacing100 --spacing400",
        "8px 8px 8px 32px",
      ],
      [
        "left",
        "right",
        "--spacing100 --spacing100 --spacing100 --spacing100",
        "8px",
      ],
      [
        "right",
        "left",
        "--spacing100 --spacing100 --spacing100 --spacing100",
        "8px",
      ],
      [
        "right",
        "right",
        "--spacing100 --spacing400 --spacing100 --spacing100",
        "8px 32px 8px 8px",
      ],
    ])(
      "when horizontalAlignment is %s and submenuPosition is %s and Menu Item children have icons and some submenus, then padding is %s",
      (position, alignment, spacing, padding) => {
        CypressMountWithProviders(
          <ActionPopoverWithIconsAndSomeSubmenus
            submenuPosition={position}
            horizontalAlignment={alignment}
          />
        );

        actionPopoverButton()
          .eq(0)
          .click()
          .then(() => {
            actionPopoverMenuItemIcon()
              .eq(0)
              .should("have.css", "padding", padding)
              .getDesignTokensByCssProperty("padding")
              .then(($el) => {
                expect($el.join(" ")).to.deep.equal(spacing);
              });
          });
      }
    );
  });

  describe("Accessibility tests for ActionPopover", () => {
    it("should pass accessibility tests for ActionPopover with custom button", () => {
      CypressMountWithProviders(
        <ActionPopoverWithProps
          renderButton={({
            tabIndex,
            "data-element": dataElement,
            ariaAttributes,
          }: RenderButtonProps) => (
            <ActionPopoverMenuButton
              buttonType="tertiary"
              iconType="dropdown"
              iconPosition="after"
              size="small"
              tabIndex={tabIndex}
              data-element={dataElement}
              ariaAttributes={ariaAttributes}
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

    it("should pass accessibility tests for ActionPopover with a right submenu position", () => {
      CypressMountWithProviders(
        <ActionPopoverComponentSubmenuPositionedRight />
      );

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
      actionPopoverButton().eq(0).type("{esc}", { force: true });
      actionPopover().should("not.exist");
      alertDialogPreview().should("be.visible");

      actionPopoverButton().eq(0).type("{esc}", { force: true });
      alertDialogPreview().should("not.exist");
    });
  });

  it("should have the expected border radius styling", () => {
    CypressMountWithProviders(<ActionPopoverCustom />);

    actionPopoverButton()
      .eq(0)
      .focus()
      .should("have.css", "border-radius", "4px");
    actionPopoverButton().eq(0).click();
    actionPopover().should("have.css", "border-radius", "8px");
  });
});
