import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import { checkAccessibility } from "../../../playwright/support/helper";

import TextEditorDefaultComponent, {
  TextEditorWithHeader,
  TextEditorWithHeaderOnSave,
  TextEditorWithHeaderOnCancel,
  TextEditorWithFooter,
  TextEditorWithFooterOnSave,
  TextEditorWithFooterOnCancel,
} from "./components.test-pw";
import { EditorFormattedValues } from "./text-editor.component";

const preformattedJSON = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Sample text with ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 1,
            mode: "normal",
            style: "",
            text: "some formatting",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: " ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 2,
            mode: "normal",
            style: "",
            text: "applied",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: ".",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

const unformattedJSON = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "This text needs formatting",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

const preformattedValue = JSON.stringify(preformattedJSON);
const unformattedValue = JSON.stringify(unformattedJSON);

test.describe("Prop tests", () => {
  test.describe("characterLimit", () => {
    test(`value of 0`, async ({ mount, page }) => {
      await mount(<TextEditorDefaultComponent characterLimit={0} />);

      const displayedLimit = page.locator(
        "div[data-role='pw-rte-character-limit']",
      );
      await expect(displayedLimit).toBeHidden();
    });

    [
      { characterLimit: 100, text: "100" },
      { characterLimit: 500, text: "500" },
      { characterLimit: 3000, text: "3,000" },
    ].forEach(({ characterLimit, text }) => {
      test(`value of ${characterLimit}`, async ({ mount, page }) => {
        await mount(
          <TextEditorDefaultComponent characterLimit={characterLimit} />,
        );
        let displayedLimit = page.locator(
          "div[data-role='pw-rte-character-limit']",
        );
        await expect(displayedLimit).toHaveText(`${text} characters remaining`);

        const stringToType = "a".repeat(characterLimit);

        const textbox = page.locator("div[role='textbox']");
        await textbox.click();
        await textbox.fill(stringToType);

        /** Although nasty and discouraged, the hard-coded wait is here to give
         * the debounce function time to fire the callback.
         */
        // eslint-disable-next-line playwright/no-wait-for-timeout
        await page.waitForTimeout(3000);

        displayedLimit = page.locator(
          "div[data-role='pw-rte-character-limit']",
        );
        await expect(displayedLimit).toHaveText(`0 characters remaining`);

        await textbox.fill(`${stringToType}1`);

        // eslint-disable-next-line playwright/no-wait-for-timeout
        await page.waitForTimeout(3000);

        displayedLimit = page.locator(
          "div[data-role='pw-rte-character-limit']",
        );
        await expect(displayedLimit).toHaveText(`0 characters remaining`);

        const displayedWarning = page.getByTestId("pw-rte-validation-message");
        await expect(displayedWarning).toHaveText(
          `You are 1 character(s) over the character limit`,
        );
      });
    });
  });

  test.describe("header", () => {
    test("basic focus order: header elements → toolbar button → editor", async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorWithHeader />);

      await page.keyboard.press("Tab");
      const button1 = page.getByRole("button", { name: "foo" });
      await expect(button1).toBeFocused();

      await page.keyboard.press("Tab");
      const button2 = page.getByRole("button", { name: "bar" });
      await expect(button2).toBeFocused();

      await page.keyboard.press("Tab");
      const button3 = page.getByRole("button", { name: "baz" });
      await expect(button3).toBeFocused();

      const editorWrapper = page.locator(
        `div[data-role='pw-rte-editor-toolbar-wrapper']`,
      );
      const editor = page.getByRole("textbox");

      await expect(editorWrapper).not.toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
      );
      await expect(editor).not.toBeFocused();

      await page.keyboard.press("Tab");

      const boldButton = page.getByLabel("Bold");
      await expect(boldButton).toBeFocused();

      await page.keyboard.press("Tab");

      await expect(editorWrapper).toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
      );
      await expect(editor).toBeFocused();
    });

    test("focus order with onSave: header elements → toolbar button → save button → editor", async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorWithHeaderOnSave />);

      await page.keyboard.press("Tab");
      const button1 = page.getByRole("button", { name: "foo" });
      await expect(button1).toBeFocused();

      await page.keyboard.press("Tab");
      const button2 = page.getByRole("button", { name: "bar" });
      await expect(button2).toBeFocused();

      await page.keyboard.press("Tab");
      const button3 = page.getByRole("button", { name: "baz" });
      await expect(button3).toBeFocused();

      const editorWrapper = page.locator(
        `div[data-role='pw-rte-editor-toolbar-wrapper']`,
      );
      const editor = page.getByRole("textbox");

      await expect(editorWrapper).not.toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
      );
      await expect(editor).not.toBeFocused();

      await page.keyboard.press("Tab");

      const boldButton = page.getByLabel("Bold");
      await expect(boldButton).toBeFocused();

      await page.keyboard.press("Tab");

      const saveButton = page.getByRole("button", { name: "Save" });
      await expect(saveButton).toBeFocused();

      await page.keyboard.press("Tab");

      await expect(editorWrapper).toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
      );
      await expect(editor).toBeFocused();
    });

    test("focus order with onCancel: header elements → toolbar button → cancel button → editor", async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorWithHeaderOnCancel />);

      await page.keyboard.press("Tab");
      const button1 = page.getByRole("button", { name: "foo" });
      await expect(button1).toBeFocused();

      await page.keyboard.press("Tab");
      const button2 = page.getByRole("button", { name: "bar" });
      await expect(button2).toBeFocused();

      await page.keyboard.press("Tab");
      const button3 = page.getByRole("button", { name: "baz" });
      await expect(button3).toBeFocused();

      const editorWrapper = page.locator(
        `div[data-role='pw-rte-editor-toolbar-wrapper']`,
      );
      const editor = page.getByRole("textbox");

      await expect(editorWrapper).not.toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
      );
      await expect(editor).not.toBeFocused();

      await page.keyboard.press("Tab");

      const boldButton = page.getByLabel("Bold");
      await expect(boldButton).toBeFocused();

      await page.keyboard.press("Tab");

      const cancelButton = page.getByRole("button", { name: "Cancel" });
      await expect(cancelButton).toBeFocused();

      await page.keyboard.press("Tab");

      await expect(editorWrapper).toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
      );
      await expect(editor).toBeFocused();
    });
  });

  test.describe("footer", () => {
    test("basic focus order: toolbar button → editor → footer elements", async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorWithFooter />);

      await page.keyboard.press("Tab");

      const boldButton = page.getByLabel("Bold");
      await expect(boldButton).toBeFocused();

      await page.keyboard.press("Tab");

      const editorWrapper = page.locator(
        `div[data-role='pw-rte-editor-toolbar-wrapper']`,
      );
      await expect(editorWrapper).toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
      );
      const editor = page.getByRole("textbox");
      await expect(editor).toBeFocused();

      await page.keyboard.press("Tab");
      const button1 = page.getByRole("button", { name: "foo" });
      await expect(button1).toBeFocused();

      await page.keyboard.press("Tab");
      const button2 = page.getByRole("button", { name: "bar" });
      await expect(button2).toBeFocused();

      await page.keyboard.press("Tab");
      const button3 = page.getByRole("button", { name: "baz" });
      await expect(button3).toBeFocused();

      await expect(editorWrapper).not.toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
      );
      await expect(editor).not.toBeFocused();
    });

    test("focus order with onSave: toolbar button → save button → editor → footer elements", async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorWithFooterOnSave />);

      await page.keyboard.press("Tab");

      const boldButton = page.getByLabel("Bold");
      await expect(boldButton).toBeFocused();

      await page.keyboard.press("Tab");

      const saveButton = page.getByRole("button", { name: "Save" });
      await expect(saveButton).toBeFocused();

      await page.keyboard.press("Tab");

      const editorWrapper = page.locator(
        `div[data-role='pw-rte-editor-toolbar-wrapper']`,
      );
      await expect(editorWrapper).toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
      );
      const editor = page.getByRole("textbox");
      await expect(editor).toBeFocused();

      await page.keyboard.press("Tab");
      const button1 = page.getByRole("button", { name: "foo" });
      await expect(button1).toBeFocused();

      await page.keyboard.press("Tab");
      const button2 = page.getByRole("button", { name: "bar" });
      await expect(button2).toBeFocused();

      await page.keyboard.press("Tab");
      const button3 = page.getByRole("button", { name: "baz" });
      await expect(button3).toBeFocused();

      await expect(editorWrapper).not.toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
      );
      await expect(editor).not.toBeFocused();
    });

    test("focus order with onCancel: toolbar button → cancel button → editor → footer elements", async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorWithFooterOnCancel />);

      await page.keyboard.press("Tab");

      const boldButton = page.getByLabel("Bold");
      await expect(boldButton).toBeFocused();

      await page.keyboard.press("Tab");

      const cancelButton = page.getByRole("button", { name: "Cancel" });
      await expect(cancelButton).toBeFocused();

      await page.keyboard.press("Tab");

      const editorWrapper = page.locator(
        `div[data-role='pw-rte-editor-toolbar-wrapper']`,
      );
      await expect(editorWrapper).toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
      );
      const editor = page.getByRole("textbox");
      await expect(editor).toBeFocused();

      await page.keyboard.press("Tab");
      const button1 = page.getByRole("button", { name: "foo" });
      await expect(button1).toBeFocused();

      await page.keyboard.press("Tab");
      const button2 = page.getByRole("button", { name: "bar" });
      await expect(button2).toBeFocused();

      await page.keyboard.press("Tab");
      const button3 = page.getByRole("button", { name: "baz" });
      await expect(button3).toBeFocused();

      await expect(editorWrapper).not.toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
      );
      await expect(editor).not.toBeFocused();
    });
  });

  test.describe("inputHint", () => {
    test(`value of 'hint'`, async ({ mount, page }) => {
      await mount(<TextEditorDefaultComponent inputHint="hint" />);
      const hint = page.locator(`div[data-role='hint-text']`);
      await expect(hint).toHaveText("hint");
    });

    test(`value not provided`, async ({ mount, page }) => {
      await mount(<TextEditorDefaultComponent />);
      const hint = await page.locator(`div[data-role='hint-text']`).count();
      expect(hint).toBe(0);
    });
  });

  test.describe("labelText", () => {
    [{ value: "Text Editor" }].forEach(({ value }) => {
      test(`value of ${value}`, async ({ mount, page }) => {
        await mount(<TextEditorDefaultComponent labelText={value} />);
        const editorLabel = page.locator("label[data-element='label']");
        await expect(editorLabel).toHaveText(value);
      });
    });
  });

  test.describe("placeholder", () => {
    [undefined, "Enter text here"].forEach((placeholder) => {
      test(`value of ${placeholder}`, async ({ mount, page }) => {
        await mount(<TextEditorDefaultComponent placeholder={placeholder} />);
        const displayedPlaceholder = page.locator(
          "div[data-role='pw-rte-placeholder']",
        );
        await expect(displayedPlaceholder).toHaveText(placeholder || "");
      });
    });
  });

  test.describe("previews", () => {
    test("simple", async ({ mount, page }) => {
      const previews = [
        <a href="https://www.sage.com">Sage</a>,
        <a href="https://carbon.sage.com">Carbon</a>,
      ];
      await mount(<TextEditorDefaultComponent previews={previews} />);
      expect(await page.locator("a").count()).toBe(2);
    });

    test("complex", async ({ mount, page }) => {
      const samplePreview = (key: number) => {
        const _id = `preview-${key}`;
        return (
          <div key={key} id={_id} data-role="preview">
            <h1>Heading</h1>
            <p>Paragraph</p>
            <button type="button">Button</button>
          </div>
        );
      };
      const previews = [];
      for (let i = 0; i < 10; i++) {
        previews.push(samplePreview(i));
      }
      await mount(<TextEditorDefaultComponent previews={previews} />);
      expect(await page.locator("div[data-role='preview']").count()).toBe(10);
    });
  });

  test.describe("required", () => {
    [true, false].forEach((required) => {
      test(`value of ${required}`, async ({ mount, page }) => {
        await mount(<TextEditorDefaultComponent required={required} />);
        const content = await page.evaluate(
          "window.getComputedStyle(document.getElementById('pw-rte-label'), '::after').getPropertyValue('content')",
        );
        expect(content).toBe(required ? '"*"' : "none");
      });
    });
  });

  test.describe("value", () => {
    test("renders with a default value and can be interacted with", async ({
      mount,
      page,
    }) => {
      await mount(
        <TextEditorDefaultComponent initialValue={preformattedValue} />,
      );
      const defaultText = page.locator("p");
      await expect(defaultText).toHaveText(
        "Sample text with some formatting applied.",
      );

      const normalText = page.locator("p> span").nth(0);
      await expect(normalText).toHaveText("Sample text with ");
      const boldText = page.locator("p > strong");
      await expect(boldText).toHaveText("some formatting");
      const italicText = page.locator("p > em");
      await expect(italicText).toHaveText("applied");

      const textbox = page.locator("div[role='textbox']");
      await textbox.click();
      await textbox.pressSequentially(" This is added text", { delay: 100 });

      const updatedText = page.locator("p");
      await expect(updatedText).toHaveText(
        "Sample text with some formatting applied. This is added text",
      );

      await textbox.press("Enter");
      await textbox.pressSequentially("New line text", { delay: 100 });

      const newParagraph = page.locator("p").nth(1);
      await expect(newParagraph).toHaveText("New line text");
    });
  });

  test("counts characters correclty after pasting new line characters and interacting with it", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorDefaultComponent />);

    const textToPaste = "1\n\n2\n\n3\n\n\n\n4"; // each new line will be counted as two characters
    const remainingCharactersAfterPasting = "2,980";
    const textToType = "5";
    const remainingCharsAfterTyping = "2,979";
    const textbox = page.getByRole("textbox");

    await textbox.click();

    await textbox.evaluate((_, text) => {
      const clipboardData = new DataTransfer();
      clipboardData.setData("text/plain", text);

      const event = new ClipboardEvent("paste", {
        clipboardData,
        bubbles: true,
        cancelable: true,
      });

      _.dispatchEvent(event);
    }, textToPaste);

    const displayedLimitAfterPastingText = page.getByTestId(
      "pw-rte-character-limit",
    );
    await expect(displayedLimitAfterPastingText).toHaveText(
      `${remainingCharactersAfterPasting} characters remaining`,
    );

    await page.keyboard.type(textToType);

    const displayedLimitAfterKeyboardUpdate = page.getByTestId(
      "pw-rte-character-limit",
    );
    await expect(displayedLimitAfterKeyboardUpdate).toHaveText(
      `${remainingCharsAfterTyping} characters remaining`,
    );
  });

  test("counts characters correclty in the character limit warning after pasting new line characters and interacting with it", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorDefaultComponent characterLimit={10} />);

    const textToPaste = "1\n\n\n\n2\n\n4"; // each new line will be counted as two characters
    const charactersLimit = "5";
    const textToType = "abcd";
    const charactersLimitAfterTyping = "9";
    const textbox = page.getByRole("textbox");

    await textbox.click();

    await textbox.evaluate((_, text) => {
      const clipboardData = new DataTransfer();
      clipboardData.setData("text/plain", text);

      const event = new ClipboardEvent("paste", {
        clipboardData,
        bubbles: true,
        cancelable: true,
      });

      _.dispatchEvent(event);
    }, textToPaste);

    const displayedWarningAfterPastingText = page.getByTestId(
      "pw-rte-validation-message",
    );
    await expect(displayedWarningAfterPastingText).toHaveText(
      `You are ${charactersLimit} character(s) over the character limit`,
    );

    await page.keyboard.type(textToType);

    const displayedWarningAfterKeyboardUpdate = page.getByTestId(
      "pw-rte-validation-message",
    );
    await expect(displayedWarningAfterKeyboardUpdate).toHaveText(
      `You are ${charactersLimitAfterTyping} character(s) over the character limit`,
    );
  });

  test("should correctly apply margin prop as a number", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorDefaultComponent m={2} />);
    const textEditorWrapper = page.locator(`div[data-component='text-editor']`);
    await expect(textEditorWrapper).toHaveCSS("margin", "16px");
  });

  test("should correctly apply margin prop as a string", async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorDefaultComponent m="16px" />);
    const textEditorWrapper = page.locator(`div[data-component='text-editor']`);
    await expect(textEditorWrapper).toHaveCSS("margin", "16px");
  });
});

