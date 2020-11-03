import React from "react";
import TestRenderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { SimpleColor, SimpleColorPicker } from ".";
import { StyledColorOptions } from "./simple-color-picker.style";
import baseTheme from "../../../style/themes/base";
import { StyledLegendContainer } from "../../../__internal__/fieldset/fieldset.style";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import StyledValidationIcon from "../../../components/validations/validation-icon.style";
import Fieldset from "../../../__internal__/fieldset";

const colorValues = [
  { color: "#00A376" },
  { color: "#0073C1" },
  { color: "#582C83" },
];

const name = "test-group";

function render(renderer = TestRenderer.create, props, childProps) {
  const children = colorValues.map((color, index) => {
    return (
      <SimpleColor
        id={`rId-${index}`}
        key={`radio-key-${color.color}`}
        onChange={jest.fn()}
        value={color.color}
        defaultChecked={color.color === "#0073C1"}
        {...childProps}
      />
    );
  });

  return renderer(
    <SimpleColorPicker
      name={name}
      legend="SimpleColorPicker Legend"
      onChange={jest.fn()}
      {...props}
    >
      {children}
    </SimpleColorPicker>,
    { attachTo: document.getElementById("enzymeContainer") }
  );
}

describe("SimpleColorPicker", () => {
  it("renders as expected", () => {
    expect(render()).toMatchSnapshot();
  });

  describe("it renders childs in rows based on maxWidth and childWith", () => {
    let wrapper, onChange, secondColor;

    describe("onKeyDown", () => {
      beforeEach(() => {
        onChange = jest.fn();
        wrapper = render(mount, { maxWidth: "58", childWith: "58", onChange });
      });
      it("fires onKeyDown callback if provided", () => {
        const onKeyDown = jest.fn();
        wrapper = render(mount, {
          maxWidth: "58",
          childWith: "58",
          onChange,
          onKeyDown,
        });

        const selectedColor = wrapper.find(SimpleColor).at(1).find("input");

        act(() => {
          selectedColor
            .find("input")
            .first()
            .simulate("keydown", { which: 65, key: "a" });
        });

        expect(onKeyDown).toHaveBeenCalled();
      });

      it("confirms that 2nd color is checked by default", () => {
        secondColor = wrapper.find(SimpleColor).at(1);
        const selectedColor = wrapper.find(SimpleColor).at(1).find("input");
        expect(selectedColor.prop("aria-checked")).toBeTruthy();
      });

      it("if unhandled key is pressed", () => {
        secondColor = wrapper.find(SimpleColor).at(1);
        act(() => {
          secondColor
            .find("input")
            .first()
            .simulate("keydown", { which: 17, key: "ctrl" });
        });

        expect(onChange).not.toHaveBeenCalled();
      });

      describe("on left key", () => {
        let container;
        beforeEach(() => {
          container = document.createElement("div");
          container.id = "enzymeContainer";
          document.body.appendChild(container);
          wrapper = render(mount, {
            maxWidth: "58",
            childWith: "58",
            onChange,
          });
        });
        afterEach(() => {
          if (container && container.parentNode) {
            container.parentNode.removeChild(container);
          }

          container = null;
        });
        describe("when on first color ", () => {
          it("does change selection to last color", () => {
            const colorOne = wrapper.find(SimpleColor).at(0);
            spyOn(
              wrapper.find(SimpleColor).last().find("input").getDOMNode(),
              "click"
            );

            act(() => {
              colorOne
                .find("input")
                .first()
                .simulate("keydown", { which: 37, key: "ArrowLeft" });
            });

            expect(
              wrapper.find(SimpleColor).last().find("input").getDOMNode().click
            ).toHaveBeenCalled();

            expect(document.activeElement.getAttribute("value")).toBe(
              wrapper.find(SimpleColor).last().prop("value")
            );
          });
        });
      });

      describe("on up key", () => {
        let container;
        beforeEach(() => {
          container = document.createElement("div");
          container.id = "enzymeContainer";
          document.body.appendChild(container);
          wrapper = render(mount, {
            maxWidth: "58",
            childWith: "58",
            onChange,
          });
        });
        afterEach(() => {
          if (container && container.parentNode) {
            container.parentNode.removeChild(container);
          }

          container = null;
        });
        describe("when up is allowed due to multi rows", () => {
          it("changes selection on up key", () => {
            spyOn(
              wrapper.find(SimpleColor).first().find("input").getDOMNode(),
              "click"
            );
            secondColor = wrapper.find(SimpleColor).at(1);

            act(() => {
              secondColor
                .find("input")
                .first()
                .simulate("keydown", { which: 38, key: "ArrowUp" });
            });

            expect(
              wrapper.find(SimpleColor).first().find("input").getDOMNode().click
            ).toHaveBeenCalled();

            expect(document.activeElement.getAttribute("value")).toBe(
              colorValues[0].color
            );
          });
        });

        describe("when up is disallowed due to top row", () => {
          it("changes selection on up key", () => {
            spyOn(
              wrapper.find(SimpleColor).at(0).find("input").getDOMNode(),
              "click"
            );
            spyOn(
              wrapper.find(SimpleColor).at(1).find("input").getDOMNode(),
              "click"
            );
            secondColor = wrapper.find(SimpleColor).at(0);

            act(() => {
              secondColor.find("input").first().simulate("click");
              secondColor
                .find("input")
                .first()
                .simulate("keydown", { which: 38, key: "ArrowUp" });
            });

            expect(
              wrapper.find(SimpleColor).at(0).find("input").getDOMNode().click
            ).not.toHaveBeenCalled();
            expect(
              wrapper.find(SimpleColor).at(1).find("input").getDOMNode().click
            ).not.toHaveBeenCalled();

            expect(document.activeElement.getAttribute("value")).toBe(
              colorValues[0].color
            );
            expect(onChange).not.toHaveBeenCalled();
          });
        });
      });

      describe("on right key", () => {
        let container;
        beforeEach(() => {
          onChange = jest.fn();
          container = document.createElement("div");
          container.id = "enzymeContainer";
          document.body.appendChild(container);
          wrapper = render(mount, {
            maxWidth: "58",
            childWith: "58",
            onChange,
          });
        });
        afterEach(() => {
          if (container && container.parentNode) {
            container.parentNode.removeChild(container);
          }

          container = null;
        });
        describe("when on last color ", () => {
          it("does change selection to first color", () => {
            const thirdColor = wrapper.find(SimpleColor).at(2);

            spyOn(
              wrapper.find(SimpleColor).first().find("input").getDOMNode(),
              "click"
            );

            act(() => {
              thirdColor
                .find("input")
                .first()
                .simulate("keydown", { which: 39, key: "ArrowRight" });
            });

            expect(
              wrapper.find(SimpleColor).first().find("input").getDOMNode().click
            ).toHaveBeenCalled();
            expect(document.activeElement.getAttribute("value")).toBe(
              wrapper.find(SimpleColor).first().prop("value")
            );
          });
        });

        describe("when on 2nd color ", () => {
          it("changes selection on right key", () => {
            spyOn(
              wrapper.find(SimpleColor).last().find("input").getDOMNode(),
              "click"
            );
            secondColor = wrapper.find(SimpleColor).at(1);

            act(() => {
              secondColor
                .find("input")
                .first()
                .simulate("keydown", { which: 39, key: "ArrowRight" });
            });

            expect(
              wrapper.find(SimpleColor).last().find("input").getDOMNode().click
            ).toHaveBeenCalled();

            expect(document.activeElement.getAttribute("value")).toBe(
              colorValues[2].color
            );
          });
        });
      });

      describe("on down key", () => {
        let container;
        beforeEach(() => {
          onChange = jest.fn();
          container = document.createElement("div");
          container.id = "enzymeContainer";
          document.body.appendChild(container);
          wrapper = render(mount, {
            maxWidth: "58",
            childWith: "58",
            onChange,
          });
        });
        afterEach(() => {
          if (container && container.parentNode) {
            container.parentNode.removeChild(container);
          }

          container = null;
        });
        describe("when down is allowed due to multi rows", () => {
          it("changes selection on down key", () => {
            spyOn(
              wrapper.find(SimpleColor).last().find("input").getDOMNode(),
              "click"
            );
            secondColor = wrapper.find(SimpleColor).at(1);

            act(() => {
              secondColor
                .find("input")
                .first()
                .simulate("keydown", { which: 40, key: "ArrowDown" });
            });

            expect(
              wrapper.find(SimpleColor).last().find("input").getDOMNode().click
            ).toHaveBeenCalled();

            expect(document.activeElement.getAttribute("value")).toBe(
              colorValues[2].color
            );
          });
        });

        describe("when down is disallowed due to bottom row", () => {
          it("changes selection on down key", () => {
            const thirdColor = wrapper.find(SimpleColor).at(2);

            spyOn(
              wrapper.find(SimpleColor).at(0).find("input").getDOMNode(),
              "click"
            );
            spyOn(
              wrapper.find(SimpleColor).at(1).find("input").getDOMNode(),
              "click"
            );

            act(() => {
              thirdColor.find("input").first().simulate("click");
              thirdColor
                .find("input")
                .first()
                .simulate("keydown", { which: 40, key: "ArrowDown" });
            });

            expect(
              wrapper.find(SimpleColor).at(0).find("input").getDOMNode().click
            ).not.toHaveBeenCalled();
            expect(
              wrapper.find(SimpleColor).at(1).find("input").getDOMNode().click
            ).not.toHaveBeenCalled();
            expect(document.activeElement.getAttribute("value")).toBe(
              colorValues[2].color
            );
            expect(onChange).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe("renders two rows", () => {
      it("confirms that last color has data-down attribute false", () => {
        wrapper = render(mount, { maxWidth: "120", childWith: "58" });
        const colorFirst = wrapper.find(SimpleColor).first();
        const colorLast = wrapper.find(SimpleColor).last();
        expect(colorFirst.prop("data-down")).toBeTruthy();
        expect(colorLast.prop("data-down")).toBeFalsy();
      });
    });
  });

  describe("events", () => {
    let wrapper, onBlur, documentMousedownCallback, fireDocumentMousedown;

    beforeEach(() => {
      document.addEventListener = jest.fn((eventName, callback) => {
        if (eventName === "mousedown") {
          documentMousedownCallback = callback;
        }
      });
      fireDocumentMousedown = () => {
        const customEvent = { target: document };
        act(() => {
          documentMousedownCallback(customEvent);
        });
      };
      onBlur = jest.fn();
      wrapper = render(mount, { onBlur });
    });

    describe("handleOnMouseDown", () => {
      describe('if a SimpleColor receives "mousedown, blur"', () => {
        it("SimpleColorPicker calls onBlur", () => {
          const firstSCinput = wrapper
            .find(SimpleColor)
            .first()
            .find("input")
            .first();
          firstSCinput.simulate("mousedown");
          fireDocumentMousedown();
          firstSCinput.simulate("blur");
          expect(onBlur).toHaveBeenCalledTimes(1);
        });
      });

      describe('if a SimpleColor receives "mousedown, mousedown, blur"', () => {
        it("SimpleColorPicker calls onBlur", () => {
          const firstSCinput = wrapper
            .find(SimpleColor)
            .first()
            .find("input")
            .first();
          firstSCinput.simulate("mousedown");
          firstSCinput.simulate("mousedown");
          fireDocumentMousedown();
          firstSCinput.simulate("blur");
          expect(onBlur).toHaveBeenCalledTimes(1);
        });
      });

      describe("if a mousedown is received by first SimpleColor and then second SimpleColor", () => {
        it("SimpleColorPicker calls onBlur", () => {
          const firstSCinput = wrapper
            .find(SimpleColor)
            .first()
            .find("input")
            .first();
          const lastSCinput = wrapper
            .find(SimpleColor)
            .last()
            .find("input")
            .first();
          firstSCinput.simulate("mousedown");
          lastSCinput.simulate("mousedown");
          fireDocumentMousedown();
          firstSCinput.simulate("blur");
          expect(onBlur).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("handleClickOutside", () => {
      describe("if a mousedown event occurs inside a SimpleColor", () => {
        it("SimpleColorPicker does not call onBlur", () => {
          const firstSCinput = wrapper
            .find(SimpleColor)
            .first()
            .find("input")
            .first();
          const customEvent = { target: firstSCinput.getDOMNode() };
          documentMousedownCallback(customEvent);
          expect(onBlur).not.toHaveBeenCalled();
        });
      });

      describe("if a mousedown event occurs outside a SimpleColor", () => {
        it("SimpleColorPicker does not call onBlur", () => {
          fireDocumentMousedown();
          expect(onBlur).not.toHaveBeenCalled();
        });
      });
    });

    describe("handleOnBlur", () => {
      describe("if document is clicked and is outside of the component", () => {
        describe("when blur is not blocked", () => {
          it("calls onBlur on blur event", () => {
            wrapper
              .find(SimpleColor)
              .first()
              .find("input")
              .first()
              .simulate("blur");
            expect(onBlur).toHaveBeenCalledTimes(1);
          });
        });

        describe("when blur is blocked", () => {
          it("calls onBlur on blur event", () => {
            wrapper = render(mount, { isBlurBlocked: true, onBlur });
            wrapper
              .find(SimpleColor)
              .first()
              .find("input")
              .first()
              .simulate("blur");
            expect(onBlur).toHaveBeenCalledTimes(0);
          });
        });
      });
    });
  });

  describe("validations", () => {
    const validationTypes = ["error", "warning", "info"];

    describe.each(validationTypes)("when %s passed as string", (type) => {
      it("renders validation icon by the input", () => {
        const wrapper = render(mount, { [type]: "Message" });
        expect(
          wrapper
            .find(StyledLegendContainer)
            .find(StyledValidationIcon)
            .exists()
        ).toBe(false);
        expect(wrapper.find(StyledValidationIcon).exists()).toBe(true);
      });

      it("renders validation icon by the label if validationOnLegend is also passed as true", () => {
        const wrapper = render(mount, {
          [type]: "Message",
          validationOnLegend: true,
        });
        expect(
          wrapper
            .find(StyledLegendContainer)
            .find(StyledValidationIcon)
            .exists()
        ).toBe(true);
      });

      it("renders proper outline", () => {
        const wrapper = render(mount, { [type]: "Message" });
        const outlineWidth = type === "error" ? 2 : 1;
        assertStyleMatch(
          {
            outline: `${outlineWidth}px solid ${baseTheme.colors[type]}`,
          },
          wrapper.find(StyledColorOptions)
        );
      });
    });

    describe.each(validationTypes)("when %s passed as true boolean", (type) => {
      it("do not renders validation icon", () => {
        const wrapper = render(mount, { [type]: true });
        expect(wrapper.find(StyledValidationIcon).exists()).toBe(false);
      });

      it("renders proper outline", () => {
        const wrapper = render(mount, { [type]: true });
        const outlineWidth = type === "error" ? 2 : 1;
        assertStyleMatch(
          {
            outline: `${outlineWidth}px solid ${baseTheme.colors[type]}`,
          },
          wrapper.find(StyledColorOptions)
        );
      });
    });
  });

  describe("propTypes", () => {
    it("validates the incorrect children prop", () => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});

      mount(
        <SimpleColorPicker name={name} legend="SimpleColorPicker Legend">
          <p>Invalid children</p>
          <p>Invalid children</p>
        </SimpleColorPicker>
      );

      const expected =
        "Warning: Failed prop type: `SimpleColorPicker` only accepts children of" +
        " type `SimpleColor`.\n    in SimpleColorPicker";

      expect(console.error).toHaveBeenCalledWith(expected); // eslint-disable-line no-console
    });
  });

  describe("required", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = render(mount, { required: true });
    });

    it("the required prop is passed to the inputs", () => {
      const inputs = wrapper.find("input");
      inputs.forEach((input) => {
        expect(input.prop("required")).toBe(true);
      });
    });

    it("the isRequired prop is passed to the fieldset", () => {
      const fieldset = wrapper.find(Fieldset);
      expect(fieldset.prop("isRequired")).toBe(true);
    });
  });
});
