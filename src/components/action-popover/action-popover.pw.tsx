import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { accordionDefaultTitle } from "../../../playwright/components/accordion";
import {
  actionPopover,
  actionPopoverButton,
  actionPopoverInnerItem,
  actionPopoverSubmenuByIndex,
  actionPopoverWrapper,
} from "../../../playwright/components/action-popover";
import { dialog } from "../../../playwright/components/dialog";
import { getDataElementByValue } from "../../../playwright/components/index";
import { checkAccessibility } from "../../../playwright/support/helper";
import { Accordion } from "../../../src/components/accordion";
import {
  ActionPopoverMenuButton,
  RenderButtonProps,
} from "../../../src/components/action-popover";
import {
  ActionPopoverCustom,
  ActionPopoverWithIconsAndNoSubmenus,
  ActionPopoverWithProps,
  ActionPopoverWithSubmenusAndIcons,
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
  ActionPopoverWithDifferentSubmenus,
} from "../../../src/components/action-popover/components.test-pw";

test("should close opened submenu by keyboard event when another submenu is opened by click event", async ({
  mount,
  page,
}) => {
  await mount(<ActionPopoverWithDifferentSubmenus />);

  const openButton = page.getByRole("button");
  await openButton.click();

  const businessItem = page
    .getByRole("listitem")
    .filter({ hasText: "Business" });

  const businessSubmenuItem = businessItem
    .getByRole("listitem")
    .filter({ hasText: "Business Sub Menu Item" });

  await businessItem.press("Enter");

  await expect(businessSubmenuItem).toBeVisible();

  const emailItem = page.getByRole("listitem").filter({ hasText: "Email" });

  const emailSubmenuItem = emailItem
    .getByRole("listitem")
    .filter({ hasText: "Email Sub Menu Item" });

  await emailItem.click();

  await expect(emailSubmenuItem).toBeVisible();

  await expect(businessSubmenuItem).toBeHidden();
});

test("should close opened submenu by keyboard event when another submenu is opened by hover event", async ({
  mount,
  page,
}) => {
  await mount(<ActionPopoverWithDifferentSubmenus />);

  const openButton = page.getByRole("button");
  await openButton.click();

  const businessItem = page
    .getByRole("listitem")
    .filter({ hasText: "Business" });

  const businessSubmenuItem = businessItem
    .getByRole("listitem")
    .filter({ hasText: "Business Sub Menu Item" });

  await businessItem.press("Enter");

  await expect(businessSubmenuItem).toBeVisible();

  const emailItem = page.getByRole("listitem").filter({ hasText: "Email" });

  const emailSubmenuItem = emailItem
    .getByRole("listitem")
    .filter({ hasText: "Email Sub Menu Item" });

  await emailItem.hover();

  await expect(emailSubmenuItem).toBeVisible();

  await expect(businessSubmenuItem).toBeHidden();
});

