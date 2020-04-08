import {
  POD_DATA_COMPONENT, POD_EDIT_ICON, POD_FOOTER, POD_CONTENT,
  POD_TITLE, POD_SUBTITLE, POD_DESCRIPTION,
} from './locators';

// component preview locators
export const podComponent = () => cy.iFrame(POD_DATA_COMPONENT);
export const podPreview = () => cy.iFrame(POD_DATA_COMPONENT).children();
export const podFooter = () => podComponent().find(POD_FOOTER);
export const podEdit = () => podComponent().find(POD_EDIT_ICON);
export const podContent = () => podComponent().find(POD_CONTENT);
export const podTitle = () => cy.iFrame(POD_TITLE);
export const podSubTitle = () => cy.iFrame(POD_SUBTITLE);
export const podDescription = () => cy.iFrame(POD_DESCRIPTION);
