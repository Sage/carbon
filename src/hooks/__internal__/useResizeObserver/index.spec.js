import React, { useRef } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import useResizeObserver from ".";

const TestComponent = ({ callback, disabled }) => {
  const ref = useRef(null);
  useResizeObserver(ref, callback, disabled);
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

  const mountComponent = (disabled) => {
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

    wrapper = mount(
      <TestComponent callback={callbackProp} disabled={disabled} />
    );
  };

  describe("is enabled", () => {
    beforeEach(() => {
      mountComponent(false);
    });

    afterEach(() => {
      window.ResizeObserver = NativeResizeObserver;
      jest.resetAllMocks();
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

  describe("is disabled", () => {
    beforeEach(() => {
      mountComponent(true);
    });

    afterEach(() => {
      window.ResizeObserver = NativeResizeObserver;
      jest.resetAllMocks();
    });

    it("does not observe element on mount", () => {
      expect(observeMock).not.toHaveBeenCalled();
    });

    it("does not unobserve element and disconnect on unmount", () => {
      wrapper.unmount();
      expect(unobserveMock).not.toHaveBeenCalled();
      expect(disconnectMock).not.toHaveBeenCalled();
    });
  });
});
