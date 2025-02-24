import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import {
  alertTitle,
  alertSubtitle,
  alertDialog,
} from "../../../playwright/components/alert";
import {
  checkAccessibility,
  waitForAnimationEnd,
} from "../../../playwright/support/helper";
import { CHARACTERS, SIZE } from "../../../playwright/support/constants";
import { AlertComponent, TopModalOverride } from "./components.test-pw";
import { getDataElementByValue } from "../../../playwright/components";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const viewportHeights = [250, 500, 650];
const viewportWidths = [
  [SIZE.EXTRASMALL, 300],
  [SIZE.SMALL, 380],
  [SIZE.MEDIUMSMALL, 540],
  [SIZE.MEDIUM, 750],
  [SIZE.MEDIUMLARGE, 850],
  [SIZE.LARGE, 960],
  [SIZE.EXTRALARGE, 1080],
];

test.describe("should render Alert component", () => {
  specialCharacters.forEach((text) => {
    test(`with ${text} as a title`, async ({ mount, page }) => {
      await mount(<AlertComponent title={text} />);

      const title = alertTitle(page);
      const titleText = await title.textContent();
      expect(titleText).toEqual(text);
    });

    test(`with ${text} as a subtitle`, async ({ mount, page }) => {
      await mount(<AlertComponent subtitle={text} />);

      const subtitle = alertSubtitle(page);
      const alertSubtitleText = await subtitle.textContent();
      expect(alertSubtitleText).toEqual(text);
    });

    test(`with ${text} as children`, async ({ mount, page }) => {
      await mount(<AlertComponent title="title">{text}</AlertComponent>);

      await expect(page.getByText(text)).toBeVisible();
    });
  });

  test("dialog does not close when escape key pressed and disableEscKey prop is true", async ({
    mount,
    page,
  }) => {
    await mount(
      <AlertComponent title="title" disableEscKey>
        Alert
      </AlertComponent>,
    );

    const alert = page.getByRole("alertdialog");
    await alert.waitFor();

    await page.keyboard.press("Escape");

    await expect(alert).toBeVisible();
  });

  test("dialog closes when enter key is pressed on close button", async ({
    mount,
    page,
  }) => {
    await mount(<AlertComponent title="title">Alert</AlertComponent>);

    const alert = page.getByRole("alertdialog");
    await alert.waitFor();

    const closeButton = page.getByRole("button", { name: "Close" });
    await closeButton.press("Enter");

    await expect(alert).toBeHidden();
  });

  test("dialog closes when close button is clicked", async ({
    mount,
    page,
  }) => {
    await mount(<AlertComponent title="title">Alert</AlertComponent>);

    const alert = page.getByRole("alertdialog");
    await alert.waitFor();

    const closeButton = page.getByRole("button", { name: "Close" });
    await closeButton.click();

    await expect(alert).toBeHidden();
  });

  viewportHeights.forEach((height) => {
    test(`with dialog height set to ${height}px`, async ({
      mount,
      page,
      viewport,
    }) => {
      await mount(
        <AlertComponent title="title" height={`${height}px`}>
          Alert
        </AlertComponent>,
      );

      const viewportHeight = viewport?.height || 0;

      let resultHeight: number | null;
      if (height >= viewportHeight - 20) {
        resultHeight = viewportHeight - 20;
      } else {
        resultHeight = height;
      }

      const alertElement = alertDialog(page);
      await expect(alertElement).toHaveCSS("height", `${resultHeight}px`);
    });
  });

  viewportWidths.forEach(([size, width]) => {
    test(`with dialog width set to ${width}px when size is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <AlertComponent title="title" size={size}>
          Alert
        </AlertComponent>,
      );

      const alertElement = alertDialog(page);
      await expect(alertElement).toHaveCSS("width", `${width}px`);
    });
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip("setting the topModalOverride prop should ensure the Alert is rendered on top of any others", async ({
    mount,
    page,
  }) => {
    await mount(<TopModalOverride />);

    const dialog = alertDialog(page);
    const dialogClose = dialog.getByLabel("Close");
    const dialogTextbox = page.getByLabel("Alert textbox");

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

  test("with the expected border radius styling", async ({ mount, page }) => {
    await mount(<AlertComponent />);

    const alertElement = alertDialog(page);
    await expect(alertElement).toHaveCSS("border-radius", "16px");
  });

  test("should pass accessibility tests", async ({ mount, page }) => {
    await mount(<AlertComponent counter={9} />);

    await checkAccessibility(page);
  });
});
