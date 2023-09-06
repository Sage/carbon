import type { Page } from "@playwright/test";
import PREVIEW_COMPONENT from "./locators";
import { dlsRoot } from "../../../playwright/components/index";
// component preview locators
const previewComponent = (page: Page) => {
  return page.locator(PREVIEW_COMPONENT);
};

const lineComponent = (page: Page) => {
  return dlsRoot(page)
    .locator(`div`)
    .locator(`div`)
    .locator(`span[data-component="preview"]`);
};

export { previewComponent, lineComponent };
