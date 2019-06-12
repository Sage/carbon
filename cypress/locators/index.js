import {
  INPUT_WIDTH_SLIDER, LABEL_WIDTH_SLIDER, HELP_ICON_PREVIEW, FIELD_HELP_PREVIEW, TOOLTIP_PREVIEW,
  FORM, STORY_ROOT, CLOSE_ICON_BUTTON, BACKGROUND_UI_LOCATOR, LINK, ICON, INPUT_WIDTH_PREVIEW,
  COMMMON_DATA_ELEMENT_INPUT, LABEL,
} from './locators';

// knobs locators
export const getKnobsInput = propertyName => cy.get(`[name="${propertyName}"]`);
export const knobsTab = () => cy.get(FORM).find('button').contains('Knobs');
export const actionsTab = () => cy.get(FORM).find('button').contains('Actions');
export const clearButtonInActions = () => cy.get(FORM).find('button').contains('Clear');
export const eventInAction = event => cy.get(FORM).find('span').contains(event);
export const inputWidthSlider = () => cy.get(INPUT_WIDTH_SLIDER);
export const labelWidthSlider = () => cy.get(LABEL_WIDTH_SLIDER);

// component preview locators
export const storyRoot = () => cy.iFrame(STORY_ROOT);
export const commonButtonPreview = () => storyRoot().find('button');
export const labelPreview = () => storyRoot().find('label').first();
export const label = () => cy.iFrame(LABEL);
export const helpIcon = () => cy.iFrame(HELP_ICON_PREVIEW).first();
export const tooltipPreview = () => cy.iFrame(TOOLTIP_PREVIEW);
export const fieldHelpPreview = () => cy.iFrame(FIELD_HELP_PREVIEW).first();
export const closeIconButton = () => cy.iFrame(CLOSE_ICON_BUTTON);
export const backgroundUILocator = () => cy.iFrame(BACKGROUND_UI_LOCATOR);
export const link = () => cy.iFrame(LINK);
export const icon = () => cy.iFrame(ICON);
export const inputWidthPreview = () => cy.iFrame(INPUT_WIDTH_PREVIEW);
export const commonDataElementInputPreview = () => cy.iFrame(COMMMON_DATA_ELEMENT_INPUT);
export const getDataElementByValue = element => cy.iFrame(`[data-element="${element}"]`);
export const getDataElementByNameAndValue = (name, value) => cy.iFrame(`[data-${name}="${value}"]`);
