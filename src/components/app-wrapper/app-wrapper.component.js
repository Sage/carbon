import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import { validProps } from "../../__internal__/utils/ether";
import StyledAppWrapper from "./app-wrapper.style";

/**
 * Manages the width and containment of your application.
 */
class AppWrapper extends React.Component {
  constructor(...args) {
    super(...args);
    this.classes = this.classes.bind(this);
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
    return (
      <StyledAppWrapper
        {...validProps(this)}
        className={this.classes()}
        {...tagComponent("app-wrapper", this.props)}
      >
        {this.props.children}
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
