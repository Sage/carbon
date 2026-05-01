import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { getDataElementByValue } from "../../../playwright/components";
import { portraitPreview } from "../../../playwright/components/portrait/index";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  checkAccessibility,
  getDesignTokensByCssProperty,
} from "../../../playwright/support/helper";
import {
  PortraitComponent,
  PortraitDefaultComponent,
} from "./components.test-pw";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const imageURLs = [
  "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
];

test.describe("Prop checks for Portrait component", () => {
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

  test("should pass accessibility checks when alt text is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PortraitDefaultComponent alt="playwright-test" />);

    await checkAccessibility(page);
  });

  (
    [
      ["without", false],
      ["with", true],
    ] as [string, boolean][]
  ).forEach(([renderState, boolVal]) => {
    test(`should pass accessibility checks ${renderState} dark background variant, when darkBackground prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent darkBackground={boolVal} />);

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

  test("should pass accessibility checks with a tooltip, when visibility prop is true", async ({
    mount,
    page,
  }) => {
    await mount(<PortraitComponent tooltipMessage="foo" tooltipIsVisible />);

    await checkAccessibility(page, getDataElementByValue(page, "tooltip"));
  });

  test("should pass accessibility checks with a tooltip error", async ({
    mount,
    page,
  }) => {
    await mount(<PortraitComponent tooltipType="error" tooltipIsVisible />);

    await checkAccessibility(page, getDataElementByValue(page, "tooltip"));
  });

  testData.forEach((tooltipId) => {
    test(`should pass accessibility checks when tooltipId is ${tooltipId}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitComponent tooltipIsVisible tooltipId={tooltipId} />);

      await checkAccessibility(page, getDataElementByValue(page, "tooltip"));
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
