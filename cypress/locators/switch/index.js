import { SWITCH_PREVIEW, SWITCH_DATA_COMPONENT } from './locators';
import { COMMMON_DATA_ELEMENT_INPUT } from '../locators';

// component preview locators
export const switchPreview = () => cy.iFrame(SWITCH_PREVIEW);
export const switchProperties = () => cy.iFrame(SWITCH_PREVIEW)
  .find('span');
export const switchInput = () => cy.iFrame(COMMMON_DATA_ELEMENT_INPUT);

// component preview locators into iFrame
export const switchDataComponent = position => cy.get(SWITCH_DATA_COMPONENT).find('input').eq(position);
