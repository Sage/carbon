import { expect, test } from "@playwright/experimental-ct-react17";
import React from "react";
import {
  commonDataElementInputPreview,
  getDataElementByValue,
} from "../../../playwright/components";
import {
  simpleColor,
  simpleColorPickerComponent,
  simpleColorPickerInput,
  simpleColorDiv,
} from "../../../playwright/components/advanced-color-picker";
import simpleColorPickerLegend from "../../../playwright/components/simple-color-picker";
import { CHARACTERS, VALIDATION } from "../../../playwright/support/constants";
import {
  checkAccessibility,
  containsClass,
  getStyle,
  verifyRequiredAsteriskForLegend,
} from "../../../playwright/support/helper";
import { SimpleColorPickerProps, SimpleColorProps } from ".";
import {
  SimpleColorCustom,
  SimpleColorPickerCustom,
} from "./components.test-pw";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testPropValue = CHARACTERS.STANDARD;

const colors = [
  {
    color: "#FFFFFF",
    label: "transparent",
  },
  {
    color: "#0073C1",
    label: "blue",
  },
  {
    color: "#582C83",
    label: "purple",
  },
  {
    color: "#E96400",
    label: "orange",
  },
  {
    color: "#99ADB6",
    label: "gray",
  },
  {
    color: "#C7384F",
    label: "flush mahogany",
  },
  {
    color: "#004500",
    label: "dark green",
  },
  {
    color: "#FFB500",
    label: "yellow",
  },
  {
    color: "#335C6D",
    label: "dark blue",
  },
  {
    color: "#00DC00",
    label: "light blue",
  },
];

const indexes = Array.from({
  length: colors.length,
}).map((_, index) => index);

test("should have the expected styling when focused", async ({
  mount,
  page,
}) => {
  await mount(<SimpleColorPickerCustom />);

  await simpleColorPickerInput(page, 0).focus();

  const focusedColor = simpleColorDiv(page, 0);
  await expect(focusedColor).toHaveCSS(
    "box-shadow",
    "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset",
  );
  await expect(focusedColor).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");
});

