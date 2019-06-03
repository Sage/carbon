import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../utils/helpers/tags/tags';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledLoader from './loader.style';
import StyledLoaderSquare from './loader-square.style';

const Loader = (props) => {
  const { isInsideButton, size, ...loaderProps } = props;
  return (
    <StyledLoader
      size={ size } isInsideButton={ isInsideButton }
      { ...loaderProps } { ...tagComponent('loader', props) }
    >
      <StyledLoaderSquare isInsideButton={ isInsideButton } size={ size } />
      <StyledLoaderSquare isInsideButton={ isInsideButton } size={ size } />
      <StyledLoaderSquare isInsideButton={ isInsideButton } size={ size } />
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
