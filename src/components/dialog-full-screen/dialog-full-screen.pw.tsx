import React from "react";
import { expect, test } from "@playwright/experimental-ct-react17";
import type { Page } from "@playwright/test";
import {
  DialogFullScreenComponent,
  NestedDialog,
  MultipleDialogsInDifferentProviders,
  DialogFullScreenWithHeaderChildren,
  DialogFullScreenBackgroundScrollTestComponent,
  DialogFullScreenBackgroundScrollWithOtherFocusableContainers,
  WithHelp,
  WithHideableHeaderChildren,
  WithBox,
  OtherFocusableContainers,
  FocusingADifferentFirstElement,
  DialogFullScreenWithTitleAsReactComponent,
  WithComplexExample,
  TopModalOverride,
  DialogFullScreenWithAutoFocusSelect,
} from "./components.test-pw";
import {
  portal,
  getDataElementByValue,
  tooltipPreview,
  getComponent,
} from "../../../playwright/components/index";
import {
  continuePressingTAB,
  continuePressingSHIFTTAB,
  checkAccessibility,
  waitForAnimationEnd,
  waitForElementFocus,
} from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../playwright/support/constants";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testAria = "cypress_aria";
const mainDialogTitle = "Main Dialog";
const nestedDialogTitle = "Nested Dialog";

const iconIsFocused = async (page: Page, whichIcon: number) => {
  const closeIcon = getDataElementByValue(page, "close").nth(whichIcon);
  await expect(closeIcon).toHaveCSS(
    "box-shadow",
    "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
  );
  await expect(closeIcon).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");
};

