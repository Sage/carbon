import { getComponent } from "..";

export const theme = (themeName) => cy.get(`[data-theme="${themeName}"]`);
export const buttonToggleComponent = () =>
  getComponent("button-toggle").first().find("label");
export const linkComponent = () => getComponent("link");
export const loaderComponent = () => getComponent("loader").find("div");
export const loaderBarComponent = () => getComponent("loader-bar");
