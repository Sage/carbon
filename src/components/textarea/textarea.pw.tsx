import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import {
  getDataElementByValue,
  getElement,
  visuallyHiddenCharacterCount,
} from "../../../playwright/components";
import { textareaChildren } from "../../../playwright/components/textarea";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  AutoFocusExample,
  CharacterLimitExample,
  CharacterLimitExampleWithButton,
  CustomWidthExample,
  Default,
  DisabledExample,
  ExpandableExample,
  FieldHelpExample,
  InScrollableContainer,
  LabelAlignExample,
  LabelHelpExample,
  LabelInlineExample,
  MaxWidthExample,
  NewDesignValidationExample,
  ReadOnlyExample,
  RequiredExample,
  TextareaComponent,
  ValidationBooleanExample,
  ValidationLabelExample,
  ValidationLabelPositionExample,
  ValidationStringExample,
  ValidationStringPositionExample,
} from "./components.test-pw";

test.describe("Props tests for Textarea component", () => {
  (
    [
      ["flex", 399],
      ["flex", 400],
      ["block", 401],
    ] as const
  ).forEach(([displayValue, breakpoint]) => {
    test(`should check label alignment is ${displayValue} with adaptiveLabelBreakpoint ${breakpoint} and viewport 400`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({
        width: 400,
        height: 300,
      });
      await mount(<TextareaComponent adaptiveLabelBreakpoint={breakpoint} />);

      const labelParentParentElement = getDataElementByValue(page, "label")
        .locator("..")
        .locator("..");

      await expect(labelParentParentElement).toHaveCSS("display", displayValue);
    });
  });
});

test(`should verify expandable Textarea shrinks back to original height when lines are removed`, async ({
  mount,
  page,
}) => {
  await mount(<TextareaComponent expandable />);

  const textareaChildrenElement = textareaChildren(page);
  await textareaChildrenElement.press("t");
  await textareaChildrenElement.press("Enter");
  await textareaChildrenElement.press("e");
  await textareaChildrenElement.press("Enter");
  await textareaChildrenElement.press("s");
  await textareaChildrenElement.press("Enter");
  await textareaChildrenElement.press("t");

  await expect(textareaChildrenElement).toHaveCSS("height", "100px");

  await textareaChildrenElement.press("Backspace");
  await textareaChildrenElement.press("Backspace");

  await expect(textareaChildrenElement).toHaveCSS("height", "79px");

  await textareaChildrenElement.press("Backspace");
  await textareaChildrenElement.press("Backspace");

  await expect(textareaChildrenElement).toHaveCSS("height", "79px");
});

test.describe("Event tests for Textarea component", () => {
  test("should call onClick callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextareaComponent
        onClick={() => {
          callbackCount += 1;
        }}
      />,
    );

    const textareaChildrenElement = textareaChildren(page);
    await textareaChildrenElement.click();

    expect(callbackCount).toEqual(1);
  });

  test("should call onMouseDown callback when a mousedown event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextareaComponent
        onMouseDown={() => {
          callbackCount += 1;
        }}
      />,
    );

    const textareaChildrenElement = textareaChildren(page);
    await textareaChildrenElement.dispatchEvent("mousedown");

    expect(callbackCount).toEqual(1);
  });

  const keysToTrigger = ["Enter", "Space"];

  keysToTrigger.forEach((key) => {
    test(`should call onKeyDown callback when ${key} key is triggered`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <TextareaComponent
          onKeyDown={() => {
            callbackCount += 1;
          }}
        />,
      );

      const textareaChildrenElement = textareaChildren(page);
      await textareaChildrenElement.focus();
      await textareaChildrenElement.press(key);

      expect(callbackCount).toEqual(1);
    });
  });
});

