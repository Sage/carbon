import React from "react";
import { SimpleColor, SimpleColorPicker } from ".";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import {
  simpleColorPicker,
  advancedColorPicker,
  simpleColorPickerInput,
  simpleColorPickerComponent,
} from "../../../cypress/locators/advanced-color-picker";

import { verifyRequiredAsteriskForLegend } from "../../../cypress/support/component-helper/common-steps";

import { simpleColorPickerLegend } from "../../../cypress/locators/simple-color-picker";

import {
  commonDataElementInputPreview,
  getDataElementByValue,
} from "../../../cypress/locators";

import { keyCode } from "../../../cypress/support/helper";

import {
  VALIDATION,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";

const verifyBeforeColor = (element, color) =>
  getDataElementByValue(element).then(($els) => {
    // get Window reference from element
    const win = $els[0].ownerDocument.defaultView;
    // use getComputedStyle to read the pseudo selector
    const before = win.getComputedStyle($els[0], "before");
    // read the value of the `content` CSS property
    const colorVal = before.getPropertyValue("color");
    // the returned value will have double quotes around it, but this is correct
    expect(colorVal).to.eq(color);
  });

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

const indexes = Array.from({ length: colors.length }).map((_, index) => index);

const SimpleColorPickerCustom = ({ onChange, ...props }) => {
  const [state, setState] = React.useState("transparent");

  const handleChange = (e) => {
    const { value } = e.target;
    if (onChange) {
      onChange(value);
    }
    setState(value);
  };
  return (
    <SimpleColorPicker
      name="picker-default-example"
      legend="Legend"
      onChange={handleChange}
      value={state}
      {...props}
    >
      {colors.map(({ color, label }) => (
        <SimpleColor value={color} key={color} aria-label={label} id={color} />
      ))}
    </SimpleColorPicker>
  );
};

const SimpleColorCustom = ({ onChange, ...props }) => {
  const [state, setState] = React.useState("transparent");

  const handleChange = (e) => {
    const { value } = e.target;
    if (onChange) {
      onChange(value);
    }
    setState(value);
  };
  return (
    <>
      <SimpleColor
        value={state}
        key={colors[0].color}
        aria-label={colors[0].label}
        id={colors[0].color}
        onChange={handleChange}
        {...props}
      />
      <SimpleColor
        value={state}
        key={colors[1].color}
        aria-label={colors[1].label}
        id={colors[1].color}
        onChange={handleChange}
        {...props}
      />
    </>
  );
};

context("Testing SimpleColorPicker component", () => {
  describe("should render SimpleColorPicker component and check functionality", () => {
    it("should render all proper colors", () => {
      CypressMountWithProviders(<SimpleColorPickerCustom />);

      cy.fixture(`commonComponents/simpleColorPicker.json`).then(($json) => {
        for (let i = 0; i < $json.length; ++i) {
          simpleColorPickerInput(i)
            .should("have.value", $json[i].color)
            .and("have.attr", "aria-label", $json[i].label);
        }
      });
    });

    it.each(testData)(
      "should render SimpleColorPicker and set legend to %s",
      (legend) => {
        CypressMountWithProviders(<SimpleColorPickerCustom legend={legend} />);

        simpleColorPickerLegend().should("have.text", legend);
      }
    );

    it.each(testData)(
      "should render SimpleColorPicker and set name to %s",
      (name) => {
        CypressMountWithProviders(<SimpleColorPickerCustom name={name} />);

        commonDataElementInputPreview().should("have.attr", "name", name);
      }
    );

    it.each([
      ["rightarrow", 9, 0],
      ["leftarrow", 0, 9],
      ["leftarrow", 3, 2],
      ["rightarrow", 3, 4],
      ["downarrow", 3, 8],
      ["uparrow", 8, 3],
    ])(
      "should use %s key and move selection to %s cell",
      (key, indexToTrigger, indexToPickUp) => {
        CypressMountWithProviders(<SimpleColorPickerCustom />);

        simpleColorPickerInput(indexToTrigger).trigger("keydown", keyCode(key));
        simpleColorPickerInput(indexToPickUp).should(
          "have.attr",
          "aria-checked",
          "true"
        );
      }
    );

    it.each([[1], [2], [3]])(
      "should select proper %s cell for SimpleColorPicker",
      (cellIndex) => {
        CypressMountWithProviders(<SimpleColorPickerCustom />);

        for (let i = 0; i < cellIndex; ++i) {
          simpleColorPickerInput(i + 1).click();
        }

        simpleColorPicker(cellIndex).should(
          "have.attr",
          "aria-checked",
          "true"
        );
      }
    );

    it.each([
      ["250", "232px"],
      ["450", "406px"],
    ])(
      "should render SimpleColorPicker with maxWidth prop set to %s",
      (maxWidth, assertionValue) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom maxWidth={maxWidth} />
        );

        simpleColorPickerComponent()
          .find("div")
          .children()
          .should("have.css", "maxWidth", assertionValue);
      }
    );

    it.each([
      ["300", "75", 89, 33, 233],
      ["100", "60", 321, 265, 1],
    ])(
      "should render SimpleColorPicker with childWidth prop set to %s",
      (maxWidth, childWidth, bottomLess, topLess, leftLess) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom
            maxWidth={maxWidth}
            childWidth={childWidth}
          />
        );

        const additionVal = 2;

        advancedColorPicker(4).then(($el) => {
          const position = $el[0].getBoundingClientRect();
          expect(position.bottom).to.be.lessThan(bottomLess + additionVal);
          expect(position.bottom).to.be.greaterThan(bottomLess);
          expect(position.top).to.be.lessThan(topLess + additionVal);
          expect(position.top).to.be.greaterThan(topLess);
          expect(position.left).to.be.lessThan(leftLess + additionVal);
          expect(position.left).to.be.greaterThan(leftLess);
        });
      }
    );

    it("should render SimpleColorPicker with required prop", () => {
      CypressMountWithProviders(<SimpleColorPickerCustom required />);

      verifyRequiredAsteriskForLegend();
    });

    it.each([
      ["error", VALIDATION.ERROR],
      ["warning", VALIDATION.WARNING],
      ["info", VALIDATION.INFO],
    ])(
      "should render SimpleColorPicker and set type to %s and set as string",
      (type, color) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom {...{ [type]: "Message" }} />
        );

        simpleColorPickerComponent()
          .find("div")
          .find(`[data-element="${type}"]`)
          .trigger("mouseover");
        getDataElementByValue("tooltip").should("have.text", "Message");
        simpleColorPickerComponent()
          .find("div")
          .children()
          .should("have.css", "outline-color", color);
        verifyBeforeColor(type, color);
      }
    );

    it.each([
      ["error", VALIDATION.ERROR],
      ["warning", VALIDATION.WARNING],
      ["info", VALIDATION.INFO],
    ])(
      "should render SimpleColorPicker and set type to %s as string and have validationOnLegend prop",
      (type, color) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom
            {...{ [type]: "Message" }}
            validationOnLegend
          />
        );

        simpleColorPickerComponent()
          .find("legend")
          .find(`[data-element="${type}"]`)
          .trigger("mouseover");
        getDataElementByValue("tooltip").should("have.text", "Message");
        simpleColorPickerComponent()
          .find("div")
          .children()
          .should("have.css", "outline-color", color);
        verifyBeforeColor(type, color);
      }
    );

    it.each([
      ["error", VALIDATION.ERROR],
      ["warning", VALIDATION.WARNING],
      ["info", VALIDATION.INFO],
    ])(
      "should render SimpleColorPicker and set type to %s as boolean",
      (type, color) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom {...{ [type]: true }} />
        );

        simpleColorPickerComponent()
          .find(`[data-element="${type}"]`)
          .should("not.exist");
        simpleColorPickerComponent()
          .find("div")
          .children()
          .should("have.css", "outline-color", color);
      }
    );
  });

  describe("should render SimpleColorPicker component and check events", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onChange callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <SimpleColorPickerCustom onChange={callback} />
      );

      simpleColorPickerInput(5)
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onChange callback and focus the correct item when the right arrow key is triggered", () => {
      CypressMountWithProviders(
        <SimpleColorPickerCustom onChange={callback} />
      );
      simpleColorPickerInput(0).click();

      indexes.forEach((index) => {
        const next = index < colors.length - 1 ? index + 1 : 0;

        simpleColorPickerInput(index)
          .trigger("keydown", keyCode("rightarrow"))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledWith(colors[next].color);
          })
          .then(() => {
            simpleColorPickerInput(next).should("be.focused");
          });
      });
    });

    it("should call onChange callback and focus the correct item when the left arrow key is triggered", () => {
      CypressMountWithProviders(
        <SimpleColorPickerCustom onChange={callback} />
      );
      simpleColorPickerInput(0).click();

      indexes.reverse().forEach((index) => {
        const next = index > 0 ? index - 1 : colors.length - 1;

        simpleColorPickerInput(index)
          .trigger("keydown", keyCode("leftarrow"))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledWith(colors[next].color);
          })
          .then(() => {
            simpleColorPickerInput(next).should("be.focused");
          });
      });
    });

    it.each([
      [9, 4],
      [8, 3],
      [7, 2],
      [6, 1],
      [5, 0],
    ])(
      "should call onChange callback and focus the correct item when the up arrow key is triggered",
      (indexPress, focusedIndex) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom onChange={callback} />
        );

        simpleColorPickerInput(indexPress)
          .trigger("keydown", keyCode("uparrow"))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledWith(
              colors[focusedIndex].color
            );
          })
          .then(() => {
            simpleColorPickerInput(focusedIndex).should("be.focused");
          });
      }
    );

    it.each([
      [0, 5],
      [1, 6],
      [2, 7],
      [3, 8],
      [4, 9],
    ])(
      "should call onChange callback and focus the correct item when the down arrow key is triggered",
      (indexPress, focusedIndex) => {
        CypressMountWithProviders(
          <SimpleColorPickerCustom onChange={callback} />
        );

        simpleColorPickerInput(indexPress)
          .trigger("keydown", keyCode("downarrow"))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledWith(
              colors[focusedIndex].color
            );
          })
          .then(() => {
            simpleColorPickerInput(focusedIndex).should("be.focused");
          });
      }
    );

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<SimpleColorPickerCustom onBlur={callback} />);

      simpleColorPickerInput(5)
        .focus()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should not call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(
        <SimpleColorPickerCustom onMouseDown={callback} isBlurBlocked />
      );

      simpleColorPickerInput(5)
        .focus()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.not.been.called;
        });
    });
  });

  describe("should render SimpleColor component and check functionality", () => {
    it("should check the value prop in SimpleColor item", () => {
      CypressMountWithProviders(<SimpleColorCustom value={colors[7].color} />);

      simpleColorPickerInput(0).should((el) => {
        expect(el).to.have.attr("value").to.equal(colors[7].color);
      });
    });

    it("should check the name prop in SimpleColor item", () => {
      CypressMountWithProviders(<SimpleColorCustom name={testPropValue} />);

      simpleColorPickerInput(0).should("have.attr", "name", testPropValue);
    });

    it.each([
      [true, "be.checked"],
      [false, "be.not.checked"],
    ])(
      "should check the checked prop is set to %s in SimpleColor item",
      (checkedBool, assertion) => {
        CypressMountWithProviders(<SimpleColorCustom checked={checkedBool} />);

        simpleColorPickerInput(0).should(assertion);
      }
    );

    it("should check the className prop in SimpleColor item", () => {
      CypressMountWithProviders(
        <SimpleColorCustom className={testPropValue} />
      );

      simpleColorPickerInput(0).parent().should("have.class", testPropValue);
    });
  });

  describe("should render SimpleColor component and check events", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onChange callback when a click event is triggered", () => {
      CypressMountWithProviders(<SimpleColorCustom onChange={callback} />);

      advancedColorPicker(1)
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<SimpleColorCustom onBlur={callback} />);

      advancedColorPicker(1).click();
      cy.focused()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onMouseDown callback when a click event is triggered", () => {
      CypressMountWithProviders(<SimpleColorCustom onMouseDown={callback} />);

      advancedColorPicker(1)
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });
});
