import React from "react";
import { mount } from "enzyme";
import CardColumn, { CardColumnProps } from "./card-column.component";
import { assertStyleMatch } from "../../../__spec_helper__/__internal__/test-utils";
import StyledCardColumn from "./card-column.style";
import { rootTagTest } from "../../../__internal__/utils/helpers/tags/tags-specs";

describe("CardColumn", () => {
  it("renders children correctly", () => {
    const content = <div>content</div>;
    const wrapper = mount(<CardColumn>{content}</CardColumn>);
    expect(wrapper.find(CardColumn).contains(content)).toBe(true);
  });

  it.each<Exclude<CardColumnProps["align"], undefined>>([
    "center",
    "left",
    "right",
  ])("aligns text correctly when align prop is %s", (align) => {
    const wrapper = mount(
      <CardColumn align={align}>
        <div />
      </CardColumn>
    );

    assertStyleMatch({ textAlign: align }, wrapper.find(StyledCardColumn));
  });

  it("has the expected data attributes", () => {
    rootTagTest(
      mount(
        <CardColumn>
          <div />
        </CardColumn>
      ).find(StyledCardColumn),
      "card-column",
      "card-column"
    );

    rootTagTest(
      mount(
        <CardColumn data-element="foo" data-role="bar">
          <div />
        </CardColumn>
      ).find(StyledCardColumn),
      "card-column",
      "foo",
      "bar"
    );
  });
});
