import {
  dialogPreview,
  dialogSubtitle,
  confirmButton,
  cancelButton,
} from "../../locators/confirm";
import { getDataElementByValue, icon } from "../../locators";
import { positionOfElement } from "../helper";

Then("component subtitle on preview is {word}", (subtitle) => {
  dialogSubtitle().should("have.text", subtitle);
});

When("I click on a cancelButton", () => {
  cancelButton().click({ force: true });
});

When("I click on a confirmButton", () => {
  confirmButton().click();
});

Then("confirm button content on preview is {word}", (confirmButtonText) => {
  confirmButton().should("have.text", confirmButtonText);
});

Then("cancel button content on preview is {word}", (cancelButtonText) => {
  cancelButton().should("have.text", cancelButtonText);
});

Then("dialog title context on preview is {word}", (title) => {
  getDataElementByValue("title").should("have.text", title);
});

Then("Confirm dialog is visible", () => {
  dialogPreview().should("be.visible");
});

Then("Confirm dialog is not visible", () => {
  dialogPreview().should("not.exist");
});

Then("dialog subtitle context is {word}", (title) => {
  dialogSubtitle().should("have.text", title);
});

Then("Confirm dialog input height is {int}", (height) => {
  const { viewportHeight } = Cypress.config();

  let resultHeight;
  if (height >= viewportHeight - 20) {
    resultHeight = viewportHeight - 20;
  } else {
    resultHeight = height;
  }

  dialogPreview().should("have.css", "height", `${resultHeight}px`);
});

Then("Confirm dialog size property on preview is {int}", (size) => {
  dialogPreview().should("have.css", "width", `${size}px`);
});

Then("confirm button type is set to {string}", (buttonType) => {
  if (buttonType === "destructive") {
    confirmButton().should("have.css", "background-color", "rgb(205, 56, 75)");
  } else if (buttonType === "isLoadingConfirm") {
    confirmButton().should("be.disabled").and("have.attr", "disabled");
    confirmButton()
      .children()
      .children()
      .children()
      .should("have.attr", "data-component", "loader")
      .and("be.visible");
  } else {
    confirmButton().should("have.css", "background-color", "rgb(0, 129, 70)");
  }
});

Then("{word} icon is displayed on the header", (iconType) => {
  if (iconType === "empty") {
    icon().should("not.exist");
  } else {
    icon()
      .eq(positionOfElement("first"))
      .should("have.attr", "data-element", iconType);
  }
});

Then("cancel button type is set to {string}", (cancelButtonType) => {
  if (cancelButtonType === "tertiary") {
    cancelButton()
      .should("have.css", "color", "rgb(0, 129, 70)")
      .and("have.css", "border-color", "rgba(0, 0, 0, 0)");
  } else if (cancelButtonType === "destructive") {
    cancelButton()
      .should("have.css", "color", "rgb(205, 56, 75)")
      .and("have.css", "border-color", "rgba(0, 0, 0, 0)");
  } else {
    throw new Error(`cancelButtonType couldn't be set to ${cancelButtonType}`);
  }
});

Then("{string} button is disabled", (confirmButtonType) => {
  if (confirmButtonType === "cancel") {
    cancelButton().should("be.disabled").and("have.attr", "disabled");
  } else if (confirmButtonType === "confirm") {
    confirmButton().should("be.disabled").and("have.attr", "disabled");
  } else {
    throw new Error("confirmButton could be cancel or confirm only");
  }
});
