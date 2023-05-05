import React from "react";

import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import MessageStyle from "./message.style";
import Message from "./message.component";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import I18nProvider from "../i18n-provider";
import IconButton from "../icon-button";

const wrappingComponent = (props: { children: React.ReactNode }) => (
  <I18nProvider
    {...props}
    locale={{
      locale: () => "fr",
      message: {
        closeButtonAriaLabel: () => "test",
      },
    }}
  />
);

const messageVariants = {
  error: "var(--colorsSemanticNegative500)",
  info: "var(--colorsSemanticNeutral500)",
  success: "var(--colorsSemanticPositive500)",
  warning: "var(--colorsSemanticCaution500)",
} as const;

function getCloseButtonLabel(wrapper: ShallowWrapper | ReactWrapper) {
  return wrapper.find(IconButton).prop("aria-label");
}

describe("Message", () => {
  it(`should have the expected style`, () => {
    assertStyleMatch(
      {
        position: "relative",
        display: "flex",
        justifyContent: "flex-start",
        alignContent: "center",
        borderRadius: "var(--borderRadius100)",
      },
      mount(<Message>Message</Message>)
    );
  });

  it("does not render the close icon when onDismiss prop is not provided", () => {
    const wrapper = shallow(<Message>Message</Message>);

    const closeIcon = wrapper.find(IconButton);
    expect(closeIcon.exists()).toEqual(false);
  });

  it("renders the close icon when onDismiss function is provided", () => {
    const onDismiss = jest.fn();
    const wrapper = mount(<Message onDismiss={onDismiss}>Message</Message>);
    const closeIcon = wrapper.find(IconButton).first();
    expect(closeIcon.exists()).toEqual(true);
  });

  it("renders null when component is not open", () => {
    const wrapper = shallow(<Message open={false}>Message</Message>);
    expect(wrapper.isEmptyRender()).toEqual(true);
  });

  it("passes the id prop to the root component", () => {
    const wrapper = shallow(<Message>Message</Message>);

    wrapper.setProps({ id: "message-id" });
    expect(wrapper.find(MessageStyle).props().id).toEqual("message-id");
  });

  describe("when transparent prop is set to true", () => {
    it("should render the message without the border", () => {
      const wrapper = mount(<Message transparent variant="info" />);

      assertStyleMatch(
        {
          border: "none",
        },
        wrapper.find(MessageStyle)
      );
    });
  });

  describe("when transparent prop is not passed", () => {
    it("should render the message with border in a proper color and a white background", () => {
      (["info", "error", "success", "warning"] as const).forEach(
        (messageType) => {
          assertStyleMatch(
            {
              border: `1px solid ${messageVariants[messageType]}`,
            },
            mount(<Message variant={messageType}>Message</Message>)
          );
        }
      );
    });
  });

  describe("when closeIcon is not provided", () => {
    let wrapper: ShallowWrapper;
    let onDismissCallback: jest.Mock;

    beforeEach(() => {
      onDismissCallback = jest.fn();
      wrapper = shallow(
        <Message variant="info" onDismiss={onDismissCallback}>
          Message
        </Message>
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
    let wrapper: ShallowWrapper;
    let onDismissCallback: jest.Mock;

    beforeEach(() => {
      onDismissCallback = jest.fn();
      wrapper = shallow(
        <Message variant="info" onDismiss={onDismissCallback} showCloseIcon>
          Message
        </Message>
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
    it("has default translation", () => {
      const wrapper = shallow(<Message onDismiss={jest.fn()}>Message</Message>);

      expect(getCloseButtonLabel(wrapper)).toBe("Close");
    });

    describe("translation", () => {
      it("can use i18n", () => {
        const wrapper = mount(
          <Message onDismiss={jest.fn()}>Message</Message>,
          {
            wrappingComponent,
          }
        );

        expect(getCloseButtonLabel(wrapper)).toBe("test");
      });
    });
  });

  describe("styled-system", () => {
    testStyledSystemMargin((props) => <Message {...props} />);
  });
});
