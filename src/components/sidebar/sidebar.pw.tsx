import { expect, test } from "@playwright/experimental-ct-react17";
import React from "react";
import {
  backgroundUILocator,
  closeIconButton,
  getComponent,
  getDataElementByValue,
} from "../../../playwright/components";
import { CLOSE_ICON_BUTTON } from "../../../playwright/components/locators";
import {
  sidebarComponent,
  sidebarPreview,
} from "../../../playwright/components/sidebar";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
  continuePressingSHIFTTAB,
  continuePressingTAB,
  waitForAnimationEnd,
} from "../../../playwright/support/helper";
import {
  SidebarBackgroundScrollTestComponent,
  SidebarBackgroundScrollWithOtherFocusableContainers,
  SidebarComponent,
  SidebarComponentFocusable,
  SidebarComponentWithHeading,
  SidebarComponentWithOnCancel,
  TopModalOverride,
} from "./components.test-pw";
import { SidebarProps } from "./sidebar.component";
import { SIDEBAR_SIZES, SIDEBAR_SIZES_CSS } from "./sidebar.config";

test.describe("Prop tests for Sidebar component", () => {
  [true, false].forEach((enableBackgroundUIValue) => {
    test(`verify visibility of backgroundUILocatorElement when enableBackgroundUI prop is set to ${enableBackgroundUIValue}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SidebarComponent enableBackgroundUI={enableBackgroundUIValue} />
      );

      const backgroundUILocatorElement = backgroundUILocator(page);

      if (enableBackgroundUIValue) {
        await expect(backgroundUILocatorElement).toBeHidden();
      } else {
        await expect(backgroundUILocatorElement).toBeVisible();
      }
    });
  });

  ([
    ["left", 0, 852],
    ["right", 852, 0],
  ] as [SidebarProps["position"], number, number][]).forEach(
    ([position, left, right]) => {
      test(`check component position is ${position}`, async ({
        mount,
        page,
      }) => {
        await mount(<SidebarComponent position={position} />);

        const sidebarPreviewElement = sidebarPreview(page);

        await assertCssValueIsApproximately(
          sidebarPreviewElement,
          "left",
          left
        );
        await assertCssValueIsApproximately(
          sidebarPreviewElement,
          "right",
          right
        );
      });
    }
  );

  test("check component has expected aria-describedby", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarComponent aria-describedby={CHARACTERS.STANDARD} />);

    await expect(sidebarPreview(page)).toHaveAttribute(
      "aria-describedby",
      CHARACTERS.STANDARD
    );
  });

  test("check component has expected aria-label", async ({ mount, page }) => {
    await mount(<SidebarComponent aria-label={CHARACTERS.STANDARD} />);

    await expect(sidebarPreview(page)).toHaveAttribute(
      "aria-label",
      CHARACTERS.STANDARD
    );
  });

  test("check component has expected aria-labelledby", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarComponent aria-labelledby={CHARACTERS.STANDARD} />);

    await expect(sidebarPreview(page)).toHaveAttribute(
      "aria-labelledby",
      CHARACTERS.STANDARD
    );
  });

  (SIDEBAR_SIZES as SidebarProps["size"][]).forEach((sizeValue) => {
    test(`check size is ${sizeValue}`, async ({ mount, page }) => {
      await mount(<SidebarComponent size={sizeValue} />);
      const width =
        SIDEBAR_SIZES_CSS[sizeValue as keyof typeof SIDEBAR_SIZES_CSS];

      await assertCssValueIsApproximately(
        sidebarPreview(page),
        "width",
        parseInt(width)
      );
    });
  });

  test("check component has expected header", async ({ mount, page }) => {
    await mount(<SidebarComponentWithHeading />);

    const sidebarHeaderComponent = getComponent(page, "sidebar-header");

    await expect(sidebarHeaderComponent).toBeVisible();

    const sidebarPreviewHeading = sidebarPreview(page).locator("h3").nth(0);
    await expect(sidebarPreviewHeading).toHaveText("Sidebar Header");
  });

  test("check component has role", async ({ mount, page }) => {
    await mount(<SidebarComponent role={CHARACTERS.STANDARD} />);

    await expect(sidebarPreview(page)).toHaveAttribute(
      "role",
      CHARACTERS.STANDARD
    );
  });

  test("check component has expected data-element", async ({ mount, page }) => {
    await mount(<SidebarComponent data-element={CHARACTERS.STANDARD} />);

    await expect(sidebarComponent(page)).toHaveAttribute(
      "data-element",
      CHARACTERS.STANDARD
    );
  });

  test("check component has expected data-role", async ({ mount, page }) => {
    await mount(<SidebarComponent data-role={CHARACTERS.STANDARD} />);

    await expect(sidebarComponent(page)).toHaveAttribute(
      "data-role",
      CHARACTERS.STANDARD
    );
  });

  [true, false].forEach((disableEscKeyValue) => {
    test(`verify visibility of sidebar component when disableEscKey is ${disableEscKeyValue} and Escape key is pressed`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SidebarComponentWithOnCancel disableEscKey={disableEscKeyValue} />
      );

      const sidebarPreviewElement = sidebarPreview(page);
      await sidebarPreviewElement.press("Escape");
      await waitForAnimationEnd(sidebarPreviewElement);

      if (disableEscKeyValue) {
        await expect(sidebarPreviewElement).toBeInViewport();
      } else {
        await expect(sidebarPreviewElement).not.toBeInViewport();
      }
    });
  });

  [true, false].forEach((openValue) => {
    test(`check component with open prop set to ${openValue}`, async ({
      mount,
      page,
    }) => {
      await mount(<SidebarComponent open={openValue} />);

      const sidebarPreviewElement = sidebarPreview(page);

      if (openValue) {
        await expect(sidebarPreviewElement).toBeInViewport();
      } else {
        await expect(sidebarPreviewElement).not.toBeInViewport();
      }
    });
  });

  test("should render component with focusableContainers", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarComponentFocusable />);

    const toastElement = getComponent(page, "toast");

    await expect(toastElement).toBeHidden();

    const openToastElement = getDataElementByValue(page, "open-toast");
    await openToastElement.click();

    await expect(toastElement).toBeVisible();

    const toastElementCloseButton = page
      .getByTestId("toast")
      .getByLabel("Close");
    await toastElementCloseButton.click();

    await expect(toastElement).toBeHidden();
  });

  test("should render component with first input and button as focusableSelectors", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarComponentFocusable />);

    const sidebarPreviewElement = sidebarPreview(page);
    await sidebarPreviewElement.press("Tab");
    const focusedElement = page.locator("*:focus");
    await focusedElement.press("Tab");
    const firstInputElement = getDataElementByValue(page, "input").nth(0);

    await expect(firstInputElement).toBeFocused();

    await focusedElement.press("Tab");
    const secondInputElement = getDataElementByValue(page, "input").nth(1);

    await expect(secondInputElement).not.toBeFocused();

    const openToastElement = getDataElementByValue(page, "open-toast");

    await expect(openToastElement).toBeFocused();
  });

  test("should return focus to the Toast within component after non-focusable content has been selected", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarComponentFocusable />);

    const toastElement = getComponent(page, "toast");

    await expect(toastElement).toBeHidden();

    const openToastElement = getDataElementByValue(page, "open-toast");
    await openToastElement.click();

    await expect(toastElement).toBeVisible();

    await page.keyboard.press("Tab");
    const closeIconButtonElement = closeIconButton(page).nth(1);

    await expect(closeIconButtonElement).toBeFocused();
  });

  test("should call onCancel callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <SidebarComponent
        onCancel={() => {
          callbackCount += 1;
        }}
      />
    );

    const closeIconButtonElement = closeIconButton(page);
    await closeIconButtonElement.click();

    await expect(callbackCount).toEqual(1);
  });

  test("should ensure the component is rendered on top of any other modals when the topModalOverride prop is true", async ({
    mount,
    page,
  }) => {
    await mount(<TopModalOverride />);

    const sidebarPreviewElement = sidebarPreview(page);

    await expect(sidebarPreviewElement).toBeVisible();

    const bodyElement = page.locator("body");
    await bodyElement.press("Tab");
    const sidebarPreviewCloseIconButton = sidebarPreview(page).locator(
      CLOSE_ICON_BUTTON
    );

    await expect(sidebarPreviewCloseIconButton).toBeFocused();

    const focusedElement = page.locator("*:focus");
    await focusedElement.press("Enter");

    await expect(sidebarPreviewElement).toBeHidden();

    await bodyElement.press("Tab");
    const DialogCloseIconButton = getComponent(page, "dialog").locator(
      CLOSE_ICON_BUTTON
    );

    await expect(DialogCloseIconButton).toBeFocused();
  });
});

test.describe("Accessibility tests for Sidebar component", () => {
  test("should check accessibility for SidebarComponent example", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarComponent />);

    await checkAccessibility(page);
  });

  (["left", "right"] as SidebarProps["position"][]).forEach((positionValue) => {
    test(`should check accessibility when sidebar position is ${positionValue}`, async ({
      mount,
      page,
    }) => {
      await mount(<SidebarComponent position={positionValue} />);

      await checkAccessibility(page);
    });
  });

  test("should check accessibility when sidebar has header", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarComponentWithHeading />);

    await checkAccessibility(page);
  });

  (SIDEBAR_SIZES as SidebarProps["size"][]).forEach((size) => {
    test(`should check accessibility when sidebar size is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<SidebarComponent size={size} />);

      await checkAccessibility(page);
    });
  });
});

