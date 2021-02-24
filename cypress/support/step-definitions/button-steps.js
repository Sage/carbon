import {
  buttonSubtextPreview,
  buttonDataComponent,
  buttonDataComponentIFrame,
} from "../../locators/button";
import { iconIFrame, icon } from "../../locators";
import { positionOfElement } from "../helper";

Then("Button label on preview is {word}", (label) => {
  buttonDataComponent().should("have.text", label);
});

Then("Button as a sibling label on preview is {word}", (label) => {
  buttonDataComponent()
    .eq(positionOfElement("first"))
    .should("have.text", label);
  buttonDataComponent()
    .eq(positionOfElement("second"))
    .should("have.text", label);
});

Then("Button as a sibling is disabled", () => {
  buttonDataComponent()
    .eq(positionOfElement("first"))
    .should("be.disabled")
    .and("have.attr", "disabled");
  buttonDataComponent()
    .eq(positionOfElement("second"))
    .should("be.disabled")
    .and("have.attr", "disabled");
});

Then("Button as a sibling is enabled", () => {
  buttonDataComponent().eq(positionOfElement("first")).should("be.enabled");
  buttonDataComponent().eq(positionOfElement("second")).should("be.enabled");
});

Then("Button as a sibling height is {int}", (height) => {
  buttonDataComponent()
    .eq(positionOfElement("first"))
    .should("have.css", "height", `${height}px`);
  buttonDataComponent()
    .eq(positionOfElement("second"))
    .should("have.css", "height", `${height}px`);
});

Then("Button subtext on preview is {word}", (subtext) => {
  buttonSubtextPreview().should("have.text", subtext);
});

Then("Button as a sibling subtext on preview is {word}", (subtext) => {
  buttonSubtextPreview()
    .eq(positionOfElement("first"))
    .should("have.text", subtext);
  buttonSubtextPreview()
    .eq(positionOfElement("second"))
    .should("have.text", subtext);
});

Then("Button font color is {string}", (color) => {
  buttonDataComponent().should("have.css", "color", color);
});

Then("Button as a sibling background color is {string}", (color) => {
  buttonDataComponent()
    .eq(positionOfElement("first"))
    .should("have.css", "background-color", color);
  buttonDataComponent()
    .eq(positionOfElement("second"))
    .should("have.css", "background-color", color);
});

When("I click on {string}", (element) => {
  buttonDataComponentIFrame(element).click({ force: true });
});

When("I click on {string} as a sibling", (element) => {
  buttonDataComponentIFrame(element).eq(positionOfElement("first")).click();
  buttonDataComponentIFrame(element).eq(positionOfElement("second")).click();
});

Then("Button as a sibling icon is set to {string}", (iconName) => {
  iconIFrame()
    .eq(positionOfElement("first"))
    .should("have.attr", "data-element", iconName)
    .and("be.visible");
  iconIFrame()
    .eq(positionOfElement("second"))
    .should("have.attr", "data-element", iconName)
    .and("be.visible");
});

Then("Button as a sibling icon position is set to {string}", (iconPosition) => {
  if (iconPosition === "after") {
    icon()
      .eq(positionOfElement("first"))
      .should("have.css", "margin-right", "0px");
    icon()
      .eq(positionOfElement("second"))
      .should("have.css", "margin-right", "0px");
  } else {
    icon()
      .eq(positionOfElement("first"))
      .should("have.css", "margin-right", "8px");
    icon()
      .eq(positionOfElement("second"))
      .should("have.css", "margin-right", "8px");
  }
});
