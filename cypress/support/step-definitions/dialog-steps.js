import {
  alertDialogPreview as dialogPreview,
  openPreviewButton,
} from "../../locators/dialog/index";
import { backgroundUILocator } from "../../locators/index";

Then("Dialog height is set to {string}", (height) => {
  const { viewportHeight } = Cypress.config();

  let resultHeight;
  if (height >= viewportHeight - 20) {
    resultHeight = viewportHeight - 20;
  } else {
    resultHeight = height;
  }

  dialogPreview().should("have.css", "height", `${resultHeight}px`);
});

Then("Dialog size property on preview is {string}", (size) => {
  dialogPreview().should("have.css", "width", `${size}px`);
});

Then("Dialog is not visible", () => {
  dialogPreview().should("not.exist");
});

When("I click on background {string} outside dialog", (position) => {
  backgroundUILocator().click(position, { force: true });
});

Then("Dialog is visible", () => {
  dialogPreview().should("be.visible");
});

When("I scroll to the bottom of the dialog", () => {
  dialogPreview().children().eq(1).scrollTo("bottom");
});

When("I click on Open Preview button", () => {
  openPreviewButton().click();
});
