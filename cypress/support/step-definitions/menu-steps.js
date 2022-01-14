import { LINK } from "../../locators/locators";
import {
  submenuBlock,
  innerMenu,
  submenu,
  scrollBlock,
  lastSubmenuElement,
  menuDivider,
  segmentTitle,
  menuComponent,
  submenuItem,
  fullscreenMenu,
  menu,
  menuItem,
} from "../../locators/menu";
import { searchInput, searchCrossIcon } from "../../locators/search/index";
import { positionOfElement, keyCode } from "../helper";

const span = "span";
const div = "div";

When("I hover over {string} expandable Menu component", (position) => {
  submenu().eq(positionOfElement(position)).trigger("mouseover");
});

Then("Menu third expandable element has inner elements", () => {
  submenuBlock().children().should("have.length", 4);
  innerMenu(positionOfElement("second"), span).should(
    "have.attr",
    "data-component",
    "link"
  );
  innerMenu(positionOfElement("third"), div).should(
    "have.attr",
    "data-component",
    "menu-divider"
  );
  innerMenu(positionOfElement("fourth"), span).should(
    "have.attr",
    "data-component",
    "link"
  );
  innerMenu(positionOfElement("fifth"), span).should(
    "have.attr",
    "data-component",
    "link"
  );
});

When("I open the {string} submenu", (position) => {
  submenu().eq(positionOfElement(position), div).trigger("mouseover");
});

When("I scroll to the bottom of the block", () => {
  scrollBlock().scrollTo("bottom");
});

Then("The last element is visible", () => {
  lastSubmenuElement(div).should("be.visible");
});

Then(
  "Inner menu search input has alternate {string} background colour",
  (color) => {
    innerMenu(positionOfElement("fifth"), div).should(
      "have.css",
      "background-color",
      color
    );
  }
);

Then("Menu divider has {int} px size", (size) => {
  menuDivider().should("have.css", "height", `${size}px`);
});

Then("{string} is visible", (text) => {
  segmentTitle()
    .should("have.text", text)
    .and("be.visible")
    .and("have.css", "color", "rgb(64, 102, 119)");
});

Then("{string} submenu has alternate colour theme", (position) => {
  if (position === "fourth") {
    innerMenu(positionOfElement(position), div).should(
      "have.css",
      "background-color",
      "rgb(230, 235, 237)"
    );
  } else {
    innerMenu(positionOfElement(position), LINK).should(
      "have.css",
      "background-color",
      "rgb(230, 235, 237)"
    );
  }
});

When(
  "I hover over default menu {string} expandable Menu component",
  (position) => {
    menuComponent(positionOfElement(position)).trigger("mouseover", {
      force: true,
    });
  }
);

Then(
  "Menu {string} expandable component submenu is not visible",
  (position) => {
    submenuItem(positionOfElement(position))
      .should("have.length", 0)
      .and("not.exist");
  }
);

When("I click default menu {string} expandable Menu component", (position) => {
  menuComponent(positionOfElement(position)).click();
});

Given(
  "I press tab from default menu {string} expandable Menu component {int} times",
  (position, times) => {
    menuComponent(positionOfElement(position)).click();
    cy.focused().trigger("keydown", keyCode("Esc"));
    for (let i = 0; i < times; i++) {
      cy.focused().tab();
    }
  }
);

Then("Menu {string} expandable element has inner elements", (position) => {
  submenuItem(positionOfElement(position)).should("have.length", 2);
  innerMenu(positionOfElement("second"), span)
    .should("have.attr", "data-component", "link")
    .and("be.visible");
  innerMenu(positionOfElement("third"), span)
    .should("have.attr", "data-component", "link")
    .and("be.visible");
});

// instructions for search in menu keyboard nav test
When("I press {string} key {int} times", (key, times) => {
  cy.focused().trigger("keydown", keyCode(key));
  for (let i = 0; i < times; i++) {
    cy.focused();
  }
});

When("I press Tab on Search component", () => {
  searchInput().tab();
});

Then("Search component input should be focused", () => {
  searchInput().should("have.focus");
});

Then("Search component input icon should be focused", () => {
  searchCrossIcon().parent().should("have.focus");
});

Then("Menu is in fullscreen mode", () => {
  fullscreenMenu(positionOfElement("first"))
    .find("span")
    .should("have.attr", "data-element", "close")
    .and("be.visible");
  fullscreenMenu(positionOfElement("second"))
    .find("ul")
    .should("have.attr", "data-component", "menu")
    .should("be.visible");
  fullscreenMenu(positionOfElement("second"))
    .find("ul > li")
    .should("have.length", 15);
});

Then("Menu is in fullscreen mode is not visible", () => {
  fullscreenMenu(positionOfElement("first")).should("not.be.visible");
  fullscreenMenu(positionOfElement("second")).should("not.be.visible");
  menu().should("be.visible");
});

Then("{string} inner menu element is focused", (position) => {
  menuComponent(positionOfElement(position))
    .find("ul > li")
    .eq(1)
    .children()
    .children()
    .should("have.css", "box-shadow")
    .and("contain", "rgb(255, 181, 0)");
  menuComponent(positionOfElement(position))
    .find("ul > li")
    .eq(1)
    .children()
    .children()
    .should("have.css", "background-color")
    .and("contain", "rgb(0, 129, 93)");
  menuComponent(positionOfElement(position))
    .find("ul > li")
    .eq(1)
    .children()
    .children()
    .should("be.focused");
});

Then("inner menu without active redirection is not focused", () => {
  menuItem().should("not.be.focused");
});
