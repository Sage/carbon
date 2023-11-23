import { Page } from "@playwright/test";
import {
  POD,
  POD_BLOCK,
  POD_TITLE,
  POD_SUBTITLE,
  POD_CONTENT,
  POD_FOOTER,
  POD_EDIT,
  POD_DELETE,
  POD_UNDO,
} from "./locators";

// component preview locators
export const podComponent = (page: Page) => page.locator(POD);
export const podBlock = (page: Page) => page.locator(POD_BLOCK);
export const podTitle = (page: Page) => page.locator(POD_TITLE);
export const podSubTitle = (page: Page) => page.locator(POD_SUBTITLE);
export const podContent = (page: Page) => page.locator(POD_CONTENT);
export const podFooter = (page: Page) => page.locator(POD_FOOTER);
export const podEdit = (page: Page) => page.locator(POD_EDIT);
export const podEditIcon = (page: Page) => podEdit(page).locator("span");
export const podDelete = (page: Page) => page.locator(POD_DELETE);
export const podDeleteIcon = (page: Page) => podDelete(page).locator("span");
export const podUndo = (page: Page) => page.locator(POD_UNDO);
export const podUndoIcon = (page: Page) => podUndo(page).locator("span");
