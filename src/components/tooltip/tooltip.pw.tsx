import React from "react";
import { Locator } from "@playwright/test";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  TooltipComponent,
  UncontrolledTooltipComponent,
  Controlled,
  Positioning,
  FlipBehaviourOverrides,
  LargeTooltip,
  ColorOverrides,
  TooltipWithChangingTargetComponent,
} from "./components.test-pw";
import {
  checkAccessibility,
  assertCssValueIsApproximately,
} from "../../../playwright/support/helper";
import { SIZE, COLOR, CHARACTERS } from "../../../playwright/support/constants";
import { TooltipProps } from "../../../src/components/tooltip/tooltip.component";
import { getDataElementByValue } from "../../../playwright/components";

const backgroundColors = [COLOR.ORANGE, COLOR.RED, COLOR.BLACK, COLOR.BROWN];
const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const getXValue = (locator: Locator) =>
  locator.evaluate((element) => element.getBoundingClientRect().x);
const getYValue = (locator: Locator) =>
  locator.evaluate((element) => element.getBoundingClientRect().y);

test.describe("Tooltip component", () => {
  testData.forEach((message) => {
    test(`should render with message prop set to ${message}`, async ({
      mount,
      page,
    }) => {
      await mount(<TooltipComponent message={message} />);

      await expect(getDataElementByValue(page, "tooltip")).toHaveText(message);
    });
  });

  testData.forEach((id) => {
    test(`should render with id prop set to ${id}`, async ({ mount, page }) => {
      await mount(<TooltipComponent id={id} />);

      await expect(getDataElementByValue(page, "tooltip")).toHaveId(id);
    });
  });

  test("tooltip should be visible when isVisible prop is true", async ({
    mount,
    page,
  }) => {
    await mount(<TooltipComponent isVisible />);

    await expect(getDataElementByValue(page, "tooltip")).toBeVisible();
  });

  test("tooltip should not be visible when isVisible prop is false", async ({
    mount,
    page,
  }) => {
    await mount(<TooltipComponent isVisible={false} />);

    await expect(getDataElementByValue(page, "tooltip")).toBeHidden();
  });

  (
    ["bottom", "left", "right", "top"] as ["bottom", "left", "right", "top"]
  ).forEach((position) => {
    test(`should render with tooltip position set to ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(<TooltipComponent position={position} />);

      await expect(getDataElementByValue(page, "tooltip")).toBeVisible();
      await expect(getDataElementByValue(page, "tooltip")).toHaveAttribute(
        "data-placement",
        position,
      );
    });
  });

  ["undefined", "error"].forEach((type) => {
    test(`should render with type prop set to ${type}`, async ({
      mount,
      page,
    }) => {
      await mount(<TooltipComponent type={type} />);

      await expect(getDataElementByValue(page, "tooltip")).toHaveAttribute(
        "type",
        type,
      );
    });
  });

  backgroundColors.forEach((color) => {
    test(`should render with tooltip background color set to ${color}`, async ({
      mount,
      page,
    }) => {
      await mount(<TooltipComponent bgColor={color} />);

      await expect(getDataElementByValue(page, "tooltip")).toHaveCSS(
        "background-color",
        color,
      );
    });
  });

  backgroundColors.forEach((color) => {
    test(`should render with tooltip font color set to ${color}`, async ({
      mount,
      page,
    }) => {
      await mount(<TooltipComponent fontColor={color} />);

      await expect(getDataElementByValue(page, "tooltip")).toHaveCSS(
        "color",
        color,
      );
    });
  });

  (
    [
      [SIZE.MEDIUM, 14],
      [SIZE.LARGE, 16],
    ] as [TooltipProps["size"], number][]
  ).forEach(([size, fontSize]) => {
    test(`should render with size prop set to ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<TooltipComponent size={size} />);

      await expect(getDataElementByValue(page, "tooltip")).toHaveCSS(
        "font-size",
        `${fontSize}px`,
      );
    });
  });

  test("tooltip should be rendered in 'top' position when 'top' passed to flipOverrides prop and tooltip needs to be repositioned to fit available space", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ height: 120, width: 700 });
    await mount(<TooltipComponent flipOverrides={["top"]} position="bottom" />);

    const tooltip = page.getByRole("tooltip");
    const button = page.getByRole("button");

    await expect(tooltip).toBeVisible();
    await expect(button).toBeVisible();

    expect(await getYValue(tooltip)).toBeLessThan(await getYValue(button));
  });

  test("tooltip should be rendered in 'left' position when 'left' passed to flipOverrides prop and tooltip needs to be repositioned to fit available space", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ height: 120, width: 700 });
    await mount(
      <TooltipComponent flipOverrides={["left"]} position="bottom" />,
    );

    const tooltip = page.getByRole("tooltip");
    const button = page.getByRole("button");

    await expect(tooltip).toBeVisible();
    await expect(button).toBeVisible();

    expect(await getXValue(tooltip)).toBeLessThan(await getXValue(button));
  });

  test("tooltip should be rendered in 'right' position when 'right' passed to flipOverrides prop and tooltip needs to be repositioned to fit available space", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ height: 120, width: 700 });
    await mount(
      <TooltipComponent flipOverrides={["right"]} position="bottom" />,
    );

    const tooltip = page.getByRole("tooltip");
    const button = page.getByRole("button");

    await expect(tooltip).toBeVisible();
    await expect(button).toBeVisible();

    expect(await getXValue(tooltip)).toBeGreaterThan(await getXValue(button));
  });

  (
    [
      [SIZE.SMALL, 15],
      [SIZE.MEDIUM, 14],
      [SIZE.LARGE, 10],
    ] as [TooltipProps["inputSize"], number][]
  ).forEach(([inputSize, offset]) => {
    test(`should have correct styles applied when inputSize is ${inputSize} and tooltip position is set to top`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TooltipComponent isPartOfInput inputSize={inputSize} position="top" />,
      );

      const element = getDataElementByValue(page, "tooltip");
      await assertCssValueIsApproximately(element, "top", offset);
    });
  });

  (
    [
      [SIZE.SMALL, 5],
      [SIZE.MEDIUM, 6],
      [SIZE.LARGE, 10],
    ] as [TooltipProps["inputSize"], number][]
  ).forEach(([inputSize, offset]) => {
    test(`should have correct styles applied when inputSize is ${inputSize} and tooltip position is set to bottom`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TooltipComponent
          isPartOfInput
          inputSize={inputSize}
          position="bottom"
        />,
      );

      const buttonRect = await page
        .getByRole("button")
        .evaluate((element) => element.getBoundingClientRect());

      const element = getDataElementByValue(page, "tooltip");
      await assertCssValueIsApproximately(
        element,
        "top",
        buttonRect.top + buttonRect.height + offset,
      );
    });
  });

  (
    [
      [SIZE.SMALL, 47],
      [SIZE.MEDIUM, 44],
      [SIZE.LARGE, 40],
    ] as [TooltipProps["inputSize"], number][]
  ).forEach(([inputSize, offset]) => {
    test(`should have correct styles applied when inputSize is ${inputSize} and tooltip position is set to left`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TooltipComponent
          isPartOfInput
          inputSize={inputSize}
          position="left"
        />,
      );

      const element = getDataElementByValue(page, "tooltip");
      await assertCssValueIsApproximately(element, "left", offset);
    });
  });

  (
    [
      [SIZE.SMALL, 5],
      [SIZE.MEDIUM, 8],
      [SIZE.LARGE, 12],
    ] as [TooltipProps["inputSize"], number][]
  ).forEach(([inputSize, offset]) => {
    test(`should have correct styles applied when inputSize is ${inputSize} and tooltip position is set to right`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TooltipComponent
          isPartOfInput
          inputSize={inputSize}
          position="right"
        />,
      );

      const buttonRect = await page
        .getByRole("button")
        .evaluate((element) => element.getBoundingClientRect());

      const element = getDataElementByValue(page, "tooltip");
      await assertCssValueIsApproximately(
        element,
        "left",
        buttonRect.left + buttonRect.width + offset,
      );
    });
  });

  test(`should show tooltip when target is hovered`, async ({
    mount,
    page,
  }) => {
    await mount(<UncontrolledTooltipComponent />);

    await expect(getDataElementByValue(page, "tooltip")).toBeHidden();
    const buttonElement = page.getByRole("button");
    await buttonElement.hover();
    await expect(getDataElementByValue(page, "tooltip")).toBeVisible();
  });

  test(`should hide tooltip when mouse leaves target`, async ({
    mount,
    page,
  }) => {
    await mount(<UncontrolledTooltipComponent />);

    await expect(getDataElementByValue(page, "tooltip")).toBeHidden();
    const buttonElement = page.getByRole("button");
    await buttonElement.hover();
    await expect(getDataElementByValue(page, "tooltip")).toBeVisible();
    await page.mouse.move(100, 100);
    await expect(getDataElementByValue(page, "tooltip")).toBeHidden();
  });

  test(`should show tooltip when target is focused`, async ({
    mount,
    page,
  }) => {
    await mount(<UncontrolledTooltipComponent />);

    await expect(getDataElementByValue(page, "tooltip")).toBeHidden();
    const buttonElement = page.getByRole("button");
    await buttonElement.focus();
    await expect(getDataElementByValue(page, "tooltip")).toBeVisible();
  });

  test(`should hide tooltip when target is blurred`, async ({
    mount,
    page,
  }) => {
    await mount(<UncontrolledTooltipComponent />);

    await expect(getDataElementByValue(page, "tooltip")).toBeHidden();
    const buttonElement = page.getByRole("button");
    await buttonElement.focus();
    await expect(getDataElementByValue(page, "tooltip")).toBeVisible();
    await buttonElement.blur();
    await expect(getDataElementByValue(page, "tooltip")).toBeHidden();
  });

  test(`new tooltip target should still trigger tooltip visibility`, async ({
    mount,
    page,
  }) => {
    await mount(<TooltipWithChangingTargetComponent />);

    const buttonElement = getDataElementByValue(page, "main-text");
    await expect(buttonElement).toHaveText("Target");
    await buttonElement.hover();
    await expect(getDataElementByValue(page, "tooltip")).toBeVisible();
    await page.mouse.move(100, 100);
    await expect(getDataElementByValue(page, "tooltip")).toBeHidden();
    await page.getByText("Change target").click();
    await expect(buttonElement).toHaveText("Secondary target");
    await buttonElement.hover();
    await expect(getDataElementByValue(page, "tooltip")).toBeVisible();
    await page.mouse.move(100, 100);
    await expect(getDataElementByValue(page, "tooltip")).toBeHidden();
  });

  test(`should have the expected border radius styling`, async ({
    mount,
    page,
  }) => {
    await mount(<TooltipComponent />);

    await expect(getDataElementByValue(page, "tooltip")).toHaveCSS(
      "border-radius",
      "4px",
    );
  });
});

