import React from 'react';
import Icon from './../icon';
import Button from './../button';
/**
 * A MultiActionButton widget.
 *
 * == How to use a MultiActionButton in a component:
 *
 * In your file
 *
 *   import MultiActionButton from 'components/multi-action-button';
 *
 * To render a MultiActionButton (developer can add any buttons to dropdown):
 *
 *         <MultiActionButton name="Main Button" onClick={clickHandler}>
 *           <Button onClick="buttonClickHandler1">Button name 1</Button>
 *           <Button onClick="buttonClickHandler2">Button name 2</Button>
 *         </MultiActionButton>
 *
 *
 * @class MultiActionButton
 * @constructor
 */
class MultiActionButton extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  }

  state = {
    /**
     * A description for what this state param is used for.
     *
     * @property showMoreButtons
     * @type {Boolean}
     * @default false
     */
    showMoreButtons: false
  }

  /**
   * Handles a mouse action on dropdown icon
   *
   * @method onMouseEnter
   */
  onMouseEnter = () => {
    this.setState({ showMoreButtons: true });
  }

  /**
   * Handles a mouse action on leaving buttons
   *
   * @method onMouseLeave
   */
  onMouseLeave = () => {
    this.setState({ showMoreButtons: false });
  }

  /**
   * Returns classes for the component.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    let classes = 'ui-multi-action-button';

    if (this.props.className) {
      classes += ` ${this.props.className}`;
    }

    return classes;
  }

  get moreButtonHTML() {

    return (
      <div className='ui-multi-action-button__list-block'>
        {this.props.children}
      </div>
    );
  }

  get mainButtonHTML() {

    return (
      <div>
        <Button onClick={ this.props.onClick }  onMouseEnter={ this.onMouseLeave }>{ this.props.name}</Button>
        <Icon type='dropdown' onMouseEnter={ this.onMouseEnter } className="ui-multi-action-button__icon" />
      </div>
    );
  }

  render() {

    return (
      <div className={ this.mainClasses } onMouseLeave={ this.onMouseLeave }>
        { this.mainButtonHTML }
        { this.state.showMoreButtons ? this.moreButtonHTML : null}
      </div>
    );
  }
}

export default MultiActionButton;