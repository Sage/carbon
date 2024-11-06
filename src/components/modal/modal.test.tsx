import React from "react";
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Modal from "./modal.component";
import useScrollBlock from "../../hooks/__internal__/useScrollBlock";

jest.mock("../../hooks/__internal__/useScrollBlock");
const allowScroll = jest.fn();
const blockScroll = jest.fn();

const mockedUseScrollBlock = useScrollBlock as jest.MockedFunction<
  typeof useScrollBlock
>;

mockedUseScrollBlock.mockReturnValue({
  allowScroll,
  blockScroll,
});

test("renders background overlay when enableBackgroundUI is false", () => {
  render(<Modal onCancel={() => {}} open enableBackgroundUI={false} />);

  expect(screen.getByTestId("modal-background")).toBeInTheDocument();
});

test("blocks scroll on open when enableBackgroundUI is false", () => {
  blockScroll.mockReset();
  mockedUseScrollBlock.mockReturnValue({ allowScroll, blockScroll });

  render(<Modal open />);

  expect(blockScroll).toHaveBeenCalled();
});

test("unblocks scroll on close when enableBackgroundUI is false", () => {
  allowScroll.mockReset();
  mockedUseScrollBlock.mockReturnValue({ allowScroll, blockScroll });

  const { rerender } = render(<Modal open />);

  rerender(<Modal open={false} />);

  expect(allowScroll).toHaveBeenCalled();
});

test("does not render background overlay when enableBackgroundUI is true", () => {
  render(<Modal onCancel={() => {}} open enableBackgroundUI />);

  expect(screen.queryByTestId("modal-background")).not.toBeInTheDocument();
});

test("does not block scroll when enableBackgroundUI is true", () => {
  blockScroll.mockReset();
  mockedUseScrollBlock.mockReturnValue({ allowScroll, blockScroll });

  render(<Modal open enableBackgroundUI />);

  expect(blockScroll).not.toHaveBeenCalled();
});

test("closes top modal when the `escape` key is pressed", async () => {
  const onCancelFn = jest.fn();
  const onCancelFnTwo = jest.fn();
  jest.useFakeTimers();

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <>
      <Modal data-role="first-modal" open onCancel={onCancelFn} />
      <Modal data-role="second-modal" open onCancel={onCancelFnTwo} />
    </>,
  );

  await user.keyboard("{Escape}");

  expect(onCancelFnTwo).toHaveBeenCalled();
  expect(onCancelFn).not.toHaveBeenCalled();

  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("does not fire `onCancel` if the `escape` key is pressed and no modals are currently open", async () => {
  const onCancelFn = jest.fn();
  const onCancelFnTwo = jest.fn();
  jest.useFakeTimers();

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <>
      <Modal data-role="first-modal" open={false} onCancel={onCancelFn} />
      <Modal data-role="second-modal" open={false} onCancel={onCancelFnTwo} />
    </>,
  );

  await user.keyboard("{Escape}");

  expect(onCancelFnTwo).not.toHaveBeenCalled();
  expect(onCancelFn).not.toHaveBeenCalled();

  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("does not fire `onCancel` if the `escape` key is pressed and `disableClose` is true", async () => {
  const onCancelFn = jest.fn();
  jest.useFakeTimers();

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <>
      <Modal data-role="first-modal" open disableClose onCancel={onCancelFn} />
    </>,
  );

  await user.keyboard("{Escape}");

  expect(onCancelFn).not.toHaveBeenCalled();

  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("should call the `onCancel` method when the modal is open and the `escape` key is pressed", async () => {
  const onCancelFn = jest.fn();
  jest.clearAllMocks();
  jest.useFakeTimers();

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<Modal open onCancel={onCancelFn} />);

  await user.keyboard("{Escape}");

  expect(onCancelFn).toHaveBeenCalled();

  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("onCancel method should not have been called with disableEscKey prop set to true when the modal is open and the `escape` key is pressed", async () => {
  const onCancelFn = jest.fn();
  jest.clearAllMocks();
  jest.useFakeTimers();

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<Modal open onCancel={onCancelFn} disableEscKey />);

  await user.keyboard("{Escape}");

  expect(onCancelFn).not.toHaveBeenCalled();

  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

// This test is required for coverage purposes
test("increases the default z-index when the topModalOverride prop is set", () => {
  render(<Modal data-role="test-modal" open topModalOverride />);

  expect(screen.getByTestId("test-modal")).toHaveStyleRule("z-index: 7000");
});
