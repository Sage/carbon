import React from "react";
import { test } from "../../../playwright/helpers/base-test";

import UnifiedLoader from ".";
import { checkAccessibility } from "../../../playwright/support/helper";

const LOADER_TYPES = ["standalone", "ring", "star"] as const;
const STANDALONE_VARIANTS = ["typical", "ai"] as const;
const RING_VARIANTS = ["stacked", "inline"] as const;
const STANDALONE_SIZES = ["small", "medium", "large"] as const;
const RING_SIZES = ["extra-small", "small", "medium", "large"] as const;

test.describe("Accessibility tests for Loader component", () => {
  LOADER_TYPES.forEach((loaderType) => {
    switch (loaderType) {
      case "standalone":
        STANDALONE_VARIANTS.forEach((standaloneVariant) => {
          STANDALONE_SIZES.forEach((standaloneSize) => {
            test(`should pass accessibility tests for ${loaderType} Loader with variant ${standaloneVariant} and size ${standaloneSize}`, async ({
              mount,
              page,
            }) => {
              await mount(
                <UnifiedLoader
                  loaderType={loaderType}
                  variant={standaloneVariant}
                  size={standaloneSize}
                />,
              );

              await checkAccessibility(page);
            });
          });
        });
        break;
      case "ring":
        RING_VARIANTS.forEach((ringVariant) => {
          RING_SIZES.forEach((ringSize) => {
            test(`should pass accessibility tests for ${loaderType} Loader with variant ${ringVariant} and size ${ringSize}`, async ({
              mount,
              page,
            }) => {
              await mount(
                <UnifiedLoader
                  loaderType={loaderType}
                  variant={ringVariant}
                  size={ringSize}
                />,
              );

              await checkAccessibility(page);
            });
          });
        });
        break;
      default:
        test(`should pass accessibility tests for ${loaderType} Loader`, async ({
          mount,
          page,
        }) => {
          await mount(<UnifiedLoader loaderType={loaderType} />);

          await checkAccessibility(page);
        });
    }
  });
});
