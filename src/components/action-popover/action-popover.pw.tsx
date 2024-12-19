/* eslint-disable no-await-in-loop */
import { expect, test } from "@playwright/experimental-ct-react17";
import React from "react";
import { accordionDefaultTitle } from "../../../playwright/components/accordion";
import {
  actionPopover,
  actionPopoverButton,
  actionPopoverInnerItem,
  actionPopoverMenuItemChevron,
  actionPopoverMenuItemIcon,
  actionPopoverMenuItemInnerText,
  actionPopoverSubmenu,
  actionPopoverSubmenuByIndex,
  actionPopoverWrapper,
} from "../../../playwright/components/action-popover";
import { buttonDataComponent } from "../../../playwright/components/button";
import { alertDialogPreview } from "../../../playwright/components/dialog";
import { getDataElementByValue } from "../../../playwright/components/index";
import {
  checkAccessibility,
  getDesignTokensByCssProperty,
} from "../../../playwright/support/helper";
import { Accordion } from "../../../src/components/accordion";
import {
  ActionPopoverMenuButton,
  RenderButtonProps,
} from "../../../src/components/action-popover";
import {
  ActionPopoverCustom,
  ActionPopoverMenuWithProps,
  ActionPopoverPropsComponent,
  ActionPopoverWithIconsAndNoSubmenus,
  ActionPopoverWithIconsAndSomeSubmenus,
  ActionPopoverWithNoIconsOrSubmenus,
  ActionPopoverWithProps,
  ActionPopoverWithSomeSubmenusAndNoIcons,
  ActionPopoverWithSubmenusAndIcons,
  ActionPopoverWithSubmenusAndNoIcons,
  ActionPopoverWithSubmenusAndSomeIcons,
  ActionPopoverWithVariableChildren,
  ActionPopoverWithRenderProp,
  ActionPopoverPropsComponentAllDisabled,
  ActionPopoverPropsComponentWithSomeDisabled,
  ActionPopoverPropsComponentWithOnlyFirstAndLastNotDisabled,
  ActionPopoverPropsComponentWithFirstAndLastDisabled,
  ActionPopoverWithDownloadButton,
  Default,
  AdditionalOptions,
  ContentAlignedRight,
  CustomMenuButton,
  DisabledItems,
  DisabledSubmenu,
  DownloadButton,
  Icons,
  InFlatTable,
  InOverflowHiddenContainer,
  KeyboardNavigationLeftAlignedSubmenu,
  KeyboardNavigationRightAlignedSubmenu,
  KeyboardNavigation,
  MenuOpeningAbove,
  MenuRightAligned,
  NoIcons,
  OpeningAModal,
  Submenu,
  SubmenuPositionedRight,
  ActionPopoverNestedInDialog,
  LongMenuExample,
} from "../../../src/components/action-popover/components.test-pw";

const keyToTrigger = ["Enter", " ", "End", "ArrowDown", "ArrowUp"] as const;
const subMenuOption = ["Sub Menu 1", "Sub Menu 2", "Sub Menu 3"] as const;

