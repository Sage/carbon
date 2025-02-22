/* eslint-disable no-await-in-loop */
import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import CarbonProvider from "../carbon-provider";
import {
  TextEditorCharacterCount,
  TextEditorCustom,
  TextEditorCustomValidation,
  TextEditorNewValidation,
} from "./components.test-pw";
import {
  textEditorInput,
  textEditorCounter,
  textEditorContainer,
  textEditorToolbar,
  innerText,
  innerTextList,
} from "../../../playwright/components/text-editor";
import {
  getComponent,
  getDataElementByValue,
  visuallyHiddenCharacterCount,
} from "../../../playwright/components";
import {
  verifyRequiredAsteriskForLabel,
  checkAccessibility,
  getStyle,
} from "../../../playwright/support/helper";
import { VALIDATION, CHARACTERS } from "../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const buttonNames = ["bold", "italic", "bullet-list", "number-list"];

test.describe("Functionality tests", () => {
  test(`should check the counter works properly`, async ({ mount, page }) => {
    await mount(<TextEditorCustom />);

    const textInput = textEditorInput(page);
    await textInput.clear();
    await textInput.fill("Testing is awesome");

    await expect(textEditorCounter(page)).toHaveText("2,982 characters left");
  });

  test("renders text as bold when bold button is selected", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const textInput = page.getByRole("textbox");
    const boldButton = page.getByRole("button", { name: "bold" });
    await boldButton.click();

    await textInput.fill("Testing");

    await expect(page.getByText("Testing")).toHaveCSS("font-weight", "700");
    await expect(boldButton).toHaveCSS("background-color", "rgb(0, 50, 76)");
  });

  test("renders text as italic when italic button is selected", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const textInput = page.getByRole("textbox");
    const italicButton = page.getByRole("button", { name: "italic" });
    await italicButton.click();

    await textInput.fill("Testing");

    await expect(page.getByText("Testing")).toHaveCSS("font-style", "italic");
    await expect(italicButton).toHaveCSS("background-color", "rgb(0, 50, 76)");
  });

  test("renders text as an unordered list when bullet list button is selected", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const textInput = page.getByRole("textbox");
    const bulletListButton = page.getByRole("button", { name: "bullet-list" });
    await bulletListButton.click();

    await textInput.fill("Testing");
    await page.keyboard.press("Enter");
    await textInput.pressSequentially("is");
    await page.keyboard.press("Enter");
    await textInput.pressSequentially("awesome");

    await expect(textInput.locator("ul").locator("li")).toHaveText([
      "Testing",
      "is",
      "awesome",
    ]);
    await expect(bulletListButton).toHaveCSS(
      "background-color",
      "rgb(0, 50, 76)",
    );
  });

  test("renders text as an ordered list when number list button is selected", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const textInput = page.getByRole("textbox");
    const numberListButton = page.getByRole("button", { name: "number-list" });
    await numberListButton.click();

    await textInput.fill("Testing");
    await page.keyboard.press("Enter");
    await textInput.pressSequentially("is");
    await page.keyboard.press("Enter");
    await textInput.pressSequentially("awesome");

    await expect(textInput.locator("ol").locator("li")).toHaveText([
      "Testing",
      "is",
      "awesome",
    ]);
    await expect(numberListButton).toHaveCSS(
      "background-color",
      "rgb(0, 50, 76)",
    );
  });

  test(`all toolbar buttons can be focused when navigating with the right arrow key`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const textInput = page.getByRole("textbox");
    await textInput.click();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "bold" })).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("button", { name: "italic" })).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("button", { name: "bullet-list" }),
    ).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("button", { name: "number-list" }),
    ).toBeFocused();
  });

  test(`all toolbar buttons can be focused when navigating with the left arrow key`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const textInput = page.getByRole("textbox");
    await textInput.click();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "bold" })).toBeFocused();

    await page.keyboard.press("ArrowLeft");
    await expect(
      page.getByRole("button", { name: "number-list" }),
    ).toBeFocused();

    await page.keyboard.press("ArrowLeft");
    await expect(
      page.getByRole("button", { name: "bullet-list" }),
    ).toBeFocused();

    await page.keyboard.press("ArrowLeft");
    await expect(page.getByRole("button", { name: "italic" })).toBeFocused();
  });

  ["Space", "Enter"].forEach((key) =>
    test(`focuses text input when bold button is selected using ${key} keyboard key`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom />);

      const boldButton = page.getByRole("button", { name: "bold" });
      await boldButton.press(key);

      const textInput = page.getByRole("textbox");
      await expect(textInput).toBeFocused();
    }),
  );

  ["Space", "Enter"].forEach((key) =>
    test(`focuses text input when italic button is selected using ${key} keyboard key`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom />);

      const italicButton = page.getByRole("button", { name: "italic" });
      await italicButton.press(key);

      const textInput = page.getByRole("textbox");
      await expect(textInput).toBeFocused();
    }),
  );

  ["Space", "Enter"].forEach((key) =>
    test(`focuses text input when bullet list button is selected using ${key} keyboard key`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom />);

      const bulletListButton = page.getByRole("button", {
        name: "bullet-list",
      });
      await bulletListButton.press(key);

      const textInput = page.getByRole("textbox");
      await expect(textInput).toBeFocused();
    }),
  );

  ["Space", "Enter"].forEach((key) =>
    test(`focuses text input when number list button is selected using ${key} keyboard key`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom />);

      const numberListButton = page.getByRole("button", {
        name: "number-list",
      });
      await numberListButton.press(key);

      const textInput = page.getByRole("textbox");
      await expect(textInput).toBeFocused();
    }),
  );

  ["Space", "Enter"].forEach((key) =>
    test(`focuses text input when bold button is deselected using the ${key} key`, async ({
      page,
      mount,
    }) => {
      await mount(<TextEditorCustom />);

      const boldButton = page.getByRole("button", { name: "bold" });
      await boldButton.click();

      await boldButton.press(key);

      const textInput = page.getByRole("textbox");
      await expect(textInput).toBeFocused();
    }),
  );

  ["Space", "Enter"].forEach((key) =>
    test(`focuses text input when italic button is deselected using the ${key} key`, async ({
      page,
      mount,
    }) => {
      await mount(<TextEditorCustom />);

      const italicButton = page.getByRole("button", { name: "italic" });
      await italicButton.click();

      await italicButton.press(key);

      const textInput = page.getByRole("textbox");
      await expect(textInput).toBeFocused();
    }),
  );

  ["Space", "Enter"].forEach((key) =>
    test(`focuses text input when bullet list button is deselected using the ${key} key`, async ({
      page,
      mount,
    }) => {
      await mount(<TextEditorCustom />);

      const bulletListButton = page.getByRole("button", {
        name: "bullet-list",
      });
      await bulletListButton.click();

      await bulletListButton.press(key);

      const textInput = page.getByRole("textbox");
      await expect(textInput).toBeFocused();
    }),
  );

  ["Space", "Enter"].forEach((key) =>
    test(`focuses text input when number list button is deselected using the ${key} key`, async ({
      page,
      mount,
    }) => {
      await mount(<TextEditorCustom />);

      const numberListButton = page.getByRole("button", {
        name: "number-list",
      });
      await numberListButton.click();

      await numberListButton.press(key);

      const textInput = page.getByRole("textbox");
      await expect(textInput).toBeFocused();
    }),
  );

  test(`should render formatted link`, async ({ mount, page }) => {
    const linkText = "https://carbon.sage.com";
    await mount(<TextEditorCustom />);

    const textInput = page.getByRole("textbox");
    await textInput.fill(linkText);

    await expect(innerText(page)).toHaveText(linkText);
  });

  test(`should not allow user to type more than characterLimit`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom characterLimit={100} />);

    const textInput = page.getByRole("textbox");

    await textInput.fill("a".repeat(100));
    await textInput.press("a");

    await expect(textInput).not.toHaveText("a".repeat(101));
    await expect(page.getByTestId("character-count")).toHaveText(
      "0 characters left",
    );
  });

  test(`should focus the first button when focus is moved to the input from the toolbar and tab key pressed`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const textInput = textEditorInput(page);
    await textInput.focus();
    await page.keyboard.press("Tab");
    await expect(textEditorToolbar(page, "bold")).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(textEditorToolbar(page, "italic")).toBeFocused();
    await textInput.focus();
    await page.keyboard.press("Tab");
    await expect(textEditorToolbar(page, "bold")).toBeFocused();
  });

  test(`should focus the first button when focus is moved beyond the toolbar and shift-tab key pressed`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const textInput = textEditorInput(page);
    await textInput.focus();
    await page.keyboard.press("Tab");
    await expect(textEditorToolbar(page, "bold")).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(textEditorToolbar(page, "italic")).toBeFocused();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(textEditorToolbar(page, "bold")).toBeFocused();
  });

  (["Bold", "Italic", "Bulleted List", "Numbered List"] as const).forEach(
    (tooltipText, buttonNumber) => {
      test(`should render with ${tooltipText} button hovered over`, async ({
        mount,
        page,
      }) => {
        await mount(<TextEditorCustom />);

        const stylingButton = getComponent(
          page,
          "text-editor-toolbar-button",
        ).nth(buttonNumber);
        await stylingButton.hover();
        await expect(stylingButton).toHaveCSS(
          "background-color",
          "rgb(204, 214, 219)",
        );
        await expect(getDataElementByValue(page, "tooltip")).toHaveText(
          tooltipText,
        );
      });
    },
  );

  test(`should focus optional buttons by tabbing from the input area`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const textInput = textEditorInput(page);
    await textInput.focus();
    await page.keyboard.press("Tab");
    await expect(textEditorToolbar(page, "bold")).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("button").filter({ hasText: "Cancel" }),
    ).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("button").filter({ hasText: "Save" }),
    ).toBeFocused();
  });

  test(`should focus save button when focus is moved outside the component and shift+tab is pressed`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const saveButton = page.getByRole("button").filter({ hasText: "Save" });

    await saveButton.press("Tab");
    await expect(saveButton).not.toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(saveButton).toBeFocused();
  });

  test(`should verify pressing right-arrow loops on toolbar buttons and does not move focus to optional buttons`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const textInput = textEditorInput(page);
    await textInput.focus();
    await page.keyboard.press("Tab");
    await expect(textEditorToolbar(page, "bold")).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await expect(textEditorToolbar(page, "number-list")).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(textEditorToolbar(page, "bold")).toBeFocused();
  });

  test(`should verify that pressing right and left arrow keys does not move focus from optional buttons`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const saveButton = page.getByRole("button").filter({ hasText: "Save" });
    const cancelButton = page.getByRole("button").filter({ hasText: "Cancel" });

    await cancelButton.focus();
    await expect(cancelButton).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(cancelButton).toBeFocused();
    await page.keyboard.press("ArrowLeft");
    await expect(cancelButton).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(saveButton).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(saveButton).toBeFocused();
    await page.keyboard.press("ArrowLeft");
    await expect(saveButton).toBeFocused();
  });
});

