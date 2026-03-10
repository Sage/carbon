import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { ButtonToggleProps } from ".";
import {
  ButtonToggleComponent,
  ButtonToggleGroupComponent,
} from "./components.test-pw";
import { buttonTogglePreview } from "../../../playwright/components/button-toggle";
import { SIZE } from "../../../playwright/support/constants";
import { checkAccessibility } from "../../../playwright/support/helper";

const helpAlignment: [string, boolean][] = [
  ["inline", true],
  ["outline", false],
];

test.describe("Accessibility tests", () => {
  test("should pass accessibility tests for default example", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Button-Toggle disabled", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent disabled />);

    await checkAccessibility(page);
  });

  (
    [
      [SIZE.SMALL, 24],
      [SIZE.MEDIUM, 32],
      [SIZE.LARGE, 40],
    ] as [ButtonToggleProps["size"], number][]
  ).forEach(([size]) => {
    test(`should pass accessibility tests for Button-Toggle ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonToggleComponent size={size}> {size}</ButtonToggleComponent>,
      );

      await checkAccessibility(page);
    });
  });

  (["add", "share", "tick"] as ButtonToggleProps["buttonIcon"][]).forEach(
    (type) => {
      test(`should pass accessibility tests for Button-Toggle with ${type} icon`, async ({
        mount,
        page,
      }) => {
        await mount(
          <ButtonToggleComponent buttonIcon={type} buttonIconSize="large">
            {" "}
            {type}
          </ButtonToggleComponent>,
        );

        await checkAccessibility(page);
      });
    },
  );
});

test.describe("Accessibility tests for group component", () => {
  test("should pass accessibility tests for default grouped example", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with second button toggle checked", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent />);

    await buttonTogglePreview(page).nth(1).click();
    await checkAccessibility(page);
  });

  [...helpAlignment].forEach(([alignment, state]) => {
    test(`should pass accessibility tests with label ${alignment} if labelInline is ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonToggleGroupComponent labelInline={state} />);

      await checkAccessibility(page);
    });
  });

  ([1, 2] as const).forEach((spacing) => {
    test(`should pass accessibility tests with labelSpacing prop set to ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonToggleGroupComponent labelInline labelSpacing={spacing} />,
      );

      await checkAccessibility(page);
    });
  });
});
