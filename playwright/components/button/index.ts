import { type Page } from "@playwright/test";
import {
  BUTTON_SUBTEXT_PREVIEW,
  BUTTON_DATA_COMPONENT_PREVIEW,
  BUTTON_MINOR_COMPONENT,
} from "./locators";

  const buttonDataComponent = async (page: Page) => {
    return page.locator(BUTTON_DATA_COMPONENT_PREVIEW);
  }
  
  const buttonSubtextPreview = async (page: Page) => {
    return page.locator(BUTTON_SUBTEXT_PREVIEW);
  }
  
  const buttonMinorComponent = async (page: Page, index = 0) => {
    return page.locator(BUTTON_MINOR_COMPONENT).nth(index);
  }
  
export { buttonDataComponent, buttonSubtextPreview, buttonMinorComponent };