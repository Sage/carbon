import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import PreviewComponent from "./components.test-pw";
import Preview from "../../../src/components/preview";
import { CHARACTERS } from "../../../playwright/support/constants";
import { checkAccessibility } from "../../../playwright/support/helper";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const pixelsData = [256, 275, 300];
const lines = [5, 6, 8, 10];

test.describe("Accessibility tests for Preview component", () => {
  pixelsData.forEach((height) => {
    test(`should check accessibility when height is ${height}px`, async ({
      mount,
      page,
    }) => {
      await mount(<PreviewComponent height={`${height}px`} />);

      await checkAccessibility(page);
    });
  });

  pixelsData.forEach((width) => {
    test(`should check accessibility when width is ${width}px`, async ({
      mount,
      page,
    }) => {
      await mount(<PreviewComponent width={`${width}px`} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((children) => {
    test(`should check accessibility when children is ${children}`, async ({
      mount,
      page,
    }) => {
      await mount(<Preview>{children}</Preview>);

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((bool) => {
    test(`should check accessibility when loading is set as ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(<PreviewComponent loading={bool} />);

      await checkAccessibility(page);
    });
  });

  lines.forEach((line) => {
    test(`should check accessibility when loading lines is set as ${line}`, async ({
      mount,
      page,
    }) => {
      await mount(<PreviewComponent lines={line} />);

      await checkAccessibility(page);
    });
  });
});
