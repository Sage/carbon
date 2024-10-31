import React, { useRef } from "react";
import { render, screen } from "@testing-library/react";

import useResizeObserver from ".";

const TestComponent = ({
  callback,
  disabled,
}: {
  callback: () => void;
  disabled: boolean;
}) => {
  const ref = useRef(null);
  useResizeObserver(ref, callback, disabled);
  return <div data-role="observed-node" ref={ref} />;
};

describe("useResizeObserver hook functionality when enabled", () => {
  const NativeResizeObserver = window.ResizeObserver;
  let callbackMock: jest.Mock;
  const callbackProp = jest.fn();
  const observeMock = jest.fn();
  const unobserveMock = jest.fn();
  const disconnectMock = jest.fn();

  beforeEach(() => {
    window.ResizeObserver = jest
      .fn()
      .mockImplementation((callback: jest.Mock) => {
        callbackMock = callback;
        return {
          observe: observeMock,
          unobserve: unobserveMock,
          disconnect: disconnectMock,
        };
      });
  });

  afterEach(() => {
    window.ResizeObserver = NativeResizeObserver;
    observeMock.mockReset();
    disconnectMock.mockReset();
    callbackProp.mockReset();
  });

  it("should observe the element on component mount when enabled", () => {
    render(<TestComponent callback={callbackProp} disabled={false} />);

    expect(observeMock).toHaveBeenCalledWith(
      screen.getByTestId("observed-node"),
    );
  });

  it("should unobserve the element and disconnect the observer on component unmount when enabled", () => {
    const { unmount } = render(
      <TestComponent callback={callbackProp} disabled={false} />,
    );

    unmount();

    expect(unobserveMock).toHaveBeenCalled();
    expect(disconnectMock).toHaveBeenCalled();
  });

  it("should invoke the callback when the observed element resizes", () => {
    render(<TestComponent callback={callbackProp} disabled={false} />);

    callbackMock();
    expect(callbackProp).toHaveBeenCalledTimes(1);
  });
});

describe("useResizeObserver hook functionality when disabled", () => {
  const NativeResizeObserver = window.ResizeObserver;
  const observeMock = jest.fn();
  const unobserveMock = jest.fn();
  const disconnectMock = jest.fn();
  const callbackProp = jest.fn();

  beforeEach(() => {
    window.ResizeObserver = jest.fn().mockImplementation(() => {
      return {
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: disconnectMock,
      };
    });
  });

  afterEach(() => {
    window.ResizeObserver = NativeResizeObserver;
    observeMock.mockReset();
    unobserveMock.mockReset();
    disconnectMock.mockReset();
  });

  it("should not observe the element on component mount when disabled", () => {
    render(<TestComponent callback={callbackProp} disabled />);

    expect(observeMock).not.toHaveBeenCalled();
  });

  it("should not unobserve the element nor disconnect the observer on component unmount when disabled", () => {
    const { unmount } = render(
      <TestComponent callback={callbackProp} disabled />,
    );

    unmount();

    expect(unobserveMock).not.toHaveBeenCalled();
    expect(disconnectMock).not.toHaveBeenCalled();
  });
});
