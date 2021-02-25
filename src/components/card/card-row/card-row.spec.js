import React from "react";
import { shallow } from "enzyme";
import TestRenderer from "react-test-renderer";
import CardRow from "./card-row.component";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../../__spec_helper__/test-utils";
import "jest-styled-components";

describe("CardRow", () => {
  describe("when the content is added as children", () => {
    it("then that content should be rendered inside the component", () => {
      const content = (
        <div>
          <span>content</span>
        </div>
      );
      const wrapper = renderCardRow({
        children: content,
      });

      expect(wrapper.containsMatchingElement(content)).toBe(true);
    });
  });

  describe.each([
    ["small", "16px"],
    ["medium", "24px"],
    ["large", "32px"],
  ])('when the "spacing" prop is set to %s', (size, expectedVal) => {
    const wrapper = renderCardRow({ spacing: size }, TestRenderer.create);

    it(`then the padding should be set to ${expectedVal}`, () => {
      assertStyleMatch(
        {
          paddingTop: expectedVal,
          paddingBottom: expectedVal,
        },
        wrapper.toJSON()
      );
    });
  });
});

describe("when the styled system padding is set", () => {
  testStyledSystemPadding((props) => <CardRow {...props}>Test</CardRow>);
});

function renderCardRow(props = {}, renderer = shallow) {
  const children = props.children || <div />;

  return renderer(<CardRow {...props}>{children}</CardRow>);
}
