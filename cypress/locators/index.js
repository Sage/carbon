import {
  HELP_ICON_PREVIEW,
  FIELD_HELP_PREVIEW,
  TOOLTIP_PREVIEW,
  CLOSE_ICON_BUTTON,
  BACKGROUND_UI_LOCATOR,
  LINK,
  ICON,
  COMMMON_DATA_ELEMENT_INPUT,
  LABEL,
  DLS_ROOT,
  WARNING_ICON,
  INFO_ICON,
  COMMON_INPUT_PREFIX,
  CHARACTER_COUNT,
  CY_ROOT,
  PORTAL,
  LEGEND,
  STICKY_FOOTER,
  BODY,
} from "./locators";

// component preview locators
export const commonButtonPreviewRoot = () => cy.get(DLS_ROOT).find("button");
export const label = () => cy.get(LABEL);
export const legend = () => cy.get(LEGEND);
export const legendSpan = () => cy.get(`legend > span`);
export const backgroundUILocator = () => cy.get(BACKGROUND_UI_LOCATOR);

// component preview locators
export const dlsRoot = () => cy.get(DLS_ROOT);
export const body = () => cy.get(BODY);
export const icon = () => cy.get(ICON);
export const errorIcon = () => cy.get(ICON);
export const warningIcon = () => cy.get(WARNING_ICON);
export const infoIcon = () => cy.get(INFO_ICON);
export const getDataElementByValue = (element) =>
  cy.get(`[data-element="${element}"]`);
export const commonDataElementInputPreview = () =>
  cy.get(COMMMON_DATA_ELEMENT_INPUT);
export const getComponent = (component) =>
  cy.get(`[data-component="${component}"]`);
export const getElement = (element) =>
  cy.get(`[data-element="${element}"]`).first();
export const closeIconButton = () => cy.get(CLOSE_ICON_BUTTON);
export const openDialogByName = (name) =>
  getDataElementByValue("main-text").contains(name);
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
export const pressESCKeyOntoFocusedElement = () => {
  cy.focused().type("{esc}");
};
export const commonInputPrefix = () => cy.get(COMMON_INPUT_PREFIX);
export const characterCount = () => cy.get(CHARACTER_COUNT);
export const cyRoot = () => cy.get(CY_ROOT);
export const portal = () => cy.get(PORTAL).eq(1).find("h1");
export const stickyFooter = () => cy.get(STICKY_FOOTER);
