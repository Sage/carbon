import React from "react";
import { renderHook, act } from "@testing-library/react";
import useChildButtons from "./useChildButtons";

const getToggleButtonRef = () => {
  const button = document.createElement("button");
  document.body.appendChild(button);
  return { current: button } as React.RefObject<HTMLButtonElement>;
};

test("hides the additional buttons when blur occurs and focus does not move to a related target contained within the current target", () => {
  const toggleButtonRef = getToggleButtonRef();
  const { result } = renderHook(() => useChildButtons(toggleButtonRef));

  act(() => {
    result.current.showButtons();
  });
  expect(result.current.showAdditionalButtons).toBe(true);

  const currentTarget = document.createElement("div");
  act(() => {
    result.current.wrapperProps.onBlur({
      currentTarget,
      relatedTarget: null,
    } as unknown as React.FocusEvent<HTMLElement>);
  });

  expect(result.current.showAdditionalButtons).toBe(false);
});

test("does not hide the additional buttons when blur occurs and focus moves to a related target contained within the current target", () => {
  const toggleButtonRef = getToggleButtonRef();
  const { result } = renderHook(() => useChildButtons(toggleButtonRef));

  act(() => {
    result.current.showButtons();
  });
  expect(result.current.showAdditionalButtons).toBe(true);

  const relatedTarget = document.createElement("button");
  const currentTarget = document.createElement("div");
  currentTarget.appendChild(relatedTarget);

  act(() => {
    result.current.wrapperProps.onBlur({
      currentTarget,
      relatedTarget,
    } as unknown as React.FocusEvent<HTMLElement>);
  });

  expect(result.current.showAdditionalButtons).toBe(true);
});

test("calls the child's onClick, hides the additional buttons and focuses the toggle button when a child button is clicked", () => {
  const toggleButtonRef = getToggleButtonRef();
  const childOnClick = jest.fn();
  const focusSpy = jest.spyOn(
    toggleButtonRef.current as HTMLButtonElement,
    "focus",
  );
  const { result } = renderHook(() => useChildButtons(toggleButtonRef));

  act(() => {
    result.current.showButtons();
  });
  expect(result.current.showAdditionalButtons).toBe(true);

  const clickEvent = {} as React.MouseEvent<HTMLButtonElement>;
  act(() => {
    result.current.contextValue.onChildButtonClick(childOnClick)(clickEvent);
  });

  expect(childOnClick).toHaveBeenCalledWith(clickEvent);
  expect(result.current.showAdditionalButtons).toBe(false);
  expect(focusSpy).toHaveBeenCalledTimes(1);
});

test("hides the additional buttons and focuses the toggle button when a child button is clicked and no 'onClick' is passed", () => {
  const toggleButtonRef = getToggleButtonRef();
  const focusSpy = jest.spyOn(
    toggleButtonRef.current as HTMLButtonElement,
    "focus",
  );
  const { result } = renderHook(() => useChildButtons(toggleButtonRef));

  act(() => {
    result.current.showButtons();
  });

  const clickEvent = {} as React.MouseEvent<HTMLButtonElement>;
  act(() => {
    result.current.contextValue.onChildButtonClick(undefined)(clickEvent);
  });

  expect(result.current.showAdditionalButtons).toBe(false);
  expect(focusSpy).toHaveBeenCalledTimes(1);
});
