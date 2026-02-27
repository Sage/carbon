import React from "react";
import { test } from "../../../../playwright/helpers/base-test";

import { checkAccessibility } from "../../../../playwright/support/helper";
import { CHARACTERS } from "../../../../playwright/support/constants";

import Button from "./button.component";
import {
  ButtonDefault,
  ButtonIconAfter,
  ButtonIconBefore,
  DarkBackgroundButtonIconAfter,
  DarkBackgroundButtonIconBefore,
  PrimaryButtonDestructive,
  SecondaryButtonIconAfter,
  SecondaryButtonIconBefore,
  SecondaryButtonWhite,
  TertiaryButtonIconAfter,
  TertiaryButtonIconBefore,
} from "./components.test-pw";

test.describe("Accessibility tests for Button", () => {
  test("should pass accessibility tests for Primary button default", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonDefault>{CHARACTERS.STANDARD}</ButtonDefault>);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Primary button with icon before", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonIconBefore />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Primary button with icon after", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonIconAfter />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Primary button destructive", async ({
    mount,
    page,
  }) => {
    await mount(<PrimaryButtonDestructive />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Secondary button with icon before", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryButtonIconBefore />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Secondary button with icon after", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryButtonIconAfter />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Secondary button white variant", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryButtonWhite />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Tertiary button with icon before", async ({
    mount,
    page,
  }) => {
    await mount(<TertiaryButtonIconBefore />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Tertiary button with icon after", async ({
    mount,
    page,
  }) => {
    await mount(<TertiaryButtonIconAfter />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for gradient-white button type", async ({
    mount,
    page,
  }) => {
    await mount(
      <Button variant="gradient" variantType="secondary">
        Foo
      </Button>,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for gradient-white button with icon", async ({
    mount,
    page,
  }) => {
    await mount(
      <Button variant="gradient" variantType="secondary" iconType="home">
        Foo
      </Button>,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for gradient-grey button type", async ({
    mount,
    page,
  }) => {
    await mount(
      <Button variant="gradient" variantType="secondary">
        Foo
      </Button>,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for gradient-grey button with icon", async ({
    mount,
    page,
  }) => {
    await mount(
      <Button variant="gradient" variantType="secondary" iconType="home">
        Foo
      </Button>,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for dark background button with icon before", async ({
    mount,
    page,
  }) => {
    await mount(<DarkBackgroundButtonIconBefore />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for dark background button with icon after", async ({
    mount,
    page,
  }) => {
    await mount(<DarkBackgroundButtonIconAfter />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for icon-only button", async ({
    mount,
    page,
  }) => {
    await mount(
      <Button
        variant="default"
        variantType="primary"
        iconType="bin"
        aria-label="bin-icon"
      />,
    );
    await checkAccessibility(page);
  });
});
