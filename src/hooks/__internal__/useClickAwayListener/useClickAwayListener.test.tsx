import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

import useClickAwayListener from "./useClickAwayListener";

type EventTypeID = "mousedown" | "click";

interface ClickAwayProps {
  handleClickAway: (ev: Event) => void;
  eventTypeId?: EventTypeID;
}

const eventHandlerPropNames: Record<
  EventTypeID,
  keyof React.HTMLAttributes<HTMLDivElement>
> = {
  click: "onClick",
  mousedown: "onMouseDown",
};

const MockComponent = ({
  handleClickAway,
  eventTypeId = "click",
}: ClickAwayProps) => {
  const onInsideClick = useClickAwayListener(handleClickAway, eventTypeId);
  const onInsideClickProp: Record<string, (ev: Event) => void> = {
    [eventHandlerPropNames[eventTypeId]]: onInsideClick,
  };

  return (
    <div {...onInsideClickProp} role="button">
      Child
    </div>
  );
};

const handleClickAway: jest.Mock<void, [Event]> = jest.fn();

let addListenerSpy: jest.SpyInstance<
  void,
  [
    string,
    EventListenerOrEventListenerObject,
    (boolean | AddEventListenerOptions)?,
  ]
>;
let removeListenerSpy: jest.SpyInstance<
  void,
  [
    string,
    EventListenerOrEventListenerObject,
    (boolean | AddEventListenerOptions)?,
  ]
>;

beforeEach(() => {
  handleClickAway.mockReset();
  addListenerSpy = jest.spyOn(document, "addEventListener");
  removeListenerSpy = jest.spyOn(document, "removeEventListener");
});

afterEach(() => {
  jest.clearAllMocks();
});

test("adds the event listener on mount and removes on unmount", () => {
  const { unmount } = render(<MockComponent handleClickAway={jest.fn()} />);

  expect(addListenerSpy).toHaveBeenCalled();

  unmount();

  expect(removeListenerSpy).toHaveBeenCalled();
});

test("calls handleClickAway when mousedown is outside of wrapper element", () => {
  render(
    <MockComponent handleClickAway={handleClickAway} eventTypeId="mousedown" />,
  );

  fireEvent.mouseDown(document);

  expect(handleClickAway).toHaveBeenCalledTimes(1);
});

test("invokes handleClickAway on external 'click'", () => {
  render(<MockComponent handleClickAway={handleClickAway} />);

  fireEvent.click(document);

  expect(handleClickAway).toHaveBeenCalledTimes(1);
});

test("does not invoke handleClickAway on internal 'click'", () => {
  render(<MockComponent handleClickAway={handleClickAway} />);

  fireEvent.click(screen.getByRole("button"));

  expect(handleClickAway).not.toHaveBeenCalled();
});

test("does not invoke handleClickAway on internal 'mousedown'", () => {
  render(
    <MockComponent handleClickAway={handleClickAway} eventTypeId="mousedown" />,
  );

  fireEvent.click(screen.getByRole("button"));

  expect(handleClickAway).not.toHaveBeenCalled();
});
