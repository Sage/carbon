import React from 'react';
import Tooltip from './../../../components/tooltip';

/**
 * ToolTipIdecorator.
 *
 * This decorator attaches a tooltip to a component.
 *
 * == How to use ToolTip decorator in a component:
 *
 * In your file:
 *
 *   import ToolTip from 'carbon/lib/utils/decorators/tooltip';
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = ToolTip(
 *   class MyComponent extends React.Component {
 *     ...
 *   });
 *
 * @method ToolTipIcon
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
let ToolTipIDecorator = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);
  }

  /**
   * Supplies the HTML for tooltip
   *
   * @method tooltipHTML
   * @return {Object} JSX for tooltip
   */
  get tooltipHTML() {
    if (this.props.toolTipMessage) {
      let classes = this.tooltipClasses;

      return <Tooltip
              className={ classes }
              showTooltip={ this.state.showTooltip }>
                { this.props.toolTipMessage }
            </Tooltip>;
      }
    }
};

export default ToolTipIDecorator;
