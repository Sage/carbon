import React from "react";
import Textbox from ".";
import Box from "../box";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  verifyRequiredAsteriskForLabel,
  checkGoldenOutline,
} from "../../../cypress/support/component-helper/common-steps";

import {
  getDataElementByValue,
  tooltipPreview,
  commonInputCharacterLimit,
  body,
  getComponent,
  cyRoot,
  fieldHelpPreview,
  getElement,
} from "../../../cypress/locators";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";

import {
  textbox,
  textboxInput,
  textboxPrefix,
} from "../../../cypress/locators/textbox";

import { keyCode } from "../../../cypress/support/helper";
import Button from "../button/button.component";

const verifyOptional = (element) =>
  element.then(($els) => {
    // get Window reference from element
    const win = $els[0].ownerDocument.defaultView;
    // use getComputedStyle to read the pseudo selector
    const after = win.getComputedStyle($els[0], "after");
    // read the value of the `content` CSS property
    const contentValue = after.getPropertyValue("content");
    // the returned value will have double quotes around it, but this is correct
    expect(contentValue).to.eq('"(optional)"');
  });

const TextboxComponent = ({ ...props }) => {
  const [state, setState] = React.useState("Textbox");

  const setValue = ({ target }) => {
    setState(target.value);
  };

  return (
    <Textbox label="Textbox" value={state} onChange={setValue} {...props} />
  );
};

const TextboxComponentInputRef = () => {
  const ref = React.useRef(null);

  return (
    <Box margin="0 25px">
      <Button
        onClick={() => {
          if (ref.current) ref.current.focus();
        }}
      >
        Focus Textbox
      </Button>
      <TextboxComponent
        inputRef={(el) => {
          ref.current = el.current;
        }}
      />
    </Box>
  );
};