test.describe("Prop tests", () => {
  testData.forEach((labelValue) => {
    test(`should render TextEditor with ${labelValue} as a label`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom labelText={labelValue} />);

      const label = getDataElementByValue(page, "label");
      await expect(label).toHaveText(labelValue);
    });
  });

  test(`should render TextEditor with required prop`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom required />);

    await verifyRequiredAsteriskForLabel(page);
  });

  test(`should render with error validation state`, async ({ mount, page }) => {
    await mount(<TextEditorCustomValidation />);

    const textInput = textEditorInput(page);
    await textInput.focus();
    await getComponent(page, "icon").first().hover();
    await expect(getDataElementByValue(page, "tooltip")).toHaveText(
      "There is an error",
    );

    expect(
      await getStyle(getDataElementByValue(page, "error"), "color", "before"),
    ).toBe(VALIDATION.ERROR);

    const iconColor = await page.evaluate(() => {
      const validationIcon = document.querySelector(`[data-element="error"]`);
      if (!validationIcon) {
        return null;
      }
      const beforePseudoElement = window.getComputedStyle(
        validationIcon,
        "::before",
      );
      return beforePseudoElement ? beforePseudoElement.color : null;
    });
    expect(iconColor).toBe(VALIDATION.ERROR);
  });

  test(`should render with warning validation state`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustomValidation />);

    const textInput = textEditorInput(page);
    await textInput.focus();
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Delete");
    }

    await getComponent(page, "icon").first().hover();
    await expect(getDataElementByValue(page, "tooltip")).toHaveText(
      "There is a warning",
    );

    expect(
      await getStyle(getDataElementByValue(page, "warning"), "color", "before"),
    ).toBe(VALIDATION.WARNING);

    const iconColor = await page.evaluate(() => {
      const validationIcon = document.querySelector(`[data-element="warning"]`);
      if (!validationIcon) {
        return null;
      }
      const beforePseudoElement = window.getComputedStyle(
        validationIcon,
        "::before",
      );
      return beforePseudoElement ? beforePseudoElement.color : null;
    });
    expect(iconColor).toBe(VALIDATION.WARNING);
  });

  test(`should render with info validation state`, async ({ mount, page }) => {
    await mount(<TextEditorCustomValidation />);

    const textInput = textEditorInput(page);
    await textInput.focus();
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Delete");
    }

    await getComponent(page, "icon").first().hover();
    await expect(getDataElementByValue(page, "tooltip")).toHaveText(
      "There is an info",
    );

    expect(
      await getStyle(getDataElementByValue(page, "info"), "color", "before"),
    ).toBe(VALIDATION.INFO);

    const iconColor = await page.evaluate(() => {
      const validationIcon = document.querySelector(`[data-element="info"]`);
      if (!validationIcon) {
        return null;
      }
      const beforePseudoElement = window.getComputedStyle(
        validationIcon,
        "::before",
      );
      return beforePseudoElement ? beforePseudoElement.color : null;
    });
    expect(iconColor).toBe(VALIDATION.INFO);
  });

  ["error", "warning", "info"].forEach((validationType) => {
    test(`has correct styles when there is ${validationType} validation and the editor is focused`, async ({
      mount,
      page,
    }) => {
      await mount(
        <CarbonProvider validationRedesignOptIn>
          <TextEditorCustom {...{ [validationType]: validationType }} />
        </CarbonProvider>,
      );
      await textEditorInput(page).focus();

      await expect(textEditorContainer(page).locator("..")).toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
      );
    });
  });

  [
    [2, 42],
    [4, 84],
  ].forEach(([rows, px]) => {
    test(`should render TextEditor with set rows prop to ${rows}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom rows={rows} />);

      await expect(textEditorContainer(page)).toHaveCSS(
        "min-height",
        `${px}px`,
      );
    });
  });
});

test.describe("Events tests", () => {
  // draft-js calls onChange whenever the focus state changes as it needs to poll
  // for any changes to the EditorState that may not have resulted in the plain text
  // of the content updating but that the state has still changed.
  // For example a user has highlighted some text to apply inline styles.
  test(`should call onChange callback when a type event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextEditorCustom
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    await textEditorInput(page).fill("t");

    expect(callbackCount).toBeGreaterThanOrEqual(1);
  });

  test(`should call onLinkAdded callback when a valid url is detected by TextEditor`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextEditorCustom
        onLinkAdded={() => {
          callbackCount += 1;
        }}
      />,
    );

    await textEditorInput(page).fill("https://carbon.s");

    expect(callbackCount).toBe(1);
  });
});

