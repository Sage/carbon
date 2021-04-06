import React from "react";
import { mount } from "enzyme";
import IconButton from ".";
import Message from "../message/message.component";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import StyledIconButton from "./icon-button.style";

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
        <IconButton {...props}>test content</IconButton>
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
        wrapper = mount(<IconButton onDismiss={() => {}} disabled />);

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
});
