import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import { buttonDataComponent } from "../../../playwright/components/button/index";
import { ICON } from "../../../playwright/components/locators";
import { checkAccessibility } from "../../../playwright/support/helper";
import { dlsRoot, tooltipPreview } from "../../../playwright/components/index";
import { CHARACTERS } from "../../../playwright/support/constants";

import Button from "./button.component";
import {
  ButtonAsASiblingExample,
  ButtonIconAfter,
  ButtonIconBefore,
  ButtonDefault,
  DarkBackgroundButtonDisabled,
  DarkBackgroundButtonFullWidth,
  DarkBackgroundButtonIconAfter,
  DarkBackgroundButtonIconBefore,
  DarkBackgroundButtonNoWrap,
  PrimaryButtonDestructive,
  PrimaryButtonDisabled,
  PrimaryButtonFullWidth,
  PrimaryButtonNoWrap,
  SecondaryButtonDestructive,
  SecondaryButtonDisabled,
  SecondaryButtonIconAfter,
  SecondaryButtonIconBefore,
  SecondaryFullWidth,
  SecondaryNoWrap,
  SecondaryButtonWhite,
  TertiaryButtonDestructive,
  TertiaryButtonDisabled,
  TertiaryButtonFullWidth,
  TertiaryButtonIconAfter,
  TertiaryButtonIconBefore,
  TertiaryButtonNoWrap,
} from "./components.test-pw";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("Button component", () => {
  testData.forEach((label) => {
    test(`should render label using ${label} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<Button>{label}</Button>);

      await expect(buttonDataComponent(page)).toHaveText(label);
    });
  });

  testData.forEach((tooltipMessage) => {
    test(`should render tooltip message with ${tooltipMessage} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Button
          iconType="bin"
          iconTooltipMessage={tooltipMessage}
          aria-label="bin"
        />,
      );

      await page.getByRole("button").locator(ICON).hover({ force: true });
      await expect(tooltipPreview(page)).toHaveText(tooltipMessage);
      await dlsRoot(page).hover({ position: { x: 0, y: 0 } });
    });
  });
});

test("should have the expected styling when focused", async ({
  mount,
  page,
}) => {
  await mount(<Button>Foo</Button>);
  await buttonDataComponent(page).focus();
  await expect(buttonDataComponent(page)).toHaveCSS(
    "box-shadow",
    "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
  );
  await expect(buttonDataComponent(page)).toHaveCSS(
    "outline",
    "rgba(0, 0, 0, 0) solid 3px",
  );
});

test.describe("Accessibility tests for Button", () => {
  test("should pass accessibility tests for ButtonDefault example", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonDefault>{CHARACTERS.STANDARD}</ButtonDefault>);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for ButtonAsASiblingExample", async ({
    mount,
    page,
  }) => {
    await mount(
      <ButtonAsASiblingExample>{CHARACTERS.STANDARD}</ButtonAsASiblingExample>,
    );

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for ButtonIconBefore example", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonIconBefore />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for ButtonIconAfter example", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonIconAfter />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for PrimaryButtonDestructive example", async ({
    mount,
    page,
  }) => {
    await mount(<PrimaryButtonDestructive />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for PrimaryButtonDisabled example", async ({
    mount,
    page,
  }) => {
    await mount(<PrimaryButtonDisabled />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for PrimaryButtonFullWidth example", async ({
    mount,
    page,
  }) => {
    await mount(<PrimaryButtonFullWidth />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for PrimaryButtonNoWrap example", async ({
    mount,
    page,
  }) => {
    await mount(<PrimaryButtonNoWrap />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for SecondaryButtonIconAfter example", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryButtonIconAfter />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for SecondaryButtonIconBefore example", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryButtonIconBefore />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for SecondaryButtonDestructive example", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryButtonDestructive />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for SecondaryButtonDisabled example", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryButtonDisabled />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for SecondaryFullWidth example", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryFullWidth />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for SecondaryNoWrap example", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryNoWrap />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for SecondaryButtonWhite example", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryButtonWhite />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for DarkBackgroundButtonIconBefore example", async ({
    mount,
    page,
  }) => {
    await mount(<DarkBackgroundButtonIconBefore />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for DarkBackgroundButtonIconAfter example", async ({
    mount,
    page,
  }) => {
    await mount(<DarkBackgroundButtonIconAfter />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for DarkBackgroundButtonDisabled example", async ({
    mount,
    page,
  }) => {
    await mount(<DarkBackgroundButtonDisabled />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for DarkBackgroundButtonFullWidth example", async ({
    mount,
    page,
  }) => {
    await mount(<DarkBackgroundButtonFullWidth />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for DarkBackgroundButtonNoWrap example", async ({
    mount,
    page,
  }) => {
    await mount(<DarkBackgroundButtonNoWrap />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for TertiaryButtonIconBefore example", async ({
    mount,
    page,
  }) => {
    await mount(<TertiaryButtonIconBefore />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for TertiaryButtonIconAfter example", async ({
    mount,
    page,
  }) => {
    await mount(<TertiaryButtonIconAfter />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for TertiaryButtonDestructive example", async ({
    mount,
    page,
  }) => {
    await mount(<TertiaryButtonDestructive />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for TertiaryButtonDisabled example", async ({
    mount,
    page,
  }) => {
    await mount(<TertiaryButtonDisabled />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for TertiaryButtonFullWidth example", async ({
    mount,
    page,
  }) => {
    await mount(<TertiaryButtonFullWidth />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for TertiaryButtonNoWrap example", async ({
    mount,
    page,
  }) => {
    await mount(<TertiaryButtonNoWrap />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for fullWidth story example", async ({
    mount,
    page,
  }) => {
    await mount(<Button fullWidth>Foo</Button>);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for iconOnly story example", async ({
    mount,
    page,
  }) => {
    await mount(
      <Button buttonType="primary" iconType="bin" aria-label="bin-icon" />,
    );

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for noWrap story example", async ({
    mount,
    page,
  }) => {
    await mount(<Button noWrap>Foo</Button>);

    await checkAccessibility(page);
  });

  test("should pass when gradient-white buttonType is used", async ({
    mount,
    page,
  }) => {
    await mount(<Button buttonType="gradient-white">Foo</Button>);

    await checkAccessibility(page);
  });

  test("should pass when gradient-white buttonType is used and icon rendered", async ({
    mount,
    page,
  }) => {
    await mount(
      <Button buttonType="gradient-white" iconType="home">
        Foo
      </Button>,
    );

    await checkAccessibility(page);
  });

  test("should pass when gradient-grey buttonType is used", async ({
    mount,
    page,
  }) => {
    await mount(<Button buttonType="gradient-grey">Foo</Button>);

    await checkAccessibility(page);
  });

  test("should pass when gradient-grey buttonType is used and icon rendered", async ({
    mount,
    page,
  }) => {
    await mount(
      <Button buttonType="gradient-grey" iconType="home">
        Foo
      </Button>,
    );

    await checkAccessibility(page);
  });
});