test.describe("render DialogFullScreen component and check properties", () => {
  test(`should close component after click on closeIcon`, async ({
    mount,
    page,
  }) => {
    await mount(<DialogFullScreenComponent showCloseIcon />);

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
      await mount(<DialogFullScreenComponent title={title} />);

      await expect(getDataElementByValue(page, "title")).toHaveText(title);
    });
  });

  specialCharacters.forEach((subtitle) => {
    test(`should render using ${subtitle} as subtitle`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DialogFullScreenComponent
          title="Dialog Full Screen Title"
          subtitle={subtitle}
        />
      );

      await expect(getDataElementByValue(page, "subtitle")).toHaveText(
        subtitle
      );
    });
  });

  specialCharacters.forEach((childrenValue) => {
    test(`should render component with ${childrenValue} as a children`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DialogFullScreenComponent>{childrenValue}</DialogFullScreenComponent>
      );

      await expect(getDataElementByValue(page, "form-content")).toContainText(
        childrenValue
      );
    });
  });

  test("should render with disabledEscKey prop and not be closed after clicking Escape button", async ({
    mount,
    page,
  }) => {
    await mount(<DialogFullScreenComponent disableEscKey />);

    const dialogFullScreen = page.getByRole("dialog");
    await expect(dialogFullScreen).toBeAttached;
    await page.keyboard.press("Escape");
    await expect(dialogFullScreen).not.toBeAttached;
  });

  test("should close after pressing Escape button", async ({ mount, page }) => {
    await mount(<DialogFullScreenComponent />);

    const dialogFullScreen = page.getByRole("dialog");
    await expect(dialogFullScreen).toBeAttached;
    await page.keyboard.press("Escape");
    await expect(dialogFullScreen).not.toBeAttached;
  });

  test("should call the cancel action after closing", async ({
    mount,
    page,
  }) => {
    let called = false;
    await mount(
      <DialogFullScreenComponent
        onCancel={() => {
          called = true;
        }}
      />
    );

    const closeIcon = getDataElementByValue(page, "close").first();
    await closeIcon.click();
    expect(called).toBe(true);
  });

  test("should allow to close nested DialogFullScreen and then the main DialogFullScreen window", async ({
    mount,
    page,
  }) => {
    await mount(<NestedDialog />);

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
    await mount(<NestedDialog />);

    await page
      .getByRole("button")
      .filter({ hasText: `Open ${mainDialogTitle}` })
      .click();

    const fullDialog = getDataElementByValue(page, "dialog-full-screen");
    await expect(fullDialog).toHaveAttribute("aria-modal", "true");

    await page
      .getByRole("button")
      .filter({ hasText: `Open ${nestedDialogTitle}` })
      .click();

    await expect(fullDialog).not.toHaveAttribute("aria-modal", "true");
    await expect(page.getByRole("dialog")).toHaveAttribute(
      "aria-modal",
      "true"
    );
  });

  test("should always place focus on the inner dialog when tabbing with nested dialogs after focus is lost", async ({
    mount,
    page,
  }) => {
    await mount(<NestedDialog />);

    await page
      .getByRole("button")
      .filter({ hasText: `Open ${mainDialogTitle}` })
      .click();
    await page
      .getByRole("button")
      .filter({ hasText: `Open ${nestedDialogTitle}` })
      .click();

    const dialogNested = page.getByRole("dialog");
    await waitForElementFocus(page, dialogNested);

    await page.keyboard.press("Tab");
    await dialogNested.click();
    await page.keyboard.press("Tab");
    const closeIcon = getDataElementByValue(page, "close").nth(2);
    await expect(closeIcon).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
    );
    await expect(closeIcon).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");
  });

  test("should render nested dialogs with the aria-modal property only set on the top one, even when the dialogs are wrapped in separate CarbonProviders", async ({
    mount,
    page,
  }) => {
    await mount(<MultipleDialogsInDifferentProviders />);

    await page.getByRole("button").filter({ hasText: `Open Modal 1` }).click();
    const fullDialog = getDataElementByValue(page, "dialog-full-screen");
    await expect(fullDialog).toHaveAttribute("aria-modal", "true");

    await page.getByRole("button").filter({ hasText: `Open Modal 2` }).click();
    await expect(fullDialog).not.toHaveAttribute("aria-modal", "true");
    await expect(page.getByRole("dialog")).toHaveAttribute(
      "aria-modal",
      "true"
    );
  });

  test("should render component with aria-describedby", async ({
    mount,
    page,
  }) => {
    await mount(<DialogFullScreenComponent aria-describedby={testAria} />);

    await expect(page.getByRole("dialog")).toHaveAttribute(
      "aria-describedby",
      testAria
    );
  });

  test("should render component with aria-label", async ({ mount, page }) => {
    await mount(<DialogFullScreenComponent aria-label={testAria} />);

    await expect(page.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      testAria
    );
  });

  test("should render component with aria-labelledby", async ({
    mount,
    page,
  }) => {
    await mount(
      <DialogFullScreenWithTitleAsReactComponent aria-labelledby={testAria} />
    );

    await expect(page.getByRole("dialog")).toHaveAttribute(
      "aria-labelledby",
      testAria
    );
  });

  test("should render component using focusFirstElement", async ({
    mount,
    page,
  }) => {
    await mount(<DialogFullScreenComponent />);

    const focusedButton = page
      .getByRole("button")
      .filter({ hasText: "This should be focused first now" });
    await expect(focusedButton).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
    );
    await expect(focusedButton).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px"
    );
  });

  test("should render component with autofocus disabled", async ({
    mount,
    page,
  }) => {
    await mount(<DialogFullScreenComponent disableAutoFocus />);

    const focusedButton = page
      .getByRole("button")
      .filter({ hasText: "This should be focused first now" });
    await expect(focusedButton).not.toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
    );
    const hasFocus = await focusedButton.focus();
    expect(hasFocus).toBeFalsy();
  });

  test("should render component with help text", async ({ mount, page }) => {
    await mount(
      <DialogFullScreenComponent
        title="Sample DialogFullScreen"
        help="Some help text"
      />
    );

    const helpIcon = getDataElementByValue(page, "question");
    await helpIcon.hover();
    await expect(tooltipPreview(page)).toHaveText("Some help text");
  });

  test("should render component with role", async ({ mount, page }) => {
    await mount(<DialogFullScreenComponent role="dialog" />);

    await expect(
      getDataElementByValue(page, "dialog-full-screen")
    ).toHaveAttribute("role", "dialog");
  });

  test("should not render close icon when ShowCloseIcon is set to false", async ({
    mount,
    page,
  }) => {
    await mount(<DialogFullScreenComponent showCloseIcon={false} />);

    await expect(getDataElementByValue(page, "close")).toHaveCount(0);
  });

  test("should render close icon when ShowCloseIcon is set to true. When you click the CloseIcon the Dialog is closed", async ({
    mount,
    page,
  }) => {
    await mount(<DialogFullScreenComponent showCloseIcon />);

    const fullDialog = getDataElementByValue(page, "dialog-full-screen");
    await expect(fullDialog).toHaveCount(1);
    const closeIcon = getDataElementByValue(page, "close").nth(1);
    await closeIcon.click();
    await expect(fullDialog).toHaveCount(0);
  });

  test("should render component with header children", async ({
    mount,
    page,
  }) => {
    await mount(<DialogFullScreenWithHeaderChildren />);

    await expect(getComponent(page, "pill").nth(0)).toHaveText("A pill");
    await expect(getComponent(page, "pill").nth(1)).toHaveText("Another pill");
  });

  test("should render component with content padding disabled", async ({
    mount,
    page,
  }) => {
    await mount(
      <DialogFullScreenComponent
        title="Dialog Full Screen Title"
        disableContentPadding
      />
    );

    const content = getDataElementByValue(page, "content");
    await expect(content).toHaveCSS("padding-right", "0px");
    await expect(content).toHaveCSS("padding-bottom", "0px");
  });

  // skip this test for now as FE-6053 has not been fixed yet
  test.skip("should render component with DisableClose prop", async ({
    mount,
    page,
  }) => {
    await mount(<DialogFullScreenComponent disableClose />);

    const closeIcon = getDataElementByValue(page, "close").nth(1);
    await closeIcon.click();
    await expect(getDataElementByValue(page, "dialog-full-screen")).toHaveCount(
      1
    );
  });

  test("setting the topModalOverride prop should ensure the DialogFullScreen is rendered on top of any others", async ({
    mount,
    page,
  }) => {
    // prevent failure for taking more than 30s
    test.slow();

    await mount(<TopModalOverride />);

    const dialogFullscreen = getDataElementByValue(page, "dialog-full-screen");
    const dialogFullscreenClose = dialogFullscreen.getByLabel("Close");
    const dialogFullscreenTextbox = page.getByLabel("Fullscreen textbox");

    await waitForElementFocus(page, dialogFullscreen);
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

    await waitForElementFocus(page, sidebar);
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

    await waitForElementFocus(page, dialog);
    await dialog.press("Tab");
    await expect(dialogClose).toBeFocused();
    await dialogClose.press("Tab");
    await expect(dialogTextbox).toBeFocused();
    await dialogTextbox.press("Tab");
    await expect(dialogClose).toBeFocused();
  });

  test("should loop focus when a Select component is passed as children and the user presses shift + tab", async ({
    mount,
    page,
  }) => {
    await mount(<DialogFullScreenWithAutoFocusSelect />);

    await page.getByRole("button").click();

    const dialog = page.getByRole("dialog");
    const select = dialog.getByRole("combobox");

    await waitForAnimationEnd(dialog);
    await expect(select).toBeFocused();

    await dialog.press("Shift+Tab");
    await dialog.press("Shift+Tab");
    await dialog.press("Shift+Tab");
    await expect(select).toBeFocused();
  });
});

