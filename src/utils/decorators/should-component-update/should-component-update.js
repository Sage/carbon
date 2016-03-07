import ShouldComponentUpdateHelper from './../../helpers/should-component-update';

/**
 * Should Component Update Decorator.
 *
 * This decorator provides useful base should component update method.
 *
 * == How to use Should Component Update decorator in a component:
 *
 * In your file:
 *
 *   import ShouldComponentUpdateDecorator from 'carbon/lib/utils/decorators/should-component-update;
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = ShouldComponentUpdateDecorator(
 *   class MyComponent extends React.Component {
 *     ...
 *   })
 *
 * @method ShouldComponentUpdate
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
let ShouldComponentUpdate = (ComposedComponent) => class Component extends ComposedComponent {

  /**
   * Lifecycle hook to calculate if the component should re-render
   *
   * @method shouldComponentUpdate
   * @param nextProps - The next props for component
   * @param nextState - The next state for component
   * @return {Boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    return ShouldComponentUpdateHelper(this, nextProps, nextState);
  }
}

export default ShouldComponentUpdate;
