import { expect, test } from "@playwright/experimental-ct-react17";
import React from "react";
import { TileProps, TileFooterProps, TileHeaderProps } from ".";
import { DlProps } from "../definition-list";
import {
  getDataComponentByValue,
  getDataElementByValue,
} from "../../../playwright/components";
import {
  assertCssValueIsApproximately,
  checkCSSOutline,
  checkAccessibility,
} from "../../../playwright/support/helper";
import {
  TileComponent,
  DlTileComponent,
  TileFooterComponent,
  TileHeaderComponent,
  TileComponentWithFalsyChildren,
  FlexTile,
} from "./components.test-pw";
import { CHARACTERS } from "../../../playwright/support/constants";
import FlexTileContainer from "./flex-tile-container";

const tileVariants: [TileProps["variant"], string, string][] = [
  ["tile", "rgb(204, 214, 219)", "rgb(255, 255, 255)"],
  ["transparent", "rgb(204, 214, 219)", "rgba(0, 0, 0, 0)"],
  ["active", "rgb(0, 126, 69)", "rgb(242, 249, 246)"],
  ["grey", "rgb(153, 173, 183)", "rgb(242, 245, 246)"],
];
const tileOrientations: [TileProps["orientation"], number][] = [
  ["vertical", 198],
  ["horizontal", 67],
];
const tileWidths: [TileProps["width"], number][] = [
  ["30%", 409],
  ["50%", 683],
  [0, 1366],
];
const tileHeights: [TileProps["height"], number][] = [
  ["30%", 54],
  ["50%", 90],
  [0, 67],
];
const testData: NonNullable<DlProps["ddTextAlign"]>[] = [
  "left",
  "center",
  "right",
];
const dlWidths = [
  [10, 107, 1184],
  [30, 370, 921],
];
const tileFooterVariants: [TileFooterProps["variant"], string, string][] = [
  ["default", "rgb(204, 214, 219)", "rgb(204, 214, 219)"],
  ["transparent", "rgba(0, 0, 0, 0)", "rgb(204, 214, 219)"],
  ["black", "rgb(0, 0, 0)", "rgb(204, 214, 219)"],
  ["grey", "rgb(242, 245, 246)", "rgb(153, 173, 183)"],
];
const tileHeaderVariants: [TileHeaderProps["variant"], string, string][] = [
  ["default", "rgb(204, 214, 219)", "rgb(204, 214, 219)"],
  ["transparent", "rgba(0, 0, 0, 0)", "rgb(204, 214, 219)"],
  ["black", "rgb(0, 0, 0)", "rgb(204, 214, 219)"],
  ["grey", "rgb(242, 245, 246)", "rgb(153, 173, 183)"],
];
const characters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const tileDlWidths = [
  [10, 107],
  [30, 370],
  [60, 765],
];
const borderVariants: [TileProps["borderVariant"], string][] = [
  ["default", "rgb(204, 214, 219)"],
  ["selected", "rgb(0, 0, 0)"],
  ["positive", "rgb(0, 138, 33)"],
  ["negative", "rgb(203, 55, 74)"],
  ["caution", "rgb(239, 103, 0)"],
  ["info", "rgb(0, 96, 167)"],
];
const borderWidths: [TileProps["borderWidth"], string][] = [
  ["borderWidth000", "0px"],
  ["borderWidth100", "1px"],
  ["borderWidth200", "2px"],
  ["borderWidth300", "3px"],
  ["borderWidth400", "4px"],
];
const tileRoundness: TileProps["roundness"][] = ["default", "large", "small"];

