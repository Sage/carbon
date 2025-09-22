import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  MessageComponent,
  MessageComponentWithRef,
} from "./components.test-pw";
import Message, { MessageProps } from ".";
import { checkAccessibility } from "../../../playwright/support/helper";

import messagePreview from "../../../playwright/components/message";

import { CHARACTERS } from "../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("Tests for Message component properties", () => {
  testData.forEach((children) => {
    test(`should check ${children} as children for Message component`, async ({
      mount,
      page,
    }) => {
      await mount(<Message>{children}</Message>);

      await expect(page.getByTestId("message-content")).toHaveText(children);
    });
  });

  testData.forEach((id) => {
    test(`should check ${id} as id for Message component`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent id={id} />);

      await expect(messagePreview(page)).toHaveId(id);
    });
  });

  test("should check when open is true for Message component", async ({
    mount,
    page,
  }) => {
    await mount(<MessageComponent open />);
    await expect(messagePreview(page)).toBeVisible();
  });

  test("should check when open is false for Message component", async ({
    mount,
    page,
  }) => {
    await mount(<MessageComponent open={false} />);
    await expect(messagePreview(page)).toBeHidden();
  });

  test(`should focus component when open is true and component has a ref`, async ({
    mount,
    page,
  }) => {
    await mount(<MessageComponentWithRef />);

    await page.getByRole("button").click();
    await expect(messagePreview(page)).toBeFocused();
  });

  testData.forEach((title) => {
    test(`should check ${title} as title for Message component`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent title={title} />);
      await expect(page.getByTestId("message-content")).toContainText(title);
    });
  });

  test("should check showCloseIcon when it's true for Message component", async ({
    mount,
    page,
  }) => {
    await mount(<MessageComponent showCloseIcon />);
    await expect(page.getByRole("button", { name: "Close" })).toBeVisible();
  });

  test("should check showCloseIcon when it's false for Message component", async ({
    mount,
    page,
  }) => {
    await mount(<MessageComponent showCloseIcon={false} />);
    await expect(page.getByRole("button", { name: "Close" })).toBeHidden();
  });

  testData.forEach((ariaLabel) => {
    test(`should check closeButtonAriaLabel as ${ariaLabel} for Message component`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent closeButtonAriaLabel={ariaLabel} />);

      await expect(page.getByRole("button")).toHaveAccessibleName(ariaLabel);
    });
  });

  test("should call onDismiss callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <MessageComponent
        onDismiss={() => {
          callbackCount += 1;
        }}
      />,
    );
    await page.getByRole("button", { name: "Close" }).click();
    expect(callbackCount).toBe(1);
  });

  test("should focus icon button when open is true for Message component and tab key is pressed", async ({
    mount,
    page,
  }) => {
    await mount(<MessageComponentWithRef />);
    await page.getByRole("button").click();
    await expect(messagePreview(page)).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Close" })).toBeFocused();
  });
});

test.describe("Accessibility tests for Message component", () => {
  (
    [
      "error",
      "info",
      "success",
      "warning",
      "neutral",
      "ai",
      "error-subtle",
      "info-subtle",
      "success-subtle",
      "warning-subtle",
      "ai-subtle",
      "callout-subtle",
    ] as MessageProps["variant"][]
  ).forEach((variant) => {
    test(`should check ${variant} as variant for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent variant={variant} />);
      await checkAccessibility(page);
    });
  });

  testData.forEach((id) => {
    test(`should check ${id} as id for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent id={id} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((title) => {
    test(`should check ${title} as title for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent title={title} />);
      await checkAccessibility(page);
    });
  });

  [true, false].forEach((boolVal) => {
    test(`should check ${boolVal} for transparent background for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent transparent={boolVal} />);
      await checkAccessibility(page);
    });
  });

  [true, false].forEach((boolVal) => {
    test(`should check showCloseIcon when it's ${boolVal} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent showCloseIcon={boolVal} />);
      await checkAccessibility(page);
    });
  });

  testData.forEach((ariaLabel) => {
    test(`should check closeButtonAriaLabel as ${ariaLabel} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent closeButtonAriaLabel={ariaLabel} />);
      await checkAccessibility(page);
    });
  });
});
