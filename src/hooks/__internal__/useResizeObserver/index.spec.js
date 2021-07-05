import React, { useRef } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import useResizeObserver from ".";

const TestComponent = ({ callback }) => {
  const ref = useRef(null);
  useResizeObserver(ref, callback);
  return <div id="observed-node" ref={ref} />;
};

describe("resize observer", () => {
  let wrapper;
  const NativeResizeObserver = window.ResizeObserver;
  let callbackMock;
  const callbackProp = jest.fn();
  const observeMock = jest.fn();
  const unobserveMock = jest.fn();
  const disconnectMock = jest.fn();

  beforeEach(() => {
    window.ResizeObserver = function (callback) {
      callbackMock = callback;
      return {
        observe: (element) => {
          observeMock(element);
        },
        unobserve: (element) => {
          unobserveMock(element);
        },
        disconnect: () => {
          disconnectMock();
        },
      };
    };

    wrapper = mount(<TestComponent callback={callbackProp} />);
  });

  afterEach(() => {
    window.ResizeObserver = NativeResizeObserver;
  });

  it("observes element on mount", () => {
    expect(observeMock).toHaveBeenCalledWith(
      wrapper.find("#observed-node").getDOMNode()
    );
  });

  it("unobserves element and disconnects on unmount", () => {
    const observedNodeRef = wrapper.find("#observed-node").getDOMNode();
    wrapper.unmount();
    expect(unobserveMock).toHaveBeenCalledWith(observedNodeRef);
    expect(disconnectMock).toHaveBeenCalled();
  });

  it("invokes callback passed as a second argument on resize", () => {
    act(() => {
      callbackMock();
    });
    expect(callbackProp).toHaveBeenCalledTimes(1);
  });
});
