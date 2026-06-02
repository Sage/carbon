import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  TileComponent,
  TileFooterComponent,
  TileHeaderComponent,
  FlexTile,
} from "./components.test-pw";

test.describe("Tile component", () => {
  test(`should check Accessibility for Tile`, async ({ page, mount }) => {
    await mount(<TileComponent />);

    await checkAccessibility(page);
  });

  test(`should check Accessibility for Tile Footer`, async ({
    page,
    mount,
  }) => {
    await mount(<TileFooterComponent />);

    await checkAccessibility(page);
  });

  test(`should check Accessibility for Tile Header`, async ({
    page,
    mount,
  }) => {
    await mount(<TileHeaderComponent />);

    await checkAccessibility(page);
  });

  test(`should check Accessibility for Flex Tile`, async ({ page, mount }) => {
    await mount(<FlexTile />);

    await checkAccessibility(page);
  });
});
