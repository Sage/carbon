import type { Page } from "@playwright/test";
import HR_COMPONENT from "./locators";

// component preview locators
const hrComponent = (page: Page) => {
  return page.locator(HR_COMPONENT);
};

export default hrComponent;
