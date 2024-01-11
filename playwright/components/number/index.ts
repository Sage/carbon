import type { Page } from "@playwright/test";
import NUMBER from "./locators";

// component preview locators
const number = (page: Page) => page.locator(NUMBER);

export default number;
