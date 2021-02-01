import {
  actionPopoverButton,
  actionPopover,
  actionPopoverInnerItem,
  actionPopoverButtonNoIframe,
  actionPopoverSubmenu,
  actionPopoverSubmenuNoIFrame,
  actionPopoverSubmenuByIndex,
} from "../../locators/action-popover";
import { eventInAction } from "../../locators";
import { keyCode } from "../helper";

Then("Action Popover element is visible", () => {
  actionPopover().should("be.visible");
});

Then("Action Popover element is not visible", () => {
  actionPopover().should("not.exist");
});

When("I click the menu button element in noiFrame", () => {
  actionPopoverButton().eq(0).click();
});

When("I click the menu button element", () => {
  actionPopoverButtonNoIframe().eq(0).click();
});

When(
  "I press keyboard {string} key times {int} on actionPopover open icon",
  (key, times) => {
    for (let i = 0; i < times; i++) {
      actionPopoverButton().first().trigger("keydown", keyCode(key));
    }
  }
);

Then("Action Popover element has golden border on focus", () => {
  cy.focused().should(
    "have.css",
    "box-shadow",
    "rgb(255, 181, 0) 0px 0px 0px 2px inset"
  );
});

When("I click {int} actionPopoverInnerItem", (element) => {
  actionPopoverInnerItem(element).click({ force: true });
});

When("I click {int} submenu actionPopoverInnerItem", (element) => {
  actionPopoverSubmenu(element).click({ force: true });
});

When("I click {int} submenu actionPopoverInnerItem in noIframe", (element) => {
  actionPopoverSubmenuByIndex(element).click({ force: true });
});

When("I press {string} onto {int} actionPopoverInnerItem", (key, element) => {
  actionPopoverInnerItem(element).type(`{${key}}`);
});

When("I press Enter onto {int} submenu actionPopoverInnerItem", (element) => {
  actionPopoverSubmenu(element).trigger("keydown", {
    keyCode: 13,
    which: 13,
    force: true,
  });
});

When("I press {word} on first element", (key) => {
  actionPopoverButton().first().trigger("keydown", keyCode(key));
});

Then("{string} action was called in Actions Tab for actionPopover", (event) => {
  eventInAction(event);
});

Then("ActionPopover submenu is not visible", () => {
  actionPopoverSubmenuNoIFrame().should("not.be.visible");
});
