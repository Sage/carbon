import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useFocusPortalContent from "./useFocusPortalContent";

const MockComponent = ({ cb }: { cb: () => void }) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [target, setTarget] = useState<HTMLButtonElement | null>(null);

  const callback = () => {
    cb();
  };

  useFocusPortalContent({ current: container }, { current: target }, callback);

  return (
    <div>
      <div ref={setContainer}>
        <button type="button">First</button>
        <button type="button">Middle</button>
        <button type="button">Last</button>
      </div>
      <button type="button">Before target</button>
      <button ref={setTarget} type="button">
        Target
      </button>
      <button type="button">After target</button>
    </div>
  );
};

describe("useFocusPortalContent custom hook", () => {
  const mockCb = jest.fn();

  afterEach(() => {
    mockCb.mockClear();
  });

  it("should focus the first element in the container when the target element is focused and the user presses tab key", async () => {
    render(<MockComponent cb={mockCb} />);

    const target = screen.getByText("Target");
    const first = screen.getByText("First");
    const afterTarget = screen.getByText("After target");

    target.focus();
    await userEvent.tab();
    expect(afterTarget).not.toHaveFocus();
    expect(first).toHaveFocus();
  });

  it("should focus the element after the target when the last element in the container is focused and the user presses tab key", async () => {
    render(<MockComponent cb={mockCb} />);

    const target = screen.getByText("Target");
    const last = screen.getByText("Last");
    const afterTarget = screen.getByText("After target");

    last.focus();
    await userEvent.tab();
    expect(target).not.toHaveFocus();
    expect(afterTarget).toHaveFocus();
  });

  it("should focus the target element when the first element in the container is focused and the user presses shift + tab keys", async () => {
    render(<MockComponent cb={mockCb} />);

    const target = screen.getByText("Target");
    const first = screen.getByText("First");
    const afterTarget = screen.getByText("After target");

    first.focus();
    await userEvent.tab({ shift: true });
    expect(afterTarget).not.toHaveFocus();
    expect(target).toHaveFocus();
  });

  it("should focus the elements within the container when the last element in the container is focused and the user presses shift + tab keys", async () => {
    render(<MockComponent cb={mockCb} />);

    const last = screen.getByText("Last");
    const middle = screen.getByText("Middle");
    const first = screen.getByText("First");

    last.focus();
    await userEvent.tab({ shift: true });
    expect(middle).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(first).toHaveFocus();
  });

  it("should focus the element before the target when it is focused and the user presses shift + tab keys", async () => {
    render(<MockComponent cb={mockCb} />);

    const target = screen.getByText("Target");
    const beforeTarget = screen.getByText("Before target");

    target.focus();
    await userEvent.tab({ shift: true });
    expect(beforeTarget).toHaveFocus();
  });
});
