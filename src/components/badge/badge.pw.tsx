import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  badge,
  badgeCounter,
  badgeCrossIcon,
} from "../../../playwright/components/badge/index";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  BadgeComponent,
  BadgeOnDarkBackground,
  BadgeWithChildren,
} from "./components.test-pw";

test.describe("should render Badge component", () => {
  [1, 10, 999, "55", "99+"].forEach((countInput) => {
    test(`should check Badge counter is set to ${countInput}`, async ({
      mount,
      page,
    }) => {
      await mount(<BadgeComponent counter={countInput} />);
      await expect(badgeCounter(page)).toContainText(`${countInput}`);
    });
  });

  [1000, 12345, 9999].forEach((countInput) => {
    test(`should check Badge counter is set to "999+" when using ${countInput} as counter`, async ({
      mount,
      page,
    }) => {
      await mount(<BadgeComponent counter={countInput} />);
      await expect(badgeCounter(page)).toContainText("999+");
    });
  });

  [
    ["99+", "99+"],
    ["999+", "999+"],
    ["123456", "1234"],
  ].forEach(([countInput, expectedOutput]) => {
    test(`should check Badge counter is set to ${expectedOutput} when counter is ${countInput}`, async ({
      mount,
      page,
    }) => {
      await mount(<BadgeComponent counter={countInput} />);
      await expect(badgeCounter(page)).toContainText(`${expectedOutput}`);
    });
  });

  [-10, 0, 3.14, ""].forEach((countInput) => {
    test(`should check Badge counter is not visible when passing ${countInput}`, async ({
      mount,
      page,
    }) => {
      await mount(<BadgeComponent counter={countInput} />);
      await expect(badgeCounter(page)).toBeHidden();
    });
  });

  test("should render with correct styles when onClick is passed and Badge is hovered", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent onClick={() => {}} counter={99} />);

    const badgeElement = badge(page);
    const crossIcon = badgeCrossIcon(page);

    await badgeElement.hover();
    await expect(crossIcon).toBeVisible();
    await expect(crossIcon).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(badgeElement).toHaveCSS("border-color", "rgb(205, 56, 75)");
    await expect(badgeElement).toHaveCSS(
      "background-color",
      "rgb(205, 56, 75)",
    );
    await expect(badgeElement).toHaveCSS("cursor", "pointer");
  });

  test("should render with correct styles when onClick is passed and Badge is clicked", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent onClick={() => {}} counter={99} />);

    const badgeElement = badge(page);
    const crossIcon = badgeCrossIcon(page);

    await badgeElement.click();
    await expect(crossIcon).toBeVisible();
    await expect(crossIcon).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(badgeElement).toHaveCSS("border-color", "rgb(205, 56, 75)");
    await expect(badgeElement).toHaveCSS(
      "background-color",
      "rgb(205, 56, 75)",
    );
    await expect(badgeElement).toHaveCSS("cursor", "pointer");
  });

  test("should render with correct styles when custom color is provided onClick is passed", async ({
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

    const badgeElement = badge(page);

    await badgeElement.click();
    await expect(badgeElement).toHaveCSS(
      "background-color",
      "rgb(203, 55, 74)",
    );
  });

  test("should pass accessibility tests for 'typical' Badge", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent counter={9} variant="typical" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for 'subtle' Badge", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent counter={9} variant="subtle" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for inverse 'typical' Badge", async ({
    mount,
    page,
  }) => {
    await mount(
      <BadgeOnDarkBackground counter={9} inverse variant="typical" />,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for inverse 'subtle' Badge", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeOnDarkBackground counter={9} inverse variant="subtle" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Badge with children", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeWithChildren />);
    await checkAccessibility(page);
  });
});
