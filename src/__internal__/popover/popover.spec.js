import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { createPopper } from "@popperjs/core";

import Popover, { alignSameWidthPopoverFunction } from "./popover.component";

jest.mock("@popperjs/core");

const Component = (props) => {
  const ref = React.createRef();
  return (
    <div ref={ref} id="popover-container">
      <Popover placement="bottom-start" {...props} reference={ref}>
        <div id="popover-children" />
      </Popover>
    </div>
  );
};

describe("Popover", () => {
  describe("portal", () => {
    it("creates a div and appends it to body on mount", () => {
      const createElementSpy = jest.spyOn(document, "createElement");
      const appendChildSpy = jest.spyOn(document.body, "appendChild");

      mount(<Component />);

      expect(createElementSpy).toHaveBeenCalledWith("div");

      const child = document.createElement("div");
      const grandchild = document.createElement("div");
      grandchild.id = "popover-children";
      child.appendChild(grandchild);

      expect(appendChildSpy).toHaveBeenCalledWith(child);
    });
    it("does not render children in portal when disablePortal passed", () => {
      const createPortalSpy = jest.spyOn(ReactDOM, "createPortal");
      mount(<Component disablePortal />);
      expect(createPortalSpy).not.toHaveBeenCalled();
    });

    it("renders children in portal", () => {
      const createPortalSpy = jest.spyOn(ReactDOM, "createPortal");
      mount(<Component />);

      const child = document.createElement("div");
      const grandchild = document.createElement("div");
      grandchild.id = "popover-children";
      child.appendChild(grandchild);
      expect(createPortalSpy.mock.calls[0][0].props.id).toBe(
        "popover-children"
      );
      expect(createPortalSpy.mock.calls[0][1]).toEqual(child);
    });

    it("removes created div from the body on unmount", () => {
      const removeChildSpy = jest.spyOn(document.body, "removeChild");

      const wrapper = mount(<Component />);

      wrapper.unmount();

      const child = document.createElement("div");

      expect(removeChildSpy).toHaveBeenCalledWith(child);
    });
  });

  describe("popper - ", () => {
    const destroyFunc = jest.fn();

    createPopper.mockImplementation(() => ({ destroy: destroyFunc }));

    it("popper instance is initialized again after props change", () => {
      jest.clearAllMocks();

      const myWrapper = mount(<Component />);

      expect(createPopper).toHaveBeenCalledTimes(1);

      myWrapper.setProps({ placement: "bottom" });

      expect(createPopper).toHaveBeenCalledTimes(2);
    });

    it("popper instance is destroyed on unmount", () => {
      const myWrapper = mount(<Component />);

      myWrapper.unmount();

      expect(destroyFunc).toHaveBeenCalled();
    });

    it("createPopper is called with proper arguments", () => {
      const myWrapper = mount(<Component />);

      const ref = myWrapper.find("#popover-container").getDOMNode();
      const menu = myWrapper.find("#popover-children").getDOMNode();

      expect(createPopper.mock.calls[0][0]).toEqual(ref);
      expect(createPopper.mock.calls[0][1]).toEqual(menu);
      expect(createPopper.mock.calls[0][2]).toMatchObject({
        placement: "bottom-start",
      });
    });
  });
});

describe("alignSameWidthPopoverFunction", () => {
  const createState = (
    referenceWidth,
    popperWidth,
    refRectX,
    popperXoffset
  ) => ({
    elements: {
      reference: {
        getBoundingClientRect: () => ({
          width: referenceWidth,
        }),
      },
      popper: {
        getBoundingClientRect: () => ({
          width: popperWidth,
        }),
      },
    },
    rects: {
      reference: {
        x: refRectX,
      },
    },
    modifiersData: {
      popperOffsets: {
        x: popperXoffset,
      },
    },
    styles: {
      popper: {
        left: 0,
      },
    },
  });
  describe("when width of the reference is not the same as width of the content", () => {
    it("does nothing", () => {
      const state = createState(150, 200);
      alignSameWidthPopoverFunction({ state });
      expect(state.styles.popper.left).toBe(0);
    });
  });

  describe("when width of the reference is the same as width of the content", () => {
    it("modifies state so that left value is equal to rect reference x value when rect is bigger than offset", () => {
      const state = createState(200, 200, 230, 220);
      alignSameWidthPopoverFunction({ state });
      expect(state.styles.popper.left).toBe(`${230}px`);
    });

    it("modifies state so that left value is equal to offset x value when offset is bigger than rect", () => {
      const state = createState(200, 200, 230, 250);
      alignSameWidthPopoverFunction({ state });
      expect(state.styles.popper.left).toBe(`${250}px`);
    });
  });
});
