import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import IconButton from ".";
import Message from "../message/message.component";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import StyledIconButton from "./icon-button.style";
import Icon from "../icon";
import StyledIcon from "../icon/icon.style";
import Tooltip from "../tooltip";

jest.mock("@tippyjs/react/headless", () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

describe("IconButton component", () => {
  let wrapper, onDismiss, onBlur;

  describe("when onDismiss is provided", () => {
    beforeEach(() => {
      onDismiss = jest.fn();
      onBlur = jest.fn();
      wrapper = mount(
        <Message roundedCorners={false} variant="info" onDismiss={onDismiss}>
          Message
        </Message>
      );
    });

    describe("styled system", () => {
      testStyledSystemMargin((props) => (
        <IconButton onAction={() => {}} {...props}>
          <Icon type="home" />
        </IconButton>
      ));
    });

    describe("on baseTheme", () => {
      it("renders correct style for focused IconButton", () => {
        assertStyleMatch(
          {
            outline: "solid 3px #FFB500",
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
          const keyDownParams = { keyCode: 13, which: 13 };
          foundIconButton.simulate("keyDown", keyDownParams);
          expect(onDismiss).toHaveBeenCalledTimes(1);
        });
      });

      describe("when SpaceKey", () => {
        it("calls close callback", () => {
          const foundIconButton = wrapper.find(IconButton).first();
          const keyDownParams = { keyCode: 32, which: 32 };
          foundIconButton.simulate("keyDown", keyDownParams);
          expect(onDismiss).toHaveBeenCalledTimes(1);
        });
      });

      describe("when TabKey", () => {
        it("calls close callback", () => {
          const foundIconButton = wrapper.find(IconButton).first();
          const keyDownParams = { keyCode: 9, which: 9 };
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

    describe("when component does not handle onBlur", () => {
      it("does not call onBlur callback", () => {
        wrapper = mount(
          <Message
            roundedCorners={false}
            variant="info"
            onDismiss={onDismiss}
            onBlur={onBlur}
          >
            Message
          </Message>
        );
        const foundIconButton = wrapper.find(IconButton).first();
        foundIconButton.simulate("click");
        expect(onDismiss).toHaveBeenCalledTimes(1);
        expect(onBlur).toHaveBeenCalledTimes(0);
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

    it("should show the tooltip on focus of the button", () => {
      act(() => {
        wrapper.find(StyledIconButton).prop("onFocus")();
      });
      expect(wrapper.update().find(Tooltip).prop("isVisible")).toEqual(true);
    });

    it("should show the tooltip on mouse enter the button", () => {
      act(() => {
        wrapper.find(StyledIconButton).prop("onMouseEnter")();
      });
      expect(wrapper.update().find(Tooltip).prop("isVisible")).toEqual(true);
    });

    it("should hide the tooltip on blur of the button", () => {
      act(() => {
        wrapper.find(StyledIconButton).prop("onFocus")();
      });
      wrapper.update();

      act(() => {
        wrapper.find(StyledIconButton).prop("onBlur")();
      });
      expect(wrapper.update().find(Tooltip).prop("isVisible")).toEqual(false);
    });

    it("should hide the tooltip on mouse leaving the button", () => {
      act(() => {
        wrapper.find(StyledIconButton).prop("onMouseEnter")();
      });
      wrapper.update();

      act(() => {
        wrapper.find(StyledIconButton).prop("onMouseLeave")();
      });
      expect(wrapper.update().find(Tooltip).prop("isVisible")).toEqual(false);
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
