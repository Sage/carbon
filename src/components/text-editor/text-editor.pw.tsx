import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { checkAccessibility } from "../../../playwright/support/helper";

import TextEditorDefaultComponent from "./components.test-pw";

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

      const displayedLimit = await page
        .locator("div[data-role='pw-rte-character-limit']")
        .isVisible();
      expect(displayedLimit).toBe(false);
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
        let displayedLimit = await page
          .locator("div[data-role='pw-rte-character-limit']")
          .textContent();
        expect(displayedLimit).toBe(`${text} characters remaining`);

        const stringToType = "a".repeat(characterLimit);

        const textbox = page.locator("div[role='textbox']");
        await textbox.click();
        await textbox.fill(stringToType);

        /** Although nasty and discouraged, the hard-coded wait is here to give
         * the debounce function time to fire the callback.
         */
        // eslint-disable-next-line playwright/no-wait-for-timeout
        await page.waitForTimeout(3000);

        displayedLimit = await page
          .locator("div[data-role='pw-rte-character-limit']")
          .textContent();
        expect(displayedLimit).toBe(`0 characters remaining`);

        await textbox.fill(`${stringToType}1`);

        // eslint-disable-next-line playwright/no-wait-for-timeout
        await page.waitForTimeout(3000);

        displayedLimit = await page
          .locator("div[data-role='pw-rte-character-limit']")
          .textContent();
        expect(displayedLimit).toBe(`0 characters remaining`);

        const displayedWarning = await page
          .locator("div[data-role='pw-rte-validation-message']")
          .textContent();
        expect(displayedWarning).toBe(
          `You are 1 character(s) over the character limit`,
        );
        await expect(
          await page.locator("div[data-role='pw-rte-validation-message']"),
        ).toHaveCSS("color", "rgb(191, 82, 0)");
      });
    });
  });

  test.describe("inputHint", () => {
    test(`value of 'hint'`, async ({ mount, page }) => {
      await mount(<TextEditorDefaultComponent inputHint="hint" />);
      const hint = await page
        .locator(`div[data-role='pw-rte-input-hint']`)
        .textContent();
      expect(hint).toBe("hint");
    });

    test(`value not provided`, async ({ mount, page }) => {
      await mount(<TextEditorDefaultComponent />);
      const hint = await page
        .locator(`div[data-role='pw-rte-input-hint']`)
        .count();
      expect(hint).toBe(0);
    });
  });

  test.describe("isOptional", () => {
    [true, false].forEach((isOptional) => {
      test(`value of ${isOptional}`, async ({ mount, page }) => {
        await mount(<TextEditorDefaultComponent isOptional={isOptional} />);
        const content = await page.evaluate(
          "window.getComputedStyle(document.getElementById('label-container-pw-rte-label'), '::after').getPropertyValue('content')",
        );
        expect(content).toBe(isOptional ? '"(optional)"' : "none");
      });
    });
  });

  test.describe("labelText", () => {
    [{ value: "Text Editor" }].forEach(({ value }) => {
      test(`value of ${value}`, async ({ mount, page }) => {
        await mount(<TextEditorDefaultComponent labelText={value} />);
        const editorLabel = await page
          .locator("label[data-element='label']")
          .textContent();
        expect(editorLabel).toBe(value);
      });
    });
  });

  test.describe("placeholder", () => {
    [undefined, "Enter text here"].forEach((placeholder) => {
      test(`value of ${placeholder}`, async ({ mount, page }) => {
        await mount(<TextEditorDefaultComponent placeholder={placeholder} />);
        const displayedPlaceholder = await page
          .locator("div[data-role='pw-rte-placeholder']")
          .textContent();
        expect(displayedPlaceholder).toBe(placeholder || "");
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
      await mount(<TextEditorDefaultComponent value={preformattedValue} />);
      const defaultText = await page.locator("p").textContent();
      expect(defaultText).toBe("Sample text with some formatting applied.");

      const normalText = await page.locator("p> span").nth(0).textContent();
      expect(normalText).toBe("Sample text with ");
      const boldText = await page.locator("p > strong").textContent();
      expect(boldText).toBe("some formatting");
      const italicText = await page.locator("p > em").textContent();
      expect(italicText).toBe("applied");

      const textbox = await page.locator("div[role='textbox']");
      await textbox.click();
      await textbox.pressSequentially(" This is added text", { delay: 100 });

      const updatedText = await page.locator("p").textContent();
      expect(updatedText).toBe(
        "Sample text with some formatting applied. This is added text",
      );

      await textbox.press("Enter");
      await textbox.pressSequentially("New line text", { delay: 100 });

      const newParagraph = await page.locator("p").nth(1).textContent();
      expect(newParagraph).toBe("New line text");
    });
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
          value={preformattedValue}
          onCancel={() => {}}
        />,
      );
      const textbox = await page.locator("div[role='textbox']");
      await textbox.click();
      await textbox.pressSequentially(" This is some text", { delay: 100 });
      const cancelButton = page.locator(
        "button[data-role='pw-rte-cancel-button']",
      );
      await cancelButton.click();
      const displayedText = await textbox.textContent();
      expect(displayedText).toBe("Sample text with some formatting applied.");
    });
  });

  test.describe("onChange", () => {
    test("fires when the content of the editor changes", async ({
      mount,
      page,
    }) => {
      let callbackFired = false;
      await mount(
        <TextEditorDefaultComponent
          onChange={() => {
            callbackFired = true;
          }}
        />,
      );
      const textbox = await page.locator("div[role='textbox']");
      await textbox.click();
      await textbox.pressSequentially(" This is some text", { delay: 100 });

      /** Although nasty and discouraged, the hard-coded wait is here to give
       * the debounce function time to fire the callback.
       */
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(3000);

      expect(callbackFired).toBe(true);
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

      const textbox = await page.locator("div[role='textbox']");
      await textbox.click();
      await textbox.pressSequentially("This is some text", { delay: 100 });

      const saveButton = await page.locator(
        "button[data-role='pw-rte-save-button']",
      );
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
      await mount(<TextEditorDefaultComponent value={unformattedValue} />);
      const textbox = await page.locator("div[role='textbox']");
      await textbox.selectText();
      const boldButton = await page.locator(
        "button[data-role='pw-rte-bold-button']",
      );
      await boldButton.click();
      const boldText = await page.locator("strong").textContent();
      expect(boldText).toBe("This text needs formatting");
      await textbox.selectText();
      await boldButton.click();
      expect(await page.locator("strong").count()).toBe(0);
    });
  });

  test.describe("Italic", () => {
    test("applies and removes italic formatting to selected text", async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorDefaultComponent value={unformattedValue} />);
      const textbox = await page.locator("div[role='textbox']");
      await textbox.selectText();
      const italicButton = await page.locator(
        "button[data-role='pw-rte-italic-button']",
      );
      await italicButton.click();
      const italicText = await page.locator("em").textContent();
      expect(italicText).toBe("This text needs formatting");
      await textbox.selectText();
      await italicButton.click();
      expect(await page.locator("em").count()).toBe(0);
    });
  });

  test.describe("Ordered List", () => {
    test("applies and removes ordered list formatting", async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorDefaultComponent value={unformattedValue} />);
      const textbox = await page.locator("div[role='textbox']");
      await textbox.selectText();
      const orderedListButton = await page.locator(
        "button[data-role='pw-rte-ordered-list-button']",
      );
      await orderedListButton.click();
      const orderedList = await page.locator("ol").textContent();
      expect(orderedList).toBe("This text needs formatting");
      await orderedListButton.click();
      expect(await page.locator("ol").count()).toBe(0);
    });
  });

  test.describe("Unordered List", () => {
    test("applies and removes unordered list formatting", async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorDefaultComponent value={unformattedValue} />);
      const textbox = await page.locator("div[role='textbox']");
      await textbox.selectText();
      const unorderedListButton = await page.locator(
        "button[data-role='pw-rte-unordered-list-button']",
      );
      await unorderedListButton.click();
      const unorderedList = await page.locator("ul").textContent();
      expect(unorderedList).toBe("This text needs formatting");
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
      const textbox = await page.locator("div[role='textbox']");
      await textbox.click();
      await textbox.fill("https://www.");
      await textbox.press("g");
      expect(_link).toBe("https://www.g");
      await textbox.pressSequentially("oogle.com", { delay: 100 });
      expect(_link).toBe("https://www.google.com");
      for (let i = 0; i < 10; i++) {
        // eslint-disable-next-line no-await-in-loop
        await textbox.press("Backspace");
      }
      expect(await page.locator("a").count()).toBe(0);
    });
  });

  test.describe("Shortcut keys", () => {
    test.describe("Bold", () => {
      test("pressing Meta + B toggles bold text", async ({ mount, page }) => {
        await mount(<TextEditorDefaultComponent value={unformattedValue} />);
        const textbox = await page.locator("div[role='textbox']");
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
        const textbox = await page.locator("div[role='textbox']");
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
        await mount(<TextEditorDefaultComponent value={unformattedValue} />);
        const textbox = await page.locator("div[role='textbox']");
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
        const textbox = await page.locator("div[role='textbox']");
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
        await mount(<TextEditorDefaultComponent value={unformattedValue} />);
        const textbox = await page.locator("div[role='textbox']");
        await textbox.click();
        await textbox.press("Home");
        expect(await page.locator("ul").count()).toBe(0);
        await textbox.pressSequentially(`${ulChar} `, { delay: 100 });
        expect(await page.locator("ul").count()).toBe(1);
        for (let i = 0; i < 2; i++) {
          // eslint-disable-next-line no-await-in-loop
          await textbox.press("Backspace");
        }
        expect(await page.locator("ul").count()).toBe(0);
      });
    });

    test(`inserting/removing the number 1 followed by a "." character at the start of a line toggles an ordered list`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorDefaultComponent value={unformattedValue} />);
      const textbox = await page.locator("div[role='textbox']");
      await textbox.click();
      await textbox.press("Home");
      expect(await page.locator("ol").count()).toBe(0);
      await textbox.pressSequentially(`1. `, { delay: 100 });
      expect(await page.locator("ol").count()).toBe(1);
      for (let i = 0; i < 3; i++) {
        // eslint-disable-next-line no-await-in-loop
        await textbox.press("Backspace");
      }
      expect(await page.locator("ol").count()).toBe(0);
    });

    test('beginning a line of text with the ">" character followed by a space inserts a quote', async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorDefaultComponent />);
      const textbox = await page.locator("div[role='textbox']");
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
        const textbox = await page.locator("div[role='textbox']");
        await textbox.click();
        expect(await page.locator(tag).count()).toBe(0);
        await textbox.pressSequentially(`${headingChar} `, { delay: 100 });
        expect(await page.locator(tag).count()).toBe(1);
        for (let i = 0; i < headingChar.length + 1; i++) {
          // eslint-disable-next-line no-await-in-loop
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
      const textbox = await page.locator("div[role='textbox']");
      await textbox.click();
      await textbox.pressSequentially("[Link text](https://www.sage.com)", {
        delay: 100,
      });
      expect(await page.locator("a").count()).toBe(1);
    });
  });
});

