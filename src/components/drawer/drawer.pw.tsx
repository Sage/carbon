import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import DrawerComponent from "./components.test-pw";
import {
  drawer,
  drawerAsideContent,
  drawerSidebar,
} from "../../../playwright/components/drawer";
import {
  checkAccessibility,
  assertCssValueIsApproximately,
} from "../../../playwright/support/helper";

test("should have the expected focus styling", async ({ mount, page }) => {
  await mount(<DrawerComponent showControls />);

  const drawerToggleButton = page.getByRole("button", {
    name: "toggle sidebar",
  });
  await drawerToggleButton.focus();
  await expect(drawerToggleButton).toHaveCSS(
    "box-shadow",
    "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
  );
  await expect(drawerToggleButton).toHaveCSS(
    "outline",
    "rgba(0, 0, 0, 0) solid 3px",
  );
});

test.describe("check props for Drawer component", () => {
  test("should render component with toggle control when showControls prop is true", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerComponent showControls />);

    const toggleButton = page.getByRole("button", { name: "toggle sidebar" });
    await expect(toggleButton).toBeVisible();
  });
  test("should render control button with correct style when expanded is true", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerComponent showControls expanded />);

    const toggleButton = page.getByRole("button", { name: "toggle sidebar" });
    await expect(toggleButton).toHaveCSS(
      "transform",
      "matrix(-1, 0, 0, -1, 0, 0)",
    );
  });

  test("should render control button with correct style when expanded is false", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerComponent showControls expanded={false} />);

    const toggleButton = page.getByRole("button", { name: "toggle sidebar" });
    await expect(toggleButton).toHaveCSS(
      "transform",
      "matrix(1, 0, 0, 1, 0, 0)",
    );
  });

  test("should render component with custom expandedWidth", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerComponent expandedWidth="600px" />);

    await assertCssValueIsApproximately(drawerAsideContent(page), "width", 600);
  });

  test("should render component with custom backgroundColor", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerComponent backgroundColor="#FF0000" />);

    const color = "rgb(255, 0, 0)";
    const asideContent = drawerAsideContent(page);
    await expect(asideContent).toHaveCSS("background-color", color);
  });

  test("should render component with custom height", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerComponent height="75%" />);

    const drawerElement = drawer(page);
    await expect(drawerElement).toHaveAttribute("height", "75%");
  });

  test("should render component with custom title", async ({ mount, page }) => {
    await mount(<DrawerComponent title="playwright_title" />);

    const title = page.getByText("playwright_title");
    await expect(title).toBeVisible();
  });
});

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
