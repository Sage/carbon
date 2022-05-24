import { DRAWER, DRAWER_SIDEBAR, DRAWER_TOGGLE } from "./locators";

// component preview locators
export const drawerToggle = () => cy.get(DRAWER_TOGGLE);
export const drawer = () => cy.get(DRAWER);
export const drawerSidebar = () => cy.get(DRAWER_SIDEBAR);
export const drawerSidebarContentInnerElement = (index) =>
  drawerSidebar().find("li").eq(index);
