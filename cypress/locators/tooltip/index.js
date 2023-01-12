import {
  TOOLTIP_PREVIEW,
  TOOLTIP_POINTER,
  TOOLTIP_TRIGGER,
  TOOLTIP_TRIGGER_TOGGLE,
} from "./locators";

// component preview locators
export const tooltipPreview = () => cy.get(TOOLTIP_PREVIEW);
export const tooltipPointer = () => cy.get(TOOLTIP_POINTER);
export const tooltipTrigger = () => cy.get(TOOLTIP_TRIGGER);
export const tooltipTriggerToggle = () => cy.get(TOOLTIP_TRIGGER_TOGGLE);
