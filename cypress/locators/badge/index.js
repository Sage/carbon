import { BADGE, BADGE_COUNTER } from "./locators";

// component preview locators in NoIFrame
export const badge = () => cy.get(BADGE);
export const badgeCounter = () => badge().find(BADGE_COUNTER);
