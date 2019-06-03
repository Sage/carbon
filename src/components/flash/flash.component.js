import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import classNames from 'classnames';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { isObject, isArray, forEach } from 'lodash';
import { withTheme } from 'styled-components';
import shouldComponentUpdate from '../../utils/helpers/should-component-update/should-component-update';
import Portal from '../portal/portal';
import Icon from '../icon/icon';
import Alert from '../alert';
import Link from '../link';
import tagComponent from '../../utils/helpers/tags/tags';
import {
  FlashStyle,
  FlashSliderStyle,
  FlashContentStyle,
  FlashMessageStyle
} from './flash.style';
import './flash.scss';
import { THEMES } from '../../style/themes';
import Toast from '../toast';

class Flash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      /** Keeps track of the open state of each dialog */
      dialogs: {},
      /** Keeps track of the open state of the Flash Component */
      open: this.props.open || false
    };
  }

  /** Resets the dialog open states if flash is opened/closed. */
  componentWillReceiveProps(nextProps) {
    if (nextProps.open === this.props.open) {
      return;
    }

    if (this.removePortalTimeout) {
      clearTimeout(this.removePortalTimeout);
      this.removePortalTimeout = null;
    }

    if (nextProps.open) {
      this.setState({ dialogs: {}, open: nextProps.open });
    } else {
      this.removePortalTimeout = setTimeout(() => {
        this.setState({ open: false });
      }, 1000);
    }
  }

  /** Determines if the component should be updated or not. Required for this component
   * as it determines if the timeout should be reset or not. */
  shouldComponentUpdate(nextProps, nextState) {
    return shouldComponentUpdate(this, nextProps, nextState);
  }

  /** Conditionally triggers close action after flash displayed. */
  componentDidUpdate() {
    // reset dialogs to render
    this.dialogs = [];
    this.startTimeout();
  }

  /** Keeps track of additional dialogs to render for "more info" links */
  dialogs = [];

  /** A timeout for when a flash should auto-dismiss */
  timeout = null;

  /** Starts the timer to auto dismiss flash messages. */
  startTimeout = () => {
    this.stopTimeout();

    if (this.shouldStartTimeout()) {
      this.timeout = setTimeout(() => {
        this.props.onDismiss();
      }, this.props.timeout);
    }
  };

  /** Determines if the timeout should be started. */
  shouldStartTimeout = () => {
    if (!this.props.timeout || !this.props.open) {
      return false;
    }

    let shouldStartTimeout = true;

    for (const key in this.state.dialogs) {
      if (this.state.dialogs[key]) {
        shouldStartTimeout = false;
      }
    }

    return shouldStartTimeout;
  };

  /** Stops the timer to auto dismiss flash messages. */
  stopTimeout = () => {
    clearTimeout(this.timeout);
  };

  /** Opens/closes the dialog for the given key. */
  toggleDialog = (key) => {
    return (ev) => {
      if (ev) {
        ev.preventDefault();
      }

      const state = this.state.dialogs[key];
      // open/close the dialog
      this.setState({ dialogs: { [key]: !state } });

      // start/stop the timer if the dialog opens or closes
      if (state) {
        this.startTimeout();
      } else {
        this.stopTimeout();
      }
    };
  };

  /** Given a description, format it accordingly. */
  formatDescription = (description) => {
    const object = isObject(description),
        array = isArray(description);

    this.dialogs = [];

    if (array || object) {
      const items = [];

      // iterate through the object or array
      forEach(description, (value, key) => {
        let itemValue;

        // pass the value through the find more parser
        const text = this.findMore(value);

        if (!array && !/(^base|\.base)$/.test(key)) {
          // if object, apply key to each item
          itemValue = (
            <span>
              {key}: {text}
            </span>
          );
        } else {
          // otherwise just set value
          itemValue = text;
        }

        // add item to list
        items.push(<li key={ key }>{itemValue}</li>);
      });

      return <ul>{items}</ul>;
    }
    // if just a string, pass it through the find more parser
    return this.findMore(description);
  };

  /** Splits the string and sets additional content inside a dialog. */
  findMore = (text) => {
    let value = text;
    if (typeof text !== 'string') {
      return value;
    }

    // detect any instances of "::more::" in the text
    const parts = text.split('::more::');

    if (parts.length > 1) {
      const title = parts[0].trim(),
          desc = parts[1].trim(),
          info = I18n.t('notifications.more_info', {
            defaultValue: 'More Information'
          });

      // create dialog for additional content
      this.dialogs.push(
        <Alert
          data-element='info-dialog'
          key={ title }
          title={ title }
          open={ this.state.dialogs[title] || false }
          onCancel={ this.toggleDialog(title) }
        >
          {desc}
        </Alert>
      );

      // create text for item
      value = (
        <span>
          {title}&nbsp;
          <Link
            onClick={ this.toggleDialog(title) }
            className='carbon-flash__link'
            data-element='more-info'
          >
            {info}
          </Link>
        </span>
      );
    }

    return value;
  };

  /** Returns the icon to display depending on type */
  get iconType() {
    let icon;

    switch (this.props.as) {
      case 'success':
        icon = 'tick';
        break;
      default:
        icon = this.props.as;
        break;
    }
    return icon;
  }

  /** Parses the message object to get the appropriate description */
  get description() {
    const { message } = this.props;

    if (isObject(message) && message.description) {
      // if defined, return description
      return message.description;
    }

    // otherwise, just return itself
    return message;
  }

  /** Returns the computed HTML for the flash. */
  get flashHTML() {
    return (
      <FlashContentStyle>
        <Icon
          className='carbon-flash__icon' type={ this.iconType }
          key='icon'
        />
        <FlashMessageStyle key='message' data-element='message'>
          {this.formatDescription(this.description)}
        </FlashMessageStyle>
        {!this.props.timeout && (
          <Icon
            className='carbon-flash__close'
            data-element='close'
            key='close'
            onClick={ this.props.onDismiss }
            type='close'
          />
        )}
      </FlashContentStyle>
    );
  }

  /** Returns the computed HTML for the slider. */
  get sliderHTML() {
    return <FlashSliderStyle key='slider' />;
  }

  /** Returns the classes for the component. */
  get classes() {
    return classNames(this.props.className);
  }

  getComponentByTeamProvided() {
    const sliderHTML = this.props.open && this.sliderHTML;
    const flashHTML = this.props.open && this.flashHTML;

    if (this.props.theme.name === THEMES.classic) {
      return (
        <Portal>
          <div { ...tagComponent('flash', this.props) }>
            <FlashStyle
              variant={ this.props.as || this.props.variant }
              className={ this.classes }
            >
              <CSSTransitionGroup
                component='div'
                transitionAppear
                transitionAppearTimeout={ 500 }
                transitionName='carbon-flash__slider'
                transitionEnterTimeout={ 600 }
                transitionLeave
                transitionLeaveTimeout={ 600 }
              >
                {sliderHTML}
                <CSSTransitionGroup
                  component='div'
                  transitionName='carbon-flash__content'
                  transitionEnterTimeout={ 200 }
                  transitionLeave
                  transitionLeaveTimeout={ 600 }
                >
                  {flashHTML}
                </CSSTransitionGroup>
              </CSSTransitionGroup>
            </FlashStyle>
            {this.dialogs}
          </div>
        </Portal>
      );
    }

    return (
      <Toast
        isCenter={ this.props.isCenter }
        variant={ this.props.as || this.props.variant }
        onDismiss={ this.props.onDismiss }
      >
        {this.props.message}
      </Toast>
    );
  }

  render() {
    return this.state.open && this.getComponentByTeamProvided();
  }
}

Flash.propTypes = {
  /** Custom className */
  className: PropTypes.string,
  /** A custom close event handler */
  onDismiss: PropTypes.func.isRequired,
  /** Sets the open state of the flash. */
  open: PropTypes.bool.isRequired,
  /** Type of notification. Legacy standard (see the 'iconColorSets' for possible values) */
  as: PropTypes.string,
  /** Type of notification with new DLS standard */
  variant: PropTypes.string,
  /** Contents of message. */
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  /** Time for flash to remain on screen */
  timeout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** supporting legacy components. Theme help us pick up a right component */
  theme: PropTypes.string,
  /** allow to center keep flash component centered */
  isCenter: PropTypes.bool
};

Flash.defaultProps = {
  as: 'success',
  className: '',
  timeout: 0,
  isCenter: true
};

export default withTheme(Flash);
