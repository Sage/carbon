import {
  popoverContainerContent,
  popoverContainerTitle,
  popoverContainerContentSecondInnerElement,
  popoverSettingsIcon,
  popoverCloseIcon,
  popoverSettingsIconRightAligned,
  popoverSettingsIconCover,
  popoverSettingsIconNoIFrame,
} from "../../locators/popover-container";
import { keyCode } from "../helper";

When("I open popover container", () => {
  popoverSettingsIcon().click();
});

When("I open popover container in open component", () => {
  popoverSettingsIconCover().click();
});

Then("Popover container is visible", () => {
  popoverContainerContent().should("exist");
  popoverSettingsIcon().should("exist");
  popoverContainerContent().should("be.visible");
  popoverContainerContent()
    .should("have.css", "background-color", "rgb(255, 255, 255)")
    .and(
      "have.css",
      "box-shadow",
      "rgba(0, 20, 29, 0.2) 0px 5px 5px 0px, rgba(0, 20, 29, 0.1) 0px 10px 10px 0px"
    )
    .and("have.css", "padding", "16px 24px")
    .and("have.css", "min-width", "300px")
    .and("have.css", "position", "absolute")
    .and("have.css", "left", "0px")
    .and("have.css", "opacity", "1");
  popoverContainerContentSecondInnerElement()
    .should("have.attr", "data-element", "popover-container-close-component")
    .and("be.visible")
    .and("have.css", "position", "absolute")
    .and("have.css", "top", "16px")
    .and("have.css", "right", "24px")
    .and("have.css", "background-color", "rgba(0, 0, 0, 0)")
    .and("have.css", "border", "0px none rgba(0, 0, 0, 0.9)")
    .and("have.css", "padding", "0px");
  popoverContainerContentSecondInnerElement()
    .children()
    .should("have.attr", "data-element", "close")
    .and("be.visible")
    .and("have.css", "color", "rgba(0, 0, 0, 0.9)")
    .and("have.css", "position", "relative");
});

Then("Popover title on preview is set to {word}", (title) => {
  popoverContainerTitle().should("have.text", title);
});

Then("opening icon is on the {string} side", (side) => {
  if (side === "left") {
    popoverSettingsIcon().parent().should("not.have.css", "float", "right");
  } else {
    popoverSettingsIconRightAligned()
      .parent()
      .should("have.css", "float", "right");
    popoverSettingsIconRightAligned()
      .children()
      .should("have.attr", "aria-label", "Right Aligned");
  }
});

Then("Popover component is opened the {string} side", (side) => {
  if (side === "left") {
    popoverSettingsIcon().click();
    popoverSettingsIcon().should("have.css", "right", "0px");
  } else {
    popoverSettingsIconRightAligned().click();
    popoverSettingsIconRightAligned().should("have.css", "right", "0px");
  }
});

Then("Popover container is not visible", () => {
  popoverContainerContent().should("not.exist");
});

When("I click onto popover setting icon using {string} key", (key) => {
  popoverSettingsIcon().trigger("keydown", keyCode(key));
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
