import {
  ENABLE_BACKGROUND_UI_CHECKBOX, HEIGHT_INPUT, INPUT_WIDTH_SLIDER,
  LABEL_WIDTH_SLIDER, LABEL_INLINE_CHECKBOX, LABEL_ALIGN_SELECT,
  HELP_ICON_PREVIEW, FIELD_HELP_PREVIEW, LABEL_HELP_PREVIEW, FORM, STORY_ROOT,
  SHOW_CLOSE_ICON_CHECKBOX, STICKY_FORM_FOOTER, DISABLE_ESC_KEY_CHECKBOX,
  CLOSE_ICON_BUTTON, BACKGROUND_UI_LOCATOR, LINK,
} from './locators';

// knobs locators
export const getKnobsInput = propertyName => cy.get(`[name="${propertyName}"]`);
export const enableBackgroundUICheckbox = () => cy.get(FORM).find(ENABLE_BACKGROUND_UI_CHECKBOX);
export const knobsTab = () => cy.get(FORM).find('button').contains('Knobs');
export const disabledCheckbox = () => cy.get(FORM).contains('disabled').find('input');
export const sizeSelect = () => cy.get(FORM).contains('size').find('select');
export const subtextInput = () => cy.get(FORM).contains('subtext').find('textarea');
export const asSelect = () => cy.get(FORM).contains('as').find('select');
export const alignSelect = () => cy.get(FORM).contains('align').find('select');
export const heightInput = () => cy.get(HEIGHT_INPUT);
export const inputWidthSlider = () => cy.get(INPUT_WIDTH_SLIDER);
export const labelWidthSlider = () => cy.get(LABEL_WIDTH_SLIDER);
export const labelInlineCheckbox = () => cy.get(LABEL_INLINE_CHECKBOX);
export const labelAlignSelect = () => cy.get(LABEL_ALIGN_SELECT);
export const showCloseIconCheckbox = () => cy.get(SHOW_CLOSE_ICON_CHECKBOX);
export const stickyFormFooter = () => cy.get(STICKY_FORM_FOOTER);
export const disableEscKeyCheckbox = () => cy.get(DISABLE_ESC_KEY_CHECKBOX);

// component preview locators
export const commonButtonPreview = () => cy.iFrame(STORY_ROOT).find('button');
export const labelPreview = () => cy.iFrame(STORY_ROOT).find('label').first();
export const helpIcon = () => cy.iFrame(HELP_ICON_PREVIEW);
export const labelHelpPreview = () => cy.iFrame(LABEL_HELP_PREVIEW);
export const fieldHelpPreview = () => cy.iFrame(FIELD_HELP_PREVIEW);
export const closeIconButton = () => cy.iFrame(CLOSE_ICON_BUTTON);
export const backgroundUILocator = () => cy.iFrame(BACKGROUND_UI_LOCATOR);
export const link = () => cy.iFrame(LINK);
