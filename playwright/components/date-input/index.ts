import type { Page } from "@playwright/test";
import {
  DATE_INPUT,
  DATE_ICON,
  DAY_PICKER_WRAPPER,
  DAY_PICKER_HEADING,
  DAY,
} from "./locators";

// component preview locators
export const dateInput = (page: Page) => page.locator(DATE_INPUT);
export const dayPickerDay = (page: Page, date: string) =>
  page.locator(`div[aria-label="${date}"]`);
export const dayPickerByText = (page: Page, val: string) =>
  page.locator(DAY).locator(val);
export const dateInputParent = (page: Page) =>
  page.locator(DATE_INPUT).locator("..");
export const dateIcon = (page: Page) => page.locator(DATE_ICON);
export const dayPickerWrapper = (page: Page) =>
  page.locator(DAY_PICKER_WRAPPER);
export const dayPickerParent = (page: Page) =>
  page.locator(DAY_PICKER_WRAPPER).locator("..").locator("..");
export const dayPickerHeading = (page: Page) =>
  page.locator(DAY_PICKER_HEADING).locator("div");
export const dayPickerNavButtons = (page: Page, index: number) =>
  page.locator(".DayPicker-NavBar").locator("button").nth(index);
