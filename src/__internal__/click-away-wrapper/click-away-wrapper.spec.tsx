import React, { useRef } from "react";
import { mount } from "enzyme";
import ClickAwayWrapper, {
  ClickAwayWrapperProps,
} from "./click-away-wrapper.component";

const MockComponent = ({
  handleClickAway,
  eventTypeId,
}: Omit<ClickAwayWrapperProps, "children" | "targets">) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <ClickAwayWrapper
      targets={[ref]}
      handleClickAway={handleClickAway}
      eventTypeId={eventTypeId}
    >
      <div ref={ref}>Child</div>
    </ClickAwayWrapper>
  );
};

describe("ClickAwayWrapper", () => {
  it("adds the event listener on mount", () => {
    const addListenerSpy = jest.spyOn(document, "addEventListener");
    mount(<MockComponent handleClickAway={jest.fn()} />);
    expect(addListenerSpy).toHaveBeenCalled();
  });

  it("removes the event listener on unmount", () => {
    const removeListenerSpy = jest.spyOn(document, "removeEventListener");
    const wrapper = mount(<MockComponent handleClickAway={jest.fn()} />);
    wrapper.unmount();
    expect(removeListenerSpy).toHaveBeenCalled();
  });

  it("calls handleClickAway when mousedown is outside of wrapper element", () => {
    const handleClickAway = jest.fn();
    mount(
      <MockComponent
        handleClickAway={handleClickAway}
        eventTypeId="mousedown"
      />
    );
    document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(handleClickAway).toHaveBeenCalled();
  });

  it("does not call handleClickAway when mousedown is inside of wrapper element", () => {
    const handleClickAway = jest.fn();
    const wrapper = mount(<MockComponent handleClickAway={handleClickAway} />);
    document.dispatchEvent(
      new CustomEvent("mousedown", {
        detail: {
          enzymeTestingTarget: wrapper?.find("div").getDOMNode(),
        },
      })
    );
    expect(handleClickAway).not.toHaveBeenCalled();
  });

  it("calls handleClickAway when click is outside of wrapper element", () => {
    const handleClickAway = jest.fn();
    mount(<MockComponent handleClickAway={handleClickAway} />);
    document.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(handleClickAway).toHaveBeenCalled();
  });

  it("does not call handleClickAway when click is inside of wrapper element", () => {
    const handleClickAway = jest.fn();
    const wrapper = mount(<MockComponent handleClickAway={handleClickAway} />);
    document.dispatchEvent(
      new CustomEvent("click", {
        detail: {
          enzymeTestingTarget: wrapper?.find("div").getDOMNode(),
        },
      })
    );
    expect(handleClickAway).not.toHaveBeenCalled();
  });
});
