import ShouldComponentUpdateHelper from './../../helpers/should-component-update';

/**
 * ShouldComponentUpdate Decorator.
 *
 * This decorator provides useful should component update function.
 *
 * == How to use ShouldComponentUpdate decorator in a component:
 *
 * In your file:
 *
 *   import ShouldComponentUpdate from 'carbon/lib/utils/decorators/should-component-update;
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = ShouldComponentUpdate(
 *   class MyComponent extends React.Component {
 *     ...
 *   })
 *
 * Provided ShouldComponentUpdate Methods
 *  * `shouldComponentUpdate` - uses the shouldComponentUpdate Helper to compare props and state
 *
 *
 * @method ShouldComponentUpdate
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
const ShouldComponentUpdate = ComposedComponent => class Component extends ComposedComponent {

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
};

export default ShouldComponentUpdate;