test.describe("check functionality for ActionPopover component", () => {
  test("should render component", async ({ mount, page }) => {
    await mount(<ActionPopoverCustom />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const actionPopoverElement = actionPopover(page).first();
    await expect(actionPopoverElement).toBeVisible();
  });

  (
    [
      [0, "Email Invoice"],
      [1, "Print Invoice"],
      [2, "Download PDF"],
      [3, "Download CSV"],
      [4, "Delete"],
    ] as [number, string][]
  ).forEach(([times, elementText]) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should be able to press downarrow ${times} times and get button ${elementText} focused`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverCustom />);
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      for (let i = 0; i < times; i++) {
        const focusedElement = page.locator("*:focus");
        await focusedElement.press("ArrowDown");
      }
      const focusedElement = page.locator("*:focus");
      await expect(focusedElement).toContainText(elementText);
    });
  });

  test("should open and focus last element when up keyboard key is used to open menu", async ({
    mount,
    page,
  }) => {
    await mount(<LongMenuExample />);
    await page.setViewportSize({ width: 600, height: 600 });

    const actionPopoverButtonElement = actionPopoverButton(page).first();
    await actionPopoverButtonElement.press("ArrowUp");
    const focusedElement = page.locator("*:focus");

    await expect(focusedElement).toContainText("Download CSV");
    await expect(focusedElement).toBeVisible();
  });

  [keyToTrigger[0], keyToTrigger[1], keyToTrigger[3]].forEach((key) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should open using ${key} keyboard key`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverCustom />);
      const actionPopoverButtonElement = actionPopoverButton(page).first();
      await actionPopoverButtonElement.press(key);
      const focusedElement = page.locator("*:focus");
      await expect(focusedElement).toContainText("Email Invoice");
      const actionPopoverElement = actionPopover(page).first();
      await expect(actionPopoverElement).toBeVisible();
    });
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip("should focus the first element Email Invoice using Home key", async ({
    mount,
    page,
  }) => {
    await mount(<ActionPopoverCustom />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    for (let i = 0; i < 2; i++) {
      const focusedElement = page.locator("*:focus");
      await focusedElement.press("ArrowDown");
    }
    const focusedElement = page.locator("*:focus");
    await focusedElement.press("Home");
    await expect(focusedElement).toContainText("Email Invoice");
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip("should focus the first sub menu 1 element using Home key", async ({
    mount,
    page,
  }) => {
    await mount(<ActionPopoverCustom />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    for (let i = 0; i < 2; i++) {
      const focusedElement = page.locator("*:focus");
      await focusedElement.press("ArrowDown");
    }
    const focusedElement = page.locator("*:focus");
    await focusedElement.press("ArrowLeft");
    for (let i = 0; i < 2; i++) {
      await focusedElement.press("ArrowDown");
    }
    await focusedElement.press("Home");
    await expect(focusedElement).toContainText("Sub Menu 1");
  });

  [keyToTrigger[2], keyToTrigger[4]].forEach((key) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should focus the last element Delete using ${key} keyboard key`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverCustom />);
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      const focusedElement = page.locator("*:focus");
      await focusedElement.press(key);
      await expect(focusedElement).toContainText("Delete");
    });
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip("should focus the last sub menu 2 element using End keyboard key", async ({
    mount,
    page,
  }) => {
    await mount(<ActionPopoverCustom />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    for (let i = 0; i < 2; i++) {
      const focusedElement = page.locator("*:focus");
      await focusedElement.press("ArrowDown");
    }
    const focusedElement = page.locator("*:focus");
    await focusedElement.press("ArrowLeft");
    await focusedElement.press("End");
    await expect(focusedElement).toContainText("Sub Menu 2");
  });

  test("should not scroll to the top of the document when first menu item is focused and component is rendered in a tabular parent", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({
      width: 700,
      height: 300,
    });
    await mount(<InFlatTable />);

    await page.evaluate(() => window.scrollTo(0, 1000));
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const actionPopoverElement = actionPopover(page).first();
    await expect(actionPopoverElement).toBeVisible();

    const focusedElement = page.locator("*:focus");
    await expect(focusedElement).toContainText("Print");

    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).not.toBe(0);
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip("should close using Tab key", async ({ mount, page }) => {
    await mount(<ActionPopoverCustom />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const focusedElement = page.locator("*:focus");
    await focusedElement.press("Tab");
    const actionPopoverElement = actionPopover(page).first();
    await expect(actionPopoverElement).not.toBeVisible();
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip("should close using ShiftTab key", async ({ mount, page }) => {
    await mount(<ActionPopoverCustom />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const focusedElement = page.locator("*:focus");
    await focusedElement.press("Shift+Tab");
    const actionPopoverElement = actionPopover(page).first();
    await expect(actionPopoverElement).not.toBeVisible();
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip("should close using ESC key", async ({ mount, page }) => {
    await mount(<ActionPopoverCustom />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const focusedElement = page.locator("*:focus");
    await focusedElement.press("Escape");
    const actionPopoverElement = actionPopover(page).first();
    await expect(actionPopoverElement).not.toBeVisible();
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip("should close using ESC key if it hasn't got a submenu open", async ({
    mount,
    page,
  }) => {
    await mount(<ActionPopoverCustom />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const focusedElement = page.locator("*:focus");
    await focusedElement.press("ArrowDown");
    await focusedElement.press("Escape");
    const actionPopoverElement = actionPopover(page).first();
    await expect(actionPopoverElement).not.toBeVisible();
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip("should close using ESC key if it has a submenu open", async ({
    mount,
    page,
  }) => {
    await mount(<ActionPopoverCustom />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    for (let i = 0; i < 2; i++) {
      const focusedElement = page.locator("*:focus");
      await focusedElement.press("ArrowDown");
    }
    const focusedElement = page.locator("*:focus");
    await focusedElement.press("ArrowLeft");
    await page.locator("*:focus").press("Escape");
    const actionPopoverElement = actionPopover(page).first();
    await expect(actionPopoverElement).not.toBeVisible();
  });

  test("should close by clicking outside of the component", async ({
    mount,
    page,
  }) => {
    await mount(<ActionPopoverCustom />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await page.locator("body").click();
    const actionPopoverElement = actionPopover(page).first();
    await expect(actionPopoverElement).not.toBeVisible();
  });

  test("should close by clicking onto Open icon", async ({ mount, page }) => {
    await mount(<ActionPopoverCustom />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.dblclick();
    const actionPopoverElement = actionPopover(page).first();
    await expect(actionPopoverElement).not.toBeVisible();
  });

  (
    [
      ["d", "Download PDF", 1],
      ["d", "Download CSV", 2],
      ["d", "Delete", 3],
      ["e", "Email Invoice", 1],
      ["p", "Print Invoice", 1],
    ] as [string, string, number][]
  ).forEach(([key, innerText, times]) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should focus ${innerText} element using ${key} keyboard key`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverCustom />);
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      for (let i = 0; i < times; i++) {
        const focusedElement = page.locator("*:focus");
        await focusedElement.press(key);
      }
      const actionPopoverElement = actionPopover(page).first();
      await expect(actionPopoverElement).toBeVisible();
      const focusedElement = page.locator("*:focus");
      await expect(focusedElement).toContainText(innerText);
    });
  });

  (
    [
      [subMenuOption[0], 0],
      [subMenuOption[1], 1],
    ] as [(typeof subMenuOption)[number], number][]
  ).forEach(([innerText, times]) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should focus ${innerText} element`, async ({ mount, page }) => {
      await mount(<ActionPopoverCustom />);
      const actionPopoverButtonElementEq0 = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElementEq0.click();
      for (let i = 0; i < 2; i++) {
        const focusedElement = page.locator("*:focus");
        await focusedElement.press("ArrowDown");
      }
      const focusedElement = page.locator("*:focus");
      await focusedElement.press("ArrowLeft");
      for (let i = 0; i < times; i++) {
        await focusedElement.press("ArrowDown");
      }
      await expect(focusedElement).toContainText(innerText);
    });
  });

  (
    [[subMenuOption[2], 2]] as [(typeof subMenuOption)[number], number][]
  ).forEach(([innerText, times]) => {
    test(`should not focus ${innerText} element`, async ({ mount, page }) => {
      await mount(<ActionPopoverCustom />);
      const actionPopoverButtonElementEq0 = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElementEq0.click();
      for (let i = 0; i < 2; i++) {
        const focusedElement = page.locator("*:focus");
        await focusedElement.press("ArrowDown");
      }
      const focusedElement = page.locator("*:focus");
      await focusedElement.press("ArrowLeft");
      for (let i = 0; i < times; i++) {
        await focusedElement.press("ArrowDown");
      }
      await expect(focusedElement).not.toContainText(innerText);
    });
  });

  (
    [
      [subMenuOption[0], 0],
      [subMenuOption[1], 1],
    ] as [(typeof subMenuOption)[number], number][]
  ).forEach(([name, position]) => {
    test(`should close ${name} and ActionPopover after press Enter keyboard key`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverCustom />);
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      for (let i = 0; i < 2; i++) {
        const focusedElement = page.locator("*:focus");
        await focusedElement.press("ArrowDown");
      }
      const focusedElement = page.locator("*:focus");
      await focusedElement.press("ArrowLeft");
      const submenuItem = getDataElementByValue(page, "submenu1").nth(position);
      await submenuItem.press("Enter");
      const actionPopoverElement = actionPopover(page).first();
      await expect(actionPopoverElement).not.toBeVisible();
    });
  });

  (
    [
      [subMenuOption[0], false],
      [subMenuOption[1], true],
    ] as [(typeof subMenuOption)[number], boolean][]
  ).forEach(([name, shouldPressDownArrow]) => {
    test(`should close ${name} after press ArrowRight keyboard key`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverCustom />);
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      for (let i = 0; i < 2; i++) {
        const focusedElement = page.locator("*:focus");
        await focusedElement.press("ArrowDown");
      }
      const focusedElement = page.locator("*:focus");
      await focusedElement.press("ArrowLeft");
      if (shouldPressDownArrow) {
        await focusedElement.press("ArrowDown");
      }
      await focusedElement.press("ArrowRight");
      const submenu = actionPopoverSubmenuByIndex(page, 1);
      await expect(submenu).not.toBeVisible();
    });
  });

  (
    [
      [subMenuOption[0], false],
      [subMenuOption[1], true],
    ] as [(typeof subMenuOption)[number], boolean][]
  ).forEach(([name, shouldPressDownArrow]) => {
    test(`should close ${name} and ActionPopover after press Esc keyboard key`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverCustom />);
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      for (let i = 0; i < 2; i++) {
        const focusedElement = page.locator("*:focus");
        await focusedElement.press("ArrowDown");
      }
      const focusedElement = page.locator("*:focus");
      await focusedElement.press("ArrowLeft");
      if (shouldPressDownArrow) {
        await focusedElement.press("ArrowDown");
      }
      await focusedElement.press("Escape");
      const actionPopoverElement = actionPopover(page).first();
      await expect(actionPopoverElement).not.toBeVisible();
    });
  });

  [[subMenuOption[0]], [subMenuOption[1]]].forEach(([name]) => {
    test(`should close ${name} and ActionPopover after clicking on the submenu`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverCustom />);
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      for (let i = 0; i < 2; i++) {
        const focusedElement = page.locator("*:focus");
        await focusedElement.press("ArrowDown");
      }
      const focusedElement = page.locator("*:focus");
      await focusedElement.press("ArrowLeft");
      for (let i = 0; i < 2; i++) {
        await focusedElement.press("ArrowDown");
      }
      await focusedElement.click();
      const actionPopoverElement = actionPopover(page).first();
      await expect(actionPopoverElement).not.toBeVisible();
    });
  });

  test("should render component in a hidden container", async ({
    mount,
    page,
  }) => {
    await mount(
      <Accordion title="Heading">
        <ActionPopoverCustom />
      </Accordion>,
    );
    const accordionDefaultTitleElement = accordionDefaultTitle(page);
    await accordionDefaultTitleElement.press("Enter");
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const actionPopoverElement = actionPopover(page).first();
    await expect(actionPopoverElement).toBeVisible();
  });

  test("when download prop is passed to an item, the item has the 'download' property and clicking it downloads the referenced file", async ({
    mount,
    page,
  }, testInfo) => {
    await mount(<ActionPopoverWithDownloadButton />);

    // open ActionPopover
    await actionPopoverButton(page).click();

    // check download item has 'download' property
    const downloadItem = page.getByRole("link", { name: "Download" });
    await expect(downloadItem).toHaveAttribute("download", "");

    // click download item and wait for download to start
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      downloadItem.click(),
    ]);

    // open and check file contents to verify if download was a success
    const file = testInfo.outputPath(download.suggestedFilename());
    await download.saveAs(file);
    await page.goto(`file:///${file}`);
    await expect(page.locator("body")).toHaveText(
      "This is some example text in a file to test downloading functionality.",
    );
  });

  test("should show list is positioned properly in large viewport", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({
      width: 700,
      height: 300,
    });
    await mount(
      <Accordion mt="150px" title="Heading">
        <ActionPopoverCustom />
      </Accordion>,
    );
    const accordionDefaultTitleElement = accordionDefaultTitle(page);
    await accordionDefaultTitleElement.press("Enter");
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await page.evaluate(() => window.scrollTo(0, 1000));
    const actionPopoverElement = actionPopover(page).first();
    await expect(actionPopoverElement).toHaveAttribute(
      "data-floating-placement",
      "bottom-end",
    );
    await expect(actionPopoverElement).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(actionPopoverElement).toHaveAttribute(
      "data-floating-placement",
      "top-end",
    );
    await expect(actionPopoverElement).toBeVisible();
  });

  (
    [
      [0, "with"],
      [1, "without"],
    ] as [number, string][]
  ).forEach(([index, submenuState]) => {
    test(`should have correct hover state of menu item ${submenuState} submenu in ActionPopoverMenu`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverMenuWithProps />);
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      const submenuItem = actionPopoverInnerItem(page, index);
      await submenuItem.hover();
      await expect(submenuItem).toHaveCSS(
        "background-color",
        "rgb(204, 214, 219)",
      );
    });
  });

  (
    [
      [0, "Item 2"],
      [1, "Item 3"],
      [2, "Item 4"],
      [3, "Item 5"],
      [4, "Item 6"],
    ] as [number, string][]
  ).forEach(([times, elementText]) => {
    test(`should be able to press downarrow ${times} times and get button ${elementText} focused when first and last items are disabled`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverPropsComponentWithFirstAndLastDisabled />);

      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      for (let i = 0; i < times; i++) {
        const focusedElement = page.locator("*:focus");
        await focusedElement.press("ArrowDown");
      }
      const focusedElement = page.locator("*:focus");
      await expect(focusedElement).toContainText(elementText);
    });
  });

  (
    [
      [0, "Item 2"],
      [1, "Item 6"],
      [2, "Item 5"],
      [3, "Item 4"],
      [4, "Item 3"],
    ] as [number, string][]
  ).forEach(([times, elementText]) => {
    test(`should be able to press up ${times} times and get button ${elementText} focused when first and last items are disabled`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverPropsComponentWithFirstAndLastDisabled />);

      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      for (let i = 0; i < times; i++) {
        const focusedElement = page.locator("*:focus");
        await focusedElement.press("ArrowUp");
      }
      const focusedElement = page.locator("*:focus");
      await expect(focusedElement).toContainText(elementText);
    });
  });

  (
    [
      [0, "Item 1"],
      [1, "Item 7"],
    ] as [number, string][]
  ).forEach(([times, elementText]) => {
    test(`should be able to press downarrow ${times} times and get button ${elementText} focused when only the first and last items are not disabled`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ActionPopoverPropsComponentWithOnlyFirstAndLastNotDisabled />,
      );

      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      for (let i = 0; i < times; i++) {
        const focusedElement = page.locator("*:focus");
        await focusedElement.press("ArrowDown");
      }
      const focusedElement = page.locator("*:focus");
      await expect(focusedElement).toContainText(elementText);
    });
  });

  (
    [
      [0, "Item 1"],
      [1, "Item 7"],
    ] as [number, string][]
  ).forEach(([times, elementText]) => {
    test(`should be able to press up ${times} times and get button ${elementText} focused`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ActionPopoverPropsComponentWithOnlyFirstAndLastNotDisabled />,
      );

      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      for (let i = 0; i < times; i++) {
        const focusedElement = page.locator("*:focus");
        await focusedElement.press("ArrowUp");
      }
      const focusedElement = page.locator("*:focus");
      await expect(focusedElement).toContainText(elementText);
    });
  });

  (
    [
      [0, "Item 1"],
      [1, "Item 4"],
      [2, "Item 6"],
    ] as [number, string][]
  ).forEach(([times, elementText]) => {
    test(`should be able to press downarrow ${times} times and get button ${elementText} focused when only a few items are disabled`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverPropsComponentWithSomeDisabled />);

      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      for (let i = 0; i < times; i++) {
        const focusedElement = page.locator("*:focus");
        await focusedElement.press("ArrowDown");
      }
      const focusedElement = page.locator("*:focus");
      await expect(focusedElement).toContainText(elementText);
    });
  });

  (
    [
      [0, "Item 1"],
      [1, "Item 6"],
      [2, "Item 4"],
    ] as [number, string][]
  ).forEach(([times, elementText]) => {
    test(`should be able to press up ${times} times and get button ${elementText} focused when only a few items are disabled`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverPropsComponentWithSomeDisabled />);

      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      for (let i = 0; i < times; i++) {
        const focusedElement = page.locator("*:focus");
        await focusedElement.press("ArrowUp");
      }
      const focusedElement = page.locator("*:focus");
      await expect(focusedElement).toContainText(elementText);
    });
  });

  (
    [
      [1, "Item 2"],
      [2, "Item 3"],
      [3, "Item 4"],
      [4, "Item 5"],
    ] as [number, string][]
  ).forEach(([times, elementText]) => {
    test(`should be able to press down ${times} times and not get button ${elementText} focused when all items are disabled`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverPropsComponentAllDisabled />);

      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      for (let i = 0; i < times; i++) {
        const focusedElement = page.locator("*:focus");
        await focusedElement.press("ArrowDown");
      }
      const focusedElement = page.locator("*:focus");
      await expect(focusedElement).not.toContainText(elementText);
    });
  });

  (
    [
      [1, "Item 2"],
      [2, "Item 3"],
      [3, "Item 4"],
      [4, "Item 5"],
    ] as [number, string][]
  ).forEach(([times, elementText]) => {
    test(`should be able to press up ${times} times and not get button ${elementText} focused when all items are disabled`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverPropsComponentAllDisabled />);

      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      for (let i = 0; i < times; i++) {
        const focusedElement = page.locator("*:focus");
        await focusedElement.press("ArrowUp");
      }
      const focusedElement = page.locator("*:focus");
      await expect(focusedElement).not.toContainText(elementText);
    });
  });
});

