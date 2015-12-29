import React from 'react';
import Icon from './../icon';

class AnimatedMenuButton extends React.Component {

  static propTypes = {
    size: React.PropTypes.string,

    direction: React.PropTypes.string,

    label: React.PropTypes.string
  }

  static defaultProps = {
    size: 'medium',
    direction: 'left'
  }

  get closeIcon() {
    return <div onClick={ this.handleTouch }>
             <Icon type='close' />
           </div>
  }

  handleTouch() {
    document.getElementsByClassName("ui-animated-menu-button")[0].className = "closed";
  }

   componentDidMount() {
      if (isTouchDevice()) {
       document.getElementsByClassName('icon-close')[0].style.display='inline-block';
      }
   }

  //  addFocusEvents() {
  //    var triggers;
  //    triggers = this.$target.find(':tabbable');
  //    triggers.on('focusin', (function(_this) {
  //      return function() {
  //        return _this.$target.addClass('hover');
  //      };
  //    })(this));
  //    return triggers.on('focusout', (function(_this) {
  //      return function() {
  //        return _this.$target.removeClass('hover');
  //      };
  //    })(this));
  //  };

    get label() {
      return <span className='label'>{ this.props.label }</span> || '';
    }

    get innerHTML() {
      let contents = [];

      contents.push(this.label);
      if (isTouchDevice()) { contents.push(this.closeIcon); }
      contents.push(this.props.children);

      return <div className="content">{ contents }</div>;
    }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let {className, ...props} = this.props;

    className = 'ui-animated-menu-button ui-animated-menu-button--' + this.props.size +
                ' ui-animated-menu-button--' + this.props.direction + ' ' +
                (className ? ' ' + className : '');

    return (
      <div className={ className } >
        <Icon type='add'/>
        { this.innerHTML }
      </div>
    );
  }

}

export default AnimatedMenuButton;

function isTouchDevice() {
  return (('ontouchstart' in window)
       || (navigator.MaxTouchPoints > 0)
       || (navigator.msMaxTouchPoints > 0));
}
