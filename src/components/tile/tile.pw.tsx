import { expect, test } from "@playwright/experimental-ct-react17";
import React from "react";
import { TileProps, TileFooterProps } from ".";
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
  TileComponentWithFalsyChildren,
  ResponsiveTile,
  ResponsiveTileContainerWithFalsyChildren,
  ResponsiveCellWithFalsyChildren,
} from "./components.test-pw";
import { CHARACTERS } from "../../../playwright/support/constants";
import ResponsiveCell from "./flow-cell";
import ResponsiveTileContainer from "./flow-tile-container";

const tileVariants: [TileProps["variant"], string, string][] = [
  ["tile", "rgb(204, 214, 219)", "rgb(255, 255, 255)"],
  ["transparent", "rgb(204, 214, 219)", "rgba(0, 0, 0, 0)"],
  ["active", "rgb(0, 126, 69)", "rgb(242, 249, 246)"],
];
const tileOrientations: [TileProps["orientation"], number][] = [
  ["vertical", 199],
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
const tileFooterVariants: [TileFooterProps["variant"], string][] = [
  ["default", "rgb(204, 214, 219)"],
  ["transparent", "rgba(0, 0, 0, 0)"],
  ["black", "rgb(0, 0, 0)"],
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
const tileRoundness: TileProps["roundness"][] = ["default", "large"];

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
        <TileComponent orientation={orientation} data-element="tile" />
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
        <TileComponent width={widthInPercentage} data-element="tile" />
      );

      const tile = getDataElementByValue(page, "tile");
      await assertCssValueIsApproximately(tile, "width", widthInPixel);
    });
  });

  tileHeights.forEach(([heightInPercentage, heightInPixel]) => {
    test(`check height as ${heightInPercentage}`, async ({ mount, page }) => {
      await mount(
        <TileComponent height={heightInPercentage} data-element="tile" />
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

  tileFooterVariants.forEach(([variant, backGroundColor]) => {
    test(`check Tile Footer variant as ${variant}`, async ({ mount, page }) => {
      await mount(
        <TileFooterComponent variant={variant} data-element="tile-footer" />
      );

      const footer = getDataElementByValue(page, "tile-footer");
      await expect(footer).toHaveCSS("background-color", backGroundColor);
      await checkCSSOutline(
        footer,
        "1px",
        "border-top",
        "solid",
        "rgb(204, 214, 219)"
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
        </TileFooterComponent>
      );

      const footer = getDataElementByValue(page, "tile-footer");
      await expect(footer).toHaveText(children);
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
        <TileComponent data-element="tile" borderVariant={borderVariant} />
      );

      const tile = getDataElementByValue(page, "tile");
      await expect(tile).toHaveCSS("border-color", borderColor);
    });
  });

  borderWidths.forEach(([borderWidth, pixelWidth]) => {
    test(`check border width as ${borderWidth}`, async ({ mount, page }) => {
      await mount(
        <TileComponent data-element="tile" borderWidth={borderWidth} />
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

      const result = roundness === "default" ? "8px" : "16px";
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
      "tile-content"
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
    }
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

  ([
    "default",
    "selected",
    "positive",
    "negative",
    "caution",
    "info",
  ] as TileProps["borderVariant"][]).forEach((borderVariant) => {
    test(`should check Accessibility for border variant as ${borderVariant}`, async ({
      page,
      mount,
    }) => {
      await mount(<TileComponent borderVariant={borderVariant} />);

      await checkAccessibility(page);
    });
  });

  test.describe("Responsive Tile", () => {
    test("check that any falsy children passed to ResponsiveTileContainer are not rendered", async ({
      mount,
      page,
    }) => {
      await mount(<ResponsiveTileContainerWithFalsyChildren />);

      const responsiveTileContainerCount = await getDataComponentByValue(
        page,
        "responsive-tile-container"
      ).count();
      expect(responsiveTileContainerCount).toEqual(1);
    });

    test("check that any falsy children passed to ResponsiveCell are not rendered", async ({
      mount,
      page,
    }) => {
      await mount(<ResponsiveCellWithFalsyChildren />);

      const responsiveCellCount = await getDataComponentByValue(
        page,
        "responsive-cell"
      ).count();
      expect(responsiveCellCount).toEqual(1);
    });

    test(`check Accessibility for responsive tile`, async ({ page, mount }) => {
      await mount(<ResponsiveTile />);

      await checkAccessibility(page);
    });

    ([
      [1, "8px"],
      [2, "16px"],
      [3, "24px"],
    ] as [number, string][]).forEach(([value, gapText]) => {
      test(`should verify columnGap is ${value}`, async ({ mount, page }) => {
        await mount(
          <ResponsiveTileContainer columnGap={value}>
            content
          </ResponsiveTileContainer>
        );
        const containerElement = await getDataComponentByValue(
          page,
          "responsive-tile-container"
        );
        await expect(containerElement).toHaveCSS("column-gap", gapText);
      });
    });

    ([
      [10, "10"],
      [50, "50"],
      [100, "100"],
    ] as [number, string][]).forEach(([value, growText]) => {
      test(`should verify flex grow is ${value}`, async ({ mount, page }) => {
        await mount(<ResponsiveCell flexGrow={value}>content</ResponsiveCell>);
        const cellElement = await getDataComponentByValue(
          page,
          "responsive-cell"
        );
        await expect(cellElement).toHaveCSS("flex-grow", growText);
      });
    });
  });

  ["auto", "content", "fit-content", "max-content", "min-content"].forEach(
    (basis) => {
      test(`should verify flex basis is ${basis}`, async ({ mount, page }) => {
        await mount(<ResponsiveCell flexBasis={basis}>content</ResponsiveCell>);
        const cellElement = await getDataComponentByValue(
          page,
          "responsive-cell"
        );
        await expect(cellElement).toHaveCSS("flex-basis", basis);
      });
    }
  );

  [
    "left",
    "center",
    "right",
    "flex-start",
    "flex-end",
    "normal",
    "space-between",
    "space-around",
    "stretch",
  ].forEach((justified) => {
    test(`should verify justifyContent is ${justified}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ResponsiveCell justifyContent={justified}>content</ResponsiveCell>
      );
      const cellElement = await getDataComponentByValue(
        page,
        "responsive-cell"
      );
      await expect(cellElement).toHaveCSS("justify-content", justified);
    });
  });

  ["200px", "400px"].forEach((maxWidth) => {
    test(`should verify maxWidth is ${maxWidth}`, async ({ mount, page }) => {
      await mount(<ResponsiveCell maxWidth={maxWidth}>content</ResponsiveCell>);
      const cellElement = await getDataComponentByValue(
        page,
        "responsive-cell"
      );
      await expect(cellElement).toHaveCSS("max-width", maxWidth);
    });
  });
});
