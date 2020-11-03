import React from "react";
import PropTypes from "prop-types";

import tagComponent from "../../utils/helpers/tags/tags";
import TileSelect from "./tile-select.component";
import RadioButtonMapper from "../../__experimental__/components/radio-button/radio-button-mapper.component";
import {
  StyledTileSelectFieldset,
  StyledGroupDescription,
} from "./tile-select.style";

const TileSelectGroup = (props) => {
  const {
    children,
    name,
    legend,
    description,
    onChange,
    onBlur,
    value,
    multiSelect,
  } = props;

  let tiles;

  if (multiSelect) {
    tiles = children;
  } else {
    tiles = (
      <RadioButtonMapper
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { type: "radio" })
        )}
      </RadioButtonMapper>
    );
  }

  return (
    <StyledTileSelectFieldset
      legend={legend}
      {...tagComponent("tile-select-group", props)}
      multiSelect={multiSelect}
    >
      <StyledGroupDescription>{description}</StyledGroupDescription>
      <div>{tiles}</div>
    </StyledTileSelectFieldset>
  );
};

TileSelectGroup.propTypes = {
  /** The TileSelect components to be rendered in the group */
  children: (props, propName, componentName) => {
    let error;
    const prop = props[propName];

    React.Children.forEach(prop, (child) => {
      if (TileSelect.displayName !== child.type.displayName) {
        error = new Error(
          `\`${componentName}\` only accepts children of type \`${TileSelect.displayName}\`.`
        );
      }
    });

    return error;
  },
  /** The content for the TileSelectGroup Legend */
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
  /** When passed as true TileSelectGroup serves only visual purpose */
  /** It wraps TileSelects in fieldset element and renders the legend and description props content */
  /** onChange, onBlur, value, checked and name props are meant to be passed individually on each of the TileSelects */
  multiSelect: PropTypes.bool,
};

TileSelectGroup.defaultProps = {
  multiSelect: false,
};

export default TileSelectGroup;
