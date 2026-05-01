import React from "react";
import { test, expect } from "../../../../playwright/helpers/base-test";
import { icon } from "../../../../playwright/components";
import {
  portraitImage,
  portraitInitials,
  portraitPreview,
} from "../../../../playwright/components/portrait/index";

import { checkAccessibility } from "../../../../playwright/support/helper";
import {
  PORTRAIT_SIZE_PARAMS,
  PORTRAIT_SIZES,
} from "../../../../src/components/portrait/__next__/portrait.config";
import PortraitDefaultComponent from "./components.test-pw";

const testImage = "https://avataaars.io/";

const imageURLs = [
  "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
];

const portraitSizes = PORTRAIT_SIZES.map((size) => [
  size,
  PORTRAIT_SIZE_PARAMS[size].dimensions,
]);

test.describe("Prop checks for Portrait component", () => {
  ["SPM", "JM", "AR", "MJ"].forEach((passInitials) => {
    test(`should render with initials as ${passInitials}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent initials={passInitials} />);

      await expect(portraitInitials(page)).toHaveText(passInitials);
    });
  });

  [
    ["SPMMMMM", "SPM"],
    ["JMMMMM", "JMM"],
    ["ARRRR", "ARR"],
    ["MJJJ", "MJJ"],
  ].forEach(([passInitials, maxInitials]) => {
    test(`should render with a maximum of three initials when passed initials are ${passInitials} `, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent initials={passInitials} />);

      await expect(portraitInitials(page)).toHaveText(maxInitials);
    });
  });

  imageURLs.forEach((url) => {
    test(`should render with src prop passed as ${url}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent src={url} />);

      await expect(portraitImage(page)).toHaveAttribute("src", url);
    });
  });

  portraitSizes.forEach(([size, heightAndWidth]) => {
    test(`should render with size prop passed as ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent size={size} />);

      await expect(portraitPreview(page)).toHaveCSS(
        "height",
        `${heightAndWidth}px`,
      );
      await expect(portraitPreview(page)).toHaveCSS(
        "width",
        `${heightAndWidth}px`,
      );
    });
  });

  test("should render with alt text", async ({ mount, page }) => {
    await mount(
      <PortraitDefaultComponent src={testImage} alt="playwright-test" />,
    );

    await expect(portraitImage(page)).toHaveAttribute("alt", "playwright-test");
  });

  [
    ["square", "8px"],
    ["circle", "999px"],
  ].forEach(([shape, radius]) => {
    test(`should render with shape prop passed as ${shape}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent shape={shape} />);

      await expect(portraitPreview(page)).toHaveCSS("border-radius", radius);
    });
  });

  ["error", "warning", "info"].forEach((iconType) => {
    test(`should render with iconType prop passed as ${iconType}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent iconType={iconType} />);

      await expect(icon(page)).toBeVisible();
      await expect(icon(page)).toHaveAttribute("data-element", iconType);
    });
  });

  portraitSizes.forEach(([size, heightAndWidth]) => {
    test(`should render with size prop passed as ${size} with icon`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent size={size} />);

      await expect(portraitPreview(page)).toHaveCSS(
        "height",
        `${heightAndWidth}px`,
      );
      await expect(portraitPreview(page)).toHaveCSS(
        "width",
        `${heightAndWidth}px`,
      );
    });
  });

  portraitSizes.forEach(([size, heightAndWidth]) => {
    test(`should render with size prop passed as ${size} with initials`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent initials="JD" size={size} />);

      await expect(portraitPreview(page)).toHaveCSS(
        "height",
        `${heightAndWidth}px`,
      );
      await expect(portraitPreview(page)).toHaveCSS(
        "width",
        `${heightAndWidth}px`,
      );
    });
  });

  portraitSizes.forEach(([size, heightAndWidth]) => {
    test(`should render with size prop passed as ${size} - with src`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent src={testImage} size={size} />);

      await expect(portraitPreview(page)).toHaveCSS(
        "height",
        `${heightAndWidth}px`,
      );
      await expect(portraitPreview(page)).toHaveCSS(
        "width",
        `${heightAndWidth}px`,
      );
    });
  });

  test("should render with correct border", async ({ mount, page }) => {
    await mount(<PortraitDefaultComponent />);

    await expect(portraitPreview(page)).toHaveCSS(
      "border",
      "1px solid rgb(140, 152, 162)",
    );
  });
});

test.describe("Event checks for Portrait component", () => {
  test("should render and call onClick callback when a click event", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(<PortraitDefaultComponent onClick={(callbackCount += 1)} />);

    await portraitPreview(page).click();
    expect(callbackCount).toBe(1);
  });
});

test.describe("Accessibility tests for Portrait component", () => {
  imageURLs.forEach((url) => {
    test(`should pass accessibility checks when src is ${url}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent src={url} />);

      await checkAccessibility(page);
    });
  });

  portraitSizes.forEach(([size]) => {
    test(`should pass accessibility checks when size is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent size={size} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility checks when alt text is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PortraitDefaultComponent alt="playwright-test" />);

    await checkAccessibility(page);
  });

  ["square", "circle"].forEach((shape) => {
    test(`should pass accessibility checks when shape is ${shape}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent shape={shape} />);

      await checkAccessibility(page);
    });
  });

  ["error", "warning", "info"].forEach((iconType) => {
    test(`should pass accessibility checks when iconType is ${iconType}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent iconType={iconType} />);

      await checkAccessibility(page);
    });
  });

  ["SPM", "JM", "AR", "MJ"].forEach((passInitials) => {
    test(`should pass accessibility checks when initials are ${passInitials}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent initials={passInitials} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility checks when onClick callback is called during a click event", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(<PortraitDefaultComponent onClick={(callbackCount += 1)} />);

    await checkAccessibility(page);
  });
});
