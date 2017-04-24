import React, { PropTypes } from 'react';
import classNames from 'classnames';
import I18n from 'i18n-js';
import Link from './../link';

/**
 * A ActionToolbar widget.
 *
 * == How to use a ActionToolbar in a component:
 *
 * In your file
 *
 *   import ActionToolbar from 'carbon/lib/components/action-toolbar';
 *
 * To render an ActionToolbar:
 *
 *   let actions = [{
 *     text: "Add Subscriptions",
 *     icon: "basket",
 *     onClick: onClickHandler() => {}
 *   }, {
 *     text: "Delete",
 *     icon: "bin",
 *     onClick: onClickHandler() => {}
 *   }];
 *
 *   <ActionToolbar total={ count } actions={ actions } />
 *
 *  Additional props for Link or Icon can be passed in the action object.
 *
 * @class ActionToolbar
 * @constructor
 */
class ActionToolbar extends React.Component {
  // TODO This component needs to be freestanding - we need to provide an api that allows it be used independently.
  // https://github.com/Sage/carbon/issues/1070

  static propTypes = {
    /**
     * The actions to display in the toolbar
     *
     * @property actions - each action is object with the action attributes
     * @type {Array}
     */
    actions: PropTypes.array.isRequired,

    /**
     * A custom class name for the component.
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string
  };

  static contextTypes = {
    attachActionToolbar: PropTypes.func, // tracks the action toolbar component
    detachActionToolbar: PropTypes.func // tracks the action toolbar component
  };

  constructor(...args) {
    super(...args);

    this.actions = this.actions.bind(this);
    this.isActive = this.isActive.bind(this);
    this.mainClasses = this.mainClasses.bind(this);
    this.buildAction = this.buildAction.bind(this);
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
  };

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

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.mainClasses() }>
        <div className='carbon-action-toolbar__total'>
          <strong>{ this.state.total }</strong> { I18n.t('action_toolbar.selected', { defaultValue: 'Selected' }) }
        </div>

        <div className='carbon-action-toolbar__actions'>
          { this.actions() }
        </div>
      </div>
    );
  }

  /**
   * @method actions
   * @return {Array}
   */
  actions() {
    const actions = [];

    for (const key in this.props.actions) {
      const action = this.props.actions[key];
      actions.push(this.buildAction(action, key));
    }

    return actions;
  }

  /**
   * @method isActive
   * @return {Boolean}
   */
  isActive() {
    return this.state.total > 0;
  }

  /**
   * @method mainClasses
   * @return {String}
   */
  mainClasses() {
    return classNames('carbon-action-toolbar', this.props.className);
  }

  /**
   * @method buildAction
   * @return {Object} JSX
   */
  buildAction(action, index) {
    let { onClick, className, text, ...props } = action;
    className = classNames('carbon-action-toolbar__action', className);
    onClick = onClick ? onClick.bind(this, this.state.selected) : null;

    return (
      <Link
        className={ className }
        disabled={ !this.isActive() }
        key={ index }
        onClick={ onClick }
        { ...props }
      >
        { text }
      </Link>
    );
  }
}

export default ActionToolbar;
