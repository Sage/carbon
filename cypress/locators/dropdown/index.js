import { FORM } from '../locators';
import {
  DROPDOWN_INPUT, DROPDOWN_COMPONENT, DROPDOWN_LABEL,
} from './locators';

// knobs locators
export const readOnlyCheckbox = () => cy.get(FORM).contains('readOnly').find('input');

// component preview locators
export const dropdownInputPreview = () => cy.iFrame(DROPDOWN_INPUT);
export const dropdownComponentPreview = () => cy.iFrame(DROPDOWN_COMPONENT);
export const dropdownLabelPreview = () => cy.iFrame(DROPDOWN_LABEL);
