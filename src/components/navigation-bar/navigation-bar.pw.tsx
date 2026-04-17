import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import Box from "../box";
import NavigationBar, { NavigationBarProps } from ".";
import { Menu, MenuItem } from "../menu";
import {
  Default,
  ExampleWithMenu,
  Sticky,
  Fixed,
  NavigationBarWithErrorHandler,
} from "./components.test-pw";

import navigationBar from "../../../playwright/components/navigation-bar";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("Test props for NavigationBar component", () => {
  test("should not cause a ResizeObserver-related error to occur", async ({
    mount,
    page,
  }) => {
    await mount(<NavigationBarWithErrorHandler />);

    await expect(page.locator("#error-div")).toHaveText("");
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

    test("should pass accessibility test for ExampleWithMenu example", async ({
      mount,
      page,
    }) => {
      await mount(<ExampleWithMenu />);

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
