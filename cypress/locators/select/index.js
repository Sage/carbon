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
export const select = () => cy.iFrame(SELECT).find('input');
export const selectInput = () => cy.iFrame(SELECT_INPUT);
export const selectPill = index => cy.iFrame(SELECT)
  .find('div[role="presentation"]')
  .find(`div:nth-child(${index})`)
  .find(PILL_PREVIEW);

// component preview locators into iFrame
export const selectInputNoIframe = () => cy.get(SELECT_INPUT);

// locators into DS
export const simpleSelectID = () => cy.iFrame(CONTROLLED_SELECT_ID);
export const selectDataComponent = (index, component) => cy.iFrame(`[data-component="${component}-select"]`).eq(index);
export const multiSelectDataComponent = index => cy.iFrame(MULTI_SELECT).eq(index);
export const selectList = () => cy.iFrame(SELECT_LIST);
export const selectOption = index => cy.iFrame(SELECT_OPTIONS).eq(index);
export const dropdownButton = index => cy.iFrame(DROPDOWN_BUTTON).eq(index);
export const controlledLabel = () => cy.iFrame(CONTROLLED_LABEL);
export const openOnFocusID = () => cy.iFrame(OPEN_ON_FOCUS_ID);
export const multiSelectPill = () => cy.iFrame(PILL_PREVIEW);
export const multiSelectPillByPosition = index => cy.iFrame(PILL_PREVIEW).eq(index);

export const simpleSelectNoIframe = () => cy.get(SELECT_BASIC);
export const simpleSelectIframe = () => cy.iFrame(SELECT_BASIC);
