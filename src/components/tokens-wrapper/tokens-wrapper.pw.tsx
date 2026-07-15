import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import {
  TokensWrapperWithPortal,
  TokensWrapperWithPopover,
  TokenOverridesWithPortal,
  TokenOverridesWithPopover,
  MultipleTokensWrappersWithPortals,
  MultipleTokensWrappersWithPopovers,
} from "./components.test-pw";

const overrides = {
  light: {
    primaryBrand: "#ff0000",
    primaryBrandHover: "yellow",
    primaryBrandActive: "rgb(219, 0, 78)",
    onPrimaryBrand: "#ffffff",
  },
  focus: {
    inner: "green",
    outer: "blue",
    alt: "white",
  },
  font: {
    family: {
      heading: "Arial, sans-serif",
    },
  },
  borderRadiusScale: "0.5",
};

const overrides2 = {
  light: {
    primaryBrand: "#65c73b",
    primaryBrandHover: "pink",
    primaryBrandActive: "rgb(188, 67, 110)",
    onPrimaryBrand: "#060000",
  },
  focus: {
    inner: "cyan",
    outer: "brown",
    alt: "black",
  },
  font: {
    family: {
      heading: "Verdana, sans-serif",
    },
  },
  borderRadiusScale: "0.1",
};

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

  test("should provide token overrides in scope of Portals", async ({
    mount,
    page,
  }) => {
    await mount(<TokenOverridesWithPortal overrides={overrides} />);

    const portalChild = page.locator('[data-role="portal-child"]');

    await expect(portalChild).toHaveCSS("--primaryBrand", "#ff0000");
    await expect(portalChild).toHaveCSS("--primaryBrandHover", "yellow");
    await expect(portalChild).toHaveCSS(
      "--primaryBrandActive",
      "rgb(219,0,78)",
    );
    await expect(portalChild).toHaveCSS("--onPrimaryBrand", "#ffffff");
    await expect(portalChild).toHaveCSS("--fontFamily", "Arial,sans-serif");
    await expect(portalChild).toHaveCSS("--focusInner", "green");
    await expect(portalChild).toHaveCSS("--focusOuter", "blue");
    await expect(portalChild).toHaveCSS("--focusAlt", "white");
    await expect(portalChild).toHaveCSS("--borderRadiusScale", "0.5");
  });

  test("should provide scoped token overrides to portals when multiple TokensWrappers are rendered", async ({
    mount,
    page,
  }) => {
    await mount(
      <MultipleTokensWrappersWithPortals
        overrides1={overrides}
        overrides2={overrides2}
      />,
    );

    const portalChild1 = page.locator('[data-role="portal-child-1"]');
    const portalChild2 = page.locator('[data-role="portal-child-2"]');

    await expect(portalChild1).toHaveCSS("--primaryBrand", "#ff0000");
    await expect(portalChild1).toHaveCSS("--primaryBrandHover", "yellow");
    await expect(portalChild1).toHaveCSS(
      "--primaryBrandActive",
      "rgb(219,0,78)",
    );
    await expect(portalChild1).toHaveCSS("--onPrimaryBrand", "#ffffff");
    await expect(portalChild1).toHaveCSS("--fontFamily", "Arial,sans-serif");
    await expect(portalChild1).toHaveCSS("--focusInner", "green");
    await expect(portalChild1).toHaveCSS("--focusOuter", "blue");
    await expect(portalChild1).toHaveCSS("--focusAlt", "white");
    await expect(portalChild1).toHaveCSS("--borderRadiusScale", "0.5");
    await expect(portalChild2).toHaveCSS("--primaryBrand", "#65c73b");
    await expect(portalChild2).toHaveCSS("--primaryBrandHover", "pink");
    await expect(portalChild2).toHaveCSS(
      "--primaryBrandActive",
      "rgb(188,67,110)",
    );
    await expect(portalChild2).toHaveCSS("--onPrimaryBrand", "#060000");
    await expect(portalChild2).toHaveCSS("--fontFamily", "Verdana,sans-serif");
    await expect(portalChild2).toHaveCSS("--focusInner", "cyan");
    await expect(portalChild2).toHaveCSS("--focusOuter", "brown");
    await expect(portalChild2).toHaveCSS("--focusAlt", "black");
    await expect(portalChild2).toHaveCSS("--borderRadiusScale", "0.1");
  });

  test("should provide token overrides in scope of PopoverContainers", async ({
    mount,
    page,
  }) => {
    await mount(<TokenOverridesWithPopover overrides={overrides} />);

    const popoverChild = page.locator('[data-role="popover-child"]');

    await expect(popoverChild).toHaveCSS("--primaryBrand", "#ff0000");
    await expect(popoverChild).toHaveCSS("--primaryBrandHover", "yellow");
    await expect(popoverChild).toHaveCSS(
      "--primaryBrandActive",
      "rgb(219,0,78)",
    );
    await expect(popoverChild).toHaveCSS("--onPrimaryBrand", "#ffffff");
    await expect(popoverChild).toHaveCSS("--fontFamily", "Arial,sans-serif");
    await expect(popoverChild).toHaveCSS("--focusInner", "green");
    await expect(popoverChild).toHaveCSS("--focusOuter", "blue");
    await expect(popoverChild).toHaveCSS("--focusAlt", "white");
    await expect(popoverChild).toHaveCSS("--borderRadiusScale", "0.5");
  });

  test("should provide scoped token overrides to popovers when multiple TokensWrappers are rendered", async ({
    mount,
    page,
  }) => {
    await mount(
      <MultipleTokensWrappersWithPopovers
        overrides1={overrides}
        overrides2={overrides2}
      />,
    );

    const popoverChild1 = page.locator('[data-role="popover-child-1"]');
    const popoverChild2 = page.locator('[data-role="popover-child-2"]');

    await expect(popoverChild1).toHaveCSS("--primaryBrand", "#ff0000");
    await expect(popoverChild1).toHaveCSS("--primaryBrandHover", "yellow");
    await expect(popoverChild1).toHaveCSS(
      "--primaryBrandActive",
      "rgb(219,0,78)",
    );
    await expect(popoverChild1).toHaveCSS("--onPrimaryBrand", "#ffffff");
    await expect(popoverChild1).toHaveCSS("--fontFamily", "Arial,sans-serif");
    await expect(popoverChild1).toHaveCSS("--focusInner", "green");
    await expect(popoverChild1).toHaveCSS("--focusOuter", "blue");
    await expect(popoverChild1).toHaveCSS("--focusAlt", "white");
    await expect(popoverChild1).toHaveCSS("--borderRadiusScale", "0.5");
    await expect(popoverChild2).toHaveCSS("--primaryBrand", "#65c73b");
    await expect(popoverChild2).toHaveCSS("--primaryBrandHover", "pink");
    await expect(popoverChild2).toHaveCSS(
      "--primaryBrandActive",
      "rgb(188,67,110)",
    );
    await expect(popoverChild2).toHaveCSS("--onPrimaryBrand", "#060000");
    await expect(popoverChild2).toHaveCSS("--fontFamily", "Verdana,sans-serif");
    await expect(popoverChild2).toHaveCSS("--focusInner", "cyan");
    await expect(popoverChild2).toHaveCSS("--focusOuter", "brown");
    await expect(popoverChild2).toHaveCSS("--focusAlt", "black");
    await expect(popoverChild2).toHaveCSS("--borderRadiusScale", "0.1");
  });
});
