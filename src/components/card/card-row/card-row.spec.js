import React from "react";
import { shallow } from "enzyme";
import TestRenderer from "react-test-renderer";
import CardRow from "./card-row.component";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
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
    ["small", "16px 0"],
    ["medium", "24px 0"],
    ["large", "32px 0"],
  ])('when the "spacing" prop is set to %s', (size, expectedVal) => {
    const wrapper = renderCardRow({ spacing: size }, TestRenderer.create);

    it(`then the margin should be set to ${expectedVal}`, () => {
      assertStyleMatch(
        {
          margin: expectedVal,
        },
        wrapper.toJSON()
      );
    });
  });
});

function renderCardRow(props = {}, renderer = shallow) {
  const children = props.children || <div />;

  return renderer(<CardRow {...props}>{children}</CardRow>);
}
