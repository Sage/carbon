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
    buttons: React.PropTypes.array
  }

  state = { showMoreButtons: false}

  handleOnMouseEnter = () => {
    this.setState({'showMoreButtons': true});
  }

  handleOnMouseLeave = () => {
    this.setState({'showMoreButtons': false});
  }

  get multiActionButtonProps(){
    return {
      className: 'ui-multi-action-button__block',
      onMouseLeave: this.handleOnMouseLeave
    };
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
          onMouseEnter={ this.handleOnMouseLeave }>
          <span> { button.name } </span>
        </button>
        <Icon type='dropdown' onMouseEnter={ this.handleOnMouseEnter } className="ui-input-icon ui-multi-action-button__icon" />
      </div>
    );
  }

  render() {
    return (
      <div {...this.multiActionButtonProps}>
        { this.mainButtonHTML }
        { this.state.showMoreButtons ? this.moreButtonHTML : null}
      </div>
    );
  }
}

export default MultiActionButton;