test.describe("Accessibility for DialogFullScreen", () => {
  test("should check accessibility for default component", async ({
    mount,
    page,
  }) => {
    await mount(<DialogFullScreenComponent />);

    await waitForAnimationEnd(page.getByRole("dialog"));
    await checkAccessibility(page);
  });

  test("should check accessibility with disabled content padding", async ({
    mount,
    page,
  }) => {
    await mount(<DialogFullScreenComponent disableContentPadding />);

    await waitForAnimationEnd(page.getByRole("dialog"));
    await checkAccessibility(page);
  });

  test("should check accessibility with header children", async ({
    mount,
    page,
  }) => {
    await mount(<DialogFullScreenWithHeaderChildren />);

    await waitForAnimationEnd(page.getByRole("dialog"));
    await checkAccessibility(page);
  });

  test("should check accessibility with help", async ({ mount, page }) => {
    await mount(<WithHelp />);

    const openButton = page
      .getByRole("button")
      .filter({ hasText: "Open DialogFullScreen" });
    await openButton.click();

    await waitForAnimationEnd(page.getByRole("dialog"));
    await checkAccessibility(page);
  });

  test("should check accessibility with hideable header children", async ({
    mount,
    page,
  }) => {
    await mount(<WithHideableHeaderChildren />);

    const openButton = page
      .getByRole("button")
      .filter({ hasText: "Open DialogFullScreen" });
    await openButton.click();

    await waitForAnimationEnd(page.getByRole("dialog"));
    await checkAccessibility(page);
  });

  test("should check accessibility with box", async ({ mount, page }) => {
    await mount(<WithBox />);

    const openButton = page
      .getByRole("button")
      .filter({ hasText: "Open DialogFullScreen" });
    await openButton.click();
    await checkAccessibility(page);
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
      .filter({ hasText: "Open DialogFullScreen" });
    await openButton.click();

    await checkAccessibility(page, page.getByRole("dialog"));
  });

  test("should check accessibility with complex example", async ({
    mount,
    page,
  }) => {
    await mount(<WithComplexExample />);

    const openButton = page
      .getByRole("button")
      .filter({ hasText: "Open DialogFullScreen" });
    await openButton.click();
    await expect(getDataElementByValue(page, "title")).toHaveText(
      "Dialog Title"
    );

    await checkAccessibility(page, page.getByRole("dialog"));
  });
});

