import { Page } from "playwright-core";
import PILL_CLOSE_ICON from "./locators";

// component preview locators
const pillCloseIcon = (page: Page) => page.locator(PILL_CLOSE_ICON);

export default pillCloseIcon;
