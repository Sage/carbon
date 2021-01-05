import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import tagComponent from "../../../utils/helpers/tags";
import StyledMenuListItem from "./menu-list-item.style";

class MenuListItem extends React.Component {
  static propTypes = {
    /**
     * Children elements
     */
    children: PropTypes.node.isRequired,

    /**
     * Custom className
     */
    className: PropTypes.string,
  };

  constructor(...args) {
    super(...args);

    this.mainClasses = this.mainClasses.bind(this);
  }

  mainClasses() {
    return classNames("carbon-menu-list-item", this.props.className);
  }

  render() {
    return (
      <StyledMenuListItem
        className={this.mainClasses()}
        {...tagComponent("menu-list-item", this.props)}
      >
        {this.props.children}
      </StyledMenuListItem>
    );
  }
}

export default MenuListItem;
