import React from 'react';
import Help from './../../../components/help';

let HelpDecorator = (ComposedComponent) => class Component extends ComposedComponent {
  constructor(...args) {
    super(...args);
  }

  get helpHTML() {
    if (this.props.tooltipMessage) {
      return (
        <Help
          className='ui-help--inline'
          inline={ true }
          { ...this.props }>
        </Help>
      );
    }
  }
};

export default HelpDecorator;