test.describe("Styling tests", () => {
  test(`should render with the expected border radius on the toolbar buttons`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    await expect(textEditorToolbar(page, "bold")).toHaveCSS(
      "border-radius",
      "8px",
    );
    await expect(textEditorToolbar(page, "italic")).toHaveCSS(
      "border-radius",
      "8px",
    );
    await expect(textEditorToolbar(page, "bullet-list")).toHaveCSS(
      "border-radius",
      "8px",
    );
    await expect(textEditorToolbar(page, "number-list")).toHaveCSS(
      "border-radius",
      "8px",
    );
  });

  test(`should render with the expected focus styling`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const editorParent = textEditorContainer(page).locator("..");
    const toolbarBold = textEditorToolbar(page, "bold");
    const toolbarItalic = textEditorToolbar(page, "italic");
    const toolbarBullet = textEditorToolbar(page, "bullet-list");
    const toolbarNumber = textEditorToolbar(page, "number-list");

    await textEditorInput(page).focus();
    await expect(editorParent).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(editorParent).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );

    await toolbarBold.focus();
    await expect(toolbarBold).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(toolbarBold).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
    await expect(toolbarBold).toHaveCSS("position", "relative");

    await toolbarItalic.focus();
    await expect(toolbarItalic).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(toolbarItalic).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
    await expect(toolbarItalic).toHaveCSS("position", "relative");

    await toolbarBullet.focus();
    await expect(toolbarBullet).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(toolbarBullet).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
    await expect(toolbarBullet).toHaveCSS("position", "relative");

    await toolbarNumber.focus();
    await expect(toolbarNumber).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(toolbarNumber).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
    await expect(toolbarNumber).toHaveCSS("position", "relative");
  });
});

