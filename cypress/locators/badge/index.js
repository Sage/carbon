import { BADGE, BADGE_COUNTER, BADGE_CROSS_ICON } from "./locators";

// component preview locators
export const badge = () => cy.get(BADGE);
export const badgeCounter = () => badge().find(BADGE_COUNTER);
export const badgeCrossIcon = () => cy.get(BADGE_CROSS_ICON);
