import {
  INPUT_WIDTH_SLIDER, LABEL_WIDTH_SLIDER, HELP_ICON_PREVIEW, FIELD_HELP_PREVIEW, TOOLTIP_PREVIEW,
  FORM, STORY_ROOT, CLOSE_ICON_BUTTON, BACKGROUND_UI_LOCATOR, LINK, ICON, INPUT_WIDTH_PREVIEW,
  COMMMON_DATA_ELEMENT_INPUT, LABEL, RERUN_TESTS_BUTTON, PRECISION_SLIDER, CHARACTER_LIMIT,
  TAB_LIST,
} from './locators';

// actions locators
export const clearButton = () => cy.get(FORM).find('button').contains('Clear');

// accessibility locators
// this timeout is only for docker accessibility tests
export const reRunTestsButton = () => cy.get(RERUN_TESTS_BUTTON, { timeout: 15000 });

// knobs locators
export const getKnobsInput = propertyName => cy.get(`[name="${propertyName}"]`);
export const getKnobsInputWithName = (propertyName, name) => cy.get(`[name="${propertyName} ${name}"]`);
export const getKnobsInputByGroup = (groupName, propertyName) => cy.get(`[name="${propertyName}_${groupName}"]`);
export const knobsTab = () => cy.get(FORM).find('button').contains('Knobs');
export const actionsTab = () => cy.get(FORM).find('button').contains('Actions');
export const knobsNameTab = name => cy.get(TAB_LIST).eq(1).find('button').contains(name);
export const knobsNameInSecondTabList = name => cy.get(TAB_LIST).eq(2).find('button').contains(name);
export const accessibilityTab = () => cy.get(FORM).find('button').contains('Accessibility');
export const eventInAction = event => cy.get(FORM).find('span').contains(event);
export const inputWidthSlider = () => cy.get(INPUT_WIDTH_SLIDER);
export const labelWidthSlider = () => cy.get(LABEL_WIDTH_SLIDER);
export const labelWidthSliderByName = (propertyName, name) => cy.get(`input[name="${propertyName} ${name}"]`);
export const precisionSlider = () => cy.get(PRECISION_SLIDER);
export const characterLimitSlider = () => cy.get(CHARACTER_LIMIT);

// component preview locators
export const storyRoot = () => cy.iFrame(STORY_ROOT);
export const commonButtonPreview = () => storyRoot().find('button');
export const commonInputPreview = () => storyRoot().find('input');
export const labelPreview = () => storyRoot().find('label').first();
export const label = () => cy.iFrame(LABEL);
export const labelByPosition = position => cy.iFrame(LABEL).eq(position);
export const helpIcon = () => cy.iFrame(HELP_ICON_PREVIEW).first();
export const helpIconByPosition = position => cy.iFrame(HELP_ICON_PREVIEW).eq(position);
export const tooltipPreview = () => cy.iFrame(TOOLTIP_PREVIEW);
export const tooltipPreviewByPosition = position => cy.iFrame(TOOLTIP_PREVIEW).eq(position);
export const fieldHelpPreview = () => cy.iFrame(FIELD_HELP_PREVIEW).first();
export const fieldHelpPreviewByPosition = position => cy.iFrame(FIELD_HELP_PREVIEW).eq(position);
export const closeIconButton = () => cy.iFrame(CLOSE_ICON_BUTTON);
export const backgroundUILocator = () => cy.iFrame(BACKGROUND_UI_LOCATOR);
export const link = () => cy.iFrame(LINK);
export const icon = () => cy.iFrame(ICON);
export const inputWidthPreview = () => cy.iFrame(INPUT_WIDTH_PREVIEW);
export const commonDataElementInputPreview = () => cy.iFrame(COMMMON_DATA_ELEMENT_INPUT);
export const getDataElementByValue = element => cy.iFrame(`[data-element="${element}"]`);
export const getDataElementByNameAndValue = (name, value) => cy.iFrame(`[data-${name}="${value}"]`);

// component preview locators into iFrame
export const storyRootNoIframe = () => cy.get(STORY_ROOT);
export const tooltipPreviewNoIframe = () => cy.get(TOOLTIP_PREVIEW);
export const iconNoIframe = () => cy.get(ICON);
export const getDataElementByValueNoIframe = element => cy.get(`[data-element="${element}"]`);
export const commonDataElementInputPreviewNoIframe = () => cy.get(COMMMON_DATA_ELEMENT_INPUT);
