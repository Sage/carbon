import React from "react";
import { mount, shallow } from "enzyme";
import {
  InputContext,
  InputGroupContext,
} from "../../../__internal__/input-behaviour";

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
        <HiddenCheckableInput {...props} />
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

  let contextOnMouseEnter;
  let groupContextOnMouseEnter;

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

    contextOnMouseEnter = jest.fn();
    groupContextOnMouseEnter = jest.fn();

    contextOnMouseLeave = jest.fn();
    groupContextOnMouseLeave = jest.fn();

    wrapper = render(
      {
        onBlur: propOnBlur,
        onFocus: propOnFocus,
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
      inputType: "test-type",
      inputValue: "test-value",
      tabindex: 0,
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
    expect(contextOnMouseEnter).toHaveBeenCalled();
    expect(groupContextOnMouseEnter).toHaveBeenCalled();
  });

  it("triggers onMouseLeave callbacks passed from context", () => {
    wrapper.find(HiddenCheckableInputStyle).props().onMouseLeave();
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
});
