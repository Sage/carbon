import { TABS } from './locators';

// component preview locators
export const tabs = () => cy.iFrame(TABS);
export const tabById = id => cy.iFrame(`[data-tabid="tab-${id}"]`);
export const tabContentById = id => cy.iFrame(`[title="Tab ${id}"]`);