test.describe("check props for ActionPopover component", () => {
  test("should render with unique id", async ({ mount, page }) => {
    await mount(<ActionPopoverWithProps id="playwright" />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const actionPopoverWrapperElement = actionPopoverWrapper(page);
    await expect(actionPopoverWrapperElement).toHaveAttribute(
      "id",
      "playwright",
    );
  });

  (
    [
      [true, "bottom-start"],
      [false, "bottom-end"],
    ] as [boolean, string][]
  ).forEach(([rightAlignMenu, placement]) => {
    test(`should render with rightAlignMenu set to ${rightAlignMenu}`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverWithProps rightAlignMenu={rightAlignMenu} />);
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      const actionPopoverElement = actionPopover(page).first();
      await expect(actionPopoverElement).toHaveAttribute(
        "data-floating-placement",
        placement,
      );
    });
  });

  test("should render with custom button", async ({ mount, page }) => {
    await mount(<ActionPopoverWithRenderProp />);
    const actionPopoverButtonElement = buttonDataComponent(page);
    await actionPopoverButtonElement.click();
    const customButton = actionPopoverWrapper(page).locator(
      '[data-component="button"]',
    );
    await expect(customButton).toBeVisible();
  });

  test("should render with icons within a submenu", async ({ mount, page }) => {
    await mount(<ActionPopoverWithSubmenusAndNoIcons />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const actionPopoverMenuItemIconElement =
      actionPopoverMenuItemIcon(page).nth(0);
    expect(await actionPopoverMenuItemIconElement.count()).toBe(1);
  });

  [
    ["left", "start"],
    ["right", "end"],
  ].forEach(([position, attrValue]) => {
    test(`should render with horizontalAlignment prop set to ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverWithProps horizontalAlignment={position} />);
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      const actionPopoverItem = actionPopover(page)
        .first()
        .locator("button")
        .first();
      await expect(actionPopoverItem).toHaveCSS(
        "justify-content",
        `flex-${attrValue}`,
      );
    });
  });

  [
    ["left", "chevron_left_thick"],
    ["right", "chevron_right_thick"],
  ].forEach(([position, chevronType]) => {
    test(`should render with submenuPosition prop set to ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ActionPopoverWithSubmenusAndIcons submenuPosition={position} />,
      );
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      const itemChevron = actionPopoverMenuItemChevron(page).first();
      await expect(itemChevron).toHaveAttribute("type", chevronType);
    });
  });

  test("should render with submenu opening above when placement prop set to 'top'", async ({
    mount,
    page,
  }) => {
    await mount(<MenuOpeningAbove />);
    await actionPopoverButton(page).nth(0).click();
    await actionPopoverInnerItem(page, 0).hover();

    await expect(actionPopoverSubmenuByIndex(page, 0)).toHaveCSS(
      "bottom",
      "-8px",
    ); // result of calc(-1 * var(--spacing100))
  });

  test("should render with aria-label prop", async ({ mount, page }) => {
    await mount(<ActionPopoverWithProps aria-label="test-aria-label" />);
    await expect(actionPopoverButton(page).nth(0)).toHaveAttribute(
      "aria-label",
      "test-aria-label",
    );
  });
});

