import React from 'react';
import PropTypes from 'prop-types';
import propTypes from '@styled-system/prop-types';
import OptionsHelper from '../../utils/helpers/options-helper';
import { StyledTile, TileContent } from './tile.style.js';

const Tile = ({
  as = 'tile',
  orientation = 'horizontal',
  p = 3,
  children,
  width,
  ...rest
}) => {
  const wrappedChildren = React.Children.map(children, (child, index) => {
    if (!child) { return null; }

    const { width: contentWidth, ...childProps } = child.props;
    const key = child.key || `tile-content-${index + 1}`;

    return (
      <TileContent
        key={ key }
        width={ contentWidth }
      >
        {React.cloneElement(child, childProps)}
      </TileContent>
    );
  });

  return (
    <StyledTile
      p={ p }
      tileTheme={ as }
      orientation={ orientation }
      width={ width }
      data-component='tile'
      { ...rest }
    >
      {wrappedChildren}
    </StyledTile>
  );
};

Tile.propTypes = {
  ...propTypes.space,
  /** Sets the theme of the tile - either 'tile' or 'transparent' */
  as: PropTypes.oneOf(OptionsHelper.tileThemes),
  /**
   * The content to render within the tile. Each child will be wrapped with
   * a TileContent wrapper, which allows any individual child component to take a
   * percentage-based width prop, dictating the percentage of the tile width it will take up.
   *
   * Width will have no effect on a child component if the tile orientation is set to 'vertical'.
   */
  children: PropTypes.node,
  /** The orientation of the tile - set to either horizontal or vertical */
  orientation: PropTypes.oneOf(OptionsHelper.orientation),
  /**
   * Set a pixel with for the Tile component. If both are set to non-zero values, this
   * takes precedence over the percentage-based "width" prop.
   */
  pixelWidth: PropTypes.number,
  /**
   * Set a percentage-based width for the whole Tile component, relative to its parent.
   * If unset or zero, this will default to 100%.
   */
  width: PropTypes.number
};

export default Tile;
