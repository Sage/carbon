import { SELECT, SELECT_INPUT } from './locators';
import { PILL_PREVIEW } from '../pill/locators';

// component preview locators
export const select = () => cy.iFrame(SELECT).find('input');
export const selectInput = () => cy.iFrame(SELECT_INPUT);
export const selectPill = index => cy.iFrame(SELECT)
  .find(`div:nth-child(${index})`)
  .find(PILL_PREVIEW);

// component preview locators into iFrame
export const selectInputNoIframe = () => cy.get(SELECT_INPUT);
