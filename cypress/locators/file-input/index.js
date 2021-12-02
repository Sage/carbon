import { dlsRoot, getDataElementByValue } from "..";
import { FILE_INPUT, FOR_FILE_UPLOAD } from "./locators";

export const fileInput = () => cy.get(FILE_INPUT);
export const fileTitle = (text) =>
  getDataElementByValue(FOR_FILE_UPLOAD).find("span").contains(text);
export const fewFilesSelected = (amount) =>
  getDataElementByValue(FOR_FILE_UPLOAD)
    .find("span")
    .contains(`${amount} files selected`);
export const buttonType = (buttonName) =>
  getDataElementByValue("main-text").contains(buttonName);
export const validationPreview = (text) =>
  dlsRoot().find("span").contains(text);
