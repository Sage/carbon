import React from 'react';
/**
 * A button widget.
 *
 * == How to use a Button in a component:
 *
 * In your file:
 *
 *   import Button from 'carbon/lib/components/button';
 *
 * In the render method:
 *
 *   <Button>Save</Button>
 *
 * For additional properties specific to this component, see propTypes and defaultProps.
 *
 * @class Button
 * @constructor
 */
class Button extends React.Component {

  static propTypes = {
    /**
     * Customizes the appearance, can be set to 'primary' or 'secondary'.
     *
     * @property as
     * @type { String }
     * @default 'secondary'
     */
    as: React.PropTypes.string,

    /**
    * A required prop. This is what the button will display.
    *
    * @property children
    * @type { Multiple }
    */
    children: React.PropTypes.string.isRequired,

    /**
     * Gives the button a disabled state.
     *
     * @property boolean
     * @type { Boolean }
     * @default false
     */
    disabled: React.PropTypes.bool
  }

  static defaultProps = {
    as: 'secondary',
    disabled: false
  }

  /**
   * Renders the component with props.
   *
   * @method render
   */
  render() {
    let {className, ...props} = this.props;

    className = 'ui-button ui-button--' + this.props.as +
      (this.props.disabled ? ' ui-button--disabled' : '') + " " + className;

    return(

        <button className={ className }

            { ...props }>
            { this.props.children }

        </button>
    );
  }
};

export default Button;
