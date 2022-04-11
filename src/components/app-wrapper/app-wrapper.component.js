import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledAppWrapper from "./app-wrapper.style";
import Logger from "../../__internal__/utils/logger";

let deprecatedWarnTriggered = false;

/**
 * Manages the width and containment of your application.
 */
class AppWrapper extends React.Component {
  constructor(...args) {
    super(...args);
    this.classes = this.classes.bind(this);

    if (!deprecatedWarnTriggered) {
      deprecatedWarnTriggered = true;
      // eslint-disable-next-line max-len
      Logger.deprecate(
        "`AppWrapper` component is now deprecated and will soon be removed. Please use the `Box` component instead."
      );
    }
  }

  /**
   * Returns the classes for the component.
   *
   * @method classes
   * @return {String}
   */
  classes() {
    return classNames("carbon-app-wrapper", this.props.className);
  }

  /**
   * @method render
   */
  render() {
    const { children } = this.props;
    return (
      <StyledAppWrapper
        {...this.props}
        className={this.classes()}
        {...tagComponent("app-wrapper", this.props)}
      >
        {children}
      </StyledAppWrapper>
    );
  }
}

AppWrapper.propTypes = {
  /**
   * Children elements
   *
   * @property children
   * @type {Node}
   */
  children: PropTypes.node,

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: PropTypes.string,
};

export default AppWrapper;
