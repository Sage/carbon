import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import IconButtonComponent from "./component.test-pw";
import { button as iconButton } from "../../../playwright/components/index";
import { CHARACTERS } from "../../../playwright/support/constants";
import { HooksConfig } from "../../../playwright";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("check IconButton component focus outlines and border radius", () => {
  test(`should have the expected styling when the focusRedesignOptOut is false`, async ({
    mount,
    page,
  }) => {
    await mount(<IconButtonComponent />);

    await iconButton(page).focus();
    await expect(iconButton(page)).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );

    await expect(iconButton(page)).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
  });

  test(`should have the expected styling when the focusRedesignOptOut is true`, async ({
    mount,
    page,
  }) => {
    await mount<HooksConfig>(<IconButtonComponent />, {
      hooksConfig: { focusRedesignOptOut: true },
    });

    await iconButton(page).focus();
    await expect(iconButton(page)).toHaveCSS(
      "outline",
      "rgb(255, 188, 25) solid 3px",
    );
  });

  test(`should render with the expected border radius`, async ({
    mount,
    page,
  }) => {
    await mount(<IconButtonComponent />);

    await iconButton(page).focus();
    await expect(iconButton(page)).toHaveCSS("border-radius", "4px");
  });
});

test.describe("check props for IconButton component", () => {
  test(`should render with aria-label prop`, async ({ mount, page }) => {
    await mount(<IconButtonComponent aria-label={CHARACTERS.STANDARD} />);

    await expect(iconButton(page)).toHaveAttribute(
      "aria-label",
      CHARACTERS.STANDARD,
    );
    await expect(iconButton(page)).toBeVisible();
  });

  test(`should render with a child`, async ({ mount, page }) => {
    await mount(<IconButtonComponent />);

    await expect(iconButton(page)).toBeVisible();
  });

  test(`should render with disabled prop`, async ({ mount, page }) => {
    await mount(<IconButtonComponent disabled />);

    await expect(iconButton(page)).toBeDisabled();
  });
});

test.describe("check events for IconButton component", () => {
  test(`should call onBlur callback when a blur event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <IconButtonComponent
        onBlur={() => {
          callbackCount += 1;
        }}
      />,
    );

    await iconButton(page).focus();
    await iconButton(page).blur();
    expect(callbackCount).toBe(1);
  });

  test(`should call onFocus callback when a focus event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <IconButtonComponent
        onFocus={() => {
          callbackCount += 1;
        }}
      />,
    );

    await iconButton(page).focus();
    expect(callbackCount).toBe(1);
  });

  test(`should call onMouseEnter callback when a mouseover event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <IconButtonComponent
        onMouseEnter={() => {
          callbackCount += 1;
        }}
      />,
    );

    await iconButton(page).hover();
    expect(callbackCount).toBe(1);
  });

  test(`should call onMouseLeave callback when a mouseout event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <IconButtonComponent
        onMouseLeave={() => {
          callbackCount += 1;
        }}
      />,
    );

    await iconButton(page).hover();
    await page.mouse.move(100, 0);
    expect(callbackCount).toBe(1);
  });

  test(`should call onClick callback when a click event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <IconButtonComponent
        onClick={() => {
          callbackCount += 1;
        }}
      />,
    );
    await iconButton(page).click();
    expect(callbackCount).toBe(1);
  });

  ["Enter", "Space"].forEach((key) => {
    test(`should call onClick callback when ${key} key is triggered`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <IconButtonComponent
          onClick={() => {
            callbackCount += 1;
          }}
        />,
      );

      await iconButton(page).press(key);
      expect(callbackCount).toBe(1);
    });
  });
});

test.describe("check accessibility tests for IconButton component", () => {
  test(`should pass accessibility tests when rendered with an aria-label`, async ({
    mount,
    page,
  }) => {
    await mount(<IconButtonComponent aria-label={CHARACTERS.STANDARD} />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests when rendered with a child`, async ({
    mount,
    page,
  }) => {
    await mount(<IconButtonComponent />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests when disabled`, async ({
    mount,
    page,
  }) => {
    await mount(<IconButtonComponent disabled />);

    await checkAccessibility(page);
  });
});
