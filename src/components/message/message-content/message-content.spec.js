import React from "react";
import { shallow } from "enzyme";
import MessageContent from "./message-content.component";

describe("MessageContent", () => {
  describe("when rendered", () => {
    it("should render correctly", () => {
      expect(
        shallow(<MessageContent>children</MessageContent>)
      ).toMatchSnapshot();
    });
  });
});
