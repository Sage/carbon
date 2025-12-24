import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { HooksConfig } from "../../../playwright";
import { SageTheme as SageThemeStory, AllThemes } from "./components.test-pw";
import Button from "../../../src/components/button";
import Loader from "../../../src/components/loader";
import LoaderBar from "../../../src/components/loader-bar";
import MultiActionButton from "../../../src/components/multi-action-button";
import Pill from "../../../src/components/pill";
import SplitButton from "../../../src/components/split-button";
import { Tabs, Tab } from "../tabs";

import { buttonDataComponent } from "../../../playwright/components/button/index";
import {
  loaderBarComponent,
  loaderComponent,
} from "../../../playwright/components/themes/index";
import { pillPreview } from "../../../playwright/components/index";
import multiActionButtonComponent from "../../../playwright/components/carbon-provider/index";
import { checkAccessibility } from "../../../playwright/support/helper";

const themes = ["noMountedTheme", "sage"];

const buildTestArray = (array: string[]) => {
  return themes.map((theme, i) => [theme, array[i]]);
};

const buildTestDataWithTwoArrays = (
  firstArray: string[],
  secondArray: string[],
) => {
  return themes.map((theme, i) => [theme, firstArray[i], secondArray[i]]);
};

const commonColors = ["rgb(0, 130, 0)", "rgb(0, 126, 69)"];

const commonColorsOnHover = ["rgb(0, 99, 0)", "rgb(0, 103, 56)"];

const loaderBarColors = ["rgb(179, 224, 179)", "rgb(179, 217, 200)"];

test.describe("Carbon Provider", () => {
  buildTestArray(commonColors).forEach(([theme, color]) => {
    test.describe(`should render components with ${theme} and verify theme color`, () => {
      test(`Button component should render with ${theme} theme and verify theme color`, async ({
        mount,
        page,
      }) => {
        await mount<HooksConfig>(<Button>Small</Button>, {
          hooksConfig: { theme: `${theme}` },
        });

        await expect(buttonDataComponent(page)).toHaveCSS("color", color);
      });

      test(`Loader component should render with ${theme} theme and verify theme color`, async ({
        mount,
        page,
      }) => {
        await mount(<Loader />, { hooksConfig: { theme: `${theme}` } });

        await expect(loaderComponent(page).nth(0)).toHaveCSS(
          "background-color",
          color,
        );
      });

      test(`MultiActionButton component should render with ${theme} theme and verify theme color`, async ({
        mount,
        page,
      }) => {
        await mount(
          <MultiActionButton text="Multi Action Button">
            <Button href="#">Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </MultiActionButton>,
          { hooksConfig: { theme: `${theme}` } },
        );

        await expect(buttonDataComponent(page)).toHaveCSS("color", color);
        await expect(buttonDataComponent(page)).toHaveCSS(
          "border-color",
          color,
        );
      });

      test(`Pill component should render with ${theme} theme and verify theme color`, async ({
        mount,
        page,
      }) => {
        await mount(<Pill>Foo</Pill>, { hooksConfig: { theme: `${theme}` } });

        await expect(pillPreview(page)).toHaveCSS("border-color", color);
      });

      test(`SplitButton component should render with ${theme} theme and verify theme color`, async ({
        mount,
        page,
      }) => {
        await mount(
          <SplitButton text="Split button">
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </SplitButton>,
          { hooksConfig: { theme: `${theme}` } },
        );

        await expect(buttonDataComponent(page)).toHaveCSS("color", color);
        await expect(buttonDataComponent(page)).toHaveCSS(
          "border-color",
          color,
        );
      });

      test(`Tabs component should render with ${theme} theme and verify theme color`, async ({
        mount,
        page,
      }) => {
        await mount(
          <Tabs align="left" position="top">
            <Tab tabId="tab-1" title="Tab 1" key="tab-1">
              Content for tab 1
            </Tab>
          </Tabs>,
          { hooksConfig: { theme: `${theme}` } },
        );

        const tabTitleSelectedIndicator = page.locator(
          '[data-element="tab-selected-indicator"]',
        );
        await expect(tabTitleSelectedIndicator).toHaveCSS(
          "box-shadow",
          `${color} 0px -4px 0px 0px inset`,
        );
      });
    });
  });
});

test.describe("Hover styling", () => {
  buildTestArray(commonColorsOnHover).forEach(([theme, color]) => {
    test.describe(`should render components with ${theme} theme onHover`, () => {
      test("Button component and verify theme color", async ({
        mount,
        page,
      }) => {
        await mount(<Button>Small</Button>, {
          hooksConfig: { theme: `${theme}` },
        });

        await buttonDataComponent(page).hover();
        await expect(buttonDataComponent(page)).toHaveCSS(
          "background-color",
          color,
        );
      });

      test("SplitButton component and verify theme color", async ({
        mount,
        page,
      }) => {
        await mount(
          <SplitButton text="Split button">
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </SplitButton>,
          { hooksConfig: { theme: `${theme}` } },
        );

        const toggleButton = page.locator('[data-element="toggle-button"]');

        await toggleButton.hover();

        await expect(toggleButton).toHaveCSS("background-color", color);
      });
    });
  });

  buildTestArray(commonColorsOnHover).forEach(([theme, color]) => {
    test.describe(`should render components with ${theme} theme onHover`, () => {
      test("MultiActionButton component and verify theme color", async ({
        mount,
        page,
      }) => {
        await mount(
          <MultiActionButton text="Multi Action Button">
            <Button href="#">Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </MultiActionButton>,
          {
            hooksConfig: { theme: `${theme}` },
          },
        );

        await multiActionButtonComponent(page).locator("button").hover();
        await expect(
          multiActionButtonComponent(page).locator("button"),
        ).toHaveCSS("background-color", color);
      });
    });
  });
});

buildTestDataWithTwoArrays(loaderBarColors, commonColors).forEach(
  ([theme, loaderBarColor, color]) => {
    test.describe(`should render components with ${theme} theme`, () => {
      test("LoaderBar component and verify theme color", async ({
        mount,
        page,
      }) => {
        await mount(<LoaderBar />, {
          hooksConfig: { theme: `${theme}` },
        });

        await expect(loaderBarComponent(page).locator("> div")).toHaveCSS(
          "background-color",
          loaderBarColor,
        );

        await expect(loaderBarComponent(page).locator("div > *")).toHaveCSS(
          "background-color",
          color,
        );
      });
    });
  },
);

test.describe("Accessibility tests for Carbon Provider", () => {
  test("should pass accessibility tests for sage theme example", async ({
    mount,
    page,
  }) => {
    await mount(<SageThemeStory />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for all themes example", async ({
    mount,
    page,
  }) => {
    await mount(<AllThemes />);

    await checkAccessibility(page);
  });
});
