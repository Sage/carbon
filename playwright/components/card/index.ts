import type { Page } from "@playwright/test";
import {
  CARD,
  CARD_COLUMN,
  CARD_DRAGGABLE_ELEMENT,
  CARD_FOOTER,
  CARD_CONTENT,
  DRAGGABLE_CARD_AT_IDEX,
  DRAGGABLE_CONTAINER_AT_INDEX,
} from "./locators";

// component preview locators
export const card = (page: Page) => page.locator(CARD);

export const draggableCard = (page: Page, index: number) =>
  page.locator(DRAGGABLE_CARD_AT_IDEX(index)).locator(CARD_DRAGGABLE_ELEMENT);

export const draggableContainer = (page: Page, index: number) =>
  page.locator(DRAGGABLE_CONTAINER_AT_INDEX(index));

export const columnCard = (page: Page) => page.locator(CARD_COLUMN);

export const footerCard = (page: Page) => page.locator(CARD_FOOTER);

export const cardContent = (page: Page) => page.locator(CARD_CONTENT);
