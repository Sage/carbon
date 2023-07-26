/* eslint-disable no-return-assign */
import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
// import { BadgeComponent } from "../../../src/components/badge/badge-test.stories";
import Badge from "./badge.component";
import Box from "../box";
import Button from "../button";
import {
  badge,
  badgeCounter,
  badgeCrossIcon
} from "../../../playwright/components/badge/index";
import {
  checkAccessibility,
  getDesignTokensByCssProperty
} from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";

const counterCount = [1, 99];
const bigCounterCount = [100, 999];
const negativeCounterCount = [0, -12, "test", CHARACTERS.SPECIALCHARACTERS];

// test.beforeAll(async ({ page }) => {
//   await page.addStyleTag({ path: "./src/style/fonts.css"});
//   // await page.addStyleTag({ path: "./src/style/global-style"});
// })

// const BadgeComponent = (props: Partial<BadgeProps>): React.JSX.Element => {
//   return (
//     <Box margin="40px">
//       <Badge {...props}>
//         <Button mr={0} buttonType="tertiary">
//           Filter
//         </Button>
//       </Badge>
//     </Box>
//   );
// };

test.describe("should render Badge component", () => {
  test.only("renders BadgeComponent", async ({ mount, page }) => {
    await mount(
      // <BadgeComponent />
      <Box>
        <Badge counter={1}>
          <Button mr={0} buttonType="tertiary">
            Filter
          </Button>
        </Badge>
      </Box>
    );

    const badgeElement = await badge(page);
    const text = await page.locator("span > span").textContent();
    const badgeElementIsVisible = await badgeElement.isVisible;
    await expect(text?.toString().trim()).toEqual("Filter");
    await expect(badgeElementIsVisible).toBeTruthy;
  });

  counterCount.forEach((countInput) => {
    test(`should check Badge counter is set to ${countInput}`, async ({
      mount,
      page
    }) => {
      await mount(
        // <BadgeComponent />
        <Box>
          <Badge counter={countInput}>
            <Button mr={0} buttonType="tertiary">
              Filter
            </Button>
          </Badge>
        </Box>
      );

      const badgeCounterElement = await badgeCounter(page);
      const count = await badgeCounterElement.textContent();

      await expect(count).toEqual(`${countInput}`);
    });
  });

  bigCounterCount.forEach((countInput) => {
    test(`should check Badge counter is set to 99 when using ${countInput} as counter`, async ({
      mount,
      page
    }) => {
      await mount(
        // <BadgeComponent />
        <Box>
          <Badge counter={countInput}>
            <Button mr={0} buttonType="tertiary">
              Filter
            </Button>
          </Badge>
        </Box>
      );

      const badgeCounterElement = await badgeCounter(page);
      const count = await badgeCounterElement.textContent();

      await expect(count).toEqual("99");
    });
  });

  negativeCounterCount.forEach((incorrectValue) => {
    test(`should check Badge counter is not visible when using ${incorrectValue} param`, async ({
      mount,
      page
    }) => {
      await mount(
        // <BadgeComponent />
        <Box>
          <Badge counter={incorrectValue}>
            <Button mr={0} buttonType="tertiary">
              Filter
            </Button>
          </Badge>
        </Box>
      );

      await expect((await badgeCounter(page)).isVisible).toBeFalsy;
    });
  });

  test.skip("badge should display cross icon when hovered over", async ({
    mount,
    page
  }) => {
    await mount(
      // <BadgeComponent />
      <Box>
        <Badge onClick={() => {}} counter={99}>
          <Button mr={0} buttonType="tertiary">
            Filter
          </Button>
        </Badge>
      </Box>
    );

    const counterIcon = await badgeCounter(page);
    await counterIcon.hover();
    const crossIcon = (await badgeCrossIcon(page)).isVisible;

    await expect(await badgeCrossIcon(page)).toHaveCSS(
      "background-color",
      "rgb(0, 126, 69)"
    );
    await expect(crossIcon).toBeTruthy;
  });

  test.skip("badge should not display cross icon when hovered over with no onClick function passed to component", async ({
    mount,
    page
  }) => {
    await mount(
      <Box>
        <Badge counter={99}>
          <Button mr={0} buttonType="tertiary">
            Filter
          </Button>
        </Badge>
      </Box>
    );

    const badgeElement = await badge(page);
    await badgeElement.hover();
    const badgeCrossIconLocator = (await badgeCrossIcon(page)).isVisible;

    await expect(badgeElement).toHaveCSS("background", "rgb(255, 255, 255)");
    await expect(badgeCrossIconLocator).toBeTruthy;
  });

  test("should call onClick callback when a click event is triggered", async ({
    mount,
    page
  }) => {
    let capturedCallback = false;

    await mount(
      <Box>
        <Badge counter={5} onClick={() => (capturedCallback = true)}>
          <Button mr={0} buttonType="tertiary">
            Filter
          </Button>
        </Badge>
      </Box>
    );

    const badgeToClick = await badge(page);
    await badgeToClick.click();
    await expect(capturedCallback).toBeTruthy();
  });

  test.skip("should render with expected border radius styling", async ({
    mount,
    page
  }) => {
    await mount(
      <Box>
        <Badge counter={9}>
          <Button mr={0} buttonType="tertiary">
            Filter
          </Button>
        </Badge>
      </Box>
    );

    await expect(await badge(page)).toHaveCSS("border-radius", "50%");
  });

  test.skip("should check ariaLabel for Badge component", async ({
    mount,
    page
  }) => {
    await mount(
      <Box>
        <Badge counter={9} aria-label="cypress-aria">
          <Button mr={0} buttonType="tertiary">
            Filter
          </Button>
        </Badge>
      </Box>
    );

    const ariaLabel = await badge(page);
    await expect(ariaLabel).toHaveAttribute("aria-label", "cypress-aria");
  });

  test("should pass accessibility tests for Badge default story", async ({
    mount,
    page
  }) => {
    await mount(
      <Box>
        <Badge counter={9}>
          <Button mr={0} buttonType="tertiary">
            Filter
          </Button>
        </Badge>
      </Box>
    );

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for click event", async ({
    mount,
    page
  }) => {
    await mount(
      <Box>
        <Badge onClick={() => {}}>
          <Button mr={0} buttonType="tertiary">
            Filter
          </Button>
        </Badge>
      </Box>
    );

    await checkAccessibility(page);
  });

  test.skip("should token for Badge component", async ({ mount, page }) => {
    await mount(
      <Box>
        <Badge counter={5}>
          <Button mr={0} buttonType="tertiary">
            Filter
          </Button>
        </Badge>
      </Box>
    );

    const tokenVal = await badge(page);

    const token = await getDesignTokensByCssProperty(
      tokenVal.toString(),
      "color",
      page
    );

    await expect(token).toEqual("colorsActionMajor500");
  });
});
