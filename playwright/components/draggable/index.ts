import type { Page } from "@playwright/test";
import { DRAGGABLE_ITEM, DRAG_ICON } from "./locators";

export const draggableItem = (page: Page, text: string) =>
  page.locator(
    `${DRAGGABLE_ITEM}:has-text("Draggable Label ${text}") ${DRAG_ICON}`,
  );

export const draggableItemByPosition = (page: Page, index: number) =>
  page.locator(`${DRAGGABLE_ITEM}:nth-child(${index + 1}) label`);
