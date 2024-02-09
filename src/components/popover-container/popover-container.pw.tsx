import { expect, test } from "@playwright/experimental-ct-react17";
import React from "react";
import { Locator } from "@playwright/test";
import Box from "../box";
import {
  getComponent,
  getDataElementByValue,
} from "../../../playwright/components";
import {
  popoverCloseIcon,
  popoverContainerComponent,
  popoverContainerContent,
  popoverContainerTitle,
  popoverSettingsIcon,
  selectListText,
  selectText,
} from "../../../playwright/components/popover-container";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
  waitForAnimationEnd,
} from "../../../playwright/support/helper";
import PopoverContainer, { PopoverContainerProps } from "../popover-container";
import {
  PopoverContainerComponent,
  PopoverContainerWithSelect,
  Default,
  Title,
  Position,
  CoverButton,
  RenderProps,
  Controlled,
  Complex,
  Filter,
  WithRenderOpenButtonComponent,
  WithRenderCloseButtonComponent,
  PopoverContainerComponentCoverButton,
} from "../popover-container/components.test-pw";
import Portrait from "../portrait";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testString = "test-string";
const keysToTrigger = ["Space", "Enter"];

test.describe("Check props of Popover Container component", () => {
  testData.forEach((title) => {
    test(`should render title using ${title} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<PopoverContainerComponent title={title} />);

      await expect(popoverContainerTitle(page)).toHaveText(title);
    });
  });

  [true, false].forEach((openValue) => {
    test(`should render when open prop is set to ${openValue}`, async ({
      mount,
      page,
    }) => {
      await mount(<PopoverContainerComponent open={openValue} />);

      const popoverContainerContentElement = popoverContainerContent(page);

      if (openValue) {
        await expect(popoverContainerContentElement).toBeVisible();
      } else {
        await expect(popoverContainerContentElement).not.toBeVisible();
      }
    });
  });

  ([
    ["left", 24, 0, -76.5, -324],
    ["right", 24, -324, -76.5, 0],
  ] as [
    PopoverContainerProps["position"],
    number,
    number,
    number,
    number
  ][]).forEach(([position, top, right, bottom, left]) => {
    test(`when position prop is ${position}, component should have correct absolute positioning`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box display="flex" justifyContent="center">
          <PopoverContainerComponent position={position} />
        </Box>
      );

      const popoverContainerContentElement = popoverContainerContent(page);

      await expect(popoverContainerContentElement).toHaveCSS(
        "position",
        "absolute"
      );

      await assertCssValueIsApproximately(
        popoverContainerContentElement,
        "top",
        top
      );

      await assertCssValueIsApproximately(
        popoverContainerContentElement,
        "right",
        right
      );

      await assertCssValueIsApproximately(
        popoverContainerContentElement,
        "bottom",
        bottom
      );

      await assertCssValueIsApproximately(
        popoverContainerContentElement,
        "left",
        left
      );
    });
  });

  ([
    ["left", 0, 0, -76.5, -348],
    ["right", 0, -348, -76.5, 0],
  ] as [
    PopoverContainerProps["position"],
    number,
    number,
    number,
    number
  ][]).forEach(([position, top, right, bottom, left]) => {
    test(`when position prop set to ${position} and a custom open component is used, expected absolute positioning is applied`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box display="flex" justifyContent="center">
          <PopoverContainerComponent
            position={position}
            renderOpenComponent={({
              onClick,
            }: {
              onClick: (ev: React.MouseEvent<HTMLElement>) => void;
            }) => <Portrait onClick={onClick} />}
          />
        </Box>
      );
      const popoverContainerContentElement = popoverContainerContent(page);

      await expect(popoverContainerContentElement).toHaveCSS(
        "position",
        "absolute"
      );

      await assertCssValueIsApproximately(
        popoverContainerContentElement,
        "top",
        top
      );

      await assertCssValueIsApproximately(
        popoverContainerContentElement,
        "right",
        right
      );

      await assertCssValueIsApproximately(
        popoverContainerContentElement,
        "bottom",
        bottom
      );

      await assertCssValueIsApproximately(
        popoverContainerContentElement,
        "left",
        left
      );
    });
  });

  test("should render with ariaDescribedBy", async ({ mount, page }) => {
    await mount(<PopoverContainerComponent ariaDescribedBy={testString} />);

    await expect(popoverContainerContent(page)).toHaveAttribute(
      "aria-describedby",
      testString
    );
  });

  test("should render with openButtonAriaLabel", async ({ mount, page }) => {
    await mount(<PopoverContainerComponent openButtonAriaLabel={testString} />);

    await expect(popoverSettingsIcon(page)).toHaveAttribute(
      "aria-label",
      testString
    );
  });

  test("should render with closeButtonAriaLabel", async ({ mount, page }) => {
    await mount(
      <PopoverContainerComponent closeButtonAriaLabel={testString} />
    );

    await expect(popoverCloseIcon(page)).toHaveAttribute(
      "aria-label",
      testString
    );
  });

  test("should render with containerAriaLabel", async ({ mount, page }) => {
    await mount(<PopoverContainerComponent containerAriaLabel={testString} />);

    const popoverContainerContentElement = popoverContainerContent(page);

    await expect(popoverContainerContentElement).toHaveAttribute(
      "aria-label",
      testString
    );
  });

  test("should render with renderOpenComponent", async ({ mount, page }) => {
    await mount(<WithRenderOpenButtonComponent />);

    const buttonComponent = page.getByText("Test");

    await expect(buttonComponent).toBeVisible();

    const filterNewButton = getDataElementByValue(page, "filter_new");

    await expect(filterNewButton).toBeVisible();

    const popoverContainerContentElement = popoverContainerContent(page);

    await expect(popoverContainerContentElement).not.toBeVisible();
  });

  test("should render with renderCloseComponent", async ({ mount, page }) => {
    await mount(<WithRenderCloseButtonComponent />);

    const buttonComponent = page.getByText("Test");

    await expect(buttonComponent).toBeVisible();

    const popoverContainerContentElement = popoverContainerContent(page);

    await expect(popoverContainerContentElement).toBeVisible();
  });

  const getBottomValue = (locator: Locator) =>
    locator.evaluate((element) => element.getBoundingClientRect().bottom);

  const getTopValue = (locator: Locator) =>
    locator.evaluate((element) => element.getBoundingClientRect().top);

  const getYValue = (locator: Locator) =>
    locator.evaluate((element) => element.getBoundingClientRect().y);

  ([
    [true, 102, 178],
    [false, 126, 202],
  ] as const).forEach(([coverButton, yAndTopValueMin, bottomValueMin]) => {
    test(`should render with shouldCoverButton prop set to ${coverButton}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box height="330px">
          <PopoverContainerComponentCoverButton
            shouldCoverButton={coverButton}
          />
        </Box>
      );

      const popoverContainerContentElement = popoverContainerContent(page);
      await expect(popoverContainerContentElement).toBeInViewport();

      const positionTop = await getTopValue(popoverContainerContentElement);
      const positionBottom = await getBottomValue(
        popoverContainerContentElement
      );
      const positionY = await getYValue(popoverContainerContentElement);

      await expect(positionBottom).toBeLessThan(bottomValueMin);
      await expect(positionTop).toBeLessThan(yAndTopValueMin);
      await expect(positionY).toBeLessThan(yAndTopValueMin);
    });
  });

  keysToTrigger.forEach((key) => {
    test(`should open using ${key} keyboard key`, async ({ mount, page }) => {
      await mount(
        <PopoverContainer title="String is awesome">Contents</PopoverContainer>
      );

      const popoverSettingsIconElement = popoverSettingsIcon(page);
      await popoverSettingsIconElement.press(key);

      await expect(popoverContainerContent(page)).toBeVisible();
    });
  });

  keysToTrigger.forEach((key) => {
    test(`should close using ${key} keyboard key`, async ({ mount, page }) => {
      await mount(
        <PopoverContainer title="String is awesome">Contents</PopoverContainer>
      );

      const popoverSettingsIconElement = popoverSettingsIcon(page);
      await popoverSettingsIconElement.click();
      const popoverCloseIconElement = popoverCloseIcon(page);
      await popoverCloseIconElement.press(key);

      await expect(popoverContainerContent(page)).not.toBeVisible();
    });
  });

  test("should close using escape keyboard key", async ({ mount, page }) => {
    await mount(
      <PopoverContainer title="String is awesome">Contents</PopoverContainer>
    );

    const popoverSettingsIconElement = popoverSettingsIcon(page);
    await popoverSettingsIconElement.click();
    const popoverContainerContentElement = popoverContainerContent(page);
    await popoverContainerContentElement.press("Escape");

    await expect(popoverContainerContentElement).not.toBeVisible();
  });

  test("should not close when an option is selected from Select component inside", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverContainerWithSelect />);

    await popoverSettingsIcon(page).click();
    await selectText(page).click();
    await selectListText(page, "green").click();

    await expect(popoverContainerContent(page)).toBeVisible();
  });

  // Due to a bug in Playwright whereby the Escape key fires a keyup event before the keydown event.
  // This test is currently failing because the Select List closes on an Esc keyup event but the Popover-Container listens for a keydown event.
  // The fix for this bug has been released in Playwright v1.40.0.
  // FE-6349
  // https://github.com/microsoft/playwright/pull/27711
  test.skip("should not close when the escape key is pressed and the Select List is open", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverContainerWithSelect />);

    await popoverSettingsIcon(page).click();
    const selectTextElement = selectText(page);
    await selectTextElement.click();
    const selectListElement = selectListText(page, "red");
    await waitForAnimationEnd(selectListElement);
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await popoverContainerComponent(page).press("Escape");

    await expect(selectListText(page, "green")).not.toBeVisible();
    await expect(popoverContainerContent(page)).toBeVisible();
  });

  test("should close when the escape key is pressed with focus on the Select component", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverContainerWithSelect />);

    await popoverSettingsIcon(page).click();
    const selectTextElement = selectText(page);
    await selectTextElement.click();
    await selectTextElement.press("Escape");
    const popoverContainerContentElement = popoverContainerContent(page);

    await expect(popoverContainerContentElement).not.toBeVisible();
  });
});

