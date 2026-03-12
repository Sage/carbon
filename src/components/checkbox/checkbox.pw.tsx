import React from "react";
import { CommonCheckableInputProps } from "../../__internal__/checkable-input/checkable-input.component";
import { test, expect } from "../../../playwright/helpers/base-test";
import Box from "../box";
import { CheckboxProps, CheckboxGroupProps } from ".";
import {
  CheckboxComponent,
  CheckboxGroupComponent,
  Sizes,
  Reversed,
  WithCustomLabelWidth,
} from "./components.test-pw";
import {
  checkboxIcon,
  checkboxGroupIcon,
} from "../../../playwright/components/checkbox";
import { tooltipPreview } from "../../../playwright/components/index";
import { checkAccessibility } from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../playwright/support/constants";

const boolVals = [true, false];

test.describe("should check accessibility for Checkbox component", () => {
  boolVals.forEach((booleanValue) => {
    test(`should pass accessibility tests with checked state set to ${booleanValue}`, async ({
      mount,
      page,
    }) => {
      await mount(<CheckboxComponent checked={booleanValue} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests with fieldHelp", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent fieldHelp="Inline fieldhelp" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with inline fieldHelp", async ({
    mount,
    page,
  }) => {
    await mount(
      <CheckboxComponent fieldHelp="Inline fieldhelp" fieldHelpInline />,
    );

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with help icon", async ({
    mount,
    page,
  }) => {
    await mount(
      <CheckboxComponent label="Label For CheckBox" labelHelp="Label Help" />,
    );

    const checkboxIconElement = checkboxIcon(page);
    await checkboxIconElement.hover();
    await checkAccessibility(page, tooltipPreview(page));
  });

  test("should pass accessibility tests with disabled prop", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent disabled />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with different sizes", async ({
    mount,
    page,
  }) => {
    await mount(<Sizes />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for reversed prop", async ({
    mount,
    page,
  }) => {
    await mount(<Reversed />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Checkbox with custom label width", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomLabelWidth />);

    await checkAccessibility(page);
  });

  ([1, 2] as CommonCheckableInputProps["labelSpacing"][]).forEach((spacing) => {
    test(`should pass accessibility tests with ${spacing} as labelSpacing`, async ({
      mount,
      page,
    }) => {
      await mount(<CheckboxComponent labelSpacing={spacing} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests as a required field", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent label="Required Checkbox" required />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with autoFocus", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent autoFocus />);

    await checkAccessibility(page);
  });

  (
    ["bottom", "left", "right", "top"] as CheckboxProps["tooltipPosition"][]
  ).forEach((position) => {
    test(`should render CheckboxComponent component with tooltip positioned to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box m="250px">
          <CheckboxComponent
            labelHelp="Tooltip info"
            tooltipPosition={position}
          />
        </Box>,
      );

      const checkboxIconElement = checkboxIcon(page);
      await checkboxIconElement.hover();
      await checkAccessibility(page, tooltipPreview(page));
    });
  });

  test("should pass accessibility tests with error message", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent error="Error has occurred" />);

    const checkboxIconElement = checkboxIcon(page);
    await checkboxIconElement.hover();
    await checkAccessibility(page, tooltipPreview(page));
  });

  test("should pass accessibility tests with warning message", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent warning="Warning has occurred" />);

    const checkboxIconElement = checkboxIcon(page);
    await checkboxIconElement.hover();
    await checkAccessibility(page, tooltipPreview(page));
  });

  test("should pass accessibility tests with info message", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent info="Info has occurred" />);

    const checkboxIconElement = checkboxIcon(page);
    await checkboxIconElement.hover();
    await checkAccessibility(page, tooltipPreview(page));
  });
});

test.describe("should check Checkbox tooltip positioning prop", () => {
  (
    ["bottom", "left", "right", "top"] as CheckboxProps["tooltipPosition"][]
  ).forEach((position) => {
    test(`should render CheckboxComponent component with tooltip positioned to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box m="250px">
          <CheckboxComponent
            labelHelp="Tooltip info"
            tooltipPosition={position}
          />
        </Box>,
      );

      const checkboxIconElement = checkboxIcon(page);
      await checkboxIconElement.hover();
      const tooltipElement = tooltipPreview(page);
      await expect(tooltipElement).toHaveText("Tooltip info");
      await expect(tooltipElement).toHaveAttribute(
        "data-placement",
        `${position}`,
      );
    });
  });
});

test.describe("should check CheckboxGroup tooltip positioning prop", () => {
  (
    [
      "top",
      "bottom",
      "left",
      "right",
    ] as CheckboxGroupProps["tooltipPosition"][]
  ).forEach((position) => {
    test(`should render CheckboxGroupComponent component with tooltip positioned to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <CheckboxGroupComponent
          legend="Checkbox Legend"
          error="Something is wrong"
          tooltipPosition={position}
        />,
      );

      const checkboxIconElement = checkboxGroupIcon(page);
      await checkboxIconElement.hover();
      const tooltipElement = tooltipPreview(page);
      await expect(tooltipElement).toHaveText("Something is wrong");
      await expect(tooltipElement).toHaveAttribute(
        "data-placement",
        `${position}`,
      );
    });
  });
});

test.describe("should check accessibility for Checkbox Group component", () => {
  test("should pass accessibility tests with !@#$%^*()_+-=~[];:.,?{}&\"'<> as legend", async ({
    mount,
    page,
  }) => {
    await mount(
      <CheckboxGroupComponent legend={CHARACTERS.SPECIALCHARACTERS} />,
    );

    await checkAccessibility(page);
  });

  (["left", "right"] as CheckboxGroupProps["legendAlign"][]).forEach(
    (position) => {
      test(`should pass accessibility tests with inline legend aligned to ${position}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <CheckboxGroupComponent
            legend="CheckBox Legend"
            legendWidth={20}
            legendAlign={position}
            legendInline
          />,
        );

        await checkAccessibility(page);
      });
    },
  );

  [20, 40].forEach((width) => {
    test(`should pass accessibility tests with inline legend width set to ${width}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <CheckboxGroupComponent
          legend="CheckBox Legend"
          legendWidth={width}
          legendInline
        />,
      );

      await checkAccessibility(page);
    });
  });

  ([1, 2] as CheckboxGroupProps["legendSpacing"][]).forEach((spacing) => {
    test(`should pass accessibility tests with legendSpacing set to ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <CheckboxGroupComponent
          legend="AVeryVeryLongLegend"
          legendSpacing={spacing}
          legendWidth={10}
          legendInline
        />,
      );

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests as a required field", async ({
    mount,
    page,
  }) => {
    await mount(
      <CheckboxGroupComponent legend="Required CheckboxGroup" required />,
    );

    await checkAccessibility(page);
  });

  (
    [
      "top",
      "bottom",
      "left",
      "right",
    ] as CheckboxGroupProps["tooltipPosition"][]
  ).forEach((position) => {
    test(`should pass accessibility tests with tooltip positioned to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <CheckboxGroupComponent
          legend="Checkbox Legend"
          error="Something is wrong"
          tooltipPosition={position}
        />,
      );

      const checkboxIconElement = checkboxGroupIcon(page);
      await checkboxIconElement.hover();
      await checkAccessibility(page, tooltipPreview(page));
    });
  });
});
