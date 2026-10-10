import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import SkeletonComponent from "./components.test-pw";
import Skeleton from "../../../src/components/skeleton";
import { CHARACTERS } from "../../../playwright/support/constants";
import { checkAccessibility } from "../../../playwright/support/helper";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const lines = [5, 6, 8, 10];

test.describe("Accessibility tests for Skeleton component", () => {
  testData.forEach((children) => {
    test(`should check accessibility when children is ${children}`, async ({
      mount,
      page,
    }) => {
      await mount(<Skeleton>{children}</Skeleton>);

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((bool) => {
    test(`should check accessibility when loading is set as ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(<SkeletonComponent loading={bool} />);

      await checkAccessibility(page);
    });
  });

  lines.forEach((line) => {
    test(`should check accessibility when loading lines is set as ${line}`, async ({
      mount,
      page,
    }) => {
      await mount(<SkeletonComponent lines={line} />);

      await checkAccessibility(page);
    });
  });
});