test.describe("Event tests", () => {
  test("should call onOpen callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <PopoverContainer
        onOpen={() => {
          callbackCount += 1;
        }}
      />
    );

    const popoverSettingsIconElement = popoverSettingsIcon(page);
    await popoverSettingsIconElement.click();

    await expect(callbackCount).toBe(1);
  });

  keysToTrigger.forEach((key) => {
    test(`should call onOpen callback when a keyboard event is triggered by ${key} key`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <PopoverContainer
          onOpen={() => {
            callbackCount += 1;
          }}
        />
      );

      const popoverSettingsIconElement = popoverSettingsIcon(page);
      await popoverSettingsIconElement.press(key);

      await expect(callbackCount).toBe(1);
    });
  });

  test("should call onClose callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <PopoverContainerComponent
        onClose={() => {
          callbackCount += 1;
        }}
        open
      />
    );

    const popoverCloseIconElement = popoverCloseIcon(page);
    await popoverCloseIconElement.click();

    await expect(callbackCount).toBe(1);
  });

  keysToTrigger.forEach((key) => {
    test(`should call onClose callback when a keyboard event is triggered by ${key} key`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <PopoverContainerComponent
          onClose={() => {
            callbackCount += 1;
          }}
          open
        />
      );

      const popoverCloseIconElement = popoverCloseIcon(page);
      await popoverCloseIconElement.press(key);

      await expect(callbackCount).toBe(1);
    });
  });

  test("should call onClose callback when the escape key is pressed", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <PopoverContainerComponent
        onClose={() => {
          callbackCount += 1;
        }}
        open
      />
    );

    const popoverContainerElement = popoverContainerComponent(page);
    await popoverContainerElement.press("Escape");

    await expect(callbackCount).toBe(1);
  });

  test("should call onClose callback when a click event is triggered outside the container", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <PopoverContainerComponent
        onClose={() => {
          callbackCount += 1;
        }}
        open
      />
    );

    await page.locator("body").click();

    await expect(callbackCount).toBe(1);
  });

  test("should not call onClose callback when a click event is triggered outside the container and the container is closed", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <PopoverContainerComponent
        onClose={() => {
          callbackCount += 1;
        }}
        open={false}
      />
    );

    await page.locator("body").click();

    await expect(callbackCount).toBe(0);
  });
});

