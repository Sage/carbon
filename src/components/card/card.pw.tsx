import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import "../../../playwright/components";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  CardComponent,
  SmallSpacing,
  LargeSpacing,
  WithWidthProvided,
  WithCustomBoxShadow,
  WithCustomHeight,
  DifferentCardFooterPadding,
  DifferentCardRowPadding,
  Interactive,
  MoreExamplesOfCardFooter,
  WithStringAsChild,
} from "../../../src/components/card/components.test-pw";

test.describe("Accessibility tests for Card component", () => {
  test("should pass accessibility tests for default example", async ({
    mount,
    page,
  }) => {
    await mount(<CardComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for small spacing example", async ({
    mount,
    page,
  }) => {
    await mount(<SmallSpacing />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for large spacing example", async ({
    mount,
    page,
  }) => {
    await mount(<LargeSpacing />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with width prop provided", async ({
    mount,
    page,
  }) => {
    await mount(<WithWidthProvided />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with custom height provided", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomHeight />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for interactive example", async ({
    mount,
    page,
  }) => {
    await mount(<Interactive />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with custom box shadow applied", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomBoxShadow />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with different card row padding applied", async ({
    mount,
    page,
  }) => {
    await mount(<DifferentCardRowPadding />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with different card footer padding applied", async ({
    mount,
    page,
  }) => {
    await mount(<DifferentCardFooterPadding />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for moreExamplesOfFooter example", async ({
    mount,
    page,
  }) => {
    await mount(<MoreExamplesOfCardFooter />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with a string as a child", async ({
    mount,
    page,
  }) => {
    await mount(<WithStringAsChild />);

    await checkAccessibility(page);
  });
});
