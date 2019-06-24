import { STORY_ROOT } from '../locators';

// no iFrame locators
export const getComponentNoIframe = component => cy.get(`[data-component="${component}"]`);
export const commonButtonPreviewNoIframe = () => cy.get(STORY_ROOT).find('button');
