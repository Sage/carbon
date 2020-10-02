import {
  SELECT,
  SELECT_INPUT,
  CONTROLLED_SELECT_ID,
  SELECT_OPTIONS,
  DROPDOWN_BUTTON,
  CONTROLLED_LABEL,
  SELECT_LIST,
  SELECT_BASIC,
  OPEN_ON_FOCUS_ID,
  MULTI_SELECT,
} from './locators';
import { PILL_PREVIEW } from '../pill/locators';

// component preview locators
export const select = () => cy.get(SELECT).find('input');
export const selectPill = index => cy.get(SELECT)
  .find('div[role="presentation"]')
  .find(`div:nth-child(${index})`)
  .find(PILL_PREVIEW);
export const selectInput = () => cy.get(SELECT_INPUT);
export const simpleSelectID = () => cy.get(CONTROLLED_SELECT_ID);
export const selectDataComponent = component => cy.get(`[data-component="${component}-select"]`);
export const selectList = () => cy.get(SELECT_LIST);
export const selectOption = index => cy.get(SELECT_OPTIONS).eq(index);
export const dropdownButton = () => cy.get(DROPDOWN_BUTTON);
export const controlledLabel = () => cy.get(CONTROLLED_LABEL);
export const simpleSelectNoIframe = () => cy.get(SELECT_BASIC);


// component preview locators into iFrame
export const selectInputIframe = () => cy.iFrame(SELECT_INPUT);
export const selectPillIframe = index => cy.iFrame(SELECT)
  .find('div[role="presentation"]')
  .find(`div:nth-child(${index})`)
  .find(PILL_PREVIEW);
export const simpleSelectIframe = () => cy.iFrame(SELECT_BASIC);
export const dropdownButtonInIframe = () => cy.iFrame(DROPDOWN_BUTTON);
export const selectDataComponentInIframe = component => cy.iFrame(`[data-component="${component}-select"]`);
export const selectListInIframe = () => cy.iFrame(SELECT_LIST);
export const selectOptionInIframe = index => cy.iFrame(SELECT_OPTIONS).eq(index);
export const multiSelectDataComponentInIframe = () => cy.iFrame(MULTI_SELECT);
export const openOnFocusID = () => cy.get(OPEN_ON_FOCUS_ID);
export const multiSelectPill = () => cy.get(PILL_PREVIEW);
export const multiSelectPillByPosition = index => cy.get(PILL_PREVIEW).eq(index);
export const multiSelectDataComponent = () => cy.get(MULTI_SELECT);
