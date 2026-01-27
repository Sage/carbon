import React from "react";
import { test, expect } from "../../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../../playwright/support/helper";
import {
  MultipleTextInputComponents,
  TextInputComponent,
  PrePopulatedTextInputComponent,
} from "./components.test-pw";
import { TextInputProps } from ".";

test("typing updates the input value", async ({ mount, page }) => {
  await mount(<TextInputComponent />);
  const input = page.locator("input");

  await input.fill("hello");
  await expect(input).toHaveValue("hello");
});

test("paste operation inserts text", async ({ mount, page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await mount(<TextInputComponent />);
  const input = page.locator("input");

  await page.evaluate(() => {
    return navigator.clipboard.writeText("hello world");
  });

  await input.focus();
  await input.press("ControlOrMeta+v");

  await expect(input).toHaveValue("hello world");
});

test("cut removes selected text", async ({ mount, page }) => {
  await mount(<TextInputComponent />);
  const input = page.locator("input");

  await input.fill("hello world");
  await input.selectText();
  await input.press("ControlOrMeta+x");
  await expect(input).toHaveValue("");
});

test("tab focuses the input", async ({ mount, page }) => {
  await mount(<TextInputComponent />);
  const input = page.locator("input");

  await page.keyboard.press("Tab");
  await expect(input).toBeFocused();
});

test("shift+tab moves focus away", async ({ mount, page }) => {
  await mount(<MultipleTextInputComponents />);
  const input = page.locator("input").first();

  await input.focus();
  await page.keyboard.press("Shift+Tab");
  await expect(input).not.toBeFocused();
});

test("backspace deletes text", async ({ mount, page }) => {
  await mount(<TextInputComponent />);
  const input = page.locator("input");

  await input.fill("hello");
  await input.press("End");
  await input.press("Backspace");
  await expect(input).toHaveValue("hell");
});

test("arrow keys navigate within text", async ({ mount, page }) => {
  await mount(<TextInputComponent />);
  const input = page.locator("input");

  await input.fill("hello");
  await input.press("Home");
  await input.press("ArrowRight");
  await input.press("ArrowRight");

  await page.keyboard.type("X");
  await expect(input).toHaveValue("heXllo");
});

test("mouse selection selects text", async ({ mount, page }) => {
  await mount(<TextInputComponent />);
  const input = page.locator("input");

  await input.fill("hello world");

  await input.click({ clickCount: 3 });

  const selectedText = await page.evaluate(() => {
    const el = document.querySelector("input") as HTMLInputElement;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    return el.value.substring(start, end);
  });
  expect(selectedText).toBe("hello world");
});

test("shift+arrow keys select text", async ({ mount, page }) => {
  await mount(<TextInputComponent />);
  const input = page.locator("input");

  await input.fill("hello");
  await input.press("Home");
  await input.press("Shift+ArrowRight");
  await input.press("Shift+ArrowRight");

  const selectedText = await page.evaluate(() => {
    const el = document.querySelector("input") as HTMLInputElement;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    return el.value.substring(start, end);
  });
  expect(selectedText).toBe("he");
});

test("delete key removes text after cursor", async ({ mount, page }) => {
  await mount(<TextInputComponent />);
  const input = page.locator("input");

  await input.fill("hello");
  await input.press("Home");
  await input.press("Delete");
  await expect(input).toHaveValue("ello");
});

test("disabled input cannot be focused", async ({ mount, page }) => {
  await mount(<TextInputComponent disabled />);
  const input = page.locator("input");

  await page.keyboard.press("Tab");
  await expect(input).not.toBeFocused();
});

test("disabled input does not accept input", async ({ mount, page }) => {
  await mount(<TextInputComponent disabled />);
  const input = page.locator("input");

  await input.focus();
  await page.keyboard.type("test");
  await expect(input).toHaveValue("");
});

test("readOnly input can be focused", async ({ mount, page }) => {
  await mount(<TextInputComponent readOnly />);
  const input = page.locator("input");

  await page.keyboard.press("Tab");
  await expect(input).toBeFocused();
});

test("readOnly input does not accept input", async ({ mount, page }) => {
  await mount(<TextInputComponent readOnly />);
  const input = page.locator("input");

  await input.focus();
  await page.keyboard.type("test");
  await expect(input).toHaveValue("");
});

test("multiple typing events accumulate correctly", async ({ mount, page }) => {
  await mount(<TextInputComponent />);
  const input = page.locator("input");

  await input.focus();
  await page.keyboard.type("hello");
  await page.keyboard.type(" world");
  await expect(input).toHaveValue("hello world");
});

test("placeholder displays when input is empty", async ({ mount, page }) => {
  await mount(<TextInputComponent placeholder="Enter your name" />);
  const input = page.locator("input");

  await expect(input).toHaveAttribute("placeholder", "Enter your name");
});

test("placeholder disappears when typing", async ({ mount, page }) => {
  await mount(<TextInputComponent placeholder="Enter your name" />);
  const input = page.locator("input");

  await input.focus();
  await page.keyboard.type("John");

  await expect(input).toHaveAttribute("placeholder", "Enter your name");

  await expect(input).toHaveValue("John");
});

test("placeholder reappears when text is cleared", async ({ mount, page }) => {
  await mount(<TextInputComponent placeholder="Enter your name" />);
  const input = page.locator("input");

  await input.fill("John");
  await input.clear();

  await expect(input).toHaveAttribute("placeholder", "Enter your name");
});

test("clicking label focuses the input", async ({ mount, page }) => {
  await mount(<TextInputComponent label="Username" id="username-input" />);
  const label = page.locator("label");
  const input = page.locator("input");

  await label.click();
  await expect(input).toBeFocused();
});

test("label text displays correctly", async ({ mount, page }) => {
  await mount(<TextInputComponent label="Email Address" />);
  const label = page.locator("label");

  await expect(label).toHaveText("Email Address");
});

test("very long text input is handled correctly", async ({ mount, page }) => {
  await mount(<TextInputComponent />);
  const input = page.locator("input");

  const longText = "a".repeat(1000);
  await input.fill(longText);

  await expect(input).toHaveValue(longText);
});

test("special characters and unicode are accepted", async ({ mount, page }) => {
  await mount(<TextInputComponent />);
  const input = page.locator("input");

  const specialText = "Hello! @#$% 你好 🎉 Ñoño";
  await input.fill(specialText);

  await expect(input).toHaveValue(specialText);
});

test("leading and trailing whitespace is preserved", async ({
  mount,
  page,
}) => {
  await mount(<TextInputComponent />);
  const input = page.locator("input");

  const textWithWhitespace = "  hello world  ";
  await input.fill(textWithWhitespace);

  await expect(input).toHaveValue(textWithWhitespace);
});

test("input handles empty string gracefully", async ({ mount, page }) => {
  await mount(<TextInputComponent />);
  const input = page.locator("input");

  await input.fill("");

  await expect(input).toHaveValue("");
});

test("copy operation copies selected text to clipboard", async ({
  mount,
  page,
}) => {
  await mount(<TextInputComponent />);
  const input = page.locator("input");

  await input.fill("hello world");
  await input.selectText();

  const copiedText = await page.evaluate(() => {
    const el = document.querySelector("input") as HTMLInputElement;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    return el.value.substring(start, end);
  });

  expect(copiedText).toBe("hello world");
});

test.describe("Accessibility tests", () => {
  test("passes accessibility tests with default configuration", async ({
    mount,
    page,
  }) => {
    await mount(<TextInputComponent />);
    await checkAccessibility(page);
  });

  test("passes accessibility tests with autoFocus prop", async ({
    mount,
    page,
  }) => {
    await mount(<TextInputComponent autoFocus />);
    await checkAccessibility(page);
  });

  test("passes accessibility tests when disabled", async ({ mount, page }) => {
    await mount(<PrePopulatedTextInputComponent disabled />);
    await checkAccessibility(page);
  });

  test("passes accessibility tests when readOnly", async ({ mount, page }) => {
    await mount(<PrePopulatedTextInputComponent readOnly />);
    await checkAccessibility(page);
  });

  test("passes accessibility tests with inputHint prop", async ({
    mount,
    page,
  }) => {
    await mount(<TextInputComponent inputHint="foo" />);
    await checkAccessibility(page);
  });

  test("passes accessibility tests with required prop", async ({
    mount,
    page,
  }) => {
    await mount(<TextInputComponent required />);
    await checkAccessibility(page);
  });

  (["small", "medium", "large"] as TextInputProps["size"][]).forEach((size) => {
    test(`passes accessibility tests with size ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextInputComponent size={size} />);
      await checkAccessibility(page);
    });
  });

  test("passes accessibility tests with warning boolean prop", async ({
    mount,
    page,
  }) => {
    await mount(<TextInputComponent warning />);
    await checkAccessibility(page);
  });

  test("passes accessibility tests with warning string prop", async ({
    mount,
    page,
  }) => {
    await mount(<TextInputComponent warning="foo" />);
    await checkAccessibility(page);
  });

  test("passes accessibility tests with error boolean prop", async ({
    mount,
    page,
  }) => {
    await mount(<TextInputComponent error />);
    await checkAccessibility(page);
  });

  test("passes accessibility tests with error string prop", async ({
    mount,
    page,
  }) => {
    await mount(<TextInputComponent error="foo" />);
    await checkAccessibility(page);
  });
});
