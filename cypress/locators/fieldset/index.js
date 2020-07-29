import { LEGEND_PREVIEW, FIELDSET_DATA_COMPONENT } from './locators';

// component preview locators
export const legendPreview = () => cy.get(LEGEND_PREVIEW);
export const fieldsetFieldName = index => cy.get(FIELDSET_DATA_COMPONENT)
  .find(`div:nth-child(${index})`)
  .find('div > label');
