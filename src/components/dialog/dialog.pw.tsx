import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import type { Page } from "@playwright/test";

import {
  DialogComponent,
  DialogWithFirstFocusableElement,
  DialogWithToast,
  DialogBackgroundScrollTest,
  DialogWithOpenToastsBackgroundScrollTest,
  TopModalOverride,
  DialogWithAutoFocusSelect,
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
  FullScreenWithTitleAsReactComponent,
  FullScreenWithAutoFocusSelect,
  FullScreenComponentFocusableSelectors,
  FullScreenWithBox,
  FullScreenWithComplexExample,
  FullScreenWithHeaderChildren,
  FullScreenWithHideableHeaderChildren,
  FullScreenBackgroundScrollTestComponent,
  FullScreenOtherFocusableContainers,
  FullScreenMultipleDialogsInDifferentProviders,
} from "./components.test-pw";
import { toastComponent } from "../../../playwright/components/toast";
import {
  checkAccessibility,
  getStyle,
  waitForAnimationEnd,
  waitForElementFocus,
  continuePressingTAB,
  continuePressingSHIFTTAB,
} from "../../../playwright/support/helper";
import { CHARACTERS, SIZE } from "../../../playwright/support/constants";
import {
  getDataElementByValue,
  portal,
  tooltipPreview,
  getComponent,
  backgroundUILocator,
} from "../../../playwright/components";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testAria = "playwright_aria";
const mainDialogTitle = "Main Dialog";
const nestedDialogTitle = "Nested Dialog";

