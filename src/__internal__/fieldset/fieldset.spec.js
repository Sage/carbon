import React from "react";
import { mount } from "enzyme";
import Fieldset from "./fieldset.component";

import {
  StyledFieldset,
  StyledLegend,
  StyledLegendContent,
} from "./fieldset.style";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";

import ValidationIcon from "../../components/validations/validation-icon.component";

const Component = () => <div />;
const RenderComponent = (props) => (
  <Fieldset {...props}>
    <Component />
  </Fieldset>
);

const render = (props) => mount(<RenderComponent {...props} />);

const validationTypes = ["error", "warning", "info"];

describe("Fieldset", () => {
  let wrapper;

  testStyledSystemMargin((props) => <RenderComponent {...props} />);

  it("renders passed on children", () => {
    wrapper = render();
    expect(wrapper.find(Component).exists()).toBe(true);
  });

  describe("when ml prop set", () => {
    it("should apply the correct left margin", () => {
      wrapper = render({ ml: "10%" });
      assertStyleMatch(
        {
          marginLeft: "10%",
        },
        wrapper.find(StyledFieldset)
      );
    });
  });

  describe("when mb prop set", () => {
    it("should apply the correct bottom margin", () => {
      wrapper = render({ mb: 2 });
      assertStyleMatch(
        {
          marginBottom: "16px",
        },
        wrapper.find(StyledFieldset)
      );
    });
  });

  describe("Fieldset Legend", () => {
    it("is rendered if supplied", () => {
      wrapper = render({ legend: "Legend" });
      expect(wrapper.find(StyledLegend).exists()).toEqual(true);
    });

    it("is not rendered if omitted", () => {
      wrapper = render();
      expect(wrapper.find(StyledLegend).exists()).toEqual(false);
    });

    describe("when inline", () => {
      it("applies the correct default styles", () => {
        wrapper = render({ inline: true, legend: "Legend" });
        assertStyleMatch(
          {
            boxSizing: "border-box",
            margin: "0",
            justifyContent: "flex-end",
            paddingRight: "16px",
          },
          wrapper.find(StyledLegend)
        );
      });

      it("applies the correct width when legendWidth prop set", () => {
        wrapper = render({ inline: true, legend: "Legend", legendWidth: 10 });
        assertStyleMatch(
          {
            width: "10%",
          },
          wrapper.find(StyledLegend)
        );
      });

      it("aligns the content right when legendAlign prop set", () => {
        wrapper = render({
          inline: true,
          legend: "Legend",
          legendAlign: "right",
        });
        assertStyleMatch(
          {
            justifyContent: "flex-end",
          },
          wrapper.find(StyledLegend)
        );
      });

      it("applies the correct right padding when legendSpacing prop set", () => {
        wrapper = render({ inline: true, legend: "Legend", legendSpacing: 1 });
        assertStyleMatch(
          {
            paddingRight: "8px",
          },
          wrapper.find(StyledLegend)
        );
      });

      describe('when legendAlign set to "left"', () => {
        it("should apply the correct justifyContent style", () => {
          wrapper = render({
            inline: true,
            legend: "Legend",
            legendAlign: "left",
          });
          assertStyleMatch(
            {
              justifyContent: "flex-start",
            },
            wrapper.find(StyledLegend)
          );
        });
      });
    });
  });

  describe.each(validationTypes)(
    "when prop %s === string",
    (validationType) => {
      it("shows validation icon with proper type", () => {
        wrapper = render({ legend: "Legend", [validationType]: "Message" });
        const icon = wrapper.find(ValidationIcon);

        expect(icon.props()[validationType]).toEqual("Message");
      });
    }
  );
  it("add an asterisk after the text when the field is mandatory", () => {
    assertStyleMatch(
      {
        content: '"*"',
        color: "#C7384F",
        fontWeight: "700",
        marginLeft: "8px",
      },
      mount(<StyledLegendContent isRequired />),
      { modifier: "::after" }
    );
  });
});
