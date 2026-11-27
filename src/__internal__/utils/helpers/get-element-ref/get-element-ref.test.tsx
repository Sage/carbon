import React from "react";
import getElementRef from ".";

test("reads object and callback refs from real React elements without warnings", () => {
  const ref = React.createRef<HTMLDivElement>();
  const callback = jest.fn();

  expect(getElementRef(<div ref={ref} />)).toBe(ref);
  expect(getElementRef(<div ref={callback} />)).toBe(callback);
  expect(getElementRef(<div />)).toBeNull();
});

test("skips the React 18 props.ref warning getter", () => {
  const ref = React.createRef<HTMLDivElement>();
  const warning = jest.fn(() => {
    throw new Error("props.ref warning");
  });
  const props = Object.defineProperty({}, "ref", { get: warning });
  const element = { props, ref } as unknown as React.ReactElement<unknown>;

  expect(getElementRef(element)).toBe(ref);
  expect(warning).not.toHaveBeenCalled();
});

test("skips the React 19 element.ref warning getter", () => {
  const ref = jest.fn();
  const warning = jest.fn(() => {
    throw new Error("element.ref warning");
  });
  const element = Object.defineProperty({ props: { ref } }, "ref", {
    get: warning,
  }) as unknown as React.ReactElement<unknown>;

  expect(getElementRef(element)).toBe(ref);
  expect(warning).not.toHaveBeenCalled();
});

test("preserves an explicit null prop without reading the element getter", () => {
  const warning = jest.fn();
  const element = Object.defineProperty({ props: { ref: null } }, "ref", {
    get: warning,
  }) as unknown as React.ReactElement<unknown>;

  expect(getElementRef(element)).toBeNull();
  expect(warning).not.toHaveBeenCalled();
});

test("returns undefined when neither location has a data property", () => {
  const warning = jest.fn();
  const props = Object.defineProperty({}, "ref", { get: warning });
  const element = Object.defineProperty({ props }, "ref", {
    get: warning,
  }) as unknown as React.ReactElement<unknown>;

  expect(getElementRef(element)).toBeUndefined();
  expect(getElementRef({ props: {} } as React.ReactElement)).toBeUndefined();
  expect(warning).not.toHaveBeenCalled();
});