test.describe("Accessibility tests for Textarea component", () => {
  test("should pass accessibility tests for Textarea default Example", async ({
    mount,
    page,
  }) => {
    await mount(<Default label="accessibility label" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea AutoFocusExample", async ({
    mount,
    page,
  }) => {
    await mount(<AutoFocusExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea CharacterLimitExample", async ({
    mount,
    page,
  }) => {
    await mount(<CharacterLimitExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea CustomWidthExample", async ({
    mount,
    page,
  }) => {
    await mount(<CustomWidthExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea DisabledExample", async ({
    mount,
    page,
  }) => {
    await mount(<DisabledExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea ExpandableExample", async ({
    mount,
    page,
  }) => {
    await mount(<ExpandableExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea FieldHelpExample", async ({
    mount,
    page,
  }) => {
    await mount(<FieldHelpExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea LabelAlignExample", async ({
    mount,
    page,
  }) => {
    await mount(<LabelAlignExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea LabelHelpExample", async ({
    mount,
    page,
  }) => {
    await mount(<LabelHelpExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea LabelInlineExample", async ({
    mount,
    page,
  }) => {
    await mount(<LabelInlineExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea MaxWidthExample", async ({
    mount,
    page,
  }) => {
    await mount(<MaxWidthExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea NewDesignValidationExample", async ({
    mount,
    page,
  }) => {
    await mount(<NewDesignValidationExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea ReadOnlyExample", async ({
    mount,
    page,
  }) => {
    await mount(<ReadOnlyExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea RequiredExample", async ({
    mount,
    page,
  }) => {
    await mount(<RequiredExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea ValidationBooleanExample", async ({
    mount,
    page,
  }) => {
    await mount(<ValidationBooleanExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea ValidationLabelPositionExample", async ({
    mount,
    page,
  }) => {
    await mount(<ValidationLabelPositionExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea ValidationLabelExample", async ({
    mount,
    page,
  }) => {
    await mount(<ValidationLabelExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea ValidationStringPositionExample", async ({
    mount,
    page,
  }) => {
    await mount(<ValidationStringPositionExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea ValidationStringExample", async ({
    mount,
    page,
  }) => {
    await mount(<ValidationStringExample />);

    await checkAccessibility(page);
  });
});

test("should have the expected default border radius styling", async ({
  mount,
  page,
}) => {
  await mount(<TextareaComponent />);

  const inputElementParent = getElement(page, "input").locator("..");

  await expect(inputElementParent).toHaveCSS("border-radius", "8px");
});

test("should have the expected custom border radius styling", async ({
  mount,
  page,
}) => {
  await mount(<TextareaComponent borderRadius="borderRadius400" />);

  const inputElementParent = getElement(page, "input").locator("..");

  await expect(inputElementParent).toHaveCSS("border-radius", "32px");
});

test("should have the expected custom border radius styling when an array is passed", async ({
  mount,
  page,
}) => {
  await mount(
    <TextareaComponent borderRadius={["borderRadius400", "borderRadius010"]} />,
  );

  const inputElementParent = getElement(page, "input").locator("..");

  await expect(inputElementParent).toHaveCSS("border-radius", "32px 1px");
});

test("should not have borders when hideBorders prop is passed", async ({
  mount,
  page,
}) => {
  await mount(<TextareaComponent hideBorders />);

  const inputElementParent = getElement(page, "input").locator("..");

  await expect(inputElementParent).toHaveCSS(
    "border",
    "1px solid rgba(0, 0, 0, 0)",
  );
});

test("typing in the textarea should not change scroll position of the parent container", async ({
  mount,
  page,
}) => {
  await mount(<InScrollableContainer />);

  const textareaElement = page.getByRole("textbox");
  const scrollableBox = page.getByTestId("scrollable-box");

  // Select all textarea text, then move cursor to the end, to ensure that the box is scrolled to the bottom
  await textareaElement.selectText();
  await textareaElement.press("ArrowRight");

  const initialScrollPosition = await scrollableBox.evaluate(
    (element) => element.scrollTop,
  );

  await textareaElement.press("a");

  const finalScrollPosition = await scrollableBox.evaluate(
    (element) => element.scrollTop,
  );
  expect(finalScrollPosition).toBeCloseTo(initialScrollPosition);
});

test("should set aria-live attribute on Character Count to `polite` when component is focused and then change back to `off` when component is blurred", async ({
  mount,
  page,
}) => {
  await mount(<CharacterLimitExampleWithButton />);

  const CharacterCountElement = visuallyHiddenCharacterCount(page);
  const textareaElement = textareaChildren(page);
  const buttonElement = page.getByRole("button");

  await expect(CharacterCountElement).toHaveAttribute("aria-live", "off");

  await textareaElement.focus();
  await textareaElement.fill("Foo");

  await expect(CharacterCountElement).toHaveAttribute("aria-live", "polite");

  await buttonElement.click();

  await expect(CharacterCountElement).toHaveAttribute("aria-live", "off");
});
