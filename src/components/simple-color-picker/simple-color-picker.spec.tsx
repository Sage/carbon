import React, { useEffect, useRef } from "react";
import { act } from "react-dom/test-utils";
import { mount, ReactWrapper } from "enzyme";
import {
  SimpleColor,
  SimpleColorPicker,
  SimpleColorProps,
  SimpleColorPickerProps,
  SimpleColorPickerRef,
} from ".";
import { StyledColorOptions } from "./simple-color-picker.style";
import { StyledLegend } from "../../__internal__/fieldset/fieldset.style";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import StyledValidationIcon from "../../__internal__/validations/validation-icon.style";
import Fieldset from "../../__internal__/fieldset";
import Logger from "../../__internal__/utils/logger";

jest.mock("../../__internal__/utils/logger");

const colorValues = [
  { color: "#00A376" },
  { color: "#0073C1" },
  { color: "#582C83" },
];

const validationVariants = {
  error: "var(--colorsSemanticNegative500)",
  info: "var(--colorsSemanticInfo500)",
  warning: "var(--colorsSemanticCaution500)",
};

const name = "test-group";

function getComponent(
  props?: Partial<SimpleColorPickerProps> &
    React.RefAttributes<SimpleColorPickerRef>,
  childProps?: Partial<SimpleColorProps>
) {
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

  return (
    <SimpleColorPicker
      name={name}
      legend="SimpleColorPicker Legend"
      onChange={jest.fn()}
      {...props}
    >
      {children}
    </SimpleColorPicker>
  );
}

function render(
  props?: Partial<SimpleColorPickerProps>,
  childProps?: Partial<SimpleColorProps>
) {
  return mount(getComponent(props, childProps), {
    attachTo: document.getElementById("enzymeContainer"),
  });
}

