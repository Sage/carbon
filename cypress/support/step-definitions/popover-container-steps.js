import {
  popoverContainerContent,
  popoverContainerTitle,
  popoverContainerContentSecondInnerElement,
  popoverCloseIcon,
  popoverSettingsIconNoIFrame,
} from "../../locators/popover-container";
import { keyCode } from "../helper";

Then("Popover container is visible", () => {
  popoverContainerContent().should("exist");
  popoverSettingsIconNoIFrame().should("exist");
  popoverContainerContent().should("be.visible");
  popoverContainerContent()
    .should("have.css", "background-color", "rgb(255, 255, 255)")
    .and(
      "have.css",
      "box-shadow",
      "rgba(0, 20, 29, 0.2) 0px 5px 5px 0px, rgba(0, 20, 29, 0.1) 0px 10px 10px 0px"
    );
  popoverContainerContentSecondInnerElement()
    .should("have.attr", "data-element", "popover-container-close-component")
    .and("be.visible");
  popoverContainerContentSecondInnerElement()
    .children()
    .should("have.attr", "data-element", "close")
    .and("be.visible");
});

Then("Popover title on preview is set to {word}", (title) => {
  popoverContainerTitle().should("have.text", title);
});

Then("Popover container is not visible", () => {
  popoverContainerContent().should("not.exist");
});

When("I click onto popover setting icon using {string} key", (key) => {
  popoverSettingsIconNoIFrame().trigger("keydown", keyCode(key));
});

Then("I press onto closeIcon using {string} key", (key) => {
  popoverCloseIcon().trigger("keydown", keyCode(key));
});

When("I click popover close icon", () => {
  popoverCloseIcon().click();
});

When("I open popover container in NoIFrame", () => {
  popoverSettingsIconNoIFrame().click();
});
