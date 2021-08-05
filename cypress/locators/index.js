import {
  HELP_ICON_PREVIEW,
  FIELD_HELP_PREVIEW,
  TOOLTIP_PREVIEW,
  FORM,
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

// knobs locators
export const getKnobsInput = (propertyName) =>
  cy.get(`[name="${propertyName}"]`);
export const getKnobsInputWithName = (propertyName, name) =>
  cy.get(`[name="${propertyName} ${name}"]`);
export const knobsTab = () => cy.get(FORM).find("button").contains("Knobs");
export const knobsNameTab = (name) =>
  cy.get(TAB_LIST).eq(1).find("button").contains(name);

// component preview locators
export const commonButtonPreviewRoot = () => cy.get(DLS_ROOT).find("button");
export const label = () => cy.get(LABEL);
export const backgroundUILocator = () => cy.get(BACKGROUND_UI_LOCATOR);

// component preview locators into iFrame
export const dlsRoot = () => cy.get(DLS_ROOT);
export const icon = () => cy.get(ICON);
export const warningIcon = () => cy.get(WARNING_ICON);
export const getDataElementByValue = (element) =>
  cy.get(`[data-element="${element}"]`);
export const commonDataElementInputPreview = () =>
  cy.get(COMMMON_DATA_ELEMENT_INPUT);
export const getComponent = (component) =>
  cy.get(`[data-component="${component}"]`);
export const getElement = (element) =>
  cy.get(`[data-element="${element}"]`).first();
export const closeIconButton = () => cy.get(CLOSE_ICON_BUTTON);
export const fieldHelpPreview = () => cy.get(FIELD_HELP_PREVIEW).first();
export const helpIcon = () => cy.get(HELP_ICON_PREVIEW).first();
export const fieldHelpPreviewByPosition = (position) =>
  cy.get(FIELD_HELP_PREVIEW).eq(position);
export const labelByPosition = (position) => cy.get(LABEL).eq(position);
export const helpIconByPosition = (position) =>
  cy.get(HELP_ICON_PREVIEW).eq(position);
export const tooltipPreview = () => cy.get(TOOLTIP_PREVIEW);
export const tooltipPreviewByPosition = (position) =>
  cy.get(TOOLTIP_PREVIEW).eq(position);
export const link = () => cy.get(LINK);
export const noPreview = () => cy.get(NO_PREVIEW);