test.describe("Functionality tests", () => {
  test.describe("onCancel", () => {
    test("resets the content of the editor when the Cancel button is pressed and a default value is provided", async ({
      mount,
      page,
    }) => {
      await mount(
        <TextEditorDefaultComponent
          initialValue={preformattedValue}
          onCancel={() => {}}
        />,
      );
      const textbox = page.locator("div[role='textbox']");
      await textbox.click();
      await textbox.pressSequentially(" This is some text", { delay: 100 });
      const cancelButton = page.locator(
        "button[data-role='pw-rte-cancel-button']",
      );
      await cancelButton.click();
      const displayedText = textbox;
      await expect(displayedText).toHaveText(
        "Sample text with some formatting applied.",
      );
    });
  });

  test.describe("onBlur", () => {
    test("fires when the editor loses focus", async ({ mount, page }) => {
      let currentValue = false;

      await mount(
        <TextEditorDefaultComponent
          onBlur={() => {
            currentValue = true;
          }}
        />,
      );
      const textbox = page.locator("div[role='textbox']");
      await textbox.click();
      await textbox.pressSequentially(" This is some text", { delay: 100 });

      await textbox.press("Tab");

      expect(currentValue).toBe(true);
    });
  });

  test.describe("onChange", () => {
    test("fires when the content of the editor changes", async ({
      mount,
      page,
    }) => {
      let currentValue;
      let currentHtmlValue;
      let currentJSON;

      await mount(
        <TextEditorDefaultComponent
          onChange={(
            value: string,
            { htmlString, json }: EditorFormattedValues,
          ) => {
            currentValue = value;
            currentHtmlValue = htmlString;
            currentJSON = json;
          }}
        />,
      );
      const textbox = page.locator("div[role='textbox']");
      await textbox.click();
      await textbox.pressSequentially(" This is some text", { delay: 100 });

      /** Although nasty and discouraged, the hard-coded wait is here to give
       * the debounce function time to fire the callback.
       */
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(3000);

      expect(currentValue).toBe(" This is some text");
      expect(currentHtmlValue).toBe(
        '<p dir="ltr"><span style="white-space: pre-wrap;"> This is some text</span></p>',
      );
      expect(currentJSON).toEqual({
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: " This is some text",
                  type: "text",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "paragraph",
              version: 1,
              textFormat: 0,
              textStyle: "",
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "root",
          version: 1,
        },
      });
    });
  });

  test.describe("onFocus", () => {
    test("fires when the editor gains focus", async ({ mount, page }) => {
      let currentValue = false;

      await mount(
        <TextEditorDefaultComponent
          onFocus={() => {
            currentValue = true;
          }}
        />,
      );
      const textbox = page.locator("div[role='textbox']");
      await textbox.click();
      expect(currentValue).toBe(true);
    });
  });

  test.describe("onSave", () => {
    test("fires when the save button is clicked", async ({ mount, page }) => {
      let _htmlString = null;
      let _json = null;
      await mount(
        <TextEditorDefaultComponent
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSave={({ htmlString, json }: { htmlString: string; json: any }) => {
            _htmlString = htmlString;
            _json = json;
          }}
        />,
      );

      const textbox = page.locator("div[role='textbox']");
      await textbox.click();
      await textbox.pressSequentially("This is some text", { delay: 100 });

      const saveButton = page.locator("button[data-role='pw-rte-save-button']");
      await saveButton.click();
      expect(_htmlString).not.toBeNull();
      expect(_json).not.toBeNull();
      expect(_htmlString).toBe(
        '<p dir="ltr"><span style="white-space: pre-wrap;">This is some text</span></p>',
      );

      expect(_json).toEqual({
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "This is some text",
                  type: "text",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "paragraph",
              version: 1,
              textFormat: 0,
              textStyle: "",
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "root",
          version: 1,
        },
      });
    });
  });

  test.describe("Bold", () => {
    test("applies and removes bold formatting to selected text", async ({
      mount,
      page,
    }) => {
      await mount(
        <TextEditorDefaultComponent initialValue={unformattedValue} />,
      );
      const textbox = page.locator("div[role='textbox']");
      await textbox.selectText();
      const boldButton = page.locator("button[data-role='pw-rte-bold-button']");
      await boldButton.click();
      const boldText = page.locator("strong");
      await expect(boldText).toHaveText("This text needs formatting");
      await textbox.selectText();
      await boldButton.click();
      expect(await page.locator("strong").count()).toBe(0);
    });

    test("applies and removes bold formatting to the editor directly", async ({
      mount,
      page,
    }) => {
      await mount(
        <TextEditorDefaultComponent initialValue={unformattedValue} />,
      );

      const textbox = page.locator("div[role='textbox']");

      expect(await page.locator("strong").count()).toBe(0);
      expect(await page.locator("span[data-lexical-text='true']").count()).toBe(
        1,
      );

      await textbox.click();

      const boldButton = page.locator("button[data-role='pw-rte-bold-button']");

      await boldButton.click();
      await textbox.click();
      await textbox.pressSequentially("This is some bold text");

      expect(await page.locator("strong").count()).toBe(1);
      await expect(page.getByText("This is some bold text")).toHaveCSS(
        "font-weight",
        "700",
      );

      await boldButton.click();
      await textbox.click();
      await textbox.pressSequentially(" and this is not");

      expect(await page.locator("span[data-lexical-text='true']").count()).toBe(
        2,
      );
      await expect(page.getByText("and this is not")).toHaveCSS(
        "font-weight",
        "400",
      );
    });
  });

  test.describe("Italic", () => {
    test("applies and removes italic formatting to selected text", async ({
      mount,
      page,
    }) => {
      await mount(
        <TextEditorDefaultComponent initialValue={unformattedValue} />,
      );
      const textbox = page.locator("div[role='textbox']");
      await textbox.selectText();
      const italicButton = page.locator(
        "button[data-role='pw-rte-italic-button']",
      );
      await italicButton.click();
      const italicText = page.locator("em");
      await expect(italicText).toHaveText("This text needs formatting");
      await textbox.selectText();
      await italicButton.click();
      expect(await page.locator("em").count()).toBe(0);
    });

    test("applies and removes italic formatting to the editor directly", async ({
      mount,
      page,
    }) => {
      await mount(
        <TextEditorDefaultComponent initialValue={unformattedValue} />,
      );

      const textbox = page.locator("div[role='textbox']");

      expect(await page.locator("em").count()).toBe(0);
      expect(await page.locator("span[data-lexical-text='true']").count()).toBe(
        1,
      );

      await textbox.click();

      const italicButton = page.locator(
        "button[data-role='pw-rte-italic-button']",
      );

      await italicButton.click();
      await textbox.click();
      await textbox.pressSequentially("This is some italic text");

      expect(await page.locator("em").count()).toBe(1);
      await expect(page.getByText("This is some italic text")).toHaveCSS(
        "font-style",
        "italic",
      );

      await italicButton.click();
      await textbox.click();
      await textbox.pressSequentially(" and this is not");

      expect(await page.locator("span[data-lexical-text='true']").count()).toBe(
        2,
      );
      await expect(page.getByText("and this is not")).toHaveCSS(
        "font-style",
        "normal",
      );
    });
  });

  test.describe("Ordered List", () => {
    test("applies and removes ordered list formatting", async ({
      mount,
      page,
    }) => {
      await mount(
        <TextEditorDefaultComponent initialValue={unformattedValue} />,
      );
      const textbox = page.locator("div[role='textbox']");
      await textbox.selectText();
      const orderedListButton = page.locator(
        "button[data-role='pw-rte-ordered-list-button']",
      );
      await orderedListButton.click();
      const orderedList = page.locator("ol");
      await expect(orderedList).toHaveText("This text needs formatting");
      await orderedListButton.click();
      expect(await page.locator("ol").count()).toBe(0);
    });
  });

  test.describe("Unordered List", () => {
    test("applies and removes unordered list formatting", async ({
      mount,
      page,
    }) => {
      await mount(
        <TextEditorDefaultComponent initialValue={unformattedValue} />,
      );
      const textbox = page.locator("div[role='textbox']");
      await textbox.selectText();
      const unorderedListButton = page.locator(
        "button[data-role='pw-rte-unordered-list-button']",
      );
      await unorderedListButton.click();
      const unorderedList = page.locator("ul");
      await expect(unorderedList).toHaveText("This text needs formatting");
      await unorderedListButton.click();
      expect(await page.locator("ul").count()).toBe(0);
    });
  });
});

