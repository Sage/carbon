import { act, renderHook } from "@testing-library/react";
import type { MutableRefObject } from "react";
import useMoveFocusAfterFileSelection from "./useMoveFocusAfterFileSelection";

interface HookProps {
  multiple: boolean;
  hasFiles: boolean;
}

const animationFrames: FrameRequestCallback[] = [];

beforeEach(() => {
  animationFrames.length = 0;
  jest
    .spyOn(window, "requestAnimationFrame")
    .mockImplementation((callback: FrameRequestCallback) => {
      animationFrames.push(callback);
      return animationFrames.length;
    });
});

afterEach(() => {
  jest.restoreAllMocks();
  document.body.textContent = "";
});

const flushAnimationFrame = () => {
  act(() => animationFrames.shift()?.(0));
};

const renderFocusHook = (
  initialProps: HookProps = { multiple: false, hasFiles: false },
) => {
  const fallback = document.createElement("button");
  document.body.appendChild(fallback);
  const fallbackRef = { current: fallback };
  const utils = renderHook(
    ({ multiple, hasFiles }: HookProps) =>
      useMoveFocusAfterFileSelection({
        multiple,
        hasFiles,
        fallbackRef,
      }),
    { initialProps },
  );

  return { ...utils, fallback };
};

test("returns focus to the picker when no status is rendered", () => {
  const { result, fallback } = renderFocusHook();

  act(() => result.current.requestFileStatusFocus());
  flushAnimationFrame();

  expect(fallback).toHaveFocus();
});

test("focuses the first status action when a file status is rendered", () => {
  const { result } = renderFocusHook({ multiple: false, hasFiles: true });
  const statusContainer = document.createElement("div");
  const action = document.createElement("button");
  statusContainer.appendChild(action);
  document.body.appendChild(statusContainer);
  (
    result.current.statusListRef as MutableRefObject<HTMLDivElement | null>
  ).current = statusContainer;

  act(() => result.current.requestFileStatusFocus());
  flushAnimationFrame();

  expect(action).toHaveFocus();
});

test("focuses an actionless status list", () => {
  const { result } = renderFocusHook({ multiple: false, hasFiles: true });
  const statusContainer = document.createElement("div");
  const statusList = document.createElement("ul");
  statusList.dataset.role = "file-upload-status-list";
  statusList.tabIndex = -1;
  statusContainer.appendChild(statusList);
  document.body.appendChild(statusContainer);
  (
    result.current.statusListRef as MutableRefObject<HTMLDivElement | null>
  ).current = statusContainer;

  act(() => result.current.requestFileStatusFocus());
  flushAnimationFrame();

  expect(statusList).toHaveFocus();
});

test("falls back to the picker when a rendered status has no focus target", () => {
  const { result, fallback } = renderFocusHook({
    multiple: false,
    hasFiles: true,
  });
  const statusContainer = document.createElement("div");
  document.body.appendChild(statusContainer);
  (
    result.current.statusListRef as MutableRefObject<HTMLDivElement | null>
  ).current = statusContainer;

  act(() => result.current.requestFileStatusFocus());
  flushAnimationFrame();

  expect(fallback).toHaveFocus();
});

test("cancels a pending focus request", () => {
  const { result } = renderFocusHook();

  act(() => {
    result.current.requestFileStatusFocus();
    result.current.cancelFileStatusFocus();
  });

  expect(animationFrames).toHaveLength(0);
});

test("clears a pending focus request in multiple-file mode", () => {
  const { result, rerender } = renderFocusHook({
    multiple: true,
    hasFiles: true,
  });

  act(() => result.current.requestFileStatusFocus());
  rerender({ multiple: false, hasFiles: true });

  expect(animationFrames).toHaveLength(0);
});
