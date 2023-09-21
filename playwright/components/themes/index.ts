import type { Page } from "@playwright/test";
import { getComponent } from "..";

export const theme = (page: Page, themeName: string) =>
  page.locator(`[data-theme="${themeName}"]`);

export const buttonToggleComponent = (page: Page) =>
  getComponent(page, "button-toggle").first().locator("label");

export const linkComponent = (page: Page) =>
  getComponent(page, "link").locator("a > *");

export const loaderComponent = (page: Page) =>
  getComponent(page, "loader").locator("div");

export const loaderBarComponent = (page: Page) =>
  getComponent(page, "loader-bar");
