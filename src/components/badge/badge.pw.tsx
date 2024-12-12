import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import {
  badge,
  badgeCounter,
  badgeCrossIcon,
} from "../../../playwright/components/badge/index";
import { checkAccessibility } from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../playwright/support/constants";
import BadgeComponent from "./components.test-pw";

test.describe("should render Badge component", () => {
  test("renders Badge Component", async ({ mount, page }) => {
    await mount(<BadgeComponent counter={9} />);

    const text = await page.locator("span > span").textContent();

    expect(text?.toString().trim()).toEqual("Filter");
    await expect(badge(page)).toBeVisible();
  });

  [1, 99].forEach((countInput) => {
    test(`should check Badge counter is set to ${countInput}`, async ({
      mount,
      page,
    }) => {
      await mount(<BadgeComponent counter={countInput} />);
      await expect(badgeCounter(page)).toContainText(`${countInput}`);
    });
  });

  [100, 999].forEach((countInput) => {
    test(`should check Badge counter is set to 99 when using ${countInput} as counter`, async ({
      mount,
      page,
    }) => {
      await mount(<BadgeComponent counter={countInput} />);
      await expect(badgeCounter(page)).toContainText("99");
    });
  });

  [0, -12, "test", CHARACTERS.SPECIALCHARACTERS].forEach((incorrectValue) => {
    test(`should check Badge counter is not visible when using ${incorrectValue} param`, async ({
      mount,
      page,
    }) => {
      await mount(<BadgeComponent counter={incorrectValue} />);
      await expect(badgeCounter(page)).not.toBeVisible();
    });
  });

  test("badge should display cross icon and default background colour when hovered over", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent onClick={() => {}} counter={99} />);

    await badgeCounter(page).hover();

    await expect(badge(page)).toHaveCSS("background-color", "rgb(0, 126, 69)");
    await expect(badgeCrossIcon(page)).toBeVisible();
  });

  test("badge should display correct background colour when hovered over with color prop passed", async ({
    mount,
    page,
  }) => {
    await mount(
      <BadgeComponent
        onClick={() => {}}
        counter={99}
        color="--colorsSemanticNegative500"
      />,
    );

    await badgeCounter(page).hover();

    await expect(badge(page)).toHaveCSS("background-color", "rgb(203, 55, 74)");
  });

  test("badge should not display cross icon when hovered over with no onClick function passed to component", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent counter={99} />);

    const badgeElement = badge(page);
    await badgeElement.hover();

    await expect(badgeElement).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)",
    );
    await expect(badgeCrossIcon(page)).not.toBeVisible();
  });

  test("should render with expected border radius styling", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent counter={9} />);
    await expect(badge(page)).toHaveCSS("border-radius", "50%");
  });

  test("should check ariaLabel for Badge component", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent counter={9} aria-label="foobar" />);
    await expect(badge(page)).toHaveAttribute("aria-label", "foobar");
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
    await mount(<BadgeComponent counter={9} onClick={() => {}} />);
    await checkAccessibility(page);
  });
});
