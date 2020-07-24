import { BADGE, BADGE_COUNTER } from './locators';

// component preview locators in NoIFrame
export const badgeNoIFrame = () => cy.get(BADGE);
export const badgeCounterNoIFrame = () => badgeNoIFrame().find(BADGE_COUNTER);

// component preview locators
export const badge = () => cy.iFrame(BADGE);