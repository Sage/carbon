import type { Page } from "@playwright/test";
import {
  ADVANCED_COLOR_PICKER_CELL,
  CURRENT_COLOR_DESCRIPTION,
  SIMPLE_COLOR,
  SIMPLE_COLOR_PICKER,
  ADVANCED_COLOR_PREVIEW,
} from "./locators";

const simpleColorPickerInput = (page: Page, index: number) => {
  return page.locator(SIMPLE_COLOR).locator("input").nth(index);
};

const simpleColorPicker = (page: Page, index: number) => {
  return page
    .locator(SIMPLE_COLOR_PICKER)
    .locator(SIMPLE_COLOR)
    .nth(index)
    .locator("input");
};

const currentColorDescription = (page: Page) => {
  return page.locator(CURRENT_COLOR_DESCRIPTION);
};

const advancedColorPickerCell = (page: Page) => {
  return page.locator(ADVANCED_COLOR_PICKER_CELL);
};

const advancedColorPicker = (page: Page, index: number) => {
  return page.locator(SIMPLE_COLOR).nth(index);
};

const simpleColorPickerComponent = (page: Page) => {
  return page.locator(SIMPLE_COLOR_PICKER);
};

const advancedColorPickerPreview = (page: Page) => {
  return page.locator(ADVANCED_COLOR_PREVIEW);
};

export {
  simpleColorPickerInput,
  simpleColorPicker,
  currentColorDescription,
  advancedColorPickerCell,
  advancedColorPicker,
  simpleColorPickerComponent,
  advancedColorPickerPreview,
};
