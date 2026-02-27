import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  DLComponent,
  DLReactFragment,
  DLBoxComponent,
} from "./components.test-pw";
import { UsingBoxToOverrideBackgroundColor } from "./definition-list-test.stories";
import Dl, { DlProps } from "./dl.component";
import Dt from "./dt/dt.component";
import Dd from "./dd/dd.component";
import Box from "../box";
import Icon from "../icon";
import { getDataElementByValue } from "../../../playwright/components/index";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  checkAccessibility,
  assertCssValueIsApproximately,
} from "../../../playwright/support/helper";

const specialCharacters = [
  CHARACTERS.STANDARD,
  CHARACTERS.DIACRITICS,
  CHARACTERS.SPECIALCHARACTERS,
];

const alignValue = ["left", "center", "right"];
const PADDING_RIGHT = 24;
const VIEWPORT_WIDTH = 1000;

test.describe("definition list", () => {
  [
    [100, VIEWPORT_WIDTH - 100, 10],
    [500, VIEWPORT_WIDTH - 500, 50],
    [900, VIEWPORT_WIDTH - 900, 90],
  ].forEach(([dtPixels, ddPixels, dtPercent]) => {
    test(`should verify text width is  ${dtPixels}px and definition width is ${ddPixels}px, ${dtPercent}% of the Definition List width`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({ width: VIEWPORT_WIDTH, height: 500 });
      await mount(<DLComponent w={dtPercent} />);

      const dt = getDataElementByValue(page, "dl").locator("dt").first();
      const dd = getDataElementByValue(page, "dl").locator("dd").first();
      await assertCssValueIsApproximately(
        dt,
        "width",
        dtPixels - PADDING_RIGHT,
      );

      await assertCssValueIsApproximately(dd, "width", ddPixels);
    });
  });

  test("should render Definition List within a box combined with typography and hr components", async ({
    mount,
    page,
  }) => {
    await mount(<DLBoxComponent />);

    const box = getDataElementByValue(page, "box");
    await expect(box.getByText("Segment Header")).toBeVisible();

    await expect(box.locator("hr")).toBeVisible();

    await expect(box.locator("dl")).toBeVisible();
  });

  test("should render dt and dd children when wrapped in a Box", async ({
    mount,
    page,
  }) => {
    await mount(<UsingBoxToOverrideBackgroundColor />);

    const box1 = getDataElementByValue(page, "box1");
    await expect(box1.first()).toBeVisible();

    const box2 = getDataElementByValue(page, "box2");
    await expect(box2.first()).toBeVisible();
  });

  test.describe("Accessibility tests for Definition List component", () => {
    (alignValue as DlProps["dtTextAlign"][]).forEach((align) => {
      test(`should pass accessibility tests when text is ${align} aligned`, async ({
        mount,
        page,
      }) => {
        await mount(<DLComponent dtTextAlign={align} ddTextAlign="right" />);

        await checkAccessibility(page);
      });
    });

    (alignValue as DlProps["ddTextAlign"][]).forEach((align) => {
      test(`should pass accessibility tests when DD text is ${align} aligned`, async ({
        mount,
        page,
      }) => {
        await mount(<DLComponent ddTextAlign={align} />);

        await checkAccessibility(page);
      });
    });

    [10, 50, 90].forEach((dtPercent) => {
      test(`should pass the accessibility tests when text width is ${dtPercent}px`, async ({
        mount,
        page,
      }) => {
        await mount(<DLComponent w={dtPercent} />);

        await checkAccessibility(page);
      });
    });

    specialCharacters.forEach((text) => {
      test(`should pass accessibility tests when text is ${text}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <Dl>
            <Dt>{text}</Dt>
            <Dd>Definition</Dd>
          </Dl>,
        );

        await checkAccessibility(page);
      });
    });

    specialCharacters.forEach((definition) => {
      test(`should pass accessibility tests when children prop is set to ${definition}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <Dl>
            <Dt>Text</Dt>
            <Dd data-element="dd">{definition}</Dd>
          </Dl>,
        );

        await checkAccessibility(page);
      });
    });

    test("should pass accessibility tests when text is displayed as a single column", async ({
      mount,
      page,
    }) => {
      await mount(<DLComponent dtTextAlign="left" asSingleColumn />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when definition is displayed with a tick icon", async ({
      mount,
      page,
    }) => {
      await mount(
        <Dl>
          <Dt>Text</Dt>
          <Dd data-element="dd">
            <Box display="inline-flex" alignItems="center">
              <Box mr={1}>Details example</Box>
              <Icon type="tick" />
            </Box>
          </Dd>
        </Dl>,
      );

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when displayed with children inside React fragment", async ({
      mount,
      page,
    }) => {
      await mount(<DLReactFragment />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests within a box combined with typography and hr components", async ({
      mount,
      page,
    }) => {
      await mount(<DLBoxComponent />);

      await checkAccessibility(page);
    });
  });
});
