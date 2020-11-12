import React from "react";
import { mount } from "enzyme";
import Fieldset from "./fieldset.component";

import {
  StyledFieldset,
  StyledLegendContainer,
  StyledFieldsetContent,
} from "./fieldset.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";

import ValidationIcon from "../../components/validations/validation-icon.component";

const Component = () => <div />;

const render = (props) =>
  mount(
    <Fieldset {...props}>
      <Component />
    </Fieldset>
  );

const validationTypes = ["error", "warning", "info"];

describe("Fieldset", () => {
  let wrapper;

  it("renders passed on children", () => {
    wrapper = render();
    expect(wrapper.find(Component).exists()).toBe(true);
  });

  it("applies the correct inline styles", () => {
    wrapper = render({ inline: true });
    assertStyleMatch(
      {
        display: "flex",
      },
      wrapper.find(StyledFieldsetContent)
    );
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
      expect(wrapper.find(StyledLegendContainer).exists()).toEqual(true);
    });

    it("is not rendered if omited", () => {
      wrapper = render();
      expect(wrapper.find(StyledLegendContainer).exists()).toEqual(false);
    });

    describe("when inline", () => {
      it("applies the correct default styles", () => {
        wrapper = render({ inline: true, legend: "Legend" });
        assertStyleMatch(
          {
            boxSizing: "border-box",
            margin: "0",
            height: "34px",
            justifyContent: "flex-end",
            paddingRight: "16px",
          },
          wrapper.find(StyledLegendContainer)
        );
      });

      it("applies the correct width when legendWidth prop set", () => {
        wrapper = render({ inline: true, legend: "Legend", legendWidth: 10 });
        assertStyleMatch(
          {
            width: "10%",
          },
          wrapper.find(StyledLegendContainer)
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
          wrapper.find(StyledLegendContainer)
        );
      });

      it("applies the correct right padding when legendSpacing prop set", () => {
        wrapper = render({ inline: true, legend: "Legend", legendSpacing: 1 });
        assertStyleMatch(
          {
            paddingRight: "8px",
          },
          wrapper.find(StyledLegendContainer)
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
            wrapper.find(StyledLegendContainer)
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
      mount(<StyledLegendContainer isRequired />),
      { modifier: "::after" }
    );
  });
});
