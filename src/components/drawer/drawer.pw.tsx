import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import DrawerComponent from "./components.test-pw";
import { drawerSidebar } from "../../../playwright/components/drawer";
import { checkAccessibility } from "../../../playwright/support/helper";

test("should render sidebar content with tabindex 0 when content is scrollable", async ({
  mount,
  page,
}) => {
  await mount(<DrawerComponent height="20px" />);

  const sidebar = drawerSidebar(page);
  await expect(sidebar).toHaveAttribute("tabindex", "0");
});

test.describe("Accessibility tests for Drawer component", () => {
  (
    [
      ["expanded", false],
      ["not expanded", true],
    ] as [string, boolean][]
  ).forEach(([state, clickIt]) => {
    test(`should pass accessibility tests when chevron is ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<DrawerComponent showControls expanded={clickIt} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests when closed by default", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerComponent expanded={false} />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with aria-label", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerComponent aria-label="aria label" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with sidebar aria-label", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerComponent sidebarAriaLabel="aria label" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with custom title", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerComponent title="playwright_title" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with custom footer", async ({
    mount,
    page,
  }) => {
    await mount(
      <div
        style={{
          height: "200px",
        }}
      >
        <DrawerComponent footer="playwright_footer" />
      </div>,
    );

    await checkAccessibility(page);
  });

  test("should pass accessibility with scrollable sidebar content", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerComponent height="20px" />);

    await checkAccessibility(page);
  });
});
