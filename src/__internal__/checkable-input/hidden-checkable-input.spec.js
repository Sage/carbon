import React from "react";
import { mount, shallow } from "enzyme";
import { InputContext, InputGroupContext } from "../input-behaviour";

import HiddenCheckableInput from "./hidden-checkable-input.component";
import HiddenCheckableInputStyle from "./hidden-checkable-input.style";

const render = (
  props = {},
  inputGroupContextValue = {},
  inputContextValue = {}
) => {
  return mount(
    <InputGroupContext.Provider value={inputGroupContextValue}>
      <InputContext.Provider value={inputContextValue}>
        <HiddenCheckableInput type="test" {...props} />
      </InputContext.Provider>
    </InputGroupContext.Provider>
  );
};

describe("HiddenCheckableInput", () => {
  let propOnBlur;
  let contextOnBlur;
  let groupContextOnBlur;

  let propOnFocus;
  let contextOnFocus;
  let groupContextOnFocus;

  let propOnMouseEnter;
  let contextOnMouseEnter;
  let groupContextOnMouseEnter;

  let propOnMouseLeave;
  let contextOnMouseLeave;
  let groupContextOnMouseLeave;

  let wrapper;

  beforeEach(() => {
    propOnBlur = jest.fn();
    contextOnBlur = jest.fn();
    groupContextOnBlur = jest.fn();

    propOnFocus = jest.fn();
    contextOnFocus = jest.fn();
    groupContextOnFocus = jest.fn();

    propOnMouseEnter = jest.fn();
    contextOnMouseEnter = jest.fn();
    groupContextOnMouseEnter = jest.fn();

    propOnMouseLeave = jest.fn();
    contextOnMouseLeave = jest.fn();
    groupContextOnMouseLeave = jest.fn();

    wrapper = render(
      {
        onBlur: propOnBlur,
        onFocus: propOnFocus,
        onMouseEnter: propOnMouseEnter,
        onMouseLeave: propOnMouseLeave,
      },
      {
        onBlur: groupContextOnBlur,
        onFocus: groupContextOnFocus,
        onMouseEnter: groupContextOnMouseEnter,
        onMouseLeave: groupContextOnMouseLeave,
      },
      {
        onBlur: contextOnBlur,
        onFocus: contextOnFocus,
        onMouseEnter: contextOnMouseEnter,
        onMouseLeave: contextOnMouseLeave,
      }
    );
  });

  it("renders as expected", () => {
    const props = {
      checked: true,
      helpId: "test-help",
      name: "test-name",
      type: "test-type",
      value: "test-value",
      tabIndex: 0,
    };

    const shallowWrapper = shallow(<HiddenCheckableInput {...props} />);
    expect(shallowWrapper).toMatchSnapshot();
  });

  it("triggers onFocus callbacks passed from props and context", () => {
    wrapper.find(HiddenCheckableInputStyle).props().onFocus();
    expect(propOnFocus).toHaveBeenCalled();
    expect(contextOnFocus).toHaveBeenCalled();
    expect(groupContextOnFocus).toHaveBeenCalled();
  });

  it("triggers onBlur callbacks passed from props and context", () => {
    wrapper.find(HiddenCheckableInputStyle).props().onBlur();
    expect(propOnBlur).toHaveBeenCalled();
    expect(contextOnBlur).toHaveBeenCalled();
    expect(groupContextOnBlur).toHaveBeenCalled();
  });

  it("triggers onMouseEnter callbacks passed from context", () => {
    wrapper.find(HiddenCheckableInputStyle).props().onMouseEnter();
    expect(propOnMouseEnter).toHaveBeenCalled();
    expect(contextOnMouseEnter).toHaveBeenCalled();
    expect(groupContextOnMouseEnter).toHaveBeenCalled();
  });

  it("triggers onMouseLeave callbacks passed from context", () => {
    wrapper.find(HiddenCheckableInputStyle).props().onMouseLeave();
    expect(propOnMouseLeave).toHaveBeenCalled();
    expect(contextOnMouseLeave).toHaveBeenCalled();
    expect(groupContextOnMouseLeave).toHaveBeenCalled();
  });

  it("does nothing if onFocus, onBlur, onMouseEnter or onMouseLeave callbacks are not provided", () => {
    wrapper = render();
    const inputProps = wrapper.find(HiddenCheckableInputStyle).props();
    inputProps.onFocus();
    inputProps.onBlur();
    inputProps.onMouseEnter();
    inputProps.onMouseLeave();
  });

  describe("aria", () => {
    it("passes aria props to the input element", () => {
      const ariaDescribedBy = "test-aria-described-id";
      const ariaLabelledBy = "test-aria-labelled-id";
      const ariaInvalid = true;

      wrapper = render({
        "aria-describedby": ariaDescribedBy,
        "aria-labelledby": ariaLabelledBy,
        "aria-invalid": ariaInvalid,
      });
      const inputProps = wrapper.find(HiddenCheckableInputStyle).props();
      expect(inputProps["aria-describedby"]).toBe(ariaDescribedBy);
      expect(inputProps["aria-labelledby"]).toBe(ariaLabelledBy);
      expect(inputProps["aria-invalid"]).toBe(ariaInvalid);
    });
  });
});