test.describe("Events tests", () => {
  test.describe("onLinkAdded", () => {
    test("fires when a link is added to the editor", async ({
      mount,
      page,
    }) => {
      let _link = null;
      await mount(
        <TextEditorDefaultComponent
          onLinkAdded={(link: string) => {
            _link = link;
          }}
        />,
      );
      const textbox = page.locator("div[role='textbox']");
      await textbox.click();
      await textbox.fill("https://www.");
      await textbox.press("g");
      expect(_link).toBe("https://www.g");
      await textbox.pressSequentially("oogle.com", { delay: 100 });
      expect(_link).toBe("https://www.google.com");
      for (let i = 0; i < 10; i++) {
        await textbox.press("Backspace");
      }
      expect(await page.locator("a").count()).toBe(0);
    });
  });

  test.describe("Shortcut keys", () => {
    test.describe("Bold", () => {
      test("pressing Meta + B toggles bold text", async ({ mount, page }) => {
        await mount(
          <TextEditorDefaultComponent initialValue={unformattedValue} />,
        );
        const textbox = page.locator("div[role='textbox']");
        await textbox.selectText();
        await page.keyboard.press("ControlOrMeta+B");
        expect(await page.locator("strong").count()).toBe(1);
        await page.keyboard.press("ControlOrMeta+B");
        expect(await page.locator("strong").count()).toBe(0);
      });

      test("surrounding text with double asterisks sets text to bold", async ({
        mount,
        page,
      }) => {
        await mount(<TextEditorDefaultComponent />);
        const textbox = page.locator("div[role='textbox']");
        await textbox.click();
        await textbox.pressSequentially("**", { delay: 100 });
        expect(await page.locator("strong").count()).toBe(0);
        await textbox.pressSequentially("Bold text", { delay: 100 });
        expect(await page.locator("strong").count()).toBe(0);
        await textbox.pressSequentially("**", { delay: 100 });
        expect(await page.locator("strong").count()).toBe(1);
      });
    });

    test.describe("Italic", () => {
      test("pressing Meta + I toggles italic text", async ({ mount, page }) => {
        await mount(
          <TextEditorDefaultComponent initialValue={unformattedValue} />,
        );
        const textbox = page.locator("div[role='textbox']");
        await textbox.selectText();
        await page.keyboard.press("ControlOrMeta+I");
        expect(await page.locator("em").count()).toBe(1);
        await page.keyboard.press("ControlOrMeta+I");
        expect(await page.locator("em").count()).toBe(0);
      });

      test("surrounding text with single asterisks sets text to italic", async ({
        mount,
        page,
      }) => {
        await mount(<TextEditorDefaultComponent />);
        const textbox = page.locator("div[role='textbox']");
        await textbox.click();
        await textbox.pressSequentially("*", { delay: 100 });
        expect(await page.locator("em").count()).toBe(0);
        await textbox.pressSequentially("Italic text", { delay: 100 });
        expect(await page.locator("em").count()).toBe(0);
        await textbox.pressSequentially("*", { delay: 100 });
        expect(await page.locator("em").count()).toBe(1);
      });
    });

    ["*", "-", "+"].forEach((ulChar) => {
      test(`inserting/removing a "${ulChar}" character at the start of a line toggles an unordered list`, async ({
        mount,
        page,
      }) => {
        await mount(
          <TextEditorDefaultComponent initialValue={unformattedValue} />,
        );
        const textbox = page.locator("div[role='textbox']");
        await textbox.click();
        await textbox.press("Home");
        expect(await page.locator("ul").count()).toBe(0);
        await textbox.pressSequentially(`${ulChar} `, { delay: 100 });
        expect(await page.locator("ul").count()).toBe(1);
        for (let i = 0; i < 2; i++) {
          await textbox.press("Backspace");
        }
        expect(await page.locator("ul").count()).toBe(0);
      });
    });

    test(`inserting/removing the number 1 followed by a "." character at the start of a line toggles an ordered list`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TextEditorDefaultComponent initialValue={unformattedValue} />,
      );
      const textbox = page.locator("div[role='textbox']");
      await textbox.click();
      await textbox.press("Home");
      expect(await page.locator("ol").count()).toBe(0);
      await textbox.pressSequentially(`1. `, { delay: 100 });
      expect(await page.locator("ol").count()).toBe(1);
      for (let i = 0; i < 3; i++) {
        await textbox.press("Backspace");
      }
      expect(await page.locator("ol").count()).toBe(0);
    });

    test('beginning a line of text with the ">" character followed by a space inserts a quote', async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorDefaultComponent />);
      const textbox = page.locator("div[role='textbox']");
      await textbox.click();
      await textbox.pressSequentially(">", { delay: 100 });
      expect(await page.locator("blockquote").count()).toBe(0);
      await textbox.pressSequentially(" ", { delay: 100 });
      expect(await page.locator("blockquote").count()).toBe(1);
      await textbox.press("Backspace");
      expect(await page.locator("blockquote").count()).toBe(0);
    });

    [
      { char: "#", tag: "h1" },
      { char: "##", tag: "h2" },
      { char: "###", tag: "h3" },
      { char: "####", tag: "h4" },
    ].forEach(({ char: headingChar, tag }) => {
      test(`beginning a line of text with the "${headingChar}" character followed by a space inserts a "${tag}" heading`, async ({
        mount,
        page,
      }) => {
        await mount(<TextEditorDefaultComponent />);
        const textbox = page.locator("div[role='textbox']");
        await textbox.click();
        expect(await page.locator(tag).count()).toBe(0);
        await textbox.pressSequentially(`${headingChar} `, { delay: 100 });
        expect(await page.locator(tag).count()).toBe(1);
        for (let i = 0; i < headingChar.length + 1; i++) {
          await textbox.press("Backspace");
        }
        expect(await page.locator(tag).count()).toBe(0);
      });
    });

    test("allows the standard markdown link format to be used", async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorDefaultComponent />);
      const textbox = page.locator("div[role='textbox']");
      await textbox.click();
      await textbox.pressSequentially("[Link text](https://www.sage.com)", {
        delay: 100,
      });
      expect(await page.locator("a").count()).toBe(1);
    });
  });
});

