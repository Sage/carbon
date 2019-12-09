import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Browser from '../../utils/helpers/browser';
import Icon from '../icon';
import Modal from '../modal';
import Heading from '../heading';
import Form from '../../__deprecated__/components/form';
import ElementResize from '../../utils/helpers/element-resize';
import {
  DialogStyle,
  DialogTitleStyle,
  DialogContentStyle,
  DialogInnerContentStyle
} from './dialog.style';
import tagComponent from '../../utils/helpers/tags';

class Dialog extends Modal {
  constructor(args) {
    super(args);
    this.componentTags = this.componentTags.bind(this);
    this.onDialogBlur = this.onDialogBlur.bind(this);
    this.onCloseIconBlur = this.onCloseIconBlur.bind(this);
    this.document = Browser.getDocument();
    this.window = Browser.getWindow();
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.props.open) {
      this.centerDialog();
      if (this.props.autoFocus) {
        this.focusDialog();
      }
    }
  }

  onDialogBlur(ev) { } // eslint-disable-line no-unused-vars

  onCloseIconBlur(ev) {
    ev.preventDefault();
    this.focusDialog();
  }

  get onOpening() {
    this.document.documentElement.style.overflow = 'hidden';
    this.centerDialog(true);
    ElementResize.addListener(this._innerContent, this.applyFixedBottom);
    this.window.addEventListener('resize', this.centerDialog);

    if (this.props.autoFocus) {
      return this.focusDialog();
    }

    return null;
  }

  get onClosing() {
    this.appliedFixedBottom = false;
    this.document.documentElement.style.overflow = '';
    this.window.removeEventListener('resize', this.centerDialog);
    return ElementResize.removeListener(this._innerContent, this.applyFixedBottom);
  }

  centerDialog = (animating) => {
    if (!this._dialog) return;

    const height = this._dialog.offsetHeight / 2,
        width = this._dialog.offsetWidth / 2,
        win = this.window;

    let midPointY = win.innerHeight / 2,
        midPointX = win.innerWidth / 2;

    midPointY -= height;
    midPointX -= width;

    if (midPointY < 20) {
      midPointY = 20;
    }

    if (midPointX < 20) {
      midPointX = 20;
    }

    if (this._content) {
      // apply height to content based on height of title
      const titleHeight = this._title ? this._title.offsetHeight : '0';
      this._content.style.height = `calc(100% - ${titleHeight}px)`;
    }

    this._dialog.style.top = `${midPointY}px`;
    this._dialog.style.left = `${midPointX}px`;

    if (animating === true) {
      // cause timeout to accommodate dialog animating in
      setTimeout(() => {
        this.applyFixedBottom();
      }, 500);
    } else {
      this.applyFixedBottom();
    }
  }

  applyFixedBottom = () => {
    if (!this.appliedFixedBottom && this.shouldHaveFixedBottom()) {
      this.appliedFixedBottom = true;
      this.forceUpdate();
    } else if (this.appliedFixedBottom && !this.shouldHaveFixedBottom()) {
      this.appliedFixedBottom = false;
      this.forceUpdate();
    }
  }

  focusDialog() {
    if (!this._dialog) return;
    this._dialog.focus();
  }

  shouldHaveFixedBottom = () => {
    if (!this._innerContent) return false;

    const contentHeight = this._innerContent.offsetHeight + this._innerContent.offsetTop,
        windowHeight = this.window.innerHeight - this._dialog.offsetTop - 1;

    return contentHeight > windowHeight;
  }

  get dialogTitle() {
    if (!this.props.title) return null;

    const { showCloseIcon } = this.props;
    let { title } = this.props;

    if (typeof title === 'string') {
      title = (
        <Heading
          title={ title }
          titleId='carbon-dialog-title'
          subheader={ this.props.subtitle }
          subtitleId='carbon-dialog-subtitle'
        />
      );
    }

    return (
      <DialogTitleStyle
        showCloseIcon={ showCloseIcon }
        ref={ (titleRef) => { this._title = titleRef; } }
      >
        {title}
      </DialogTitleStyle>
    );
  }

  get mainClasses() {
    return classNames(
      'carbon-dialog',
      this.props.className
    );
  }

  get closeIcon() {
    if (this.props.showCloseIcon) {
      return (
        <Icon
          className='carbon-dialog__close'
          data-element='close'
          onClick={ this.props.onCancel }
          type='close'
          tabIndex='0'
          onBlur={ this.onCloseIconBlur }
        />
      );
    }
    return null;
  }

  componentTags(props) {
    return {
      'data-component': 'dialog',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }

  additionalContent() {
    return null;
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (child && child.type === Form) {
        return React.cloneElement(child, {
          fixedBottom: this.appliedFixedBottom
        });
      }

      return child;
    });
  }

  get modalHTML() {
    let { height } = this.props;

    if (height && !height.match(/px$/)) {
      height = `${height}px`;
    }

    const dialogProps = {
      tabIndex: 0,
      style: {
        minHeight: height
      },
      size: this.props.size,
      fixedBottom: this.appliedFixedBottom,
      stickyFormFooter: this.props.stickyFormFooter,
      height: this.props.height,
      theme: this.props.theme
    };

    if (this.props.ariaRole) {
      dialogProps.role = this.props.ariaRole;
    }

    if (this.props.title) {
      dialogProps['aria-labelledby'] = 'carbon-dialog-title';
    }

    if (this.props.subtitle) {
      dialogProps['aria-describedby'] = 'carbon-dialog-subtitle';
    }

    return (
      <DialogStyle
        ref={ (dialog) => { this._dialog = dialog; } }
        { ...dialogProps }
        { ...tagComponent('dialog', { 'data-element': 'dialog', 'data-role': this.props['data-role'] }) }
        onBlur={ this.onDialogBlur }
      >
        {this.dialogTitle}
        <DialogContentStyle
          ref={ (content) => { this._content = content; } }
          height={ this.props.height }
          fixedBottom={ this.appliedFixedBottom }
        >
          <DialogInnerContentStyle
            ref={ (innerContent) => { this._innerContent = innerContent; } }
            height={ this.props.height }
          >
            {this.renderChildren()}
            {this.additionalContent()}
          </DialogInnerContentStyle>
        </DialogContentStyle>
        {this.closeIcon}
      </DialogStyle>
    );
  }
}

Dialog.propTypes = {
  ...Modal.propTypes,
  /** Allows developers to specify a specific height for the dialog. */
  height: PropTypes.string,
  /** Title displayed at top of dialog */
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** Subtitle displayed at top of dialog */
  subtitle: PropTypes.string,
  /** Size of dialog, default size is 750px */
  size: PropTypes.string,
  /** Determines if the close icon is shown */
  showCloseIcon: PropTypes.bool,
  /** If true then the dialog receives focus when it opens */
  autoFocus: PropTypes.bool,
  stickyFormFooter: PropTypes.bool
};

Dialog.defaultProps = {
  autoFocus: true,
  size: 'medium',
  showCloseIcon: true,
  ariaRole: 'dialog'
};

export default Dialog;
