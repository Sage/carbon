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
} from "../../../playwright/components/popover-container";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
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
  PopoverContainerFocusOrder,
  WithRadioButtons,
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

  (
    [
      ["left", 131, 670, 560, 345],
      ["right", 131, 345, 560, 670],
    ] as [PopoverContainerProps["position"], number, number, number, number][]
  ).forEach(([position, top, right, bottom, left]) => {
    test(`when position prop is ${position}, component should have correct absolute positioning`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box display="flex" justifyContent="center">
          <PopoverContainerComponent position={position} />
        </Box>,
      );

      const popoverContainerContentElement = popoverContainerContent(page);

      await expect(popoverContainerContentElement).toHaveCSS(
        "position",
        "absolute",
      );

      await assertCssValueIsApproximately(
        popoverContainerContentElement,
        "top",
        top,
      );

      await assertCssValueIsApproximately(
        popoverContainerContentElement,
        "right",
        right,
      );

      await assertCssValueIsApproximately(
        popoverContainerContentElement,
        "bottom",
        bottom,
      );

      await assertCssValueIsApproximately(
        popoverContainerContentElement,
        "left",
        left,
      );
    });
  });

  (
    [
      ["left", 121, 685, 572, 335],
      ["right", 121, 335, 572, 685],
    ] as [PopoverContainerProps["position"], number, number, number, number][]
  ).forEach(([position, top, right, bottom, left]) => {
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
        </Box>,
      );
      const popoverContainerContentElement = popoverContainerContent(page);

      await expect(popoverContainerContentElement).toHaveCSS(
        "position",
        "absolute",
      );

      await assertCssValueIsApproximately(
        popoverContainerContentElement,
        "top",
        top,
      );

      await assertCssValueIsApproximately(
        popoverContainerContentElement,
        "right",
        right,
      );

      await assertCssValueIsApproximately(
        popoverContainerContentElement,
        "bottom",
        bottom,
      );

      await assertCssValueIsApproximately(
        popoverContainerContentElement,
        "left",
        left,
      );
    });
  });

  test("should render with ariaDescribedBy", async ({ mount, page }) => {
    await mount(<PopoverContainerComponent ariaDescribedBy={testString} />);

    await expect(popoverContainerContent(page)).toHaveAttribute(
      "aria-describedby",
      testString,
    );
  });

  test("should render with openButtonAriaLabel", async ({ mount, page }) => {
    await mount(<PopoverContainerComponent openButtonAriaLabel={testString} />);

    await expect(popoverSettingsIcon(page)).toHaveAttribute(
      "aria-label",
      testString,
    );
  });

  test("should render with closeButtonAriaLabel", async ({ mount, page }) => {
    await mount(
      <PopoverContainerComponent closeButtonAriaLabel={testString} />,
    );

    await expect(popoverCloseIcon(page)).toHaveAttribute(
      "aria-label",
      testString,
    );
  });

  test("should render with containerAriaLabel", async ({ mount, page }) => {
    await mount(<PopoverContainerComponent containerAriaLabel={testString} />);

    const popoverContainerContentElement = popoverContainerContent(page);

    await expect(popoverContainerContentElement).toHaveAttribute(
      "aria-label",
      testString,
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

  (
    [
      [true, 102, 178],
      [false, 132, 208],
    ] as const
  ).forEach(([coverButton, yAndTopValueMin, bottomValueMin]) => {
    test(`should render with shouldCoverButton prop set to ${coverButton}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box height="330px">
          <PopoverContainerComponentCoverButton
            shouldCoverButton={coverButton}
          />
        </Box>,
      );

      const popoverContainerContentElement = popoverContainerContent(page);
      await expect(popoverContainerContentElement).toBeInViewport();

      const positionTop = await getTopValue(popoverContainerContentElement);
      const positionBottom = await getBottomValue(
        popoverContainerContentElement,
      );
      const positionY = await getYValue(popoverContainerContentElement);

      expect(positionBottom).toBeLessThan(bottomValueMin);
      expect(positionTop).toBeLessThan(yAndTopValueMin);
      expect(positionY).toBeLessThan(yAndTopValueMin);
    });
  });

  keysToTrigger.forEach((key) => {
    test(`should open using ${key} keyboard key`, async ({ mount, page }) => {
      await mount(
        <PopoverContainer title="String is awesome">Contents</PopoverContainer>,
      );

      const popoverSettingsIconElement = popoverSettingsIcon(page);
      await popoverSettingsIconElement.press(key);

      await expect(popoverContainerContent(page)).toBeVisible();
    });
  });

  keysToTrigger.forEach((key) => {
    test(`should close using ${key} keyboard key`, async ({ mount, page }) => {
      await mount(
        <PopoverContainer title="String is awesome">Contents</PopoverContainer>,
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
      <PopoverContainer title="String is awesome">Contents</PopoverContainer>,
    );

    const openButton = page.getByRole("button", { name: "String is awesome" });
    await openButton.click();
    const popoverContainer = page.getByRole("dialog", {
      name: "String is awesome",
    });
    await popoverContainer.press("Escape");

    await expect(popoverContainer).toBeHidden();
  });

  test("should not close when an option is selected from a Select component inside", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverContainerWithSelect />);

    const openButton = page.getByRole("button", { name: "open" });
    await openButton.click();
    const popoverContainer = page.getByRole("dialog", {
      name: "select example",
    });
    const select = page.getByText("Please Select...", { exact: true });
    await select.click();
    const greenOption = page.getByRole("option", { name: "green" });
    await greenOption.click();

    await expect(popoverContainer).toBeVisible();
  });

  test("should not close when the Escape key is pressed and the Select List is open", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverContainerWithSelect />);

    const openButton = page.getByRole("button", { name: "open" });
    await openButton.click();
    const popoverContainer = page.getByRole("dialog", {
      name: "select example",
    });
    const select = page.getByText("Please Select...", { exact: true });
    await select.click();
    await select.press("Escape");

    await expect(popoverContainer).toBeVisible();
  });

  test("should close when the Escape key is pressed with focus on the Select component", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverContainerWithSelect />);

    const openButton = page.getByRole("button", { name: "open" });
    await openButton.click();
    const popoverContainer = page.getByRole("dialog", {
      name: "select example",
    });
    const select = page.getByText("Please Select...", { exact: true });
    await select.focus();
    await popoverContainer.press("Escape");

    await expect(popoverContainer).toBeHidden();
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
        />,
      );

      const popoverSettingsIconElement = popoverSettingsIcon(page);
      await popoverSettingsIconElement.click();

      expect(callbackCount).toBe(1);
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
          />,
        );

        const popoverSettingsIconElement = popoverSettingsIcon(page);
        await popoverSettingsIconElement.press(key);

        expect(callbackCount).toBe(1);
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
        />,
      );

      const popoverCloseIconElement = popoverCloseIcon(page);
      await popoverCloseIconElement.click();

      expect(callbackCount).toBe(1);
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
          />,
        );

        const popoverCloseIconElement = popoverCloseIcon(page);
        await popoverCloseIconElement.press(key);

        expect(callbackCount).toBe(1);
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
        />,
      );

      const popoverContainerElement = popoverContainerComponent(page);
      await popoverContainerElement.press("Escape");

      expect(callbackCount).toBe(1);
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
        />,
      );

      await page.locator("body").click();

      expect(callbackCount).toBe(1);
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
        />,
      );

      await page.locator("body").click();

      expect(callbackCount).toBe(0);
    });

    test("should focus the next element after the open button when user tabs and last element in the container is focused", async ({
      mount,
      page,
    }) => {
      await mount(<PopoverContainerFocusOrder />);

      const childButton = page.getByText("Inside container");
      const siblingButton = page.getByText("After open button");
      const container = popoverContainerContent(page);

      await childButton.focus();
      await expect(childButton).toBeFocused();
      await childButton.press("Tab");
      await expect(siblingButton).toBeFocused();
      await expect(container).not.toBeVisible();
    });

    test("should focus the open button element when user back tabs and first element in the container is focused", async ({
      mount,
      page,
    }) => {
      await mount(<PopoverContainerFocusOrder />);

      const closeButton = popoverCloseIcon(page);
      const openButton = popoverSettingsIcon(page);
      const container = popoverContainerContent(page);

      await closeButton.focus();
      await expect(closeButton).toBeFocused();
      await closeButton.press("Shift+Tab");
      await expect(openButton).toBeFocused();
      await expect(container).not.toBeVisible();
    });
  });

  test("should trap focus when user is tabbing and the container covers the trigger button", async ({
    mount,
    page,
  }) => {
    await mount(
      <CoverButton>
        <button type="button">First</button>
        <button type="button">Second</button>
        <button type="button">Third</button>
      </CoverButton>,
    );

    const openButton = popoverSettingsIcon(page);
    const container = popoverContainerContent(page);
    const closeButton = popoverCloseIcon(page);
    const first = page.getByText("First");
    const second = page.getByText("Second");
    const third = page.getByText("Third");

    await openButton.click();
    await expect(container).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(closeButton).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(first).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(second).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(third).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(closeButton).toBeFocused();
  });

  test("should trap focus when user is shift + tabbing and the container covers the trigger button", async ({
    mount,
    page,
  }) => {
    await mount(
      <CoverButton>
        <button type="button">First</button>
        <button type="button">Second</button>
        <button type="button">Third</button>
      </CoverButton>,
    );

    const openButton = popoverSettingsIcon(page);
    const container = popoverContainerContent(page);
    const closeButton = popoverCloseIcon(page);
    const first = page.getByText("First");
    const second = page.getByText("Second");
    const third = page.getByText("Third");

    await openButton.click();
    await expect(container).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(third).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(second).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(first).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(closeButton).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(third).toBeFocused();
  });

  test("should focus the next focusable element outside of the container once finished keyboard navigating through the container's content", async ({
    mount,
    page,
  }) => {
    await mount(<WithRadioButtons />);

    const openButton = page.getByRole("button", { name: "open" });
    const container = popoverContainerContent(page);
    const additionalButton = page.getByRole("button", { name: "foo" });

    await openButton.click();
    await page.keyboard.press("Tab"); // focus on first radio button
    await page.keyboard.press("Tab"); // focus on close icon
    await page.keyboard.press("Tab"); // focus outside of container and on to additional button

    await expect(container).not.toBeVisible();
    await expect(additionalButton).toBeFocused();
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
        expect(getComponent(page, "pill").nth(index)).toBeVisible(),
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
        "8px",
      );
    });
  });
});
