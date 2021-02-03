import {
  ANCHOR_NAVIGATION,
  ANCHOR_NAVIGATION_STICKY_NAVIGATION,
} from "./locators";

// component preview locators
export const anchorNavigation = () => cy.get(ANCHOR_NAVIGATION);
export const anchorNavigationStickyNavigation = (text) =>
  anchorNavigation().find(ANCHOR_NAVIGATION_STICKY_NAVIGATION).contains(text);
export const anchorNavigationStickyMainPage = (text) =>
  anchorNavigation().find("div > h2").contains(text);
