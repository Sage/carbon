import type { Page } from "@playwright/test";
import {
  RADIOBUTTON_GROUP,
  RADIOBUTTON_COMPONENT,
  RADIOBUTTON_ROLE,
} from "./locators";

// component preview locators
export const radiobuttonComponent = (page: Page) =>
  page.locator(RADIOBUTTON_COMPONENT);

export const radiobuttonRole = (page: Page) => page.locator(RADIOBUTTON_ROLE);

export const radiobuttonLabel = (page: Page) =>
  radiobuttonComponent(page).locator("label");

export const radiobuttonInlineFieldHelp = (page: Page) =>
  radiobuttonComponent(page).locator("span");

export const radiobuttonIcon = (page: Page) =>
  radiobuttonComponent(page).locator("span[data-component='icon']");

export const radiobuttonSvg = (page: Page) =>
  radiobuttonComponent(page).locator("svg");

export const radiobuttonHelpIcon = (page: Page) =>
  radiobuttonComponent(page).locator("[data-component='help']");

export const radiobuttonGroup = (page: Page) => page.locator(RADIOBUTTON_GROUP);

export const radiobuttonGroupLegend = (page: Page) =>
  radiobuttonGroup(page).locator("legend");

export const radiobuttonGroupIcon = (page: Page) =>
  radiobuttonGroup(page).locator("span[data-component='icon']");

export const radiobutton = (page: Page, index: number) =>
  page.locator(RADIOBUTTON_COMPONENT).nth(index);
