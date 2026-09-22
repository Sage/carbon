import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  DLComponent,
  DLReactFragment,
  DLBoxComponent,
  DLBoxWrappedPairs,
} from "./components.test-pw";
import Dl, { DlProps } from "./dl.component";
import Dt from "./dt/dt.component";
import Dd from "./dd/dd.component";
import Box from "../box";
import Icon from "../icon";
import Pill from "../pill";
import Link from "../link";
import Button from "../button/__next__";
import {
  getDataElementByValue,
  getDataRoleByValue,
} from "../../../playwright/components/index";
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

  test("should render grouped pairs with multiple descriptions and dividers", async ({
    mount,
    page,
  }) => {
    await mount(
      <Dl divider spacing="small">
        <Dt>Account holder</Dt>
        <Dd>Sage Ltd</Dd>
        <Dd>Company number 01234567</Dd>
        <Dt>Account status</Dt>
        <Dd>Open</Dd>
      </Dl>,
    );

    const pairs = page.locator("dl > div");

    await expect(pairs).toHaveCount(2);
    await expect(pairs.first().locator("dt")).toHaveCount(1);
    await expect(pairs.first().locator("dd")).toHaveCount(2);
    await expect(pairs.first()).toHaveCSS("padding-bottom", "4px");
    await checkAccessibility(page);
  });

  test("should not render a divider after the last pair", async ({
    mount,
    page,
  }) => {
    await mount(
      <Dl divider>
        <Dt>First</Dt>
        <Dd>Description 1</Dd>
        <Dt>Second</Dt>
        <Dd>Description 2</Dd>
      </Dl>,
    );

    const pairs = page.locator("dl > div");

    await expect(pairs.first()).toHaveCSS("border-bottom-width", "1px");
    await expect(pairs.last()).toHaveCSS("border-bottom-width", "0px");
  });

  test("should apply small spacing of 4px between pairs when spacing is small", async ({
    mount,
    page,
  }) => {
    await mount(
      <Dl spacing="small">
        <Dt>First</Dt>
        <Dd>Description 1</Dd>
      </Dl>,
    );

    const pair = page.locator("dl > div").first();

    await expect(pair).toHaveCSS("padding-bottom", "4px");
    await expect(pair).toHaveCSS("padding-top", "4px");
  });

  test("should apply medium spacing of 12px between pairs by default", async ({
    mount,
    page,
  }) => {
    await mount(
      <Dl>
        <Dt>First</Dt>
        <Dd>Description 1</Dd>
      </Dl>,
    );

    const pair = page.locator("dl > div").first();

    await expect(pair).toHaveCSS("padding-bottom", "12px");
    await expect(pair).toHaveCSS("padding-top", "12px");
  });

  test("should left-align the term by default", async ({ mount, page }) => {
    await mount(
      <Dl>
        <Dt>Term</Dt>
        <Dd>Description</Dd>
      </Dl>,
    );

    await expect(page.locator("dt").first()).toHaveCSS("text-align", "left");
  });

  test("should render the provided rightChildren content next to the description", async ({
    mount,
    page,
  }) => {
    await mount(
      <Dl>
        <Dt>Account status</Dt>
        <Dd rightChildren={<Pill>Verified</Pill>}>Open</Dd>
      </Dl>,
    );

    const rightChildren = getDataRoleByValue(page, "dd-right-children");

    await expect(rightChildren).toBeVisible();
    await expect(rightChildren.getByText("Verified")).toBeVisible();
  });

  test("should support multiple Dd elements under one Dt, each with their own rightChildren", async ({
    mount,
    page,
  }) => {
    await mount(
      <Dl>
        <Dt>Account holder</Dt>
        <Dd rightChildren={<Link href="#">Edit</Link>}>Sage Ltd</Dd>
        <Dd rightChildren={<Pill>Verified</Pill>}>123 North East Street</Dd>
      </Dl>,
    );

    const rightChildren = getDataRoleByValue(page, "dd-right-children");

    await expect(rightChildren).toHaveCount(2);
    await expect(rightChildren.first().getByText("Edit")).toBeVisible();
    await expect(rightChildren.last().getByText("Verified")).toBeVisible();
  });

  test("should render dt and dd children when wrapped in a Box", async ({
    mount,
    page,
  }) => {
    await mount(<DLBoxWrappedPairs />);

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

    test("should pass accessibility tests when rendered with rightChildren", async ({
      mount,
      page,
    }) => {
      await mount(
        <Dl divider>
          <Dt>Account holder</Dt>
          <Dd rightChildren={<Pill>Verified</Pill>}>Sage Ltd</Dd>
          <Dd rightChildren={<Link href="#">Edit</Link>}>
            123 North East Street
          </Dd>
          <Dt>Account status</Dt>
          <Dd
            rightChildren={
              <Button variantType="secondary" size="small">
                Manage
              </Button>
            }
          >
            Open
          </Dd>
        </Dl>,
      );

      await checkAccessibility(page);
    });

    (["small", "medium"] as DlProps["spacing"][]).forEach((spacing) => {
      test(`should pass accessibility tests when spacing is ${spacing}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <Dl spacing={spacing} divider>
            <Dt>First</Dt>
            <Dd>Description 1</Dd>
            <Dt>Second</Dt>
            <Dd>Description 2</Dd>
          </Dl>,
        );

        await checkAccessibility(page);
      });
    });
  });
});
