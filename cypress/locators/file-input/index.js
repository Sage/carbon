import { getDataElementByValue } from "..";
import { FILE_INPUT, ATTACHED_FILE_NAME, FOR_FILE_UPLOAD } from "./locators";

export const fileInput = () => cy.get(FILE_INPUT);
export const fileTitle = (text) =>
  getDataElementByValue(ATTACHED_FILE_NAME).find("span").contains(text);
export const fewFilesSelected = (amount) =>
  cy
    .get(FOR_FILE_UPLOAD)
    .children()
    .children()
    .contains(`${amount} files selected.`);
export const buttonType = (buttonName) =>
  getDataElementByValue("main-text").contains(buttonName);
export const validationPreview = (text) =>
  cy.get(FOR_FILE_UPLOAD).parent().find("span").contains(text);