test.describe("check functionality for ActionPopover component", () => {
  test("should render component", async ({ mount, page }) => {
    await mount(<ActionPopoverCustom />);
    const actionPopoverButtonElement = actionPopoverButton(page).nth(0);
    await actionPopoverButtonElement.click();
    const actionPopoverElement = actionPopover(page).first();
    await expect(actionPopoverElement).toBeVisible();
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

  (["left", "right"] as const).forEach((horizontalAlignment) => {
    test(`an item's text is aligned to the ${horizontalAlignment}, when horizontalAlignment prop is set to ${horizontalAlignment}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ActionPopoverWithIconsAndNoSubmenus
          horizontalAlignment={horizontalAlignment}
        />,
      );

      const openButton = page.getByRole("button");
      await openButton.click();

      const firstItem = page.getByRole("listitem").first();
      await firstItem.hover();

      await expect(firstItem.getByRole("button")).toHaveCSS(
        "text-align",
        horizontalAlignment,
      );
    });
  });

  (["left", "right"] as const).forEach((horizontalAlignment) => {
    test(`a submenu item's text is aligned to the ${horizontalAlignment}, when horizontalAlignment prop is set to ${horizontalAlignment}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ActionPopoverWithSubmenusAndIcons
          horizontalAlignment={horizontalAlignment}
        />,
      );

      const openButton = page.getByRole("button");
      await openButton.click();

      const firstItem = page.getByRole("listitem").first();
      await firstItem.hover();

      const firstSubmenuItem = firstItem.getByRole("listitem").first();
      await expect(firstSubmenuItem).toHaveCSS(
        "text-align",
        horizontalAlignment,
      );
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

test("an item's icon is placed left of the item's text, when horizontalAlignment prop is set to 'left'", async ({
  mount,
  page,
}) => {
  await mount(
    <ActionPopoverWithIconsAndNoSubmenus horizontalAlignment="left" />,
  );

  const openingButton = page.getByRole("button");
  await openingButton.click();

  const businessItem = page
    .getByRole("listitem")
    .filter({ hasText: "Business" });
  const icon = businessItem.getByTestId("item-icon");
  const text = businessItem.getByText("Business");

  const iconPosition = await icon.boundingBox();
  const textPosition = await text.boundingBox();

  if (!iconPosition) throw new Error("Icon isn't visible");
  if (!textPosition) throw new Error("Text isn't visible");

  expect(iconPosition.x).toBeLessThan(textPosition.x);
});

test("an item's icon is placed right of the item's text, when horizontalAlignment prop is set to 'right'", async ({
  mount,
  page,
}) => {
  await mount(
    <ActionPopoverWithIconsAndNoSubmenus horizontalAlignment="right" />,
  );

  const openingButton = page.getByRole("button");
  await openingButton.click();

  const businessItem = page
    .getByRole("listitem")
    .filter({ hasText: "Business" });
  const icon = businessItem.getByTestId("item-icon");
  const text = businessItem.getByText("Business");

  const iconPosition = await icon.boundingBox();
  const textPosition = await text.boundingBox();

  if (!iconPosition) throw new Error("Icon isn't visible");
  if (!textPosition) throw new Error("Text isn't visible");

  expect(iconPosition.x).toBeGreaterThan(textPosition.x);
});

test("a submenu item's icon is placed right of the item's text, when horizontalAlignment prop is set to 'right'", async ({
  mount,
  page,
}) => {
  await mount(
    <ActionPopoverWithSubmenusAndIcons horizontalAlignment="right" />,
  );

  const openingButton = page.getByRole("button");
  await openingButton.click();

  const businessItem = page
    .getByRole("listitem")
    .filter({ hasText: "Business" });
  await businessItem.hover();

  const firstSubmenuItem = businessItem
    .getByRole("listitem")
    .filter({ hasText: "Sub Menu 1" });
  const icon = firstSubmenuItem.getByTestId("item-icon");
  const text = firstSubmenuItem.getByText("Sub Menu 1");

  const iconPosition = await icon.boundingBox();
  const textPosition = await text.boundingBox();

  if (!iconPosition) throw new Error("Icon isn't visible");
  if (!textPosition) throw new Error("Text isn't visible");

  expect(iconPosition.x).toBeGreaterThan(textPosition.x);
});

test("a submenu item's icon is placed left of the item's text, when horizontalAlignment prop is set to 'left'", async ({
  mount,
  page,
}) => {
  await mount(<ActionPopoverWithSubmenusAndIcons horizontalAlignment="left" />);

  const openingButton = page.getByRole("button");
  await openingButton.click();

  const businessItem = page
    .getByRole("listitem")
    .filter({ hasText: "Business" });
  await businessItem.hover();

  const firstSubmenuItem = businessItem
    .getByRole("listitem")
    .filter({ hasText: "Sub Menu 1" });
  const icon = firstSubmenuItem.getByTestId("item-icon");
  const text = firstSubmenuItem.getByText("Sub Menu 1");

  const iconPosition = await icon.boundingBox();
  const textPosition = await text.boundingBox();

  if (!iconPosition) throw new Error("Icon isn't visible");
  if (!textPosition) throw new Error("Text isn't visible");

  expect(iconPosition.x).toBeLessThan(textPosition.x);
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
    await expect(actionPopoverElement).toBeHidden();

    const dialogElement = dialog(page);
    await expect(dialogElement).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(dialogElement).toBeHidden();
  });
});
