import React from "react";
import { act, renderHook, screen } from "@testing-library/react";
import { Input } from "../input";

import useInputBehaviour from "./useInputBehaviour";
import { render } from "../../__spec_helper__/__internal__/test-utils";

test("when `inputRef` is passed to the input, it assigns the input element reference correctly", () => {
  const { result } = renderHook(() => useInputBehaviour());
  const { inputRef } = result.current;

  let capturedInput: HTMLInputElement | null = null;

  const inputRefCallback = (input: HTMLInputElement | null) => {
    if (inputRef && input) {
      inputRef({ current: input });
      capturedInput = input;
    }
  };

  render(<Input ref={inputRefCallback} value="My Input Element" />);

  const input = screen.getByRole("textbox") as HTMLInputElement;

  expect(capturedInput).toBe(input);
});

test("when group behaviour is enabled and the `onFocus` function is called, the `hasFocus` hook returns true", () => {
  const { result } = renderHook(() => useInputBehaviour());
  const { onFocus } = result.current;

  act(() => {
    onFocus?.();
  });

  expect(result.current.hasFocus).toBe(true);
});

test("when group behaviour is enabled and the `onBlur` function is called, the `hasFocus` hook returns false", () => {
  const { result } = renderHook(() => useInputBehaviour());
  const { onFocus, onBlur } = result.current;

  act(() => {
    onFocus?.();
  });

  expect(result.current.hasFocus).toBe(true);

  act(() => {
    onBlur?.();
  });

  expect(result.current.hasFocus).toBe(false);
});

test("when group behaviour is enabled and the `onMouseDown` function is called, the input is focused and `preventScroll` within the focus method is set to true", () => {
  const rafSpy = jest
    .spyOn(window, "requestAnimationFrame")
    .mockImplementation((callback: FrameRequestCallback): number => {
      callback(0);
      return 0;
    });

  const { result } = renderHook(() => useInputBehaviour());
  const { inputRef, onMouseDown } = result.current;

  const inputRefCallback = (input: HTMLInputElement | null) => {
    if (inputRef && input) {
      inputRef({ current: input });
    }
  };

  render(<Input ref={inputRefCallback} />);

  const input = screen.getByRole("textbox") as HTMLInputElement;
  const focusSpy = jest.spyOn(input, "focus");

  act(() => {
    onMouseDown?.();
  });

  expect(input).toHaveFocus();
  expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });

  rafSpy.mockRestore();
  focusSpy.mockRestore();
});

test("when group behaviour is enabled and the `onMouseEnter` function is called the `hasMouseOver` hook returns true", () => {
  const { result } = renderHook(() => useInputBehaviour());
  const { onMouseEnter } = result.current;

  act(() => {
    onMouseEnter?.();
  });

  expect(result.current.hasMouseOver).toBe(true);
});

test("when group behaviour is enabled and the `onMouseLeave` function is called the `hasMouseOver` hook returns false", async () => {
  const { result } = renderHook(() => useInputBehaviour());
  const { onMouseEnter, onMouseLeave } = result.current;

  act(() => {
    onMouseEnter?.();
  });

  expect(result.current.hasMouseOver).toBe(true);

  act(() => {
    onMouseLeave?.();
  });

  expect(result.current.hasMouseOver).toBe(false);
});

/* Passing true as a param of `useInputBehaviour` sets the `blockInputBehaviour` prop in `useInputBehaviour` to be true` */
test("when group behaviour is disabled and the `onFocus` function is called, the `hasFocus` hook returns false", () => {
  const { result } = renderHook(() => useInputBehaviour(true));
  const { onFocus } = result.current;

  act(() => {
    onFocus?.();
  });

  expect(result.current.hasFocus).toBe(false);
});

test("when group behaviour is disabled and the `onBlur` function is called, the `hasFocus` hook returns false", () => {
  const { result } = renderHook(() => useInputBehaviour(true));
  const { onFocus, onBlur } = result.current;

  act(() => {
    onFocus?.();
  });

  expect(result.current.hasFocus).toBe(false);

  act(() => {
    onBlur?.();
  });

  expect(result.current.hasFocus).toBe(false);
});

test("when group behaviour is disabled and the `onMouseEnter` function is called the `hasMouseOver` hook returns false", () => {
  const { result } = renderHook(() => useInputBehaviour(true));
  const { onMouseEnter } = result.current;

  act(() => {
    onMouseEnter?.();
  });

  expect(result.current.hasMouseOver).toBe(false);
});

test("when group behaviour is disabled and the `onMouseLeave` function is called the `hasMouseOver` hook returns false", async () => {
  const { result } = renderHook(() => useInputBehaviour(true));
  const { onMouseEnter, onMouseLeave } = result.current;

  act(() => {
    onMouseEnter?.();
  });

  expect(result.current.hasMouseOver).toBe(false);

  act(() => {
    onMouseLeave?.();
  });

  expect(result.current.hasMouseOver).toBe(false);
});
