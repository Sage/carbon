import React from "react";
import TestRenderer from "react-test-renderer";
import { shallow } from "enzyme";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import Loader, { LoaderProps } from ".";
import StyledLoader from "./loader.style";
import StyledLoaderSquare from "./loader-square.style";

function renderLoader(props: LoaderProps = {}) {
  return shallow(<Loader {...props} />);
}

function renderStyles(props = {}) {
  return TestRenderer.create(<StyledLoader {...props} />);
}

describe("Loader", () => {
  testStyledSystemMargin((props) => <Loader {...props} />);

  it("renders as expected", () => {
    assertStyleMatch(
      {
        textAlign: "center",
      },
      renderStyles().toJSON()
    );
  });

  it("renders three squares", () => {
    expect(renderLoader().find(StyledLoaderSquare).exists()).toBe(true);
    expect(renderLoader().find(StyledLoaderSquare)).toHaveLength(3);
  });
});
