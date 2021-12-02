import { getComponent, getDataElementByValue } from "../../locators";
import {
  buttonType,
  fewFilesSelected,
  fileInput,
  fileTitle,
  validationPreview,
} from "../../locators/file-input/index";
import { loaderBarComponent } from "../../locators/themes";
import { positionOfElement } from "../helper";

When(
  "I attach the file {string} to the {string} input",
  (file, indexOfInput) => {
    fileInput()
      .eq(positionOfElement(indexOfInput))
      // HTML5 file input
      .attachFile(`fileInput/${file}`);
  }
);

When("I attach few files to the {string} input", (indexOfInput) => {
  fileInput()
    .eq(positionOfElement(indexOfInput))
    // Attaching multiple files
    .attachFile(["fileInput/file.png", "fileInput/file.mov"]);
});

When(
  "I drag&drop the file {string} to the {string} input",
  (file, indexOfInput) => {
    fileInput()
      .eq(positionOfElement(indexOfInput))
      // HTML5 & Drag-n-drop component file input
      .attachFile(`fileInput/${file}`, { subjectType: "drag-n-drop" });
  }
);

When("I drag&drop few files to the {string} input", (indexOfInput) => {
  fileInput()
    .eq(positionOfElement(indexOfInput))
    // Attaching multiple files using Drag-n-drop
    .attachFile(["fileInput/file.png", "fileInput/file.mov"], {
      subjectType: "drag-n-drop",
    });
});

Then("{string} file should be attached to the File Input", (file) => {
  fileTitle(file).should("be.visible");
  getDataElementByValue("action")
    .children()
    .should("have.attr", "tabindex", "0")
    .and("have.attr", "target", "_blank");
  getComponent("link").should("be.visible");
});

Then("{int} files should be attached to the File Input", (amount) => {
  fewFilesSelected(amount)
    .should("be.visible")
    .should("not.have.attr", "data-component", "link");
});

Then("{string} button is visible", (buttonName) => {
  buttonType(buttonName).should("be.visible");
});

Then("Loader bar is visible when isUploading", () => {
  loaderBarComponent().should("be.visible");
});

Then("Loader bar should not exist", () => {
  loaderBarComponent().should("not.exist");
});

When("I click {string} button", (buttonName) => {
  buttonType(buttonName).click();
});

Then("validation {string} info is presented", (text) => {
  validationPreview(text).should("be.visible");
});

Then("File Input should be empty", () => {
  fileInput().should("be.empty");
});
