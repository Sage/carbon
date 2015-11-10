import React from 'react';

var Test = (ComposedComponent) => {
  class EnhancedComponent extends ComposedComponent {
    render() {
      const renderedElement = super.render();

      var {props, state, type, ...other} = renderedElement;

      return (
        <renderedElement.type { ...props } { ...state } { ...other } >
          { renderedElement.props.children }
        </renderedElement.type>
      )
    }
  }

  return EnhancedComponent;
}

export default Test;
