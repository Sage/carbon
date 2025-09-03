// component preview locators
export const ALERT_DIALOG = '[data-component="dialog"]';
export const DIALOG = '[role="dialog"][data-element="dialog"]';
export const DIALOG_FULL_SCREEN = '[data-element="dialog"]';
export const DIALOG_TITLE = '[data-element="title"]';
export const DIALOG_SUBTITLE = '[data-element="subtitle"]';
export const OPEN_PREVIEW = '[data-component="button"]';
export const DIALOG_ARIALABEL = "[aria-label]";

export const DIALOG_WITH_ROLE = (role: string) =>
  `[data-component="dialog"][role="${role}"]`;
