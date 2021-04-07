import {
  accordionTitleContainerInIframe,
  accordionIcon,
  accordionTitleContainerByPositionInIfame,
  accordionTitleContainer,
  accordionTitleContainerByPosition,
  accordionDefaultTitle,
} from "../../locators/accordion";
import { positionOfElement, keyCode } from "../helper";
import { icon } from "../../locators";

Then(
  "Accordion iconAlign property on preview is set to {string}",
  (iconAlign) => {
    accordionTitleContainerByPositionInIfame(positionOfElement("first"))
      .first()
      .should("have.attr", "data-element", "accordion-headings-container")
      .and("be.visible");
    accordionTitleContainerByPositionInIfame(positionOfElement("first"))
      .last()
      .should("have.attr", "data-component", "icon")
      .and("be.visible");
    if (iconAlign === "right") {
      // set by default
      accordionTitleContainerInIframe()
        .should("have.css", "justify-content", "space-between")
        .and("not.have.css", "flex-direction", "row-reverse");
      accordionTitleContainerInIframe(positionOfElement("first"))
        .first()
        .should("have.css", "margin-right", "0px");
    } else {
      accordionTitleContainerInIframe().should(
        "have.css",
        "flex-direction",
        "row-reverse"
      );
      accordionTitleContainerByPositionInIfame(positionOfElement("first"))
        .last()
        .should("have.css", "margin-right", "16px");
    }
  }
);

Then(
  "Accordion row is {string} then iconType property on preview is set to {string}",
  (state, iconType) => {
    if (state === "closed") {
      accordionIcon()
        .should("have.attr", "type", iconType)
        .and("be.visible")
        .and(
          "have.css",
          "transform",
          "matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)"
        );
    } else {
      accordionIcon()
        .should("have.attr", "type", iconType)
        .and("be.visible")
        .and(
          "not.have.css",
          "transform",
          "matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)"
        );
    }
  }
);

When("I expand Design System accordionRow via click in NoIFrame", () => {
  accordionDefaultTitle().click();
});

When("I expand accordionRow via click", () => {
  accordionTitleContainerInIframe().click();
});

When("I expand accordionRow using {string} key", (key) => {
  accordionDefaultTitle().trigger("keydown", keyCode(key));
});

Then("accordionRow is expanded", () => {
  accordionTitleContainer()
    .should("have.attr", "aria-expanded", "true")
    .and("be.visible");
});

Then("accordionRow has golden border outline", () => {
  accordionDefaultTitle()
    .should("have.css", "outline", "rgb(255, 181, 0) solid 2px")
    .and("be.visible");
});

Then("Accordion {int} row is focused", (index) => {
  accordionTitleContainerByPosition(index)
    .parent()
    .should("have.css", "outline", "rgb(255, 181, 0) solid 2px")
    .and("be.visible");
});

When("I focus {word} accordionRow", (position) => {
  accordionTitleContainer(positionOfElement(position))
    .first()
    .focus({ force: true });
});

When("I click on {word} validation icon", (position) => {
  icon().eq(positionOfElement(position)).click();
});
