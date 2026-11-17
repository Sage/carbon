import { act, renderHook } from "@testing-library/react";
import useMoveFocusAfterFileRemoval from "./useMoveFocusAfterFileRemoval";

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

const renderFocusHook = (...actionNames: string[]) => {
  const statusList = document.createElement("div");
  const list = document.createElement("ul");
  const items = actionNames.map(() => document.createElement("li"));
  const actions = actionNames.map((name, index) => {
    const action = document.createElement("button");
    action.textContent = name;
    items[index].appendChild(action);
    list.appendChild(items[index]);
    return action;
  });
  statusList.appendChild(list);
  const fallback = document.createElement("button");
  document.body.append(statusList, fallback);

  const onRemovalAnnouncement = jest.fn();
  const utils = renderHook(() =>
    useMoveFocusAfterFileRemoval({
      statusListRef: { current: statusList },
      fallbackRef: { current: fallback },
      onRemovalAnnouncement,
    }),
  );

  return { ...utils, actions, items, list, fallback, onRemovalAnnouncement };
};

test("exposes the removal announcement before moving focus to the next action", () => {
  const {
    result,
    actions: [deleted, next],
    items,
    onRemovalAnnouncement,
  } = renderFocusHook("Delete a.pdf", "Delete b.pdf");

  act(() =>
    result.current.moveFocusAfterAction(deleted, "File deleted: a.pdf"),
  );
  items[0].remove();
  flushAnimationFrame();

  expect(onRemovalAnnouncement).toHaveBeenCalledTimes(1);
  expect(result.current.removalAnnouncement).toBe("File deleted: a.pdf");
  expect(next).not.toHaveFocus();

  flushAnimationFrame();

  expect(next).toHaveFocus();
});

test("moves focus without an announcement when none is given", () => {
  const {
    result,
    actions: [removed, next],
    items,
    onRemovalAnnouncement,
  } = renderFocusHook("Cancel a.pdf", "Cancel b.pdf");

  act(() => result.current.moveFocusAfterAction(removed));
  items[0].remove();
  flushAnimationFrame();

  expect(next).toHaveFocus();
  expect(onRemovalAnnouncement).not.toHaveBeenCalled();
  expect(result.current.removalAnnouncement).toBe("");
});

test("does nothing when the action is still rendered", () => {
  const {
    result,
    actions: [kept],
    onRemovalAnnouncement,
  } = renderFocusHook("Delete a.pdf", "Delete b.pdf");

  act(() => result.current.moveFocusAfterAction(kept, "File deleted: a.pdf"));
  flushAnimationFrame();

  expect(onRemovalAnnouncement).not.toHaveBeenCalled();
  expect(result.current.removalAnnouncement).toBe("");
  expect(animationFrames).toHaveLength(0);
});

test("falls back to the Select file button when the last action is removed", () => {
  const {
    result,
    actions: [removed],
    list,
    fallback,
  } = renderFocusHook("Remove a.pdf");

  act(() =>
    result.current.moveFocusAfterAction(removed, "File removed: a.pdf"),
  );
  list.remove();
  flushAnimationFrame();
  flushAnimationFrame();

  expect(result.current.removalAnnouncement).toBe("File removed: a.pdf");

  flushAnimationFrame();

  expect(fallback).toHaveFocus();
});

test("skips the announcement when there is nowhere to move focus", () => {
  const onRemovalAnnouncement = jest.fn();
  const action = document.createElement("button");
  document.body.appendChild(action);
  const { result } = renderHook(() =>
    useMoveFocusAfterFileRemoval({
      statusListRef: { current: null },
      fallbackRef: { current: null },
      onRemovalAnnouncement,
    }),
  );

  act(() => result.current.moveFocusAfterAction(action, "File removed"));
  action.remove();
  flushAnimationFrame();
  flushAnimationFrame();

  expect(onRemovalAnnouncement).not.toHaveBeenCalled();
  expect(result.current.removalAnnouncement).toBe("");
});

test("clears the removal announcement", () => {
  const {
    result,
    actions: [deleted],
    items,
  } = renderFocusHook("Delete a.pdf", "Delete b.pdf");

  act(() =>
    result.current.moveFocusAfterAction(deleted, "File deleted: a.pdf"),
  );
  items[0].remove();
  flushAnimationFrame();
  act(() => result.current.clearRemovalAnnouncement());

  expect(result.current.removalAnnouncement).toBe("");
});
