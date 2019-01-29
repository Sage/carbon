import * as  React from "react";
import classNames from "classnames";
import assign from "lodash/assign";
import Link from "../link";
import { validProps } from "../../utils/ether/ether";
import tagComponent from "../../utils/helpers/tags/tags";
import "./button.scss";
interface ButtonProps {
  as?: "primary" | "secondary",
  disabled?: boolean,
  theme?: string,
  size?: string,
  subtext?: any
};
/**
 * A button widget.
 *
 * == How to use a Button in a component:
 *
 * In your file:
 *
 *   import Button from 'carbon-react/lib/components/button';
 *
 * To render the Button:
 *
 *   <Button>Save</Button>
 *
 *  ### Themes
 *
 *  Currently available button themese are blue(default), green, red, magenta, grey & white.
 *
 * For additional properties specific to this component, see propTypes and defaultProps.
 *
 * @class Button
 * @constructor
 */
class Button extends React.Component<ButtonProps, {}> {
  static safeProps = ["disabled"];
  static defaultProps = {
    as: "secondary",
    size: "medium",
    theme: "blue",
    disabled: false,
    subtext: ""
  };
  constructor(...args: any[]) {
    // @ts-ignore
    super(...args);
    this.element = this.element.bind(this);
  }
  /**
   * Creates the child object for the button
   *
   * @return {Object} JSX
   */
  buildChildren() {
    let { children } = this.props;
    if (this.props.subtext.length > 0 && this.props.size === "large") {
      children = (
        <span className="carbon-button__internal-wrapper">
          <span
            className="carbon-button__main-text"
            data-element="main-text"
            key="children"
          >
            {this.props.children}
          </span>
          <span
            className="carbon-button__subtext"
            data-element="subtext"
            key="subtext"
          >
            {this.props.subtext}
          </span>
        </span>
      );
    }
    return children;
  }
  /**
   * Build the element to render.
   *
   * @method element
   * @return {Object} JSX
   */
  element(): object {
    let { ...props } = validProps(this, Button.safeProps);
    // if props.href then render an anchor instead
    const el = props.href || props.to ? Link : "button";
    props.className = classNames(
      "carbon-button",
      `carbon-button--${this.props.as}`,
      `carbon-button--${this.props.theme}`,
      `carbon-button--${this.props.size}`,
      props.className,
      {
        "carbon-button--disabled": this.props.disabled,
        "carbon-button--subtext": this.props.subtext.length > 0
      }
    );
    props = assign({}, props, tagComponent("button", this.props));
    return React.createElement(el, props, this.buildChildren());
  }
  /**
   * Renders the component with props.
   *
   * @method render
   * @return {Object} JSX
   */
  render(): object {
    return this.element() as HTMLElement;
  }
}
export default Button;
