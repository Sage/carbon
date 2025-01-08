import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";

import { TabProps, TabsProps } from ".";
import {
  tabList,
  tabWrapper,
  tabById,
  tabContentById,
  tabTitleById,
  navButtonWrapperById,
  navButtonById,
} from "../../../playwright/components/tabs";
import {
  TabsComponent,
  TabsComponentValidations,
  TabsComponentValidationsUnregistering,
  TabsValidationOverride,
  TabsInSidebar,
  WithAdditionalTitleSiblings,
  WithAdditionalTitleSiblingsSizeLarge,
  WithCustomLayout,
  WithStringValidationsSummarised,
  Responsive,
  WithUpdatingChild,
} from "./components.test-pw";
import {
  getDataElementByValue,
  tooltipPreview,
} from "../../../playwright/components";
import { ICON, PILL_PREVIEW } from "../../../playwright/components/locators";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  checkAccessibility,
  assertCssValueIsApproximately,
  getStyle,
} from "../../../playwright/support/helper";

const validationTypes = ["error", "warning", "info"] as const;

const specialCharacters = [
  CHARACTERS.STANDARD,
  CHARACTERS.DIACRITICS,
  CHARACTERS.SPECIALCHARACTERS,
];

test.describe("Tabs component", () => {
  [1, 2, 3, 4, 5].forEach((id) => {
    test(`should verify when Tab ${id} is clicked that it is visible and content text is displayed`, async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent />);

      await tabById(page, id).click();

      await expect(tabContentById(page, id)).toBeVisible();
      await expect(tabContentById(page, id)).toHaveText(
        `Content for tab ${id}`,
      );
    });
  });

  test("should verify the first Tab has a link property", async ({
    mount,
    page,
  }) => {
    await mount(<TabsComponent href="https://carbon.sage.com/" />);

    await expect(tabById(page, 1)).toHaveAttribute(
      "href",
      "https://carbon.sage.com/",
    );
    await expect(tabById(page, 1)).toHaveAttribute("target", "_blank");
  });

  test("should not render Tabs hidden content when renderHiddenTabs prop is false", async ({
    mount,
    page,
  }) => {
    await mount(<TabsComponent renderHiddenTabs={false} />);

    await expect(tabContentById(page, 1)).toBeVisible();
    await expect(tabContentById(page, 2)).not.toBeAttached();
  });

  [5, 4, 3, 2, 1].forEach((id) => {
    test(`should render the correct Tab and content when selectedTabId prop is set to ${id}`, async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent selectedTabId={`tab-${id}`} />);

      await tabById(page, id).click();

      await expect(tabContentById(page, id)).toBeVisible();
      await expect(tabContentById(page, id)).toHaveText(
        `Content for tab ${id}`,
      );
    });
  });

  (
    [
      ["right", "right", "flex-end"],
      ["left", "start", "normal"],
    ] as [TabsProps["align"], string, string][]
  ).forEach(([align, textAlign, justifyContent]) => {
    test(`should render Tabs with align prop set to ${align}`, async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent align={align} />);

      await expect(tabWrapper(page)).toHaveCSS("text-align", textAlign);
      await expect(tabWrapper(page)).toHaveCSS(
        "justify-content",
        justifyContent,
      );
    });
  });

  (
    [
      ["top", "row", 42],
      ["left", "column", 200],
    ] as [TabsProps["position"], string, number][]
  ).forEach(([pos, flex, height]) => {
    test(`should render Tabs with position prop set to ${pos}`, async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent position={pos} />);

      const tabParent = tabById(page, 1).locator("..");

      await expect(tabParent).toHaveCSS("flex-direction", flex);
      await assertCssValueIsApproximately(tabParent, "height", height);
    });
  });

  (
    [
      ["default", 40, 67],
      ["large", 48, 88],
    ] as [TabsProps["size"], number, number][]
  ).forEach(([size, height, width]) => {
    test(`should render Tabs with size prop set to ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent size={size} />);

      await assertCssValueIsApproximately(tabById(page, 1), "height", height);
      await assertCssValueIsApproximately(tabById(page, 1), "width", width);
    });
  });

  (
    [
      [true, 1358],
      [false, 380],
    ] as [boolean, number][]
  ).forEach(([bool, width]) => {
    test(`should render Tabs with extendedLine prop set to ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent extendedLine={bool} />);

      const val = await getStyle(tabWrapper(page), "width");
      expect(parseInt(val)).toBeGreaterThanOrEqual(width - 6);
      expect(parseInt(val)).toBeLessThanOrEqual(width + 4);
    });
  });

  (
    [
      ["off", "none", "none", "none", "none"],
      ["on", "solid", "none", "solid", "solid"],
      ["no sides", "solid", "none", "none", "none"],
    ] as [TabsProps["borders"], string, string, string, string][]
  ).forEach(([state, top, bottom, right, left]) => {
    test(`should render Tabs with borders prop set to ${state} when positioned on top`, async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent borders={state} />);

      const tabText = page.getByText("Tab 1", { exact: true });

      await expect(tabText).toHaveCSS("border-top-style", top);
      await expect(tabText).toHaveCSS("border-bottom-style", bottom);
      await expect(tabText).toHaveCSS("border-right-style", right);
      await expect(tabText).toHaveCSS("border-left-style", left);
    });
  });

  (
    [
      ["off", "none", "none", "none", "none"],
      ["on", "solid", "solid", "none", "solid"],
      ["no sides", "solid", "solid", "none", "none"],
    ] as [TabsProps["borders"], string, string, string, string][]
  ).forEach(([state, top, bottom, right, left]) => {
    test(`should render Tabs with borders prop set to ${state} when positioned to the left`, async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent position="left" borders={state} />);

      const tabText = page.getByText("Tab 1", { exact: true });

      await expect(tabText).toHaveCSS("border-top-style", top);
      await expect(tabText).toHaveCSS("border-bottom-style", bottom);
      await expect(tabText).toHaveCSS("border-right-style", right);
      await expect(tabText).toHaveCSS("border-left-style", left);
    });
  });

  test("should render Tabs header with correct width set by headerWidth prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <TabsComponent headerWidth="440px" align="left" position="left" />,
    );

    await expect(tabList(page).locator("..")).toHaveCSS("width", "440px");
  });

  (
    [
      ["default", "rgb(255, 255, 255)"],
      ["alternate", "rgb(204, 214, 219)"],
    ] as [TabsProps["variant"], string][]
  ).forEach(([variant, backgroundColor]) => {
    test(`should render Tabs with variant prop set to ${variant}`, async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent variant={variant} />);

      await expect(tabById(page, 1)).toHaveCSS(
        "background-color",
        backgroundColor,
      );
    });
  });

  specialCharacters.forEach(([text]) => {
    test(`should render Tabs with title prop set to ${text}`, async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent title={text} />);

      await expect(tabById(page, 1)).toHaveText(text);
    });
  });

  test("should render Tabs with correct tabId", async ({ mount, page }) => {
    await mount(<TabsComponent tabId={specialCharacters[0]} />);

    await expect(getDataElementByValue(page, "select-tab").nth(0)).toHaveId(
      `${specialCharacters[0]}-tab`,
    );
  });

  test("should render Tabs with customLayout prop", async ({ mount, page }) => {
    await mount(<WithCustomLayout />);

    await expect(tabById(page, 1).locator(ICON).nth(0)).toBeVisible();
    await expect(tabById(page, 1).locator(ICON).nth(1)).toBeVisible();
    await expect(page.getByText("Tab 1", { exact: true })).toBeVisible();
  });

  test("should render Tabs with siblings prop", async ({ mount, page }) => {
    await mount(<WithAdditionalTitleSiblings />);

    const pill = tabById(page, 1).locator(PILL_PREVIEW);

    await expect(pill).toBeVisible();
    await expect(pill).toHaveText("12");
  });

  (
    [
      ["before", 1, "left"],
      ["after", 3, "right"],
    ] as [TabProps["titlePosition"], number, string][]
  ).forEach(([pos, id, style]) => {
    test(`should render Tabs with titlePosition prop set to ${pos}`, async ({
      mount,
      page,
    }) => {
      await mount(<WithAdditionalTitleSiblings />);

      const layoutWrapper = tabById(page, id)
        .locator(PILL_PREVIEW)
        .locator("..");

      await expect(layoutWrapper).toHaveCSS(style, "8px");
    });
  });

  (
    [
      [1, validationTypes[0]],
      [2, validationTypes[1]],
      [3, validationTypes[2]],
    ] as [number, string][]
  ).forEach(([id, validation]) => {
    test(`should render Tab ${id} with ${validation}`, async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponentValidations />);

      await expect(tabById(page, id).locator(ICON)).toHaveAttribute(
        "type",
        validation,
      );
    });
  });

  (
    [
      [1, validationTypes[0]],
      [2, validationTypes[1]],
      [3, validationTypes[2]],
    ] as [number, string][]
  ).forEach(([id, validation]) => {
    test(`should display ${validation} message when hovering over Tab ${id}`, async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponentValidations />);

      await tabById(page, id).hover();

      await expect(tooltipPreview(page)).toHaveText(validation);
    });
  });

  validationTypes.forEach((validation) => {
    test(`should no longer report ${validation} validation of children no longer mounted`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TabsComponentValidationsUnregistering validationType={validation} />,
      );

      const icon = tabById(page, 1).locator(ICON);
      await expect(icon).toBeVisible();

      await getDataElementByValue(page, "foo-button").click();
      await expect(icon).not.toBeVisible();
    });
  });

  test("should render Tabs with validationStatusOverride", async ({
    mount,
    page,
  }) => {
    await mount(<TabsValidationOverride />);

    await expect(tabById(page, 1).locator(ICON)).not.toBeVisible();
    await expect(page.getByText("Tab 1", { exact: true })).toHaveCSS(
      "outline-color",
      "rgba(0, 0, 0, 0.9)",
    );
  });

  test("should focus on next Tab title when right arrow key event is triggered", async ({
    mount,
    page,
  }) => {
    await mount(<TabsComponent />);

    await tabById(page, 1).press("ArrowRight");
    await expect(tabTitleById(page, 2)).toBeFocused();
  });

  test("should focus on previous Tab title when left arrow key event is triggered", async ({
    mount,
    page,
  }) => {
    await mount(<TabsComponent />);

    await tabById(page, 2).press("ArrowLeft");
    await expect(tabTitleById(page, 1)).toBeFocused();
  });

  test("should focus on next Tab title when down arrow key event is triggered and position is left", async ({
    mount,
    page,
  }) => {
    await mount(<TabsComponent position="left" />);

    await tabById(page, 1).press("ArrowDown");
    await expect(tabTitleById(page, 2)).toBeFocused();
  });

  test("should focus on previous Tab title when up arrow key event is triggered and position is left", async ({
    mount,
    page,
  }) => {
    await mount(<TabsComponent position="left" />);

    await tabById(page, 2).press("ArrowUp");
    await expect(tabTitleById(page, 1)).toBeFocused();
  });

  test("should focus on next Tab title when down arrow key event is triggered in Sidebar", async ({
    mount,
    page,
  }) => {
    await mount(<TabsInSidebar />);

    await tabById(page, 1).press("ArrowDown");
    await expect(tabTitleById(page, 2)).toBeFocused();
  });

  test("should focus on previous Tab title when up arrow key event is triggered in Sidebar", async ({
    mount,
    page,
  }) => {
    await mount(<TabsInSidebar />);

    await tabById(page, 2).press("ArrowUp");
    await expect(tabTitleById(page, 1)).toBeFocused();
  });

  (
    [
      ["top", "8px 8px 0px 0px"],
      ["left", "8px 0px 0px 8px"],
    ] as [TabsProps["position"], string][]
  ).forEach(([pos, borderRadius]) => {
    test(`should render Tabs with expected border radius when position is ${pos}`, async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent position={pos} />);

      await expect(tabById(page, 1)).toHaveCSS("border-radius", borderRadius);
      await expect(tabById(page, 2)).toHaveCSS("border-radius", borderRadius);
      await expect(tabById(page, 3)).toHaveCSS("border-radius", borderRadius);
      await expect(tabById(page, 4)).toHaveCSS("border-radius", borderRadius);
      await expect(tabById(page, 5)).toHaveCSS("border-radius", borderRadius);
    });
  });

  test.describe("Accessibility tests for Tabs component", () => {
    test("should pass accessibility tests for Tabs component", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is top and align is right", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent position="top" align="right" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is left and align is left", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent position="left" align="left" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is left and align is right", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent position="left" align="right" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests with link as a tab", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent href="https://carbon.sage.com/" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests with selectedTabId", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent selectedTabId="tab-2" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when extendedLine is false", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent extendedLine={false} />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is top and size is large", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent position="top" size="large" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is left and size is large ", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent position="left" size="large" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is top and borders are on", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent position="top" borders="on" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is top and borders with no sides", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent position="top" borders="no sides" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is left and borders are on", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent position="left" borders="on" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is left and borders with no sides", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent position="left" borders="no sides" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is top and validations", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponentValidations position="top" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is top, size is large and validations", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponentValidations position="top" size="large" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is left and validations", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponentValidations position="left" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is left, size is large and validations", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponentValidations position="left" size="large" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests with additional title siblings example", async ({
      mount,
      page,
    }) => {
      await mount(<WithAdditionalTitleSiblings />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests with additional title siblings and size is large example", async ({
      mount,
      page,
    }) => {
      await mount(<WithAdditionalTitleSiblingsSizeLarge />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests with custom layout example", async ({
      mount,
      page,
    }) => {
      await mount(<WithCustomLayout />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests with variant prop set to alternate", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent variant="alternate" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests with headerWidth prop", async ({
      mount,
      page,
    }) => {
      await mount(
        <TabsComponent headerWidth="400px" align="left" position="left" />,
      );

      await checkAccessibility(page);
    });

    test("should pass accessibility tests with custom spacing", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent m={8} p={5} />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests with string validations summarised example", async ({
      mount,
      page,
    }) => {
      await mount(<WithStringValidationsSummarised />);

      await tabById(page, 1).locator(ICON).hover();

      await checkAccessibility(page);
    });

    test("should pass accessibility tests on responsive tabs", async ({
      mount,
      page,
    }) => {
      await mount(<Responsive />);

      await checkAccessibility(page);
    });
  });

  [1, 2, 3, 4, 5].forEach((id) => {
    test(`should render Tab ${id} with expected focus styling`, async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent />);

      await tabById(page, id).focus();
      await expect(tabById(page, id)).toHaveCSS(
        "outline",
        "rgb(0, 0, 0) solid 4px",
      );
    });
  });

  test("when the children of a Tab update, the selected tab does not change", async ({
    mount,
    page,
  }) => {
    await mount(<WithUpdatingChild />);

    await page.getByRole("button").click();

    await expect(page.getByText("Content for tab 2")).toBeVisible();
    await expect(page.getByText("Content for tab 1")).not.toBeVisible();
  });

  test("navigation buttons only appear when there are preceding or succeeding tab titles out of view", async ({
    mount,
    page,
  }) => {
    // Load the responsive page
    await mount(<Responsive />);

    // The left navigation button should not be visible
    await expect(navButtonWrapperById(page, "left")).toHaveCSS(
      "display",
      "none",
    );
    // The right navigation button should be visible
    await expect(navButtonWrapperById(page, "right")).toHaveCSS(
      "display",
      "block",
    );

    // Click the right navigation button
    await navButtonById(page, `right`).click();

    // Expect the left navigation button to have appeared
    await expect(navButtonWrapperById(page, "left")).toHaveCSS(
      "display",
      "block",
    );

    // Click the right navigation button
    await navButtonById(page, `right`).click();

    // Expect the right navigation button to have disappeared
    await expect(navButtonWrapperById(page, "right")).toHaveCSS(
      "display",
      "none",
    );

    // Click the left navigation button
    await navButtonById(page, `left`).click();

    // The right navigation button should be visible
    await expect(navButtonWrapperById(page, "right")).toHaveCSS(
      "display",
      "block",
    );
    // The left navigation button should not be visible
    await expect(navButtonWrapperById(page, "left")).toHaveCSS(
      "display",
      "none",
    );
  });
});
