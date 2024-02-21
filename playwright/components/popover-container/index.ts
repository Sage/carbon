import type { Page } from "@playwright/test";
import {
  POPOVER_CONTAINER_DATA_COMPONENT,
  POPOVER_CONTAINER_CONTENT,
  POPOVER_CONTAINER_TITLE,
  POPOVER_CONTENT_CLOSE_ICON,
  SELECT_LIST,
  SELECT_TEXT,
  POPOVER_CONTAINER_OPEN_ICON,
} from "./locators";
import { getDataElementByValue } from "..";

// component preview locators
export const popoverContainerContent = (page: Page) =>
  page.locator(POPOVER_CONTAINER_CONTENT);

export const popoverCloseIcon = (page: Page) =>
  page.locator(POPOVER_CONTENT_CLOSE_ICON);

export const popoverContainerTitle = (page: Page) =>
  page.locator(POPOVER_CONTAINER_TITLE);

export const popoverSettingsIcon = (page: Page) =>
  page.locator(POPOVER_CONTAINER_OPEN_ICON);

export const popoverContainerComponent = (page: Page) =>
  page.locator(POPOVER_CONTAINER_DATA_COMPONENT);

export const selectListText = (page: Page, text: string) =>
  page.locator(SELECT_LIST).getByText(text);

export const selectText = (page: Page) =>
  getDataElementByValue(page, SELECT_TEXT);