test.describe("check events for ActionPopover component", () => {
  [1, 4, 6].forEach((index) => {
    test(`should call onClick callback when a click event is triggered on item with index ${index}`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      const callback = () => {
        callbackCount += 1;
      };
      await mount(<ActionPopoverCustom onClick={callback} />);
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      const clickedItem = actionPopoverInnerItem(page, index);
      await clickedItem.click();
      expect(callbackCount).toBe(1);
    });
  });

  [1, 4, 6].forEach((index) => {
    test(`should call onClick callback when a keydown event is triggered by pressing Enter on item with index ${index}`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      const callback = () => {
        callbackCount += 1;
      };
      await mount(<ActionPopoverCustom onClick={callback} />);
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      const activatedItem = actionPopoverInnerItem(page, index);
      await activatedItem.press("Enter");
      expect(callbackCount).toBe(1);
    });
  });

  [0, 1].forEach((index) => {
    test(`should call onClick callback when a click event is triggered for submenu item with index ${index}`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      const callback = () => {
        callbackCount += 1;
      };
      await mount(<ActionPopoverCustom onClick={callback} />);
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      const submenuTrigger = actionPopoverInnerItem(page, 2);
      await submenuTrigger.hover();
      const submenuItem = actionPopoverSubmenu(page, index);
      await submenuItem.click();
      expect(callbackCount).toBe(1);
    });
  });

  [false, true].forEach((navigateToSecondSubmenuItem) => {
    test(`should call onClick callback when a keydown event is triggered for submenu item by pressing Enter on ${
      navigateToSecondSubmenuItem ? "second" : "first"
    } submenu item`, async ({ mount, page }) => {
      let callbackCount = 0;
      const callback = () => {
        callbackCount += 1;
      };
      await mount(<ActionPopoverCustom onClick={callback} />);
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("ArrowLeft");
      if (navigateToSecondSubmenuItem) {
        await page.keyboard.press("ArrowDown");
      }
      await page.keyboard.press("Enter");
      expect(callbackCount).toBe(1);
    });
  });

  test("should call onOpen callback when menu is opened by a click event", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback = () => {
      callbackCount += 1;
    };
    await mount(<ActionPopoverPropsComponent onOpen={callback} />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    expect(callbackCount).toBe(1);
  });

  test("should call onClose callback when menu is closed by a click event", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback = () => {
      callbackCount += 1;
    };
    await mount(<ActionPopoverPropsComponent onClose={callback} />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.dblclick();
    expect(callbackCount).toBe(1);
  });
});

