import React from "react";
import { render, screen } from "@testing-library/react";
import useCombinedRefs from ".";

type Props = {
  objectRef: React.MutableRefObject<HTMLButtonElement | null>;
  callback: React.RefCallback<HTMLButtonElement>;
  nodeKey?: string;
};

const Example = ({ objectRef, callback, nodeKey }: Props) => {
  const ref = useCombinedRefs(objectRef, callback);
  return (
    <button key={nodeKey} ref={ref}>
      Target
    </button>
  );
};

test("keeps callback identity stable on rerender and detaches on unmount", () => {
  const objectRef = { current: null };
  const callback = jest.fn();
  const { rerender, unmount } = render(
    <Example objectRef={objectRef} callback={callback} />,
  );
  const button = screen.getByRole("button");

  rerender(<Example objectRef={objectRef} callback={callback} />);
  expect(callback.mock.calls).toEqual([[button]]);
  expect(objectRef.current).toBe(button);

  unmount();
  expect(callback.mock.calls).toEqual([[button], [null]]);
  expect(objectRef.current).toBeNull();
});

test("cleans the old callback when the consumer replaces its ref", () => {
  const objectRef = { current: null };
  const cleanup = jest.fn();
  const previous = jest.fn(() => cleanup);
  const next = jest.fn();
  const { rerender, unmount } = render(
    <Example objectRef={objectRef} callback={previous} />,
  );
  const button = screen.getByRole("button");

  rerender(<Example objectRef={objectRef} callback={next} />);
  expect(cleanup).toHaveBeenCalledTimes(1);
  expect(previous.mock.calls).toEqual([[button]]);
  expect(next.mock.calls).toEqual([[button]]);
  expect(objectRef.current).toBe(button);

  unmount();
  expect(next.mock.calls).toEqual([[button], [null]]);
  expect(cleanup).toHaveBeenCalledTimes(1);
  expect(objectRef.current).toBeNull();
});

test("cleans each attachment when the DOM node is replaced", () => {
  const objectRef = { current: null };
  const cleanups: jest.Mock[] = [];
  const callback = jest.fn<() => void, [HTMLButtonElement | null]>(() => {
    const cleanup = jest.fn();
    cleanups.push(cleanup);
    return cleanup;
  });
  const { rerender, unmount } = render(
    <Example objectRef={objectRef} callback={callback} nodeKey="first" />,
  );
  const first = screen.getByRole("button");

  rerender(
    <Example objectRef={objectRef} callback={callback} nodeKey="second" />,
  );
  expect(screen.getByRole("button")).not.toBe(first);
  expect(cleanups[0]).toHaveBeenCalledTimes(1);
  expect(cleanups[1]).not.toHaveBeenCalled();

  unmount();
  expect(cleanups[1]).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledTimes(2);
});

test("balances consumer cleanup through StrictMode mounting and unmounting", () => {
  const objectRef = { current: null };
  const cleanups: jest.Mock[] = [];
  const callback = jest.fn<() => void, [HTMLButtonElement | null]>(() => {
    const cleanup = jest.fn();
    cleanups.push(cleanup);
    return cleanup;
  });
  const { unmount } = render(
    <React.StrictMode>
      <Example objectRef={objectRef} callback={callback} />
    </React.StrictMode>,
  );

  expect(objectRef.current).toBe(screen.getByRole("button"));
  expect(cleanups).not.toHaveLength(0);
  unmount();

  expect(
    callback.mock.calls.every(([node]) => node instanceof HTMLButtonElement),
  ).toBe(true);
  cleanups.forEach((cleanup) => expect(cleanup).toHaveBeenCalledTimes(1));
  expect(objectRef.current).toBeNull();
});
