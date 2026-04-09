import React from "react";
import { test } from "../../../playwright/helpers/base-test";

import { checkAccessibility } from "../../../playwright/support/helper";
import { LinkProps } from "../../../src/components/link";
import {
  LinkComponent,
  LinkComponentWithDarkBackground,
} from "../../../src/components/link/components.test-pw";

const testPlaywright = "test-playwright";

test.describe("should check accessibility for Link component", () => {
  test("should pass accessibility tests for default link example", async ({
    mount,
    page,
  }) => {
    await mount(<LinkComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with dark background", async ({
    mount,
    page,
  }) => {
    await mount(<LinkComponentWithDarkBackground inverse />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with icon", async ({ mount, page }) => {
    await mount(<LinkComponent icon="add" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with href", async ({ mount, page }) => {
    await mount(<LinkComponent href={testPlaywright} />);

    await checkAccessibility(page);
  });

  ["_blank", "_self", "_parent", "_top"].forEach((target) => {
    test(`should pass accessibility tests with target prop set to ${target}`, async ({
      mount,
      page,
    }) => {
      await mount(<LinkComponent target={target} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests with ariaLabel prop", async ({
    mount,
    page,
  }) => {
    await mount(<LinkComponent ariaLabel={testPlaywright} />);

    await checkAccessibility(page);
  });

  ["noopener", "noreferrer", "opener"].forEach((rel) => {
    test(`should pass accessibility tests with rel prop set to ${rel}`, async ({
      mount,
      page,
    }) => {
      await mount(<LinkComponent rel={rel} />);

      await checkAccessibility(page);
    });
  });

  (["typical", "negative", "subtle"] as LinkProps["variant"][]).forEach(
    (variant) => {
      test(`should pass accessibility tests with variant prop set to ${variant}`, async ({
        mount,
        page,
      }) => {
        await mount(<LinkComponent variant={variant} />);

        await checkAccessibility(page);
      });
    },
  );

  (["typical", "negative", "subtle"] as LinkProps["variant"][]).forEach(
    (variant) => {
      test(`should pass accessibility tests with variant prop set to ${variant} and inverse`, async ({
        mount,
        page,
      }) => {
        await mount(
          <LinkComponentWithDarkBackground variant={variant} inverse />,
        );

        await checkAccessibility(page);
      });
    },
  );
});
