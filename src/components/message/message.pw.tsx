import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import {
  MessageComponent,
  MessageComponentWithRef,
} from "./components.test-pw";
import Message, { MessageProps } from ".";
import { checkAccessibility } from "../../../playwright/support/helper";

import {
  messagePreview,
  messageChildren,
  messageTitle,
  messageDismissIcon,
  messageContent,
  variantPreview,
  buttonPreview,
  messageDismissIconButton,
} from "../../../playwright/components/message";

import { VALIDATION, CHARACTERS } from "../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("Tests for Message component properties", () => {
  (
    [
      ["info", "rgb(0, 96, 167)"],
      ["error", VALIDATION.ERROR],
      ["success", "rgb(0, 138, 33)"],
      ["warning", VALIDATION.WARNING],
      ["neutral", "rgb(51, 91, 112)"],
    ] as [MessageProps["variant"], string][]
  ).forEach(([variant, backgroundColor]) => {
    test(`should check ${variant} as variant for Message components`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent variant={variant} />);

      await expect(variantPreview(page)).toHaveCSS(
        "background-color",
        backgroundColor,
      );
    });
  });

  testData.forEach((children) => {
    test(`should check ${children} as children for Message component`, async ({
      mount,
      page,
    }) => {
      await mount(<Message>{children}</Message>);

      await expect(messageChildren(page)).toHaveText(children);
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

  [true, false].forEach((boolVal) => {
    test(`should check when open is ${boolVal} for Message component`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent open={boolVal} />);
      if (boolVal === true) {
        await expect(messagePreview(page)).toBeVisible();
      } else {
        await expect(messagePreview(page)).not.toBeVisible();
      }
    });
  });

  test(`should focus component when open is true and component has a ref`, async ({
    mount,
    page,
  }) => {
    await mount(<MessageComponentWithRef />);

    await buttonPreview(page).click();
    await expect(messagePreview(page)).toBeFocused();
  });

  testData.forEach((title) => {
    test(`should check ${title} as title for Message component`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent title={title} />);
      await expect(messageTitle(page)).toHaveText(title);
    });
  });

  (
    [
      [true, "rgba(0, 0, 0, 0)"],
      [false, "rgb(255, 255, 255)"],
    ] as [boolean, string][]
  ).forEach(([boolVal, backgroundColor]) => {
    test(`should apply expected styling when transparent is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent transparent={boolVal} />);

      await expect(messagePreview(page)).toHaveCSS(
        "background-color",
        backgroundColor,
      );
    });
  });

  (
    [
      [true, 50],
      [false, 20],
    ] as [boolean, number][]
  ).forEach(([boolVal, paddingVal]) => {
    test(`should check showCloseIcon when it's ${boolVal} for Message component`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent showCloseIcon={boolVal} />);

      if (boolVal === true) {
        await expect(messageDismissIcon(page)).toBeVisible();
        await expect(messageContent(page)).toHaveCSS(
          "padding",
          `15px ${paddingVal}px 15px 20px`,
        );
      } else {
        await expect(messageDismissIcon(page)).not.toBeVisible();
        await expect(messageContent(page)).toHaveCSS(
          "padding",
          `15px ${paddingVal}px`,
        );
      }
    });
  });

  testData.forEach((ariaLabel) => {
    test(`should check closeButtonAriaLabel as ${ariaLabel} for Message component`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent closeButtonAriaLabel={ariaLabel} />);

      await expect(messageDismissIconButton(page)).toHaveAttribute(
        "aria-label",
        ariaLabel,
      );
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
    await messageDismissIcon(page).click();
    expect(callbackCount).toBe(1);
  });

  test("should render message component with expected border radius styling", async ({
    mount,
    page,
  }) => {
    await mount(<MessageComponent />);

    await expect(messagePreview(page)).toHaveCSS("border-radius", "8px");
  });

  test("should focus icon button when open is true for Message component and tab key is pressed", async ({
    mount,
    page,
  }) => {
    await mount(<MessageComponentWithRef />);
    await buttonPreview(page).click();
    await expect(messagePreview(page)).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(messageDismissIconButton(page)).toBeFocused();
  });
});

test.describe("Accessibility tests for Message component", () => {
  (
    ["info", "error", "success", "warning"] as MessageProps["variant"][]
  ).forEach((variant) => {
    test(`should check ${variant} as variant for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent variant={variant} />);
      await checkAccessibility(page);
    });
  });

  testData.forEach((children) => {
    test(`should check ${children} as children for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<Message>{children}</Message>);

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

  [true, false].forEach((boolVal) => {
    test(`should check when open is ${boolVal} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent open={boolVal} />);
      await checkAccessibility(page);
    });
  });

  test(`should focus component when open is true and component has a ref for accessibility tests`, async ({
    mount,
    page,
  }) => {
    await mount(<MessageComponentWithRef />);
    await checkAccessibility(page);
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

  test(`should render message component for accessibility tests`, async ({
    mount,
    page,
  }) => {
    await mount(<MessageComponent />);

    await checkAccessibility(page);
  });
});
