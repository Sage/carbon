import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Icon from '../icon';
import tagComponent from '../../utils/helpers/tags';
import Devices from '../../utils/helpers/devices';
import { validProps } from '../../utils/ether';
import './animated-menu-button.scss';

/**
 * An AnimatedMenuButton widget.
 *
 * == How to use an AnimatedMenuButton in a component:
 *
 * In your file
 *
 *   import AnimatedMenuButton from 'carbon-react/lib/components/animated-menu-button';
 *
 * To render a AnimatedMenuButton, pass children to be rendered in the expanded menu:
 *
 *  <AnimatedMenuButton>
 *    <Row>
 *      <div>
 *        <h2 className="title">Foo</h2>
 *          <p><Link href='#'>Bar</Link></p>
 *       </div>
 *     </Row>
 *  </AnimatedMenuButton>
 *
 * @class AnimatedMenuButton
 * @constructor
 */
class AnimatedMenuButton extends React.Component {
  constructor(...args) {
    super(...args);

    this.blockBlur = false;

    this.closeHandler = this.closeHandler.bind(this);
    this.closeIcon = this.closeIcon.bind(this);
    this.componentProps = this.componentProps.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.innerHTML = this.innerHTML.bind(this);
    this.labelHTML = this.labelHTML.bind(this);
    this.mainClasses = this.mainClasses.bind(this);
    this.openHandler = this.openHandler.bind(this);
  }

  state = {
    open: false,
    touch: Devices.isTouchDevice()
  };

  labelHTML() {
    if (this.props.label) {
      return (
        <span
          className='carbon-animated-menu-button__label'
          data-element='label'
          key='label'
        >
          {this.props.label}
        </span>
      );
    }
    return '';
  }

  innerHTML() {
    const contents = [];

    // If device supports touch, add close icon.
    if (this.state.touch) { contents.push(this.closeIcon()); }

    contents.push(this.labelHTML());
    contents.push(this.props.children);

    return (
      <div className='carbon-animated-menu-button__content'>
        {contents}
      </div>
    );
  }

  mainClasses() {
    return classNames(
      this.props.className,
      'carbon-animated-menu-button',
      `carbon-animated-menu-button--${this.props.direction}`,
      `carbon-animated-menu-button--${this.props.size}`
    );
  }

  componentProps() {
    const { ...props } = validProps(this);

    delete props['data-element'];
    delete props['data-role'];

    props.className = this.mainClasses();
    props.onBlur = this.handleBlur;
    props.onFocus = this.openHandler;
    props.onMouseEnter = this.openHandler;
    props.onMouseLeave = this.closeHandler;
    props.onTouchEnd = this.state.touch ? this.openHandler : null;
    props.ref = (comp) => { this._button = comp; };
    return props;
  }

  closeIcon() {
    return (
      <button
        className='carbon-animated-menu-button__close-button'
        data-element='close'
        key='close'
        onClick={ this.closeHandler }
        ref={ (comp) => { this._closeIcon = comp; } }
        type='button'
      >
        <Icon type='close' />
      </button>
    );
  }

  openHandler() {
    this.setState({ open: true });
    this.blockBlur = true;
  }

  closeHandler(event) {
    event.preventDefault();
    this.setState({ open: false });
    this.blockBlur = false;
  }

  handleBlur() {
    if (!this.blockBlur) { this.setState({ open: false }); }
  }

  render() {
    let content;

    if (this.state.open) {
      content = (
        <CSSTransition
          timeout={ { enter: 500, exit: 500 } }
          classNames='carbon-animated-menu-button'
        >
          {this.innerHTML()}
        </CSSTransition>
      );
    }

    return (
      <div { ...this.componentProps() } { ...tagComponent('animated-menu-button', this.props) }>
        <Icon
          type='add'
          data-element='open'
          iconColor='on-dark-background'
        />
        <TransitionGroup>
          {content}
        </TransitionGroup>
      </div>
    );
  }
}

AnimatedMenuButton.propTypes = {
  /** Content rendered inside of the menu button component */
  children: PropTypes.node,
  /** Custom class name provided to the component */
  className: PropTypes.string,
  /** Direction of component animation. Available `left` or `right` */
  direction: PropTypes.string,
  /** Content of label */
  label: PropTypes.string,
  /** Width of the animation menu button container */
  size: PropTypes.string
};

AnimatedMenuButton.defaultProps = {
  direction: 'left',
  size: 'medium'
};

export default AnimatedMenuButton;
