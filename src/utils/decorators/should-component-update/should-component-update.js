import ShouldComponentUpdateHelper from "../../helpers/should-component-update";
import Logger from "../../logger/logger";
/**
 * ShouldComponentUpdate Decorator.
 *
 * This decorator provides useful should component update function.
 *
 * == How to use ShouldComponentUpdate decorator in a component:
 *
 * In your file:
 *
 *   import ShouldComponentUpdate from 'carbon-react/lib/utils/decorators/should-component-update;
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

let deprecatedWarnTriggered = false;

const ShouldComponentUpdate = (ComposedComponent) => {
  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    // eslint-disable-next-line max-len
    Logger.deprecate(
      "`ShouldComponentUpdate` decorator is deprecated and will soon be removed"
    );
  }
  class Component extends ComposedComponent {
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

  Component.displayName =
    ComposedComponent.displayName || ComposedComponent.name;
  return Component;
};

export default ShouldComponentUpdate;
