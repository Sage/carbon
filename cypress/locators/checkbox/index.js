import {
  CHECKBOX_COMMON_INPUT_FIELD, CHECKBOX_LABEL,
  CHECKBOX, CHECKBOX_DATA_COMPONENT, CHECKBOX_DATA_COMPONENT_GROUP,
} from './locators';
import { LABEL } from '../locators';

// component preview locators
export const checkboxCommonInputField = () => cy.iFrame(CHECKBOX_COMMON_INPUT_FIELD);
export const checkboxLabelPreview = () => cy.iFrame(CHECKBOX_LABEL);
export const checkboxDataComponent = () => cy.iFrame(CHECKBOX_DATA_COMPONENT);
export const checkboxRole = () => cy.iFrame(CHECKBOX);

// component preview locators in no iFrame
export const checkbox = position => cy.get(CHECKBOX).eq(position);
export const checkboxRoleNoIFrame = () => cy.get(CHECKBOX);
export const checkboxByID = element => cy.get(`[id="checkbox_${element}-help"]`);
export const dataComponentGroup = () => cy.get(CHECKBOX_DATA_COMPONENT_GROUP);
export const labelForIconInCheckboxGroup = () => dataComponentGroup().find(LABEL).find('div').eq(1);
