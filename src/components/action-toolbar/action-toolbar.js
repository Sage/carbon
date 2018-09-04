import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import I18n from 'i18n-js';
import Link from '../link';
import tagComponent from '../../utils/helpers/tags';
import './action-toolbar.scss';

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
 *   let actions = {
 *     subscription: {
 *       text: "Add Subscriptions",
 *       icon: "basket",
 *       onClick: onClickHandler(event, selected) => {}
 *     },
 *     delete: {
 *       text: "Delete",
 *       icon: "bin",
 *       onClick: onClickHandler(event, selected) => {}
 *     }
 *   };
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
    actions: PropTypes.object.isRequired,

    /**
     * A custom class name for the component.
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * A function to return child components for the action toolbar.
     *
     * @property children
     * @type {Function}
     */
    children: PropTypes.func
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
     * @type {Object}
     */
    selected: {}
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
   * @method handleOnClick
   * @return {Function}
   */
  handleOnClick = (onClick, selected) => {
    if (!onClick) { return null; }
    return event => onClick(selected, event);
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
   * @method linkClasses
   * @return {String}
   */
  linkClasses(className) {
    return classNames('carbon-action-toolbar__action', className);
  }

  /**
   * @method buildAction
   * @return {Object} JSX
   */
  buildAction(action, index) {
    const {
      onClick, className, text, ...props
    } = action;

    return (
      <Link
        className={ this.linkClasses(className) }
        data-element='action'
        disabled={ !this.isActive() }
        key={ index }
        onClick={ this.handleOnClick(onClick, this.state.selected) }
        { ...props }
      >
        { text }
      </Link>
    );
  }

  propsForChildren = () => {
    return {
      disabled: !this.isActive(),
      selected: this.state.selected,
      total: this.state.total
    };
  }

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.mainClasses() } { ...tagComponent('action-toolbar', this.props) }>
        <div className='carbon-action-toolbar__total'>
          <strong data-element='total'>
            { this.state.total }
          </strong>
          &nbsp;{ I18n.t('action_toolbar.selected', { defaultValue: 'Selected' }) }
        </div>

        <div className='carbon-action-toolbar__actions'>
          { this.actions() }
          { this.props.children && this.props.children(this.propsForChildren()) }
        </div>
      </div>
    );
  }
}

export default ActionToolbar;