test.describe("Check functionality for SimpleColorPicker component", () => {
  test("should render all proper colors", async ({ mount, page }) => {
    await mount(<SimpleColorPickerCustom />);

    const testColor = async (index: number) => {
      const colorInput = await simpleColorPickerInput(page, index);

      await expect(colorInput).toHaveAttribute("value", colors[index].color);
      await expect(colorInput).toHaveAttribute(
        "aria-label",
        colors[index].label,
      );
    };

    await Promise.all(colors.map((_, index) => testColor(index)));
  });

  testData.forEach((legend) => {
    test(`should render with legend set to ${legend}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleColorPickerCustom legend={legend} />);

      await expect(simpleColorPickerLegend(page)).toHaveText(legend);
    });
  });

  testData.forEach((name) => {
    test(`should render with name set to ${name}`, async ({ mount, page }) => {
      await mount(<SimpleColorPickerCustom name={name} />);

      const allInputs = await commonDataElementInputPreview(page).all();
      const allAssertions = allInputs.map((locator) =>
        expect(locator).toHaveAttribute("name", name),
      );

      await Promise.all(allAssertions);
    });
  });

  test("should move selection to the first color when right arrow is pressed from the last color", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleColorPickerCustom />);

    const lastInput = simpleColorPickerInput(page, 9);
    await lastInput.press("ArrowRight");

    const firstInput = simpleColorPickerInput(page, 0);
    await expect(firstInput).toBeChecked();
  });

  test("should move selection to the next color when right arrow is pressed", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleColorPickerCustom />);

    await simpleColorPickerInput(page, 3).press("ArrowRight");
    await expect(simpleColorPickerInput(page, 4)).toBeChecked();
  });

  test("should move selection to the last color when left arrow is pressed from the first color", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleColorPickerCustom />);

    const firstInput = simpleColorPickerInput(page, 0);
    await firstInput.press("ArrowLeft");

    const lastInput = simpleColorPickerInput(page, 9);
    await expect(lastInput).toBeChecked();
  });

  test("should move selection to the previous color when left arrow is pressed", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleColorPickerCustom />);

    await simpleColorPickerInput(page, 3).press("ArrowLeft");
    await expect(simpleColorPickerInput(page, 2)).toBeChecked();
  });

  test("should move selection to the color immediately below when down arrow is pressed", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleColorPickerCustom />);

    await simpleColorPickerInput(page, 3).press("ArrowDown");
    await expect(simpleColorPickerInput(page, 8)).toBeChecked();
  });

  test("should move selection to the color immediately above when up arrow is pressed", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleColorPickerCustom />);

    await simpleColorPickerInput(page, 8).press("ArrowUp");
    await expect(simpleColorPickerInput(page, 3)).toBeChecked();
  });

  [1, 2, 3].forEach((cellIndex) => {
    test(`should select proper cell at index ${cellIndex} when clicked`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleColorPickerCustom />);

      const selectedColor = simpleColorPickerInput(page, cellIndex);
      await selectedColor.click();
      await expect(selectedColor).toBeChecked();
    });
  });

  (
    [
      [250, "232px"],
      [450, "406px"],
    ] as [number, string][]
  ).forEach(([maxWidth, cssWidth]) => {
    test(`should render with maxWidth prop set to ${maxWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleColorPickerCustom maxWidth={maxWidth} />);

      await expect(
        simpleColorDiv(page, 0).locator("..").locator(".."),
      ).toHaveCSS("max-width", cssWidth);
    });
  });

  (
    [
      ["300", "75", 89, 33, 233],
      ["100", "60", 321, 265, 1],
    ] as [string, string, number, number, number][]
  ).forEach(([maxWidth, childWidth, bottomLess, topLess, leftLess]) => {
    test(`should render properly with childWidth prop set to ${childWidth} and maxWidth prop set to ${maxWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SimpleColorPickerCustom maxWidth={maxWidth} childWidth={childWidth} />,
      );

      const additionVal = 2;
      const colorCell = simpleColor(page, 4);
      const { top, bottom, left } = await colorCell.evaluate((element) =>
        element.getBoundingClientRect(),
      );
      await expect(bottom).toBeLessThan(bottomLess + additionVal);
      await expect(bottom).toBeGreaterThan(bottomLess);
      await expect(top).toBeLessThan(topLess + additionVal);
      await expect(top).toBeGreaterThan(topLess);
      await expect(left).toBeLessThan(leftLess + additionVal);
      await expect(left).toBeGreaterThan(leftLess);
    });
  });

  test("should render with required prop", async ({ mount, page }) => {
    await mount(<SimpleColorPickerCustom required />);

    await verifyRequiredAsteriskForLegend(page);
  });

  (
    [
      ["error", VALIDATION.ERROR],
      ["warning", VALIDATION.WARNING],
      ["info", VALIDATION.INFO],
    ] as const
  ).forEach(([type, color]) => {
    test(`should render with ${type} as a string`, async ({ mount, page }) => {
      await mount(
        <SimpleColorPickerCustom
          {...{
            [type]: "Message",
          }}
        />,
      );

      await simpleColorPickerComponent(page)
        .locator("div")
        .locator(`[data-element="${type}"]`)
        .hover();
      await expect(getDataElementByValue(page, "tooltip")).toHaveText(
        "Message",
      );
      await expect(
        simpleColorDiv(page, 0).locator("..").locator(".."),
      ).toHaveCSS("outline-color", color);
      await expect(
        await getStyle(getDataElementByValue(page, type), "color", "before"),
      ).toBe(color);
    });
  });

  (
    [
      ["error", VALIDATION.ERROR],
      ["warning", VALIDATION.WARNING],
      ["info", VALIDATION.INFO],
    ] as const
  ).forEach(([type, color]) => {
    test(`should render with ${type} as a string and validationOnLegend prop`, async ({
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

      await simpleColorPickerComponent(page)
        .locator("legend")
        .locator(`[data-element="${type}"]`)
        .hover();
      await expect(getDataElementByValue(page, "tooltip")).toHaveText(
        "Message",
      );
      await expect(
        simpleColorDiv(page, 0).locator("..").locator(".."),
      ).toHaveCSS("outline-color", color);
      await expect(
        await getStyle(getDataElementByValue(page, type), "color", "before"),
      ).toBe(color);
    });
  });

  (
    [
      ["error", VALIDATION.ERROR],
      ["warning", VALIDATION.WARNING],
      ["info", VALIDATION.INFO],
    ] as const
  ).forEach(([type, color]) => {
    test(`should render with ${type} as a boolean`, async ({ mount, page }) => {
      await mount(
        <SimpleColorPickerCustom
          {...{
            [type]: true,
          }}
        />,
      );

      await expect(
        simpleColorPickerComponent(page).locator(`[data-element="${type}"]`),
      ).not.toBeVisible();
      await expect(
        simpleColorDiv(page, 0).locator("..").locator(".."),
      ).toHaveCSS("outline-color", color);
    });
  });
});

test.describe("Check events for SimpleColorPicker component", () => {
  test("should call onChange callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback: SimpleColorPickerProps["onChange"] = () => {
      callbackCount += 1;
    };
    await mount(<SimpleColorPickerCustom onChange={callback} />);

    await simpleColorPickerInput(page, 5).click();
    await expect(callbackCount).toBe(1);
  });

  test("should call onChange callback and focus the correct item when the right arrow key is pressed", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback: SimpleColorPickerProps["onChange"] = () => {
      callbackCount += 1;
    };
    await mount(<SimpleColorPickerCustom onChange={callback} />);
    let expectedCount = 0;

    for (const index of indexes) {
      expectedCount += 1;
      const next = index < colors.length - 1 ? index + 1 : 0;
      const colorInput = simpleColorPickerInput(page, index);
      // eslint-disable-next-line no-await-in-loop
      await colorInput.press("ArrowRight");
      const nextColor = simpleColorPickerInput(page, next);
      // eslint-disable-next-line no-await-in-loop
      await expect(nextColor).toBeFocused();
      // eslint-disable-next-line no-await-in-loop
      await expect(nextColor).toHaveAttribute("value", colors[next].color);
      // eslint-disable-next-line no-await-in-loop
      await expect(callbackCount).toBe(expectedCount);
    }
  });

  test("should call onChange callback and focus the correct item when the left arrow key is pressed", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback: SimpleColorPickerProps["onChange"] = () => {
      callbackCount += 1;
    };
    await mount(<SimpleColorPickerCustom onChange={callback} />);
    let expectedCount = 0;

    for (const index of indexes) {
      expectedCount += 1;
      const next = index > 0 ? index - 1 : colors.length - 1;
      const colorInput = simpleColorPickerInput(page, index);
      // eslint-disable-next-line no-await-in-loop
      await colorInput.press("ArrowLeft");
      const nextColor = simpleColorPickerInput(page, next);
      // eslint-disable-next-line no-await-in-loop
      await expect(nextColor).toBeFocused();
      // eslint-disable-next-line no-await-in-loop
      await expect(nextColor).toHaveAttribute("value", colors[next].color);
      // eslint-disable-next-line no-await-in-loop
      await expect(callbackCount).toBe(expectedCount);
    }
  });

  [
    [9, 4],
    [8, 3],
    [7, 2],
    [6, 1],
    [5, 0],
  ].forEach(([indexPress, focusedIndex]) => {
    test(`should call onChange callback and focus the correct item when the up arrow key is pressed from the element with index ${indexPress}`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      const callback: SimpleColorPickerProps["onChange"] = () => {
        callbackCount += 1;
      };
      await mount(<SimpleColorPickerCustom onChange={callback} />);

      await simpleColorPickerInput(page, indexPress).press("ArrowUp");
      await expect(simpleColorPickerInput(page, focusedIndex)).toBeFocused();
      await expect(simpleColorPickerInput(page, focusedIndex)).toHaveAttribute(
        "value",
        colors[focusedIndex].color,
      );
      await expect(callbackCount).toBe(1);
    });
  });

  (
    [
      [0, 5],
      [1, 6],
      [2, 7],
      [3, 8],
      [4, 9],
    ] as const
  ).forEach(([indexPress, focusedIndex]) => {
    test(`should call onChange callback and focus the correct item when the down arrow key is pressed from the element with index ${indexPress}`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      const callback: SimpleColorPickerProps["onChange"] = () => {
        callbackCount += 1;
      };
      await mount(<SimpleColorPickerCustom onChange={callback} />);

      await simpleColorPickerInput(page, indexPress).press("ArrowDown");
      await expect(simpleColorPickerInput(page, focusedIndex)).toBeFocused();
      await expect(simpleColorPickerInput(page, focusedIndex)).toHaveAttribute(
        "value",
        colors[focusedIndex].color,
      );
      await expect(callbackCount).toBe(1);
    });
  });

  test("should call onBlur callback when a blur event is triggered on the component", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback: SimpleColorPickerProps["onBlur"] = () => {
      callbackCount += 1;
    };
    await mount(<SimpleColorPickerCustom onBlur={callback} />);

    const colorInput = simpleColorPickerInput(page, 5);
    await colorInput.focus();
    await page.locator("body").click({ position: { x: 0, y: 0 } });
    await expect(callbackCount).toBe(1);
  });

  test("should not call onBlur callback when a blur event is triggered on a color", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback: SimpleColorPickerProps["onBlur"] = () => {
      callbackCount += 1;
    };
    await mount(<SimpleColorPickerCustom onBlur={callback} />);

    const colorInput = simpleColorPickerInput(page, 5);
    await colorInput.focus();
    await colorInput.blur();
    await expect(callbackCount).toBe(0);
  });

  test("should not call onBlur callback when a blur event is triggered and isBlurBlocked prop is true", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback: SimpleColorPickerProps["onBlur"] = () => {
      callbackCount += 1;
    };
    await mount(<SimpleColorPickerCustom onBlur={callback} isBlurBlocked />);

    const colorInput = simpleColorPickerInput(page, 5);
    await colorInput.focus();
    await colorInput.blur();
    await expect(callbackCount).toBe(0);
  });
});

test.describe("Check functionality for SimpleColor component", () => {
  test("should render with value prop", async ({ mount, page }) => {
    await mount(<SimpleColorCustom value={colors[7].color} />);

    await expect(simpleColorPickerInput(page, 0)).toHaveAttribute(
      "value",
      colors[7].color,
    );
  });

  test("should render with name prop", async ({ mount, page }) => {
    await mount(<SimpleColorCustom name={testPropValue} />);

    await expect(simpleColorPickerInput(page, 0)).toHaveAttribute(
      "name",
      testPropValue,
    );
  });

  test("should render with className prop", async ({ mount, page }) => {
    await mount(<SimpleColorCustom className={testPropValue} />);

    await containsClass(
      simpleColorPickerInput(page, 0).locator(".."),
      testPropValue,
    );
  });

  [true, false].forEach((isChecked) => {
    test(`should render with checked as ${isChecked}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleColorCustom checked={isChecked} />);

      if (isChecked) {
        await expect(simpleColorPickerInput(page, 0)).toBeChecked();
      } else {
        await expect(simpleColorPickerInput(page, 0)).not.toBeChecked();
      }
    });
  });
});

