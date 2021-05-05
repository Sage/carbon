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
} from "../../locators/menu";
import { positionOfElement, keyCode } from "../helper";

When("I hover over third expandable Menu component", () => {
  submenu().trigger("mouseover");
});

Then("Menu third expandable element has inner elements", () => {
  submenuBlock().children().should("have.length", 4);
  innerMenu(positionOfElement("second")).should(
    "have.attr",
    "data-component",
    "link"
  );
  innerMenu(positionOfElement("third")).should(
    "have.attr",
    "data-component",
    "menu-divider"
  );
  innerMenu(positionOfElement("fourth")).should(
    "have.attr",
    "data-component",
    "link"
  );
  innerMenu(positionOfElement("fifth")).should(
    "have.attr",
    "data-component",
    "link"
  );
});

When("I open the {string} submenu", (position) => {
  submenu().eq(positionOfElement(position)).trigger("mouseover");
});

When("I scroll to the bottom of the block", () => {
  scrollBlock().scrollTo("bottom");
});

Then("The last element is visible", () => {
  lastSubmenuElement().should("be.visible");
});

Then(
  "Inner menu search input has alternate {string} background colour",
  (color) => {
    innerMenu(positionOfElement("fifth")).should(
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
  innerMenu(positionOfElement(position)).should(
    "have.css",
    "background-color",
    "rgb(230, 235, 237)"
  );
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
  innerMenu(positionOfElement("second"))
    .should("have.attr", "data-component", "link")
    .and("be.visible");
  innerMenu(positionOfElement("third"))
    .should("have.attr", "data-component", "link")
    .and("be.visible");
});
