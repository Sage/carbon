import React from 'react';
import Icon from './../../../components/icon';

/**
 * LabelIcon decorator.
 *
 * This decorator provides HTML and CSS to style an input icon next to the label.
 *
 * == How to use LabelIcon decorator in a component:
 *
 * In your file:
 *
 *   import LabelIcon from 'carbon/lib/utils/decorators/label-icon';
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = InputLabel(LabelIcon(
 *   class MyComponent extends React.Component {
 *     ...
 *   })
 *
 * In the render method for your component, you can now output the HTML:
 *
 *   render() {
 *     return (
 *       <div>
 *         { this.labelHTML }
 *         { this.labelIconType('info') }
 *         <input />

 *       </div>
 *     );
 *   }
 *
 * Note: the label icon html needs to sit as a sibling to its label.
 *
 * @method LabelIcon
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
let LabelIcon = (ComposedComponent) => class extends ComposedComponent {

  constructor(...args) {
    super(...args);
  }

  /**
   * Supplies the HTML for the label icon.
   *
   * @method labelIconHTML
   * @param {string} icon Which icon to render
   * @return {Object} JSX for icon
   */
  get labelIconHTML() {
    let icon;

    if (this.props.labelIconType) {
      icon = this.props.labelIconType;

      return (
        <Icon type={ icon } className="ui-label-icon" />
      );
    }
  }
};

export default LabelIcon;