test.describe("Styling tests", () => {
  test.describe("error", () => {
    test(`value of 'Error message'`, async ({ mount, page }) => {
      await mount(<TextEditorDefaultComponent error="Error message" />);
      const displayedError = await page
        .locator("div[data-role='pw-rte-validation-message']")
        .textContent();
      expect(displayedError).toBe("Error message");
      await expect(
        await page.locator("div[data-role='pw-rte-validation-message']"),
      ).toHaveCSS("color", "rgb(203, 55, 74)");
      await expect(
        await page.locator("div[data-role='pw-rte-validation-message']"),
      ).toHaveCSS("font-weight", "500");

      await expect(
        await page.locator("div[data-role='pw-rte-editor-toolbar-wrapper']"),
      ).toHaveCSS("border", "2px solid rgb(203, 55, 74)");
      await expect(
        await page.locator("div[data-role='pw-rte-editor-toolbar-wrapper']"),
      ).toHaveCSS("border-radius", "8px");

      await expect(
        await page.locator("div[data-role='pw-rte-wrapper']"),
      ).toHaveCSS("border-left", "2px solid rgb(203, 55, 74)");
      await expect(
        await page.locator("div[data-role='pw-rte-wrapper']"),
      ).toHaveCSS("padding-left", "8px");
    });

    test(`value not provided`, async ({ mount, page }) => {
      await mount(<TextEditorDefaultComponent />);
      const displayedError = await page
        .locator("div[data-role='pw-rte-validation-message']")
        .count();
      expect(displayedError).toBe(0);
    });
  });

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
          await page.locator("div[data-role='pw-rte-editable']"),
        ).toHaveCSS("min-height", `${expectedHeight}px`);
      });
    });
  });

  test.describe("warning", () => {
    test(`value of 'Warning message'`, async ({ mount, page }) => {
      await mount(<TextEditorDefaultComponent warning="Warning message" />);
      const displayedWarning = await page
        .locator("div[data-role='pw-rte-validation-message']")
        .textContent();
      expect(displayedWarning).toBe("Warning message");
      await expect(
        await page.locator("div[data-role='pw-rte-validation-message']"),
      ).toHaveCSS("color", "rgb(191, 82, 0)");
      await expect(
        await page.locator("div[data-role='pw-rte-validation-message']"),
      ).toHaveCSS("font-weight", "400");

      await expect(
        await page.locator("div[data-role='pw-rte-editor-toolbar-wrapper']"),
      ).toHaveCSS("border", "2px solid rgb(239, 103, 0)");
      await expect(
        await page.locator("div[data-role='pw-rte-editor-toolbar-wrapper']"),
      ).toHaveCSS("border-radius", "8px");

      await expect(
        await page.locator("div[data-role='pw-rte-wrapper']"),
      ).toHaveCSS("border-left", "2px solid rgb(239, 103, 0)");
      await expect(
        await page.locator("div[data-role='pw-rte-wrapper']"),
      ).toHaveCSS("padding-left", "8px");
    });

    test(`value not provided`, async ({ mount, page }) => {
      await mount(<TextEditorDefaultComponent />);
      const displayedWarning = await page
        .locator("div[data-role='pw-rte-validation-message']")
        .count();
      expect(displayedWarning).toBe(0);
    });
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
