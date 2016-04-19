import React from 'react';
import Help from './../../../components/help';

/**
 * HelpDecorator.
 *
 * This decorator attaches a tooltip to a component.
 *
 * == How to use ToolTip decorator in a component:
 *
 * In your file:
 *
 *   import HelpDecorator from 'carbon/lib/utils/decorators/help-decorator';
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = HelpDecorator(
 *   class MyComponent extends React.Component {
 *     ...
 *   });
 *
 * To activate the help component, you must pass a prop of 'tooltipMessage' with some text content.
 *
 * render() {
 *   return (
 *     <MyComponent helpMessage='Some Helpful Content' />
 *   )
 * }
 *
 *
 * @method HelpDecorator
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
let HelpDecorator = (ComposedComponent) => class Component extends ComposedComponent {
  constructor(...args) {
    super(...args);
  }

  /**
   * Supplies the HTML for help component
   *
   * @method helpHTML
   * @return {Object} JSX for help
   */
  get helpHTML() {
    if (this.props.helpMessage) {
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
