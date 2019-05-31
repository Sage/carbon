import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../utils/helpers/tags/tags';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledLoader from './loader.style';
import StyledLoaderSquare from './loader-square.style';

const Loader = (props) => {
  return (
    <StyledLoader
      size={ props.size }
      className={ props.className }
      isInsideButton={ props.isInsideButton }
      { ...tagComponent('loader', props) }
    >
      <StyledLoaderSquare isInsideButton={ props.isInsideButton } size={ props.size } />
      <StyledLoaderSquare isInsideButton={ props.isInsideButton } size={ props.size } />
      <StyledLoaderSquare isInsideButton={ props.isInsideButton } size={ props.size } />
    </StyledLoader>
  );
};

Loader.defaultProps = {
  size: 'small',
  isInsideButton: false
};

Loader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(OptionsHelper.sizesBinary),
  isInsideButton: PropTypes.bool
};

export default Loader;
