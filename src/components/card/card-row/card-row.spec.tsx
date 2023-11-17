import React from "react";
import { mount } from "enzyme";
import CardRow, { CardRowProps } from "./card-row.component";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../../__spec_helper__/test-utils";
import { rootTagTest } from "../../../__internal__/utils/helpers/tags/tags-specs";
import StyledCardRow from "./card-row.style";

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
    testStyledSystemPadding((props) => <CardRow {...props}>Test</CardRow>, {
      py: "var(--spacing300)",
    });
  });

  it.each<[Exclude<CardRowProps["spacing"], undefined>, string]>([
    ["small", "var(--spacing200)"],
    ["medium", "var(--spacing300)"],
    ["large", "var(--spacing400)"],
  ])(
    "when spacing prop is %s, top and bottom padding is set to %s",
    (spacing, expected) => {
      const wrapper = mount(
        <CardRow spacing={spacing}>
          <div />
        </CardRow>
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
