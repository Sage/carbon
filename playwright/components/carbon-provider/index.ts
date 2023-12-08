import { Page } from "@playwright/test";
import MULTI_ACTION_BUTTON_COMPONENT from "./locators";

// component preview locators
const multiActionButtonComponent = (page: Page) =>
  page.locator(MULTI_ACTION_BUTTON_COMPONENT);

export default multiActionButtonComponent;
