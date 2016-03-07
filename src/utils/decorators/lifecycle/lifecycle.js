import ShouldComponentUpdateHelper from './../../helpers/should-component-update';

/**
 * Lifecycle Decorator.
 *
 * This decorator provides useful lifecycle methods.
 *
 * == How to use Lifecycle decorator in a component:
 *
 * In your file:
 *
 *   import Lifecycle from 'carbon/lib/utils/decorators/should-component-update;
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = Lifecycle(
 *   class MyComponent extends React.Component {
 *     ...
 *   })
 *
 * Provided Lifecycle Methods
 *  * `shouldComponentUpdate` - uses the shouldComponentUpdate Helper to compare props and state
 *
 *
 * @method Lifecycle
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
let Lifecycle = (ComposedComponent) => class Component extends ComposedComponent {

  /**
   * Lifecycle hook to calculate if the component should re-render
   *
   * @method shouldComponentUpdate
   * @param nextProps - The next props for component
   * @param nextState - The next state for component
   * @return {Boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (super.shouldComponentUpdate) { return super.shouldComponentUpdate(); }

    return ShouldComponentUpdateHelper(this, nextProps, nextState);
  }
};

export default Lifecycle;
