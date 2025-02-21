import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { getDataElementByValue } from "../../../playwright/components";
import {
  portraitImage,
  portraitInitials,
  portraitPreview,
} from "../../../playwright/components/portrait/index";
import { icon } from "../../../playwright/components/index";
import {
  CHARACTERS,
  COLOR,
  SIZE,
  VALIDATION,
} from "../../../playwright/support/constants";
import {
  checkAccessibility,
  waitForAnimationEnd,
  getDesignTokensByCssProperty,
} from "../../../playwright/support/helper";
import Box from "../../../src/components/box";
import {
  PORTRAIT_SIZE_PARAMS,
  PORTRAIT_SIZES,
} from "../../../src/components/portrait/portrait.config";
import {
  PortraitComponent,
  PortraitDefaultComponent,
} from "./components.test-pw";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const colors = [
  ["orange", COLOR.ORANGE],
  ["red", COLOR.RED],
  ["black", COLOR.BLACK],
  ["brown", COLOR.BROWN],
];

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
    ["square", "0px"],
    ["circle", "50%"],
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

  (
    [
      ["without", false, "rgb(242, 245, 246)", "--colorsUtilityReadOnly400"],
      ["with", true, "rgba(0, 0, 0, 0.9)", "--colorsUtilityYin090"],
    ] as [string, boolean, string, string][]
  ).forEach(([renderState, boolVal, color, tokenVal]) => {
    test(`should render ${renderState} dark background variant and correct background colour, when darkBackground prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent darkBackground={boolVal} />);

      const backgroundColorTokens = await getDesignTokensByCssProperty(
        page,
        portraitPreview(page),
        "background-color",
      );

      expect(backgroundColorTokens.toString()).toBe(tokenVal);
      await expect(portraitPreview(page)).toHaveCSS("background-color", color);
    });
  });

  (
    [
      ["without", false, "rgba(0, 0, 0, 0.9)", "--colorsUtilityYin090"],
      ["with", true, "rgb(204, 214, 219)", "--colorsUtilityReadOnly600"],
    ] as [string, boolean, string, string][]
  ).forEach(([renderState, boolVal, color, tokenVal]) => {
    test(`should render ${renderState} dark background variant and correct colour, when darkBackground prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent darkBackground={boolVal} />);

      const colorTokens = await getDesignTokensByCssProperty(
        page,
        portraitPreview(page),
        "color",
      );

      expect(colorTokens.toString()).toBe(tokenVal);
      await expect(portraitPreview(page)).toHaveCSS("color", color);
    });
  });

  test("should render with correct border", async ({ mount, page }) => {
    await mount(<PortraitDefaultComponent />);

    await expect(portraitPreview(page)).toHaveCSS(
      "border",
      "1px solid rgb(204, 214, 219)",
    );
  });

  testData.forEach((tooltipMessage) => {
    test(`should render with tooltipMessage as ${tooltipMessage}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent tooltipMessage={tooltipMessage} />);

      await portraitPreview(page).hover();

      const tooltip = getDataElementByValue(page, "tooltip");

      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveText(tooltipMessage);
    });
  });

  testData.forEach((tooltipId) => {
    test(`should render with tooltipId as ${tooltipId}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PortraitDefaultComponent tooltipMessage="foo" tooltipId={tooltipId} />,
      );

      await portraitPreview(page).hover();

      const tooltip = getDataElementByValue(page, "tooltip");

      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveId(tooltipId);
    });
  });

  [
    [true, "with"],
    [false, "without"],
  ].forEach(([boolVal, renderState]) => {
    test(`should render ${renderState} a tooltip, when visibility prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PortraitComponent tooltipMessage="foo" tooltipIsVisible={boolVal} />,
      );

      const tooltip = getDataElementByValue(page, "tooltip");

      if (boolVal) {
        await expect(tooltip).toBeVisible();
        await expect(tooltip).toHaveText("foo");
      } else {
        await expect(tooltip).not.toBeVisible();
      }
    });
  });

  ["top", "bottom", "left", "right"].forEach((tooltipPosition) => {
    test(`should render with tooltip positioned ${tooltipPosition}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box p={200}>
          <PortraitComponent tooltipPosition={tooltipPosition} />{" "}
        </Box>,
      );

      const tooltip = getDataElementByValue(page, "tooltip");

      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveAttribute("data-placement", tooltipPosition);
    });
  });

  test("should render with a tooltip error", async ({ mount, page }) => {
    await mount(<PortraitComponent tooltipType="error" />);

    const tooltip = getDataElementByValue(page, "tooltip");

    await expect(tooltip).toHaveCSS("background-color", VALIDATION.ERROR);
  });

  [
    [SIZE.MEDIUM, "14px"],
    [SIZE.LARGE, "16px"],
  ].forEach(([tooltipSize, fontSize]) => {
    test(`should render with a ${tooltipSize} size tooltip`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitComponent tooltipSize={tooltipSize} />);

      const tooltip = getDataElementByValue(page, "tooltip");

      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveCSS("font-size", fontSize);
    });
  });

  colors.forEach(([names, color]) => {
    test(`should render with a tooltip with a ${names} background color`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitComponent tooltipBgColor={color} />);

      const tooltip = getDataElementByValue(page, "tooltip");

      await expect(tooltip).toHaveCSS("background-color", color);
    });
  });

  colors.forEach(([names, color]) => {
    test(`should render with a tooltip with a ${names} font color`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitComponent tooltipFontColor={color} />);

      const tooltip = getDataElementByValue(page, "tooltip");

      await expect(tooltip).toHaveCSS("color", color);
    });
  });

  [
    { token: "colorsUtilityMajor500", rgb: "(0, 50, 76)" },
    { token: "colorsActionMajor500", rgb: "(0, 126, 69)" },
    { token: "colorsSemanticFocus500", rgb: "(255, 188, 25)" },
    { token: "colorsSemanticNegative500", rgb: "(203, 55, 74)" },
  ].forEach(({ token, rgb }) => {
    test(`should substitute the correct background colour when a design system token (${token}) is provided`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PortraitDefaultComponent backgroundColor={`var(--${token})`} />,
      );

      await expect(portraitPreview(page)).toHaveCSS(
        "background-color",
        `rgb${rgb}`,
      );
    });
  });

  [
    { token: "colorsUtilityMajor500", rgb: "(0, 50, 76)" },
    { token: "colorsActionMajor500", rgb: "(0, 126, 69)" },
    { token: "colorsSemanticFocus500", rgb: "(255, 188, 25)" },
    { token: "colorsSemanticNegative500", rgb: "(203, 55, 74)" },
  ].forEach(({ token, rgb }) => {
    test(`should substitute the correct foreground colour when a design system token (${token}) is provided`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PortraitDefaultComponent foregroundColor={`var(--${token})`} />,
      );

      await expect(portraitPreview(page)).toHaveCSS("color", `rgb${rgb}`);
    });
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

  (
    [
      ["without", false, "rgb(242, 245, 246)"],
      ["with", true, "rgb(153, 173, 183)"],
    ] as [string, boolean, string][]
  ).forEach(([renderState, boolVal]) => {
    test(`should pass accessibility checks ${renderState} dark background variant, when darkBackground prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent darkBackground={boolVal} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((tooltipMessage) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should pass accessibility checks when toolTipMessage is ${tooltipMessage}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PortraitComponent tooltipIsVisible tooltipMessage={tooltipMessage} />,
      );

      await waitForAnimationEnd(getDataElementByValue(page, "tooltip"));
      await checkAccessibility(page);
    });
  });

  testData.forEach((tooltipId) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should pass accessibility checks when tooltipId is ${tooltipId}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitComponent tooltipId={tooltipId} />);

      await waitForAnimationEnd(getDataElementByValue(page, "tooltip"));
      await checkAccessibility(page);
    });
  });

  test("should pass accessibility checks without a tooltip, when visibility prop is false", async ({
    mount,
    page,
  }) => {
    await mount(
      <PortraitComponent tooltipMessage="foo" tooltipIsVisible={false} />,
    );

    await checkAccessibility(page);
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip("should pass accessibility checks with a tooltip, when visibility prop is true", async ({
    mount,
    page,
  }) => {
    await mount(<PortraitComponent tooltipMessage="foo" tooltipIsVisible />);

    await waitForAnimationEnd(getDataElementByValue(page, "tooltip"));

    await checkAccessibility(page);
  });

  ["top", "bottom", "left", "right"].forEach((tooltipPosition) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should pass accessibility checks with tooltip positioned ${tooltipPosition}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitComponent tooltipPosition={tooltipPosition} />);

      await waitForAnimationEnd(getDataElementByValue(page, "tooltip"));
      await checkAccessibility(page);
    });
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip("should pass accessibility checks with a tooltip error", async ({
    mount,
    page,
  }) => {
    await mount(<PortraitComponent tooltipType="error" />);

    await waitForAnimationEnd(getDataElementByValue(page, "tooltip"));
    await checkAccessibility(page);
  });

  [SIZE.MEDIUM, SIZE.LARGE].forEach((tooltipSize) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should pass accessibility checks with a ${tooltipSize} size tooltip`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitComponent tooltipSize={tooltipSize} />);

      await waitForAnimationEnd(getDataElementByValue(page, "tooltip"));
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

  [
    { value: "#A3CAF0", label: "paleblue" },
    { value: "#FD9BA3", label: "palepink" },
    { value: "#B4AEEA", label: "palepurple" },
    { value: "#ECE6AF", label: "palegoldenrod" },
    { value: "#EBAEDE", label: "paleorchid" },
    { value: "#EBC7AE", label: "paledesert" },
    { value: "#AEECEB", label: "paleturquoise" },
    { value: "#AEECD6", label: "palemint" },
    { value: "#000000", label: "black" },
    { value: "#FFFFFF", label: "white" },
    { value: "#2F4F4F", label: "darkslategray" },
    { value: "#696969", label: "dimgray" },
    { value: "#808080", label: "gray" },
    { value: "#A9A9A9", label: "darkgray" },
    { value: "#C0C0C0", label: "silver" },
    { value: "#D3D3D3", label: "lightgray" },
    { value: "#DCDCDC", label: "gainsboro" },
    { value: "#F5F5F5", label: "whitesmoke" },
    { value: "#FFFFE0", label: "lightyellow" },
    { value: "#FFFACD", label: "lemonchiffon" },
    { value: "#FAFAD2", label: "lightgoldenrodyellow" },
    { value: "#FFE4B5", label: "moccasin" },
    { value: "#FFDAB9", label: "peachpuff" },
    { value: "#FFDEAD", label: "navajowhite" },
    { value: "#F5DEB3", label: "wheat" },
    { value: "#FFF8DC", label: "cornsilk" },
    { value: "#FFFFF0", label: "ivory" },
    { value: "#0000FF", label: "blue" },
    { value: "#0000CD", label: "mediumblue" },
    { value: "#00008B", label: "darkblue" },
    { value: "#000080", label: "navy" },
    { value: "#191970", label: "midnightblue" },
    { value: "#4169E1", label: "royalblue" },
    { value: "#4682B4", label: "steelblue" },
    { value: "#5F9EA0", label: "cadetblue" },
    { value: "#6495ED", label: "cornflowerblue" },
    { value: "#87CEFA", label: "lightskyblue" },
    { value: "#87CEEB", label: "skyblue" },
    { value: "#00BFFF", label: "deepskyblue" },
    { value: "#1E90FF", label: "dodgerblue" },
    { value: "#ADD8E6", label: "lightblue" },
    { value: "#B0C4DE", label: "lightsteelblue" },
    { value: "#708090", label: "slateblue" },
    { value: "#6A5ACD", label: "slateblue2" },
    { value: "#7B68EE", label: "mediumslateblue" },
    { value: "#8A2BE2", label: "blueviolet" },
    { value: "#9370DB", label: "mediumpurple" },
  ].forEach(({ label, value }) => {
    test(`should pass accessibility checks when backgroundColor is ${label} (${value})`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent backgroundColor={value} />);

      await checkAccessibility(page);
    });
  });
});
