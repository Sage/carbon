import { Page } from "playwright-core";
import { LABEL, FILE_INPUT } from "./locators";

export const hiddenInput = (page: Page, label: string) => {
  return page.getByLabel(label);
};

export const selectFileButton = (page: Page, buttonText = "Select file") => {
  return page.getByRole("button", { name: buttonText });
};

export const label = (page: Page) => {
  return page.locator(LABEL);
};

export const fileInput = (page: Page) => {
  return page.locator(FILE_INPUT);
};
