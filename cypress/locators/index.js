import {
  INPUT_WIDTH_SLIDER, LABEL_WIDTH_SLIDER, LABEL_ALIGN_SELECT, HELP_ICON_PREVIEW,
  FIELD_HELP_PREVIEW, TOOLTIP_PREVIEW, FORM, STORY_ROOT, STICKY_FORM_FOOTER, CLOSE_ICON_BUTTON,
  BACKGROUND_UI_LOCATOR, LINK, ICON,
} from './locators';

// knobs locators
export const getKnobsInput = propertyName => cy.get(`[name="${propertyName}"]`);
export const knobsTab = () => cy.get(FORM).find('button').contains('Knobs');
export const sizeSelect = () => cy.get(FORM).contains('size').find('select');
export const asSelect = () => cy.get(FORM).contains('as').find('select');
export const alignSelect = () => cy.get(FORM).contains('align').find('select');
export const inputWidthSlider = () => cy.get(INPUT_WIDTH_SLIDER);
export const labelWidthSlider = () => cy.get(LABEL_WIDTH_SLIDER);
export const labelAlignSelect = () => cy.get(LABEL_ALIGN_SELECT);
export const stickyFormFooter = () => cy.get(STICKY_FORM_FOOTER);

// component preview locators
export const commonButtonPreview = () => cy.iFrame(STORY_ROOT).find('button');
export const labelPreview = () => cy.iFrame(STORY_ROOT).find('label').first();
export const helpIcon = () => cy.iFrame(HELP_ICON_PREVIEW);
export const tooltipPreview = () => cy.iFrame(TOOLTIP_PREVIEW);
export const fieldHelpPreview = () => cy.iFrame(FIELD_HELP_PREVIEW);
export const closeIconButton = () => cy.iFrame(CLOSE_ICON_BUTTON);
export const backgroundUILocator = () => cy.iFrame(BACKGROUND_UI_LOCATOR);
export const link = () => cy.iFrame(LINK);
export const icon = () => cy.iFrame(ICON);
