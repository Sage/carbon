import { TABS } from './locators';

// component preview locators
export const tabs = () => cy.get(TABS);
export const tabById = id => cy.get(`[data-tabid="tab-${id}"]`);
export const tabContentById = id => cy.get(`[aria-labelledby="tab-${id}-tab"]`);
