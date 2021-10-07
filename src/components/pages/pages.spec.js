/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";
import BasePages, { Page } from "./pages.component";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import mintTheme from "../../style/themes/mint";
import Button from "../button";
import Heading from "../heading";
import { StyledHeadingBackButton } from "../heading/heading.style";

describe("BasePages", () => {
  let wrapper;

  it.each([
    ["fade", "carousel-transition-fade"],
    ["slide", "slide-next"],
  ])(
    "should rednder correct animation if %s provided",
    (transition, expected) => {
      wrapper = mount(
        <BasePages transition={transition}>
          <Page>Page</Page>
        </BasePages>
      );

      expect(wrapper.find(Page).props().transitionName()).toBe(expected);
    }
  );

  it("should not move page if pageIndex is 0", () => {
    wrapper = mount(<MockComponentWithOneChild initialPageIndex={0} />);

    act(() => {
      wrapper.find(Button).first().props().onClick();
    });

    wrapper.update();

    expect(wrapper.find('[data-element="firstHeader"]').exists()).toBe(true);
  });

  it("should not move page if pageIndex is undefined", () => {
    wrapper = mount(<MockComponentWithOneChild initialPageIndex={0} />);

    act(() => {
      wrapper.find(Button).at(1).props().onClick();
    });

    wrapper.update();

    expect(wrapper.find('[data-element="firstHeader"]').exists()).toBe(true);
  });

  it("should move us to next page", () => {
    wrapper = mount(<MockComponent index={0} />);

    act(() => {
      wrapper.find(Button).first().props().onClick();
    });
    wrapper.update();

    expect(wrapper.find('[data-element="secondHeader"]').exists()).toBe(true);
  });

  it("should move us to previous page if backlink clicked", () => {
    wrapper = mount(<MockComponent index={1} />);

    act(() => {
      wrapper
        .find('[data-element="secondHeader"]')
        .find(StyledHeadingBackButton)
        .props()
        .onClick();
    });
    wrapper.update();

    expect(wrapper.find('[data-element="firstHeader"]').exists()).toBe(true);
  });

  it("should move us to last page if we click backlink while being on first page", () => {
    wrapper = mount(<MockComponent index={0} />);

    act(() => {
      wrapper
        .find('[data-element="firstHeader"]')
        .find(StyledHeadingBackButton)
        .props()
        .onClick();
    });
    wrapper.update();

    expect(wrapper.find('[data-element="thirdHeader"]').exists()).toBe(true);
  });

  it("should move us to first page if we click button to next page while being on last page", () => {
    wrapper = mount(<MockComponent index={2} />);

    act(() => {
      wrapper.find(Button).first().props().onClick();
    });
    wrapper.update();

    expect(wrapper.find('[data-element="firstHeader"]').exists()).toBe(true);
  });

  describe("tags", () => {
    describe("on component", () => {
      const tag = shallow(
        <BasePages
          theme={mintTheme}
          data-element="bar"
          data-role="baz"
          initialPageIndex={0}
        >
          <Page />
        </BasePages>
      );

      it("include correct component, element and role data tags", () => {
        rootTagTest(tag, "carousel", "bar", "baz");
      });
    });

    describe("on internal elements", () => {
      wrapper = mount(
        <BasePages theme={mintTheme} initialPageIndex={0}>
          <Page data-element="page" />
        </BasePages>
      );

      it("should has expected data elements", () => {
        wrapper.find('[data-element="page"]').exists();
        wrapper.find('[data-element="visible-page"]').exists();
      });
    });
  });
});

function MockComponentWithOneChild({ initialPageIndex }) {
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const moveToNextPageWithUndefinedValue = () => setPageIndex(undefined);
  const moveToNextPage = () => setPageIndex(pageIndex + 1);
  const moveToPreviousPage = () => setPageIndex(pageIndex - 1);

  return (
    <BasePages pageIndex={pageIndex}>
      <Page
        title={
          <Heading
            data-element="firstHeader"
            title="My First Page"
            backLink={moveToPreviousPage}
          />
        }
      >
        <Button onClick={moveToNextPage}>Go to second page</Button>
        <Button onClick={moveToNextPageWithUndefinedValue}>
          Go to second page
        </Button>
      </Page>
    </BasePages>
  );
}

function MockComponent({ index, initialPageIndex }) {
  const [pageIndex, setPageIndex] = useState(index);
  const moveToNextPage = () => setPageIndex(pageIndex + 1);
  const moveToPreviousPage = () => setPageIndex(pageIndex - 1);

  return (
    <BasePages initialPageIndex={initialPageIndex} pageIndex={pageIndex}>
      <Page
        title={
          <Heading
            data-element="firstHeader"
            title="My First Page"
            backLink={moveToPreviousPage}
          />
        }
      >
        <Button onClick={moveToNextPage}>Go to second page</Button>
      </Page>
      <Page
        title={
          <Heading
            data-element="secondHeader"
            title="My Second Page"
            backLink={moveToPreviousPage}
          />
        }
      >
        Second page
      </Page>
      <Page
        title={
          <Heading
            data-element="thirdHeader"
            title="My Third Page"
            backLink={moveToPreviousPage}
          />
        }
      >
        Third page
        <Button onClick={moveToNextPage}>Go to next page</Button>
      </Page>
    </BasePages>
  );
}
