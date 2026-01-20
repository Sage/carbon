import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import {
  TokensWrapperWithPortal,
  TokensWrapperWithPopover,
} from "./components.test-pw";

test.describe("TokensWrapper component", () => {
  test("should provide tokens in scope of Portals", async ({ mount, page }) => {
    await mount(<TokensWrapperWithPortal />);

    const portalChild = page.locator('[data-role="portal-child"]');

    await expect(portalChild).toHaveCSS("background-color", "rgb(219, 0, 78)");
  });

  test("should provide tokens in scope of Portals mounted with target id", async ({
    mount,
    page,
  }) => {
    await mount(<TokensWrapperWithPortal id="portal-mount-target" />);

    const portalChild = page.locator('[data-role="portal-child"]');

    await expect(portalChild).toHaveCSS("background-color", "rgb(219, 0, 78)");
  });

  test("should provide tokens in scope of PopoverContainers", async ({
    mount,
    page,
  }) => {
    await mount(<TokensWrapperWithPopover />);

    const popoverChild = page.locator('[data-role="popover-child"]');

    await expect(popoverChild).toHaveCSS("background-color", "rgb(219, 0, 78)");
  });
});
