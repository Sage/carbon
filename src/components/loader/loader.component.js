import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../utils/helpers/tags';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledLoader from './loader.style';
import StyledLoaderSquare from './loader-square.style';

const Loader = (props) => {
  return (
    <StyledLoader { ...props } { ...tagComponent('loader', props) }>
      <StyledLoaderSquare { ...props } />
      <StyledLoaderSquare { ...props } />
      <StyledLoaderSquare { ...props } />
    </StyledLoader>
  );
};

Loader.defaultProps = {
  size: 'small',
  isInsideButton: false,
  isActive: true
};

Loader.propTypes = {
  /** Size of the loader. */
  size: PropTypes.oneOf(OptionsHelper.sizesBinary),
  /** Applies white color. */
  isInsideButton: PropTypes.bool,
  /** Applies slate color. Available only when isInsideButton is true. */
  isActive: PropTypes.bool
};

export default Loader;
