import { MULTI_ACTION_BUTTON_LIST, MULTI_ACTION_BUTTON_SUBTEXT, MULTI_ACTION_BUTTON_TEXT, MULTI_ACTION_BUTTON_COMPONENT } from './locators';
import { BUTTON_SUBTEXT_PREVIEW } from '../button/locators';
import { BUTTON_DATA_COMPONENT } from '../pages/locators';

// component preview locators
export const multiActionButtonComponent = () => cy.iFrame(MULTI_ACTION_BUTTON_COMPONENT);
export const multiActionButtonList = () => cy.iFrame(MULTI_ACTION_BUTTON_LIST).children();
export const multiActionButtonText = () => multiActionButtonComponent()
  .find(BUTTON_DATA_COMPONENT);
export const multiActionButton = () => multiActionButtonComponent()
  .find('button');
