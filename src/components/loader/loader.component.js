import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../utils/helpers/tags';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledLoader from './loader.style';
import StyledLoaderSquare from './loader-square.style';

const Loader = (props) => {
  const {
    isInsideButton, size, state, ...loaderProps
  } = props;
  return (
    <StyledLoader
      size={ size }
      isInsideButton={ isInsideButton }
      state={ state }
      { ...loaderProps }
      { ...tagComponent('loader', props) }
    >
      <StyledLoaderSquare
        isInsideButton={ isInsideButton } size={ size }
        state={ state }
      />
      <StyledLoaderSquare
        isInsideButton={ isInsideButton } size={ size }
        state={ state }
      />
      <StyledLoaderSquare
        isInsideButton={ isInsideButton } size={ size }
        state={ state }
      />
    </StyledLoader>
  );
};

Loader.defaultProps = {
  size: 'small',
  isInsideButton: false,
  state: 'on'
};

Loader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(OptionsHelper.sizesBinary),
  isInsideButton: PropTypes.bool,
  state: PropTypes.oneOf(['on', 'off'])
};

export default Loader;
