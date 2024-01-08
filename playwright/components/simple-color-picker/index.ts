import type { Page } from "@playwright/test";
import { SIMPLE_COLOR_PICKER } from "./locators";

// component preview locators
export const simpleColorPickerLegend = (page: Page) =>
  page.locator(SIMPLE_COLOR_PICKER).locator("legend");

export default {
  simpleColorPickerLegend,
};
