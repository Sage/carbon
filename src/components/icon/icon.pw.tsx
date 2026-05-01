import React from "react";
import { IconProps } from "../icon";
import { test } from "../../../playwright/helpers/base-test";
import IconComponent from "./component.test-pw";
import { SIZE, COLOR, CHARACTERS } from "../../../playwright/support/constants";

import { checkAccessibility } from "../../../playwright/support/helper";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const colorData = [
  [COLOR.ORANGE, COLOR.BLACK],
  [COLOR.RED, COLOR.WHITE],
  [COLOR.BLACK, COLOR.WHITE],
  [COLOR.BROWN, COLOR.WHITE],
];

test.describe("should check accessibility for Icon component", () => {
  [true, false].forEach((boolVal) => {
    test(`should pass accessibility tests when aria-hidden prop is set as ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconComponent aria-hidden={boolVal} />);

      await checkAccessibility(page);
    });
  });

  // Icon component needs a role of img to pass accessibility tests.
  // This is because the icon is a span element and cannot have an `aria-role` of none, null or presentation
  // and also have an aria-label.
  testData.forEach((ariaLabel) => {
    test(`should pass accessibility tests when ariaLabel prop is set as ${ariaLabel}`, async ({
      page,
      mount,
    }) => {
      await mount(<IconComponent role="img" ariaLabel={ariaLabel} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((id) => {
    test(`should pass accessibility tests when icon id is set as ${id}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconComponent id={id} />);

      await checkAccessibility(page);
    });
  });

  (["error", "add", "admin", "alert"] as IconProps["type"][]).forEach(
    (iconType) => {
      test(`should pass accessibility tests when iconType is set as ${iconType}`, async ({
        mount,
        page,
      }) => {
        await mount(<IconComponent type={iconType} />);

        await checkAccessibility(page);
      });
    },
  );

  [true, false].forEach((boolVal) => {
    test(`should pass accessibility tests icon color when disabled prop is set as ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconComponent disabled={boolVal} />);

      await checkAccessibility(page);
    });
  });

  colorData.forEach(([backgroundColor]) => {
    test(`should pass accessibility tests when background color is set as ${backgroundColor}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconComponent bg={backgroundColor} />);

      await checkAccessibility(page);
    });
  });

  colorData.forEach(([iconColor]) => {
    test(`should pass accessibility tests when icon color is set as ${iconColor}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconComponent color={iconColor} />);

      await checkAccessibility(page);
    });
  });

  [SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE, SIZE.EXTRALARGE].forEach((fontSize) => {
    test(`should pass accessibility tests when fontSize is set as ${fontSize}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconComponent fontSize={fontSize} />);

      await checkAccessibility(page);
    });
  });

  (["circle", "rounded-rect", "square"] as IconProps["bgShape"][]).forEach(
    (bgShape) => {
      test(`should pass accessibility tests when bgShape is set as ${bgShape}`, async ({
        mount,
        page,
      }) => {
        await mount(<IconComponent bgShape={bgShape} />);

        await checkAccessibility(page);
      });
    },
  );

  [SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE, SIZE.EXTRALARGE].forEach((size) => {
    test(`should pass accessibility tests when bgSize is set as ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<IconComponent bgSize={size} />);

      await checkAccessibility(page);
    });
  });
});
