import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";

import IconButton from ".";
import Message from "../message";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
} from "../../__spec_helper__/test-utils";
import StyledIconButton from "./icon-button.style";
import Icon from "../icon";
import StyledIcon from "../icon/icon.style";
import { TooltipProvider } from "../../__internal__/tooltip-provider";

jest.mock("@tippyjs/react/headless", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));

describe("IconButton component", () => {
  let wrapper: ReactWrapper;
  let onDismiss: jest.Mock;

  describe("refs", () => {
    it("accepts ref as a ref object", () => {
      const ref = { current: null };

      wrapper = mount(
        <IconButton onAction={() => {}} ref={ref}>
          <Icon type="home" tooltipMessage="foo" />
        </IconButton>
      );

      wrapper.update();

      expect(ref.current).toBe(wrapper.find(StyledIconButton).getDOMNode());
    });

    it("accepts ref as a ref callback", () => {
      const ref = jest.fn();
      wrapper = mount(
        <IconButton onAction={() => {}} ref={ref}>
          <Icon type="home" tooltipMessage="foo" />
        </IconButton>
      );

      wrapper.update();

      expect(ref).toHaveBeenCalledWith(
        wrapper.find(StyledIconButton).getDOMNode()
      );
    });

    it("sets ref to empty after unmount", () => {
      const ref = { current: null };
      wrapper = mount(
        <IconButton onAction={() => {}} ref={ref}>
          <Icon type="home" tooltipMessage="foo" />
        </IconButton>
      );

      wrapper.update();

      wrapper.unmount();

      expect(ref.current).toBe(null);
    });
  });

  describe("tooltip", () => {
    it("renders TooltipProvider with correct props", () => {
      wrapper = mount(
        <IconButton onAction={() => {}} disabled>
          <Icon type="home" tooltipMessage="foo" />
        </IconButton>
      );

      const props = wrapper.find(TooltipProvider).props();

      expect(props.disabled).toBe(true);
      expect(props.focusable).toBe(false);
      expect(props.target).toBe(wrapper.find(StyledIconButton).getDOMNode());
    });
  });

  describe("when onDismiss is provided", () => {
    beforeEach(() => {
      onDismiss = jest.fn();
      wrapper = mount(
        <Message variant="info" onDismiss={onDismiss}>
          Message
        </Message>
      );
    });

    describe("styled system", () => {
      testStyledSystemSpacing(
        (props) => (
          <IconButton onAction={() => {}} {...props}>
            <Icon type="home" />
          </IconButton>
        ),
        { p: 0 },
        undefined,
        { modifier: "&&" }
      );
    });

    describe("on baseTheme", () => {
      it("renders correct style for focused IconButton", () => {
        assertStyleMatch(
          {
            outline: "solid 3px var(--colorsSemanticFocus500)",
          },
          wrapper.find(IconButton).first(),
          { modifier: ":focus" }
        );
      });
    });

    describe("if disabled prop provided", () => {
      it("should have `not allowed` cursor property", () => {
        wrapper = mount(
          <IconButton onAction={() => {}} disabled>
            <Icon type="home" />
          </IconButton>
        );

        assertStyleMatch(
          {
            cursor: "not-allowed",
          },
          wrapper.find(StyledIconButton),
          { modifier: "&:hover" }
        );
      });
    });

    describe("onKeyDown event", () => {
      describe("when EnterKey", () => {
        it("calls close callback", () => {
          const foundIconButton = wrapper.find(IconButton).first();
          const keyDownParams = { key: "Enter" };
          foundIconButton.simulate("keyDown", keyDownParams);
          expect(onDismiss).toHaveBeenCalledTimes(1);
        });
      });

      describe("when SpaceKey", () => {
        it("calls close callback", () => {
          const foundIconButton = wrapper.find(IconButton).first();
          const keyDownParams = { key: " " };
          foundIconButton.simulate("keyDown", keyDownParams);
          expect(onDismiss).toHaveBeenCalledTimes(1);
        });
      });

      describe("when TabKey", () => {
        it("calls close callback", () => {
          const foundIconButton = wrapper.find(IconButton).first();
          const keyDownParams = { key: "Tab" };
          foundIconButton.simulate("keyDown", keyDownParams);
          expect(onDismiss).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe("IconButton onClick event", () => {
      it("calls onClick callback", () => {
        const foundIconButton = wrapper.find(IconButton).first();
        foundIconButton.simulate("click");
        expect(onDismiss).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Icon child has a tooltip", () => {
    beforeEach(() => {
      wrapper = mount(
        <IconButton onAction={() => {}}>
          <Icon type="home" tooltipMessage="foo" />
        </IconButton>
      );
    });

    it("should block the focus behaviour", () => {
      expect(wrapper.find(StyledIcon).prop("hasTooltip")).toEqual(false);
    });

    describe("when event props are passed", () => {
      const focusMock = jest.fn();
      const blurMock = jest.fn();
      const mouseEnterMock = jest.fn();
      const mouseLeaveMock = jest.fn();

      beforeEach(() => {
        wrapper = mount(
          <IconButton
            onFocus={focusMock}
            onBlur={blurMock}
            onMouseEnter={mouseEnterMock}
            onMouseLeave={mouseLeaveMock}
            onAction={() => {}}
          >
            <Icon type="home" tooltipMessage="foo" />
          </IconButton>
        );
      });

      it("should call the onFocus and onBlur callbacks", () => {
        act(() => {
          wrapper.find(StyledIconButton).prop("onFocus")();
        });
        wrapper.update();
        expect(focusMock).toHaveBeenCalled();
        act(() => {
          wrapper.find(StyledIconButton).prop("onBlur")();
        });
        wrapper.update();
        expect(blurMock).toHaveBeenCalled();
      });

      it("should call the onMouseEnter and onMouseLeave callbacks", () => {
        act(() => {
          wrapper.find(StyledIconButton).prop("onMouseEnter")();
        });
        wrapper.update();
        expect(mouseEnterMock).toHaveBeenCalled();
        act(() => {
          wrapper.find(StyledIconButton).prop("onMouseLeave")();
        });
        wrapper.update();
        expect(mouseLeaveMock).toHaveBeenCalled();
      });
    });

    describe("when disabled", () => {
      beforeEach(() => {
        wrapper = mount(
          <IconButton disabled onAction={() => {}}>
            <Icon type="home" tooltipMessage="foo" />
          </IconButton>
        );
      });

      it("should have the correct background color applied to the icon button", () => {
        assertStyleMatch(
          {
            backgroundColor: "transparent",
          },
          wrapper,
          { modifier: `${StyledIcon}` }
        );
      });

      it("should not set the onFocus prop and not show the tooltip on focus of the button", () => {
        expect(wrapper.find(StyledIconButton).prop("onFocus")).toEqual(
          undefined
        );
      });

      it("should not set the onMouseEnter prop and not should show the tooltip on hover of the button", () => {
        expect(wrapper.find(StyledIconButton).prop("onMouseEnter")).toEqual(
          undefined
        );
      });

      it("should not set the onBlur prop", () => {
        expect(wrapper.find(StyledIconButton).prop("onBlur")).toEqual(
          undefined
        );
      });

      it("should not set the onMouseLeave prop", () => {
        expect(wrapper.find(StyledIconButton).prop("onMouseLeave")).toEqual(
          undefined
        );
      });
    });
  });
});
