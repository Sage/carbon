import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import DividerComponent, {
  DifferentSpacing,
  EnablingAdaptiveBehaviour,
  InsideForm,
  InsideFormInlineLabels,
} from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";

const displayInlineVal = [true, false];

test.describe("should render Divider component with default type and check accessibility issues", () => {
  displayInlineVal.forEach((boolVal) => {
    test(`should pass accessibility checks when the displayInline prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<DividerComponent displayInline={boolVal} />);

      await checkAccessibility(page);
    });
  });
});

test.describe("should render Divider component with 'horizontal' type and check accessbility issues", () => {
  test("should pass accessibility tests for Default example", async ({
    mount,
    page,
  }) => {
    await mount(<DividerComponent type="horizontal" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for DifferentSpacing example", async ({
    mount,
    page,
  }) => {
    await mount(<DifferentSpacing />);

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
