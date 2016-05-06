import React from 'react';
import classNames from 'classnames';
import I18n from 'i18n-js';
import Link from './../link';

class ActionToolbar extends React.Component {
  static contextTypes = {
    attachActionToolbar: React.PropTypes.func, // tracks the action toolbar component
    detachActionToolbar: React.PropTypes.func // tracks the action toolbar component
  }

  /**
   * @method componentWillMount
   * @return {Void}
   */
  componentWillMount() {
    if (this.context.attachActionToolbar) {
      this.context.attachActionToolbar(this);
    }
  }

  /**
   * @method componentWillUnmount
   * @return {Void}
   */
  componentWillUnmount() {
    if (this.context.detachActionToolbar) {
      this.context.detachActionToolbar(this);
    }
  }

  state = {
    /**
     * @property total
     * @type {Number}
     */
    total: 0,

    /**
     * @property selected
     * @type {Array}
     */
    selected: []
  }

  /**
   * @method buildAction
   * @return {Object} JSX
   */
  buildAction = (action, index) => {
    let { onClick, text, className, ...props } = action;

    className = classNames("ui-action-toolbar__action", className);
    onClick = onClick ? onClick.bind(this, this.state.selected) : null;

    return (
      <Link
        className={ className }
        disabled={ !this.isActive }
        key={ index }
        onClick={ onClick }
        { ...props }
      >
        { text }
      </Link>
    );
  }

  /**
   * @method actions
   * @return {Array}
   */
  get actions() {
    let actions = [];

    for (let key in this.props.actions) {
      let action = this.props.actions[key];
      actions.push(this.buildAction(action, key));
    }

    return actions;
  }

  /**
   * @method isActive
   * @return {Boolean}
   */
  get isActive() {
    return this.state.total > 0;
  }

  /**
   * @method mainClasses
   * @return {String}
   */
  get mainClasses() {
    return classNames("ui-action-toolbar", this.props.className);
  }

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.mainClasses }>
        <div className="ui-action-toolbar__total">
          <strong>{ this.state.total }</strong> { I18n.t("action_toolbar.selected", { defaultValue: "Selected" }) }
        </div>

        <div className="ui-action-toolbar__actions">
          { this.actions }
        </div>
      </div>
    );
  }
}

export default ActionToolbar;