test.describe("Accessibility tests", () => {
  test(`should pass accessibility tests for default component`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    await checkAccessibility(page);
  });

  testData.forEach((labelValue) => {
    test(`should pass accessibility tests with ${labelValue} as a label`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom labelText={labelValue} />);

      await checkAccessibility(page);
    });
  });

  test(`should pass accessibility tests with required prop`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom required />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for validation state`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustomValidation />);

    await checkAccessibility(page);
  });

  [2, 4].forEach((rows) => {
    test(`should pass accessibility tests with rows prop sets to ${rows}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom rows={rows} />);

      await checkAccessibility(page);
    });
  });

  test(`should pass accessibility tests with validation when opt in flag is set`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorNewValidation />);

    await checkAccessibility(page);
  });
});

test("should set aria-live attribute on Character Count to `polite` when component is focused and then change back to `off` when component is blurred", async ({
  mount,
  page,
}) => {
  await mount(<TextEditorCharacterCount />);

  const CharacterCountElement = visuallyHiddenCharacterCount(page);
  const textEditorInputElement = textEditorInput(page);
  const buttonElement = page.getByRole("button", { name: "Click Me" });

  await expect(CharacterCountElement).toHaveAttribute("aria-live", "off");

  await textEditorInputElement.focus();
  await textEditorInputElement.fill("Foo");

  await expect(CharacterCountElement).toHaveAttribute("aria-live", "polite");

  await buttonElement.click();

  await expect(CharacterCountElement).toHaveAttribute("aria-live", "off");
});

