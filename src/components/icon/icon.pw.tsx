import React from "react";
import { IconProps } from "../icon";
import { test, expect } from "../../../playwright/helpers/base-test";
import { IconComponent, IconTooltipComponent } from "./component.test-pw";
import {
  getDataElementByValue,
  tooltipPreview,
} from "../../../playwright/components/index";
import { SIZE, COLOR, CHARACTERS } from "../../../playwright/support/constants";

import { checkAccessibility } from "../../../playwright/support/helper";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const colorData = [
  [COLOR.ORANGE, COLOR.BLACK],
  [COLOR.RED, COLOR.WHITE],
  [COLOR.BLACK, COLOR.WHITE],
  [COLOR.BROWN, COLOR.WHITE],
];

test.describe("should check Icon component properties", () => {
  (["top", "bottom", "left", "right"] as const).forEach((tooltipPosition) => {
    test(`should check tooltip position as ${tooltipPosition}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconTooltipComponent tooltipPosition={tooltipPosition} />);

      const tooltip = getDataElementByValue(page, "tooltip");
      await expect(tooltip).toHaveAttribute("data-placement", tooltipPosition);
    });
  });

  colorData.forEach(([tooltipBgColor]) => {
    test(`should check tooltip background color as ${tooltipBgColor}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconTooltipComponent tooltipBgColor={tooltipBgColor} />);

      const tooltip = getDataElementByValue(page, "tooltip");
      await expect(tooltip).toHaveCSS("background-color", tooltipBgColor);
    });
  });

  colorData.forEach(([tooltipFontColor]) => {
    test(`should check tooltip font color as ${tooltipFontColor}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconTooltipComponent tooltipFontColor={tooltipFontColor} />);

      const tooltip = getDataElementByValue(page, "tooltip");
      await expect(tooltip).toHaveCSS("color", tooltipFontColor);
    });
  });

  (
    [
      [["left"], "left", "bottom", 0, 0],
      [["top"], "top", "bottom", 0, 0],
      [["left"], "left", "top", 0, 120],
      [["bottom"], "bottom", "top", 0, 120],
      [["bottom"], "bottom", "left", 0, 120],
      [["bottom"], "bottom", "right", 0, 120],
      [["top"], "top", "left", 0, 0],
      [["top"], "top", "right", 0, 0],
      [["right"], "right", "bottom", 700, 0],
      [["right"], "right", "top", 700, 120],
    ] as [
      IconProps["tooltipFlipOverrides"],
      string,
      IconProps["tooltipPosition"],
      number,
      number,
    ][]
  ).forEach(
    ([
      flipPosition,
      expectedPosition,
      tooltipPosition,
      horizontalPos,
      verticalPos,
    ]) => {
      test(`should check tooltip position is ${expectedPosition} rather than ${tooltipPosition} when flip position is ${flipPosition} after scrolling`, async ({
        mount,
        page,
      }) => {
        await mount(
          <div style={{ padding: "60px 60px 60px 60px" }}>
            <IconTooltipComponent
              tooltipFlipOverrides={flipPosition}
              tooltipPosition={tooltipPosition}
            />
          </div>,
        );

        await page.setViewportSize({ width: 700, height: 120 });

        await page.evaluate(
          ([horizontal, vertical]) => window.scrollTo(horizontal, vertical),
          [horizontalPos, verticalPos],
        );

        const tooltip = getDataElementByValue(page, "tooltip");
        await expect(tooltip).toHaveAttribute(
          "data-placement",
          expectedPosition,
        );
      });
    },
  );
});

test.describe("should check accessibility for Icon component", () => {
  [true, false].forEach((boolVal) => {
    test(`should pass accessibility tests when aria-hidden prop is set as ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconComponent aria-hidden={boolVal} />);

      await checkAccessibility(page);
    });
  });

  // Icon component needs a role of img to pass accessibility tests.
  // This is because the icon is a span element and cannot have an `aria-role` of none, null or presentation
  // and also have an aria-label.
  testData.forEach((ariaLabel) => {
    test(`should pass accessibility tests when ariaLabel prop is set as ${ariaLabel}`, async ({
      page,
      mount,
    }) => {
      await mount(<IconComponent role="img" ariaLabel={ariaLabel} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((id) => {
    test(`should pass accessibility tests when icon id is set as ${id}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconComponent id={id} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((tooltipMessage) => {
    test(`should pass accessibility tests when tooltipMessage is set as ${tooltipMessage}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconTooltipComponent tooltipMessage={tooltipMessage} />);

      await checkAccessibility(page, tooltipPreview(page));
    });
  });

  (
    ["top", "bottom", "left", "right"] as IconProps["tooltipPosition"][]
  ).forEach((tooltipPosition) => {
    test(`should pass accessibility tests when tooltip position is set as ${tooltipPosition}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconTooltipComponent tooltipPosition={tooltipPosition} />);

      const iconLocator = page.getByTestId("icon");
      await iconLocator.hover();
      await checkAccessibility(page, tooltipPreview(page));
    });
  });

  test("should pass accessibility tests when tooltipVisible prop is set as true", async ({
    mount,
    page,
  }) => {
    await mount(<IconTooltipComponent tooltipVisible />);

    await checkAccessibility(page, tooltipPreview(page));
  });

  test("should pass accessibility tests when tooltipVisible prop is set as false", async ({
    mount,
    page,
  }) => {
    await mount(<IconTooltipComponent tooltipVisible={false} />);

    await checkAccessibility(page);
  });

  colorData.forEach(([tooltipBgColor, contrastColor]) => {
    test(`should pass accessibility tests when tooltip background color is set as ${tooltipBgColor}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <IconTooltipComponent
          tooltipFontColor={contrastColor}
          tooltipBgColor={tooltipBgColor}
        />,
      );

      const iconLocator = page.getByTestId("icon");
      await iconLocator.hover();

      const tooltip = getDataElementByValue(page, "tooltip");
      await checkAccessibility(page, tooltip);
    });
  });

  colorData.forEach(([tooltipFontColor, contrastColor]) => {
    test(`should pass accessibility tests when tooltip font color is set as ${tooltipFontColor}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <IconTooltipComponent
          tooltipBgColor={contrastColor}
          tooltipFontColor={tooltipFontColor}
        />,
      );
      const iconLocator = page.getByTestId("icon");
      await iconLocator.hover();

      const tooltip = getDataElementByValue(page, "tooltip");
      await checkAccessibility(page, tooltip);
    });
  });

  testData.forEach((tooltipId) => {
    test(`should pass accessibility tests when tooltipId is set as ${tooltipId}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconTooltipComponent tooltipId={tooltipId} />);

      const iconLocator = page.getByTestId("icon");
      await iconLocator.hover();
      await checkAccessibility(page, tooltipPreview(page));
    });
  });

  (["error", "add", "admin", "alert"] as IconProps["type"][]).forEach(
    (iconType) => {
      test(`should pass accessibility tests when iconType is set as ${iconType}`, async ({
        mount,
        page,
      }) => {
        await mount(<IconComponent type={iconType} />);

        await checkAccessibility(page);
      });
    },
  );

  [true, false].forEach((boolVal) => {
    test(`should pass accessibility tests icon color when disabled prop is set as ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconComponent disabled={boolVal} />);

      await checkAccessibility(page);
    });
  });

  colorData.forEach(([backgroundColor]) => {
    test(`should pass accessibility tests when background color is set as ${backgroundColor}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconComponent bg={backgroundColor} />);

      await checkAccessibility(page);
    });
  });

  colorData.forEach(([iconColor]) => {
    test(`should pass accessibility tests when icon color is set as ${iconColor}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconComponent color={iconColor} />);

      await checkAccessibility(page);
    });
  });

  [SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE, SIZE.EXTRALARGE].forEach((fontSize) => {
    test(`should pass accessibility tests when fontSize is set as ${fontSize}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconComponent fontSize={fontSize} />);

      await checkAccessibility(page);
    });
  });

  (["circle", "rounded-rect", "square"] as IconProps["bgShape"][]).forEach(
    (bgShape) => {
      test(`should pass accessibility tests when bgShape is set as ${bgShape}`, async ({
        mount,
        page,
      }) => {
        await mount(<IconComponent bgShape={bgShape} />);

        await checkAccessibility(page);
      });
    },
  );

  [SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE, SIZE.EXTRALARGE].forEach((size) => {
    test(`should pass accessibility tests when bgSize is set as ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconComponent bgSize={size} />);

      await checkAccessibility(page);
    });
  });

  (
    [
      [["left"], "left", "bottom"],
      [["top"], "top", "bottom"],
      [["left"], "left", "top"],
      [["bottom"], "bottom", "top"],
      [["bottom"], "bottom", "left"],
      [["bottom"], "bottom", "right"],
      [["top"], "top", "left"],
      [["top"], "top", "right"],
      [["right"], "right", "bottom"],
      [["right"], "right", "top"],
    ] as [
      IconProps["tooltipFlipOverrides"],
      string,
      IconProps["tooltipPosition"],
    ][]
  ).forEach(([flipPosition, expectedPosition, tooltipPosition]) => {
    test(`should pass accessibility tests when tooltip position is ${expectedPosition} rather than ${tooltipPosition} when flip position is ${flipPosition} after scrolling`, async ({
      mount,
      page,
    }) => {
      await mount(
        <div style={{ padding: "60px 60px 60px 60px" }}>
          <IconTooltipComponent
            tooltipFlipOverrides={flipPosition}
            tooltipPosition={tooltipPosition}
          />
        </div>,
      );

      const iconLocator = page.getByTestId("icon");
      await iconLocator.hover();
      await checkAccessibility(page, tooltipPreview(page));
    });
  });
});
