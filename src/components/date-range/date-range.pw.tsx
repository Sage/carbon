import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import {
  getDataElementByValue,
  tooltipPreview,
} from "../../../playwright/components";
import { CHARACTERS } from "../../../playwright/support/constants";
import { checkAccessibility } from "../../../playwright/support/helper";
import { DateRangeCustom, DateRangeNewValidation } from "./components.test-pw";
import { DateRangeProps } from "./date-range.component";

const testText = "test_playwright";
const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS] as const;

test.describe("Accessibility tests for Date Range", () => {
  testData.forEach((startLabel) => {
    test(`should check accessibility with startLabel rendered as ${startLabel}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom startLabel={startLabel} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((endLabel) => {
    test(`should check accessibility with endLabel rendered as ${endLabel}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom endLabel={endLabel} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((startError) => {
    test(`should check accessibility with startError as string rendered as ${startError}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom startError={startError} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((endError) => {
    test(`should check accessibility with endError as string rendered as ${endError}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom endError={endError} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((startWarning) => {
    test(`should check accessibility with startWarning as string rendered as ${startWarning}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom startWarning={startWarning} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((endWarning) => {
    test(`should check accessibility with endWarning as string rendered as ${endWarning}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom endWarning={endWarning} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((startInfo) => {
    test(`should check accessibility with startInfo as string rendered as ${startInfo}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom startInfo={startInfo} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((endInfo) => {
    test(`should check accessibility with endInfo as string rendered as ${endInfo}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom endInfo={endInfo} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((error) => {
    test(`should check accessibility with validationOnLabel rendered with error state as ${error}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateRangeCustom
          startError={error}
          endError={error}
          validationOnLabel
        />,
      );

      await checkAccessibility(page);
    });
  });

  testData.forEach((warning) => {
    test(`should check accessibility with validationOnLabel rendered with warning state as ${warning}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateRangeCustom
          startWarning={warning}
          endWarning={warning}
          validationOnLabel
        />,
      );

      await checkAccessibility(page);
    });
  });

  testData.forEach((info) => {
    test(`should check accessibility with validationOnLabel rendered with info state as ${info}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateRangeCustom startInfo={info} endInfo={info} validationOnLabel />,
      );

      await checkAccessibility(page);
    });
  });

  (
    ["top", "bottom", "left", "right"] as DateRangeProps["tooltipPosition"][]
  ).forEach((position) => {
    test(`should check accessibility with tooltipPosition set to ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateRangeCustom
          m={9}
          tooltipPosition={position}
          startError={testText}
        />,
      );
      const errorIconElement = getDataElementByValue(page, "error");
      await errorIconElement.hover();

      await checkAccessibility(page, tooltipPreview(page));

      await page.hover("body"); // hover on body to close the tooltip
    });
  });

  test("should check accessibility with startError as a boolean", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCustom startError />);

    await checkAccessibility(page);
  });

  test("should check accessibility with endError as a boolean", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCustom endError />);

    await checkAccessibility(page);
  });

  test("should check accessibility with startWarning as a boolean", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCustom startWarning />);

    await checkAccessibility(page);
  });

  test("should check accessibility with endWarning as a boolean", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCustom endWarning />);

    await checkAccessibility(page);
  });

  test("should check accessibility with startInfo as a boolean", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCustom startInfo />);

    await checkAccessibility(page);
  });

  test("should check accessibility with endInfo as a boolean", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCustom endInfo />);

    await checkAccessibility(page);
  });

  ([true, false] as const).forEach((boolean) => {
    test(`should check accessibility with labelsInline prop set to ${boolean}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom labelsInline={boolean} />);

      await checkAccessibility(page);
    });
  });

  test("should check accessibility with startDateProps prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <DateRangeCustom
        startDateProps={{
          disabled: true,
        }}
      />,
    );

    await checkAccessibility(page);
  });

  test("should check accessibility with endDateProps prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <DateRangeCustom
        endDateProps={{
          disabled: true,
        }}
      />,
    );

    await checkAccessibility(page);
  });

  test("should check accessibility with new validation", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeNewValidation />);

    await checkAccessibility(page);
  });
});
