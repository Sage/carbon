import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  Default,
  BoxShadow,
  Color,
  Flex,
  Gap,
  Layout,
  OverflowWrap,
  Position,
  Scroll,
  Spacing,
} from "../../../src/components/box/components.test-pw";

test.describe("Accessibility tests for Box", () => {
  test("should pass accessibility tests for BoxDefault", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for BoxShadow story", async ({
    mount,
    page,
  }) => {
    await mount(<BoxShadow />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Color story", async ({
    mount,
    page,
  }) => {
    await mount(<Color />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Flex story", async ({
    mount,
    page,
  }) => {
    await mount(<Flex />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Gap story", async ({
    mount,
    page,
  }) => {
    await mount(<Gap />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Layout story", async ({
    mount,
    page,
  }) => {
    await mount(<Layout />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for OverflowWrap story", async ({
    mount,
    page,
  }) => {
    await mount(<OverflowWrap />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Position story", async ({
    mount,
    page,
  }) => {
    await mount(<Position />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Scroll story", async ({
    mount,
    page,
  }) => {
    await mount(<Scroll />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Spacing story", async ({
    mount,
    page,
  }) => {
    await mount(<Spacing />);
    await checkAccessibility(page);
  });
});