test.describe("Tile component", () => {
  tileVariants.forEach(([variant, borderColor, backGroundColor]) => {
    test(`check ${variant} variant`, async ({ mount, page }) => {
      await mount(<TileComponent variant={variant} data-element="tile" />);

      const tile = getDataElementByValue(page, "tile");
      await expect(tile).toHaveCSS("border-color", borderColor);
      await expect(tile).toHaveCSS("background-color", backGroundColor);
    });
  });

  tileOrientations.forEach(([orientation, height]) => {
    test(`check ${orientation} orientation`, async ({ mount, page }) => {
      await mount(
        <TileComponent orientation={orientation} data-element="tile" />,
      );

      const tile = getDataElementByValue(page, "tile");
      await assertCssValueIsApproximately(tile, "height", height);
    });
  });

  tileWidths.forEach(([widthInPercentage, widthInPixel]) => {
    test(`check width as ${widthInPercentage} for Tile component`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TileComponent width={widthInPercentage} data-element="tile" />,
      );

      const tile = getDataElementByValue(page, "tile");
      await assertCssValueIsApproximately(tile, "width", widthInPixel);
    });
  });

  tileHeights.forEach(([heightInPercentage, heightInPixel]) => {
    test(`check height as ${heightInPercentage}`, async ({ mount, page }) => {
      await mount(
        <TileComponent height={heightInPercentage} data-element="tile" />,
      );

      const tile = getDataElementByValue(page, "tile");
      await assertCssValueIsApproximately(tile, "height", heightInPixel);
    });
  });

  testData.forEach((align) => {
    test(`check ddTextAlign as ${align}`, async ({ mount, page }) => {
      await mount(<DlTileComponent ddTextAlign={align} data-element="tile" />);

      const dd = getDataElementByValue(page, "dd").nth(0);
      await expect(dd).toHaveCSS("text-align", align);
    });
  });

  testData.forEach((align) => {
    test(`check dtTextAlign as ${align}`, async ({ mount, page }) => {
      await mount(<DlTileComponent dtTextAlign={align} data-element="tile" />);

      const dt = getDataElementByValue(page, "dt").nth(0);
      await expect(dt).toHaveCSS("text-align", align);
    });
  });

  test("check single column styles", async ({ mount, page }) => {
    await mount(<DlTileComponent asSingleColumn data-element="tile" />);

    const dt = getDataElementByValue(page, "dt").nth(0);
    const dd = getDataElementByValue(page, "dd").nth(0);
    await assertCssValueIsApproximately(dt, "width", 1316);
    await assertCssValueIsApproximately(dd, "width", 1316);
    await assertCssValueIsApproximately(dt, "margin-left", 0);
  });

  dlWidths.forEach(([w, dtWidth, ddWidth]) => {
    test(`check the children have expected width when dl width is ${w}`, async ({
      mount,
      page,
    }) => {
      await mount(<DlTileComponent w={w} data-element="tile" />);

      const dt = getDataElementByValue(page, "dt").nth(0);
      const dd = getDataElementByValue(page, "dd").nth(0);
      await assertCssValueIsApproximately(dt, "width", dtWidth);
      await assertCssValueIsApproximately(dt, "margin-block-start", 0);
      await assertCssValueIsApproximately(dt, "margin-block-end", 16);
      await assertCssValueIsApproximately(dt, "margin-left", 0);
      await assertCssValueIsApproximately(dd, "width", ddWidth);
      await assertCssValueIsApproximately(dd, "margin-block-start", 0);
      await assertCssValueIsApproximately(dd, "margin-block-end", 16);
      await assertCssValueIsApproximately(dd, "margin-left", 0);
    });
  });

  tileFooterVariants.forEach(([variant, backGroundColor, borderTopColor]) => {
    test(`check Tile Footer variant as ${variant}`, async ({ mount, page }) => {
      await mount(
        <TileFooterComponent variant={variant} data-element="tile-footer" />,
      );

      const footer = getDataElementByValue(page, "tile-footer");
      await expect(footer).toHaveCSS("background-color", backGroundColor);
      await checkCSSOutline(
        footer,
        "1px",
        "border-top",
        "solid",
        borderTopColor,
      );
    });
  });

  characters.forEach((children) => {
    test(`check Tile Footer children as ${children}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TileFooterComponent data-element="tile-footer">
          {children}
        </TileFooterComponent>,
      );

      const footer = getDataElementByValue(page, "tile-footer");
      await expect(footer).toHaveText(children);
    });
  });

  tileHeaderVariants.forEach(
    ([variant, backGroundColor, borderBottomColor]) => {
      test(`check Tile Header variant as ${variant}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <TileHeaderComponent variant={variant} data-element="tile-header" />,
        );

        const header = getDataElementByValue(page, "tile-header");
        await expect(header).toHaveCSS("background-color", backGroundColor);
        await checkCSSOutline(
          header,
          "1px",
          "border-bottom",
          "solid",
          borderBottomColor,
        );
      });
    },
  );

  characters.forEach((children) => {
    test(`check Tile Header children as ${children}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TileHeaderComponent data-element="tile-header">
          {children}
        </TileHeaderComponent>,
      );

      const header = getDataElementByValue(page, "tile-header");
      await expect(header).toHaveText(children);
    });
  });

  tileDlWidths.forEach(([w, dtWidth]) => {
    test(`check width as ${w}`, async ({ mount, page }) => {
      await mount(<DlTileComponent w={w} />);

      const dt = getDataElementByValue(page, "dt").nth(0);
      await assertCssValueIsApproximately(dt, "width", dtWidth);
    });
  });

  borderVariants.forEach(([borderVariant, borderColor]) => {
    test(`check border variant as ${borderVariant}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TileComponent data-element="tile" borderVariant={borderVariant} />,
      );

      const tile = getDataElementByValue(page, "tile");
      await expect(tile).toHaveCSS("border-color", borderColor);
    });
  });

  borderVariants
    .filter(([variant]) => variant !== "default")
    .forEach(([borderVariant, borderColor]) => {
      tileVariants.forEach(([variant]) => {
        test(`check border variant overrides tile variant when border variant is ${borderVariant} and tile variant is ${variant}`, async ({
          mount,
          page,
        }) => {
          await mount(
            <TileComponent
              data-element="tile"
              borderVariant={borderVariant}
              variant={variant}
            />,
          );

          const tile = getDataElementByValue(page, "tile");
          await expect(tile).toHaveCSS("border-color", borderColor);
        });
      });
    });

  borderWidths.forEach(([borderWidth, pixelWidth]) => {
    test(`check border width as ${borderWidth}`, async ({ mount, page }) => {
      await mount(
        <TileComponent data-element="tile" borderWidth={borderWidth} />,
      );

      const tile = getDataElementByValue(page, "tile");
      await expect(tile).toHaveCSS("border-width", pixelWidth);
    });
  });

  tileRoundness.forEach((roundness) => {
    test(`check ${roundness} border radius is as expected`, async ({
      mount,
      page,
    }) => {
      await mount(<TileComponent data-element="tile" roundness={roundness} />);

      let result: string;
      switch (roundness) {
        case "large":
          result = "16px";
          break;
        case "small":
          result = "4px";
          break;
        default:
          result = "8px";
          break;
      }
      const tile = getDataElementByValue(page, "tile");
      await expect(tile).toHaveCSS("border-radius", result);
    });
  });

  test("check that any falsy children passed are not rendered", async ({
    mount,
    page,
  }) => {
    await mount(<TileComponentWithFalsyChildren data-element="tile" />);

    const tileContentCount = await getDataElementByValue(
      page,
      "tile-content",
    ).count();
    expect(tileContentCount).toEqual(1);
  });

  (["tile", "transparent", "active"] as TileProps["variant"][]).forEach(
    (variant) => {
      test(`should check Accessibility for the ${variant} variant`, async ({
        page,
        mount,
      }) => {
        await mount(<TileComponent variant={variant} />);

        await checkAccessibility(page);
      });
    },
  );

  [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS].forEach((children) => {
    test(`should check Accessibility for Tile Footer children as ${children}`, async ({
      page,
      mount,
    }) => {
      await mount(<TileFooterComponent>{children}</TileFooterComponent>);

      await checkAccessibility(page);
    });
  });

  [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS].forEach((children) => {
    test(`should check Accessibility for Tile Header children as ${children}`, async ({
      page,
      mount,
    }) => {
      await mount(<TileHeaderComponent>{children}</TileHeaderComponent>);

      await checkAccessibility(page);
    });
  });

  (
    [
      "default",
      "selected",
      "positive",
      "negative",
      "caution",
      "info",
    ] as TileProps["borderVariant"][]
  ).forEach((borderVariant) => {
    test(`should check Accessibility for border variant as ${borderVariant}`, async ({
      page,
      mount,
    }) => {
      await mount(<TileComponent borderVariant={borderVariant} />);

      await checkAccessibility(page);
    });
  });

  test.describe("Flex Tile", () => {
    test(`check Accessibility for flex tile`, async ({ page, mount }) => {
      await mount(<FlexTile />);

      await checkAccessibility(page);
    });

    (
      [
        [1, "8px"],
        [2, "16px"],
        [3, "24px"],
      ] as [number, string][]
    ).forEach(([value, gapText]) => {
      test(`should verify columnGap is ${value}`, async ({ mount, page }) => {
        await mount(
          <FlexTileContainer columnGap={value}>content</FlexTileContainer>,
        );
        const containerElement = getDataComponentByValue(
          page,
          "flex-tile-container",
        );
        await expect(containerElement).toHaveCSS("column-gap", gapText);
      });
    });
  });
});
