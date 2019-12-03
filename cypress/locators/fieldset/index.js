import { LEGEND_PREVIEW, FIELDSET_DATA_COMPONENT } from './locators';

// component preview locators
export const legendPreview = () => cy.iFrame(LEGEND_PREVIEW);
export const fieldsetFieldName = index => cy.iFrame(FIELDSET_DATA_COMPONENT)
  .find(`div:nth-child(${index})`)
  .find('div > label');
