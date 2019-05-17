import { MULTI_ACTION_BUTTON_PREVIEW, MULTI_ACTION_BUTTON_LIST } from './locators';

// component preview locators
export const multiActionButtonPreview = () => cy.iFrame(MULTI_ACTION_BUTTON_PREVIEW);
export const multiActionButtonList = () => cy.iFrame(MULTI_ACTION_BUTTON_LIST).children();
