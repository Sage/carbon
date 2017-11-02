import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import css from './../../utils/css';

import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

import tagComponent from '../../utils/helpers/tags';

/**
 * A button toggle group widget.
 *
 * == How to use an ButtonToggleGroup in a component:
 *
 * In your file
 *
 *   import ButtonToggleGroup from 'carbon/lib/components/button-toggle-group';
 *
 * To render an ButtonToggleGroup:
 *
 *   <ButtonToggleGroup validations=[]>
 *     <ButtonToggle />
 *   <ButtonToggleGroup />
 *
 * @class ButtonToggleGroup
 * @constructor
 * @decorators {InputLabel,InputValidation}
 */
const ButtonToggleGroup = InputLabel(InputValidation(
class ButtonToggleGroup extends React.Component {
  static propTypes = {
    /**
     * Children elements
     *
     * @property children
     * @type {Node}
     */
    children: PropTypes.node.isRequired,

    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * Selected value from children components
     *
     * @property value
     * @type {String}
     */
    value: PropTypes.string
  };

  /**
 * A lifecycle method for when the component has re-rendered.
 *
 * @method componentWillReceiveProps
 * @return {void}
 */
  componentWillReceiveProps(nextProps) {
    // manually trigger change as this wrapper doesn't actually have an input to trigger it itself
    if (nextProps.value !== this.props.value) {
      this._handleContentChange();
    }
  }

  /**
   * Main Class getter
   *
   * @method mainClasses
   * @return {void}
   */
  get mainClasses() {
    return classNames('carbon-button-toggle-group', this.props.className, css.input);
  }

  /**
   * Provides an extension point to add additional properties for the containing field.
   *
   * @method fieldProps
   * @return {Object} Field props
   */
  get fieldProps() {
    const fieldProps = {
      className: 'common-input__field',
      onFocus: this._handleFocus,
      onBlur: this._handleBlur
    };

    return fieldProps;
  }

  /**
   * Extends the input props to include the ID.
   *
   * @method inputProps
   * @return {Object} Input props
   */
  get inputProps() {
    const children = React.Children.toArray(this.props.children);

    if (children.length === 0 || children[0].props.id === undefined) { return null; }

    return { id: children[0].props.id };
  }

  /**
   * Returns HTML for the input.
   *
   * @method inputHTML
   * @return {HTML} HTML for input
   */
  get inputHTML() {
    return (
      <div { ...this.fieldProps }>
        { this.props.children }
      </div>
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div
        className={ this.mainClasses }
        ref={ (comp) => { this._target = comp; } }
        { ...tagComponent('button-toggle-group', this.props) }
      >
        { this.labelHTML }
        { this.inputHTML }
        { this.validationHTML }
        { this.fieldHelpHTML }
      </div>
    );
  }
}
));

export default ButtonToggleGroup;
