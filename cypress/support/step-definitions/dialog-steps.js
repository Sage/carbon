import {
  alertDialogPreview as dialogPreview,
  dialogStickyFormFooter,
  openPreviewButton,
} from "../../locators/dialog/index";
import { backgroundUILocatorIFrame, dlsRoot } from "../../locators/index";
import { dialogPreviewIFrame } from "../../locators/confirm";

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

Then("Dialog is visible in IFrame", () => {
  dialogPreviewIFrame().should("be.visible");
});

Then("Dialog is not visible in IFrame", () => {
  dialogPreviewIFrame().should("not.exist");
});

When("I click on {string} outside dialog", (position) => {
  dlsRoot().click(position, { force: true });
});

When("I click on background {string} outside dialog", (position) => {
  backgroundUILocatorIFrame().click(position, { force: true });
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
