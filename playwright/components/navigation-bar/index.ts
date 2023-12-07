import { Page } from "@playwright/test";
import NAVIGATION_BAR from "./locators";

// component preview locators
const navigationBar = (page: Page) => page.locator(NAVIGATION_BAR);

export default navigationBar;
