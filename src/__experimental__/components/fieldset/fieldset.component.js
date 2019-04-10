import React from 'react';
import PropTypes from 'prop-types';
import { validProps } from '../../../utils/ether';
import tagComponent from '../../../utils/helpers/tags';
import { FieldsetStyle, LegendStyle } from './fieldset.style';

const Fieldset = (props) => {
  const legend = () => {
    if (!props.legend) return null;

    return (
      <LegendStyle data-element='legend'>
        { props.legend }
      </LegendStyle>
    );
  };

  const { ...safeProps } = validProps({
    propTypes: Fieldset.propTypes,
    props
  });

  return (
    <FieldsetStyle
      { ...tagComponent('fieldset', props) }
      { ...safeProps }
    >
      { legend() }
      { props.children }
    </FieldsetStyle>
  );
};

Fieldset.propTypes = {
  /**
   * Child elements
   */
  children: PropTypes.node,
  /**
   * The text for the fieldsets legend element.
   */
  legend: PropTypes.string
};

export default Fieldset;
