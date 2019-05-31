import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../utils/helpers/tags/tags';
import OptionsHelper from '../../utils/helpers/options-helper';
import { StyledLoader, LoaderSquare } from './loader.style';

const Loader = (props) => {
  return (
    <StyledLoader
      size={ props.size }
      className={ props.className }
      isInsideButton={ props.isInsideButton }
      { ...tagComponent('loader', props) }
    >
      <LoaderSquare isInsideButton={ props.isInsideButton } size={ props.size } />
      <LoaderSquare isInsideButton={ props.isInsideButton } size={ props.size } />
      <LoaderSquare isInsideButton={ props.isInsideButton } size={ props.size } />
    </StyledLoader>
  );
};

Loader.defaultProps = {
  size: 'small',
  isInsideButton: false
};

Loader.propTypes = {
  /** Custom className */
  className: PropTypes.string,
  /** Size of the spinner */
  size: PropTypes.oneOf(OptionsHelper.sizesBinary),
  isInsideButton: PropTypes.bool
};

export default Loader;
