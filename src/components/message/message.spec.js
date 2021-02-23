import React from "react";
import PropTypes from "prop-types";
import TestRenderer from "react-test-renderer";
import "jest-styled-components";
import { mount } from "enzyme";
import i18n from "i18next";
import OptionsHelper from "../../utils/helpers/options-helper/options-helper";
import MessageStyle from "./message.style";
import Message from "./message.component";
import {
  assertStyleMatch,
  carbonThemesJestTable,
} from "../../__spec_helper__/test-utils";
import I18next from "../../__spec_helper__/I18next";
import { baseTheme } from "../../style/themes";
import IconButton from "../icon-button";

function RenderWrapper({ lng, ...props }) {
  return (
    <I18next lng={lng}>
      <Message {...props} />
    </I18next>
  );
}

RenderWrapper.defaultProps = {
  lng: "en",
};

RenderWrapper.propTypes = {
  lng: PropTypes.string,
};

function render(props) {
  return TestRenderer.create(<MessageStyle {...props}>Message</MessageStyle>);
}

function getCloseButtonLabel(wrapper) {
  return wrapper.find(IconButton).prop("aria-label");
}

describe("Message", () => {
  describe.each(carbonThemesJestTable)("rendered", (themeName, theme) => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<RenderWrapper theme={theme}>Message</RenderWrapper>);
    });

    it(`should have the expected style for ${themeName}`, () => {
      assertStyleMatch(
        {
          position: "relative",
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "center",
        },
        mount(<RenderWrapper theme={theme}>Message</RenderWrapper>)
      );
    });

    it("does not render the close icon when onDismiss prop is not provided", () => {
      const closeIcon = wrapper.find(IconButton);
      expect(closeIcon.exists()).toEqual(false);
    });

    it("renders the close icon when onDismiss function is provided", () => {
      const onDismiss = jest.fn();
      wrapper = mount(
        <RenderWrapper onDismiss={onDismiss} theme={theme}>
          Message
        </RenderWrapper>
      );
      const closeIcon = wrapper.find(IconButton).first();
      expect(closeIcon.exists()).toEqual(true);
    });

    it("passes the id prop to the root component", () => {
      wrapper.setProps({ id: "message-id" });
      expect(wrapper.find(MessageStyle).props().id).toEqual("message-id");
    });
  });

  describe("when transparent prop is set to true", () => {
    it("should render the message without the border", () => {
      const wrapper = render({
        transparent: true,
        type: "info",
      });

      assertStyleMatch(
        {
          border: "none",
        },
        wrapper.toJSON()
      );
    });
  });

  describe("when transparent prop is not passed", () => {
    it("should render the message with border in a proper color and a white background", () => {
      OptionsHelper.messages.forEach((messageType) => {
        assertStyleMatch(
          {
            border: `1px solid ${baseTheme.colors[messageType]}`,
          },
          mount(<Message variant={messageType}>Message</Message>)
        );
      });
    });
  });

  describe("when closeIcon is not provided", () => {
    let wrapper, onDismissCallback;

    beforeEach(() => {
      onDismissCallback = jest.fn();
      wrapper = mount(
        <RenderWrapper
          roundedCorners={false}
          variant="info"
          onDismiss={onDismissCallback}
        >
          Message
        </RenderWrapper>
      );
    });

    describe("does not render", () => {
      it("when onDismiss prop is not provided", () => {
        wrapper.setProps({ onDismiss: null });
        expect(wrapper.find(IconButton).exists()).toBeFalsy();
      });

      it("when showCloseIcon is false", () => {
        wrapper.setProps({ showCloseIcon: false });
        expect(wrapper.find(IconButton).exists()).toBeFalsy();
      });
    });

    describe("does render", () => {
      it("when onDismiss and showCloseIcon props are provided", () => {
        expect(wrapper.find(IconButton).exists()).toBeTruthy();
        expect(onDismissCallback).toBeCalledTimes(0);
      });
    });
  });

  describe("when closeIcon is provided", () => {
    let wrapper, onDismissCallback;

    beforeEach(() => {
      onDismissCallback = jest.fn();
      wrapper = mount(
        <RenderWrapper
          roundedCorners={false}
          variant="info"
          onDismiss={onDismissCallback}
          showCloseIcon
        >
          Message
        </RenderWrapper>
      );
    });

    describe("does not render", () => {
      it("when onDismiss prop is not provided", () => {
        wrapper.setProps({ onDismiss: null });
        expect(wrapper.find(IconButton).exists()).toBeFalsy();
      });

      it("when showCloseIcon is false", () => {
        wrapper.setProps({ showCloseIcon: false });
        expect(wrapper.find(IconButton).exists()).toBeFalsy();
      });
    });

    describe("does render", () => {
      it("when onDismiss and showCloseIcon props are provided", () => {
        expect(wrapper.find(IconButton).exists()).toBeTruthy();
        expect(onDismissCallback).toBeCalledTimes(0);
      });
    });

    describe("closeIcon has proper aria label set", () => {
      it("should render with 'Close' label by default", () => {
        expect(getCloseButtonLabel(wrapper)).toEqual("Close");
      });
      it("should render with custom close button label if provided", () => {
        wrapper.setProps({ closeButtonAriaLabel: "test" });
        expect(getCloseButtonLabel(wrapper)).toEqual("test");
      });
    });
  });

  describe("i18n", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <RenderWrapper lng="fr" onDismiss={jest.fn()}>
          Message
        </RenderWrapper>
      );
    });

    it("has default translation", () => {
      expect(getCloseButtonLabel(wrapper)).toBe("Close");
    });

    describe("translation", () => {
      beforeAll(() => {
        i18n.addResourceBundle("fr", "carbon", {
          message: {
            "close-button-aria-label": "test",
          },
        });
      });

      it("can use i18n", () => {
        expect(getCloseButtonLabel(wrapper)).toBe("test");
      });
    });
  });
});