test.describe("test background scroll when tabbing", () => {
  test("tabbing forward through the dialog and back to the start should not make the background scroll to the bottom", async ({
    mount,
    page,
  }) => {
    await mount(<DialogFullScreenBackgroundScrollTestComponent />);

    await continuePressingTAB(page, 3);
    await iconIsFocused(page, 0);
    await expect(page.getByTestId("#bottom-box")).not.toBeInViewport();
  });

  test("tabbing backward through the dialog and back to the start should not make the background scroll to the bottom", async ({
    mount,
    page,
  }) => {
    await mount(<DialogFullScreenBackgroundScrollTestComponent />);

    await page.waitForTimeout(500);
    await continuePressingSHIFTTAB(page, 2);
    await iconIsFocused(page, 0);
    await expect(page.getByTestId("#bottom-box")).not.toBeInViewport();
  });

  test("tabbing forward through the dialog and other focusable containers back to the start should not make the background scroll to the bottom", async ({
    mount,
    page,
  }) => {
    await mount(
      <DialogFullScreenBackgroundScrollWithOtherFocusableContainers />
    );

    await page.waitForTimeout(500);
    const toastIcon = getDataElementByValue(page, "close").nth(1);
    await toastIcon.focus();
    await continuePressingTAB(page, 5);
    await iconIsFocused(page, 0);
    await expect(page.getByTestId("#bottom-box")).not.toBeInViewport();
  });

  test("tabbing backward through the dialog and other focusable containers back to the start should not make the background scroll to the bottom", async ({
    mount,
    page,
  }) => {
    await mount(
      <DialogFullScreenBackgroundScrollWithOtherFocusableContainers />
    );

    await page.waitForTimeout(500);
    await continuePressingSHIFTTAB(page, 8);
    await iconIsFocused(page, 0);
    await expect(page.getByTestId("#bottom-box")).not.toBeInViewport();
  });
});
