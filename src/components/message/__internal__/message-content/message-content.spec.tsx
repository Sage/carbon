import React from "react";
import { shallow, mount } from "enzyme";
import MessageContent from "./message-content.component";
import MessageContentStyle from "./message-content.style";
import { assertStyleMatch } from "../../../../__spec_helper__/__internal__/test-utils";

describe("MessageContent", () => {
  describe("when rendered", () => {
    it("should render correctly", () => {
      expect(
        shallow(<MessageContent>children</MessageContent>)
      ).toMatchSnapshot();
    });
  });
  describe("showCloseIcon prop checks", () => {
    it.each([
      [true, 50],
      [false, 20],
    ])(
      "padding changes should be correct when showCloseIcon is %s",
      (boolVal, paddingVal) => {
        const wrapper = mount(
          <MessageContent showCloseIcon={boolVal}>children</MessageContent>
        );

        assertStyleMatch(
          {
            padding: `15px ${paddingVal}px 15px 20px`,
            whiteSpace: "pre-wrap",
            flex: "1",
          },
          wrapper.find(MessageContentStyle)
        );
      }
    );
  });
});
