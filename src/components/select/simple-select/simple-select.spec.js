import React, { useRef } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../../__spec_helper__/test-utils";
import SimpleSelect from "./simple-select.component";
import Textbox from "../../textbox";
import Option from "../option/option.component";
import SelectList from "../select-list/select-list.component";
import { StyledSelectList } from "../select-list/select-list.style";
import InputIconToggleStyle from "../../../__internal__/input-icon-toggle/input-icon-toggle.style";
import InputPresentationStyle from "../../../__internal__/input/input-presentation.style";
import Label from "../../../__internal__/label";

describe("SimpleSelect", () => {
  describe("when an HTML element is clicked when the SelectList is open", () => {
    let wrapper;
    let domNode;

    beforeEach(() => {
      wrapper = mount(getSelect());
      domNode = wrapper.getDOMNode();
      document.body.appendChild(domNode);
    });

    describe("and that element is an Option of the Select List", () => {
      it("then the SelectList should be closed", () => {
        simulateSelectTextEvent(wrapper, "click");
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
        act(() => {
          wrapper
            .find(Option)
            .first()
            .getDOMNode()
            .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
      });
    });

    describe("and that element is not part of the Select", () => {
      it("then the SelectList should be closed", () => {
        act(() => {
          document.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        simulateSelectTextEvent(wrapper, "click");
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
        act(() => {
          document.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
      });
    });

    afterEach(() => {
      document.body.removeChild(domNode);
    });
  });

  describe("disablePortal", () => {
    it("renders SelectList with a disablePortal prop assigned", () => {
      const wrapper = renderSelect({ disablePortal: true });

      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
      expect(wrapper.find(SelectList).props().disablePortal).toBe(true);
    });
  });

  testStyledSystemMargin((props) => getSelect(props));

  it("when placeholder prop is passed, textbox uses it as placeholder text", () => {
    const placeholder = "foobaz";
    const wrapper = renderSelect({ placeholder });
    expect(wrapper.find("span[data-element='select-text']").text()).toBe(
      placeholder
    );
  });

  it("the input ref should be forwarded", () => {
    let mockRef;

    const WrapperComponent = () => {
      mockRef = useRef();

      return (
        <SimpleSelect name="testSelect" id="testSelect" ref={mockRef}>
          <Option value="opt1" text="red" />
          <Option value="opt2" text="green" />
          <Option value="opt3" text="blue" />
          <Option value="opt4" text="black" />
        </SimpleSelect>
      );
    };

    const wrapper = mount(<WrapperComponent />);

    expect(mockRef.current).toBe(wrapper.find("input").getDOMNode());
  });

  it("the input toggle icon should have proper left margin", () => {
    const wrapper = renderSelect();

    assertStyleMatch(
      {
        marginRight: "0",
      },
      wrapper,
      { modifier: `${InputIconToggleStyle}` }
    );
  });

  describe("when listMaxHeight prop is provided", () => {
    it("overrides default list max-height", () => {
      mount(getSelect());
      const wrapper = renderSelect({ listMaxHeight: 120, openOnFocus: true });

      simulateSelectTextboxEvent(wrapper, "focus");
      assertStyleMatch({ maxHeight: "120px" }, wrapper.find(StyledSelectList));
    });
  });

  describe("when the transparent prop is set to true", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = renderSelect({ transparent: true });
    });

    it("then the input should have transparent background and no border", () => {
      assertStyleMatch(
        {
          background: "transparent",
          border: "none",
        },
        wrapper,
        { modifier: `${InputPresentationStyle}` }
      );
    });
  });

  describe("when the value prop is passed", () => {
    it("then the formatted value should be set to corresponding option text", () => {
      const wrapper = renderSelect({ value: "opt2", onChange: jest.fn() });

      expect(wrapper.find(Textbox).prop("formattedValue")).toBe("green");
    });
  });

  describe("when the inputRef prop is specified", () => {
    it("then the input reference should be returned on call", () => {
      const inputRefFn = jest.fn();
      const wrapper = renderSelect({ inputRef: inputRefFn });

      expect(inputRefFn).toHaveBeenCalledWith({
        current: wrapper.find("input").getDOMNode(),
      });
    });
  });

  describe("when the openOnFocus prop is set", () => {
    describe("and the Textbox Input is focused", () => {
      it("the SelectList should be rendered", () => {
        const wrapper = renderSelect({ openOnFocus: true });

        simulateSelectTextboxEvent(wrapper, "focus");
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
      });

      describe.each(["readOnly", "disabled"])(
        "with the %s prop passed",
        (prop) => {
          it("the SelectList should not be rendered", () => {
            const obj = { [prop]: true, openOnFocus: true };
            const wrapper = renderSelect(obj);

            simulateSelectTextboxEvent(wrapper, "focus");
            wrapper
              .find(Option)
              .forEach((option) =>
                expect(option.getDOMNode()).not.toBeVisible()
              );
          });
        }
      );

      describe("with the onFocus prop passed", () => {
        it("then that prop should be called", () => {
          const onFocusFn = jest.fn();
          const wrapper = renderSelect({
            onFocus: onFocusFn,
            openOnFocus: true,
          });

          simulateSelectTextboxEvent(wrapper, "focus");
          expect(onFocusFn).toHaveBeenCalled();
        });
      });

      describe("with the onOpen prop passed", () => {
        let wrapper;
        let onOpenFn;

        beforeEach(() => {
          onOpenFn = jest.fn();
          wrapper = renderSelect({ onOpen: onOpenFn, openOnFocus: true });
        });

        it("then that prop should be called", () => {
          simulateSelectTextboxEvent(wrapper, "focus");

          expect(onOpenFn).toHaveBeenCalled();
        });

        describe("and the SelectList already open", () => {
          it("then that prop should not be called", () => {
            simulateSelectTextboxEvent(wrapper, "focus");
            onOpenFn.mockReset();
            wrapper
              .find(Option)
              .forEach((option) => expect(option.getDOMNode()).toBeVisible());
            simulateSelectTextboxEvent(wrapper, "focus");
            expect(onOpenFn).not.toHaveBeenCalled();
          });
        });

        describe("and the focus triggered by mouseDown", () => {
          it("then that prop should not be called", () => {
            simulateSelectTextEvent(wrapper, "mousedown");
            simulateSelectTextboxEvent(wrapper, "focus");
            expect(onOpenFn).not.toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe("when the Textbox Input is focused", () => {
    let onOpenFn;
    let wrapper;

    beforeEach(() => {
      onOpenFn = jest.fn();
      wrapper = renderSelect({ onOpen: onOpenFn });
    });

    it("the SelectList should not be rendered", () => {
      simulateSelectTextboxEvent(wrapper, "focus");
      wrapper
        .find(Option)
        .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
    });

    describe.each([
      "Enter",
      "ArrowDown",
      "ArrowUp",
      "Home",
      "End",
      " ", // spacebar
    ])('and the "%s" key is pressed', (key) => {
      it("the SelectList should be rendered", () => {
        simulateKeyDown(wrapper, key);
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
      });

      it("the onOpen prop should be called", () => {
        simulateKeyDown(wrapper, key);
        expect(onOpenFn).toHaveBeenCalled();
      });

      describe("with the SelectList already open", () => {
        it("the onOpen prop should not be called", () => {
          simulateSelectTextEvent(wrapper, "click");
          onOpenFn.mockReset();
          wrapper
            .find(Option)
            .forEach((option) => expect(option.getDOMNode()).toBeVisible());
          simulateKeyDown(wrapper, key);
          expect(onOpenFn).not.toHaveBeenCalled();
        });
      });

      describe("with readOnly prop set to true", () => {
        it("then the SelectList should not be rendered", () => {
          wrapper.setProps({ readOnly: true });
          simulateKeyDown(wrapper, key);
          wrapper
            .find(Option)
            .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
        });
      });
    });

    describe("and a key other than Enter, Up or Down is pressed", () => {
      it("the SelectList should not be rendered", () => {
        simulateKeyDown(wrapper, "b");
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
      });

      describe("with readOnly prop set to true", () => {
        it("then the SelectList should not be rendered", () => {
          wrapper.setProps({ readOnly: true });
          wrapper.update();
          simulateKeyDown(wrapper, "b");
          wrapper
            .find(Option)
            .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
        });
      });
    });
  });

  describe("when the Textbox Input is clicked", () => {
    it("the SelectList should be rendered", () => {
      const wrapper = renderSelect();

      simulateSelectTextEvent(wrapper, "click");
      wrapper
        .find(Option)
        .forEach((option) => expect(option.getDOMNode()).toBeVisible());
    });

    describe.each(["disabled", "readOnly"])(
      "and the %s prop is set to true",
      (prop) => {
        it('then the "onClick" prop should not be called', () => {
          const onClickFn = jest.fn();
          const wrapper = renderSelect({ onClick: onClickFn, [prop]: true });

          simulateSelectTextEvent(wrapper, "click");
          expect(onClickFn).not.toHaveBeenCalled();
        });

        it("then the SelectList should not be rendered", () => {
          const wrapper = renderSelect({ [prop]: true });

          simulateSelectTextEvent(wrapper, "click");
          wrapper
            .find(Option)
            .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
        });
      }
    );

    describe("and the onClick prop is passed", () => {
      it("then that prop should be called", () => {
        const onClickFn = jest.fn();
        const wrapper = renderSelect({ onClick: onClickFn });

        simulateSelectTextEvent(wrapper, "click");
        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe("and the onOpen prop is passed", () => {
      it("then that prop should be called", () => {
        const onOpenFn = jest.fn();
        const wrapper = renderSelect({ onOpen: onOpenFn });

        simulateSelectTextEvent(wrapper, "click");
        expect(onOpenFn).toHaveBeenCalled();
      });
    });

    describe("and the SelectList is open", () => {
      it("then the SelectList should be closed", () => {
        const wrapper = renderSelect();

        simulateSelectTextEvent(wrapper, "click");
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
        simulateSelectTextEvent(wrapper, "click");
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
      });
    });

    it.each(["top", "bottom", "right", "left"])(
      "the listPlacement prop should be passed",
      (listPlacement) => {
        const wrapper = renderSelect({ listPlacement });

        simulateSelectTextEvent(wrapper, "click");
        expect(wrapper.find(SelectList).prop("listPlacement")).toBe(
          listPlacement
        );
      }
    );

    it("the flipEnabled prop should be passed", () => {
      const wrapper = renderSelect({ flipEnabled: false });

      simulateSelectTextEvent(wrapper, "click");
      expect(wrapper.find(SelectList).prop("flipEnabled")).toBe(false);
      wrapper.setProps({ flipEnabled: true });
      expect(wrapper.find(SelectList).prop("flipEnabled")).toBe(true);
    });
  });

  describe("when the Dropdown Icon in the Textbox has been clicked", () => {
    it("the SelectList should be rendered", () => {
      const wrapper = renderSelect();

      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
      wrapper
        .find(Option)
        .forEach((option) => expect(option.getDOMNode()).toBeVisible());
    });

    describe("and the SelectList is open", () => {
      it("then the SelectList should be closed", () => {
        const wrapper = renderSelect();

        wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first()
          .simulate("click");
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
        wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first()
          .simulate("click");
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
      });
    });
  });

  describe("when a printable character key has been pressed in the Textbox", () => {
    it("then the first option with text starting with that character should be selected", () => {
      const wrapper = renderSelect();

      simulateKeyDown(wrapper, "b");
      wrapper.update();
      expect(wrapper.find(Textbox).prop("value")).toBe("opt3");
      wrapper.unmount();
    });

    it("if the Meta key is pressed at the same time, nothing should happen", () => {
      const wrapper = renderSelect();

      simulateKeyDown(wrapper, "b", { metaKey: true });
      wrapper.update();
      expect(wrapper.find(Textbox).prop("value")).toBe("");
      wrapper.unmount();
    });

    it("if the Control key is pressed at the same time, nothing should happen", () => {
      const wrapper = renderSelect();

      simulateKeyDown(wrapper, "b", { ctrlKey: true });
      wrapper.update();
      expect(wrapper.find(Textbox).prop("value")).toBe("");
      wrapper.unmount();
    });

    describe("and the same key is pressed in a short amount of time", () => {
      it("then the second option with text starting with that character should be selected", () => {
        const wrapper = renderSelect();

        simulateKeyDown(wrapper, "b");
        simulateKeyDown(wrapper, "b");
        wrapper.update();
        expect(wrapper.find(Textbox).prop("value")).toBe("opt4");
        wrapper.unmount();
      });
    });

    describe("and other key that does not match the text in any option has been typed", () => {
      it("then the option starting with previous character should remain selected", () => {
        const wrapper = renderSelect();

        simulateKeyDown(wrapper, "b");
        simulateKeyDown(wrapper, "x");
        wrapper.update();
        expect(wrapper.find(Textbox).prop("value")).toBe("opt3");
        wrapper.unmount();
      });
    });

    describe("and another keys are typed in a short amount of time", () => {
      it("then an option with matching text should be selected", () => {
        const wrapper = renderSelect({ openOnFocus: true });

        simulateSelectTextboxEvent(wrapper, "focus");
        simulateKeyDown(wrapper, "b");
        simulateKeyDown(wrapper, "l");
        simulateKeyDown(wrapper, "a");
        wrapper.update();
        expect(wrapper.find(Textbox).prop("value")).toBe("opt4");
        wrapper.unmount();
      });
    });

    describe("and another keys are typed with a long break before the last change", () => {
      it("then the first option with text starting the last typed character should be selected", () => {
        jest.useFakeTimers();
        const wrapper = renderSelect();

        act(() => {
          simulateSelectTextboxEvent(wrapper, "focus");
          simulateKeyDown(wrapper, "b");
          simulateKeyDown(wrapper, "l");
          jest.runAllTimers();
          simulateKeyDown(wrapper, "g");
        });

        expect(wrapper.update().find(Textbox).prop("value")).toBe("opt2");
      });
    });

    describe("and the onChange prop is passed", () => {
      it("then that prop should be called with the value of first matching option", () => {
        const textboxProps = {
          name: "testName",
          id: "testId",
        };
        const mockEventObject = {
          target: {
            ...textboxProps,
            value: "opt3",
          },
        };
        const onChangeFn = jest.fn();
        const wrapper = renderSelect({ ...textboxProps, onChange: onChangeFn });

        simulateSelectTextboxEvent(wrapper, "focus");
        simulateKeyDown(wrapper, "b");
        expect(onChangeFn).toHaveBeenCalledWith(mockEventObject);
      });
    });
  });

  describe("when the onSelect is called in the SelectList", () => {
    const navigationKeyOptionObject = {
      value: "opt2",
      text: "green",
      selectionType: "navigationKey",
    };
    const clickOptionObject = {
      value: "opt2",
      text: "green",
      selectionType: "click",
    };
    const textboxProps = {
      name: "testName",
      id: "testId",
    };
    const expectedEventObject = {
      target: {
        ...textboxProps,
        value: "opt2",
      },
    };

    describe('with "selectionType" as "click"', () => {
      it("the SelectList should be closed", () => {
        const wrapper = renderSelect();

        simulateSelectTextEvent(wrapper, "click");
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
        act(() => {
          wrapper.find(SelectList).prop("onSelect")(clickOptionObject);
        });
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
      });
    });

    describe('with "selectionType" as "navigationKey"', () => {
      const wrapper = renderSelect();

      beforeAll(() => {
        simulateSelectTextEvent(wrapper, "click");
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
        act(() => {
          wrapper.find(SelectList).prop("onSelect")(navigationKeyOptionObject);
        });
        wrapper.update();
      });

      it("the SelectList should be open", () => {
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
      });

      it("the expected value should be selected", () => {
        expect(wrapper.find(Textbox).prop("value")).toBe(
          navigationKeyOptionObject.value
        );
      });

      it("the expected text should be displayed in the Textbox", () => {
        expect(wrapper.find(Textbox).prop("formattedValue")).toBe(
          navigationKeyOptionObject.text
        );
      });
    });

    describe("and the onChange prop is passed", () => {
      it("then that prop should be called with the same value", () => {
        const onChangeFn = jest.fn();
        const wrapper = renderSelect({ ...textboxProps, onChange: onChangeFn });

        simulateSelectTextEvent(wrapper, "click");
        act(() => {
          wrapper.find(SelectList).prop("onSelect")(clickOptionObject);
        });
        expect(onChangeFn).toHaveBeenCalledWith(expectedEventObject);
      });
    });

    describe("by clicking on an Option", () => {
      it("then the SelectList should be closed", () => {
        const wrapper = renderSelect();

        simulateSelectTextEvent(wrapper, "click");
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
        act(() => {
          wrapper.find(Option).first().simulate("click");
        });
        simulateSelectTextboxEvent(wrapper, "focus");
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
      });
    });
  });

  describe("when the onSelectListClose is called in the SelectList", () => {
    it("the SelectList should be closed", () => {
      const wrapper = renderSelect();

      simulateSelectTextEvent(wrapper, "click");
      wrapper
        .find(Option)
        .forEach((option) => expect(option.getDOMNode()).toBeVisible());
      act(() => {
        wrapper.find(SelectList).prop("onSelectListClose")();
      });
      wrapper
        .find(Option)
        .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
    });
  });

  describe("when the onKeyDown prop is passed", () => {
    const expectedEventObject = {
      key: "ArrowDown",
    };

    it("then when a key is pressed, that prop should be called with expected values", () => {
      const onKeyDownFn = jest.fn();
      const wrapper = renderSelect({ onKeyDown: onKeyDownFn });

      wrapper
        .find("[data-element='select-text']")
        .first()
        .simulate("keyDown", expectedEventObject);

      expect(onKeyDownFn).toHaveBeenCalledWith(
        expect.objectContaining({
          ...expectedEventObject,
        })
      );
    });
  });

  describe('when the "onBlur" prop has been passed and the input has been blurred', () => {
    it("then that prop should be called", () => {
      const onBlurFn = jest.fn();
      const wrapper = renderSelect({ onBlur: onBlurFn });

      simulateSelectTextboxEvent(wrapper, "blur");
      expect(onBlurFn).toHaveBeenCalled();
    });

    describe("and there is a mouseDown reported on open list", () => {
      it("then that prop should not be called", () => {
        const onBlurFn = jest.fn();
        const wrapper = renderSelect({ onBlur: onBlurFn, openOnFocus: true });

        simulateSelectTextboxEvent(wrapper, "focus");
        wrapper.find(Option).first().simulate("mousedown");
        simulateSelectTextboxEvent(wrapper, "blur");
        expect(onBlurFn).not.toHaveBeenCalled();
      });
    });

    it("coverage filler for else path", () => {
      const wrapper = renderSelect();
      simulateSelectTextboxEvent(wrapper, "blur");
    });
  });

  describe("when the component is controlled", () => {
    const onChangeFn = jest.fn();
    let wrapper;
    const expectedObject = {
      target: {
        id: "testSelect",
        name: "testSelect",
        value: "opt3",
      },
    };

    const clickOptionObject = {
      value: "opt3",
      text: "black",
      selectionType: "click",
    };

    beforeEach(() => {
      onChangeFn.mockClear();
      wrapper = renderSelect({ onChange: onChangeFn, value: "opt1" });
    });

    describe("and an option is selected", () => {
      it("then the onChange prop should be called with expected value", () => {
        simulateSelectTextEvent(wrapper, "click");
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
        act(() => {
          wrapper.find(SelectList).prop("onSelect")(clickOptionObject);
        });
        expect(onChangeFn).toHaveBeenCalledWith(expectedObject);
      });
    });

    describe("and a printable character has been typed in the Textbox", () => {
      beforeEach(() => {
        simulateKeyDown(wrapper, "b");
        wrapper.update();
      });

      it("then the value should not change", () => {
        expect(wrapper.find(Textbox).prop("value")).toBe("opt1");
      });

      it("then the onChange function should have been called with with the expected value", () => {
        expect(onChangeFn).toHaveBeenCalledWith(expectedObject);
      });
    });

    describe("and an an empty value has been passed", () => {
      it("then the textbox displayed value should be cleared", () => {
        expect(wrapper.find(Textbox).props().formattedValue).toBe("red");
        wrapper.setProps({ value: "" });
        expect(wrapper.update().find(Textbox).props().formattedValue).toBe("");
      });

      it("then the textbox value should be cleared", () => {
        expect(wrapper.find(Textbox).props().value).toBe("opt1");
        wrapper.setProps({ value: "" });
        expect(wrapper.update().find(Textbox).props().value).toBe("");
      });
    });

    describe("when parent re-renders", () => {
      const WrapperComponent = (props) => {
        const mockRef = useRef();

        return (
          <span change={props.change}>
            <SimpleSelect name="testSelect" id="testSelect" ref={mockRef}>
              <Option value="opt1" text="red" />
              <Option value="opt2" text="green" />
              <Option value="opt3" text="blue" />
              <Option value="opt4" text="black" />
            </SimpleSelect>
          </span>
        );
      };

      it("should persist the input value", () => {
        wrapper = mount(<WrapperComponent />);
        wrapper.find("input").simulate("click");
        act(() => {
          wrapper.find(Option).first().simulate("click");
        });
        expect(wrapper.update().find(Textbox).props().formattedValue).toBe(
          "red"
        );
        wrapper.setProps({ change: "bar" });
        expect(wrapper.update().find(Textbox).props().formattedValue).toBe(
          "red"
        );
      });
    });
  });

  describe("required", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = renderSelect({ label: "required", required: true });
    });

    it("the required prop is passed to the input", () => {
      const input = wrapper.find("input");
      expect(input.prop("required")).toBe(true);
    });

    it("the isRequired prop is passed to the label", () => {
      const label = wrapper.find(Label);
      expect(label.prop("isRequired")).toBe(true);
    });
  });
});

describe("coverage filler for else path", () => {
  const wrapper = renderSelect();
  simulateKeyDown(wrapper, "F1");
});

function simulateKeyDown(container, key, options = {}) {
  const selectText = container.find("[data-element='select-text']").first();

  selectText.simulate("keydown", { key, ...options });
}

function simulateSelectTextEvent(container, eventType) {
  const selectText = container.find("[data-element='select-text']").first();

  selectText.simulate(eventType);
}

function simulateSelectTextboxEvent(container, eventType) {
  const selectText = container.find('input[type="text"]').first();

  selectText.simulate(eventType);
}

function renderSelect(props = {}, renderer = mount) {
  return renderer(getSelect(props));
}

function getSelect(props) {
  return (
    <SimpleSelect name="testSelect" id="testSelect" {...props}>
      <Option value="opt1" text="red" />
      <Option value="opt2" text="green" />
      <Option value="opt3" text="blue" />
      <Option value="opt4" text="black" />
    </SimpleSelect>
  );
}
