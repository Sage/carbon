import type { Page } from "@playwright/test";
import DISMISSIBLE_BOX_DATA_COMPONENT from "./locators";

// component preview locators
const dismissibleBoxDataComponent = (page: Page) =>
  page.locator(DISMISSIBLE_BOX_DATA_COMPONENT);

export default dismissibleBoxDataComponent;
