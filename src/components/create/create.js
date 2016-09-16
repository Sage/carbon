import React from 'react';
import classNames from 'classnames';
import Link from './../link';

class Create extends React.Component {
  /**
   * Returns the props for the component.
   *
   * @method linkProps
   * @return {Object}
   */
  get linkProps() {
    let { className, ...props } = this.props;

    props.className = classNames(
      "carbon-create", className
    );

    props.iconAlign = "right";
    props.icon = "add";
    return props;
  }

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <Link { ...this.linkProps }>
        { this.props.children }
      </Link>
    );
  }
}

export default Create;
