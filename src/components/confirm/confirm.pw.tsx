import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import Confirm, { ConfirmProps } from "./confirm.component";
import {
  ConfirmComponent,
  ConfirmComponentFocusFirst,
  TopModalOverride,
} from "./components.test-pw";
import {
  getDataElementByValue,
  icon,
} from "../../../playwright/components/index";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
  getStyle,
  waitForAnimationEnd,
} from "../../../playwright/support/helper";
import { SIZE, CHARACTERS } from "../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const heights: [number, string][] = [
  [0, "0"],
  [10, "10"],
  [999, "999"],
  [1500, "1500"],
];
const buttonTypes: [
  ConfirmProps["confirmButtonType"] | ConfirmProps["cancelButtonType"],
  string,
  string,
][] = [
  ["primary", "rgb(255, 255, 255)", "rgba(0, 0, 0, 0)"],
  ["secondary", "rgb(0, 126, 69)", "rgb(0, 126, 69)"],
  ["tertiary", "rgb(0, 126, 69)", "rgba(0, 0, 0, 0)"],
  ["darkBackground", "rgb(0, 126, 69)", "rgba(0, 0, 0, 0)"],
];
const disabledStates: [
  ConfirmProps["disableCancel"] | ConfirmProps["disableConfirm"],
  string,
][] = [
  [true, "disabled"],
  [false, "enabled"],
];
const destructiveState: [ConfirmProps["cancelButtonDestructive"], string][] = [
  [true, "rgb(203, 55, 74)"],
  [false, "rgb(0, 126, 69)"],
];
const iconPositions: [ConfirmProps["cancelButtonIconPosition"], number][] = [
  ["before", 0],
  ["after", 2],
];

