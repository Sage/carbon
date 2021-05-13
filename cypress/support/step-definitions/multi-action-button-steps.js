import {
  multiActionButtonList,
  multiActionButtonText,
  multiActionButton,
  multiActionButtonComponent,
} from "../../locators/multi-action-button";
import { buttonSubtextPreview } from "../../locators/button";

Then("Multi Action Button text on preview is set to {word}", (text) => {
  multiActionButtonText().should("have.text", text);
});

Then("Multi Action Button has {string} background-color", (color) => {
  multiActionButton().should("have.css", "background-color", color);
});

Then("Multi Action Button subtext on preview is {word}", (subtext) => {
  buttonSubtextPreview().should("have.text", subtext);
});

Then("Multi Action Button has golden border color", () => {
  multiActionButtonComponent().should(
    "have.css",
    "border",
    "rgb(255, 181, 0) solid 3px"
  );
});

When("I hover on Multi Action Button", () => {
  multiActionButtonComponent().trigger("mouseover");
});

Then("Multi Action Button is expanded and contains three items", () => {
  multiActionButtonList()
    .eq(0)
    .should("have.text", "Example Button")
    .and("be.visible");
  multiActionButtonList()
    .eq(1)
    .should("have.text", "Example Button with long text")
    .and("be.visible");
  multiActionButtonList().eq(2).should("have.text", "Short").and("be.visible");
});

Then(
  "Multi Action Button in a hidden container is expanded and contains three items",
  () => {
    multiActionButtonList()
      .eq(0)
      .should("have.text", "Button 1")
      .and("be.visible");
    multiActionButtonList()
      .eq(1)
      .should("have.text", "Button 2")
      .and("be.visible");
    multiActionButtonList()
      .eq(2)
      .should("have.text", "Button 3")
      .and("be.visible");
  }
);