test.describe("Check events for SimpleColor component", () => {
  test("should call onChange callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback: SimpleColorProps["onChange"] = () => {
      callbackCount += 1;
    };
    await mount(<SimpleColorCustom onChange={callback} />);

    await simpleColor(page, 1).click();
    await expect(callbackCount).toBe(1);
  });

  test("should call onBlur callback when a blur event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback: SimpleColorProps["onBlur"] = () => {
      callbackCount += 1;
    };
    await mount(<SimpleColorCustom onBlur={callback} />);

    await simpleColor(page, 1).click();
    await page.locator("*:focus").blur();
    await expect(callbackCount).toBe(1);
  });

  test("should call onMouseDown callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback: SimpleColorProps["onMouseDown"] = () => {
      callbackCount += 1;
    };
    await mount(<SimpleColorCustom onMouseDown={callback} />);

    await simpleColor(page, 1).click();
    await expect(callbackCount).toBe(1);
  });
});

test.describe("Check accessibility for SimpleColorPicker component", () => {
  test("should check accessibility for all proper colors", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleColorPickerCustom />);

    await checkAccessibility(page);
  });

  testData.forEach((legend) => {
    test(`should check accessibility with legend set to ${legend}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleColorPickerCustom legend={legend} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((name) => {
    test(`should check accessibility with name set to ${name}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleColorPickerCustom name={name} />);

      await checkAccessibility(page);
    });
  });

  [250, 450].forEach((maxWidth) => {
    test(`should check accessibility with maxWidth set to ${maxWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleColorPickerCustom maxWidth={maxWidth} />);

      await checkAccessibility(page);
    });
  });

  [
    [300, "75"],
    [100, "60"],
  ].forEach(([maxWidth, childWidth]) => {
    test(`should check accessibility with childWidth prop set to ${childWidth} and maxWidth to ${maxWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SimpleColorPickerCustom maxWidth={maxWidth} childWidth={childWidth} />,
      );

      await checkAccessibility(page);
    });
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

  test("should check accessibility with value prop", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleColorCustom value={colors[7].color} />);

    await checkAccessibility(page);
  });

  test("should check accessibility with name prop", async ({ mount, page }) => {
    await mount(<SimpleColorCustom name={testPropValue} />);

    await checkAccessibility(page);
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

  test("should check accessibility with className prop", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleColorCustom className={testPropValue} />);

    await checkAccessibility(page);
  });
});
