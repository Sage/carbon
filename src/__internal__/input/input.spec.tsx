import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import Input, { InputProps, EnterKeyHintTypes } from "./input.component";
import StyledInput from "./input.style";

import { InputContext, InputContextProps } from "../input-behaviour";

import { assertStyleMatch } from "../../__spec_helper__/test-utils";

describe("Input", () => {
  let container: HTMLDivElement | null;
  beforeEach(() => {
    container = document.createElement("div");
    container.id = "enzymeContainer";
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }

    container = null;
  });

  const renderMount = (props: InputProps = {}, context?: InputContextProps) => {
    let component = <Input {...props} />;

    if (context) {
      component = (
        <InputContext.Provider value={context}>
          {component}
        </InputContext.Provider>
      );
    }

    return mount(component, {
      attachTo: document.getElementById("enzymeContainer"),
    });
  };

  it("renders with an input", () => {
    expect(TestRenderer.create(<Input />).toJSON()).toMatchSnapshot();
  });

  it("aligns the text as per the align prop", () => {
    const wrapper = mount(<Input align="right" />);

    assertStyleMatch(
      {
        textAlign: "right",
      },
      wrapper
    );
  });

  it("renders the text with proper color when readOnly", () => {
    const wrapper = mount(<Input readOnly />);

    assertStyleMatch(
      {
        color: "var(--colorsUtilityYin090)",
      },
      wrapper
    );
  });

  it.each([
    "enter",
    "done",
    "go",
    "next",
    "previous",
    "search",
    "send",
  ] as EnterKeyHintTypes[])(
    "'enterKeyHint' is correctly passed to the input when prop value is %s",
    (keyHints) => {
      const wrapper = renderMount({ enterKeyHint: keyHints });

      expect(wrapper.find("input").getDOMNode()).toHaveAttribute(
        "enterkeyhint",
        keyHints
      );
    }
  );

  it("sends the input ref to the inputRef callback", () => {
    const inputRef = jest.fn();
    const contextInputRef = jest.fn();

    renderMount({ inputRef }, { inputRef: contextInputRef });
    expect(inputRef).toHaveBeenCalled();
    expect(contextInputRef).toHaveBeenCalled();
  });

  it("does not fail onBlur or Focus if none are defined", () => {
    const input = renderMount().find("input");
    expect(() => input.simulate("focus")).not.toThrow();
    expect(() => input.simulate("blur")).not.toThrow();
  });

  it("triggers onBlur if passed as prop or context", () => {
    const onBlurProp = jest.fn();
    const onBlurContext = jest.fn();
    const wrapper = renderMount(
      { onBlur: onBlurProp },
      { onBlur: onBlurContext }
    );
    wrapper.find("input").simulate("blur");
    expect(onBlurProp).toHaveBeenCalled();
    expect(onBlurContext).toHaveBeenCalled();
  });

  it("triggers onChange if passed as prop", () => {
    const onChangeProp = jest.fn();
    const wrapper = renderMount({ onChange: onChangeProp });
    wrapper.find("input").simulate("change");
    expect(onChangeProp).toHaveBeenCalled();
  });

  describe("when onChangeDeferred is passed as a prop", () => {
    describe("without deferTimeout prop", () => {
      it("the prop is triggered after 750 ms", () => {
        const onChangeDeferredProp = jest.fn();
        const wrapper = renderMount({ onChangeDeferred: onChangeDeferredProp });
        jest.useFakeTimers();
        wrapper.find("input").simulate("change");
        jest.advanceTimersByTime(500);
        expect(onChangeDeferredProp).not.toHaveBeenCalled();
        jest.advanceTimersByTime(750);
        expect(onChangeDeferredProp).toHaveBeenCalled();
        wrapper.find("input").simulate("change");
      });
    });
    describe("with deferTimeout prop", () => {
      it("the prop is triggered after specified time", () => {
        const onChangeDeferredProp = jest.fn();
        const deferTimeout = 100;
        const wrapper = renderMount({
          onChangeDeferred: onChangeDeferredProp,
          deferTimeout,
        });
        jest.useFakeTimers();
        wrapper.find("input").simulate("change");
        jest.advanceTimersByTime(50);
        expect(onChangeDeferredProp).not.toHaveBeenCalled();
        jest.advanceTimersByTime(100);
        expect(onChangeDeferredProp).toHaveBeenCalled();
      });
    });
  });

  it("triggers onFocus if passed as prop or context", () => {
    const onFocusProp = jest.fn();
    const onFocusContext = jest.fn();
    const wrapper = renderMount(
      { onFocus: onFocusProp },
      { onFocus: onFocusContext }
    );
    wrapper.find("input").simulate("focus");
    expect(onFocusProp).toHaveBeenCalled();
    expect(onFocusContext).toHaveBeenCalled();
  });

  it("focuses the input element if `autoFocus` prop passed", () => {
    const wrapper = renderMount({ autoFocus: true });
    expect(
      wrapper.find("input").getDOMNode() === document.activeElement
    ).toEqual(true);
  });

  describe("select text on focus", () => {
    afterEach(() => {
      jest.useRealTimers();
    });

    const focusWith = (value: string, leftPos: number, rightPos: number) => {
      jest.useFakeTimers();
      const wrapper = renderMount({ value });
      const inputComponent = wrapper.find('input[type="text"]');
      const inputElement = (inputComponent.instance() as unknown) as HTMLInputElement;
      jest.spyOn(inputElement, "setSelectionRange");
      inputElement.selectionStart = leftPos;
      inputElement.selectionEnd = rightPos;
      (inputComponent.getDOMNode() as HTMLInputElement).focus();
      jest.runAllTimers();
      return inputElement;
    };

    it("selects all of the text if focus is applied to the left of the value", () => {
      const inputElement = focusWith("hello", 0, 0);
      expect(inputElement.setSelectionRange).toHaveBeenCalledWith(0, 5);
    });

    it("selects all of the text if focus is applied to the right of the value", () => {
      const inputElement = focusWith("hello", 5, 5);
      expect(inputElement.setSelectionRange).toHaveBeenCalledWith(0, 5);
    });

    it("does not select the text if focus is applied inside of the value", () => {
      const inputElement = focusWith("hello", 4, 4);
      expect(inputElement.setSelectionRange).not.toHaveBeenCalled();
    });

    it("should not break when unmounted right after receiving focus", () => {
      jest.useFakeTimers();
      const wrapper = renderMount();
      wrapper.find("input").simulate("focus");
      wrapper.unmount();
      jest.runAllTimers();
    });
  });

  describe("when input type is different than text", () => {
    const focus = () => {
      jest.useFakeTimers();
      const wrapper = renderMount({ type: "radio" });
      const inputComponent = wrapper.find('input[type="radio"]');
      const inputElement = (inputComponent.instance() as unknown) as HTMLInputElement;
      jest.spyOn(inputElement, "setSelectionRange");
      inputComponent.simulate("focus");
      jest.runAllTimers();
      return inputElement;
    };

    it("does not trigger text selection function", () => {
      const inputElement = focus();
      expect(inputElement.setSelectionRange).not.toHaveBeenCalled();
    });
  });

  describe("onClick", () => {
    it("triggers focus on the input", () => {
      const wrapper = renderMount();
      wrapper.find("input").simulate("click");
      expect(wrapper.find(StyledInput).getDOMNode()).toBe(
        document.activeElement
      );
    });

    it("triggers onClick prop if one is passed", () => {
      const onClick = jest.fn();
      const wrapper = renderMount({ onClick });
      wrapper.find("input").simulate("click");
      expect(onClick).toHaveBeenCalled();
    });
  });
});