test.describe("Accessibility tests", () => {
  test("should check accessibility for Default example", async ({
    mount,
    page,
  }) => {
    await mount(<Default title="Planes, Trains and Automobiles" open />);

    await checkAccessibility(page);
  });

  test("should check accessibility for Title example", async ({
    mount,
    page,
  }) => {
    await mount(<Title />);

    const popoverSettingsIconElement = popoverSettingsIcon(page);
    await popoverSettingsIconElement.click();

    await checkAccessibility(page);
  });

  test("should check accessibility for Position example", async ({
    mount,
    page,
  }) => {
    await mount(<Position />);

    const popoverSettingsIconElement = popoverSettingsIcon(page);
    await popoverSettingsIconElement.click();

    await checkAccessibility(page);
  });

  test("should check accessibility for CoverButton example", async ({
    mount,
    page,
  }) => {
    await mount(<CoverButton />);

    const popoverSettingsIconElement = popoverSettingsIcon(page);
    await popoverSettingsIconElement.click();

    await checkAccessibility(page);
  });

  test("should check accessibility for RenderProps example", async ({
    mount,
    page,
  }) => {
    await mount(<RenderProps />);

    const popoverSettingsIconElement = popoverSettingsIcon(page);
    await popoverSettingsIconElement.click();

    await checkAccessibility(page);
  });

  test("should check accessibility for Controlled example", async ({
    mount,
    page,
  }) => {
    await mount(<Controlled />);

    const popoverSettingsIconElement = popoverSettingsIcon(page);
    await popoverSettingsIconElement.click();

    await checkAccessibility(page);
  });

  test("should check accessibility for Complex example", async ({
    mount,
    page,
  }) => {
    await mount(<Complex />);

    const popoverSettingsIconElement = popoverSettingsIcon(page);
    await popoverSettingsIconElement.click();

    await checkAccessibility(page);
  });

  test("should check accessibility for Filter example", async ({
    mount,
    page,
  }) => {
    await mount(<Filter />);

    const popoverSettingsIconElement = popoverSettingsIcon(page);
    await popoverSettingsIconElement.click();

    await checkAccessibility(page);
  });

  test("should check accessibility for Filter example with filter button clicked", async ({
    mount,
    page,
  }) => {
    await mount(<Filter />);

    const popoverSettingsIconElement = popoverSettingsIcon(page);
    await popoverSettingsIconElement.click();
    const checkboxElementOne = page.locator(`[role="checkbox"]`).nth(0);
    const checkboxElementTwo = page.locator(`[role="checkbox"]`).nth(1);
    const checkboxElementThree = page.locator(`[role="checkbox"]`).nth(2);

    await checkboxElementOne.check();
    await checkboxElementTwo.check();
    await checkboxElementThree.check();
    const mainTextElement = getDataElementByValue(page, "main-text").nth(1);
    await mainTextElement.click();

    const assertions = [0, 1, 2].map((index) =>
      expect(getComponent(page, "pill").nth(index)).toBeVisible()
    );
    await Promise.all(assertions);

    await checkAccessibility(page);
  });
});

test.describe("Border radius", () => {
  test("should render with the expected border radius styling", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverContainerComponent title="Foo" open />);

    const popoverContainerContentElement = popoverContainerContent(page);

    await expect(popoverContainerContentElement).toHaveCSS(
      "border-radius",
      "8px"
    );
  });
});
