import { BADGE, BADGE_COUNTER } from './locators';

// component preview locators
export const badge = () => cy.iFrame(BADGE);
export const badgeCounter = () => badge().find(BADGE_COUNTER);
