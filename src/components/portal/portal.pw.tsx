import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import TestComponent from "./components.test-pw";
import { sidebarPreview } from "../../../playwright/components/sidebar";

test.describe("tests for inertOptOut prop on Portal component", () => {
  test("with the inertOptOut prop true, a button in the portal can be clicked when a modal is opened", async ({
    mount,
    page,
  }) => {
    await mount(<TestComponent inertOptOut />);

    await page.getByRole("button", { name: "Open sidebar" }).click();
    await expect(sidebarPreview(page)).toBeVisible();

    const button = page.getByRole("button", { name: "Test for inertOptOut" });
    await button.click();
    // note: this assertion shouldn't really fail, although it's there to at least have a somewhat-meaningful assertion
    // in the test.
    // The real point of this test is that if the z-index is not set up correctly on the Portal with the `inertOptOut`,
    // the button ends up unclickable as it's behind the modal overlay. In that case the above `.click()` call throws
    // an error.
    await expect(button).toBeFocused();
  });
});