test.describe("padding checks on 'StyledMenuItemInnerText'", () => {
  [
    ["left", "left"],
    ["left", "right"],
    ["right", "left"],
    ["right", "right"],
  ].forEach(([alignment, position]) => {
    test(`when horizontalAlignment is ${alignment} and submenuPosition is ${position}, then left and right padding is --spacing100`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ActionPopoverWithNoIconsOrSubmenus
          horizontalAlignment={alignment}
          submenuPosition={position}
        />,
      );
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      const itemText = actionPopoverMenuItemInnerText(page).first();
      await expect(itemText).toHaveCSS("padding-left", "8px");
      const plTokens = await getDesignTokensByCssProperty(
        page,
        itemText,
        "padding-left",
      );
      expect(plTokens[0]).toBe("--spacing100");
      await expect(itemText).toHaveCSS("padding-right", "8px");
      const prTokens = await getDesignTokensByCssProperty(
        page,
        itemText,
        "padding-right",
      );
      expect(prTokens[0]).toBe("--spacing100");
    });
  });

  test("when horizontalAlignment is left, submenuPosition is left and Menu Item children have some submenus and no icons, then padding-left is --spacing400", async ({
    mount,
    page,
  }) => {
    await mount(
      <ActionPopoverWithSomeSubmenusAndNoIcons
        horizontalAlignment="left"
        submenuPosition="left"
      />,
    );
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const itemText = actionPopoverMenuItemInnerText(page).first();
    await expect(itemText).toHaveCSS("padding-left", "32px");
    const plTokens = await getDesignTokensByCssProperty(
      page,
      itemText,
      "padding-left",
    );
    expect(plTokens[0]).toBe("--spacing400");
  });

  test("when horizontalAlignment is right, submenuPosition is right and Menu Item children have some submenus and no icons, then padding-right is --spacing400", async ({
    mount,
    page,
  }) => {
    await mount(
      <ActionPopoverWithSomeSubmenusAndNoIcons
        horizontalAlignment="right"
        submenuPosition="right"
      />,
    );
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const itemText = actionPopoverMenuItemInnerText(page).first();
    await expect(itemText).toHaveCSS("padding-right", "32px");
    const prTokens = await getDesignTokensByCssProperty(
      page,
      itemText,
      "padding-right",
    );
    expect(prTokens[0]).toBe("--spacing400");
  });

  test("when horizontalAlignment is left, submenuPosition is left and Menu Item children have submenus and some icons, then padding-left is --spacing600", async ({
    mount,
    page,
  }) => {
    await mount(
      <ActionPopoverWithSubmenusAndSomeIcons
        horizontalAlignment="left"
        submenuPosition="left"
      />,
    );
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const itemText = actionPopoverMenuItemInnerText(page).first();
    await expect(itemText).toHaveCSS("padding-left", "48px");
    const plTokens = await getDesignTokensByCssProperty(
      page,
      itemText,
      "padding-left",
    );
    expect(plTokens[0]).toBe("--spacing600");
  });

  test("when horizontalAlignment is right, submenuPosition is right and Menu Item children have submenus and some icons, then padding-right is --spacing600", async ({
    mount,
    page,
  }) => {
    await mount(
      <ActionPopoverWithSubmenusAndSomeIcons
        horizontalAlignment="right"
        submenuPosition="right"
      />,
    );
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const itemText = actionPopoverMenuItemInnerText(page).first();
    await expect(itemText).toHaveCSS("padding-right", "48px");
    const prTokens = await getDesignTokensByCssProperty(
      page,
      itemText,
      "padding-right",
    );
    expect(prTokens[0]).toBe("--spacing600");
  });

  test("when horizontalAlignment is left, submenuPosition is left and Menu Item children are variable, then padding-left is --spacing900", async ({
    mount,
    page,
  }) => {
    await mount(
      <ActionPopoverWithVariableChildren
        horizontalAlignment="left"
        submenuPosition="left"
      />,
    );
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const itemText = actionPopoverMenuItemInnerText(page).first();
    await expect(itemText).toHaveCSS("padding-left", "72px");
    const plTokens = await getDesignTokensByCssProperty(
      page,
      itemText,
      "padding-left",
    );
    expect(plTokens[0]).toBe("--spacing900");
  });

  test("when horizontalAlignment is right, submenuPosition is right and Menu Item children are variable, then padding-right is --spacing900", async ({
    mount,
    page,
  }) => {
    await mount(
      <ActionPopoverWithVariableChildren
        horizontalAlignment="right"
        submenuPosition="right"
      />,
    );
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const itemText = actionPopoverMenuItemInnerText(page).first();
    await expect(itemText).toHaveCSS("padding-right", "72px");
    const prTokens = await getDesignTokensByCssProperty(
      page,
      itemText,
      "padding-right",
    );
    expect(prTokens[0]).toBe("--spacing900");
  });

  (
    [
      ["left", "left", 1],
      ["left", "right", 2],
      ["right", "left", 3],
      ["right", "right", 4],
    ] as [string, string, number][]
  ).forEach(([alignment, position, index]) => {
    test(`when horizontalAlignment is ${alignment}, submenuPosition is ${position} and Menu Item child is a submenu, then left and right padding is --spacing000`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ActionPopoverMenuWithProps
          horizontalAlignment={alignment}
          submenuPosition={position}
        />,
      );
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      const itemText = actionPopoverMenuItemInnerText(page).nth(index);
      await expect(itemText).toHaveCSS("padding-left", "0px");
      const plTokens = await getDesignTokensByCssProperty(
        page,
        itemText,
        "padding-left",
      );
      expect(plTokens[0]).toBe("--spacing000");
      await expect(itemText).toHaveCSS("padding-right", "0px");
      const prTokens = await getDesignTokensByCssProperty(
        page,
        itemText,
        "padding-right",
      );
      expect(prTokens[0]).toBe("--spacing000");
    });
  });
});

