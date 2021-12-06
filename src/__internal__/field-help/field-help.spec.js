import React from "react";
import { mount } from "enzyme";
import FieldHelp from "./field-help.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";

function render(props) {
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

  describe("when initiated with labelInline prop set to true and inputWidth prop with a custom value", () => {
    it('has "margin-left" style set to width and both sides of margin', () => {
      const wrapper = render({
        labelInline: true,
        inputWidth: 50,
        theme: {
          input: {
            fieldHelp: {
              marginSide: "5px",
            },
          },
        },
      });

      assertStyleMatch(
        {
          marginLeft: "30%",
          paddingLeft: "0",
        },
        wrapper
      );
    });
  });
});
