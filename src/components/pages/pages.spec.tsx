import React, { useState } from "react";
import { shallow, mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import { CSSTransition } from "react-transition-group";

import Pages, { Page } from "./pages.component";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import sageTheme from "../../style/themes/sage";
import Button from "../button";
import Heading from "../heading";
import { StyledHeadingBackButton } from "../heading/heading.style";
import Logger from "../../__internal__/utils/logger";

// mock Logger.deprecate so that Typography (used for the alert dialog's heading) doesn't trigger a warning while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

interface MockComponentProps {
  index?: number;
  initialPageIndex?: number;
}

const MockComponentWithOneChild = ({
  initialPageIndex,
}: Pick<MockComponentProps, "initialPageIndex">) => {
  const [pageIndex, setPageIndex] = useState<number | undefined>(
    initialPageIndex
  );
  const moveToNextPageWithUndefinedValue = () => setPageIndex(undefined);
  const moveToNextPage = () => {
    if (pageIndex !== undefined) setPageIndex(pageIndex + 1);
  };
  const moveToPreviousPage = () => {
    if (pageIndex !== undefined) setPageIndex(pageIndex - 1);
  };

  return (
    <Pages pageIndex={pageIndex}>
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
    </Pages>
  );
};

const MockComponent = ({ index = 0, initialPageIndex }: MockComponentProps) => {
  const [pageIndex, setPageIndex] = useState(index);
  const moveToNextPage = () => setPageIndex(pageIndex + 1);
  const moveToPreviousPage = () => setPageIndex(pageIndex - 1);

  return (
    <Pages initialpageIndex={initialPageIndex} pageIndex={pageIndex}>
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
    </Pages>
  );
};

describe("Pages", () => {
  let wrapper: ReactWrapper | ShallowWrapper;

  beforeAll(() => {
    loggerSpy.mockImplementation(() => {});
  });

  afterAll(() => {
    loggerSpy.mockRestore();
  });

  it.each([
    ["fade", "carousel-transition-fade"],
    ["slide", "slide-next"],
  ])(
    "should render correct animation if %s provided",
    (transition, expected) => {
      wrapper = mount(
        <Pages transition={transition}>
          <Page title="foo">Page</Page>
        </Pages>
      );

      expect(wrapper.find(CSSTransition).props().classNames).toBe(expected);
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
        <Pages
          theme={sageTheme}
          data-element="bar"
          data-role="baz"
          initialpageIndex={0}
        >
          <Page title="Foo">Bar</Page>
        </Pages>
      );

      it("include correct component, element and role data tags", () => {
        rootTagTest(tag, "carousel", "bar", "baz");
      });
    });

    describe("on internal elements", () => {
      it("should has expected data elements", () => {
        wrapper = mount(
          <Pages theme={sageTheme} initialpageIndex={0}>
            <Page data-element="page" title="Foo">
              Bar
            </Page>
          </Pages>
        );

        wrapper.find('[data-element="page"]').exists();
        wrapper.find('[data-element="visible-page"]').exists();
      });
    });
  });
});
