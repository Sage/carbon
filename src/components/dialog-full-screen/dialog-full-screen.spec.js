import React from "react";
import { mount } from "enzyme";
import DialogFullScreen from "./dialog-full-screen.component";
import FullScreenHeading from "../../__internal__/full-screen-heading";
import StyledDialogFullScreen from "./dialog-full-screen.style";
import StyledContent from "./content.style";
import Button from "../button";
import guid from "../../utils/helpers/guid";
import Heading from "../heading";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import IconButton from "../icon-button";
import StyledIconButton from "../icon-button/icon-button.style";
import StyledFullScreenHeading from "../../__internal__/full-screen-heading/full-screen-heading.style";

jest.mock("../../utils/helpers/guid");

describe("DialogFullScreen", () => {
  guid.mockImplementation(() => "guid-12345");

  let instance, wrapper, onCancel;

  beforeEach(() => {
    onCancel = jasmine.createSpy("cancel");
    wrapper = mount(
      <DialogFullScreen
        onCancel={onCancel}
        className="foo"
        open
        title="my title"
        subtitle="my subtitle"
      >
        <Button>Button</Button>
        <Button>Button</Button>
      </DialogFullScreen>
    );
    instance = wrapper.instance();
  });

  describe("default props", () => {
    it("sets enableBackgroundUI to true", () => {
      expect(instance.props.enableBackgroundUI).toBeTruthy();
    });
  });

  describe("disableContentPadding", () => {
    wrapper = mount(
      <DialogFullScreen
        open
        className="foo"
        title="my title"
        onCancel={onCancel}
        disableContentPadding
      >
        <div>test content</div>
      </DialogFullScreen>
    );

    assertStyleMatch(
      {
        padding: "0",
      },
      wrapper.find(StyledContent)
    );
  });

  describe("modalHTML", () => {
    beforeEach(() => {
      wrapper = mount(
        <DialogFullScreen
          open
          className="foo"
          title="my title"
          onCancel={onCancel}
        >
          <Button>Button</Button>
          <Button>Button</Button>
        </DialogFullScreen>
      );
      instance = wrapper.instance();
    });

    it("renders the dialog", () => {
      expect(instance._dialog).toBeTruthy();
    });

    it("renders the children passed to it", () => {
      expect(wrapper.find(Button).length).toEqual(2);
    });
  });

  describe("onOpening", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      wrapper = mount(<DialogFullScreen open={false} />);
      wrapper.setProps({ open: true });
      jest.runAllTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("sets overflow hidden to the body", () => {
      const html = wrapper.instance().document.documentElement;
      expect(html.style.overflow).toMatch("hidden");
    });
  });

  describe("onClosing", () => {
    beforeEach(() => {
      wrapper = mount(
        <DialogFullScreen style={{ overflow: "auto" }} open={false} />
      );
    });

    it("recovers an original overflow", () => {
      window.document.documentElement.style.overflow = "auto";
      expect(window.document.documentElement.style.overflow).toBe("auto");
      wrapper.setProps({ open: true });
      expect(window.document.documentElement.style.overflow).toBe("hidden");
      wrapper.setProps({ open: false });
      expect(window.document.documentElement.style.overflow).toBe("auto");
    });
  });

  describe("dialogTitle", () => {
    describe("is a string", () => {
      it("renders the title within a heading", () => {
        const heading = wrapper.find(Heading);
        expect(heading.props().title).toEqual("my title");
        expect(heading.props().subheader).toEqual("my subtitle");
        expect(heading.props().titleId).toEqual("carbon-dialog-title");
        expect(heading.props().subtitleId).toEqual("carbon-dialog-subtitle");
      });
    });

    describe("is an object", () => {
      beforeEach(() => {
        const titleHeading = <Heading title="my custom heading" />;
        wrapper = mount(
          <DialogFullScreen
            onCancel={onCancel}
            className="foo"
            open
            title={titleHeading}
          >
            <Button>Button</Button>
            <Button>Button</Button>
          </DialogFullScreen>
        );
      });

      it("renders the component in a full screen heading", () => {
        const fullScreenHeading = wrapper.find(FullScreenHeading),
          heading = fullScreenHeading.find(Heading);

        expect(heading.props().title).toEqual("my custom heading");
      });
    });

    describe("has a Ref to the scrollable content", () => {
      beforeEach(() => {
        const titleHeading = <Heading title="my custom heading" />;
        wrapper = mount(
          <DialogFullScreen
            onCancel={onCancel}
            className="foo"
            open
            title={titleHeading}
          >
            <Button>Button</Button>
            <Button>Button</Button>
          </DialogFullScreen>
        );
      });

      it("and the ref to content exists and contains html", () => {
        expect(wrapper.instance().contentRef.current).toMatchSnapshot();
      });

      it("and the ref to heading exists", () => {
        expect(wrapper.instance().headingRef.current).toMatchSnapshot();
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      it("include correct component, elements and role data tags", () => {
        wrapper = mount(
          <DialogFullScreen
            open
            onCancel={() => {}}
            onConfirm={() => {}}
            title="Test"
            data-role="baz"
            data-element="bar"
          />
        );
        expect(wrapper.instance().props["data-element"]).toEqual("bar");
        expect(wrapper.instance().props["data-role"]).toEqual("baz");
      });
    });
  });

  describe("when showCloseIcon is false", () => {
    it("does not render close icon", () => {
      wrapper = mount(
        <DialogFullScreen
          open
          onCancel={() => {}}
          onConfirm={() => {}}
          title="Test"
          data-role="baz"
          data-element="bar"
          showCloseIcon={false}
        />
      );
      expect(wrapper.find(IconButton).first().length).toEqual(0);
    });
  });

  describe("when onCancel is not provided", () => {
    it("does not render close icon", () => {
      wrapper = mount(
        <DialogFullScreen
          open
          onConfirm={() => {}}
          title="Test"
          data-role="baz"
          data-element="bar"
        />
      );
      expect(wrapper.find(IconButton).first().length).toEqual(0);
    });
  });

  describe("when onCancel and showCloseIcon are provided", () => {
    it("renders close icon", () => {
      wrapper = mount(
        <DialogFullScreen
          open
          onCancel={() => {}}
          onConfirm={() => {}}
          title="Test"
          data-role="baz"
          data-element="bar"
        />
      );
      expect(wrapper.find(IconButton).first().length).toEqual(1);
    });
  });

  describe("when headerChildren prop set", () => {
    const HeaderChildren = <div id="header-children">Some content</div>;

    it("renders the content inside of the header", () => {
      wrapper = mount(
        <DialogFullScreen
          open
          onCancel={() => {}}
          onConfirm={() => {}}
          title="Test"
          data-role="baz"
          data-element="bar"
          headerChildren={HeaderChildren}
        />
      );
      expect(
        wrapper.find(FullScreenHeading).find("#header-children").length
      ).toEqual(1);
    });
  });

  /** Remove this when after Pages is re-written */
  describe("when pagesStyling prop set", () => {
    it("applies the Pages specific styling", () => {
      wrapper = mount(
        <DialogFullScreen
          open
          onCancel={() => {}}
          onConfirm={() => {}}
          data-role="baz"
          data-element="bar"
          pagesStyling
        />
      ).find(StyledDialogFullScreen);

      assertStyleMatch(
        {
          padding: "0",
        },
        wrapper,
        { modifier: `${StyledContent}` }
      );

      assertStyleMatch(
        {
          position: "absolute",
          right: "33px",
          top: "32px",
          zIndex: "1",
        },
        wrapper,
        { modifier: `${StyledIconButton}` }
      );

      assertStyleMatch(
        {
          padding: "32px 32px 0",
        },
        wrapper,
        { modifier: `${StyledFullScreenHeading}` }
      );

      assertStyleMatch(
        {
          width: "auto",
          paddingTop: "4px",
          marginBottom: "34px",
        },
        wrapper,
        { modifier: ".carbon-heading" }
      );

      assertStyleMatch(
        {
          width: "100%",
          boxSizing: "content-box",
          margin: "0 0 0 8px",
        },
        wrapper,
        { modifier: ".carbon-heading .carbon-heading__header" }
      );
    });
  });
});

describe("closeIcon", () => {
  let wrapper;
  let onCancel;

  beforeEach(() => {
    jest.restoreAllMocks();
    onCancel = jest.fn();

    wrapper = mount(
      <DialogFullScreen
        open
        onCancel={onCancel}
        onConfirm={() => {}}
        title="Test"
        data-role="baz"
        data-element="bar"
      />
    );
  });

  it("closes when the exit icon is click", () => {
    wrapper.find(IconButton).first().simulate("click");
    expect(onCancel).toHaveBeenCalled();
  });

  it("closes when exit icon is focused and Enter key is pressed", () => {
    const icon = wrapper.find(IconButton).first();
    icon.simulate("keyDown", { which: 13, key: "Enter" });
    expect(onCancel).toHaveBeenCalled();
  });

  it("does not close when exit icon is focused any other key is pressed", () => {
    const icon = wrapper.find(IconButton).first();
    icon.simulate("keyDown", { which: 65, key: "a" });
    expect(onCancel).not.toHaveBeenCalled();
  });
});
