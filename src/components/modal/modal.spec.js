import React from "react";
import { mount } from "enzyme";

import Modal from "./modal.component";
import { StyledModalBackground } from "./modal.style";
import useScrollBlock from "../../hooks/__internal__/useScrollBlock";

jest.mock("../../hooks/__internal__/useScrollBlock");
const allowScroll = jest.fn();
const blockScroll = jest.fn();

useScrollBlock.mockReturnValue({
  allowScroll,
  blockScroll,
});

describe("Modal", () => {
  let wrapper;
  let onCancel;
  let addEventListenerSpy;
  let removeEventListenerSpy;

  describe("event listeners", () => {
    beforeEach(() => {
      addEventListenerSpy = spyOn(document, "addEventListener");
      removeEventListenerSpy = spyOn(document, "removeEventListener");
    });

    it("binds the key event listener to the document on mount", () => {
      wrapper = mount(<Modal open onCancel={onCancel} />);
      expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    });

    it("does not bind if component is not open on mount", () => {
      wrapper = mount(<Modal open={false} onCancel={onCancel} />);
      expect(addEventListenerSpy).not.toHaveBeenCalled();
    });

    it("removes the event listener if modal was open on unmount", () => {
      wrapper = mount(<Modal open onCancel={onCancel} />);
      wrapper.unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    });

    it("does not remove the event listener if it was not in use on unmount", () => {
      wrapper = mount(<Modal open={false} onCancel={onCancel} />);
      wrapper.unmount();
      expect(removeEventListenerSpy).not.toHaveBeenCalled();
    });

    it("adds event listeners on modal open", () => {
      wrapper = mount(<Modal open={false} onCancel={onCancel} />);
      expect(addEventListenerSpy).not.toHaveBeenCalled();

      wrapper.setProps({ open: true });
      expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    });

    it("removes event listeners on modal close", () => {
      wrapper = mount(<Modal open onCancel={onCancel} />);
      wrapper.setProps({ open: false });
      expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("enableBackgroundUI", () => {
    describe("when enableBackgroundUI is false", () => {
      it("renders background overlay", () => {
        wrapper = mount(
          <Modal onCancel={() => {}} open enableBackgroundUI={false} />
        );
        expect(wrapper.find(StyledModalBackground).exists()).toBe(true);
      });

      it("blocks scroll on open", () => {
        jest.resetAllMocks();
        useScrollBlock.mockReturnValue({ allowScroll, blockScroll });
        wrapper = mount(<Modal open />);
        expect(blockScroll).toHaveBeenCalled();
      });

      it("unblocks scroll on close", () => {
        jest.resetAllMocks();
        useScrollBlock.mockReturnValue({ allowScroll, blockScroll });
        wrapper = mount(<Modal open />);
        wrapper.setProps({ open: false });
        expect(allowScroll).toHaveBeenCalled();
      });
    });

    describe("when enableBackgroundUI is true", () => {
      it("does not render background overlay", () => {
        wrapper = mount(<Modal onCancel={() => {}} open enableBackgroundUI />);
        expect(wrapper.find(StyledModalBackground).exists()).toBe(false);
      });

      it("does not block scroll", () => {
        jest.resetAllMocks();
        useScrollBlock.mockReturnValue({ allowScroll, blockScroll });
        wrapper = mount(<Modal open enableBackgroundUI />);
        expect(blockScroll).not.toHaveBeenCalled();
        wrapper.unmount();
      });
    });
  });

  describe("when the modal is open", () => {
    let domNode;
    let escapeKeyEvent;
    const onCancelFn = jest.fn();

    beforeEach(() => {
      escapeKeyEvent = new KeyboardEvent("keyup", {
        key: "Escape",
        which: 27,
        bubbles: true,
      });
      wrapper = mount(<Modal open onCancel={onCancelFn} />);
      domNode = wrapper.getDOMNode();
      document.body.appendChild(domNode);
    });

    afterEach(() => {
      document.body.removeChild(domNode);
    });

    describe("and the esc key is released", () => {
      it("stopImmediatePropagation function should have been called on the event", () => {
        jest.spyOn(escapeKeyEvent, "stopImmediatePropagation");
        domNode.dispatchEvent(escapeKeyEvent);
        expect(escapeKeyEvent.stopImmediatePropagation).toHaveBeenCalled();
      });

      it("then the onCancel method should have been called", () => {
        onCancelFn.mockReset();
        domNode.dispatchEvent(escapeKeyEvent);
        expect(onCancelFn).toHaveBeenCalled();
      });

      describe("with disableEscKey prop set to true", () => {
        it("then the onCancel method should not have been called", () => {
          wrapper.setProps({ disableEscKey: true });
          onCancelFn.mockReset();
          domNode.dispatchEvent(escapeKeyEvent);
          expect(onCancelFn).not.toHaveBeenCalled();
        });
      });
    });
  });
});
