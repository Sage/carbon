import React, { useEffect } from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import useScrollBlock from "./useScrollBlock";
import ScrollBlockManager from "./scroll-block-manager";

const TestComponent = () => {
  const { blockScroll, allowScroll } = useScrollBlock();

  useEffect(() => {
    blockScroll();
    return () => {
      allowScroll();
    };
  }, [allowScroll, blockScroll]);
  return <div id="observed-node" />;
};

describe("useScrollBlock", () => {
  let clientWidthSpy: jest.SpyInstance;

  beforeEach(() => {
    window.innerWidth = 200;
    clientWidthSpy = jest
      .spyOn(document.documentElement, "clientWidth", "get")
      .mockImplementation(() => 180);
  });

  afterEach(() => {
    window.innerWidth = 1024;
    clientWidthSpy.mockReset();
  });

  it("sets proper styles on the body element on mount and resets them on unmount", () => {
    const wrapper = mount(<TestComponent />);
    expect(document.documentElement).toHaveStyle({
      overflow: "",
      position: "",
    });
    expect(document.body).toHaveStyle({
      overflow: "hidden",
      position: "relative",
      paddingRight: "20px",
    });
    act(() => {
      wrapper.unmount();
    });
    expect(document.documentElement).toHaveStyle({
      overflow: "",
      position: "",
    });
    expect(document.body).toHaveStyle({
      overflow: "",
      position: "",
      paddingRight: "",
    });
  });
});

// TODO: implementation tests - to be removed
describe("implementation tests", () => {
  it("saves a restoreValues callback", () => {
    const saveRestoreValuesCallbackSpy = jest.spyOn(
      ScrollBlockManager.prototype,
      "saveRestoreValuesCallback"
    );
    const wrapper = mount(<TestComponent />);
    expect(saveRestoreValuesCallbackSpy).toHaveBeenCalled();
    wrapper.unmount();
  });

  describe("if restoreValues callback exists", () => {
    let getRestoreValuesCallbackSpy: jest.SpyInstance;
    let saveRestoreValuesCallbackSpy: jest.SpyInstance;
    let getOriginalValuesSpy: jest.SpyInstance;
    const restoreValuesMock = jest.fn();

    beforeEach(() => {
      getRestoreValuesCallbackSpy = jest
        .spyOn(ScrollBlockManager.prototype, "getRestoreValuesCallback")
        .mockImplementation(() => restoreValuesMock);
      saveRestoreValuesCallbackSpy = jest.spyOn(
        ScrollBlockManager.prototype,
        "saveRestoreValuesCallback"
      );
      getOriginalValuesSpy = jest.spyOn(
        ScrollBlockManager.prototype,
        "getOriginalValues"
      );
    });

    afterEach(() => {
      saveRestoreValuesCallbackSpy.mockRestore();
      getOriginalValuesSpy.mockRestore();
      getRestoreValuesCallbackSpy.mockRestore();
    });

    it("is invoked and cleared", () => {
      const wrapper = mount(<TestComponent />);
      expect(saveRestoreValuesCallbackSpy).toHaveBeenCalled();
      wrapper.unmount();
      expect(restoreValuesMock).toHaveBeenCalled();
      expect(saveRestoreValuesCallbackSpy).toHaveBeenCalledWith(null);
    });

    it("getOriginalValues is not invoked", () => {
      const wrapper = mount(<TestComponent />);
      wrapper.unmount();
      expect(getOriginalValuesSpy).not.toHaveBeenCalled();
    });
  });

  describe("if restoreValues callback does not exist", () => {
    it("getOriginalValues is invoked", () => {
      const getOriginalValuesSpy = jest.spyOn(
        ScrollBlockManager.prototype,
        "getOriginalValues"
      );
      const wrapper = mount(<TestComponent />);
      if (window.__CARBON_INTERNALS_SCROLL_BLOCKERS) {
        window.__CARBON_INTERNALS_SCROLL_BLOCKERS.restoreValues = null;
      }
      wrapper.unmount();

      expect(getOriginalValuesSpy).toHaveBeenCalled();
      getOriginalValuesSpy.mockRestore();
    });
  });
});
