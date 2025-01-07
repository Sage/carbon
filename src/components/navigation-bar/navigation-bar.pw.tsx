import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import Box from "../box";
import NavigationBar, { NavigationBarProps } from ".";
import { Menu, MenuItem } from "../menu";
import {
  NavigationBarComponent,
  Default,
  DarkTheme,
  WhiteTheme,
  BlackTheme,
  ExampleWithMenu,
  IsLoading,
  WithCustomSpacing,
  ContentMaxWidthBox,
  Sticky,
  Fixed,
  NavigationBarWithErrorHandler,
} from "./components.test-pw";

import navigationBar from "../../../playwright/components/navigation-bar";
import { COLOR, CHARACTERS } from "../../../playwright/support/constants";
import { checkAccessibility } from "../../../playwright/support/helper";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testData = CHARACTERS.STANDARD;
const variants = [
  ["black", COLOR.BLACK],
  ["light", "rgb(230, 235, 237)"],
  ["white", "rgb(255, 255, 255)"],
  ["dark", "rgb(0, 50, 76)"],
] as [NavigationBarProps["navigationType"], string][];
const offsetVal = [25, 100, -100];

test.describe("Test props for NavigationBar component", () => {
  test("should not cause a ResizeObserver-related error to occur", async ({
    mount,
    page,
  }) => {
    await mount(<NavigationBarWithErrorHandler />);

    await expect(page.locator("#error-div")).toHaveText("");
  });

  specialCharacters.forEach((childrenValue) => {
    test(`should render with ${childrenValue} as a children`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NavigationBarComponent>{childrenValue}</NavigationBarComponent>,
      );

      await expect(navigationBar(page)).toHaveText(childrenValue);
    });
  });

  test("should render with ariaLabel prop", async ({ mount, page }) => {
    await mount(<NavigationBarComponent ariaLabel={testData} />);

    await expect(navigationBar(page)).toHaveAttribute("aria-label", testData);
  });

  variants.forEach(([navigationType, color]) => {
    test(`should render with ${navigationType} as a navigationType`, async ({
      mount,
      page,
    }) => {
      await mount(<NavigationBarComponent navigationType={navigationType} />);

      await expect(navigationBar(page)).toHaveCSS("background-color", color);
    });
  });

  ([true, false] as NavigationBarProps["isLoading"][]).forEach((boolean) => {
    test(`should render with isLoading prop set to ${boolean}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NavigationBarComponent isLoading={boolean}>
          {testData}
        </NavigationBarComponent>,
      );

      const navigation = page.locator(`[data-component="navigation-bar"]`);

      if (boolean) {
        await expect(navigation).not.toBeAttached;
      } else {
        await expect(navigation).toBeVisible();
      }
    });
  });

  (["fixed", "sticky"] as const).forEach((position) => {
    test(`should render with position prop set to ${position} and orientation set to top`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NavigationBarComponent position={position} orientation="top" />,
      );

      await expect(navigationBar(page)).toHaveCSS("position", position);
    });
  });

  (["fixed", "sticky"] as const).forEach((position) => {
    test(`should render with position prop set to ${position} and orientation set to bottom`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NavigationBarComponent position={position} orientation="bottom" />,
      );

      await expect(navigationBar(page)).toHaveCSS("position", position);
    });
  });

  offsetVal.forEach((offset) => {
    test(`should render with orientation set to top and offset prop set to ${offset} px`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NavigationBarComponent
          offset={`${offset}px`}
          orientation="top"
          position="fixed"
        />,
      );

      await expect(navigationBar(page)).toHaveCSS("top", `${offset}px`);
    });
  });

  offsetVal.forEach((offset) => {
    test(`should render with orientation set to bottom and offset prop set to ${offset} px`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NavigationBarComponent
          offset={`${offset}px`}
          orientation="bottom"
          position="fixed"
        />,
      );

      await expect(navigationBar(page)).toHaveCSS("bottom", `${offset}px`);
    });
  });

  (["top", "bottom"] as const).forEach((orientation) => {
    test(`should render NavigationBar component with orientation prop set to ${orientation}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NavigationBarComponent orientation={orientation} position="fixed" />,
      );

      await expect(navigationBar(page)).toHaveCSS(orientation, "0px");
    });
  });

  (["fixed", "sticky"] as NavigationBarProps["position"][]).forEach(
    (position) => {
      test(`should render with position prop set to ${position} and work as expected`, async ({
        mount,
        page,
      }) => {
        await mount(
          <div
            style={{
              height: "250px",
            }}
          >
            <NavigationBar
              position={position}
              orientation="top"
              offset="25px"
              aria-label="header"
            >
              <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
                <Menu flex="1">
                  <MenuItem flex="1" onClick={() => {}}>
                    Menu Item One
                  </MenuItem>
                </Menu>
              </Box>
            </NavigationBar>
            <div
              style={{
                height: "1000px",
              }}
            />
            <NavigationBar
              position={position}
              orientation="bottom"
              offset="25px"
              aria-label="footer"
            >
              <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
                <Menu flex="1">
                  <MenuItem flex="1" onClick={() => {}}>
                    Menu Item One
                  </MenuItem>
                </Menu>
              </Box>
            </NavigationBar>
          </div>,
        );

        await expect(navigationBar(page).nth(0)).toBeVisible();

        await expect(navigationBar(page).nth(1)).toBeVisible();

        await page.evaluate(() => window.scrollTo(1000, 1000));

        if (position === "fixed") {
          await expect(navigationBar(page).nth(0)).toBeInViewport();
        } else {
          await expect(navigationBar(page).nth(0)).not.toBeInViewport();
        }

        await expect(navigationBar(page).nth(1)).toBeVisible();
      });
    },
  );

  test.describe("Accessibility tests for NavigationBar component", () => {
    test("should pass accessibility test Default example", async ({
      mount,
      page,
    }) => {
      await mount(<Default />);

      await checkAccessibility(page);
    });

    test("should pass accessibility test for DarkTheme example", async ({
      mount,
      page,
    }) => {
      await mount(<DarkTheme />);

      await checkAccessibility(page);
    });

    test("should pass accessibility test for WhiteTheme example", async ({
      mount,
      page,
    }) => {
      await mount(<WhiteTheme />);

      await checkAccessibility(page);
    });

    test("should pass accessibility test for BlackTheme example", async ({
      mount,
      page,
    }) => {
      await mount(<BlackTheme />);

      await checkAccessibility(page);
    });

    test("should pass accessibility test for ExampleWithMenu example", async ({
      mount,
      page,
    }) => {
      await mount(<ExampleWithMenu />);

      await checkAccessibility(page);
    });

    test("should pass accessibility test for IsLoading example", async ({
      mount,
      page,
    }) => {
      await mount(<IsLoading />);

      await checkAccessibility(page);
    });

    test("should pass accessibility test for WithCustomSpacing example", async ({
      mount,
      page,
    }) => {
      await mount(<WithCustomSpacing />);

      await checkAccessibility(page);
    });

    test("should pass accessibility test for ContentMaxWidthBox example", async ({
      mount,
      page,
    }) => {
      await mount(<ContentMaxWidthBox />);

      await checkAccessibility(page);
    });

    test("should pass accessibility test for Sticky example", async ({
      mount,
      page,
    }) => {
      await mount(<Sticky />);

      await checkAccessibility(page);
    });

    test("should pass accessibility test for Fixed example", async ({
      mount,
      page,
    }) => {
      await mount(<Fixed />);

      await checkAccessibility(page);
    });
  });
});