context("Tests for Textbox component", () => {
  describe("check props for Textbox component", () => {
    it("should render Textbox with isOptional prop", () => {
      CypressMountWithProviders(<TextboxComponent isOptional />);

      verifyOptional(getDataElementByValue("label").parent());
    });

    it("should render Textbox with data-component prop", () => {
      CypressMountWithProviders(
        <TextboxComponent data-component={CHARACTERS.STANDARD} />
      );

      getComponent(CHARACTERS.STANDARD).should("be.visible");
    });

    it("should render Textbox with data-element prop", () => {
      CypressMountWithProviders(
        <TextboxComponent data-element={CHARACTERS.STANDARD} />
      );
      cyRoot()
        .children()
        .children()
        .should("have.attr", "data-element", CHARACTERS.STANDARD);
    });

    it("should render Textbox with data-role prop", () => {
      CypressMountWithProviders(
        <TextboxComponent data-role={CHARACTERS.STANDARD} />
      );

      cyRoot()
        .children()
        .children()
        .should("have.attr", "data-role", CHARACTERS.STANDARD);
    });

    it("should render Textbox with id prop", () => {
      CypressMountWithProviders(<TextboxComponent id={CHARACTERS.STANDARD} />);

      textboxInput().should("have.attr", "id", CHARACTERS.STANDARD);
    });

    it.each([CHARACTERS.SPECIALCHARACTERS, CHARACTERS.DIACRITICS])(
      "should render Textbox with label prop set to %s",
      (label) => {
        CypressMountWithProviders(<TextboxComponent label={label} />);

        getDataElementByValue("label").should("have.text", label);
      }
    );

    it("should render Textbox with labelInline prop", () => {
      CypressMountWithProviders(<TextboxComponent labelInline />);

      getDataElementByValue("label")
        .parent()
        .should("have.css", "-webkit-box-pack", "end");
    });

    it.each([
      ["left", "start"],
      ["right", "end"],
    ])(
      "should render Textbox with labelAlign prop set to %s",
      (labelAlign, cssValue) => {
        CypressMountWithProviders(
          <TextboxComponent labelInline labelAlign={labelAlign} />
        );

        getDataElementByValue("label")
          .parent()
          .should(($element) =>
            expect($element).to.have.css("justify-content", `flex-${cssValue}`)
          );
      }
    );

    it("should render Textbox with labelHelp prop", () => {
      CypressMountWithProviders(
        <TextboxComponent labelInline labelHelp={CHARACTERS.STANDARD} />
      );

      getDataElementByValue("question").trigger("mouseover");
      tooltipPreview().should("have.text", CHARACTERS.STANDARD);
    });

    it.each([
      [1, "8px"],
      [2, "16px"],
    ])(
      "should render Textbox with labelSpacing prop set to %s",
      (spacing, padding) => {
        CypressMountWithProviders(
          <TextboxComponent labelInline labelSpacing={spacing} />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "padding-right", padding);
      }
    );

    it.each([
      ["10", "90", "135px", "1215px"],
      ["30", "70", "405px", "945px"],
      ["80", "20", "1080px", "270px"],
    ])(
      "should use %s as labelWidth, %s as inputWidth and render it with correct label and input width ratios",
      (label, input, labelRatio, inputRatio) => {
        CypressMountWithProviders(
          <TextboxComponent labelInline labelWidth={label} inputWidth={input} />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "width", labelRatio);

        getDataElementByValue("input")
          .parent()
          .should("have.css", "width", inputRatio);
      }
    );

    it("should render Textbox with required prop", () => {
      CypressMountWithProviders(<TextboxComponent required />);

      verifyRequiredAsteriskForLabel();
    });

    it.each([
      ["11", "11", "rgba(0, 0, 0, 0.55)"],
      ["11", "10", "rgb(203, 55, 74)"],
    ])(
      "should input %s characters and warn if over character limit of %s in Textbox",
      (charactersUsed, limit, color) => {
        const inputValue = "12345678901";

        CypressMountWithProviders(
          <TextboxComponent
            enforceCharacterLimit={false}
            warnOverLimit
            characterLimit={limit}
          />
        );

        textboxInput()
          .type(inputValue)
          .then(() => {
            commonInputCharacterLimit()
              .should("have.text", `${charactersUsed}/${limit}`)
              .and("have.css", "color", color);
          });
      }
    );

    it.each([
      ["11", "11"],
      ["10", "10"],
    ])(
      "should input %s characters and enforce character limit of %s in Textbox",
      (charactersUsed, limit) => {
        CypressMountWithProviders(
          <TextboxComponent enforceCharacterLimit characterLimit={limit} />
        );

        const inputValue = "12345678901";

        textboxInput()
          .type(inputValue)
          .then(() => {
            commonInputCharacterLimit().should(
              "have.text",
              `${charactersUsed}/${limit}`
            );
          });
      }
    );

    it("should render Textbox with name prop", () => {
      CypressMountWithProviders(
        <TextboxComponent name={CHARACTERS.STANDARD} />
      );

      textboxInput().should("have.attr", "name", CHARACTERS.STANDARD);
    });

    it("should render Textbox with disabled prop", () => {
      CypressMountWithProviders(<TextboxComponent disabled />);

      textboxInput().should("be.disabled").and("have.attr", "disabled");
    });

    it.each([CHARACTERS.SPECIALCHARACTERS, CHARACTERS.DIACRITICS])(
      "should render Textbox with placeholder prop set to %s",
      (placeholder) => {
        CypressMountWithProviders(
          <TextboxComponent placeholder={placeholder} />
        );

        textboxInput().should("have.attr", "placeholder", placeholder);
      }
    );

    it("should render Textbox with autoFocus prop", () => {
      CypressMountWithProviders(<TextboxComponent autoFocus />);

      body().tab();
      textboxInput()
        .should("be.focused")
        .then(($el) => {
          checkGoldenOutline($el.parent());
        });
    });

    it("should render Textbox with readOnly prop", () => {
      CypressMountWithProviders(<TextboxComponent readOnly />);

      textboxInput().and("have.attr", "readOnly");
      textbox().should("have.attr", "readOnly");
    });

    it.each(["error", "warning", "info"])(
      "should verify Textbox is displayed with %s validation icon on input",
      (type) => {
        CypressMountWithProviders(
          <TextboxComponent
            labelInline
            labelAlign="right"
            {...{ [type]: "Message" }}
          />
        );

        textbox()
          .children(1)
          .children()
          .children()
          .should("have.attr", "data-component", "icon")
          .and("have.attr", "data-element", type);
      }
    );

    it.each(["error", "warning", "info"])(
      "should verify Textbox is displayed with %s validation icon on label",
      (type) => {
        CypressMountWithProviders(
          <TextboxComponent
            labelInline
            labelAlign="right"
            validationOnLabel
            {...{ [type]: "Message" }}
          />
        );

        getDataElementByValue("label")
          .parent()
          .children(1)
          .children()
          .children()
          .should("have.attr", "data-component", "icon")
          .and("have.attr", "data-element", type);
      }
    );

    it.each([
      ["rgb(203, 55, 74)", "error", true],
      ["rgb(239, 103, 0)", "warning", true],
      ["rgb(0, 96, 167)", "info", true],
      ["rgb(102, 132, 148)", "error", false],
      ["rgb(102, 132, 148)", "warning", false],
      ["rgb(102, 132, 148)", "info", false],
    ])(
      "should verify Textbox input border colour is %s when validation is %s and boolean prop is %s",
      (borderColor, type, bool) => {
        CypressMountWithProviders(
          <TextboxComponent
            labelInline
            labelAlign="right"
            {...{ [type]: bool }}
          />
        );

        textbox().should("have.css", "border-bottom-color", borderColor);
      }
    );

    it("should render Textbox with leftChildren prop", () => {
      CypressMountWithProviders(
        <TextboxComponent leftChildren={<Button>Test</Button>} />
      );

      textbox()
        .children(0)
        .should("have.attr", "data-component", "button")
        .and("be.visible");
    });

    it.each([CHARACTERS.SPECIALCHARACTERS, CHARACTERS.DIACRITICS])(
      "should render Textbox with prefix prop set to %s",
      (prefix) => {
        CypressMountWithProviders(<TextboxComponent prefix={prefix} />);

        textboxPrefix()
          .should("have.text", prefix)
          .and("have.css", "font-size", "16px")
          .and("have.css", "font-weight", "900")
          .and("have.css", "margin-right", "8px");
      }
    );

    it.each([
      [true, "input", "label"],
      [false, "label", "input"],
    ])(
      "should render Textbox with reverse prop set to %s",
      (boolean, firstElement, secondElement) => {
        CypressMountWithProviders(<TextboxComponent reverse={boolean} />);

        cyRoot()
          .children()
          .children()
          .children()
          .children(0)
          .find(firstElement);
        cyRoot()
          .children()
          .children()
          .children()
          .children(1)
          .find(secondElement);
      }
    );

    it.each([
      ["small", "32px"],
      ["medium", "40px"],
      ["large", "48px"],
    ])(
      "should use %s as size and render Textbox with %s as height",
      (size, height) => {
        CypressMountWithProviders(<TextboxComponent size={size} />);

        textbox().should("have.css", "min-height", height);
      }
    );

    it("should render Textbox with positionedChildren prop", () => {
      CypressMountWithProviders(
        <TextboxComponent positionedChildren={<Button>Test</Button>} />
      );

      textbox()
        .parent()
        .children(0)
        .should("have.attr", "data-component", "button")
        .and("be.visible");
    });

    it.each([
      ["flex", "399"],
      ["flex", "400"],
      ["block", "401"],
    ])(
      "should check Textbox label alignment is %s with adaptiveLabelBreakpoint %s and viewport 400",
      (displayValue, breakpoint) => {
        cy.viewport(400, 300);

        CypressMountWithProviders(
          <TextboxComponent adaptiveLabelBreakpoint={breakpoint} />
        );

        getDataElementByValue("label")
          .parent()
          .parent()
          .should("have.css", "display", displayValue);
      }
    );

    it("should render Textbox with labelId prop", () => {
      CypressMountWithProviders(
        <TextboxComponent
          id={`${CHARACTERS.STANDARD}_cy`}
          labelId={CHARACTERS.STANDARD}
        />
      );

      getDataElementByValue("label")
        .should("have.attr", "id", CHARACTERS.STANDARD)
        .and("have.attr", "for", `${CHARACTERS.STANDARD}_cy`);
    });

    it.each([CHARACTERS.SPECIALCHARACTERS, CHARACTERS.DIACRITICS])(
      "should render Textbox with fieldHelp prop set to %s",
      (fieldHelp) => {
        CypressMountWithProviders(<TextboxComponent fieldHelp={fieldHelp} />);

        fieldHelpPreview().should("have.text", fieldHelp);
      }
    );

    it("should render Textbox with formattedValue prop", () => {
      CypressMountWithProviders(
        <TextboxComponent formattedValue={CHARACTERS.STANDARD} />
      );

      textboxInput().should("have.attr", "value", CHARACTERS.STANDARD);
    });

    it.each(["add", "filter", "play"])(
      "should render Textbox with inputIcon prop set to %s",
      (icon) => {
        CypressMountWithProviders(<TextboxComponent inputIcon={icon} />);

        getElement(icon).and("be.visible");
      }
    );

    it("should render Textbox with iconTabIndex prop", () => {
      CypressMountWithProviders(
        <TextboxComponent iconTabIndex={25} inputIcon="add" />
      );

      getDataElementByValue("add").parent().should("have.attr", "tabindex", 25);
    });

    it.each(["top", "bottom", "left", "right"])(
      "should render Textbox component with tooltip positioned to the %s",
      (position) => {
        CypressMountWithProviders(
          <Box m="250px">
            <TextboxComponent
              error={CHARACTERS.STANDARD}
              tooltipPosition={position}
            />
          </Box>
        );
        getDataElementByValue("error").trigger("mouseover");
        tooltipPreview()
          .should("have.text", CHARACTERS.STANDARD)
          .should("have.attr", "data-placement", position);
      }
    );

    it("should render Textbox with helpAriaLabel prop", () => {
      CypressMountWithProviders(
        <TextboxComponent
          labelHelp="field help"
          helpAriaLabel={CHARACTERS.STANDARD}
        />
      );

      getComponent("help").should(
        "have.attr",
        "aria-label",
        CHARACTERS.STANDARD
      );
    });

    it.each(["left", "right"])(
      "should render Textbox with align prop set to %s",
      (align) => {
        CypressMountWithProviders(<TextboxComponent align={align} />);

        textboxInput().should("have.css", "text-align", align);
      }
    );

    it("should render Textbox with inputRef prop and focus the input via click on ref component", () => {
      CypressMountWithProviders(<TextboxComponentInputRef />);

      getComponent("button").click();
      textboxInput().should("be.focused");
    });
  });

  describe("check events for Textbox component", () => {
    const inputValue = "1";
    let callback;
    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onChange callback when a type event is triggered", () => {
      CypressMountWithProviders(<TextboxComponent onChange={callback} />);

      textboxInput()
        .type(inputValue)
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<TextboxComponent onBlur={callback} />);

      textboxInput()
        .click()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClick callback when a click event is triggered", () => {
      CypressMountWithProviders(<TextboxComponent onClick={callback} />);

      textboxInput()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      CypressMountWithProviders(<TextboxComponent onFocus={callback} />);

      textboxInput()
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onMouseDown callback when a mousedown event is triggered", () => {
      CypressMountWithProviders(<TextboxComponent onMouseDown={callback} />);

      textboxInput()
        .trigger("mousedown")
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call iconOnMouseDown callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <TextboxComponent iconOnMouseDown={callback} inputIcon="add" />
      );

      getComponent("icon")
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call iconOnClick callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <TextboxComponent iconOnClick={callback} inputIcon="add" />
      );

      getComponent("icon")
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
    it.each([["Enter"], ["Space"]])(
      "should call iconOnClick callback when %s key is triggered",
      (key) => {
        CypressMountWithProviders(
          <TextboxComponent
            inputIcon="home"
            iconOnClick={callback}
            iconTabIndex="0"
          />
        );

        getComponent("icon")
          .trigger("keydown", { ...keyCode(key), force: true })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it.each([["Enter"], ["Space"]])(
      "should call onKeyDown callback when %s key is triggered",
      (key) => {
        CypressMountWithProviders(<TextboxComponent onKeyDown={callback} />);

        textboxInput()
          .focus()
          .trigger("keydown", { ...keyCode(key), force: true })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it.each([
      [1000, "1"],
      [5000, "5"],
      [10000, "10"],
    ])(
      "should use %s as deferTimeout and defer onChangeDeferred event for %s seconds",
      (timeout) => {
        const callbackOnChange = cy.stub();
        const callbackOnChangeDeff = cy.stub();

        CypressMountWithProviders(
          <TextboxComponent
            deferTimeout={timeout}
            onChange={callbackOnChange}
            onChangeDeferred={callbackOnChangeDeff}
          />
        );

        cy.clock();

        textboxInput()
          .type(inputValue)
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callbackOnChange).to.have.been.calledOnce;
            // eslint-disable-next-line no-unused-expressions
            expect(callbackOnChangeDeff).to.not.have.been.called;
          })
          .then(() => {
            cy.tick(timeout);
          })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callbackOnChangeDeff).to.have.been.calledOnce;
          });
      }
    );
  });
});
