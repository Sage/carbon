import {
  SHOW_EDIT_POD_TITLE,
  SHOW_EDIT_SAVE_BUTTON,
  SHOW_EDIT_CANCEL_BUTTON,
  SHOW_EDIT_DELETE_BUTTON,
  SHOW_EDIT_POD_EDIT,
  SHOW_EDIT_POD,
  SHOW_EDIT_POD_CONTENT_BOX,
} from "./locators";

// component preview locators
export const showEditPodComponent = () => cy.get(SHOW_EDIT_POD);
export const showEditPodTitle = () => cy.get(SHOW_EDIT_POD_TITLE);
export const showEditPodSaveButton = () => cy.get(SHOW_EDIT_SAVE_BUTTON);
export const showEditPodCancelButton = () => cy.get(SHOW_EDIT_CANCEL_BUTTON);
export const showEditPodDeleteButton = () => cy.get(SHOW_EDIT_DELETE_BUTTON);
export const showEditPodEdit = () => cy.get(SHOW_EDIT_POD_EDIT);
export const showEditPodCollapsibleInnerContent = (element, index) =>
  cy
    .get(SHOW_EDIT_POD_CONTENT_BOX)
    .find("div")
    .eq(1)
    .find(`[data-element=${element}]`)
    .eq(index);
export const showEditPodEditIFrame = () => cy.iFrame(SHOW_EDIT_POD_EDIT);
export const showEditPodCancelButtonIFrame = () =>
  cy.iFrame(SHOW_EDIT_CANCEL_BUTTON);
export const showEditPodDeleteButtonIFrame = () =>
  cy.iFrame(SHOW_EDIT_DELETE_BUTTON);
