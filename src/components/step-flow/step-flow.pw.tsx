import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import {
  checkAccessibility,
  getDesignTokensByCssProperty,
} from "../../../playwright/support/helper";
import {
  StepFlowComponent,
  StepFlowComponentWithStepFlowTitleNode,
  StepFlowComponentWithRefAndButtons,
  StepFlowComponentWithRefAndButtonsAndStepFlowTitleNode,
} from "./components.test-pw";

import { StepFlowTitle, Steps } from ".";

import {
  stepFlowProgressIndicator,
  stepFlowCategoryText,
  stepFlowTitleTextWrapper,
  stepFlowTitleText,
  stepFlowVisuallyHiddenTitleText,
  stepFlowProgressIndicatorBar,
  stepFlowLabel,
  stepFlowDismissIcon,
} from "../../../playwright/components/step-flow";

import { button } from "../../../playwright/components";

import { CHARACTERS } from "../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("Prop checks for StepFlow component", () => {
  testData.forEach((stringVals) => {
    test(`should render with the category prop, when the prop's value is ${stringVals}`, async ({
      mount,
      page,
    }) => {
      await mount(<StepFlowComponent category={stringVals} />);

      await expect(stepFlowCategoryText(page)).toHaveText(stringVals);
    });
  });

  testData.forEach((stringVals) => {
    test(`should render with the title prop, when the prop's value is ${stringVals}`, async ({
      mount,
      page,
    }) => {
      await mount(<StepFlowComponent title={stringVals} />);

      await expect(stepFlowTitleText(page)).toHaveText(stringVals);
    });
  });

  (["h1", "h2"] as const).forEach((titleVariants) => {
    test(`should render with the titleVariant prop, when the prop's value is ${titleVariants}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <StepFlowComponent title="foo" titleVariant={titleVariants} />,
      );

      await expect(page.locator(titleVariants)).toContainText("foo");
    });
  });

  (["h1", "h2"] as const).forEach((titleVariants) => {
    test(`should render with the titleVariant prop passed to the 'StepFlowTitle' sub component, when the prop's value is ${titleVariants}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <StepFlowComponent
          title={
            <StepFlowTitle titleString="foo" titleVariant={titleVariants} />
          }
        />,
      );

      await expect(page.locator(titleVariants)).toContainText("foo");
    });
  });

  test("should render the correct element when 'showProgressIndicator' is true", async ({
    mount,
    page,
  }) => {
    await mount(<StepFlowComponent showProgressIndicator />);

    await expect(stepFlowProgressIndicatorBar(page)).toBeVisible();
  });

  (
    [
      [1, 1],
      [2, 1],
      [2, 3],
    ] as [Steps, Steps][]
  ).forEach(([totalSteps, currentStep]) => {
    test(`should render the correct label when the 'totalSteps' prop is passed as ${totalSteps} and 'currentStep' is ${currentStep}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <StepFlowComponent totalSteps={totalSteps} currentStep={currentStep} />,
      );

      if (totalSteps >= currentStep) {
        await expect(stepFlowLabel(page)).toHaveText(
          `Step ${currentStep} of ${totalSteps}`,
        );
      } else {
        await expect(stepFlowLabel(page)).toHaveText(
          `Step ${totalSteps} of ${totalSteps}`,
        );
      }
    });
  });

  (
    [
      [1, 1],
      [2, 1],
      [2, 3],
    ] as [Steps, Steps][]
  ).forEach(([totalSteps, currentStep]) => {
    test(`should render the correct visually hidden title when the 'totalSteps' prop is passed as ${totalSteps} and 'currentStep' is ${currentStep}, and the category and title props are also passed`, async ({
      mount,
      page,
    }) => {
      const category = "foo";
      const title = "bar";

      await mount(
        <StepFlowComponent
          totalSteps={totalSteps}
          currentStep={currentStep}
          category={category}
          title={title}
        />,
      );

      if (totalSteps >= currentStep) {
        await expect(stepFlowVisuallyHiddenTitleText(page)).toHaveText(
          `${category}. ${title}. Step ${currentStep} of ${totalSteps}.`,
        );
      } else {
        await expect(stepFlowVisuallyHiddenTitleText(page)).toHaveText(
          `${category}. ${title}. Step ${totalSteps} of ${totalSteps}.`,
        );
      }
    });
  });

  ([1, 2, 3, 4, 5, 6, 7, 8] as Steps[]).forEach((totalSteps) => {
    test(`should render the correct amount of progress indicators when the 'totalSteps' prop is passed as ${totalSteps}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <StepFlowComponent totalSteps={totalSteps} showProgressIndicator />,
      );

      expect(await stepFlowProgressIndicator(page).count()).toEqual(totalSteps);
    });
  });

  test("should render the correct element when 'showCloseIcon' is true", async ({
    mount,
    page,
  }) => {
    await mount(<StepFlowComponent showCloseIcon />);

    await expect(stepFlowDismissIcon(page)).toBeVisible();
  });

  test("background colour token should be correct when 'showCloseIcon' is true and the indicator is in progress", async ({
    mount,
    page,
  }) => {
    await mount(
      <StepFlowComponent
        currentStep={1}
        totalSteps={1}
        showProgressIndicator
      />,
    );

    const backgroundColorToken = await getDesignTokensByCssProperty(
      page,
      stepFlowProgressIndicator(page),
      "background-color",
    );

    expect(backgroundColorToken[0]).toBe("--colorsUtilityYin090");
  });

  test("background colour token should be correct when 'showCloseIcon' is true and the indicator is completed", async ({
    mount,
    page,
  }) => {
    await mount(
      <StepFlowComponent
        currentStep={2}
        totalSteps={3}
        showProgressIndicator
      />,
    );

    const backgroundColorToken = await getDesignTokensByCssProperty(
      page,
      stepFlowProgressIndicator(page).nth(0),
      "background-color",
    );

    expect(backgroundColorToken[0]).toBe("--colorsSemanticPositive500");
  });

  test("background colour should be correct when 'showCloseIcon' is true and the indicator is not completed", async ({
    mount,
    page,
  }) => {
    await mount(
      <StepFlowComponent
        currentStep={2}
        totalSteps={3}
        showProgressIndicator
      />,
    );

    const backgroundColorToken = await getDesignTokensByCssProperty(
      page,
      stepFlowProgressIndicator(page).nth(2),
      "background-color",
    );

    expect(backgroundColorToken[0]).toBe("--colorsActionDisabled600");
  });
});

test.describe("Event checks for StepFlow component", () => {
  test("should call onDismiss callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <StepFlowComponent
        showCloseIcon
        onDismiss={() => {
          callbackCount += 1;
        }}
      />,
    );
    await stepFlowDismissIcon(page).click();

    expect(callbackCount).toBe(1);
  });
});

test.describe("Ref checks for StepFlow component", () => {
  test("should focus on title DOM element when a focus ref is passed", async ({
    mount,
    page,
  }) => {
    await mount(<StepFlowComponentWithRefAndButtons />);

    await expect(stepFlowTitleTextWrapper(page)).not.toBeFocused();
    await button(page).nth(1).click();

    await expect(stepFlowTitleTextWrapper(page)).toBeFocused();
  });

  test("should focus on title DOM element when a focus ref is passed, and a node is passed to `title` with the `StepFlowTitle` as a descendant", async ({
    mount,
    page,
  }) => {
    await mount(<StepFlowComponentWithRefAndButtonsAndStepFlowTitleNode />);

    await expect(stepFlowTitleTextWrapper(page)).not.toBeFocused();
    await button(page).nth(1).click();

    await expect(stepFlowTitleTextWrapper(page)).toBeFocused();
  });
});

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
