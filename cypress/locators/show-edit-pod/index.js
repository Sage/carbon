import {
  SHOW_EDIT_POD_TITLE, SHOW_EDIT_SAVE_BUTTON, SHOW_EDIT_CANCEL_BUTTON, SHOW_EDIT_DELETE_BUTTON,
  SHOW_EDIT_POD_EDIT, SHOW_EDIT_POD_SECONDARY_BLOCK, SHOW_EDIT_POD_FOOTER, SHOW_EDIT_POD, SHOW_EDIT_POD_CONTENT_BOX,
} from './locators';

// component preview locators
export const showEditPodComponent = () => cy.iFrame(SHOW_EDIT_POD);
export const showEditPodTitle = () => cy.iFrame(SHOW_EDIT_POD_TITLE);
export const showEditPodSaveButton = () => cy.iFrame(SHOW_EDIT_SAVE_BUTTON);
export const showEditPodCancelButton = () => cy.iFrame(SHOW_EDIT_CANCEL_BUTTON);
export const showEditPodDeleteButton = () => cy.iFrame(SHOW_EDIT_DELETE_BUTTON);
export const showEditPodEdit = () => cy.iFrame(SHOW_EDIT_POD_EDIT);
export const showEditPodSecondaryBlock = () => cy.iFrame(SHOW_EDIT_POD_SECONDARY_BLOCK);
export const showEditPodCollapsibleInnerContent = (element, index) => cy.iFrame(SHOW_EDIT_POD_CONTENT_BOX).find('div').eq(1).find(`[data-element=${element}]`)
  .eq(index);
export const showEditPodFooter = () => cy.iFrame(SHOW_EDIT_POD_FOOTER).children();
