import { NUMERAL_DATE_COMPONENT, NUMERAL_DATE_DEFAULT_ID } from './locators';
import { DATE_INPUT } from '../date-input/locators';

export const numeralDateComponent = () => cy.iFrame(NUMERAL_DATE_COMPONENT);
export const numeralDateInput = () => numeralDateComponent().find(DATE_INPUT);
export const numeralDateInputByPosition = index => numeralDateInput().eq(index);

// DS locators
export const numeralDateDefaultDS = () => cy.iFrame(NUMERAL_DATE_DEFAULT_ID)
  .find(NUMERAL_DATE_COMPONENT).find(DATE_INPUT);
export const numeralDateInputByPositionDS = index => numeralDateDefaultDS().eq(index);
