import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import useInputBehaviour from "./useInputBehaviour";

const HookTestComponent = () => {
  const { inputRef, ...hookValues } = useInputBehaviour();
  return (
    <input
      type="text"
      {...hookValues}
      ref={(input) => inputRef({ current: input })}
    />
  );
};

const render = () =>
  mount(<HookTestComponent />, {
    attachTo: document.getElementById("enzymeContainer"),
  });

describe("useInputBehaviour", () => {
  let wrapper;
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "enzymeContainer";
    document.body.appendChild(container);
    wrapper = render();
  });

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }

    container = null;
  });

  it("toggles hasFocus when element is focused and blurred", () => {
    act(() => {
      wrapper.find("input").props().onFocus();
    });
    wrapper.update();
    expect(wrapper.find("input").props().hasFocus).toBe(true);

    act(() => {
      wrapper.find("input").props().onBlur();
    });
    wrapper.update();
    expect(wrapper.find("input").props().hasFocus).toBe(false);
  });

  it("toggles hasMouseOver when mouse enters and leaves the element", () => {
    act(() => {
      wrapper.find("input").props().onMouseEnter();
    });
    wrapper.update();
    expect(wrapper.find("input").props().hasMouseOver).toBe(true);

    act(() => {
      wrapper.find("input").props().onMouseLeave();
    });
    wrapper.update();
    expect(wrapper.find("input").props().hasMouseOver).toBe(false);
  });

  it("focuses the element on mousedown event", () => {
    jest.useFakeTimers();
    act(() => {
      wrapper.find("input").props().onMouseDown();
    });
    wrapper.update();
    jest.runAllTimers();
    expect(document.activeElement).toBe(wrapper.find("input").getDOMNode());
  });
});
