import { alertChildren, alertDialogPreview } from "../../locators/dialog";

Then("Alert height is set to {string}", (height) => {
  const { viewportHeight } = Cypress.config();

  let resultHeight;
  if (height >= viewportHeight - 20) {
    resultHeight = viewportHeight - 20;
  } else {
    resultHeight = height;
  }

  alertDialogPreview()
    .should("have.css", "height")
    .and("contain", `${resultHeight}px`);
});

Then("Alert size property on preview is {string}", (size) => {
  alertDialogPreview().should("have.css", "width", `${size}px`);
});

Then("Alert children on preview is {word}", (children) => {
  alertChildren().should("have.text", children);
});

Then("Alert is not visible", () => {
  alertDialogPreview().should("not.exist");
});

Then("Alert is visible in NoIFrame", () => {
  alertDialogPreview().should("be.visible");
});