test.describe("Accessibility tests for Tooltip component", () => {
  test(`should pass accessibility tests for Default example`, async ({
    mount,
    page,
  }) => {
    await mount(<TooltipComponent />);

    await getDataElementByValue(page, "main-text").nth(0).click();

    await expect(page.getByRole("tooltip")).toBeVisible();
    await checkAccessibility(page, page.getByRole("tooltip"));
  });

  test(`should pass accessibility tests for Controlled story`, async ({
    mount,
    page,
  }) => {
    await mount(<Controlled />);

    await getDataElementByValue(page, "main-text").nth(0).click();

    await expect(page.getByRole("tooltip")).toBeVisible();
    await checkAccessibility(page, page.getByRole("tooltip"));
  });

  test(`should pass accessibility tests for FlipBehaviourOverrides story`, async ({
    mount,
    page,
  }) => {
    await mount(<FlipBehaviourOverrides />);

    await getDataElementByValue(page, "main-text").nth(0).click();

    await expect(page.getByRole("tooltip")).toBeVisible();
    await checkAccessibility(page, page.getByRole("tooltip"));
  });

  (
    [
      ["top", 0],
      ["bottom", 1],
      ["left", 2],
      ["right", 3],
    ] as [string, number][]
  ).forEach(([position, button]) => {
    test(`should pass accessibility tests for Positioning story when position is set to ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(<Positioning />);

      await getDataElementByValue(page, "main-text").nth(button).click();

      await expect(page.getByRole("tooltip")).toBeVisible();
      await checkAccessibility(page, page.getByRole("tooltip"));
    });
  });

  test(`should pass accessibility tests for LargeTooltip story`, async ({
    mount,
    page,
  }) => {
    await mount(<LargeTooltip />);

    await getDataElementByValue(page, "main-text").click();

    await expect(page.getByRole("tooltip")).toBeVisible();
    await checkAccessibility(page, page.getByRole("tooltip"));
  });

  ["undefined", "error"].forEach((type) => {
    test(`should pass accessibility tests when type is set to ${type}`, async ({
      mount,
      page,
    }) => {
      await mount(<TooltipComponent type={type} />);

      await page.getByText("target").click();

      await expect(page.getByRole("tooltip")).toBeVisible();
      await checkAccessibility(page, page.getByRole("tooltip"));
    });
  });

  test(`should pass accessibility tests for ColorOverrides story`, async ({
    mount,
    page,
  }) => {
    await mount(<ColorOverrides />);

    await getDataElementByValue(page, "main-text").click();

    await expect(page.getByRole("tooltip")).toBeVisible();
    await checkAccessibility(page, page.getByRole("tooltip"));
  });
});