test.describe("Dialog component", () => {
  test.describe("Testing Dialog component properties", () => {
    ["0px", "100px", "500px"].forEach((height) => {
      test(`when height prop is ${height}, expected height of the Dialog is same value`, async ({
        mount,
        page,
      }) => {
        await mount(<DialogComponent height={height} />);

        await expect(page.getByRole("dialog")).toHaveCSS("height", height);
      });
    });

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

    specialCharacters.forEach((title) => {
      test(`when title prop is ${title}, should use it as Dialog title`, async ({
        mount,
        page,
      }) => {
        await mount(<DialogComponent title={title} />);

        await expect(page.getByText(title)).toBeAttached();
      });
    });

    specialCharacters.forEach((subtitle) => {
      test(`when subtitle prop is ${subtitle}, should use it as Dialog subtitle`, async ({
        mount,
        page,
      }) => {
        await mount(
          <DialogComponent title="Sample dialog" subtitle={subtitle} />,
        );

        await expect(page.getByText(subtitle)).toBeAttached();
      });
    });

    [
      { size: SIZE.EXTRASMALL, width: "300px" },
      { size: SIZE.SMALL, width: "380px" },
      { size: SIZE.MEDIUMSMALL, width: "540px" },
      { size: SIZE.MEDIUM, width: "750px" },
      { size: SIZE.MEDIUMLARGE, width: "850px" },
      { size: SIZE.LARGE, width: "960px" },
      { size: SIZE.EXTRALARGE, width: "1080px" },
    ].forEach(({ size, width }) => {
      test(`when size prop is ${size}, Dialog width should be ${width}`, async ({
        mount,
        page,
      }) => {
        await mount(<DialogComponent size={size} />);

        await expect(page.getByRole("dialog")).toHaveCSS("width", width);
      });
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
          await expect(backgroundUILocatorElement).not.toBeVisible();
        } else {
          await expect(backgroundUILocatorElement).toBeVisible();
        }
      });
    });

    test("when showCloseIcon prop is false, should not render close icon", async ({
      mount,
      page,
    }) => {
      await mount(<DialogComponent showCloseIcon={false} />);

      await expect(page.getByLabel("Close")).not.toBeVisible();
    });

    test("when showCloseIcon prop is true, clicking close icon closes Dialog", async ({
      mount,
      page,
    }) => {
      await mount(<DialogComponent />);

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      await page.getByLabel("Close").click();

      await expect(dialog).not.toBeVisible();
    });

    test("pressing the Escape key closes Dialog", async ({ mount, page }) => {
      await mount(<DialogComponent disableEscKey={false} />);

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      await dialog.press("Escape");

      await expect(dialog).not.toBeVisible();
    });

    test("when disableEscKey prop is passed, pressing the Escape key does not close Dialog", async ({
      mount,
      page,
    }) => {
      await mount(<DialogComponent disableEscKey />);

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      await dialog.press("Escape");

      await expect(dialog).toBeVisible();
    });

    test("when a function is passed to the onCancel prop, clicking close icon should call that function", async ({
      mount,
      page,
    }) => {
      let called = false;
      await mount(
        <DialogComponent
          onCancel={() => {
            called = true;
          }}
        />,
      );

      await page.getByLabel("Close").click();
      expect(called).toBeTruthy();
    });

    test("when clicking outside the Dialog, the Dialog should not close", async ({
      mount,
      page,
    }) => {
      await mount(<DialogComponent />);

      await page.mouse.click(0, 0);

      await expect(page.getByRole("dialog")).toBeVisible();
    });

    test("when aria-label prop is passed, it should be used as the aria label for Dialog", async ({
      mount,
      page,
    }) => {
      await mount(<DialogComponent aria-label="aria label for dialog" />);

      await expect(page.getByRole("dialog")).toHaveAttribute(
        "aria-label",
        "aria label for dialog",
      );
    });

    test("when aria-describedby prop is passed, the aria-describedby attribute of the Dialog should be set to the prop's value", async ({
      mount,
      page,
    }) => {
      await mount(<DialogComponent aria-describedby="aria description" />);

      await expect(page.getByRole("dialog")).toHaveAttribute(
        "aria-describedby",
        "aria description",
      );
    });

    test("when aria-labelledby prop is passed and title prop is not, the aria-labelledby attribute of the Dialog should be set to the prop's value", async ({
      mount,
      page,
    }) => {
      await mount(
        <DialogComponent
          title={undefined}
          aria-labelledby="label-element-id"
        />,
      );

      await expect(page.getByRole("dialog")).toHaveAttribute(
        "aria-labelledby",
        "label-element-id",
      );
    });

    test("when disableClose prop is passed, close icon should be disabled", async ({
      mount,
      page,
    }) => {
      await mount(<DialogComponent disableClose />);

      await expect(page.getByLabel("Close")).toBeDisabled();
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
      await expect(dialog).not.toBeVisible();

      await button.click();
      await expect(dialog).toBeVisible();
      const closeButton = page.getByLabel("Close");
      await closeButton.click();
      await expect(button).toBeFocused();
      await expect(dialog).not.toBeVisible();
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
      await expect(dialog).not.toBeVisible();

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
      await expect(firstDialog).not.toBeVisible();

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
      await expect(dialog).not.toBeVisible();

      await button.click();
      await expect(dialog).toBeVisible();
      const closeButton = page.getByLabel("Close");
      await closeButton.click();
      await expect(button).not.toBeFocused();
      await expect(dialog).not.toBeVisible();
    });

    test("when disableAutoFocus prop is passed, the first focusable element should not be focused", async ({
      mount,
      page,
    }) => {
      await mount(<DialogWithFirstFocusableElement disableAutoFocus />);

      await expect(
        page.getByRole("button").filter({ hasText: "Press me" }),
      ).not.toBeFocused();
    });

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("when tabbing through Dialog content, focus should remain trapped inside the Dialog", async ({
      mount,
      page,
    }) => {
      await mount(<DialogComponent />);

      const dialog = page.getByRole("dialog");
      const thirdTextbox = page.getByLabel("Textbox3");
      const secondTextbox = page.getByLabel("Textbox2");
      const firstTextbox = page.getByLabel("Textbox1");
      const closeButton = page.getByLabel("Close");

      await dialog.press("Tab");
      await expect(closeButton).toBeFocused();

      await closeButton.press("Tab");
      await expect(firstTextbox).toBeFocused();

      await firstTextbox.press("Tab");
      await expect(secondTextbox).toBeFocused();

      await secondTextbox.press("Tab");
      await expect(thirdTextbox).toBeFocused();

      await thirdTextbox.press("Tab");
      await expect(closeButton).toBeFocused();
    });

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("when shift tabbing through Dialog content, focus should remain trapped inside the Dialog", async ({
      mount,
      page,
    }) => {
      await mount(<DialogComponent />);

      const dialog = page.getByRole("dialog");
      const thirdTextbox = page.getByLabel("Textbox3");
      const secondTextbox = page.getByLabel("Textbox2");
      const firstTextbox = page.getByLabel("Textbox1");
      const closeButton = page.getByLabel("Close");

      await dialog.press("Shift+Tab");
      await expect(thirdTextbox).toBeFocused();

      await thirdTextbox.press("Shift+Tab");
      await expect(secondTextbox).toBeFocused();

      await secondTextbox.press("Shift+Tab");
      await expect(firstTextbox).toBeFocused();

      await firstTextbox.press("Shift+Tab");
      await expect(closeButton).toBeFocused();

      await closeButton.press("Shift+Tab");
      await expect(thirdTextbox).toBeFocused();
    });

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("when tabbing through Dialog content, background should not scroll to the bottom of the page", async ({
      mount,
      page,
    }) => {
      await mount(<DialogBackgroundScrollTest />);

      const dialog = page.getByRole("dialog");
      const textbox = page.getByLabel("Textbox");
      const closeButton = page.getByLabel("Close");

      await dialog.press("Tab");
      await closeButton.press("Tab");
      await textbox.press("Tab");

      await expect(closeButton).toBeFocused();
      await expect(
        page.getByText("I should not be scrolled into view"),
      ).not.toBeInViewport();
    });

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("when shift tabbing through Dialog content, background should not scroll to the bottom of the page", async ({
      mount,
      page,
    }) => {
      await mount(<DialogBackgroundScrollTest />);

      const dialog = page.getByRole("dialog");
      const textbox = page.getByLabel("Textbox");
      const closeButton = page.getByLabel("Close");

      await dialog.press("Shift+Tab");
      await textbox.press("Shift+Tab");

      await expect(closeButton).toBeFocused();
      await expect(
        page.getByText("I should not be scrolled into view"),
      ).not.toBeInViewport();
    });

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("should loop focus when a Select component is passed as children and the user presses shift + tab", async ({
      mount,
      page,
    }) => {
      await mount(<DialogWithAutoFocusSelect />);

      const dialog = page.getByRole("dialog");
      const select = dialog.getByRole("combobox");

      await expect(select).toBeFocused();
      await dialog.press("Shift+Tab");
      await dialog.press("Shift+Tab");
      await dialog.press("Shift+Tab");
      await expect(select).toBeFocused();
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

  test.describe("when there is a button inside Dialog, which opens a Toast", () => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("clicking button moves focus out of Dialog to the newly-opened Toast", async ({
      mount,
      page,
    }) => {
      await mount(<DialogWithToast />);

      const openToastButton = page
        .getByRole("button")
        .filter({ hasText: "Open Toast" });
      await openToastButton.click();

      const toast = toastComponent(page);
      await waitForAnimationEnd(toast);
      await expect(toast).toBeFocused();
    });

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("when Toast is opened and focus on it is lost, pressing Tab key traps focus back inside the Dialog", async ({
      mount,
      page,
    }) => {
      await mount(<DialogWithToast />);

      const dialog = page.getByRole("dialog");
      const openToastButton = page
        .getByRole("button")
        .filter({ hasText: "Open Toast" });
      await openToastButton.click();

      await page.mouse.click(0, 0); // click outside Toast and Dialog

      await dialog.press("Tab");

      await expect(openToastButton).toBeFocused();
    });

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("when tabbing through Dialog content and two opened Toasts, the background scroll should not scroll to the bottom of the page", async ({
      mount,
      page,
    }) => {
      await mount(<DialogWithOpenToastsBackgroundScrollTest />);

      const dialog = page.getByRole("dialog");
      const dialogCloseButton = dialog.getByLabel("Close");
      const textbox = page.getByLabel("Textbox");
      const toast1CloseButton = toastComponent(page)
        .filter({ hasText: "Toast message 1" })
        .getByLabel("Close");
      const toast2CloseButton = toastComponent(page)
        .filter({ hasText: "Toast message 2" })
        .getByLabel("Close");

      await dialog.press("Tab");
      await dialogCloseButton.press("Tab");
      await textbox.press("Tab");
      await toast1CloseButton.press("Tab");
      await toast2CloseButton.press("Tab");

      await expect(dialogCloseButton).toBeFocused();
      await expect(
        page.getByText("I should not be scrolled into view"),
      ).not.toBeInViewport();
    });

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("when shift tabbing through Dialog content and two opened Toasts, the background scroll should not scroll to the bottom of the page", async ({
      mount,
      page,
    }) => {
      await mount(<DialogWithOpenToastsBackgroundScrollTest />);

      const dialog = page.getByRole("dialog");
      const dialogCloseButton = dialog.getByLabel("Close");
      const textbox = page.getByLabel("Textbox");
      const toast1CloseButton = page
        .locator('[data-component="toast"]')
        .filter({ hasText: "Toast message 1" })
        .getByLabel("Close");
      const toast2CloseButton = page
        .locator('[data-component="toast"]')
        .filter({ hasText: "Toast message 2" })
        .getByLabel("Close");

      await dialog.press("Shift+Tab");
      await toast2CloseButton.press("Shift+Tab");
      await toast1CloseButton.press("Shift+Tab");
      await textbox.press("Shift+Tab");

      await expect(dialogCloseButton).toBeFocused();
      await expect(
        page.getByText("I should not be scrolled into view"),
      ).not.toBeInViewport();
    });
  });

  test("Dialog should have rounded corners", async ({ mount, page }) => {
    await mount(<DialogComponent />);

    await expect(page.getByRole("dialog")).toHaveCSS("border-radius", "16px");
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip("setting the topModalOverride prop should ensure the Dialog is rendered on top of any others", async ({
    mount,
    page,
  }) => {
    await mount(<TopModalOverride />);

    const dialog = getDataElementByValue(page, "dialog");
    const dialogClose = dialog.getByLabel("Close");
    const dialogTextbox = page.getByLabel("Dialog textbox");

    await waitForAnimationEnd(dialog);
    await dialog.press("Tab");
    await expect(dialogClose).toBeFocused();
    await dialogClose.press("Tab");
    await expect(dialogTextbox).toBeFocused();
    await dialogTextbox.press("Tab");
    await expect(dialogClose).toBeFocused();
    await dialogClose.press("Enter");

    const sidebar = getDataElementByValue(page, "sidebar");
    const sidebarClose = sidebar.getByLabel("Close");
    const sidebarTextbox = page.getByLabel("Sidebar textbox");

    await waitForAnimationEnd(sidebar);
    await sidebar.press("Tab");
    await expect(sidebarClose).toBeFocused();
    await sidebarClose.press("Tab");
    await expect(sidebarTextbox).toBeFocused();
    await sidebarTextbox.press("Tab");
    await expect(sidebarClose).toBeFocused();
    await sidebarClose.press("Enter");

    const dialogFullscreen = getDataElementByValue(page, "dialog");
    const dialogFullscreenClose = dialogFullscreen.getByLabel("Close");
    const dialogFullscreenTextbox = page.getByLabel("Fullscreen textbox");

    await waitForAnimationEnd(dialogFullscreen);
    await dialogFullscreen.press("Tab");
    await expect(dialogFullscreenClose).toBeFocused();
    await dialogFullscreenClose.press("Tab");
    await expect(dialogFullscreenTextbox).toBeFocused();
    await dialogFullscreenTextbox.press("Tab");
    await expect(dialogFullscreenClose).toBeFocused();
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
  const iconIsFocused = async (page: Page, whichIcon: number) => {
    const closeIcon = getDataElementByValue(page, "close").nth(whichIcon);
    await expect(closeIcon).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(closeIcon).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");
  };

  test.describe("render full-screen `Dialog` component and check properties", () => {
    test(`should close component after click on closeIcon`, async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenDialogComponent showCloseIcon />);

      const closeIcon = getDataElementByValue(page, "close").first();
      const dialogFullScreen = page.getByRole("dialog");
      await expect(closeIcon).toBeAttached;
      await expect(dialogFullScreen).toBeAttached;
      await closeIcon.click();
      await expect(dialogFullScreen).not.toBeAttached;
    });

    specialCharacters.forEach((title) => {
      test(`should render component using ${title} as title`, async ({
        mount,
        page,
      }) => {
        await mount(<FullScreenDialogComponent title={title} />);

        await expect(getDataElementByValue(page, "title")).toHaveText(title);
      });
    });

    specialCharacters.forEach((subtitle) => {
      test(`should render using ${subtitle} as subtitle`, async ({
        mount,
        page,
      }) => {
        await mount(
          <FullScreenDialogComponent
            title="Dialog Full Screen Title"
            subtitle={subtitle}
          />,
        );

        await expect(getDataElementByValue(page, "subtitle")).toHaveText(
          subtitle,
        );
      });
    });

    specialCharacters.forEach((childrenValue) => {
      test(`should render component with ${childrenValue} as a children`, async ({
        mount,
        page,
      }) => {
        await mount(
          <FullScreenDialogComponent>
            {childrenValue}
          </FullScreenDialogComponent>,
        );

        await expect(getDataElementByValue(page, "form-content")).toContainText(
          childrenValue,
        );
      });
    });

    test("should render with disabledEscKey prop and not be closed after clicking Escape button", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenDialogComponent disableEscKey />);

      const dialogFullScreen = page.getByRole("dialog");
      await expect(dialogFullScreen).toBeAttached;
      await page.keyboard.press("Escape");
      await expect(dialogFullScreen).not.toBeAttached;
    });

    test("should close after pressing Escape button", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenDialogComponent />);

      const dialogFullScreen = page.getByRole("dialog");
      await expect(dialogFullScreen).toBeAttached;
      await page.keyboard.press("Escape");
      await expect(dialogFullScreen).not.toBeAttached;
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

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("should always place focus on the inner dialog when tabbing with nested dialogs after focus is lost", async ({
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

      await page.keyboard.press("Tab");
      const dialogNested = page.getByRole("dialog");
      await dialogNested.click();
      await page.keyboard.press("Tab");
      const closeIcon = getDataElementByValue(page, "close").nth(2);
      await expect(closeIcon).toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
      );
      await expect(closeIcon).toHaveCSS(
        "outline",
        "rgba(0, 0, 0, 0) solid 3px",
      );
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

    test("should render component with aria-describedby", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenDialogComponent aria-describedby={testAria} />);

      await expect(page.getByRole("dialog")).toHaveAttribute(
        "aria-describedby",
        testAria,
      );
    });

    test("should render component with aria-label", async ({ mount, page }) => {
      await mount(<FullScreenNestedDialog aria-label={testAria} />);

      await page
        .getByRole("button")
        .filter({ hasText: `Open ${mainDialogTitle}` })
        .click();

      await expect(page.getByRole("dialog")).toHaveAttribute(
        "aria-label",
        testAria,
      );
    });

    test("should render component with aria-labelledby", async ({
      mount,
      page,
    }) => {
      await mount(
        <FullScreenWithTitleAsReactComponent aria-labelledby={testAria} />,
      );

      await expect(page.getByRole("dialog")).toHaveAttribute(
        "aria-labelledby",
        testAria,
      );
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
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
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
      await expect(dialogFullScreen).not.toBeVisible();

      await button.click();
      await dialogFullScreen.waitFor();

      const closeButton = page.getByLabel("Close");
      await closeButton.click();

      await expect(dialogFullScreen).not.toBeVisible();
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
      await expect(dialogFullScreen).not.toBeVisible();

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
      await expect(firstDialog).not.toBeVisible();

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
      await expect(dialogFullScreen).not.toBeVisible();

      await button.click();
      await expect(dialogFullScreen).toBeVisible();
      const closeButton = page.getByLabel("Close");
      await closeButton.click();
      await expect(button).not.toBeFocused();
      await expect(dialogFullScreen).not.toBeVisible();
    });

    test("should render component with autofocus disabled", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenDialogComponent disableAutoFocus />);

      const focusedButton = page
        .getByRole("button")
        .filter({ hasText: "This should be focused first now" });
      await expect(focusedButton).not.toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
      );
      const hasFocus = await focusedButton.focus();
      expect(hasFocus).toBeFalsy();
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

    test("should render component with role", async ({ mount, page }) => {
      await mount(<FullScreenDialogComponent role="dialog" />);

      await expect(getDataElementByValue(page, "dialog")).toHaveAttribute(
        "role",
        "dialog",
      );
    });

    test("should not render close icon when ShowCloseIcon is set to false", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenDialogComponent showCloseIcon={false} />);

      await expect(getDataElementByValue(page, "close")).toHaveCount(0);
    });

    test("should render close icon when ShowCloseIcon is set to true. When you click the CloseIcon the Dialog is closed", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenDialogComponent showCloseIcon />);

      const fullDialog = getDataElementByValue(page, "dialog");
      await expect(fullDialog).toHaveCount(1);
      const closeIcon = getDataElementByValue(page, "close").nth(1);
      await closeIcon.click();
      await expect(fullDialog).toHaveCount(0);
    });

    test("should render component with header children", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenWithHeaderChildren />);

      await expect(getComponent(page, "pill").nth(0)).toHaveText("A pill");
      await expect(getComponent(page, "pill").nth(1)).toHaveText(
        "Another pill",
      );
    });

    test("should render component with content padding disabled", async ({
      mount,
      page,
    }) => {
      await mount(
        <FullScreenDialogComponent
          title="Dialog Full Screen Title"
          contentPadding={{ p: 0 }}
        />,
      );

      const content = page.getByTestId("dialog-content");
      await expect(content).toHaveCSS("padding", "0px");
      await expect(content).toHaveCSS("padding-right", "0px");
      await expect(content).toHaveCSS("padding-bottom", "0px");
    });

    // skip this test for now as FE-6053 has not been fixed yet
    test.skip("should render component with DisableClose prop", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenDialogComponent disableClose />);

      const closeIcon = getDataElementByValue(page, "close").nth(1);
      await closeIcon.click();
      await expect(getDataElementByValue(page, "dialog")).toHaveCount(1);
    });

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("setting the topModalOverride prop should ensure the full-screen `Dialog` is rendered on top of any others", async ({
      mount,
      page,
    }) => {
      await mount(<TopModalOverride />);

      const dialogFullscreen = getDataElementByValue(page, "dialog");
      const dialogFullscreenClose = dialogFullscreen.getByLabel("Close");
      const dialogFullscreenTextbox = page.getByLabel("Fullscreen textbox");

      await waitForAnimationEnd(dialogFullscreen);
      await dialogFullscreen.press("Tab");
      await expect(dialogFullscreenClose).toBeFocused();
      await dialogFullscreenClose.press("Tab");
      await expect(dialogFullscreenTextbox).toBeFocused();
      await dialogFullscreenTextbox.press("Tab");
      await expect(dialogFullscreenClose).toBeFocused();
      await dialogFullscreenClose.press("Enter");

      const sidebar = getDataElementByValue(page, "sidebar");
      const sidebarClose = sidebar.getByLabel("Close");
      const sidebarTextbox = page.getByLabel("Sidebar textbox");

      await waitForAnimationEnd(sidebar);
      await sidebar.press("Tab");
      await expect(sidebarClose).toBeFocused();
      await sidebarClose.press("Tab");
      await expect(sidebarTextbox).toBeFocused();
      await sidebarTextbox.press("Tab");
      await expect(sidebarClose).toBeFocused();
      await sidebarClose.press("Enter");

      const dialog = getDataElementByValue(page, "dialog");
      const dialogClose = dialog.getByLabel("Close");
      const dialogTextbox = page.getByLabel("Dialog textbox");

      await waitForAnimationEnd(dialog);
      await dialog.press("Tab");
      await expect(dialogClose).toBeFocused();
      await dialogClose.press("Tab");
      await expect(dialogTextbox).toBeFocused();
      await dialogTextbox.press("Tab");
      await expect(dialogClose).toBeFocused();
    });

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("should loop focus when a Select component is passed as children and the user presses shift + tab", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenWithAutoFocusSelect />);

      const dialog = page.getByRole("dialog");
      const select = dialog.getByRole("combobox");

      await expect(select).toBeFocused();
      await dialog.press("Shift+Tab");
      await dialog.press("Shift+Tab");
      await dialog.press("Shift+Tab");
      await expect(select).toBeFocused();
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

    test("should check accessibility with disabled content padding", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenDialogComponent contentPadding={{ p: 0 }} />);

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

    test("should check accessibility with complex example", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenWithComplexExample />);

      const openButton = page
        .getByRole("button")
        .filter({ hasText: "Open Dialog" });
      await openButton.click();
      await expect(getDataElementByValue(page, "title")).toHaveText(
        "Dialog Title",
      );

      /* The colour contrast accessiiblity check has been omitted here due to a false positive
    where the box-shadow is incorrectly compared to the sticky footer background colour */
      await checkAccessibility(
        page,
        page.getByRole("dialog"),
        "color-contrast",
      );
    });
  });

  test.describe("test background scroll when tabbing", () => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("tabbing forward through the dialog and back to the start should not make the background scroll to the bottom", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenBackgroundScrollTestComponent />);

      await continuePressingTAB(page, 3);
      await iconIsFocused(page, 0);
      await expect(
        page.getByText("I should not be scrolled into view"),
      ).not.toBeInViewport();
    });

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("tabbing backward through the dialog and back to the start should not make the background scroll to the bottom", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenBackgroundScrollTestComponent />);

      await continuePressingSHIFTTAB(page, 2);
      await iconIsFocused(page, 0);
      await expect(
        page.getByText("I should not be scrolled into view"),
      ).not.toBeInViewport();
    });

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("tabbing forward through the dialog and other focusable containers back to the start should not make the background scroll to the bottom", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenOtherFocusableContainers />);

      const toastIcon = getDataElementByValue(page, "close").nth(1);
      await toastIcon.focus();
      await continuePressingTAB(page, 5);
      await iconIsFocused(page, 0);
      await expect(
        page.getByText("I should not be scrolled into view"),
      ).not.toBeInViewport();
    });

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("tabbing backward through the dialog and other focusable containers back to the start should not make the background scroll to the bottom", async ({
      mount,
      page,
    }) => {
      await mount(<FullScreenOtherFocusableContainers />);

      await continuePressingSHIFTTAB(page, 8);
      await iconIsFocused(page, 0);
      await expect(
        page.getByText("I should not be scrolled into view"),
      ).not.toBeInViewport();
    });
  });
});
