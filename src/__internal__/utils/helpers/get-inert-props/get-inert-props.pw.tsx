import React from "react";
import { test, expect } from "../../../../../playwright/helpers/base-test";
import InertExample from "./get-inert-props.test-pw";

test("inert blocks browser focus and restores interaction when removed", async ({
  mount,
  page,
}) => {
  await mount(<InertExample />);
  const toggle = page.getByRole("button", { name: "Toggle inert" });
  const guarded = page.getByText("Guarded action", { exact: true });
  const after = page.getByRole("button", { name: "After", exact: true });

  await toggle.focus();
  await guarded.evaluate((element) => element.focus());
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(after).toBeFocused();

  await toggle.click();
  await page.keyboard.press("Tab");
  await expect(guarded).toBeFocused();

  await toggle.click();
  await page.keyboard.press("Tab");
  await expect(after).toBeFocused();
});
