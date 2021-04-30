import React from "react";
import { mount } from "enzyme";
import RadioButtonMapper from "../../__experimental__/components/radio-button/radio-button-mapper.component";
import { TileSelect, TileSelectGroup } from ".";
import { baseTheme } from "../../style/themes";
import tint from "../../style/utils/tint";

import {
  StyledTileSelectFieldset,
  StyledTileSelectContainer,
  StyledTileSelect,
  StyledTileSelectInput,
  StyledDeselectWrapper,
  StyledTitle,
  StyledSubtitle,
  StyledAdornment,
  StyledDescription,
  StyledTitleContainer,
  StyledFocusWrapper,
  StyledFooterWrapper,
} from "./tile-select.style";
import Button from "../button";
import Icon from "../icon";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";

jest.mock("@tippyjs/react/headless");

const radioValues = ["val1", "val2", "val3"];

describe("TileSelect", () => {
  testStyledSystemMargin((props) => <TileSelect {...props} />);

  testStyledSystemMargin((props) => (
    <TileSelectGroup name="tile-select-group" {...props}>
      <TileSelect name="test" />
    </TileSelectGroup>
  ));

  let wrapper;

  const render = (props) => {
    wrapper = mount(<TileSelect {...props} />);
  };

  beforeEach(() => {
    render();
  });

  it("TileSelect invokes passed onChange callback", () => {
    const onChangeMock = jest.fn();
    render({ onChange: onChangeMock });
    wrapper.find(StyledTileSelectInput).prop("onChange")();
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("renders deselect button when TileSelect is checked", () => {
    render({ checked: true });
    expect(wrapper.find(StyledDeselectWrapper).find(Button).exists()).toBe(
      true
    );
  });

  it("clicking on the deselect button invokes passed onChange callback", () => {
    const onChangeMock = jest.fn();
    render({
      onChange: onChangeMock,
      checked: true,
      id: "id",
      name: "name",
    });
    wrapper.find(StyledDeselectWrapper).find(Button).prop("onClick")();
    expect(onChangeMock).toHaveBeenCalledWith({
      target: {
        id: "id",
        name: "name",
        value: null,
        checked: false,
      },
    });
  });

  it("calls onFocus callback if prop is passed and input is focused", () => {
    const mockCb = jest.fn();
    render({
      onFocus: mockCb,
      checked: true,
      id: "id",
      name: "name",
    });

    wrapper.find(StyledTileSelectInput).simulate("focus");
    expect(mockCb).toHaveBeenCalled();
  });

  it("calls onBlur callback if prop is passed and input is blurred", () => {
    const mockCb = jest.fn();
    render({
      onBlur: mockCb,
      checked: true,
      id: "id",
      name: "name",
    });

    wrapper.find(StyledTileSelectInput).simulate("focus");
    wrapper.find(StyledTileSelectInput).simulate("blur");
    expect(mockCb).toHaveBeenCalled();
  });

  it("renders title element as h3 when title prop is passed as string", () => {
    render({ title: "Title" });
    expect(wrapper.find(StyledTitleContainer).find("h3").exists()).toBeTruthy();
    expect(wrapper.find(StyledTitle).prop("children")).toBe("Title");
  });

  it("renders title element as a div when title prop is passed as node", () => {
    render({ title: <h1>Title</h1> });
    expect(wrapper.find(StyledTitleContainer).find("h3").exists()).toBeFalsy();
    expect(wrapper.find(StyledTitle).prop("as")).toBe("div");
    expect(wrapper.find(StyledTitle).prop("children")).toStrictEqual(
      <h1>Title</h1>
    );
  });

  it("renders subtitle element as h4 when subtitle prop is passed as string", () => {
    render({ subtitle: "Subtitle" });
    expect(wrapper.find(StyledTitleContainer).find("h4").exists()).toBeTruthy();
    expect(wrapper.find(StyledSubtitle).prop("children")).toBe("Subtitle");
  });

  it("renders subtitle element as a div when subtitle prop is passed as node", () => {
    render({ subtitle: <h2>Sub Title</h2> });
    expect(wrapper.find(StyledTitleContainer).find("h4").exists()).toBeFalsy();
    expect(wrapper.find(StyledSubtitle).prop("as")).toBe("div");
    expect(wrapper.find(StyledSubtitle).prop("children")).toStrictEqual(
      <h2>Sub Title</h2>
    );
  });

  it("renders title adornment element when titleAdornment prop is passed", () => {
    const MyComp = () => <div />;
    render({ titleAdornment: <MyComp /> });
    expect(wrapper.find(StyledAdornment).find(MyComp).exists()).toBe(true);
  });

  it("renders description element as p when description prop is passed as string", () => {
    render({ description: "description" });
    expect(wrapper.find(StyledDescription).prop("as")).toBe(undefined);
    expect(wrapper.find(StyledDescription).prop("children")).toBe(
      "description"
    );
  });

  it("renders description element as div when description prop is passed as node", () => {
    render({ description: <strong>description</strong> });
    expect(wrapper.find(StyledDescription).prop("as")).toBe("div");
    expect(wrapper.find(StyledDescription).prop("children")).toStrictEqual(
      <strong>description</strong>
    );
  });

  describe("styles", () => {
    it("renders proper colors when TileSelect is checked", () => {
      render({ checked: true });
      assertStyleMatch(
        {
          background: tint(baseTheme.colors.primary)(95),
        },
        wrapper.find(StyledTileSelect)
      );

      assertStyleMatch(
        {
          borderColor: baseTheme.colors.primary,
          zIndex: "10",
        },
        wrapper.find(StyledFocusWrapper)
      );
    });

    it("renders component with proper background and proper text color when disabled", () => {
      render({ disabled: true });
      assertStyleMatch(
        {
          background: baseTheme.tileSelect.disabledBackground,
        },
        wrapper.find(StyledTileSelect)
      );

      [StyledTitle, StyledSubtitle, StyledDescription].forEach((Component) => {
        assertStyleMatch(
          {
            color: baseTheme.tileSelect.disabledText,
          },
          wrapper.find(StyledTileSelect),
          { modifier: ` ${Component}` }
        );
      });

      assertStyleMatch(
        {
          color: baseTheme.colors.black,
          fill: baseTheme.colors.black,
          opacity: "0.3",
        },
        wrapper.find(StyledTileSelect),
        { modifier: ` ${StyledAdornment} *` }
      );
    });

    it("renders proper background when hovered", () => {
      assertStyleMatch(
        {
          background: baseTheme.tileSelect.hoverBackground,
        },
        wrapper.find(StyledTileSelectContainer),
        { modifier: `&:hover ${StyledTileSelect}` }
      );
    });

    it("renders proper outline when focused", () => {
      wrapper.find(StyledTileSelectInput).simulate("focus");

      assertStyleMatch(
        {
          outline: `3px solid ${baseTheme.colors.focus}`,
          zIndex: "15",
        },
        wrapper.find(StyledFocusWrapper)
      );
    });
  });

  describe("customActionButton render prop", () => {
    it("clicking it invokes passed onChange callback", () => {
      const onChangeMock = jest.fn();
      render({
        onChange: onChangeMock,
        checked: true,
        id: "id",
        name: "name",
        customActionButton: (onClick) => <Button onClick={onClick}>Foo</Button>,
      });
      wrapper.find(StyledDeselectWrapper).find(Button).prop("onClick")();

      expect(wrapper.find(StyledDeselectWrapper).find(Button).text()).toEqual(
        "Foo"
      );
      expect(onChangeMock).toHaveBeenCalledWith({
        target: {
          id: "id",
          name: "name",
          value: null,
          checked: false,
        },
      });
    });
  });

  describe("actionButtonAdornment prop", () => {
    it("renders the component next to the action Button", () => {
      const onChangeMock = jest.fn();
      render({
        onChange: onChangeMock,
        checked: true,
        id: "id",
        name: "name",
        actionButtonAdornment: <Icon type="info" />,
      });

      expect(
        wrapper.find(StyledDeselectWrapper).props().children.length
      ).toEqual(2);
      expect(
        wrapper.find(StyledDeselectWrapper).find(Icon).exists()
      ).toBeTruthy();

      assertStyleMatch(
        {
          marginRight: "16px",
          display: "flex",
          alignItems: "center",
          minHeight: "32px",
        },
        wrapper.find(StyledDeselectWrapper)
      );
    });
  });

  describe("footer prop", () => {
    beforeEach(() => {
      render({
        checked: true,
        id: "id",
        name: "name",
        footer: (
          <>
            <Icon type="info" />
            <Button>Foo</Button>
          </>
        ),
      });
    });

    it("renders the component at the bottom of the tile", () => {
      expect(
        wrapper.find(StyledFooterWrapper).find(Icon).exists()
      ).toBeTruthy();
      expect(
        wrapper.find(StyledFooterWrapper).find(Button).exists()
      ).toBeTruthy();

      assertStyleMatch(
        {
          width: "fit-content",
          position: "relative",
          zIndex: "200",
        },
        wrapper.find(StyledFooterWrapper)
      );
    });
  });
});

describe("TileSelectGroup", () => {
  let wrapper;

  const render = (props) => {
    wrapper = mount(
      <TileSelectGroup
        name="TileSelectGroup"
        legend="Radio Tile Group"
        onBlur={jest.fn()}
        onChange={jest.fn()}
        {...props}
      >
        {radioValues.map((value, index) => (
          <TileSelect
            id={`rId-${index}`}
            key={`radio-key-${value}`}
            value={value}
          />
        ))}
      </TileSelectGroup>
    );
  };

  beforeEach(() => {
    render();
  });

  describe("in default single select mode", () => {
    it("renders children wrapped by RadioButtonMapper", () => {
      expect(wrapper.find(RadioButtonMapper).exists()).toBe(true);
    });

    it('children have prop type="radio" passed on', () => {
      wrapper.find(TileSelect).forEach((node) => {
        expect(node.prop("type")).toBe("radio");
      });
    });
  });

  describe("in multi select mode", () => {
    it("renders children not wrapped by RadioButtonMapper", () => {
      render({ multiSelect: true });
      expect(wrapper.find(RadioButtonMapper).exists()).toBe(false);
    });

    it("tiles are spaced by 8px vertically", () => {
      render({ multiSelect: true });
      assertStyleMatch(
        {
          marginBottom: "8px",
        },
        wrapper.find(StyledTileSelectFieldset),
        { modifier: `${StyledTileSelectContainer}` }
      );
    });
  });

  describe("propTypes", () => {
    it("validates the incorrect children prop", () => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});

      mount(
        <TileSelectGroup name="tile-select-group" legend="Legend">
          <p>Invalid children</p>
          <p>Invalid children</p>
        </TileSelectGroup>
      );

      const expected =
        "Warning: Failed prop type: `TileSelectGroup` only accepts children of" +
        " type `TileSelect`.\n    in TileSelectGroup";

      expect(console.error).toHaveBeenCalledWith(expected); // eslint-disable-line no-console
    });
  });
});
