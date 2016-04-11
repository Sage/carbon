import React from 'react';
import Icon from './../../../components/icon';
import classNames from 'classnames';

let LabelIcon = (ComposedComponent) => class extends ComposedComponent {

  constructor(...args) {
     super(...args);
   }
   /**
    * Supplies the HTML for the help icon.
    *
    * @method helpIconHTML
    * @param {string} icon Which icon to render
    * @return {Object} JSX for icon
    */
   get labelIconHTML() {
     let icon;

     if (this.props.labelIconType) {
       icon = this.props.labelIconType;
    }

     return (
       <label htmlFor={ this.inputProps.id } key="label-icon">
         <Icon type={ icon } className="ui-label-icon" />
       </label>
     );
  }
};

export default LabelIcon;