describe("SimpleColorPicker", () => {
  let loggerSpy: jest.SpyInstance<void, [message: string]> | jest.Mock;

  beforeEach(() => {
    loggerSpy = jest.spyOn(Logger, "deprecate");
  });

  afterEach(() => {
    loggerSpy.mockRestore();
  });

  afterAll(() => {
    loggerSpy.mockClear();
  });

  describe("Deprecation warning for uncontrolled", () => {
    it("should display deprecation warning once", () => {
      mount(<SimpleColorPicker legend="uncontrolled" name="uncontrolled" />);

      expect(loggerSpy).toHaveBeenCalledWith(
        "Uncontrolled behaviour in `Simple Color Picker` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
      );

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe("Styled System", () => {
    testStyledSystemMargin((props) => (
      <SimpleColorPicker
        legend="SimpleColorPicker Legend"
        name="test"
        {...props}
      >
        <SimpleColor id="foo" key="bar" value="#00A376" defaultChecked />
      </SimpleColorPicker>
    ));
  });

  describe("it renders children in rows based on maxWidth and childWidth", () => {
    let wrapper: ReactWrapper;
    let onChange: jest.Mock;
    let secondColor: ReactWrapper<
      SimpleColorProps & React.RefAttributes<HTMLInputElement>
    >;

    describe("onKeyDown", () => {
      beforeEach(() => {
        onChange = jest.fn();
        wrapper = render({ maxWidth: "100", childWidth: "100", onChange });
      });
      it("fires onKeyDown callback if provided", () => {
        const onKeyDown = jest.fn();
        wrapper = render({
          maxWidth: "100",
          childWidth: "100",
          onChange,
          onKeyDown,
        });

        const selectedColor = wrapper.find(SimpleColor).at(1).find("input");

        act(() => {
          selectedColor.find("input").first().simulate("keydown", { key: "a" });
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
            .simulate("keydown", { key: "ctrl" });
        });

        expect(onChange).not.toHaveBeenCalled();
      });

      describe("on left key", () => {
        let container: HTMLDivElement | null;
        beforeEach(() => {
          container = document.createElement("div");
          container.id = "enzymeContainer";
          document.body.appendChild(container);
          wrapper = render({
            maxWidth: "100",
            childWidth: "100",
            onChange,
          });
        });
        afterEach(() => {
          if (container && container.parentNode) {
            container.parentNode.removeChild(container);
          }

          container = null;
        });
        describe("when on first color", () => {
          it("does change selection to last color", () => {
            const colorOne = wrapper.find(SimpleColor).at(0);
            jest.spyOn(
              wrapper
                .find(SimpleColor)
                .last()
                .find("input")
                .getDOMNode() as HTMLInputElement,
              "click"
            );

            act(() => {
              colorOne
                .find("input")
                .first()
                .simulate("keydown", { key: "ArrowLeft" });
            });

            expect(
              (wrapper
                .find(SimpleColor)
                .last()
                .find("input")
                .getDOMNode() as HTMLInputElement).click
            ).toHaveBeenCalled();

            expect(document.activeElement?.getAttribute("value")).toBe(
              wrapper.find(SimpleColor).last().prop("value")
            );
          });
        });
      });

      describe("on up key", () => {
        let container: HTMLDivElement | null;
        beforeEach(() => {
          container = document.createElement("div");
          container.id = "enzymeContainer";
          document.body.appendChild(container);
          wrapper = render({
            maxWidth: "100",
            childWidth: "100",
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
            jest.spyOn(
              wrapper
                .find(SimpleColor)
                .first()
                .find("input")
                .getDOMNode() as HTMLInputElement,
              "click"
            );
            secondColor = wrapper.find(SimpleColor).at(1);

            act(() => {
              secondColor
                .find("input")
                .first()
                .simulate("keydown", { key: "ArrowUp" });
            });

            expect(
              (wrapper
                .find(SimpleColor)
                .first()
                .find("input")
                .getDOMNode() as HTMLInputElement).click
            ).toHaveBeenCalled();

            expect(document.activeElement?.getAttribute("value")).toBe(
              colorValues[0].color
            );
          });
        });

        describe("when up is disallowed due to top row", () => {
          it("changes selection on up key", () => {
            jest.spyOn(
              wrapper
                .find(SimpleColor)
                .at(0)
                .find("input")
                .getDOMNode() as HTMLInputElement,
              "click"
            );
            jest.spyOn(
              wrapper
                .find(SimpleColor)
                .at(1)
                .find("input")
                .getDOMNode() as HTMLInputElement,
              "click"
            );
            secondColor = wrapper.find(SimpleColor).at(0);

            act(() => {
              secondColor.find("input").first().simulate("click");
              secondColor
                .find("input")
                .first()
                .simulate("keydown", { key: "ArrowUp" });
            });

            expect(
              (wrapper
                .find(SimpleColor)
                .at(0)
                .find("input")
                .getDOMNode() as HTMLInputElement).click
            ).not.toHaveBeenCalled();
            expect(
              (wrapper
                .find(SimpleColor)
                .at(1)
                .find("input")
                .getDOMNode() as HTMLInputElement).click
            ).not.toHaveBeenCalled();

            expect(document.activeElement?.getAttribute("value")).toBe(
              colorValues[0].color
            );
            expect(onChange).not.toHaveBeenCalled();
          });
        });
      });

      describe("on right key", () => {
        let container: HTMLDivElement | null;
        beforeEach(() => {
          onChange = jest.fn();
          container = document.createElement("div");
          container.id = "enzymeContainer";
          document.body.appendChild(container);
          wrapper = render({
            maxWidth: "100",
            childWidth: "100",
            onChange,
          });
        });
        afterEach(() => {
          if (container && container.parentNode) {
            container.parentNode.removeChild(container);
          }

          container = null;
        });
        describe("when on last color", () => {
          it("does change selection to first color", () => {
            const thirdColor = wrapper.find(SimpleColor).at(2);

            jest.spyOn(
              wrapper
                .find(SimpleColor)
                .first()
                .find("input")
                .getDOMNode() as HTMLInputElement,
              "click"
            );

            act(() => {
              thirdColor
                .find("input")
                .first()
                .simulate("keydown", { key: "ArrowRight" });
            });

            expect(
              (wrapper
                .find(SimpleColor)
                .first()
                .find("input")
                .getDOMNode() as HTMLInputElement).click
            ).toHaveBeenCalled();
            expect(document.activeElement?.getAttribute("value")).toBe(
              wrapper.find(SimpleColor).first().prop("value")
            );
          });
        });

        describe("when on 2nd color", () => {
          it("changes selection on right key", () => {
            jest.spyOn(
              wrapper
                .find(SimpleColor)
                .last()
                .find("input")
                .getDOMNode() as HTMLInputElement,
              "click"
            );
            secondColor = wrapper.find(SimpleColor).at(1);

            act(() => {
              secondColor
                .find("input")
                .first()
                .simulate("keydown", { key: "ArrowRight" });
            });

            expect(
              (wrapper
                .find(SimpleColor)
                .last()
                .find("input")
                .getDOMNode() as HTMLInputElement).click
            ).toHaveBeenCalled();

            expect(document.activeElement?.getAttribute("value")).toBe(
              colorValues[2].color
            );
          });
        });
      });

      describe("on down key", () => {
        let container: HTMLDivElement | null;
        beforeEach(() => {
          onChange = jest.fn();
          container = document.createElement("div");
          container.id = "enzymeContainer";
          document.body.appendChild(container);
          wrapper = render({
            maxWidth: "100",
            childWidth: "100",
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
            jest.spyOn(
              wrapper
                .find(SimpleColor)
                .last()
                .find("input")
                .getDOMNode() as HTMLInputElement,
              "click"
            );
            secondColor = wrapper.find(SimpleColor).at(1);

            act(() => {
              secondColor
                .find("input")
                .first()
                .simulate("keydown", { key: "ArrowDown" });
            });

            expect(
              (wrapper
                .find(SimpleColor)
                .last()
                .find("input")
                .getDOMNode() as HTMLInputElement).click
            ).toHaveBeenCalled();

            expect(document.activeElement?.getAttribute("value")).toBe(
              colorValues[2].color
            );
          });
        });

        describe("when down is disallowed due to bottom row", () => {
          it("changes selection on down key", () => {
            const thirdColor = wrapper.find(SimpleColor).at(2);

            jest.spyOn(
              wrapper
                .find(SimpleColor)
                .at(0)
                .find("input")
                .getDOMNode() as HTMLInputElement,
              "click"
            );
            jest.spyOn(
              wrapper
                .find(SimpleColor)
                .at(1)
                .find("input")
                .getDOMNode() as HTMLInputElement,
              "click"
            );

            act(() => {
              thirdColor.find("input").first().simulate("click");
              thirdColor
                .find("input")
                .first()
                .simulate("keydown", { key: "ArrowDown" });
            });

            expect(
              (wrapper
                .find(SimpleColor)
                .at(0)
                .find("input")
                .getDOMNode() as HTMLInputElement).click
            ).not.toHaveBeenCalled();
            expect(
              (wrapper
                .find(SimpleColor)
                .at(1)
                .find("input")
                .getDOMNode() as HTMLInputElement).click
            ).not.toHaveBeenCalled();
            expect(document.activeElement?.getAttribute("value")).toBe(
              colorValues[2].color
            );
            expect(onChange).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe("renders two rows", () => {
      it("confirms that last color has data-down attribute false", () => {
        wrapper = render({ maxWidth: "180", childWidth: "78" });
        const colorFirst = wrapper.find(SimpleColor).first();
        const colorLast = wrapper.find(SimpleColor).last();
        expect(colorFirst.prop("data-down")).toBeTruthy();
        expect(colorLast.prop("data-down")).toBeFalsy();
      });
    });
  });

  describe("events", () => {
    let wrapper: ReactWrapper;
    let onBlur: jest.Mock;
    let documentMousedownCallback: EventListener;
    let fireDocumentMousedown: () => void;

    beforeEach(() => {
      document.addEventListener = jest.fn((eventName, callback) => {
        if (eventName === "mousedown") {
          documentMousedownCallback = callback as EventListener;
        }
      });
      fireDocumentMousedown = () => {
        const customEvent = ({ target: document } as unknown) as Event;
        act(() => {
          documentMousedownCallback(customEvent);
        });
      };
      onBlur = jest.fn();
      wrapper = render({ onBlur });
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
          const customEvent = ({
            target: firstSCinput.getDOMNode(),
          } as unknown) as Event;
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
            wrapper = render({ isBlurBlocked: true, onBlur });
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
    const validationTypes = ["error", "warning", "info"] as const;

    describe.each(validationTypes)("when %s passed as string", (type) => {
      it("renders validation icon by the input", () => {
        const wrapper = render({ [type]: "Message" });
        expect(
          wrapper.find(StyledLegend).find(StyledValidationIcon).exists()
        ).toBe(false);
        expect(wrapper.find(StyledValidationIcon).exists()).toBe(true);
      });

      it("renders validation icon by the label if validationOnLegend is also passed as true", () => {
        const wrapper = render({
          [type]: "Message",
          validationOnLegend: true,
        });
        expect(
          wrapper.find(StyledLegend).find(StyledValidationIcon).exists()
        ).toBe(true);
      });

      it("renders proper outline", () => {
        const wrapper = render({ [type]: "Message" });
        assertStyleMatch(
          {
            outline: `var(--borderWidth200) solid ${validationVariants[type]}`,
          },
          wrapper.find(StyledColorOptions)
        );
      });
    });

    describe.each(validationTypes)("when %s passed as true boolean", (type) => {
      it("do not renders validation icon", () => {
        const wrapper = render({ [type]: true });
        expect(wrapper.find(StyledValidationIcon).exists()).toBe(false);
      });

      it("renders proper outline", () => {
        const wrapper = render({ [type]: true });
        assertStyleMatch(
          {
            outline: `var(--borderWidth200) solid ${validationVariants[type]}`,
          },
          wrapper.find(StyledColorOptions)
        );
      });
    });
  });

  it("validates the incorrect children prop", () => {
    expect(() => {
      mount(
        <SimpleColorPicker name={name} legend="SimpleColorPicker Legend">
          <p>Invalid children</p>
          <p>Invalid children</p>
        </SimpleColorPicker>
      );
    }).toThrow(
      "SimpleColorPicker accepts only children of type `SimpleColor`."
    );
  });

  it("returns a list of inputs in the ref", () => {
    let outsideRef;

    const MockComponent = () => {
      const simpleColorPickerData = useRef<{
        gridItemRefs: Array<HTMLInputElement | null>;
      }>(null);

      useEffect(() => {
        outsideRef = simpleColorPickerData.current;
      }, []);

      return getComponent({ ref: simpleColorPickerData });
    };

    const wrapper = mount(<MockComponent />);
    const inputs = wrapper.find("input").map((element) => element.getDOMNode());

    expect(outsideRef).toEqual(
      expect.objectContaining({
        gridItemRefs: expect.arrayContaining(inputs),
      })
    );
  });

  describe("required", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = render({ required: true });
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

  describe("children", () => {
    it("accepts empty children", () => {
      expect(() => {
        mount(
          <SimpleColorPicker
            name={name}
            legend="SimpleColorPicker Legend"
            onChange={jest.fn()}
          >
            {null}
            {false}
            {undefined}
          </SimpleColorPicker>
        );
      }).not.toThrow();
    });
  });
});
