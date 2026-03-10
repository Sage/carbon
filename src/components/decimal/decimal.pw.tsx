import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";

import Decimal from "../../../src/components/decimal";
import {
  WithCustomPrecision,
  WithFieldHelp,
  Required,
  ValidationsRedesign,
  ValidationsTooltip,
  ValidationsTooltipLabel,
} from "./components.test-pw";

test.describe("Accessibility tests for Decimal component", () => {
  test("should pass accessibility tests for Decimal with custom precision", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomPrecision />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal with field help", async ({
    mount,
    page,
  }) => {
    await mount(<WithFieldHelp fieldHelp="Help" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal required", async ({
    mount,
    page,
  }) => {
    await mount(<Required />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal validations redesigned", async ({
    mount,
    page,
  }) => {
    await mount(<ValidationsRedesign />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal default", async ({
    mount,
    page,
  }) => {
    await mount(<Decimal label="Decimal" onChange={() => {}} value="0.01" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal with readOnly prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <Decimal label="Decimal" onChange={() => {}} value="0.01" readOnly />,
    );

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal with tooltip", async ({
    mount,
    page,
  }) => {
    await mount(<ValidationsTooltip />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal with tooltip label", async ({
    mount,
    page,
  }) => {
    await mount(<ValidationsTooltipLabel />);

    await checkAccessibility(page);
  });
});