test.describe("justify-content checks on 'StyledMenuItem'", () => {
  [
    ["left", "flex-start"],
    ["right", "flex-end"],
  ].forEach(([alignment, itemAlignment]) => {
    test(`when horizontalAlignment is ${alignment} then content should be justified ${itemAlignment}`, async ({
      mount,
      page,
    }) => {
      await mount(<ActionPopoverWithProps horizontalAlignment={alignment} />);
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      const menuItem = getDataElementByValue(page, "menu-item1");
      await expect(menuItem).toHaveCSS("justify-content", itemAlignment);
    });
  });

  [
    ["left", "right", "space-between"],
    ["right", "left", "flex-end"],
  ].forEach(([alignment, position, itemAlignment]) => {
    test(`when horizontalAlignment is ${alignment}, submenuPosition is ${position} and Menu Item children have no submenus, then content should be justified ${itemAlignment}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ActionPopoverWithProps
          horizontalAlignment={alignment}
          submenuPosition={position}
        />,
      );
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      const menuItem = getDataElementByValue(page, "menu-item1");
      await expect(menuItem).toHaveCSS("justify-content", itemAlignment);
    });
  });

  [
    ["left", "right", "space-between"],
    ["right", "left", "space-between"],
  ].forEach(([alignment, position, itemAlignment]) => {
    test(`when horizontalAlignment is ${alignment}, submenuPosition is ${position} and Menu Item children have a submenu, then content should be justified ${itemAlignment}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ActionPopoverWithSubmenusAndIcons
          horizontalAlignment={alignment}
          submenuPosition={position}
        />,
      );
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      const menuItem = getDataElementByValue(page, "menu-item1");
      await expect(menuItem).toHaveCSS("justify-content", itemAlignment);
    });
  });
});

