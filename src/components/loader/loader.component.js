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
  loading: 'on'
};

Loader.propTypes = {
  size: PropTypes.oneOf(OptionsHelper.sizesBinary),
  isInsideButton: PropTypes.bool,
  loading: PropTypes.oneOf(OptionsHelper.loading)
};

export default Loader;
