/* eslint-disable react/prop-types */
import * as React from "react";
import TextEditor, {
  TextEditorState as EditorState,
  TextEditorContentState as ContentState,
} from "./text-editor.component";

import {
  textEditorInput,
  textEditorCounter,
  textEditorContainer,
  textEditorToolbar,
  innerText,
  innerTextList,
} from "../../../cypress/locators/text-editor";

import { getDataElementByValue } from "../../../cypress/locators";
import { positionOfElement, keyCode } from "../../../cypress/support/helper";
import { verifyRequiredAsteriskForLabel } from "../../../cypress/support/component-helper/common-steps";
import {
  VALIDATION,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

const TextEditorCustom = ({ text, onChange, onLinkAdded, ...props }) => {
  const initialValue = text
    ? EditorState.createWithContent(ContentState.createFromText(text))
    : EditorState.createEmpty();

  const [value, setValue] = React.useState(initialValue);
  const ref = React.useRef(null);

  const handleChange = (newValue) => {
    if (onChange) {
      onChange();
    }
    setValue(newValue);
  };

  return (
    <div
      style={{
        padding: "4px",
      }}
    >
      <TextEditor
        onChange={handleChange}
        value={value}
        ref={ref}
        labelText="Text Editor Label"
        onLinkAdded={onLinkAdded}
        {...props}
      />
    </div>
  );
};

const TextEditorCustomValidation = ({ ...props }) => {
  const [value, setValue] = React.useState(
    EditorState.createWithContent(ContentState.createFromText("Add content"))
  );
  const limit = 16;
  const contentLength = value.getCurrentContent().getPlainText().length;
  const ref = React.useRef(null);

  return (
    <div
      style={{
        padding: "4px",
      }}
    >
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        ref={ref}
        labelText="Text Editor Label"
        characterLimit={limit}
        error={limit - contentLength <= 5 ? "There is an error" : undefined}
        warning={limit - contentLength <= 10 ? "There is a warning" : undefined}
        info={limit - contentLength <= 15 ? "There is an info" : undefined}
        {...props}
      />
    </div>
  );
};

const textForInput = "Testing is awesome";
const linkText = "https://carbon.sage.com";
const longText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const longTextAssert =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ";
const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Test for TextEditor component", () => {
  describe("check functionality for TextEditor component", () => {
    it("should check the counter works properly", () => {
      CypressMountWithProviders(<TextEditorCustom />);

      textEditorInput().clear().type(textForInput);
      textEditorCounter().should("have.text", 2982);
    });

    it.each([["bold"], ["italic"]])(
      "should render text using %s style",
      (buttonType) => {
        CypressMountWithProviders(<TextEditorCustom />);

        textEditorToolbar(buttonType).click();
        textEditorInput().clear().type(textForInput);
        if (buttonType === "bold") {
          innerText().should("have.css", "font-weight", "700");
        } else if (buttonType === "italic") {
          innerText().should("have.css", "font-style", "italic");
        }
        textEditorToolbar(buttonType).should(
          "have.css",
          "background-color",
          "rgb(204, 214, 219)"
        );
      }
    );

    it.each([["bullet-list"], ["number-list"]])(
      "should render text in %s style",
      (buttonType) => {
        CypressMountWithProviders(<TextEditorCustom />);

        textEditorToolbar(buttonType).click();
        textEditorInput().clear().type("Testing{Enter}is{Enter}awesome");
        if (buttonType === "bullet-list") {
          innerTextList("ul", positionOfElement("second")).should(
            "have.text",
            "Testing"
          );
          innerTextList("ul", positionOfElement("third")).should(
            "have.text",
            "is"
          );
          innerTextList("ul", positionOfElement("fourth")).should(
            "have.text",
            "awesome"
          );
        } else if (buttonType === "bullet-list-numbers") {
          innerTextList("ol", positionOfElement("second")).should(
            "have.text",
            "Testing"
          );
          innerTextList("ol", positionOfElement("third")).should(
            "have.text",
            "is"
          );
          innerTextList("ol", positionOfElement("fourth")).should(
            "have.text",
            "awesome"
          );
        }
        textEditorToolbar(buttonType).should(
          "have.css",
          "background-color",
          "rgb(204, 214, 219)"
        );
      }
    );

    it.each([
      ["bold", 0],
      ["italic", 1],
      ["bullet-list", 2],
      ["number-list", 3],
    ])(
      "should focus %s button using RightArrow keyboard key",
      (buttonType, times) => {
        CypressMountWithProviders(<TextEditorCustom />);
        textEditorInput().focus().tab();
        for (let i = 0; i < times; i++) {
          cy.focused().trigger("keydown", keyCode("rightarrow"));
        }
        textEditorToolbar(buttonType).should("be.focused");
      }
    );

    it.each([
      ["bold", 4],
      ["italic", 3],
      ["bullet-list", 2],
      ["number-list", 1],
    ])(
      "should focus %s button using ArrowLeft keyboard key",
      (buttonType, times) => {
        CypressMountWithProviders(<TextEditorCustom />);
        textEditorInput().focus().tab();
        for (let i = 0; i < times; i++) {
          cy.focused().trigger("keydown", keyCode("leftarrow"));
        }
        textEditorToolbar(buttonType).should("be.focused");
      }
    );

    it.each([
      ["bold", 0],
      ["italic", 1],
      ["bullet-list", 2],
      ["number-list", 3],
    ])(
      "should activate %s button using Enter keyboard key",
      (buttonType, times) => {
        CypressMountWithProviders(<TextEditorCustom />);
        textEditorInput().focus().tab();
        for (let i = 0; i < times; i++) {
          cy.focused().trigger("keydown", keyCode("rightarrow"));
        }
        cy.focused().trigger("keydown", keyCode("Enter"));
        textEditorToolbar(buttonType).should(
          "have.css",
          "background-color",
          "rgb(204, 214, 219)"
        );
      }
    );

    it.each([
      ["bold", 0],
      ["italic", 1],
      ["bullet-list", 2],
      ["number-list", 3],
    ])(
      "should activate %s button using Space keyboard key",
      (buttonType, times) => {
        CypressMountWithProviders(<TextEditorCustom />);
        textEditorInput().focus().tab();
        for (let i = 0; i < times; i++) {
          cy.focused().trigger("keydown", keyCode("rightarrow"));
        }
        cy.focused().trigger("keydown", keyCode("Space"));
        textEditorToolbar(buttonType).should(
          "have.css",
          "background-color",
          "rgb(204, 214, 219)"
        );
      }
    );

    it("should render formatted link", () => {
      CypressMountWithProviders(<TextEditorCustom />);

      textEditorInput().clear().type(linkText);
      innerText().should("have.text", linkText);
    });

    it("should not allow user to type more than characterLimit", () => {
      CypressMountWithProviders(<TextEditorCustom characterLimit={100} />);

      textEditorInput().clear().type(longText);

      textEditorCounter().should("have.text", 0);
      innerText().should("have.text", longTextAssert);
    });

    describe("check props for TextEditor component", () => {
      it.each(testData)(
        "should render TextEditor with %s as a label",
        (labelValue) => {
          CypressMountWithProviders(
            <TextEditorCustom labelText={labelValue} />
          );

          getDataElementByValue("label")
            .invoke("text")
            .should("equal", labelValue);
        }
      );

      it("should render TextEditor with required prop", () => {
        CypressMountWithProviders(<TextEditorCustom required />);

        verifyRequiredAsteriskForLabel();
      });

      it.each([
        ["error", 0, VALIDATION.ERROR],
        ["warning", 5, VALIDATION.WARNING],
        ["info", 10, VALIDATION.INFO],
      ])("should show %s validation state", (state, times, color) => {
        CypressMountWithProviders(<TextEditorCustomValidation />);

        for (let i = 0; i < times; i++) {
          textEditorInput().type("{backspace}");
        }

        getDataElementByValue(state).then(($els) => {
          const win = $els[0].ownerDocument.defaultView;
          const before = win.getComputedStyle($els[0], "before");
          const contentValue = before.getPropertyValue("color");
          expect(contentValue).to.eq(color);
        });
      });

      it.each([
        [2, 42],
        [4, 84],
      ])("should render TextEditor with set rows prop to %s", (rows, px) => {
        CypressMountWithProviders(<TextEditorCustom rows={rows} />);

        textEditorContainer().should("have.css", "min-height", `${px}px`);
      });
    });

    describe("check events for TextEditor component", () => {
      let callback;
      const text = "1";

      beforeEach(() => {
        callback = cy.stub();
      });

      // created an issue FE-5139 to fix this
      it.skip("should call onChange callback when a type event is triggered", () => {
        CypressMountWithProviders(
          <TextEditorCustom text={text} onChange={callback} />
        );

        textEditorInput()
          .type(text)
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });

      it("should call onLinkAdded callback when a valid url is detected by TextEditor", () => {
        CypressMountWithProviders(<TextEditorCustom onLinkAdded={callback} />);

        textEditorInput()
          .type("https://carbon.s")
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });
    });
  });
});
