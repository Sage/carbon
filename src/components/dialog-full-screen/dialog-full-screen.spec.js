import React, { useRef } from "react";
import { mount } from "enzyme";
import Modal from "../modal";
import FullScreenHeading from "../../__internal__/full-screen-heading";
import StyledFullScreenHeading from "../../__internal__/full-screen-heading/full-screen-heading.style";
import StyledDialogFullScreen from "./dialog-full-screen.style";
import DialogFullScreen from "./dialog-full-screen.component";
import StyledContent from "./content.style";
import Button from "../button";
import guid from "../../__internal__/utils/helpers/guid";
import Heading from "../heading";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import IconButton from "../icon-button";
import StyledIconButton from "../icon-button/icon-button.style";
import { StyledHeader, StyledHeading } from "../heading/heading.style";
import Help from "../help";

jest.mock("../../__internal__/utils/helpers/guid");

describe("DialogFullScreen", () => {
  guid.mockImplementation(() => "guid-12345");

  let wrapper;
  let onCancel;

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
  });

  describe("contentRef", () => {
    it("the content ref should be forwarded", () => {
      let mockRef;

      const WrapperComponent = () => {
        mockRef = useRef();

        return (
          <DialogFullScreen
            onCancel={onCancel}
            className="foo"
            open
            title="my title"
            subtitle="my subtitle"
            contentRef={mockRef}
          >
            <Button>Button</Button>
            <Button>Button</Button>
          </DialogFullScreen>
        );
      };

      wrapper = mount(<WrapperComponent />);

      expect(mockRef.current).toBe(wrapper.find(StyledContent).getDOMNode());
    });
  });

  describe("autoFocus", () => {
    jest.useFakeTimers();
    it("should focus the first element by default", () => {
      mount(
        <DialogFullScreen open>
          <input type="text" />
        </DialogFullScreen>
      );

      jest.runAllTimers();

      const firstFocusableElement = document.querySelector("input");
      expect(document.activeElement).toBe(firstFocusableElement);
    });

    it("should not focus the first element when disableAutoFocus is passed", () => {
      mount(
        <DialogFullScreen open disableAutoFocus>
          <input type="text" />
        </DialogFullScreen>
      );

      jest.runAllTimers();

      const firstFocusableElement = document.querySelector("input");
      expect(document.activeElement).not.toBe(firstFocusableElement);
    });
  });

  describe("focusFirstElement", () => {
    it("should focus on the element passes as focusFirstElement prop", () => {
      jest.useFakeTimers();
      const Component = () => {
        const secondInputRef = useRef(null);
        return (
          <DialogFullScreen focusFirstElement={secondInputRef} open>
            <input type="text" />
            <input type="text" ref={secondInputRef} />
          </DialogFullScreen>
        );
      };
      mount(<Component />);

      jest.runAllTimers();

      const secondFocusableElement = document.querySelectorAll("input")[1];
      expect(document.activeElement).toEqual(secondFocusableElement);
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

  describe("children", () => {
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

    it("renders the children passed to it", () => {
      expect(wrapper.find(Modal).find(Button).length).toEqual(2);
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
      expect(window.document.documentElement.style.overflow).toBe("hidden");
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

  describe("on unmount", () => {
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
      wrapper.unmount();
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
        const fullScreenHeading = wrapper.find(FullScreenHeading);
        const heading = fullScreenHeading.find(Heading);

        expect(heading.props().title).toEqual("my custom heading");
      });
    });

    describe("when prop help is passed", () => {
      it("should render Help component", () => {
        wrapper = mount(
          <DialogFullScreen
            open
            title="This is test title"
            help="this is help text"
          />
        );

        expect(wrapper.find(Help).exists()).toBe(true);
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      it("include correct component, elements and role data tags on modal", () => {
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

        expect(wrapper.find(Modal).props()["data-element"]).toEqual("bar");
        expect(wrapper.find(Modal).props()["data-role"]).toEqual("baz");
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
          margin: "0",
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
        },
        wrapper,
        { modifier: `${StyledHeading}` }
      );

      assertStyleMatch(
        {
          width: "100%",
          boxSizing: "content-box",
          margin: "0 0 0 3px",
        },
        wrapper,
        { modifier: `${StyledHeading} ${StyledHeader}` }
      );
    });
  });

  describe("ARIA attributes", () => {
    describe("when a title is specified as string", () => {
      it("then the container should have aria-labeledby attribute set to it's header's id", () => {
        wrapper = mount(
          <DialogFullScreen
            open
            onCancel={() => {}}
            onConfirm={() => {}}
            data-role="baz"
            data-element="bar"
            title="Test"
          />
        );

        expect(
          wrapper
            .find("[data-element='dialog-full-screen']")
            .first()
            .prop("aria-labelledby")
        ).toBe("carbon-dialog-title");
      });
    });

    describe("when the aria-labelledby prop is specified", () => {
      it("then the container should have the same aria-labeledby attribute", () => {
        const titleId = "foo";

        wrapper = mount(
          <DialogFullScreen
            aria-labelledby={titleId}
            open
            onCancel={() => {}}
            onConfirm={() => {}}
            data-role="baz"
            data-element="bar"
            title={<div id={titleId}>Foo</div>}
          />
        );

        expect(
          wrapper
            .find("[data-element='dialog-full-screen']")
            .first()
            .prop("aria-labelledby")
        ).toBe(titleId);
      });
    });

    describe("when the role prop is specified", () => {
      it("then the container should have the same role attribute", () => {
        const dialogRole = "foo";
        wrapper = mount(
          <DialogFullScreen
            open
            onCancel={() => {}}
            onConfirm={() => {}}
            data-role="baz"
            data-element="bar"
            role={dialogRole}
          />
        );
        expect(
          wrapper
            .find("[data-element='dialog-full-screen']")
            .first()
            .prop("role")
        ).toBe(dialogRole);
      });
    });

    describe("when the aria-label prop is specified", () => {
      it("then the container should have the same aria-label attribute", () => {
        const label = "foo";
        wrapper = mount(
          <DialogFullScreen
            open
            onCancel={() => {}}
            onConfirm={() => {}}
            data-role="baz"
            data-element="bar"
            aria-label={label}
          />
        );
        expect(
          wrapper
            .find("[data-element='dialog-full-screen']")
            .first()
            .prop("aria-label")
        ).toBe(label);
      });
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

  it("closes when the exit icon is clicked", () => {
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
