import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  SingleOptionTileComponent,
  CustomOptionTileComponent,
  MultipleOptionTileComponent,
  GroupedOptionTileComponent,
  SingleSelectGroupOptionTileComponent,
} from "./components.test-pw";

test.describe("Option Tile component", () => {
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
