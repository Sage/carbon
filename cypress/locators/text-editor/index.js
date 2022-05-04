import { LINK } from "../locators";
import {
  TEXT_EDITOR_CONTAINER,
  TEXT_EDITOR_COUNTER,
  TEXT_EDITOR_INPUT,
  TEXT_EDITOR_TOOLBAR,
} from "./locators";

// component preview locators
export const textEditorCounter = () => cy.get(TEXT_EDITOR_COUNTER);
export const textEditorInput = () => cy.get(TEXT_EDITOR_INPUT);
export const textEditorToolbar = (buttonType) =>
  cy
    .get(TEXT_EDITOR_TOOLBAR)
    .find("div")
    .find(`button[aria-label="${buttonType}"]`);
export const innerText = () => textEditorInput().find('span[data-text="true"]');
export const innerTextList = (typeOfList, index) =>
  textEditorInput()
    .find(`${typeOfList}`)
    .find(`li:nth-child(${index})`)
    .find("div");
export const innerTextLink = () => textEditorInput().find(LINK).children();
export const textEditorContainer = () => cy.get(TEXT_EDITOR_CONTAINER);
