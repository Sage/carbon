import {
  actionPopoverButton,
  actionPopover,
  actionPopoverInnerItem,
  actionPopoverSubmenu,
  actionPopoverSubmenuByIndex,
} from "../../locators/action-popover";
import { keyCode } from "../helper";

Then("Action Popover element is visible", () => {
  actionPopover().should("be.visible");
});

Then("Action Popover element is not visible", () => {
  actionPopover().should("not.exist");
});

When("I click the menu button element", () => {
  actionPopoverButton().eq(0).click();
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
  cy.storyAction(event);
});

Then("ActionPopover submenu is not visible", () => {
  actionPopoverSubmenuByIndex().should("not.be.visible");
});

Then("Download button has href link {string} and download prop", (link) => {
  actionPopover()
    .find("a")
    .should("have.attr", "href", link)
    .and("have.attr", "download");
});

When("I scroll accordion content to top", () => {
  cy.scrollTo("0", "0");
});

Then("Action Popover element is visible in {word} position", (position) => {
  actionPopover()
    .should("have.attr", "data-popper-placement", `${position}-end`)
    .and("be.visible");
});
