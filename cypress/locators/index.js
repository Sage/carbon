import {
  INPUT_WIDTH_SLIDER, LABEL_WIDTH_SLIDER, HELP_ICON_PREVIEW, FIELD_HELP_PREVIEW, TOOLTIP_PREVIEW,
  FORM, STORY_ROOT, CLOSE_ICON_BUTTON, BACKGROUND_UI_LOCATOR, LINK, ICON, INPUT_WIDTH_PREVIEW,
  COMMMON_DATA_ELEMENT_INPUT, LABEL, PRECISION_SLIDER, CHARACTER_LIMIT,
  TAB_LIST, DLS_ROOT,
} from './locators';

// actions locators
export const clearButton = () => cy.get(FORM).find('button').contains('Clear');

// knobs locators
export const getKnobsInput = propertyName => cy.get(`[name="${propertyName}"]`);
export const getKnobsInputWithName = (propertyName, name) => cy.get(`[name="${propertyName} ${name}"]`);
export const getKnobsInputByGroup = (groupName, propertyName) => cy.get(`[name="${propertyName}_${groupName}"]`);
export const knobsTab = () => cy.get(FORM).find('button').contains('Knobs');
export const actionsTab = () => cy.get(FORM).find('button').contains('Actions');
export const knobsNameTab = name => cy.get(TAB_LIST).eq(1).find('button').contains(name);
export const knobsNameInSecondTabList = name => cy.get(TAB_LIST).eq(2).find('button').contains(name);
export const eventInAction = event => cy.get(FORM).find('span').contains(event);
export const inputWidthSlider = () => cy.get(INPUT_WIDTH_SLIDER);
export const labelWidthSlider = () => cy.get(LABEL_WIDTH_SLIDER);
export const labelWidthSliderByName = (propertyName, name) => cy.get(`input[name="${propertyName} ${name}"]`);
export const precisionSlider = () => cy.get(PRECISION_SLIDER);
export const characterLimitSlider = () => cy.get(CHARACTER_LIMIT);

// component preview locators
export const dlsRoot = () => cy.iFrame(DLS_ROOT);
export const storyRoot = () => cy.iFrame(STORY_ROOT);
export const commonButtonPreview = () => storyRoot().find('button');
export const commonButtonPreviewNoIFrameRoot = () => cy.get(DLS_ROOT).find('button');
export const commonInputPreview = () => storyRoot().find('input');
export const labelPreview = () => storyRoot().find('label').first();
export const label = () => cy.iFrame(LABEL);
export const labelNoIFrame = () => cy.get(LABEL);
export const labelByPositionInIframe = position => cy.iFrame(LABEL).eq(position);
export const helpIconByPosition = position => cy.iFrame(HELP_ICON_PREVIEW).eq(position);
export const tooltipPreviewIFrame = () => cy.iFrame(TOOLTIP_PREVIEW);
export const tooltipPreviewByPosition = position => cy.iFrame(TOOLTIP_PREVIEW).eq(position);
export const fieldHelpPreview = () => cy.iFrame(FIELD_HELP_PREVIEW).first();
export const fieldHelp = () => cy.iFrame(FIELD_HELP_PREVIEW);
export const fieldHelpPreviewByPosition = position => cy.iFrame(FIELD_HELP_PREVIEW).eq(position);
export const closeIconButtonIFrame = () => cy.iFrame(CLOSE_ICON_BUTTON);
export const helpIconIframe = () => cy.iFrame(HELP_ICON_PREVIEW).first();
export const backgroundUILocatorIFrame = () => cy.iFrame(BACKGROUND_UI_LOCATOR);
export const iconIFrame = () => cy.iFrame(ICON);
export const inputWidthPreview = () => cy.iFrame(INPUT_WIDTH_PREVIEW);
export const commonDataElementInputPreview = () => cy.iFrame(COMMMON_DATA_ELEMENT_INPUT);
export const getDataElementByValueIframe = element => cy.iFrame(`[data-element="${element}"]`);
export const getDataElementByNameAndValue = (name, value) => cy.iFrame(`[data-${name}="${value}"]`);
export const getComponentIFrame = component => cy.iFrame(`[data-component="${component}"]`);

// component preview locators into iFrame
export const storyRootNoIframe = () => cy.get(STORY_ROOT);
export const tooltipPreviewNoIframe = () => cy.get(TOOLTIP_PREVIEW);
export const icon = () => cy.get(ICON);
export const getDataElementByValue = element => cy.get(`[data-element="${element}"]`);
export const getDataElementByValueAndPosition = (element, position) => cy.get(`[data-element="${element}"]`)
  .eq(position);
export const commonDataElementInputPreviewNoIframe = () => cy.get(COMMMON_DATA_ELEMENT_INPUT);
export const commonDataElementInputPreviewByPositionNoIFrame = position => cy.get(COMMMON_DATA_ELEMENT_INPUT)
  .eq(position);
export const getComponentNoIframe = component => cy.get(`[data-component="${component}"]`);
export const getElementNoIframe = element => cy.get(`[data-element="${element}"]`).first();
export const getElementNoIframeByName = element => cy.get(`[name="${element}"]`);
export const commonButtonPreviewNoIframe = () => cy.get(STORY_ROOT).find('button');
export const backgroundUILocator = () => cy.get(BACKGROUND_UI_LOCATOR);
export const closeIconButton = () => cy.get(CLOSE_ICON_BUTTON);
export const fieldHelpPreviewNoIFrame = () => cy.get(FIELD_HELP_PREVIEW).first();
export const helpIcon = () => cy.get(HELP_ICON_PREVIEW).first();
export const fieldHelpPreviewByPositionNoIFrame = position => cy.get(FIELD_HELP_PREVIEW).eq(position);
export const labelByPosition = position => cy.get(LABEL).eq(position);
export const helpIconByPositionNoIFrame = position => cy.get(HELP_ICON_PREVIEW).eq(position);
export const tooltipPreview = () => cy.get(TOOLTIP_PREVIEW);
export const tooltipPreviewByPositionNoIFrame = position => cy.get(TOOLTIP_PREVIEW).eq(position);
export const link = () => cy.get(LINK);
