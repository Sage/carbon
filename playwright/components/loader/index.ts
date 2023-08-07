import type { Page } from "@playwright/test";
import LOADER from "./locators";
import { BUTTON_DATA_COMPONENT_PREVIEW } from "../button/locators";

const loader = (page: Page, index: number) => {
  return page.locator(LOADER).locator("div").nth(index);
};

const loaderInsideButton = (page: Page) => {
  return page.locator(BUTTON_DATA_COMPONENT_PREVIEW);
};

export { loader, loaderInsideButton };