test.describe("should render Confirm component", () => {
  testData.forEach((confirmButtonText) => {
    test(`should check confirm button text is ${confirmButtonText}`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent confirmLabel={confirmButtonText} />);

      const button = page
        .getByRole("button")
        .filter({ hasText: confirmButtonText });
      await expect(button).toHaveAttribute("data-element", "confirm");
    });
  });

  testData.forEach((cancelButtonText) => {
    test(`should check cancel button text is ${cancelButtonText}`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent cancelLabel={cancelButtonText} />);

      const button = page
        .getByRole("button")
        .filter({ hasText: cancelButtonText });
      await expect(button).toHaveAttribute("data-element", "cancel");
    });
  });

  testData.forEach((titleText) => {
    test(`should check title text is ${titleText}`, async ({ mount, page }) => {
      await mount(<ConfirmComponent title={titleText} />);

      await expect(page.getByText(titleText)).toHaveAttribute(
        "data-element",
        "title",
      );
    });
  });

  testData.forEach((subTitleText) => {
    test(`should check subtitle text is ${subTitleText}`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent subtitle={subTitleText} />);

      await expect(page.getByText(subTitleText)).toHaveAttribute(
        "data-element",
        "subtitle",
      );
    });
  });

  ["0px", "100px", "500px"].forEach((height) => {
    test(`height of Confirm dialog is ${height} when height prop is ${height}`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({ width: 600, height: 1000 });
      await mount(<ConfirmComponent height={height} />);

      await expect(page.getByRole("alertdialog")).toHaveCSS("height", height);
    });
  });

  test("Confirm dialog's height does not exceed the height of the viewport", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 600, height: 1000 });
    await mount(<ConfirmComponent height="1200px" />);

    const actualDialogHeight = parseInt(
      await getStyle(page.getByRole("alertdialog"), "height"),
    );

    expect(actualDialogHeight).toBeLessThanOrEqual(1000);
  });

  (
    [
      [SIZE.EXTRASMALL, 300],
      [SIZE.SMALL, 380],
      [SIZE.MEDIUMSMALL, 540],
      [SIZE.MEDIUM, 750],
      [SIZE.MEDIUMLARGE, 850],
      [SIZE.LARGE, 960],
      [SIZE.EXTRALARGE, 1080],
    ] as [ConfirmProps["size"], number][]
  ).forEach(([sizeName, size]) => {
    test(`should check confirm size is ${sizeName} with width of ${size}px`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent size={sizeName} />);

      await assertCssValueIsApproximately(
        page.getByRole("alertdialog"),
        "width",
        size,
      );
    });
  });

  (
    [
      ["error", "error"],
      ["warning", "warning"],
    ] as [ConfirmProps["iconType"], string][]
  ).forEach(([iconType, element]) => {
    test(`should check confirm has ${iconType} icon`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent iconType={iconType} />);

      const firstIcon = icon(page).first();
      await expect(firstIcon).toHaveAttribute("data-element", element);
    });
  });

  buttonTypes.forEach(([type, colour, border]) => {
    test(`should check confirm button is ${type} type`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent confirmButtonType={type} />);

      const button = page.getByRole("button").filter({ hasText: "Yes" });
      await expect(button).toHaveCSS("color", colour);
      await expect(button).toHaveCSS("border-color", border);
    });
  });

  buttonTypes.forEach(([type, colour, border]) => {
    test(`should check cancel button is ${type} type`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent cancelButtonType={type} />);

      const button = page.getByRole("button").filter({ hasText: "No" });
      await expect(button).toHaveCSS("color", colour);
      await expect(button).toHaveCSS("border-color", border);
    });
  });

  disabledStates.forEach(([boolVal, state]) => {
    test(`should check when disableCancel prop is ${boolVal} that cancel button is ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent disableCancel={boolVal} />);

      const button = page.getByRole("button").filter({ hasText: "No" });
      if (boolVal) {
        await expect(button).toHaveAttribute("disabled", "");
        await expect(button).toBeDisabled();
      } else {
        await expect(button).not.toHaveAttribute("disabled", "");
        await expect(button).toBeEnabled();
      }
    });
  });

  disabledStates.forEach(([boolVal, state]) => {
    test(`should check when disableConfirm prop is ${boolVal} that confirm button is ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent disableConfirm={boolVal} />);

      const button = page.getByRole("button").filter({ hasText: "Yes" });
      if (boolVal) {
        await expect(button).toHaveAttribute("disabled", "");
        await expect(button).toBeDisabled();
      } else {
        await expect(button).not.toHaveAttribute("disabled", "");
        await expect(button).toBeEnabled();
      }
    });
  });

  test(`should check confirm button is loading`, async ({ mount, page }) => {
    await mount(<ConfirmComponent isLoadingConfirm />);

    const button = getDataElementByValue(page, "confirm");
    await expect(button).toHaveAttribute("disabled", "");
    const loader = page.getByTestId("confirm-loader");
    await expect(loader).toBeAttached();
  });

  test(`should check Esc key is disabled`, async ({ mount, page }) => {
    await mount(<ConfirmComponent disableEscKey />);

    const confirm = page.getByRole("alertdialog");
    await confirm.waitFor();

    await page.keyboard.press("Escape");

    await expect(confirm).toBeVisible();
  });

  test(`should check close icon is enabled`, async ({ mount, page }) => {
    await mount(<ConfirmComponent showCloseIcon />);

    const closeIcon = page.getByLabel("close");
    await closeIcon.click();
    await expect(page.getByRole("alertdialog")).not.toBeAttached();
  });

  destructiveState.forEach(([state, color]) => {
    test(`should check cancel button has destructive properties when cancelButtonDestructive prop is ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent cancelButtonDestructive={state} />);

      const button = page.getByRole("button").filter({ hasText: "No" });
      await expect(button).toHaveCSS("color", color);
      await expect(button).toHaveCSS("border-color", color);
    });
  });

  destructiveState.forEach(([state, backgroundcolor]) => {
    test(`should check confirm button has destructive properties when confirmButtonDestructive prop is ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent confirmButtonDestructive={state} />);

      const button = page.getByRole("button").filter({ hasText: "Yes" });
      await expect(button).toHaveCSS("background-color", backgroundcolor);
    });
  });

  test(`should check clicking cancel button closes dialog`, async ({
    mount,
    page,
  }) => {
    await mount(<ConfirmComponent />);

    const button = page.getByRole("button").filter({ hasText: "No" });
    await button.click();
    await expect(page.getByRole("alertdialog")).not.toBeAttached();
  });

  test(`should check clicking confirm button closes dialog`, async ({
    mount,
    page,
  }) => {
    await mount(<ConfirmComponent />);

    const button = page.getByRole("button").filter({ hasText: "Yes" });
    await button.click();
    await expect(page.getByRole("alertdialog")).not.toBeAttached();
  });

  test(`should check clicking confirm button does not close dialog when confirm button is disabled`, async ({
    mount,
    page,
  }) => {
    await mount(<ConfirmComponent disableConfirm />);

    const button = page.getByRole("button").filter({ hasText: "Yes" });
    await button.click({ force: true });
    await expect(page.getByRole("alertdialog")).toBeVisible();
  });

  test(`should check clicking Esc key closes dialog`, async ({
    mount,
    page,
  }) => {
    await mount(<ConfirmComponent />);

    const dialog = page.getByRole("alertdialog");
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeAttached();
  });

  test(`should render Confirm with aria-label prop`, async ({
    mount,
    page,
  }) => {
    await mount(<ConfirmComponent aria-label="playwright-aria" />);

    await expect(page.getByRole("alertdialog")).toHaveAttribute(
      "aria-label",
      "playwright-aria",
    );
  });

  test(`should check confirm button has save icon`, async ({ mount, page }) => {
    await mount(<ConfirmComponent confirmButtonIconType="save" />);

    await expect(getDataElementByValue(page, "save")).toHaveAttribute(
      "type",
      "save",
    );
  });

  test(`should check cancel button has bin icon`, async ({ mount, page }) => {
    await mount(<ConfirmComponent cancelButtonIconType="bin" />);

    await expect(getDataElementByValue(page, "bin")).toHaveAttribute(
      "type",
      "bin",
    );
  });

  test(`should render Confirm with aria-labelledby prop`, async ({
    mount,
    page,
  }) => {
    await mount(
      <Confirm
        open
        aria-labelledby={CHARACTERS.STANDARD}
        onConfirm={() => {
          ("");
        }}
      />,
    );

    await expect(page.getByRole("alertdialog")).toHaveAttribute(
      "aria-labelledby",
      CHARACTERS.STANDARD,
    );
  });

  test(`should render Confirm with aria-describedby prop`, async ({
    mount,
    page,
  }) => {
    await mount(
      <Confirm
        open
        aria-describedby={CHARACTERS.STANDARD}
        onConfirm={() => {
          ("");
        }}
      />,
    );

    await expect(page.getByRole("alertdialog")).toHaveAttribute(
      "aria-describedby",
      CHARACTERS.STANDARD,
    );
  });

  iconPositions.forEach(([position, positionInElement]) => {
    test(`should verify position of icon on Cancel button is ${position} text`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ConfirmComponent
          cancelButtonIconType="bin"
          cancelButtonIconPosition={position}
        />,
      );

      if (position === "before") {
        const iconPos = page
          .getByRole("button")
          .filter({ hasText: "No" })
          .locator("span")
          .nth(positionInElement);
        await expect(iconPos).toHaveAttribute("data-element", "bin");
      } else {
        const iconPos = page
          .getByRole("button")
          .filter({ hasText: "No" })
          .locator(`span:nth-child(${positionInElement})`);
        await expect(iconPos).toHaveAttribute("data-element", "bin");
      }
    });
  });

  iconPositions.forEach(([position, positionInElement]) => {
    test(`should verify position of icon on Confirm button is ${position} text`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ConfirmComponent
          confirmButtonIconType="add"
          confirmButtonIconPosition={position}
        />,
      );

      if (position === "before") {
        const iconPos = page
          .getByRole("button")
          .filter({ hasText: "Yes" })
          .locator("span")
          .nth(positionInElement);
        await expect(iconPos).toHaveAttribute("data-element", "add");
      } else {
        const iconPos = page
          .getByRole("button")
          .filter({ hasText: "Yes" })
          .locator(`span:nth-child(${positionInElement})`);
        await expect(iconPos).toHaveAttribute("data-element", "add");
      }
    });
  });

  [true, false].forEach((boolVal) => {
    test(`should check Open prop is  ${boolVal}`, async ({ mount, page }) => {
      await mount(<ConfirmComponent open={boolVal} />);

      const dialog = page.getByRole("alertdialog");
      if (boolVal) {
        await expect(dialog).toBeAttached;
      } else {
        await expect(dialog).not.toBeAttached;
      }
    });
  });

  test(`should check first element is focused`, async ({ mount, page }) => {
    await mount(<ConfirmComponentFocusFirst />);

    const focusFirstElementDemoButton = page
      .getByRole("button")
      .filter({ hasText: "Open Demo using focusFirstElement" });
    await focusFirstElementDemoButton.click();

    const focusedButton = page.getByRole("button").first();
    await expect(focusedButton).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(focusedButton).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
  });

  test(`should check disableAutoFocus prop`, async ({ mount, page }) => {
    await mount(<ConfirmComponentFocusFirst />);

    const autoFocusDemoButton = page
      .getByRole("button")
      .filter({ hasText: "Open Demo using autoFocus" });
    await autoFocusDemoButton.click();

    await expect(page.getByRole("button").first()).not.toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
  });

  test(`should check custom data tags are correctly applied to their respective buttons`, async ({
    mount,
    page,
  }) => {
    await mount(
      <ConfirmComponent
        onCancel={() => {}}
        onConfirm={() => {}}
        cancelButtonDataProps={{
          "data-element": "bang",
          "data-role": "wallop",
        }}
        confirmButtonDataProps={{
          "data-element": "bar",
          "data-role": "wiz",
        }}
        open
      />,
    );

    const cancelButton = getDataElementByValue(page, "bang");
    const confirmButton = getDataElementByValue(page, "bar");

    await expect(cancelButton).toHaveAttribute("data-component", "cancel");
    await expect(cancelButton).toHaveAttribute("data-element", "bang");
    await expect(cancelButton).toHaveAttribute("data-role", "wallop");

    await expect(confirmButton).toHaveAttribute("data-component", "confirm");
    await expect(confirmButton).toHaveAttribute("data-element", "bar");
    await expect(confirmButton).toHaveAttribute("data-role", "wiz");
  });
});

