import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import {
  alertCrossIcon,
  alertTitle,
  alertSubtitle,
  alertChildren,
  alertDialog,
} from "../../../playwright/components/alert";
import {
  checkAccessibility,
  checkDialogIsInDOM,
  checkDialogIsNotInDOM,
} from "../../../playwright/support/helper";
import {
  CHARACTERS,
  SIZE,
} from "../../../cypress/support/component-helper/constants";
import AlertComponent from "./components.test-pw";

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

      const children = alertChildren(page);
      const alertChildrenText = await children.textContent();
      expect(alertChildrenText).toEqual(text);
    });
  });

  test("with close icon button that does not close dialog when escape key pressed and disableEscKey prop is true", async ({
    mount,
    page,
  }) => {
    await mount(
      <AlertComponent title="title" disableEscKey>
        Alert
      </AlertComponent>
    );

    await checkDialogIsInDOM(page);
    await page.keyboard.press("Escape");
    await checkDialogIsInDOM(page);
  });

  test("with keyboard accessible close icon button which closes the dialog when enter key is pressed", async ({
    mount,
    page,
  }) => {
    await mount(<AlertComponent title="title">Alert</AlertComponent>);

    await checkDialogIsInDOM(page);
    const cross = alertCrossIcon(page);
    await page.keyboard.press("Tab");
    await expect(cross).toBeFocused();
    await cross.press("Enter");
    await checkDialogIsNotInDOM(page);
  });

  test("with close icon button that closes dialog when clicked", async ({
    mount,
    page,
  }) => {
    await mount(<AlertComponent title="title">Alert</AlertComponent>);

    await checkDialogIsInDOM(page);
    const cross = alertCrossIcon(page);
    await cross.click();
    await checkDialogIsNotInDOM(page);
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
        </AlertComponent>
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
        </AlertComponent>
      );

      const alertElement = alertDialog(page);
      await expect(alertElement).toHaveCSS("width", `${width}px`);
    });
  });

  test("with close icon button that calls the onCancel callback when clicked", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <AlertComponent
        onCancel={() => {
          callbackCount += 1;
        }}
      />
    );

    const cross = alertCrossIcon(page);
    await cross.click();
    expect(callbackCount).toBe(1);
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
