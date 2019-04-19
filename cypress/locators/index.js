import {
  ENABLE_BACKGROUND_UI_CHECKBOX, TITLE_INPUT, SUBTILE_INPUT, LABEL_INPUT,
  CHILDREN_TEXTAREA, HEIGHT_INPUT, LABEL_HELP_INPUT, INPUT_WIDTH_SLIDER,
  LABEL_WIDTH_SLIDER, FIELD_HELP_INPUT, LABEL_INLINE_CHECKBOX, LABEL_ALIGN_SELECT,
  HELP_ICON_PREVIEW, FIELD_HELP_PREVIEW, LABEL_HELP_PREVIEW, FORM, STORY_ROOT,
} from './locators';

// knobs locators
export const enableBackgroundUICheckbox = () => cy.get(FORM).find(ENABLE_BACKGROUND_UI_CHECKBOX);
export const titleInput = () => cy.get(TITLE_INPUT);
export const subtitleInput = () => cy.get(FORM).find(SUBTILE_INPUT);
export const knobsTab = () => cy.get(FORM).find('button').contains('Knobs');
export const labelInput = () => cy.get(LABEL_INPUT);
export const childrenTextArea = () => cy.get(CHILDREN_TEXTAREA);
export const sizeSelect = () => cy.get(FORM).contains('size').find('select');
export const subtextInput = () => cy.get(FORM).contains('subtext').find('textarea');
export const asSelect = () => cy.get(FORM).contains('as').find('select');
export const alignSelect = () => cy.get(FORM).contains('align').find('select');
export const heightInput = () => cy.get(HEIGHT_INPUT);
export const labelHelpInput = () => cy.get(LABEL_HELP_INPUT);
export const inputWidthSlider = () => cy.get(INPUT_WIDTH_SLIDER);
export const labelWidthSlider = () => cy.get(LABEL_WIDTH_SLIDER);
export const fieldHelpInput = () => cy.get(FIELD_HELP_INPUT);
export const labelInlineCheckbox = () => cy.get(LABEL_INLINE_CHECKBOX);
export const labelAlignSelect = () => cy.get(LABEL_ALIGN_SELECT);

// component preview locators
export const commonButtonPreview = () => cy.iFrame(STORY_ROOT).find('button');
export const labelPreview = () => cy.iFrame(STORY_ROOT).find('label').first();
export const helpIcon = () => cy.iFrame(HELP_ICON_PREVIEW);
export const labelHelpPreview = () => cy.iFrame(LABEL_HELP_PREVIEW);
export const fieldHelpPreview = () => cy.iFrame(FIELD_HELP_PREVIEW);