// TODO: Skipped due to flaky focus behaviour. To review in FE-6428
test.skip("setting the topModalOverride prop should ensure the Confirm is rendered on top of any others", async ({
  mount,
  page,
}) => {
  await mount(<TopModalOverride />);

  const dialog = page.getByRole("alertdialog");
  const dialogCancelBtn = dialog.getByRole("button").first();
  const dialogConfirmBtn = dialog.getByRole("button").last();
  const dialogTextbox = page.getByLabel("Confirm textbox");

  await waitForAnimationEnd(dialog);
  await dialog.press("Tab");
  await expect(dialogTextbox).toBeFocused();
  await dialogTextbox.press("Tab");
  await expect(dialogCancelBtn).toBeFocused();
  await dialogCancelBtn.press("Tab");
  await expect(dialogConfirmBtn).toBeFocused();
  await dialogConfirmBtn.press("Enter");

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

test.describe("should check accessibility for Confirm", () => {
  (
    [
      "primary",
      "secondary",
      "tertiary",
      "darkBackground",
    ] as ConfirmProps["confirmButtonType"][]
  ).forEach((type) => {
    test(`should check accessibility for confirm button of ${type} type`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent confirmButtonType={type} />);

      await checkAccessibility(page);
    });
  });

  (
    [
      "primary",
      "secondary",
      "tertiary",
      "darkBackground",
    ] as ConfirmProps["cancelButtonType"][]
  ).forEach((type) => {
    test(`should check accessibility for cancel button of ${type} type`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent cancelButtonType={type} />);

      await checkAccessibility(page);
    });
  });

  disabledStates.forEach(([boolVal, state]) => {
    test(`should check accessibility when disableCancel prop is ${boolVal} that cancel button is ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent disableCancel={boolVal} />);

      await checkAccessibility(page);
    });
  });

  disabledStates.forEach(([boolVal, state]) => {
    test(`should check accessibility when disableConfirm prop is ${boolVal} that confirm button is ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent disableConfirm={boolVal} />);

      await checkAccessibility(page);
    });
  });

  test(`should check accessibility for confirm button is loading`, async ({
    mount,
    page,
  }) => {
    await mount(<ConfirmComponent isLoadingConfirm />);

    await checkAccessibility(page);
  });

  test(`should check accessibility for Esc key is disabled`, async ({
    mount,
    page,
  }) => {
    await mount(<ConfirmComponent disableEscKey />);

    await checkAccessibility(page);
  });

  test(`should check accessibility for close icon is enabled`, async ({
    mount,
    page,
  }) => {
    await mount(<ConfirmComponent showCloseIcon />);

    await checkAccessibility(page);
  });

  test(`should check accessibility when clicking cancel button closes dialog`, async ({
    mount,
    page,
  }) => {
    await mount(<ConfirmComponent />);

    await checkAccessibility(page);
  });

  test(`should check accessibility when clicking confirm button does not close dialog when confirm button is disabled`, async ({
    mount,
    page,
  }) => {
    await mount(<ConfirmComponent disableConfirm />);

    await checkAccessibility(page);
  });

  test(`should check accessibility when confirm button has save icon`, async ({
    mount,
    page,
  }) => {
    await mount(<ConfirmComponent confirmButtonIconType="save" />);

    await checkAccessibility(page);
  });

  test(`should check accessibility when cancel button has bin icon`, async ({
    mount,
    page,
  }) => {
    await mount(<ConfirmComponent cancelButtonIconType="bin" />);

    await checkAccessibility(page);
  });

  test(`should check accessibility for isLoadingConfirm state`, async ({
    mount,
    page,
  }) => {
    await mount(<ConfirmComponent isLoadingConfirm />);

    await checkAccessibility(page);
  });

  iconPositions.forEach(([position]) => {
    test(`should check accessibility when icon on Cancel button is ${position} text`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ConfirmComponent
          cancelButtonIconType="bin"
          cancelButtonIconPosition={position}
        />,
      );

      await checkAccessibility(page);
    });
  });

  iconPositions.forEach(([position]) => {
    test(`should check accessibility when icon on Confirm button is ${position} text`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ConfirmComponent
          confirmButtonIconType="add"
          confirmButtonIconPosition={position}
        />,
      );

      await checkAccessibility(page);
    });
  });

  test(`should check accessibility when first element is focused`, async ({
    mount,
    page,
  }) => {
    await mount(<ConfirmComponentFocusFirst />);

    const focusFirstElementDemoButton = page
      .getByRole("button")
      .filter({ hasText: "Open Demo using focusFirstElement" });
    await focusFirstElementDemoButton.click();

    await checkAccessibility(page);
  });

  test(`should check accessibility when using disableAutoFocus prop`, async ({
    mount,
    page,
  }) => {
    await mount(<ConfirmComponentFocusFirst />);

    const autoFocusDemoButton = page
      .getByRole("button")
      .filter({ hasText: "Open Demo using autoFocus" });
    await autoFocusDemoButton.click();

    await checkAccessibility(page);
  });

  testData.forEach((confirmButtonText) => {
    test(`should check accessibility when confirm button text is ${confirmButtonText}`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent confirmLabel={confirmButtonText} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((cancelButtonText) => {
    test(`should check accessibility when cancel button text is ${cancelButtonText}`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent cancelLabel={cancelButtonText} />);

      await checkAccessibility(page);
    });
  });

  destructiveState.forEach(([state]) => {
    test(`should check accessibility when cancelButtonDestructive is ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent cancelButtonDestructive={state} />);

      await checkAccessibility(page);
    });
  });

  destructiveState.forEach(([state]) => {
    test(`should check accessibility when confirmButtonDestructive is ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent confirmButtonDestructive={state} />);

      await checkAccessibility(page);
    });
  });

  (
    [
      [SIZE.EXTRASMALL, 300],
      [SIZE.SMALL, 380],
      [SIZE.MEDIUMSMALL, 540],
      [SIZE.MEDIUM, 750],
      [SIZE.MEDIUMLARGE, 850],
      [SIZE.LARGE, 960],
      [SIZE.EXTRALARGE, 1080],
    ] as [ConfirmProps["size"], number][]
  ).forEach(([sizeName, size]) => {
    test(`should check accessibility when size is ${sizeName} with width of ${size}px`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent size={sizeName} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((titleText) => {
    test(`should check accessibility when title text is ${titleText}`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent title={titleText} />);

      await checkAccessibility(page);
    });
  });

  heights.forEach(([heightnumber, heightstring]) => {
    test(`should check accessibility when height is ${heightnumber}px`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent height={heightstring} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((subTitleText) => {
    test(`should check accessibility when subtitle text is ${subTitleText}`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent subtitle={subTitleText} />);

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((boolVal) => {
    test(`should check accessibility when Open prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<ConfirmComponent open={boolVal} />);

      if (boolVal) {
        await checkAccessibility(page);
      } else {
        await checkAccessibility(page);
      }
    });
  });
});

test(`should have the expected border radius styling`, async ({
  mount,
  page,
}) => {
  await mount(<ConfirmComponent />);

  await expect(page.getByRole("alertdialog")).toHaveCSS(
    "border-radius",
    "16px",
  );
});
