import React from "react";
import { mount } from "enzyme";
import FieldHelp, { FieldHelpProps } from "./field-help.component";
import { assertStyleMatch } from "../../__spec_helper__/__internal__/test-utils";

function render(props?: FieldHelpProps) {
  return mount(<FieldHelp {...props}>help text</FieldHelp>);
}

describe("FieldHelp", () => {
  it("renders the correctv styles by default", () => {
    const wrapper = render();

    assertStyleMatch(
      {
        display: "block",
        flex: "1",
        marginTop: "8px",
        whiteSpace: "pre-wrap",
      },
      wrapper
    );
  });

  describe("when initiated with labelInline prop set to true", () => {
    it('has "margin-left" style set to default width', () => {
      const wrapper = render({
        labelInline: true,
      });

      assertStyleMatch(
        {
          marginLeft: "30%",
          paddingLeft: "0",
        },
        wrapper
      );
    });

    it('has "margin-left" style set to labelWidth value', () => {
      const wrapper = render({
        labelInline: true,
        labelWidth: 50,
      });

      assertStyleMatch(
        {
          marginLeft: "50%",
          paddingLeft: "0",
        },
        wrapper
      );
    });
  });
});
