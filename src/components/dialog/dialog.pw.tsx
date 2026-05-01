import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import {
  DialogComponent,
  DialogWithFirstFocusableElement,
  DialogWithToast,
  DialogComponentFocusableSelectors,
  DefaultStory,
  DefaultNestedStory,
  Editable,
  WithHelp,
  LoadingContent,
  FocusingADifferentFirstElement,
  OverridingContentPadding,
  OtherFocusableContainers,
  Responsive,
  UsingHandle,
  FullScreenDialogComponent,
  FullScreenNestedDialog,
  FullScreenComponentFocusableSelectors,
  FullScreenWithBox,
  FullScreenWithHeaderChildren,
  FullScreenWithHideableHeaderChildren,
  FullScreenMultipleDialogsInDifferentProviders,
} from "./components.test-pw";
import {
  checkAccessibility,
  getStyle,
  waitForElementFocus,
} from "../../../playwright/support/helper";
import {
  getDataElementByValue,
  portal,
  tooltipPreview,
  backgroundUILocator,
} from "../../../playwright/components";

const mainDialogTitle = "Main Dialog";
const nestedDialogTitle = "Nested Dialog";

test.describe("Dialog component", () => {
  test.describe("Testing Dialog component properties", () => {
    test("when height prop is passed, Dialog height should not exceed the height of the viewport", async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({ width: 600, height: 1000 });
      await mount(<DialogComponent height="1200px" />);

      const actualDialogHeight = parseInt(
        await getStyle(page.getByRole("dialog"), "height"),
      );

      expect(actualDialogHeight).toBeLessThanOrEqual(1000);
    });

    [true, false].forEach((enableBackgroundUIValue) => {
      test(`verify visibility of backgroundUILocatorElement when enableBackgroundUI prop is set to ${enableBackgroundUIValue}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <DialogComponent enableBackgroundUI={enableBackgroundUIValue} />,
        );

        const backgroundUILocatorElement = backgroundUILocator(page);

        if (enableBackgroundUIValue) {
          await expect(backgroundUILocatorElement).toBeHidden();
        } else {
          await expect(backgroundUILocatorElement).toBeVisible();
        }
      });
    });

    test("when help prop is provided, hovering over the rendered help icon displays help text", async ({
      mount,
      page,
    }) => {
      await mount(
        <DialogComponent title="Sample Dialog" help="Some help text" />,
      );

      const helpIcon = page.getByLabel("help");
      await helpIcon.hover();

      await expect(page.getByRole("tooltip")).toHaveText("Some help text");
    });

    test("when Dialog is opened, the first focusable element should be focused", async ({
      mount,
      page,
    }) => {
      await mount(<DialogWithFirstFocusableElement />);

      await expect(
        page.getByRole("button").filter({ hasText: "Press me" }),
      ).toBeFocused();
    });

    test("when Dialog is opened and then closed, the call to action element should be focused", async ({
      mount,
      page,
    }) => {
      await mount(<DefaultStory />);

      const button = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog" });
      const dialog = page.getByRole("dialog");
      await expect(button).not.toBeFocused();
      await expect(dialog).toBeHidden();

      await button.click();
      await expect(dialog).toBeVisible();
      const closeButton = page.getByLabel("Close");
      await closeButton.click();
      await expect(button).toBeFocused();
      await expect(dialog).toBeHidden();
    });

    test("when Dialog is open on render, then closed, opened and then closed again, the call to action element should be focused", async ({
      mount,
      page,
    }) => {
      await mount(<DefaultStory open />);

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      const closeButton = page.getByLabel("Close");
      await closeButton.click();

      const button = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog" });
      await expect(button).not.toBeFocused();
      await expect(dialog).toBeHidden();

      await button.click();
      await expect(dialog).toBeVisible();
      await closeButton.click();
      await expect(button).toBeFocused();
    });

    test("when nested Dialog's are opened/closed their respective call to action elements should be focused correctly", async ({
      mount,
      page,
    }) => {
      await mount(<DefaultNestedStory />);

      const firstButton = page
        .getByRole("button")
        .filter({ hasText: "Open First Dialog" });
      const firstDialog = page.getByRole("dialog").first();
      await expect(firstButton).not.toBeFocused();
      await expect(firstDialog).toBeHidden();

      await firstButton.click();
      await expect(firstDialog).toBeVisible();
      const secondButton = page
        .getByRole("button")
        .filter({ hasText: "Open Nested Dialog" });
      await expect(secondButton).not.toBeFocused();
      await secondButton.click();
      const secondDialog = page.getByRole("dialog").last();
      await expect(secondDialog).toBeVisible();

      const secondCloseButton = page.getByLabel("Close").last();
      await secondCloseButton.click();
      await expect(secondButton).toBeFocused();

      const firstCloseButton = page.getByLabel("Close").first();
      await firstCloseButton.click();
      await expect(firstButton).toBeFocused();
    });

    test("when Dialog is opened and then closed, with the `restoreFocusOnClose` prop passed as `false`, the call to action element should not be focused", async ({
      mount,
      page,
    }) => {
      await mount(<DefaultStory restoreFocusOnClose={false} />);

      const button = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog" });
      const dialog = page.getByRole("dialog");
      await expect(button).not.toBeFocused();
      await expect(dialog).toBeHidden();

      await button.click();
      await expect(dialog).toBeVisible();
      const closeButton = page.getByLabel("Close");
      await closeButton.click();
      await expect(button).not.toBeFocused();
      await expect(dialog).toBeHidden();
    });

    test("should render component with first input and button as focusableSelectors", async ({
      mount,
      page,
    }) => {
      await mount(<DialogComponentFocusableSelectors />);

      const dialogElement = page.getByRole("dialog");
      const focusedElement = page.locator("*:focus");
      const firstInputElement = page.getByLabel("First name");
      const secondInputElement = page.getByLabel("Surname");
      const openToastElement = getDataElementByValue(page, "open-toast");

      await waitForElementFocus(page, dialogElement);
      await dialogElement.press("Tab");
      await focusedElement.press("Tab");

      await expect(firstInputElement).toBeFocused();

      await focusedElement.press("Tab");

      await expect(secondInputElement).not.toBeFocused();
      await expect(openToastElement).toBeFocused();
    });
  });

  test("dialog is centred in the viewport", async ({ mount, page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await mount(<DialogComponent />);

    const dialog = page.getByRole("dialog");
    const boundingBox = await dialog.boundingBox();
    const viewportSize = page.viewportSize();

    if (!boundingBox) throw new Error("Dialog not found or visible.");
    if (!viewportSize) throw new Error("Unable to retrieve viewport size.");

    const expectedXPosition = (viewportSize.width - boundingBox.width) / 2;
    const expectedYPosition = (viewportSize.height - boundingBox.height) / 2;

    expect(boundingBox.x).toBeCloseTo(expectedXPosition);
    expect(boundingBox.y).toBeCloseTo(expectedYPosition);
  });

  test("dialog re-centres itself in the viewport, when viewport size changes", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await mount(<DialogComponent />);

    await page.setViewportSize({ width: 800, height: 600 });

    const dialog = page.getByRole("dialog");
    const boundingBox = await dialog.boundingBox();
    const viewportSize = page.viewportSize();

    if (!boundingBox) throw new Error("Dialog not found or visible.");
    if (!viewportSize) throw new Error("Unable to retrieve viewport size.");

    const expectedXPosition = (viewportSize.width - boundingBox.width) / 2;
    const expectedYPosition = (viewportSize.height - boundingBox.height) / 2;

    expect(boundingBox.x).toBeCloseTo(expectedXPosition);
    expect(boundingBox.y).toBeCloseTo(expectedYPosition);
  });

  test.describe("Accessibility tests for playwright mock components and storybook stories", () => {
    test("DialogComponent mock component should pass accessibility checks", async ({
      mount,
      page,
    }) => {
      await mount(<DialogComponent />);

      await checkAccessibility(page);
    });

    test("DialogWithFirstFocusableElement mock component should pass accessibility checks", async ({
      mount,
      page,
    }) => {
      await mount(<DialogWithFirstFocusableElement />);

      await checkAccessibility(page);
    });

    test("DialogWithToast mock component should pass accessibility checks", async ({
      mount,
      page,
    }) => {
      await mount(<DialogWithToast />);

      await checkAccessibility(page);
    });

    test("Default story should pass accessibility checks", async ({
      mount,
      page,
    }) => {
      await mount(<DefaultStory />);

      const openDialogButton = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog" });
      await openDialogButton.click();

      await checkAccessibility(page);
    });

    test("Editable story should pass accessibility checks", async ({
      mount,
      page,
    }) => {
      await mount(<Editable />);

      const openDialogButton = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog" });
      await openDialogButton.click();

      await checkAccessibility(page);

      const activateAddressButton = page
        .getByRole("button")
        .filter({ hasText: "Activate Address" });
      await activateAddressButton.click();

      await checkAccessibility(page);
    });

    test("WithHelp story should pass accessibility checks", async ({
      mount,
      page,
    }) => {
      await mount(<WithHelp />);

      const openDialogButton = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog" });
      await openDialogButton.click();

      await checkAccessibility(page);

      const helpIcon = page.getByLabel("help");
      await helpIcon.hover();

      await checkAccessibility(page);
    });

    test("LoadingContent story should pass accessibility checks", async ({
      mount,
      page,
    }) => {
      await mount(<LoadingContent />);

      const openDialogButton = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog" });
      await openDialogButton.click();

      await checkAccessibility(page);

      await page.getByLabel("Textbox 1").waitFor();
      await checkAccessibility(page);
    });

    test("FocusingADifferentFirstElement story should pass accessibility checks", async ({
      mount,
      page,
    }) => {
      await mount(<FocusingADifferentFirstElement />);

      const focusFirstElementDemoButton = page
        .getByRole("button")
        .filter({ hasText: "Open Demo using focusFirstElement" });
      await focusFirstElementDemoButton.click();

      await checkAccessibility(page);

      await page.getByRole("dialog").press("Escape");
      const autoFocusDemoButton = page
        .getByRole("button")
        .filter({ hasText: "Open Demo using autoFocus" });
      await autoFocusDemoButton.click();

      await checkAccessibility(page);
    });

    test("OverridingContentPadding story should pass accessibility checks", async ({
      mount,
      page,
    }) => {
      await mount(<OverridingContentPadding />);

      const openDialogButton = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog" });
      await openDialogButton.click();

      await checkAccessibility(page);
    });

    test("OtherFocusableContainers story should pass accessibility checks", async ({
      mount,
      page,
    }) => {
      await mount(<OtherFocusableContainers />);

      const openDialogButton = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog" });
      const firstToastButton = page
        .getByRole("button")
        .filter({ hasText: "Show first toast" });
      const secondToastButton = page
        .getByRole("button")
        .filter({ hasText: "Show second toast" });

      await openDialogButton.click();
      await firstToastButton.click();
      await secondToastButton.click();

      await checkAccessibility(page);
    });

    test("Responsive story should pass accessibility checks", async ({
      mount,
      page,
    }) => {
      await mount(<Responsive />);

      const openDialogButton = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog" });
      await openDialogButton.click();

      await checkAccessibility(page);
    });

    test("UsingHandle story should pass accessibility checks", async ({
      mount,
      page,
    }) => {
      await mount(<UsingHandle />);

      await page.getByRole("button").filter({ hasText: "Open Dialog" }).click();

      await checkAccessibility(page);

      await page.getByRole("button").filter({ hasText: "Submit" }).click();

      await checkAccessibility(page);
    });
  });
});

test.describe("Fullscreen Dialog component", () => {
  test.describe("render full-screen `Dialog` component and check properties", () => {
    test("should render with disabledEscKey prop and not be closed after clicking Escape button", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenDialogComponent disableEscKey />);

      const dialogFullScreen = page.getByRole("dialog");
      await expect(dialogFullScreen).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(dialogFullScreen).toBeVisible();
    });

    test("should allow to close nested `Dialog` and then the main, full-screen `Dialog` window", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenNestedDialog />);

      await page
        .getByRole("button")
        .filter({ hasText: `Open ${mainDialogTitle}` })
        .click();
      await page
        .getByRole("button")
        .filter({ hasText: `Open ${nestedDialogTitle}` })
        .click();

      const fullDialog = page.getByRole("dialog");
      const alertDialogPreview = page.getByRole("alertdialog");
      const nestedButton = portal(page);

      await expect(page.getByRole("dialog")).toHaveCount(1);
      await expect(nestedButton).toContainText("Nested Dialog");
      await expect(nestedButton).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(alertDialogPreview).toHaveCount(0);
      await expect(fullDialog).toHaveCount(1);

      await page.keyboard.press("Escape");
      await expect(fullDialog).toHaveCount(0);
    });

    test("should render nested dialogs with the aria-modal property only set on the top one", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenNestedDialog />);

      await page
        .getByRole("button")
        .filter({ hasText: `Open ${mainDialogTitle}` })
        .click();

      const mainDialog = page.getByLabel("Main Dialog");
      const nestedDialog = page.getByLabel("Nested Dialog");
      await expect(mainDialog).toHaveAttribute("aria-modal", "true");

      await page
        .getByRole("button")
        .filter({ hasText: `Open ${nestedDialogTitle}` })
        .click();

      await expect(mainDialog).not.toHaveAttribute("aria-modal", "true");
      await expect(nestedDialog).toHaveAttribute("aria-modal", "true");
    });

    test("should render nested dialogs with the aria-modal property only set on the top one, even when the dialogs are wrapped in separate CarbonProviders", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenMultipleDialogsInDifferentProviders />);

      await page
        .getByRole("button")
        .filter({ hasText: `Open Modal 1` })
        .click();

      const mainDialog = page.getByLabel("Full Screen Dialog");
      const nestedDialog = page.getByLabel("Modal Dialog");
      await expect(mainDialog).toHaveAttribute("aria-modal", "true");

      await page
        .getByRole("button")
        .filter({ hasText: `Open Modal 2` })
        .click();
      await expect(mainDialog).not.toHaveAttribute("aria-modal", "true");
      await expect(nestedDialog).toHaveAttribute("aria-modal", "true");
    });

    test("should render component using focusFirstElement", async ({
      mount,
      page,
    }) => {
      await mount(<FocusingADifferentFirstElement />);

      await page
        .getByRole("button")
        .filter({ hasText: `Open Demo using focusFirstElement` })
        .click();

      const focusedButton = page
        .getByRole("button")
        .filter({ hasText: "This should be focused first now" });
      await expect(focusedButton).toHaveCSS(
        "box-shadow",
        "rgb(0, 0, 0) 0px 0px 0px 2px, rgb(255, 181, 0) 0px 0px 0px 4px",
      );
      await expect(focusedButton).toHaveCSS(
        "outline",
        "rgba(0, 0, 0, 0) solid 3px",
      );
    });

    test("when Dialog Full Screen is opened and then closed, the call to action element should be focused", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenDialogComponent open={false} />);

      const button = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog Full Screen" });
      const dialogFullScreen = page.getByRole("dialog");
      await expect(button).not.toBeFocused();
      await expect(dialogFullScreen).toBeHidden();

      await button.click();
      await dialogFullScreen.waitFor();

      const closeButton = page.getByLabel("Close");
      await closeButton.click();

      await expect(dialogFullScreen).toBeHidden();
      await expect(button).toBeFocused();
    });

    test("when Dialog Full Screen is open on render, then closed, opened and then closed again, the call to action element should be focused", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenDialogComponent />);

      const dialogFullScreen = page.getByRole("dialog");
      await expect(dialogFullScreen).toBeVisible();
      const closeButton = page.getByLabel("Close");
      await closeButton.click();

      const button = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog Full Screen" });
      await expect(button).not.toBeFocused();
      await expect(dialogFullScreen).toBeHidden();

      await button.click();
      await expect(dialogFullScreen).toBeVisible();
      await closeButton.click();
      await expect(button).toBeFocused();
    });

    test("when nested Dialog's are opened/closed their respective call to action elements should be focused correctly", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenNestedDialog />);

      const firstButton = page
        .getByRole("button")
        .filter({ hasText: "Open Main Dialog" });
      const firstDialog = page.getByRole("dialog").first();
      await expect(firstButton).not.toBeFocused();
      await expect(firstDialog).toBeHidden();

      await firstButton.click();
      await expect(firstDialog).toBeVisible();
      const secondButton = page
        .getByRole("button")
        .filter({ hasText: "Open Nested Dialog" });
      await expect(secondButton).not.toBeFocused();
      await secondButton.click();
      const secondDialog = page.getByRole("dialog").last();
      await expect(secondDialog).toBeVisible();

      const secondCloseButton = page.getByLabel("Close").last();
      await secondCloseButton.click();
      await expect(secondButton).toBeFocused();

      const firstCloseButton = page.getByLabel("Close").first();
      await firstCloseButton.click();
      await expect(firstButton).toBeFocused();
    });

    test("when Dialog Full Screen is opened and then closed, with the `restoreFocusOnClose` prop passed as `false`, the call to action element should not be focused", async ({
      mount,
      page,
    }) => {
      await mount(
        <FullScreenDialogComponent open={false} restoreFocusOnClose={false} />,
      );

      const button = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog Full Screen" });
      const dialogFullScreen = page.getByRole("dialog");
      await expect(button).not.toBeFocused();
      await expect(dialogFullScreen).toBeHidden();

      await button.click();
      await expect(dialogFullScreen).toBeVisible();
      const closeButton = page.getByLabel("Close");
      await closeButton.click();
      await expect(button).not.toBeFocused();
      await expect(dialogFullScreen).toBeHidden();
    });

    test("should render component with help text", async ({ mount, page }) => {
      await mount(
        <FullScreenDialogComponent
          title="Sample Dialog"
          help="Some help text"
        />,
      );

      const helpIcon = getDataElementByValue(page, "question");
      await helpIcon.hover();
      await expect(tooltipPreview(page)).toHaveText("Some help text");
    });

    test("should render component with first input and button as focusableSelectors", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenComponentFocusableSelectors />);

      const dialogElement = page.getByRole("dialog");
      const focusedElement = page.locator("*:focus");
      const firstInputElement = page.getByLabel("First name");
      const secondInputElement = page.getByLabel("Surname");
      const openToastElement = getDataElementByValue(page, "open-toast");

      await waitForElementFocus(page, dialogElement);
      await dialogElement.press("Tab");
      await focusedElement.press("Tab");

      await expect(firstInputElement).toBeFocused();

      await focusedElement.press("Tab");

      await expect(secondInputElement).not.toBeFocused();
      await expect(openToastElement).toBeFocused();
    });
  });

  test.describe("Accessibility for full-screen `Dialog`", () => {
    test("should check accessibility for default component", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenDialogComponent />);

      await checkAccessibility(page, page.getByRole("dialog"));
    });

    test("should check accessibility with header children", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenWithHeaderChildren />);

      // color-contrast ignored until we can investigate and fix FE-6245
      await checkAccessibility(
        page,
        page.getByRole("dialog"),
        "color-contrast",
      );
    });

    test("should check accessibility with help", async ({ mount, page }) => {
      await mount(<WithHelp />);

      const openButton = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog" });
      await openButton.click();

      await checkAccessibility(page, page.getByRole("dialog"));
    });

    test("should check accessibility with hideable header children", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenWithHideableHeaderChildren />);

      const openButton = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog" });
      await openButton.click();

      // We will still need to skip the colour contrast check as the check is running before the animation is completely finished.
      // This is because the Pill's bg colour is deemed too light compared to the text colour as the animation is fading in.
      // color-contrast ignored until we can investigate and fix FE-6245
      await checkAccessibility(
        page,
        page.getByRole("dialog"),
        "color-contrast",
      );
    });

    test("should check accessibility with box", async ({ mount, page }) => {
      await mount(<FullScreenWithBox />);

      const openButton = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog" });
      await openButton.click();

      await checkAccessibility(page, page.getByRole("dialog"));
    });

    test("should check accessibility using autoFocus", async ({
      mount,
      page,
    }) => {
      await mount(<FocusingADifferentFirstElement />);

      const focusFirstButton = page
        .getByRole("button")
        .filter({ hasText: "Open Demo using focusFirstElement" });
      await focusFirstButton.click();

      await checkAccessibility(page, page.getByRole("dialog"));

      const closeIcon = getDataElementByValue(page, "close").first();
      await closeIcon.click();

      const autoFocusButton = page
        .getByRole("button")
        .filter({ hasText: "Open Demo using autoFocus" });
      await autoFocusButton.click();

      await checkAccessibility(page, page.getByRole("dialog"));
    });

    test("should check accessibility with other focusable containers", async ({
      mount,
      page,
    }) => {
      await mount(<OtherFocusableContainers />);

      const openButton = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog" });
      await openButton.click();

      await checkAccessibility(page, page.getByRole("dialog"));
    });
  });
});
