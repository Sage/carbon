import React from "react";
import { DismissibleBoxProps } from "../dismissible-box";
import { test, expect } from "../../../playwright/helpers/base-test";

import {
  DefaultDismissibleBox,
  DefaultDarkVariant,
  DefaultLightVariant,
  WidthOverridden,
  WithNoLeftBorderHighlight,
} from "../../../src/components/dismissible-box/components.test-pw";
import dismissibleBoxDataComponent from "../../../playwright/components/dismissible-box/index";
import {
  icon,
  getDataElementByValue,
} from "../../../playwright/components/index";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
} from "../../../playwright/support/helper";

test.describe("DismissibleBox component", () => {
  (
    [
      [true, "rgba(0, 0, 0, 0.9)"],
      [false, "rgb(204, 214, 219)"],
    ] as [DismissibleBoxProps["hasBorderLeftHighlight"], string][]
  ).forEach(([boolValue, color]) => {
    test(`should apply correct styling when hasBorderLeftHighlight prop set to ${boolValue}`, async ({
      mount,
      page,
    }) => {
      await mount(<DefaultDismissibleBox hasBorderLeftHighlight={boolValue} />);

      await expect(dismissibleBoxDataComponent(page)).toHaveCSS(
        "border-left-color",
        color,
      );
    });
  });

  [150, 350].forEach((width) => {
    test(`should apply correct width to component when width prop set to ${width}`, async ({
      mount,
      page,
    }) => {
      await mount(<DefaultDismissibleBox width={`${width}px`} />);

      await assertCssValueIsApproximately(
        dismissibleBoxDataComponent(page),
        "width",
        width,
      );
    });
  });

  (
    [
      ["light", "rgb(255, 255, 255)"],
      ["dark", "rgb(230, 235, 237)"],
    ] as [DismissibleBoxProps["variant"], string][]
  ).forEach(([variant, color]) => {
    test(`should apply correct styling to component with variant prop set to ${variant}`, async ({
      mount,
      page,
    }) => {
      await mount(<DefaultDismissibleBox variant={variant} />);

      await expect(dismissibleBoxDataComponent(page)).toHaveCSS(
        "background-color",
        color,
      );
    });
  });

  (
    [
      [undefined, "8px"],
      ["borderRadius000", "0px"],
      ["borderRadius025", "2px"],
      ["borderRadius050", "4px"],
      ["borderRadius200", "16px"],
      ["borderRadius400", "32px"],
    ] as [DismissibleBoxProps["borderRadius"], string][]
  ).forEach(([borderRadius, expected]) => {
    test(`applies the expected border radius when ${borderRadius} passed to borderRadius prop`, async ({
      mount,
      page,
    }) => {
      await mount(<DefaultDismissibleBox borderRadius={borderRadius} />);
      await expect(dismissibleBoxDataComponent(page)).toHaveCSS(
        "border-radius",
        expected,
      );
    });
  });

  test("should have the expected data-role attribute on the IconButton, when a custom data-role is provided", async ({
    mount,
    page,
  }) => {
    await mount(
      <DefaultDismissibleBox closeButtonDataProps={{ "data-role": "Foo" }} />,
    );

    const closeButton = getDataElementByValue(
      page,
      "close-button-wrapper",
    ).locator("button");

    await expect(closeButton).toHaveAttribute("data-role", "Foo");
  });

  test("should have the expected data-element attribute on the IconButton, when a custom data-element is provided", async ({
    mount,
    page,
  }) => {
    await mount(
      <DefaultDismissibleBox
        closeButtonDataProps={{ "data-element": "Bar" }}
      />,
    );

    const closeButton = getDataElementByValue(
      page,
      "close-button-wrapper",
    ).locator("button");

    await expect(closeButton).toHaveAttribute("data-element", "Bar");
  });
});

test.describe("Check events", () => {
  test("should call onClose callback when a mouse click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <DefaultDismissibleBox
        onClose={() => {
          callbackCount += 1;
        }}
      />,
    );

    await icon(page).click();

    expect(callbackCount).toEqual(1);
  });

  ["Space", "Enter"].forEach((key) => {
    test(`should call onClose callback when a keyboard key ${key} event is triggered`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <DefaultDismissibleBox
          onClose={() => {
            callbackCount += 1;
          }}
        />,
      );

      await page.keyboard.press("Tab");
      await page.keyboard.press(key);

      expect(callbackCount).toEqual(1);
    });
  });
});

test.describe("Accessibility tests", () => {
  test("should pass accessibility tests for DefaultDarkVariant example", async ({
    mount,
    page,
  }) => {
    await mount(<DefaultDarkVariant onClose={() => {}} />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for DefaultLightVariant example", async ({
    mount,
    page,
  }) => {
    await mount(<DefaultLightVariant onClose={() => {}} />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for WidthOverridden example", async ({
    mount,
    page,
  }) => {
    await mount(<WidthOverridden onClose={() => {}} />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for WithNoLeftBorderHighlight example", async ({
    mount,
    page,
  }) => {
    await mount(<WithNoLeftBorderHighlight onClose={() => {}} />);

    await checkAccessibility(page);
  });
});
