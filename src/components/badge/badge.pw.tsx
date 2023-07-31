/* eslint-disable no-return-assign */
import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import {
  badge,
  badgeCounter,
  badgeCrossIcon,
} from "../../../playwright/components/badge/index";
import {
  checkAccessibility,
  getStyle,
} from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";
import { BadgeComponent } from "./components.test-pw";

const counterCount = [1, 99];
const bigCounterCount = [100, 999];
const negativeCounterCount = [0, -12, "test", CHARACTERS.SPECIALCHARACTERS];

test.describe("should render Badge component", () => {
  test("renders BadgeComponent", async ({ mount, page }) => {
    await mount(<BadgeComponent counter={9} />);

    const badgeElement = await badge(page);
    const text = await page.locator("span > span").textContent();
    const badgeElementIsVisible = await badgeElement.isVisible;
    await expect(text?.toString().trim()).toEqual("Filter");
    await expect(badgeElementIsVisible).toBeTruthy;
  });

  counterCount.forEach((countInput) => {
    test(`should check Badge counter is set to ${countInput}`, async ({
      mount,
      page,
    }) => {
      await mount(<BadgeComponent counter={countInput} />);

      const badgeCounterElement = await badgeCounter(page);
      const count = await badgeCounterElement.textContent();

      await expect(count).toEqual(`${countInput}`);
    });
  });

  bigCounterCount.forEach((countInput) => {
    test(`should check Badge counter is set to 99 when using ${countInput} as counter`, async ({
      mount,
      page,
    }) => {
      await mount(<BadgeComponent counter={countInput} />);

      const badgeCounterElement = await badgeCounter(page);
      const count = await badgeCounterElement.textContent();

      await expect(count).toEqual("99");
    });
  });

  negativeCounterCount.forEach((incorrectValue) => {
    test(`should check Badge counter is not visible when using ${incorrectValue} param`, async ({
      mount,
      page,
    }) => {
      await mount(<BadgeComponent counter={incorrectValue} />);

      await expect((await badgeCounter(page)).isVisible).toBeFalsy;
    });
  });

  test("badge should display cross icon when hovered over", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent onClick={() => {}} counter={99} />);

    const counterIcon = await badgeCounter(page);
    await counterIcon.hover();
    const crossIcon = (await badgeCrossIcon(page)).isVisible;
    const color = await getStyle(await badge(page), "background");

    await expect(color).toContain("rgb(0, 126, 69)");
    await expect(crossIcon).toBeTruthy;
  });

  test("badge should not display cross icon when hovered over with no onClick function passed to component", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent counter={99} />);

    const badgeElement = await badge(page);
    await badgeElement.hover();
    const badgeCrossIconLocator = (await badgeCrossIcon(page)).isVisible;

    const backgroundColor = await getStyle(badgeElement, "background");
    await expect(backgroundColor).toContain("rgb(255, 255, 255)");
    await expect(badgeCrossIconLocator).toBeTruthy;
  });

  test("should call onClick callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let capturedCallback = false;

    await mount(
      <BadgeComponent counter={5} onClick={() => (capturedCallback = true)} />
    );

    const badgeToClick = await badge(page);
    await badgeToClick.click();
    await expect(capturedCallback).toBeTruthy;
  });

  test("should render with expected border radius styling", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent counter={9} />);

    await expect(await badge(page)).toHaveCSS("border-radius", "50%");
  });

  test("should check ariaLabel for Badge component", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent counter={9} aria-label="cypress-aria" />);

    const ariaLabel = await badge(page);
    await expect(ariaLabel).toHaveAttribute("aria-label", "cypress-aria");
  });

  test("should pass accessibility tests for Badge default story", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent counter={9} />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for click event", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent onClick={() => {}} />);

    await checkAccessibility(page);
  });
});
