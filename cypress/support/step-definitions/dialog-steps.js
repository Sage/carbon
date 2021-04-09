import {
  alertDialogPreview as dialogPreview,
  dialogStickyFormFooter,
  openPreviewButton,
} from "../../locators/dialog/index";
import { backgroundUILocator, dlsRoot } from "../../locators/index";

Then("Dialog height is set to {int}", (height) => {
  dialogPreview()
    .should("have.attr", "style")
    .should("contain", `min-height: ${height}px`);
});

Then("Dialog height is not set to {word}", (height) => {
  dialogPreview()
    .should("have.attr", "style")
    .should("not.contain", `min-height: ${height}px`);
});

Then("Dialog size property on preview is {string}", (size) => {
  dialogPreview().should("have.css", "width", `${size}px`);
});

Then("Dialog is not visible", () => {
  dialogPreview().should("not.exist");
});

When("I click on {string} outside dialog", (position) => {
  dlsRoot().click(position, { force: true });
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

Then("The footer is not sticky", () => {
  dialogStickyFormFooter().should("not.have.class", "sticky");
});

When("I click on Open Preview button", () => {
  openPreviewButton().click();
});
