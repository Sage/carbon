import { Page } from "@playwright/test";
import { NUMERAL_DATE_COMPONENT, DATE_INPUT } from "./locators";

// component preview locators
export const numeralDateComponent = (page: Page) =>
  page.locator(NUMERAL_DATE_COMPONENT);
export const numeralDateInput = (page: Page, index: number) =>
  page.locator(DATE_INPUT).nth(index);
