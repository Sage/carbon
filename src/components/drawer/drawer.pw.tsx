import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import type { HooksConfig } from "../../../playwright/index";
import {
  DrawerCustom,
  DrawerCustomFooterHeader,
  DrawerCustomSidebar,
} from "./components.test-pw";
import {
  drawer,
  drawerToggle,
  drawerSidebar,
  drawerSidebarContentInnerElement,
  drawerAsideContent,
} from "../../../playwright/components/drawer";
import { stickyFooter } from "../../../playwright/components/index";
import {
  checkAccessibility,
  assertCssValueIsApproximately,
  isInViewport,
  waitForAnimationEnd,
} from "../../../playwright/support/helper";

test.describe("check focus outline and border radius for Drawer component", () => {
  test("should have the expected styling when the focusRedesignOptOut is false", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerCustom showControls />);

    const drawerToggleButton = drawerToggle(page);
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

  test("should have the expected styling when the focusRedesignOptOut is true", async ({
    mount,
    page,
  }) => {
    await mount<HooksConfig>(<DrawerCustom showControls />, {
      hooksConfig: {
        focusRedesignOptOut: true,
      },
    });

    const drawerToggleButton = drawerToggle(page);
    await drawerToggleButton.focus();
    await expect(drawerToggleButton).toHaveCSS(
      "outline",
      "rgb(255, 188, 25) solid 3px",
    );
  });

  test("has the expected border radius styling on the sidebar control", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerCustom showControls />);

    const drawerToggleButton = drawerToggle(page);
    await drawerToggleButton.focus();
    await expect(drawerToggleButton).toHaveCSS("border-radius", "4px");
  });
});

