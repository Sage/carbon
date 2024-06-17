import React from "react";
import { shallow, mount } from "enzyme";
import Fieldset, { FieldsetProps } from "./fieldset.component";
import Textbox from "../textbox";
import { StyledLegend } from "./fieldset.style";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/__internal__/test-utils";
import { noThemeSnapshot } from "../../__spec_helper__/__internal__/enzyme-snapshot-helper";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(props: FieldsetProps = {}, renderer: any = shallow) {
  return renderer(
    <Fieldset {...props}>
      <Textbox onChange={() => {}} />
    </Fieldset>
  );
}

const basicWrapper = render();

describe("Fieldset", () => {
  testStyledSystemMargin((props) => (
    <Fieldset {...props}>
      <Textbox onChange={() => {}} />
    </Fieldset>
  ));

  it("renders correctly", () => {
    expect(noThemeSnapshot(basicWrapper)).toMatchSnapshot();
  });

  // added as `testStyledSystemMargin` will not catch if there is a regression and refactoring that will affect all tests that use it
  it.each([
    [undefined, { margin: 0 }],
    [{ m: 8 }, { margin: "var(--spacing800)" }],
    [
      { mx: 8 },
      { marginLeft: "var(--spacing800)", marginRight: "var(--spacing800)" },
    ],
    [
      { my: 8 },
      { marginTop: "var(--spacing800)", marginBottom: "var(--spacing800)" },
    ],
    [
      { mt: 8, mr: 8, mb: 8, ml: 8 },
      {
        marginTop: "var(--spacing800)",
        marginBottom: "var(--spacing800)",
        marginLeft: "var(--spacing800)",
        marginRight: "var(--spacing800)",
      },
    ],
  ])(
    "has the expected margin when %s passed as margin props",
    (props, style) => {
      const wrapper = render({ legend: "Legend", ...props }, mount);
      expect(wrapper.getDOMNode()).toHaveStyle(style);
    }
  );

  describe("Fieldset Legend", () => {
    it("is rendered if supplied", () => {
      const wrapper = render({ legend: "Legend" });
      expect(wrapper.find(StyledLegend).exists()).toEqual(true);
    });

    it("is not rendered if omitted", () => {
      expect(basicWrapper.find(StyledLegend).exists()).toEqual(false);
    });
  });

  it("add an asterisk after the text when the field is mandatory", () => {
    assertStyleMatch(
      {
        content: '"*"',
        color: "var(--colorsSemanticNegative500)",
        fontWeight: "var(--fontWeights700)",
        marginLeft: "var(--spacing100)",
      },
      mount(<StyledLegend isRequired />),
      { modifier: "::after" }
    );
  });

  it("adds the required attribute to any child inputs when isRequired is true", () => {
    const wrapper = mount(
      <Fieldset required>
        <input />
        <input />
      </Fieldset>
    );

    expect(wrapper.find("input").first().getDOMNode()).toHaveAttribute(
      "required"
    );
    expect(wrapper.find("input").last().getDOMNode()).toHaveAttribute(
      "required"
    );
  });

  it("does not add the required attribute to any child inputs when isRequired is falsy", () => {
    const wrapper = mount(
      <Fieldset>
        <input />
        <input />
      </Fieldset>
    );

    expect(wrapper.find("input").first().getDOMNode()).not.toHaveAttribute(
      "required"
    );
    expect(wrapper.find("input").last().getDOMNode()).not.toHaveAttribute(
      "required"
    );
  });

  it("adds an (optional) after the text when the field is optional", () => {
    assertStyleMatch(
      {
        content: '"(optional)"',
      },
      mount(<StyledLegend isOptional />),
      { modifier: "::after" }
    );
  });
});
