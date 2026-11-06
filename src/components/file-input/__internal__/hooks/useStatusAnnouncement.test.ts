import { act, renderHook } from "@testing-library/react";
import useStatusAnnouncement from "./useStatusAnnouncement";

const animationFrames = new Map<number, FrameRequestCallback>();
let nextFrameId = 0;

beforeEach(() => {
  animationFrames.clear();
  nextFrameId = 0;
  jest
    .spyOn(window, "requestAnimationFrame")
    .mockImplementation((callback: FrameRequestCallback) => {
      nextFrameId += 1;
      animationFrames.set(nextFrameId, callback);
      return nextFrameId;
    });
  jest
    .spyOn(window, "cancelAnimationFrame")
    .mockImplementation((frameId: number) => {
      animationFrames.delete(frameId);
    });
});

afterEach(() => {
  jest.restoreAllMocks();
});

const flushAnimationFrame = () => {
  const [[frameId, callback]] = Array.from(animationFrames);
  animationFrames.delete(frameId);
  act(() => callback(0));
};

test("starts with an empty announcement", () => {
  const { result } = renderHook(() => useStatusAnnouncement());

  expect(result.current.statusAnnouncement).toBe("");
});

test("announces a message and replaces it with a different one straight away", () => {
  const { result } = renderHook(() => useStatusAnnouncement());

  act(() => result.current.announceStatus("Selected file: a.pdf"));

  expect(result.current.statusAnnouncement).toBe("Selected file: a.pdf");

  act(() => result.current.announceStatus("Upload complete: a.pdf"));

  expect(result.current.statusAnnouncement).toBe("Upload complete: a.pdf");
  expect(animationFrames.size).toBe(0);
});

test("empties the region for two frames before repeating the same message", () => {
  const { result } = renderHook(() => useStatusAnnouncement());

  act(() => result.current.announceStatus("Selected file: a.pdf"));
  act(() => result.current.announceStatus("Selected file: a.pdf"));

  expect(result.current.statusAnnouncement).toBe("");

  flushAnimationFrame();

  expect(result.current.statusAnnouncement).toBe("");

  flushAnimationFrame();

  expect(result.current.statusAnnouncement).toBe("Selected file: a.pdf");
});

test("clears the announcement and cancels a pending repeat", () => {
  const { result } = renderHook(() => useStatusAnnouncement());

  act(() => result.current.announceStatus("Selected file: a.pdf"));
  act(() => result.current.announceStatus("Selected file: a.pdf"));
  act(() => result.current.clearStatusAnnouncement());

  expect(animationFrames.size).toBe(0);
  expect(result.current.statusAnnouncement).toBe("");
});

test("announces the same message straight away after the region is cleared", () => {
  const { result } = renderHook(() => useStatusAnnouncement());

  act(() => result.current.announceStatus("Selected file: a.pdf"));
  act(() => result.current.clearStatusAnnouncement());
  act(() => result.current.announceStatus("Selected file: a.pdf"));

  expect(result.current.statusAnnouncement).toBe("Selected file: a.pdf");
  expect(animationFrames.size).toBe(0);
});

test("replaces a pending repeat with a new message", () => {
  const { result } = renderHook(() => useStatusAnnouncement());

  act(() => result.current.announceStatus("Selected file: a.pdf"));
  act(() => result.current.announceStatus("Selected file: a.pdf"));
  act(() => result.current.announceStatus("Upload complete: a.pdf"));

  expect(animationFrames.size).toBe(0);
  expect(result.current.statusAnnouncement).toBe("Upload complete: a.pdf");
});

test("cancels a pending repeat on unmount", () => {
  const { result, unmount } = renderHook(() => useStatusAnnouncement());

  act(() => result.current.announceStatus("Selected file: a.pdf"));
  act(() => result.current.announceStatus("Selected file: a.pdf"));
  unmount();

  expect(animationFrames.size).toBe(0);
});
