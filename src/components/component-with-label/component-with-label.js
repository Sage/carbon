import React from 'react';
import Row from './../row';

let ComponentWithLabel = (props) =>
  <Row columns="10" columnSpan={ props.columnSpan} className={ `carbon-section ${props.className}` }>
    <label columnSpan="3" columnAlign={ props.labelAlignment} className='carbon-section__label'>{ props.label }</label>
    <div className='carbon-section__content' columnSpan="7" columnAlign={ props.contentAlignment }>
      { props.children }
    </div>
  </Row>
;

ComponentWithLabel.propTypes = {
  children: React.PropTypes.node,
  label: React.PropTypes.string.isRequired,
  labelAlignment: React.PropTypes.string,
  contentAlignment: React.PropTypes.string,
  columnSpan: React.PropTypes.string.isRequired
};

export default ComponentWithLabel;
