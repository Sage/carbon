import React, { useCallback, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";

import Popover, { PopoverProps } from "./popover.component";
import Dialog from "../../components/dialog";
import { StyledBackdrop } from "./popover.style";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";
import useFloating from "../../hooks/__internal__/useFloating";

jest.mock("../../hooks/__internal__/useFloating");
const useFloatingMock = useFloating as jest.Mock;

const Component = (props: Partial<PopoverProps>) => {
  const [ref, setRef] = useState({ current: null });

  const setRefCallback = useCallback((reference) => {
    setRef({ current: reference });
  }, []);

  return (
    <div ref={setRefCallback} id="popover-container">
      <Popover placement="bottom-start" {...props} reference={ref}>
        <div id="popover-children" />
      </Popover>
    </div>
  );
};

const InDialog = ({
  dialogRole,
  renderPopover,
  ...props
}: {
  dialogRole?: string;
  renderPopover?: boolean;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <Dialog open role={dialogRole}>
      <div ref={ref} id="popover-container">
        {renderPopover && (
          <Popover placement="bottom-start" {...props} reference={ref}>
            <div id="popover-children" />
          </Popover>
        )}
      </div>
    </Dialog>
  );
};

describe("Popover", () => {
  describe("portal", () => {
    it("creates a div and appends it to body on mount", () => {
      const createElementSpy = jest.spyOn(document, "createElement");
      const appendChildSpy = jest.spyOn(document.body, "appendChild");

      const wrapper = mount(<Component />);

      expect(createElementSpy).toHaveBeenCalledWith("div");

      const provider = wrapper.find(CarbonScopedTokensProvider).getDOMNode();

      const grandchild = document.createElement("div");
      grandchild.id = "popover-children";
      provider.appendChild(grandchild);
      expect(appendChildSpy.mock.calls[0][0].childNodes[0]).toEqual(provider);
      wrapper.unmount();
    });
    it("does not render children in portal when disablePortal passed", () => {
      const createPortalSpy = jest.spyOn(ReactDOM, "createPortal");
      const wrapper = mount(<Component disablePortal />);
      wrapper.unmount();
      expect(createPortalSpy).not.toHaveBeenCalled();
    });

    it("renders children in portal", () => {
      const createPortalSpy = jest.spyOn(ReactDOM, "createPortal");
      const wrapper = mount(<Component />);

      const provider = wrapper.find(CarbonScopedTokensProvider).getDOMNode();

      const grandchild = document.createElement("div");
      grandchild.id = "popover-children";
      provider.appendChild(grandchild);

      expect(
        (createPortalSpy.mock.calls[0][0] as React.ReactElement).props.children
          .props.children.props.id
      ).toBe("popover-children");
      expect(createPortalSpy.mock.calls[0][1].childNodes[0]).toEqual(provider);
      wrapper.unmount();
    });

    it("removes created div from the body on unmount", () => {
      const removeChildSpy = jest.spyOn(document.body, "removeChild");

      const wrapper = mount(<Component />);

      wrapper.unmount();

      const child = document.createElement("div");

      expect(removeChildSpy).toHaveBeenCalledWith(child);
    });
  });

  describe("disableBackgroundUI", () => {
    let wrapper: ReactWrapper;

    afterEach(() => {
      wrapper.unmount();
    });

    it("renders content as a child of backdrop when background is disabled", () => {
      wrapper = mount(<Component disableBackgroundUI />);
      expect(
        wrapper.find(StyledBackdrop).find("#popover-children").exists()
      ).toBe(true);
    });

    it("does not render backdrop when background is not disabled", () => {
      wrapper = mount(<Component />);
      expect(wrapper.find(StyledBackdrop).exists()).toBe(false);
    });
  });

  describe("useFloating", () => {
    it("calls useFloating with proper arguments", () => {
      useFloatingMock.mockClear();
      const wrapper = mount(
        <Component isOpen placement="top" animationFrame />
      );
      act(() => {
        wrapper.update();
      });
      const call = useFloatingMock.mock.calls[1][0];

      expect(call.isOpen).toBe(true);
      expect(call.reference).toEqual({
        current: wrapper.find("#popover-container").getDOMNode(),
      });
      expect(call.floating).toEqual({
        current: wrapper.find("#popover-children").getDOMNode(),
      });
      expect(call.placement).toBe("top");
      expect(call.animationFrame).toBe(true);
    });
  });

  describe("when inside of a Dialog", () => {
    let wrapper: ReactWrapper;

    afterEach(() => {
      wrapper.unmount();
    });

    it("should attach the portal to the element with role of 'dialog'", () => {
      wrapper = mount(<InDialog />);
      const dialog = wrapper.find("[role='dialog']");
      const appendChildSpy = jest.spyOn(
        dialog.at(2).getDOMNode(),
        "appendChild"
      );

      wrapper.setProps({ renderPopover: true });

      act(() => {
        wrapper.update();
      });

      expect(appendChildSpy).toHaveBeenCalled();
    });

    it("should attach the portal to the document.body if no element with role of 'dialog' is found", () => {
      wrapper = mount(<InDialog dialogRole="alertdialog" />);
      const dialog = wrapper.find("[role='alertdialog']");
      const appendChildToDialogSpy = jest.spyOn(
        dialog.at(2).getDOMNode(),
        "appendChild"
      );

      const appendChildToBodySpy = jest.spyOn(document.body, "appendChild");

      wrapper.setProps({ renderPopover: true });

      act(() => {
        wrapper.update();
      });

      expect(appendChildToDialogSpy).not.toHaveBeenCalled();
      expect(appendChildToBodySpy).toHaveBeenCalled();
    });
  });

  describe("isOpen prop", () => {
    let wrapper: ReactWrapper;

    afterEach(() => {
      wrapper.unmount();
    });

    it("when true, the popover content is visible", () => {
      wrapper = mount(<Component isOpen />);
      expect(wrapper.find("#popover-children").getDOMNode()).toBeVisible();
    });

    it("when false, the popover content is not visible", () => {
      wrapper = mount(<Component isOpen={false} />);
      expect(wrapper.find("#popover-children").getDOMNode()).not.toBeVisible();
    });

    it("when not provided, the popover content is visible", () => {
      wrapper = mount(<Component />);
      expect(wrapper.find("#popover-children").getDOMNode()).toBeVisible();
    });
  });
});
