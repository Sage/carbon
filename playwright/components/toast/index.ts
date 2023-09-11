import type { Page } from "@playwright/test";

// element locators for Toast component
const toastComponent = (page: Page) => page.locator("[data-component='toast']");

export default toastComponent;
