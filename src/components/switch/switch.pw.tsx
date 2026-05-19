import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { SwitchProps } from ".";
import { SwitchComponent } from "./components.test-pw";
import { switchInput } from "../../../playwright/components/switch/index";
import { checkAccessibility } from "../../../playwright/support/helper";
import { CHARACTERS, SIZE } from "../../../playwright/support/constants";

test.describe("Prop tests for Switch component", () => {
  test("should render with autoFocus prop", async ({ mount, page }) => {
    await mount(<SwitchComponent autoFocus />);

    await expect(switchInput(page)).toBeFocused();
  });
});

test.describe("Accessibility tests", () => {
  [
    CHARACTERS.STANDARD,
    CHARACTERS.DIACRITICS,
    CHARACTERS.SPECIALCHARACTERS,
  ].forEach((label) => {
    test(`check accessibility with ${label} as label`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent label={label} />);

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((boolVal) => {
    test(`check accessibility when loading prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent loading={boolVal} checked={false} />);

      await checkAccessibility(page);
    });
  });

  test("check accessibility with autoFocus prop set", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent autoFocus />);

    await checkAccessibility(page);
  });

  [true, false].forEach((boolVal) => {
    test(`check accessibility with checked set to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent checked={boolVal} />);

      await checkAccessibility(page);
    });
  });

  test("check accessibility with disabled set to true", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent disabled />);

    // Disabled UI components are exempt from WCAG colour-contrast requirements
    await checkAccessibility(page, undefined, "color-contrast");
  });

  test("check accessibility with disabled set to false", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent disabled={false} />);

    await checkAccessibility(page);
  });

  ([SIZE.SMALL, SIZE.LARGE] as SwitchProps["size"][]).forEach((size) => {
    test(`check accessibility with size set to ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent size={size} />);

      await checkAccessibility(page);
    });
  });

  [
    CHARACTERS.STANDARD,
    CHARACTERS.DIACRITICS,
    CHARACTERS.SPECIALCHARACTERS,
  ].forEach((hint) => {
    test(`check accessibility with inputHint set to ${hint}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent inputHint={hint} />);

      await checkAccessibility(page);
    });
  });

  test("check accessibility with processingLabel prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <SwitchComponent
        loading
        processingLabel="Please wait..."
        checked={false}
      />,
    );

    await checkAccessibility(page);
  });

  test("check accessibility with processingLabelBelowSwitch prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <SwitchComponent loading processingLabelBelowSwitch checked={false} />,
    );

    await checkAccessibility(page);
  });
});
