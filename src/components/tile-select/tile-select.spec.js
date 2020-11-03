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
  StyledDeselectButton,
  StyledTitle,
  StyledSubtitle,
  StyledAdornment,
  StyledDescription,
} from "./tile-select.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";

const radioValues = ["val1", "val2", "val3"];

describe("TileSelect", () => {
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
    expect(wrapper.find(StyledDeselectButton).exists()).toBe(true);
  });

  it("clicking on the deselect button invokes passed onChange callback", () => {
    const onChangeMock = jest.fn();
    render({
      onChange: onChangeMock,
      checked: true,
      id: "id",
      name: "name",
    });
    wrapper.find(StyledDeselectButton).prop("onClick")();
    expect(onChangeMock).toHaveBeenCalledWith({
      target: {
        id: "id",
        name: "name",
        value: null,
        checked: false,
      },
    });
  });

  it("renders title element when title prop is passed", () => {
    render({ title: "Title" });
    expect(wrapper.find(StyledTitle).prop("children")).toBe("Title");
  });

  it("renders subtitle element when subtitle prop is passed", () => {
    render({ subtitle: "Subtitle" });
    expect(wrapper.find(StyledSubtitle).prop("children")).toBe("Subtitle");
  });

  it("renders title adornment element when titleAdornment prop is passed", () => {
    const MyComp = () => <div />;
    render({ titleAdornment: <MyComp /> });
    expect(wrapper.find(StyledAdornment).find(MyComp).exists()).toBe(true);
  });

  describe("styles", () => {
    it("renders proper colors when TileSelect is checked", () => {
      render({ checked: true });
      assertStyleMatch(
        {
          borderColor: baseTheme.colors.primary,
          background: tint(baseTheme.colors.primary)(95),
          zIndex: "10",
        },
        wrapper.find(StyledTileSelect)
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
      assertStyleMatch(
        {
          outline: `3px solid ${baseTheme.colors.focus}`,
          zIndex: "15",
        },
        wrapper.find(StyledTileSelectInput),
        { modifier: `&:focus + ${StyledTileSelect}` }
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
        <TileSelectGroup legend="Legend">
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
