import React from 'react';
import { mount } from 'enzyme';
import RadioButtonMapper from '../../__experimental__/components/radio-button/radio-button-mapper.component';
import { RadioTile, RadioTileGroup } from '.';
import { baseTheme } from '../../style/themes';

// import Fieldset from '../fieldset';
import {
  StyledRadioTileFieldset,

  StyledRadioTileContainer,
  StyledRadioTile,
  StyledRadioTileInput,
  StyledDeselectButton
} from './radio-tile.style';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';

const radioValues = ['val1', 'val2', 'val3'];

describe('RadioTile', () => {
  let wrapper;

  const render = (props) => {
    wrapper = mount(
      <RadioTile { ...props } />
    );
  };

  beforeEach(() => {
    render();
  });

  it('clicking on RadioTile invokes passed onChange callback', () => {
    const onChangeMock = jest.fn();
    render({ onChange: onChangeMock });
    wrapper.find(StyledRadioTileInput).props().onChange();
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('renders deselect button when RadioTile is checked', () => {
    render({ checked: true });
    expect(wrapper.find(StyledDeselectButton).exists()).toBe(true);
  });

  it('clicking on the deselect button invokes passed onChange callback', () => {
    const onChangeMock = jest.fn();
    render({
      onChange: onChangeMock, checked: true, id: 'id', name: 'name'
    });
    wrapper.find(StyledDeselectButton).props().onClick();
    expect(onChangeMock).toHaveBeenCalledWith({
      target: {
        id: 'id',
        name: 'name',
        value: null,
        checked: false
      }
    });
  });

  describe('styles', () => {
    it('renders proper colors when RadioTile is checked', () => {
      render({ checked: true });
      assertStyleMatch({
        borderColor: baseTheme.radioTile.checkedBorder,
        background: baseTheme.radioTile.selectedBackground,
        zIndex: '10'
      }, wrapper.find(StyledRadioTile));
    });

    it('renders component with lower opacity when disabled', () => {
      render({ disabled: true });
      assertStyleMatch({
        opacity: '0.5'
      }, wrapper.find(StyledRadioTile));
    });

    it('renders proper background when hovered', () => {
      assertStyleMatch({
        background: baseTheme.radioTile.hoverBackground
      }, wrapper.find(StyledRadioTileContainer), { modifier: `&:hover ${StyledRadioTile}` });
    });

    it('renders proper outline when focused', () => {
      assertStyleMatch({
        outline: `3px solid ${baseTheme.colors.focus}`,
        zIndex: '15'
      }, wrapper.find(StyledRadioTileInput), { modifier: `&:focus + ${StyledRadioTile}` });
    });
  });
});

describe('RadioTileGroup', () => {
  let wrapper;

  const render = (props) => {
    wrapper = mount(
      <RadioTileGroup
        name='RadioTileGroup'
        legend='Radio Tile Group'
        onBlur={ jest.fn() }
        onChange={ jest.fn() }
        { ...props }
      >
        {radioValues.map((value, index) => (
          <RadioTile
            id={ `rId-${index}` }
            key={ `radio-key-${value}` }
            value={ value }
          />
        ))}
      </RadioTileGroup>
    );
  };

  beforeEach(() => {
    render();
  });

  describe('in default single select mode', () => {
    it('renders children wrapped by RadioButtonMapper', () => {
      expect(wrapper.find(RadioButtonMapper).exists()).toBe(true);
    });

    it('fieldset has "radiogroup" role applied', () => {
      expect(wrapper.find(StyledRadioTileFieldset).props().role).toBe('radiogroup');
    });
  });

  describe('in multi select mode', () => {
    it('renders children not wrapped by RadioButtonMapper', () => {
      render({ multiSelect: true });
      expect(wrapper.find(RadioButtonMapper).exists()).toBe(false);
    });

    it('fieldset has "group" role applied', () => {
      render({ multiSelect: true });
      expect(wrapper.find(StyledRadioTileFieldset).props().role).toBe('group');
    });

    it('tiles are spaced by 16px vertically', () => {
      render({ multiSelect: true });
      assertStyleMatch({
        marginBottom: '16px'
      }, wrapper.find(StyledRadioTileFieldset), { modifier: `${StyledRadioTileContainer}` });
    });
  });
  describe('propTypes', () => {
    it('validates the incorrect children prop', () => {
      jest.spyOn(global.console, 'error').mockImplementation(() => {});

      mount(
        <RadioTileGroup legend='Legend'>
          <p>Invalid children</p>
          <p>Invalid children</p>
        </RadioTileGroup>
      );

      const expected = 'Warning: Failed prop type: `RadioTileGroup` only accepts children of'
        + ' type `RadioTile`.\n    in RadioTileGroup';

      expect(console.error).toHaveBeenCalledWith(expected); // eslint-disable-line no-console
    });
  });
});
