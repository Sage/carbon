import React from 'react';

let Section = (props) =>
  <div className={ `carbon-section ${props.className}` }>
    <h2 className='carbon-section__title'>{ props.title }</h2>
    { props.children }
  </div>
;

Section.propTypes = {
  children: React.PropTypes.node,
  title:    React.PropTypes.string.isRequired
};

export default Section;
