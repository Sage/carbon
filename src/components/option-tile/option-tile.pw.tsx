import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  SingleOptionTileComponent,
  CustomOptionTileComponent,
  MultipleOptionTileComponent,
  GroupedOptionTileComponent,
  SingleSelectGroupOptionTileComponent,
} from "./components.test-pw";

const BG_HOVER = "rgb(244, 245, 246)";
const BG_ACTIVE = "rgba(0, 0, 0, 0.15)";

test.describe("Option Tile component", () => {
  test("hovering a single tile fills the tile and the number circle with the hover token", async ({
    page,
    mount,
  }) => {
    await mount(<SingleOptionTileComponent />);

    const tile = page.locator("button");
    await tile.hover();

    await expect(tile).toHaveCSS("background-color", BG_HOVER);
    await expect(tile.locator("span").first()).toHaveCSS(
      "background-color",
      BG_HOVER,
    );
  });

  test("a multi select tile uses distinct hover and selected fills", async ({
    page,
    mount,
  }) => {
    await mount(<MultipleOptionTileComponent />);

    const tile = page.locator('[role="checkbox"]');
    await tile.hover();
    await expect(tile).toHaveCSS("background-color", BG_HOVER);

    await tile.click();
    await expect(tile).toHaveCSS("background-color", BG_ACTIVE);
  });

  test("the custom tile keeps a visible input when active", async ({
    page,
    mount,
  }) => {
    await mount(<CustomOptionTileComponent />);
    await page.locator("button").click();

    const input = page.locator("input");
    await expect(input).toBeVisible();
    await expect(input).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(input).toHaveCSS("border-top-width", "1px");
  });

  test("a group renders its legend and hint as a labelset", async ({
    page,
    mount,
  }) => {
    await mount(<SingleSelectGroupOptionTileComponent />);

    await expect(page.locator("legend")).toHaveText("Payment options");
  });

  test("should check accessibility for single option tile", async ({
    page,
    mount,
  }) => {
    await mount(<SingleOptionTileComponent />);

    await checkAccessibility(page);
  });

  test("should check accessibility for custom option tile", async ({
    page,
    mount,
  }) => {
    await mount(<CustomOptionTileComponent />);

    await checkAccessibility(page);
  });

  test("should check accessibility for multiple option tile", async ({
    page,
    mount,
  }) => {
    await mount(<MultipleOptionTileComponent />);

    await checkAccessibility(page);
  });

  test("should check accessibility for a single select group", async ({
    page,
    mount,
  }) => {
    await mount(<SingleSelectGroupOptionTileComponent />);

    await checkAccessibility(page);
  });

  test("should check accessibility for a multi select group", async ({
    page,
    mount,
  }) => {
    await mount(<GroupedOptionTileComponent />);

    await checkAccessibility(page);
  });
});
