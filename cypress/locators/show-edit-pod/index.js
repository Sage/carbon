import {
  SHOW_EDIT_POD,
  SHOW_EDIT_POD_CONTENT_FORM,
  SHOW_EDIT_POD_HIDE_DELETE_BUTTON,
  SHOW_EDIT_POD_FORM_FOOTER,
  SHOW_EDIT_POD_CANCEL_BUTTON,
  SHOW_EDIT_POD_SAVE_BUTTON,
  SHOW_EDIT_POD_DELETE_BUTTON,
  SHOW_EDIT_POD_TITLE,
  SHOW_EDIT_POD_EDIT_CONTAINER,
  SHOW_EDIT_POD_UNDO_BUTTON,
  SHOW_EDIT_POD_TRANSITION_NAME,
} from "./locators";

// component preview locators
export const showEditPod = () => cy.get(SHOW_EDIT_POD).find("div");
export const showEditPodClassName = () => cy.get(SHOW_EDIT_POD);
export const showEditPodContentForm = () => cy.get(SHOW_EDIT_POD_CONTENT_FORM);
export const showEditPodHideDeleteButton = () =>
  cy.get(SHOW_EDIT_POD_HIDE_DELETE_BUTTON);
export const showEditPodFormFooter = () => cy.get(SHOW_EDIT_POD_FORM_FOOTER);
export const showEditPodCancelButton = () =>
  cy.get(SHOW_EDIT_POD_CANCEL_BUTTON);
export const showEditPodSaveButton = () => cy.get(SHOW_EDIT_POD_SAVE_BUTTON);
export const showEditPodDeleteButton = () =>
  cy.get(SHOW_EDIT_POD_DELETE_BUTTON);
export const showEditPodTitle = () => cy.get(SHOW_EDIT_POD_TITLE);
export const showEditPodEditContainer = () =>
  cy.get(SHOW_EDIT_POD_EDIT_CONTAINER);
export const showEditPodUndoButton = () => cy.get(SHOW_EDIT_POD_UNDO_BUTTON);
export const showEditPodTransitionName = () =>
  cy.get(SHOW_EDIT_POD_TRANSITION_NAME);
