import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";

import {
  Default,
  DifferentSpacing,
  EnablingAdaptiveBehaviour,
  InsideForm,
  InsideFormInlineLabels,
} from "../hr/components.test-pw";
import hrComponent from "../../../playwright/components/hr/index";
import HrComponent from "./hr.component";

test.describe("Hr component", () => {
  test("renders with expected margin", async ({ mount, page }) => {
    await mount(<HrComponent />);

    await expect(hrComponent(page)).toHaveCSS("margin-top", "24px");
    await expect(hrComponent(page)).toHaveCSS("margin-bottom", "24px");
  });

  test("renders with a small height", async ({ mount, page }) => {
    await mount(<HrComponent height="small" />);

    await expect(hrComponent(page)).toHaveCSS("height", "1px");
  });

  test("renders with a medium height", async ({ mount, page }) => {
    await mount(<HrComponent height="medium" />);

    await expect(hrComponent(page)).toHaveCSS("height", "2px");
  });

  test("renders with a large height", async ({ mount, page }) => {
    await mount(<HrComponent height="large" />);

    await expect(hrComponent(page)).toHaveCSS("height", "3px");
  });
  [
    [799, 80, 320],
    [800, 80, 320],
    [801, 0, 0],
  ].forEach(([breakpoint, leftMargin, rightMargin]) => {
    test.use({ viewport: { width: 800, height: 300 } });

    test(`adaptiveMaxBreakpoint props set to ${breakpoint} applies the expected left and right margins`, async ({
      mount,
      page,
    }) => {
      await mount(
        <HrComponent
          mb={7}
          mt={7}
          ml="10%"
          mr="40%"
          adaptiveMxBreakpoint={breakpoint}
        />,
      );

      await expect(hrComponent(page)).toHaveCSS(
        "margin-left",
        `${leftMargin}px`,
      );
      await expect(hrComponent(page)).toHaveCSS(
        "margin-right",
        `${rightMargin}px`,
      );
    });
  });
});

test.describe("Accessibility tests for Hr component", () => {
  test("should pass accessibility tests for Default example", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for DifferentSpacing example", async ({
    mount,
    page,
  }) => {
    await mount(<DifferentSpacing />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when rendered with a small height", async ({
    mount,
    page,
  }) => {
    await mount(<HrComponent height="small" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when rendered with a medium height", async ({
    mount,
    page,
  }) => {
    await mount(<HrComponent height="medium" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when rendered with a  large height", async ({
    mount,
    page,
  }) => {
    await mount(<HrComponent height="large" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for EnablingAdaptiveBehaviour example", async ({
    mount,
    page,
  }) => {
    await mount(<EnablingAdaptiveBehaviour />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for InsideForm example", async ({
    mount,
    page,
  }) => {
    await mount(<InsideForm />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for InsideFormInlineLabels example", async ({
    mount,
    page,
  }) => {
    await mount(<InsideFormInlineLabels />);

    await checkAccessibility(page);
  });
});
