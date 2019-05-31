import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../utils/helpers/tags/tags';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledSpinner from './spinner.style';

const Spinner = (props) => {
  const { as, ...spinnerProps } = props;
  return (
    <StyledSpinner
      type={ as } { ...spinnerProps }
      { ...tagComponent('spinner', props) }
    />
  );
};

Spinner.defaultProps = {
  as: 'info',
  size: 'medium'
};

Spinner.propTypes = {
  as: PropTypes.oneOf(OptionsHelper.colors),
  className: PropTypes.string,
  size: PropTypes.oneOf(OptionsHelper.sizesFull)
};

export default Spinner;
