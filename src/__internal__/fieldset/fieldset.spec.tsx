import React from "react";
import { mount, ReactWrapper } from "enzyme";
import Fieldset, { FieldsetProps } from "./fieldset.component";

import {
  StyledFieldset,
  StyledLegend,
  StyledLegendContent,
} from "./fieldset.style";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";

import ValidationIcon from "../validations/validation-icon.component";

const Component = () => <div />;
const RenderComponent = (props?: Partial<FieldsetProps>) => (
  <Fieldset {...props}>
    <Component />
  </Fieldset>
);

const render = (props?: Partial<FieldsetProps>) =>
  mount(<RenderComponent {...props} />);

const validationTypes = ["error", "warning", "info"] as const;

describe("Fieldset", () => {
  let wrapper: ReactWrapper;

  testStyledSystemMargin((props) => <RenderComponent {...props} />);

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
      wrapper = render({ legend: "Legend", ...props });
      expect(wrapper.getDOMNode()).toHaveStyle(style);
    }
  );

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
          marginBottom: "var(--spacing200)",
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
            paddingRight: "var(--spacing200)",
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
            paddingRight: "var(--spacing100)",
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
        color: "var(--colorsSemanticNegative500)",
        fontWeight: "700",
        marginLeft: "var(--spacing100)",
      },
      mount(<StyledLegendContent isRequired />),
      { modifier: "::after" }
    );
  });

  it("adds the required attribute to any child inputs when isRequired is true", () => {
    wrapper = mount(
      <Fieldset isRequired>
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
    wrapper = mount(
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
});
