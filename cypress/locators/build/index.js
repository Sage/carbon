import { STORY_ROOT } from '../locators';

// no iFrame locators
export const getComponentNoIframe = component => cy.get(`[data-component="${component}"]`);
export const getElementNoIframe = element => cy.get(`[data-element="${element}"]`).first();
export const getElementNoIframeByName = element => cy.get(`[name="${element}"]`);
export const commonButtonPreviewNoIframe = () => cy.get(STORY_ROOT).find('button');
