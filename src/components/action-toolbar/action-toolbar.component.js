import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Link from "../link";
import tagComponent from "../../utils/helpers/tags";
import {
  StyledActionToolbar,
  StyledActionToolbarTotal,
  StyledActionToolbarActions,
} from "./action-toolbar.style";
import Logger from "../../utils/logger/logger";
import LocaleContext from "../../__internal__/i18n-context";

let deprecatedWarnTriggered = false;

/**
 * A ActionToolbar widget.
 *
 * == How to use a ActionToolbar in a component:
 *
 * In your file
 *
 *   import ActionToolbar from 'carbon-react/lib/components/action-toolbar';
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
 */
class ActionToolbar extends React.Component {
  static contextTypes = {
    attachActionToolbar: PropTypes.func, // tracks the action toolbar component
    detachActionToolbar: PropTypes.func, // tracks the action toolbar component
  };

  constructor(...args) {
    super(...args);

    this.actions = this.actions.bind(this);
    this.isActive = this.isActive.bind(this);
    this.buildAction = this.buildAction.bind(this);

    if (!deprecatedWarnTriggered) {
      deprecatedWarnTriggered = true;
      Logger.deprecate(
        "`ActionToolbar` component is deprecated and will soon be removed."
      );
    }
  }

  state = {
    total: 0,
    selected: {},
  };

  UNSAFE_componentWillMount() {
    if (this.context.attachActionToolbar) {
      this.context.attachActionToolbar(this);
    }
  }

  componentWillUnmount() {
    if (this.context.detachActionToolbar) {
      this.context.detachActionToolbar(this);
    }
  }

  actions() {
    const actions = [];

    for (const key in this.props.actions) {
      const action = this.props.actions[key];
      actions.push(this.buildAction(action, key));
    }

    return actions;
  }

  handleOnClick = (onClick, selected) => {
    if (!onClick) {
      return null;
    }
    return (event) => onClick(selected, event);
  };

  isActive() {
    return this.state.total > 0;
  }

  linkClasses(className) {
    return classNames(className);
  }

  buildAction(action, index) {
    const { onClick, className, text, ...props } = action;

    return (
      <Link
        className={this.linkClasses(className)}
        data-element="action"
        disabled={!this.isActive()}
        key={index}
        onClick={this.handleOnClick(onClick, this.state.selected)}
        {...props}
      >
        {text}
      </Link>
    );
  }

  propsForChildren = () => {
    return {
      disabled: !this.isActive(),
      selected: this.state.selected,
      total: this.state.total,
    };
  };

  render() {
    return (
      <StyledActionToolbar
        className={this.props.className}
        {...tagComponent("action-toolbar", this.props)}
      >
        <StyledActionToolbarTotal>
          <strong data-element="total">{this.state.total}</strong>
          &nbsp;
          <LocaleContext.Consumer>
            {(l) => l.actionToolbar.selected}
          </LocaleContext.Consumer>
        </StyledActionToolbarTotal>
        <StyledActionToolbarActions disabled={!this.isActive()}>
          {this.actions()}
          {this.props.children && this.props.children(this.propsForChildren())}
        </StyledActionToolbarActions>
      </StyledActionToolbar>
    );
  }
}

ActionToolbar.propTypes = {
  /** The actions to display in the toolbar */
  actions: PropTypes.object.isRequired,
  /** A custom class name for the component. */
  className: PropTypes.string,
  /** A function to return child components for the action toolbar. */
  children: PropTypes.func,
};

export default ActionToolbar;
