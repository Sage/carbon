import { Page } from "@playwright/test";
import { CHARACTER_COUNT } from "../locators";
import {
  TEXT_EDITOR_CONTAINER,
  TEXT_EDITOR_INPUT,
  TEXT_EDITOR_TOOLBAR,
} from "./locators";

// component preview locators
export const textEditorCounter = (page: Page) => page.locator(CHARACTER_COUNT);
export const textEditorInput = (page: Page) => page.locator(TEXT_EDITOR_INPUT);
export const textEditorToolbar = (page: Page, buttonType: string) =>
  page
    .locator(TEXT_EDITOR_TOOLBAR)
    .locator("div")
    .locator(`button[aria-label="${buttonType}"]`);
export const innerText = (page: Page) =>
  textEditorInput(page).locator('span[data-text="true"]');
export const innerTextList = (page: Page, typeOfList: string, index: number) =>
  textEditorInput(page)
    .locator(`${typeOfList}`)
    .locator(`li:nth-child(${index})`)
    .locator("div");
export const textEditorContainer = (page: Page) =>
  page.locator(TEXT_EDITOR_CONTAINER);
