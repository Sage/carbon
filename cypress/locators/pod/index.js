import {
  POD_DATA_COMPONENT,
  POD_BLOCK,
  POD_EDIT_ICON,
  POD_FOOTER,
  POD_CONTENT,
  POD_SUBTITLE,
} from "./locators";

// component preview locators
export const podComponent = () => cy.get(POD_DATA_COMPONENT);
export const podBlock = () => cy.get(POD_BLOCK);
export const podPreview = () => cy.get(POD_DATA_COMPONENT).children();
export const podFooter = () => podComponent().find(POD_FOOTER);
export const podContent = () => podComponent().find(POD_CONTENT);
export const podSubTitle = () => cy.get(POD_SUBTITLE);
export const podEdit = () => podComponent().find(POD_EDIT_ICON);
