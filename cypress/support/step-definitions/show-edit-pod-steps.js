import {
  showEditPodEdit,
  showEditPodCancelButton,
  showEditPodSaveButton,
  showEditPodDeleteButton,
  showEditPodTitle,
  showEditPodEditIFrame,
  showEditPodCancelButtonIFrame,
  showEditPodDeleteButtonIFrame,
} from "../../locators/show-edit-pod";

Then("Show Edit Pod saveText on preview is set to {word}", (text) => {
  showEditPodSaveButton().should("have.text", text);
});

Then("Show Edit Pod cancelText on preview is set to {word}", (text) => {
  showEditPodCancelButton().should("have.text", text);
});

Then("Show Edit Pod deleteText on preview is set to {word}", (text) => {
  showEditPodDeleteButton().should("have.text", text);
});

Then("Show Edit Pod title on preview is set to {word}", (text) => {
  showEditPodTitle().should("have.text", text);
});

When("I click edit Show Edit Pod component", () => {
  showEditPodEdit().first().click();
});

When("I click edit Show Edit Pod component in Iframe", () => {
  showEditPodEditIFrame().first().click();
});

Then("Show Edit Pod component hasn't a cancel button", () => {
  showEditPodCancelButton().should("not.exist");
});

Then("Show Edit Pod component has saving property", () => {
  showEditPodSaveButton()
    .should("be.disabled")
    .and(
      "have.css",
      "background",
      "rgb(230, 235, 237) none repeat scroll 0% 0% / auto padding-box border-box"
    )
    .and("have.css", "border", "2px solid rgba(0, 0, 0, 0)")
    .and("have.css", "color", "rgba(0, 0, 0, 0.3)")
    .and("have.attr", "disabled");
});

When("I click delete button", () => {
  showEditPodDeleteButtonIFrame().click();
});

When("I click cancel button", () => {
  showEditPodCancelButtonIFrame().click();
});
