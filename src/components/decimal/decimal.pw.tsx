import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";

import Decimal from "../../../src/components/decimal";
import { WithFieldHelp, Required, Validations } from "./components.test-pw";

test.describe("Accessibility tests for Decimal component", () => {
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

  test("should pass accessibility tests for Decimal validations", async ({
    mount,
    page,
  }) => {
    await mount(<Validations />);

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
});
