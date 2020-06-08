import {
  DRAWER_TOGGLE,
} from './locators';

// component preview locators
export const drawerToggle = drawer => cy.iFrame(`#${drawer}`).find(DRAWER_TOGGLE);
export const drawerSidebar = drawer => cy.iFrame(`#${drawer}`).find('div:nth-child(1)');
export const drawerSidebarContentInnerElement = (drawer, index) => drawerSidebar(drawer).find('div').find(`li:nth-child(${index})`);
