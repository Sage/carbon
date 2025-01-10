import React from "react";
import { expect, test } from "@playwright/experimental-ct-react17";

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
} from "./components.test-pw";
import { toastComponent } from "../../../playwright/components/toast";
import {
  checkAccessibility,
  getStyle,
  waitForAnimationEnd,
  waitForElementFocus,
} from "../../../playwright/support/helper";
import { CHARACTERS, SIZE } from "../../../playwright/support/constants";
import { getDataElementByValue } from "../../../playwright/components";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

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
      <DialogComponent title={undefined} aria-labelledby="label-element-id" />,
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

    const button = page.getByRole("button").filter({ hasText: "Open Dialog" });
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

    const button = page.getByRole("button").filter({ hasText: "Open Dialog" });
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

    const button = page.getByRole("button").filter({ hasText: "Open Dialog" });
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

  const dialogFullscreen = getDataElementByValue(page, "dialog-full-screen");
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