test.describe("padding checks on 'MenuItemIcon'", () => {
  test("padding is: --spacing100", async ({ mount, page }) => {
    await mount(<ActionPopoverWithIconsAndNoSubmenus />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const icon = actionPopoverMenuItemIcon(page).nth(0);
    await expect(icon).toHaveCSS("padding", "8px");
    const paddingTokens = await getDesignTokensByCssProperty(
      page,
      icon,
      "padding",
    );
    expect(paddingTokens.join(" ")).toEqual(
      "--spacing100 --spacing100 --spacing100 --spacing100",
    );
  });

  [
    [
      "left",
      "left",
      "--spacing100 --spacing100 --spacing100 --spacing400",
      "8px 8px 8px 32px",
    ],
    [
      "left",
      "right",
      "--spacing100 --spacing100 --spacing100 --spacing100",
      "8px",
    ],
    [
      "right",
      "left",
      "--spacing100 --spacing100 --spacing100 --spacing100",
      "8px",
    ],
    [
      "right",
      "right",
      "--spacing100 --spacing400 --spacing100 --spacing100",
      "8px 32px 8px 8px",
    ],
  ].forEach(([position, alignment, spacing, padding]) => {
    test(`when horizontalAlignment is ${position} and submenuPosition is ${alignment} and Menu Item children have icons and some submenus, then padding is ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ActionPopoverWithIconsAndSomeSubmenus
          submenuPosition={position}
          horizontalAlignment={alignment}
        />,
      );
      const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
      await actionPopoverButtonElement.click();
      const icon = actionPopoverMenuItemIcon(page).nth(0);
      await expect(icon).toHaveCSS("padding", padding);
      const paddingTokens = await getDesignTokensByCssProperty(
        page,
        icon,
        "padding",
      );
      expect(paddingTokens.join(" ")).toEqual(spacing);
    });
  });
});

test.describe("rounded-corners", () => {
  test("should have the expected border radius styling", async ({
    mount,
    page,
  }) => {
    await mount(<ActionPopoverCustom />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.focus();
    await expect(actionPopoverButtonElement).toHaveCSS("border-radius", "4px");
    await actionPopoverButtonElement.click();
    const actionPopoverElement = actionPopover(page).first();
    await expect(actionPopoverElement).toHaveCSS("border-radius", "8px");
  });
});

// there is an issue with asserting token values for this test
test("has the expected styling when focused", async ({ mount, page }) => {
  await mount(<ActionPopoverCustom />);
  const actionPopoverButtonElement = await actionPopoverButton(page).nth(0);
  await actionPopoverButtonElement.focus();
  await expect(actionPopoverButtonElement).toHaveCSS(
    "box-shadow",
    "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
  );
  await actionPopoverButtonElement.click();
  const focusedItem = await actionPopoverInnerItem(page, 1);
  await expect(focusedItem).toHaveCSS(
    "box-shadow",
    "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
  );
});

test.describe("Accessibility tests for ActionPopover", () => {
  test("should pass accessibility tests with custom button", async ({
    mount,
    page,
  }) => {
    await mount(
      <ActionPopoverWithProps
        renderButton={({
          tabIndex,
          "data-element": dataElement,
          ariaAttributes,
        }: RenderButtonProps) => (
          <ActionPopoverMenuButton
            buttonType="tertiary"
            iconType="dropdown"
            iconPosition="after"
            size="small"
            tabIndex={tabIndex}
            data-element={dataElement}
            ariaAttributes={ariaAttributes}
          >
            More
          </ActionPopoverMenuButton>
        )}
      />,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility tests in default example", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with icons", async ({
    mount,
    page,
  }) => {
    await mount(<Icons />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with disabled items", async ({
    mount,
    page,
  }) => {
    await mount(<DisabledItems />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with menu right aligned", async ({
    mount,
    page,
  }) => {
    await mount(<MenuRightAligned />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with item content right aligned", async ({
    mount,
    page,
  }) => {
    await mount(<ContentAlignedRight />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with a right submenu position", async ({
    mount,
    page,
  }) => {
    await mount(<SubmenuPositionedRight />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with no icons", async ({
    mount,
    page,
  }) => {
    await mount(<NoIcons />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with custom menu button", async ({
    mount,
    page,
  }) => {
    await mount(<CustomMenuButton />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with submenu", async ({
    mount,
    page,
  }) => {
    await mount(<Submenu />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const submenuTrigger = actionPopoverInnerItem(page, 0);
    await submenuTrigger.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with disabled submenu", async ({
    mount,
    page,
  }) => {
    await mount(<DisabledSubmenu />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with menu opening above", async ({
    mount,
    page,
  }) => {
    await mount(<MenuOpeningAbove />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with keyboard navigation", async ({
    mount,
    page,
  }) => {
    await mount(<KeyboardNavigation />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for with keyboard navigation in left aligned submenu", async ({
    mount,
    page,
  }) => {
    await mount(<KeyboardNavigationLeftAlignedSubmenu />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const submenuTrigger = actionPopoverInnerItem(page, 0);
    await submenuTrigger.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with keyboard navigation in right aligned submenu", async ({
    mount,
    page,
  }) => {
    await mount(<KeyboardNavigationRightAlignedSubmenu />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const submenuTrigger = actionPopoverInnerItem(page, 0);
    await submenuTrigger.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with additional options", async ({
    mount,
    page,
  }) => {
    await mount(<AdditionalOptions />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with download button", async ({
    mount,
    page,
  }) => {
    await mount(<DownloadButton />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests in overflow hidden container", async ({
    mount,
    page,
  }) => {
    await mount(<InOverflowHiddenContainer />);
    const accordionIcon = getDataElementByValue(page, "accordion-icon");
    await accordionIcon.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests in FlatTable", async ({
    mount,
    page,
  }) => {
    await mount(<InFlatTable />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when opening a modal", async ({
    mount,
    page,
  }) => {
    await mount(<OpeningAModal />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await checkAccessibility(page);
  });
});

test.describe("when nested inside a Dialog component", () => {
  test("should not close the Dialog when component is closed by pressing an escape key", async ({
    mount,
    page,
  }) => {
    await mount(<ActionPopoverNestedInDialog />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    await page.keyboard.press("Escape");
    const actionPopoverElement = actionPopover(page);
    await expect(actionPopoverElement).not.toBeVisible();
    const dialogElement = alertDialogPreview(page);
    await expect(dialogElement).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialogElement).not.toBeVisible();
  });
});
