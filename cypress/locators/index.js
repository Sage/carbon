import {
  HELP_ICON_PREVIEW,
  FIELD_HELP_PREVIEW,
  TOOLTIP_PREVIEW,
  FORM,
  STORY_ROOT,
  CLOSE_ICON_BUTTON,
  BACKGROUND_UI_LOCATOR,
  LINK,
  ICON,
  COMMMON_DATA_ELEMENT_INPUT,
  LABEL,
  TAB_LIST,
  DLS_ROOT,
  NO_PREVIEW,
  WARNING_ICON,
} from "./locators";

// actions locators
export const clearButton = () => cy.get(FORM).find("button").contains("Clear");

// knobs locators
export const getKnobsInput = (propertyName) =>
  cy.get(`[name="${propertyName}"]`);
export const getKnobsInputWithName = (propertyName, name) =>
  cy.get(`[name="${propertyName} ${name}"]`);
export const knobsTab = () => cy.get(FORM).find("button").contains("Knobs");
export const actionsTab = () => cy.get(FORM).find("button").contains("Actions");
export const knobsNameTab = (name) =>
  cy.get(TAB_LIST).eq(1).find("button").contains(name);
export const eventInAction = (event) =>
  cy.get(FORM).find("span").contains(event);

// component preview locators
export const storyRoot = () => cy.iFrame(STORY_ROOT);
export const dlsRoot = () => cy.get(DLS_ROOT);
export const commonButtonPreviewNoIFrameRoot = () =>
  cy.get(DLS_ROOT).find("button");
export const labelPreview = () => storyRoot().find("label").first();
export const label = () => cy.iFrame(LABEL);
export const labelNoIFrame = () => cy.get(LABEL);
export const helpIconByPosition = (position) =>
  cy.iFrame(HELP_ICON_PREVIEW).eq(position);
export const fieldHelp = () => cy.iFrame(FIELD_HELP_PREVIEW);
export const closeIconButtonIFrame = () => cy.iFrame(CLOSE_ICON_BUTTON);
export const helpIconIframe = () => cy.iFrame(HELP_ICON_PREVIEW).first();
export const backgroundUILocator = () => cy.get(BACKGROUND_UI_LOCATOR);
export const iconIFrame = () => cy.iFrame(ICON);
export const commonDataElementInputPreview = () =>
  cy.iFrame(COMMMON_DATA_ELEMENT_INPUT);
export const getDataElementByValueIframe = (element) =>
  cy.iFrame(`[data-element="${element}"]`);
export const getComponentIFrame = (component) =>
  cy.iFrame(`[data-component="${component}"]`);

// component preview locators into iFrame
export const dlsRootNoIframe = () => cy.get(DLS_ROOT);
export const icon = () => cy.get(ICON);
export const warningIcon = () => cy.get(WARNING_ICON);
export const getDataElementByValue = (element) =>
  cy.get(`[data-element="${element}"]`);
export const commonDataElementInputPreviewNoIframe = () =>
  cy.get(COMMMON_DATA_ELEMENT_INPUT);
export const getComponentNoIframe = (component) =>
  cy.get(`[data-component="${component}"]`);
export const getElementNoIframe = (element) =>
  cy.get(`[data-element="${element}"]`).first();
export const closeIconButton = () => cy.get(CLOSE_ICON_BUTTON);
export const fieldHelpPreviewNoIFrame = () =>
  cy.get(FIELD_HELP_PREVIEW).first();
export const helpIcon = () => cy.get(HELP_ICON_PREVIEW).first();
export const fieldHelpPreviewByPositionNoIFrame = (position) =>
  cy.get(FIELD_HELP_PREVIEW).eq(position);
export const labelByPosition = (position) => cy.get(LABEL).eq(position);
export const helpIconByPositionNoIFrame = (position) =>
  cy.get(HELP_ICON_PREVIEW).eq(position);
export const tooltipPreview = () => cy.get(TOOLTIP_PREVIEW);
export const tooltipPreviewByPositionNoIFrame = (position) =>
  cy.get(TOOLTIP_PREVIEW).eq(position);
export const link = () => cy.get(LINK);
export const noPreview = () => cy.get(NO_PREVIEW);
