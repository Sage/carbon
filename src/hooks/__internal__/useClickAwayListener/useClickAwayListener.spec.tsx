import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import useClickAwayListener from "./useClickAwayListener";

interface ClickAwayProps {
  handleClickAway: (ev: Event) => void;
  eventTypeId?: "mousedown" | "click";
}

const eventHandlerPropNames = { click: "onClick", mousedown: "onMouseDown" };

const MockComponent = ({
  handleClickAway,
  eventTypeId = "click",
}: ClickAwayProps) => {
  const onInsideClick = useClickAwayListener(handleClickAway, eventTypeId);
  const onInsideClickProp = {
    [eventHandlerPropNames[eventTypeId]]: onInsideClick,
  };

  return (
    <div data-testid="target-element" {...onInsideClickProp}>
      Child
    </div>
  );
};

describe("useClickAwayListener", () => {
  it("adds the event listener on mount and removes on unmount", () => {
    const addListenerSpy = jest.spyOn(document, "addEventListener");
    const removeListenerSpy = jest.spyOn(document, "removeEventListener");
    const { unmount } = render(<MockComponent handleClickAway={jest.fn()} />);
    expect(addListenerSpy).toHaveBeenCalled();
    unmount();
    expect(removeListenerSpy).toHaveBeenCalled();
  });

  it("calls handleClickAway when mousedown is outside of wrapper element", () => {
    const handleClickAway = jest.fn();
    render(
      <MockComponent
        handleClickAway={handleClickAway}
        eventTypeId="mousedown"
      />
    );
    fireEvent.mouseDown(document);
    expect(handleClickAway).toHaveBeenCalled();
  });

  it("does not call handleClickAway when mousedown is inside of wrapper element", () => {
    const handleClickAway = jest.fn();
    render(
      <MockComponent
        handleClickAway={handleClickAway}
        eventTypeId="mousedown"
      />
    );
    fireEvent.mouseDown(screen.getByTestId("target-element"));
    expect(handleClickAway).not.toHaveBeenCalled();
  });

  it("calls handleClickAway when click is outside of wrapper element", () => {
    const handleClickAway = jest.fn();
    render(<MockComponent handleClickAway={handleClickAway} />);
    fireEvent.click(document);
    expect(handleClickAway).toHaveBeenCalled();
  });

  it("does not call handleClickAway when click is inside of wrapper element", () => {
    const handleClickAway = jest.fn();
    render(<MockComponent handleClickAway={handleClickAway} />);
    fireEvent.click(screen.getByTestId("target-element"));
    expect(handleClickAway).not.toHaveBeenCalled();
  });
});
