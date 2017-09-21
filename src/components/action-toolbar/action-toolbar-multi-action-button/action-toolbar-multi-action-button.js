import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MultiActionButton from './../../multi-action-button';

class ActionToolbarMultiActionButton extends React.Component {
  static propTypes = {
    className: PropTypes.string
  }

  static contextTypes = {
    selected: PropTypes.object
  }

  isDisabled = () => {
    return Object.keys(this.context.selected).length === 0;
  }

  render() {
    const { className, ...props } = this.props;

    const newClassName = classNames('carbon-action-toolbar-multi-action-button', className);

    return (
      <MultiActionButton
        className={ newClassName }
        disabled={ this.isDisabled() }
        { ...props }
      />
    );
  }
}

export default ActionToolbarMultiActionButton;
