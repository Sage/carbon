import {
  POD_DATA_COMPONENT,
  POD_EDIT_ICON,
  POD_FOOTER,
  POD_CONTENT,
  POD_SUBTITLE,
  POD_SOFT_DELETE,
  POD_EDIT_CONTAINER,
  POD_DELETE,
} from "./locators";

// component preview locators
export const podComponent = () => cy.get(POD_DATA_COMPONENT);
export const podFooter = () => podComponent().find(POD_FOOTER);
export const divPodComponent = () => cy.get(POD_DATA_COMPONENT).find("div");
export const podTitle = () => cy.get(POD_CONTENT).find("div").find("h4");
export const podSubTitle = () => cy.get(POD_SUBTITLE);
export const podSoftDelete = () => cy.get(POD_SOFT_DELETE);
export const podDelete = () => cy.get(POD_DELETE);
export const podUndo = () => cy.get(POD_SOFT_DELETE).find("span");
export const podContent = () => cy.get(POD_CONTENT);
export const podEdit = () => podComponent().find(POD_EDIT_ICON);
export const podEditContainer = () => cy.get(POD_EDIT_CONTAINER);
