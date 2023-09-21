import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import { HooksConfig } from "../../../playwright";

import {
  SageTheme as SageThemeStory,
  MintTheme as MintThemeStory,
} from "../../../src/components/carbon-provider/carbon-provider.stories";
import { AllThemes as AllThemesStory } from "../../../src/components/carbon-provider/carbon-provider-test.stories";
import Button from "../../../src/components/button";
import Link from "../../../src/components/link";
import Loader from "../../../src/components/loader";
import LoaderBar from "../../../src/components/loader-bar";
import MultiActionButton from "../../../src/components/multi-action-button";
import Pill from "../../../src/components/pill";
import SplitButton from "../../../src/components/split-button";
import StepSequenceItem from "../../../src/components/step-sequence/step-sequence-item";
import { Tabs, Tab } from "../../../src/components/tabs";

import { buttonDataComponent } from "../../../playwright/components/button/index";
import {
  linkComponent,
  loaderBarComponent,
  loaderComponent,
} from "../../../playwright/components/themes/index";
import { pillPreview } from "../../../playwright/components/index";
import { stepSequenceDataComponentItem } from "../../../playwright/components/step-sequence/index";
import { multiActionButtonComponent } from "../../../playwright/components/multi-action-button/index";
import { checkAccessibility } from "../../../playwright/support/helper";

const themes = ["mint", "aegean", "noMountedTheme", "sage"];

const buildTestArray = (array: string[]) => {
  return themes.map((theme, i) => [theme, array[i]]);
};

const buildTestDataWithTwoArrays = (
  firstArray: string[],
  secondArray: string[]
) => {
  return themes.map((theme, i) => [theme, firstArray[i], secondArray[i]]);
};

const commonColors = [
  "rgb(0, 125, 90)",
  "rgb(0, 115, 194)",
  "rgb(0, 130, 0)",
  "rgb(0, 126, 69)",
];

const commonColorsOnHover = [
  "rgb(0, 96, 70)",
  "rgb(0, 92, 154)",
  "rgb(0, 99, 0)",
  "rgb(0, 103, 56)",
];

const multiButtonOnHover = [
  "rgb(0, 64, 46)",
  "rgb(0, 68, 114)",
  "rgb(0, 77, 42)",
  "rgb(0, 77, 42)",
];

const stepSequenceColors = [
  "rgb(0, 125, 90)",
  "rgb(0, 115, 194)",
  "rgb(0, 138, 33)",
  "rgb(0, 138, 33)",
];

const loaderBarColors = [
  "rgb(179, 227, 214)",
  "rgb(179, 214, 239)",
  "rgb(179, 224, 179)",
  "rgb(179, 217, 200)",
];

buildTestArray(commonColors).forEach(([theme, color]) => {
  test.describe(`Carbon Provider`, async () => {
    test(`Button component should render with ${theme} theme and verify theme color`, async ({
      mount,
      page,
    }) => {
      await mount<HooksConfig>(<Button>Small</Button>, {
        hooksConfig: { theme: `${theme}` },
      });

      await expect(buttonDataComponent(page)).toHaveCSS("color", color);
    });

    test(`Link component should render with ${theme} theme and verify theme color`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Link
          href="https://carbon.sage.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          This is a link
        </Link>,
        { hooksConfig: { theme: `${theme}` } }
      );

      await expect(linkComponent(page)).toHaveCSS("color", color);
    });

    test(`Loader component should render with ${theme} theme and verify theme color`, async ({
      mount,
      page,
    }) => {
      await mount(<Loader />, { hooksConfig: { theme: `${theme}` } });

      await expect(loaderComponent(page).nth(0)).toHaveCSS(
        "background-color",
        color
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
        { hooksConfig: { theme: `${theme}` } }
      );

      await expect(buttonDataComponent(page)).toHaveCSS("color", color);
      await expect(buttonDataComponent(page)).toHaveCSS("border-color", color);
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
        { hooksConfig: { theme: `${theme}` } }
      );

      await expect(buttonDataComponent(page)).toHaveCSS("color", color);
      await expect(buttonDataComponent(page)).toHaveCSS("border-color", color);
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
        { hooksConfig: { theme: `${theme}` } }
      );

      const tabTitleSelectedIndicator = page.locator(
        '[data-element="tab-selected-indicator"]'
      );
      await expect(tabTitleSelectedIndicator).toHaveCSS(
        "box-shadow",
        `${color} 0px -2px 0px 0px inset`
      );
    });
  });
});

test.describe("Hover styling", () => {
  buildTestArray(commonColorsOnHover).forEach(([theme, color]) => {
    test.describe(
      `should render components with ${theme} theme onHover`,
      () => {
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
            color
          );
        });

        test("Link component and verify theme color", async ({
          mount,
          page,
        }) => {
          await mount(
            <Link
              href="https://carbon.sage.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              This is a link
            </Link>,
            { hooksConfig: { theme: `${theme}` } }
          );

          await linkComponent(page).hover();
          await expect(linkComponent(page)).toHaveCSS("color", color);
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
            { hooksConfig: { theme: `${theme}` } }
          );

          const toggleButton = page.locator('[data-element="toggle-button"]');

          await toggleButton.hover();

          await expect(toggleButton).toHaveCSS("background-color", color);
        });
      }
    );
  });

  buildTestArray(multiButtonOnHover).forEach(([theme, color]) => {
    test.describe(
      `should render components with ${theme} theme onHover`,
      () => {
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
            }
          );

          await multiActionButtonComponent(page).locator("button").hover();
          await expect(
            multiActionButtonComponent(page).locator("button")
          ).toHaveCSS("background-color", color);
        });
      }
    );
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
          loaderBarColor
        );

        await expect(loaderBarComponent(page).locator("div > *")).toHaveCSS(
          "background-color",
          color
        );
      });
    });
  }
);

buildTestArray(stepSequenceColors).forEach(([theme, color]) => {
  test.describe(`should render components with ${theme} theme`, () => {
    test("StepSequence component and verify theme color", async ({
      mount,
      page,
    }) => {
      await mount(
        <StepSequenceItem indicator="1" status="complete">
          Name
        </StepSequenceItem>,
        {
          hooksConfig: { theme: `${theme}` },
        }
      );

      await expect(stepSequenceDataComponentItem(page)).toHaveCSS(
        "color",
        color
      );
    });
  });
});

test.describe("Accessibility tests for Carbon Provider", () => {
  test("should pass accessibility tests for sage theme example", async ({
    mount,
    page,
  }) => {
    await mount(<SageThemeStory />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for mint theme example", async ({
    mount,
    page,
  }) => {
    await mount(<MintThemeStory />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for all themes example", async ({
    mount,
    page,
  }) => {
    await mount(<AllThemesStory />);

    await checkAccessibility(page);
  });
});
