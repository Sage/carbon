import type { Page } from "@playwright/test";
import { CARD, CARD_COLUMN, CARD_FOOTER, CARD_CONTENT } from "./locators";

// component preview locators
export const card = (page: Page) => page.locator(CARD);

export const columnCard = (page: Page) => page.locator(CARD_COLUMN);

export const footerCard = (page: Page) => page.locator(CARD_FOOTER);

export const cardContent = (page: Page) => page.locator(CARD_CONTENT);
