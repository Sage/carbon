import {
  POD_PREVIEW, POD_EDIT_ICON, POD_FOOTER, POD_CHILDREN,
  POD_TITLE, POD_SUBTITLE, POD_DESCRIPTION,
} from './locators';

// component preview locators
export const podPreview = () => cy.iFrame(POD_PREVIEW);
export const podPreviewBorder = () => cy.iFrame(POD_PREVIEW)
  .then($el => $el.children());
export const podFooter = () => cy.iFrame(POD_FOOTER);
export const podEdit = () => cy.iFrame(POD_EDIT_ICON);
export const podChildren = () => cy.iFrame(POD_CHILDREN);
export const podTitle = () => cy.iFrame(POD_TITLE);
export const podSubTitle = () => cy.iFrame(POD_SUBTITLE);
export const podDescription = () => cy.iFrame(POD_DESCRIPTION);