test.describe("Styling tests", () => {
  test.describe("rows", () => {
    [
      { rows: 1, expectedHeight: 210 },
      { rows: 2, expectedHeight: 210 },
      { rows: 3, expectedHeight: 63 },
      { rows: 5, expectedHeight: 105 },
      { rows: 10, expectedHeight: 210 },
      { rows: 20, expectedHeight: 420 },
    ].forEach(({ expectedHeight, rows }) => {
      test(`has the correct height with a rows property of ${rows}`, async ({
        mount,
        page,
      }) => {
        await mount(<TextEditorDefaultComponent rows={rows} />);
        await expect(
          page.locator("div[data-role='pw-rte-editable']"),
        ).toHaveCSS("min-height", `${expectedHeight}px`);
      });
    });
  });

  test("should render links with expected styling", async ({ mount, page }) => {
    const previews = [
      <a
        href="https://carbon.sage.com/?path=/story/welcome--welcome-page"
        rel="noreferrer"
        dir="ltr"
      >
        <span data-lexical-text="true">Carbon</span>
      </a>,
    ];
    await mount(<TextEditorDefaultComponent previews={previews} />);

    const link = page.getByRole("link", { name: "Carbon" });

    await expect(link).toHaveCSS("color", "rgb(0, 126, 69)");
    await expect(link).toHaveCSS("cursor", "pointer");

    await link.hover();
    await expect(link).toHaveCSS("color", "rgb(0, 103, 56)");

    await link.focus();
    await expect(link).toHaveCSS("outline", "rgba(0, 0, 0, 0.9) none 0px");
    await expect(link).toHaveCSS(
      "text-decoration",
      "none solid rgba(0, 0, 0, 0.9)",
    );
    await expect(link).toHaveCSS("color", "rgba(0, 0, 0, 0.9)");
    await expect(link).toHaveCSS("background-color", "rgb(255, 218, 128)");
    await expect(link).toHaveCSS("border-radius", "2px");
    await expect(link).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px",
    );
  });
});

test.describe("Accessibility tests", () => {
  test(`should pass for default component`, async ({ mount, page }) => {
    await mount(<TextEditorDefaultComponent />);

    await checkAccessibility(page);
  });

  test(`should pass for default component in error state`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorDefaultComponent error="This is an error" />);

    await checkAccessibility(page);
  });

  test(`should pass for default component in warning state`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorDefaultComponent warning="This is a warning" />);

    await checkAccessibility(page);
  });
});
