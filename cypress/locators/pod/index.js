import {
  POD,
  POD_BLOCK,
  POD_TITLE,
  POD_SUBTITLE,
  POD_CONTENT,
  POD_FOOTER,
  POD_EDIT,
  POD_DELETE,
  POD_UNDO,
} from "./locators";

// component preview locators
export const podComponent = () => cy.get(POD);
export const podBlock = () => cy.get(POD_BLOCK);
export const podTitle = () => cy.get(POD_TITLE);
export const podSubTitle = () => cy.get(POD_SUBTITLE);
export const podContent = () => cy.get(POD_CONTENT);
export const podFooter = () => cy.get(POD_FOOTER);
export const podEdit = () => cy.get(POD_EDIT);
export const podEditIcon = () => podEdit().find("span");
export const podDelete = () => cy.get(POD_DELETE);
export const podDeleteIcon = () => podDelete().find("span");
export const podUndo = () => cy.get(POD_UNDO);
export const podUndoIcon = () => podUndo().find("span");
