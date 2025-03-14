import React, { useEffect } from "react";
import { act } from "@testing-library/react";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

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

test("sets proper styles on the body element on mount and resets them on unmount", () => {
  const { unmount } = render(<TestComponent />);

  expect(document.documentElement).toHaveStyle({ overflow: "" });
  expect(document.documentElement).toHaveStyle({ position: "" });
  expect(document.body).toHaveStyle({ overflow: "hidden" });
  expect(document.body).toHaveStyle({ position: "relative" });
  expect(document.body).toHaveStyle({ paddingRight: "20px" });

  act(() => {
    unmount();
  });

  expect(document.documentElement).toHaveStyle({ overflow: "" });
  expect(document.documentElement).toHaveStyle({ position: "" });
  expect(document.body).toHaveStyle({ overflow: "" });
  expect(document.body).toHaveStyle({ position: "" });
  expect(document.body).toHaveStyle({ paddingRight: "" });
});

test("should save a restoreValues callback when TestComponent is mounted", () => {
  const saveRestoreValuesCallbackSpy = jest.spyOn(
    ScrollBlockManager.prototype,
    "saveRestoreValuesCallback",
  );
  const { unmount } = render(<TestComponent />);
  expect(saveRestoreValuesCallbackSpy).toHaveBeenCalled();
  unmount();
});

test("should invoke and clear restoreValues callback if it exists when TestComponent is unmounted", () => {
  const restoreValuesMock = jest.fn();
  const getRestoreValuesCallbackSpy = jest
    .spyOn(ScrollBlockManager.prototype, "getRestoreValuesCallback")
    .mockImplementation(() => restoreValuesMock);
  const saveRestoreValuesCallbackSpy = jest.spyOn(
    ScrollBlockManager.prototype,
    "saveRestoreValuesCallback",
  );
  const getOriginalValuesSpy = jest.spyOn(
    ScrollBlockManager.prototype,
    "getOriginalValues",
  );

  const { unmount } = render(<TestComponent />);
  expect(saveRestoreValuesCallbackSpy).toHaveBeenCalled();
  unmount();
  expect(restoreValuesMock).toHaveBeenCalled();
  expect(saveRestoreValuesCallbackSpy).toHaveBeenCalledWith(null);

  saveRestoreValuesCallbackSpy.mockRestore();
  getOriginalValuesSpy.mockRestore();
  getRestoreValuesCallbackSpy.mockRestore();
});

test("should not invoke getOriginalValues if restoreValues callback exists when TestComponent is unmounted", () => {
  const restoreValuesMock = jest.fn();
  const getRestoreValuesCallbackSpy = jest
    .spyOn(ScrollBlockManager.prototype, "getRestoreValuesCallback")
    .mockImplementation(() => restoreValuesMock);
  const saveRestoreValuesCallbackSpy = jest.spyOn(
    ScrollBlockManager.prototype,
    "saveRestoreValuesCallback",
  );
  const getOriginalValuesSpy = jest.spyOn(
    ScrollBlockManager.prototype,
    "getOriginalValues",
  );

  const { unmount } = render(<TestComponent />);
  unmount();
  expect(getOriginalValuesSpy).not.toHaveBeenCalled();

  saveRestoreValuesCallbackSpy.mockRestore();
  getOriginalValuesSpy.mockRestore();
  getRestoreValuesCallbackSpy.mockRestore();
});

test("should invoke getOriginalValues if restoreValues callback does not exist when TestComponent is unmounted", () => {
  const getOriginalValuesSpy = jest.spyOn(
    ScrollBlockManager.prototype,
    "getOriginalValues",
  );
  const { unmount } = render(<TestComponent />);
  if (window.__CARBON_INTERNALS_SCROLL_BLOCKERS) {
    window.__CARBON_INTERNALS_SCROLL_BLOCKERS.restoreValues = null;
  }
  unmount();

  expect(getOriginalValuesSpy).toHaveBeenCalled();
  getOriginalValuesSpy.mockRestore();
});
