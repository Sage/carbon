import React from "react";
import { shallow } from "enzyme";
import { StyledPage, StyledPageContent } from "./page.style";
import Page from "./page.component";
import FullScreenHeading from "../../../__internal__/full-screen-heading";
import { testStyledSystemPadding } from "../../../__spec_helper__/test-utils";

describe("Page", () => {
  testStyledSystemPadding(
    (props) => (
      <Page
        transitionName={() => "fade"}
        title="My Title"
        data-element="carbon-page-content"
        {...props}
      >
        My Content
      </Page>
    ),
    { p: "30px 40px" },
    (wrapper) => wrapper.find(StyledPageContent)
  );

  const wrapper = shallow(
    <Page
      transitionName={() => "fade"}
      title="My Title"
      data-element="carbon-page-content"
    >
      My Content
    </Page>
  );

  it("renders a page with a full screen heading", () => {
    const fullScreenHeading = wrapper.find(FullScreenHeading);
    expect(wrapper.find(StyledPage).props()["data-element"]).toEqual(
      "carbon-page-content"
    );
    expect(wrapper.find(StyledPage).props()["data-component"]).toEqual("page");
    expect(fullScreenHeading.props().children).toEqual("My Title");
    expect(
      wrapper.find(StyledPage).props().children[1].props.children.props.children
    ).toEqual("My Content");
  });
});
