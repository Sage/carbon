import {
  submenuBlock,
  innerMenu,
  submenu,
  scrollBlock,
  lastSubmenuElement,
  menuDivider,
  segmentTitle,
} from "../../locators/menu";
import { positionOfElement } from "../helper";

When("I click third expandable Menu component", () => {
  submenu().trigger("click");
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
  submenu().eq(positionOfElement(position)).trigger("click");
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
