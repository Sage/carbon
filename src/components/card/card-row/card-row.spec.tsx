import React from "react";
import { mount } from "enzyme";
import CardRow from "./card-row.component";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../../__spec_helper__/test-utils";
import { rootTagTest } from "../../../__internal__/utils/helpers/tags/tags-specs";
import StyledCardRow from "./card-row.style";
import CardContext, { CardContextProps } from "../__internal__/card-context";

describe("CardRow", () => {
  it("renders children correctly", () => {
    const content = (
      <div>
        <span>content</span>
      </div>
    );
    const wrapper = mount(<CardRow>{content}</CardRow>);

    expect(wrapper.find(CardRow).contains(content)).toBeTruthy();
  });

  describe("when styled system padding props are set", () => {
    testStyledSystemPadding(
      (props) => <CardRow {...props}>Test</CardRow>,
      {
        py: "var(--spacing300)",
      },
      undefined,
      { modifier: "&&" }
    );
  });

  it.each<[Exclude<CardContextProps["spacing"], undefined>, string]>([
    ["small", "var(--spacing200)"],
    ["medium", "var(--spacing300)"],
    ["large", "var(--spacing400)"],
  ])(
    "should receive spacing prop %s from parent via context setting top and bottom padding to %s",
    (spacing, expected) => {
      const wrapper = mount(
        <CardContext.Provider value={{ spacing }}>
          <CardRow>
            <div />
          </CardRow>
        </CardContext.Provider>
      );
      assertStyleMatch(
        {
          paddingTop: expected,
          paddingBottom: expected,
        },
        wrapper.find(CardRow)
      );
    }
  );

  it("should have expected data attributes", () => {
    rootTagTest(
      mount(
        <CardRow>
          <div />
        </CardRow>
      ).find(StyledCardRow),
      "card-row",
      "card-row"
    );

    rootTagTest(
      mount(
        <CardRow data-element="foo" data-role="bar">
          <div />
        </CardRow>
      ).find(StyledCardRow),
      "card-row",
      "foo",
      "bar"
    );
  });
});
