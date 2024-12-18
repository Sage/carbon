import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import WithInertOptOut from "./components.test-pw";
import { sidebarPreview } from "../../../playwright/components/sidebar";

test("button within a Portal with inertOptOut set to true remains focusable while another Portal is open", async ({
  mount,
  page,
}) => {
  await mount(<WithInertOptOut />);

  await sidebarPreview(page).waitFor();

  const button = page.getByRole("button", { name: "Test for inertOptOut" });
  await button.click();

  await expect(button).toBeFocused();
});