buttonNames.forEach((buttonType) => {
  test(`should set 'aria-pressed' to true when ${buttonType} is selected and then false when deselected`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const toolbarButton = textEditorToolbar(page, buttonType);
    await expect(toolbarButton).toHaveAttribute("aria-pressed", "false");
    await toolbarButton.click();
    await expect(toolbarButton).toHaveAttribute("aria-pressed", "true");
    await toolbarButton.click();
    await expect(toolbarButton).toHaveAttribute("aria-pressed", "false");
  });
});

/*
Unfortunately draftjs (on which TextEditor is based) does not interact well with jsdom, so testing most behavioural features in RTL tests is not possible.
(See https://github.com/testing-library/user-event/issues/858 for one of these - and note that the workaround suggested with textInput does not appear to work.
Nor is this the only issue.)
As a result, most tests for TextEditor are now written in Playwright. If we ever move away from draftjs we should revisit this and see if any of them can be
moved back to unit tests.
These "unit test substitutes" are all in the `test.describe` block below for easy identification.
Some are near-duplicates of pre-existing Playwright tests above, but have been put here for ease of tracking which tests should correspond to unit tests.
*/
test.describe("Substitute unit tests", () => {
  test("when neither the `bold` nor `italic` toolbar buttons are clicked, added text is neither bold nor italic", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).fill("foo");

    const enteredText = page.getByText("foo");
    await expect(enteredText).toHaveCSS("font-weight", "400");
    await expect(enteredText).toHaveCSS("font-style", "normal");
  });

  test("when the `bold` toolbar button is clicked, added text is in bold style", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorToolbar(page, "bold").click();
    await textEditorInput(page).fill("foo");

    const enteredText = page.getByText("foo");
    await expect(enteredText).toHaveCSS("font-weight", "700");
    await expect(enteredText).toHaveCSS("font-style", "normal");
  });

  test("when the `italic` toolbar button is clicked, added text is in italic style", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorToolbar(page, "italic").click();
    await textEditorInput(page).fill("foo");

    const enteredText = page.getByText("foo");
    await expect(enteredText).toHaveCSS("font-weight", "400");
    await expect(enteredText).toHaveCSS("font-style", "italic");
  });

  test("when the `bold` and `italic` toolbar buttons are both clicked, added text is in both bold and italic style", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorToolbar(page, "bold").click();
    await textEditorToolbar(page, "italic").click();
    await textEditorInput(page).fill("foo");

    const enteredText = page.getByText("foo");
    await expect(enteredText).toHaveCSS("font-weight", "700");
    await expect(enteredText).toHaveCSS("font-style", "italic");
  });

  test("when an inline style button is toggled on and off, new text is entered without the corresponding style, while the previously-entered text keeps the style", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorToolbar(page, "bold").click();
    await textEditorToolbar(page, "italic").click();
    await textEditorInput(page).fill("foo");
    await textEditorToolbar(page, "italic").click();
    await textEditorInput(page).pressSequentially("bar"); // can't use .fill as that removes the previous contents

    const boldAndItalicText = page.getByText("foo");
    const justBoldText = page.getByText("bar");
    await expect(boldAndItalicText).toHaveCSS("font-weight", "700");
    await expect(boldAndItalicText).toHaveCSS("font-style", "italic");
    await expect(justBoldText).toHaveCSS("font-weight", "700");
    await expect(justBoldText).toHaveCSS("font-style", "normal");
  });

  test("when an inline style button is pressed with selected text, the style is applied to that text", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).fill("foobar");
    // select just the "foo" part
    await page.getByText("foobar").evaluate((textSpan) => {
      const textNode = textSpan.childNodes[0];
      window.getSelection()?.setBaseAndExtent(textNode, 0, textNode, 3);
    });
    await textEditorToolbar(page, "bold").click();

    await expect(page.getByText("foo")).toHaveCSS("font-weight", "700");
    await expect(page.getByText("bar")).toHaveCSS("font-weight", "400");
  });

  test("when neither of the `list` toolbar buttons are clicked, added text is not rendered in a list", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).fill("foo");
    await page.keyboard.press("Enter");
    await textEditorInput(page).fill("bar");
    await page.keyboard.press("Enter");
    await textEditorInput(page).fill("baz");

    await expect(innerTextList(page, "ul", 1)).toHaveCount(0);
    await expect(innerTextList(page, "il", 1)).toHaveCount(0);
  });

  test("when the `bullet-list` toolbar button is clicked, added text is rendered in an unordered list, with enter separating list items", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorToolbar(page, "bullet-list").click();
    await textEditorInput(page).fill("foo");
    await page.keyboard.press("Enter");
    await textEditorInput(page).pressSequentially("bar");
    await page.keyboard.press("Enter");
    await textEditorInput(page).pressSequentially("baz");

    await expect(innerTextList(page, "ol", 1)).toHaveCount(0);
    await expect(innerTextList(page, "ul", 1)).toHaveText("foo");
    await expect(innerTextList(page, "ul", 2)).toHaveText("bar");
    await expect(innerTextList(page, "ul", 3)).toHaveText("baz");
  });

  test("when the `number-list` toolbar button is clicked, added text is rendered in an ordered list, with enter separating list items", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorToolbar(page, "number-list").click();
    await textEditorInput(page).fill("foo");
    await page.keyboard.press("Enter");
    await textEditorInput(page).pressSequentially("bar");
    await page.keyboard.press("Enter");
    await textEditorInput(page).pressSequentially("baz");

    await expect(innerTextList(page, "ul", 1)).toHaveCount(0);
    await expect(innerTextList(page, "ol", 1)).toHaveText("foo");
    await expect(innerTextList(page, "ol", 2)).toHaveText("bar");
    await expect(innerTextList(page, "ol", 3)).toHaveText("baz");
  });

  test("when a `list` button is toggled on and off, new text is entered without the corresponding formatting, while the previously-entered text keeps the formatting", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorToolbar(page, "bullet-list").click();
    await textEditorInput(page).fill("foo");
    await page.keyboard.press("Enter");
    await textEditorInput(page).pressSequentially("bar");
    await page.keyboard.press("Enter");
    await textEditorToolbar(page, "bullet-list").click();
    await textEditorInput(page).pressSequentially("baz");

    await expect(innerTextList(page, "ul", 1)).toHaveText("foo");
    await expect(innerTextList(page, "ul", 2)).toHaveText("bar");
    await expect(innerTextList(page, "ul", 3)).toHaveCount(0);
    await expect(textEditorInput(page).getByText("baz")).toBeVisible();
  });

  test("when inline style buttons and the `bullet-list` button are both toggled on, entered text has all the selected styles and formatting applied", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorToolbar(page, "bold").click();
    await textEditorToolbar(page, "italic").click();
    await textEditorToolbar(page, "bullet-list").click();
    await textEditorInput(page).fill("foo");
    await page.keyboard.press("Enter");
    await textEditorInput(page).pressSequentially("bar");
    await page.keyboard.press("Enter");
    await textEditorInput(page).pressSequentially("baz");

    await expect(innerTextList(page, "ul", 1)).toHaveText("foo");
    await expect(page.getByText("foo")).toHaveCSS("font-weight", "700");
    await expect(page.getByText("foo")).toHaveCSS("font-style", "italic");
    await expect(innerTextList(page, "ul", 2)).toHaveText("bar");
    await expect(page.getByText("bar")).toHaveCSS("font-weight", "700");
    await expect(page.getByText("bar")).toHaveCSS("font-style", "italic");
    await expect(innerTextList(page, "ul", 3)).toHaveText("baz");
    await expect(page.getByText("baz")).toHaveCSS("font-weight", "700");
    await expect(page.getByText("baz")).toHaveCSS("font-style", "italic");
  });

  test("when inline style buttons and the `number-list` button are both toggled on, entered text has all the selected styles and formatting applied", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorToolbar(page, "bold").click();
    await textEditorToolbar(page, "italic").click();
    await textEditorToolbar(page, "number-list").click();
    await textEditorInput(page).fill("foo");
    await page.keyboard.press("Enter");
    await textEditorInput(page).pressSequentially("bar");
    await page.keyboard.press("Enter");
    await textEditorInput(page).pressSequentially("baz");

    await expect(innerTextList(page, "ol", 1)).toHaveText("foo");
    await expect(page.getByText("foo")).toHaveCSS("font-weight", "700");
    await expect(page.getByText("foo")).toHaveCSS("font-style", "italic");
    await expect(innerTextList(page, "ol", 2)).toHaveText("bar");
    await expect(page.getByText("bar")).toHaveCSS("font-weight", "700");
    await expect(page.getByText("bar")).toHaveCSS("font-style", "italic");
    await expect(innerTextList(page, "ol", 3)).toHaveText("baz");
    await expect(page.getByText("baz")).toHaveCSS("font-weight", "700");
    await expect(page.getByText("baz")).toHaveCSS("font-style", "italic");
  });

  test("the control+b keyboard shortcut toggles bold styling", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).focus();
    await page.keyboard.down("Control");
    await page.keyboard.press("b");
    await page.keyboard.up("Control");
    await textEditorInput(page).fill("foo");
    await page.keyboard.down("Control");
    await page.keyboard.press("b");
    await page.keyboard.up("Control");
    await textEditorInput(page).pressSequentially("bar");

    await expect(page.getByText("foo")).toHaveCSS("font-weight", "700");
    await expect(page.getByText("bar")).toHaveCSS("font-weight", "400");
  });

  test("the control+i keyboard shortcut toggles italic styling", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).focus();
    await page.keyboard.down("Control");
    await page.keyboard.press("i");
    await page.keyboard.up("Control");
    await textEditorInput(page).fill("foo");
    await page.keyboard.down("Control");
    await page.keyboard.press("i");
    await page.keyboard.up("Control");
    await textEditorInput(page).pressSequentially("bar");

    await expect(page.getByText("foo")).toHaveCSS("font-style", "italic");
    await expect(page.getByText("bar")).toHaveCSS("font-style", "normal");
  });

  test("invalid keyboard shortcuts do not change any styling", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).focus();
    await page.keyboard.down("Control");
    await page.keyboard.press("k");
    await page.keyboard.up("Control");
    await textEditorInput(page).fill("foo");

    await expect(page.getByText("foo")).toHaveCSS("font-weight", "400");
    await expect(page.getByText("foo")).toHaveCSS("font-style", "normal");
  });

  test("typing the `*` character starts an unordered-list block", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).pressSequentially("*foo");

    await expect(innerTextList(page, "ul", 1)).toHaveText("foo");
  });

  test("typing the `1.` characters starts an ordered-list block", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).pressSequentially("1.foo");

    await expect(innerTextList(page, "ol", 1)).toHaveText("foo");
  });

  test("typing the `*` character does not start an unordered-list block when text has already been added", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).pressSequentially("foo*bar");

    await expect(innerTextList(page, "ul", 1)).toHaveCount(0);
    await expect(innerText(page)).toHaveText("foo*bar");
  });

  test("typing the `1.` characters does not start an ordered-list block when text has already been added", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).pressSequentially("foo1.bar");

    await expect(innerTextList(page, "ol", 1)).toHaveCount(0);
    await expect(innerText(page)).toHaveText("foo1.bar");
  });

  test("unordered-list styling is removed when the user presses backspace at the start of a list item", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).pressSequentially("*foo");

    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await expect(innerTextList(page, "ul", 1)).toHaveCount(0);
  });

  test("ordered-list styling is removed when the user presses backspace at the start of a list item", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).pressSequentially("1.foo");

    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await expect(innerTextList(page, "ol", 1)).toHaveCount(0);
  });

  test("unordered-list styling is removed when the user presses enter at the start of a list item", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).pressSequentially("*foo");

    await page.keyboard.press("Enter");
    await page.keyboard.press("Enter");
    await textEditorInput(page).pressSequentially("bar");

    await expect(innerTextList(page, "ul", 1)).toHaveCount(1);
    await expect(innerTextList(page, "ul", 1)).toHaveText("foo");
    await expect(innerTextList(page, "ul", 2)).toHaveCount(0);
  });

  test("ordered-list styling is removed when the user presses enter at the start of a list item", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).pressSequentially("1.foo");

    await page.keyboard.press("Enter");
    await page.keyboard.press("Enter");
    await textEditorInput(page).pressSequentially("bar");

    await expect(innerTextList(page, "ol", 1)).toHaveCount(1);
    await expect(innerTextList(page, "ol", 1)).toHaveText("foo");
    await expect(innerTextList(page, "ol", 2)).toHaveCount(0);
  });

  test("unordered-list styling is not removed when the user presses backspace with text in the current list item", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).pressSequentially("*foo");

    await page.keyboard.press("Backspace");
    await expect(innerTextList(page, "ul", 1)).toHaveCount(1);
    await expect(innerTextList(page, "ul", 1)).toHaveText("fo");
  });

  test("ordered-list styling is not removed when the user presses backspace with text in the current list item", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).pressSequentially("1.foo");

    await page.keyboard.press("Backspace");
    await expect(innerTextList(page, "ol", 1)).toHaveCount(1);
    await expect(innerTextList(page, "ol", 1)).toHaveText("fo");
  });

  test("unordered-list styling is not removed when the user presses enter with text in the current list item", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).pressSequentially("*foo");

    await page.keyboard.press("Enter");
    await textEditorInput(page).pressSequentially("bar");
    await page.keyboard.press("Enter");
    await textEditorInput(page).pressSequentially("baz");

    await expect(innerTextList(page, "ul", 1)).toHaveCount(1);
    await expect(innerTextList(page, "ul", 1)).toHaveText("foo");
    await expect(innerTextList(page, "ul", 2)).toHaveCount(1);
    await expect(innerTextList(page, "ul", 2)).toHaveText("bar");
    await expect(innerTextList(page, "ul", 3)).toHaveCount(1);
    await expect(innerTextList(page, "ul", 3)).toHaveText("baz");
  });

  test("ordered-list styling is not removed when the user presses enter with text in the current list item", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);
    await textEditorInput(page).pressSequentially("1.foo");

    await page.keyboard.press("Enter");
    await textEditorInput(page).pressSequentially("bar");
    await page.keyboard.press("Enter");
    await textEditorInput(page).pressSequentially("baz");

    await expect(innerTextList(page, "ol", 1)).toHaveCount(1);
    await expect(innerTextList(page, "ol", 1)).toHaveText("foo");
    await expect(innerTextList(page, "ol", 2)).toHaveCount(1);
    await expect(innerTextList(page, "ol", 2)).toHaveText("bar");
    await expect(innerTextList(page, "ol", 3)).toHaveCount(1);
    await expect(innerTextList(page, "ol", 3)).toHaveText("baz");
  });

  test("when the `characterLimit` prop is specified, key presses have no effect when the length of entered text has reached the limit", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom characterLimit={10} />);

    await textEditorInput(page).fill("1234567890");
    await expect(innerText(page)).toHaveText("1234567890");
    await textEditorInput(page).pressSequentially("1");
    await expect(innerText(page)).toHaveText("1234567890");
  });

  test("content can be pasted into the editor if it would not exceed the character limit", async ({
    mount,
    page,
    context,
  }) => {
    // grant access to clipboard
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await mount(<TextEditorCustom characterLimit={10} />);
    await textEditorInput(page).focus();
    // copy text to clipboard
    await page.evaluate(() => navigator.clipboard.writeText("1234567890"));

    if (process.env.CI) {
      // assume Ubuntu (which is the OS the Github actions run on), where Control+Shift+V is needed to paste
      await page.keyboard.down("Control");
      await page.keyboard.down("Shift");
      await page.keyboard.press("v");
      await page.keyboard.up("Shift");
      await page.keyboard.up("Control");
    } else if (process.platform === "win32") {
      // Windows: Control+V
      await page.keyboard.down("Control");
      await page.keyboard.press("v");
      await page.keyboard.up("Control");
    } else {
      // assuming MacOS, press Meta(Command)+V to paste
      await page.keyboard.down("Meta");
      await page.keyboard.press("v");
      await page.keyboard.up("Meta");
    }

    await expect(innerText(page)).toHaveText("1234567890");
  });

  test("content pasted into the editor whose length exceed the character limit is cut short", async ({
    mount,
    page,
    context,
  }) => {
    // grant access to clipboard
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await mount(<TextEditorCustom characterLimit={10} />);
    await textEditorInput(page).focus();
    // copy text to clipboard
    await page.evaluate(() =>
      navigator.clipboard.writeText("12345678901234567890"),
    );

    if (process.env.CI) {
      // assume Ubuntu (which is the OS the Github actions run on), where Control+Shift+V is needed to paste
      await page.keyboard.down("Control");
      await page.keyboard.down("Shift");
      await page.keyboard.press("v");
      await page.keyboard.up("Shift");
      await page.keyboard.up("Control");
    } else if (process.platform === "win32") {
      // Windows: Control+V
      await page.keyboard.down("Control");
      await page.keyboard.press("v");
      await page.keyboard.up("Control");
    } else {
      // assuming MacOS, press Meta(Command)+V to paste
      await page.keyboard.down("Meta");
      await page.keyboard.press("v");
      await page.keyboard.up("Meta");
    }

    await expect(innerText(page)).toHaveText("1234567890");
  });
});
