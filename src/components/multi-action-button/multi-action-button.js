import React from 'react';
import Icon from './../icon';
/**
 * A MultiActionButton widget.
 *
 * == How to use a MultiActionButton in a component:
 *
 * In your file
 *
 *   import MultiActionButton from 'components/multi-action-button';
 *
 * To render a MultiActionButton (developer can add any buttons and the first button is the main button):
 *
 *         <MultiActionButton buttons={[{name: 'First/Main Button', handler: handleMainButton},
 *                                      {name: 'Second Button', handler: handleSecondButton}]}/>
 *
 *
 * @class MultiActionButton
 * @constructor
 */
class MultiActionButton extends React.Component {

  static propTypes = {
    buttons: React.PropTypes.array.isRequired
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

  onMouseEnter = () => {
    this.setState({ showMoreButtons: true });
  }

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
    let classes = 'ui-multi-action-button__block';

    if (this.props.className) {
      classes += ` ${this.props.className}`;
    }

    return classes;
  }

  get moreButtonHTML() {
    const buttons = this.props.buttons.slice(1, this.props.buttons.length);

    return (
      <div className='ui-multi-action-button__list-block'>
        <ul className='ui-multi-action-button__list'>
          {buttons.map((button)=>{
            return (
              <li className='ui-multi-action-button__list-item'>
                <button className='ui-multi-action-button__main-button' onClick={button.handler}>
                  <span> {button.name} </span>
                </button>
              </li>
              );
          })}
        </ul>
      </div>
    );
  }

  get mainButtonHTML() {
    const button = this.props.buttons[0];

    return (
      <div>
        <button
          className='ui-multi-action-button__main-button'
          onClick={ button.handler }
          onMouseEnter={ this.onMouseLeave }>
          <span> { button.name } </span>
        </button>
        <Icon type='dropdown' onMouseEnter={ this.onMouseEnter } className="ui-input-icon ui-multi-action-button__icon" />
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
