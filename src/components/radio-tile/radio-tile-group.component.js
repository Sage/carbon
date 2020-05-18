import React from 'react';
import PropTypes from 'prop-types';

import tagComponent from '../../utils/helpers/tags/tags';
import RadioTile from './radio-tile.component';
import RadioButtonMapper from '../../__experimental__/components/radio-button/radio-button-mapper.component';
import { StyledRadioTileFieldset, StyledGroupDescription } from './radio-tile.style';

const RadioTileGroup = (props) => {
  const {
    children, name, legend, description, onChange, onBlur, value, multiSelect
  } = props;

  let tiles;

  if (multiSelect) {
    tiles = children;
  } else {
    tiles = (
      <RadioButtonMapper
        name={ name }
        onBlur={ onBlur }
        onChange={ onChange }
        value={ value }
      >
        {children}
      </RadioButtonMapper>
    );
  }

  return (
    <StyledRadioTileFieldset
      role={ multiSelect ? 'group' : 'radiogroup' }
      legend={ legend }
      { ...tagComponent('radio-tile-group', props) }
      multiSelect={ multiSelect }
    >
      <StyledGroupDescription>
        {description}
      </StyledGroupDescription>
      <div>
        {tiles}
      </div>
    </StyledRadioTileFieldset>
  );
};

RadioTileGroup.propTypes = {
  /** The RadioTile components to be rendered in the group */
  children: (props, propName, componentName) => {
    let error;
    const prop = props[propName];

    React.Children.forEach(prop, (child) => {
      if (RadioTile.displayName !== child.type.displayName) {
        error = new Error(`\`${componentName}\` only accepts children of type \`${RadioTile.displayName}\`.`);
      }
    });

    return error;
  },
  /** The content for the RadioGroup Legend */
  legend: PropTypes.string,
  /** Description to be rendered below the legend */
  description: PropTypes.string,
  /** The currently selected value - only for single select mode. */
  value: PropTypes.string,
  /** The name to apply to the input - only for single select mode. */
  name: PropTypes.string,
  /** A callback triggered when one of tiles is selected - only for single select mode. */
  onChange: PropTypes.func,
  /** A callback triggered when one of tiles is blurred - only for single select mode. */
  onBlur: PropTypes.func,
  /** When passed as true RadioTileGroup serves only visual purpose */
  /** It wraps RadioTiles in fieldset element and renders the legend and description props content */
  /** onChange, onBlur, value, checked and name props are meant to be passed individually on each of the RadioTiles */
  multiSelect: PropTypes.bool
};

RadioTileGroup.defaultProps = {
  multiSelect: false
};

export default RadioTileGroup;