test.describe("check props for Drawer component", () => {
  (
    [
      [false, "matrix(-1, 0, 0, 1, 0, 0)", "true"],
      [true, "none", "false"],
    ] as [boolean, string, string][]
  ).forEach(([clickIt, transformVal, expandedVal]) => {
    test(`should verify chevron orientation when showControls prop is ${expandedVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<DrawerCustom showControls />);

      const drawerToggleButton = drawerToggle(page);
      if (clickIt) {
        await drawerToggleButton.click();
        await expect(drawerToggleButton).toBeVisible();
      }

      const sidebarInnerElementOne = drawerSidebarContentInnerElement(page, 0);
      const sidebarInnerElementTwo = drawerSidebarContentInnerElement(page, 1);
      const sidebarInnerElementThree = drawerSidebarContentInnerElement(
        page,
        2,
      );
      await expect(drawerToggleButton).toHaveCSS("transform", transformVal);
      await expect(drawerToggleButton).toHaveAttribute(
        "aria-expanded",
        expandedVal,
      );
      await expect(sidebarInnerElementOne).toHaveText("link a");
      await expect(sidebarInnerElementTwo).toHaveText("link b");
      await expect(sidebarInnerElementThree).toHaveText("link c");
      if (expandedVal === "true") {
        await expect(sidebarInnerElementOne).toBeVisible();
        await expect(sidebarInnerElementTwo).toBeVisible();
        await expect(sidebarInnerElementThree).toBeVisible();
      } else {
        await expect(sidebarInnerElementOne).not.toBeVisible();
        await expect(sidebarInnerElementTwo).not.toBeVisible();
        await expect(sidebarInnerElementThree).not.toBeVisible();
      }
    });
  });

  ["3s", "15s"].forEach((animationDuration) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should check animation time is set to ${animationDuration}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DrawerCustom showControls animationDuration={animationDuration} />,
      );

      await waitForAnimationEnd(
        page.locator('[data-element="drawer-content"]'),
      );
      const drawerToggleButton = drawerToggle(page);
      await drawerToggleButton.click();
      const sidebar = drawerSidebar(page);
      await expect(sidebar).toBeVisible();
      await expect(sidebar).toHaveCSS("animation-duration", animationDuration);
    });
  });

  test("should render component closed by default", async ({ mount, page }) => {
    await mount(<DrawerCustom defaultExpanded={false} />);

    const sidebarInnerElement = drawerSidebarContentInnerElement(page, 0);
    await expect(sidebarInnerElement).toHaveText("link a");
    await expect(sidebarInnerElement).not.toBeVisible();
  });

  test("should render component opened when the expanded prop is true", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerCustom expanded />);

    const sidebarInnerElement = drawerSidebarContentInnerElement(page, 0);
    await expect(sidebarInnerElement).toHaveText("link a");
    await expect(sidebarInnerElement).toBeVisible();
  });

  test("should render component with custom sidebar", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerCustomSidebar />);

    const sidebarInnerElement = drawerSidebarContentInnerElement(page, 0);
    await expect(sidebarInnerElement).toHaveText("playwright");
    await expect(sidebarInnerElement).toBeVisible();
  });

  test("should render component with custom expandedWidth", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerCustom expandedWidth="65%" />);

    await assertCssValueIsApproximately(drawerAsideContent(page), "width", 887);
  });

  test("should render component with custom backgroundColor", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerCustom backgroundColor="#FF0000" />);

    const color = "rgb(255, 0, 0)";
    const asideContent = drawerAsideContent(page);
    await expect(asideContent).toHaveCSS("background-color", color);
    await expect(asideContent).toHaveCSS("border-right-color", color);
  });

  test("should render component with custom height", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerCustom height="75%" />);

    const drawerElement = drawer(page);
    await expect(drawerElement).toHaveAttribute("height", "75%");
  });

  test("should render component with custom title", async ({ mount, page }) => {
    await mount(<DrawerCustom title="playwright_title" />);

    const drawerTitle = drawerAsideContent(page).locator("div").first();
    await expect(drawerTitle).toHaveText("playwright_title");
  });

  test("should render component with toggle control when showControls prop is true", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerCustom showControls />);

    const drawerToggleButton = drawerToggle(page);
    await expect(drawerToggleButton).toBeVisible();
  });

  test("should render component without toggle control when showControls prop is falsy", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerCustom />);

    const drawerToggleButton = drawerToggle(page);
    expect(await drawerToggleButton.count()).toEqual(0);
  });

  test("should render component with custom footer", async ({
    mount,
    page,
  }) => {
    await mount(
      <div
        style={{
          height: "200px",
        }}
      >
        <DrawerCustomFooterHeader />
      </div>,
    );

    const footer = stickyFooter(page);
    const inViewport = await isInViewport(page, footer);
    expect(inViewport).toBe(false);
  });

  test("should render component with custom stickyFooter", async ({
    mount,
    page,
  }) => {
    await mount(
      <div
        style={{
          height: "200px",
        }}
      >
        <DrawerCustomFooterHeader stickyFooter />
      </div>,
    );

    const footer = stickyFooter(page);
    const inViewport = await isInViewport(page, footer);
    expect(inViewport).toBe(true);
  });

  test("should render component with custom stickyHeader", async ({
    mount,
    page,
  }) => {
    await mount(
      <div
        style={{
          height: "400px",
        }}
      >
        <DrawerCustomFooterHeader stickyHeader />
      </div>,
    );

    const footer = stickyFooter(page);
    await footer.scrollIntoViewIfNeeded();
    const drawerTitle = drawerAsideContent(page).locator("div").first();
    await expect(drawerTitle).toHaveText("Drawer title");
    await expect(drawerTitle).toBeVisible();
  });
});

test.describe("check events for Drawer component", () => {
  test("should call onChange callback when a component is closed", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <DrawerCustom
        showControls
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    const drawerToggleButton = drawerToggle(page);
    await drawerToggleButton.click();
    expect(callbackCount).toBe(1);
  });

  test("should call onChange callback when a component is expanded", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <DrawerCustom
        showControls
        expanded={false}
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    const drawerToggleButton = drawerToggle(page);
    await drawerToggleButton.click();
    expect(callbackCount).toBe(1);
  });
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
      await mount(<DrawerCustom showControls expanded={clickIt} />);

      await checkAccessibility(page);
    });
  });

  ["3s", "15s"].forEach((animationDuration) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should pass accessibility tests when animation time is set to ${animationDuration}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DrawerCustom showControls animationDuration={animationDuration} />,
      );

      await waitForAnimationEnd(
        page.locator('[data-element="drawer-content"]'),
      );

      const drawerToggleButton = drawerToggle(page);
      await drawerToggleButton.click();
      const sidebar = drawerSidebar(page);
      await expect(sidebar).toBeVisible();
      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests when closed by default", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerCustom defaultExpanded={false} />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when expanded prop is true", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerCustom expanded />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with custom sidebar", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerCustomSidebar />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with custom expandedWidth", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerCustom expandedWidth="65%" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with custom backgroundColor", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerCustom backgroundColor="#FF0000" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with custom height", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerCustom height="75%" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with custom title", async ({
    mount,
    page,
  }) => {
    await mount(<DrawerCustom title="playwright_title" />);

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
        <DrawerCustomFooterHeader />
      </div>,
    );

    await checkAccessibility(page);
  });

  test("should pass accessibility tests custom stickyFooter", async ({
    mount,
    page,
  }) => {
    await mount(
      <div
        style={{
          height: "200px",
        }}
      >
        <DrawerCustomFooterHeader stickyFooter />
      </div>,
    );

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with custom stickyHeader", async ({
    mount,
    page,
  }) => {
    await mount(
      <div
        style={{
          height: "200px",
        }}
      >
        <DrawerCustom stickyHeader />
      </div>,
    );

    await checkAccessibility(page);
  });
});
