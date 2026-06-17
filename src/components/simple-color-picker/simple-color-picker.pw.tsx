import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  SimpleColorCustom,
  SimpleColorPickerCustom,
} from "./components.test-pw";

test.describe("Check accessibility for SimpleColorPicker component", () => {
  test("should check accessibility for all proper colors", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleColorPickerCustom />);

    await checkAccessibility(page);
  });

  test("should check accessibility with required prop", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleColorPickerCustom required />);

    await checkAccessibility(page);
  });

  (["error", "warning", "info"] as const).forEach((type) => {
    test(`should check accessibility with ${type} prop as a string`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SimpleColorPickerCustom
          {...{
            [type]: "Message",
          }}
        />,
      );

      await checkAccessibility(page);
    });
  });

  (["error", "warning", "info"] as const).forEach((type) => {
    test(`should check accessibility with ${type} prop as a string and validationOnLegend prop`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SimpleColorPickerCustom
          {...{
            [type]: "Message",
          }}
          validationOnLegend
        />,
      );

      await checkAccessibility(page);
    });
  });

  (["error", "warning", "info"] as const).forEach((type) => {
    test(`should check accessibility with ${type} prop as a boolean`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SimpleColorPickerCustom
          {...{
            [type]: true,
          }}
        />,
      );

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((isChecked) => {
    test(`should check accessibility with checked prop set to ${isChecked}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleColorCustom checked={isChecked} />);

      await checkAccessibility(page);
    });
  });
});
