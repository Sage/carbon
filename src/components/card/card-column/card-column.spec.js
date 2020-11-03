import React from "react";
import { shallow } from "enzyme";
import TestRenderer from "react-test-renderer";
import CardColumn from "./card-column.component";
import OptionsHelper from "../../../utils/helpers/options-helper/options-helper";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import "jest-styled-components";

describe("CardColumn", () => {
  describe("when the content is added as children", () => {
    it("then that content should be rendered inside the component", () => {
      const content = (
        <div>
          <span>content</span>
        </div>
      );
      const wrapper = renderCardColumn({
        children: content,
      });

      expect(wrapper.containsMatchingElement(content)).toBe(true);
    });
  });

  describe.each(OptionsHelper.alignFull)(
    'when the "align" prop is set to %s',
    (align) => {
      it(`then the text-align should be set to ${align}`, () => {
        const wrapper = renderCardColumn({ align }, TestRenderer.create);

        assertStyleMatch(
          {
            textAlign: align,
          },
          wrapper.toJSON()
        );
      });
    }
  );
});

function renderCardColumn(props = {}, renderer = shallow) {
  const children = props.children || <div />;

  return renderer(<CardColumn {...props}>{children}</CardColumn>);
}