test.describe("Check background scroll when tabbing", () => {
  test("tabbing forward through the sidebar and back to the start should not make the background scroll to the bottom", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarBackgroundScrollTestComponent />);

    await continuePressingTAB(page, 3);
    const closeIconButtonElement = closeIconButton(page);

    await expect(closeIconButtonElement).toBeFocused();
    const boxElement = getDataElementByValue(page, "test-box");
    await expect(boxElement).not.toBeInViewport();
  });

  test("tabbing backward through the sidebar and back to the start should not make the background scroll to the bottom", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarBackgroundScrollTestComponent />);

    await continuePressingSHIFTTAB(page, 1);
    const closeIconButtonElement = closeIconButton(page);

    await expect(closeIconButtonElement).toBeFocused();

    const boxElement = getDataElementByValue(page, "test-box");
    await expect(boxElement).not.toBeInViewport();
  });

  test("tabbing forward through the sidebar and other focusable containers back to the start should not make the background scroll to the bottom", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarBackgroundScrollWithOtherFocusableContainers />);

    await continuePressingTAB(page, 6);
    await waitForAnimationEnd(sidebarPreview(page));
    const closeIconButtonElement = closeIconButton(page).nth(0);

    await expect(closeIconButtonElement).toBeFocused();

    const boxElement = getDataElementByValue(page, "test-box");
    await expect(boxElement).not.toBeInViewport();
  });

  test("tabbing backward through the sidebar and other focusable containers back to the start should not make the background scroll to the bottom", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarBackgroundScrollWithOtherFocusableContainers />);

    await continuePressingSHIFTTAB(page, 7);
    const closeIconButtonElement = closeIconButton(page).nth(0);

    await expect(closeIconButtonElement).toBeFocused();

    const boxElement = getDataElementByValue(page, "test-box");
    await expect(boxElement).not.toBeInViewport();
  });
});
