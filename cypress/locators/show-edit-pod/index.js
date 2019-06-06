import {
  SHOW_EDIT_POD_PREVIEW, SHOW_EDIT_POD_TITLE, SHOW_EDIT_POD_COLLAPSIBLE_CONTENT,
  SHOW_EDIT_SAVE_BUTTON, SHOW_EDIT_CANCEL_BUTTON, SHOW_EDIT_DELETE_BUTTON,
  SHOW_EDIT_POD_EDIT, SHOW_EDIT_POD_SECONDARY_BLOCK, SHOW_EDIT_POD_SECONDARY_WRAPPER,
} from './locators';

// component preview locators
export const showEditPodPreview = () => cy.iFrame(SHOW_EDIT_POD_PREVIEW).children();
export const showEditPodTitle = () => cy.iFrame(SHOW_EDIT_POD_TITLE);
export const showEditPodSaveButton = () => cy.iFrame(SHOW_EDIT_SAVE_BUTTON);
export const showEditPodCancelButton = () => cy.iFrame(SHOW_EDIT_CANCEL_BUTTON);
export const showEditPodDeleteButton = () => cy.iFrame(SHOW_EDIT_DELETE_BUTTON);
export const showEditPodEdit = () => cy.iFrame(SHOW_EDIT_POD_EDIT);
export const showEditPodSecondaryBlock = () => cy.iFrame(SHOW_EDIT_POD_SECONDARY_BLOCK);
export const showEditPodSecondaryWrapper = () => cy.iFrame(SHOW_EDIT_POD_SECONDARY_WRAPPER);
export const showEditPodCollapsibleInnerContent = (index, element) => cy.iFrame(SHOW_EDIT_POD_COLLAPSIBLE_CONTENT)
  .find(`div:nth-child(${index})`).find(`[data-element=${element}]`);
