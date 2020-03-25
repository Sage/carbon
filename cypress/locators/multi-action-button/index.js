import { MULTI_ACTION_BUTTON_LIST, MULTI_ACTION_BUTTON_SUBTEXT, MULTI_ACTION_BUTTON_TEXT, MULTI_ACTION_BUTTON_COMPONENT } from './locators';

// component preview locators
export const multiActionButtonComponent = () => cy.iFrame(MULTI_ACTION_BUTTON_COMPONENT);
export const multiActionButtonList = () => cy.iFrame(MULTI_ACTION_BUTTON_LIST).children();
export const multiActionButtonSubtext = () => cy.iFrame(MULTI_ACTION_BUTTON_SUBTEXT);
export const multiActionButtonText = () => multiActionButtonComponent()
  .find(MULTI_ACTION_BUTTON_TEXT);
export const multiActionButton = () => multiActionButtonComponent()
  .find('button');
