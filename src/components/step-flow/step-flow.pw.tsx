import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import { stepFlowDismissIcon } from "../../../playwright/components/step-flow";
import {
  StepFlowComponent,
  StepFlowComponentWithStepFlowTitleNode,
  StepFlowComponentWithRefAndButtons,
  StepFlowComponentWithRefAndButtonsAndStepFlowTitleNode,
} from "./components.test-pw";

test.describe("Accessibility tests for StepFlow component", () => {
  test("should pass accessibility checks when a node is passed to`title` with the `StepFlowTile` as a descendant", async ({
    mount,
    page,
  }) => {
    await mount(<StepFlowComponentWithStepFlowTitleNode />);

    await checkAccessibility(page);
  });

  test("should pass accessibility checks when component is rendered with required props", async ({
    mount,
    page,
  }) => {
    await mount(<StepFlowComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility checks when component is rendered with a ref and buttons", async ({
    mount,
    page,
  }) => {
    await mount(<StepFlowComponentWithRefAndButtons />);

    await checkAccessibility(page);
  });

  test("should pass accessibility checks when component is rendered with a ref and buttons and a node is passed to `title` with the `StepFlowTile` as a descendant", async ({
    mount,
    page,
  }) => {
    await mount(<StepFlowComponentWithRefAndButtonsAndStepFlowTitleNode />);

    await checkAccessibility(page);
  });

  test("should pass accessibility checks when 'showProgressIndicator' is true", async ({
    mount,
    page,
  }) => {
    await mount(<StepFlowComponent showProgressIndicator />);

    await checkAccessibility(page);
  });

  test("should pass accessibility checks when 'showProgressIndicator' is true and there are completed, not completed and in-progress indicator steps", async ({
    mount,
    page,
  }) => {
    await mount(
      <StepFlowComponent
        showProgressIndicator
        currentStep={2}
        totalSteps={3}
      />,
    );

    await checkAccessibility(page);
  });

  test("should pass accessibility checks when 'showCloseIcon' is true", async ({
    mount,
    page,
  }) => {
    await mount(<StepFlowComponent showCloseIcon />);

    await stepFlowDismissIcon(page).focus();
    await checkAccessibility(page);
  });
});
