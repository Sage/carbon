import React from "react";
import { shallow, mount } from "enzyme";
import Fieldset, { FieldsetProps } from "./fieldset.component";
import Textbox from "../textbox";
import { LegendContainerStyle, FieldsetContentStyle } from "./fieldset.style";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import { noThemeSnapshot } from "../../__spec_helper__/enzyme-snapshot-helper";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(props: FieldsetProps = {}, renderer: any = shallow) {
  return renderer(
    <Fieldset {...props}>
      <Textbox />
    </Fieldset>
  );
}

const basicWrapper = render();

describe("Fieldset", () => {
  testStyledSystemMargin((props) => (
    <Fieldset {...props}>
      <Textbox />
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
      expect(wrapper.find(LegendContainerStyle).exists()).toEqual(true);
    });

    it("is not rendered if omitted", () => {
      expect(basicWrapper.find(LegendContainerStyle).exists()).toEqual(false);
    });

    it("applies the correct inline styles", () => {
      assertStyleMatch(
        {
          marginRight: "32px",
          height: "34px !important",
        },
        mount(<LegendContainerStyle inline />)
      );
    });
  });

  describe("Fieldset FieldsetContentStyle", () => {
    it("is rendered if supplied", () => {
      const wrapper = render({ inline: true });
      expect(wrapper.find(FieldsetContentStyle).get(0).props.inline).toEqual(
        true
      );
    });

    it("is not rendered if omitted", () => {
      expect(
        basicWrapper.find(FieldsetContentStyle).get(0).props.inline
      ).toEqual(false);
    });

    it("applies the correct inline styles", () => {
      assertStyleMatch(
        {
          display: "flex",
        },
        mount(<FieldsetContentStyle inline />)
      );
    });
  });
});
