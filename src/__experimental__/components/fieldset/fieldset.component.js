import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { validProps } from '../../../utils/ether';
import tagComponent from '../../../utils/helpers/tags';
import { FieldsetStyle, LegendStyle } from './fieldset.style';

class Fieldset extends React.Component {
  legend = () => {
    if (!this.props.legend) { return null; }

    return (
      <LegendStyle data-element='legend'>
        { this.props.legend }
      </LegendStyle>
      // <legend className='common-input__label'>
    );
  }

  render() {
    const { className, ...safeProps } = validProps(this);
    const classes = classNames('carbon-fieldset', className);

    return (
      <FieldsetStyle
        className={ classes }
        { ...tagComponent('fieldset', this.props) }
        { ...safeProps }
      >
        { this.legend() }
        { this.props.children }
      </FieldsetStyle>
    );
  }
}

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
